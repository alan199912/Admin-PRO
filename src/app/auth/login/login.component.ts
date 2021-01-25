import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public formSubmitted = false; // * boolean when all the form is ok
  public auth2: any;

  // * form
  public loginForm = this.fb.group({
    email: [
      localStorage.getItem('email') || '',
      {
        validators: [Validators.required, Validators.email],
        updateOn: 'blur',
      },
    ],
    password: [
      '',
      {
        validators: [Validators.required],
        updateOn: 'blur',
      },
    ],
    rememberMe: [false],
  });

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private userService: UserService,
    private ngZone: NgZone
  ) {}

  login() {
    this.formSubmitted = true; // * subitted the form
    if (this.loginForm.invalid) {
      return;
    }

    this.userService.login(this.loginForm.value).subscribe(
      (res) => {
        if (this.loginForm.get('rememberMe').value) {
          localStorage.setItem('email', this.loginForm.get('email').value);
        } else {
          localStorage.removeItem('email');
        }

        this.router.navigateByUrl('/');
      },
      (err) => {
        Swal.fire('Error', err.error.msg, 'error');
      }
    );
  }

  ngOnInit(): void {
    this.renderButton();
  }

  renderButton() {
    gapi.signin2.render('my-signin2', {
      scope: 'profile email',
      width: 240,
      height: 50,
      longtitle: true,
      theme: 'dark',
    });

    this.startApp();
  }

  async startApp() {
    gapi.load('auth2', () => {
      this.userService.googleInit();

      this.auth2 = this.userService.auth2;

      this.attachSignin(document.getElementById('my-signin2'));
    });
  }

  attachSignin(element) {
    this.auth2.attachClickHandler(
      element,
      {},
      (googleUser) => {
        const id_token = googleUser.getAuthResponse().id_token;
        this.userService.loginGoogle(id_token).subscribe((res) => {
          this.ngZone.run(() => {
            this.router.navigateByUrl('/');
          });
        });
      },
      (error) => {
        alert(JSON.stringify(error, undefined, 2));
      }
    );
  }
}
