import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: [
    './register.component.css'
  ]
})
export class RegisterComponent{

  public formSubmitted = false; // * boolean when all the form is ok

  // * form
  public registerForm = this.fb.group({
    name: ['', {
      validators: [Validators.required],
      updateOn: 'blur',
    } ],
    email: ['', {
      validators: [ Validators.required, Validators.email],
      updateOn: 'blur'
    }],
    password: ['', {
      validators: [Validators.required],
      updateOn: 'blur'
    }],
    terms: [false , {
      validators: [Validators.required],
      updateOn: 'blur',
    }],
  });
  // this.passwordsEquals()
  constructor(private fb: FormBuilder,
              private userService: UserService,
              private router: Router ) { }

  // * Register a user
  createUser(): void {
    this.formSubmitted = true; // * subitted the form

    // * of the form is valid
    if(this.registerForm.invalid) {
      return;
    }

    // * post user
    this.userService.createUser(this.registerForm.value)
      .subscribe( res => {
        Swal.fire('Success', 'User created', 'success');
        this.router.navigateByUrl('/');
      }, (err) => {
        Swal.fire('Error', err.error.msg, 'error');
      });

  }

  // * vefiry if each field is valid
  fieldInvalid( field: string ): boolean {
    if( this.registerForm.get(field).invalid && this.formSubmitted ) {
      return true;
    } else {
      return false;
    }
  }

  // * verify if terms is checked
  termsAccepted(): boolean {
    return !this.registerForm.get('terms').value && this.formSubmitted;
  }

}
