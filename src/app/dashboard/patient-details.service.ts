import { Injectable } from '@angular/core';
import { Subject, Observable, of, throwError } from 'rxjs';
import { catchError , map, first } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';


import { HttpClient } from '@angular/common/http';

@Injectable ({
    providedIn: 'root'
})
export class PatientDetailsService
{
    patient_data:any = [];
    public isPdfFromSummary:boolean = false;

    constructor(private http: HttpClient){}

    getPatientDetails(){
        const lsUri = 'http://ec2-3-138-255-176.us-east-2.compute.amazonaws.com:8080/hapi-fhir-jpaserver/fhir/Patient/1195';
        return this.http.get( lsUri )
        .pipe(
        map( resp => { 
            this.set_patientData(resp);          
            return resp;
        }),
        catchError ( (err: HttpErrorResponse) => {
            return of (null);
        }), first()
        );
    }

    get_patientData():any
    {
        return this.patient_data;
    }

    set_patientData(value:any)
    {
        this.patient_data= value;
    }

    
}

