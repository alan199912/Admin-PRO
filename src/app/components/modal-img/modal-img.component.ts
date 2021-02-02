import { Component, OnInit } from '@angular/core';
import { Doctor } from 'src/app/models/doctor.model';
import { Hospital } from 'src/app/models/hospital.model';
import { User } from 'src/app/models/user.model';
import { DoctorService } from 'src/app/services/doctor.service';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { HospitalService } from 'src/app/services/hospital.service';
import { ModalImgService } from 'src/app/services/modal-img.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-img',
  templateUrl: './modal-img.component.html',
  styles: [],
})
export class ModalImgComponent implements OnInit {
  public user: User;
  public img: File;
  public imgTemp: any;

  constructor(
    public modalImgService: ModalImgService,
    private fileUploadService: FileUploadService,
    private userService: UserService,
    private hospitalService: HospitalService,
    private doctorService: DoctorService
  ) {}

  ngOnInit(): void {}

  closeModal() {
    this.imgTemp = null;
    this.modalImgService.closeModal();
  }

  changeFile(file: File) {
    this.img = file;
    console.log(file);
    if (!file) {
      return (this.imgTemp = null);
    }

    // * show img to would change
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      this.imgTemp = reader.result;
    };
  }

  uploadImg() {
    const id = this.modalImgService.id;
    const type = this.modalImgService.type;

    // * service to change the photo
    this.fileUploadService.updateFile(this.img, type, id).subscribe(
      (img) => {
        this.updateType(type, id, img);
      },
      (error) => {
        console.log(error);
        Swal.fire('Error', 'Error to save the photo', 'error');
      }
    );
  }

  updateType(type: string, id: string, img) {
    switch (type) {
      case 'users':
        return this.userService.getUserId(id).subscribe(
          (user) => {
            user.img = img; // ? send the photo to user found
            this.modalImgService.newImg.emit(img);
            this.updateUserId(user); // ? use the service update user

            Swal.fire('Save', 'Photo Edited succesfully', 'success');
            this.closeModal(); // * close the modal
          },
          (error) => {
            console.log(error);
            Swal.fire('Error', error.message, 'error');
          }
        );
      case 'hospitals':
        return this.hospitalService.getHospitalId(id).subscribe(
          (hospital) => {
            hospital.img = img; // ? send the photo to user found
            this.modalImgService.newImg.emit(img);
            this.updateHospitalId(hospital); // ? use the service update user

            Swal.fire('Save', 'Photo Edited succesfully', 'success');
            this.closeModal(); // * close the modal
          },
          (error) => {
            console.log(error);
            Swal.fire('Error', error.message, 'error');
          }
        );
      case 'doctors':
        return this.doctorService.getDoctorId(id).subscribe(
          (doctor) => {
            doctor.img = img; // ? send the photo to user found
            this.modalImgService.newImg.emit(img);
            this.updateDoctorId(doctor); // ? use the service update user

            Swal.fire('Save', 'Photo Edited succesfully', 'success');
            this.closeModal(); // * close the modal
          },
          (error) => {
            console.log(error);
            Swal.fire('Error', error.message, 'error');
          }
        );

      default:
        break;
    }
  }

  // * call the service to update user
  updateUserId(user: User) {
    // * momentary
    return this.userService
      .updateUser(user)
      .subscribe((res) => console.log(res));
  }

  updateHospitalId(hospital: Hospital) {
    // * momentary
    return this.hospitalService
      .updateAllHospital(hospital)
      .subscribe((res) => console.log(res));
  }

  updateDoctorId(doctor: Doctor) {
    // * momentary
    return this.doctorService
      .updateDoctor(doctor)
      .subscribe((res) => console.log(res));
  }
}
