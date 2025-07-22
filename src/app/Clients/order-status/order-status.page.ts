import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-order-status',
  templateUrl: './order-status.page.html',
  styleUrls: ['./order-status.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule],
})
export class OrderStatusPage implements OnInit {
  pedido: any;

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit() {
    const pedidoId = this.route.snapshot.paramMap.get('id');
    this.http.get(`http://localhost:3000/orders/${pedidoId}`).subscribe(res => {
      this.pedido = res;
    });
  }

  getStatusColor(estado: string): string {
    switch (estado) {
      case 'preparando': return 'warning';
      case 'listo': return 'success';
      case 'entregado': return 'primary';
      default: return 'medium';
    }
  }
}
