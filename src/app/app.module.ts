import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { MatTableModule, MatPaginatorModule, MatSortModule, MatButtonModule, MatIconModule } from '@angular/material';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MultiSelectModule} from 'primeng/multiselect';
import {CalendarModule} from 'primeng/calendar';
import {AccordionModule} from 'primeng/accordion';
import {MenuItem} from 'primeng/api';
import {ChartModule} from 'primeng/chart';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SearchComponent } from './components/search/search.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProfileComponent } from './components/profile/profile.component';
import { LandingComponent } from './components/landing/landing.component';
import { ExpenseComponent } from './components/expenses/expense/expense.component';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './services/auth.guard';
import { UserService } from './services/user.service';
import { ExpenseService } from './services/expense.service';
import { CategoryService } from './services/category.service';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { ExpenseListComponent } from './components/expenses/expense-list/expense-list.component';
import { DataTableComponent } from './components/data-table/data-table.component';
import { ChartComponent } from './components/chart/chart.component';
import { DatePipe } from '@angular/common';

// import { ExpenseEditComponent } from './components/expenses/expense-edit/expense-edit.component';

const appRoutes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'profile', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'profile/edit', component: ProfileComponent, canActivate: [AuthGuard] }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    LandingComponent,
    NavbarComponent,
    SearchComponent,
    DashboardComponent,
    ProfileComponent,
    ExpenseComponent,
    ExpenseListComponent,
    DataTableComponent,
    ChartComponent,
  ],
  imports: [
    BsDropdownModule.forRoot(),
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    BrowserAnimationsModule,
    AngularFontAwesomeModule,
    NgbModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
    MatIconModule,
    MultiSelectModule,
    CalendarModule,
    AccordionModule,
    ChartModule
  ],
  providers: [AuthService, AuthGuard, {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptorService,
    multi: true
  }, UserService, ExpenseService, CategoryService,
  DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
