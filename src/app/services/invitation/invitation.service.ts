import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { plainToClass } from 'class-transformer';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Invite } from 'src/app/models/invite/invitation.model';
import { environment } from 'src/environments/environment';
import { DataService } from 'src/app/misc/service/data-service';

@Injectable({
  providedIn: 'root',
})
export class InvitationService implements DataService<Invite> {
  private readonly _invitePath = `${environment.apiBase}/invite`;

  constructor(private readonly _http: HttpClient) {}

  public getAll(): Observable<Invite[]> {
    return this._http
      .get(this._invitePath)
      .pipe(map((invitation: any) => plainToClass<Invite, any[]>(Invite, invitation)));
  }

  public add(entity: Invite): Observable<Invite> {
    return this._http
      .post(this._invitePath, entity)
      .pipe(map((invitation: any) => plainToClass(Invite, invitation)));
  }
}
