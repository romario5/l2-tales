import StatsInterface from "./StatsInterface";

export default class BaseStats implements StatsInterface
{
    STR : number = 0 // Strength:     Physical attack power and critical power
    AGI : number = 0 // Agility:      Attack speed, guidance and critical chance
    CON : number = 0 // Constitution: Maximum HP and HP regeneration

    INT : number = 0 // Intellect:    Magic attack power
    WIS : number = 0 // Wisdom:       Maximum mana and mana regeneration
    SPI : number = 0 // Spirit:       Casting speed and magic critical rate

    pAtk      : number = 0
    mAtk      : number = 0
    pDef      : number = 0
    mDef      : number = 0
    pAtkSpeed : number = 0
    mAtkSpeed : number = 0

    guidance : number = 0
    evasion  : number = 0

    moveSpeed  : number = 0

    maxHp : number = 0
    maxMp : number = 0

    hpRegen : number = 0
    mpRegen : number = 0
}