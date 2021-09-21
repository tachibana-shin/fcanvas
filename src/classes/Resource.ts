/* eslint-disable @typescript-eslint/no-explicit-any */
import { cutImage, loadAudio, loadImage } from "../functions/index";
import { trim } from "../utils/index";

type ImageResource = HTMLImageElement & {
  readonly image: HTMLImageElement;
  readonly size: {
    readonly width: number;
    readonly height: number;
  };
};

function convertValueXMLToArray(str: string): readonly any[] {
  if (/^{[^]*}$/.test(trim(str))) {
    str = decodeURIComponent(
      encodeURIComponent(str).replace(/%7b/gi, "[").replace(/%7d/gi, "]")
    );

    return new Function(`return ${str}`)();
  }

  // eslint-disable-next-line functional/no-throw-statement
  throw new Error(`fCanvas<Resource>: "${str}" a malformed field`);
}

// eslint-disable-next-line @typescript-eslint/ban-types
function convertFieldToJson(keyItem: any): object {
  const key = keyItem.textContent;
  const value = keyItem.nextElementSibling;

  if (value == null) {
    // eslint-disable-next-line functional/no-throw-statement
    throw new Error(
      "fCanvas<loadResourceImage>: Error because syntax error in file plist."
    );
  }

  if (value.tagName === "dict") {
    // eslint-disable-next-line functional/no-let
    let result = {};
    Array.from(value.childNodes)
      .filter((item: any) => item.tagName === "key")
      .forEach((keyItem: any) => {
        result = {
          ...result,
          ...convertFieldToJson(keyItem),
        };
      });

    return {
      [key]: result,
    };
  }
  if (value.tagName === "array") {
    // eslint-disable-next-line @typescript-eslint/ban-types, functional/prefer-readonly-type
    const result: object[] = [];
    Array.from(value.childNodes)
      .filter((item: any) => item.tagName === "key")
      .forEach((keyItem) => {
        // eslint-disable-next-line functional/immutable-data
        result.push(convertFieldToJson(keyItem));
      });

    return {
      [key]: result,
    };
  }
  if (value.tagName === "string") {
    return {
      [key]: convertValueXMLToArray(value.textContent),
    };
  }
  if (value.tagName === "integer") {
    return {
      [key]: parseInt(value.textContent),
    };
  }
  if (value.tagName === "float") {
    return {
      [key]: parseFloat(value.textContent),
    };
  }
  if (value.tagName === "true") {
    return {
      [key]: true,
    };
  }
  if (value.tagName === "false") {
    return {
      [key]: false,
    };
  }

  return {};
}
// eslint-disable-next-line functional/functional-parameters, functional/prefer-readonly-type
function resolvePath(...params: string[]): string {
  if (params[1].match(/^[a-z]+:\/\//i)) {
    return params[1];
  }

  const root = ("" || params[0]).replace(/\/$/, "").split("/");
  // eslint-disable-next-line functional/immutable-data
  params[0] = root.slice(0, root.length - 1).join("/");

  return params.join("/");
}

class TilesResource {
  private readonly tileRoot: HTMLImageElement;
  private readonly plist: {
    readonly [propName: string]: any;
  };
  // eslint-disable-next-line functional/prefer-readonly-type
  private readonly __caching: Map<string, ImageResource> = new Map();

  // eslint-disable-next-line @typescript-eslint/ban-types
  constructor(image: HTMLImageElement, plist: object) {
    this.tileRoot = image;
    this.plist = plist;
  }
  get(name: string): ImageResource {
    if (this.has(name)) {
      const { frame, rotated, sourceSize } = this.plist.frames[name];

      if (this.__caching.has(name) === false) {
        const image = cutImage(
          this.tileRoot,
          +frame[0][0],
          +frame[0][1],
          +frame[1][0],
          +frame[1][1],
          rotated ? -90 : 0
        );

        this.__caching.set(
          name,
          // eslint-disable-next-line functional/immutable-data
          Object.assign(image, {
            image,
            size: {
              width: +sourceSize[0] || +frame[1][0],
              height: +sourceSize[1] || +frame[1][1],
            },
          })
        );
      }

      return this.__caching.get(name) as ImageResource;
    } else {
      // eslint-disable-next-line functional/no-throw-statement
      throw new Error(
        `fCanvas<addons/loadResourceImage>: Error does not exist this file "${name}" in declaration .plist`
      );
    }
  }
  has(name: string): boolean {
    return name in this.plist.frames;
  }
}

export async function loadResourceImage(path: string): Promise<TilesResource> {
  if (path.match(/\.plist$/) == null) {
    path += ".plist";
  }

  const plist = await fetch(`${path}`)
    .then((response) => response.text())
    .then((str: string) => new DOMParser().parseFromString(str, "text/xml"));
  // eslint-disable-next-line functional/no-let
  let plistJson = {};

  plist
    .querySelectorAll("plist > dict:first-child > key")
    .forEach((itemKey) => {
      plistJson = {
        ...plistJson,
        ...convertFieldToJson(itemKey),
      };
    });

  const image = await loadImage(
    resolvePath(
      path,
      (plistJson as any)?.metadata.realTextureFileName ||
        (plistJson as any)?.metadata.textureFileName
    )
  );

  return new TilesResource(image, plistJson);

  //// ----------------- convert to json ------------------
}

export default class Resource {
  // eslint-disable-next-line functional/prefer-readonly-type
  private readonly resourceLoaded: Map<
    string,
    TilesResource | HTMLImageElement | HTMLAudioElement
  > = new Map();
  private readonly resourceDescription: {
    readonly [propName: string]: {
      readonly src: string;
      readonly lazy: boolean;
      readonly type: "image" | "audio" | "plist";
    };
  } = Object.create(null);

  constructor(
    description: {
      readonly [propName: string]:
        | {
            readonly src: string;
            readonly lazy?: boolean;
          }
        | string;
    },
    autoLoad = true
  ) {
    const resourceDescription = Object.create(null);

    // eslint-disable-next-line functional/no-loop-statement
    for (const prop in description) {
      if (typeof description[prop] === "string") {
        resourceDescription[prop] = {
          src: description[prop],
          lazy: true,
        };
      } else {
        resourceDescription[prop] = description[prop];
      }
    }

    this.resourceDescription = resourceDescription;

    /// observe
    const { set, delete: _delete } = this.resourceLoaded;
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const $this = this;

    // eslint-disable-next-line functional/functional-parameters
    this.resourceLoaded.set = function (...params: any): any {
      /// call this._set
      ($this as any)[params[0]] = params[1];
      return set.apply(this, params);
    };
    // eslint-disable-next-line functional/functional-parameters
    this.resourceLoaded.delete = function (...params: any): any {
      /// call this._set
      // eslint-disable-next-line functional/immutable-data
      delete ($this as any)[params[0]];
      return _delete.apply(this, params);
    };

    if (autoLoad) {
      // eslint-disable-next-line functional/prefer-readonly-type
      const resourceAutoLoad: Promise<void>[] = [];

      // eslint-disable-next-line functional/no-loop-statement
      for (const prop in this.resourceDescription) {
        if ((this.resourceDescription[prop] as any).lazy === false) {
          // eslint-disable-next-line functional/immutable-data
          resourceAutoLoad.push(this.load(prop));
        }
      }
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error

      // eslint-disable-next-line no-async-promise-executor
      return new Promise<this>(async (resolve, reject) => {
        try {
          await Promise.all(resourceAutoLoad);
          resolve(this);
        } catch (err) {
          reject(err);
        }
      });
    }
  }

  async load(name?: string): Promise<void> {
    if (name) {
      if (name in this.resourceDescription) {
        if (this.isLoaded(name) === false) {
          const { src, type } = this.resourceDescription[name] as any;
          switch (type) {
            case "image":
              this.resourceLoaded.set(name, await loadImage(src));
              break;
            case "audio":
              this.resourceLoaded.set(name, await loadAudio(src));
              break;
            case "plist":
              this.resourceLoaded.set(name, await loadResourceImage(src));
              break;
            default:
              console.warn(
                `fCanvas<Resource>: can't load "${name} because it is "${type}`
              );
          }
        } else {
          console.warn(`fCanvas<Resource>: "${name}" resource loaded.`);
        }
      } else {
        console.error(`fCanvas<Resource>: "${name} resource not exists.`);
      }
    }
  }
  isLoaded(name?: string): boolean {
    if (name) {
      return this.resourceLoaded.has(name);
    } else {
      // eslint-disable-next-line functional/no-loop-statement
      for (const prop in this.resourceDescription) {
        if (this.resourceLoaded.has(prop) === false) {
          return false;
        }
      }

      return true;
    }
  }

  get(type: "image", path: string): HTMLImageElement;
  get(type: "audio", path: string): HTMLAudioElement;
  get(type: "plist", path: string): TilesResource;
  get(
    type: "image" | "audio" | "plist",
    path: string
  ): HTMLImageElement | HTMLAudioElement | TilesResource {
    const _path = path.split("/");

    const resourceName = _path[0];
    const resourceProp = _path.slice(1).join("/");

    const info = this.resourceDescription[resourceName];

    if (info && info.type === type) {
      if (this.resourceLoaded.has(resourceName)) {
        const resource = this.resourceLoaded.get(resourceName);

        if (resource) {
          switch (info.type) {
            case "plist":
              return resourceProp
                ? (resource as TilesResource).get(resourceProp)
                : resource;
            case "image":
            case "audio":
            default:
              return resource;
          }
        }

        // eslint-disable-next-line functional/no-throw-statement
        throw new Error(`fCanvas<Resource>: "${resourceName} not exists.`);
      } else {
        // eslint-disable-next-line functional/no-throw-statement
        throw new Error(`fCanvas<Resource>: "${resourceName} not loaded.`);
      }
    } else {
      // eslint-disable-next-line functional/no-throw-statement
      throw new Error(`fCanvas<Resource>: "${resourceName}" not exists.`);
    }
  }
}
