import GameObject from "./objects/GameObject";
import Engine from "../client/core/Engine";

export default class Camera
{
    x : number = 0
    y : number = 0

    follow(target: GameObject) {
        this.x = target.x - Engine.viewport.width/2
        this.y = target.y - Engine.viewport.height/2
    }
}