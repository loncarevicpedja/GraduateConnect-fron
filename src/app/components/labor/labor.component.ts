import {
  Component,
  EventEmitter,
  Input,
  NgModule,
  OnInit,
  Output,
} from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';
import { AuthService } from 'src/app/services/auth.service';
import { LaborService } from 'src/app/services/labor.service';
import { ThemeService } from 'src/app/services/theme.service';
import { UserService } from 'src/app/services/user.service';
import { CommissionService } from 'src/app/services/commission.service';

@Component({
  selector: 'app-labor',
  templateUrl: './labor.component.html',
  styleUrls: ['./labor.component.css'],
})
export class LaborComponent implements OnInit {
  @Input() student: any = {};
  selectedProfessors: number[] = [];
  public laborObj: any = {};
  public freeProfesors: any = [];
  public commissionMembers: any = [];
  public selectedProfesor: any = '';
  public lastCreatedCommission: any = '';
  public userId = this.auth.decodedToken().nameid;
  public role = this.auth.decodedToken().role;
  public selectedFile: File | undefined;
  public laborExist: any;
  public laborFileName: any;
  public defenseDate: string = '';
  public rate: string = '';
  constructor(
    private labor: LaborService,
    private auth: AuthService,
    private user: UserService,
    private commission: CommissionService,
    private toast: NgToastService,
    private theme: ThemeService,
    private router: ActivatedRoute
  ) {}

  ngOnInit(): void {
    if (this.role == 'Student') {
      this.getLabor(this.userId);
      this.getCommissionMembers(this.laborObj.commissionId);
    } else if (this.role == 'Profesor') {
      this.router.queryParams.subscribe((params) => {
        this.student = JSON.parse(params['studentId']);
      });
      this.getLabor(this.student.id);
      if (this.laborObj.commisionId) {
        this.getCommissionMembers(this.laborObj.commisionId);
      }
    } else if (this.role == 'Referent') {
      this.router.queryParams.subscribe((params) => {
        this.student = JSON.parse(params['studentId']);
      });
      this.getLabor(this.student.studentId);
    }

    setTimeout(() => {
      this.getCommissionMembers(this.laborObj.commissionId);
      this.checkFileExistence();
    }, 200);
  }

  handleFileInput(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  getCommissionMembers(commissionId: any) {
    this.commission.getCommissionUsers(commissionId).subscribe({
      next: (res) => {
        this.commissionMembers = res;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  setRate() {
    this.labor.setRate(this.laborObj.id, this.rate).subscribe({
      next: (res) => {
        this.toast.success({
          detail: 'USPEŠNO',
          summary: res.message,
          duration: 5000,
        });
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      },
      error: (err) => {
        this.toast.error({
          detail: 'GREŠKA',
          summary: err.error.message,
          duration: 5000,
        });
      },
    });
  }

  setDefenseDate() {
    this.labor.addDefenseDate(this.laborObj.id, this.defenseDate).subscribe({
      next: (res) => {
        this.toast.success({
          detail: 'SUCCESS',
          summary: res.message,
          duration: 5000,
        });
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      },
      error: (err) => {
        this.toast.error({
          detail: 'ERROR',
          summary: err.error.message,
          duration: 5000,
        });
      },
    });
  }

  onFileUpload(event: Event): void {
    event.preventDefault();

    if (!this.selectedFile) {
      return;
    }

    const formData = new FormData();
    formData.append('file', this.selectedFile);

    this.labor.uploadFile(formData, this.laborObj.id).subscribe({
      next: (res) => {
        this.toast.success({
          detail: 'UPSEŠNO',
          summary: res.message,
          duration: 5000,
        });
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      },
      error: (err) => {
        this.toast.error({
          detail: 'GREŠKA',
          summary: err.error.message,
          duration: 5000,
        });
      },
    });
  }

  createCommittee() {
    var usersCommission: any[] = [];
    if (this.selectedProfessors.length != 3) {
      this.toast.error({
        detail: 'GREŠKA',
        summary: 'Morate odabrati tačno 3 člana komisije!',
        duration: 5000,
      });
      return;
    }
    this.commission.createCommission().subscribe({
      next: (res) => {
        this.lastCreatedCommission = res.id;
        this.freeProfesors.forEach((profesor: any) => {
          if (this.selectedProfessors.includes(profesor.id)) {
            usersCommission.push(profesor);
          }
        });
        this.commission
          .addCommissionMembers(this.lastCreatedCommission, usersCommission)
          .subscribe({
            next: (res) => {
              this.toast.success({
                detail: 'SUCCESS',
                summary: res.message,
                duration: 5000,
              });
              this.labor
                .addCommission(this.laborObj.id, this.lastCreatedCommission)
                .subscribe({
                  next: (res) => {
                    window.location.reload();
                  },
                  error: (err) => {
                    console.log(err.message);
                  },
                });
            },
            error: (err) => {
              this.toast.error({
                detail: 'ERROR',
                summary: err.error.message,
                duration: 5000,
              });
            },
          });
      },
    });
  }

  toggleSelection(professorId: number): void {
    const index = this.selectedProfessors.indexOf(professorId);
    if (index === -1) {
      this.selectedProfessors.push(professorId);
    } else {
      this.selectedProfessors.splice(index, 1);
    }
  }

  checkFileExistence() {
    this.labor.checkFileExistence(this.laborObj.id).subscribe({
      next: (res) => {
        this.laborExist = res.exists;
        this.laborFileName = res.fileName;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  downloadFile(laborId: any, event: Event) {
    event.preventDefault();
    this.labor.downloadFile(this.laborObj.id).subscribe(
      (data) => {
        const blob = new Blob([data], { type: 'application/octet-stream' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `labor_${laborId}.docx`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      },
      (error) => {
        console.error('Error downloading file:', error);
      }
    );
  }

  getLabor(userId: any) {
    this.labor.getLaborFromUserId(userId).subscribe({
      next: (res) => {
        this.laborObj = res;
        !this.laborObj.profesorId
          ? this.getFreeProfesors()
          : this.getFreeProfesors();
      },
      error: () => {
        console.log('Nema mentora');
      },
    });
  }

  getFreeProfesors() {
    this.user.getFreeMentors().subscribe({
      next: (res) => {
        this.freeProfesors = res;
        if (
          this.laborObj.profesorId &&
          !this.selectedProfessors.includes(this.laborObj.profesorId)
        ) {
          this.selectedProfessors.push(this.laborObj.profesorId);
        }
      },
      error: (err) => {
        this.freeProfesors[0] = 'Trenutno nema slobodnih profesora';
      },
    });
  }

  onProfesorSelected(event: any) {
    this.selectedProfesor = event.target.value;
  }
  setMentor() {
    this.labor.setMentor(this.laborObj.id, this.selectedProfesor).subscribe({
      next: (res) => {
        this.toast.success({
          detail: 'SUCCESS',
          summary: res.message,
          duration: 5000,
        });
        window.location.reload();
      },
      error: (err) => {
        this.toast.error({
          detail: 'ERROR',
          summary: err.error.message,
          duration: 5000,
        });
      },
    });
  }

  lookingForEnd(status: string) {
    this.labor.changeStatus(this.laborObj.id, status).subscribe({
      next: (res) => {
        this.toast.success({
          detail: 'SUCCESS',
          summary: res.message,
          duration: 5000,
        });
      },
      error: (err) => {
        this.toast.error({
          detail: 'ERROR',
          summary: err.error.message,
          duration: 5000,
        });
      },
    });
  }

  endLabor(status: string) {
    this.labor.changeStatus(this.laborObj.id, status).subscribe({
      next: (res) => {
        this.toast.success({
          detail: 'SUCCESS',
          summary: res.message,
          duration: 5000,
        });
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      },
      error: (err) => {
        this.toast.error({
          detail: 'ERROR',
          summary: err.error.message,
          duration: 5000,
        });
      },
    });
  }

  continueLabor(status: string) {
    this.labor.changeStatus(this.laborObj.id, status).subscribe({
      next: (res) => {
        this.toast.success({
          detail: 'SUCCESS',
          summary: res.message,
          duration: 5000,
        });
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      },
      error: (err) => {
        this.toast.error({
          detail: 'ERROR',
          summary: err.error.message,
          duration: 5000,
        });
      },
    });
  }

  returnTheme() {
    this.theme.returnTheme(this.userId).subscribe({
      next: (res) => {
        this.toast.success({
          detail: 'SUCCESS',
          summary: res,
          duration: 5000,
        });
      },
      error: (err) => {
        this.toast.error({
          detail: 'ERROR',
          summary: err.error.message,
          duration: 5000,
        });
      },
    });
    this.user.returnMentor(this.userId).subscribe();
    this.labor.deleteLabor(this.laborObj.id).subscribe();
  }
}
