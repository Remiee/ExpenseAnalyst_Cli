import { Component, OnInit, ViewChild, Input, ViewEncapsulation, Output, EventEmitter } from '@angular/core';
import { MatPaginator } from '@angular/material';
import { DataTableDataSource } from './data-table-datasource';
import { Expense } from '../../models/expense.model';
import { ExpenseService } from '../../services/expense.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class DataTableComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @Input() expenses: BehaviorSubject<Expense[]>;
  @Output() deleteExpense = new EventEmitter();

  dataSource: DataTableDataSource;
  constructor(private expenseService: ExpenseService) { }

  displayedColumns = ['Category', 'Amount', 'Comment', 'Date', 'Delete'];

  ngOnInit() {
    this.dataSource = new DataTableDataSource(this.paginator, this.expenses);
  }

  delete(id) {
    this.expenseService.delete(id)
    .subscribe(res => this.updateResult(), err => console.log(err));
  }

  updateResult() {
    this.deleteExpense.emit();
  }
}
