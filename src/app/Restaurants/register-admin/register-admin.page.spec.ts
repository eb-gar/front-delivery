import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterAdminPage } from './register-admin.page';

describe('RegisterAdminPage', () => {
  let component: RegisterAdminPage;
  let fixture: ComponentFixture<RegisterAdminPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterAdminPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
