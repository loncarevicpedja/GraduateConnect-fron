import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';
import ValidateForm from 'src/app/helpers/validateForm';
import { AuthService } from 'src/app/services/auth.service';
import { ThemeService } from 'src/app/services/theme.service';

@Component({
  selector: 'app-create-theme',
  templateUrl: './create-theme.component.html',
  styleUrls: ['./create-theme.component.css'],
})
export class CreateThemeComponent implements OnInit {
  themeForm!: FormGroup;
  public status: Boolean = true;
  public userInformation = this.auth.decodedToken();
  constructor(
    private theme: ThemeService,
    private toast: NgToastService,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    this.themeForm = new FormGroup({
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      field: new FormControl('', Validators.required),
      status: new FormControl(this.status),
      profesorId: new FormControl(this.userInformation.nameid),
    });
  }
  onSubmit() {
    if (this.themeForm.valid) {
      this.theme.addTheme(this.themeForm.value).subscribe({
        next: (res) => {
          this.toast.success({
            detail: 'USPEŠNO',
            summary: res.message,
            duration: 5000,
          });
          this.themeForm.reset();
        },
        error: (err) => {
          this.toast.error({
            detail: 'GREŠKA',
            summary: err?.error.message,
            duration: 5000,
          });
        },
      });
    } else {
      ValidateForm.validateAllFormFields(this.themeForm);
    }
  }
}
