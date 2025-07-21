import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterClientPage } from './register-client.page';

describe('RegisterClientPage', () => {
  let component: RegisterClientPage;
  let fixture: ComponentFixture<RegisterClientPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterClientPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
