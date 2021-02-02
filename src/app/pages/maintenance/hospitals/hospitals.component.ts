import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Hospital } from 'src/app/models/hospital.model';
import { HospitalService } from 'src/app/services/hospital.service';
import { ModalImgService } from 'src/app/services/modal-img.service';
import { SearcherService } from 'src/app/services/searcher.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-hospitals',
  templateUrl: './hospitals.component.html',
  styles: [],
})
export class HospitalsComponent implements OnInit, OnDestroy {
  public hospitals: Array<Hospital>;
  public loading: boolean;
  public imgSubscription: Subscription;

  constructor(
    private hospitalService: HospitalService,
    private modalImgService: ModalImgService,
    private searcherService: SearcherService
  ) {}

  ngOnInit(): void {
    this.getHospitals();

    this.imgSubscription = this.modalImgService.newImg
      .pipe(delay(500))
      .subscribe((img) => this.getHospitals());
  }

  getHospitals() {
    this.loading = true;

    this.hospitalService.getHospitals().subscribe((hospitals) => {
      this.loading = false;
      this.hospitals = hospitals;
    });
  }

  async createHospital() {
    const { value = '' } = await Swal.fire<string>({
      title: 'Create a hospital',
      input: 'text',
      inputLabel: 'Enter a new Hospital',
      inputPlaceholder: 'Enter the Name',
      showCancelButton: true,
    });
    if (value.trim().length > 0) {
      this.hospitalService.createHospital(value).subscribe(
        (res) => {
          console.log(res);
          Swal.fire('Created', 'Hospital created successfully', 'success');
          this.getHospitals();
        },
        (error) => {
          console.log(error);
          Swal.fire('Error', 'Error to created', 'error');
        }
      );
    } else {
      Swal.fire('Error', 'Name is required to create', 'error');
    }
  }

  uploadHospital(hospital: Hospital) {
    this.hospitalService.updateHospital(hospital._id, hospital.name).subscribe(
      (res) => {
        console.log(res);
        Swal.fire('Updated', 'Hospital updated successfully', 'success');
        this.getHospitals();
      },
      (error) => {
        console.log(error);
        Swal.fire('Error', 'Error to update', 'error');
      }
    );
  }

  deleteHospital(hospital: Hospital, id: string) {
    Swal.fire({
      title: 'Delete Hospital?',
      text: `Is about to delete the hospital '${hospital.name}'`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.hospitalService.deleteHospital(id).subscribe(
          (res) => {
            console.log(res);
            Swal.fire('Deleted', 'Hospital deleted successfully', 'success');
            this.getHospitals();
          },
          (error) => {
            console.log(error);
            Swal.fire('Error', 'Error to delete', 'error');
          }
        );
      }
    });
  }

  openModal(hospital: Hospital) {
    console.log(hospital);
    this.modalImgService.openModal('hospitals', hospital._id, hospital.img);
  }

  search(searchTerm: string) {
    if (searchTerm.length === 0) {
      return this.getHospitals();
    }

    this.searcherService
      .search('hospitals', searchTerm)
      .subscribe((res: Array<Hospital>) => {
        console.log(res);
        this.hospitals = res;
      });
  }

  ngOnDestroy() {
    return this.imgSubscription.unsubscribe();
  }
}
