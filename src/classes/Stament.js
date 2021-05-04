import Store from "./Store";
class Stament {
    constructor() {
        this.__store = new Store();
    }
    /**
     * @param {string} name
     * @param {CallbackEvent} callback
     * @return {void}
     */
    on(name, callback) {
        if (this.__store[name]) {
            callback();
        }
        else {
            const watcher = this.__store.$watch(name, () => {
                callback();
                watcher();
            });
        }
    }
    /**
     * @param {string} name
     * @return {void}
     */
    emit(name) {
        this.__store.$set(this.__store, name, true);
    }
}
export default Stament;
