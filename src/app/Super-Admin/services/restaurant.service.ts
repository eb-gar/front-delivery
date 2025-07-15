import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Restaurant } from '../models/restaurant.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RestaurantService {
  getById(id: number) {
    throw new Error('Method not implemented.');
  }
  private apiUrl = 'http://localhost:3000/restaurants';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Restaurant[]> {
    return this.http.get<Restaurant[]>(this.apiUrl);
  }

  uploadLogo(id: number, formData: FormData) {
    return this.http.post(`${this.apiUrl}/${id}/upload-logo`, formData);
  }

  create(data: Restaurant): Observable<Restaurant> {
    return this.http.post<Restaurant>(this.apiUrl, data);
  }

  update(id: number, data: Partial<Restaurant>): Observable<Restaurant> {
    return this.http.patch<Restaurant>(`${this.apiUrl}/${id}`, data);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
