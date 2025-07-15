import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AlertController } from '@ionic/angular';
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
  data: any = {};
  logoFile: File | null = null;
  previewUrl: string | null = null;

  constructor(private http: HttpClient, private alertCtrl: AlertController) {}

  ngOnInit() {
    const restaurantId = localStorage.getItem('restaurantId');
    if (!restaurantId) return;

    this.http.get<any>(`http://localhost:3000/restaurants/${restaurantId}/config`)
      .subscribe(res => {
        this.data = { ...res };
        this.previewUrl = res.logoUrl;
      });
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.logoFile = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.previewUrl = reader.result as string;
      };
      reader.readAsDataURL(this.logoFile);
    }
  }

  async guardar() {
    const restaurantId = localStorage.getItem('restaurantId');
    if (!restaurantId) return;

    // Actualizar datos
    this.http.patch(`http://localhost:3000/restaurants/${restaurantId}`, this.data)
      .subscribe(() => {
        if (this.logoFile) {
          const formData = new FormData();
          formData.append('file', this.logoFile);

          this.http.post(`http://localhost:3000/restaurants/${restaurantId}/upload-logo`, formData)
            .subscribe(() => this.mostrarAlerta('Datos actualizados correctamente'));
        } else {
          this.mostrarAlerta('Datos actualizados correctamente');
        }
      });
  }

  async mostrarAlerta(msg: string) {
    const alert = await this.alertCtrl.create({
      header: 'Éxito',
      message: msg,
      buttons: ['OK']
    });
    await alert.present();
  }
}
