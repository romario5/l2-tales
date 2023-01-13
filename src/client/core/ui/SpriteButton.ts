import Button from "./Button";
import {Rectangle, SCALE_MODES, Sprite, Texture} from "pixi.js";

export default class SpriteButton extends Button
{
    protected _ltSprite = new Sprite()
    protected _lbSprite = new Sprite()
    protected _rtSprite = new Sprite()
    protected _rbSprite = new Sprite()

    protected _lSprite = new Sprite()
    protected _rSprite = new Sprite()
    protected _tSprite = new Sprite()
    protected _bSprite = new Sprite()

    protected _cSprite = new Sprite()

    constructor(label: string, width: number = 200, height: number = 40) {
        super(label, width, height);

        this.container.addChild(this._ltSprite)
        this.container.addChild(this._lbSprite)
        this.container.addChild(this._rtSprite)
        this.container.addChild(this._rbSprite)

        this.container.addChild(this._lSprite)
        this.container.addChild(this._rSprite)
        this.container.addChild(this._tSprite)
        this.container.addChild(this._bSprite)

        this.container.addChild(this._cSprite)

        this.container.addChild(this._labelText)
        this.render()
    }

    setTexture(texture: Texture, dx: number, dy: number) {

        texture.baseTexture.scaleMode = SCALE_MODES.NEAREST

        // @ts-ignore
        this._ltSprite.texture = new Texture(texture.baseTexture, new Rectangle(0, 0, dx, dy))

        // @ts-ignore
        this._lbSprite.texture = new Texture(texture.baseTexture, new Rectangle(0, texture.height - dy, dx, dy))
        this._lbSprite.y = this.height - dy

        // @ts-ignore
        this._rtSprite.texture = new Texture(texture.baseTexture, new Rectangle(texture.width - dx, 0, dx, dy))
        this._rtSprite.x = this.width - dx

        // @ts-ignore
        this._rbSprite.texture = new Texture(texture.baseTexture, new Rectangle(texture.width - dx, texture.height - dy, dx, dy))
        this._rbSprite.x = this.width - dx
        this._rbSprite.y = this.height - dy

        // @ts-ignore
        this._lSprite.texture = new Texture(texture.baseTexture, new Rectangle(0, dy, dx, texture.height - dy - dy))
        this._lSprite.y = dy
        this._lSprite.height = this.height - dy - dy

        // @ts-ignore
        this._rSprite.texture = new Texture(texture.baseTexture, new Rectangle(texture.width - dx, dy, dx, texture.height - dy - dy))
        this._rSprite.x = this.width - dx
        this._rSprite.y = dy
        this._rSprite.height = this.height - dy - dy
        this._rSprite.texture.baseTexture.scaleMode = SCALE_MODES.NEAREST

        // @ts-ignore
        this._tSprite.texture = new Texture(texture.baseTexture, new Rectangle(dx, 0, texture.width - dx - dx, dy))
        this._tSprite.x = dx
        this._tSprite.width = this.width - dx - dx

        // @ts-ignore
        this._bSprite.texture = new Texture(texture.baseTexture, new Rectangle(dx, texture.height - dy, texture.width - dx - dx, dy))
        this._bSprite.x = dx
        this._bSprite.y = this.height - dy
        this._bSprite.width = this.width - dx - dx

        // @ts-ignore
        this._cSprite.texture = new Texture(texture.baseTexture, new Rectangle(dx, dy, texture.width - dx - dx, texture.height - dy - dy))
        this._cSprite.x = dx
        this._cSprite.y = dy
        this._cSprite.width = this.width - dx - dx
        this._cSprite.height = this.height - dy - dy
    }
}