import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Doctor } from '../models/doctor.model';
import { Hospital } from '../models/hospital.model';
import { User } from '../models/user.model';

const base_url = environment.base_ulr;

@Injectable({
  providedIn: 'root',
})
export class SearcherService {
  constructor(private http: HttpClient) {}

  // * token
  get token(): string {
    return localStorage.getItem('token') || '';
  }

  private usersTransform(data: Array<User>): Array<User> {
    return data.map(
      (u) => new User(u.name, u.email, '', u.img, u.google, u.role, u.id)
    );
  }
  private hospitalsTransform(data: Array<Hospital>): Array<Hospital> {
    return data;
  }

  private doctorsTransform(data: Array<Doctor>): Array<Doctor> {
    return data;
  }

  search(type: 'users' | 'doctors' | 'hospitals', searchTerm: string) {
    return this.http
      .get<Array<User> | Array<Hospital> | Array<Doctor>>(
        `${base_url}/searches/collection/${type}/${searchTerm}`,
        {
          headers: {
            'x-token': this.token,
          },
        }
      )
      .pipe(
        map((res: any) => {
          switch (type) {
            case 'users':
              return this.usersTransform(res.data);
            case 'hospitals':
              return this.hospitalsTransform(res.data);
            case 'doctors':
              return this.doctorsTransform(res.data);

            default:
              break;
          }
        })
      );
  }
}
