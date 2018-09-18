import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '../../../../node_modules/@angular/router';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { ExpenseService } from '../../services/expense.service';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../models/category.model';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  closeResult: string;
  user = {} as User;
  categories: Category[];
  newExpense = {};

  constructor(private modalService: NgbModal, private router: Router, private authService: AuthService,
    private userService: UserService, private categoryService: CategoryService, private expenseService: ExpenseService) { }

  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
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

  ngOnInit() {
    this.userService.getUserInfo().subscribe(data => {
      this.user = data;
    });
    this.categoryService.getAll().subscribe(data => {
      this.categories = data;
    });
  }

  createExpense() {
    this.expenseService.newExpense(this.newExpense)
      .subscribe(res => this.onCreateSuccess(), err => console.log(err));
  }

  onCreateSuccess() {
    this.router.navigate(['profile']);
  }
}
