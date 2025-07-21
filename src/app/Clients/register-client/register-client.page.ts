import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AlertController } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-register-client',
  templateUrl: './register-client.page.html',
  styleUrls: ['./register-client.page.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule, CommonModule],
})
export class RegisterClientPage {
  name = '';
  email = '';
  password = '';
  restaurantId = environment.restaurantId;

  constructor(
    private http: HttpClient,
    private alertCtrl: AlertController,
    private router: Router
  ) {}

  async showAlert(msg: string) {
    const alert = await this.alertCtrl.create({
      header: 'Atención',
      message: msg,
      buttons: ['OK'],
    });
    await alert.present();
  }

  register() {
    if (!this.name || !this.email || !this.password) {
      this.showAlert('Todos los campos son obligatorios');
      return;
    }

    this.http
      .post('http://localhost:3000/client-auth/register', {
        name: this.name,
        email: this.email,
        password: this.password,
        restaurantId: Number(this.restaurantId),
      })
      .subscribe({
        next: () => this.router.navigate(['/login-client']),
        error: () => this.showAlert('Error al registrar'),
      });
  }
}
