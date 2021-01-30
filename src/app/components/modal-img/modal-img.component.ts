import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { ModalImgService } from 'src/app/services/modal-img.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-img',
  templateUrl: './modal-img.component.html',
  styles: [
  ]
})
export class ModalImgComponent implements OnInit {

  public user: User;
  public img: File;
  public imgTemp: any;

  constructor(public modalImgService: ModalImgService,
              private fileUploadService: FileUploadService,
              private userService: UserService) {
                this.user = userService.user;
              }

  ngOnInit(): void {
  }

  closeModal() {
    this.imgTemp = null;
    this.modalImgService.closeModal();
  }

  changeFile(file: File) {
    this.img = file;
    console.log(file)
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
    console.log(id)
    this.fileUploadService
      .updateFile(this.img, 'users', id)
      .subscribe(
        (res: any) => {
          this.user.img = res;
          this.modalImgService.newImg.emit(res);
          this.uploadUserComplete(this.user);
          Swal.fire('Save', 'Photo Edited succesfully', 'success');
          this.closeModal();
        },
        (error) => {
          Swal.fire('Error', error.error.msg, 'error');
        }
      );
  }

  uploadUserComplete(user: User) {
    // * momentary
    this.userService.updateUser(user).subscribe(res => console.log(res))
  }

}
