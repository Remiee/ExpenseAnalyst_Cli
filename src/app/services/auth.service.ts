import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '../../../node_modules/@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private registerUrl = 'http://localhost:8080/users/registration';
  private loginUrl = 'http://localhost:8080/users/login';

  constructor(private http: HttpClient, private router: Router) { }

  registerUser(user) {
    return this.http.post<any>(this.registerUrl, user);
  }

  loginUser(user) {
    return this.http.post<any>(this.loginUrl, user);
  }

  loggedIn() {
      return localStorage.getItem('token') ? true : false;
  }

  getToken() {
    return localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['']);
  }
}
