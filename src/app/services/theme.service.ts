import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private baseUrl: string = 'https://localhost:7296/api/Theme/';
  constructor(private http: HttpClient, private router: Router) {}

  addTheme(themeObj: any) {
    return this.http.post<any>(`${this.baseUrl}add-theme`, themeObj);
  }

  getFreeThemes() {
    return this.http.get<any>(`${this.baseUrl}free-themes`);
  }

  reserveTheme(themeId: number, studentId: number) {
    return this.http.put<any>(
      `${this.baseUrl}reserve-theme/${themeId}/${studentId}`,
      null
    );
  }

  returnTheme(studentId: number) {
    return this.http.put<any>(`${this.baseUrl}return-theme/${studentId}`, null);
  }

  checkUser(userId: number) {
    return this.http.get<any>(`${this.baseUrl}user-exist/${userId}`);
  }

  getThemeFromUser(userId: number) {
    return this.http.get<any>(`${this.baseUrl}get-theme/${userId}`);
  }
}
