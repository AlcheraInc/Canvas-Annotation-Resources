import { Graphics, FederatedPointerEvent } from "pixi.js";
import Container from "./pixi-polygon";

export default class Vertex {
  container: Container;
  vertex;
  isDraggable: boolean = false;

  constructor(
    container: Container,
    x: number,
    y: number,
    radius: number,
    color: string
  ) {
    this.container = container;
    this.vertex = new Graphics();
    this.vertex.eventMode = "static";
    this.vertex.cursor = "pointer";
    this.vertex.lineStyle(0);
    this.vertex.beginFill(color, 1);
    this.vertex.drawCircle(0, 0, radius);
    this.vertex.endFill();
    this.vertex.setTransform(x, y);
    this.addEventPointerEvent();
  }

  addEventPointerEvent() {
    this.vertex.on("pointerdown", this.onDragStart, this);
    this.vertex.on("pointerup", this.onDragEnd, this);
    this.vertex.on("rightclick", this.onRightClick, this);
  }

  // Pointer Event Handler
  onDragStart(event: FederatedPointerEvent) {
    // console.log("vertex-pointerdown");
    this.isDraggable = true;
    this.vertex.alpha = 0.5;
    const x = event.clientX - this.vertex.x
    const y = event.clientY - this.vertex.y
    this.container.updateCurrentDraggingVertex(this.vertex, x, y);
    this.container.addDageMoveEvent();
  }

  onRightClick() {
    this.container.deleteVertex(this.vertex)
  }

  onDragEnd() {
    // console.log("vertex-pointerup");
    this.isDraggable = false;
    this.vertex.alpha = 1;
    this.container.updateCurrentDraggingVertex(null, 0 , 0);
    this.container.removeDageMoveEvent();
  }
}
