import UI from "./UI";
import {Text} from "pixi.js";

export default abstract class Button extends UI
{
    protected _label : string = "Button"
    protected _labelText : Text = new Text()

    protected constructor(label: string, width: number = 200, height: number = 50)
    {
        super();
        this.width = width
        this.height = height
        this._label = label
        this._labelText.anchor.x = 0.5
        this._labelText.anchor.y = 0.5
        this._labelText.text = label
    }

    get label() : string { return this._label }
    set label(value: string) { this._label = value; this._labelText.text = value }

    render() {
        this._labelText.style.fill = 0x999999
        this._labelText.x = Math.round(this.width/2)
        this._labelText.y = Math.round(this.height/2)
    }
}