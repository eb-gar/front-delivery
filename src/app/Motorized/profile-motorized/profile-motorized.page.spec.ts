import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfileMotorizedPage } from './profile-motorized.page';

describe('ProfileMotorizedPage', () => {
  let component: ProfileMotorizedPage;
  let fixture: ComponentFixture<ProfileMotorizedPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileMotorizedPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
