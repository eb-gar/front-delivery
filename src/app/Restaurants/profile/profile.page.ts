import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AlertController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule, CommonModule],
})
export class ProfilePage implements OnInit {
  data: any = {
    nombre: '',
    direccion: '',
    primaryColor: '#3880ff',
    secondaryColor: '#3dc2ff'
  };
  logoFile: File | null = null;
  previewUrl: string | null = null;

  constructor(
    private http: HttpClient,
    private alertCtrl: AlertController,
    private router: Router,
    private loadingCtrl: LoadingController
  ) {}

  // En tu ngOnInit, puedes establecer colores iniciales más atractivos
ngOnInit() {
  const restaurantId = localStorage.getItem('restaurantId');
  if (!restaurantId) return;

  this.http.get<any>(`http://localhost:3000/restaurants/${restaurantId}/config`)
    .subscribe(res => {
      this.data = { 
        nombre: res.nombre || '',
        direccion: res.direccion || '',
        // Colores iniciales más vibrantes
        primaryColor: res.primaryColor || '#4a6bdf',
        secondaryColor: res.secondaryColor || '#ff7d42'
      };
      this.previewUrl = res.logoUrl;
      
      // Aplicar los colores inmediatamente
      this.applyColorPreview();
    });
}

  triggerFileInput() {
    document.getElementById('logoInput')?.click();
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      
      // Validar tipo de archivo
      if (!file.type.match('image.*')) {
        this.mostrarError('Por favor selecciona una imagen válida');
        return;
      }
      
      // Validar tamaño (max 2MB)
      if (file.size > 2 * 1024 * 1024) {
        this.mostrarError('La imagen no debe superar los 2MB');
        return;
      }

      this.logoFile = file;
      const reader = new FileReader();
      reader.onload = () => {
        this.previewUrl = reader.result as string;
      };
      reader.readAsDataURL(this.logoFile);
    }
  }

  applyColorPreview() {
    if (this.data.primaryColor) {
      document.documentElement.style.setProperty('--ion-color-primary', this.data.primaryColor);
    }
    if (this.data.secondaryColor) {
      document.documentElement.style.setProperty('--ion-color-secondary', this.data.secondaryColor);
    }
  }

  async guardar() {
    const restaurantId = localStorage.getItem('restaurantId');
    if (!restaurantId) return;

    const loading = await this.mostrarLoading('Guardando cambios...');
    
    try {
      // Actualizar datos básicos
      await this.http.patch(`http://localhost:3000/restaurants/${restaurantId}`, {
        nombre: this.data.nombre,
        direccion: this.data.direccion,
        primaryColor: this.data.primaryColor,
        secondaryColor: this.data.secondaryColor
      }).toPromise();

      // Subir logo si hay uno nuevo
      if (this.logoFile) {
        const formData = new FormData();
        formData.append('file', this.logoFile);
        await this.http.post(`http://localhost:3000/restaurants/${restaurantId}/upload-logo`, formData).toPromise();
      }

      loading.dismiss();
      await this.mostrarExito('Configuración actualizada correctamente');
      this.router.navigate(['/home']);
    } catch (error) {
      loading.dismiss();
      this.mostrarError('Error al guardar los cambios');
    }
  }

  async mostrarLoading(message: string) {
  const loading = await this.loadingCtrl.create({
    message,
    spinner: 'crescent',
    translucent: true
  });
  await loading.present();
  return loading;
}

  async mostrarExito(msg: string) {
    const alert = await this.alertCtrl.create({
      header: 'Éxito',
      message: msg,
      buttons: ['OK']
    });
    await alert.present();
  }

  async mostrarError(msg: string) {
    const alert = await this.alertCtrl.create({
      header: 'Error',
      message: msg,
      buttons: ['OK']
    });
    await alert.present();
  }
}