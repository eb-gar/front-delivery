import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-menu-form',
  templateUrl: './menu-form.page.html',
  styleUrls: ['./menu-form.page.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule, CommonModule],
})
export class MenuFormPage {
  plato: any = {
    name: '',
    description: '',
    price: null,
  };
  imageFile: File | null = null;
  previewUrl: string | null = null;
  isEdit = false;
  restaurantId = Number(localStorage.getItem('restaurantId'));

  constructor(private router: Router, private http: HttpClient) {
    const state = this.router.getCurrentNavigation()?.extras?.state as { plato?: any };
    if (state?.plato) {
      this.plato = { ...state.plato };
      this.isEdit = true;
      this.previewUrl = state.plato.imageUrl;
    }
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.imageFile = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.previewUrl = reader.result as string;
      };
      reader.readAsDataURL(this.imageFile);
    }
  }

  guardar() {
    const data = {
      ...this.plato,
      restaurantId: this.restaurantId,
      price: parseFloat(this.plato.price),
    };

    const request = this.isEdit
      ? this.http.patch(`http://localhost:3000/dishes/${this.plato.id}`, data)
      : this.http.post(`http://localhost:3000/dishes`, data);

    request.subscribe((res: any) => {
      if (this.imageFile) {
        const formData = new FormData();
        formData.append('file', this.imageFile);
        this.http.post(`http://localhost:3000/dishes/${res.id}/upload-image`, formData)
          .subscribe(() => this.router.navigate(['/menu']));
      } else {
        this.router.navigate(['/menu']);
      }
    });
  }
}
