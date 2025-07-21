import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  AlertController,
  IonicModule,
  LoadingController,
  NavController,
} from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { CommonModule } from '@angular/common';
import {
  mailOutline,
  keyOutline,
  eyeOutline,
  eyeOffOutline,
} from 'ionicons/icons';
import { addIcons } from 'ionicons';

@Component({
  selector: 'app-register-admin',
  templateUrl: './register-admin.page.html',
  styleUrls: ['./register-admin.page.scss'],
  standalone: true,
  imports: [IonicModule, ReactiveFormsModule, CommonModule],
})
export class RegisterAdminPage {
  registerForm: FormGroup;
  isLoading = false;
  showPassword = false;
  logoUrl = '';
  restaurantId!: number;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private router: Router,
    private navCtrl: NavController
  ) {
    addIcons({
      mailOutline,
      keyOutline,
      eyeOutline,
      eyeOffOutline,
    });

    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  async onSubmit() {
    if (this.registerForm.invalid) return;

    const { email, password } = this.registerForm.value;
    this.isLoading = true;

    try {
      await firstValueFrom(
        this.http.post('http://localhost:3000/restaurant-admins/register', {
          email: email.trim().toLowerCase(),
          password,
          restaurantId: this.restaurantId,
        })
      );

      const alert = await this.alertCtrl.create({
        header: 'Registro exitoso',
        message: '¡Tu cuenta ha sido creada!',
        buttons: ['OK'],
      });
      await alert.present();
      this.router.navigate(['/login-admin']);
    } catch (err: any) {
      const alert = await this.alertCtrl.create({
        header: 'Error',
        message: err?.error?.message || 'No se pudo registrar.',
        buttons: ['OK'],
      });
      await alert.present();
    } finally {
      this.isLoading = false;
    }
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  goToLogin() {
    this.navCtrl.navigateForward('/login-admin', { animated: false });
  }

  private shadeColor(color: string, percent: number) {
    let R = parseInt(color.substring(1, 3), 16);
    let G = parseInt(color.substring(3, 5), 16);
    let B = parseInt(color.substring(5, 7), 16);

    R = Math.min(255, Math.floor(R * (100 + percent) / 100));
    G = Math.min(255, Math.floor(G * (100 + percent) / 100));
    B = Math.min(255, Math.floor(B * (100 + percent) / 100));

    return `#${((1 << 24) + (R << 16) + (G << 8) + B).toString(16).slice(1)}`;
  }

  private tintColor(color: string, percent: number) {
    return this.shadeColor(color, -percent);
  }
}
