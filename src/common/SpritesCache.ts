import {Assets, Sprite, Texture} from "pixi.js";
import log from "../utils/log";

export default class SpritesCache
{
    sprites : {[key: string]: Sprite} = {}

    getSprite(id: string) {
        if (this.sprites.hasOwnProperty(id)) return this.sprites[id]
        let t = Assets.get<Texture>(id)
        let sprite = new Sprite()
        if (t instanceof Texture) {
            // @ts-ignore
            sprite.texture = t
        } else {
            log.error('Sprite ' + id  + ' is not found.')
        }
        return sprite
    }
}