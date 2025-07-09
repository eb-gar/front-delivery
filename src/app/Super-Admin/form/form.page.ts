import { Component } from '@angular/core';
import { RestaurantService } from '../../Super-Admin/services/restaurant.service';
import { Restaurant } from '../../Super-Admin/models/restaurant.model';
import { NavController } from '@ionic/angular';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.page.html',
  styleUrls: ['./form.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    FormsModule
  ]
})
export class FormPage {
  restaurante: Restaurant = {
    nombre: '',
    propietario: '',
    direccion: ''
  };

  constructor(
    private restaurantService: RestaurantService,
    private navCtrl: NavController
  ) {}

  crear() {
    this.restaurantService.create(this.restaurante).subscribe(() => {
      this.restaurante = { nombre: '', propietario: '', direccion: '' };
      this.navCtrl.navigateBack('/dashboard'); // Cambia la ruta si es diferente
    });
  }
}
