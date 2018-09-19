import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';
import { Expense } from '../../models/expense.model';

export interface Expense {
  category: string;
  amount: number;
  comment: string;
  spentAt: string;
}

export class DataTableDataSource extends DataSource<any> {
  constructor(private paginator: MatPaginator, private expensesChanged: Observable<Expense[]>) {
    super();
  }

  connect(): Observable<Expense[]> {
    return this.expensesChanged.pipe(map((item) => {
      this.paginator.length = item.length;
      return this.getPagedData(this.getSortedData(item));
    }));

    // const dataMutations = [
    //   observableOf(this.expensesChanged),
    //   this.paginator.page,
    //   this.sort.sortChange
    // ];

    // return merge(...dataMutations).pipe(map(() => {
    // }));

  }

  disconnect() { }

  private getSortedData(expenses: Expense[]): Expense[] {
    return expenses;
  }

  private getPagedData(expenses: Expense[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return expenses.splice(startIndex, this.paginator.pageSize);
  }
}
