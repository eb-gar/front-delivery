import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.page.html',
  styleUrls: ['./orders.page.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule, CommonModule],
})
export class OrdersPage implements OnInit {
  pedidos: any[] = [];
  restaurantId = localStorage.getItem('restaurantId');

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.cargarPedidos();
  }

  cargarPedidos() {
    this.http
      .get<any[]>(
        `http://localhost:3000/orders/restaurant/${this.restaurantId}`
      )
      .subscribe((res) => {
        this.pedidos = res;
      });
  }

  cambiarEstado(id: number, nuevoEstado: string) {
    this.http
      .patch(`http://localhost:3000/orders/${id}`, {
        estado: nuevoEstado,
      })
      .subscribe(() => this.cargarPedidos());
  }
}
