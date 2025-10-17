import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, timer, Subscription } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { envrioment } from '../enviroment/enviroment';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private tokenUrl=envrioment.authUrl; 
  private readonly TOKEN_KEY = 'authToken';

  private tokenRefreshSubscription: Subscription | null = null;

  constructor(private http: HttpClient, private router: Router) {
    this.initializeAuthState();
  }

  private initializeAuthState(): void {
    if (this.isLoggedIn()) {
      this.startTokenRefresh();
    }
  }

  login(username: string, password: string): Observable<boolean> {
    this.stopTokenRefresh();
    return this.http.post<any>(this.tokenUrl, { username, password }).pipe(
      tap(response => {
        if (response && response.token) {
          this.storeToken(response.token);
          this.startTokenRefresh();
         
        }
      }),
      map(response => !!(response && response.token)),
      catchError(() => of(false))
    );
  }

  logout(): void {
    sessionStorage.removeItem(this.TOKEN_KEY);
    this.stopTokenRefresh();
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
   
    return !!sessionStorage.getItem(this.TOKEN_KEY);

  }

  getToken(): string | null {
 
    return sessionStorage.getItem(this.TOKEN_KEY);
  }

  getAuthHeader(): string | null {
    const token = this.getToken();
    return token ? `Bearer ${token}` : null;
  }

  private storeToken(token: string): void {
    sessionStorage.setItem(this.TOKEN_KEY,token);

  }

  private startTokenRefresh(): void {
    const refreshInterval = 25 * 1000;
    this.stopTokenRefresh();
    this.tokenRefreshSubscription = timer(refreshInterval, refreshInterval)
      .pipe(
        switchMap(() => this.refreshToken())
      )
      .subscribe();
  }

  private stopTokenRefresh(): void {
    if (this.tokenRefreshSubscription) {
      this.tokenRefreshSubscription.unsubscribe();
      this.tokenRefreshSubscription = null;
    }
  }

  // private refreshToken(): Observable<any> {
  //   return this.http.post<any>(this.tokenUrl, {}).pipe(
  //     tap(response => {
  //       if (response && response.token) {
  //         console.log('Token refreshed successfully.');
  //         this.storeToken(response.token);
  //       }
  //     }),
  //     catchError(() => {
  //       console.error('Token refresh failed. Logging out.');
  //       this.logout();
  //       return of(null);
  //     })
  //   );
  // }
  private refreshToken(): Observable<any> {
  const headers = { Authorization: this.getAuthHeader()! };
  return this.http.post<any>('http://localhost:8080/auth/refresh', {}, { headers }).pipe(
    tap(response => {
      if (response && response.token) {
        console.log('Token refreshed successfully.');
        this.storeToken(response.token);
      }
    }),
    catchError(() => {
      console.error('Token refresh failed. Logging out.');
      this.logout();
      return of(null);
    })
  );
}

}
