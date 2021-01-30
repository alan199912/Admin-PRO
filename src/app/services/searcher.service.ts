import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

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

  private usersTransform(data: any[]): Array<User> {
    return data.map(
      (u) => new User(u.name, u.email, '', u.img, u.google, u.role, u.id)
    );
  }

  search(type: 'users' | 'doctors' | 'hospitales', searchTerm: string) {
    return this.http
      .get<any[]>(`${base_url}/searches/collection/${type}/${searchTerm}`, {
        headers: {
          'x-token': this.token,
        },
      })
      .pipe(
        map((res: any) => {
          switch (type) {
            case 'users':
              return this.usersTransform(res.data);

            default:
              break;
          }
        })
      );
  }

}
