import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { Constants } from 'src/app/app.constants';
import { EntityForm } from 'src/app/misc/entity-form';
import { EntityFormData } from 'src/app/misc/entity-form-data';
import { ActionKeys, actionResolver, Claim, subjectResolver } from 'src/app/models/claim.model';
import { CreateRoleModel, Role } from 'src/app/models/role/role.model';
import { ClaimService } from 'src/app/services/claim/claim.service';

@Component({
  selector: 'app-role-form',
  templateUrl: './role-form.component.html',
  styleUrls: ['./role-form.component.sass'],
})
export class RoleFormComponent implements OnInit, EntityForm<Role, CreateRoleModel> {
  @Input()
  public formData!: EntityFormData<Role>;
  public roleForm!: FormGroup;
  public claimsLoading = true;

  public originalClaims: Claim[] = [];
  public availableActions = new Set<string>();
  public availableSubjects = new Set<string>();

  constructor(private readonly _claimService: ClaimService) {}

  public ngOnInit(): void {
    this.roleForm = new FormGroup({
      name: new FormControl(this.formData.model?.name, Validators.required),
      claims: new FormArray([], this.requiredAtLeastOneNonEmpty.bind(this)),
    });

    if (this.formData.model?.name === Constants.AdminRoleName) {
      this.formData.type.isView = true;
    }

    this.initializeClaims();
    if (this.formData.type.isView) {
      this.roleForm.disable();
    }

    this.loadAvailableClaims();
  }

  get claims(): FormArray {
    return this.roleForm.controls['claims'] as FormArray;
  }

  public isValid(): boolean {
    return this.roleForm.valid;
  }

  public getEntity(): Role | CreateRoleModel {
    const claimsIds: number[] = [];
    this.claims.controls.forEach((control) => {
      const claim = this.originalClaims.find(
        (claim) => claim.action == control.value.action && claim.subject == control.value.subject,
      );
      if (claim) {
        claimsIds.push(claim.id);
      }
    });

    return { id: this.formData.model?.id, name: this.roleForm.value.name, claims: claimsIds };
  }

  public deleteClaim(index: number): void {
    this.claims.removeAt(index);
  }

  public addClaim(claim?: Claim): void {
    const claimsForm = new FormGroup({
      action: new FormControl(claim?.action),
      subject: new FormControl(claim?.subject),
    });

    if (!claim?.subject) {
      claimsForm.controls.subject.disable();
    }
    this.claims.push(claimsForm);
  }

  public getSubjectView(claimGroup: AbstractControl, subject: string): string {
    const action = claimGroup.value.action as ActionKeys;
    return action ? subjectResolver(action, subject) : '';
  }

  public getActionView(action: string): string {
    return action ? actionResolver(action) : '';
  }

  public actionSelectionChanged(matAction: MatSelectChange, claimsGroup: AbstractControl): void {
    if (matAction.value) {
      (claimsGroup as FormGroup).controls.subject.enable();
    } else {
      (claimsGroup as FormGroup).controls.subject.disable();
    }
  }

  public subjectSelectionChanged(matSubject: MatSelectChange, abstractControl: AbstractControl): void {
    const claimsGroup = abstractControl as FormGroup;
    if (matSubject.value && claimsGroup.valid) {
      const sameElement = this.claims.controls.find((controlControl) => {
        if (claimsGroup === controlControl) {
          return false;
        }

        const currentGroup = controlControl as FormGroup;
        if (this.isClaimsGroupEqual(currentGroup, claimsGroup)) {
          return true;
        }
        return false;
      });
      if (sameElement) {
        claimsGroup.setErrors({ hasSame: true });
        return;
      }

      const [lastArrayItem] = this.claims.controls.slice(-1);
      if (lastArrayItem === abstractControl) {
        this.addClaim();
      }
    }
  }

  private async loadAvailableClaims() {
    this.availableActions.clear();
    this.availableSubjects.clear();

    const claims = await this._claimService.getAll().toPromise();
    claims.forEach((claim) => {
      this.availableActions.add(claim.action);
      this.availableSubjects.add(claim.subject);
    });
    this.originalClaims = claims;
    this.claimsLoading = false;
  }

  private isClaimsGroupEqual(currentGroup: FormGroup, claimsGroup: FormGroup) {
    return (
      currentGroup.controls.action.value === claimsGroup.controls.action.value &&
      currentGroup.controls.subject.value === claimsGroup.controls.subject.value
    );
  }

  private requiredAtLeastOneNonEmpty(control: AbstractControl): ValidationErrors | null {
    const claims = control as FormArray;
    const nonEmpty = claims.controls.find((control) => control.value.action && control.value.subject);

    if (nonEmpty) {
      return null;
    }
    return { required: true };
  }

  private initializeClaims() {
    if (!this.formData.model?.claims) {
      this.addClaim();
    } else {
      this.formData.model.claims.forEach((claim) => {
        this.addClaim(claim);
      });
    }
  }
}
