// auth/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import { LocalStorageService } from '../local-storage/local-storage.service';

interface SignupRequest {
  username: string;
  email: string;
  password: string;
}

interface LoginRequest {
  name: string;
  description: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private baseUrl = 'http://localhost:8080';
  private token = '';

  constructor(private http: HttpClient, private router: Router, private localstorage: LocalStorageService) { }

  signup(data: SignupRequest): Observable<any> {
    return this.http.post(`${this.baseUrl}/signup`, data);
  }

  login(credentials: LoginRequest): Observable<any> {
    return this.http.post<{ token: string, username: string, role: string }>(`${this.baseUrl}/login`, credentials).pipe(
      tap(response => {
        localStorage.setItem('auth_token', response.token);
        localStorage.setItem('username', response.username);
        localStorage.setItem('role', response.role);
        //console.log('Token received:', this.token);
      })
    );
  }
  logout(): void {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('username');
    localStorage.removeItem('role');
    this.router.navigate(['/login']);
  }


  isLoggedIn(): boolean {
    return !!this.getToken();
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
  getUserRole(): string  {
    return localStorage.getItem('role')!;
  }


}


//credentials: { email: string; password: string }
/* In Angular, an Observable is a key concept provided by the RxJS (Reactive Extensions for JavaScript) library. It represents a stream of data that can be observed over time. Observables are commonly used in Angular for handling asynchronous operations, such as:

HTTP requests

User input events

WebSocket messages

Timers and intervals */