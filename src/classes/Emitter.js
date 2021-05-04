export default class Emitter {
    constructor() {
        this.__events = {};
    }
    /**
     * @param {any} typeofcallback==="function"
     * @return {any}
     */
    on(name, callback) {
        if (typeof callback === "function") {
            if (name in this.__events) {
                this.__events[name].push(callback);
            }
            else {
                this.__events[name] = [callback];
            }
        }
        return () => {
            this.off(name, callback);
        };
    }
    /**
     * @param {string} name
     * @param {CallbackEvent} callback?
     * @return {void}
     */
    off(name, callback) {
        if (typeof callback === "function") {
            this.__events[name] = this.__events[name].filter((item) => item !== callback);
            if (this.__events[name].length === 0) {
                delete this.__events[name];
            }
        }
        else {
            delete this.__events[name];
        }
        /**
         * @param {string} name
         * @param {any[]} ...payload
         * @return {void}
         */
        /**
         * @param {string} name
         * @param {any[]} ...payload
         * @return {void}
         */
    }
    /**
     * @param {string} name
     * @param {any[]} ...payload
     * @return {void}
     */
    emit(name, ...payload) {
        if (name in this.__events) {
            for (let index = this.__events[name].length - 1; index > -1; index--) {
                this.__events[name][index](...payload);
            }
        }
    }
    /**
     * @param {string} name
     * @param {CallbackEvent} callback
     * @return {void}
     */
    once(name, callback) {
        const handler = (...args) => {
            callback(...args);
            this.off(name, handler);
        };
        this.on(name, handler);
    }
}
