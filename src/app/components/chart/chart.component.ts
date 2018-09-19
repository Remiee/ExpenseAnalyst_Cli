import { Component, OnInit, Input } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Expense } from '../../models/Expense.model';
import { DashboardComponent } from '../dashboard/dashboard.component';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {

  expenseSums: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  expenses: Expense[];

  data: any;
  constructor(private dashBoardComponent: DashboardComponent) {
  }

  ngOnInit() {
    this.dashBoardComponent.expensesChanged.subscribe(res => {
      this.expenses = res;
      this.expenseSums = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      this.generateChartData();
      this.initChart();
    });
  }

  private initChart() {
    this.data = {
      labels: ['Jan', 'Feb', 'March', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'],
      datasets: [{
        label: 'Total cost',
        backgroundColor: '#969ba3',
        borderColor: '#969ba3',
        data: this.expenseSums
      }],
    };
  }

  private generateChartData() {
    this.expenses.forEach((expense) => {
      this.expenseSums[new Date(expense.spentAt).getMonth()] += expense.amount;
    });
  }

}
