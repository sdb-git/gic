import {AfterViewInit, Component, ElementRef, ViewChild, OnInit} from '@angular/core';
import {Chart, Point, registerables   } from "chart.js";
import { PatientDetailsService } from './patient-details.service'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  title = 'Healthcare';
  @ViewChild('chart')
  private chartRef: ElementRef;
  private chart: Chart;
  private data: any;
  collPatientDetails: any;
  constructor(private patientDetails: PatientDetailsService) {
    Chart.register(...registerables);
    this.data = {
      datasets: [
        {
          label: 'Blood Presure(Systolic)',
          data: [120,110,95,127,104,101,94],
          borderColor: 'red',
          backgroundColor: 'red',
          yAxisID: 'y',
        },
        {
          label: 'Heart Rate',
          data: [75,100,60,90,83,99,80],
          borderColor: '#33BBFF',
          backgroundColor: '#33BBFF',
          yAxisID: 'y',
        },
        {
          label: 'Glucose Level',
          data: [100,120,115,150,180,178,165],
          borderColor: '#FFD133',
          backgroundColor: '#FFD133',
          yAxisID: 'y',
        }
      ],
      labels: ['Jan', "Feb", 'Mar', 'Apr', 'May',  'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    }
  }
  ngAfterViewInit(): void {
    console.log('--------------------', this.chartRef.nativeElement)
      this.chart = new Chart(this.chartRef.nativeElement, {
        type: 'line',
        data: this.data,
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
            },
            title: {
              display: true,
              text: 'Your Health Pattern'
            }
          }
        },
      }
      ) 
  }

  ngOnInit(){
    console.log('Oninit')
    this.patientDetails.getPatientDetails().subscribe((resp =>{
      console.log("RESP", resp)
      this.collPatientDetails = resp;
    }))
  }
  BPCall(){
    console.log("----------------------------------------")
  }

  getAge(dateString: any) 
  {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) 
    {
        age--;
    }
    return age;
  }

}
