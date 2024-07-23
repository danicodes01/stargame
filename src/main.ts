import { Starfield } from "./starfield.js";

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.createElement("canvas");
  document.body.appendChild(canvas);
  console.log("Canvas appended to body.");

  const starfield = new Starfield(canvas);

  document.addEventListener("keydown", (event) => {
    starfield.keysPressed[event.key] = true;
    if (event.key === " ") {
      starfield.shoot();
    }
  });

  document.addEventListener("keyup", (event) => {
    starfield.keysPressed[event.key] = false;
  });

  starfield.start();
});
