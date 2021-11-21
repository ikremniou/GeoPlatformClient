import { Observable } from 'rxjs';

export interface DataService<EntityModel, CreateEntityModel = EntityModel, UpdateEntityModel = EntityModel> {
  getAll(filter?: any, skip?: number, take?: number): Observable<EntityModel[]>;
  add?(entity: CreateEntityModel): Observable<EntityModel>;
  patch?(entity: UpdateEntityModel): Observable<EntityModel>;
  delete?(entity: EntityModel): Observable<EntityModel>;
}
