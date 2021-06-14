import { ResourceTile } from "../addons/loadResourceImage";
interface ResourceParam {
    src: string;
    lazy: boolean;
}
export default class Resource {
    private _resourcesLoaded;
    private _desResources;
    constructor(resources: {
        [propName: string]: string | ResourceParam;
    }, autoLoad?: boolean);
    isLoaded(name?: string): boolean;
    load(name?: string): Promise<void>;
    get(path: string): ResourceTile;
}
export {};
