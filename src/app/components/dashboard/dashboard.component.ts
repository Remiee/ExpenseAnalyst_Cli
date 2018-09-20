import { Component, OnInit } from '@angular/core';
import { SearchParams } from '../../models/searchParams.model';
import { Expense } from '../../models/expense.model';
import { ExpenseService } from '../../services/expense.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  expensesChanged: BehaviorSubject<Expense[]> = new BehaviorSubject<Expense[]>([]);
  searchParams: SearchParams;

  constructor(private expenseService: ExpenseService, private datePipe: DatePipe) { }

  ngOnInit() {
    this.searchParams = null;
    this.loadData();
  }

  filter(searchParams: SearchParams) {
    this.searchParams = searchParams;
    this.loadData();
  }

  loadData() {
    let dataObs: Observable<Expense[]> = null;
    if (this.searchParams) {
      dataObs = this.expenseService.getAll(this.searchParams.category ? this.searchParams.category : '0',
        this.datePipe.transform(this.searchParams.fromDate ? this.searchParams.fromDate : new Date('1970-01-01'), 'yyyy-MM-dd'),
        this.datePipe.transform(this.searchParams.toDate ? this.searchParams.toDate : new Date('2048-12-31'), 'yyyy-MM-dd'));
    } else {
      dataObs = this.expenseService.getAll();
    }
    dataObs.subscribe(res => this.expensesChanged.next(res), err => console.log(err));
  }


}
