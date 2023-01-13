import WorldBlock from "./WorldBlock";
import log from "../../utils/log";
import WorldDataProvider from "./WorldDataProvider";
import RandomWorldDataProvider from "./RandomWorldDataProvider";
import WorldData from "./WorldData";
import FlatGameObject from "../objects/FlatGameObject";

export default class World extends FlatGameObject
{
    static readonly blockW = 50
    static readonly blockH = 50

    static readonly cellSize = 64

    width  : number
    height : number

    blocks : WorldBlock[][] = []

    dataProvider : WorldDataProvider = new RandomWorldDataProvider()


    getBlockX(objX: number) {
        return Math.ceil(objX / World.blockW)
    }

    getBlockY(objY: number) {
        return Math.ceil(objY / World.blockH)
    }

    getBlock(x: number, y: number) : WorldBlock | null {
        x = Math.floor(x); y = Math.floor(y);
        return x >= 0 && y >= 0 && x < this.blocks.length && y < this.blocks[x].length ? this.blocks[x][y] : null
    }

    // Init blocks and load data
    async init(width: number, height: number)
    {
        if (this.blocks.length > 0) {
            log.error('Trying to initialize world twice.')
            return
        }


        this.width = width
        this.height = height

        // Load world data async
        let loadingPromises : Promise<WorldData>[] = []

        let processData = (data: WorldData) => {
            let block: WorldBlock = this.getBlock(data.x, data.y)
            if (block !== null) {
                block.initObjects(data)
            }
        }

        for (let i = 0; i < this.width; i++) {
            let blocks : WorldBlock[] = []
            this.blocks.push(blocks)
            for (let j = 0; j < this.height; j++) {
                let block = new WorldBlock(World.blockW * i, World.blockH * j, World.blockW, World.blockH)
                this.container.addChild(block.container)
                block.container.visible = false
                blocks.push(block)
                let p : Promise<WorldData> = this.dataProvider.getBlockData(i, j)
                p.then(processData)
                loadingPromises.push(p)
            }
        }

        await Promise.all(loadingPromises)
    }
}