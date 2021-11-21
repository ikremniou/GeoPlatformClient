import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { plainToClass } from 'class-transformer';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DataService } from 'src/app/misc/service/data-service';
import { Claim } from 'src/app/models/claim.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClaimService implements DataService<Claim> {
  private readonly _path = `${environment.apiBase}/claims`;

  constructor(private readonly _http: HttpClient) { }
  getAll(filter?: any, skip?: number, take?: number): Observable<Claim[]> {
    return this._http.get(this._path).pipe(map((claims: any) => plainToClass<Claim, any[]>(Claim, claims)));
  }
}
