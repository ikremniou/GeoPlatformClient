import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from 'src/app/modules/material.module';

import { WorkersFormComponent } from './worker-form.component';

describe('WorkersFormComponent', () => {
  let component: WorkersFormComponent;
  let fixture: ComponentFixture<WorkersFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WorkersFormComponent],
      imports: [MaterialModule, ReactiveFormsModule, BrowserAnimationsModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkersFormComponent);
    component = fixture.componentInstance;
    component.formData = {
      type: {
        isView: true,
      },
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
