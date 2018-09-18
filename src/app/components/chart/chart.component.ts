import { Component, OnInit, Input } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Expense } from '../../models/Expense.model';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {
  @Input() expenses: BehaviorSubject<Expense[]>;
  constructor() { }

  ngOnInit() {
  }

}
