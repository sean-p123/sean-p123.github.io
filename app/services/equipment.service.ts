import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


export interface Equipment {
  id: number;
  name: string;
  category: string;
  description: string;
  icon: string;
}
@Injectable({
  providedIn: 'root'
})
export class EquipmentService {
private apiUrl = 'http://localhost:3000/api/equipment';

  constructor(private http: HttpClient) {}

  getEquipment(): Observable<Equipment[]> {
    return this.http.get<Equipment[]>(this.apiUrl);
  }
}
