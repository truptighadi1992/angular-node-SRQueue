import { Category } from './category.interface';
import { Power } from './power.interface';

export interface Hero{
    _id : String;
    name : String;
    stars : number;
    category : Category;
    powers : any[]
}