import { Component, OnInit } from '@angular/core';
import { Router } from '../../../../node_modules/@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  registerUserData = {};

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  registerUser() {
    this.authService.registerUser(this.registerUserData)
      .subscribe(res => this.onRegisterSuccess(res.token), err => console.log(err));
  }

  onRegisterSuccess(token) {
    localStorage.setItem('token', token);
    this.router.navigate(['profile']);
  }

  switchPassword(e) {
    return e.type = e.type === 'password' ? 'text' : 'password';
  }
}
