import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from '../../../node_modules/rxjs';
import { Category } from '../models/Category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  categories: Category[];

  private categoryListUrl = 'http://localhost:8080/categories';
  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<Category[]> {
    return this.httpClient.get<Category[]>(this.categoryListUrl);
  }
}
