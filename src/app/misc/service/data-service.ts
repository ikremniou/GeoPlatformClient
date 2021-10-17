import { Observable } from 'rxjs';

export interface DataService<EntityModel> {
  getAll(limit?: number): Observable<EntityModel[]>;
  add?(entity: EntityModel): Observable<EntityModel>;
  patch?(entity: EntityModel): Observable<EntityModel>;
  delete?(entity: EntityModel): Observable<EntityModel>;
}
