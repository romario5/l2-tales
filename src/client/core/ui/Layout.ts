import UI from "./UI";
import Panel from "./Panel";
import Button from "./Button";
import ScrollableContainer from "./ScrollableContainer";
import Grid from "./Grid";
import SpriteButton from "./SpriteButton";
import Engine from "../Engine";
import {Assets, Resource, Texture} from "pixi.js";

export default class Layout extends UI
{
    private _leftPanel : Panel = new Panel()

    constructor() {
        super()
        this._leftPanel.width = 400
        this.addChild(this._leftPanel)
    }

    init() {
        let cont = new ScrollableContainer()
        cont.fullWidth = true
        cont.fullHeight = true
        this._leftPanel.addChild(cont)

        let grid = new Grid(10, false)
        let texture = Assets.get<Texture>('button')
        for (let i = 0; i < 40; i++) {
            let button = new SpriteButton("Button " + i)
            // @ts-ignore
            button.setTexture(texture, 13, 13)
            grid.addChild(button)
        }
        cont.addChild(grid)
    }

    onParentResize(w: number, h: number) {
        this.width = w
        this.height = h
        this._leftPanel.onParentResize(w, h)
    }
}