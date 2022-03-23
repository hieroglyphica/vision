import { useEffect } from "react";
import "./xorbitwise.css";

//this implementation is based off of Code Workshop YouTube channel video on XOR BitWise

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
};

const squares = (x, y, m) => (x ^ y) % m;
const triangles = (x, y, m) => (x | y) % m;

const draw = (modulus) => {
  const c = document.getElementById("c");

  const width = window.innerWidth;
  const height = window.innerHeight - 3.14;

  const ctx = c.getContext("2d");
  ctx.canvas.width = width;
  ctx.canvas.height = height;

  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, width, height);

  ctx.fillStyle = "forestgreen";

  for (let x = 0; x < width; x += 4) {
    for (let y = 0; y < height; y += 4) {
      if (squares(x, y, modulus)) ctx.fillRect(x, y, 4, 4);
    }
  }
};

const XorBitwise = () => {
  useEffect(() => {
    draw(12);
    window.addEventListener("resize", draw);

    const interval = setInterval(() => {
      let modulus = getRandomInt(3, 17);
      //filter out any blank screens or other patterns
      let filteredModulus = [4, 8, 16];

      if (filteredModulus.includes(modulus)) {
        modulus = getRandomInt(3, 17);
        draw(5);
      } else {
        draw(modulus);
      }
    }, 3000);
    return () => clearInterval(interval);
  });

  return <canvas id="c" />;
};

export default XorBitwise;
