import { Injectable } from '@angular/core';
import { jwtDecode } from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  decodeToken(token: string): any {
    try {
      return jwtDecode(token);
    } catch (error) {
      console.error('Error decoding token', error);
      return null;
    }
  }

  getTokenPayload(): any {
    const token = localStorage.getItem('access-token');
    if (token) {
      return this.decodeToken(token);
    }
    return null;
  }
}