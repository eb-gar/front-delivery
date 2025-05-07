import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RestaurantsFormPage } from './restaurants-form.page';

describe('RestaurantsFormPage', () => {
  let component: RestaurantsFormPage;
  let fixture: ComponentFixture<RestaurantsFormPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RestaurantsFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
