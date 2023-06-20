import Konva from "konva";

export default class Layer {
    layer
    constructor() {
        this.layer = new Konva.Layer();
        this.eventBinding()
    }

    eventBinding() {
        console.log('qkdl')
        // this.layer.on('mouseover', function (event) {
        //     console.log(event)
        // })
    }
}