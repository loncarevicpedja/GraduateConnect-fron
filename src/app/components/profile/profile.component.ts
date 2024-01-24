import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import ValidateForm from 'src/app/helpers/validateForm';
import { AuthService } from 'src/app/services/auth.service';
import { UserStoreService } from 'src/app/services/user-store.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  type: string = 'password';
  isText: boolean = false;
  eyeIcon: string = 'fa-eye-slash';
  public userId: any = '';
  public userObj: any = {};
  signUpForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private toast: NgToastService,
    private user: UserService,
    private userStore: UserStoreService
  ) {}
  ngOnInit(): void {
    this.userId = this.auth.decodedToken().nameid;
    this.signUpForm = this.fb.group({
      id: this.userId,
      password: ['', Validators.required],
      newPassword: ['', Validators.required],
    });
    this.getUser();
  }

  getUser() {
    this.user.getUserFromId(this.userId).subscribe({
      next: (res) => {
        this.userObj = res;
      },
    });
  }

  hideShowPass() {
    this.isText = !this.isText;
    this.isText ? (this.type = 'text') : (this.type = 'password');
    this.isText ? (this.eyeIcon = 'fa-eye') : (this.eyeIcon = 'fa-eye-slash');
  }
  changePassword() {
    if (this.signUpForm) {
      this.user.changePassword(this.signUpForm.value).subscribe({
        next: (res) => {
          this.toast.success({
            detail: 'USPEŠNO',
            summary: res.message,
            duration: 5000,
          });
          this.signUpForm.reset();
        },
        error: (err) => {
          this.toast.error({
            detail: 'GREŠKA',
            summary: err.message,
            duration: 5000,
          });
        },
      });
    } else {
      ValidateForm.validateAllFormFields(this.signUpForm);
    }
  }
}
