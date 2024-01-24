import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class CommissionService {
  public baseUrl: string = 'https://localhost:7296/api/Commission/';
  constructor(private http: HttpClient, private router: Router) {}

  createCommission() {
    return this.http.post<any>(`${this.baseUrl}create-commission`, null);
  }

  getLastCommission() {
    return this.http.get<any>(`${this.baseUrl}last-created`);
  }

  getCommissions(membersId: any) {
    return this.http.get<any>(`${this.baseUrl}user-commissions/${membersId}`);
  }

  getCommissionUsers(commisionId: any) {
    return this.http.get<any>(
      `${this.baseUrl}commission-members/${commisionId}`
    );
  }

  addCommissionMembers(commissionId: any, listOfUsers: any[]) {
    var objForSent = {
      Id: commissionId,
      CommissionMembers: listOfUsers,
    };

    return this.http.post<any>(
      `${this.baseUrl}add-commission-member`,
      objForSent
    );
  }
}
