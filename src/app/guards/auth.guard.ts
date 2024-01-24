import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';

export const authGuard: CanActivateFn = (route, state) => {
  const toast = new NgToastService();
  const token = localStorage.getItem('token');
  const router = inject(Router);
  if (token) {
    return true;
  } else {
    router.navigate(['login']);
    toast.error({
      detail: 'GREŠKA',
      summary: 'Morate biti ulogovani!',
      duration: 5000,
    });
    return false;
  }
};
