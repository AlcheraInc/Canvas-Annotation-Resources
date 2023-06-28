import Konva from "konva";
import { Layer } from "konva/lib/Layer";

export default class Stage {
  mainStage;
  // backgroundImageLayer
  constructor(containerElement: HTMLDivElement, id: string) {
    const width = containerElement.clientWidth;
    const height = containerElement.clientHeight;

    this.mainStage = new Konva.Stage({
      container: id,
      width,
      height,
    });
  }

  addLayerToStage(layerInstance: Layer) {
    this.mainStage.add(layerInstance);
  }

  findRectById(id: string) {
    const rect = this.mainStage.find(id)[0]
    console.log(rect.getClientRect())
    console.log(rect)
  }
}
