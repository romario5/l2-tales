import Inventory from "../items/Inventory";
import AttackableObject from "./AttackableObject";

export default class Character extends AttackableObject
{
    inventory : Inventory = new Inventory(this)
}