import ContainableUI from "./ContainableUI";
import UI from "./UI";

export default class VerticalContainer extends ContainableUI
{
    private _h = this.height
    private _needsUpdate : boolean = true

    addChild(ui: UI) {
        super.addChild(ui)
        this.arrangeChildren()
        this.triggerResize()
        this._needsUpdate = true
    }

    arrangeChildren() {
        let y = 0
        this.forEachChild(child => {
            child.y = y
            y += child.height
        })
    }

    get children() : UI[]
    {
        let children : UI[] = []
        this.forEachChild(child => children.push(child))
        return children
    }

    get height() : number
    {
        if (this._needsUpdate) {
            let h = 0
            this.forEachChild(child => h += child.height)
            this._h = h
        }
        return this._h
    }

    set height(height: number) {}

    onParentResize(w: number, h: number) {
        if (this._fullWidth) this.width = w
        let y = 0
        this.triggerResize()
        this.forEachChild(child => {
            child.y = y
            y += child.height
        })
        this._h = y
        this._height = y
        this._needsUpdate = false

        this.render()
    }
}