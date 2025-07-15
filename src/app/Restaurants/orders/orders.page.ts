import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IonicModule, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.page.html',
  styleUrls: ['./orders.page.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule, CommonModule],
})
export class OrdersPage implements OnInit {
  pedidos: any[] = [];
  pedidosFiltrados: any[] = [];
  filtroEstado = 'todos';
  restaurantId = localStorage.getItem('restaurantId');

  constructor(
    private http: HttpClient,
    private toastCtrl: ToastController
  ) {}

  ngOnInit() {
    this.cargarPedidos();
  }

  cargarPedidos() {
    this.http.get<any[]>(`http://localhost:3000/orders/restaurant/${this.restaurantId}`)
      .subscribe({
        next: (res) => {
          this.pedidos = res;
          this.filtrarPedidos();
        },
        error: async (err) => {
          const toast = await this.toastCtrl.create({
            message: 'Error al cargar los pedidos',
            duration: 2000,
            color: 'danger'
          });
          toast.present();
        }
      });
  }

  

  filtrarPedidos() {
    if (this.filtroEstado === 'todos') {
      this.pedidosFiltrados = [...this.pedidos];
    } else {
      this.pedidosFiltrados = this.pedidos.filter(p => p.estado === this.filtroEstado);
    }
  }

  getStatusColor(estado: string): string {
    switch (estado) {
      case 'preparando': return 'warning';
      case 'listo': return 'success';
      case 'entregado': return 'primary';
      default: return 'medium';
    }
  }

  async cambiarEstado(id: number, nuevoEstado: string) {
    this.http.patch(`http://localhost:3000/orders/${id}`, { estado: nuevoEstado })
      .subscribe({
        next: async () => {
          const toast = await this.toastCtrl.create({
            message: `Estado actualizado a ${nuevoEstado}`,
            duration: 2000,
            color: 'success'
          });
          toast.present();
          this.cargarPedidos();
        },
        error: async () => {
          const toast = await this.toastCtrl.create({
            message: 'Error al actualizar el estado',
            duration: 2000,
            color: 'danger'
          });
          toast.present();
        }
      });
  }
}