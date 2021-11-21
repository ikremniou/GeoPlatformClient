import { TestBed } from '@angular/core/testing';

import { PlatformAbilityService } from './platform-ability.service';

describe('PlatformAbilityService', () => {
  let service: PlatformAbilityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlatformAbilityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
