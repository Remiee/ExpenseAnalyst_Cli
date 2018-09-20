import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from '../../../node_modules/rxjs';
import { Expense } from '../models/Expense.model';

@Injectable()
export class ExpenseService {
  expenses: Expense[];

  private expenseListUrl = 'http://localhost:8080/users/expenses';
  private createExpenseUrl = 'http://localhost:8080/expenses';
  private deleteExpenseUrl = 'http://localhost:8080/expenses';

  constructor(private http: HttpClient) { }

  getAll(category?: string, fromDate?: string, toDate?: string): Observable<Expense[]> {
    let params = null;
    if (category && fromDate && toDate) {
      params = {
        category: category,
        fromDate: fromDate,
        toDate: toDate
      };
    }
    return this.http.get<Expense[]>(`${this.expenseListUrl}`, { params: params});
  }

  get(id: string): Expense {
    return this.expenses.find(expense => expense.id === id);
  }

  newExpense(expense) {
    return this.http.post<any>(this.createExpenseUrl, expense);
  }

  delete(id) {
    return this.http.delete<any>(`${this.deleteExpenseUrl}/${id}`);
  }
}

