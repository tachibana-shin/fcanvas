import type { CanvasElement } from "../core/CanvasElement";
import type { ReadonlyOffset, ReadonlySize } from "../types/index";

type ReturnInterfering = {
  readonly direction: number;
  readonly element: CanvasElement;
};

function CircleImpact(
  circle1: CanvasElement &
    ReadonlyOffset & {
      readonly radius: number;
    },
  circle2: CanvasElement &
    ReadonlyOffset & {
      readonly radius: number;
    }
): boolean {
  return (
    (circle1.x - circle2.x) ** 2 + (circle1.y - circle2.y) ** 2 <
    (circle1.radius + circle2.radius) ** 2
  );
}
function CircleImpactPoint(
  circle: CanvasElement &
    ReadonlyOffset & {
      readonly radius: number;
    },
  x: number | null,
  y: number | null
): boolean {
  if (x == null || y == null) {
    return false;
  }
  return (x - circle.x) ** 2 + (y - circle.y) ** 2 < circle.radius ** 2;
}
function CircleImpactRect(
  circle: CanvasElement &
    ReadonlyOffset & {
      readonly radius: number;
    },
  rect: CanvasElement & ReadonlyOffset & ReadonlySize
): boolean {
  const x = Math.max(rect.x, Math.min(circle.x, rect.x + rect.width));
  const y = Math.max(rect.y, Math.min(circle.y, rect.y + rect.height));

  const distance =
    (x - circle.x) * (x - circle.x) + (y - circle.y) * (y - circle.y);

  return distance < circle.radius ** 2;
}
function RectImpact(
  rect1: CanvasElement & ReadonlyOffset & ReadonlySize,
  rect2: CanvasElement & ReadonlyOffset & ReadonlySize
): boolean {
  return (
    rect1.x < rect2.x + rect2.width &&
    rect1.x + rect1.width > rect2.x &&
    rect1.y < rect2.y + rect2.height &&
    rect1.y + rect1.height > rect2.y
  );
}

function RectImpactPoint(
  rect: CanvasElement & ReadonlyOffset & ReadonlySize,
  x: number,
  y: number
): boolean {
  return (
    rect.x < x &&
    rect.x + rect.width > x &&
    rect.y < y &&
    rect.y + rect.height > y
  );
}

function isRect(el: CanvasElement): el is CanvasElement & {
  readonly width: number;
  readonly height: number;
} {
  return el.type === "rect";
}
function isCircle(el: CanvasElement): el is CanvasElement & {
  readonly radius: number;
} {
  return el.type === "circle";
}
function isPoint(el: CanvasElement): el is CanvasElement & ReadonlyOffset {
  return el.type === "point";
}
function getOffset(el: CanvasElement & ReadonlyOffset): ReadonlyOffset {
  // eslint-disable-next-line functional/no-let
  let { x, y } = el;
  if (isRect(el)) {
    [x, y] = el.fcanvas._argsRect(el.x, el.y, el.width, el.height);
  }
  return {
    x,
    y,
  };
}

export function getDirectionElement(
  el1: CanvasElement & ReadonlyOffset,
  el2: CanvasElement & ReadonlyOffset
): number {
  const { x: x1, y: y1 } = getOffset(el1);
  const { x: x2, y: y2 } = getOffset(el2);

  return (Math.atan2(x2 - x1, y2 - y1) * 180) / Math.PI;
}

function interfering(
  element1: CanvasElement & ReadonlyOffset,
  element2: CanvasElement & ReadonlyOffset,
  company = true
): ReturnInterfering | boolean | null {
  if (isRect(element1)) {
    if (isRect(element2)) {
      if (RectImpact(element1, element2)) {
        return company
          ? {
              direction: getDirectionElement(element1, element2),
              element: element2,
            }
          : true;
      }
    }
    if (isCircle(element2)) {
      if (CircleImpactRect(element2, element1)) {
        return company
          ? {
              direction: getDirectionElement(element1, element2),
              element: element2,
            }
          : true;
      }
    }
    if (isPoint(element2)) {
      if (RectImpactPoint(element1, element2.x, element2.y)) {
        return company
          ? {
              direction: getDirectionElement(element1, element2),
              element: element2,
            }
          : true;
      }
    }
  }
  if (isCircle(element1)) {
    if (isRect(element2)) {
      return interfering(element2, element1, company);
    }
    if (isCircle(element2)) {
      if (CircleImpact(element1, element2)) {
        return company
          ? {
              direction: getDirectionElement(element1, element2),
              element: element2,
            }
          : true;
      }
    }
    if (isPoint(element2)) {
      if (CircleImpactPoint(element1, element2.x, element2.y)) {
        return company
          ? {
              direction: getDirectionElement(element1, element2),
              element: element2,
            }
          : true;
      }
    }
  }
  if (isPoint(element1)) {
    if (isRect(element2) || isCircle(element2)) {
      return interfering(element2, element1, company);
    }
    if (isPoint(element2)) {
      if (element1.x === element2.x && element1.y === element2.y) {
        return company
          ? {
              direction: getDirectionElement(element1, element2),
              element: element2,
            }
          : true;
      }
    }
  }

  return company ? false : null;
}

export function intersects(
  el: CanvasElement & ReadonlyOffset,
  // eslint-disable-next-line functional/functional-parameters
  ...otherEl: readonly (CanvasElement & ReadonlyOffset)[]
): ReturnInterfering | null {
  // eslint-disable-next-line functional/no-let
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

export function intersected(
  el: CanvasElement & ReadonlyOffset,
  // eslint-disable-next-line functional/functional-parameters
  ...otherEl: readonly (CanvasElement & ReadonlyOffset)[]
): boolean {
  return otherEl.some((el2) => interfering(el, el2, false));
}
