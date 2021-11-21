import { Injectable } from '@angular/core';
import { FilterType } from '../filter-aggregator.service';

@Injectable({
  providedIn: 'root',
})
export class SequentialFilterService {
  constructor() {}

  public generate(filterType: FilterType, entityParts: string[], filterParts: string[]): object | undefined {
    if (entityParts.length === 0) {
      return undefined;
    }
    if (filterParts.length === 0) {
      return undefined;
    }

    const resultFilter: any = {};
    for (let entityPartIndex = 0; entityPartIndex < entityParts.length; entityPartIndex++) {
      const entityName = entityParts[entityPartIndex];
      const filterPart = filterParts[entityPartIndex];
      if (filterPart) {
        resultFilter[entityName] = {
          [filterType]: filterPart,
        };
      }
    }

    return resultFilter;
  }
}
