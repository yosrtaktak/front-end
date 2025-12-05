import { etat } from './etat';
import { rapport } from './rapport';
import { User } from './users';
export class historique{
    id:number;
    comment:String;
    creationDate:Date;
    etat:etat[];
    rapport:rapport[];
    user:User[];

}