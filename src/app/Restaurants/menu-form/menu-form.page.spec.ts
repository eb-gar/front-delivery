import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MenuFormPage } from './menu-form.page';

describe('MenuFormPage', () => {
  let component: MenuFormPage;
  let fixture: ComponentFixture<MenuFormPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
