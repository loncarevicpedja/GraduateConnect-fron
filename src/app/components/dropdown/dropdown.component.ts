import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UserStoreService } from 'src/app/services/user-store.service';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css'],
})
export class DropdownComponent implements OnInit {
  public options = ['Profil', 'Odjavi se'];
  public fullName: String = '';
  public selectedOption: string = '';

  constructor(
    private auth: AuthService,
    private userStore: UserStoreService,
    private router: Router
  ) {}

  ngOnInit(): void {
    let tokenPayload = this.auth.decodedToken();
    this.fullName = tokenPayload.unique_name;
  }

  onSelect(option: string): void {
    this.selectedOption = option;

    if (option == 'Odjavi se') {
      this.logout();
    } else if (option == 'Profil') {
      this.router.navigate(['profile']);
    }
  }

  logout() {
    this.auth.signOut();
  }
}
