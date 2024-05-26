import { etat } from "./etat";
import { User } from "./users";

export class rapport{
    id:number;
    year:number;
    code:string;
    month:number;
    comment:string;
    etat:etat[];
    user:User[];
}