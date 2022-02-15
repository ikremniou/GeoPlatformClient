import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { ControlContainer, ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { debounceTime, filter, tap } from 'rxjs/operators';
import { DataService } from 'src/app/misc/service/data-service';
import {
  FilterAggregatorService,
  FilterStrategy,
  FilterType,
} from 'src/app/services/filtering/filter-aggregator.service';

@Component({
  selector: 'app-entity-select',
  templateUrl: './entity-select.component.html',
  styleUrls: ['./entity-select.component.sass'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: EntitySelectComponent,
    },
  ],
})
export class EntitySelectComponent<EntityType> implements OnInit, ControlValueAccessor {
  @Input('dataService')
  public dataService!: DataService<any>;
  @Input('displayWith')
  public displayWith!: (value: EntityType) => string;
  @Input('entityParts')
  public entityParts: (keyof EntityType)[] = [];
  @Input('filterStrategy')
  public filterStrategy: FilterStrategy = 'sequence';
  @Input('filterType')
  public filterType: FilterType = 'contains';
  @Input('entityTemplate')
  public entityTemplate?: TemplateRef<any>;
  @Input('formControlName')
  public formControlName!: string;
  @Input('errors')
  public errors?: [{ error: string; template: TemplateRef<any> }];
  @Input('label')
  public inputLabel!: string;
  @Input('readonly')
  public readonly?: boolean;

  public isLoading = false;
  public noDataFound = false;
  public isSubscribed = false;
  public entitySelected?: (entityType: EntityType) => void;
  public entityControl: FormControl = new FormControl();
  public filteredEntities: Array<EntityType> = [];
  public onTouchedCallback!: () => void;
  private _getFilteredItems?: Subscription;

  constructor(
    private readonly _controlContainer: ControlContainer,
    private readonly _filterService: FilterAggregatorService,
  ) {}

  get outerControl(): FormControl {
    return this._controlContainer.control?.get(this.formControlName) as FormControl;
  }

  public ngOnInit(): void {
    this.entityControl.setValidators(this.outerControl.validator);
  }

  public writeValue(obj: any): void {
    this.entityControl.setValue(obj);
    this.subscribeToValueChanges();
  }

  public registerOnChange(fn: any): void {
    this.entitySelected = fn;
  }

  public registerOnTouched(fn: any): void {
    this.onTouchedCallback = fn;
  }

  public setDisabledState(disabled: boolean): void {
    if (disabled) {
      this.entityControl.disable();
    } else {
      this.entityControl.enable();
    }
  }

  public markAsTouched(): void {
    this.onTouchedCallback();
  }

  public inputFocused(): void {
    if (!this.entityControl.value || typeof this.entityControl.value === 'string') {
      this.getEntitiesWithFilter(this.entityControl.value);
    }
  }

  private subscribeToValueChanges(): void {
    if (this.isSubscribed) {
      return;
    }

    this.isSubscribed = true;
    this.entityControl.valueChanges
      .pipe(
        tap((input) => {
          this.filteredEntities = [];
          this.noDataFound = false;
          this.isLoading = true;
          if (input && typeof input !== 'string') {
            this.entitySelected?.(input);
          }
        }),
        filter((input) => {
          if (typeof input === 'object') {
            this.filteredEntities = [input];
            this.isLoading = false;
            return false;
          }
          return true;
        }),
        debounceTime(500),
      )
      .subscribe((filterInput) => {
        this.getEntitiesWithFilter(filterInput);
      });
  }

  private getEntitiesWithFilter(filterInput: string) {
    if (this._getFilteredItems) {
      this._getFilteredItems.unsubscribe();
    }

    this._getFilteredItems = this.filterEntities(filterInput).subscribe((filteredEntities) => {
      if (filteredEntities?.length === 0) {
        this.noDataFound = true;
      }
      this.filteredEntities = filteredEntities;
      this.isLoading = false;
    });
  }

  private filterEntities(filterInput: string): Observable<EntityType[]> {
    if (filterInput) {
      let filterParts: string[] = [];
      if (this.entityParts.length > 0) {
        filterParts = filterInput.split(' ');
      }

      const filter = this._filterService.getFilter(
        this.filterStrategy,
        this.filterType,
        this.entityParts as string[],
        filterParts,
      );
      const serializedFilter = JSON.stringify(filter);
      return this.dataService.getAll(serializedFilter);
    }
    return this.dataService.getAll();
  }
}
