import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  Role: any;
  getUserInfo() {
    throw new Error('Method not implemented.');
  }
  isLoggedIn(): boolean {
    throw new Error('Method not implemented.');
  }
  logout() {
    throw new Error('Method not implemented.');
  }

  set token(value: string) {
    localStorage.setItem('token', value);

}


   get token(): string  {
       return localStorage.getItem('token') as string ;
   }
}
