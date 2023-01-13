import UI from "./UI";
import VerticalScrollBar from "./VerticalScrollBar";
import VerticalContainer from "./VerticalContainer";
import {Graphics, Rectangle} from "pixi.js";

let activeContainer : ScrollableContainer = null

document.addEventListener('wheel', e => {
    if (activeContainer === null) return
    activeContainer.verticalScrollBar.scrollTop = activeContainer.verticalScrollBar.scrollTop + (e.deltaY * activeContainer.verticalScrollBar.scaleFactor)
})


export default class ScrollableContainer extends UI
{
    private readonly _content    : VerticalContainer = new VerticalContainer()
    private readonly _vScrollBar : VerticalScrollBar
    private readonly _mask       : Graphics = new Graphics()

    constructor() {
        super()
        super.addChild(this._content)
        this._vScrollBar = new VerticalScrollBar(this._content)
        super.addChild(this._vScrollBar)
        this._content.container.mask = this._mask

        this._vScrollBar.onScroll(k => {
            this._content.y = -this._content.height * k
        })

        // @ts-ignore
        this.container.interactive = true

        // @ts-ignore
        this.container.on('mouseenter', event => {
            activeContainer = this
        })

        // @ts-ignore
        this.container.on('mouseleave', event => {
            activeContainer = null
        })


        // @ts-ignore
        this.container.hitArea = new Rectangle(0, 0, this.width, this.height)
    }

    get verticalScrollBar() : VerticalScrollBar { return this._vScrollBar }

    addChild(ui: UI) {
        this._content.addChild(ui)
        this.triggerResize()
    }

    private adjustElements() {
        this._content.width = this._vScrollBar.canScroll ? this._width - VerticalScrollBar.width : this._width
        this._mask.clear()
        this._mask.beginFill(0xFFFFFF, 1)
        this._mask.drawRect(0, 0, this._content.width, this._height)
        this._mask.endFill()
    }

    onParentResize(w: number, h: number) {
        if (this._fullWidth) this._width = w
        if (this._fullHeight) this._height = h
        // @ts-ignore
        this.container.hitArea.width = w
        // @ts-ignore
        this.container.hitArea.height = h
        this.adjustElements()
        this.triggerResize()
        this.render()
    }
}