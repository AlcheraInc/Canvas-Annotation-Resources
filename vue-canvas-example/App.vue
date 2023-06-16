<template>
  <canvas
    id="canvas"
    :width="canvasWidth"
    :height="canvasHeight"
    @mousemove="onMouseMove($event)"
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'canvas-sandbox',
  data() {
    return {
      canvasContext: null,
      canvasHeight: 300,
      canvasWidth: 300,
      drawUpdateInterval: null,
      // ball
      ballRadius: 10,
      x: 150,
      y: 150,
      dx: 2,
      dy: 4,
      decelerateRate: 0.5,
      // paddle
      paddlex: 150,
      paddleHeight: 10,
      paddleWidth: 75,
      // keypress handling
      leftKeyPressedDown: false,
      rightKeyPressedDown: false,
      // cursor handling
      canvasMinCursorPositionX: 0,
      canvasMaxCursorPositionX: 300,
      // bricks
      brickCount: 0,
      brickStructure: [],
      rows: 5,
      columns: 5,
      brickWidth: 59,
      brickHeight: 15,
      brickPadding: 1,
      // colors
      rowColors: ["red", "orange", "yellow", "lime", "aqua"],
      paddleColor: "black",
      ballColor: "grey",
      backgroundColor: "white",
    }
  },
  created() {
    window.addEventListener('keydown', this.onKeyDown)
    window.addEventListener('keyup', this.onKeyUp)
  },
  mounted() {
    this.canvasContext = document.getElementById('canvas').getContext('2d')
    if (this.canvasContext) {
      this.init()
    } else {
      console.error('Could not get canvas reference')
    }
  },
  destroyed() {
    window.removeEventListener('keydown', this.onKeyDown)
    window.addEventListener('keyup', this.onKeyUp)
  },
  methods: {
    init() {
      // set cursor scrolling boundary values
      const canvas = document.getElementById('canvas')
      const canvasBounds = canvas?.getBoundingClientRect()
      this.canvasMinCursorPositionX = canvasBounds.left
      this.canvasMaxCursorPositionX = canvasBounds.right

      // set brick values
      this.brickWidth = (this.canvasWidth / this.columns) - 1
      this.brickCount = this.rows * this.columns
      this.brickStructure = new Array(this.rows)
      for (let i = 0; i < this.rows; i++) {
        this.brickStructure[i] = new Array(this.columns)
        for (let j = 0; j < this.columns; j++) {
          this.brickStructure[i][j] = 1
        }
      }

      // start drawing
      clearInterval(this.drawUpdateInterval)
      this.drawUpdateInterval = setInterval(this.draw, 10)
    },
    draw() {
      this.canvasContext.fillStyle = this.backgroundColor
      this.clear()
      this.canvasContext.fillStyle = this.ballColor
      this.drawBall(this.x, this.y, this.ballRadius)

      this.updatePaddlePosition()
      this.drawPaddle()

      this.drawBricks()
      this.handleBrickCollision()

      this.updateBallPosition()
    },

    // physics
    decelerateBall(motionType) {
      if (motionType === 'horizontal') {
        const IS_MOVING = this.dx !== 0
        if (!IS_MOVING) {
          this.handleBallStop()
        }
        const IS_MOVING_RIGHT = this.dx > 0
        IS_MOVING_RIGHT ? this.dx -= this.decelerateRate : this.dx += this.decelerateRate
      } else if (motionType === 'vertical') {
        const IS_MOVING = this.dy !== 0
        if (!IS_MOVING) {
          this.handleBallStop()
        }
        const IS_MOVING_DOWN = this.dy > 0
        IS_MOVING_DOWN ? this.dy -= this.decelerateRate : this.dy += this.decelerateRate
      }
    },
    updateBallPosition() {
      // ball collision with left/right sides of canvas container
      if (this.x + this.dx + this.ballRadius > this.canvasWidth || this.x + this.dx - this.ballRadius < 0) {
        // this.decelerateBall('horizontal')
        this.dx *= -1
      }
      // ball collision with top of canvas container
      if (this.y + this.dy - this.ballRadius < 0) {
        // this.decelerateBall('vertical')
        this.dy *= -1
      } else if (this.y + this.dy + this.ballRadius > this.canvasHeight) {
        if (this.x > this.paddlex && this.x < this.paddlex + this.paddleWidth) {
          this.dx = 8 * ((this.x - (this.paddlex + this.paddleWidth / 2)) / this.paddleWidth);
          this.dy *= -1
        } else {
        // ball collision with bottom of canvas container, i.e.- GAME OVER
          clearInterval(this.drawUpdateInterval)
        }
      }
      this.x += this.dx
      this.y += this.dy
    },
    updatePaddlePosition() {
      if (this.rightKeyPressedDown) {
        this.paddlex += 5
      } else if (this.leftKeyPressedDown) {
        this.paddlex -= 5
      }
    },
    handleBallStop() {
      clearInterval(this.drawUpdateInterval)
    },
    handleBrickCollision() {
      const ROW_HEIGHT = this.brickHeight + this.brickPadding
      const COLUMN_WIDTH = this.brickWidth + this.brickPadding
      const ROW = Math.floor(this.y / ROW_HEIGHT)
      const COLUMN = Math.floor(this.x / COLUMN_WIDTH)

      if (this.y < this.rows * ROW_HEIGHT && ROW >= 0 && COLUMN >= 0 && this.brickStructure[ROW][COLUMN] == 1) {
        this.dy *= -1
        this.brickStructure[ROW][COLUMN] = 0
        this.brickCount -= 1

        if (this.brickCount === 0) {
          this.handleGameClear()
        }
      }
    },

    // draw shapes
    drawBall(x,y,r) {
      this.canvasContext.beginPath()
      this.canvasContext.arc(x, y, r, 0, Math.PI*2, true)
      this.canvasContext.closePath()
      this.canvasContext.stroke()
    },
    drawRectangle(x,y,w,h) {
      this.canvasContext.beginPath()
      this.canvasContext.rect(x,y,w,h)
      this.canvasContext.closePath()
      this.canvasContext.fill()
    },
    drawPaddle() {
      this.canvasContext.fillStyle = this.paddleColor
      this.drawRectangle(this.paddlex, this.canvasHeight - this.paddleHeight, this.paddleWidth, this.paddleHeight)
    },
    drawBricks() {
      for (let i = 0; i < this.rows; i++) {
        this.canvasContext.fillStyle = this.rowColors[i]
        for (let j = 0; j < this.columns; j++) {
          if (this.brickStructure[i][j] == 1) {
            this.drawRectangle((j * (this.brickWidth + this.brickPadding)) + this.brickPadding, 
              (i * (this.brickHeight + this.brickPadding)) + this.brickPadding,
              this.brickWidth, this.brickHeight)
          }
        }
      }
    },
    clear() {
      this.canvasContext.clearRect(0, 0, this.canvasWidth, this.canvasHeight)
      this.drawRectangle(0, 0, this.canvasWidth, this.canvasHeight)
    },

    // handle keypress events
    onKeyDown(keyDownEvent) {
      if (keyDownEvent.keyCode === 37) {
        this.leftKeyPressedDown = true
      } else if (keyDownEvent.keyCode === 39) {
        this.rightKeyPressedDown = true
      }
    },
    onKeyUp(keyUpEvent) {
      if (keyUpEvent.keyCode === 37) {
        this.leftKeyPressedDown = false
      } else if (keyUpEvent.keyCode === 39) {
        this.rightKeyPressedDown = false
      }
    },

    // handle cursor movement events
    onMouseMove(mousemoveEvent) {
      if (mousemoveEvent.pageX > this.canvasMinCursorPositionX && mousemoveEvent.pageX < this.canvasMaxCursorPositionX) {
        this.paddlex = mousemoveEvent.pageX - this.canvasMinCursorPositionX - this.paddleWidth / 2
      }
    },

    // game state
    handleGameClear() {
      clearInterval(this.drawUpdateInterval)
      this.canvasContext.fillStyle = this.backgroundColor
      this.clear()
      this.canvasContext.fillStyle = 'black'
      this.canvasContext.font = "30px serif"
      this.canvasContext.textAlign = 'center'
      this.canvasContext.fillText("GAME CLEAR", this.canvasWidth / 2, this.canvasHeight / 2)
    }
  }
});
</script>

<style scoped>
canvas {
  border: 1px solid black;
  background-color: white;
}
</style>
