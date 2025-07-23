import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HistorialMotorizedPage } from './historial-motorized.page';

describe('HistorialMotorizedPage', () => {
  let component: HistorialMotorizedPage;
  let fixture: ComponentFixture<HistorialMotorizedPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(HistorialMotorizedPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
