import { Component, OnInit } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { NgToastService } from 'ng-angular-popup';
import { AuthService } from 'src/app/services/auth.service';
import { LaborService } from 'src/app/services/labor.service';
import { ThemeService } from 'src/app/services/theme.service';

@Component({
  selector: 'app-free-themes',
  templateUrl: './free-themes.component.html',
  styleUrls: ['./free-themes.component.css'],
})
export class FreeThemesComponent implements OnInit {
  public themes: any = [];
  public themeObj: any = {};
  public hasReservedTheme: boolean = true;

  constructor(
    private theme: ThemeService,
    private auth: AuthService,
    private toast: NgToastService,
    private labor: LaborService
  ) {}

  ngOnInit(): void {
    this.theme.getFreeThemes().subscribe((res) => (this.themes = res));
    this.inspect();
  }

  getThemes() {
    this.theme.getFreeThemes().subscribe((res) => console.log(res));
  }

  getThemeFromUser() {
    let userId = this.auth.decodedToken().nameid;
    return this.theme.getThemeFromUser(userId).pipe(
      switchMap((res) => {
        this.themeObj = res;
        return this.labor.createLabor(this.themeObj);
      })
    );
  }

  reserveThemes(themeId: number) {
    let userId = this.auth.decodedToken().nameid;

    this.theme
      .reserveTheme(themeId, Number(userId))
      .pipe(
        switchMap((res) => {
          this.toast.success({
            detail: 'SUCCESS',
            summary: res.message,
            duration: 5000,
          });
          return this.getThemeFromUser();
        })
      )
      .subscribe({
        next: (res) => {
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        },
        error: (err) => {
          this.toast.error({
            detail: 'ERROR',
            summary: err.message,
            duration: 5000,
          });
        },
      });
  }

  inspect() {
    let userId = this.auth.decodedToken().nameid;
    this.theme.checkUser(Number(userId)).subscribe((res) => {
      this.hasReservedTheme = res;
    });
  }
}
