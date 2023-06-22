import { fabric } from "fabric";

export default class FabricCanvas {
  fabricCanvas: fabric.Canvas;
  group: fabric.Group | null = null;
  polygon: fabric.Polygon | null = null;
  constructor(canvasElement: HTMLCanvasElement) {
    this.fabricCanvas = new fabric.Canvas(canvasElement, {
      width: 500,
      height: 300,
    });
    this.eventBinding();
  }

  eventBinding() {
    this.fabricCanvas.on("mouse:up", (event) => {
      console.log(event);
      console.log(this.polygon);
      if (this.polygon !== null) {
        const x = this.fabricCanvas.getPointer(event.e, true).x;
        const y = this.fabricCanvas.getPointer(event.e, true).y;

        this.addPolygonPoint(x, y);
      }
    });
  }

  addGroup() {
    const circle = new fabric.Circle({
      radius: 100,
      fill: "#eef",
      scaleY: 0.5,
      originX: "center",
      originY: "center",
    });

    const text = new fabric.Text("hello Alchera", {
      fontSize: 30,
      originX: "center",
      originY: "center",
    });

    this.group = new fabric.Group([circle, text], {
      left: 150,
      top: 100,
      angle: -10,
      selectable: true,
    });

    this.fabricCanvas.add(this.group);
  }
  unvisibleGroup() {
    console.log("zz");
    this.group?.set("visible", false);
    this.fabricCanvas.renderAll();
  }

  makePolygon() {
    const points = [
      {
        x: 3,
        y: 4,
      },
      {
        x: 16,
        y: 3,
      },
      {
        x: 30,
        y: 5,
      },
      {
        x: 25,
        y: 55,
      },
      {
        x: 19,
        y: 44,
      },
      {
        x: 15,
        y: 30,
      },
      {
        x: 15,
        y: 55,
      },
      {
        x: 9,
        y: 55,
      },
      {
        x: 6,
        y: 53,
      },
      {
        x: -2,
        y: 55,
      },
      {
        x: -4,
        y: 40,
      },
      {
        x: 0,
        y: 20,
      },
    ];
    this.polygon = new fabric.Polygon(points, {
      fill: "#00000000",
      strokeWidth: 0,
      stroke: "green",
      selectable: true,
      cornerColor: "blue",
      strokeLineJoin: "round",
    });
    console.log(this.polygon);
    this.fabricCanvas.add(this.polygon);
  }
  addPolygonPoint(x: number, y: number) {
    console.log(x, y);
    if (this.polygon && this.polygon.points?.length) {
      const newPoint = new fabric.Point(x, y);
      this.polygon?.points.push(newPoint);
      this.fabricCanvas.remove(this.polygon);
      const obj = this.polygon.toObject();
      delete obj.top;
      delete obj.left;
      this.polygon = new fabric.Polygon(this.polygon.points, obj);
      this.fabricCanvas.add(this.polygon);
      this.fabricCanvas.renderAll();
      this.fabricCanvas.setActiveObject(this.polygon);
    }
  }
}
