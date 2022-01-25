import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkerCategoryFormComponent } from './worker-category-form.component';

describe('WorkerCategoryFormComponent', () => {
  let component: WorkerCategoryFormComponent;
  let fixture: ComponentFixture<WorkerCategoryFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkerCategoryFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkerCategoryFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
