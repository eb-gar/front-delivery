import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OrdersClientPage } from './orders-client.page';

describe('OrdersClientPage', () => {
  let component: OrdersClientPage;
  let fixture: ComponentFixture<OrdersClientPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdersClientPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
