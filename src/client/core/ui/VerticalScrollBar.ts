import UI from "./UI";
import {Graphics} from "pixi.js";
import ContainableUI from "./ContainableUI";

enum BarState {
    normal = 0,
    hover  = 1,
    active = 2
}

let activeScrollBar : VerticalScrollBar = null
let x = 0, y = 0, scrollTop = 0

document.addEventListener('mousedown', e => {
    x = e.clientX
    y = e.clientY
})
document.addEventListener('mousemove', e => {
    if (activeScrollBar === null) return
    let dy = e.clientY - y
    activeScrollBar.scrollTop = scrollTop + (dy * activeScrollBar.scaleFactor)
})

document.addEventListener('mouseup', () => {
    if (activeScrollBar !== null) activeScrollBar.blur()
    activeScrollBar = null
})

export default class VerticalScrollBar extends UI
{
    static readonly width = 24
    static readonly barPadding = 6
    static readonly doubleBarPadding = VerticalScrollBar.barPadding * 2

    private readonly _track : Graphics = new Graphics()
    private readonly _bar   : Graphics = new Graphics()

    private readonly _target : ContainableUI = null

    private _scrollTop : number = 0
    private _barHeight : number = 20
    private _barState : BarState = BarState.normal

    private _scrollHandlers : ((y: number) => void)[] = []


    constructor(target: ContainableUI) {
        super();
        this._fullHeight = true
        this._target = target
        this.container.addChild(this._track)
        this.container.addChild(this._bar)
        this._bar.x = VerticalScrollBar.barPadding
        this._bar.y = VerticalScrollBar.barPadding

        // @ts-ignore
        this._bar.interactive = true

        // @ts-ignore
        this._bar.on('mouseenter', event => {
            this._barState = BarState.hover
            this.render()
        })

        // @ts-ignore
        this._bar.on('mousedown', event => {
            this._barState = BarState.active
            this.render()
            scrollTop = this._scrollTop
            activeScrollBar = this
        })

        // @ts-ignore
        this._bar.on('mouseup', event => {
            this._barState = BarState.normal
            this.render()
        })

        // @ts-ignore
        this._bar.on('mouseleave', event => {
            if (activeScrollBar === this) return
            this._barState = BarState.normal
            this.render()
        })
    }

    blur() {
        this._barState = BarState.normal
        this.render()
    }

    // These properties should never be changed manually.
    set width(width: number) {}
    get width() : number { return this._width }

    set height(height: number) {}
    get height() : number { return this._height }

    set fullHeight(value: boolean) { }
    get fullHeight() : boolean { return this._fullHeight }

    get scrollTop() : number { return this._scrollTop }
    set scrollTop(value: number) {
        if (!this.canScroll) return
        if (value < 0) value = 0
        let max = this._target.height - this.parent.height
        if (value > max) value = max
        this._scrollTop = value
        this.render()
        let k = this._scrollTop / this._target.height
        for (let i = 0; i < this._scrollHandlers.length; i++) {
            this._scrollHandlers[i](k)
        }
    }

    get scaleFactor() : number {
        return this.parent === null ? 0 : (this._target.height - this.parent.height) / (this.parent.height - this._barHeight - VerticalScrollBar.doubleBarPadding)
    }

    get barHeight() : number { return this._barHeight }

    get target() : UI { return this._target }

    private adjustBarPosition() {
        if (!this.canScroll) {
            this.container.visible = false
            return
        }
        this.container.visible = true
        if (this._target.height - this.parent.height < this._scrollTop) {
            this._scrollTop = this._target.height - this.parent.height
        }

        this._barHeight = Math.round((this.parent.height / this._target.height) * (this.parent.height - VerticalScrollBar.doubleBarPadding))
        this._bar.y = (this._scrollTop / (this._target.height - this.parent.height)) * (this.parent.height - this._barHeight- VerticalScrollBar.doubleBarPadding) + VerticalScrollBar.barPadding
    }

    get canScroll() : boolean {
        return this.parent === null || this._target === null
            ? false
            : this._target.height >= this.parent.height
    }

    onParentResize(w: number, h: number) {
        this.x = w - VerticalScrollBar.width
        this._height = h
        this.render()
    }

    render() {
        if (this.parent === null || this._target === null) return

        this.adjustBarPosition()

        let k = this._scrollTop / this._target.height
        for (let i = 0; i < this._scrollHandlers.length; i++) {
            this._scrollHandlers[i](k)
        }

        this._track.clear()
        this._track.beginFill(0x15151c, 1)
        this._track.drawRect(0, 0, VerticalScrollBar.width, this.height)
        this._track.endFill()

        this._bar.clear()
        this._bar.beginFill(this._barState === BarState.normal ? 0x333339 : 0x44444c, 1)
        this._bar.drawRoundedRect(0, 0, VerticalScrollBar.width - VerticalScrollBar.doubleBarPadding, Math.max(this._barHeight, VerticalScrollBar.width - VerticalScrollBar.doubleBarPadding), VerticalScrollBar.width)
        this._bar.endFill()
    }

    onScroll(handler: (y: number) => void) {
        this._scrollHandlers.push(handler)
    }
}