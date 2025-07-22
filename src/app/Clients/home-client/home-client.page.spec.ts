import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeClientPage } from './home-client.page';

describe('HomeClientPage', () => {
  let component: HomeClientPage;
  let fixture: ComponentFixture<HomeClientPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeClientPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
