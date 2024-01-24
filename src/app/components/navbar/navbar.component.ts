import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { ThemeService } from 'src/app/services/theme.service';
import { UserStoreService } from 'src/app/services/user-store.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  public users: any = [];
  public role: string = '';
  public fullName: string = '';
  public hasReservedTheme: boolean = false;
  constructor(
    private api: ApiService,
    private auth: AuthService,
    private userStore: UserStoreService,
    private theme: ThemeService
  ) {}

  ngOnInit(): void {
    this.userStore.getRoleFromStore().subscribe((val) => {
      let roleFromToken = this.auth.getRoleFromToken();
      this.role = val || roleFromToken;
    });
    this.inspect();
    this.userStore.getFullNameFromStore().subscribe((val) => {
      let fullNameFromToken = this.auth.getFullNameFromToken();
      this.fullName = val || fullNameFromToken;
    });
  }

  inspect() {
    let userId = this.auth.decodedToken().nameid;
    this.theme.checkUser(Number(userId)).subscribe((res) => {
      this.hasReservedTheme = res;
    });
  }

  logout() {
    this.role == '';
    this.auth.signOut();
  }
}
