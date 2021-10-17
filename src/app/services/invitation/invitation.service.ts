import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { plainToClass } from 'class-transformer';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Invitation } from 'src/app/models/invitation.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class InvitationService {
  private readonly _invitePath = `${environment.apiBase}/invite`;

  constructor(private readonly _http: HttpClient) {}

  public getAll(): Observable<Invitation[]> {
    return this._http
      .get(this._invitePath)
      .pipe(map((invitation: any) => plainToClass<Invitation, any[]>(Invitation, invitation)));
  }
}
