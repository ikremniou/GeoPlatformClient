import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkersViewComponent } from './workers-view.component';

describe('WorkersViewComponent', () => {
  let component: WorkersViewComponent;
  let fixture: ComponentFixture<WorkersViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkersViewComponent ]
    })
    .compileComponents();
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
