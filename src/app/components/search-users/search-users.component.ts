import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-search-users',
  templateUrl: './search-users.component.html',
  styleUrls: ['./search-users.component.css'],
})
export class SearchUsersComponent implements OnInit {
  searchQuery: string = '';
  role!: string;
  currentUserId: number = 0;
  users: any[] = [];

  constructor(
    private userService: UserService,
    private router: Router,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    this.role = null!;
    this.search();
    this.currentUserId = this.auth.decodedToken().nameid;
  }

  redirectToProfile(userId: number) {
    this.router.navigate(['/profileInfo', userId]);
  }

  search(): void {
    this.userService.searchUsers(this.searchQuery, this.role).subscribe(
      (response) => {
        this.users = response.filter(
          (user: any) => user.role !== 'Admin' && user.id != this.currentUserId
        );
      },
      (error) => {
        console.error('Error searching users:', error);
        this.users = [];
      }
    );
  }
}
