import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { plainToClass } from 'class-transformer';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Invitation } from 'src/app/models/invite/invitation.model';
import { environment } from 'src/environments/environment';
import { DataService } from 'src/app/misc/service/data-service';

@Injectable({
  providedIn: 'root',
})
export class InvitationService implements DataService<Invitation> {
  private readonly _invitePath = `${environment.apiBase}/invite`;

  constructor(private readonly _http: HttpClient) {}

  public getAll(): Observable<Invitation[]> {
    return this._http
      .get(this._invitePath)
      .pipe(map((invitation: any) => plainToClass<Invitation, any[]>(Invitation, invitation)));
  }

  public add(entity: Invitation): Observable<Invitation> {
    return this._http
      .post(this._invitePath, entity)
      .pipe(map((invitation: any) => plainToClass(Invitation, invitation)));
  }
}
