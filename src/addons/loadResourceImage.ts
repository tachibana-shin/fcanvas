import { cutImage, loadImage } from "../functions/index";

export interface ImageResource extends HTMLImageElement {
  image?: HTMLImageElement;
  size: {
    width: number;
    height: number;
  };
}

function convertFieldToJson(keyItem: any): object {
  const key = keyItem.textContent;
  let value = keyItem.nextElementSibling;

  if (value == null) {
    throw new Error(
      "fCanvas<loadResourceImage>: Error because syntax error in file plist."
    );
  }

  if (value.tagName === "dict") {
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
    let result: object[] = [];
    Array.from(value.childNodes)
      .filter((item: any) => item.tagName === "key")
      .forEach((keyItem) => {
        result.push(convertFieldToJson(keyItem));
      });

    return {
      [key]: result,
    };
  }
  if (value.tagName === "string") {
    return {
      [key]: value.textContent,
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
function resolvePath(...params: string[]): string {
  if (params[1].match(/^[a-z]+:\/\//i)) {
    return params[1];
  }

  const root = ("" || params[0]).replace(/\/$/, "").split("/");
  params[0] = root.slice(0, root.length - 1).join("/");

  return params.join("/");
}

export class ResourceTile {
  private image: HTMLImageElement;
  private plist: {
    [propName: string]: any;
  };
  private __caching: Map<string, ImageResource> = new Map();

  constructor(image: HTMLImageElement, plist: object) {
    this.image = image;
    this.plist = plist;
  }
  /**
   * @param {string} name
   * @return {any}
   */
  get(name: string): ImageResource {
    if (this.has(name)) {
      const { frame, rotated, sourceSize } = this.plist.frames[name];
      const frameArray = frame.replace(/\{|\}|\s/g, "").split(",");
      const sizeArray = sourceSize.replace(/\{|\}|\s/g, "").split(",");

      if (this.__caching.has(name) === false) {
        const image = cutImage(
          this.image,
          +frameArray[0],
          +frameArray[1],
          +frameArray[2],
          +frameArray[3],
          rotated ? -90 : 0
        );

        this.__caching.set(
          name,
          Object.assign(image, {
            image,
            size: {
              width: +sizeArray[0],
              height: +sizeArray[1],
            },
          })
        );
      }

      return this.__caching.get(name) as ImageResource;
    } else {
      throw new Error(
        `fCanvas<addons/loadResourceImage>: Error does not exist this file "${name}" in declaration .plist`
      );
    }
  }
  /**
   * @param {string} name
   * @return {boolean}
   */
  has(name: string): boolean {
    return name in this.plist.frames;
  }
}

/**
 * @param {string} path
 * @return {Promise<ResourceTile>}
 */
export default async function loadResourceImage(
  path: string
): Promise<ResourceTile> {
  if (path.match(/\.plist$/) == null) {
    path += `.plist`;
  }

  const plist = await fetch(`${path}`)
    .then((response) => response.text())
    .then((str: string) => new DOMParser().parseFromString(str, "text/xml"));
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

  return new ResourceTile(image, plistJson);

  //// ----------------- convert to json ------------------
}
