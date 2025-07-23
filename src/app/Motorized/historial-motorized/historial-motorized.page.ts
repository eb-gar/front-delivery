import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { MotorizedService } from '../motorized.service';
import { Order } from '../Interface/order.interface';

@Component({
  selector: 'app-history-motorized',
  templateUrl: './historial-motorized.page.html',
  styleUrls: ['./historial-motorized.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class HistorialMotorizedPage implements OnInit {
  orders: any[] = [];

  constructor(private motorizedService: MotorizedService) {}

  ngOnInit() {
    this.motorizedService.getOrderHistory().subscribe((data) => {
      this.orders = data;
    });
  }
}
