import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule, CommonModule],
})
export class HomePage implements OnInit {
  logoUrl = '';
  restaurantName = '';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    const restaurantId = localStorage.getItem('restaurantId');
    if (!restaurantId) return;

    this.http.get<any>(`http://localhost:3000/restaurants/${restaurantId}/config`)
      .subscribe(res => {
        this.logoUrl = res.logoUrl;
        this.restaurantName = res.nombre;
      });
  }
}
