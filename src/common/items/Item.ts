import GameObject from "../objects/GameObject";

export default class Item
{
    gameObject    : GameObject = null
    count         : number     = 1
    stackable     : boolean    = true
    canBePicked   : boolean    = false
}