import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormsModule,
} from '@angular/forms';
import {
  AlertController,
  IonicModule,
  LoadingController,
} from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { addIcons } from 'ionicons';
import {
  keyOutline,
  eyeOutline,
  eyeOffOutline,
  mail,
  mailOutline,
} from 'ionicons/icons';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    HttpClientModule,
  ],
})
export class LoginPage {
  loginForm: FormGroup;
  showPassword = false;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private alertCtrl: AlertController,
    private router: Router
  ) {
    addIcons({
      mailOutline,
      keyOutline,
      eyeOutline,
      eyeOffOutline,
    });

    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }

  async login() {
    if (this.loginForm.invalid) return;

    const { email, password } = this.loginForm.value;

    try {
      const res: any = await firstValueFrom(
        this.http.post('http://localhost:3000/auth/login', { email, password })
      );

      // Guardar el token
      localStorage.setItem('access_token', res.access_token);

      // Redirigir al home/dashboard
      this.router.navigate(['/dashboard']);
    } catch (error: any) {
      const alert = await this.alertCtrl.create({
        header: 'Error',
        message:
          error?.error?.message || 'No se pudo registrar. Inténtalo de nuevo.',
        buttons: ['OK'],
      });
      await alert.present();
    }
  }
}
