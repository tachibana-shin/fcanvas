type InfoFont = {
  readonly size: number;
  readonly family: string;
  readonly weight: string;
};

export type noop = {
  (): void;
};

export type Offset = {
  readonly x: number;
  readonly y: number;
};

export type InfoTouch = Offset & {
  readonly winX: number;
  readonly winY: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  readonly id: any;
};

export const requestAnimationFrame:
  | typeof globalThis.requestAnimationFrame
  | typeof globalThis.setTimeout =
  window.requestAnimationFrame ||
  // eslint-disable-next-line @typescript-eslint/ban-types
  function (callback: Function): number {
    return setTimeout(callback, 100 / 6);
  };
export const cancelAnimationFrame:
  | typeof globalThis.cancelAnimationFrame
  | typeof globalThis.clearTimeout =
  window.cancelAnimationFrame ||
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function (timeoutId: any): void {
    clearTimeout(timeoutId);
  };

export const isTouch: boolean =
  "ontouchstart" in window || "onmsgesturechange" in window;

// eslint-disable-next-line functional/no-let
let supportPassive = false;

// eslint-disable-next-line @typescript-eslint/no-empty-function
function noop() {}
try {
  const opts = Object.defineProperty({}, "passive", {
    get(): boolean {
      supportPassive = true;
      return false;
    },
  });
  window.addEventListener("testPassive", noop, opts);
  window.removeEventListener("testPassive", noop, opts);
} catch {
  supportPassive = false;
}

export const passive: boolean = supportPassive;

export const windowSize: {
  readonly windowWidth: {
    // eslint-disable-next-line functional/no-method-signature
    get(): number;
  };
  readonly windowHeight: {
    // eslint-disable-next-line functional/no-method-signature
    get(): number;
  };
} = {
  windowWidth: {
    get: (): number =>
      window.innerWidth ||
      document.documentElement.clientWidth ||
      document.body.clientWidth,
  },
  windowHeight: {
    get: (): number =>
      window.innerHeight ||
      document.documentElement.clientHeight ||
      document.body.clientHeight,
  },
};

export function trim(string: string | null): string {
  if (string == null) {
    return "null";
  } else {
    return string.replace(/^\s+|\s+$/g, "");
  }
}

export function fontToArray(font: string): InfoFont {
  const _font = font.split(" ");
  if (_font.length === 2) {
    return {
      size: parseFloat(_font[0]),
      family: trim(_font[1]),
      weight: "normal",
    };
  }

  return {
    size: parseFloat(_font[1]),
    family: trim(_font[2]),
    weight: trim(_font[0]),
  };
}

export function AutoToPx(
  string: string | number,
  fi: number,
  fontSize?: number
): number {
  if (typeof string === "string") {
    string = trim(string);
    const number = parseFloat(string);
    const dp = string.match(/[a-z%]+$/i)?.[1] || "px";

    switch (dp) {
      case "px":
        return number;
      case "em":
        return (fontSize || 0) * number;
      case "rem":
        return (fontSize || 0) * 16;
      case "vw":
        return (windowSize.windowWidth.get() * number) / 100;
      case "vh":
        return (windowSize.windowHeight.get() * number) / 100;
      case "vmin":
        return (
          (Math.min(
            windowSize.windowWidth.get(),
            windowSize.windowHeight.get()
          ) *
            number) /
          100
        );
      case "vmax":
        return (
          (Math.max(
            windowSize.windowWidth.get(),
            windowSize.windowHeight.get()
          ) *
            number) /
          100
        );
      case "%":
        return (fi / 100) * number;
      default:
        return number;
    }
  } else {
    return string;
  }
}

export function getTouchInfo(
  element: HTMLCanvasElement,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  touches: readonly any[]
): readonly InfoTouch[] {
  const rect = element.getBoundingClientRect();
  const sx = element.scrollWidth / element.width || 1;
  const sy = element.scrollHeight / element.height || 1;
  const _touches = [],
    length = touches.length;
  // eslint-disable-next-line functional/no-let
  let i = 0,
    touch;
  // eslint-disable-next-line functional/no-loop-statement
  while (i < length) {
    touch = touches[i++];
    // eslint-disable-next-line functional/immutable-data
    _touches.push({
      x: (touch.clientX - rect.left) / sx,
      y: (touch.clientY - rect.top) / sy,
      winX: touch.clientX,
      winY: touch.clientY,
      id: touch.identifier,
    });
  }
  return _touches;
}

export function isMobile(): boolean {
  const agent =
    typeof navigator === "undefined"
      ? ""
      : navigator.userAgent || navigator.vendor;
  /// code from https://stackoverflow.com/questions/11381673/detecting-a-mobile-browser
  return (
    /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(
      agent
    ) ||
    /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw-(n|u)|c55\/|capi|ccwa|cdm-|cell|chtm|cldc|cmd-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc-s|devi|dica|dmob|do(c|p)o|ds(12|-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(-|_)|g1 u|g560|gene|gf-5|g-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd-(m|p|t)|hei-|hi(pt|ta)|hp( i|ip)|hs-c|ht(c(-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i-(20|go|ma)|i230|iac( |-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|-[a-w])|libw|lynx|m1-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|-([1-8]|c))|phil|pire|pl(ay|uc)|pn-2|po(ck|rt|se)|prox|psio|pt-g|qa-a|qc(07|12|21|32|60|-[2-7]|i-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h-|oo|p-)|sdk\/|se(c(-|0|1)|47|mc|nd|ri)|sgh-|shar|sie(-|m)|sk-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h-|v-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl-|tdg-|tel(i|m)|tim-|t-mo|to(pl|sh)|ts(70|m-|m3|m5)|tx-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas-|your|zeto|zte-/i.test(
      agent.substr(0, 4)
    )
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function extractNumber(value: any): number {
  if (typeof value === "number") {
    return value;
  }

  return parseFloat(`${value}`);
}

export type ListEvents = {
  readonly [name: string]: Event;
} & {
  readonly keydown: KeyboardEvent;
  readonly resize: Event;
  readonly wheel: WheelEvent;
  readonly mousedown: MouseEvent;
  readonly click: MouseEvent;
  readonly mousemove: MouseEvent;
  readonly mouseout: MouseEvent;
  readonly mouseover: MouseEvent;
  readonly touchstart: TouchEvent;
  readonly touchmove: TouchEvent;
  readonly touchend: TouchEvent;
};
export function bindEvent<Name extends keyof ListEvents>(
  name: Name,
  callback: (ev: ListEvents[Name]) => void,
  element: Element | Window | typeof globalThis
): noop {
  element.addEventListener(
    name as string,
    callback as EventListenerOrEventListenerObject
  );
  return () => {
    element.removeEventListener(
      name as string,
      callback as EventListenerOrEventListenerObject
    );
  };
}
