import { Injectable } from '@angular/core';
import { Subject, Observable, of, throwError } from 'rxjs';
import { catchError , map, first } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';


import { HttpClient } from '@angular/common/http';

@Injectable ({
    providedIn: 'root'
})
export class PractitionerDetailsService
{
    practitioner_data:any = [];

    isBooked : boolean = false;

    constructor(private http: HttpClient){}

    getPractitionerDetails(){
        const lsUri = 'http://ec2-3-138-255-176.us-east-2.compute.amazonaws.com:8080/hapi-fhir-jpaserver/fhir/Practitioner/91';
        return this.http.get( lsUri )
        .pipe(
        map( resp => { 
            this.set_practitionerData(resp);          
            return resp;
        }),
        catchError ( (err: HttpErrorResponse) => {
            return of (null);
        }), first()
        );
    }

    get_practitionerData():any
    {
        return this.practitioner_data;
    }

    set_practitionerData(value:any)
    {
        this.practitioner_data= value;
    }
}

