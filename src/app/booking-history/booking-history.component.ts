import { AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';


export interface Booking {
  bookingId: string,
  hospital: string,
  date: string,
  speciality : string,
  doctor : string,
  status : string
}

const ELEMENT_DATA: Booking[] = [
  {bookingId: '00010', hospital: 'NortWest Hospital', date: 'Aug 19 2022', speciality: 'Cardiologist',doctor: 'Bora Thomas', status: 'Confirmed'},
  {bookingId: '00009', hospital: 'Long Island Hospital', date: 'Mar 14 2022', speciality: 'Cardiologist',doctor: 'Anna Gawil', status: 'Canceled'},
  {bookingId: '00008', hospital: 'Mayo Clinic', date: 'Jan 19 2022', speciality: 'Cardiologist',doctor: 'Bora Thomas', status: 'Complete'},
  {bookingId: '00007', hospital: 'Neuro Institute', date: 'Dec 15 2021', speciality: 'NueroScience',doctor: 'Christopher M', status: 'Complete'},
  {bookingId: '00006', hospital: 'St Johns Hospital', date: 'Aug 30 2021', speciality: 'Orthopaedics',doctor: 'Sandeep Rao', status: 'Complete'},
  {bookingId: '00005', hospital: 'Newton Medical centre', date: 'Jun 5 2021', speciality: 'General',doctor: 'Ron Mathew', status: 'Complete'},
  {bookingId: '00004', hospital: 'Northwest Hospital ', date: 'Mar 22 2021', speciality: 'Cardiologist',doctor: 'Yong Lenung', status: 'Complete'},
  {bookingId: '00003', hospital: 'St Michael Medical Center', date: 'Jan 5 2021', speciality: 'Cardiologist',doctor: 'Viny Malhotra', status: 'Canceled'},
  {bookingId: '00002', hospital: 'Mayo Clinic', date: 'Dec 15 2020', speciality: 'General',doctor: 'Frank B', status: 'Complete'},
  {bookingId: '00001', hospital: 'Long Island Hospital', date: 'Nov 10 2019', speciality: 'General',doctor: 'Sarah Jayson', status: 'Complete'},
];

@Component({
  selector: 'app-booking-history',
  templateUrl: './booking-history.component.html',
  styleUrls: ['./booking-history.component.scss']
})
export class BookingHistoryComponent implements OnInit, AfterViewInit {

  constructor() { }

  ngOnInit(): void {
  }

  displayedColumns: string[] = ['bookingId', 'Hospital', 'date', 'speciality','doctor','status'];
  dataSource = new MatTableDataSource<Booking>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}




