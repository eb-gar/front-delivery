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
  IonButton,
  IonSelect,
  IonSelectOption
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-motorcyclists-form',
  templateUrl: './motorcyclists-form.page.html',
  styleUrls: ['./motorcyclists-form.page.scss'],
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
    IonSelect,
    IonSelectOption,
    RouterModule
  ]
})
export class MotorcyclistsFormPage implements OnInit {

  motorcyclist = {
    rate: '',
    vehicleType: '',
    plate: '',
    available: true,
    currentLocation: ''
  };

  constructor() {}

  ngOnInit() {}

  saveMotorcyclist() {
    console.log('Motorcyclist Data:', this.motorcyclist);
    alert('Motorcyclist saved successfully!');
  }

}
