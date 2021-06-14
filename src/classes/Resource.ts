import loadResourceImage, { ResourceTile } from "../addons/loadResourceImage";

interface ResourceParam {
  src: string;
  lazy: boolean;
}
interface ResourcesParams {
  [propName: string]: ResourceParam;
}

export default class Resource {
  private _resourcesLoaded: Map<string, ResourceTile> = new Map();
  private _desResources: ResourcesParams = Object.create(null);

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
        };
      }
    }

    this._desResources = desResources;

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
  get(path: string): ResourceTile {
    const _path = path.split("/");

    const resourceName = _path[0];
    const resoucreProp = _path.slice(1).join("/");

    if (this._resourcesLoaded.has(resourceName)) {
      return (this._resourcesLoaded.get(resourceName) as any).get(resoucreProp);
    } else {
      if (resourceName in this._desResources) {
        throw new Error(`fCanvas<Resource>: "${resourceName} not loaded.`);
      } else {
        throw new Error(`fCanvas<Resource>: "${resourceName}" not exitst.`);
      }
    }
  }
}
