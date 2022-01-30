import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable } from 'rxjs';
import { DataService } from 'src/app/misc/service/data-service';
import { WorkClient } from 'src/app/models/client/work-client.model';
import { BaseQlService } from '../../apollo/base-ql.service';

const GetAll = gql`
  query GetAll($filter: String, $skip: Int, $take: Int) {
    workClients(filter: $filter, skip: $skip, take: $take) {
      id
      name
      address
      contactPhone
      isActive
    }
  }
`;

const Delete = gql`
  mutation Remove($workClientId: Int!) {
    removeWorkClient(id: $workClientId) {
      id
      name
      address
      contactPhone
      isActive
    }
  }
`;

const Add = gql`
  mutation Add($workClient: CreateWorkClientInput!) {
    createWorkClient(createWorkClientInput: $workClient) {
      id
      name
      address
      contactPhone
      isActive
    }
  }
`;

const Patch = gql`
  mutation Update($workClient: UpdateWorkClientInput!) {
    updateWorkClient(updateWorkClientInput: $workClient) {
      id
      name
      address
      contactPhone
      isActive
    }
  }
`;

@Injectable({
  providedIn: 'root',
})
export class WorkClientService extends BaseQlService implements DataService<WorkClient> {
  constructor(apollo: Apollo) {
    super(apollo);
  }

  public getAll(filter?: any, skip?: number, take?: number): Observable<WorkClient[]> {
    return this.baseGetAll(WorkClient, GetAll, { filter, skip, take });
  }

  public add(workClient: WorkClient): Observable<WorkClient> {
    return this.baseAdd(WorkClient, Add, { workClient });
  }

  public delete(workClient: WorkClient): Observable<WorkClient> {
    return this.baseDelete(WorkClient, Delete, { workClientId: workClient.id });
  }

  public patch(workClient: WorkClient): Observable<WorkClient> {
    return this.basePatch(WorkClient, Patch, { workClient });
  }
}
