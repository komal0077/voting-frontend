import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Auth {

  private baseUrl = "http://localhost:8080/api/auth";

  constructor(private http: HttpClient) {}

  register(data: any) {
    return this.http.post(`${this.baseUrl}/register`, data, { responseType: 'text' });
  }

  login(data: any) {
    return this.http.post(`${this.baseUrl}/login`, data, { responseType: 'text' });
  }

  saveToken(token: string) {
    localStorage.setItem("token", token);  // SAME KEY
  }

  getToken() {
    return localStorage.getItem("token");  // SAME KEY
  }

  isLoggedIn() {
    const token = localStorage.getItem("token"); // SAME KEY
    return !!token;
  }

  logout() {
    localStorage.removeItem("token");
  }
}

