import { Component } from '@angular/core';
import { RestaurantService } from '../../Super-Admin/services/restaurant.service';
import { Restaurant } from '../../Super-Admin/models/restaurant.model';
import { NavController } from '@ionic/angular';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-form',
  templateUrl: './form.page.html',
  styleUrls: ['./form.page.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule, CommonModule],
})
export class FormPage {
  restaurante: Restaurant = {
    nombre: '',
    propietario: '',
    direccion: '',
  };
  logoFile: File | null = null;
  previewUrl: string | null = null;
  isEditing = false;

  constructor(
    private restaurantService: RestaurantService,
    private navCtrl: NavController,
    private router: Router,
    private alertController: AlertController
  ) {
    const nav = this.router.getCurrentNavigation();
    const state = nav?.extras.state as { restaurante?: Restaurant };
    if (state?.restaurante) {
      this.restaurante = { ...state.restaurante };
      this.isEditing = true;
    }
  }

  guardar() {
  if (!this.restaurante.nombre || !this.restaurante.propietario || !this.restaurante.direccion) {
    this.mostrarAlerta('Por favor completa todos los campos obligatorios.');
    return;
  }

  if (this.isEditing && this.restaurante.id) {
    this.restaurantService
      .update(this.restaurante.id, this.restaurante)
      .subscribe(() => {
        this.navCtrl.navigateBack('/dashboard');
      });
  } else {
    this.restaurantService.create(this.restaurante).subscribe((res) => {
      if (this.logoFile) {
        const formData = new FormData();
        formData.append('file', this.logoFile);
        this.restaurantService.uploadLogo(res.id!, formData).subscribe(() => {
          this.resetForm();
        });
      } else {
        this.resetForm();
      }
    });
  }
}


  resetForm() {
    this.restaurante = {
      nombre: '',
      propietario: '',
      direccion: '',
      primaryColor: '',
      secondaryColor: '',
    };
    this.logoFile = null;
    this.previewUrl = null;
    this.navCtrl.navigateBack('/dashboard');
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.logoFile = input.files[0];

      // Vista previa
      const reader = new FileReader();
      reader.onload = () => {
        this.previewUrl = reader.result as string;
      };
      reader.readAsDataURL(this.logoFile);
    }
  }

  async mostrarAlerta(mensaje: string) {
  const alert = await this.alertController.create({
    header: 'Atención',
    message: mensaje,
    buttons: ['OK'],
    cssClass: 'custom-alert'
  });

  await alert.present();
}

}
