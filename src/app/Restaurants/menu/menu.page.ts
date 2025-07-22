import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { addCircleOutline } from 'ionicons/icons';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule, CommonModule],
})
export class MenuPage implements OnInit {
  platos: any[] = [];
  restaurantId = localStorage.getItem('restaurantId');
  isLoading = true;
  cardColors = [
    '#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', 
    '#98D8C8', '#F06292', '#7986CB', '#9575CD',
    '#64B5F6', '#4DB6AC', '#81C784', '#FFD54F'
  ];

  constructor(
    private http: HttpClient,
    private router: Router,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController
  ) {
    addIcons({
      addCircleOutline, 
    });
  }

  ngOnInit() {
    this.cargarPlatos();
  }

  getRandomCardColor(): string {
    return this.cardColors[Math.floor(Math.random() * this.cardColors.length)];
  }

  async cargarPlatos() {
    const loading = await this.loadingCtrl.create({
      message: 'Cargando menú...',
      spinner: 'crescent'
    });
    await loading.present();

    this.http.get<any[]>(`http://localhost:3000/dishes/restaurant/${this.restaurantId}`)
      .subscribe({
        next: (res) => {
          this.platos = res;
          loading.dismiss();
          this.isLoading = false;
        },
        error: (err) => {
          loading.dismiss();
          this.mostrarError('Error al cargar el menú');
          this.isLoading = false;
        }
      });
  }

  irAFormulario(plato?: any) {
    this.router.navigate(['/menu-form'], {
      state: { plato },
    });
  }

  async eliminar(id: number) {
    const alert = await this.alertCtrl.create({
      header: 'Confirmar eliminación',
      message: '¿Estás seguro de que deseas eliminar este plato?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Eliminar',
          handler: async () => {
            const loading = await this.loadingCtrl.create({
              message: 'Eliminando...',
              spinner: 'lines'
            });
            await loading.present();
            
            this.http.delete(`http://localhost:3000/dishes/${id}`)
              .subscribe({
                next: () => {
                  loading.dismiss();
                  this.mostrarExito('Plato eliminado correctamente');
                  this.cargarPlatos();
                },
                error: () => {
                  loading.dismiss();
                  this.mostrarError('Error al eliminar el plato');
                }
              });
          }
        }
      ]
    });

    await alert.present();
  }

  async mostrarError(mensaje: string) {
    const alert = await this.alertCtrl.create({
      header: 'Error',
      message: mensaje,
      buttons: ['OK']
    });
    await alert.present();
  }

  async mostrarExito(mensaje: string) {
    const alert = await this.alertCtrl.create({
      header: 'Éxito',
      message: mensaje,
      buttons: ['OK']
    });
    await alert.present();
  }
}