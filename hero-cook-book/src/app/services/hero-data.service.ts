import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category } from '../models/category.interface';
import { Power } from '../models/power.interface';
import { Hero } from '../models/hero.interface';
import { Level } from '../models/level.interface';

@Injectable({providedIn :"root"})
export class HeroDataService {

    constructor( private http:HttpClient){}

    createHero( requestData ){

        return this.http.post<{message: string, hero: Hero[]}>('http://localhost:3000/api/hero/create', requestData);

    }

    getVillain( villainId){
        return this.http.get<{message: string, level: Level[]}>('http://localhost:3000/api/villain/'+villainId);
    }
    getMyHeroList( userId ){
        return this.http.get<{message: string, heroes: Hero[]}>('http://localhost:3000/api/hero/'+userId);
    }
   
}