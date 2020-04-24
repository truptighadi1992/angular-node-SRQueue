import { Component, OnInit, OnDestroy } from '@angular/core';
import { SrRecord } from '../../models/sr.record.model';
import { CaseService } from 'src/app/services/case.service';
import { AuthService } from 'src/app/auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sr-list',
  templateUrl: './sr-list.component.html',
  styleUrls: ['./sr-list.component.css']
})
export class SrListComponent implements OnInit, OnDestroy{

  totalReq:number= 0;
  srList:SrRecord[] = [];
  userAuth:boolean = false;
  userId:any;
  subscription: Subscription;
  page = 1;
  pageSize = 1;
  constructor(private caseService: CaseService, private authService:AuthService) { }

  ngOnInit() {

    this.userAuth = this.authService.getUserAuthStatus();
    this.userId = this.authService.getLoggedInUser();
    this.getCases();

    this.subscription = this.authService.getAuthStatusListener().subscribe( authStatus =>{
      this.userAuth = authStatus;
      this.userId = this.authService.getLoggedInUser();
      this.getCases();
    })
    
  }

  getCases(){
    this.caseService.getCases(this.userId, this.page, this.pageSize).subscribe(
      result =>{
          this.srList = result.cases;
          this.totalReq = this.srList.length;
      },
      err => {
        this.srList = [];
        this.totalReq = 0;
      }
    )
  }

  doDeleteSR(requestedSR){

    this.caseService.deleteServiceRequest(requestedSR.caseId).subscribe(
      result =>{

        this.srList = this.srList.filter( sr =>{
          return sr.caseId != requestedSR.caseId
      })
      },
      err => {

      })
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  pageChanged(pageNumber){
    console.log("pageData",pageNumber);
    this.page = pageNumber;
    this.getCases();
  }

}
