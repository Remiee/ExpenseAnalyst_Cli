import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from '../../../node_modules/rxjs';
import { User } from '../models/User.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user: User;
  private updateUrl = 'http://localhost:8080/users/profile';
  private userInfoUrl = 'http://localhost:8080/users/userInfo';

  constructor(private http: HttpClient) { }

  updateUser(user): Observable<User> {
    return this.http.put<User>(this.updateUrl, user);
  }

  getUserInfo(): Observable<User> {
    return this.http.get<User>(this.userInfoUrl);
  }
}
