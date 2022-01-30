import { TestBed } from '@angular/core/testing';

import { WorkClientService } from './work-client.service';

describe('WorkClientService', () => {
  let service: WorkClientService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorkClientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
