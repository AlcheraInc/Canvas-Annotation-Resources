import {
  Container,
  Graphics,
  DisplayObject,
  FederatedPointerEvent,
} from "pixi.js";

import PolygonLine from "./pixi-line";
import PolygonVertex from "./pixi-vertex";
import type { Point } from ".";
import Vertex from "./pixi-vertex";

export default class PixiPolygon {
  stage: Container;
  container;
  currentDraggingVertex: Graphics | null = null;
  isContainerDragging: boolean = false
  polygonLine: PolygonLine
  prev: Point = {x: 0, y: 0}

  constructor(stage: Container, points: Point[]) {
    this.stage = stage;
    this.container = new Container();
    this.container.eventMode = "static";
    this.drawVertices(points);
    this.polygonLine = new PolygonLine(points, this);
    this.container.addChild(this.polygonLine.line);
    // @ts-ignore
    this.stage.on("pointerup", this.removeDageMoveEvent, this);
  }

  drawVertices(points: Point[]) {
    for (let i = 0; i < points.length; i++) {
      const circleVertex = new PolygonVertex(
        this,
        points[i].x,
        points[i].y,
        5,
        "red"
      );
      this.container.addChild(circleVertex.vertex);
    }
  }

  updateCurrentDraggingVertex(vertex: Graphics | null, x: number, y: number) {
    this.currentDraggingVertex = vertex;
    this.prev.x = x
    this.prev.y = y
  }

  updateContainerDragCondition(condition: boolean, x: number, y: number) {
    this.isContainerDragging = condition
    this.prev.x = x - this.container.x
    this.prev.y = y - this.container.y
  }

  addDageMoveEvent() {
    // @ts-ignore
    this.stage.on("pointermove", this.dragging, this);
  }

  removeDageMoveEvent() {
    // console.log("container-pointerup");
    if (this.currentDraggingVertex) {
      this.currentDraggingVertex.alpha = 1;
      this.currentDraggingVertex = null;
    }
    // @ts-ignore
    this.stage.off("pointermove");
  }

  redrawLine() {
    const points = [];
    for (let i = 0; i < this.container.children.length - 1; i++) {
      points.push({
        x: this.container.children[i].position.x,
        y: this.container.children[i].position.y,
      });
    }
    this.polygonLine.updatePolygonLine(points);
  }

  dragging(event: FederatedPointerEvent) {
    // console.log("container-pointermove");
    if (this.currentDraggingVertex) {
      this.currentDraggingVertex.x = event.clientX - this.prev.x
      this.currentDraggingVertex.y = event.clientY - this.prev.y
      this.redrawLine()
    }
    else if(this.isContainerDragging) {
      const { clientX, clientY} = event
      this.container.x = clientX - this.prev.x
      this.container.y = clientY - this.prev.y
      const points = [];
      for (let i = 0; i < this.container.children.length - 1; i++) {
        points.push({
          x: this.container.children[i].position.x,
          y: this.container.children[i].position.y,
        });
      }
      this.polygonLine.points = points
    }
  }

  deleteVertex(vertex: Vertex) {
    this.container.removeChild(vertex)
    this.redrawLine()
  }

  addNewVertex(x, y, index) {
    const newVertex = new PolygonVertex(this, x, y,5,"red")

    this.container.addChildAt(newVertex.vertex, index)

    this.redrawLine()
  }
}
