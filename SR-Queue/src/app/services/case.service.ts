import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { systemRecord } from '../models/system.record.model';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { SrRecord } from '../models/sr.record.model';

@Injectable({providedIn :"root"})
export class CaseService {

    constructor(private http: HttpClient, private authService: AuthService, private router:Router) {}

    getSystemDetails(systemId: string){

        return this.http.get< {message: string, system: systemRecord} >('http://localhost:3000/api/system/'+systemId);

    }

    getCases(userId, page, pageSize){
        const queryParams = `?pagesize=${pageSize}&page=${page}`;
        
        return this.http.get< {message: string,  cases: SrRecord[]} >('http://localhost:3000/api/case/fetchAll/'+userId + queryParams);
    }

    getCaseDetails(caseId: number){

        return this.http.get< {message: string, case: SrRecord} >('http://localhost:3000/api/case/fetchOne/'+caseId);

    }
    deleteServiceRequest(caseId: number){

        return this.http.delete< {message: string} >('http://localhost:3000/api/case/delete/'+caseId);

    }
    createServiceRequest( system, caseType, caseSubType, description,operation, caseId, id){

        let userId = this.authService.getLoggedInUser();
        let request = {
            system : system._id,
            type : caseType,
            subType : caseSubType,
            user: userId,
            description : description,
            id: id
        }

        let URL = (operation == "create")? 'http://localhost:3000/api/case/create':  ('http://localhost:3000/api/case/update/'+caseId);
        this.http.post(URL,request).subscribe(
            result => {
                console.log(result);
                this.router.navigate(['/']);
            }
        )
    }

}