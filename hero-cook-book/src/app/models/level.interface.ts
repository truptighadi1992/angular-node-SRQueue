import { Villain } from './villain.interface';

export interface Level{
    _id : String;
    name : String;
    villain : Villain;
}