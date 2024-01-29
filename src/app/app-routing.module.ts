import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { authGuard } from './guards/auth.guard';
import { ProfAccComponent } from './components/prof-acc/prof-acc.component';
import { CreateThemeComponent } from './components/create-theme/create-theme.component';
import { FreeThemesComponent } from './components/free-themes/free-themes/free-themes.component';
import { LaborComponent } from './components/labor/labor.component';
import { AllMentorshipsComponent } from './components/all-mentorships/all-mentorships.component';
import { ProfAccReferentComponent } from './components/prof-acc-referent/prof-acc-referent.component';
import { ReferentRequestsComponent } from './components/referent-requests/referent-requests.component';
import { ReferentRatesComponent } from './components/referent-rates/referent-rates.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SearchUsersComponent } from './components/search-users/search-users.component';
import { ProfileInfoComponent } from './components/profile-info/profile-info.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'profacc', component: ProfAccComponent, canActivate: [authGuard] },
  {
    path: 'createtheme',
    component: CreateThemeComponent,
    canActivate: [authGuard],
  },
  {
    path: 'freethemes',
    component: FreeThemesComponent,
    canActivate: [authGuard],
  },
  { path: 'labor', component: LaborComponent, canActivate: [authGuard] },
  {
    path: 'allmentorships',
    component: AllMentorshipsComponent,
    canActivate: [authGuard],
  },
  {
    path: 'profaccreferent',
    component: ProfAccReferentComponent,
    canActivate: [authGuard],
  },
  {
    path: 'referentrequests',
    component: ReferentRequestsComponent,
    canActivate: [authGuard],
  },
  {
    path: 'referentrates',
    component: ReferentRatesComponent,
    canActivate: [authGuard],
  },
  {
    path: 'searchUsers',
    component: SearchUsersComponent,
    canActivate: [authGuard],
  },
  { path: 'profile', component: ProfileComponent, canActivate: [authGuard] },
  {
    path: 'profileInfo/:id',
    component: ProfileInfoComponent,
    canActivate: [authGuard],
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [authGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
