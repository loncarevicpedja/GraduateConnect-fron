import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { UserStoreService } from 'src/app/services/user-store.service';
import { LaborService } from 'src/app/services/labor.service';
import { CommissionService } from 'src/app/services/commission.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  public users: any = [];
  public labors: any = [];
  public commissions: any = [];
  public myDefenses: any = [];
  public role!: string;
  public fullName: string = '';
  public userInformation = this.auth.decodedToken();
  constructor(
    private api: ApiService,
    private auth: AuthService,
    private userStore: UserStoreService,
    private labor: LaborService,
    private commission: CommissionService
  ) {}

  ngOnInit(): void {
    this.api.getUsers().subscribe((res) => {
      this.users = res;
    });
    this.userStore.getFullNameFromStore().subscribe((val) => {
      let fullNameFromToken = this.auth.getFullNameFromToken();
      this.fullName = val || fullNameFromToken;
    });

    this.userStore.getRoleFromStore().subscribe((val) => {
      let roleFromToken = this.auth.getRoleFromToken();
      this.role = val || roleFromToken;
    });
    this.getMyDefenses();
  }

  getMyDefenses() {
    this.getMyCommissions();

    setTimeout(() => {
      this.getLabors();
    }, 300);
  }

  getMyCommissions() {
    this.commission.getCommissions(this.userInformation.nameid).subscribe({
      next: (res) => {
        this.commissions = res;
      },
    });
  }

  getLabors() {
    this.labor.getLaborsForCommission(this.commissions).subscribe({
      next: (res) => {
        this.labors = res;
      },
    });
  }

  logout() {
    this.auth.signOut();
  }
}
