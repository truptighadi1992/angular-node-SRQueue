import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { systemRecord } from '../../models/system.record.model';
import { SrRecord } from '../../models/sr.record.model';
import { CaseService } from 'src/app/services/case.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-sr',
  templateUrl: './create-sr.component.html',
  styleUrls: ['./create-sr.component.css']
})
export class CreateSrComponent implements OnInit {

  systemDataFetched: systemRecord;
  createSRForm:FormGroup;
  editMode:boolean = false;
  systemId:string;
  srId:number;
  case:SrRecord;
  SrTypes = ['type1','type2','type3','type4','type5','type6'];
  SrSubTypes = ['subtype1','subtype2','subtype3','subtype4','subtype5','subtype6'];

  constructor(private router:Router, private route:ActivatedRoute, private caseService: CaseService, private toastr:ToastrService) { }

  ngOnInit() {

    this.createSRForm = new FormGroup({
      type: new FormControl(null, {
        validators: [Validators.required]
      }),
      subtype: new FormControl(null, { validators: [Validators.required] }),
      description: new FormControl(null, {
        validators: [Validators.required]
      })
    });

   this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has("srId")) {
        
        this.editMode = true;
        this.srId = +paramMap.get("srId");

        this.caseService.getCaseDetails(this.srId).subscribe( result => {
          
          let caseFetched = result.case;
          this.case = caseFetched;
          this.systemDataFetched = caseFetched.systemInfo;
          this.createSRForm.setValue({
            type: this.case.type,
            subtype: this.case.subtype,
            description: this.case.description
          });
        });
      } else {
        this.editMode = false;
        this.srId  = null;
      }
    }); 
  }

  getSystemDetails(){

    this.caseService.getSystemDetails(this.systemId)
    .subscribe( systemDetails =>{
      this.systemDataFetched = systemDetails.system;
      this.toastr.success('System details fetched');
    },
    err => {
      this.systemDataFetched = null;
      this.toastr.error(err.error.message);
    })

  }

  createSR(){

    let operation = this.editMode? "update":"create";
    let type = this.createSRForm.value.type;
    let subtype = this.createSRForm.value.subtype;
    let description = this.createSRForm.value.description;
    let caseId = (this.case && this.case.caseId)? this.case.caseId: null;
    let id = (this.case && this.case._id)? this.case._id: null;
    this.caseService.createServiceRequest(this.systemDataFetched , type, subtype, description, operation, caseId,id);

  }

}
