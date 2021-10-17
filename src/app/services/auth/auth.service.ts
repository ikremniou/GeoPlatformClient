import { HttpClient, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { catchError, map } from 'rxjs/operators';

interface AccessObject {
  access_token: string;
  token_type: 'bearer';
}

interface PlatformToken {
  exp: number,
  iat: number,
  roleId: number,
  userId: number,
  username: string,
  value: string
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public on = {
    logIn: new Subject<void>()
  }
  private _localPlatformToken?: PlatformToken;
  private readonly _localTokenKey = 'vggpToken'
  private readonly _authPath = environment.apiBase + '/auth/';

  constructor(private readonly _http: HttpClient) {}

  public loginUserLocal(username: string, password: string): Observable<void> {
    return this._http.post(`${this._authPath}local`, { username, password }).pipe(
      catchError((httpResponse) => {
        if (httpResponse.status === HttpStatusCode.Unauthorized) {
          return throwError(new Error(httpResponse.error.message));
        }
        return throwError(httpResponse);
      }),
      map((responseObject) => {
        const accessObject = responseObject as AccessObject;
        const platformToken = this.extractJwtPayload(accessObject.access_token);
        if (platformToken) {
          this._localPlatformToken = platformToken;
          localStorage.setItem(this._localTokenKey, accessObject.access_token);
        }
        this.on.logIn.next();
      }),
    );
  }

  public isLoggedIn(): boolean {
    if (this._localPlatformToken) {
      if (this._localPlatformToken.exp * 1000 < Date.now()) {
        return false;
      }
      return true;
    }

    const storedToken = localStorage.getItem(this._localTokenKey);
    if (storedToken) {
      const tokenObject = this.extractJwtPayload(storedToken);
      if (!tokenObject || tokenObject.exp * 1000 < Date.now()) {
        return false;
      }
      this._localPlatformToken = tokenObject;
      return true;
    }
    return false;
  }

  public getToken(): string | undefined {
    return this._localPlatformToken?.value;
  }

  public logout(): void {
    this._localPlatformToken = undefined;
    localStorage.setItem(this._localTokenKey, '');
  }

  private extractJwtPayload(token: string): PlatformToken | undefined {
    try {
      const decodedPayload = JSON.parse(atob(token.split('.')[1]));
      return { value: token, ...decodedPayload };
    } catch (e) {
      return undefined;
    }
  }
}
