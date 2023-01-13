import World from "../world/World";
import {Container} from "pixi.js";

const _x = Symbol()
const _y = Symbol()

export default class FlatGameObject
{
    container : Container = new Container();

    [_x] : number = 0;
    [_y] : number = 0;

    get x() : number { return this[_x] }
    get y() : number { return this[_y] }

    set x(value: number) {
        this[_x] = value
        this.container.x = (value * World.cellSize/2) + (this[_y] * World.cellSize/2)
    }

    set y(value: number) {
        this[_y] = value
        this.container.y = (value * World.cellSize/4)  - (this[_x] * World.cellSize/4)
    }
}