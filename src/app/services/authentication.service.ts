import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, Observable, of, tap, throwError } from 'rxjs';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
    private apiUrl = ''; // API url here

  constructor(private http: HttpClient, private tokenService:TokenService) {}

  login(email: string, password: string): Observable<any> {
    // Mock response
    const mockResponse = {
        token: this.generateMockToken(),
        user: {
        email: email
        }
    };

    if (email === 'admin' && password === 'admin') {
        localStorage.setItem('access-token', JSON.stringify(mockResponse.token));
        return of(mockResponse).pipe();
    } else {
        return of( Error("Ivalid Username or Password"));
    }
  }

  logout(){
    localStorage.removeItem('access-token');
  }

  private generateMockToken(): string {
    // Generate a simple mock token
    const header = { alg: 'HS256', typ: 'JWT' };
    const payload = {name: 'John Doe', role:'admin'};// change role here to test guard
    const headerBase64 = btoa(JSON.stringify(header));
    const payloadBase64 = btoa(JSON.stringify(payload));
    const signature = 'fake-signature'; 

    return `${headerBase64}.${payloadBase64}.${signature}`;
  }
}