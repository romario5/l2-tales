import Stats from "../stats/Stats";
import Equipment from "../items/Equipment";
import KillableObject from "./KillableObject";
import StatsInterface from "../stats/StatsInterface";


export default class LiveObject extends KillableObject
{
    level : number = 1

    equipment : Equipment = new Equipment(this)
    stats     : StatsInterface = new Stats(this)

    mp : number = 0
}