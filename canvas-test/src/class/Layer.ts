import Konva from "konva";
import { Group } from "konva/lib/Group";
import { Line } from "konva/lib/shapes/Line";

export default class Layer {
  layer;
  group: Group | null = null;
  polyLine: Line | null = null;

  constructor(domElement: HTMLDivElement) {
    const width = domElement.offsetWidth;
    const height = domElement.offsetHeight;
    console.log(width, height);
    this.layer = new Konva.Layer({
      listening: true,
    });
    this.eventBinding();
  }

  eventBinding() {
    this.layer.on("mousedown", function (event) {
      console.log("LayerMosueover");
    });
  }

  addGroup() {
    this.group = new Konva.Group();
    this.layer.add(this.group);
  }

  addRectLabel() {
    // label with left pointer
    const labelLeft = new Konva.Label({
      x: 250,
      y: 40,
      opacity: 0.75,
    });

    labelLeft.add(
      new Konva.Tag({
        fill: "green",
        pointerDirection: "left",
        pointerWidth: 20,
        pointerHeight: 28,
        lineJoin: "round",
      })
    );

    labelLeft.add(
      new Konva.Text({
        text: "Lion",
        fontFamily: "Calibri",
        fontSize: 18,
        padding: 5,
        fill: "red",
      })
    );

    const rectBox = new Konva.Rect({
      x: 150,
      y: 40,
      width: 100,
      height: 50,
      fill: "red",
      draggable: true,
      id: 'myRect'
    });

    const rectTransform = new Konva.Transformer({
      nodes: [rectBox],
      centeredScaling: false,
      rotateEnabled: false,
    });
    this.group?.add(rectBox);
    this.group?.add(rectTransform);
    this.group?.add(labelLeft);
  }
  addPolygonDot() {
    if (this.polyLine === null) {
      this.polyLine = new Konva.Line({
        points: [23, 20, 23, 160, 70, 93, 150, 109, 290, 139, 270, 93],
        fill: "#00D2FF",
        stroke: "black",
        strokeWidth: 5,
        closed: true,
        draggable: true,
        bezier: true,
      });
      const polyTransform = new Konva.Transformer({
        nodes: [this.polyLine],
        centeredScaling: false,
        rotateEnabled: false,
      });
      this.layer.add(polyTransform);
      this.layer.add(this.polyLine);
    } else {
      this.polyLine.points(this.polyLine.points().concat([69, 80]));
    }
  }
}
