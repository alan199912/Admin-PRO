import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Hospital } from '../models/hospital.model';

const base_url = environment.base_ulr;

@Injectable({
  providedIn: 'root',
})
export class HospitalService {
  public hospital: Hospital;

  constructor(private http: HttpClient) {}

  // * token
  get token(): string {
    return localStorage.getItem('token') || '';
  }

  // * headers
  get headers() {
    return {
      headers: {
        'x-token': this.token,
      },
    };
  }

  getHospitals() {
    return this.http
      .get(`${base_url}/hospitals`, this.headers)
      .pipe(
        map((res: { status: string; hospitals: Hospital[] }) => res.hospitals)
      );
  }

  getHospitalId(id: string) {
    return this.http
      .get(`${base_url}/hospitals/${id}`, this.headers)
      .pipe(map((res: { hospital: Hospital }) => res.hospital));
  }

  createHospital(name: string) {
    return this.http.post(`${base_url}/hospitals`, { name }, this.headers);
  }

  updateHospital(_id: string, name: string) {
    return this.http.put(
      `${base_url}/hospitals/${_id}`,
      { name },
      this.headers
    );
  }

  updateAllHospital(hospital: Hospital) {
    return this.http.put(`${base_url}/hospitals/${hospital._id}`, hospital, {
      headers: {
        'x-token': this.token,
      },
    });
  }

  deleteHospital(_id: string) {
    return this.http.delete(`${base_url}/hospitals/${_id}`, this.headers);
  }
}
