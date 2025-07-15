import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IonicModule, LoadingController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-menu-form',
  templateUrl: './menu-form.page.html',
  styleUrls: ['./menu-form.page.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule, CommonModule],
})
export class MenuFormPage {
  plato: any = {
    name: '',
    description: '',
    price: null,
  };
  imageFile: File | null = null;
  previewUrl: string | null = null;
  isEdit = false;
  restaurantId = Number(localStorage.getItem('restaurantId'));

  constructor(
    private router: Router,
    private http: HttpClient,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController
  ) {
    const state = this.router.getCurrentNavigation()?.extras?.state as { plato?: any };
    if (state?.plato) {
      this.plato = { ...state.plato };
      this.isEdit = true;
      this.previewUrl = state.plato.imageUrl || null;
    }
  }

  triggerFileInput() {
    document.getElementById('fileInput')?.click();
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.imageFile = input.files[0];
      
      // Validar tipo de archivo
      if (!this.imageFile.type.match('image.*')) {
        this.mostrarError('Por favor, selecciona una imagen válida');
        return;
      }

      // Validar tamaño (máximo 2MB)
      if (this.imageFile.size > 2 * 1024 * 1024) {
        this.mostrarError('La imagen no debe superar los 2MB');
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        this.previewUrl = reader.result as string;
      };
      reader.readAsDataURL(this.imageFile);
    }
  }

  async guardar() {
    const loading = await this.loadingCtrl.create({
      message: this.isEdit ? 'Actualizando plato...' : 'Guardando plato...',
      spinner: 'crescent'
    });
    await loading.present();

    const data = {
      ...this.plato,
      restaurantId: this.restaurantId,
      price: parseFloat(this.plato.price),
    };

    try {
      // Paso 1: Guardar datos del plato
      const res: any = await (this.isEdit
        ? this.http.patch(`http://localhost:3000/dishes/${this.plato.id}`, data).toPromise()
        : this.http.post(`http://localhost:3000/dishes`, data).toPromise());

      // Paso 2: Si hay imagen, subirla
      if (this.imageFile) {
        const formData = new FormData();
        formData.append('file', this.imageFile);
        await this.http.post(`http://localhost:3000/dishes/${res.id}/upload-image`, formData).toPromise();
      }

      await loading.dismiss();
      this.mostrarExito(this.isEdit ? 'Plato actualizado correctamente' : 'Plato creado correctamente');
      this.router.navigate(['/menu']);
    } catch (error) {
      await loading.dismiss();
      this.mostrarError('Error al guardar el plato. Por favor, inténtalo nuevamente.');
      console.error('Error:', error);
    }
  }

  async mostrarError(mensaje: string) {
    const alert = await this.alertCtrl.create({
      header: 'Error',
      message: mensaje,
      buttons: ['OK'],
      cssClass: 'error-alert'
    });
    await alert.present();
  }

  async mostrarExito(mensaje: string) {
    const alert = await this.alertCtrl.create({
      header: 'Éxito',
      message: mensaje,
      buttons: ['OK'],
      cssClass: 'success-alert'
    });
    await alert.present();
  }
}