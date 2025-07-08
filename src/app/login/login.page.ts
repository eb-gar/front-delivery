import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule, CommonModule]
})
export class LoginPage {
  email: string = '';
  password: string = '';
  showPassword: boolean = false;
  isLoading: boolean = false;

  onSubmit() {
    this.isLoading = true;
    console.log('Login submitted', this.email, this.password);

    // Simular carga
    setTimeout(() => {
      this.isLoading = false;
    }, 1500);
  }

  onForgotPassword() {
    console.log('Forgot password clicked');
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
    const input = document.querySelector('ion-input[name="password"]') as any;
    input.type = this.showPassword ? 'text' : 'password';
  }
}
