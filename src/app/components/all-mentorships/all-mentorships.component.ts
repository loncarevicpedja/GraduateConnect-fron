import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-all-mentorships',
  templateUrl: './all-mentorships.component.html',
  styleUrls: ['./all-mentorships.component.css'],
})
export class AllMentorshipsComponent implements OnInit {
  public mentorships: any = [];
  public userId = this.auth.decodedToken().nameid;
  public laborId: number = 0;
  constructor(
    private user: UserService,
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.allMentorships();
    }, 300);
  }

  allMentorships() {
    this.user.getAllMentorships(this.userId).subscribe({
      next: (res) => {
        this.mentorships = res;
      },
      error: (err) => {
      },
    });
  }
  redirectToLabor(val: any) {
    this.router.navigate(['/labor'], {
      queryParams: { studentId: JSON.stringify(val) },
    });
  }
}
