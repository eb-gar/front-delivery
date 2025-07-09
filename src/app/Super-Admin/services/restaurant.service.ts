import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Restaurant } from '../models/restaurant.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {
  private apiUrl = 'http://localhost:3000/restaurants'; // Cambia esto si tu backend está en otra IP o puerto

  constructor(private http: HttpClient) {}

  getAll(): Observable<Restaurant[]> {
    return this.http.get<Restaurant[]>(this.apiUrl);
  }

  create(data: Restaurant): Observable<Restaurant> {
    return this.http.post<Restaurant>(this.apiUrl, data);
  }
}
