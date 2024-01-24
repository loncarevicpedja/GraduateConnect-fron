import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfAccReferentComponent } from './prof-acc-referent.component';

describe('ProfAccReferentComponent', () => {
  let component: ProfAccReferentComponent;
  let fixture: ComponentFixture<ProfAccReferentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfAccReferentComponent]
    });
    fixture = TestBed.createComponent(ProfAccReferentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
