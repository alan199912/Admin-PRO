import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { imgAccount } from '../interfaces/img-account.interface';

const base_url = environment.base_ulr;

@Injectable({
  providedIn: 'root',
})
export class FileUploadService {
  constructor(private http: HttpClient) {}

  // * token
  get token(): string {
    return localStorage.getItem('token') || '';
  }

  updateFile(file: File, type: 'users' | 'doctors' | 'hospitals', id: string) {
    const formData = new FormData();
    formData.append('img', file);

    return this.http
      .put<imgAccount>(`${base_url}/uploads/${type}/${id}`, formData, {
        headers: {
          'x-token': this.token,
        },
      })
      .pipe(
        map((res: any) => {
          console.log(res);
          return res.file;
        })
      );
  }
}
