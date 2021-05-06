import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private url = 'http://localhost:3000/api';
  constructor(private http: HttpClient) {}
  signUp(user: any) {
    return this.http.post<any>(this.url + '/signup', user);
  }
  signIn(user: any) {
    return this.http.post<any>(this.url + '/signin', user);
  }
}
