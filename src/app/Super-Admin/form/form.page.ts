import { Component } from '@angular/core';
import { RestaurantService } from '../../Super-Admin/services/restaurant.service';
import { Restaurant } from '../../Super-Admin/models/restaurant.model';
import { NavController } from '@ionic/angular';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form',
  templateUrl: './form.page.html',
  styleUrls: ['./form.page.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule],
})
export class FormPage {
  restaurante: Restaurant = {
    nombre: '',
    propietario: '',
    direccion: '',
  };

  isEditing = false;

  constructor(
    private restaurantService: RestaurantService,
    private navCtrl: NavController,
    private router: Router
  ) {
    const nav = this.router.getCurrentNavigation();
    const state = nav?.extras.state as { restaurante?: Restaurant };
    if (state?.restaurante) {
      this.restaurante = { ...state.restaurante };
      this.isEditing = true;
    }
  }

  guardar() {
    if (this.isEditing && this.restaurante.id) {
      this.restaurantService
        .update(this.restaurante.id, this.restaurante)
        .subscribe(() => {
          this.navCtrl.navigateBack('/dashboard');
        });
    } else {
      this.restaurantService.create(this.restaurante).subscribe(() => {
        this.restaurante = { nombre: '', propietario: '', direccion: '' };
        this.navCtrl.navigateBack('/dashboard');
      });
    }
  }
}
