import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable } from 'rxjs';
import { DataService } from 'src/app/misc/service/data-service';
import { CreateProject } from 'src/app/models/projects/create-project.model';
import { Project } from 'src/app/models/projects/project.model';
import { UpdateProject } from 'src/app/models/projects/update-project.model';
import { BaseQlService } from '../../apollo/base-ql.service';

const GetAll = gql`
  query GetAll($filter: String, $skip: Int, $take: Int) {
    projects(filter: $filter, skip: $skip, take: $take) {
      id
      summary
      description
      startDate
      endDate
      client {
        id
        name
      }
      executor {
        id
        name
      }
      responsible {
        id
        firstName
        lastName
        middleName
      }
    }
  }
`;

const Delete = gql`
  mutation Remove($projectId: Int!) {
    removeProject(id: $projectId) {
      id
      summary
      description
      startDate
      endDate
      client {
        id
        name
      }
      executor {
        id
        name
      }
      responsible {
        id
        firstName
        lastName
        middleName
      }
    }
  }
`;

const Add = gql`
  mutation Add($project: CreateProjectInput!) {
    createProject(createProjectInput: $project) {
      id
      summary
      description
      startDate
      endDate
      client {
        id
        name
      }
      executor {
        id
        name
      }
      responsible {
        id
        firstName
        lastName
        middleName
      }
    }
  }
`;

const Patch = gql`
  mutation Update($project: UpdateProjectInput!) {
    updateProject(updateProjectInput: $project) {
      id
      summary
      description
      startDate
      endDate
      client {
        id
        name
      }
      executor {
        id
        name
      }
      responsible {
        id
        firstName
        lastName
        middleName
      }
    }
  }
`;

@Injectable({
  providedIn: 'root',
})
export class ProjectService extends BaseQlService implements DataService<Project, CreateProject, UpdateProject> {
  constructor(apollo: Apollo) {
    super(apollo);
  }

  public getAll(filter?: any, skip?: number, take?: number): Observable<Project[]> {
    return this.baseGetAll(Project, GetAll, { filter, skip, take });
  }

  public add(project: CreateProject): Observable<Project> {
    return this.baseAdd(Project, Add, { project });
  }

  public patch(project: UpdateProject): Observable<Project> {
    return this.basePatch(Project, Patch, { project });
  }

  public delete(project: Project): Observable<Project> {
    return this.baseDelete(Project, Delete, { projectId: project.id });
  }
}
