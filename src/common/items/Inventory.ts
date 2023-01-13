import Item from "./Item";
import LiveObject from "../objects/LiveObject";

export default class Inventory
{
    obj : LiveObject
    items : Item[] = []

    constructor(obj : LiveObject) {
        this.obj = obj
    }
}