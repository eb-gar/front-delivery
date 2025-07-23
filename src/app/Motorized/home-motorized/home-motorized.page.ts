import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { MotorizedService } from '../motorized.service';

@Component({
  selector: 'app-home-motorized',
  templateUrl: './home-motorized.page.html',
  styleUrls: ['./home-motorized.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class HomeMotorizedPage implements OnInit {
  stats: any = {};

  constructor(private motorizedService: MotorizedService) {}

  ngOnInit() {
    this.motorizedService.getStats().subscribe(data => {
      this.stats = data;
    });
  }
}

