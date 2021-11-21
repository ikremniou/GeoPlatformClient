import { TestBed } from '@angular/core/testing';

import { FilterAggregatorService } from './filter-aggregator.service';

describe('FilterAggregatorService', () => {
  let service: FilterAggregatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FilterAggregatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


});
