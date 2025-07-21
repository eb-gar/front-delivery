import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-client-home',
  templateUrl: './home-client.page.html',
  styleUrls: ['./home-client.page.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule, CommonModule, RouterLink],
})
export class HomeClientPage implements OnInit {
  restaurantId = localStorage.getItem('restaurantId');
  platos: any[] = [];
  carrito: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
  const storedCart = localStorage.getItem('carrito');
  if (storedCart) {
    this.carrito = JSON.parse(storedCart);
  }

  this.http.get<any[]>(`http://localhost:3000/dishes/restaurant/${this.restaurantId}`).subscribe(res => {
    this.platos = res;
  });
}

agregarAlCarrito(plato: any) {
  const carritoActual = JSON.parse(localStorage.getItem('carrito') || '[]');
  carritoActual.push(plato);
  localStorage.setItem('carrito', JSON.stringify(carritoActual));
}
}
