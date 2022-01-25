import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkerPositionFormComponent } from './worker-position-form.component';

describe('WorkerPositionFormComponent', () => {
  let component: WorkerPositionFormComponent;
  let fixture: ComponentFixture<WorkerPositionFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkerPositionFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkerPositionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
