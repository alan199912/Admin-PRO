import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { User } from '../../models/user.model';

import { FileUploadService } from 'src/app/services/file-upload.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styles: [],
})
export class AccountComponent implements OnInit {
  public accountForm: FormGroup;
  public user: User;
  public img: File;
  public imgTemp: any;

  public update: any;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private fileUploadService: FileUploadService
  ) {
    this.user = userService.user;
  }

  ngOnInit(): void {
    console.log(this.user);

    this.accountForm = this.fb.group({
      name: [
        this.user.name,
        {
          validators: [Validators.required],
          updateOn: 'change',
        },
      ],
      email: [
        this.user.email,
        {
          validators: [Validators.required, Validators.email],
          updateOn: 'change',
        },
      ],
    });
  }

  updateAccount() {
    this.userService.updateAccount(this.accountForm.value).subscribe(
      () => {
        const { name, email } = this.accountForm.value;
        this.user.name = name;
        this.user.email = email;
        Swal.fire('Save', 'Edited succesfully', 'success');
      },
      (error) => {
        Swal.fire('Error', error.error.msg, 'error');
      }
    );
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
    this.fileUploadService
      .updateFile(this.img, 'users', this.user.id)
      .subscribe(
        (res: any) => {
          console.log(res);
          this.user.img = res;
          this.uploadUserComplete();
          Swal.fire('Save', 'Photo Edited succesfully', 'success');
        },
        (error) => {
          Swal.fire('Error', error.error.msg, 'error');
        }
      );
  }

  uploadUserComplete() {
    // * momentary
    this.userService.updateUser(this.user).subscribe(res => console.log(res))
  }
}
