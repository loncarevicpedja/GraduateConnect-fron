import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile-info',
  templateUrl: './profile-info.component.html',
  styleUrls: ['./profile-info.component.css'],
})
export class ProfileInfoComponent implements OnInit {
  userId!: number;
  public userObj: any = {};
  constructor(private route: ActivatedRoute, private user: UserService) {
    this.route.params.subscribe((params) => {
      this.userId = params['id'];
      console.log(this.userId);
    });
  }
  ngOnInit(): void {
    this.getUser();
  }

  getUser() {
    this.user.getUserFromId(this.userId).subscribe({
      next: (res) => {
        this.userObj = res;
      },
    });
  }
}
