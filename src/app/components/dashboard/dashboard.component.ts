import { Component, OnInit } from '@angular/core';
import { SearchParams } from '../../models/searchParams.model';
import { Expense } from '../../models/expense.model';
import { ExpenseService } from '../../services/expense.service';
import { BehaviorSubject } from 'rxjs';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  expensesChanged: BehaviorSubject<Expense[]> = new BehaviorSubject<Expense[]>([]);

  constructor(private expenseService: ExpenseService,
    private datePipe: DatePipe) { }

  ngOnInit() {
    this.expenseService.getAll().subscribe(res => this.expensesChanged.next(res), err => console.log(err));
  }

  filter(searchParams: SearchParams) {
    console.log(searchParams);
    this.expenseService.getAll(searchParams.category ? searchParams.category : '0',
      this.datePipe.transform(searchParams.fromDate ? searchParams.fromDate : new Date('1970-01-01'), 'yyyy-MM-dd'),
      this.datePipe.transform(searchParams.toDate ? searchParams.toDate : new Date('2048-12-31'), 'yyyy-MM-dd'))
      .subscribe(res => this.expensesChanged.next(res), err => console.log(err));
  }
}
