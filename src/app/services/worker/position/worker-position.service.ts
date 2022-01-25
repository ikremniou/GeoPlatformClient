import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable } from 'rxjs';
import { DataService } from 'src/app/misc/service/data-service';
import { WorkerPosition } from 'src/app/models/worker-position/worker-position.model';
import { BaseQLService } from '../../apollo/base-ql.service';

const GetWorkerPositions = gql`
  query GetAll($filter: String, $skip: Int, $take: Int) {
    workerPositions(filter: $filter, skip: $skip, take: $take) {
      id
      name
      baseSalary
    }
  }
`;

const DeleteWorkerPosition = gql`
  mutation Remove($positionId: Int!) {
    removeWorkerPosition(id: $positionId) {
      id
      name
      baseSalary
    }
  }
`;

const AddWorkerPosition = gql`
  mutation Add($position: CreateWorkerPositionInput!) {
    createWorkerPosition(createWorkerPositionInput: $position) {
      id
      name
      baseSalary
    }
  }
`;

const PatchWorkerPosition = gql`
  mutation Update($position: UpdateWorkerPositionInput!) {
    updateWorkerPosition(updateWorkerPositionInput: $position) {
      id
      name
      baseSalary
    }
  }
`;

@Injectable({
  providedIn: 'root',
})
export class WorkerPositionService extends BaseQLService implements DataService<WorkerPosition> {
  constructor(apollo: Apollo) {
    super(apollo);
  }

  public getAll(filter?: any, skip?: number, take?: number): Observable<WorkerPosition[]> {
    if (filter) {
      filter = JSON.stringify(filter);
    }

    return this.baseGetAll(WorkerPosition, GetWorkerPositions, { filter, skip, take });
  }

  public add?(position: WorkerPosition): Observable<WorkerPosition> {
    return this.baseAdd(WorkerPosition, AddWorkerPosition, { position });
  }

  public patch?(position: WorkerPosition): Observable<WorkerPosition> {
    return this.basePatch(WorkerPosition, PatchWorkerPosition, { position });
  }

  public delete?(position: WorkerPosition): Observable<WorkerPosition> {
    return this.baseDelete(WorkerPosition, DeleteWorkerPosition, { positionId: position.id });
  }
}
