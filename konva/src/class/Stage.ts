import Konva from "konva";
import Layer from '@class/Layer'

export default class Stage {
    mainStage
    constructor(containerElement: HTMLDivElement, id: string) {
        const width = containerElement.clientWidth
        const height = containerElement.clientHeight
        console.log(width, height)
        this.mainStage = new Konva.Stage({
            container: id,
            width, height
        })
        this.mainStage.on('mousedown', () => {
            console.log('asd')
        })
    }

    addLayerToStage(layerInstance: Layer) {
        this.mainStage.add(layerInstance.layer)
    }

}