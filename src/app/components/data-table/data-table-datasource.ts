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
    return this.expensesChanged;

    /*
    const dataMutations = [
      observableOf(this.expensesChanged),
      this.paginator.page,
      this.sort.sortChange
    ];

    this.paginator.length = this.expenses.length;

    return merge(...dataMutations).pipe(map(() => {
      return this.getPagedData(this.getSortedData([...this.expenses]));
    }));
    */
  }

  disconnect() { }

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(expenses: Expense[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return expenses.splice(startIndex, this.paginator.pageSize);
  }
}
