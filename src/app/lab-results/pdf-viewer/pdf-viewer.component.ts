import { IfStmt } from '@angular/compiler';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog,MAT_DIALOG_DATA,MatDialogRef } from '@angular/material/dialog';
import {PatientDetailsService} from '../../dashboard/patient-details.service';

@Component({
    selector: 'app-pdf-viewer',
    templateUrl: './pdf-viewer.component.html',
    styleUrls: ['./pdf-viewer.component.scss']
})

export class PdfViewerComponent implements OnInit{
    
    pdfSrc = "/assets/Lab_Reports/Report_1.pdf";

    constructor(public patientDetailService:PatientDetailsService,@Inject(MAT_DIALOG_DATA) public data: {name: string},public dialogRef: MatDialogRef<PdfViewerComponent>) { }
    

    ngOnInit(){
        if(this.patientDetailService.isPdfFromSummary)
        {
            this.pdfSrc="/assets/medical_prescription/prescription.pdf";
            this.patientDetailService.isPdfFromSummary=false;
        }
        else
        {
            this.pdfSrc = "/assets/Lab_Reports/Report_1.pdf";
        }
        
    }
}