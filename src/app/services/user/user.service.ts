import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { plainToClass } from 'class-transformer';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DataService } from 'src/app/misc/service/data-service';
import { CreateUserModel } from 'src/app/models/user/create-user.model';
import { User } from 'src/app/models/user/user.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService implements DataService<User, CreateUserModel> {
  private readonly _usersPath = `${environment.apiBase}/users`;

  constructor(private readonly _http: HttpClient) {}

  public getAll(limit?: number): Observable<User[]> {
    return this._http.get(this._usersPath).pipe(map((users: any) => plainToClass<User, any[]>(User, users)));
  }

  public patch(model: User): Observable<User> {
    return this._http
      .patch(`${this._usersPath}/${model.id}`, model)
      .pipe(map((user: any) => plainToClass(User, user)));
  }

  public add(model: CreateUserModel): Observable<User> {
    return this._http.post(this._usersPath, model).pipe(map((user: any) => plainToClass(User, user)));
  }
}
