import { Component, ContentChild, Input, OnInit, TemplateRef } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { debounce, debounceTime, filter, map, tap, throttle } from 'rxjs/operators';
import { DataService } from 'src/app/misc/service/data-service';
import {
  FilterAggregatorService,
  FilterStrategy,
  FilterType,
} from 'src/app/services/filtering/filter-aggregator.service';

@Component({
  selector: 'app-entity-select',
  templateUrl: './entity-select.component.html',
  styleUrls: ['./entity-select.component.sass'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: EntitySelectComponent,
    },
  ],
})
export class EntitySelectComponent<EntityType> implements OnInit, ControlValueAccessor {
  public isLoading = false;
  @ContentChild(TemplateRef) templateRef!: TemplateRef<any>;
  @Input('dataService')
  public dataService!: DataService<EntityType>;
  @Input('displayWith')
  public displayWith!: (value: EntityType) => string;
  @Input('label')
  public label?: string;
  @Input('filterStrategy')
  public filterStrategy: FilterStrategy = 'sequence';
  @Input('filterType')
  public filterType: FilterType = 'contains';
  @Input('entityParts')
  public entityParts: string[] = [];
  public entitySelected?: (entityType: EntityType) => void;

  public entityControl: FormControl;
  public entities: Array<EntityType> = [];

  constructor(private readonly filterService: FilterAggregatorService) {
    this.entityControl = new FormControl();
    const cancelToken = new Subject<boolean>();
    this.entityControl.valueChanges
      .pipe(
        tap((input) => {
          this.entities = [];
          this.isLoading = true;
          if (input && typeof input !== 'string') {
            this.entitySelected?.(input);
          }
        }),
        filter((input) => typeof input === 'string' || input === null),
        debounceTime(500),
      )
      .subscribe((filterInput) => {
        this.filterEntities(filterInput).subscribe((filteredEntities) => {
          this.entities = filteredEntities;
          this.isLoading = false;
        });
      });
  }

  public writeValue(obj: any): void {
    this.entityControl.setValue(obj);
  }
  public registerOnChange(fn: any): void {
    this.entitySelected = fn;
    this.entityControl.registerOnChange(fn);
  }
  public registerOnTouched(fn: any): void {}

  public setDisabledState(disabled: boolean): void {}

  public async ngOnInit(): Promise<void> {
    // const entities = await this.dataService.getAll().toPromise();
    // this.entities = entities;
  }

  private filterEntities(filterInput: string): Observable<EntityType[]> {
    if (filterInput) {
      const filterParts = filterInput.split(' ');
      const filter = this.filterService.getFilter(this.filterStrategy, this.filterType, this.entityParts, filterParts);
      return this.dataService.getAll(filter);
    }
    return this.dataService.getAll();
  }
}
