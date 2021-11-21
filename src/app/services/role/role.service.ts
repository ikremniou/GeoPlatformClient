import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { plainToClass } from 'class-transformer';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DataService } from 'src/app/misc/service/data-service';
import { Role } from 'src/app/models/role.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RoleService implements DataService<Role> {
  private readonly _path = `${environment.apiBase}/roles`;
  constructor(private readonly _http: HttpClient) { }

  public getAll(filter?: any, skip?: number, take?: number): Observable<Role[]> {
    return this._http.get(this._path).pipe(map((roles: any) => plainToClass<Role, any[]>(Role, roles)))
  }
}
