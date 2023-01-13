import GameObject from "./GameObject";
import StatsInterface from "../stats/StatsInterface";
import BaseStats from "../stats/BaseStats";

export default class KillableObject extends GameObject
{
    baseStats : StatsInterface = new BaseStats()
    stats     : StatsInterface = this.baseStats

    hp : number = 1

    get isDead() : boolean {
        return this.hp === 0
    }

    doDie() {
        this.hp = 0
    }
}