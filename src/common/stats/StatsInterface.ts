export default interface StatsInterface {
    STR : number // Strength:     Physical attack power and critical power
    AGI : number // Agility:      Attack speed, guidance and critical chance
    CON : number // Constitution: Maximum HP and HP regeneration

    INT : number // Intellect:    Magic attack power
    WIS : number // Wisdom:       Maximum mana and mana regeneration
    SPI : number // Spirit:       Casting speed and magic critical rate

    pAtk      : number
    mAtk      : number
    pDef      : number
    mDef      : number
    pAtkSpeed : number
    mAtkSpeed : number

    guidance : number
    evasion  : number

    moveSpeed  : number

    maxHp : number
    maxMp : number

    hpRegen : number
    mpRegen : number
}