import { Lot } from './Lot';
import { offre } from './offre';
import { project } from './projects';
import { rapport } from './rapport';
import { Tache } from './tache';
import { type } from "./type";

export class activite{

    id:number;
    comment:String;
    creationDate:Date;
    name:String;
    type:type[];
    rapport:rapport[];
    total:number;
    totalParDate:number;
    projet:project[];
    offre:offre[];
    // lot:Lot[];
    tache:Tache[];
}