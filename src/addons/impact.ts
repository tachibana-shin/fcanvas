import MyElement from "../core/MyElement";
import { Offset } from "../utils/index";

interface ReturnInterfering {
  direction: number;
  element: MyElement;
}

function CircleImpact(circle1: any, circle2: any): boolean {
  return (
    (circle1.x - circle2.x) ** 2 + (circle1.y - circle2.y) ** 2 <
    (circle1.radius + circle2.radius) ** 2
  );
}
function CircleImpactPoint(
  circle: any,
  x: number | null,
  y: number | null
): boolean {
  if (x == null || y == null) {
    return false;
  }
  return (x - circle.x) ** 2 + (y - circle.y) ** 2 < circle.radius ** 2;
}
function CircleImpactRect(circle: any, rect: any): boolean {
  const x = Math.max(rect.x, Math.min(circle.x, rect.x + rect.width));
  const y = Math.max(rect.y, Math.min(circle.y, rect.y + rect.height));

  const distance =
    (x - circle.x) * (x - circle.x) + (y - circle.y) * (y - circle.y);

  return distance < circle.radius ** 2;
}
function RectImpact(rect1: any, rect2: any): boolean {
  return (
    rect1.x < rect2.x + rect2.width &&
    rect1.x + rect1.width > rect2.x &&
    rect1.y < rect2.y + rect2.height &&
    rect1.y + rect1.height > rect2.y
  );
}

function RectImpactPoint(
  rect: any,
  x: number | null,
  y: number | null
): boolean {
  if (x == null || y == null) {
    return false;
  }
  return (
    rect.x < x &&
    rect.x + rect.width > x &&
    rect.y < y &&
    rect.y + rect.height > y
  );
}

function getOffset(el: any): Offset {
  let { x, y } = el;
  if (el.type === "rect") {
    [x, y] = el.$parent._argsRect(el.x, el.y, el.width, el.height);
  }
  return {
    x,
    y,
  };
}

export function getDirectionElement(el1: any, el2: any): any {
  let { x: x1, y: y1 } = getOffset(el1);
  let { x: x2, y: y2 } = getOffset(el2);

  return (Math.atan2(x2 - x1, y2 - y1) * 180) / Math.PI;
}

function interfering(element1: any, element2: any): ReturnInterfering | null {
  switch (element1.type) {
    case "rect":
      switch (element2.type) {
        case "rect":
          if (RectImpact(element1, element2)) {
            return {
              direction: getDirectionElement(element1, element2),
              element: element2,
            };
          }
          break;
        case "circle":
          if (CircleImpactRect(element2, element1)) {
            return {
              direction: getDirectionElement(element1, element2),
              element: element2,
            };
          }
          break;
        case "point":
          if (RectImpactPoint(element1, element2.x, element2.y)) {
            return {
              direction: getDirectionElement(element1, element2),
              element: element2,
            };
          }
          break;
      }
      break;
    case "circle":
      switch (element2.type) {
        case "rect":
          return interfering(element2, element1);
        case "circle":
          if (CircleImpact(element1, element2)) {
            return {
              direction: getDirectionElement(element1, element2),
              element: element2,
            };
          }
          break;
        case "point":
          if (CircleImpactPoint(element1, element2.x, element2.y)) {
            return {
              direction: getDirectionElement(element1, element2),
              element: element2,
            };
          }
          break;
      }
      break;
    case "point": {
      switch (element2.type) {
        case "rect":
        case "circle":
          return interfering(element2, element1);
        case "point":
          if (element1.x === element2.x && element1.y === element2.y) {
            return {
              direction: getDirectionElement(element1, element2),
              element: element2,
            };
          }
      }
    }
  }

  return null;
}

export function interferings(
  el: MyElement,
  ...otherEl: MyElement[]
): ReturnInterfering | null {
  let result;

  otherEl.some((el2) => {
    const r = interfering(el, el2);

    if (r) {
      result = r;
      return true;
    }
  });

  return result ?? null;
}
