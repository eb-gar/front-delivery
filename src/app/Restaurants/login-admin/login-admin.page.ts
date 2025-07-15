import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-login-admin',
  templateUrl: './login-admin.page.html',
  styleUrls: ['./login-admin.page.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule, CommonModule],
})
export class LoginAdminPage {
  email = '';
  password = '';
  logoUrl = '';
  restaurantId = 1; 

  constructor(
    private http: HttpClient,
    private router: Router,
    private alertCtrl: AlertController
  ) {}

  ionViewWillEnter() {
    this.http.get<any>(`http://localhost:3000/restaurants/${this.restaurantId}/config`) 
      .subscribe(res => {
        this.logoUrl = res.logoUrl;
      });
  }

  async mostrarAlerta(mensaje: string) {
    const alert = await this.alertCtrl.create({
      header: 'Error',
      message: mensaje,
      buttons: ['OK']
    });
    await alert.present();
  }

  login() {
    if (!this.email || !this.password) {
      this.mostrarAlerta('Ingresa correo y contraseña');
      return;
    }

    this.http.post<any>('http://localhost:3000/restaurant-admins/login', {
      email: this.email,
      password: this.password
    }).subscribe({
      next: async (res) => {
        localStorage.setItem('token', res.access_token);
        localStorage.setItem('restaurantId', res.restaurantId);

        this.http.get<any>(`http://localhost:3000/restaurants/${res.restaurantId}/config`) 
          .subscribe(config => {
            document.documentElement.style.setProperty('--ion-color-primary', config.primaryColor);
            document.documentElement.style.setProperty('--ion-color-secondary', config.secondaryColor);
          });

        this.router.navigate(['/home']);
      },
      error: err => {
        this.mostrarAlerta('Credenciales incorrectas');
      }
    });
  }
}