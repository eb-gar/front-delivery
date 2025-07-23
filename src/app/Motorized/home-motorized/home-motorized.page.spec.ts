import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeMotorizedPage } from './home-motorized.page';

describe('HomeMotorizedPage', () => {
  let component: HomeMotorizedPage;
  let fixture: ComponentFixture<HomeMotorizedPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeMotorizedPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
