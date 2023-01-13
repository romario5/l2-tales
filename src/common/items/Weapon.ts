import EquipableItem from "./EquipableItem";
import WeaponType from "./WeaponType";

export default class Weapon extends EquipableItem
{
    stackable : boolean = false
    type : WeaponType = WeaponType.Sword
}