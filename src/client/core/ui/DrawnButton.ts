import Button from "./Button";
import {Graphics} from "pixi.js";
import {DropShadowFilter} from "@pixi/filter-drop-shadow";

export default class DrawnButton extends Button
{
    protected _graphics : Graphics = new Graphics()
    protected _showShadow : boolean = false

    constructor(label: string, width: number = 200, height: number = 50, shadow: boolean = false) {
        super(label, width, height);

        this._showShadow = shadow
        this.container.addChild(this._graphics)
        this.container.addChild(this._labelText)

        if (shadow) {
            let dropShadowFilter = new DropShadowFilter();
            dropShadowFilter.color = 0x000020;
            dropShadowFilter.alpha = 0.1;
            dropShadowFilter.blur = 6;
            dropShadowFilter.distance = 10;
            this._graphics.filters = [dropShadowFilter];
        }
        this.render()
    }

    render() {
        this._graphics.clear()
        this._graphics.lineStyle(1, 0x111111, 1)
        this._graphics.beginFill(0x333339, 1)
        this._graphics.drawRoundedRect(0, 0, this.width, this.height, 5)
        this._graphics.endFill()

        super.render()
    }
}