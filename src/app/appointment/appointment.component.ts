import { Component, OnInit } from '@angular/core';
import { ValueProvider } from '@angular/core';
import {  
  DayService,  
  WeekService,  
  WorkWeekService,  
  MonthService,  
  AgendaService  
} from '@syncfusion/ej2-angular-schedule';  
import { CalendarDialogComponent } from './calendar-dialog/calendar-dialog.component';

import {MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { PractitionerDetailsService } from './appointment.service';

interface Doctor {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.scss']
})
export class AppointmentComponent implements OnInit {

 cardio : boolean = false;
  //constructor(DayService: ValueProvider, WeekService: ValueProvider, WorkWeekService: ValueProvider, MonthService: ValueProvider, AgendaService: ValueProvider){
    selectedValue1: string = '';
    selectedValue2: string = '';
    selectedValue3: string = '';

    name : string = '';
    showHistory : boolean = false;

    practDetail : any;
  
    specality: Doctor[] = [
      {value: 'allergy', viewValue: 'Allergist'},
      {value: 'bari', viewValue: 'Bariatrics'},
      {value: 'cardio', viewValue: 'Cardiologist'},
      {value: 'cold', viewValue: 'Covid Consultation'},
      {value: 'dia', viewValue: 'Diabetology'},
      {value: 'ent', viewValue: 'ENT'},
      {value: 'nep', viewValue: 'Nephrology'},
      {value: 'ortho', viewValue: 'Orthopaedics'},
      {value: 'phy', viewValue: 'Physiotherapy'},
      {value: 'rhm', viewValue: 'Rhematology'},
      {value: 'uro', viewValue: 'Urology'},
    ];

    hospital: Doctor[] = [
      {value: 'h1', viewValue: 'Northwell Health'},
      {value: 'h2', viewValue: 'Heart and Health of plainview'},
      {value: 'h3', viewValue: 'Long Island Heart Specialists'},
    ];

    consultant: Doctor[] = [
      {value: 'd1', viewValue: 'Ronald Bone'},
      {value: 'd2', viewValue: 'Bora Thomas'},
      {value: 'd3', viewValue: 'Stephen Hewitt'},
      {value: 'd1', viewValue: 'Marck Cohen'},
      {value: 'd2', viewValue: 'Nimish Guja'},
      {value: 'd3', viewValue: 'Anna Gawil'},
    ];

    constructor(public dialog: MatDialog,private practitioner : PractitionerDetailsService) {}
      ngOnInit(): void {
        this.practitioner.getPractitionerDetails().subscribe((resp  =>{
          this.practDetail = resp;
          //only one practitioner detail is pulled from FHIR service for prototype
          this.name  = this.practDetail.name[0].prefix + " " + this.practDetail.name[0].given + " " + this.practDetail.name[0].family;
        }));
    }

  onSearch() {
    this.cardio = true;   
  } 

  onBookEvent(value : any ) {
    this.showHistory = value;
  }

  openDialog(): void {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;

    this.dialog.open(CalendarDialogComponent, dialogConfig);
  }

}
