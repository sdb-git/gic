import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatsidenavComponent } from './matsidenav/matsidenav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { AppMaterialModule } from './shared/app-material.module';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AppointmentComponent } from './appointment/appointment.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import {  
  ScheduleModule  
} from '@syncfusion/ej2-angular-schedule';
import { CalendarDialogComponent } from './appointment/calendar-dialog/calendar-dialog.component';
import { SummaryComponent } from './summary/summary.component';
import { LabResultsComponent } from './lab-results/lab-results.component';
import { BookingHistoryComponent } from './booking-history/booking-history.component'; 
import {MatDialogModule} from '@angular/material/dialog';
import { RefillComponent } from './refill/refill.component';
import  { PdfViewerComponent } from './lab-results/pdf-viewer/pdf-viewer.component';

import { PdfViewerModule } from 'ng2-pdf-viewer';


@NgModule({
  declarations: [
    AppComponent,
    MatsidenavComponent,
    AppointmentComponent,
    DashboardComponent,
    CalendarDialogComponent,
    SummaryComponent,
    LabResultsComponent,
    BookingHistoryComponent,
    RefillComponent,
    PdfViewerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatDialogModule,
    // MatToolbarModule,
    // MatButtonModule,
    // MatSidenavModule,
    // MatIconModule,
    // MatListModule,
    FormsModule,
    AppMaterialModule,
    FlexLayoutModule,
    ScheduleModule,
    HttpClientModule,  
    PdfViewerModule
   // MatButtonModule
  ],
  providers: [],
  entryComponents: [CalendarDialogComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
