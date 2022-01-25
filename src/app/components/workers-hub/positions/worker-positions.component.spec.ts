import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkerPositionsComponent } from './worker-positions.component';

describe('WorkerPositionsComponent', () => {
  let component: WorkerPositionsComponent;
  let fixture: ComponentFixture<WorkerPositionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkerPositionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkerPositionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
