import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OrderStatusPage } from './order-status.page';

describe('OrderStatusPage', () => {
  let component: OrderStatusPage;
  let fixture: ComponentFixture<OrderStatusPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderStatusPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
