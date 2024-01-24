import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { LaborService } from 'src/app/services/labor.service';

@Component({
  selector: 'app-referent-requests',
  templateUrl: './referent-requests.component.html',
  styleUrls: ['./referent-requests.component.css'],
})
export class ReferentRequestsComponent implements OnInit {
  public fisnishedLabors: any = [];
  public users: any = [];
  constructor(
    private labor: LaborService,
    private user: ApiService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.getUsers();
    this.getFreeLabors();
  }

  getFreeLabors() {
    this.labor.getFinishedLabors().subscribe({
      next: (res) => {
        this.fisnishedLabors = res;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  getUsers() {
    this.user.getUsers().subscribe({
      next: (res) => {
        this.users = res;
      },
    });
  }

  findUser(laborId: any) {
    for (let i = 0; i < this.users.length; i++) {
      if (this.users[i].studentsLaborId == laborId) {
        const fullname = this.users[i].userName + ' ' + this.users[i].lastName;
        return fullname;
      }
    }
    return null;
  }

  redirectToLabor(val: any) {
    for (let i = 0; i < this.users.length; i++) {
      if (this.users[i].studentsLaborId == val.id) {
        var u = this.users[i];
      }
    }
    this.router.navigate(['/labor'], {
      queryParams: { studentId: JSON.stringify(val, u) },
    });
  }
}
