import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public baseUrl: string =
    'http://loncarevicp-001-site1.htempurl.com/api/User/';
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

  searchUsers(searchTerm: string, role: string): Observable<any> {
    let params = new HttpParams().set('searchTerm', searchTerm);

    if (role) {
      params = params.set('role', role);
    }

    return this.http.get<any>(`${this.baseUrl}search-users`, { params });
  }

  getUserFromId(userId: number) {
    return this.http.get<any>(`${this.baseUrl}get-user/${userId}`);
  }

  changePassword(userObj: any) {
    return this.http.post<any>(`${this.baseUrl}change-password`, userObj);
  }
}
