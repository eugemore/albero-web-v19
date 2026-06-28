import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { DateTime } from 'luxon';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LoginGQL, RegisterGQL } from '../../graphql/generated';

interface Credentials {
  email: string;
  password: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly loginGQL = inject(LoginGQL);
  private readonly registerGQL = inject(RegisterGQL);
  private readonly router = inject(Router);

  readonly loggedInSubject = new BehaviorSubject<boolean>(false);

  register(credentials: Credentials): Observable<string> {
    return this.registerGQL
      .mutate({ variables: { input: credentials } })
      .pipe(map(result => result.data?.register ?? ''));
  }

  login(credentials: Credentials): Observable<void> {
    return this.loginGQL.mutate({ variables: { input: credentials } }).pipe(
      map(result => {
        const auth = result.data?.login;
        if (auth) {
          this.setSession(auth.idToken, auth.expiresAt);
          this.loggedInSubject.next(true);
        }
      }),
    );
  }

  logout(): void {
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    this.loggedInSubject.next(false);
    this.router.navigateByUrl('/login');
  }

  isLoggedIn(): boolean {
    const loggedIn = DateTime.now() <= this.getExpiration();
    this.loggedInSubject.next(loggedIn);
    return loggedIn;
  }

  isLoggedOut(): boolean {
    return !this.isLoggedIn();
  }

  private setSession(idToken: string, expiresAt: number): void {
    localStorage.setItem('id_token', idToken);
    localStorage.setItem('expires_at', DateTime.fromMillis(expiresAt).toISO() ?? '');
  }

  private getExpiration(): DateTime {
    return DateTime.fromISO(localStorage.getItem('expires_at') ?? '');
  }
}