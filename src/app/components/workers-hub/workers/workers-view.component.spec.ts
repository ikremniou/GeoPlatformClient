import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MaterialModule } from 'src/app/modules/material.module';
import { DataTableComponent } from '../generic/data-table/data-table.component';

import { WorkersViewComponent } from './workers-view.component';

describe('WorkersViewComponent', () => {
  let component: WorkersViewComponent;
  let fixture: ComponentFixture<WorkersViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WorkersViewComponent, DataTableComponent],
      imports: [MaterialModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkersViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
