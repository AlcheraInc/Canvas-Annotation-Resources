import Konva from "konva";


export default class Anchor {
  mainStage
  layer
  line
  vertices:any[] = []
  group
  constructor(containerElement: HTMLDivElement, id: string) {
    const width = containerElement.clientWidth;
    const height = containerElement.clientHeight;

    this.mainStage = new Konva.Stage({
      container: id,
      width,
      height,
    });

    this.layer = new Konva.Layer({
      listening: true,
    });
    this.mainStage.add(this.layer)
    this.group = new Konva.Group({
      draggable: true
    })
    this.draw3000Polygon()
    this.addLine()
    this.layer.add(this.group)
  }

  draw3000Polygon() {
    for(let i = 0; i < 750; i++) {
      if(i % 2 === 0) this.addDot(10 + i * 3, 0)
      else this.addDot(10 + i * 3, 20)
    }
    for(let i = 0; i < 750; i++) {
      if(i % 2 === 0) this.addDot(2250 + 10, 10 + i * 3)
      else this.addDot(2250 - 10, 10 + i * 3)

    }
    for(let i = 0; i < 750; i++) {
      if(i % 2 === 0) this.addDot(2250 - i * 3, 2250 + 10)
      else this.addDot(2250 - i * 3, 2250 - 10)
    }
    for(let i = 0; i < 750; i++) {
      if(i % 2 === 0) this.addDot(0, 2250 - i * 3)
      else this.addDot(20, 2250 - i * 3)
    }
  }
  moveDots() {
    this.vertices.forEach(v => {
      v.move({x: 50, y: 50})
      this.updateDottedLines()
    })
  }
  addDot(x, y) {
    const anchor = new Konva.Circle({
      x,
      y,
      radius: 5,
      stroke: '#666',
      fill: '#FF0000',
      strokeWidth: 1,
      draggable: true,
    })
    this.vertices.push(anchor)
    this.group.add(anchor)

    anchor.on('mouseover', function () {
      document.body.style.cursor = 'pointer';
      this.strokeWidth(4);
    });
    anchor.on('mouseout', function () {
      document.body.style.cursor = 'default';
      this.strokeWidth(2);
    });
    anchor.on('dragmove',  () => {
      this.updateDottedLines();
    });
  }

  addLine() {
    this.line = new Konva.Line({
      dash: [1],
      strokeWidth: 3,
      stroke: 'black',
      lineCap: 'round',
      id: 'quadLinePath',
      // points: [10, 10, 100, 10, 100, 100, 10, 100, 10, 10],
    })
    this.layer.add(this.line)
    this.updateDottedLines();
    this.group.add(this.line)
  }

  updateDottedLines() {
    const points = []
    for(let i = 0; i < this.vertices.length; i++) {
      points.push(this.vertices[i].x())
      points.push(this.vertices[i].y())
    }
    points.push(this.vertices[0].x())
    points.push(this.vertices[0].y())


    this.line.points(points)

  }
}
