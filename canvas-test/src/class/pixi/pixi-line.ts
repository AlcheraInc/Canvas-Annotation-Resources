import {FederatedPointerEvent, Graphics} from "pixi.js";
import Container from "./pixi-polygon"
import type { Point } from ".";

export default class PolygonLine {
  line;
  container;
  points
  constructor(points: Point[], container: Container) {
    this.line = new Graphics();
    this.points = points
    this.line.eventMode = "static"
    this.drawPolygonLine(points)
    this.container = container;
    this.addEvenPointerEvent()
  }

  updatePolygonLine(points: Point[]) {
    this.points = points
    this.line.clear();
    this.drawPolygonLine(points)
  }

  drawPolygonLine(points: Point[]) {
    this.line.lineStyle(5, "blue", 1);
    this.line.beginFill('green', 0.5);

    const startX = points[0].x
    const startY = points[0].y
    this.line.setTransform(startX, startY)

    for (let i = 1; i < points.length; i++) {
      this.line.lineTo(points[i].x - startX, points[i].y - startY);
    }

    // this.line.lineTo(startX, startY);
    // this.line.setTransform(points[0].x, points[0].y)
    this.line.closePath();
  }

  addEvenPointerEvent() {
    this.line.on("pointerdown", this.handleClick, this);
    this.line.on("pointerup", this.onDragEnd, this);
  }

  onDragStart(event: FederatedPointerEvent) {
    console.log('line-pointerdown')
    this.line.alpha = 0.5;
    this.container.updateContainerDragCondition(true, event.clientX, event.clientY)
    this.container.addDageMoveEvent();
  }
  onDragEnd() {
    this.line.alpha = 1
    this.container.updateContainerDragCondition(false)
    this.container.removeDageMoveEvent();
  }


   handleClick(event) {

    console.log(event, this.points)
    const clickX = event.globalX;
    const clickY = event.globalY;



    for(let i = 0; i < this.points.length - 1; i++) {
      const lineStartX = this.points[i].x;
      const lineStartY = this.points[i].y;
      const lineEndX = this.points[i+1].x;
      const lineEndY = this.points[i+1].y;

      const distance = this.pointToLineDistance(clickX, clickY, lineStartX, lineStartY, lineEndX, lineEndY);

      if (distance < 5) {
        this.container.addNewVertex(event.globalX, event.globalY, i + 1)
        return
      }
    }

    this.onDragStart(event)
  }

  pointToLineDistance(x, y, x1, y1, x2, y2) {
    const A = x - x1;
    const B = y - y1;
    const C = x2 - x1;
    const D = y2 - y1;

    const dot = A * C + B * D;
    const lenSq = C * C + D * D;
    let param = -1;


    if (lenSq !== 0) {
      param = dot / lenSq;
    }

    let xx, yy;

    if (param < 0) {
      xx = x1;
      yy = y1;
    } else if (param > 1) {
      xx = x2;
      yy = y2;
    } else {
      xx = x1 + param * C;
      yy = y1 + param * D;
    }

    const dx = x - xx;
    const dy = y - yy;

    return Math.sqrt(dx * dx + dy * dy);
  }
}
