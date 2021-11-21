import { Injectable } from '@angular/core';
import { SequentialFilterService } from './sequential/sequential-filter.service';

export type FilterType = 'contains';

export type FilterStrategy = 'sequence';

@Injectable({
  providedIn: 'root',
})
export class FilterAggregatorService {
  constructor(private readonly sequential: SequentialFilterService) {}

  public generateForSequence(filterType: FilterType, entityParts: string[], filterParts: string[]): object | undefined {
    return this.sequential.generate(filterType, entityParts, filterParts);
  }

  public getFilter(
    strategy: FilterStrategy,
    filterType: FilterType,
    entityParts: string[],
    filterParts: string[],
  ): object | undefined {
    switch (strategy) {
      case 'sequence':
        return this.generateForSequence(filterType, entityParts, filterParts);
    }
  }
}
