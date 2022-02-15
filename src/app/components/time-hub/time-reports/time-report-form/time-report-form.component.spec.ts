import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeReportFormComponent } from './time-report-form.component';

describe('TimeReportFormComponent', () => {
  let component: TimeReportFormComponent;
  let fixture: ComponentFixture<TimeReportFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimeReportFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeReportFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
