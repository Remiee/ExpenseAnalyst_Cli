import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/Category.model';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { CategoryService } from 'src/app/services/category.service';
import { ExpenseService } from 'src/app/services/expense.service';

@Component({
  selector: 'app-new-expense',
  templateUrl: './new-expense.component.html',
  styleUrls: ['./new-expense.component.css']
})
export class NewExpenseComponent implements OnInit {
  closeResult: string;
  categories: Category[];
  newExpense = {};

  constructor(private modalService: NgbModal, private categoryService: CategoryService, private expenseService: ExpenseService,
    private dashBoardComponent: DashboardComponent) { }

  ngOnInit() {
    this.categoryService.getAll().subscribe(data => {
      this.categories = data;
    });
  }

  createExpense() {
    this.expenseService.newExpense(this.newExpense)
      .subscribe(res => this.onCreateSuccess(), err => console.log(err));
  }

  onCreateSuccess() {
    this.dashBoardComponent.loadData();
    this.newExpense = {};
  }

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
}
