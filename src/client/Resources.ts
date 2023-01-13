import {Loader, Spritesheet, Texture} from "pixi.js"
import log from "../utils/log";


// Global assets cache.
let audios       : {[key: string] : HTMLAudioElement} = {}
let images       : {[key: string] : HTMLImageElement} = {}
let textures     : {[key: string] : Texture}          = {}
let spriteSheets : {[key: string] : Spritesheet}      = {}

export default class Resources
{
    _audiosToLoad : {[key: string] : string} = {}
    _imagesToLoad : {[key: string] : string} = {}

    imagesProgress : number = 0
    audiosProgress : number = 0

    loadingDone : boolean = false

    _handlers : ((progress : number) => void)[] = []

    constructor(resources: {[key: string] : string})
    {
        // Split images and audios.
        for (let p in resources) {
            if (!resources.hasOwnProperty(p)) continue
            let extension = resources[p].split('.').pop()
            if (extension === 'mp3' || extension === 'wav' || extension === 'ogg') {
                this._audiosToLoad[p] = resources[p]
            } else {
                this._imagesToLoad[p] = resources[p]
            }
        }

    }

    static getAudio(name: string) : HTMLAudioElement | null {
        return audios.hasOwnProperty(name) ? audios[name] : null
    }

    static getImage(name: string) : HTMLImageElement | null {
        return images.hasOwnProperty(name) ? images[name] : null
    }

    static getTexture(name: string) : Texture| null {
        return textures.hasOwnProperty(name) ? textures[name] : null
    }

    static getSpriteSheet(name: string) : Spritesheet | null {
        return spriteSheets.hasOwnProperty(name) ? spriteSheets[name] : null
    }

    load() : Promise<any> {
        return Promise.all([
            this.loadImages(),
            this.loadAudios()
        ])
    }

    loadImages() : Promise<any>
    {
        // @ts-ignore
        let loader : Loader = new Loader()

        return loader.load(Object.values(this._imagesToLoad), progress => {
            this.imagesProgress = progress
            this.triggerProgressEvent()
        })
    }

    loadAudios() : Promise<any> {
        return new Promise(resolve => {
            let total = Object.keys(this._audiosToLoad).length
            if (total === 0) return resolve(true)
            let loaded = 0
            let startedAt = Date.now()

            // Resolve promise after 20 seconds to prevent infinity loading.
            let ti = setInterval(() => {
                if (Date.now() - startedAt > 20000) {
                    log.error('Error on sounds loading: ' + loaded + ' of ' + total)
                    this.audiosProgress = 100
                    clearInterval(ti)
                    this.triggerProgressEvent()
                    resolve(true)
                }
            })

            let onloadHandler = () => {
                loaded++
                this.audiosProgress = Math.round(loaded/total * 100)
                this.triggerProgressEvent()
                if (loaded === total) {
                    for (let p in audios) audios[p].removeEventListener('canplay', onloadHandler)
                    clearInterval(ti)
                    resolve(true)
                }
            }

            for (let p in this._audiosToLoad) {
                let a = new Audio()
                audios[p] = a
                a.addEventListener('canplay', onloadHandler)
                a.src = this._audiosToLoad[p]
            }
        })
    }

    triggerProgressEvent() {
        let progress = Math.round(this.imagesProgress * 0.7 + this.audiosProgress * 0.3)
        if (progress === 100 && this.loadingDone) return
        for (let i = 0; i < this._handlers.length; i++) {
            this._handlers[i](progress)
        }
        if (progress === 100) this.loadingDone = true
    }

    onProgress(handler: (progress: number) => void) {
        this._handlers.push(handler)
    }
}