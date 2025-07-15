import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
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

  constructor(
    private http: HttpClient,
    private router: Router,
    private alertCtrl: AlertController
  ) {}

  ngOnInit() {
    this.loadRestaurantData();
  }

  loadRestaurantData() {
    const restaurantId = localStorage.getItem('restaurantId');
    if (!restaurantId) return;

    this.http.get<any>(`http://localhost:3000/restaurants/${restaurantId}/config`)
      .subscribe({
        next: (res) => {
          this.logoUrl = res.logoUrl;
          this.restaurantName = res.nombre;
          // Aplicar colores personalizados si existen
          if (res.primaryColor) {
            document.documentElement.style.setProperty('--ion-color-primary', res.primaryColor);
          }
        },
        error: (err) => {
          console.error('Error loading restaurant data:', err);
        }
      });
  }

  navigateTo(route: string) {
    this.router.navigate([route]);
  }

  async logout() {
    const alert = await this.alertCtrl.create({
      header: 'Cerrar sesión',
      message: '¿Estás seguro de que deseas salir?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Salir',
          handler: () => {
            localStorage.removeItem('token');
            localStorage.removeItem('restaurantId');
            this.router.navigate(['/login']);
          }
        }
      ]
    });

    await alert.present();
  }
}