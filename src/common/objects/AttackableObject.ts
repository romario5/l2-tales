import LiveObject from "./LiveObject";

export default class AttackableObject extends LiveObject
{
    get canAttack() {
        return this.equipment.weapon !== null;
    }
}