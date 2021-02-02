import { Component, OnDestroy, OnInit } from '@angular/core';
import { ThemeService } from 'ng2-charts';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Doctor } from 'src/app/models/doctor.model';
import { DoctorService } from 'src/app/services/doctor.service';
import { ModalImgService } from 'src/app/services/modal-img.service';
import { SearcherService } from 'src/app/services/searcher.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styles: [],
})
export class DoctorsComponent implements OnInit, OnDestroy {
  public doctors: Array<Doctor>;
  public loading: boolean;
  public imgSubscription: Subscription;

  constructor(
    private doctorService: DoctorService,
    private modalImgService: ModalImgService,
    private searcherService: SearcherService
  ) {}

  ngOnInit(): void {
    this.getDoctors();

    this.imgSubscription = this.modalImgService.newImg
      .pipe(delay(500))
      .subscribe((img) => this.getDoctors());
  }

  getDoctors() {
    this.loading = true;
    return this.doctorService.getDoctors().subscribe((doctors) => {
      this.loading = false;
      this.doctors = doctors;
    });
  }

  async createDoctor() {}

  deleteDoctor(doctor: Doctor, id: string) {
    Swal.fire({
      title: 'Delete Doctor?',
      text: `Is about to delete the doctor '${doctor.name}'`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.doctorService.deleteDoctor(id).subscribe(
          (res) => {
            console.log(res);
            Swal.fire('Deleted', 'Doctor deleted successfully', 'success');
            this.getDoctors();
          },
          (error) => {
            console.log(error);
            Swal.fire('Error', 'Error to delete', 'error');
          }
        );
      }
    });
  }

  search(searchTerm: string) {
    if (searchTerm.length === 0) {
      return this.getDoctors();
    }

    this.searcherService
      .search('doctors', searchTerm)
      .subscribe((res: Array<Doctor>) => {
        console.log(res);
        this.doctors = res;
      });
  }

  openModal(doctor: Doctor) {
    console.log(doctor);
    this.modalImgService.openModal('doctors', doctor._id, doctor.img);
  }

  ngOnDestroy() {
    return this.imgSubscription.unsubscribe();
  }
}
