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

   set role(value: string) {
    localStorage.setItem('role', value);
  }

  get role(): string {
    // Ensure that `role` is never null by providing a default value
    return localStorage.getItem('role') || '';
  }
}
