import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-client-cart',
  templateUrl: './cart-client.page.html',
  styleUrls: ['./cart-client.page.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule, CommonModule],
})
export class CartClientPage implements OnInit {
  carrito: any[] = [];
  total = 0;
  clientToken = localStorage.getItem('client_token');
  restaurantId = localStorage.getItem('restaurantId');

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    const storedCart = localStorage.getItem('carrito');
    if (storedCart) {
      this.carrito = JSON.parse(storedCart);
      this.total = this.carrito.reduce((sum, p) => sum + p.precio, 0);
    }
  }

  hacerPedido() {
  if (!this.clientToken) return;

  const tokenData = JSON.parse(atob(this.clientToken.split('.')[1]));
  const clientId = tokenData.sub;

  this.http.post('http://localhost:3000/client-auth/cliente', {
    clientId,
    restaurantId: Number(this.restaurantId),
    total: this.total,
    items: this.carrito.map(p => p.nombre)
  }).subscribe(() => {
    localStorage.removeItem('carrito');
    this.router.navigate(['/orders-client']);
  });
}
}
