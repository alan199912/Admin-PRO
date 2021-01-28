import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';

const base_url = environment.base_ulr;

@Injectable({
  providedIn: 'root',
})
export class FileUploadService {

  public user: User;

  constructor(private http: HttpClient) {}

  // * token
  get token(): string {
    return localStorage.getItem('token') || '';
  }

  // * uid user
  get uid(): string {
    return this.user.id || '';
  }


  // * update user
  updateAccount(data: { img: string }, id: string) {

    data = {
      ...data,
    }

    return this.http.put(`${base_url}/users/${id}`, data, {
      headers: {
        'x-token': this.token,
      }
    });
  }

  updateFile(
    file: File,
    type: string,
    id: string
  ) {

    const formData = new FormData();
    formData.append('img', file);

    return this.http.put(`${base_url}/uploads/${type}/${id}`, formData, {
      headers: {
        'x-token': this.token,
      },
    })
    .pipe(
      map((res: any) => {
        console.log(res)
        return res.file
      }),
    );
  }
}
