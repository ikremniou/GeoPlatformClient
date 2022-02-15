import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable } from 'rxjs';
import { DataService } from 'src/app/misc/service/data-service';
import { Activity } from 'src/app/models/activity/activity.model';
import { CreateActivity } from 'src/app/models/activity/create-activity.model';
import { UpdateActivity } from 'src/app/models/activity/update-activity.model';
import { BaseQlService } from '../../apollo/base-ql.service';

const GetAll = gql`
  query GetAll($filter: String, $skip: Int, $take: Int) {
    activities(filter: $filter, skip: $skip, take: $take) {
      id
      summary
      description
      project {
        id
        summary
      }
    }
  }
`;

const Delete = gql`
  mutation Remove($entityId: Int!) {
    removeActivity(id: $entityId) {
      id
      summary
      description
      project {
        id
        summary
      }
    }
  }
`;

const Add = gql`
  mutation Add($entity: CreateActivityInput!) {
    createActivity(createActivityInput: $entity) {
      id
      summary
      description
      project {
        id
        summary
      }
    }
  }
`;

const Patch = gql`
  mutation Update($entity: UpdateActivityInput!) {
    updateActivity(updateActivityInput: $entity) {
      id
      summary
      description
      project {
        id
        summary
      }
    }
  }
`;

@Injectable({
  providedIn: 'root',
})
export class ActivityService extends BaseQlService implements DataService<Activity, CreateActivity, UpdateActivity> {
  constructor(apollo: Apollo) {
    super(apollo);
  }

  public getAll(filter?: any, skip?: number, take?: number): Observable<Activity[]> {
    return this.baseGetAll(Activity, GetAll, { filter, skip, take });
  }
  public add(entity: CreateActivity): Observable<Activity> {
    return this.baseAdd(Activity, Add, { entity });
  }
  public patch(entity: UpdateActivity): Observable<Activity> {
    return this.basePatch(Activity, Patch, { entity });
  }
  public delete(entity: Activity): Observable<Activity> {
    return this.baseDelete(Activity, Delete, { entityId: entity.id });
  }
}
