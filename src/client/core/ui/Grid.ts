import UI from "./UI";
import {Graphics} from "pixi.js";

class Cell
{
    ui    : UI
    size : number
    grows : boolean

    constructor(ui: UI, size: number, grows: boolean) {
        this.ui = ui
        this.size = size
        this.grows = grows
    }
}

export default class Grid extends UI
{
    private _graphics : Graphics = new Graphics()

    private _cells : Cell[] = []
    private _isHorizontal : boolean = false
    private _padding : number = 10

    private _fixedCellsSize    = 0
    private _fixedCellsCount    = 0
    private _floatingCellsCount = 0

    constructor(padding : number = 10, isHorizontal : boolean = false) {
        super()

        this._padding = padding
        this._isHorizontal = isHorizontal
        this._fullWidth = true

        this.container.addChild(this._graphics)
        this._graphics.visible = false
    }

    get isHorizontal() : boolean { return this._isHorizontal }

    get padding() : number { return this._padding }
    set padding(value: number) {
        this._padding = value
        this.render()
    }

    addChild(ui: UI) {
        this.addCell(ui)
    }

    removeChild(ui: UI) {
        for (let i = 0; i < this._cells.length; i++) {
            if (this._cells[i].ui === ui) {
                if (this._cells[i].grows) {
                    this._floatingCellsCount--
                } else {
                    this._fixedCellsCount--
                    this._fixedCellsSize -= this._cells[i].size
                }
                this._cells.splice(i)
                break
            }
        }
        super.removeChild(ui);
    }

    addCell(ui: UI, size: number = ui.height, grows: boolean = false) {
        if (grows) {
            this._floatingCellsCount++
        } else {
            this._fixedCellsCount++
            this._fixedCellsSize += size
        }
        this._cells.push(new Cell(ui, size, grows))
        super.addChild(ui, false)
        this.render()
    }

    arrangeCells() {
        if (this._isHorizontal) {
            let x = this._padding, w = 0, maxH = 0
            for (let i = 0; i < this._cells.length; i++) {
                if (maxH < this._cells[i].ui.height) maxH = this._cells[i].ui.height
            }
            if (!this._fullHeight) this._height = maxH + this._padding + this._padding
            for (let i = 0; i < this._cells.length; i++) {
                let cell = this._cells[i]
                cell.ui.x = x
                cell.ui.y = this._padding
                x += this.padding
                w = cell.grows
                    ? ((this.width - this._fixedCellsSize - (this._fixedCellsCount * this._padding)) / this._floatingCellsCount) - this._floatingCellsCount * this._padding
                    : cell.size
                x += w
                cell.ui.onParentResize(w, maxH)
            }
        } else
        {
            let y = this._padding, h = 0

            for (let i = 0; i < this._cells.length; i++) {
                let cell = this._cells[i]
                cell.ui.x = this._padding
                cell.ui.y = y
                y += this._padding
                h = cell.grows
                    ? ((this.height - this._fixedCellsSize - (this._fixedCellsCount * this._padding)) / this._floatingCellsCount) - this._floatingCellsCount * this._padding
                    : cell.size
                y += h
            }
            this._height = y
        }
    }



    render() {
        this.arrangeCells()

        this._graphics.clear()
        this._graphics.beginFill(0x00FF00, 0.25)
        this._graphics.drawRect(0, 0, this.width, this.height)
        this._graphics.beginFill(0x00dd00, 0.25)
        this._graphics.drawRect(this._padding, this._padding, this.width - this._padding - this._padding, this.height - this._padding - this._padding)
        this._graphics.endFill()
    }
}