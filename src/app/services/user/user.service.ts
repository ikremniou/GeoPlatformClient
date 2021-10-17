import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { plainToClass } from 'class-transformer';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DataService } from 'src/app/misc/service/data-service';
import { UserModel } from 'src/app/models/user.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService implements DataService<UserModel> {
  private readonly _usersPath = `${environment.apiBase}/users`;

  constructor(private readonly _http: HttpClient) {}

  public getAll(limit?: number): Observable<UserModel[]> {
    return this._http.get(this._usersPath).pipe(map((users: any) => plainToClass<UserModel, any[]>(UserModel, users)));
  }

  public patch(model: UserModel): Observable<UserModel> {
    return this._http
      .patch(`${this._usersPath}/${model.id}`, model)
      .pipe(map((user: any) => plainToClass(UserModel, user)));
  }
}
