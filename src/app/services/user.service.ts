import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public baseUrl: string = 'https://localhost:7296/api/User/';
  constructor(private http: HttpClient, private router: Router) {}

  getFreeMentors() {
    return this.http.get<any>(`${this.baseUrl}all-profesors`);
  }

  getAllMentorships(userId: number) {
    return this.http.get<any>(`${this.baseUrl}all-mentorships/${userId}`);
  }

  returnMentor(userId: number) {
    return this.http.put<any>(`${this.baseUrl}remove-mentor/${userId}`, null);
  }

  getUserFromId(userId: number) {
    return this.http.get<any>(`${this.baseUrl}get-user/${userId}`);
  }

  changePassword(userObj: any) {
    return this.http.post<any>(`${this.baseUrl}change-password`, userObj);
  }
}
