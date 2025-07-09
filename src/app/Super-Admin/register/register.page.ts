import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormsModule,
} from '@angular/forms';
import { AlertController, IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { LoadingController, NavController } from '@ionic/angular';
import { addIcons } from 'ionicons';
import {
  keyOutline,
  eyeOutline,
  eyeOffOutline,
  mail,
  mailOutline,
} from 'ionicons/icons';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    HttpClientModule,
  ],
})
export class RegisterPage {
  registerForm: FormGroup;
  isLoading = false;
  showPassword = false;

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

  async goToLogin() {
    const loading = await this.loadingCtrl.create({
      message: 'Cargando...',
      spinner: 'crescent',
      duration: 500, // Medio segundo para ocultar el parpadeo
    });

    await loading.present();

    // Ir a login SIN animación para evitar ese corte visual
    await this.navCtrl.navigateForward('/login', { animated: false });
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  async onSubmit() {
    if (this.registerForm.invalid) return;

    const formData = this.registerForm.value;
    const payload = {
      email: formData.email.trim().toLowerCase(),
      password: formData.password,
    };

    this.isLoading = true;

    try {
      await firstValueFrom(
        this.http.post('http://localhost:3000/auth/register', payload)
      );

      const alert = await this.alertCtrl.create({
        header: 'Registro exitoso',
        message: '¡Tu cuenta ha sido creada!',
        buttons: ['OK'],
      });
      await alert.present();

      this.router.navigate(['/login'], {
        skipLocationChange: false,
      });
    } catch (error: any) {
      const alert = await this.alertCtrl.create({
        header: 'Error',
        message:
          error?.error?.message || 'No se pudo registrar. Inténtalo de nuevo.',
        buttons: ['OK'],
      });
      await alert.present();
    } finally {
      this.isLoading = false;
    }
  }
}
