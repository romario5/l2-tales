import Item from "./Item";
import BaseStats from "../stats/BaseStats";

export default class EquipableItem extends Item
{
    stats : BaseStats = new BaseStats()
}