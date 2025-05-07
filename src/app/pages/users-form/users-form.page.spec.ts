import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UsersFormPage } from './users-form.page';

describe('UsersFormPage', () => {
  let component: UsersFormPage;
  let fixture: ComponentFixture<UsersFormPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
