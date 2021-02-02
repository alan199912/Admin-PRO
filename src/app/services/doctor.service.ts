import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Doctor } from '../models/doctor.model';
import { Hospital } from '../models/hospital.model';

const base_url = environment.base_ulr;

@Injectable({
  providedIn: 'root',
})
export class DoctorService {
  public doctor: Doctor;

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

  getDoctors() {
    return this.http
      .get(`${base_url}/doctors`, this.headers)
      .pipe(
        map((res: { status: string; doctors: Array<Doctor> }) => res.doctors)
      );
  }

  getDoctorId(id: string) {
    return this.http
      .get(`${base_url}/doctors/${id}`, this.headers)
      .pipe(map((res: { doctor: Doctor }) => res.doctor));
  }

  createDoctor(doctor: Doctor) {
    return this.http
      .post(`${base_url}/doctors`, doctor, this.headers)
      .pipe(map((res: { doctorCreated: Doctor }) => res.doctorCreated));
  }

  updateDoctor(doctor: Doctor) {
    console.log(doctor._id);
    return this.http.put(
      `${base_url}/doctors/${doctor._id}`,
      doctor,
      this.headers
    );
  }

  deleteDoctor(_id: string) {
    return this.http.delete(`${base_url}/doctors/${_id}`, this.headers);
  }
}
