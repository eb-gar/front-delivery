import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AlertController } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-client-login',
  templateUrl: './login-client.page.html',
  styleUrls: ['./login-client.page.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule, CommonModule],
})
export class LoginClientPage {
  email = '';
  password = '';

  constructor(private http: HttpClient, private alertCtrl: AlertController, private router: Router) {}

  async showAlert(msg: string) {
    const alert = await this.alertCtrl.create({ header: 'Atención', message: msg, buttons: ['OK'] });
    await alert.present();
  }

  login() {
    if (!this.email || !this.password) {
      this.showAlert('Ingrese su email y contraseña');
      return;
    }

    this.http.post<any>('http://localhost:3000/client-auth/login', {
      email: this.email,
      password: this.password
    }).subscribe({
      next: (res) => {
        localStorage.setItem('client_token', res.access_token);
        localStorage.setItem('restaurantId', res.restaurantId);
        this.router.navigate(['/home-client']);
      },
      error: () => this.showAlert('Credenciales inválidas')
    });
  }
}
