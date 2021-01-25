import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';

import { RegisterForm } from '../interfaces/register-form.interface';
import { LoginForm } from '../interfaces/login-form.interface';

import { Observable, of } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { promise } from 'protractor';
import { rejects } from 'assert';

const base_url = environment.base_ulr;
declare const gapi: any;

@Injectable({
  providedIn: 'root',
})
export class UserService {

  public auth2: any;

  constructor(private http: HttpClient,
              private router: Router,
              private ngZone: NgZone) {
                this.googleInit()
              }

    googleInit() {

      return new Promise<void>( resolve => {
        gapi.load('auth2', () => {
          // Retrieve the singleton for the GoogleAuth library and set up the client.
          this.auth2 = gapi.auth2.init({
            client_id:
              '718356833614-mhn2cgu7o4vgilcord67kmha53n7s35m.apps.googleusercontent.com',
            cookiepolicy: 'single_host_origin',
            // Request scopes in addition to 'profile' and 'email'
            //scope: 'additional_scope'
          });
          resolve();
        });
      });
    }

  logOut() {
    localStorage.removeItem('token');

    this.auth2.signOut().then( () => {
      this.ngZone.run( () => {
        this.router.navigateByUrl('/login');
      })
    });
  }

  validateToken(): Observable<boolean> {
    const token = localStorage.getItem('token') || '';

    return this.http
      .get(`${base_url}/auth/renew`, {
        headers: {
          'x-token': token,
        },
      })
      .pipe(
        tap((res: any) => {
          localStorage.setItem('token', res.token);
        }),
        map((res) => true),
        catchError((error) => of(false)) // * return a new observable
      );
  }

  createUser(formData: RegisterForm): Observable<RegisterForm> {
    return this.http.post<RegisterForm>(`${base_url}/users`, formData).pipe(
      tap((res: any) => {
        localStorage.setItem('token', res.token);
      })
    );
  }

  login(formData: RegisterForm): Observable<LoginForm> {
    return this.http.post<LoginForm>(`${base_url}/auth/login`, formData).pipe(
      tap((res: any) => {
        localStorage.setItem('token', res.token);
      })
    );
  }

  loginGoogle(token) {
    return this.http.post(`${base_url}/auth/google`, { token }).pipe(
      tap((res: any) => {
        localStorage.setItem('token', res.token);
      })
    );
  }
}
