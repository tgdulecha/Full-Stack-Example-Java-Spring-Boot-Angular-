
 import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  
  setItem(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  getItem(key: string): any {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  }

  removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  clear(): void {
    localStorage.clear();
  }
   isAdminLoggedin(): boolean {
    if (!!this.getToken() === null) {
      return false;
    }
    const role = this.getUserRole()
    return role == 'ADMIN';
  }
   getToken(): string | null {
    return localStorage.getItem('auth_token');
  }

   getUser(): string | null {
    return localStorage.getItem('username');
  }
   getUserRole(): string | null {
    return localStorage.getItem('role');
  }

     isLoggedIn(): boolean {
    return !!this.getToken();
  }
 
}
 