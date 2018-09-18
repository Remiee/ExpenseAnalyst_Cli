import { Component, OnInit, ViewChild, Input, ViewEncapsulation } from '@angular/core';
import { MatPaginator } from '@angular/material';
import { DataTableDataSource } from './data-table-datasource';
import { Expense } from '../../models/expense.model';
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
  dataSource: DataTableDataSource;
  constructor() { }

  displayedColumns = ['Category', 'Amount', 'Comment', 'Date'];

  ngOnInit() {
    this.dataSource = new DataTableDataSource(this.paginator, this.expenses);
  }
}
