import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable } from 'rxjs';
import { DataService } from 'src/app/misc/service/data-service';
import { Worker } from 'src/app/models/worker.model';
import { BaseQLService } from '../apollo/base-ql.service';

const GetWorkers = gql`
  query GetAll($filter: String, $skip: Int, $take: Int) {
    workers(filter: $filter, skip: $skip, take: $take) {
      id
      firstName
      middleName
      lastName
    }
  }
`;

const RemoveWorker = gql`
  mutation Worker($workerId: Int!) {
    removeWorker(id: $workerId) {
      id
      firstName
      middleName
      lastName
    }
  }
`;

const AddWorker = gql`
  mutation Worker($worker: CreateWorkerInput!) {
    createWorker(createWorkerInput: $worker) {
      id
      firstName
      middleName
      lastName
    }
  }
`;

const UpdateWorker = gql`
  mutation Update_Worker($worker: UpdateWorkerInput!) {
    updateWorker(updateWorkerInput: $worker) {
      id
      firstName
      middleName
      lastName
    }
  }
`;

@Injectable({
  providedIn: 'root',
})
export class WorkerService extends BaseQLService implements DataService<Worker> {
  constructor(apollo: Apollo) {
    super(apollo);
  }

  public add(worker: Worker): Observable<Worker> {
    return this.baseAdd(Worker, AddWorker, { worker });
  }

  public patch(worker: Worker): Observable<Worker> {
    return this.basePatch(Worker, UpdateWorker, { worker });
  }

  public getAll(filter?: any, skip?: number, take?: number): Observable<Worker[]> {
    if (filter) {
      filter = JSON.stringify(filter);
    }

    return this.baseGetAll(Worker, GetWorkers, { filter, skip, take });
  }

  public delete(worker: Worker): Observable<Worker> {
    return this.baseDelete(Worker, RemoveWorker, { workerId: worker.id });
  }
}
