import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferentRatesComponent } from './referent-rates.component';

describe('ReferentRatesComponent', () => {
  let component: ReferentRatesComponent;
  let fixture: ComponentFixture<ReferentRatesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReferentRatesComponent]
    });
    fixture = TestBed.createComponent(ReferentRatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
