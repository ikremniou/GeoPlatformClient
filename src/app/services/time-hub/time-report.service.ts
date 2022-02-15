import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable } from 'rxjs';
import { DataService } from 'src/app/misc/service/data-service';
import { CreateTimeReport } from 'src/app/models/time-report/create-time-report.model';
import { TimeReport } from 'src/app/models/time-report/time-report.model';
import { UpdateTimeReport } from 'src/app/models/time-report/update-time-report.model';
import { BaseQlService } from '../apollo/base-ql.service';

const GetAll = gql`
  query GetAll($filter: String, $skip: Int, $take: Int) {
    timeReports(filter: $filter, skip: $skip, take: $take) {
      id
      date
    }
  }
`;

const Delete = gql`
  mutation Remove($entityId: Int!) {
    removeTimeReport(id: $entityId) {
      id
      date
    }
  }
`;

const Add = gql`
  mutation Add($entity: CreateTimeReportInput!) {
    createTimeReport(createTimeReportInput: $entity) {
      id
      date
    }
  }
`;

const Patch = gql`
  mutation Update($entity: UpdateTimeReportInput!) {
    updateTimeReport(updateTimeReportInput: $entity) {
      id
      date
    }
  }
`;

@Injectable({
  providedIn: 'root',
})
export class TimeReportService
  extends BaseQlService
  implements DataService<TimeReport, CreateTimeReport, UpdateTimeReport>
{
  constructor(apollo: Apollo) {
    super(apollo);
  }

  public getAll(filter?: any, skip?: number, take?: number): Observable<TimeReport[]> {
    return this.baseGetAll(TimeReport, GetAll, { filter, skip, take });
  }
  public add(entity: CreateTimeReport): Observable<TimeReport> {
    return this.baseAdd(TimeReport, Add, { entity });
  }
  public patch(entity: UpdateTimeReport): Observable<TimeReport> {
    return this.basePatch(TimeReport, Patch, { entity });
  }
  public delete(entity: TimeReport): Observable<TimeReport> {
    return this.baseDelete(TimeReport, Delete, { entityId: entity.id });
  }
}
