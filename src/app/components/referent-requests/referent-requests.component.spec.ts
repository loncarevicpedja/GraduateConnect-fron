import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferentRequestsComponent } from './referent-requests.component';

describe('ReferentRequestsComponent', () => {
  let component: ReferentRequestsComponent;
  let fixture: ComponentFixture<ReferentRequestsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReferentRequestsComponent]
    });
    fixture = TestBed.createComponent(ReferentRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
