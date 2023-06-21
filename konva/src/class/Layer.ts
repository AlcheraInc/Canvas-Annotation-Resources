import Konva from "konva";
import { Group } from "konva/lib/Group";

export default class Layer {
  layer;
  group: Group | null = null;

  constructor() {
    this.layer = new Konva.Layer();
    this.eventBinding();
  }

  eventBinding() {
    this.layer.on("mouseover", function (event) {
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
}
