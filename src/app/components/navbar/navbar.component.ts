import { Component, OnInit } from '@angular/core';
import { Router } from '../../../../node_modules/@angular/router';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  user = {} as User;

  constructor(private router: Router, private authService: AuthService, private userService: UserService) { }

  ngOnInit() {
    this.userService.getUserInfo().subscribe(data => {
      this.user = data;
    });
  }

  updateProfile() {
    this.router.navigate(['profile/edit']);
  }

  logout() {
    this.authService.logout();
  }

  viewDashboard() {
    this.router.navigate(['profile']);
  }
}
