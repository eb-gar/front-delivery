import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MotorizedService } from '../motorized.service';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile-motorized',
  templateUrl: './profile-motorized.page.html',
  styleUrls: ['./profile-motorized.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule]
})
export class ProfileMotorizedPage implements OnInit {
  profileForm: FormGroup;

  constructor(private fb: FormBuilder, private motorizedService: MotorizedService) {
    this.profileForm = this.fb.group({
      name: [''],
      email: [''],
      phone: [''],
    });
  }

  ngOnInit() {
    this.motorizedService.getProfile().subscribe(data => {
      this.profileForm.patchValue(data);
    });
  }

  save() {
    this.motorizedService.updateProfile(this.profileForm.value).subscribe();
  }
}
