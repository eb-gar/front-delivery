import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { addIcons } from 'ionicons';
import { trashOutline } from 'ionicons/icons';

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

  constructor(private http: HttpClient, private router: Router) {
    addIcons({
      trashOutline,
    });
  }

  ngOnInit() {
    const storedCart = localStorage.getItem('carrito');
    if (storedCart) {
      this.carrito = JSON.parse(storedCart);
      this.total = this.carrito.reduce((sum, p) => sum + p.price, 0);
    }
  }

  hacerPedido() {
  if (!this.clientToken) return;

  const tokenData = JSON.parse(atob(this.clientToken.split('.')[1]));
  const clientId = tokenData.sub;

  const items = this.carrito.map(p => ({
  platoId: Number(p.platoId), // ← Asegúrate que sea un número
  cantidad: Number(p.cantidad || 1)
}));

console.log('🛒 Enviando pedido:', {
  clientId,
  restaurantId: Number(this.restaurantId),
  estado: 'pendiente',
  total: this.total,
  items
});


  const body = {
    clientId: Number(clientId),
    restaurantId: Number(this.restaurantId),
    estado: 'pendiente',
    total: this.total,
    items
  };

  this.http.post('http://localhost:3000/orders', body).subscribe(
    (pedidoCreado: any) => {
      localStorage.removeItem('carrito');
      this.router.navigate(['/order-status', pedidoCreado.id]);
    }, error => {
  console.error('Error al crear el pedido:', error.error.message);
});
}
}
