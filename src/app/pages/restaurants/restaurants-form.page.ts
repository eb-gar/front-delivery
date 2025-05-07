import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-restaurants-form',
  templateUrl: './restaurants-form.page.html',
  styleUrls: ['./restaurants-form.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule
  ]
})
export class RestaurantsFormPage implements OnInit {
motorcyclist: any;
saveMotorcyclist() {
throw new Error('Method not implemented.');
}

  restaurant = {
    name: '',
    address: '',
    latitude: '',
    longitude: '',
    ruc: ''
  };

  constructor() {}

  ngOnInit() {}

  saveRestaurant() {
    console.log('Restaurant Data:', this.restaurant);
    alert('Restaurant saved successfully!');
  }

}
