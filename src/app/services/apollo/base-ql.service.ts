import { ApolloQueryResult, DocumentNode, FetchResult, OperationVariables } from '@apollo/client';
import { Apollo } from 'apollo-angular';
import { ClassConstructor, plainToClass } from 'class-transformer';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export class BaseQlService {
  constructor(private readonly _apollo: Apollo) {}
  protected baseAdd<T>(
    ctor: ClassConstructor<T>,
    mutation: DocumentNode,
    variables?: OperationVariables,
  ): Observable<T> {
    return this._apollo
      .mutate({
        mutation,
        variables,
      })
      .pipe(
        map((fetchResult: FetchResult<any>) => {
          return plainToClass(ctor, Object.values(fetchResult.data)[0] as T);
        }),
      );
  }

  protected basePatch<T>(
    ctor: ClassConstructor<T>,
    mutation: DocumentNode,
    variables?: OperationVariables,
  ): Observable<T> {
    return this._apollo
      .mutate({
        mutation,
        variables,
      })
      .pipe(
        map((fetchResult: FetchResult<any>) => {
          return plainToClass(ctor, Object.values(fetchResult.data)[0] as T);
        }),
      );
  }

  protected baseGetAll<T>(
    ctor: ClassConstructor<T>,
    query: DocumentNode,
    variables?: OperationVariables,
  ): Observable<T[]> {
    return this._apollo
      .query({
        query,
        variables,
      })
      .pipe(
        map((queryResult: ApolloQueryResult<any>) => {
          return plainToClass(ctor, Object.values(queryResult.data)[0] as T[]);
        }),
      );
  }

  protected baseDelete<T>(
    ctor: ClassConstructor<T>,
    mutation: DocumentNode,
    variables?: OperationVariables,
  ): Observable<T> {
    return this._apollo
      .mutate({
        mutation,
        variables 
      })
      .pipe(
        map((fetchResult: FetchResult<any>) => {
          return plainToClass(ctor, Object.values(fetchResult.data)[0] as T);
        }),
      );
  }
}
