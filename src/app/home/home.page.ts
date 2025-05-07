import { Component } from '@angular/core';
<<<<<<< HEAD
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';
=======
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; // <-- AÑADIR
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton
} from '@ionic/angular/standalone';
>>>>>>> 619349fca731e2ff975bf8ce47c5405edbae43a9

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
<<<<<<< HEAD
  imports: [IonHeader, IonToolbar, IonTitle, IonContent],
})
export class HomePage {
  constructor() {}
}
=======
  standalone: true,
  imports: [
    CommonModule,
    RouterModule, // <-- AÑADIR AQUÍ TAMBIÉN
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButton
  ]
})
export class HomePage {}
>>>>>>> 619349fca731e2ff975bf8ce47c5405edbae43a9
