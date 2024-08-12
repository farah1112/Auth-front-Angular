import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './model/user.model';
import { AuthResponse } from './model/auth-response.model';
import { RegistrationRequest } from '../services/models';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = "http://localhost:8089/SpringMVC/User";
 
  constructor(private http: HttpClient) {}

  register(params: { body: RegistrationRequest }): Observable<any> {
    return this.http.post(`${this.apiUrl}/Register`, params.body);
  }
  authenticate(credentials: any): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/authenticate`, credentials);
  }
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/all-users`);
  }

  updateUser(id: number, user: User): Observable<any> {
    return this.http.put(`${this.apiUrl}/update-user/${id}`, user);
  }
  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete-user/${id}`);
  }
}

