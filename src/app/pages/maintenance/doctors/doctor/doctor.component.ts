import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Doctor } from 'src/app/models/doctor.model';
import { Hospital } from 'src/app/models/hospital.model';

import { ActivatedRoute, Router } from '@angular/router';

import { DoctorService } from 'src/app/services/doctor.service';
import { HospitalService } from 'src/app/services/hospital.service';
import Swal from 'sweetalert2';
import { pipe } from 'rxjs';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styles: [],
})
export class DoctorComponent implements OnInit {
  public doctorForm: FormGroup;
  public hospitals: Array<Hospital>;
  public hospitalSelected: Hospital;
  public doctorSelected: Doctor;
  public id: string = this.activatedRoute.snapshot.params.id;

  constructor(
    private fb: FormBuilder,
    private hospitalService: HospitalService,
    private doctorService: DoctorService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getDoctorID(this.id);

    this.doctorForm = this.fb.group({
      name: [
        '',
        {
          validatiors: [Validators.required],
          updateOn: 'change',
        },
      ],
      hospital: [
        '',
        {
          validators: [Validators.required],
          updateOn: 'change',
        },
      ],
    });

    this.getHospitals();

    this.doctorForm.get('hospital').valueChanges.subscribe((hospitalID) => {
      //// this.hospitalSelected = this.hospitals.find((h) => h._id === hospitalID);
      this.getHospitalId(hospitalID);
    });
  }

  createDoctor() {
    console.log(this.doctorSelected);

    if (!this.doctorForm.invalid) {
      if (this.doctorSelected) {
        const data = {
          ...this.doctorForm.value,
          _id: this.doctorSelected._id,
        };
        return this.doctorService.updateDoctor(data).subscribe(
          (res) => {
            console.log(res);
            Swal.fire('Edited', 'Doctor Edited successfully', 'success');
          },
          (error) => {
            console.log(error);
            Swal.fire('Error', 'Error to edited hospital', 'error');
          }
        );
      } else {
        return this.doctorService.createDoctor(this.doctorForm.value).subscribe(
          (doctor: any) => {
            console.log(doctor);
            Swal.fire('Created', 'Doctor created successfully', 'success');
            this.router.navigateByUrl(`dashboard/doctor/${doctor._id}`);
          },
          (error) => {
            console.log(error);
            Swal.fire('Error', 'Error to create hospital', 'error');
          }
        );
      }
    }
  }

  getHospitals() {
    return this.hospitalService
      .getHospitals()
      .subscribe((hospitals: Array<Hospital>) => {
        this.hospitals = hospitals;
        console.log(this.hospitals);
      });
  }

  getHospitalId(id: string) {
    return this.hospitalService
      .getHospitalId(id)
      .subscribe((res) => (this.hospitalSelected = res));
  }

  getDoctorID(id: string) {
    if (id === 'new') {
      return;
    }

    return this.doctorService
      .getDoctorId(id)
      .pipe(delay(100))
      .subscribe(
        (doctor) => {
          if (!doctor) {
            return this.router.navigateByUrl(`dashboard/doctors`);
          }
          this.doctorSelected = doctor;
          const { name, hospital } = doctor;
          this.doctorForm.setValue({ name, hospital });
        },
        (error) => {
          console.log(error);
        }
      );
  }
}
