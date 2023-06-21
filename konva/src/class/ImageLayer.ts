import Konva from "konva";
export default class ImageLayer {
  layer

  constructor() {
    this.layer = new Konva.Layer()
    this.loadImage()
  }

  loadImage() {
    Konva.Image.fromURL('lion.webp', (imageNode) => {
      imageNode.setAttrs({
        x: 0,
        y: 0,
        scaleX: 0.5,
        scaleY: 0.5,
      })
      this.layer.add(imageNode)
    })
  }
}
