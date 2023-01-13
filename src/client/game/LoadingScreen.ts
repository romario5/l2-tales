import {Container, Text, TextStyle} from "pixi.js";

export default class LoadingScreen
{
    container    : Container = new Container()
    progressText : Text = new Text()
    progress     : number = 0

    constructor() {
        this.container.addChild(this.progressText)
        this.progressText.tint = 0xFFFFFF
        this.progressText.style.fontSize = 24
        this.progressText.style.fill = 0xFFFFFF
        this.progressText.text = '0%'
        this.progressText.x = 20
        this.progressText.y = 20
    }

    updateProgress(progress: number) {
        this.progress = progress * 100
        this.progress = this.progress > 100 ? 100 : this.progress
        this.progressText.text = this.progress + '%'
    }
}