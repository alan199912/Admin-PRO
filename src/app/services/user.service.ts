import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';

import { RegisterForm } from '../interfaces/register-form.interface';
import { LoginForm } from '../interfaces/login-form.interface';

import { Observable, of } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { User } from '../models/user.model';
import { getUser } from '../interfaces/get-users.interface';

const base_url = environment.base_ulr;
declare const gapi: any;

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public auth2: any;
  public user: User;

  constructor(
    private http: HttpClient,
    private router: Router,
    private ngZone: NgZone
  ) {
    this.googleInit();
  }

  // * token
  get token(): string {
    return localStorage.getItem('token') || '';
  }

  // * uid user
  get uid(): string {
    return this.user.id || '';
  }

  get role(): 'ADMIN_ROLE' | 'USER_ROLE' {
    return this.user.role;
  }

  saveLocalStorage(token: string, menu: any) {
    localStorage.setItem('token', token);
    localStorage.setItem('menu', JSON.stringify(menu));
  }

  // * register with google
  googleInit() {
    return new Promise<void>((resolve) => {
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
    localStorage.removeItem('menu');

    this.auth2.signOut().then(() => {
      this.ngZone.run(() => {
        this.router.navigateByUrl('/login');
      });
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
          const { name, email, google, role, img = '', _id } = res.user;

          this.user = new User(name, email, '', img, google, role, _id);

          this.saveLocalStorage(res.token, res.menu);

          return true;
        }),
        catchError(() => of(false)) // * return a new observable
      );
  }

  // * register user
  createUser(formData: RegisterForm): Observable<RegisterForm> {
    return this.http
      .post<RegisterForm>(`${base_url}/users`, formData)
      .pipe(tap((res: any) => this.saveLocalStorage(res.token, res.menu)));
  }

  // * update user
  updateAccount(data: { email: string; name: string; role: string }) {
    data = {
      ...data,
      role: this.user.role,
    };

    return this.http.put(`${base_url}/users/${this.uid}`, data, {
      headers: {
        'x-token': this.token,
      },
    });
  }

  // * login user
  login(formData: RegisterForm): Observable<LoginForm> {
    return this.http
      .post<LoginForm>(`${base_url}/auth/login`, formData)
      .pipe(tap((res: any) => this.saveLocalStorage(res.token, res.menu)));
  }

  // * login with google
  loginGoogle(token: any) {
    return this.http
      .post(`${base_url}/auth/google`, { token })
      .pipe(tap((res: any) => this.saveLocalStorage(res.token, res.menu)));
  }

  getUsers(pagination: number = 0) {
    return this.http
      .get<getUser>(`${base_url}/users?pagination=${pagination}`, {
        headers: {
          'x-token': this.token,
        },
      })
      .pipe(
        map((res: any) => {
          const users = res.users.map(
            (elem: any) =>
              new User(
                elem.name,
                elem.email,
                '',
                elem.img,
                elem.google,
                elem.role,
                elem._id
              )
          );

          return {
            totalRecord: res.totalRecord,
            users,
          };
        })
      );
  }

  getUserId(id: string) {
    return this.http
      .get<User>(`${base_url}/users/${id}`, {
        headers: {
          'x-token': this.token,
        },
      })
      .pipe(
        map((res: any) => {
          console.log(res.user);
          const user = new User(
            res.user.name,
            res.user.email,
            '',
            res.user.img,
            res.user.google,
            res.user.role,
            res.user._id
          );
          return user;
        })
      );
  }

  deleteUser(user: User) {
    return this.http.delete(`${base_url}/users/${user.id}`, {
      headers: {
        'x-token': this.token,
      },
    });
  }

  updateUser(user: User) {
    return this.http.put(`${base_url}/users/${user.id}`, user, {
      headers: {
        'x-token': this.token,
      },
    });
  }
}
