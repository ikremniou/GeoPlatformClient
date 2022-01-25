import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkerCategoriesComponent } from './worker-categories.component';

describe('WorkerCategoriesComponent', () => {
  let component: WorkerCategoriesComponent;
  let fixture: ComponentFixture<WorkerCategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkerCategoriesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkerCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
