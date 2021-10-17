import { Injectable } from '@angular/core';
import { ApolloQueryResult, FetchResult } from '@apollo/client';
import { Apollo, gql } from 'apollo-angular';
import { plainToClass } from 'class-transformer';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DataService } from 'src/app/misc/service/data-service';
import { Worker } from 'src/app/models/worker.model';

const GetWorkers = gql`
  query Worker_GetAll {
    workers {
      id
      firstName
      middleName
      lastName
    }
  }
`;

const RemoveWorker = gql`
  mutation Remove_Worker($workerId: Int!) {
    removeWorker(id: $workerId) {
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
export class WorkerService implements DataService<Worker> {
  constructor(private readonly _apollo: Apollo) {}
  public getAll(limit?: number): Observable<Worker[]> {
    return this._apollo
      .query({
        query: GetWorkers,
      })
      .pipe(
        map((queryResult: ApolloQueryResult<any>) => {
          return plainToClass<Worker, any[]>(Worker, queryResult.data.workers);
        }),
      );
  }

  public delete(entity: Worker): Observable<Worker> {
    return this._apollo
      .mutate({
        mutation: RemoveWorker,
        variables: {
          workerId: entity.id
        } 
      })
      .pipe(
        map((fetchRequest: FetchResult<any>) => {
          return plainToClass(Worker, fetchRequest.data.removeWorker);
        }),
      );
  }
}
