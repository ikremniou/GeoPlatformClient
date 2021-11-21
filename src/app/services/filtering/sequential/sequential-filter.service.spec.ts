import { TestBed } from '@angular/core/testing';

import { SequentialFilterService } from './sequential-filter.service';

describe('SequentialFilterService', () => {
  let service: SequentialFilterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SequentialFilterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create filter for simple variant', () => {
    const entityParts = ['name'];
    const filterParts = ['Bob'];

    const resultFilter = service.generate('contains', entityParts, filterParts);
    expect(resultFilter).toEqual({
      name: {
        contains: 'Bob',
      },
    });
  });

  it('should create filter for simple variant and cut entity parts if necessary', () => {
    const entityParts = ['name', 'surname'];
    const filterParts = ['Bob'];

    const resultFilter = service.generate('contains', entityParts, filterParts);
    expect(resultFilter).toEqual({
      name: {
        contains: 'Bob',
      },
    });
  });

  it('should create filter for two fields variant', () => {
    const entityParts = ['name', 'surname'];
    const filterParts = ['Bob', 'Doe'];

    const resultFilter = service.generate('contains', entityParts, filterParts);
    expect(resultFilter).toEqual({
      name: {
        contains: 'Bob',
      },
      surname: {
        contains: 'Doe',
      },
    });
  });

  it('should create filter for simple variant with two filter parts and cut if necessary', () => {
    const entityParts = ['name'];
    const filterParts = ['Bob', 'Doe'];

    const resultFilter = service.generate('contains', entityParts, filterParts);
    expect(resultFilter).toEqual({
      name: {
        contains: 'Bob',
      },
    });
  });

  it('should create filter for 3 field varian', () => {
    const entityParts = ['name', 'surname', 'middleName'];
    const filterParts = ['Bob', 'Doe', 'Bond'];

    const resultFilter = service.generate('contains', entityParts, filterParts);
    expect(resultFilter).toEqual({
      name: {
        contains: 'Bob',
      },
      surname: {
        contains: 'Doe',
      },
      middleName: {
        contains: 'Bond',
      },
    });
  });

  it('should empty filter if filter parts are empty', () => {
    const entityParts = ['name', 'surname', 'middleName'];
    const filterParts: string[] = [];

    const resultFilter = service.generate('contains', entityParts, filterParts);
    expect(resultFilter).toEqual(undefined);
  });

  it('should empty filter if entity parts are empty', () => {
    const entityParts: string[] = [];
    const filterParts = ['Bob', 'Doe', 'Bond'];

    const resultFilter = service.generate('contains', entityParts, filterParts);
    expect(resultFilter).toEqual(undefined);
  });
});
