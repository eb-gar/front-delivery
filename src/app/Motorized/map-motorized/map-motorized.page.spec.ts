import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MapMotorizedPage } from './map-motorized.page';

describe('MapMotorizedPage', () => {
  let component: MapMotorizedPage;
  let fixture: ComponentFixture<MapMotorizedPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MapMotorizedPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
