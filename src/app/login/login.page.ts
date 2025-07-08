import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormsModule
} from '@angular/forms';
import {
  AlertController,
  IonicModule,
  LoadingController,
} from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule, ReactiveFormsModule, CommonModule, FormsModule],
})
export class LoginPage {
goToAlertas() {
throw new Error('Method not implemented.');
}
showVitalDetails(arg0: string) {
throw new Error('Method not implemented.');
}
  loginForm: FormGroup;
  showPassword: boolean = false;
  isLoading: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private alertController: AlertController,
    private loadingController: LoadingController,
    private router: Router,
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  async login() {
  }

  // Implementación del método showSuccessAlert
  async showSuccessAlert() {
    const alert = await this.alertController.create({
      header: 'Éxito',
      message: 'Inicio de sesión exitoso. Bienvenido!',
      buttons: ['OK'],
      cssClass: 'success-alert'
    });

    await alert.present();
  }

  // Implementación del método handleLoginError
  async handleLoginError(error: any) {
    let errorMessage = 'Ha ocurrido un error inesperado. Por favor, intenta nuevamente.';
    
    // Manejo específico de errores según el tipo de respuesta
    if (error?.error?.message) {
      errorMessage = error.error.message;
    } else if (error?.message) {
      errorMessage = error.message;
    } else if (error?.status) {
      switch (error.status) {
        case 401:
          errorMessage = 'Credenciales incorrectas. Verifica tu email y contraseña.';
          break;
        case 404:
          errorMessage = 'Usuario no encontrado. Verifica tu email.';
          break;
        case 500:
          errorMessage = 'Error del servidor. Intenta más tarde.';
          break;
        case 0:
          errorMessage = 'Sin conexión a internet. Verifica tu conexión.';
          break;
        default:
          errorMessage = `Error ${error.status}: ${error.statusText || 'Error desconocido'}`;
      }
    }

    const alert = await this.alertController.create({
      header: 'Error de Inicio de Sesión',
      message: errorMessage,
      buttons: [
        {
          text: 'Reintentar',
          role: 'cancel',
          cssClass: 'secondary'
        },
        {
          text: '¿Olvidaste tu contraseña?',
          handler: () => {
            this.forgotPassword();
          }
        }
      ],
      cssClass: 'error-alert'
    });

    await alert.present();
  }

  private markFormGroupTouched() {
    Object.keys(this.loginForm.controls).forEach((key) => {
      const control = this.loginForm.get(key);
      control?.markAsTouched();
    });
  }

  // Navegar al registro
  goToRegister() {
    this.router.navigate(['/register']);
  }

  // Método para recuperar contraseña
  async forgotPassword() {
    const alert = await this.alertController.create({
      header: 'Recuperar Contraseña',
      message: 'Ingresa tu email para recibir instrucciones de recuperación.',
      inputs: [
        {
          name: 'email',
          type: 'email',
          placeholder: 'Email',
          value: this.loginForm.get('email')?.value || ''
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Enviar',
          handler: (data) => {
            if (data.email && this.isValidEmail(data.email)) {
              this.sendPasswordResetEmail(data.email);
              return true;
            } else {
              this.showInvalidEmailAlert();
              return false;
            }
          }
        }
      ]
    });

    await alert.present();
  }

  // Método auxiliar para validar email
  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Método para enviar email de recuperación
  private async sendPasswordResetEmail(email: string) {
    const loading = await this.loadingController.create({
      message: 'Enviando email...',
      spinner: 'crescent'
    });

    try {
      await loading.present();
      
      // Aquí iría la llamada al servicio para recuperar contraseña
      // await this.authService.resetPassword(email);
      
      // Simulamos una respuesta exitosa por ahora
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const successAlert = await this.alertController.create({
        header: 'Email Enviado',
        message: `Se han enviado las instrucciones de recuperación a ${email}`,
        buttons: ['OK']
      });

      await successAlert.present();
      
    } catch (error) {
      const errorAlert = await this.alertController.create({
        header: 'Error',
        message: 'No se pudo enviar el email de recuperación. Intenta más tarde.',
        buttons: ['OK']
      });

      await errorAlert.present();
    } finally {
      await loading.dismiss();
    }
  }

  // Método para mostrar alerta de email inválido
  private async showInvalidEmailAlert() {
    const alert = await this.alertController.create({
      header: 'Email Inválido',
      message: 'Por favor ingresa un email válido.',
      buttons: ['OK']
    });

    await alert.present();
  }
}