import { Component, OnInit } from '@angular/core';
import { MasterDataService } from '../services/master-data.service';
import { Category } from '../models/category.interface';
import { Power } from '../models/power.interface';
import { NgForm } from '@angular/forms';
import { HeroDataService } from '../services/hero-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-super-hero',
  templateUrl: './create-super-hero.component.html',
  styleUrls: ['./create-super-hero.component.css']
})
export class CreateSuperHeroComponent implements OnInit {
  
  categories: Category[] = [];
  powers: Power[] = [];
  heroFormValid: boolean = false;
  powerSelected = [];

  user ={
    _id : "5ea67f311a0835189cfbef47",
    email : "test@test.com",
    username : "test",
    stars : 200,
    levelsCompleted :[],
    life : 3
  }
  starsUsed = 0;

  constructor( private masterDataService:MasterDataService, private heroDataService:HeroDataService, private router:Router) { }

  ngOnInit(): void {

      this.masterDataService.getCategoryList().subscribe(
        result =>{
            this.categories = result.category;
        },
        err =>{
            console.log(err);
        }
      )
  }

  getPowerList(category){

    this.powerSelected = [];
    this.masterDataService.getPowerList(category._id).subscribe(
      result =>{
          this.powers = result.power;
      },
      err =>{
          console.log(err);
      }
    )
  }

  selectPower(powerSelected , index){
   
    if(!powerSelected.selected){
      if(this.user.stars > (this.starsUsed +powerSelected.stars))
      {
        powerSelected.selected = true;
        this.starsUsed = this.starsUsed + powerSelected.stars;
      }
      else{
        powerSelected.selected = false;
        alert("limit exceeding");
      }
    }
    else{
      powerSelected.selected = false;
      this.starsUsed = (this.starsUsed - powerSelected.stars) < 0 ? 0 : this.starsUsed - powerSelected.stars;
    }
    
  }
  cook(formRef : NgForm){
     
    if(this.starsUsed > 0 && formRef.form.valid)
    {
      let powerArray = [];
      this.powers.forEach(function(item, index, array) {
        if(item.selected)
        {
          let obj ={ "power" : item._id}
          powerArray.push(obj);
        }
        
      });

      let heroData = formRef.form.value;
      let requestData = {
        name : heroData.heroName,
        category : heroData.heroCategory._id,
        powers : powerArray,
        star : this.starsUsed,
        creator : this.user._id
      }

      this.heroDataService.createHero(requestData).subscribe(
        result =>{

          this.router.navigate(['/']);
        },
        error =>{

        }
      )
    }
  
  }

}
