import Viewport from "./Viewport";
import Scene from "../../common/Scene";
import World from "../../common/world/World";
import Layout from "./ui/Layout";
import {Container} from "pixi.js";

class Engine
{
    readonly viewport : Viewport = new Viewport()
    readonly world    : World    = new World()
    readonly ui       : Layout   = new Layout()

    readonly container : Container = new Container()

    private _scene : Scene

    constructor()
    {

        this.viewport.app.stage.addChild(this.container)
        this.container.addChild(this.world.container)
        this.viewport.app.stage.addChild(this.ui.container)
        this.viewport.onResize((w: number, h: number) => {
            this.ui.onParentResize(w, h)
        })
        this.ui.onParentResize(this.viewport.width, this.viewport.height)
    }
}



export default new Engine()