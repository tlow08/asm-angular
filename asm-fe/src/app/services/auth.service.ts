import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
export type User = {
  email: string;
  password: string;
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl ='/api/auth';
  constructor(private http: HttpClient){}

  registerUSer(data :User): Observable<User>{
    return this.http.post<User>(`${this.apiUrl}/register`,data);
  }
  loginUser(data: User): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/login`, data); // Adjust API endpoint for login
  }
}
