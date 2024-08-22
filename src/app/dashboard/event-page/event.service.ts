import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EventModel, NewEvent } from './event';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private baseUrl = "http://localhost:8089/SpringMVC/events";

  constructor(private http: HttpClient) {}

  getAllEvents(page: number, size: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/all-events`, {
      params: new HttpParams()
        .set('page', page.toString())
        .set('size', size.toString())
    });
  }
  
  getEventById(id: number): Observable<EventModel> {
    return this.http.get<EventModel>(`${this.baseUrl}/event/${id}`);
  }
  addEvent(formData: FormData): Observable<string> {
    return this.http.post<string>(`${this.baseUrl}/event/add`, formData, { responseType: 'text' as 'json' });
  }
  

  deleteEvent(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  updateEvent(id: number, formData: FormData): Observable<any> {
    return this.http.put(`${this.baseUrl}/event/${id}`, formData, { responseType: 'text' });
 }
 
 rateEvent(eventId: number, rating: number): Observable<any> {
  return this.http.put(`${this.baseUrl}/event/${eventId}/rate`, { rating }, { responseType: 'json' });
}

  getSimilarEvents(eventId: number): Observable<EventModel[]> {
    return this.http.get<EventModel[]>(`${this.baseUrl}/similar/${eventId}`);
  }

  subscribe(eventId: number, email: string): Observable<string> {
    return this.http.post<string>(`${this.baseUrl}/subscribe`, { eventId, email });
  }
  getLatestEvents(): Observable<EventModel[]> {
    return this.http.get<EventModel[]>(`${this.baseUrl}/latest`);
  }
}
