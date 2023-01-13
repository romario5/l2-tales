import {Container} from "pixi.js";

const _children = Symbol('children')
const _parent = Symbol('parent')

export default class UI
{
    protected _x : number = 0
    protected _y : number = 0

    protected _width : number = 10
    protected _height : number = 10

    protected _fullWidth  : boolean = false
    protected _fullHeight : boolean = false

    readonly container : Container = new Container();

    private [_children] : UI[] = []
    private [_parent] : UI = null

    get parent() : UI { return this[_parent] }

    addChild(ui: UI, toggleParentResize: boolean = true) {
        this.container.addChild(ui.container)
        ui[_parent] = this
        this[_children].push(ui)
        if (toggleParentResize) ui.onParentResize(this.width, this.height)
    }

    removeChild(ui: UI) {
        this.container.removeChild(ui.container)
        ui[_parent] = null
        let index = this[_children].indexOf(ui)
        if (index >= 0) this[_children].splice(index)
    }


    get x() : number { return this._x }
    set x(x : number) {
        this._x = x
        this.container.x = x
    }

    get y() : number { return this._y }
    set y(y : number) {
        this._y = y
        this.container.y = y
    }

    get width() : number { return this._width }
    set width(width: number) {
        this._width = width
    }

    get height() : number { return this._height }
    set height(height : number) {
        this._height = height
    }

    get fullWidth() : boolean { return this._fullWidth }
    set fullWidth(value: boolean) {
        this._fullWidth = value
        if (this.parent !== null) {
            this.width = this.parent.width
        }
    }

    get fullHeight() : boolean { return this._fullHeight }
    set fullHeight(value: boolean) {
        this._fullHeight = value
        if (this.parent !== null) {
            this.height = this.parent.height
        }
    }

    forEachChild(func: (child: UI) => void) {
        for (let i = 0; i < this[_children].length; i++) {
            func(this[_children][i])
        }
    }

    render() {}

    onParentResize(w: number, h: number) {
        if ((this._fullWidth && w !== this._width) || (this._fullHeight && h !== this._height)) {
            if (this._fullWidth) this.width = w
            if (this._fullHeight) this.height = h
            this.triggerResize()
            this.render()
        }
    }

    triggerResize() {
        for (let i = 0; i < this[_children].length; i++) {
            this[_children][i].onParentResize(this.width, this.height)
        }
    }
}