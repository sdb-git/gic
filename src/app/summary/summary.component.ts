import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {PatientDetailsService} from '../dashboard/patient-details.service';
import {MatDialog} from '@angular/material/dialog';
import{RefillComponent} from '../refill/refill.component';
import { PdfViewerComponent } from '../lab-results/pdf-viewer/pdf-viewer.component';


export interface Medications {
  name: string;
  position: number;
  dosage:string,
  start_date:string,
  stop_date:string,
  prescribedBy:string,
  'View/Download':any

}

export interface Vaccinations {
  for: string;
  position: number;
  vaccine_given:string,
  dose:number,
  date_due:string,
  date_given:string


}

export interface HealthProblems {
  name: string;
  position: number;
  initial_finding:string,
  last_tested:string,
}

export interface AdmissionHistory {
  admission: string;
  position: number;
  discharge_date:string,
  doctor_name:string,
  primary_diagnosis:string,
  treatment:string,
}
export interface OutpatientVisits {
  admission: string;
  position: number;
  doctor_name:string,
  speciality:string,
  reason:string,
}
export interface Vitals {
  date: string;
  position: number;
  fasting_sugar_level:number,
  pp_sugar_level:number,
  bp:string,
  oxygen_saturation:string,
  heart_rate:string,
}

const ELEMENT_DATA_MEDICATIONS: Medications[] = [
  {position: 1, name: 'Atorva', dosage:'1 tab Daily', start_date:'01/01/2021',stop_date:'12/31/2022',prescribedBy:'Dr. Jones','View/Download':'/assets/medical_prescription/prescription.pdf'},
  {position: 2, name: 'Thyroxin', dosage:'1 tab Daily', start_date:'01/01/2021',stop_date:'12/31/2022',prescribedBy:'Dr. Thomas','View/Download':'/assets/medical_prescription/prescription.pdf'},
  {position: 3, name: 'vitamin b12', dosage:'1 tab Daily', start_date:'01/01/2021',stop_date:'12/31/2022',prescribedBy:'Dr. Thomas','View/Download':'/assets/medical_prescription/prescription.pdf'},
 
 
];

const ELEMENT_DATA_VACCINATIONS: Vaccinations[] = [
  {position: 1, for: 'Covid', vaccine_given:'Covidshield', dose:1,date_due:'08/01/2022',date_given:"05/05/2022"},
  {position: 2, for: 'Covid', vaccine_given:'Covidshield', dose:1,date_due:'',date_given:"08/05/2022"},
  
 
 
];

const ELEMENT_DATA_ADMISSION_HISTORY: AdmissionHistory[] = [
  {position: 1, admission: '01/01/2021', discharge_date:'02/01/2021', doctor_name:'Dr John',primary_diagnosis:'Hyperglycemia',treatment:'Medical Management'},
  {position: 2, admission: '04/01/2021', discharge_date:'05/01/2021', doctor_name:'Dr Thomas',primary_diagnosis:'Gall stone',treatment:'Cholecysteomy'},
];
const ELEMENT_DATA_OUTPATIENT_VISITS: OutpatientVisits[] = [
  {position: 1, admission: '01/01/2021', doctor_name:'Dr John',speciality:'General Medicine',reason:'fever'},
  {position: 2, admission: '01/01/2022', doctor_name:'Dr Tom',speciality:'orthopedics','reason':'leg pain'},
  
 
 
];
const ELEMENT_DATA_VITALS: Vitals[] = [
  {position: 1, date: '01/01/2021', fasting_sugar_level:80,pp_sugar_level:130,bp:'',oxygen_saturation:'',heart_rate:''},
  {position: 1, date: '01/01/2022', fasting_sugar_level:80,pp_sugar_level:120 ,bp:'120/90',oxygen_saturation:'',heart_rate:'60-100'},
 
 
];

const ELEMENT_DATA_HEALTHPROBLEMS: HealthProblems[] = [
  {position: 1, name: 'Diabetes', initial_finding:'01/01/2021', last_tested:"05/05/2022"},
 // {position: 1, name: 'Thyroid', initial_finding:'01/01/2020', last_tested:"01/01/2022"},
  
 
 
];

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit {
  patient_data_coll:any;
  address:any;
  name:any;
  mobile_no:any;
  email:string = "";
  date_of_birth:string ="";
  gender:string="";


  constructor(private PatientDetailsService:PatientDetailsService,public dialog: MatDialog) { }

  ngOnInit(): void {
    this.PatientDetailsService.getPatientDetails().subscribe((resp =>{
      console.log("RESP", resp)
      this.patient_data_coll = resp;
     this.loadPatientData();
    }))
   
    

  }
  displayedColumns: string[] = ['position', 'name', 'dosage', 'start date','stop date','prescribed by','View/Download','action'];
  displayedColumnsVaccinations: string[] = ['position', 'for', 'vaccine given', 'dose','date due','date given'];
  displayedColumnsAdmissionHistory: string[] = ['position', 'admission', 'discharge date', 'doctor','primary diagnosis','treatment','discharge summary'];
  displayedColumnsOutpatientVisits: string[] = ['position', 'admission', 'doctor name', 'speciality','reason','prescription note'];
  displayedColumnsVitals: string[] = ['position', 'date', 'fasting sugar level', 'pp sugar level','bp','oxygen saturation','heart rate'];
  displayedColumnsHealthProblems: string[] = ['position', 'name', 'initial finding', 'related diagnosis','last tested','related medications'];
  dataSource = new MatTableDataSource(ELEMENT_DATA_MEDICATIONS);
  dataSourceVaccination = new MatTableDataSource(ELEMENT_DATA_VACCINATIONS);
  admissionHistorydataSource = new MatTableDataSource(ELEMENT_DATA_ADMISSION_HISTORY);
  outpatientVisitsdataSource = new MatTableDataSource(ELEMENT_DATA_OUTPATIENT_VISITS);
  vitaldataSource = new MatTableDataSource(ELEMENT_DATA_VITALS);
  healthProblemsdataSource = new MatTableDataSource(ELEMENT_DATA_HEALTHPROBLEMS);

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openDialog()
  {
    
  }

  loadPatientData()
  {
    this.name= this.patient_data_coll?.name[0]?.given[0]+" "+this.patient_data_coll?.name[0]?.family;
    this.mobile_no=this.patient_data_coll?.telecom[0]?.value;
    this.gender = this.patient_data_coll?.gender;
    this.date_of_birth = this.patient_data_coll?.birthDate;
    this.email= this.patient_data_coll?.telecom[1]?.value;
    this.address = this.patient_data_coll?.address[0]?.line[0] + ','+this.patient_data_coll?.address[0]?.city+this.patient_data_coll?.address[0]?.state+','+this.patient_data_coll?.address[0]?.postalCode;
  }

  openRefillDialog() {
    const dialogRef = this.dialog.open(RefillComponent, {height: '350px',
    width: '300px',
  data:{name:ELEMENT_DATA_MEDICATIONS[0].name}});

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  openPdfViewDialog(path: any) {
    this.PatientDetailsService.isPdfFromSummary=true;

    console.log("VIEW", path)
    const dialogRef = this.dialog.open(PdfViewerComponent, {height: '600px',
    width: '800px',
  data:{filePath:path}});

    dialogRef.afterClosed().subscribe((result: any) => {
      console.log(`Dialog result: ${result}`);
    });
  }

}
