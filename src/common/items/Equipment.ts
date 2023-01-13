import Weapon from "./Weapon";
import Armor from "./Armor";
import LiveObject from "../objects/LiveObject";

const props = ['weapon', 'helmet', 'boots', 'gloves', 'upperBody', 'lowerBody', 'belt', 'coat', 'shield']

export default class Equipment {
    obj: LiveObject

    weapon:    Weapon = null
    helmet:    Armor  = null
    boots:     Armor  = null
    gloves:    Armor  = null
    upperBody: Armor  = null
    lowerBody: Armor  = null
    belt:      Armor  = null
    shield:    Armor  = null
    coat:      Armor  = null

    constructor(obj : LiveObject) {
        this.obj = obj
    }

    sumStat(stat: string) : number {
        let v = 0
        for(let i = 0; i < props.length; i++) {
            if (this[props[i]] !== null) {
                v += this[props[i]].stats[stat];
            }
        }
        return v
    }
}
