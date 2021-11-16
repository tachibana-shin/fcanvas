/* eslint-disable functional/prefer-readonly-type */
import { throwError } from "../helpers/throw";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function assert(obj: any, type: "CIRCLE" | "RECT" | "POINT"): void {
  switch (type) {
    case "CIRCLE":
      assert(obj, "POINT");
      if (!("radius" in obj)) {
        // eslint-disable-next-line functional/no-throw-statement
        throw throwError(`this element is not ${type}`);
      }
      break;
    case "RECT":
      assert(obj, "POINT");
      if (!("width" in obj && "height" in obj)) {
        // eslint-disable-next-line functional/no-throw-statement
        throw throwError(`this element is not ${type}`);
      }
      break;
    case "POINT":
      if (!("x" in obj && "y" in obj)) {
        // eslint-disable-next-line functional/no-throw-statement
        throw throwError(`this element is not ${type}`);
      }
  }
}

type CanvasElementSize = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;
} & {
  x: number;
  y: number;
};

export function getPowerDirection(
  el1: CanvasElementSize,
  el2: CanvasElementSize
): number {
  // el.fcanvas._argsRect(el.x, el.y, el.width, el.height);

  return (Math.atan2(el1.x - el2.x, el1.y - el2.y) * 180) / Math.PI;
}

export function intersectTwoCircles(
  circle1: CanvasElementSize & {
    radius: number;
  },
  circle2: CanvasElementSize & {
    radius: number;
  }
): boolean {
  assert(circle1, "CIRCLE");
  assert(circle2, "CIRCLE");

  return (
    (circle1.x - circle2.x) ** 2 + (circle1.y - circle2.y) ** 2 <
    (circle1.radius + circle2.radius) ** 2
  );
}
export function intersectTwoRects(
  rect1: CanvasElementSize & {
    width: number;
    height: number;
  },
  rect2: CanvasElementSize & {
    width: number;
    height: number;
  }
): boolean {
  assert(rect1, "RECT");
  assert(rect2, "RECT");

  return (
    rect1.x < rect2.x + rect2.width &&
    rect1.x + rect1.width > rect2.x &&
    rect1.y < rect2.y + rect2.height &&
    rect1.y + rect1.height > rect2.y
  );
}
export function intersectCirclePoint(
  circle: CanvasElementSize & {
    radius: number;
  },
  x: number,
  y: number
): boolean {
  assert(circle, "CIRCLE");

  return (x - circle.x) ** 2 + (y - circle.y) ** 2 < circle.radius ** 2;
}
export function intersectRectPoint(
  rect: CanvasElementSize & {
    width: number;
    height: number;
  },
  x: number,
  y: number
): boolean {
  assert(rect, "RECT");

  return (
    rect.x < x &&
    rect.x + rect.width > x &&
    rect.y < y &&
    rect.y + rect.height > y
  );
}
export function intersectCircleRect(
  circle: CanvasElementSize & {
    radius: number;
  },
  rect: CanvasElementSize & {
    width: number;
    height: number;
  }
): boolean {
  assert(circle, "CIRCLE");
  assert(rect, "RECT");

  const x = Math.max(rect.x, Math.min(circle.x, rect.x + rect.width));
  const y = Math.max(rect.y, Math.min(circle.y, rect.y + rect.height));

  const distance =
    (x - circle.x) * (x - circle.x) + (y - circle.y) * (y - circle.y);

  return distance < circle.radius ** 2;
}
export function intersectRectCircle(
  rect: CanvasElementSize & {
    width: number;
    height: number;
  },
  circle: CanvasElementSize & {
    radius: number;
  }
): boolean {
  return intersectCircleRect(circle, rect);
}
