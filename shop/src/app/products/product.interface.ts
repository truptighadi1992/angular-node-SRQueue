import { Size } from './size.interface';

export interface Product{
    _id:string;
    title:string;
    seller:string;
    description:string;
    cost:number;
    imageUrl:string;
    rating:number;
    availableSizes: Size[],
    material: string;
    care: string;
    sizeInfo: string;
}