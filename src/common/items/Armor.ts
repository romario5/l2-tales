import EquipableItem from "./EquipableItem";
import ArmorType from "./ArmorType";

export default class Armor extends EquipableItem
{
    stackable : boolean = false
    type : ArmorType = ArmorType.Helmet
}