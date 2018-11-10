import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '../../../../node_modules/@angular/router';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: User = {} as User;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.userService.getUserInfo().subscribe(data => {
      this.user = data;
    });
  }

  updateUser() {
    this.userService.updateUser(this.user)
      .subscribe(res => this.onUpdateSuccess(), err => console.log(err));
  }

  switchPassword(e) {
    return e.type = e.type === 'password' ? 'text' : 'password';
  }

  onUpdateSuccess() {
    this.router.navigate(['profile']);
  }

  onCancel() {
    this.router.navigate(['profile']);
  }
}
