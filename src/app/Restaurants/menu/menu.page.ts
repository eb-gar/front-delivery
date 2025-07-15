import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { AlertController } from '@ionic/angular';

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

  constructor(
    private http: HttpClient,
    private router: Router,
    private alertCtrl: AlertController
  ) {}

  ngOnInit() {
    this.cargarPlatos();
  }

  cargarPlatos() {
    this.http
      .get<any[]>(
        `http://localhost:3000/dishes/restaurant/${this.restaurantId}`
      )
      .subscribe((res) => {
        this.platos = res;
      });
  }

  irAFormulario(plato?: any) {
    this.router.navigate(['/menu-form'], {
      state: { plato },
    });
  }

  async eliminar(id: number) {
  const alert = await this.alertCtrl.create({
    header: '¿Eliminar plato?',
    message: 'Esta acción no se puede deshacer.',
    buttons: [
      {
        text: 'Cancelar',
        role: 'cancel'
      },
      {
        text: 'Eliminar',
        role: 'destructive',
        handler: () => {
          this.http.delete(`http://localhost:3000/dishes/${id}`)
            .subscribe(() => this.cargarPlatos());
        }
      }
    ]
  });

  await alert.present();
}
}
