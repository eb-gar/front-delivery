import { Component } from '@angular/core';
import { RestaurantService } from '../../Super-Admin/services/restaurant.service';
import { Restaurant } from '../../Super-Admin/models/restaurant.model';
import { IonicModule, AlertController  } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { add, addOutline, fastFoodOutline, pencilOutline, trashOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule, CommonModule, RouterLink],
})
export class DashboardPage {
  restaurantes: Restaurant[] = [];

  constructor(
    private restaurantService: RestaurantService,
    private router: Router,
    private alertController: AlertController
  ) {
    addIcons({
      fastFoodOutline,
      addOutline,
      pencilOutline,
      trashOutline,
    });
  }

  ionViewWillEnter() {
    this.load();
  }

  load() {
    this.restaurantService.getAll().subscribe((data) => {
      this.restaurantes = data;
    });
  }

  editar(r: Restaurant) {
    this.router.navigate(['/form'], { state: { restaurante: r } });
  }

  async eliminar(id: number) {
    const alert = await this.alertController.create({
      header: 'Confirmar eliminación',
      message: '¿Estás seguro de que deseas eliminar este restaurante?',
      cssClass: 'custom-alert',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Eliminar',
          handler: () => {
            this.restaurantService.delete(id).subscribe(() => this.load());
          },
        },
      ],
    });

    await alert.present();
  }
}
