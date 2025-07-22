import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { firstValueFrom } from 'rxjs';

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
  showPassword = false;
  restaurantId!: number;

  constructor(
    private http: HttpClient,
    private router: Router,
    private alertCtrl: AlertController
  ) {}

  ionViewWillEnter() {
    const id = localStorage.getItem('restaurantId');
    if (!id) return;

    this.restaurantId = parseInt(id, 10);

    this.http
      .get<any>(`http://localhost:3000/restaurants/${this.restaurantId}/config`)
      .subscribe((res) => {
        this.logoUrl = res.logoUrl;

        if (res.primaryColor) {
          document.documentElement.style.setProperty(
            '--ion-color-primary',
            res.primaryColor
          );
          document.documentElement.style.setProperty(
            '--ion-color-primary-shade',
            this.shadeColor(res.primaryColor, -20)
          );
          document.documentElement.style.setProperty(
            '--ion-color-primary-tint',
            this.tintColor(res.primaryColor, 20)
          );
        }
      });
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  private shadeColor(color: string, percent: number) {
    let R = parseInt(color.substring(1, 3), 16);
    let G = parseInt(color.substring(3, 5), 16);
    let B = parseInt(color.substring(5, 7), 16);

    R = parseInt(((R * (100 + percent)) / 100).toString());
    G = parseInt(((G * (100 + percent)) / 100).toString());
    B = parseInt(((B * (100 + percent)) / 100).toString());

    R = R < 255 ? R : 255;
    G = G < 255 ? G : 255;
    B = B < 255 ? B : 255;

    return `#${((1 << 24) + (R << 16) + (G << 8) + B).toString(16).slice(1)}`;
  }

  private tintColor(color: string, percent: number) {
    return this.shadeColor(color, -percent);
  }

  async mostrarAlerta(mensaje: string) {
    const alert = await this.alertCtrl.create({
      header: 'Error',
      message: mensaje,
      buttons: ['OK'],
      cssClass: 'custom-alert',
    });
    await alert.present();
  }

  async login() {
  try {
    const res: any = await firstValueFrom(
      this.http.post('http://localhost:3000/restaurant-admins/login', {
        email: this.email,
        password: this.password,
      })
    );

    console.log('Respuesta del login:', res);

    localStorage.setItem('access_token', res.access_token);
    localStorage.setItem('role', res.role);

    if (res.role === 'SUPER_ADMIN') {
      this.router.navigate(['/dashboard']);
    } else if (res.role === 'RESTAURANT_ADMIN') {
      localStorage.setItem('restaurantId', res.restaurantId);
      this.router.navigate(['/home']);
    } else if (res.role === 'CLIENTE') {
      localStorage.setItem('client_token', res.access_token); 
      this.router.navigate(['/home-client']);
    }
  } catch (err) {
    console.error('Error en login', err);
    this.mostrarAlerta('Credenciales inválidas');
  }
}

  goToRegister() {
    this.router.navigate(['/register-admin']);
  }
}
