import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { PractitionerDetailsService } from '../appointment.service';



@Component({
  selector: 'app-calendar-dialog',
  templateUrl: './calendar-dialog.component.html',
  styleUrls: ['./calendar-dialog.component.scss']
})
export class CalendarDialogComponent implements OnInit {

  isBooked : boolean = false;
  @Output() bookEvent = new EventEmitter<boolean>();

  constructor(
    public dialogRef: MatDialogRef<CalendarDialogComponent>, 
    private appointService :  PractitionerDetailsService
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
  }

  onBook() {
    this.isBooked = !this.isBooked;    

  }


  onSave() {
    this.dialogRef.close();
    this.bookEvent.emit(true);
    this.appointService.isBooked = true;
  }
}
