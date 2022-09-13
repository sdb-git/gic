import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppointmentComponent } from './appointment/appointment.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SummaryComponent } from './summary/summary.component';
import { LabResultsComponent } from './lab-results/lab-results.component';
import { BookingHistoryComponent } from './booking-history/booking-history.component';

//const routes: Routes = [];

const routes: Routes = [
   { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
   { path: 'book', component: AppointmentComponent } , 
   { path: 'dashboard', component: DashboardComponent },
   { path: 'summary', component: SummaryComponent },
   {path: 'labresult', component: LabResultsComponent},
   {path: 'history', component: BookingHistoryComponent},
  // { path: 'page2', component: Page2Component },
  // { path: 'page3', component: Page3Component },
  // { path: 'page4', component: Page4Component },
  // { path: 'page5', component: Page5Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
