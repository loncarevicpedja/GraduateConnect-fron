import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LaborService {
  public baseUrl: string =
    'http://loncarevicp-001-site1.htempurl.com/api/Labor/';
  constructor(private http: HttpClient, private router: Router) {}

  createLabor(themeObj: any) {
    return this.http.post<any>(`${this.baseUrl}create-labor`, themeObj);
  }

  getLaborFromUserId(userId: number) {
    return this.http.get<any>(`${this.baseUrl}get-labor/${userId}`);
  }

  getFinishedLabors() {
    return this.http.get<any>(`${this.baseUrl}get-finished-labors`);
  }

  deleteLabor(laborId: number) {
    return this.http.delete<any>(`${this.baseUrl}delete-labor/${laborId}`);
  }

  setMentor(laborId: number, profesorId: number) {
    return this.http.put<any>(
      `${this.baseUrl}set-mentor/${laborId}/${profesorId}`,
      null
    );
  }

  uploadFile(file: any, laborId: any) {
    return this.http.post<any>(`${this.baseUrl}upload-file/${laborId}`, file);
  }

  downloadFile(laborId: any): Observable<Blob> {
    return this.http.get(`${this.baseUrl}download-file/${laborId}`, {
      responseType: 'blob',
    });
  }

  checkFileExistence(laborId: any) {
    return this.http.get<any>(`${this.baseUrl}check-file-existence/${laborId}`);
  }

  changeStatus(laborId: any, status: any) {
    return this.http.put<any>(
      `${this.baseUrl}change-status/${laborId}/${status}`,
      null
    );
  }

  addCommission(laborId: any, commissionId: any) {
    return this.http.post<any>(
      `${this.baseUrl}add-commision/${laborId}/${commissionId}`,
      null
    );
  }

  addDefenseDate(laborId: any, defenseDate: any) {
    return this.http.post<any>(
      `${this.baseUrl}set-defense-date/${laborId}/${defenseDate}`,
      null
    );
  }

  getLaborsForCommission(commissionIds: any) {
    return this.http.post<any>(
      `${this.baseUrl}labors-by-commissions`,
      commissionIds
    );
  }

  getDefendedLabors() {
    return this.http.get<any>(`${this.baseUrl}get-defendend-labors`);
  }

  setRate(laborId: any, rate: any) {
    return this.http.put<any>(
      `${this.baseUrl}set-rate/${laborId}/${rate}`,
      null
    );
  }
}
