import { Observable, BehaviorSubject, Subject, Subscription, Subscribable } from 'rxjs';
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
  private readonly logOutSubject: Subject<void> = new Subject();
  private readonly logInSubject: Subject<void> = new Subject();
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
        this.logInSubject.next();
      }));
  }

  public logOut() {
    this._applicationToken = undefined;
    localStorage.removeItem(this._assessTokenKey);
    this.logOutSubject.next();
  }

  public getAccessToken(): string {
    if (!this._applicationToken) {
      this._applicationToken = localStorage.getItem(this._assessTokenKey);
    }
    return this._applicationToken;
  }

  public isTokenExpired(): boolean {
    const appToken = this.getAccessToken();
    if (appToken) {
      const decodedToken = JwtDecode<PasswordTokenModel>(appToken);
      if (decodedToken.exp * 1000 > Date.now()) {
        return false;
      }
    }
    return true;
  }

  public onUserLogIn(): Subscribable<void> {
    return this.logInSubject;
  }

  public onUserLogOut(): Subscribable<void> {
    return this.logOutSubject;
  }
}
