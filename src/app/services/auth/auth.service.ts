import { HttpClient, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { catchError, map } from 'rxjs/operators';
import { Claim } from 'src/app/models/claim.model';
import { PlatformAbilityService } from '../ability/platform-ability.service';

interface AccessObject {
  access_token: string;
  token_type: 'bearer';
  claims: Claim[];
}

interface PlatformToken {
  exp: number;
  iat: number;
  roleId: number;
  userId: number;
  username: string;
  value: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public on = {
    logInStatusChanged: new BehaviorSubject<boolean>(false),
  };
  private _platformToken?: PlatformToken;
  private readonly _localTokenKey = 'vggpToken';
  private readonly _authPath = environment.apiBase + '/auth/';

  constructor(private readonly _ability: PlatformAbilityService, private readonly _http: HttpClient) {
    this.trySignInFromLocalStorage();
  }

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
          this._platformToken = platformToken;
          localStorage.setItem(this._localTokenKey, accessObject.access_token);
        }

        this._ability.save(accessObject.claims);
        this.on.logInStatusChanged.next(true);
      }),
    );
  }

  public isLoggedIn(): boolean {
    if (this._platformToken) {
      if (this._platformToken.exp * 1000 < Date.now()) {
        return false;
      }
      return true;
    }
    return false;
  }

  public getToken(): string | undefined {
    return this._platformToken?.value;
  }

  public logout(): void {
    this._platformToken = undefined;
    localStorage.setItem(this._localTokenKey, '');
    this._ability.reset();
    this.on.logInStatusChanged.next(false);
  }

  private extractJwtPayload(token: string): PlatformToken | undefined {
    try {
      const decodedPayload = JSON.parse(atob(token.split('.')[1]));
      return { value: token, ...decodedPayload };
    } catch (e) {
      return undefined;
    }
  }

  private trySignInFromLocalStorage(): void {
    const storedToken = localStorage.getItem(this._localTokenKey);
    if (storedToken) {
      const tokenObject = this.extractJwtPayload(storedToken);
      if (!tokenObject || tokenObject.exp * 1000 < Date.now()) {
        return;
      }
      this._platformToken = tokenObject;
      this._ability.load();
      this.on.logInStatusChanged.next(true);
    }
  }
}
