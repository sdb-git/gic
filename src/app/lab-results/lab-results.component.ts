import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { DatePipe } from '@angular/common';
import { FormControl, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { PatientDetailsService } from '../dashboard/patient-details.service';
import { MatDialog } from '@angular/material/dialog';
import { PdfViewerComponent } from './pdf-viewer/pdf-viewer.component';

export interface PeriodicElement {
  position: number;
  'Lab Name': string;  
  'Booking Id': number;
  'Booking Date': Date;
  'Completed Date': Date;
  Status: any;
  'View/Download': any;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, 'Lab Name': 'LabCorp', 'Booking Id': 100001, 'Booking Date': new Date(2016, 11, 24), 'Completed Date': new Date(2015, 15, 24), Status:'Completed', 'View/Download':'/assets/Lab_Reports/Report_1.pdf' },
  { position: 2, 'Lab Name': 'Sanofi Genzyme', 'Booking Id': 100002, 'Booking Date': new Date(2018, 18, 24), 'Completed Date': new Date(2018, 11, 24), Status:'Completed', 'View/Download':'/assets/Lab_Reports/Report_2.pdf' },
  { position: 3, 'Lab Name': 'Quest Diagnostics', 'Booking Id': 100003, 'Booking Date': new Date(1993, 6, 12), 'Completed Date': new Date(1999, 12, 15), Status:'Completed', 'View/Download':'/assets/Lab_Reports/Report_2.pdf' },
  { position: 4, 'Lab Name': 'Abbott Laboratories', 'Booking Id': 100004, 'Booking Date': new Date(2001, 7, 6), 'Completed Date': new Date(2011, 10, 6), Status:'Completed', 'View/Download':'/assets/Lab_Reports/Report_1.pdf' },
  { position: 5, 'Lab Name': 'Charles River Laboratories', 'Booking Id': 100005, 'Booking Date': new Date(2020, 5, 9), 'Completed Date': new Date(2020, 5, 9), Status:'Completed', 'View/Download':'/assets/Lab_Reports/Report_2.pdf' },
  { position: 6, 'Lab Name': 'Bio-Reference Laboratories', 'Booking Id': 100006, 'Booking Date': new Date(2008, 7, 14), 'Completed Date': new Date(2008, 7, 14), Status:'Completed', 'View/Download':'/assets/Lab_Reports/Report_1.pdf' },
  { position: 7, 'Lab Name': 'Spectra Laboratories', 'Booking Id': 100007, 'Booking Date': new Date(1998, 11, 18), 'Completed Date': new Date(1998, 11, 18), Status:'Completed', 'View/Download':'/assets/Lab_Reports/Report_2.pdf' }
];

@Component({
  selector: 'app-lab-results',
  templateUrl: './lab-results.component.html',
  styleUrls: ['./lab-results.component.scss']
})
export class LabResultsComponent implements OnInit {

  displayedColumns: string[] = ['position', 'Lab Name', 'Booking Id', 'Booking Date', 'Completed Date', 'Status', 'View/Download'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  pipe: DatePipe;

filterForm = new FormGroup({
    fromDate: new FormControl(),
    toDate: new FormControl(),
});

get fromDate() { return this.filterForm.get('fromDate')?.value; }
get toDate() { return this.filterForm.get('toDate')?.value; }

@ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
patient_data_coll:any;
  name:any;
  mobile_no:any;
  email:string = "";
  date_of_birth:string ="";
  gender:string="";

  constructor(private PatientDetailsService:PatientDetailsService, public dialog: MatDialog) {
    this.pipe = new DatePipe('en');
    this.dataSource.filterPredicate = (data: any) =>{
      console.log(data)
      if (this.fromDate && this.toDate) {
        return data['Completed Date'] >= this.fromDate && data['Completed Date'] <= this.toDate;
      }
      return true;
    }
  }

  applyFilter() {
    this.dataSource.filter = ''+Math.random();
  }

  clearFilter(){    
    this.dataSource.filter = '';
    this.filterForm.reset();
  }

  ngOnInit(): void {
    this.patient_data_coll = this.PatientDetailsService.get_patientData();
    this.dataSource.paginator = this.paginator;
    this.name= this.patient_data_coll?.name[0]?.given[0];
    this.mobile_no=this.patient_data_coll?.telecom[0]?.value;
    this.gender = this.patient_data_coll?.gender;
    this.date_of_birth = this.patient_data_coll?.birthDate;
    this.email= this.patient_data_coll?.telecom[1]?.value;    
  }  

  openPdfViewDialog(path: any) {
    console.log("VIEW", path)
    const dialogRef = this.dialog.open(PdfViewerComponent, {height: '600px',
    width: '800px',
  data:{filePath:path}});

    dialogRef.afterClosed().subscribe((result: any) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  
}
