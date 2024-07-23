import { Star } from "./star.js";
import { UFO } from "./ufo.js";
import { TextObject } from "./textObject.js";
import { Drawable } from "./drawable.js";

export class Starfield {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  stars: Drawable[] = [];
  starSpeed: number;
  starSize: number;
  starColor: string;
  spaceColor: string;
  starNum: number;
  ufoSize: number;
  ufoColor: string;
  ufoSpeed: number;
  ufoChance: number;
  maxDepth: number;
  crosshair: { x: number; y: number };
  keysPressed: { [key: string]: boolean } = {};

  constructor(
    canvas: HTMLCanvasElement,
    starNum: number,
    starSpeed: number,
    starSize: number,
    starColor: string,
    spaceColor: string,
    ufoSize: number,
    ufoColor: string,
    ufoSpeed: number,
    ufoChance: number,
    maxDepth: number
  ) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d")!;
    this.starNum = starNum;
    this.starSpeed = starSpeed;
    this.starSize = starSize;
    this.starColor = starColor;
    this.spaceColor = spaceColor;
    this.ufoSize = ufoSize;
    this.ufoColor = ufoColor;
    this.ufoSpeed = ufoSpeed;
    this.ufoChance = ufoChance;
    this.maxDepth = maxDepth;
    this.crosshair = { x: canvas.width / 2, y: canvas.height / 2 };
    this.resizeCanvas();
    window.addEventListener("resize", this.resizeCanvas.bind(this));
    this.initStars();
  }

  resizeCanvas() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  initStars() {
    this.stars = [];
    for (let i = 0; i < this.starNum; i++) {
      if (Math.random() < this.ufoChance) {
        this.stars.push(
          new UFO(
            this.canvas.width,
            this.canvas.height,
            this.maxDepth,
            this.ufoSize,
            this.ufoColor,
            this.ufoSpeed
          )
        );
      } else {
        this.stars.push(
          new Star(this.canvas.width, this.canvas.height, this.maxDepth)
        );
      }
    }
  }

  updateStars() {
    const now = Date.now();
    this.stars = this.stars.filter((star) => {
      if (star instanceof TextObject && star.isExpired()) {
        return false;
      }
      return true;
    });

    for (let star of this.stars) {
      if (star instanceof UFO) {
        star.update(this.canvas.width, this.canvas.height, this.maxDepth);
      } else if (star instanceof Star) {
        star.update(
          this.canvas.width,
          this.canvas.height,
          this.maxDepth,
          this.starSpeed
        );
      }
    }
  }

  drawStars() {
    for (let star of this.stars) {
      if (star instanceof UFO) {
        star.draw(this.ctx, this.canvas.width, this.canvas.height);
      } else {
        star.draw(
          this.ctx,
          this.canvas.width,
          this.canvas.height,
          this.starSize,
          this.starColor
        );
      }
    }
  }

  drawCrosshair() {
    // Draw crosshair lines
    this.ctx.strokeStyle = "pink";
    this.ctx.lineWidth = 2;
    this.ctx.beginPath();
    this.ctx.moveTo(this.crosshair.x - 10, this.crosshair.y);
    this.ctx.lineTo(this.crosshair.x + 10, this.crosshair.y);
    this.ctx.moveTo(this.crosshair.x, this.crosshair.y - 10);
    this.ctx.lineTo(this.crosshair.x, this.crosshair.y + 10);
    this.ctx.stroke();

    // Draw circle around crosshair
    const radius = 6; // Adjust the radius as needed
    this.ctx.strokeStyle = "pink";
    this.ctx.lineWidth = 1;
    this.ctx.beginPath();
    this.ctx.arc(this.crosshair.x, this.crosshair.y, radius, 0, 2 * Math.PI);
    this.ctx.stroke();
  }

  moveCrosshair() {
    if (this.keysPressed["a"]) {
      this.crosshair.x = Math.max(0, this.crosshair.x - 5);
    }
    if (this.keysPressed["d"]) {
      this.crosshair.x = Math.min(this.canvas.width, this.crosshair.x + 5);
    }
    if (this.keysPressed["w"]) {
      this.crosshair.y = Math.max(0, this.crosshair.y - 5);
    }
    if (this.keysPressed["s"]) {
      this.crosshair.y = Math.min(this.canvas.height, this.crosshair.y + 5);
    }
  }

  shoot() {
    for (let i = 0; i < this.stars.length; i++) {
      const star = this.stars[i];
      if (star instanceof UFO) {
        const ufo = star as UFO;
        const size = (ufo.sizeFactor * this.canvas.width) / ufo.z;
        const x =
          (ufo.x - this.canvas.width / 2) * (this.canvas.width / ufo.z) +
          this.canvas.width / 2;
        const y =
          (ufo.y - this.canvas.height / 2) * (this.canvas.width / ufo.z) +
          this.canvas.height / 2;
        if (
          Math.abs(x - this.crosshair.x) < size &&
          Math.abs(y - this.crosshair.y) < size
        ) {
          this.stars[i] = new TextObject(x, y, "😻 +100", "white", 20, 2000);
        }
      }
    }
  }

  loop(timeNow: number) {
    this.ctx.fillStyle = this.spaceColor;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    this.updateStars();
    this.drawStars();
    this.drawCrosshair();
    this.moveCrosshair();

    requestAnimationFrame(this.loop.bind(this));
  }

  start() {
    requestAnimationFrame(this.loop.bind(this));
  }
}
