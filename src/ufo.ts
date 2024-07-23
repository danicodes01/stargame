
import { Star } from "./star.js";
import { Drawable } from "./drawable.js";

export class UFO extends Star {
  sizeFactor: number;
  color: string;
  speed: number;
  direction: {x: number, y: number}; // This property holds the direction in 
                                    //   which the UFO is moving in the 2D plane.

  constructor(
    canvasWidth: number,
    canvasHeight: number,
    canvasDepth: number,
    sizeFactor: number,
    color: string,
    speed: number,
  ) {
    super(canvasWidth, canvasHeight, canvasDepth);
    this.sizeFactor = sizeFactor;
    this.color = color;
    this.speed = speed;
    this.direction = this.getRandomDirection(); //The constructor initializes 
                                                 //the direction of the UFO by calling
  }

  /**
   * This method randomly selects a direction for the UFO 
   *    to move in the 2D plane.
   * @returns -> A random direction object with x and y properties.
   */
  getRandomDirection(): { x: number, y: number } {
    const directions = [
      { x: 1, y: 0 },   // right
      { x: -1, y: 0 },  // left
      { x: 0, y: 1 },   // down
      { x: 0, y: -1 }   // up
    ];
    return directions[Math.floor(Math.random() * directions.length)];
  }

  update(canvasWidth: number, canvasHeight: number, maxDepth: number) {
    this.z -= this.speed;
    // adjusts the x and y coordinates based on the current direction and speed.
    this.x += this.direction.x * this.speed;
    this.y += this.direction.y * this.speed;
    if (this.z <= 0) {
        this.z = maxDepth;
        this.x = Math.random() * canvasWidth;
        this.y = Math.random() * canvasHeight;
        // When the UFO's z coordinate resets, it gets a new random direction.
        this.direction = this.getRandomDirection();
        
        
        // If the UFO hits the boundary of the canvas, it changes its direction 
        //to the opposite.
    if (this.x < 0 || this.x > canvasWidth) {
        this.direction.x *= -1;
      }
  
      if (this.y < 0 || this.y > canvasHeight) {
        this.direction.y *= -1;
      }
    }
  }

  draw(
    ctx: CanvasRenderingContext2D,
    canvasWidth: number,
    canvasHeight: number
  ) {
    let x =
      (this.x - canvasWidth / 2) * (canvasWidth / this.z) + canvasWidth / 2;
    let y =
      (this.y - canvasHeight / 2) * (canvasWidth / this.z) + canvasHeight / 2;
    let size = (this.sizeFactor * canvasWidth) / this.z;

    // Draw the UFO emoji
    ctx.font = `${size}px Arial`; 
    ctx.fillText("🛸", x - size / 2, y + size / 2); 
  }
}
