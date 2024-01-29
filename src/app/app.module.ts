import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NgToastModule } from 'ng-angular-popup';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { ProfAccComponent } from './components/prof-acc/prof-acc.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AuthService } from './services/auth.service';
import { CreateThemeComponent } from './components/create-theme/create-theme.component';
import { FreeThemesComponent } from './components/free-themes/free-themes/free-themes.component';
import { LaborComponent } from './components/labor/labor.component';
import { AllMentorshipsComponent } from './components/all-mentorships/all-mentorships.component';
import { ProfAccReferentComponent } from './components/prof-acc-referent/prof-acc-referent.component';
import { ReferentRequestsComponent } from './components/referent-requests/referent-requests.component';
import { FormsModule } from '@angular/forms';
import { ReferentRatesComponent } from './components/referent-rates/referent-rates.component';
import { DropdownComponent } from './components/dropdown/dropdown.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SearchUsersComponent } from './components/search-users/search-users.component';
import { ProfileInfoComponent } from './components/profile-info/profile-info.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    DashboardComponent,
    ProfAccComponent,
    NavbarComponent,
    CreateThemeComponent,
    FreeThemesComponent,
    LaborComponent,
    AllMentorshipsComponent,
    ProfAccReferentComponent,
    ReferentRequestsComponent,
    ReferentRatesComponent,
    DropdownComponent,
    ProfileComponent,
    SearchUsersComponent,
    ProfileInfoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgToastModule,
    FormsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
