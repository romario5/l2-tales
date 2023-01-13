import WorldData from "./WorldData";

export default interface WorldDataProvider
{
    getBlockData(x, y) : Promise<WorldData>
}