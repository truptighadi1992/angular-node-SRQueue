import { Category } from './category.interface';

export interface Power{
    _id : String;
    title : String;
    stars : number;
    category : String;
    description : String;
    categoryData : Category,
    selected : boolean;
}