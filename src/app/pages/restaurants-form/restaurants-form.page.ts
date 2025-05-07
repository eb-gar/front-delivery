import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {
  IonHeader,
  IonTitle,
  IonToolbar,
  IonContent,
  IonItem,
  IonLabel,
  IonInput,
  IonButton
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-restaurants-form',
  templateUrl: './restaurants-form.page.html',
  styleUrls: ['./restaurants-form.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonContent,
    IonItem,
    IonLabel,
    IonInput,
    IonButton,
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
