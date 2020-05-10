import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { MasterDataService } from 'src/app/services/master-data.service';
import { Level } from 'src/app/models/level.interface';
import { HeroDataService } from 'src/app/services/hero-data.service';
import { Hero } from 'src/app/models/hero.interface';
import { Villain } from 'src/app/models/villain.interface';

@Component({
  selector: 'app-level',
  templateUrl: './level.component.html',
  styleUrls: ['./level.component.css']
})
export class LevelComponent implements OnInit {

  levelId: string;
  level : Level;
  heroes: Hero[];
  villain: Villain;
  totalVStars= 0;

  user ={
    _id : "5ea67f311a0835189cfbef47",
    email : "test@test.com",
    username : "test",
    stars : 200,
    levelsCompleted :[],
    life : 3
  }
  constructor(private router:Router, private route:ActivatedRoute, private masterDataService:MasterDataService , private heroDataService:HeroDataService) { }

  ngOnInit(): void {

    var self = this;
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has("levelId")) {
        this.levelId = paramMap.get("levelId");
        this.masterDataService.getLevelData(this.levelId).subscribe(
          result =>{
              self.level = result.level;
              self.villain = { ...self.level.villain };
              self.villain.powers.forEach(function(vpower, index, array) {
                let vstars = vpower.boost * vpower.power.stars;
                self.totalVStars =  self.totalVStars + vstars;
              })
             
          }
        )
      }
    })

    this.heroDataService.getMyHeroList(this.user._id).subscribe(
      result =>{
          this.heroes = result.heroes;
      },
      err =>{

      })
  }

  fight( hpower, hero){

    let villainPowers = this.villain.powers;

    let vPower = villainPowers.find(vpower => vpower.power._id == hpower.power._id);
    if(vPower && vPower.power){
      let vstars = vPower.power.stars * vPower.boost;

        if(vstars > 0){
          let hstar = hpower.power.stars * hpower.boost;
          let starsUpdated = vstars - hstar;
          if(starsUpdated >= 0  && this.totalVStars >= 0){
            vPower.boost =  vPower.boost - 1;
            this.totalVStars = this.totalVStars - hstar;
            console.log("vPower",vPower);
            console.log("this.totalVStars",this.totalVStars);
            console.log("villainPowers",villainPowers);
          }

        }
     
    }
   
    if(this.totalVStars <= 0){
      alert("you won");
      this.router.navigate(['/']);
    }
  }

}
