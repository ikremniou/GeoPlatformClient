import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable } from 'rxjs';
import { DataService } from 'src/app/misc/service/data-service';
import { WorkerCategory } from 'src/app/models/worker-category/worker-category.model';
import { BaseQLService } from '../../apollo/base-ql.service';

const GetWorkerCategories = gql`
  query GetAll($filter: String, $skip: Int, $take: Int) {
    workerCategories(filter: $filter, skip: $skip, take: $take) {
      id
      name
    }
  }
`;

const RemoveWorkerCategory = gql`
  mutation Remove($categoryId: Int!) {
    removeWorkerCategory(id: $categoryId) {
      id
      name
    }
  }
`;

const AddWorkerCategory = gql`
  mutation Add($category: CreateWorkerCategoryInput!) {
    createWorkerCategory(createWorkerCategoryInput: $category) {
      id
      name
    }
  }
`;

const UpdateWorkerCategory = gql`
  mutation Update($category: UpdateWorkerCategoryInput!) {
    updateWorkerCategory(updateWorkerCategoryInput: $category) {
      id
      name
    }
  }
`;

@Injectable({
  providedIn: 'root',
})
export class WorkerCategoryService extends BaseQLService implements DataService<WorkerCategory> {
  constructor(apollo: Apollo) {
    super(apollo);
  }

  public getAll(filter?: any, skip?: number, take?: number): Observable<WorkerCategory[]> {
    if (filter) {
      filter = JSON.stringify(filter);
    }

    return this.baseGetAll(WorkerCategory, GetWorkerCategories, {
      filter,
      skip,
      take,
    });
  }

  public add(entity: WorkerCategory): Observable<WorkerCategory> {
    return this.baseAdd(WorkerCategory, AddWorkerCategory, { category: entity });
  }

  public patch(entity: WorkerCategory): Observable<WorkerCategory> {
    return this.basePatch(WorkerCategory, UpdateWorkerCategory, { category: entity });
  }

  public delete(entity: WorkerCategory): Observable<WorkerCategory> {
    return this.baseDelete(WorkerCategory, RemoveWorkerCategory, { categoryId: entity.id });
  }
}
