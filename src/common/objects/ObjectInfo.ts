import GeoBlock from "../world/GeoBlock";
import GameObject from "./GameObject";

interface ObjectInfo {
    type   : typeof GameObject,
    xSize  : number
    ySize  : number
    zSize  : number
    sprite : string
    geo    : {x: number, y: number, geo: GeoBlock}[]
}

export default ObjectInfo