import { Starfield } from "./starfield.js";

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.createElement("canvas");
  document.body.appendChild(canvas);

  const starfield = new Starfield(
    canvas,
    2000, // starNum
    10.0, // starSpeed
    0.5, // starSize
    "white", // starColor
    "black", // spaceColor
    50, // ufoSize
    "silver", // ufoColor
    1.5, // ufoSpeed
    0.005, // ufoChance
    1000 // maxDepth
  );

  document.addEventListener('keydown', (event) => {
    starfield.keysPressed[event.key] = true;
    if (event.key === ' ') {
      starfield.shoot();
    }
  });

  document.addEventListener('keyup', (event) => {
    starfield.keysPressed[event.key] = false;
  });

  starfield.start();
});

