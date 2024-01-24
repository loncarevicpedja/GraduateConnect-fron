import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { LaborService } from 'src/app/services/labor.service';

@Component({
  selector: 'app-referent-rates',
  templateUrl: './referent-rates.component.html',
  styleUrls: ['./referent-rates.component.css'],
})
export class ReferentRatesComponent implements OnInit {
  public labors: any = [];
  public users: any = [];
  constructor(
    private labor: LaborService,
    private user: ApiService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.getDefendedLabors();
  }

  getDefendedLabors() {
    this.labor.getDefendedLabors().subscribe({
      next: (res) => {
        this.labors = res;
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
