import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginClientPage } from './login-client.page';

describe('LoginClientPage', () => {
  let component: LoginClientPage;
  let fixture: ComponentFixture<LoginClientPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginClientPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
