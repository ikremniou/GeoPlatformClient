import { TestBed } from '@angular/core/testing';

import { WorkerCategoryService } from './worker-category.service';

describe('WorkerCategoryService', () => {
  let service: WorkerCategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorkerCategoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
