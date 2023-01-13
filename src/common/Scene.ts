import Camera from "./Camera";
import World from "./world/World";
import {Container} from "pixi.js";
import Player from "./objects/Player";

export default class Scene
{
    id        : string
    camera    : Camera
    world     : World
    player    : Player
    container : Container = new Container()

    constructor(id: string, camera: Camera, world: World, player: Player)
    {
        this.id = id
        this.camera = camera
        this.world = world
        this.player = player
    }


}