import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FreeThemesComponent } from './free-themes.component';

describe('FreeThemesComponent', () => {
  let component: FreeThemesComponent;
  let fixture: ComponentFixture<FreeThemesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FreeThemesComponent]
    });
    fixture = TestBed.createComponent(FreeThemesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
