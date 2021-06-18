import loadResourceImage, {
  ResourceTile,
  ImageResource,
} from "../addons/loadResourceImage";
import { loadAudio, loadImage } from "../functions/index";

interface ResourceParam {
  src: string;
  lazy: boolean;
  type: "image" | "audio" | "plist" | "json" | "txt" | "map";
}
interface ResourcesParams {
  [propName: string]: ResourceParam;
}

type ResourceType =
  | ResourceTile
  | HTMLImageElement
  | HTMLAudioElement
  | any[]
  | Object
  | String;
export default class Resource {
  private _resourcesLoaded: Map<string, ResourceType> = new Map();
  private _desResources: ResourcesParams = Object.create(null);

  private _set(key: string, value: ResourceType): void {
    (this as any)[key] = value;
  }
  private _delete(key: string): void {
    if (key in this) {
      delete (this as any)[key];
    }
  }
  constructor(
    resources: {
      [propName: string]: string | ResourceParam;
    },
    autoLoad: boolean = true
  ) {
    const desResources: ResourcesParams = {};

    for (const prop in resources) {
      ///
      if (typeof resources[prop] === "object") {
        desResources[prop] = {
          ...(resources[prop] as object),
        } as ResourceParam;
      } else {
        desResources[prop] = {
          src: resources[prop] as string,
          lazy: false,
          type: "plist",
        };
      }
    }

    this._desResources = desResources;

    /// observe
    const { set, delete: _delete } = this._resourcesLoaded;
    const $this = this;

    this._resourcesLoaded.set = function (...params: any): any {
      /// call this._set
      $this._set(params[0], params[1]);
      return set.apply(this, params);
    };
    this._resourcesLoaded.delete = function (...params: any): any {
      /// call this._set
      $this._delete(params[0]);
      return _delete.apply(this, params);
    };

    if (autoLoad) {
      const resourceAutoLoad: Promise<void>[] = [];

      for (const prop in this._desResources) {
        if (this._desResources[prop].lazy === false) {
          resourceAutoLoad.push(this.load(prop));
        }
      }
      // @ts-expect-error

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

  isLoaded(name?: string): boolean {
    if (name) {
      return this._resourcesLoaded.has(name);
    } else {
      for (const prop in this._desResources) {
        if (this._resourcesLoaded.has(prop) === false) {
          return false;
        }
      }

      return true;
    }
  }

  async load(name?: string): Promise<void> {
    if (name) {
      if (name in this._desResources) {
        if (this.isLoaded(name) === false) {
          switch (this._desResources[name].type) {
            case "image":
              this._resourcesLoaded.set(
                name,
                await loadImage(this._desResources[name].src)
              );
              break;
            case "audio":
              this._resourcesLoaded.set(
                name,
                await loadAudio(this._desResources[name].src)
              );
              break;
            case "plist":
              this._resourcesLoaded.set(
                name,
                await loadResourceImage(this._desResources[name].src)
              );
              break;
            case "json":
              this._resourcesLoaded.set(
                name,
                await fetch(this._desResources[name].src).then((res) =>
                  res.json()
                )
              );
              break;
            case "txt":
              this._resourcesLoaded.set(
                name,
                await fetch(this._desResources[name].src).then((res) =>
                  res.text()
                )
              );
              break;
            case "map":
              this._resourcesLoaded.set(
                name,
                await fetch(this._desResources[name].src)
                  .then((res) => res.text())
                  .then((text) =>
                    text.split("\n").map((item) => item.split(" "))
                  )
              );
              break;
            default:
              console.warn(
                `fCanvas<Resource>: can't load "${name} because it is "${this._desResources[name].type}`
              );
          }
          this._resourcesLoaded.set(
            name,
            await loadResourceImage(this._desResources[name].src)
          );
        } else {
          console.warn(`fCanvas<Resource>: "${name}" resource loaded.`);
        }
      } else {
        console.error(`fCanvas<Resource>: "${name} resource not exists.`);
      }
    }
  }
  get(path: string): ResourceType | ImageResource {
    const _path = path.split("/");

    const resourceName = _path[0];
    const resoucreProp = _path.slice(1).join("/");

    const info: ResourceParam = this._desResources[resourceName];

    if (info) {
      if (this._resourcesLoaded.has(resourceName)) {
        const resource = this._resourcesLoaded.get(resourceName);

        if (resource) {
          switch (info.type) {
            case "image":
            case "audio":
              return resource;
            case "plist":
              return resoucreProp
                ? (resource as ResourceTile).get(resoucreProp)
                : resource;
            default:
              throw new Error(
                `fCanvas<Resource>: "can't get "${resourceName} because not support type "${info.type}".`
              );
          }
        }

        throw new Error(`fCanvas<Resource>: "${resourceName} not exists.`);
      } else {
        throw new Error(`fCanvas<Resource>: "${resourceName} not loaded.`);
      }
    } else {
      throw new Error(`fCanvas<Resource>: "${resourceName}" not exitst.`);
    }
  }
}
