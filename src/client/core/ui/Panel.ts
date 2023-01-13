import UI from "./UI";
import Position from "./Position";
import {Graphics} from "pixi.js";

export default class Panel extends UI
{
    private _position : Position = Position.left
    private readonly _graphics : Graphics = new Graphics()

    constructor() {
        super();
        this._fullHeight = true
        this.container.addChild(this._graphics)
    }

    set fullWidth(width: boolean) {}
    set fullHeight(width: boolean) {}

    get position() : Position {
        return this._position
    }

    set position(position : Position) {
        this._position = position
        switch (position)
        {
            case Position.left:
                this.x = 0
                this.y = 0
        }
    }

    set height(height: number) {}
    get height() : number { return this._height }

    render() {
        this._graphics.clear()
        this._graphics.beginFill(0x222225, 1)
        this._graphics.drawRect(0, 0, this.width, this.height)
        this._graphics.endFill()
    }

    onParentResize(w: number, h: number) {
        this._height = h
        this.triggerResize()
        this.render()
    }
}