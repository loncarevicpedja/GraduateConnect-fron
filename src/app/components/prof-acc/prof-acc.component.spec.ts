import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfAccComponent } from './prof-acc.component';

describe('ProfAccComponent', () => {
  let component: ProfAccComponent;
  let fixture: ComponentFixture<ProfAccComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfAccComponent]
    });
    fixture = TestBed.createComponent(ProfAccComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
