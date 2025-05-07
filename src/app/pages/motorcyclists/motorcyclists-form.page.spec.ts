import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MotorcyclistsFormPage } from './motorcyclists-form.page';

describe('MotorcyclistsFormPage', () => {
  let component: MotorcyclistsFormPage;
  let fixture: ComponentFixture<MotorcyclistsFormPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MotorcyclistsFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
