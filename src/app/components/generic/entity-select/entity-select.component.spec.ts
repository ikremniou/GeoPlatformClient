import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from 'src/app/modules/material.module';

import { EntitySelectComponent } from './entity-select.component';

describe('EntitySelectComponent', () => {
  let component: EntitySelectComponent<any>;
  let fixture: ComponentFixture<EntitySelectComponent<any>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EntitySelectComponent],
      imports: [MaterialModule, BrowserAnimationsModule, ReactiveFormsModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EntitySelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
