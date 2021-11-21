import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EntitySelectComponent } from 'src/app/components/generic/entity-select/entity-select.component';
import { MaterialModule } from 'src/app/modules/material.module';

import { InvitationFormComponent } from './invitation-form.component';

describe('InvitationFormComponent', () => {
  let component: InvitationFormComponent;
  let fixture: ComponentFixture<InvitationFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InvitationFormComponent, EntitySelectComponent],
      imports: [MaterialModule, BrowserAnimationsModule, ReactiveFormsModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InvitationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
