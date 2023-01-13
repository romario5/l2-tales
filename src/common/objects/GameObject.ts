import {Assets, BaseTexture, Container, Graphics, SCALE_MODES, Sprite, Texture} from "pixi.js";
import ObjectInfo from "./ObjectInfo";
import World from "../world/World";
import WorldBlock from "../world/WorldBlock";
import FlatGameObject from "./FlatGameObject";


const _z = Symbol()

export default class GameObject extends FlatGameObject
{
    sprite    : Sprite    = new Sprite()
    gizmo     : Graphics  = new Graphics()

    worldBlock : WorldBlock | null = null;

    [_z] : number = 0

    xSize : number = 10
    ySize : number = 10
    zSize : number = 10

    constructor() {
        super();
        this.container.addChild(this.sprite)
        this.container.addChild(this.gizmo)
    }


    get z() : number { return this[_z] }



    set z(value: number) {
        this[_z] = value
    }

    configure(x: number, y: number, z: number, info: ObjectInfo) {
        this.x = x
        this.y = y
        this.z = z
        this.xSize = info.xSize
        this.ySize = info.ySize
        this.zSize = info.zSize

        this.container.x = x * World.cellSize - y * World.cellSize/2
        this.container.y = y * World.cellSize/4

        let t = Assets.get<Texture>(info.sprite)
        if (t instanceof Texture) {
            t.baseTexture.scaleMode = SCALE_MODES.NEAREST
            // @ts-ignore
            this.sprite.texture = t
        }

        this.sprite.width = this.xSize * World.cellSize
        this.sprite.height = this.ySize * World.cellSize

        //this.gizmo.beginFill(0xFF0000, 0.1)
        //this.gizmo.drawRect(0, 0, this.xSize * World.cellSize, this.ySize * World.cellSize)
        //this.gizmo.endFill()
    }
}