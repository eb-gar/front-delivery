import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CartClientPage } from './cart-client.page';

describe('CartClientPage', () => {
  let component: CartClientPage;
  let fixture: ComponentFixture<CartClientPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CartClientPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
