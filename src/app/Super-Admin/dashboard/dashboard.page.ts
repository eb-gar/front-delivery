import { Component } from '@angular/core';
import { RestaurantService } from '../../Super-Admin/services/restaurant.service';
import { Restaurant } from '../../Super-Admin/models/restaurant.model';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule, CommonModule, RouterLink],
})
export class DashboardPage {
  restaurantes: Restaurant[] = [];

  constructor(private restaurantService: RestaurantService) {}

  ionViewWillEnter() {
    this.load();
  }

  load() {
    this.restaurantService.getAll().subscribe((data) => {
      this.restaurantes = data;
    });
  }
}
