import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllMentorshipsComponent } from './all-mentorships.component';

describe('AllMentorshipsComponent', () => {
  let component: AllMentorshipsComponent;
  let fixture: ComponentFixture<AllMentorshipsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AllMentorshipsComponent],
    });
    fixture = TestBed.createComponent(AllMentorshipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
