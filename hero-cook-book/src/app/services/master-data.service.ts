import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category } from '../models/category.interface';
import { Power } from '../models/power.interface';
import { Level } from '../models/level.interface';

@Injectable({providedIn :"root"})
export class MasterDataService {

    constructor( private http:HttpClient){}

    getCategoryList(){
        return this.http.get<{message: string, category: Category[]}>('http://localhost:3000/api/master/categories');
    }
    getPowerList(categoryId){
        return this.http.get<{message: string, power: Power[]}>('http://localhost:3000/api/master/powers/'+categoryId);
    }
    getLevelList(){
        return this.http.get<{message: string, level: Level[]}>('http://localhost:3000/api/master/levels');
    }
    getLevelData(levelId){
        return this.http.get<{message: string, level: Level}>('http://localhost:3000/api/master/level/'+levelId);
    }
}