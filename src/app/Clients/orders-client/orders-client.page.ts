import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-orders-client',
  templateUrl: './orders-client.page.html',
  styleUrls: ['./orders-client.page.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule, CommonModule],
})
export class OrdersClientPage implements OnInit {
  pedidos: any[] = [];
  clientId = JSON.parse(atob(localStorage.getItem('client_token')!.split('.')[1])).sub;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get<any[]>(`http://localhost:3000/orders/client/${this.clientId}`).subscribe(res => {
      this.pedidos = res;
    });
  }
}
