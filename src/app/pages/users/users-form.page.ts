import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-users-form',
  templateUrl: './users-form.page.html',
  styleUrls: ['./users-form.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule
  ]
})
export class UsersFormPage implements OnInit {

  user = {
    name: '',
    email: '',
    phone: '',
    password: '',
    role: '', 
  };

  constructor() { }

  ngOnInit() { }

  saveUser() {
    console.log('User Data:', this.user);
    alert('User saved successfully!');
  }

}
