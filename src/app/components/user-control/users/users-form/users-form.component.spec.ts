import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from 'src/app/modules/material.module';

import { UsersFormComponent } from './users-form.component';

describe('UsersFormComponent', () => {
  let component: UsersFormComponent;
  let fixture: ComponentFixture<UsersFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UsersFormComponent],
      imports: [ReactiveFormsModule, MaterialModule, BrowserAnimationsModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersFormComponent);
    component = fixture.componentInstance;
    component.formData = {
      type: { isView: true },
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
