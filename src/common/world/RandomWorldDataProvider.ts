import delay from "../../utils/etc";
import WorldData from "./WorldData";
import WorldDataProvider from "./WorldDataProvider";
import World from "./World";

export default class RandomWorldDataProvider implements WorldDataProvider
{
    async getBlockData(x, y) : Promise<WorldData>
    {
        let objects : {x: number, y: number, z: number, objectId: string}[] = []

        for (let i = 0; i < World.blockW; i +=2) {
            for (let j = 0; j < World.blockH; j += 2) {
                let obj = {x: i, y: j, z: 0, objectId: 'grass_floor_1'}
                objects.push(obj)
            }
        }

        return {x, y, objects}
    }
}