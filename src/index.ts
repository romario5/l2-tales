import LoadingScreen from "./client/game/LoadingScreen";
import assets from "./client/game/assets";
import {Assets} from "pixi.js";
import delay from "./utils/etc";
import Scene from "./common/Scene";
import camera from "./client/game/camera";
import Player from "./common/objects/Player";
import game from "./client/game/game";
import Engine from "./client/core/Engine";

(async () =>
{
    let loadingScreen = new LoadingScreen()
    Engine.viewport.app.stage.addChild(loadingScreen.container)


    await Assets.init({manifest: assets})

    await Assets.loadBundle('game', async progress => {
        loadingScreen.updateProgress(progress)
        if (progress >= 1) {
            loadingScreen.progressText.text = 'Initializing world...'
        }
    })

    await delay(100)

    Engine.ui.init()

    let player = new Player()

    //await Engine.world.init(10, 10)

    let scene = new Scene('mainScene', camera, Engine.world, player)
    Engine.viewport.switchScene(scene)
    game.scene = scene

    loadingScreen.progressText.text = 'Ready'
    await delay(1000)
    Engine.viewport.app.stage.removeChild(loadingScreen.container)
})()