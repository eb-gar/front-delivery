import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonFab,
  IonFabButton,
  IonIcon,
  AlertController,
  IonButtons,
} from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { addIcons } from 'ionicons';
import { flag, bicycle, checkmark, locate } from 'ionicons/icons';

interface Coordinate {
  lat: number;
  lng: number;
}

@Component({
  selector: 'app-map-motorized',
  templateUrl: './map-motorized.page.html',
  styleUrls: ['./map-motorized.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonFab,
    IonFabButton,
    IonIcon,
  ],
})
export class MapMotorizedPage implements OnInit, OnDestroy {
  // Configuración inicial
  mapSize = { width: 500, height: 500 };
  center: Coordinate = { lat: -2.9, lng: -79.0 };
  destination: Coordinate = { lat: -2.9, lng: -79.0 };
  deliveryPosition: Coordinate = { lat: -2.91, lng: -79.01 };
  deliveryRoute: Coordinate[] = [];
  isDelivered = false;
  private animationInterval: any;

  constructor(private alertCtrl: AlertController) {
    addIcons({ flag, bicycle, checkmark, locate });
  }

  ngOnInit() {
    this.generateRoute();
    this.startDeliverySimulation();
  }

  ngOnDestroy() {
    if (this.animationInterval) {
      clearInterval(this.animationInterval);
    }
  }

  // Genera puntos intermedios para la ruta
  generateRoute() {
    const steps = 20;
    this.deliveryRoute = [];

    for (let i = 0; i <= steps; i++) {
      this.deliveryRoute.push({
        lat:
          this.deliveryPosition.lat +
          (this.destination.lat - this.deliveryPosition.lat) * (i / steps),
        lng:
          this.deliveryPosition.lng +
          (this.destination.lng - this.deliveryPosition.lng) * (i / steps),
      });
    }
  }

  // Inicia la animación del repartidor
  startDeliverySimulation() {
    let step = 0;
    this.animationInterval = setInterval(() => {
      if (step < this.deliveryRoute.length) {
        this.deliveryPosition = this.deliveryRoute[step];
        step++;
      } else {
        clearInterval(this.animationInterval);
        this.isDelivered = true;
      }
    }, 300);
  }

  // Convierte coordenadas a posición X en el mapa
  getXPosition(coord: Coordinate): number {
    const minLng = -79.05;
    const maxLng = -78.95;
    return ((coord.lng - minLng) / (maxLng - minLng)) * this.mapSize.width;
  }

  // Convierte coordenadas a posición Y en el mapa
  getYPosition(coord: Coordinate): number {
    const minLat = -2.95;
    const maxLat = -2.85;
    return (1 - (coord.lat - minLat) / (maxLat - minLat)) * this.mapSize.height;
  }

  // Genera puntos para la línea de ruta SVG
  getRoutePath(): string {
    return this.deliveryRoute
      .map((coord) => `${this.getXPosition(coord)},${this.getYPosition(coord)}`)
      .join(' ');
  }

  // Marca como entregado
  async markAsDelivered() {
    const alert = await this.alertCtrl.create({
      header: 'Confirmar entrega',
      message: '¿Desea marcar este pedido como entregado?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Confirmar',
          handler: () => {
            this.showDeliveryConfirmation();
          },
        },
      ],
    });

    await alert.present();
  }

  private async showDeliveryConfirmation() {
    const alert = await this.alertCtrl.create({
      header: 'Entrega completada',
      message: 'El pedido ha sido marcado como entregado exitosamente',
      buttons: ['OK'],
    });

    await alert.present();
  }
}
