import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataTableComponent } from './data-table.component';
import { Worker } from 'src/app/models/worker.model';
import { MaterialModule } from 'src/app/modules/material.module';

describe('DataTableComponent', () => {
  let component: DataTableComponent<Worker>;
  let fixture: ComponentFixture<DataTableComponent<Worker>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DataTableComponent],
      imports: [MaterialModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent<DataTableComponent<Worker>>(DataTableComponent);
    component = fixture.componentInstance;
    component.entityClass = Worker;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
