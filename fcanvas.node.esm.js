function unwrapExports (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var asyncToGenerator = createCommonjsModule(function (module) {
  function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
    try {
      var info = gen[key](arg);
      var value = info.value;
    } catch (error) {
      reject(error);
      return;
    }

    if (info.done) {
      resolve(value);
    } else {
      Promise.resolve(value).then(_next, _throw);
    }
  }

  function _asyncToGenerator(fn) {
    return function () {
      var self = this,
          args = arguments;
      return new Promise(function (resolve, reject) {
        var gen = fn.apply(self, args);

        function _next(value) {
          asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
        }

        function _throw(err) {
          asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
        }

        _next(undefined);
      });
    };
  }

  module.exports = _asyncToGenerator;
  module.exports["default"] = module.exports, module.exports.__esModule = true;
});
var _asyncToGenerator = unwrapExports(asyncToGenerator);

var _typeof_1 = createCommonjsModule(function (module) {
  function _typeof(obj) {
    "@babel/helpers - typeof";

    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      module.exports = _typeof = function _typeof(obj) {
        return typeof obj;
      };

      module.exports["default"] = module.exports, module.exports.__esModule = true;
    } else {
      module.exports = _typeof = function _typeof(obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };

      module.exports["default"] = module.exports, module.exports.__esModule = true;
    }

    return _typeof(obj);
  }

  module.exports = _typeof;
  module.exports["default"] = module.exports, module.exports.__esModule = true;
});

var _typeof = unwrapExports(_typeof_1);

var setPrototypeOf = createCommonjsModule(function (module) {
  function _setPrototypeOf(o, p) {
    module.exports = _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    module.exports["default"] = module.exports, module.exports.__esModule = true;
    return _setPrototypeOf(o, p);
  }

  module.exports = _setPrototypeOf;
  module.exports["default"] = module.exports, module.exports.__esModule = true;
});
unwrapExports(setPrototypeOf);

var inherits = createCommonjsModule(function (module) {
  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        writable: true,
        configurable: true
      }
    });
    if (superClass) setPrototypeOf(subClass, superClass);
  }

  module.exports = _inherits;
  module.exports["default"] = module.exports, module.exports.__esModule = true;
});
var _inherits = unwrapExports(inherits);

var assertThisInitialized = createCommonjsModule(function (module) {
  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  module.exports = _assertThisInitialized;
  module.exports["default"] = module.exports, module.exports.__esModule = true;
});
unwrapExports(assertThisInitialized);

var possibleConstructorReturn = createCommonjsModule(function (module) {
  var _typeof = _typeof_1["default"];

  function _possibleConstructorReturn(self, call) {
    if (call && (_typeof(call) === "object" || typeof call === "function")) {
      return call;
    }

    return assertThisInitialized(self);
  }

  module.exports = _possibleConstructorReturn;
  module.exports["default"] = module.exports, module.exports.__esModule = true;
});
var _possibleConstructorReturn = unwrapExports(possibleConstructorReturn);

var getPrototypeOf = createCommonjsModule(function (module) {
  function _getPrototypeOf(o) {
    module.exports = _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    module.exports["default"] = module.exports, module.exports.__esModule = true;
    return _getPrototypeOf(o);
  }

  module.exports = _getPrototypeOf;
  module.exports["default"] = module.exports, module.exports.__esModule = true;
});
var _getPrototypeOf = unwrapExports(getPrototypeOf);

var arrayWithHoles = createCommonjsModule(function (module) {
  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }

  module.exports = _arrayWithHoles;
  module.exports["default"] = module.exports, module.exports.__esModule = true;
});
unwrapExports(arrayWithHoles);

var iterableToArrayLimit = createCommonjsModule(function (module) {
  function _iterableToArrayLimit(arr, i) {
    if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"] != null) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  module.exports = _iterableToArrayLimit;
  module.exports["default"] = module.exports, module.exports.__esModule = true;
});
unwrapExports(iterableToArrayLimit);

var arrayLikeToArray = createCommonjsModule(function (module) {
  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;

    for (var i = 0, arr2 = new Array(len); i < len; i++) {
      arr2[i] = arr[i];
    }

    return arr2;
  }

  module.exports = _arrayLikeToArray;
  module.exports["default"] = module.exports, module.exports.__esModule = true;
});
unwrapExports(arrayLikeToArray);

var unsupportedIterableToArray = createCommonjsModule(function (module) {
  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return arrayLikeToArray(o, minLen);
  }

  module.exports = _unsupportedIterableToArray;
  module.exports["default"] = module.exports, module.exports.__esModule = true;
});
unwrapExports(unsupportedIterableToArray);

var nonIterableRest = createCommonjsModule(function (module) {
  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  module.exports = _nonIterableRest;
  module.exports["default"] = module.exports, module.exports.__esModule = true;
});
unwrapExports(nonIterableRest);

var slicedToArray = createCommonjsModule(function (module) {
  function _slicedToArray(arr, i) {
    return arrayWithHoles(arr) || iterableToArrayLimit(arr, i) || unsupportedIterableToArray(arr, i) || nonIterableRest();
  }

  module.exports = _slicedToArray;
  module.exports["default"] = module.exports, module.exports.__esModule = true;
});
var _slicedToArray = unwrapExports(slicedToArray);

var classCallCheck = createCommonjsModule(function (module) {
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  module.exports = _classCallCheck;
  module.exports["default"] = module.exports, module.exports.__esModule = true;
});
var _classCallCheck = unwrapExports(classCallCheck);

var createClass = createCommonjsModule(function (module) {
  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  module.exports = _createClass;
  module.exports["default"] = module.exports, module.exports.__esModule = true;
});
var _createClass = unwrapExports(createClass);

var runtime_1 = createCommonjsModule(function (module) {
  /**
   * Copyright (c) 2014-present, Facebook, Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */
  var runtime = function (exports) {

    var Op = Object.prototype;
    var hasOwn = Op.hasOwnProperty;
    var undefined$1; // More compressible than void 0.

    var $Symbol = typeof Symbol === "function" ? Symbol : {};
    var iteratorSymbol = $Symbol.iterator || "@@iterator";
    var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
    var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

    function define(obj, key, value) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
      return obj[key];
    }

    try {
      // IE 8 has a broken Object.defineProperty that only works on DOM objects.
      define({}, "");
    } catch (err) {
      define = function define(obj, key, value) {
        return obj[key] = value;
      };
    }

    function wrap(innerFn, outerFn, self, tryLocsList) {
      // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
      var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
      var generator = Object.create(protoGenerator.prototype);
      var context = new Context(tryLocsList || []); // The ._invoke method unifies the implementations of the .next,
      // .throw, and .return methods.

      generator._invoke = makeInvokeMethod(innerFn, self, context);
      return generator;
    }

    exports.wrap = wrap; // Try/catch helper to minimize deoptimizations. Returns a completion
    // record like context.tryEntries[i].completion. This interface could
    // have been (and was previously) designed to take a closure to be
    // invoked without arguments, but in all the cases we care about we
    // already have an existing method we want to call, so there's no need
    // to create a new function object. We can even get away with assuming
    // the method takes exactly one argument, since that happens to be true
    // in every case, so we don't have to touch the arguments object. The
    // only additional allocation required is the completion record, which
    // has a stable shape and so hopefully should be cheap to allocate.

    function tryCatch(fn, obj, arg) {
      try {
        return {
          type: "normal",
          arg: fn.call(obj, arg)
        };
      } catch (err) {
        return {
          type: "throw",
          arg: err
        };
      }
    }

    var GenStateSuspendedStart = "suspendedStart";
    var GenStateSuspendedYield = "suspendedYield";
    var GenStateExecuting = "executing";
    var GenStateCompleted = "completed"; // Returning this object from the innerFn has the same effect as
    // breaking out of the dispatch switch statement.

    var ContinueSentinel = {}; // Dummy constructor functions that we use as the .constructor and
    // .constructor.prototype properties for functions that return Generator
    // objects. For full spec compliance, you may wish to configure your
    // minifier not to mangle the names of these two functions.

    function Generator() {}

    function GeneratorFunction() {}

    function GeneratorFunctionPrototype() {} // This is a polyfill for %IteratorPrototype% for environments that
    // don't natively support it.


    var IteratorPrototype = {};

    IteratorPrototype[iteratorSymbol] = function () {
      return this;
    };

    var getProto = Object.getPrototypeOf;
    var NativeIteratorPrototype = getProto && getProto(getProto(values([])));

    if (NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
      // This environment has a native %IteratorPrototype%; use it instead
      // of the polyfill.
      IteratorPrototype = NativeIteratorPrototype;
    }

    var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);
    GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
    GeneratorFunctionPrototype.constructor = GeneratorFunction;
    GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"); // Helper for defining the .next, .throw, and .return methods of the
    // Iterator interface in terms of a single ._invoke method.

    function defineIteratorMethods(prototype) {
      ["next", "throw", "return"].forEach(function (method) {
        define(prototype, method, function (arg) {
          return this._invoke(method, arg);
        });
      });
    }

    exports.isGeneratorFunction = function (genFun) {
      var ctor = typeof genFun === "function" && genFun.constructor;
      return ctor ? ctor === GeneratorFunction || // For the native GeneratorFunction constructor, the best we can
      // do is to check its .name property.
      (ctor.displayName || ctor.name) === "GeneratorFunction" : false;
    };

    exports.mark = function (genFun) {
      if (Object.setPrototypeOf) {
        Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
      } else {
        genFun.__proto__ = GeneratorFunctionPrototype;
        define(genFun, toStringTagSymbol, "GeneratorFunction");
      }

      genFun.prototype = Object.create(Gp);
      return genFun;
    }; // Within the body of any async function, `await x` is transformed to
    // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
    // `hasOwn.call(value, "__await")` to determine if the yielded value is
    // meant to be awaited.


    exports.awrap = function (arg) {
      return {
        __await: arg
      };
    };

    function AsyncIterator(generator, PromiseImpl) {
      function invoke(method, arg, resolve, reject) {
        var record = tryCatch(generator[method], generator, arg);

        if (record.type === "throw") {
          reject(record.arg);
        } else {
          var result = record.arg;
          var value = result.value;

          if (value && _typeof(value) === "object" && hasOwn.call(value, "__await")) {
            return PromiseImpl.resolve(value.__await).then(function (value) {
              invoke("next", value, resolve, reject);
            }, function (err) {
              invoke("throw", err, resolve, reject);
            });
          }

          return PromiseImpl.resolve(value).then(function (unwrapped) {
            // When a yielded Promise is resolved, its final value becomes
            // the .value of the Promise<{value,done}> result for the
            // current iteration.
            result.value = unwrapped;
            resolve(result);
          }, function (error) {
            // If a rejected Promise was yielded, throw the rejection back
            // into the async generator function so it can be handled there.
            return invoke("throw", error, resolve, reject);
          });
        }
      }

      var previousPromise;

      function enqueue(method, arg) {
        function callInvokeWithMethodAndArg() {
          return new PromiseImpl(function (resolve, reject) {
            invoke(method, arg, resolve, reject);
          });
        }

        return previousPromise = // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, // Avoid propagating failures to Promises returned by later
        // invocations of the iterator.
        callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
      } // Define the unified helper method that is used to implement .next,
      // .throw, and .return (see defineIteratorMethods).


      this._invoke = enqueue;
    }

    defineIteratorMethods(AsyncIterator.prototype);

    AsyncIterator.prototype[asyncIteratorSymbol] = function () {
      return this;
    };

    exports.AsyncIterator = AsyncIterator; // Note that simple async functions are implemented on top of
    // AsyncIterator objects; they just return a Promise for the value of
    // the final result produced by the iterator.

    exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) {
      if (PromiseImpl === void 0) PromiseImpl = Promise;
      var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl);
      return exports.isGeneratorFunction(outerFn) ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function (result) {
        return result.done ? result.value : iter.next();
      });
    };

    function makeInvokeMethod(innerFn, self, context) {
      var state = GenStateSuspendedStart;
      return function invoke(method, arg) {
        if (state === GenStateExecuting) {
          throw new Error("Generator is already running");
        }

        if (state === GenStateCompleted) {
          if (method === "throw") {
            throw arg;
          } // Be forgiving, per 25.3.3.3.3 of the spec:
          // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume


          return doneResult();
        }

        context.method = method;
        context.arg = arg;

        while (true) {
          var delegate = context.delegate;

          if (delegate) {
            var delegateResult = maybeInvokeDelegate(delegate, context);

            if (delegateResult) {
              if (delegateResult === ContinueSentinel) continue;
              return delegateResult;
            }
          }

          if (context.method === "next") {
            // Setting context._sent for legacy support of Babel's
            // function.sent implementation.
            context.sent = context._sent = context.arg;
          } else if (context.method === "throw") {
            if (state === GenStateSuspendedStart) {
              state = GenStateCompleted;
              throw context.arg;
            }

            context.dispatchException(context.arg);
          } else if (context.method === "return") {
            context.abrupt("return", context.arg);
          }

          state = GenStateExecuting;
          var record = tryCatch(innerFn, self, context);

          if (record.type === "normal") {
            // If an exception is thrown from innerFn, we leave state ===
            // GenStateExecuting and loop back for another invocation.
            state = context.done ? GenStateCompleted : GenStateSuspendedYield;

            if (record.arg === ContinueSentinel) {
              continue;
            }

            return {
              value: record.arg,
              done: context.done
            };
          } else if (record.type === "throw") {
            state = GenStateCompleted; // Dispatch the exception by looping back around to the
            // context.dispatchException(context.arg) call above.

            context.method = "throw";
            context.arg = record.arg;
          }
        }
      };
    } // Call delegate.iterator[context.method](context.arg) and handle the
    // result, either by returning a { value, done } result from the
    // delegate iterator, or by modifying context.method and context.arg,
    // setting context.delegate to null, and returning the ContinueSentinel.


    function maybeInvokeDelegate(delegate, context) {
      var method = delegate.iterator[context.method];

      if (method === undefined$1) {
        // A .throw or .return when the delegate iterator has no .throw
        // method always terminates the yield* loop.
        context.delegate = null;

        if (context.method === "throw") {
          // Note: ["return"] must be used for ES3 parsing compatibility.
          if (delegate.iterator["return"]) {
            // If the delegate iterator has a return method, give it a
            // chance to clean up.
            context.method = "return";
            context.arg = undefined$1;
            maybeInvokeDelegate(delegate, context);

            if (context.method === "throw") {
              // If maybeInvokeDelegate(context) changed context.method from
              // "return" to "throw", let that override the TypeError below.
              return ContinueSentinel;
            }
          }

          context.method = "throw";
          context.arg = new TypeError("The iterator does not provide a 'throw' method");
        }

        return ContinueSentinel;
      }

      var record = tryCatch(method, delegate.iterator, context.arg);

      if (record.type === "throw") {
        context.method = "throw";
        context.arg = record.arg;
        context.delegate = null;
        return ContinueSentinel;
      }

      var info = record.arg;

      if (!info) {
        context.method = "throw";
        context.arg = new TypeError("iterator result is not an object");
        context.delegate = null;
        return ContinueSentinel;
      }

      if (info.done) {
        // Assign the result of the finished delegate to the temporary
        // variable specified by delegate.resultName (see delegateYield).
        context[delegate.resultName] = info.value; // Resume execution at the desired location (see delegateYield).

        context.next = delegate.nextLoc; // If context.method was "throw" but the delegate handled the
        // exception, let the outer generator proceed normally. If
        // context.method was "next", forget context.arg since it has been
        // "consumed" by the delegate iterator. If context.method was
        // "return", allow the original .return call to continue in the
        // outer generator.

        if (context.method !== "return") {
          context.method = "next";
          context.arg = undefined$1;
        }
      } else {
        // Re-yield the result returned by the delegate method.
        return info;
      } // The delegate iterator is finished, so forget it and continue with
      // the outer generator.


      context.delegate = null;
      return ContinueSentinel;
    } // Define Generator.prototype.{next,throw,return} in terms of the
    // unified ._invoke helper method.


    defineIteratorMethods(Gp);
    define(Gp, toStringTagSymbol, "Generator"); // A Generator should always return itself as the iterator object when the
    // @@iterator function is called on it. Some browsers' implementations of the
    // iterator prototype chain incorrectly implement this, causing the Generator
    // object to not be returned from this call. This ensures that doesn't happen.
    // See https://github.com/facebook/regenerator/issues/274 for more details.

    Gp[iteratorSymbol] = function () {
      return this;
    };

    Gp.toString = function () {
      return "[object Generator]";
    };

    function pushTryEntry(locs) {
      var entry = {
        tryLoc: locs[0]
      };

      if (1 in locs) {
        entry.catchLoc = locs[1];
      }

      if (2 in locs) {
        entry.finallyLoc = locs[2];
        entry.afterLoc = locs[3];
      }

      this.tryEntries.push(entry);
    }

    function resetTryEntry(entry) {
      var record = entry.completion || {};
      record.type = "normal";
      delete record.arg;
      entry.completion = record;
    }

    function Context(tryLocsList) {
      // The root entry object (effectively a try statement without a catch
      // or a finally block) gives us a place to store values thrown from
      // locations where there is no enclosing try statement.
      this.tryEntries = [{
        tryLoc: "root"
      }];
      tryLocsList.forEach(pushTryEntry, this);
      this.reset(true);
    }

    exports.keys = function (object) {
      var keys = [];

      for (var key in object) {
        keys.push(key);
      }

      keys.reverse(); // Rather than returning an object with a next method, we keep
      // things simple and return the next function itself.

      return function next() {
        while (keys.length) {
          var key = keys.pop();

          if (key in object) {
            next.value = key;
            next.done = false;
            return next;
          }
        } // To avoid creating an additional object, we just hang the .value
        // and .done properties off the next function object itself. This
        // also ensures that the minifier will not anonymize the function.


        next.done = true;
        return next;
      };
    };

    function values(iterable) {
      if (iterable) {
        var iteratorMethod = iterable[iteratorSymbol];

        if (iteratorMethod) {
          return iteratorMethod.call(iterable);
        }

        if (typeof iterable.next === "function") {
          return iterable;
        }

        if (!isNaN(iterable.length)) {
          var i = -1,
              next = function next() {
            while (++i < iterable.length) {
              if (hasOwn.call(iterable, i)) {
                next.value = iterable[i];
                next.done = false;
                return next;
              }
            }

            next.value = undefined$1;
            next.done = true;
            return next;
          };

          return next.next = next;
        }
      } // Return an iterator with no values.


      return {
        next: doneResult
      };
    }

    exports.values = values;

    function doneResult() {
      return {
        value: undefined$1,
        done: true
      };
    }

    Context.prototype = {
      constructor: Context,
      reset: function reset(skipTempReset) {
        this.prev = 0;
        this.next = 0; // Resetting context._sent for legacy support of Babel's
        // function.sent implementation.

        this.sent = this._sent = undefined$1;
        this.done = false;
        this.delegate = null;
        this.method = "next";
        this.arg = undefined$1;
        this.tryEntries.forEach(resetTryEntry);

        if (!skipTempReset) {
          for (var name in this) {
            // Not sure about the optimal order of these conditions:
            if (name.charAt(0) === "t" && hasOwn.call(this, name) && !isNaN(+name.slice(1))) {
              this[name] = undefined$1;
            }
          }
        }
      },
      stop: function stop() {
        this.done = true;
        var rootEntry = this.tryEntries[0];
        var rootRecord = rootEntry.completion;

        if (rootRecord.type === "throw") {
          throw rootRecord.arg;
        }

        return this.rval;
      },
      dispatchException: function dispatchException(exception) {
        if (this.done) {
          throw exception;
        }

        var context = this;

        function handle(loc, caught) {
          record.type = "throw";
          record.arg = exception;
          context.next = loc;

          if (caught) {
            // If the dispatched exception was caught by a catch block,
            // then let that catch block handle the exception normally.
            context.method = "next";
            context.arg = undefined$1;
          }

          return !!caught;
        }

        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];
          var record = entry.completion;

          if (entry.tryLoc === "root") {
            // Exception thrown outside of any try block that could handle
            // it, so set the completion value of the entire function to
            // throw the exception.
            return handle("end");
          }

          if (entry.tryLoc <= this.prev) {
            var hasCatch = hasOwn.call(entry, "catchLoc");
            var hasFinally = hasOwn.call(entry, "finallyLoc");

            if (hasCatch && hasFinally) {
              if (this.prev < entry.catchLoc) {
                return handle(entry.catchLoc, true);
              } else if (this.prev < entry.finallyLoc) {
                return handle(entry.finallyLoc);
              }
            } else if (hasCatch) {
              if (this.prev < entry.catchLoc) {
                return handle(entry.catchLoc, true);
              }
            } else if (hasFinally) {
              if (this.prev < entry.finallyLoc) {
                return handle(entry.finallyLoc);
              }
            } else {
              throw new Error("try statement without catch or finally");
            }
          }
        }
      },
      abrupt: function abrupt(type, arg) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];

          if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
            var finallyEntry = entry;
            break;
          }
        }

        if (finallyEntry && (type === "break" || type === "continue") && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc) {
          // Ignore the finally entry if control is not jumping to a
          // location outside the try/catch block.
          finallyEntry = null;
        }

        var record = finallyEntry ? finallyEntry.completion : {};
        record.type = type;
        record.arg = arg;

        if (finallyEntry) {
          this.method = "next";
          this.next = finallyEntry.finallyLoc;
          return ContinueSentinel;
        }

        return this.complete(record);
      },
      complete: function complete(record, afterLoc) {
        if (record.type === "throw") {
          throw record.arg;
        }

        if (record.type === "break" || record.type === "continue") {
          this.next = record.arg;
        } else if (record.type === "return") {
          this.rval = this.arg = record.arg;
          this.method = "return";
          this.next = "end";
        } else if (record.type === "normal" && afterLoc) {
          this.next = afterLoc;
        }

        return ContinueSentinel;
      },
      finish: function finish(finallyLoc) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];

          if (entry.finallyLoc === finallyLoc) {
            this.complete(entry.completion, entry.afterLoc);
            resetTryEntry(entry);
            return ContinueSentinel;
          }
        }
      },
      "catch": function _catch(tryLoc) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];

          if (entry.tryLoc === tryLoc) {
            var record = entry.completion;

            if (record.type === "throw") {
              var thrown = record.arg;
              resetTryEntry(entry);
            }

            return thrown;
          }
        } // The context.catch method must only be called with a location
        // argument that corresponds to a known catch block.


        throw new Error("illegal catch attempt");
      },
      delegateYield: function delegateYield(iterable, resultName, nextLoc) {
        this.delegate = {
          iterator: values(iterable),
          resultName: resultName,
          nextLoc: nextLoc
        };

        if (this.method === "next") {
          // Deliberately forget the last sent value so that we don't
          // accidentally pass it on to the delegate.
          this.arg = undefined$1;
        }

        return ContinueSentinel;
      }
    }; // Regardless of whether this script is executing as a CommonJS module
    // or not, return the runtime object so that we can declare the variable
    // regeneratorRuntime in the outer scope, which allows this module to be
    // injected easily by `bin/regenerator --include-runtime script.js`.

    return exports;
  }( // If this script is executing as a CommonJS module, use module.exports
  // as the regeneratorRuntime namespace. Otherwise create a new empty
  // object. Either way, the resulting object will be used to initialize
  // the regeneratorRuntime variable at the top of this file.
  module.exports );

  try {
    regeneratorRuntime = runtime;
  } catch (accidentalStrictMode) {
    // This module should not be running in strict mode, so the above
    // assignment should always work unless something is misconfigured. Just
    // in case runtime.js accidentally runs in strict mode, we can escape
    // strict mode using a global Function call. This could conceivably fail
    // if a Content Security Policy forbids using Function, but in that case
    // the proper solution is to fix the accidental strict mode problem. If
    // you've misconfigured your bundler to force strict mode and applied a
    // CSP to forbid Function, and you're not willing to fix either of those
    // problems, please detail your unique predicament in a GitHub issue.
    Function("r", "regeneratorRuntime = r")(runtime);
  }
});

var regenerator = runtime_1;

/**
 * @param {any} e
 * @return {any}
 */
var requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || function (e) {
  return setTimeout(e, 100 / 6);
};
var supportPassive = false;

try {
  var noop = function noop() {};

  var opts = Object.defineProperty({}, "passive", {
    get: function get() {
      supportPassive = true;
    }
  });
  window.addEventListener("testPassive", noop, opts);
  window.removeEventListener("testPassive", noop, opts);
} catch (e) {}
var windowSize = {
  windowWidth: {
    get: function get() {
      return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    }
  },
  windowHeight: {
    get: function get() {
      return window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    }
  }
};
/**
 * @param {string|null} string
 * @return {string}
 */

function trim(string) {
  if (string == null) {
    return "null";
  } else {
    return string.replace(/^\s+|\s+$/g, "");
  }
}
/**
 * @param {string} font
 * @return {InfoFont}
 */

function fontToArray(font) {
  var _font = font.split(" ");

  if (_font.length === 2) {
    return {
      size: parseFloat(_font[0]),
      family: trim(_font[1]),
      weight: "normal"
    };
  }

  return {
    size: parseFloat(_font[1]),
    family: trim(_font[2]),
    weight: trim(_font[0])
  };
}
/**
 * @param {string|number} string
 * @param {number} fi
 * @param {number} fontSize?
 * @return {number}
 */

function AutoToPx(string, fi, fontSize) {
  if (typeof string === "string") {
    string = trim(string);
    var number = parseFloat(string);
    var dp = (string.match(/[a-z%]+$/i) || [, "px"])[1];

    switch (dp) {
      case "px":
        return number;

      case "em":
        return (fontSize || 0) * number;

      case "rem":
        return (fontSize || 0) * 16;

      case "vw":
        return windowSize.windowWidth.get() * number / 100;

      case "vh":
        return windowSize.windowHeight.get() * number / 100;

      case "vmin":
        return Math.min(windowSize.windowWidth.get(), windowSize.windowHeight.get()) * number / 100;

      case "vmax":
        return Math.max(windowSize.windowWidth.get(), windowSize.windowHeight.get()) * number / 100;

      case "%":
        return fi / 100 * number;

      default:
        return +number;
    }
  } else {
    return parseFloat(string + "");
  }
}
/**
 * @param {HTMLCanvasElement} element
 * @param {any[]} touches
 * @return {InfoTouch[]}
 */

function getTouchInfo(element, touches) {
  var rect = element.getBoundingClientRect();
  var sx = element.scrollWidth / element.width || 1;
  var sy = element.scrollHeight / element.height || 1;
  var _touches = [],
      length = touches.length;
  var i = 0,
      touch;

  while (i < length) {
    touch = touches[i++];

    _touches.push({
      x: (touch.clientX - rect.left) / sx,
      y: (touch.clientY - rect.top) / sy,
      winX: touch.clientX,
      winY: touch.clientY,
      id: touch.identifier
    });
  }

  return _touches;
}
/**
 * @return {boolean}
 */

function isMobile() {
  /// code from https://stackoverflow.com/questions/11381673/detecting-a-mobile-browser
  var check = false;

  (function (a) {
    if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true;
  })(navigator.userAgent || navigator.vendor);

  return check;
}

var Emitter = /*#__PURE__*/function () {
  function Emitter() {
    _classCallCheck(this, Emitter);

    this.__events = {};
  }
  /**
   * @param {any} typeofcallback==="function"
   * @return {any}
   */


  _createClass(Emitter, [{
    key: "on",
    value: function on(name, callback) {
      var _this = this;

      if (typeof callback === "function") {
        if (name in this.__events) {
          this.__events[name].push(callback);
        } else {
          this.__events[name] = [callback];
        }
      }

      return function () {
        _this.off(name, callback);
      };
    }
    /**
     * @param {string} name
     * @param {CallbackEvent} callback?
     * @return {void}
     */

  }, {
    key: "off",
    value: function off(name, callback) {
      if (typeof callback === "function") {
        this.__events[name] = this.__events[name].filter(function (item) {
          return item !== callback;
        });

        if (this.__events[name].length === 0) {
          delete this.__events[name];
        }
      } else {
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

  }, {
    key: "emit",
    value: function emit(name) {
      if (name in this.__events) {
        for (var _len = arguments.length, payload = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          payload[_key - 1] = arguments[_key];
        }

        for (var index = this.__events[name].length - 1; index > -1; index--) {
          var _this$__events$name;

          (_this$__events$name = this.__events[name])[index].apply(_this$__events$name, payload);
        }
      }
    }
    /**
     * @param {string} name
     * @param {CallbackEvent} callback
     * @return {void}
     */

  }, {
    key: "once",
    value: function once(name, callback) {
      var _this2 = this;

      var handler = function handler() {
        callback.apply(void 0, arguments);

        _this2.off(name, handler);
      };

      this.on(name, handler);
    }
  }]);

  return Emitter;
}();

var defineProperty = createCommonjsModule(function (module) {
  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  module.exports = _defineProperty;
  module.exports["default"] = module.exports, module.exports.__esModule = true;
});
var _defineProperty = unwrapExports(defineProperty);

var arrayWithoutHoles = createCommonjsModule(function (module) {
  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return arrayLikeToArray(arr);
  }

  module.exports = _arrayWithoutHoles;
  module.exports["default"] = module.exports, module.exports.__esModule = true;
});
unwrapExports(arrayWithoutHoles);

var iterableToArray = createCommonjsModule(function (module) {
  function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
  }

  module.exports = _iterableToArray;
  module.exports["default"] = module.exports, module.exports.__esModule = true;
});
unwrapExports(iterableToArray);

var nonIterableSpread = createCommonjsModule(function (module) {
  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  module.exports = _nonIterableSpread;
  module.exports["default"] = module.exports, module.exports.__esModule = true;
});
unwrapExports(nonIterableSpread);

var toConsumableArray = createCommonjsModule(function (module) {
  function _toConsumableArray(arr) {
    return arrayWithoutHoles(arr) || iterableToArray(arr) || unsupportedIterableToArray(arr) || nonIterableSpread();
  }

  module.exports = _toConsumableArray;
  module.exports["default"] = module.exports, module.exports.__esModule = true;
});
var _toConsumableArray = unwrapExports(toConsumableArray);

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function reactiveDefine(value, callback) {
  var parent = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

  if (value !== null && _typeof(value) === "object") {
    /// reactive children
    if (Array.isArray(value)) {
      /// bind to propertyes
      /// reactive method array
      if (!value.__reactive) {
        ["push", "pop", "shift", "unshift", "splice"].forEach(function (name) {
          var proto = value[name];
          Object.defineProperty(value, name, {
            writable: false,
            enumerable: false,
            configurable: true,
            value: function value() {
              var newValue = proto.apply(this, arguments);
              callback(_toConsumableArray(parent), this, newValue);
              return newValue;
            }
          });
        });
        Object.defineProperty(value, "__reactive", {
          writable: false,
          enumerable: false,
          configurable: true,
          value: true
        });
      } ////


      value.forEach(function (item, index) {
        if (item !== null && _typeof(item) === "object") {
          reactiveDefine(item, callback, [].concat(_toConsumableArray(parent), [index + ""]));
        }
      });
    } else {
      //// if object ===> reactive attribute
      /// create __store if not exists
      /// reactive social
      if (!value.__reactive) {
        Object.defineProperty(value, "__store", {
          writable: true,
          enumerable: false,
          configurable: true,
          value: _objectSpread({}, value)
        });
        Object.defineProperty(value, "__reactive", {
          writable: false,
          enumerable: false,
          configurable: true,
          value: true
        });
      } else {
        value.__store = _objectSpread({}, value);
      }

      var _loop = function _loop(key) {
        Object.defineProperty(value, key, {
          get: function get() {
            var _value$__store;

            return (_value$__store = value.__store) === null || _value$__store === void 0 ? void 0 : _value$__store[key];
          },
          enumerable: true,
          set: function set(newValue) {
            var _value$__store2;

            var old = (_value$__store2 = value.__store) === null || _value$__store2 === void 0 ? void 0 : _value$__store2[key];

            if (value.__store) {
              value.__store[key] = newValue;
            }

            reactiveDefine(newValue, callback, [].concat(_toConsumableArray(parent), [key]));
            callback([].concat(_toConsumableArray(parent), [key]), old, newValue);
          }
        });
        reactiveDefine(value[key], callback, [].concat(_toConsumableArray(parent), [key]));
      };

      for (var key in value) {
        _loop(key);
      }
    }
  }
}

var Store = /*#__PURE__*/function () {
  /**
   * @param {Object} store?
   * @return {any}
   */
  function Store(store) {
    var _this = this;

    _classCallCheck(this, Store);

    this.__emitter = new Emitter();

    for (var key in store) {
      this[key] = store[key];
    }

    reactiveDefine(this, function (paths, oldVal, newVal) {
      _this.__emitter.emit(paths.join("."), oldVal, newVal);
    });
  }
  /**
   * @param {Store|Object} object
   * @param {string} key
   * @param {any} value
   * @return {void}
   */


  _createClass(Store, [{
    key: "$set",
    value: function $set(object, key, value) {
      var _this2 = this;

      object[key] = value;
      reactiveDefine(object, function (paths, oldVal, newVal) {
        _this2.__emitter.emit(paths.join("."), oldVal, newVal);
      });
      object[key] = value;
    }
    /**
     * @param {string} key
     * @param {CallbackEvent} callback
     * @return {any}
     */

  }, {
    key: "$watch",
    value: function $watch(key, callback) {
      return this.__emitter.on(key, callback);
    }
  }]);

  return Store;
}();

var Stament = /*#__PURE__*/function () {
  function Stament() {
    _classCallCheck(this, Stament);

    this.__store = new Store();
  }
  /**
   * @param {string} name
   * @param {CallbackEvent} callback
   * @return {void}
   */


  _createClass(Stament, [{
    key: "on",
    value: function on(name, callback) {
      if (this.__store[name]) {
        callback();
      } else {
        var watcher = this.__store.$watch(name, function () {
          callback();
          watcher();
        });
      }
    }
    /**
     * @param {string} name
     * @return {void}
     */

  }, {
    key: "emit",
    value: function emit(name) {
      this.__store.$set(this.__store, name, true);
    }
  }]);

  return Stament;
}();

function calculateRemainder2D(vector, xComponent, yComponent) {
  if (xComponent !== 0) {
    vector.x = vector.x % xComponent;
  }

  if (yComponent !== 0) {
    vector.y = vector.y % yComponent;
  }

  return vector;
}

function calculateRemainder3D(vector, xComponent, yComponent, zComponent) {
  if (xComponent !== 0) {
    vector.x = vector.x % xComponent;
  }

  if (yComponent !== 0) {
    vector.y = vector.y % yComponent;
  }

  if (zComponent !== 0) {
    vector.z = vector.z % zComponent;
  }

  return vector;
}

var Vector = /*#__PURE__*/function () {
  /**
   * @param {number=0} x
   * @param {number=0} y
   * @param {number=0} z
   * @return {any}
   */
  function Vector() {
    var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var z = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

    _classCallCheck(this, Vector);

    var _ref = [x, y, z];
    this.x = _ref[0];
    this.y = _ref[1];
    this.z = _ref[2];
  }
  /**
   * @param {Vector|[number?} x?
   * @param {any} number?
   * @param {any} number?]|number
   * @param {number} y?
   * @param {number} z?
   * @return {this}
   */


  _createClass(Vector, [{
    key: "set",
    value: function set(x, y, z) {
      if (x instanceof Vector) {
        this.x = x.x || 0;
        this.y = x.y || 0;
        this.z = x.z || 0;
        return this;
      }

      if (x instanceof Array) {
        this.x = x[0] || 0;
        this.y = x[1] || 0;
        this.z = x[2] || 0;
        return this;
      }

      this.x = x || 0;
      this.y = y || 0;
      this.z = z || 0;
      return this;
    }
    /**
     * @return {Vector}
     */

  }, {
    key: "copy",
    value: function copy() {
      return new Vector(this.x, this.y, this.z);
    }
    /**
     * @param {Vector|[number?} x?
     * @param {any} number?
     * @param {any} number?]|number
     * @param {number} y?
     * @param {number} z?
     * @return {this}
     */

  }, {
    key: "add",
    value: function add(x, y, z) {
      if (x instanceof Vector) {
        this.x += x.x || 0;
        this.y += x.y || 0;
        this.z += x.z || 0;
        return this;
      }

      if (x instanceof Array) {
        this.x += x[0] || 0;
        this.y += x[1] || 0;
        this.z += x[2] || 0;
        return this;
      }

      this.x += x || 0;
      this.y += y || 0;
      this.z += z || 0;
      return this;
    }
    /**
     * @param {Vector|[number} x?
     * @param {any} number
     * @param {any} number?]|number
     * @param {number} y?
     * @param {number} z?
     * @return {any}
     */

  }, {
    key: "rem",
    value: function rem(x, y, z) {
      if (x instanceof Vector) {
        if (Number.isFinite(x.x) && Number.isFinite(x.y) && Number.isFinite(x.z)) {
          var xComponent = parseFloat(x.x + "");
          var yComponent = parseFloat(x.y + "");
          var zComponent = parseFloat(x.z + "");
          calculateRemainder3D(this, xComponent, yComponent, zComponent);
        }
      } else if (x instanceof Array) {
        if (x.every(function (element) {
          return Number.isFinite(element);
        })) {
          if (x.length === 2) {
            calculateRemainder2D(this, x[0], x[1]);
          }

          if (x.length === 3) {
            calculateRemainder3D(this, x[0], x[1], x[2] || 0);
          }
        }
      } else if (arguments.length === 1) {
        if (Number.isFinite(arguments[0]) && arguments[0] !== 0) {
          this.x = this.x % arguments[0];
          this.y = this.y % arguments[0];
          this.z = this.z % arguments[0];
          return this;
        }
      } else if (arguments.length === 2) {
        var vectorComponents = [].slice.call(arguments);

        if (vectorComponents.every(function (element) {
          return Number.isFinite(element);
        })) {
          if (vectorComponents.length === 2) {
            calculateRemainder2D(this, vectorComponents[0], vectorComponents[1]);
          }
        }
      } else if (arguments.length === 3) {
        var _vectorComponents = [].slice.call(arguments);

        if (_vectorComponents.every(function (element) {
          return Number.isFinite(element);
        })) {
          if (_vectorComponents.length === 3) {
            calculateRemainder3D(this, _vectorComponents[0], _vectorComponents[1], _vectorComponents[2]);
          }
        }
      }
    }
    /**
     * @param {Vector|[number?} x?
     * @param {any} number?
     * @param {any} number?]|number
     * @param {number} y?
     * @param {number} z?
     * @return {this}
     */

  }, {
    key: "sub",
    value: function sub(x, y, z) {
      if (x instanceof Vector) {
        this.x -= x.x || 0;
        this.y -= x.y || 0;
        this.z -= x.z || 0;
        return this;
      }

      if (x instanceof Array) {
        this.x -= x[0] || 0;
        this.y -= x[1] || 0;
        this.z -= x[2] || 0;
        return this;
      }

      this.x -= x || 0;
      this.y -= y || 0;
      this.z -= z || 0;
      return this;
    }
    /**
     * @param {number} n
     * @return {this}
     */

  }, {
    key: "mult",
    value: function mult(n) {
      this.x *= n;
      this.y *= n;
      this.z *= n;
      return this;
    }
    /**
     * @param {number} n
     * @return {this}
     */

  }, {
    key: "div",
    value: function div(n) {
      if (n === 0) {
        console.warn("div:", "divide by 0");
        return this;
      }

      this.x /= n;
      this.y /= n;
      this.z /= n;
      return this;
    }
    /**
     * @return {number}
     */

  }, {
    key: "mag",
    value: function mag() {
      return Math.sqrt(this.magSq());
    }
    /**
     * @return {number}
     */

  }, {
    key: "magSq",
    value: function magSq() {
      var x = this.x,
          y = this.y,
          z = this.z;
      return x * x + y * y + z * z;
    }
    /**
     * @param {Vector|number} x?
     * @param {number} y?
     * @param {number} z?
     * @return {number}
     */

  }, {
    key: "dot",
    value: function dot(x, y, z) {
      if (x instanceof Vector) {
        return this.dot(x.x, x.y, x.z);
      }

      return this.x * (x || 0) + this.y * (y || 0) + this.z * (z || 0);
    }
    /**
     * @param {Vector|{x:number;y:number;z:number}} v
     * @return {Vector}
     */

  }, {
    key: "cross",
    value: function cross(v) {
      var x = this.y * v.z - this.z * v.y;
      var y = this.z * v.x - this.x * v.z;
      var z = this.x * v.y - this.y * v.x;
      return new Vector(x, y, z);
    }
    /**
     * @return {this}
     */

  }, {
    key: "normalize",
    value: function normalize() {
      var len = this.mag();
      if (len !== 0) this.mult(1 / len);
      return this;
    }
    /**
     * @param {number} max
     * @return {this}
     */

  }, {
    key: "limit",
    value: function limit(max) {
      var mSq = this.magSq();

      if (mSq > max * max) {
        this.div(Math.sqrt(mSq)) //normalize it
        .mult(max);
      }

      return this;
    }
    /**
     * @param {number} n
     * @return {this}
     */

  }, {
    key: "setMag",
    value: function setMag(n) {
      return this.normalize().mult(n);
    }
    /**
     * @return {number}
     */

  }, {
    key: "heading",
    value: function heading() {
      return Math.atan2(this.y, this.x);
    }
    /**
     * @param {number} a
     * @return {this}
     */

  }, {
    key: "rotate",
    value: function rotate(a) {
      var newHeading = this.heading() + a;
      var mag = this.mag();
      this.x = Math.cos(newHeading) * mag;
      this.y = Math.sin(newHeading) * mag;
      return this;
    }
    /**
     * @param {Vector} v
     * @return {number}
     */

  }, {
    key: "angleBetween",
    value: function angleBetween(v) {
      var dotmagmag = this.dot(v) / (this.mag() * v.mag());
      var angle;
      angle = Math.acos(Math.min(1, Math.max(-1, dotmagmag)));
      angle = angle * Math.sign(this.cross(v).z || 1);
      return angle;
    }
    /**
     * @param {Vector|number} x
     * @param {number} y?
     * @param {number} z?
     * @param {number=1} amt
     * @return {this}
     */

  }, {
    key: "lerp",
    value: function lerp(x, y, z) {
      var amt = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;

      if (x instanceof Vector) {
        return this.lerp(x.x, x.y, x.z, y || 0);
      }

      this.x += (x - this.x) * amt || 0;
      this.y += (y || 0 - this.y) * amt || 0;
      this.z += (z || 0 - this.z) * amt || 0;
      return this;
    }
    /**
     * @param {Vector} surfaceNormal
     * @return {this}
     */

  }, {
    key: "reflect",
    value: function reflect(surfaceNormal) {
      surfaceNormal.normalize();
      return this.sub(surfaceNormal.mult(2 * this.dot(surfaceNormal)));
    }
    /**
     * @return {[number, number, number]}
     */

  }, {
    key: "array",
    value: function array() {
      return [this.x || 0, this.y || 0, this.z || 0];
    }
    /**
     * @param {Vector|[number} x
     * @param {any} number
     * @param {any} number]|number
     * @param {number} y?
     * @param {number} z?
     * @return {boolean}
     */

  }, {
    key: "equals",
    value: function equals(x, y, z) {
      var a, b, c;

      if (x instanceof Vector) {
        a = x.x || 0;
        b = x.y || 0;
        c = x.z || 0;
      } else if (x instanceof Array) {
        a = x[0] || 0;
        b = x[1] || 0;
        c = x[2] || 0;
      } else {
        a = x || 0;
        b = y || 0;
        c = z || 0;
      }

      return this.x === a && this.y === b && this.z === c;
    }
    /**
     * @return {string}
     */

  }, {
    key: "toString",
    value: function toString() {
      return "Vector: [" + this.array().join(", ") + "]";
    }
  }]);

  return Vector;
}();

/**
 * @param {Circle} circle1
 * @param {Circle} circle2
 * @return {boolean}
 */
function CircleImpact(circle1, circle2) {
  return Math.pow(circle1.x - circle2.x, 2) + Math.pow(circle1.y - circle2.y, 2) < Math.pow(circle1.radius + circle2.radius, 2);
}
/**
 * @param {Circle} circle
 * @param {number} x
 * @param {number} y
 * @return {boolean}
 */

function CircleImpactPoint(circle, x, y) {
  if (x == null || y == null) {
    return false;
  }

  return Math.pow(x - circle.x, 2) + Math.pow(y - circle.y, 2) < Math.pow(circle.radius, 2);
}
/**
 * @param {Circle} circle
 * @param {Rect} rect
 * @return {boolean}
 */

function CircleImpactRect(circle, rect) {
  var x = Math.max(rect.x, Math.min(circle.x, rect.x + rect.width));
  var y = Math.max(rect.y, Math.min(circle.y, rect.y + rect.height));
  var distance = (x - circle.x) * (x - circle.x) + (y - circle.y) * (y - circle.y);
  return distance < Math.pow(circle.radius, 2);
}
/**
 * @param {number} value
 * @param {number} min
 * @param {number} max
 * @return {number}
 */

function constrain(value, min, max) {
  return Math.min(Math.max(min, value), max);
}
/**
 * @param {string} src
 * @return {Promise<HTMLImageElement>}
 */

function loadImage(src) {
  var img = new Image();
  img.src = src;
  return new Promise(function (resolve, reject) {
    function loaded() {
      resolve(img);
      img.removeEventListener("load", loaded);
    }

    function error(err) {
      reject(err);
      img.removeEventListener("error", error);
    }

    img.addEventListener("load", loaded);
    img.addEventListener("error", error);
  });
}
/**
 * @param {number} value
 * @param {number} start
 * @param {number} stop
 * @param {number} min
 * @param {number} max
 * @return {number}
 */

function map(value, start, stop, min, max) {
  return (value - start) * (max - min) / (stop - start) + min;
}

function random() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  if (args.length === 1) {
    if (args[0] !== null && _typeof(args[0]) === "object" && "length" in args[0]) {
      return args[0][Math.floor(Math.random() * args[0].length)];
    }

    return Math.random() * args[0];
  }

  if (args.length === 2) {
    return args[0] + Math.random() * (args[1] - args[0]);
  }
}
/**
 * @param {any} start
 * @param {any} stop
 * @param {number} step
 * @return {any}
 */


function range(start, stop, step) {
  step = step || 1;
  var arr = [];
  var isChar = false;
  if (stop === undefined) stop = start, start = 1;

  if (typeof start === "string") {
    start = start.charCodeAt(0);
    stop = stop.charCodeAt(0);
    isChar = true;
  }

  if (start !== stop && Math.abs(stop - start) < Math.abs(step)) throw new Error("range(): step exceeds the specified range.");

  if (stop > start) {
    step < 0 && (step *= -1);

    while (start <= stop) {
      arr.push(isChar ? String.fromCharCode(start) : start);
      start += step;
    }
  } else {
    step > 0 && (step *= -1);

    while (start >= stop) {
      arr.push(isChar ? String.fromCharCode(start) : start);
      start += step;
    }
  }

  return arr;
}
/**
 * @param {Rect} rect1
 * @param {Rect} rect2
 * @return {boolean}
 */

function RectImpact(rect1, rect2) {
  return rect1.x <= rect2.x + rect2.width && rect1.x + rect1.width >= rect2.x && rect1.y <= rect2.y + rect2.height && rect1.y + rect1.height >= rect2.y;
}
/**
 * @param {Rect} rect
 * @param {number} x
 * @param {number} y
 * @return {boolean}
 */

function RectImpactPoint(rect, x, y) {
  if (x == null || y == null) {
    return false;
  }

  return rect.x < x && rect.x + rect.width > x && rect.y < y && rect.y + rect.height > y;
}
/**
 * @param {number} start
 * @param {number} stop
 * @param {number} amt
 * @return {number}
 */

function lerp(start, stop, amt) {
  return amt * (stop - start) + start;
}
/**
 * @param {number[]} ...args
 * @return {number}
 */

var hypot = typeof Math.hypot === "function" ? Math.hypot : function () {
  var len = arguments.length;
  var i = 0,
      result = 0;

  while (i < len) {
    var _i;

    result += Math.pow((_i = i++, _i < 0 || arguments.length <= _i ? undefined : arguments[_i]), 2);
  }

  return Math.sqrt(result);
};

function getAnimate(type, currentProgress, start, distance, steps, power) {
  switch (type) {
    case "ease":
      currentProgress /= steps / 2;

      if (currentProgress < 1) {
        return distance / 2 * Math.pow(currentProgress, power) + start;
      }

      currentProgress -= 2;
      return distance / 2 * (Math.pow(currentProgress, power) + 2) + start;

    case "quadratic":
      currentProgress /= steps / 2;

      if (currentProgress <= 1) {
        return distance / 2 * currentProgress * currentProgress + start;
      }

      currentProgress--;
      return -1 * (distance / 2) * (currentProgress * (currentProgress - 2) - 1) + start;

    case "sine-ease-in-out":
      return -distance / 2 * (Math.cos(Math.PI * currentProgress / steps) - 1) + start;

    case "quintic-ease":
      currentProgress /= steps / 2;

      if (currentProgress < 1) {
        return distance / 2 * Math.pow(currentProgress, 5) + start;
      }

      currentProgress -= 2;
      return distance / 2 * (Math.pow(currentProgress, 5) + 2) + start;

    case "exp-ease-in-out":
      currentProgress /= steps / 2;
      if (currentProgress < 1) return distance / 2 * Math.pow(2, 10 * (currentProgress - 1)) + start;
      currentProgress--;
      return distance / 2 * (-Math.pow(2, -10 * currentProgress) + 2) + start;

    case "linear":
      return start + distance / steps * currentProgress;
  }
}
/**
 * @param {AnimateType} type
 * @param {number} start
 * @param {number} stop
 * @param {number} frame
 * @param {number} frames
 * @param {number=3} power
 * @return {number}
 */


function getValueInFrame(type, start, stop, frame, frames) {
  var power = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 3;
  var distance = stop - start;
  return getAnimate(type, frame, start, distance, frames, power);
}

var Animate = /*#__PURE__*/function () {
  /**
   * @param {AnimateConfig={time:0}} config
   * @return {any}
   */
  function Animate() {
    var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
      time: 0
    };

    _classCallCheck(this, Animate);

    this.$ = new Emitter();
    this._frame = 1;
    this.type = "linear";
    this.time = 0;
    this.fps = 1000 / 60;
    this.xFrom = 0;
    this.xTo = 0;
    this.yFrom = 0;
    this.yTo = 0;
    this.zFrom = 0;
    this.zTo = 0;
    this.config(config);
  }
  /**
   * Get frames from time
   * @param {number} time
   * @param {number=1000/60} fps
   * @return {number}
   */


  _createClass(Animate, [{
    key: "x",
    get:
    /**
     * @return {number}
     */
    function get() {
      return getValueInFrame(this.type, this.xFrom, this.xTo, this.frame, this.frames);
    }
    /**
     * @return {number}
     */

  }, {
    key: "y",
    get: function get() {
      return getValueInFrame(this.type, this.yFrom, this.yTo, this.frame, this.frames);
    }
    /**
     * @return {number}
     */

  }, {
    key: "z",
    get: function get() {
      return getValueInFrame(this.type, this.zFrom, this.zTo, this.frame, this.frames);
    }
    /**
     * @return {number}
     */

  }, {
    key: "frames",
    get: function get() {
      return Animate.getFrames(this.time, this.fps);
    }
    /**
     * @return {number}
     */

  }, {
    key: "frame",
    get: function get() {
      return this._frame;
    }
    /**
     * @param {number} value
     * @return {any}
     */
    ,
    set: function set(value) {
      this._frame = constrain(value, 0, this.frames);

      if (this._frame === this.frames) {
        this.$.emit("done");
      }
    }
    /**
     * @return {boolean}
     */

  }, {
    key: "running",
    get: function get() {
      return this.frame < this.frames;
    }
    /**
     * @return {boolean}
     */

  }, {
    key: "done",
    get: function get() {
      return this.frame === this.frames;
    }
    /**
     * @param {any} {xFrom=0
     * @param {any} xTo=0
     * @param {any} yFrom=0
     * @param {any} yTo=0
     * @param {any} zFrom=0
     * @param {any} zTo=0
     * @param {any} type="linear"
     * @param {any} time
     * @param {any} fps=1000/60
     * @param {AnimateConfig} }
     * @return {void}
     */

  }, {
    key: "config",
    value: function config(_ref) {
      var _ref$xFrom = _ref.xFrom,
          xFrom = _ref$xFrom === void 0 ? 0 : _ref$xFrom,
          _ref$xTo = _ref.xTo,
          xTo = _ref$xTo === void 0 ? 0 : _ref$xTo,
          _ref$yFrom = _ref.yFrom,
          yFrom = _ref$yFrom === void 0 ? 0 : _ref$yFrom,
          _ref$yTo = _ref.yTo,
          yTo = _ref$yTo === void 0 ? 0 : _ref$yTo,
          _ref$zFrom = _ref.zFrom,
          zFrom = _ref$zFrom === void 0 ? 0 : _ref$zFrom,
          _ref$zTo = _ref.zTo,
          zTo = _ref$zTo === void 0 ? 0 : _ref$zTo,
          _ref$type = _ref.type,
          type = _ref$type === void 0 ? "linear" : _ref$type,
          time = _ref.time,
          _ref$fps = _ref.fps,
          fps = _ref$fps === void 0 ? 1000 / 60 : _ref$fps;
      var _ref2 = [xFrom, xTo, yFrom, yTo, zFrom, zTo];
      this.xFrom = _ref2[0];
      this.xTo = _ref2[1];
      this.yFrom = _ref2[2];
      this.yTo = _ref2[3];
      this.zFrom = _ref2[4];
      this.zTo = _ref2[5];
      this.type = type;
      this.time = time;
      this.fps = fps;
    }
    /**
     * @param {number} x?
     * @param {number} y?
     * @param {number} z?
     * @return {void}
     */

  }, {
    key: "set",
    value: function set(x, y, z) {
      var _ref3 = [x || 0, y || 0, z || 0];
      this.xFrom = _ref3[0];
      this.yFrom = _ref3[1];
      this.zFrom = _ref3[2];
    }
    /**
     * @param {number} x?
     * @param {number} y?
     * @param {number} z?
     * @return {void}
     */

  }, {
    key: "move",
    value: function move(x, y, z) {
      this.frame = 1;
      var _ref4 = [x || 0, y || 0, z || 0];
      this.xTo = _ref4[0];
      this.yTo = _ref4[1];
      this.zTo = _ref4[2];
    }
    /**
     * @param {number} x?
     * @param {number} y?
     * @param {number} z?
     * @return {Promise<void>}
     */

  }, {
    key: "moveAsync",
    value: function moveAsync(x, y, z) {
      var _this = this;

      this.move(x, y, z);
      return new Promise(function (resolve) {
        _this.$.once("done", function () {
          return resolve();
        });
      });
    }
    /**
     * @returns void
     */

  }, {
    key: "addFrame",
    value: function addFrame() {
      this.frame++;
    }
    /**
     * @param  {AnimateType} type
     * @returns void
     */

  }, {
    key: "setType",
    value: function setType(type) {
      this.type = type;
    }
    /**
     * @returns AnimateType
     */

  }, {
    key: "getType",
    value: function getType() {
      return this.type;
    }
    /**
     * @param  {number} time
     * @returns void
     */

  }, {
    key: "setTime",
    value: function setTime(time) {
      this.time = time;
    }
    /**
     * @returns number
     */

  }, {
    key: "getTime",
    value: function getTime() {
      return this.time;
    }
    /**
     * @param {number} x?
     * @param {number} y?
     * @param {number} z?
     * @return {void}
     */

  }, {
    key: "moveImmediate",
    value: function moveImmediate(x, y, z) {
      var _ref5 = [this.x, this.y, this.z];
      this.xFrom = _ref5[0];
      this.yFrom = _ref5[1];
      this.zFrom = _ref5[2];
      this.move(x, y, z);
    }
  }], [{
    key: "getFrames",
    value: function getFrames(time) {
      var fps = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1000 / 60;
      return time / fps; /// time * 1 / fps
    }
  }]);

  return Animate;
}();

Animate.getValueInFrame = getValueInFrame;

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var MyElement = /*#__PURE__*/function () {
  /**
   * @param {fCanvas} canvas?
   * @return {any}
   */
  function MyElement(canvas) {
    _classCallCheck(this, MyElement);

    this._els = [];
    this._idActiveNow = -1;
    this._queue = [];

    if ((canvas === null || canvas === void 0 ? void 0 : canvas.constructor) === fCanvas) {
      this._els.push(canvas);
    } else {
      this._els.push(noopFCanvas);
    }
  }

  _createClass(MyElement, [{
    key: "_initAnimate",
    value: function _initAnimate() {
      if (typeof this.setupAnimate === "function") {
        this._animate = new Animate(this.setupAnimate.call(this));
      } else if (this.setupAnimate != null) {
        this._animate = new Animate(this.setupAnimate);
      }
    }
  }, {
    key: "animate",
    get: function get() {
      if (!this._animate) {
        this._initAnimate();
      }

      return this._animate;
    }
    /**
     * @return {HTMLCanvasElement}
     */

  }, {
    key: "$el",
    get: function get() {
      return this.$parent.$el;
    }
  }, {
    key: "_run",
    value: function _run(canvas) {
      this.bind(canvas);
      this._idActiveNow = canvas.id;

      if (typeof this.update === "function") {
        if (this.autoDraw === true && typeof this.draw === "function") {
          this.draw();
        }

        this.update();

        if (this.animate) {
          this.animate.addFrame();
        }
      } else if (this.autoDraw !== true && typeof this.draw === "function") {
        this.draw();
      }

      if (this._queue.length > 0) {
        for (var index = 0, length = this._queue.length; index < length; index++) {
          this.run(this._queue[index]);
        }
      }

      this._idActiveNow = -1;
    }
    /**
     * @param {LikeMyElement} element
     * @return {void}
     */

  }, {
    key: "addQueue",
    value: function addQueue(element) {
      if (typeof element._run === "function") {
        this._queue.push(element);
      } else {
        console.error("fCanvas: the parameter passed to MyElement.addQueue() must be a like fCanvas.MyElement object.");
      }
    }
    /**
     * @param {number} index
     * @return {LikeMyElement | undefined}
     */

  }, {
    key: "getQueue",
    value: function getQueue(index) {
      if (index < 0) {
        index += this._queue.length;
      }

      return this._queue[index];
    }
    /**
     * @param {LikeMyElement} element
     * @return {void}
     */

  }, {
    key: "run",
    value: function run(element) {
      this.$parent.run(element);
    }
    /**
     * @param {number} id
     * @return {boolean}
     */

  }, {
    key: "has",
    value: function has(id) {
      return this._els.some(function (item) {
        return item.id === id;
      });
    }
    /**
     * @return {fCanvas}
     */

  }, {
    key: "$parent",
    get: function get() {
      var _this = this;

      var canvas = this._idActiveNow === null ? this._els[this._els.length - 1] : this._els.find(function (item) {
        return item.id === _this._idActiveNow;
      });

      if (canvas instanceof fCanvas) {
        return canvas;
      } else {
        console.warn("fCanvas: The current referenced version of the fCanvas.run function is incorrect.");
        return this._els[0];
      }
    }
    /**
     * @param {fCanvas} canvas
     * @return {void}
     */

  }, {
    key: "bind",
    value: function bind(canvas) {
      if (canvas instanceof fCanvas) {
        if (this.has(canvas.id) === false) {
          this._els.push(canvas);
        }
      } else {
        console.error("fCanvas: the parameter passed to MyElement.bind() must be a fCanvas object.");
      }
    }
    /**
     * @return {CanvasRenderingContext2D}
     */

  }, {
    key: "$context2d",
    get: function get() {
      return this.$parent.$context2d;
    }
  }, {
    key: "_toRadius",
    value: function _toRadius(value) {
      return this.$parent._toRadius(value);
    }
  }, {
    key: "_toDegress",
    value: function _toDegress(value) {
      return this.$parent._toDegress(value);
    }
  }, {
    key: "_toRgb",
    value: function _toRgb() {
      for (var _len = arguments.length, params = new Array(_len), _key = 0; _key < _len; _key++) {
        params[_key] = arguments[_key];
      }

      return this.$parent._toRgb(params);
    }
  }, {
    key: "_figureOffset",
    value: function _figureOffset(x, y, width, height) {
      return this.$parent._figureOffset(x, y, width, height);
    }
    /**
     * @param {number} angle
     * @return {number}
     */

  }, {
    key: "sin",
    value: function sin(angle) {
      return this.$parent.sin(angle);
    }
    /**
     * @param {number} sin
     * @return {number}
     */

  }, {
    key: "asin",
    value: function asin(sin) {
      return this.$parent.asin(sin);
    }
    /**
     * @param {number} angle
     * @return {number}
     */

  }, {
    key: "cos",
    value: function cos(angle) {
      return this.$parent.cos(angle);
    }
    /**
     * @param {number} cos
     * @return {number}
     */

  }, {
    key: "acos",
    value: function acos(cos) {
      return this.$parent.asin(cos);
    }
    /**
     * @param {number} angle
     * @return {number}
     */

  }, {
    key: "tan",
    value: function tan(angle) {
      return this.$parent.tan(angle);
    }
    /**
     * @param {number} tan
     * @return {number}
     */

  }, {
    key: "atan",
    value: function atan(tan) {
      return this.$parent.atan(tan);
    }
    /**
     * @param {number} y
     * @param {number} x
     * @return {number}
     */

  }, {
    key: "atan2",
    value: function atan2(y, x) {
      return this.$parent.atan2(y, x);
    }
    /**
     * @return {number | null}
     */

  }, {
    key: "mouseX",
    get: function get() {
      return this.$parent.mouseX;
    }
    /**
     * @return {number | null}
     */

  }, {
    key: "mouseY",
    get: function get() {
      return this.$parent.mouseY;
    }
    /**
     * @return {number}
     */

  }, {
    key: "windowWidth",
    get: function get() {
      return this.$parent.windowWidth;
    }
    /**
     * @return {number}
     */

  }, {
    key: "windowHeight",
    get: function get() {
      return this.$parent.windowHeight;
    }
  }, {
    key: "fill",
    value: function fill() {
      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      this.$context2d.fillStyle = this._toRgb(args);
      this.$context2d.fill();
    }
    /**
     * @param  {number} red
     * @param  {number} green
     * @param  {number} blue
     * @param  {number} alpha
     * @returns void
     */

  }, {
    key: "stroke",
    value: function stroke() {
      for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        args[_key3] = arguments[_key3];
      }

      this.$context2d.strokeStyle = this._toRgb(args);
      this.$context2d.stroke();
    }
    /**
     * @return {void}
     */

  }, {
    key: "noFill",
    value: function noFill() {
      this.fill(0, 0, 0, 0);
    }
    /**
     * @param {number} value?
     * @return {number|void}
     */

  }, {
    key: "lineWidth",
    value: function lineWidth(value) {
      if (value === undefined) {
        return this.$context2d.lineWidth;
      } else {
        this.$context2d.lineWidth = value;
      }
    }
    /**
     * @param {number} value?
     * @return {number|void}
     */

  }, {
    key: "miterLimit",
    value: function miterLimit(value) {
      if (value === undefined) {
        return this.$context2d.miterLimit;
      } else {
        if (this.lineJoin() !== "miter") {
          this.lineJoin("miter");
        }

        this.$context2d.miterLimit = value;
      }
    }
    /**
     * @param {number} x?
     * @param {number} y?
     * @return {void|{ x: number, y: number }}
     */

  }, {
    key: "shadowOffset",
    value: function shadowOffset(x, y) {
      if (arguments.length === 0) {
        return {
          x: this.$context2d.shadowOffsetX,
          y: this.$context2d.shadowOffsetY
        };
      } else {
        var _ref = [x || 0, y || 0];
        this.$context2d.shadowOffsetX = _ref[0];
        this.$context2d.shadowOffsetY = _ref[1];
      }
    }
    /**
     * @param {string} text
     * @return {number}
     */

  }, {
    key: "measureText",
    value: function measureText(text) {
      return this.$context2d.measureText(text).width;
    }
    /**
     * @return {void}
     */

  }, {
    key: "begin",
    value: function begin() {
      this.$context2d.beginPath();
    }
    /**
     * @return {void}
     */

  }, {
    key: "close",
    value: function close() {
      this.$context2d.closePath();
    }
    /**
     * @return {void}
     */

  }, {
    key: "save",
    value: function save() {
      this.$parent.save();
    }
    /**
     * @return {void}
     */

  }, {
    key: "restore",
    value: function restore() {
      this.$parent.restore();
    }
    /**
     * @param  {number} x
     * @param  {number} y
     * @param  {number} radius
     * @param  {number} astart
     * @param  {number} astop
     * @param  {boolean} reverse?
     * @returns void
     */

  }, {
    key: "arc",
    value: function arc(x, y, radius, astart, astop, reverse) {
      this.begin();
      this.$context2d.arc(x, y, radius, this._toRadius(astart) - Math.PI / 2, this._toRadius(astop) - Math.PI / 2, reverse);
      this.close();
    }
    /**
     * @param  {number} x
     * @param  {number} y
     * @param  {number} radius
     * @param  {number} astart
     * @param  {number} astop
     * @param  {boolean} reverse?
     */

  }, {
    key: "pie",
    value: function pie(x, y, radius, astart, astop, reverse) {
      this.begin();
      this.move(x, y);
      this.arc(x, y, radius, astart, astop, reverse);
      this.to(x, y);
      this.close();
    }
    /**
     * @param  {number} x1
     * @param  {number} y1
     * @param  {number} x2
     * @param  {number} y2
     * @returns void
     */

  }, {
    key: "line",
    value: function line(x1, y1, x2, y2) {
      this.move(x1, y1);
      this.to(x2, y2);
    }
    /**
     * @param  {number} x
     * @param  {number} y
     * @param  {number} radius1
     * @param  {number} radius2
     * @param  {number} astart
     * @param  {number} astop
     * @param  {number} reverse
     * @returns void
     */

  }, {
    key: "ellipse",
    value: function ellipse(x, y, radius1, radius2, astart, astop, reverse) {
      this.begin();
      this.$context2d.ellipse(x, y, radius1, radius2, this._toRadius(astart) - Math.PI / 2, this._toRadius(astop), reverse);
      this.close();
    }
    /**
     * @param  {number} x
     * @param  {number} y
     * @param  {number} radius
     * @returns void
     */

  }, {
    key: "circle",
    value: function circle(x, y, radius) {
      this.arc(x, y, radius, 0, this.$parent.angleMode() === "degress" ? 360 : Math.PI * 2);
    }
    /**
     * @param  {number} x
     * @param  {number} y
     * @returns void
     */

  }, {
    key: "point",
    value: function point(x, y) {
      this.circle(x, y, 1);
    }
    /**
     * @param  {number} x1
     * @param  {number} y1
     * @param  {number} x2
     * @param  {number} y2
     * @param  {number} x3
     * @param  {number} y3
     * @returns void
     */

  }, {
    key: "triange",
    value: function triange(x1, y1, x2, y2, x3, y3) {
      this.begin();
      this.move(x1, y1);
      this.to(x2, y2);
      this.to(x3, y3);
      this.close();
    }
    /**
     * @param  {CanvasImageSource} image
     * @param  {number} sx?
     * @param  {number} sy?
     * @param  {number} swidth?
     * @param  {number} sheight?
     * @param  {number} x
     * @param  {number} y
     * @param  {number} width
     * @param  {number} height
     * @returns void
     */

  }, {
    key: "drawImage",
    value: function drawImage(image) {
      var _this$$context2d;

      for (var _len4 = arguments.length, args = new Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
        args[_key4 - 1] = arguments[_key4];
      }

      // @ts-expect-error
      (_this$$context2d = this.$context2d).drawImage.apply(_this$$context2d, [image].concat(args));
    }
  }, {
    key: "rect",
    value: function rect(x, y, w, h, $1, $2, $3, $4) {
      this.begin();

      var _this$_figureOffset = this._figureOffset(x, y, w, h);

      var _this$_figureOffset2 = _slicedToArray(_this$_figureOffset, 2);

      x = _this$_figureOffset2[0];
      y = _this$_figureOffset2[1];

      if (arguments.length < 5) {
        this.$context2d.rect(x, y, w, h);
      } else {
        var fontSize = this.$parent.fontSize();
        var arc = [AutoToPx($1, w, fontSize), AutoToPx($2, h, fontSize), AutoToPx($3, w, fontSize), AutoToPx($4, h, fontSize)];
        this.move(x, y);
        this.arcTo(x + w, y, x + w, y + h - arc[1], arc[1]);
        this.arcTo(x + w, y + h, x + w - arc[2], y + h, arc[2]);
        this.arcTo(x, y + h, x, y + h - arc[3], arc[3]);
        this.arcTo(x, y, x + w - arc[0], y, arc[0]);
      }

      this.close();
    }
    /**
     * @param  {number} cpx
     * @param  {number} cpy
     * @param  {number} x
     * @param  {number} y
     */

  }, {
    key: "quadratic",
    value: function quadratic(cpx, cpy, x, y) {
      this.$context2d.quadraticCurveTo(cpx, cpy, x, y);
    }
    /**
     * @param {number} cp1x
     * @param {number} cp1y
     * @param {number} cp2x
     * @param {number} cp2y
     * @param {number} x
     * @param {number} y
     * @return {void}
     */

  }, {
    key: "bezier",
    value: function bezier(cp1x, cp1y, cp2x, cp2y, x, y) {
      this.$context2d.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y);
    }
    /**
     * @param {number} x
     * @param {number} y
     * @return {void}
     */

  }, {
    key: "move",
    value: function move(x, y) {
      this.$context2d.moveTo(x, y);
    }
    /**
     * @param {number} x
     * @param {number} y
     * @return {void}
     */

  }, {
    key: "to",
    value: function to(x, y) {
      this.$context2d.lineTo(x, y);
    }
    /**
     * @param {string} text
     * @param {number} x
     * @param {number} y
     * @param {number} maxWidth?
     * @return {void}
     */

  }, {
    key: "fillText",
    value: function fillText(text, x, y, maxWidth) {
      this.$context2d.fillText(text, x, y, maxWidth);
    }
    /**
     * @param {string} text
     * @param {number} x
     * @param {number} y
     * @param {number} maxWidth?
     * @return {void}
     */

  }, {
    key: "strokeText",
    value: function strokeText(text, x, y, maxWidth) {
      this.$context2d.strokeText(text, x, y, maxWidth);
    }
    /**
     * @param {number} x
     * @param {number} y
     * @param {number} width
     * @param {number} height
     * @return {void}
     */

  }, {
    key: "fillRect",
    value: function fillRect(x, y, width, height) {
      this.$context2d.fillRect(x, y, width, height);
    }
    /**
     * @param {number} x
     * @param {number} y
     * @param {number} width
     * @param {number} height
     * @return {void}
     */

  }, {
    key: "strokeRect",
    value: function strokeRect(x, y, width, height) {
      this.$context2d.strokeRect(x, y, width, height);
    }
    /**
     * @param {number} value?
     * @return {any}
     */

  }, {
    key: "lineDash",
    value: function lineDash(value) {
      if (value === undefined) {
        return this.$context2d.lineDashOffset;
      }

      this.$context2d.lineDashOffset = value;
    }
    /**
     * @param {number} x1
     * @param {number} y1
     * @param {number} x2
     * @param {number} y2
     * @param {number} radius
     * @return {void}
     */

  }, {
    key: "arcTo",
    value: function arcTo(x1, y1, x2, y2, radius) {
      this.$context2d.arcTo(x1, y1, x2, y2, radius);
    }
    /**
     * @param {number} x
     * @param {number} y
     * @return {boolean}
     */

  }, {
    key: "isPoint",
    value: function isPoint(x, y) {
      return this.$context2d.isPointInPath(x, y);
    }
  }, {
    key: "createImageData",
    value: function createImageData(width, height) {
      return height ? this.$context2d.createImageData(width, height) : this.$context2d.createImageData(width);
    }
    /**
     * @param {number} x
     * @param {number} y
     * @param {number} width
     * @param {number} height
     * @return {ImageData}
     */

  }, {
    key: "getImageData",
    value: function getImageData(x, y, width, height) {
      return this.$context2d.getImageData(x, y, width, height);
    }
    /**
     * @param {ImageData} imageData
     * @param {number} x
     * @param {number} y
     * @param {number} xs?
     * @param {number} ys?
     * @param {number} width?
     * @param {number} height?
     * @return {void}
     */

  }, {
    key: "putImageData",
    value: function putImageData(imageData, x, y, xs, ys, width, height) {
      if (arguments.length === 7) {
        this.$context2d.putImageData(imageData, x, y, xs, ys, width, height);
      } else {
        this.$context2d.putImageData(imageData, x, y);
      }
    }
    /**
     * @param {CanvasImageSource} image
     * @param {"repeat"|"repeat-x"|"repeat-y"|"no-repeat"} direction
     * @return {CanvasPattern | null}
     */

  }, {
    key: "createPattern",
    value: function createPattern(image, direction) {
      return this.$context2d.createPattern(image, direction);
    }
    /**
     * @param {number} x1
     * @param {number} y1
     * @param {number} r1
     * @param {number} x2
     * @param {number} y2
     * @param {number} r2
     * @return {CanvasGradient}
     */

  }, {
    key: "createRadialGradient",
    value: function createRadialGradient(x1, y1, r1, x2, y2, r2) {
      return this.$context2d.createRadialGradient(x1, y1, r1, x2, y2, r2);
    }
    /**
     * @param {number} x
     * @param {number} y
     * @param {number} width
     * @param {number} height
     * @return {CanvasGradient}
     */

  }, {
    key: "createLinearGradient",
    value: function createLinearGradient(x, y, width, height) {
      return this.$context2d.createLinearGradient(x, y, width, height);
    }
    /**
     * @param {"bevel"|"round"|"miter"} type?
     * @return {any}
     */

  }, {
    key: "lineJoin",
    value: function lineJoin(type) {
      if (type !== undefined) {
        this.$context2d.lineJoin = type;
      } else {
        return this.$context2d.lineJoin;
      }
    }
    /**
     * @param {"butt"|"round"|"square"} value?
     * @return {any}
     */

  }, {
    key: "lineCap",
    value: function lineCap(value) {
      if (value !== undefined) {
        this.$context2d.lineCap = value;
      } else {
        return this.$context2d.lineCap;
      }
    }
    /**
     * @param {number} opacity?
     * @return {any}
     */

  }, {
    key: "shadowBlur",
    value: function shadowBlur(opacity) {
      if (opacity === undefined) {
        return this.$context2d.shadowBlur;
      }

      this.$context2d.shadowBlur = opacity;
    }
    /**
     * @param {ParamsToRgb} ...args
     * @return {void}
     */

  }, {
    key: "shadowColor",
    value: function shadowColor() {
      for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
        args[_key5] = arguments[_key5];
      }

      this.$context2d.shadowColor = this._toRgb(args);
    }
  }]);

  return MyElement;
}();

var EAnimate = /*#__PURE__*/function (_MyElement) {
  _inherits(EAnimate, _MyElement);

  var _super = _createSuper(EAnimate);

  /**
   * @param {AnimateConfig} animate?
   * @return {any}
   */
  function EAnimate(animate) {
    var _this2;

    _classCallCheck(this, EAnimate);

    _this2 = _super.call(this);
    _this2.__animate = new Animate();

    if (animate) {
      _this2.__animate.config(animate);
    }

    return _this2;
  }
  /**
   * @return {Animate}
   */


  _createClass(EAnimate, [{
    key: "animate",
    get: function get() {
      return this.__animate;
    }
    /**
     * @return {Emitter}
     */

  }, {
    key: "$",
    get: function get() {
      return this.animate.$;
    }
    /**
     * @return {boolean}
     */

  }, {
    key: "running",
    get: function get() {
      return this.animate.running;
    }
    /**
     * @return {boolean}
     */

  }, {
    key: "done",
    get: function get() {
      return this.animate.done;
    }
    /**
     * @return {number}
     */

  }, {
    key: "xFrom",
    get: function get() {
      return this.animate.xFrom;
    }
    /**
     * @return {number}
     */

  }, {
    key: "yFrom",
    get: function get() {
      return this.animate.yFrom;
    }
    /**
     * @return {number}
     */

  }, {
    key: "zFrom",
    get: function get() {
      return this.animate.zFrom;
    }
    /**
     * @return {number}
     */

  }, {
    key: "xTo",
    get: function get() {
      return this.animate.xTo;
    }
    /**
     * @return {number}
     */

  }, {
    key: "yTo",
    get: function get() {
      return this.animate.yTo;
    }
    /**
     * @return {number}
     */

  }, {
    key: "zTo",
    get: function get() {
      return this.animate.zTo;
    }
    /**
     * @return {number}
     */

  }, {
    key: "x",
    get: function get() {
      return this.animate.x;
    }
    /**
     * @return {number}
     */

  }, {
    key: "y",
    get: function get() {
      return this.animate.y;
    }
    /**
     * @return {number}
     */

  }, {
    key: "z",
    get: function get() {
      return this.animate.z;
    }
    /**
     * @return {number}
     */

  }, {
    key: "frames",
    get: function get() {
      return this.animate.frames;
    }
    /**
     * @return {number}
     */

  }, {
    key: "frame",
    get: function get() {
      return this.animate.frame;
    }
    /**
     * @param {number} value
     * @return {any}
     */
    ,
    set: function set(value) {
      this.animate.frame = value;
    }
    /**
     * @param {AnimateConfig} animate
     * @return {void}
     */

  }, {
    key: "config",
    value: function config(animate) {
      this.animate.config(animate);
    }
    /**
     * @param {number} x?
     * @param {number} y?
     * @param {number} z?
     * @return {void}
     */

  }, {
    key: "set",
    value: function set(x, y, z) {
      this.animate.set(x, y, z);
    }
    /**
     * @param {number} x?
     * @param {number} y?
     * @param {number} z?
     * @return {void}
     */

  }, {
    key: "moveTo",
    value: function moveTo(x, y, z) {
      this.animate.move(x, y, z);
    }
    /**
     * @param {number} x?
     * @param {number} y?
     * @param {number} z?
     * @return {Promise<void>}
     */

  }, {
    key: "moveAsync",
    value: function moveAsync(x, y, z) {
      return this.animate.moveAsync(x, y, z);
    }
    /**
     * @param {number} x?
     * @param {number} y?
     * @param {number} z?
     * @return {void}
     */

  }, {
    key: "moveImmediate",
    value: function moveImmediate(x, y, z) {
      this.animate.moveImmediate(x, y, z);
    }
    /**
     * @return {void}
     */

  }, {
    key: "addFrame",
    value: function addFrame() {
      this.animate.addFrame();
    }
    /**
     * @param {AnimateType} type
     * @return {void}
     */

  }, {
    key: "setType",
    value: function setType(type) {
      this.animate.setType(type);
    }
    /**
     * @param {number} time
     * @return {void}
     */

  }, {
    key: "setTime",
    value: function setTime(time) {
      this.animate.setTime(time);
    }
  }]);

  return EAnimate;
}(MyElement);

var RectElement = /*#__PURE__*/function (_MyElement2) {
  _inherits(RectElement, _MyElement2);

  var _super2 = _createSuper(RectElement);

  /**
   * @param {number} x
   * @param {number} y
   * @param {number} width
   * @param {number} height
   * @return {any}
   */
  function RectElement(x, y, width, height) {
    var _this3;

    _classCallCheck(this, RectElement);

    _this3 = _super2.call(this);
    _this3.type = "rect";
    _this3.x = 0;
    _this3.y = 0;
    _this3.width = 0;
    _this3.height = 0;
    var _ref2 = [x || 0, y || 0, width || 0, height || 0];
    _this3.x = _ref2[0];
    _this3.y = _ref2[1];
    _this3.width = _ref2[2];
    _this3.height = _ref2[3];
    return _this3;
  }
  /**
   * @return {boolean}
   */


  _createClass(RectElement, [{
    key: "interact",
    get: function get() {
      return RectImpactPoint(this, this.mouseX, this.mouseY);
    }
  }]);

  return RectElement;
}(MyElement);

var CircleElement = /*#__PURE__*/function (_MyElement3) {
  _inherits(CircleElement, _MyElement3);

  var _super3 = _createSuper(CircleElement);

  /**
   * Describe your function
   * @param {number} x
   * @param {number} y
   * @param {number} radius
   * @return {any}
   */
  function CircleElement(x, y, radius) {
    var _this4;

    _classCallCheck(this, CircleElement);

    _this4 = _super3.call(this);
    _this4.type = "circle";
    _this4.x = 0;
    _this4.y = 0;
    _this4.radius = 0;
    var _ref3 = [x || 0, y || 0, radius || 0];
    _this4.x = _ref3[0];
    _this4.y = _ref3[1];
    _this4.radius = _ref3[2];
    return _this4;
  }
  /**
   * @return {boolean}
   */


  _createClass(CircleElement, [{
    key: "interact",
    get: function get() {
      return CircleImpactPoint(this, this.mouseX, this.mouseY);
    }
  }]);

  return CircleElement;
}(MyElement);

var fCanvas = /*#__PURE__*/function () {
  /**
   * @param {HTMLCanvasElement} element?
   * @return {any}
   */
  function fCanvas(element) {
    var _this5 = this;

    _classCallCheck(this, fCanvas);

    this._ENV = {
      angleMode: "degress",
      rectAlign: "left",
      rectBaseline: "top",
      colorMode: "rgb",
      rotate: 0,
      clear: true,
      loop: true
    };
    this._id = fCanvas.count++;
    this._el = document.createElement("canvas");
    this._context2dCaching = null;
    this._stamentReady = new Stament();
    this._existsPreload = false;
    this.__translate = {
      x: 0,
      y: 0,
      sumX: 0,
      sumY: 0
    };
    this.__scale = {
      x: 0,
      y: 0,
      sumX: 0,
      sumY: 0
    };
    this.__idFrame = null;
    this.preventTouch = false;
    this.stopTouch = false;
    this.touches = [];
    this.changedTouches = [];

    var handlerEvent = function handlerEvent(event) {
      try {
        if (event.type !== "mouseout") {
          _this5.touches = getTouchInfo(_this5.$el, event.touches || [event]);
          _this5.changedTouches = getTouchInfo(_this5.$el, event.changedTouches || [event]);
        } else {
          _this5.touches = [];
        }

        _this5.preventTouch && event.preventDefault();
        _this5.stopTouch && event.stopPropagation();
      } catch (e) {// throw e;
      }
    };

    if (element instanceof HTMLCanvasElement) {
      this._el = element;
    }

    this.$el.addEventListener(isMobile() ? "touchstart" : "mouseover", handlerEvent);
    this.$el.addEventListener(isMobile() ? "touchmove" : "mousemove", handlerEvent);
    this.$el.addEventListener(isMobile() ? "touchend" : "mouseout", handlerEvent);
  }
  /**
   * @return {number | null}
   */


  _createClass(fCanvas, [{
    key: "mouseX",
    get: function get() {
      var _this$touches$;

      return ((_this$touches$ = this.touches[0]) === null || _this$touches$ === void 0 ? void 0 : _this$touches$.x) || null;
    }
    /**
     * @return {number | null}
     */

  }, {
    key: "mouseY",
    get: function get() {
      var _this$touches$2;

      return ((_this$touches$2 = this.touches[0]) === null || _this$touches$2 === void 0 ? void 0 : _this$touches$2.y) || null;
    }
    /**
     * @return {boolean}
     */

  }, {
    key: "interact",
    get: function get() {
      return this.touches.length > 0;
    }
    /**
     * @return {number}
     */

  }, {
    key: "id",
    get: function get() {
      return this._id;
    }
    /**
     * @return {HTMLCanvasElement}
     */

  }, {
    key: "$el",
    get: function get() {
      return this._el;
    }
    /**
     * @return {CanvasRenderingContext2D}
     */

  }, {
    key: "$context2d",
    get: function get() {
      if (this._context2dCaching === null) {
        this._context2dCaching = this.$el.getContext("2d");
      }

      return this._context2dCaching;
    }
    /**
     * @param {HTMLElement=document.body} parent
     * @return {any}
     */

  }, {
    key: "append",
    value: function append() {
      var parent = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document.body;

      if (parent.contains(this.$el) === false) {
        parent.appendChild(this.$el);
      }
    }
    /**
     * @return {void}
     */

  }, {
    key: "noClear",
    value: function noClear() {
      this._ENV.clear = false;
    }
    /**
     * @return {boolean}
     */

  }, {
    key: "acceptClear",
    get: function get() {
      return this._ENV.clear;
    }
    /**
     * @param {LikeMyElement} element
     * @return {void}
     */

  }, {
    key: "run",
    value: function run(element) {
      element._run(this);
    }
    /**
     * @return {number}
     */

  }, {
    key: "width",
    get: function get() {
      return this.$el.width;
    }
    /**
     * @param {number} value
     * @return {any}
     */
    ,
    set: function set(value) {
      this.$el.width = value;
    }
    /**
     * @return {number}
     */

  }, {
    key: "height",
    get: function get() {
      return this.$el.height;
    }
    /**
     * @param {number} value
     * @return {any}
     */
    ,
    set: function set(value) {
      this.$el.height = value;
    }
    /**
     * @return {number}
     */

  }, {
    key: "windowWidth",
    get: function get() {
      return windowSize.windowWidth.get();
    }
    /**
     * @return {number}
     */

  }, {
    key: "windowHeight",
    get: function get() {
      return windowSize.windowHeight.get();
    }
    /**
     * @return {void}
     */

  }, {
    key: "save",
    value: function save() {
      this.$context2d.save();
    }
    /**
     * @return {void}
     */

  }, {
    key: "restore",
    value: function restore() {
      this.$context2d.restore();
    }
  }, {
    key: "_toRadius",
    value: function _toRadius(value) {
      return this._ENV.angleMode === "degress" ? value * Math.PI / 180 : value;
    }
  }, {
    key: "_toDegress",
    value: function _toDegress(value) {
      return this._ENV.angleMode === "radial" ? value * 180 / Math.PI : value;
    }
  }, {
    key: "_toRgb",
    value: function _toRgb(_ref4) {
      var _ref5 = _slicedToArray(_ref4, 4),
          _ref5$ = _ref5[0],
          red = _ref5$ === void 0 ? 0 : _ref5$,
          _ref5$2 = _ref5[1],
          green = _ref5$2 === void 0 ? red : _ref5$2,
          _ref5$3 = _ref5[2],
          blue = _ref5$3 === void 0 ? green : _ref5$3,
          _ref5$4 = _ref5[3],
          alpha = _ref5$4 === void 0 ? 1 : _ref5$4;

      if (Array.isArray(red)) {
        return this._toRgb(red);
      } else {
        if (typeof red === "string") {
          return red;
        } else {
          var after = this._ENV.colorMode.match(/hsl|hsb/i) ? "%" : "";
          return "".concat(this._ENV.colorMode, "a(").concat([red, green + after, blue + after, alpha].join(","), ")");
        }
      }
    }
  }, {
    key: "_figureOffset",
    value: function _figureOffset(x, y, width, height) {
      switch (this._ENV.rectAlign) {
        case "center":
          x -= width / 2;
          break;

        case "right":
          x -= width;
          break;
      }

      switch (this._ENV.rectBaseline) {
        case "middle":
          y -= height / 2;
          break;

        case "bottom":
          y -= height;
          break;
      }

      return [x, y];
    }
    /**
     * @param {AngleType} value?
     * @return {any}
     */

  }, {
    key: "angleMode",
    value: function angleMode(value) {
      if (value === undefined) {
        return this._ENV.angleMode;
      }

      this._ENV.angleMode = value;
    }
    /**
     * @param {AlignType} value?
     * @return {any}
     */

  }, {
    key: "rectAlign",
    value: function rectAlign(value) {
      if (value === undefined) {
        return this._ENV.rectAlign;
      }

      this._ENV.rectAlign = value;
    }
    /**
     * @param {ColorType} value?
     * @return {any}
     */

  }, {
    key: "colorMode",
    value: function colorMode(value) {
      if (value === undefined) {
        return this._ENV.colorMode;
      }

      this._ENV.colorMode = value;
    }
    /**
     * @param {BaselineType} value?
     * @return {any}
     */

  }, {
    key: "rectBaseline",
    value: function rectBaseline(value) {
      if (value === undefined) {
        return this._ENV.rectBaseline;
      }

      this._ENV.rectBaseline = value;
    }
    /**
     * @param {number} value?
     * @return {any}
     */

  }, {
    key: "fontSize",
    value: function fontSize(value) {
      var _fontToArray = fontToArray(this.font()),
          size = _fontToArray.size,
          weight = _fontToArray.weight,
          family = _fontToArray.family;

      if (value === undefined) {
        return size;
      } else {
        value = AutoToPx(value, size, size);
        this.font([weight, "".concat(value, "px"), family].join(" "));
      }
    }
    /**
     * @param {string} value?
     * @return {any}
     */

  }, {
    key: "fontFamily",
    value: function fontFamily(value) {
      var _fontToArray2 = fontToArray(this.font()),
          size = _fontToArray2.size,
          weight = _fontToArray2.weight,
          family = _fontToArray2.family;

      if (value === undefined) {
        return family;
      } else {
        this.font([weight, "".concat(size, "px"), value].join(" "));
      }
    }
    /**
     * @param {string} value?
     * @return {any}
     */

  }, {
    key: "fontWeight",
    value: function fontWeight(value) {
      var _fontToArray3 = fontToArray(this.font()),
          size = _fontToArray3.size,
          weight = _fontToArray3.weight,
          family = _fontToArray3.family;

      if (value === undefined) {
        return weight;
      } else {
        this.font([value, "".concat(size, "px"), family].join(" "));
      }
    }
    /**
     * @param {number=0} x
     * @param {number=0} y
     * @param {number=this.width} w
     * @param {number=this.height} h
     * @return {void}
     */

  }, {
    key: "clear",
    value: function clear() {
      var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      var w = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this.width;
      var h = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : this.height;
      this.$context2d.clearRect(x, y, w, h);
    }
    /**
     * @param {ParamsToRgb} ...params
     * @return {void}
     */

  }, {
    key: "background",
    value: function background() {
      for (var _len6 = arguments.length, params = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
        params[_key6] = arguments[_key6];
      }

      if (_typeof(params[0]) === "object") {
        this.$context2d.drawImage(params[0], 0, 0, this.width, this.height);
      } else {
        this.$context2d.fillStyle = this._toRgb(params);
        this.$context2d.fill();
        this.$context2d.fillRect(0, 0, this.width, this.height);
      }
    }
    /**
     * @param {any} type="image/png"
     * @param {number} scale?
     * @return {string}
     */

  }, {
    key: "toDataURL",
    value: function toDataURL() {
      var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "image/png";
      var scale = arguments.length > 1 ? arguments[1] : undefined;
      return this.$el.toDataURL(type, scale);
    }
    /**
     * @param {number} value?
     * @return {any}
     */

  }, {
    key: "rotate",
    value: function rotate(value) {
      if (value === undefined) {
        return this._ENV.rotate;
      } else {
        this.$context2d.rotate(this._ENV.rotate = this._toRadius(value));
      }
    }
    /**
     * @return {void}
     */

  }, {
    key: "resetTransform",
    value: function resetTransform() {
      this.setTransform(1, 0, 0, 1, 0, 0);
    }
    /**
     * @param {Function} callback
     * @return {Promise<void>}
     */

  }, {
    key: "preload",
    value: function () {
      var _preload = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee(callback) {
        return regenerator.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                this._existsPreload = true;
                _context.next = 3;
                return callback();

              case 3:
                this._stamentReady.emit("preloaded");

              case 4:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function preload(_x) {
        return _preload.apply(this, arguments);
      }

      return preload;
    }()
    /**
     * @param {Function} callback
     * @return {Promise<void>}
     */

  }, {
    key: "setup",
    value: function () {
      var _setup2 = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee3(callback) {
        var _this6 = this;

        return regenerator.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (!this._existsPreload) {
                  _context3.next = 4;
                  break;
                }

                this._stamentReady.on("preloaded", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee2() {
                  return regenerator.wrap(function _callee2$(_context2) {
                    while (1) {
                      switch (_context2.prev = _context2.next) {
                        case 0:
                          _context2.next = 2;
                          return _setup(callback);

                        case 2:
                          _this6._stamentReady.emit("setuped");

                        case 3:
                        case "end":
                          return _context2.stop();
                      }
                    }
                  }, _callee2);
                })));

                _context3.next = 7;
                break;

              case 4:
                _context3.next = 6;
                return _setup(callback);

              case 6:
                this._stamentReady.emit("setuped");

              case 7:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function setup(_x2) {
        return _setup2.apply(this, arguments);
      }

      return setup;
    }()
    /**
     * @param {Function} callback
     * @return {void}
     */

  }, {
    key: "draw",
    value: function draw(callback) {
      var _this7 = this;

      this._stamentReady.on("setuped", function () {
        _draw(callback, _this7);
      });
    }
    /**
     * @param {string} value?
     * @return {any}
     */

  }, {
    key: "font",
    value: function font(value) {
      if (value === undefined) {
        return this.$context2d.font;
      }

      this.$context2d.font = value;
    }
    /**
     * @param {TextAlignType} value?
     * @return {any}
     */

  }, {
    key: "textAlign",
    value: function textAlign(value) {
      if (value === undefined) {
        return this.$context2d.textAlign;
      }

      this.$context2d.textAlign = value;
    }
    /**
     * @param {TextBaselineType} value?
     * @return {any}
     */

  }, {
    key: "textBaseline",
    value: function textBaseline(value) {
      if (value === undefined) {
        return this.$context2d.textBaseline;
      }

      this.$context2d.textBaseline = value;
    }
    /**
     * @param {GlobalCompositeOperationType} value?
     * @return {any}
     */

  }, {
    key: "globalOperation",
    value: function globalOperation(value) {
      if (value === undefined) {
        return this.$context2d.globalCompositeOperation;
      }

      this.$context2d.globalCompositeOperation = value;
    }
    /**
     * @param {number} x?
     * @param {number} y?
     * @return {any}
     */

  }, {
    key: "translate",
    value: function translate(x, y) {
      if (arguments.length === 0) {
        return {
          x: this.__translate.x,
          y: this.__translate.y
        };
      }

      this.$context2d.translate(x, y);
      this.__translate.sumX += x || 0;
      this.__translate.sumY += y || 0;
    }
    /**
     * @return {void}
     */

  }, {
    key: "resetTranslate",
    value: function resetTranslate() {
      this.$context2d.translate(-this.__translate.sumX, -this.__translate.sumY);
    }
    /**
     * @param {number} x?
     * @param {number} y?
     * @return {any}
     */

  }, {
    key: "scale",
    value: function scale(x, y) {
      if (arguments.length === 0) {
        return {
          x: this.__scale.x,
          y: this.__scale.y
        };
      }

      this.$context2d.scale(x, y);
      this.__scale.sumX += x || 0;
      this.__scale.sumY += y || 0;
    }
    /**
     * @return {void}
     */

  }, {
    key: "resetScale",
    value: function resetScale() {
      this.$context2d.translate(-this.__translate.sumX, -this.__translate.sumY);
    }
    /**
     * @param {any} fillRule?
     * @param {any} path?
     * @return {void}
     */

  }, {
    key: "clip",
    value: function clip(fillRule, path) {
      if (path === undefined) {
        this.$context2d.clip(fillRule);
      }

      this.$context2d.clip(path, fillRule);
    }
    /**
     * @param {number|DOMMatrix} m11?
     * @param {number} m12?
     * @param {number} m21?
     * @param {number} m22?
     * @param {number} dx?
     * @param {number} dy?
     * @return {any}
     */

  }, {
    key: "transform",
    value: function transform(m11, m12, m21, m22, dx, dy) {
      if (arguments.length === 0) {
        return this.$context2d.getTransform();
      }

      if (m11 instanceof DOMMatrix) {
        var _m11$a = m11.a,
            a = _m11$a === void 0 ? 1 : _m11$a,
            _m11$b = m11.b,
            b = _m11$b === void 0 ? 0 : _m11$b,
            _m11$c = m11.c,
            c = _m11$c === void 0 ? 0 : _m11$c,
            _m11$d = m11.d,
            d = _m11$d === void 0 ? 1 : _m11$d,
            _m11$e = m11.e,
            e = _m11$e === void 0 ? 0 : _m11$e,
            _m11$f = m11.f,
            f = _m11$f === void 0 ? 0 : _m11$f;
        this.$context2d.transform(a, b, c, d, e, f);
      } else {
        this.$context2d.transform(m11, m12, m21, m22, dx, dy);
      }
    }
    /**
     * @param {number|DOMMatrix} m11
     * @param {number} m12?
     * @param {number} m21?
     * @param {number} m22?
     * @param {number} dx?
     * @param {number} dy?
     * @return {void}
     */

  }, {
    key: "setTransform",
    value: function setTransform(m11, m12, m21, m22, dx, dy) {
      if (m11 instanceof DOMMatrix) {
        var _m11$a2 = m11.a,
            a = _m11$a2 === void 0 ? 1 : _m11$a2,
            _m11$b2 = m11.b,
            b = _m11$b2 === void 0 ? 0 : _m11$b2,
            _m11$c2 = m11.c,
            c = _m11$c2 === void 0 ? 0 : _m11$c2,
            _m11$d2 = m11.d,
            d = _m11$d2 === void 0 ? 1 : _m11$d2,
            _m11$e2 = m11.e,
            e = _m11$e2 === void 0 ? 0 : _m11$e2,
            _m11$f2 = m11.f,
            f = _m11$f2 === void 0 ? 0 : _m11$f2;
        this.$context2d.setTransform(a, b, c, d, e, f);
      } else {
        this.$context2d.setTransform(m11, m12, m21, m22, dx, dy);
      }
    }
    /**
     * @param {number} angle
     * @return {number}
     */

  }, {
    key: "sin",
    value: function sin(angle) {
      return Math.sin(this._toRadius(angle));
    }
    /**
     * @param {number} sin
     * @return {number}
     */

  }, {
    key: "asin",
    value: function asin(sin) {
      return this._toDegress(Math.asin(sin));
    }
    /**
     * @param {number} angle
     * @return {number}
     */

  }, {
    key: "cos",
    value: function cos(angle) {
      return Math.cos(this._toRadius(angle));
    }
    /**
     * @param {number} cos
     * @return {number}
     */

  }, {
    key: "acos",
    value: function acos(cos) {
      return this._toDegress(Math.acos(cos));
    }
    /**
     * @param {number} angle
     * @return {number}
     */

  }, {
    key: "tan",
    value: function tan(angle) {
      return Math.tan(this._toRadius(angle));
    }
    /**
     * @param {number} tan
     * @return {number}
     */

  }, {
    key: "atan",
    value: function atan(tan) {
      return this._toDegress(Math.atan(tan));
    }
    /**
     * @param {number} y
     * @param {number} x
     * @return {number}
     */

  }, {
    key: "atan2",
    value: function atan2(y, x) {
      return this._toDegress(Math.atan2(y, x));
    }
    /**
     * @return {void}
     */

  }, {
    key: "cursor",
    value: function cursor() {
      this.$el.style.cursor = "auto";
    }
    /**
     * @return {void}
     */

  }, {
    key: "noCursor",
    value: function noCursor() {
      this.$el.style.cursor = "none";
    }
    /**
     * @return {void}
     */

  }, {
    key: "loop",
    value: function loop() {
      this._ENV.loop = true;

      this._stamentReady.emit("setuped");
    }
    /**
     * @return {void}
     */

  }, {
    key: "noLoop",
    value: function noLoop() {
      this._ENV.loop = false;

      if (this.__idFrame) {
        (cancelAnimationFrame || webkitCancelAnimationFrame || clearTimeout)(this.__idFrame);
      }
    }
    /**
     * @return {boolean}
     */

  }, {
    key: "acceptLoop",
    get: function get() {
      return this._ENV.loop;
    }
    /**
     * @param {CallbackEvent} callback
     * @return {noop}
     */

  }, {
    key: "keyPressed",
    value: function keyPressed(callback) {
      var _this8 = this;

      this.$el.addEventListener("keypress", callback);
      return function () {
        _this8.$el.removeEventListener("keypress", callback);
      };
    }
    /**
     * @param {CallbackEvent} callback
     * @return {noop}
     */

  }, {
    key: "mouseIn",
    value: function mouseIn(callback) {
      var _this9 = this;

      this.$el.addEventListener("mouseover", callback);
      return function () {
        _this9.$el.removeEventListener("mouseover", callback);
      };
    }
    /**
     * @param {CallbackEvent} callback
     * @return {noop}
     */

  }, {
    key: "mouseOut",
    value: function mouseOut(callback) {
      var _this10 = this;

      this.$el.addEventListener("mouseout", callback);
      return function () {
        _this10.$el.removeEventListener("mouseout", callback);
      };
    }
    /**
     * @param {CallbackEvent} callback
     * @return {noop}
     */

  }, {
    key: "mouseDowned",
    value: function mouseDowned(callback) {
      var _this11 = this;

      this.$el.addEventListener("mousedown", callback);
      return function () {
        _this11.$el.removeEventListener("mousedown", callback);
      };
    }
    /**
     * @param {CallbackEvent} callback
     * @return {noop}
     */

  }, {
    key: "touchStarted",
    value: function touchStarted(callback) {
      var _this12 = this;

      this.$el.addEventListener("touchstart", callback);
      return function () {
        _this12.$el.removeEventListener("touchstart", callback);
      };
    }
    /**
     * @param {CallbackEvent} callback
     * @return {noop}
     */

  }, {
    key: "touchMoved",
    value: function touchMoved(callback) {
      var _this13 = this;

      this.$el.addEventListener("touchmove", callback);
      return function () {
        _this13.$el.removeEventListener("touchmove", callback);
      };
    }
    /**
     * @param {CallbackEvent} callback
     * @return {noop}
     */

  }, {
    key: "touchEned",
    value: function touchEned(callback) {
      var _this14 = this;

      this.$el.addEventListener("touchend", callback);
      return function () {
        _this14.$el.removeEventListener("touchend", callback);
      };
    }
    /**
     * @param {CallbackEvent} callback
     * @return {noop}
     */

  }, {
    key: "mouseMoved",
    value: function mouseMoved(callback) {
      var _this15 = this;

      this.$el.addEventListener("mousemove", callback);
      return function () {
        _this15.$el.removeEventListener("mousemove", callback);
      };
    }
    /**
     * @param {CallbackEvent} callback
     * @return {noop}
     */

  }, {
    key: "mouseUped",
    value: function mouseUped(callback) {
      var _this16 = this;

      this.$el.addEventListener("mouseup", callback);
      return function () {
        _this16.$el.removeEventListener("mouseup", callback);
      };
    }
    /**
     * @param {CallbackEvent} callback
     * @return {noop}
     */

  }, {
    key: "mouseClicked",
    value: function mouseClicked(callback) {
      var _this17 = this;

      this.$el.addEventListener("click", callback);
      return function () {
        _this17.$el.removeEventListener("click", callback);
      };
    }
  }]);

  return fCanvas;
}();

fCanvas.Element = MyElement;
fCanvas.EAnimate = EAnimate;
fCanvas.RectElement = RectElement;
fCanvas.CircleElement = CircleElement;
fCanvas.count = 0;
var noopFCanvas = new fCanvas();

function bindEvent(name, callback, element) {
  element.addEventListener(name, callback);
  return function () {
    element.removeEventListener(name, callback);
  };
}
var inited = false;
var emitter = new Emitter();
/**
 * @param {any} document.readyState==="complete"
 * @return {any}
 */

function _setup(_x3) {
  return _setup3.apply(this, arguments);
}
/**
 * @param {Function} callback
 * @param {fCanvas} canvas?
 * @return {void}
 */


function _setup3() {
  _setup3 = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee4(callback) {
    var ret;
    return regenerator.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            if (!(document.readyState === "complete")) {
              _context4.next = 9;
              break;
            }

            //// readyState === "complete"
            inited = true;
            emitter.emit("load");
            ret = callback();

            if (!(ret && "length" in ret)) {
              _context4.next = 7;
              break;
            }

            _context4.next = 7;
            return ret;

          case 7:
            _context4.next = 11;
            break;

          case 9:
            _context4.next = 11;
            return new Promise(function (resolve, reject) {
              function load() {
                document.removeEventListener("DOMContentLoaded", load);
                window.removeEventListener("load", load);
                inited = true;
                emitter.emit("load");
                callback();
                resolve();
              }

              document.addEventListener("DOMContentLoaded", load);
              window.addEventListener("load", load);
            });

          case 11:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));
  return _setup3.apply(this, arguments);
}

function _draw(callback, canvas) {
  if (inited) {
    if (canvas && canvas.acceptClear === true) {
      canvas.clear();
    }

    callback();

    if (!canvas || canvas.acceptLoop === true) {
      requestAnimationFrame(function () {
        return _draw(callback, canvas);
      });
    }
  } else {
    emitter.once("load", function () {
      _draw(callback, canvas);
    });
  }
}
function keyPressed(callback) {
  var element = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : window;
  return bindEvent("keypress", callback, element);
}
/**
 * @param {CallbackEvent} callback
 * @param {Window|HTMLElement=window} element
 * @return {{ (): void }}
 */

function changeSize(callback) {
  var element = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : window;
  return bindEvent("resize", callback, element);
}
/**
 * @param {CallbackEvent} callback
 * @param {Window|HTMLElement=window} element
 * @return {{ (): void }}
 */

function mouseWheel(callback) {
  var element = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : window;
  return bindEvent("wheel", callback, element);
}
/**
 * @param {CallbackEvent} callback
 * @param {Window|HTMLElement=window} element
 * @return {{ (): void }}
 */

function mousePressed(callback) {
  var element = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : window;
  return bindEvent("mousedown", callback, element);
}
/**
 * @param {CallbackEvent} callback
 * @param {Window|HTMLElement=window} element
 * @return {{ (): void }}
 */

function mouseClicked(callback) {
  var element = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : window;
  return bindEvent("click", callback, element);
}
/**
 * @param {CallbackEvent} callback
 * @param {Window|HTMLElement=window} element
 * @return {{ (): void }}
 */

function mouseMoved(callback) {
  var element = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : window;
  return bindEvent("mousemove", callback, element);
}
/**
 * @param {CallbackEvent} callback
 * @param {Window|HTMLElement=window} element
 * @return {{ (): void }}
 */

function touchStarted(callback) {
  var element = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : window;
  return bindEvent("touchstart", callback, element);
}
/**
 * @param {CallbackEvent} callback
 * @param {Window|HTMLElement=window} element
 * @return {{ (): void }}
 */

function touchMoved(callback) {
  var element = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : window;
  return bindEvent("touchmove", callback, element);
}
/**
 * @param {CallbackEvent} callback
 * @param {Window|HTMLElement=window} element
 * @return {{ (): void }}
 */

function touchEnded(callback) {
  var element = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : window;
  return bindEvent("touchend", callback, element);
}

export default fCanvas;
export { Animate, CircleImpact, CircleImpactPoint, CircleImpactRect, Emitter, RectImpact, RectImpactPoint, Stament, Store, Vector, changeSize, constrain, _draw as draw, hypot, keyPressed, lerp, loadImage, map, mouseClicked, mouseMoved, mousePressed, mouseWheel, random, range, _setup as setup, touchEnded, touchMoved, touchStarted };