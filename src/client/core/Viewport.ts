import {Application, Assets, Container, SCALE_MODES, Sprite, Texture} from "pixi.js";
import log from "../../utils/log"
import Scene from "../../common/Scene";
import WorldBlock from "../../common/world/WorldBlock";
import World from "../../common/world/World";
import controls from "../game/controls";
import Engine from "./Engine";

export default class Viewport
{
    app              : Application

    FPS              : number = 60

    width  : number
    height : number

    scene : Scene | null = null

    private _resizeHandlers : ((w: number, h: number) => void)[] = []

    constructor()
    {
        let w = document.body.clientWidth
        let h = document.body.clientHeight

        this.width = w
        this.height = h

        this.app = new Application({
            width: w,
            height: h,
            antialias: false,
            resolution: 1 // window.devicePixelRatio
        });

        document.body.style.overflow = 'hidden'

        this.app.view['style']['position'] = 'fixed'
        this.app.view['style']['left'] = '0'
        this.app.view['style']['top'] = '0'
        this.app.view['style']['zIndex'] = '100'


        // @ts-ignore
        document.body.appendChild(this.app.view);

        let activeBlocks : WorldBlock|null[] = []
        let lastActiveBlock : WorldBlock|null = null

        let elapsed = 0.0;
        this.app.ticker.add(delta => {
            elapsed += delta / this.FPS;

            if (this.scene !== null) {
                this.scene.player.x += 1
                this.scene.camera.follow(this.scene.player)
                this.scene.world.x = this.scene.camera.x / World.cellSize
                this.scene.world.y = this.scene.camera.y / World.cellSize

                let x = this.scene.player.x
                let y = this.scene.player.y
                let block = this.scene.world.getBlock(x, y)


                if (block !== null) {

                    if (lastActiveBlock !== null && lastActiveBlock !== block) {
                        lastActiveBlock.container.visible = false
                    }
                    if (lastActiveBlock === null) {
                        console.log(block)
                    }
                    if (lastActiveBlock !== block) {
                        lastActiveBlock = block
                    }
                    block.container.visible = true
                }
            }
        });

        let resize = () => {
            let w = document.body.clientWidth
            let h = document.body.clientHeight
            this.app.renderer.resize(w, h)
            this.width = w
            this.height = h
            this.dispatchResizeEvent()
        }
        window.addEventListener('resize', resize)
    }

    onResize(handler: (w: number, h: number) => void) {
        this._resizeHandlers.push(handler)
    }

    private dispatchResizeEvent() {
        for (let i = 0; i < this._resizeHandlers.length; i++) {
            this._resizeHandlers[i](this.width, this.height)
        }
    }


    switchScene(scene: Scene) {
        this.scene = scene

        controls.onMove((dx, dy) => {

        })
    }
}