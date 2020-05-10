import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { MasterDataService } from 'src/app/services/master-data.service';
import { Level } from 'src/app/models/level.interface';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Villain } from 'src/app/models/villain.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-level-list',
  templateUrl: './level-list.component.html',
  styleUrls: ['./level-list.component.css']
})
export class LevelListComponent implements OnInit {

  user ={
    _id : "5ea67f311a0835189cfbef47",
    email : "test@test.com",
    username : "Test",
    stars : 200,
    levelsCompleted :[],
    life : 3
  }
  life = [];
  totalLife = 3;
  levels : Level[] =[];
  villainSelected : Villain;
  levelSelected: string;

  @ViewChild("villainDialogTemplate") villainDialogTemplate: TemplateRef<any>;
  
  constructor(private masterDataService:MasterDataService, public dialog: MatDialog, private router:Router) { }

  ngOnInit(): void {

    this.life = Array.from( Array(this.totalLife), (l, index)=> index);
    this.masterDataService.getLevelList().subscribe(
      result =>{
          this.levels = result.level;
      },
      err =>{

      }
    )
  }

  showVillainInfo( levelInfo ): void {

    this.villainSelected = levelInfo.villain;
    this.levelSelected = levelInfo._id;
    const dialogRef = this.dialog.open(this.villainDialogTemplate);

    dialogRef.afterClosed().subscribe(result => {
      
    });
  }

  closePopup(){
    this.dialog.closeAll();
    this.router.navigate(['/level', this.levelSelected]);
  
  }

}
