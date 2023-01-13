import GameObject from "./GameObject";
import GeoBlock from "../world/GeoBlock";
import ObjectInfo from "./ObjectInfo";

export default class StaticObject extends GameObject
{
    geo    : {x: number, y: number, geo: GeoBlock}[]

    configure(x, y, z, info: ObjectInfo) {
        super.configure(x, y, z, info);
        this.geo = info.geo
    }
}