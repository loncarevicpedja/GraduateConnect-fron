import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import ValidateForm from 'src/app/helpers/validateForm';
import { AuthService } from 'src/app/services/auth.service';
import { UserStoreService } from 'src/app/services/user-store.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  type: string = 'password';
  isText: boolean = false;
  eyeIcon: string = 'fa-eye-slash';
  loginForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private toast: NgToastService,
    private userStore: UserStoreService
  ) {}
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  hideShowPass() {
    this.isText = !this.isText;
    this.isText ? (this.type = 'text') : (this.type = 'password');
    this.isText ? (this.eyeIcon = 'fa-eye') : (this.eyeIcon = 'fa-eye-slash');
  }
  onLogin() {
    if (this.loginForm.valid) {
      this.auth.login(this.loginForm.value).subscribe(
        (res) => {
          console.log(res);
          this.loginForm.reset();
          this.auth.storeToken(res.token);
          let tokenPayload = this.auth.decodedToken();
          console.log(tokenPayload.unique_name);
          this.toast.success({
            detail: 'SUCCESS',
            summary: res.message,
            duration: 5000,
          });
          this.router.navigate(['dashboard']);
          setTimeout(() => {
            window.location.reload();
          }, 500);
        },
        (err) => {
          if (err && err.error && err.error.message) {
            this.toast.error({
              detail: 'GREŠKA',
              summary: err.error.message,
              duration: 5000,
            });
          } else if (err instanceof HttpErrorResponse && err.status === 400) {
            this.toast.error({
              detail: 'GREŠKA',
              summary: 'Netačno korisničko ime ili lozinka.',
              duration: 5000,
            });
          } else {
            this.toast.error({
              detail: 'GREŠKA',
              summary: 'Netačno korisničko ime ili lozinka.',
              duration: 5000,
            });
          }
        }
      );
    } else {
      ValidateForm.validateAllFormFields(this.loginForm);
      this.toast.error({
        detail: 'ERROR',
        summary: 'Form is invalid',
        duration: 5000,
      });
    }
  }
}
