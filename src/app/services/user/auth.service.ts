import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/internal/operators';
import * as JwtDecode from 'jwt-decode';
import { PasswordTokenModel } from 'src/app/models/auth/password-token.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly _passwordTokenEndpoint = environment.serviceUrl + '/api/passwordToken';
  private readonly _assessTokenKey = 'access_token';
  private _applicationToken: string;

  constructor(private readonly _http: HttpClient) { }

  public logInPassword(userName: string, password: string): Observable<void> {
    const requestFormData = new FormData();
    requestFormData.append('username', userName);
    requestFormData.append('password', password);
    return this._http.post<{ access_token: string }>(this._passwordTokenEndpoint,
      requestFormData).pipe(map(rawToken => {
        this._applicationToken = rawToken.access_token;
        localStorage.setItem(this._assessTokenKey, this._applicationToken);
      }));
  }

  public logOut() {
    this._applicationToken = undefined;
    localStorage.removeItem(this._assessTokenKey);
  }

  public getAccessToken(): string {
    if (!this._applicationToken) {
      this._applicationToken = localStorage.getItem(this._applicationToken);
    }
    return this._applicationToken;
  }

  public isSessionAlive(): boolean {
    const appToken = this.getAccessToken();
    if (appToken) {
      const decodedToken = JwtDecode<PasswordTokenModel>(appToken);
      // check exp time
      return true;
    }
    return false;
  }
}
