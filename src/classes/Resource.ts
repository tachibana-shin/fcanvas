import { dirname, extname, join } from "path-cross";
import { parse } from "plist/lib/parse.js";

import cutImage from "../functions/cutImage";
import loadImage from "../functions/loadImage";
import { throwError } from "../helpers/throw";
import type { ReadonlyOffset, ReadonlySize } from "../types";
import { trim } from "../utils/index";

type CanvasImageResource = HTMLCanvasElement & {
  readonly sourceSize: ReadonlySize;
  readonly sourceColorRect: ReadonlySize & ReadonlyOffset;
  readonly offset: ReadonlyOffset;
};
type Plist = {
  readonly frames: {
    readonly [filename: string]: {
      readonly frame: string;
      readonly offset: string;
      readonly rotated: boolean;
      readonly sourceColorRect: string;
      readonly sourceSize: string;
    };
  };
  readonly metadata: {
    readonly format: number;
    readonly realTextureFileName: string;
    readonly size: string;
    readonly smartupdate: string;
    readonly textureFileName: string;
  };
};

function passValueOfPlistToJSON<T = number>(value: string): readonly T[] {
  if (/^{[^]*}$/.test(trim(value))) {
    value = decodeURIComponent(
      encodeURIComponent(value).replace(/%7b/gi, "[").replace(/%7d/gi, "]")
    );

    return new Function(`return ${value}`)();
  }

  // eslint-disable-next-line functional/no-throw-statement
  throw throwError(`resource "${value}" a malformed field`);
}

export class Resource {
  private readonly plist: Plist;
  private readonly tile: HTMLImageElement;
  private readonly cache = new Map<string, CanvasImageResource>();

  constructor(plist: Plist, tile: HTMLImageElement) {
    this.plist = plist;
    this.tile = tile;
  }

  get(name: string): CanvasImageResource {
    if (this.has(name)) {
      const { frame, rotated, sourceSize, sourceColorRect, offset } =
        this.plist.frames[name];

      if (this.cache.has(name) === false) {
        const [[xCutStart, yCutStart], [xCutStop, yCutStop]] =
          passValueOfPlistToJSON<readonly [number, number]>(frame);

        const imageNotResource = cutImage(
          this.tile,
          xCutStart,
          yCutStart,
          xCutStop,
          yCutStop,
          rotated ? -90 : 0
        );

        const [width, height] = passValueOfPlistToJSON(sourceSize);
        const [[xColorRect, yColorRect], [widthColorRect, heightColorRect]] =
          passValueOfPlistToJSON<readonly [number, number]>(sourceColorRect);
        const [x, y] = passValueOfPlistToJSON(offset);
        this.cache.set(
          name,
          // eslint-disable-next-line functional/immutable-data
          Object.assign(imageNotResource, {
            sourceSize: {
              width,
              height,
            },
            sourceColorRect: {
              x: xColorRect,
              y: yColorRect,
              width: widthColorRect,
              height: heightColorRect,
            },
            offset: {
              x,
              y,
            },
          })
        );
      }

      return this.cache.get(name) as CanvasImageResource;
    } else {
      // eslint-disable-next-line functional/no-throw-statement
      throw throwError(
        `does not exist this file "${name}" in declaration plist`
      );
    }
  }
  has(name: string): boolean {
    return name in this.plist.frames;
  }
}

export async function createResource(url: string): Promise<Resource> {
  if (extname(url) !== ".plist") {
    url += ".plist";
  }

  const plist = parse(
    await fetch(url).then((response) => response.text())
  ) as Plist;
  const tile = await loadImage(
    join(
      dirname(url),
      plist.metadata.realTextureFileName || plist.metadata.textureFileName
    )
  );

  return new Resource(plist, tile);
}
