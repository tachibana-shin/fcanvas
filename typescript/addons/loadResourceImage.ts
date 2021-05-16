import { cutImage, loadImage } from "../methods/index";

function convertFieldToJson(keyItem: any): object {
  const key = keyItem.textContent;
  let value = keyItem.nextElementSibling;

  if (value == null) {
    throw new Error(
      "fCanvas<addons/loadResourceImage>: Error because syntax error in file plist."
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
  const root = ("" || params[0]).replace(/\/$/, "").split("/");
  params[0] = root.slice(0, root.length - 1).join("/");

  return params.join("/");
}

class ResourceTile {
  image: HTMLImageElement;
  plist: {
    [propName: string]: any;
  };
  __caching: {
    [propName: string]: HTMLImageElement;
  } = {};

  constructor(image: HTMLImageElement, plist: object) {
    this.image = image;
    this.plist = plist;
  }
  get(name: string): {
    image: HTMLImageElement;
    size: {
      width: number;
      height: number;
    };
  } {
    const { frame, rotated, sourceSize } = this.plist.frames[name];
    const frameArray = frame.replace(/{|}\s/g, "").split(",");
    const sizeArray = sourceSize.replace(/{|}\s/g, "").split(",");

    if (name in this.__caching === false) {
      this.__caching[name] = cutImage(
        this.image,
        ...frameArray,
        rotated ? -90 : 0
      );
    }

    const imageCuted = this.__caching[name];

    return {
      image: imageCuted,
      size: {
        width: sizeArray[0],
        height: sizeArray[1],
      },
    };
  }
  has(name: string): boolean {
    return name in this.plist.frames;
  }
}

export default async function (path: string) {
  if (path.match(/\.plist$/) == null) {
    path += `.plist`;
  }

  const plist = await fetch(`./assets/320x480/Object.plist`)
    .then((response) => response.text())
    .then((str) => new DOMParser().parseFromString(str, "text/xml"));
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