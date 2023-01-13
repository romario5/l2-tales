import ObjectInfo from "./ObjectInfo";
import GeoBlock from "../world/GeoBlock";
import StaticObject from "./StaticObject";

const objects : {[key: string] : ObjectInfo} =
{
    grass_floor_1: {
        type: StaticObject,
        sprite : 'grass_floor_1',
        xSize: 2, ySize: 2, zSize: 2,
        geo: [
            {x: 0, y: 0, geo: GeoBlock.NSWE},
            {x: 0, y: 1, geo: GeoBlock.NSWE},
            {x: 1, y: 0, geo: GeoBlock.NSWE},
            {x: 1, y: 1, geo: GeoBlock.NSWE}
        ]
    }
}

export default objects