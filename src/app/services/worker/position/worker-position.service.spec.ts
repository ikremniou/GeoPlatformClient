import { TestBed } from '@angular/core/testing';

import { WorkerPositionService } from './worker-position.service';

describe('WorkerPositionService', () => {
  let service: WorkerPositionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorkerPositionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
