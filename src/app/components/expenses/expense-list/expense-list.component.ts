import { Component, OnInit } from '@angular/core';
import { Expense } from '../../../models/expense.model';
import { ExpenseService } from '../../../services/expense.service';

@Component({
  selector: 'app-expense-list',
  templateUrl: './expense-list.component.html',
  styleUrls: ['./expense-list.component.css']
})
export class ExpenseListComponent implements OnInit {
  expenses: Expense[];

  constructor(private expenseService: ExpenseService) { }

  ngOnInit() {
    this.expenseService.getAll().subscribe(data => {
      this.expenses = data;
    });
  }

  onExpenseChanged(expense: Expense) {
    this.expenses[0] = expense;
  }
}
