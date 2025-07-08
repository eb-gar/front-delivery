import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  AlertController,
  LoadingController,
  NavController,
} from '@ionic/angular';
import { Router, RouterLink } from '@angular/router';
import { IonContent, IonInput } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule],
})
export class RegisterPage {
  registerForm: FormGroup;
  showPassword = false;
  isLoading = false;
  showAgeHint = false;

  constructor(
    private formBuilder: FormBuilder,
    private alertController: AlertController,
    private loadingController: LoadingController,
    public router: Router,
    private navCtrl: NavController
  ) {
    this.registerForm = this.formBuilder.group({
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
          Validators.pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/),
        ],
      ],
      email: [
        '',
        [Validators.required, Validators.email, Validators.maxLength(100)],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(30),
          Validators.minLength(8)
        ],
      ],
      age: ['', [Validators.required, Validators.min(18), Validators.max(120)]],
      terms: [false, Validators.requiredTrue],
    });
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  async onSubmit(): Promise<void> {
    if (this.registerForm.invalid) {
      this.markFormGroupTouched();
      return;
    }

    const loading = await this.loadingController.create({
      message: 'Creando tu cuenta...',
      spinner: 'crescent',
      translucent: true,
      backdropDismiss: false,
    });

    try {
      this.isLoading = true;
      await loading.present();

      const formData = this.registerForm.value;
      const userProfile = {
        name: formData.name.trim(),
        email: formData.email.trim().toLowerCase(),
        age: parseInt(formData.age.toString(), 10),
        photoUrl: 'assets/default-avatar.png',
      };

      await this.showSuccessAlert(
        '¡Registro exitoso!',
        'Tu cuenta ha sido creada correctamente. Bienvenido/a.'
      );

      // Navegar al perfil con reemplazo para no volver atrás al registro
      this.navCtrl.navigateRoot('/profile', { animated: true });
    } catch (error: any) {
      console.error('Error en registro:', error);

      let errorMessage =
        'Ocurrió un error al registrar. Por favor intenta nuevamente.';
      if (error?.error?.message) {
        errorMessage = error.error.message;
      } else if (error.message) {
        errorMessage = error.message;
      }

      await this.showErrorAlert('Error en registro', errorMessage);
    } finally {
      this.isLoading = false;
      await loading.dismiss();
    }
  }

  private markFormGroupTouched(): void {
    Object.values(this.registerForm.controls).forEach((control) => {
      control.markAsTouched();
    });
  }

  private async showSuccessAlert(
    header: string,
    message: string
  ): Promise<void> {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: [
        {
          text: 'Continuar',
          handler: () => {
            this.router.navigate(['/profile']);
          },
        },
      ],
      backdropDismiss: false,
    });

    await alert.present();
  }

  private async showErrorAlert(header: string, message: string): Promise<void> {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['Entendido'],
      cssClass: 'error-alert',
    });

    await alert.present();
  }

  get name() {
    return this.registerForm.get('name');
  }
  get email() {
    return this.registerForm.get('email');
  }
  get password() {
    return this.registerForm.get('password');
  }
}