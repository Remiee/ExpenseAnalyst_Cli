import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { SearchParams } from '../../models/searchParams.model';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../models/category.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchParams: SearchParams = new SearchParams();
  categories: Category[];

  @Output() searchParamsChanged: EventEmitter<SearchParams> = new EventEmitter<SearchParams>();

  constructor(private categoryService: CategoryService) { }

  ngOnInit() {
    this.categoryService.getAll().subscribe(data => {
      this.categories = data;
    });
  }

  onSearch() {
    this.searchParamsChanged.emit(this.searchParams);
  }
}
