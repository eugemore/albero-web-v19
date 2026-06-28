import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { DateTime } from 'luxon';
import { BehaviorSubject, Observable, concat, of } from 'rxjs';
import { catchError, last, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

interface Credentials {
  email: string;
  password: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);

  readonly loggedInSubject = new BehaviorSubject<boolean>(false);

  signUp(user: Credentials): Observable<HttpResponse<unknown>> {
    return concat(
      this.http.post(`${environment.api}/signup`, user, { observe: 'response' }),
      this.login(user),
    ).pipe(
      last(),
      catchError(res => of(res)),
    );
  }

  login(user: Credentials): Observable<HttpResponse<unknown>> {
    return this.http
      .post(`${environment.api}/login`, user, { observe: 'response' })
      .pipe(
        tap(res => {
          this.setSession(res as HttpResponse<{ idToken: string; expiresAt: number }>);
          this.loggedInSubject.next(true);
        }),
        catchError(res => of(res)),
      );
  }

  private setSession(authResult: HttpResponse<{ idToken: string; expiresAt: number }>): void {
    if (authResult.status === 200 && authResult.body) {
      const expiresAt = DateTime.fromMillis(authResult.body.expiresAt);
      localStorage.setItem('id_token', authResult.body.idToken);
      localStorage.setItem('expires_at', expiresAt.toISO() ?? '');
    }
  }

  logout(): void {
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    this.loggedInSubject.next(false);
    this.router.navigateByUrl('/login');
  }

  isLoggedIn(): boolean {
    const isLoggedIn = DateTime.now() <= this.getExpiration();
    this.loggedInSubject.next(isLoggedIn);
    return isLoggedIn;
  }

  isLoggedOut(): boolean {
    return !this.isLoggedIn();
  }

  private getExpiration(): DateTime {
    const expiration = localStorage.getItem('expires_at') ?? '';
    return DateTime.fromISO(expiration);
  }
}