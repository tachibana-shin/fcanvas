export default class Emitter {
  __events = [];
  on(name, callback) {
    if (typeof callback === "function") {
      if (name in this.__events) {
        this.__events[name].push(callback);
      } else {
        this.__events[name] = [callback];
      }
    }
  }
  off(name, callback) {
    if (callback) {
      this.__events[name] = this.__events[name].filter(
        (item) => item !== callback
      );

      if (this.__events[name].length === 0) {
        delete this.__events[name];
      }
    } else {
      delete this.__events[name];
    }
  }
  emit(name, payload) {
    if (name in this.__events) {
      for (
        let index = 0, length = this.__events[name].length;
        index < length;
        index++
      ) {
        this.__events[name][index](payload);
      }
    }
  }
  once(name, callback) {
    const handler = (...args) => {
      callback(...args);
      this.off(name, handler);
    };

    this.on(name, handler);
  }
}
