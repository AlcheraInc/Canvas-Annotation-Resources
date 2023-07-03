<template>
  <div id="app">
   <canvas id="pixi-canvas"></canvas>
  </div>
</template>

<script>
import { Application, Graphics, Sprite } from 'pixi.js';

export default {
  name: 'App',
  mounted() {
    const app = new Application({
      view: document.getElementById("pixi-canvas"),
      resolution: window.devicePixelRatio || 1,
      autoDensity: true,
      backgroundColor: 0x6495ed,
      width: 1000,
      height: 600
    });

    // Create a Graphics object, set a fill color, draw a rectangle
    let obj = new Graphics();
    obj.beginFill(0xff0000);
    obj.drawRect(0, 0, 100, 50);

    // Add it to the stage to render
    app.stage.addChild(obj);

    // Create 5 duplicate rectangles
    for (let i = 0; i < 5; i++) {
    // Initialize the duplicate using the geometry from "obj"
      const duplicate = new Graphics(obj.geometry);
      duplicate.beginFill(0x292929);
      const x = 50 * i + 200;
      const y = 50 * i + 200;
      const width = 100;
      const height = 100;
      duplicate.drawRect(x, y, width, height);
      app.stage.addChild(duplicate);
      duplicate.destroy();
    }

    // Create a Sprite object, obtain image from source, set position and size
    const clampy = Sprite.from("https://www.mariowiki.com/images/8/89/DMW-Clampy.png");
    clampy.x = app.screen.width / 2;
    clampy.y = app.screen.height / 2;

    app.stage.addChild(clampy);
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
