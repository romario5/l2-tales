import GameObject from "../objects/GameObject";
import WorldData from "./WorldData";
import GeoBlock from "./GeoBlock";
import objects from "../objects/objects";
import {Container} from "pixi.js";
import ObjectInfo from "../objects/ObjectInfo";

export default class WorldBlock
{
    x : number = 0
    y : number = 0

    width  : number
    height : number

    geoData    : GeoBlock[][] = []
    objects    : GameObject[] = []
    characters : GameObject[] = []

    container : Container = new Container()

    constructor(x, y, width, height) {
        this.x = x
        this.y = y
        this.width = width
        this.height = height

        // Fill up all geo data with NSWE blocks.
        for (let i = 0; i < this.width; i++) {
            this.geoData[i] = []
            for (let j = 0; j < this.height; j++) {
                this.geoData[i].push(GeoBlock.NSWE)
            }
        }
    }

    addObject(object: GameObject) {
        if (object.worldBlock !== null) {
            object.worldBlock
        }
        object.worldBlock = this
    }

    async initObjects(data: WorldData) : Promise<boolean>
    {
        let info : ObjectInfo
        for (let i = 0; i < data.objects.length; i++) {
            let d = data.objects[i]
            if (objects.hasOwnProperty(d.objectId)) {
                info = objects[d.objectId]
                let obj = new info.type()
                obj.configure(d.x, d.y, d.z, info)
                this.container.addChild(obj.container)
                this.objects.push(obj)
            }
        }
        return true
    }
}