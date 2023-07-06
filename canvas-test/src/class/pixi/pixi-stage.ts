import { Application, FederatedPointerEvent } from "pixi.js";

import Container from "./pixi-polygon";

export default class Pixi {
  app;
  polygonContainer;

  constructor(wrapperDom: HTMLDivElement) {
    this.app = new Application<HTMLCanvasElement>({
      antialias: true,
      resizeTo: wrapperDom,
      background: "#1099bb",
    });
    this.app.stage.eventMode = "static";
    this.app.stage.hitArea = this.app.screen;

    // @ts-ignore
    globalThis.__PIXI_APP__ = this.app;

    wrapperDom.appendChild(this.app.view);

    const points = [
      { x: 50, y: 50 },
      { x: 100, y: 50 },
      { x: 120, y: 50 },
      { x: 140, y: 60 },
      { x: 160, y: 70 },
      { x: 170, y: 80 },
      { x: 180, y: 90 },
      { x: 200, y: 500 },
      { x: 100, y: 100 },
      { x: 50, y: 100 },
    ];

    this.polygonContainer = new Container(this.app.stage, points);
    this.app.stage.addChild(this.polygonContainer.container);
  }
}
