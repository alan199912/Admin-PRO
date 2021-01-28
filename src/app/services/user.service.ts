import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';

import { RegisterForm } from '../interfaces/register-form.interface';
import { LoginForm } from '../interfaces/login-form.interface';

import { Observable, of } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { User } from '../models/user.model';

const base_url = environment.base_ulr;
declare const gapi: any;

@Injectable({
  providedIn: 'root',
})
export class UserService {

  public auth2: any;
  public user: User;

  constructor(private http: HttpClient,
              private router: Router,
              private ngZone: NgZone) {
                this.googleInit()
              }

  // * token
  get token(): string {
    return localStorage.getItem('token') || '';
  }

  // * uid user
  get uid(): string {
    return this.user.id || '';
  }

  // * register with google
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

  // * close session
  logOut() {
    localStorage.removeItem('token');

    this.auth2.signOut().then( () => {
      this.ngZone.run( () => {
        this.router.navigateByUrl('/login');
      })
    });
  }

  // * validate token
  validateToken(): Observable<boolean> {
    return this.http
      .get(`${base_url}/auth/renew`, {
        headers: {
          'x-token': this.token,
        },
      })
      .pipe(
        map((res: any) => {
          console.log(res)
          const { name, email, google, role, img, _id } = res.user;

          this.user = new User(name, email, '', img, google, role, _id);

          localStorage.setItem('token', res.token);

          return true;
        }),
        catchError(() => of(false)) // * return a new observable
      );
  }

  // * register user
  createUser(formData: RegisterForm): Observable<RegisterForm> {
    return this.http.post<RegisterForm>(`${base_url}/users`, formData).pipe(
      tap((res: any) => {
        localStorage.setItem('token', res.token);
      })
    );
  }

  // * update user
  updateAccount(data: { email: string, name: string, role: string }) {

    data = {
      ...data,
      role: this.user.role
    }

    return this.http.put(`${base_url}/users/${this.uid}`, data, {
      headers: {
        'x-token': this.token,
      }
    });
  }

  // * login user
  login(formData: RegisterForm): Observable<LoginForm> {
    return this.http.post<LoginForm>(`${base_url}/auth/login`, formData).pipe(
      tap((res: any) => {
        localStorage.setItem('token', res.token);
      })
    );
  }

  // * login with google
  loginGoogle(token: any) {
    return this.http.post(`${base_url}/auth/google`, { token }).pipe(
      tap((res: any) => {
        localStorage.setItem('token', res.token);
      })
    );
  }
}
