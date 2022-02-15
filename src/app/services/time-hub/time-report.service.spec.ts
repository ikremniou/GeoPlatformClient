import { TestBed } from '@angular/core/testing';

import { TimeReportService } from './time-report.service';

describe('TimeReportService', () => {
  let service: TimeReportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TimeReportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
