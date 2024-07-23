import { Star } from "./star.js";
import { UFO } from "./ufo.js";
import { TextObject } from "./textObject.js";
import { Drawable } from "./drawable.js";
import { levels, Level } from "./levels.js";

export class Starfield {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  stars: Drawable[] = [];
  crosshair: { x: number; y: number };
  keysPressed: { [key: string]: boolean } = {};
  currentLevel: number;
  shipsMissed: number;
  shipsDestroyed: number;
  levelMessage: string;
  levelMessageDuration: number;
  levelMessageStartTime: number;
  totalPoints: number;
  levelPoints: number;
  ufosSpawned: number;
  maxShips: number;
  showingLevelSummary: boolean;
  summaryMessages: string[];
  summaryMessageIndex: number;

  laserSound: HTMLAudioElement;
  explosionSound: HTMLAudioElement;
  maxDepth: number;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d")!;
    this.crosshair = { x: canvas.width / 2, y: canvas.height / 2 };
    this.currentLevel = 0;
    this.shipsMissed = 0;
    this.shipsDestroyed = 0;
    this.totalPoints = 0;
    this.levelPoints = 0;
    this.ufosSpawned = 0;
    this.maxShips = levels[this.currentLevel].maxShips;
    this.levelMessage = `Level ${this.currentLevel + 1} Start!`;
    this.levelMessageDuration = 3000;
    this.levelMessageStartTime = Date.now();
    this.showingLevelSummary = false;
    this.summaryMessages = [];
    this.summaryMessageIndex = 0;

    this.laserSound = new Audio('./assets/sounds/laser.wav');
    this.explosionSound = new Audio('./assets/sounds/explosion.wav');
    this.maxDepth = Math.max(this.canvas.width, this.canvas.height) * 1.5;

    this.resizeCanvas();
    window.addEventListener("resize", this.resizeCanvas.bind(this));
    this.initStars();
  }

  resizeCanvas() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.maxDepth = Math.max(this.canvas.width, this.canvas.height) * 1.5;
    console.log(this.maxDepth)
  }

  get currentLevelConfig(): Level {
    return levels[this.currentLevel];
  }

  initStars() {
    this.stars = [];
    const levelConfig = this.currentLevelConfig;
    for (let i = 0; i < levelConfig.starNum; i++) {
      this.stars.push(new Star(this.canvas.width, this.canvas.height, this.maxDepth));
    }
  }

  spawnUFOs() {
    const levelConfig = this.currentLevelConfig;
    if (this.ufosSpawned < levelConfig.maxShips) {
      const ufoCount = Math.min(Math.floor(Math.random() * 3) + 1, levelConfig.maxShips - this.ufosSpawned);

      for (let i = 0; i < ufoCount; i++) {
        if (Math.random() < levelConfig.ufoChance) {
          this.stars.push(new UFO(this.canvas.width, this.canvas.height, this.maxDepth, levelConfig.ufoSize, levelConfig.ufoColor, levelConfig.ufoSpeed));
          this.ufosSpawned += 1;
          console.log(`UFO spawned! ${this.ufosSpawned}`);
        }
      }
    }
  }

  updateStars() {
    this.stars = this.stars.filter(star => {
      if (star instanceof TextObject && star.isExpired()) {
        return false;
      }
      if (star instanceof UFO) {
        const ufo = star as UFO;
        const lifeSpan = Date.now() - ufo.createdAt;
        if (ufo.z <= 0 || (lifeSpan > 5000 && (ufo.x < 0 || ufo.x > this.canvas.width || ufo.y < 0 || ufo.y > this.canvas.height))) {
          if (lifeSpan > 5000) {
            this.shipsMissed += 1;
            console.log(`UFO missed. Total missed: ${this.shipsMissed}`);
            return false;
          } else {
            ufo.resetPosition(this.canvas.width, this.canvas.height, this.maxDepth);
            return true;
          }
        }
        ufo.update(this.canvas.width, this.canvas.height, this.maxDepth);
      } else if (star instanceof Star) {
        star.update(this.canvas.width, this.canvas.height, this.maxDepth, this.currentLevelConfig.starSpeed);
      }
      return true;
    });
  }

  drawStars() {
    const levelConfig = this.currentLevelConfig;
    for (let star of this.stars) {
      if (star instanceof TextObject) {
        star.draw(this.ctx);
      } else {
        star.draw(this.ctx, this.canvas.width, this.canvas.height, levelConfig.starSize, levelConfig.starColor);
      }
    }
  }

  drawCrosshair() {
    this.ctx.strokeStyle = "pink";
    this.ctx.lineWidth = 2;
    this.ctx.beginPath();
    this.ctx.moveTo(this.crosshair.x - 10, this.crosshair.y);
    this.ctx.lineTo(this.crosshair.x + 10, this.crosshair.y);
    this.ctx.moveTo(this.crosshair.x, this.crosshair.y - 10);
    this.ctx.lineTo(this.crosshair.x, this.crosshair.y + 10);
    this.ctx.stroke();

    const radius = 6;
    this.ctx.strokeStyle = "pink";
    this.ctx.lineWidth = 1;
    this.ctx.beginPath();
    this.ctx.arc(this.crosshair.x, this.crosshair.y, radius, 0, 2 * Math.PI);
    this.ctx.stroke();
  }

  drawLevelMessage() {
    this.ctx.fillStyle = "white";
    this.ctx.font = "30px 'Press Start 2P'";
    this.ctx.textAlign = "center";
    this.ctx.fillText(this.levelMessage, this.canvas.width / 2, this.canvas.height / 2);
  }

  drawScore() {
    this.ctx.fillStyle = "white";
    this.ctx.font = "20px 'Press Start 2P'";
    this.ctx.textAlign = "left";
    this.ctx.fillText(`Total Points: ${this.totalPoints}`, 10, 30);
    this.ctx.fillText(`Level Points: ${this.levelPoints}`, 10, 60);
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
    this.laserSound.currentTime = 0;
    this.laserSound.play();
    for (let i = 0; i < this.stars.length; i++) {
      const star = this.stars[i];
      if (star instanceof UFO) {
        const ufo = star as UFO;
        const size = (ufo.sizeFactor * this.canvas.width) / ufo.z;
        const x = (ufo.x - this.canvas.width / 2) * (this.canvas.width / ufo.z) + this.canvas.width / 2;
        const y = (ufo.y - this.canvas.height / 2) * (this.canvas.width / ufo.z) + this.canvas.height / 2;
        if (Math.abs(x - this.crosshair.x) < size && Math.abs(y - this.crosshair.y) < size) {
          this.explosionSound.currentTime = 0;
          this.explosionSound.play();
          this.stars[i] = new TextObject(x, y, "😻 +100", "white", 20, 2000);
          this.totalPoints += 100;
          this.levelPoints += 100;
          this.shipsDestroyed += 1;
          console.log(`UFO destroyed. Total destroyed: ${this.shipsDestroyed}`);
        }
      }
    }
  }

  showNextSummaryMessage() {
    if (this.summaryMessageIndex < this.summaryMessages.length) {
      this.levelMessage = this.summaryMessages[this.summaryMessageIndex];
      this.levelMessageStartTime = Date.now();
      this.summaryMessageIndex += 1;

      setTimeout(() => this.showNextSummaryMessage(), 3000);
    } else {
      this.showingLevelSummary = false;
      if (this.currentLevel + 1 < levels.length) {
        this.currentLevel += 1;
        this.levelMessage = `Level ${this.currentLevel + 1} Start!`;
        this.levelMessageStartTime = Date.now();
        this.ufosSpawned = 0;
        this.shipsDestroyed = 0;
        this.shipsMissed = 0;
        this.levelPoints = 0;
        this.maxShips = levels[this.currentLevel].maxShips;
        this.initStars();
      } else {
        this.levelMessage = `Game Over! Total Points: ${this.totalPoints}`;
        this.levelMessageStartTime = Date.now();
        this.levelMessageDuration = Infinity;
      }
    }
  }

  checkLevelCompletion() {
    const levelConfig = this.currentLevelConfig;
    const totalShipsProcessed = this.shipsDestroyed + this.shipsMissed;

    if (this.ufosSpawned >= levelConfig.maxShips && totalShipsProcessed >= levelConfig.maxShips) {
      this.showingLevelSummary = true;
      this.summaryMessages = [
        `Level ${this.currentLevel + 1} Complete!`,
        `${this.shipsMissed} ships missed!`,
        `${this.shipsDestroyed} ships destroyed`,
        `${this.levelPoints} / ${levelConfig.maxShips * 100} points!`
      ];

      if (this.shipsMissed === 0) {
        this.summaryMessages.push("Perfect Score!");
        this.summaryMessages.push("Bonus 1000 Points!");
        this.totalPoints += 1000;
      }

      this.summaryMessageIndex = 0;
      this.showNextSummaryMessage();
    }
  }

  loop(timeNow: number) {
    const levelConfig = this.currentLevelConfig;
    this.ctx.fillStyle = levelConfig.spaceColor;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    this.updateStars();
    this.drawStars();
    this.drawCrosshair();
    this.drawScore();
    this.moveCrosshair();

    if (this.ufosSpawned < this.maxShips && Date.now() - this.levelMessageStartTime > this.levelMessageDuration) {
      this.spawnUFOs();
    }
    if (Date.now() - this.levelMessageStartTime < this.levelMessageDuration || this.showingLevelSummary) {
      this.drawLevelMessage();
    } else {
      this.checkLevelCompletion();
    }

    requestAnimationFrame(this.loop.bind(this));
  }

  start() {
    requestAnimationFrame(this.loop.bind(this));
  }
}