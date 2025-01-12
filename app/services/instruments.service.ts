import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Instrument {
  instrument_id: number;
  name: string;
  category: string;
  description: string;
  icon: string;
}

@Injectable({
  providedIn: 'root',
})
export class InstrumentsService {
  private apiUrl = 'http://localhost:3000/api/instruments';

  constructor(private http: HttpClient) {}

  getInstruments(): Observable<Instrument[]> {
    return this.http.get<Instrument[]>(this.apiUrl);
  }
}
