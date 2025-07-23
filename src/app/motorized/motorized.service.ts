import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order } from './Interface/order.interface';

@Injectable({ providedIn: 'root' })
export class MotorizedService {
  private api = '/api/motorized';

  constructor(private http: HttpClient) {}

  getProfile() {
    return this.http.get(`${this.api}/profile`);
  }

  updateProfile(data: any) {
    return this.http.put(`${this.api}/profile`, data);
  }

  getActiveOrder() {
    return this.http.get(`${this.api}/orders/active`);
  }

  getOrderHistory(): Observable<Order[]> {
  return this.http.get<Order[]>(`${this.api}/orders/history`);
}

  getStats() {
    return this.http.get(`${this.api}/stats`);
  }

  marcarEntregado(orderId: string) {
  return this.http.patch(`${this.api}/orders/${orderId}/entregado`, {});
}

}
