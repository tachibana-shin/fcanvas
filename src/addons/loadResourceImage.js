import { cutImage, loadImage } from "../functions/index";
function convertFieldToJson(keyItem) {
    const key = keyItem.textContent;
    let value = keyItem.nextElementSibling;
    if (value == null) {
        throw new Error("fCanvas<addons/loadResourceImage>: Error because syntax error in file plist.");
    }
    if (value.tagName === "dict") {
        let result = {};
        Array.from(value.childNodes)
            .filter((item) => item.tagName === "key")
            .forEach((keyItem) => {
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
        let result = [];
        Array.from(value.childNodes)
            .filter((item) => item.tagName === "key")
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
function resolvePath(...params) {
    const root = ("" || params[0]).replace(/\/$/, "").split("/");
    params[0] = root.slice(0, root.length - 1).join("/");
    return params.join("/");
}
class ResourceTile {
    constructor(image, plist) {
        this.__caching = {};
        this.image = image;
        this.plist = plist;
    }
    /**
     * @param {string} name
     * @return {any}
     */
    get(name) {
        const { frame, rotated, sourceSize } = this.plist.frames[name];
        const frameArray = frame.replace(/\{|\}|\s/g, "").split(",");
        const sizeArray = sourceSize.replace(/\{|\}|\s/g, "").split(",");
        if (name in this.__caching === false) {
            this.__caching[name] = cutImage(this.image, +frameArray[0], +frameArray[1], +frameArray[2], +frameArray[3], rotated ? -90 : 0);
        }
        const imageCuted = Object.assign(this.__caching[name], {
            image: this.__caching[name],
            size: {
                width: +sizeArray[0],
                height: +sizeArray[1],
            },
        });
        return imageCuted;
    }
    /*
     * @param {string} name
     * @return {boolean}
     */
    has(name) {
        return name in this.plist.frames;
    }
}
/**
 * @param {string} path
 * @return {Promise<ResourceTile>}
 */
export default async function loadResourceImage(path) {
    if (path.match(/\.plist$/) == null) {
        path += `.plist`;
    }
    const plist = await fetch(`${path}`)
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
    const image = await loadImage(resolvePath(path, plistJson?.metadata.realTextureFileName ||
        plistJson?.metadata.textureFileName));
    return new ResourceTile(image, plistJson);
    //// ----------------- convert to json ------------------
}
