import DOMMatrix from "../classes/DOMMatrix.js";
import Vector from "../classes/vector.js";


export function CircleImpact(e, f) {
  return (f.x - e.x) ** 2 + (f.y - e.y) ** 2 < (e.radius + f.radius) ** 2;
}

export function CircleImpactPoint(e, x, y) {
  return (x - e.x) ** 2 + (y - e.y) ** 2 < e.radius ** 2;
}

export function CircleImpactRect(box, sphere) {
  const x = Math.max(box.x, Math.min(sphere.x, box.x + box.width));
  const y = Math.max(box.y, Math.min(sphere.y, box.y + box.height));

  const distance =
    (x - sphere.x) * (x - sphere.x) + (y - sphere.y) * (y - sphere.y);

  return distance < sphere.radius ** 2;
}

export function constrain(value, min, max) {
  return Math.min(Math.max(min, value), max);
}


export function createMatrix(css) {
  const { a, b, c, d, e, f } = new DOMMatrix(css);

  return [a, b, c, d, e, f];
}

export function createVector(...argv) {
  return new Vector(...argv);
}

export function loadImage(src) {
  const img = new Image();
  img.src = src;
  return new Promise((resolve, reject) => {
    function loaded() {
      resolve(img);
      img.removeEventListener("load", loaded);
    }

    function error() {
      reject(err);
      img.removeEventListener("error", error);
    }
    img.addEventListener("load", loaded);
    img.addEventListener("error", error);
  });
}

export function map(a, b, c, d, e) {
  return ((a - b) * (e - d)) / (c - b) + d;
}

export function random(...args) {
  if (args.length === 1) {
    return args[0] != null && "length" in args[0] ?
      args[0][Math.floor(Math.random() * args[0].length)] :
      Math.random() * args[0];
  }
  if (args.length === 2) {
    return args[0] + Math.random() * (args[1] - args[0]);
  }
}

export function range($start, $end, $step) {
  $step = $step || 1;
  const arr = [];
  let isChar = false;

  if ($end === undefined)($end = $start), ($start = 1);

  if (typeof $start == "string") {
    $start = $start.charCodeAt(0);
    $end = $end.charCodeAt(0);
    isChar = true;
  }

  if ($start !== $end && Math.abs($end - $start) < Math.abs($step))
    throw new Error("range(): step exceeds the specified range.");

  if ($end > $start) {
    $step < 0 && ($step *= -1);
    while ($start <= $end) {
      arr.push(isChar ? String.fromCharCode($start) : $start);
      $start += $step;
    }
  } else {
    $step > 0 && ($step *= -1);
    while ($start >= $end) {
      arr.push(isChar ? String.fromCharCode($start) : $start);
      $start += $step;
    }
  }

  return arr;
}

export function RectImpact(a, b) {
  return (
    a.x <= b.x + b.width &&
    a.x + a.width >= b.x &&
    a.y <= b.y + b.height &&
    a.y + a.height >= b.y
  );
}

export function RectImpactPoint(e, x, y) {
  return e.x < x && e.x + e.width > x && e.y < y && e.y + e.height > y;
}