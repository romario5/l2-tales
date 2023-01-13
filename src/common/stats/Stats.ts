import LiveObject from "../objects/LiveObject";
import StatsInterface from "./StatsInterface";


export default class Stats implements StatsInterface
{
    readonly obj : LiveObject

    constructor(obj : LiveObject) {
        this.obj = obj
    }

    get STR() : number {
        return this.obj.baseStats.STR + this.obj.equipment.sumStat('STR')
    }

    get AGI() : number {
        return this.obj.baseStats.AGI + this.obj.equipment.sumStat('AGI')
    }

    get CON() : number {
        return this.obj.baseStats.CON + this.obj.equipment.sumStat('CON')
    }

    get INT() : number {
        return this.obj.baseStats.INT + this.obj.equipment.sumStat('INT')
    }

    get WIS() : number {
        return this.obj.baseStats.WIS + this.obj.equipment.sumStat('WIS')
    }

    get SPI() : number {
        return this.obj.baseStats.STR + this.obj.equipment.sumStat('SPI')
    }

    get pAtk() : number {
        return this.obj.baseStats.pAtk + (this.STR * this.obj.level) + this.obj.equipment.sumStat('pAtk')
    }

    get mAtk() : number {
        return (this.obj.baseStats.mAtk + (this.INT * this.obj.level) + this.obj.equipment.sumStat('mAtk')) * 1.5
    }

    get pAtkSpeed() : number {
        return this.obj.baseStats.pAtkSpeed + (this.AGI * 5) + this.obj.equipment.sumStat('pAtkSpeed')
    }

    get mAtkSpeed() : number {
        return this.obj.baseStats.mAtkSpeed + (this.SPI * 5) + this.obj.equipment.sumStat('mAtkSpeed')
    }

    get maxHp() : number {
        return this.obj.baseStats.maxHp + (this.CON * this.obj.level) + this.obj.equipment.sumStat('maxHp')
    }

    get maxMp() : number {
        return this.obj.baseStats.maxMp + (this.WIS * this.obj.level) + this.obj.equipment.sumStat('maxMp')
    }

    get hpRegen() : number {
        return this.obj.baseStats.hpRegen + (this.CON * 0.01) + this.obj.equipment.sumStat('hpRegen')
    }

    get mpRegen() : number {
        return this.obj.baseStats.hpRegen + (this.WIS * 0.01) + this.obj.equipment.sumStat('mpRegen')
    }

    get moveSpeed() : number {
        return this.obj.baseStats.moveSpeed + (this.AGI * 2) + this.obj.equipment.sumStat('moveSpeed')
    }

    get pDef() : number {
        return this.obj.baseStats.pDef + (this.CON + this.STR) + this.obj.equipment.sumStat('pDef')
    }

    get mDef() : number {
        return this.obj.baseStats.mDef + (this.WIS + this.SPI) + this.obj.equipment.sumStat('mDef')
    }

    get guidance() : number {
        return this.obj.baseStats.guidance + this.AGI + this.obj.equipment.sumStat('guidance')
    }

    get evasion() : number {
        return this.obj.baseStats.evasion + this.AGI + this.obj.equipment.sumStat('evasion')
    }
}