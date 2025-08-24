/**
 * @name Celestra
 * @version 6.0.2 dev
 * @see https://github.com/Serrin/Celestra/
 * @license MIT https://opensource.org/licenses/MIT
 */


 /* globalThis; */
(function (global) {
  if (!global.globalThis) {
    if (Object.defineProperty) {
      Object.defineProperty(global, "globalThis", {
        configurable: true, enumerable: false, value: global, writable: true
      });
    } else {
      global.globalThis = global;
    }
  }
})(typeof this === "object" ? this : Function("return this")());


(function(globalThis){
"use strict";


/** polyfills **/


/* Math.sumPrecise(); */
if (!("sumPrecise" in Math)) {
  Math.sumPrecise = function sumPrecise ([...a]) {
    /* empty iterator */
    if (a.length === 0) { return -0; }
    /* iterator with items */
    if (a.every((v) => typeof v === "number")) {
      /* return NaN + Infinity + -Infinity */
      let inf = a.indexOf(Infinity) >- 1, negInf = a.indexOf(-Infinity) > -1;
      if (a.some((v) => v !== v) || (inf && negInf)) { return NaN; }
      if (inf) { return Infinity; }
      if (negInf) { return -Infinity; }
      /* sum hi */
      let hi = a.filter((v) => (v === 1e20 || v === -1e20))
        .reduce((acc, v) => acc + v, 0);
      /* sum lo - Kahan sum */
      let lo = 0.0, c = 0.0;
      for (let item of a.filter((v) => (v !== 1e20 && v !== -1e20))) {
        let y = item - c; let t = lo + y; c = (t - lo) - y; lo = t;
      }
      /* return sum values */
      /*
      if (lo === 0 && hi === 0) { return lo; }
      if (lo === 0 && hi !== 0) { return hi; }
      if (lo !== 0 && hi === 0) { return lo; }
      if (lo > 0 && hi > 0) { return hi; }
      if (lo > 0 && hi < 0) { return lo + hi; }
      if (lo < 0 && hi < 0) { return hi; }
      if (lo < 0 && hi > 0) { return lo + hi; }
      */
      if ((lo === 0 && hi !== 0) || (lo > 0 && hi > 0) || (lo < 0 && hi < 0)) {
        return hi;
      }
      if ((lo > 0 && hi < 0) || (lo < 0 && hi > 0)) { return lo + hi; }
      return lo;
    }
    /* not number items -> TypeError */
    throw new TypeError("values passed to Math.sumPrecise must be numbers");
  };
}


/* Error.isError(); */
if (!("isError" in Error)) {
  Error.isError = function isError (v) {
    let s = Object.prototype.toString.call(v).slice(8, -1).toLowerCase();
    return (s === "error" || s === "domexception");
  };
}


/* Object.groupBy(); */
if (!("groupBy" in Object)) {
  Object.defineProperty(Object, "groupBy", {
    "configurable": true, "writable": true, "enumerable": true,
    "value": function (items, callbackFn) {
      "use strict";
      if (!(typeof callbackFn === "function")) { throw new TypeError(); }
      let r = Object.create(null), i = 0;
      for (let item of items) {
        let key = callbackFn(item, i++);
        if (!(Object.prototype.hasOwnProperty.call(r, key))) { r[key] = []; }
        r[key].push(item);
      }
      return r;
    }
  });
}


/* Map.groupBy(); */
if (!("groupBy" in Map)) {
  Object.defineProperty(Map, "groupBy", {
    "configurable": true, "writable": true, "enumerable": true,
    "value": function (items, callbackFn) {
      "use strict";
      if (!(typeof callbackFn === "function")) { throw new TypeError(); }
      let r = new Map(), i = 0;
      for (let item of items) {
        let key = callbackFn(item, i++);
        if (!(r.has(key))) { r.set(key, []); }
        r.get(key).push(item);
      }
      return r;
    }
  });
}


/* Array.fromAsync(); */
if (!Array.fromAsync) {
  Array.fromAsync = async function fromAsync (arrayLike, mapfn, thisArg) {
    const isConstructor = (v) =>
      (typeof v === "function" && typeof v.prototype === "object");
    const errorMsg = "Input length exceed the Number.MAX_SAFE_INTEGER.";
    if (Symbol.asyncIterator in arrayLike || Symbol.iterator in arrayLike) {
      var r = isConstructor(this) ? new this : Array(0), i = 0;
      for await (const item of arrayLike) {
        if (i > Number.MAX_SAFE_INTEGER) {
          throw TypeError(errorMsg);
        } else {
          if (!mapfn) {
            r[i] = item;
          } else {
            r[i] = await mapfn.call(thisArg,item,i);
          }
        }
        i++;
      }
      r.length = i;
      return r;
    } else {
      var l=arrayLike.length, r=isConstructor(this) ?new this(l) :Array(l), i=0;
      while (i < l) {
        if (i > Number.MAX_SAFE_INTEGER) { throw TypeError(errorMsg); }
        var item = await arrayLike[i];
        if (!mapfn) {
          r[i] = item;
        } else {
          r[i] = await mapfn.call(thisArg,item,i);
        }
        i++;
      }
      r.length = i;
      return r;
    }
  };
}


/* crypto.randomUUID(); */
if (("crypto" in globalThis) && !("randomUUID" in globalThis.crypto)) {
  globalThis.crypto.randomUUID = function randomUUID () {
    return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g,
      (c)=>(c^crypto.getRandomValues(new Uint8Array(1))[0]&15>>c/4).toString(16)
    );
  };
}


/* Object.hasOwn(); */
if (!Object.hasOwn) {
  Object.defineProperty(Object, "hasOwn", {
    value: function (object, property) {
      if (object == null) {
        throw new TypeError("Cannot convert undefined or null to object");
      }
      return Object.prototype.hasOwnProperty.call(Object(object), property);
    },
    configurable: true, enumerable: false, writable: true
  });
}


/* Array.prototype.toReversed(); */
if (!("toReversed" in Array.prototype)) {
  Object.defineProperty(Array.prototype, "toReversed", {
    "configurable": true, "writable": true, "enumerable": false,
    "value": function () {
      "use strict";
      return this.slice().reverse();
    }
  });
}


/* Array.prototype.toSorted(); */
if (!("toSorted" in Array.prototype)) {
  Object.defineProperty(Array.prototype, "toSorted", {
    "configurable": true, "writable": true, "enumerable": false,
    "value": function (cFn) {
      "use strict";
      return this.slice().sort(cFn);
    }
  });
}


/* Array.prototype.toSpliced(); */
if (!("toSpliced" in Array.prototype)) {
  Object.defineProperty(Array.prototype, "toSpliced", {
    "configurable": true, "writable": true, "enumerable": false,
    "value": function (start, deleteCount, ...items) {
      var r = this.slice();
      r.splice(start, deleteCount, ...items);
      return r;
    }
  });
}


/* Array.prototype.with(); */
if (!("with" in Array.prototype)) {
  Object.defineProperty(Array.prototype, "with", {
    "configurable": true, "writable": true, "enumerable": false,
    "value": function (i, v) {
      "use strict";
      var r = this.slice();
      r[i] = v;
      return r;
    }
  });
}


/* TypedArray.prototype.toReversed(); */
if (!("toReversed" in Uint8Array.prototype)) {
  Object.defineProperty(Uint8Array.prototype, "toReversed", {
    "configurable": true, "writable": true, "enumerable": false,
    "value": function () { "use strict"; return this.slice().reverse(); }
  });
}


/* TypedArray.prototype.toSorted(); */
if (!("toSorted" in Uint8Array.prototype)) {
  Object.defineProperty(Uint8Array.prototype, "toSorted", {
    "configurable": true, "writable": true, "enumerable": false,
    "value": function (cFn) {
      "use strict";
      return this.slice().sort(cFn);
    }
  });
}


/* TypedArray.prototype.with(); */
if (!("with" in Uint8Array.prototype)) {
  Object.defineProperty(Uint8Array.prototype, "with", {
    "configurable": true, "writable": true, "enumerable": false,
    "value": function (i, v) {
      "use strict";
      var r = this.slice();
      r[i] = v;
      return r;
    }
  });
}


/* globalThis.GeneratorFunction; */
if (!globalThis.GeneratorFunction) {
  globalThis.GeneratorFunction =
    Object.getPrototypeOf(function*(){}).constructor;
}


/* globalThis.AsyncFunction; */
if (!globalThis.AsyncFunction) {
  globalThis.AsyncFunction =
    Object.getPrototypeOf(async function(){}).constructor;
}


/* globalThis.AsyncGeneratorFunction; */
if (!globalThis.AsyncGeneratorFunction) {
  globalThis.AsyncGeneratorFunction =
    Object.getPrototypeOf(async function* () {}).constructor;
}


/** Core API **/


const BASE16 = "0123456789ABCDEF";
const BASE32 = "234567ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const BASE36 = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const BASE58 = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
const BASE62 = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
const WORDSAFEALPHABET= "23456789CFGHJMPQRVWXcfghjmpqvwx"; /* 31 */


/* tap(function: function): function(v) */
const tap = (fn) => function (v) { fn(v); return v; };


/* once(function: function): function */
function once (fn) {
  let called = false, res;
  return function (...a) {
    if (!called) {
      called = true;
      res = fn(...a);
    }
    return res;
  };
}


/* curry (function: function): function */
function curry (fn) {
  const curried = (...args) =>
    args.length >= fn.length
      ? fn(...args)
      : (...rest) => curried(...args, ...rest);
  return curried;
}


/* pipe (function1:function [, functionN: function]): function */
const pipe = (...fns) => (x) => fns.reduce((v, f) => f(v), x);


/* compose (function1: function [, functionN: function]): function */
const compose = (...fns) => (x) => fns.reduceRight((v, f) => f(v), x);


/* pick (object: object, keys: array): object */
const pick = (O, keys) => keys.reduce(function (acc, key) {
  if (key in O) { acc[key] = O[key]; }
  return acc;
}, {});


/* omit (object: object, keys: array): object */
const omit = (O, keys) => Object.keys(O).reduce(function (acc, key) {
  if (!keys.includes(key)) { acc[key] = O[key]; }
  return acc;
}, {});


/* assoc (object: object, key: string, value: any): object */
const assoc = (O, P, V) => ({...O, [P]: V});


/* asyncNoop (): Promise - do nothing */
function asyncNoop () { return new Promise(function (resolve) { resolve(); }); }


/* asyncT (): Promise - return true */
async function asyncT () { return true; }


/* asyncF (): Promise - return false */
async function asyncF () { return false; }


/* asyncConstant (value): async function */
function asyncConstant (v) { return async function() { return v; }; }


/* asyncIdentity (value): Promise - return value */
async function asyncIdentity (v) { return v; }


/* deleteOwnProperty(object, property [,Throw = false]): number | thrown error*/
function deleteOwnProperty (O, P, Throw = false) {
  if (Object.hasOwn(O, P)) {
    delete O[P];
    var r = Object.hasOwn(O, P);
    if (r && Throw) { throw new Error("Celestra.deleteOwnProperty(); error"); }
    return +!r;
  }
  return -1;
}


/* toObject(value: any): object | symbol | function | thrown error */
function toObject (O) {
  if (O == null) { throw new TypeError("celestra.toObject(); error: " + O); }
  return (["object", "function"].includes(typeof O)) ? O : Object(O);
}


/* createPolyfillMethod(object, property, value: any): boolean */
function createPolyfillMethod (O, P, V) {
  if (!(Object.hasOwn(O, P))) {
    Object.defineProperty(O, P, {
      writable: true, enumerable: false, configurable: true, value: V
    });
  }
  return (O[P] === V);
}


/* createPolyfillProperty(object, property, value: any): boolean */
function createPolyfillProperty (O, P, V) {
  if (!(Object.hasOwn(O, P))) {
    Object.defineProperty(O, P, {
      writable: true, enumerable: true, configurable: true, value: V
    });
  }
  return (O[P] === V);
}


/* randomUUIDv7(): string */
function randomUUIDv7 () {
  let ts = Date.now().toString(16).padStart(12,"0") + "7";
  let uuid = Array.from(([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, (c) =>
    (c^crypto.getRandomValues(new Uint8Array(1))[0]&15>>c/4).toString(16)
  ));
  let i = 0, p = 0;
  while (i < 13) {
    if (p === 8 || p === 13) { p++; }
    uuid[p] = ts[i];
    p++;
    i++;
  }
  return uuid.join("");
}


/* delay(ms: integer).then(callback: function): promise */
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));


/* randomBoolean(): boolean */
const randomBoolean = () => (Math.random() >= 0.5);


/* getUrlVars([str = location.search]): string */
const getUrlVars = (str = location.search) =>
  [...new URLSearchParams(str).entries()]
    .reduce(function (o, item) { o[item[0]] = item[1]; return o; }, {});


/* obj2string(object): string */
const obj2string = (o) => Object.keys(o).reduce(
  (s,p) => s += encodeURIComponent(p) + "=" + encodeURIComponent(o[p]) + "&",
  "").slice(0, -1);


/* extend([deep: boolean,] target: object, source1: object[, sourceN]): object*/
function extend (...a) {
  function _EXT (...as) {
    if (typeof as[0] === "boolean") {
      var t = as[1], d = as[0], s = 2;
    } else {
      var t = as[0], d = false, s = 1;
    }
    for (var i = s, l = as.length, so; i < l; i++) {
      so = as[i];
      if (so != null) {
        for (var p in so) {
          if (Object.hasOwn(so, p)) {
            if (typeof so[p] === "object" && d) {
              t[p] = _EXT(true, {}, so[p]);
            } else {
              t[p] = so[p];
            }
          }
        }
      }
    }
    return t;
  }
  return _EXT(...a);
}


/* sizeIn(object): integer */
const sizeIn = (O) => Object.getOwnPropertyNames(O).length
  + Object.getOwnPropertySymbols(O).length;


/* unBind(function): function */
const unBind = (fn) => Function.prototype.call.bind(fn);


/* bind(function, context: any): function */
const bind = Function.prototype.call.bind(Function.prototype.bind);


/* constant(value: any): any */
const constant = (v) => () => v;


/* identity(value: any): any */
const identity = (v) => v;


/* noop(): undefined */
function noop () {}


/* T(): true */
const T = () => true;


/* F(): false */
const F = () => false;


/* nanoid([size = 21 [,
  alphabet="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_-"]])
  : string */
function nanoid (size = 21,
    alphabet ="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_-"
  ) {
  var r = "", dl = alphabet.length, pos, i = size;
  while (i--) {
    do { pos = crypto.getRandomValues(new Uint8Array(1))[0]; } while (pos>=dl);
    r += alphabet[pos];
  }
  return r;
}


/* timestampID([size = 21
  [, alphabet = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz"]])
  : string */
function timestampID (size = 21,
    alphabet = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz"
  ) {
  var r = Date.now().toString(36).padStart(10, "0") + "-";
  var dl = alphabet.length, pos, i = ((size > 11) ? size : 12) - 11;
  while (i--) {
    do { pos = crypto.getRandomValues(new Uint8Array(1))[0]; } while (pos>=dl);
    r += alphabet[pos];
  }
  return r;
}


/** Assertion API **/


/* assertFail(message | error): thrown error */
function assertFail(msg) {
  if (Error.isError(msg)) {
    throw msg;
  } else {
    throw new Error("[assertFail] Assertion failed" + (msg ? ": " + msg : ""));
  }
}


/* assertMatch(string, regexp [, message | error]): true | thrown error */
function assertMatch(string, regexp, msg) {
  if (typeof string !== "string") {
    if (Error.isError(msg)) { throw msg; }
    throw new TypeError(
      "[assertMatch] TypeError: " + string + " is not a string"
        + (msg ? " - " + msg : "")
    );
  }
  if (!(regexp instanceof RegExp)) {
    if (Error.isError(msg)) { throw msg; }
    throw new TypeError(
      "[assertMatch] TypeError: " + regexp + " is not a RegExp"
        + (msg ? " - " + msg : "")
    );
  }
  if (!(regexp.test(string))) {
    if (Error.isError(msg)) { throw msg; }
    throw new Error(
      "[assertMatch] Assertion failed" + (msg ? ": " + msg : "")
    );
  }
  return true;
}


/* assertDoesNotMatch(string, regexp [, message | error]):
  true | thrown error */
function assertDoesNotMatch(string, regexp, msg) {
  if (typeof string !== "string") {
    if (Error.isError(msg)) { throw msg; }
    throw new TypeError(
      "[assertDoesNotMatch] TypeError: " + string + " is not a string"
        + (msg ? " - " + msg : "")
    );
  }
  if (!(regexp instanceof RegExp)) {
    if (Error.isError(msg)) { throw msg; }
    throw new TypeError(
      "[assertDoesNotMatch] TypeError: " + regexp + " is not a RegExp"
        + (msg ? " - " + msg : "")
    );
  }
  if (regexp.test(string)) {
    if (Error.isError(msg)) { throw msg; }
    throw new Error(
      "[assertDoesNotMatch] Assertion failed" + (msg ? ": " + msg : "")
    );
  }
  return true;
}


/* assertThrows(callback: function [, message | error]): error | thrown error */
function assertThrows (callback, msg) {
  if (typeof callback !== "function") {
    throw new TypeError(
      "[assertThrows] TypeError: " + callback + " is not a function"
        + (msg ? " - " + msg : "")
    );
  }
  try { callback(); } catch (e) { return e; }
  if (Error.isError(msg)) { throw msg; }
  throw new Error("[assertThrow] Assertion failed" + (msg ? ": " + msg : ""));
}


/* assertIsNotNil(value: any [, message | error]): value | thrown error */
function assertIsNotNil (v, msg) {
  if (v == null) {
    if (Error.isError(msg)) { throw msg; }
    throw new TypeError(
      "[assertIsNotNil] Assertion failed: " + v + " is null or undefined"
        + (msg ? " - " + msg : "")
    );
  }
  return v;
}


/* assertIsNil(value: any [, message | error]): value | thrown error */
function assertIsNil (v, msg) {
  if (v != null) {
    if (Error.isError(msg)) { throw msg; }
    throw new TypeError(
      "[assertIsNil] Assertion failed: " + v + " is not null or undefined"
        + (msg ? " - " + msg : "")
    );
  }
  return v;
}


/* assertTypeOf(value: any, type: string [, message | error]):
  value | thrown error */
function assertTypeOf (v, type, msg) {
  const _type = (v) => ((v === null) ? "null" : (typeof v));
  if (typeof type !== "string") {
    if (Error.isError(msg)) { throw msg; }
    throw new TypeError(
      "[assertTypeOf] TypeError: " + type + " is not a string"
        + (msg ? " - " + msg : "")
    );
  }
  if (_type(v) !== type) {
    if (Error.isError(msg)) { throw msg; }
    throw new TypeError(
      "[assertTypeOf] Assertion failed: " + v + " is not a " + type
        + (msg ? " - " + msg : "")
    );
  }
  return v;
}


/* assertNotTypeOf(value: any, type: string [, message | error]):
  value | thrown error */
function assertNotTypeOf (v, type, msg) {
  const _type = (v) => ((v === null) ? "null" : (typeof v));
  if (typeof type !== "string") {
    if (Error.isError(msg)) { throw msg; }
    throw new TypeError(
      "[assertNotTypeOf] TypeError: " + type + " is not a string"
        + (msg ? " - " + msg : "")
    );
  }
  if (_type(v) === type) {
    if (Error.isError(msg)) { throw msg; }
    throw new TypeError(
      "[assertNotTypeOf] Assertion failed: " + v + " is not a " + type
        + (msg ? " - " + msg : "")
    );
  }
  return v;
}


/* assertInstanceOf(value: any, Class: constructor [, message | error]):
  value | thrown error */
function assertInstanceOf (v, Class, msg) {
  if (typeof Class !== "function") {
    if (Error.isError(msg)) { throw msg; }
    throw new TypeError(
      "[assertInstanceOf] TypeError: " + Class + " is not a function"
        + (msg ? " - " + msg : "")
    );
  }
  if (!(v instanceof Class)) {
    if (Error.isError(msg)) { throw msg; }
    throw new TypeError(
      "[assertInstanceOf] Assertion failed: " + v + " is not a "
        + ((Class.name !== "") ? Class.name : Class)
        + (msg ? " - " + msg : "")
    );
  }
  return v;
}


/* assertNotInstanceOf(value: any, Class: constructor [, message | error]):
  value | thrown error */
function assertNotInstanceOf (v, Class, msg) {
  if (typeof Class !== "function") {
    if (Error.isError(msg)) { throw msg; }
    throw new TypeError(
      "[assertNotInstanceOf] TypeError: " + Class + " is not a function"
        + (msg ? " - " + msg : "")
    );
  }
  if (v instanceof Class) {
    if (Error.isError(msg)) { throw msg; }
    throw new TypeError(
      "[assertNotInstanceOf] Assertion failed: " + v + " is not a "
        + ((Class.name !== "") ? Class.name : Class)
        + (msg ? " - " + msg : "")
    );
  }
  return v;
}


/* assert(value: any [, message | error]): true | thrown error */
function assert (c, msg) {
  if (!c) {
    if (Error.isError(msg)) { throw msg; }
    throw new Error("[assert] Assertion failed" + (msg ? ": " + msg : ""));
  }
  return true;
}


/* assertTrue(value: any [, message]): true | thrown error */
function assertTrue (c, msg) {
  if (!c) {
    if (Error.isError(msg)) { throw msg; }
    throw new Error("[assertTrue] Assertion failed" + (msg ? ": " + msg : ""));
  }
  return true;
}


/* assertFalse(value: any [, message] | error): true | thrown error */
function assertFalse (c, msg) {
  if (c) {
    if (Error.isError(msg)) { throw msg; }
    throw new Error("[assertFalse] Assertion failed" + (msg ? ": " + msg : ""));
  }
  return true;
}


/* assertEqual(x: any, y: any [, message | error]): true | thrown error */
/* loose equality + NaN equality */
function assertEqual (x, y, msg) {
  if (!(x == y || (x !== x && y !== y))) {
    if (Error.isError(msg)) { throw msg; }
    throw new Error("[assertEqual] Assertion failed" + (msg ? ": " + msg : ""));
  }
  return true;
}


/* assertStrictEqual(x: any, y: any [, message | error]): true | thrown error */
/* SameValue equality */
function assertStrictEqual (x, y, msg) {
  if (!((x === y) ? (x !== 0 || 1/x === 1/y) : (x !== x && y !== y))) {
    if (Error.isError(msg)) { throw msg; }
    throw new Error("[assertStrictEqual] Assertion failed"
      + (msg ? ": " + msg : "")
    );
  }
  return true;
}


/* assertNotEqual(x: any, y: any [, message | error]): true | thrown error */
/* loose equality + NaN equality */
function assertNotEqual (x, y, msg) {
  if (x == y || (x !== x && y !== y)) {
    if (Error.isError(msg)) { throw msg; }
    throw new Error("[assertNotEqual] Assertion failed"
      + (msg ? ": " + msg : "")
    );
  }
  return true;
}


/* assertNotStrictEqual(x: any, y: any [, message | error]):
  true | thrown error */
/* SameValue equality */
function assertNotStrictEqual (x, y, msg) {
  if ((x === y) ? (x !== 0 || 1/x === 1/y) : (x !== x && y !== y)) {
    if (Error.isError(msg)) { throw msg; }
    throw new Error("[assertNotStrictEqual] Assertion failed"
      + (msg ? ": " + msg : "")
    );
  }
  return true;
}


/* assertDeepEqual(x: any, y: any [, message | error]): true | thrown error */
function assertDeepEqual (x, y, msg) {
  function _isDeepEqual (x, y) {
    /* helper functions */
    const _deepType = (x) =>
      ((x === null) ? "null" : (x !== x) ? "NaN" : (typeof x));
    const _isPrimitive = (v) =>
      (v == null || (typeof v !== "object" && typeof v !== "function"));
    const _isObject = (x) => (x != null && typeof x === "object");
    const _isSameInstance = (x, y, Class) =>
      (x instanceof Class) && (y instanceof Class);
    const _classof = (x) =>
      Object.prototype.toString.call(x).slice(8, -1).toLowerCase();
    const _ownKeys = (x) =>
      Object.getOwnPropertyNames(x).concat(Object.getOwnPropertySymbols(x));
    /* strict equality helper function */
    /* const _isEqual = (x, y) => Object.is(x, y); */
    /* not strict equality helper function */
    const _isEqual = (x, y) => (x == y || (x !== x && y !== y));
    /* primitives: Boolean, Number, BigInt, String + Function + Symbol */
    if (_isEqual(x, y)) { return true; }
    /* objects */
    if (_isObject(x) && _isObject(y)) {
      /* objects / same memory adress */
      if (_isEqual(x, y)) { return true; }
      /* objects / WeakMap + WeakSet */
      if (_isSameInstance(x, y, WeakMap) || _isSameInstance(x, y, WeakSet)) {
        return _isEqual(x, y);
      }
      /* objects / Wrapper objects: Number, Boolean, String, BigInt */
      if (_isSameInstance(x, y, Number)
        || _isSameInstance(x, y, Boolean)
        || _isSameInstance(x, y, String)
        || _isSameInstance(x, y, BigInt)
      ) {
        return _isEqual(x.valueOf(), y.valueOf());
      }
      /* objects / Array */
      if (Array.isArray(x) && Array.isArray(y)) {
        if (x.length !== y.length) { return false; }
        if (x.length === 0) { return true; }
        return x.every((v, i) => _isDeepEqual(v, y[i]));
      }
      /* objects / TypedArrays */
      if ( _isSameInstance(x, y, Int8Array)
        || _isSameInstance(x, y, Uint8Array)
        || _isSameInstance(x, y, Uint8ClampedArray)
        || _isSameInstance(x, y, Int16Array)
        || _isSameInstance(x, y, Uint16Array)
        || _isSameInstance(x, y, Int32Array)
        || _isSameInstance(x, y, Uint32Array)
        || ("Float16Array" in globalThis ?
            _isSameInstance(x, y, Float16Array) : false
           )
        || _isSameInstance(x, y, Float32Array)
        || _isSameInstance(x, y, Float64Array)
        || _isSameInstance(x, y, BigInt64Array)
        || _isSameInstance(x, y, BigUint64Array)
      ) {
        if (x.length !== y.length) { return false; }
        if (x.length === 0) { return true; }
        return x.every((v, i) => _isEqual(v, y[i]));
      }
      /* objects / ArrayBuffer */
      if (_isSameInstance(x, y, ArrayBuffer)) {
        if (x.byteLength !== y.byteLength) { return false; }
        if (x.byteLength === 0) { return true; }
        let xTA = new Int8Array(x), yTA = new Int8Array(y);
        return xTA.every((v, i) => _isEqual(v, yTA[i]));
      }
      /* objects / DataView */
      if (_isSameInstance(x, y, DataView)) {
        if (x.byteLength !== y.byteLength) { return false; }
        if (x.byteLength === 0) { return true; }
        for (let i = 0; i < x.byteLength; i++) {
          if (!_isEqual(x.getUint8(i), y.getUint8(i))) { return false; }
        }
        return true;
      }
      /* objects / Map */
      if (_isSameInstance(x, y, Map)) {
        if (x.size !== y.size) { return false; }
        if (x.size === 0) { return true; }
        return [...x.keys()].every((v) => _isDeepEqual(x.get(v), y.get(v)));
      }
      /* objects / Set */
      if (_isSameInstance(x, y, Set)) {
        if (x.size !== y.size) { return false; }
        if (x.size === 0) { return true; }
        return [...x.keys()].every((v) => y.has(v));
      }
      /* objects / RegExp */
      if (_isSameInstance(x, y, RegExp)) {
        return _isEqual(x.lastIndex, y.lastIndex)
          && _isEqual(x.flags, y.flags)
          && _isEqual(x.source, y.source);
      }
      /* objects / Error */
      if (_isSameInstance(x, y, Error)) {
        return _isDeepEqual(
          Object.getOwnPropertyNames(x)
            .reduce((acc, k) => { acc[k] = x[k]; return acc; }, {}),
          Object.getOwnPropertyNames(y)
            .reduce((acc, k) => { acc[k] = y[k]; return acc; }, {}),
        );
      }
      /* objects / Date */
      if (_isSameInstance(x, y, Date)) { return _isEqual(+x, +y); }
      /* objects / Proxy -> not detectable */
      /* objects / Objects */
      let xKeys = _ownKeys(x), yKeys = _ownKeys(y);
      if (xKeys.length !== yKeys.length) { return false; }
      if (xKeys.length === 0) { return true; }
      return xKeys.every((key) => _isDeepEqual(x[key], y[key]));
    }
    /* default return false */
    return false;
  }
  /* throw error | return true */
  if (!_isDeepEqual(x, y)) {
    if (Error.isError(msg)) { throw msg; }
    throw new Error("[assertDeepEqual] Assertion failed"
      + (msg ? ": " + msg : "")
    );
  }
  return true;
}


/* assertNotDeepStrictEqual(x: any, y: any [, message | error]): boolean */
function assertNotDeepStrictEqual (x, y, msg) {
  function _isDeepStrictEqual (x, y) {
    /* helper functions */
    const _deepType = (x) =>
      ((x === null) ? "null" : (x !== x) ? "NaN" : (typeof x));
    const _isPrimitive = (v) =>
      (v == null || (typeof v !== "object" && typeof v !== "function"));
    const _isObject = (x) => (x != null && typeof x === "object");
    const _isSameInstance = (x, y, Class) =>
      (x instanceof Class) && (y instanceof Class);
    const _classof = (x) =>
      Object.prototype.toString.call(x).slice(8, -1).toLowerCase();
    const _ownKeys = (x) =>
      Object.getOwnPropertyNames(x).concat(Object.getOwnPropertySymbols(x));
    /* strict equality helper function */
    const _isEqual = (x, y) => Object.is(x, y);
    /* not strict equality helper function */
    /* const _isEqual = (x, y) => (x == y || (x !== x && y !== y)); */
    /* primitives: Boolean, Number, BigInt, String + Function + Symbol */
    if (_isEqual(x, y)) { return true; }
    /* Object Wrappers (Boolean, Number, BigInt, String) */
    if (_isObject(x) && _isPrimitive(y) && _classof(x) === typeof y) {
      return _isEqual(x.valueOf(), y);
    }
    if (_isPrimitive(x) && _isObject(y) && typeof x === _classof(y)) {
      return _isEqual(x, y.valueOf());
    }
    /* type (primitives, object, null, NaN) */
    if (_deepType(x) !== _deepType(y)) { return false; }
    /* objects */
    if (_isObject(x) && _isObject(y)) {
      /* objects / same memory adress */
      if (_isEqual(x, y)) { return true; }
      /* objects / not same constructor */
      if (Object.getPrototypeOf(x).constructor !==
        Object.getPrototypeOf(y).constructor
      ) {
        return false;
      }
      /* objects / WeakMap + WeakSet */
      if (_isSameInstance(x, y, WeakMap) || _isSameInstance(x, y, WeakSet)) {
        return _isEqual(x, y);
      }
      /* objects / Wrapper objects: Number, Boolean, String, BigInt */
      if (_isSameInstance(x, y, Number)
        || _isSameInstance(x, y, Boolean)
        || _isSameInstance(x, y, String)
        || _isSameInstance(x, y, BigInt)
      ) {
        return _isEqual(x.valueOf(), y.valueOf());
      }
      /* objects / Array */
      if (Array.isArray(x) && Array.isArray(y)) {
        if (x.length !== y.length) { return false; }
        if (x.length === 0) { return true; }
        return x.every((v, i) => _isDeepStrictEqual(v, y[i]));
      }
      /* objects / TypedArrays */
      if ( _isSameInstance(x, y, Int8Array)
        || _isSameInstance(x, y, Uint8Array)
        || _isSameInstance(x, y, Uint8ClampedArray)
        || _isSameInstance(x, y, Int16Array)
        || _isSameInstance(x, y, Uint16Array)
        || _isSameInstance(x, y, Int32Array)
        || _isSameInstance(x, y, Uint32Array)
        || ("Float16Array" in globalThis ?
            _isSameInstance(x, y, Float16Array) : false
           )
        || _isSameInstance(x, y, Float32Array)
        || _isSameInstance(x, y, Float64Array)
        || _isSameInstance(x, y, BigInt64Array)
        || _isSameInstance(x, y, BigUint64Array)
      ) {
        if (x.length !== y.length) { return false; }
        if (x.length === 0) { return true; }
        return x.every((v, i) => _isEqual(v, y[i]));
      }
      /* objects / ArrayBuffer */
      if (_isSameInstance(x, y, ArrayBuffer)) {
        if (x.byteLength !== y.byteLength) { return false; }
        if (x.byteLength === 0) { return true; }
        let xTA = new Int8Array(x), yTA = new Int8Array(y);
        return xTA.every((v, i) => _isEqual(v, yTA[i]));
      }
      /* objects / DataView */
      if (_isSameInstance(x, y, DataView)) {
        if (x.byteLength !== y.byteLength) { return false; }
        if (x.byteLength === 0) { return true; }
        for (let i = 0; i < x.byteLength; i++) {
          if (!_isEqual(x.getUint8(i), y.getUint8(i))) { return false; }
        }
        return true;
      }
      /* objects / Map */
      if (_isSameInstance(x, y, Map)) {
        if (x.size !== y.size) { return false; }
        if (x.size === 0) { return true; }
        return [...x.keys()].every((v) =>
          _isDeepStrictEqual(x.get(v), y.get(v)));
      }
      /* objects / Set */
      if (_isSameInstance(x, y, Set)) {
        if (x.size !== y.size) { return false; }
        if (x.size === 0) { return true; }
        return [...x.keys()].every((v) => y.has(v));
      }
      /* objects / RegExp */
      if (_isSameInstance(x, y, RegExp)) {
        return _isEqual(x.lastIndex, y.lastIndex)
          && _isEqual(x.flags, y.flags)
          && _isEqual(x.source, y.source);
      }
      /* objects / Error */
      if (_isSameInstance(x, y, Error)) {
        return _isDeepStrictEqual(
          Object.getOwnPropertyNames(x)
            .reduce((acc, k) => { acc[k] = x[k]; return acc; }, {}),
          Object.getOwnPropertyNames(y)
            .reduce((acc, k) => { acc[k] = y[k]; return acc; }, {}),
        );
      }
      /* objects / Date */
      if (_isSameInstance(x, y, Date)) { return _isEqual(+x, +y); }
      /* objects / Proxy -> not detectable */
      /* objects / Objects */
      let xKeys = _ownKeys(x), yKeys = _ownKeys(y);
      if (xKeys.length !== yKeys.length) { return false; }
      if (xKeys.length === 0) { return true; }
      return xKeys.every((key) => _isDeepStrictEqual(x[key], y[key]));
    }
    /* default return false */
    return false;
  }
  /* throw error | return true */
  if (_isDeepStrictEqual(x, y)) {
    if (Error.isError(msg)) { throw msg; }
    throw new Error("[assertNotDeepStrictEqual] Assertion failed"
      + (msg ? ": " + msg : "")
    );
  }
  return true;
}


/* assertNotDeepEqual(x: any, y: any [, message | error]):
  true | thrown error */
function assertNotDeepEqual (x, y, msg) {
  function _isDeepEqual (x, y) {
    /* helper functions */
    const _deepType = (x) =>
      ((x === null) ? "null" : (x !== x) ? "NaN" : (typeof x));
    const _isPrimitive = (v) =>
      (v == null || (typeof v !== "object" && typeof v !== "function"));
    const _isObject = (x) => (x != null && typeof x === "object");
    const _isSameInstance = (x, y, Class) =>
      (x instanceof Class) && (y instanceof Class);
    const _classof = (x) =>
      Object.prototype.toString.call(x).slice(8, -1).toLowerCase();
    const _ownKeys = (x) =>
      Object.getOwnPropertyNames(x).concat(Object.getOwnPropertySymbols(x));
    /* strict equality helper function */
    /* const _isEqual = (x, y) => Object.is(x, y); */
    /* not strict equality helper function */
    const _isEqual = (x, y) => (x == y || (x !== x && y !== y));
    /* primitives: Boolean, Number, BigInt, String + Function + Symbol */
    if (_isEqual(x, y)) { return true; }
    /* objects */
    if (_isObject(x) && _isObject(y)) {
      /* objects / same memory adress */
      if (_isEqual(x, y)) { return true; }
      /* objects / WeakMap + WeakSet */
      if (_isSameInstance(x, y, WeakMap) || _isSameInstance(x, y, WeakSet)) {
        return _isEqual(x, y);
      }
      /* objects / Wrapper objects: Number, Boolean, String, BigInt */
      if (_isSameInstance(x, y, Number)
        || _isSameInstance(x, y, Boolean)
        || _isSameInstance(x, y, String)
        || _isSameInstance(x, y, BigInt)
      ) {
        return _isEqual(x.valueOf(), y.valueOf());
      }
      /* objects / Array */
      if (Array.isArray(x) && Array.isArray(y)) {
        if (x.length !== y.length) { return false; }
        if (x.length === 0) { return true; }
        return x.every((v, i) => _isDeepEqual(v, y[i]));
      }
      /* objects / TypedArrays */
      if ( _isSameInstance(x, y, Int8Array)
        || _isSameInstance(x, y, Uint8Array)
        || _isSameInstance(x, y, Uint8ClampedArray)
        || _isSameInstance(x, y, Int16Array)
        || _isSameInstance(x, y, Uint16Array)
        || _isSameInstance(x, y, Int32Array)
        || _isSameInstance(x, y, Uint32Array)
        || ("Float16Array" in globalThis ?
            _isSameInstance(x, y, Float16Array) : false
           )
        || _isSameInstance(x, y, Float32Array)
        || _isSameInstance(x, y, Float64Array)
        || _isSameInstance(x, y, BigInt64Array)
        || _isSameInstance(x, y, BigUint64Array)
      ) {
        if (x.length !== y.length) { return false; }
        if (x.length === 0) { return true; }
        return x.every((v, i) => _isEqual(v, y[i]));
      }
      /* objects / ArrayBuffer */
      if (_isSameInstance(x, y, ArrayBuffer)) {
        if (x.byteLength !== y.byteLength) { return false; }
        if (x.byteLength === 0) { return true; }
        let xTA = new Int8Array(x), yTA = new Int8Array(y);
        return xTA.every((v, i) => _isEqual(v, yTA[i]));
      }
      /* objects / DataView */
      if (_isSameInstance(x, y, DataView)) {
        if (x.byteLength !== y.byteLength) { return false; }
        if (x.byteLength === 0) { return true; }
        for (let i = 0; i < x.byteLength; i++) {
          if (!_isEqual(x.getUint8(i), y.getUint8(i))) { return false; }
        }
        return true;
      }
      /* objects / Map */
      if (_isSameInstance(x, y, Map)) {
        if (x.size !== y.size) { return false; }
        if (x.size === 0) { return true; }
        return [...x.keys()].every((v) => _isDeepEqual(x.get(v), y.get(v)));
      }
      /* objects / Set */
      if (_isSameInstance(x, y, Set)) {
        if (x.size !== y.size) { return false; }
        if (x.size === 0) { return true; }
        return [...x.keys()].every((v) => y.has(v));
      }
      /* objects / RegExp */
      if (_isSameInstance(x, y, RegExp)) {
        return _isEqual(x.lastIndex, y.lastIndex)
          && _isEqual(x.flags, y.flags)
          && _isEqual(x.source, y.source);
      }
      /* objects / Error */
      if (_isSameInstance(x, y, Error)) {
        return _isDeepEqual(
          Object.getOwnPropertyNames(x)
            .reduce((acc, k) => { acc[k] = x[k]; return acc; }, {}),
          Object.getOwnPropertyNames(y)
            .reduce((acc, k) => { acc[k] = y[k]; return acc; }, {}),
        );
      }
      /* objects / Date */
      if (_isSameInstance(x, y, Date)) { return _isEqual(+x, +y); }
      /* objects / Proxy -> not detectable */
      /* objects / Objects */
      let xKeys = _ownKeys(x), yKeys = _ownKeys(y);
      if (xKeys.length !== yKeys.length) { return false; }
      if (xKeys.length === 0) { return true; }
      return xKeys.every((key) => _isDeepEqual(x[key], y[key]));
    }
    /* default return false */
    return false;
  }
  /* throw error | return true */
  if (_isDeepEqual(x, y)) {
    if (Error.isError(msg)) { throw msg; }
    throw new Error("[assertNotDeepEqual] Assertion failed"
      + (msg ? ": " + msg : "")
    );
  }
  return true;
}


/* assertDeepStrictEqual(x: any, y: any [, message | error]):
  true | thrown error */
function assertDeepStrictEqual (x, y, msg) {
  function _isDeepStrictEqual (x, y) {
    /* helper functions */
    const _deepType = (x) =>
      ((x === null) ? "null" : (x !== x) ? "NaN" : (typeof x));
    const _isPrimitive = (v) =>
      (v == null || (typeof v !== "object" && typeof v !== "function"));
    const _isObject = (x) => (x != null && typeof x === "object");
    const _isSameInstance = (x, y, Class) =>
      (x instanceof Class) && (y instanceof Class);
    const _classof = (x) =>
      Object.prototype.toString.call(x).slice(8, -1).toLowerCase();
    const _ownKeys = (x) =>
      Object.getOwnPropertyNames(x).concat(Object.getOwnPropertySymbols(x));
    /* strict equality helper function */
    const _isEqual = (x, y) => Object.is(x, y);
    /* not strict equality helper function */
    /* const _isEqual = (x, y) => (x == y || (x !== x && y !== y)); */
    /* primitives: Boolean, Number, BigInt, String + Function + Symbol */
    if (_isEqual(x, y)) { return true; }
    /* Object Wrappers (Boolean, Number, BigInt, String) */
    if (_isObject(x) && _isPrimitive(y) && _classof(x) === typeof y) {
      return _isEqual(x.valueOf(), y);
    }
    if (_isPrimitive(x) && _isObject(y) && typeof x === _classof(y)) {
      return _isEqual(x, y.valueOf());
    }
    /* type (primitives, object, null, NaN) */
    if (_deepType(x) !== _deepType(y)) { return false; }
    /* objects */
    if (_isObject(x) && _isObject(y)) {
      /* objects / same memory adress */
      if (_isEqual(x, y)) { return true; }
      /* objects / not same constructor */
      if (Object.getPrototypeOf(x).constructor !==
        Object.getPrototypeOf(y).constructor
      ) {
        return false;
      }
      /* objects / WeakMap + WeakSet */
      if (_isSameInstance(x, y, WeakMap) || _isSameInstance(x, y, WeakSet)) {
        return _isEqual(x, y);
      }
      /* objects / Wrapper objects: Number, Boolean, String, BigInt */
      if (_isSameInstance(x, y, Number)
        || _isSameInstance(x, y, Boolean)
        || _isSameInstance(x, y, String)
        || _isSameInstance(x, y, BigInt)
      ) {
        return _isEqual(x.valueOf(), y.valueOf());
      }
      /* objects / Array */
      if (Array.isArray(x) && Array.isArray(y)) {
        if (x.length !== y.length) { return false; }
        if (x.length === 0) { return true; }
        return x.every((v, i) => _isDeepStrictEqual(v, y[i]));
      }
      /* objects / TypedArrays */
      if ( _isSameInstance(x, y, Int8Array)
        || _isSameInstance(x, y, Uint8Array)
        || _isSameInstance(x, y, Uint8ClampedArray)
        || _isSameInstance(x, y, Int16Array)
        || _isSameInstance(x, y, Uint16Array)
        || _isSameInstance(x, y, Int32Array)
        || _isSameInstance(x, y, Uint32Array)
        || ("Float16Array" in globalThis ?
            _isSameInstance(x, y, Float16Array) : false
           )
        || _isSameInstance(x, y, Float32Array)
        || _isSameInstance(x, y, Float64Array)
        || _isSameInstance(x, y, BigInt64Array)
        || _isSameInstance(x, y, BigUint64Array)
      ) {
        if (x.length !== y.length) { return false; }
        if (x.length === 0) { return true; }
        return x.every((v, i) => _isEqual(v, y[i]));
      }
      /* objects / ArrayBuffer */
      if (_isSameInstance(x, y, ArrayBuffer)) {
        if (x.byteLength !== y.byteLength) { return false; }
        if (x.byteLength === 0) { return true; }
        let xTA = new Int8Array(x), yTA = new Int8Array(y);
        return xTA.every((v, i) => _isEqual(v, yTA[i]));
      }
      /* objects / DataView */
      if (_isSameInstance(x, y, DataView)) {
        if (x.byteLength !== y.byteLength) { return false; }
        if (x.byteLength === 0) { return true; }
        for (let i = 0; i < x.byteLength; i++) {
          if (!_isEqual(x.getUint8(i), y.getUint8(i))) { return false; }
        }
        return true;
      }
      /* objects / Map */
      if (_isSameInstance(x, y, Map)) {
        if (x.size !== y.size) { return false; }
        if (x.size === 0) { return true; }
        return [...x.keys()].every(
          (v) => _isDeepStrictEqual(x.get(v), y.get(v))
        );
      }
      /* objects / Set */
      if (_isSameInstance(x, y, Set)) {
        if (x.size !== y.size) { return false; }
        if (x.size === 0) { return true; }
        return [...x.keys()].every((v) => y.has(v));
      }
      /* objects / RegExp */
      if (_isSameInstance(x, y, RegExp)) {
        return _isEqual(x.lastIndex, y.lastIndex)
          && _isEqual(x.flags, y.flags)
          && _isEqual(x.source, y.source);
      }
      /* objects / Error */
      if (_isSameInstance(x, y, Error)) {
        return _isDeepStrictEqual(
          Object.getOwnPropertyNames(x)
            .reduce((acc, k) => { acc[k] = x[k]; return acc; }, {}),
          Object.getOwnPropertyNames(y)
            .reduce((acc, k) => { acc[k] = y[k]; return acc; }, {}),
        );
      }
      /* objects / Date */
      if (_isSameInstance(x, y, Date)) { return _isEqual(+x, +y); }
      /* objects / Proxy -> not detectable */
      /* objects / Objects */
      let xKeys = _ownKeys(x), yKeys = _ownKeys(y);
      if (xKeys.length !== yKeys.length) { return false; }
      if (xKeys.length === 0) { return true; }
      return xKeys.every((key) => _isDeepStrictEqual(x[key], y[key]));
    }
    /* default return false */
    return false;
  }
  /* throw error | return true */
  if (!_isDeepStrictEqual(x, y)) {
    if (Error.isError(msg)) { throw msg; }
    throw new Error("[assertDeepStrictEqual] Assertion failed"
      + (msg ? ": " + msg : "")
    );
  }
  return true;
}


/** String API **/


/* b64Encode(string: string): string */
function b64Encode (s) {
  return btoa(encodeURIComponent(String(s)).replace(/%([0-9A-F]{2})/g,
    function toSolidBytes (_match, p1) {
      return String.fromCharCode("0x" + p1);
    }
  ));
}


/* b64Decode(string: string): string */
function b64Decode (s) {
  return decodeURIComponent(atob(String(s)).split("").map(function (c) {
    return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(""));
}


/* strTruncate(string: string, newLength: integer [, omission: string = ""]):
  string */
function strTruncate (str, newLen, omission = "") {
  str = String(str);
  omission = String(omission);
  var strUC = Array.from(str);
  if (newLen >= strUC.length) { return str; }
  return strUC.slice(0, newLen-Array.from(omission).length).join("") + omission;
}


/* strPropercase(string: string): string */
const strPropercase = (s) => String(s).split(" ").map(function (v) {
  var a = Array.from(v).map( (c) => c.toLowerCase() );
  if (a.length) { a[0] = a[0].toUpperCase(); }
  return a.join("");
}).join(" ");


/* strTitlecase(string: string): string */
const strTitlecase = (s) => String(s).split(" ").map(function (v) {
  var a = Array.from(v).map( (c) => c.toLowerCase() );
  if (a.length) { a[0] = a[0].toUpperCase(); }
  return a.join("");
}).join(" ");


/* strCapitalize(string: string): string */
function strCapitalize (s) {
  var a = [...String(s).toLowerCase()];
  if (a.length) { a[0] = a[0].toUpperCase(); }
  return a.join("");
}


/* strUpFirst(string: string): string */
function strUpFirst (s) {
  var a = [...String(s)];
  if (a.length) { a[0] = a[0].toUpperCase(); }
  return a.join("");
}


/* strDownFirst(string: string): string */
function strDownFirst (s) {
  var a = [...String(s)];
  if (a.length) { a[0] = a[0].toLowerCase(); }
  return a.join("");
}


/* strReverse(string: string): string */
const strReverse = (s) => Array.from(String(s)).reverse().join("");


/* strCodePoints(string: string): array of strings */
const strCodePoints = (s) => Array.from(String(s), (v) => v.codePointAt(0) );


/* strFromCodePoints(iterator: iterator): string */
const strFromCodePoints = ([...a]) => String.fromCodePoint(...a);


/* strAt(string, index: integer [, newChar: string]): string */
function strAt (s, i, nC) {
  var a = Array.from(String(s));
  if (nC == null) { return a.at(i) || ""; }
  i = i < 0 ? a.length + i : i;
  if (i > a.length) { return a.join(""); }
  a[i] = nC;
  return a.join("");
}


/* strSplice(string: string, index: integer, count: integer [, add: string]):
  string */
const strSplice = (s, i, c, ...add) =>
  Array.from(s).toSpliced(i, c, add.join("")).join("");


/* strHTMLRemoveTags(string): string */
const strHTMLRemoveTags = (s) =>
  String(s).replace(/<[^>]*>/g, " ").replace(/\s{2,}/g, " ").trim();


/* strHTMLEscape(string: string): string */
const strHTMLEscape = (s) => String(s).replace(/&/g, "&amp;")
  .replace(/</g, "&lt;").replace(/>/g, "&gt;")
  .replace(/"/g, "&quot;").replace(/'/g, "&apos;");


/* strHTMLUnEscape(string: string): string */
const strHTMLUnEscape = (s) => String(s)
  .replace(/&amp;/g, "&").replace(/&#38;/g, "&")
  .replace(/&lt;/g, "<").replace(/&#60;/g, "<")
  .replace(/&gt;/g, ">").replace(/&#62;/g, ">")
  .replace(/&quot;/g, '"').replace(/&#34;/g, '"')
  .replace(/&apos;/g, "'").replace(/&#39;/g, "'");


/** DOM API **/


/* qsa(selector: string [, context: element object]): array */
const qsa = (s, c = document) => Array.from(c.querySelectorAll(s));


/* qs(selector: string [, context: element object]): element object | null */
const qs = (s, c = document) => c.querySelector(s);


/* domReady(callback: function): undefined */
function domReady (fn) {
  if (document.readyState !== "loading") {
    fn();
  } else {
    document.addEventListener("DOMContentLoaded", function (_event) { fn(); });
  }
}


/* domCreate(type: string[, properties: object[, innerHTML: string]]):
  element */
/* domCreate(element descriptive object): element */
function domCreate (t, ps, iH) {
  if (arguments.length === 1 && typeof t === "object") {
    var obj = t;
    t = obj.elementType;
    ps = {};
    for (var p in obj) {
      if (p !== "elementType") { ps[p] = obj[p]; }
    }
  }
  var el = document.createElement(t);
  if (ps) {
    for (var p in ps) {
      if (p !== "style" || typeof ps[p] === "string") {
        el[p] = ps[p];
      } else {
        Object.assign(el.style, ps[p]);
      }
    }
  }
  if (iH) { el.innerHTML = iH; }
  return el;
}


/* domToElement(htmlString): element object */
function domToElement (s) {
  var e = document.createElement("div");
  e.innerHTML = s;
  return e.firstElementChild;
}


/* domGetCSS(element [, property: string]): string */
const domGetCSS = (e, p) => (p ? globalThis.getComputedStyle(e, null)[p] :
  globalThis.getComputedStyle(e, null));


/* domSetCSS(element, property: string, value: string): undefined */
/* domSetCSS(element, properties: object): undefined */
function domSetCSS (e, n, v) {
  if (typeof n === "string") {
    e.style[n] = v;
  } else if (typeof n === "object") {
    Object.keys(n).forEach((p) => (e.style[p] = n[p]));
  }
}


/* domFadeIn(element [, duration = 500 [, display = ""]]): undefined */
function domFadeIn (e, dur, d) {
  var s = e.style, step = 25/(dur || 500);
  s.opacity = (s.opacity || 0);
  s.display = (d || "");
  (function fade () {
    (s.opacity=parseFloat(s.opacity)+step)>1 ? s.opacity=1 :setTimeout(fade,25);
  })();
}


/* domFadeOut(element [, duration = 500]): undefined */
function domFadeOut (e, dur) {
  var s = e.style, step = 25/(dur || 500);
  s.opacity = (s.opacity || 1);
  (function fade () {
    (s.opacity -= step) < 0 ? s.display = "none" : setTimeout(fade, 25);
  })();
}


/* domFadeToggle(element [, duration = 500 [, display = ""]]): undefined */
function domFadeToggle (e, dur, d = "") {
  if (globalThis.getComputedStyle(e, null).display === "none") {
    /* same as domFadeIn(); */
    var s = e.style, step = 25/(dur || 500);
    s.opacity = (s.opacity || 0);
    s.display = (d || "");
    (function fade () {
      (s.opacity = parseFloat(s.opacity) + step) > 1 ? s.opacity = 1 :
        setTimeout(fade, 25);
    })();
  } else {
    /* same as domFadeOut(); */
    var s = e.style, step = 25/(dur || 500);
    s.opacity = (s.opacity || 1);
    (function fade () {
      (s.opacity -= step) < 0 ? s.display = "none" : setTimeout(fade, 25);
    })();
  }
}


/* domHide(element): undefined */
const domHide = (e) => e.style.display = "none";


/* domShow(element [, display = ""]): undefined */
const domShow = (e, d = "") => e.style.display = d;


/* domToggle(element [, display: string]): undefined */
function domToggle (e, d = "") {
  if (globalThis.getComputedStyle(e, null).display === "none") {
    e.style.display = d;
  } else {
    e.style.display = "none";
  }
}


/* domIsHidden(element): boolean */
const domIsHidden = (e) =>
  (globalThis.getComputedStyle(e,null).display === "none");


/* domSiblings(element): array */
const domSiblings = (el) =>
  Array.prototype.filter.call(el.parentNode.children, (e) => (e !== el));


/* domSiblingsPrev(element): array */
const domSiblingsPrev = (el) => Array.prototype.slice.call(
  el.parentNode.children, 0,
  Array.prototype.indexOf.call(el.parentNode.children, el)
);


/* domSiblingsLeft(element): array */
const domSiblingsLeft = (el) => Array.prototype.slice.call(
  el.parentNode.children, 0,
  Array.prototype.indexOf.call(el.parentNode.children, el)
);


/* domSiblingsNext(element): array */
const domSiblingsNext = (el) => Array.prototype.slice.call(
  el.parentNode.children,
  Array.prototype.indexOf.call(el.parentNode.children, el) + 1,
  el.parentNode.children.length
);


/* domSiblingsRight(element): array */
const domSiblingsRight = (el) => Array.prototype.slice.call(
  el.parentNode.children,
  Array.prototype.indexOf.call(el.parentNode.children, el) + 1,
  el.parentNode.children.length
);


/* importScript(script1: string [, scriptN: string]): undefined */
function importScript (...a) {
  for (let item of a) {
    let scr = document.createElement("script");
    scr.type = "text\/javascript";
    scr.src = item;
    scr.onerror = function (e) {
      throw new URIError(
        "Loading failed for the script with source " + e.target.src
      );
    };
    (document.head||document.getElementsByTagName("head")[0]).appendChild(scr);
  }
}


/* importStyle(style1: string [, styleN: string]): undefined */
function importStyle (...a) {
  for (let item of a) {
    let stl = document.createElement("link");
    stl.rel = "stylesheet";
    stl.type = "text\/css";
    stl.href = item;
    stl.onerror = function (e) {
      throw new URIError(
        "Loading failed for the style with source " + e.target.href
      );
    };
    (document.head||document.getElementsByTagName("head")[0]).appendChild(stl);
  }
}


/* form2array(form): array */
function form2array (f) {
  var fld, a = [];
  if (typeof f === "object" && f.nodeName.toLowerCase() === "form") {
    for (var i=0, len=f.elements.length; i<len; i++) {
      fld = f.elements[i];
      if (fld.name && !fld.disabled
        && fld.type !== "file"
        && fld.type !== "reset"
        && fld.type !== "submit"
        && fld.type !== "button") {
        if (fld.type === "select-multiple") {
          for (var j=0, l=f.elements[i].options.length; j<l; j++) {
            if(fld.options[j].selected) {
              a.push({
                "name": encodeURIComponent(fld.name),
                "value": encodeURIComponent(fld.options[j].value)
              });
            }
          }
        } else if ((fld.type!=="checkbox" && fld.type!=="radio")||fld.checked) {
          a.push({
            "name": encodeURIComponent(fld.name),
            "value": encodeURIComponent(fld.value)
          });
        }
      }
    }
  }
  return a;
}


/* form2string(form): string */
function form2string (f) {
  var fld, a = [];
  if (typeof f === "object" && f.nodeName.toLowerCase() === "form") {
    for (var i=0, len=f.elements.length; i<len; i++) {
      fld = f.elements[i];
      if (fld.name && !fld.disabled
        && fld.type !== "file"
        && fld.type !== "reset"
        && fld.type !== "submit"
        && fld.type !== "button") {
        if (fld.type === "select-multiple") {
          for (var j=0, l=f.elements[i].options.length; j<l; j++) {
            if(fld.options[j].selected) {
              a.push(encodeURIComponent(fld.name)
                + "=" + encodeURIComponent(fld.options[j].value));
            }
          }
        } else if ((fld.type!=="checkbox" && fld.type!=="radio")||fld.checked) {
          a.push(encodeURIComponent(fld.name)
            + "=" + encodeURIComponent(fld.value)
          );
        }
      }
    }
  }
  return a.join("&").replace(/%20/g, "+");
}


/* getDoNotTrack(): boolean */
const getDoNotTrack = () =>
  [navigator.doNotTrack, globalThis.doNotTrack, navigator.msDoNotTrack]
    .some((e) => (e === true || e === 1 || e === "1"));


/* getLocation(success: function [, error: function]): undefined */
function getLocation (s, e) {
  if (!e) { var e = function () {}; }
  function getE (error) { e("ERROR(" + error.code + "): " + error.message); }
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(s, getE);
  } else {
    getE("Geolocation is not supported in this browser.");
  }
}


/* createFile(filename: string, content: string [,dataType:string]):
  undefined */
function createFile (fln, c, dt) {
  var l = arguments.length;
  if (l > 1) {
    if (l === 2) { dt = "text/plain"; }
    var b = new Blob([c], {type: dt});
    if (globalThis.navigator.msSaveOrOpenBlob) {
      globalThis.navigator.msSaveBlob(b, fln);
    } else {
      var e = globalThis.document.createElement("a");
      e.href = globalThis.URL.createObjectURL(b);
      e.download = fln;
      document.body.appendChild(e);
      e.click();
      document.body.removeChild(e);
      globalThis.URL.revokeObjectURL(e.href);
    }
  } else {
    throw "Celestra createFile error: too few parameters.";
  }
}


/* getFullscreen(): element object | undefined */
const getFullscreen = () => ( document.fullscreenElement
  || document.mozFullScreenElement
  || document.webkitFullscreenElement
  || document.msFullscreenElement
  || undefined
);


/* setFullscreenOn(element): undefined */
/* setFullscreenOn(selector string): undefined */
function setFullscreenOn (s) {
  if (typeof s === "string") { var e = document.querySelector(s); }
    else if (typeof s === "object") { var e = s; }
  if (e.requestFullscreen) { e.requestFullscreen(); }
    else if (e.mozRequestFullScreen) { e.mozRequestFullScreen(); }
    else if (e.webkitRequestFullscreen) { e.webkitRequestFullscreen(); }
    else if (e.msRequestFullscreen) { e.msRequestFullscreen(); }
}


/* setFullscreenOff(): undefined */
function setFullscreenOff () {
  if (document.exitFullscreen) { document.exitFullscreen(); }
    else if (document.mozCancelFullScreen) { document.mozCancelFullScreen(); }
    else if (document.webkitExitFullscreen) { document.webkitExitFullscreen(); }
    else if (document.msExitFullscreen) { document.msExitFullscreen(); }
}


/* domGetCSSVar(name: string): string */
const domGetCSSVar = (n) => getComputedStyle(document.documentElement)
  .getPropertyValue( n[0] === "-" ? n : "--" + n );


/* domSetCSSVar(name: string, value: string): undefined */
const domSetCSSVar = (n, v) =>
  document.documentElement.style.setProperty( (n[0] === "-" ? n : "--" + n), v);


/* domScrollToTop(): undefined */
const domScrollToTop = () => globalThis.scrollTo(0,0);


/* domScrollToBottom(): undefined */
const domScrollToBottom = () =>
  globalThis.scrollTo(0, document.body.scrollHeight);


/* domScrollToElement(element [, top=true]): undefined */
const domScrollToElement = (e, top = true) => e.scrollIntoView(top);


/* domClear(element): undefined */
const domClear = (el) =>
  Array.from(el.children).forEach((item) => item.remove());


/** AJAX API **/


/* getText(url: string, success: function): undefined */
function getText (url, success) {
  if (typeof url !== "string") {
    throw new TypeError(
      "Celestra ajax error: The url parameter have to be a string."
    );
  }
  if (typeof success !== "function") {
    throw new TypeError(
      "Celestra ajax error: The success parameter have to be a function."
    );
  }
  var xhr = new XMLHttpRequest();
  xhr.onerror = (e) => console.log(
    "Celestra ajax GET error: " + JSON.stringify(e)
  );
  xhr.open("GET", url, true);
  xhr.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      success(this.responseText);
    }
  };
  xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
  xhr.send();
}


/* getJson(url: string, success: function): undefined */
function getJson (url, success) {
  if (typeof url !== "string") {
    throw new TypeError(
      "Celestra ajax error: The url parameter have to be a string."
    );
  }
  if (typeof success !== "function") {
    throw new TypeError(
      "Celestra ajax error: The success parameter have to be a function."
    );
  }
  var xhr = new XMLHttpRequest();
  xhr.onerror = (e) => console.log(
    "Celestra ajax GET error: " + JSON.stringify(e)
  );
  xhr.open("GET", url, true);
  xhr.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      success(JSON.parse(this.responseText));
    }
  };
  xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
  xhr.send();
}


/* ajax(Options object): undefined */
function ajax (o) {
  if (typeof o.url !== "string") {
    throw new TypeError(
      "Celestra ajax error: The url property has to be a string."
    );
  }
  if (typeof o.success !== "function") {
    throw new TypeError(
      "Celestra ajax error: The success property has to be a function."
    );
  }
  if (o.error === undefined) {
    o.error = (e) => console.log(
      "Celestra ajax GET error: " + JSON.stringify(e)
    );
  }
  if (typeof o.error !== "function") {
    throw new TypeError(
      "Celestra ajax error: The error property has to be a function or undefined."
    );
  }
  if (!o.queryType) {
    o.queryType = "ajax";
  } else {
    o.queryType = o.queryType.toLowerCase();
  }
  if (!o.type) {
    o.type = "get";
  } else {
    o.type = o.type.toLowerCase();
  }
  if (o.type === "get") {
    var typeStr = "GET";
  } else if (o.type === "post") {
    var typeStr = "POST";
  } else {
    throw "Celestra ajax error: The type property has to be \"get\" or \"post\".";
  }
  if (!o.format) {
    o.format = "text";
  } else {
    o.format = o.format.toLowerCase();
    if (!(["text", "json", "xml"].includes(o.format))) {
      throw "Celestra ajax error: The format property has to be \"text\" or \"json\" or \"xml\".";
    }
  }
  var xhr;
  if (o.queryType === "ajax") {
    xhr = new XMLHttpRequest();
  } else if (o.queryType === "cors") {
    xhr = new XMLHttpRequest();
    if (!("withCredentials" in xhr)) { xhr = new XDomainRequest(); }
  } else {
    throw "Celestra ajax error: The querytype property has to be \"ajax\" or \"cors\".";
  }
  if (typeof o.user === "string" && typeof o.password === "string") {
    xhr.open(typeStr, o.url, true, o.user, o.password);
  } else {
    xhr.open(typeStr, o.url, true);
  }
  if (o.queryType === "ajax") {
    xhr.onreadystatechange = function () {
      if (this.readyState === 4 && this.status === 200) {
        switch (o.format.toLowerCase()) {
          case "text": o.success(this.responseText); break;
          case "json": o.success(JSON.parse(this.responseText)); break;
          case "xml": o.success(this.responseXML); break;
          default: o.success(this.responseText);
        }
      }
    };
    xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
    if (o.typeStr === "POST") {
      xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    }
  } else if (o.queryType === "cors") {
    xhr.onload = function (request) {
      switch (o.format.toLowerCase()) {
        case "text": o.success(request.target.responseText
          || request.currentTarget.response); break;
        case "json": o.success(JSON.parse(request.target.responseText
          || request.currentTarget.response)); break;
        case "xml": o.success(request.target.responseXML
          || request.currentTarget.responseXML); break;
        default: o.success(request.target.responseText
          || request.currentTarget.response);
      }
    };
  }
  if (typeof o.error === "function") { xhr.onerror = o.error; }
  if (typeStr === "GET") {
    xhr.send();
  } else if (typeStr === "POST") {
    xhr.send(encodeURI(o.data));
  }
}


/** Type API **/


/* classof(variable: any): string */
/* classof(variable: any [, type: string [, throw =false]]): boolean | throw */
function classof (v, type, Throw = false) {
  var ot = Object.prototype.toString.call(v).slice(8, -1).toLowerCase();
  if (arguments.length < 2) { return ot; }
  if (!Throw) { return ot === type.toLowerCase(); }
  if (ot !== type.toLowerCase()) {
    throw TypeError("Celestra classof(); type error: " + ot + " - "  + type);
  }
  return true;
}


/* getType(variable: any): string */
/* getType(variable: any [, type: string [, throw =false]]): boolean | throw */
function getType (v, type, Throw = false) {
  var ot = Object.prototype.toString.call(v).slice(8, -1).toLowerCase();
  if (arguments.length < 2) { return ot; }
  if (!Throw) { return ot === type.toLowerCase(); }
  if (ot !== type.toLowerCase()) {
    throw TypeError("Celestra getType(); type error: " + ot + " - "  + type);
  }
  return true;
}


/* toPrimitiveValue(value: any):
  primitive | object | symbol | function | thrown error */
function toPrimitiveValue (O) {
  /* null, undefined, Function, Boolean, BigInt, Number, String, Symbol */
  if (O == null || typeof O !== "object") { return O; }
  /* object */
  var ot = Object.prototype.toString.call(O).slice(8, -1);
  if (["Boolean", "BigInt", "Number", "String"].includes(ot)) {
    return globalThis[ot](O);
  }
  return O;
}


/* isPropertyKey(value: any): boolean */
const isPropertyKey = (v) => (typeof v === "string" || typeof v === "symbol");


/* toPropertyKey(value: any): string | symbol */
const toPropertyKey = (v) => (typeof v === "symbol" ? v : String(v));


/* isIndex(value: any): boolean */
const isIndex = (v) => (Number.isSafeInteger(v) && v >= 0 && 1/v !== 1 / -0);


/* isLength(value: any): boolean */
const isLength = (v) => (Number.isSafeInteger(v) && v >= 0 && 1/v !== 1 / -0);


/* toIndex(value: any): unsigned integer */
function toIndex (v) {
  v = ((v = Math.trunc(+v)) !== v || v === 0) ? 0 : v;
  if (v < 0 || v > (Math.pow(2, 53) - 1)) {
    throw new RangeError("toIndex(); RangeError: " + v);
  }
  return v;
}


/* toLength(value: any): unsigned integer */
function toLength (v) {
  v = ((v = Math.trunc(+v)) !== v || v === 0) ? 0 : v;
  return Math.min(Math.max(v, 0), Math.pow(2, 53) - 1);
}


/* type(value: any): string */
const type = (v) => ((v === null) ? "null" : (typeof v));


/* isSameClass(value1: any, value2: any): boolean */
const isSameClass = (x, y) =>
  (Object.prototype.toString.call(x) === Object.prototype.toString.call(y));


/* isSameType(value1: any, value2: any): boolean */
const isSameType = (x, y) =>
  ((x == null || y == null) ? (x === y) : (typeof x === typeof y));


/* isSameInstance(value1: any, value2: any, Contructor: function): boolean */
const isSameInstance = (x, y, Contructor) =>
  (x instanceof Contructor && y instanceof Contructor);


/* isCoercedObject(object: any): constructor function | false */
function isCoercedObject (O) {
  if (O != null && typeof O === "object") {
    if (O instanceof Number) { return Number; }
    if (O instanceof BigInt) { return BigInt; }
    if (O instanceof String) { return String; }
    if (O instanceof Boolean) { return Boolean; }
  }
  return false;
}


function isDeepStrictEqual (x, y) {
  /* helper functions */
  const _deepType = (x) =>
    ((x === null) ? "null" : (x !== x) ? "NaN" : (typeof x));
  const _isPrimitive = (v) =>
    (v == null || (typeof v !== "object" && typeof v !== "function"));
  const _isObject = (x) => (x != null && typeof x === "object");
  const _isSameInstance = (x, y, Class) =>
    (x instanceof Class) && (y instanceof Class);
  const _classof = (x) =>
    Object.prototype.toString.call(x).slice(8, -1).toLowerCase();
  const _ownKeys = (x) =>
    Object.getOwnPropertyNames(x).concat(Object.getOwnPropertySymbols(x));
  /* strict equality helper function */
  const _isEqual = (x, y) => Object.is(x, y);
  /* not strict equality helper function */
  /* const _isEqual = (x, y) => (x == y || (x !== x && y !== y)); */
  /* primitives: Boolean, Number, BigInt, String + Function + Symbol */
  if (_isEqual(x, y)) { return true; }
  /* Object Wrappers (Boolean, Number, BigInt, String) */
  if (_isObject(x) && _isPrimitive(y) && _classof(x) === typeof y) {
    return _isEqual(x.valueOf(), y);
  }
  if (_isPrimitive(x) && _isObject(y) && typeof x === _classof(y)) {
    return _isEqual(x, y.valueOf());
  }
  /* type (primitives, object, null, NaN) */
  if (_deepType(x) !== _deepType(y)) { return false; }
  /* objects */
  if (_isObject(x) && _isObject(y)) {
    /* objects / same memory adress */
    if (_isEqual(x, y)) { return true; }
    /* objects / not same constructor */
    if (Object.getPrototypeOf(x).constructor !==
      Object.getPrototypeOf(y).constructor
    ) {
      return false;
    }
    /* objects / WeakMap + WeakSet */
    if (_isSameInstance(x, y, WeakMap) || _isSameInstance(x, y, WeakSet)) {
      return _isEqual(x, y);
    }
    /* objects / Wrapper objects: Number, Boolean, String, BigInt */
    if (_isSameInstance(x, y, Number)
      || _isSameInstance(x, y, Boolean)
      || _isSameInstance(x, y, String)
      || _isSameInstance(x, y, BigInt)
    ) {
      return _isEqual(x.valueOf(), y.valueOf());
    }
    /* objects / Array */
    if (Array.isArray(x) && Array.isArray(y)) {
      if (x.length !== y.length) { return false; }
      if (x.length === 0) { return true; }
      return x.every((v, i) => isDeepStrictEqual(v, y[i]));
    }
    /* objects / TypedArrays */
    if ( _isSameInstance(x, y, Int8Array)
      || _isSameInstance(x, y, Uint8Array)
      || _isSameInstance(x, y, Uint8ClampedArray)
      || _isSameInstance(x, y, Int16Array)
      || _isSameInstance(x, y, Uint16Array)
      || _isSameInstance(x, y, Int32Array)
      || _isSameInstance(x, y, Uint32Array)
      || ("Float16Array" in globalThis ?
          _isSameInstance(x, y, Float16Array) : false
         )
      || _isSameInstance(x, y, Float32Array)
      || _isSameInstance(x, y, Float64Array)
      || _isSameInstance(x, y, BigInt64Array)
      || _isSameInstance(x, y, BigUint64Array)
    ) {
      if (x.length !== y.length) { return false; }
      if (x.length === 0) { return true; }
      return x.every((v, i) => _isEqual(v, y[i]));
    }
    /* objects / ArrayBuffer */
    if (_isSameInstance(x, y, ArrayBuffer)) {
      if (x.byteLength !== y.byteLength) { return false; }
      if (x.byteLength === 0) { return true; }
      let xTA = new Int8Array(x), yTA = new Int8Array(y);
      return xTA.every((v, i) => _isEqual(v, yTA[i]));
    }
    /* objects / DataView */
    if (_isSameInstance(x, y, DataView)) {
      if (x.byteLength !== y.byteLength) { return false; }
      if (x.byteLength === 0) { return true; }
      for (let i = 0; i < x.byteLength; i++) {
        if (!_isEqual(x.getUint8(i), y.getUint8(i))) { return false; }
      }
      return true;
    }
    /* objects / Map */
    if (_isSameInstance(x, y, Map)) {
      if (x.size !== y.size) { return false; }
      if (x.size === 0) { return true; }
      return [...x.keys()].every((v) => isDeepStrictEqual(x.get(v), y.get(v)));
    }
    /* objects / Set */
    if (_isSameInstance(x, y, Set)) {
      if (x.size !== y.size) { return false; }
      if (x.size === 0) { return true; }
      return [...x.keys()].every((v) => y.has(v));
    }
    /* objects / RegExp */
    if (_isSameInstance(x, y, RegExp)) {
      return _isEqual(x.lastIndex, y.lastIndex)
        && _isEqual(x.flags, y.flags)
        && _isEqual(x.source, y.source);
    }
    /* objects / Error */
    if (_isSameInstance(x, y, Error)) {
      return isDeepStrictEqual(
        Object.getOwnPropertyNames(x)
          .reduce((acc, k) => { acc[k] = x[k]; return acc; }, {}),
        Object.getOwnPropertyNames(y)
          .reduce((acc, k) => { acc[k] = y[k]; return acc; }, {}),
      );
    }
    /* objects / Date */
    if (_isSameInstance(x, y, Date)) { return _isEqual(+x, +y); }
    /* objects / Proxy -> not detectable */
    /* objects / Objects */
    let xKeys = _ownKeys(x), yKeys = _ownKeys(y);
    if (xKeys.length !== yKeys.length) { return false; }
    if (xKeys.length === 0) { return true; }
    return xKeys.every((key) => isDeepStrictEqual(x[key], y[key]));
  }
  /* default return false */
  return false;
}


/* isEmptyValue(value: any): boolean */
function isEmptyValue (v) {
  if (v == null || v !== v) { return true; }
  if (Array.isArray(v)
    || v instanceof Int8Array
    || v instanceof Uint8Array
    || v instanceof Uint8ClampedArray
    || v instanceof Int16Array
    || v instanceof Uint16Array
    || v instanceof Int32Array
    || v instanceof Uint32Array
    || ("Float16Array" in globalThis ? v instanceof Float16Array : false)
    || v instanceof Float32Array
    || v instanceof Float64Array
    || v instanceof BigInt64Array
    || v instanceof BigUint64Array
    || typeof v === "string"
    || v instanceof String
  ) {
    return v.length === 0;
  }
  if ( v instanceof Map || v instanceof Set) { return v.size === 0; }
  if (v instanceof ArrayBuffer || v instanceof DataView) {
    return v.byteLength === 0;
  }
  try { for (let _item of v) { return false; } } catch (_e) { }
  if (typeof v === "object") {
    let vKeys = [
      ...Object.getOwnPropertyNames(v),
      ...Object.getOwnPropertySymbols(v)
    ];
    if (vKeys.length === 0) { return true; }
    if (vKeys.length === 1 && vKeys[0] === "length" && v.length === 0) {
      return true;
    }
  }
  return false;
}


/* isProxy(value: any): boolean */
const isProxy = (O) => Boolean(O.__isProxy);


/* isAsyncGeneratorFn(value: any): boolean */
const isAsyncGeneratorFn = (v) => (Object.getPrototypeOf(v).constructor ===
  Object.getPrototypeOf(async function*() {}).constructor);


/* isClass(value: any): boolean */
const isClass = (v) =>
  (typeof v === "function" && typeof v.prototype === "object");


/* isPlainObject(value: any): boolean */
const isPlainObject = (v) => (v != null && typeof v === "object" &&
  (Object.getPrototypeOf(v) === Object.prototype
    || Object.getPrototypeOf(v) === null));


/* isChar(value: any): boolean */
const isChar = (v) =>
  (typeof v === "string" && (v.length === 1 || Array.from(v).length === 1));


/* isNumeric(value: any): boolean */
const isNumeric = (v) =>
  (((typeof v === "number" || typeof v === "bigint") && v === v)
    ? true : (!isNaN(parseFloat(v)) && isFinite(v)));


/* isObject(value: any): boolean */
const isObject = (O) =>
  (O != null && (typeof O === "object" || typeof O === "function"));


/* isFunction(value: any): boolean */
const isFunction = (O) => (typeof O === "function" ||
  Object.prototype.toString.call(O) === "[object Function]");


/* isCallable(value: any): boolean */
const isCallable = (O) =>
  ((O != null && ["object", "function"].includes(typeof O))
    ? (typeof O.call === "function") : false);


/* isArraylike(value: any): boolean */
const isArraylike = (v) =>
  ((typeof v === "object" || typeof v === "string") && v != null
    && typeof v.length === "number" && v.length >= 0 && v.length % 1 === 0);


/* isNull(value: any): boolean */
const isNull = (v) => (v === null);


/* isUndefined(value: any): boolean */
const isUndefined = (v) => (v === undefined);


/* isNil(value: any): boolean */
const isNil = (v) => (v == null);


/* isPrimitive(value: any): boolean */
const isPrimitive = (v) =>
  (v == null || (typeof v !== "object" && typeof v !== "function"));


/* isIterator(value: any): boolean */
const isIterator = (v) => ("Iterator" in globalThis ? (v instanceof Iterator)
  : (v != null && typeof v === "object" && typeof v.next === "function"));


/* isRegexp(value: any): boolean */
const isRegexp = (v) => (v instanceof RegExp);


/* isElement(value: any): boolean */
const isElement = (v) =>
  (v != null && typeof v === "object" && v.nodeType === 1);


/* isIterable(value: any): boolean */
const isIterable = (v) =>
  (v != null && typeof v[Symbol.iterator] === "function");


/* isTypedArray(value: any): boolean */
const isTypedArray = (v) => (
  v instanceof Int8Array
  || v instanceof Uint8Array
  || v instanceof Uint8ClampedArray
  || v instanceof Int16Array
  || v instanceof Uint16Array
  || v instanceof Int32Array
  || v instanceof Uint32Array
  || ("Float16Array" in globalThis ? v instanceof Float16Array : false)
  || v instanceof Float32Array
  || v instanceof Float64Array
  || v instanceof BigInt64Array
  || v instanceof BigUint64Array
);


/* isGeneratorFn(value: any): boolean */
const isGeneratorFn = (v) => (Object.getPrototypeOf(v).constructor ===
  Object.getPrototypeOf(function*(){}).constructor);


/* isAsyncFn(value: any): boolean */
const isAsyncFn = (v) => (Object.getPrototypeOf(v).constructor ===
  Object.getPrototypeOf(async function(){}).constructor);


/** Cookie API **/


/* setCookie(Options object): undefined */
/* setCookie(name: string, value: string [, hours = 8760 [, path = "/" [, domain
  [, secure [, SameSite = "Lax" [, HttpOnly]]]]]]): undefined */
function setCookie (name, value, hours = 8760, path = "/", domain, secure,
  SameSite = "Lax", HttpOnly) {
  if (typeof name === "object") {
    var settings = name;
    name = settings.name;
    value = settings.value;
    hours = settings.hours || 8760;
    path = settings.path || "/";
    domain = settings.domain;
    secure = settings.secure;
    SameSite = settings.SameSite || "Lax";
    HttpOnly = settings.HttpOnly;
  }
  var expire = new Date();
  expire.setTime(expire.getTime() + (Math.round(hours * 60 * 60 * 1000)));
  document.cookie = encodeURIComponent(name)
    + "=" + encodeURIComponent(value)
    + "; expires=" + expire.toUTCString()
    + "; path=" + path
    + (domain ? "; domain=" + domain : "")
    + (secure ? "; secure" : "")
    + (typeof SameSite==="string" && SameSite.length ?"; SameSite="+SameSite:"")
    + (HttpOnly ? "; HttpOnly" : "")
    + ";";
}


/* getCookie(): object */
/* getCookie([name: string]): string */
function getCookie (name) {
  if (document.cookie.length !== 0) {
    var r = {}, a = document.cookie.split(";");
    for(var i = 0, l = a.length; i < l; i++) {
      var e = a[i].trim().split("=");
      r[decodeURIComponent(e[0])] = decodeURIComponent(e[1]);
    }
    return (name ? (r[name] ? r[name] : null) : r);
  }
  return (name ? null : {});
}


/* hasCookie(name: string): boolean */
const hasCookie = (n) =>
  (document.cookie.includes(encodeURIComponent(n) + "="));


/* removeCookie(Options object);: boolean */
/* removeCookie(name: string [, path = "/"
  [, domain [, secure [, SameSite = "Lax" [, HttpOnly ]]]]]): boolean */
function removeCookie (name, path="/", domain, secure, SameSite="Lax",
  HttpOnly){
  if (typeof name === "object") {
    var settings = name;
    name = settings.name;
    path = settings.path || "/";
    domain = settings.domain;
    secure = settings.secure;
    SameSite = settings.SameSite || "Lax";
    HttpOnly = settings.HttpOnly;
  }
  var r = (document.cookie.includes(encodeURIComponent(name)+"="));
  document.cookie = encodeURIComponent(name)
    + "=; expires=Thu, 01 Jan 1970 00:00:01 GMT"
    + "; path=" + path
    + (domain ? "; domain=" + domain : "")
    + (secure ? "; secure" : "")
    + (typeof SameSite === "string" && SameSite.length ? "; SameSite="
      + SameSite : "")
    + (HttpOnly ? "; HttpOnly" : "")
    + ";";
  return r;
}


/* clearCookies(Options object): undefined */
/* clearCookies([path = "/"
  [, domain [, secure [, SameSite = "Lax" [, HttpOnly ]]]]]): undefined */
function clearCookies (path = "/", domain, secure, SameSite = "Lax", HttpOnly) {
  if (typeof path === "object") {
    var settings = path;
    path = settings.path || "/";
    domain = settings.domain;
    secure = settings.secure;
    SameSite = settings.SameSite || "Lax";
    HttpOnly = settings.HttpOnly;
  }
  if (document.cookie.length !== 0) {
    var a = document.cookie.split(";");
    for(var i = 0, l = a.length; i < l; i++) {
      document.cookie = encodeURIComponent(a[i].trim().split("=")[0])
        + "=; expires=Thu, 01 Jan 1970 00:00:01 GMT"
        + "; path=" + path
        + (domain ? "; domain=" + domain : "")
        + (secure ? "; secure" : "")
        + (typeof SameSite === "string" && SameSite.length ?
          "; SameSite=" + SameSite : "")
        + (HttpOnly ? "; HttpOnly" : "")
        + ";";
    }
  }
}


/** Collections API **/


/* unique(iterator: iterator [, resolver: string | function]): array */
function unique (it, resolver) {
  if (resolver == null) { return [...new Set(it)]; }
  if (typeof resolver === "string") {
    return Array.from(it).reduce(function (acc, el) {
      if (acc.every((e) => e[resolver] !== el[resolver])) { acc.push(el); }
      return acc;
    }, []);
  }
  if (typeof resolver === "function") {
    let cache = new Map();
    for (let item of it) {
      let key = resolver(item);
      if (!cache.has(key)) { cache.set(key, item); }
    }
    return [...cache.values()];
  }
}


/* count(iterator, callback: function): integer */
function count (it, fn) {
  let i = 0, r = 0;
  for (let item of it) {
    if (fn(item, i++)) { r++; }
  }
  return r;
}


/* arrayDeepClone(array: array): array */
function arrayDeepClone ([...a]) {
  const _ADC = (v) => (Array.isArray(v) ? Array.from(v, _ADC) : v);
  return _ADC(a);
}


/* initial(iterator: iterator): array */
const initial = ([...a]) => a.slice(0, -1);


/* shuffle(iterator: iterator): array */
function shuffle([...a]) {
  for (let i = a.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}


/* partition(iterator: iterator, callback: function): array */
const partition = ([...a],fn) =>
  [a.filter(fn), a.filter((e, i, a) => !(fn(e, i, a)))];


/* setUnion(iterator1: iterator [, iteratorN: iterator]): set */
const setUnion = (...a) => new Set(a.map(([...e]) => e).flat());


/* setIntersection(set1: set, set2: set): set */
const setIntersection = ([...a], b) => new Set(a.filter((v) => b.has(v)));


/* setDifference(set1: set, set2: set): set */
const setDifference = ([...a], b) => new Set(a.filter((v) => !(b.has(v))));


/* setSymmetricDifference(set1: set, set2: set): set */
const setSymmetricDifference = (a, b) => new Set(
  [...a].filter((v) => !(b.has(v))).concat([...b].filter((v) => !(a.has(v))))
);


/* isSuperset(superCollection: iterator, subCollection: iterator): boolean */
const isSuperset = ([...sup], [...sub]) => sub.every((v) => sup.includes(v));


/* min(value1: any [, valueN]): any */
const min = (...a) => a.reduce((acc, v) => (v < acc ? v : acc), a[0]);


/* max(value1: any [, valueN]): any */
const max = (...a) => a.reduce((acc, v) => (v > acc ? v : acc), a[0]);


/* arrayRepeat(value: any [, n = 100]): array */
const arrayRepeat = (v, n = 100) => Array(n).fill(v);


/* arrayCycle(iterator: iterator [, n: integer = 100]): array */
const arrayCycle = ([...a], n = 100) => Array(n).fill(a).flat();


/* arrayRange([ start = 0 [, end = 99 [, step = 1]]]): array */
const arrayRange = (s = 0, e = 99, st = 1) =>
  Array.from({length: (e - s) / st + 1}, (_v, i) => s + (i * st));


/* zip(iterator1: iterator [, iteratorN: iterator]): array */
function zip (...a) {
  a = a.map((v) => Array.from(v));
  return Array.from({length: Math.min(...a.map(v => v.length))})
    .map((_, i) => a.map(v => v[i]));
}


/* unzip(iterator: iterator): array */
const unzip = ([...a]) =>
  a.map((v) => Array.from(v)).reduce((acc, v) => {
    v.forEach((item, i) => {
      if (!Array.isArray(acc[i])) { acc[i] = []; }
      acc[i].push(item);
    });
    return acc;
  }, []);


/* zipObj(iterator1: iterator, iterator2: iterator): object */
function zipObj ([...a1], [...a2]) {
  let r = {}, l = Math.min(a1.length, a2.length);
  for (let i = 0; i < l; i++) { r[a1[i]] = a2[i]; }
  return r;
}

/* arrayAdd(array: array, value: any): boolean */
const arrayAdd = (a, v) => (!a.includes(v)) ? !!a.push(v) : false;


/* arrayClear(array: array): array */
function arrayClear (a) { a.length = 0; return a; }


/* arrayRemove(array: array, value: any [, all: boolean = false]): boolean */
function arrayRemove (a, v, all = false) {
  var found = a.indexOf(v) > -1;
  if (!all) {
    var pos = a.indexOf(v);
    if (pos > -1) { a.splice(pos, 1); }
  } else {
    var pos = -1;
    while ((pos = a.indexOf(v)) > -1) { a.splice(pos, 1); }
  }
  return found;
}


/* arrayRemoveBy(array: array, callback: function [, all: boolean = false]):
  boolean */
function arrayRemoveBy (a, fn, all = false) {
  var found = a.findIndex(fn) > -1;
  if (!all) {
    var pos = a.findIndex(fn);
    if (pos > -1) { a.splice(pos, 1); }
  } else {
    var pos = -1;
    while ((pos = a.findIndex(fn)) > -1) { a.splice(pos, 1); }
  }
  return found;
}


/* arrayMerge(target: array, source1: any [, sourceN: any]): array */
function arrayMerge (t, ...a) { t.push(... [].concat(...a) ); return t; }


/* iterRange([start: number = 0 [,step: number = 1
  [, end: number = Infinity]]]): iterator */
function* iterRange (s = 0, st = 1, e = Infinity) {
  let i = s;
  while (i <= e) {
    yield i;
    i += st;
  }
}


/* iterCycle(iterator: iterator [, n = Infinity]): iterator */
function* iterCycle ([...a], n = Infinity) {
  let i = 0;
  while (i < n) {
    yield* a;
    i++;
  }
}


/* iterRepeat(value: any [, n: number = Infinity]): iterator */
function* iterRepeat (v, n = Infinity) {
  let i = 0;
  while (i<n) {
    yield v;
    i++;
  }
}


/* takeWhile(iterator: iterator, callback: function): iterator */
function* takeWhile (it, fn) {
  for (let item of it) {
    if (!fn(item)) { break; }
    yield item;
  }
}


/* dropWhile(iterator: iterator, callback: function): iterator */
function* dropWhile (it, fn) {
  let d = true;
  for (let item of it) {
    if (d && !fn(item)) { d = false; }
    if (!d) { yield item; }
  }
}


/* take(iterator: iterator [, n: number = 1]): iterator */
function* take (it, n = 1) {
  let i = n;
  for (let item of it) {
    if (i <= 0) { break; }
    yield item;
    i--;
  }
}


/* drop(iterator: iterator [, n: number =1 ]): iterator */
function* drop (it, n = 1) {
  let i = n;
  for (let item of it) {
    if (i < 1) {
      yield item;
    } else {
      i--;
    }
  }
}


/* forEach(iterator: iterator, callback: function): undefined */
function forEach (it, fn) {
  let i = 0;
  for (let item of it) { fn(item, i++); }
}


/* forEachRight(iterator: iterator, callback: function): undefined */
function forEachRight ([...a], fn) {
  let i = a.length;
  while (i--) { fn(a[i] ,i); }
}


/* map(iterator: iterator, callback: function): iterator */
function* map (it, fn) {
  let i = 0;
  for (let item of it) { yield fn(item, i++); }
}


/* filter(iterator: iterator, callback: function): iterator */
function* filter (it, fn) {
  let i = 0;
  for (let item of it) {
    if (fn(item, i++)) { yield item; }
  }
}


/* reject(iterator: iterator, callback: function): iterator */
function* reject (it, fn) {
  let i = 0;
  for (let item of it) {
    if (!fn(item, i++)) { yield item; }
  }
}


/* slice(iterator: iterator [, begin: number = 0 [, end: number = Infinity]]):
  iterator */
function* slice (it, begin = 0, end = Infinity) {
  let i = 0;
  for (let item of it) {
    if (i >= begin && i <= end) {
      yield item;
    } else if (i > end) {
      return;
    }
    i++;
  }
}


/* tail(iterator: iterator): iterator */
function* tail (it) {
  let first = true;
  for (let item of it) {
    if (!first) {
      yield item;
    } else {
      first = false;
    }
  }
}


/* item(iterator: iterator, index: integer): any */
function item (it, p) {
  let i=0;
  for (let item of it) {
    if (i++ === p) { return item; }
  }
}


/* nth(iterator: iterator, index: integer): any */
function nth (it, p) {
  let i=0;
  for (let item of it) {
    if (i++ === p) { return item; }
  }
}


/* size(iterator: iterator): integer */
function size (it) {
  let i = 0;
  for (let _item of it) { i++; }
  return i;
}


/* first(iterator: iterator): any */
function first (it) { for (let item of it) { return item; } }


/* head(iterator: iterator): any */
function head (it) { for (let item of it) { return item; } }


/* last(iterator: iterator): any */
const last = ([...a]) => a[a.length - 1];


/* reverse(iterator: iterator): iterator */
function* reverse ([...a]) {
  var i = a.length;
  while (i--) { yield a[i]; }
}


/* sort(iterator: iterator [, numbers = false]): array */
const sort = ([...a], ns) => a.sort(ns ? (x, y) => x - y : undefined);


/* includes(iterator: iterator, value: any): boolean */
function includes (it, v) {
  for (let item of it) {
    if (item === v || (item !== item && v !== v)) { return true; }
  }
  return false;
}


/* contains(iterator: iterator, value: any): boolean */
function contains (it, v) {
  for (let item of it) {
    if (item === v) { return true; }
  }
  return false;
}


/* find(iterator: iterator, callback: function): any */
function find (it, fn) {
  let i = 0;
  for (let item of it) {
    if (fn(item, i++)) { return item; }
  }
}


/* findLast(iterator: iterator, callback: function): any */
function findLast (it, fn) {
  let i = 0, r;
  for (let item of it) {
    if (fn(item, i++)) { r = item; }
  }
  return r;
}


/* every(iterator: iterator, callback: function): boolean */
function every (it, fn) {
  let i = 0;
  for (let item of it) {
    if (!fn(item, i++)) { return false; }
  }
  if (i === 0) { return false; }
  return true;
}


/* some(iterator: iterator, callback: function): boolean */
function some (it, fn) {
  let i = 0;
  for (let item of it) {
    if (fn(item, i++)) { return true; }
  }
  return false;
}


/* none(iterator: iterator, callback: function): boolean */
function none (it, fn) {
  let i = 0;
  for (let item of it) {
    if (fn(item, i++)) { return false; }
  }
  if (i === 0) { return false; }
  return true;
}


/* takeRight(iterator: iterator [, n: number = 1]): array */
const takeRight = ([...a], n = 1) => a.reverse().slice(0, n);


/* takeRightWhile(iterator: iterator, callback: function): iterator */
function* takeRightWhile ([...a], fn) {
  let i = 0;
  for (let item of a.reverse()) {
    if (fn(item, i++)) {
      yield item;
    } else {
      break;
    }
  }
}


/* dropRight(iterator: iterator [, n: number = 1]): array */
const dropRight = ([...a], n = 1) => a.reverse().slice(n);


/* dropRightWhile(iterator: iterator, callback: function): iterator */
function* dropRightWhile ([...a], fn) {
  let d = true, i = 0;
  for (let item of a.reverse()) {
    if (d && !fn(item, i++)) { d = false; }
    if (!d) { yield item; }
  }
}


/* concat(iterator1: iterator [, iteratorN]: iterator): iterator */
function* concat () {
  for (let item of arguments) {
    if (typeof item[Symbol.iterator] === "function" ||
      ("Iterator" in globalThis ? (item instanceof Iterator)
        : (typeof item === "object" && typeof item.next === "function")
      )
    ) {
      yield* item;
    } else {
      yield item;
    }
  }
}


/* reduce(iterator: iterator, callback: function [, initialvalue: any]): any */
function reduce (it, fn, iv) {
  let acc = iv, i = 0;
  for (let item of it) {
    if (i === 0 && acc === undefined) {
      acc = item;
    } else {
      acc = fn(acc, item, i++);
    }
  }
  return acc;
}


/* enumerate(iterator: iterator [, offset = 0]): iterator */
function* enumerate (it, offset = 0) {
  let i = offset;
  for (let item of it) { yield [i++, item]; }
}


/* flat(iterator: iterator): iterator */
function* flat (it) {
  for (let item of it) {
    if (typeof item[Symbol.iterator] === "function" ||
      ("Iterator" in globalThis ? (item instanceof Iterator)
        : (typeof item === "object" && typeof item.next === "function")
      )
    ) {
      yield* item;
    } else {
      yield item;
    }
  }
}


/* join(iterator: iterator [, separator = ","]): string */
function join (it, sep = ",") {
  sep = String(sep);
  let r = "";
  for (let item of it) { r += sep + item; }
  return r.slice(sep.length);
}


/* withOut(iterator: iterator, filterIterator: iterator): array */
const withOut = ([...a], [...fl]) => a.filter((e) => fl.indexOf(e) === -1);


/** Math API **/


/* isFloat(value: any): boolean */
const isFloat = (v) => (typeof v === "number" && v === v && !!(v % 1));


/* toInteger(value: any): integer */
function toInteger (v) {
  v = ((v = Math.trunc(+v)) !== v || v === 0) ? 0 : v;
  return Math.min(Math.max(v, -(Math.pow(2, 53) - 1)), Math.pow(2, 53) - 1);
}


/* toIntegerOrInfinity(value: any): integer | Infinity | -Infinity */
const toIntegerOrInfinity = (v) =>
  ((v = Math.trunc(+v)) !== v || v === 0) ? 0 : v;


/* sum(value1: any [, valueN]: any): any */
const sum = (...a) => (a.every((v) => typeof v === "number") ?
  Math.sumPrecise(a) : a.slice(1).reduce((acc, v) => acc + v, a[0]));


/* avg(value1: number [, valueN: number]): number */
const avg = (...a) => Math.sumPrecise(a) / a.length;


/* product(value1: number [, valueN]: number): number */
const product = (f, ...a) => a.reduce((acc, v) => acc * v, f);


/* clamp(value: any, min: any, max: any): number */
function clamp(val, min = -9007199254740991, max = 9007199254740991) {
  /* normalize */
  function _normalize (v) {
    if (typeof v !== "bigint" && typeof v !== "number") { v = Number(v); }
    if (v === -Infinity) { return -9007199254740991; }
    if (v === Infinity) { return 9007199254740991; }
    if (v === 0) { return 0; }
    return v;
  }
  val = _normalize(val);
  min = _normalize(min);
  max = _normalize(max);
  /* NaN: val, min, max */
  if (val !== val) { return val; }
  if (min !== min || max !== max) {
    throw new RangeError(
      "clamp(); RangeError: minimum and maximum should not to be NaN"
    );
  }
  /* min > max -> throw RangeError */
  if (min > max) {
    throw new RangeError(
      "clamp(); RangeError: minimum should be lower than maximum"
    );
  }
  /* clamp */
  return (val < min) ? min : ((val > max) ? max : val);
}


/* minmax(value: any, min: any, max: any): number */
function minmax(val, min = -9007199254740991, max = 9007199254740991) {
  /* normalize */
  function _normalize (v) {
    if (typeof v !== "bigint" && typeof v !== "number") { v = Number(v); }
    if (v === -Infinity) { return -9007199254740991; }
    if (v === Infinity) { return 9007199254740991; }
    if (v === 0) { return 0; }
    return v;
  }
  val = _normalize(val);
  min = _normalize(min);
  max = _normalize(max);
  /* NaN: val, min, max */
  if (val !== val) { return val; }
  if (min !== min || max !== max) {
    throw new RangeError(
      "clamp(); RangeError: minimum and maximum should not to be NaN"
    );
  }
  /* min > max -> throw RangeError */
  if (min > max) {
    throw new RangeError(
      "clamp(); RangeError: minimum should be lower than maximum"
    );
  }
  /* clamp */
  return (val < min) ? min : ((val > max) ? max : val);
}


/* isEven(value: number): boolan */
function isEven (v) {
  var r = v % 2;
  if (r === r) { return r === 0; }
  return false;
}


/* isOdd(value: number): boolean */
function isOdd (v) {
  var r = v % 2;
  if (r === r) { return r !== 0; }
  return false;
}


/* toInt8(value: any): integer -127..128 */
const toInt8 = (v) =>
  ((v = Math.min(Math.max(-128, Math.trunc(Number(v))), 127)) === v) ? v : 0;


/* toUInt8(value: any): integer 0..255  */
const toUInt8 = (v) =>
  ((v = Math.min(Math.max(0, Math.trunc(Number(v))), 255)) === v) ? v : 0;


/* toInt16(value: any): integer -32768..32767 */
const toInt16 = (v) =>
  ((v = Math.min(Math.max(-32768, Math.trunc(Number(v))), 32767)) === v) ? v :0;


/* toUInt16(value: any) integer 0..65535 */
const toUInt16 = (v) =>
  ((v = Math.min(Math.max(0, Math.trunc(Number(v))), 65535)) === v) ? v : 0;


/* toInt32(value: any): integer -2147483648..2147483647 */
const toInt32 = (v) =>
  ((v = Math.min(Math.max(-2147483648, Math.trunc(Number(v))), 2147483647))
    === v) ? v : 0;


/* toUInt32(value: any: integer 0..4294967295 */
const toUInt32 = (v) =>
  ((v = Math.min(Math.max(0, Math.trunc(Number(v))), 4294967295)) === v) ? v :0;


/* toBigInt64(value: any): bigint */
const toBigInt64 = (v) => BigInt(typeof v === "bigint"
  ? (v > Math.pow(2,63)-1 ?Math.pow(2,63)-1:v<Math.pow(-2,63)?Math.pow(-2,63):v)
  : ((v = Math.min(Math.max(Math.pow(-2, 63), Math.trunc(Number(v))),
  Math.pow(2, 63) - 1)) === v ) ? v : 0);


/* toBigUInt64(value: any): unsigned bigint */
const toBigUInt64 = (v) => BigInt(typeof v === "bigint"
  ? (v > Math.pow(2, 64) - 1 ? Math.pow(2, 64) - 1 : v < 0 ? 0 : v)
  : ((v=Math.min(Math.max(0,Math.trunc(Number(v))),Math.pow(2,64)-1))===v)?v:0);


/* toFloat32(value: any): float */
const toFloat32 = (v) =>
  ((v = Math.min(Math.max(-3.4e38, Number(v)), 3.4e38)) === v) ? v : 0;


/* isInt8(value: any): boolean */
const isInt8 = (v) => (Number.isInteger(v) ? (v >= -128 && v <= 127) : false);


/* isUInt8(value: any): boolean */
const isUInt8 = (v) => (Number.isInteger(v) ? (v >= 0 && v <= 255) : false);


/* isInt16(value: any): boolean */
const isInt16 = (v) => (Number.isInteger(v) ?(v>=-32768 && v <= 32767) : false);


/* isUInt16(value: any): boolean */
const isUInt16 = (v) => (Number.isInteger(v) ? (v >= 0 && v <= 65535) : false);


/* isInt32(value: any): boolean */
const isInt32 = (v) =>
  (Number.isInteger(v) ? (v >= -2147483648 && v <= 2147483647) : false);


/* isUInt32(value: any): boolean */
const isUInt32 = (v) =>
  (Number.isInteger(v) ? (v >= 0 && v <= 4294967295) : false);


/* isBigInt64(value: any): boolean */
const isBigInt64 = (v) => (typeof v === "bigint"
  ? (v >= Math.pow(-2, 63) && v <= Math.pow(2, 63)-1) : false);


/* isBigUInt64(value: any): boolean */
const isBigUInt64 = (v) =>
  (typeof v === "bigint" ? (v >= 0 && v <= Math.pow(2,64)-1) : false);


/* toFloat16(value: any): float16 */
const toFloat16 = (v) =>
  ((v = Math.min(Math.max(-65504, Number(v)),65504)) === v ) ? v : 0;


/* isFloat16(value: any): boolean */
const isFloat16 = (v) =>
  ((typeof v === "number" && v === v) ?(v>=-65504 && v<=65504) : false);


/* signbit(value: any): boolean */
const signbit = (v) =>
  (((v = Number(v)) !== v) ? false : ((v < 0) || Object.is(v, -0)));


/* randomInt([max: integer]): integer */
/* randomInt(min: integer, max: integer): integer */
function randomInt (i = 100, a) {
  if (a == null) {
    a = i;
    i = 0;
  }
  i = Math.ceil(Number(i));
  return Math.floor(Math.random() * (Math.floor(Number(a)) - i + 1) + i);
}


/* randomFloat([max: float]): float */
/* randomFloat(min: float, max: float): float */
function randomFloat (i = 100, a) {
  if (a == null) {
    a = i;
    i = 0;
  }
  var r = (Math.random() * (a - i + 1)) + i;
  return r > a ? a : r;
}


/* inRange(value: number, min: number, max: number): boolean */
const inRange = (v, min, max) => (v >= min && v <= max);


/** object header **/


const VERSION = "Celestra v6.0.2 dev";


/* celestra.noConflict(): celestra object */
function noConflict () { globalThis.CEL = celestra.__prevCEL__; return celestra; }


const celestra = {
  /** object header **/
  VERSION,
  noConflict,
  /** Core API **/
  BASE16,
  BASE32,
  BASE36,
  BASE58,
  BASE62,
  WORDSAFEALPHABET,
  tap,
  once,
  curry,
  pipe,
  compose,
  pick,
  omit,
  assoc,
  asyncNoop,
  asyncT,
  asyncF,
  asyncConstant,
  asyncIdentity,
  deleteOwnProperty,
  toObject,
  createPolyfillMethod,
  createPolyfillProperty,
  randomUUIDv7,
  delay,
  randomBoolean,
  getUrlVars,
  obj2string,
  extend,
  sizeIn,
  unBind,
  bind,
  constant,
  identity,
  noop,
  T,
  F,
  nanoid,
  timestampID,
  /** Assertion API **/
  assertFail,
  assertMatch,
  assertDoesNotMatch,
  assertThrows,
  assertIsNotNil,
  assertIsNil,
  assertTypeOf,
  assertNotTypeOf,
  assertInstanceOf,
  assertNotInstanceOf,
  assert,
  assertTrue,
  assertFalse,
  assertEqual,
  assertStrictEqual,
  assertNotEqual,
  assertNotStrictEqual,
  assertDeepEqual,
  assertNotDeepStrictEqual,
  assertNotDeepEqual,
  assertDeepStrictEqual,
  /** String API **/
  b64Encode,
  b64Decode,
  strTruncate,
  strPropercase,
  strTitlecase,
  strCapitalize,
  strUpFirst,
  strDownFirst,
  strReverse,
  strCodePoints,
  strFromCodePoints,
  strAt,
  strSplice,
  strHTMLRemoveTags,
  strHTMLEscape,
  strHTMLUnEscape,
  /** DOM API **/
  qsa,
  qs,
  domReady,
  domCreate,
  domToElement,
  domGetCSS,
  domSetCSS,
  domFadeIn,
  domFadeOut,
  domFadeToggle,
  domHide,
  domShow,
  domToggle,
  domIsHidden,
  domSiblings,
  domSiblingsPrev,
  domSiblingsLeft,
  domSiblingsNext,
  domSiblingsRight,
  importScript,
  importStyle,
  form2array,
  form2string,
  getDoNotTrack,
  getLocation,
  createFile,
  getFullscreen,
  setFullscreenOn,
  setFullscreenOff,
  domGetCSSVar,
  domSetCSSVar,
  domScrollToTop,
  domScrollToBottom,
  domScrollToElement,
  domClear,
  /** AJAX API **/
  getText,
  getJson,
  ajax,
  /** Type API **/
  classof,
  getType,
  toPrimitiveValue,
  isPropertyKey,
  toPropertyKey,
  isIndex,
  isLength,
  toIndex,
  toLength,
  type,
  isSameClass,
  isSameType,
  isSameInstance,
  isCoercedObject,
  isDeepStrictEqual,
  isEmptyValue,
  isProxy,
  isAsyncGeneratorFn,
  isClass,
  isPlainObject,
  isChar,
  isNumeric,
  isObject,
  isFunction,
  isCallable,
  isArraylike,
  isNull,
  isUndefined,
  isNil,
  isPrimitive,
  isIterator,
  isRegexp,
  isElement,
  isIterable,
  isTypedArray,
  isGeneratorFn,
  isAsyncFn,
  /** Cookie API **/
  setCookie,
  getCookie,
  hasCookie,
  removeCookie,
  clearCookies,
  /** Collections API **/
  unique,
  count,
  arrayDeepClone,
  initial,
  shuffle,
  partition,
  setUnion,
  setIntersection,
  setDifference,
  setSymmetricDifference,
  isSuperset,
  min,
  max,
  arrayRepeat,
  arrayCycle,
  arrayRange,
  zip,
  unzip,
  zipObj,
  arrayAdd,
  arrayClear,
  arrayRemove,
  arrayRemoveBy,
  arrayMerge,
  iterRange,
  iterCycle,
  iterRepeat,
  takeWhile,
  dropWhile,
  take,
  drop,
  forEach,
  forEachRight,
  map,
  filter,
  reject,
  slice,
  tail,
  item,
  nth,
  size,
  first,
  head,
  last,
  reverse,
  sort,
  includes,
  contains,
  find,
  findLast,
  every,
  some,
  none,
  takeRight,
  takeRightWhile,
  dropRight,
  dropRightWhile,
  concat,
  reduce,
  enumerate,
  flat,
  join,
  withOut,
  /** Math API **/
  isFloat,
  toInteger,
  toIntegerOrInfinity,
  sum,
  avg,
  product,
  clamp,
  minmax,
  isEven,
  isOdd,
  toInt8,
  toUInt8,
  toInt16,
  toUInt16,
  toInt32,
  toUInt32,
  toBigInt64,
  toBigUInt64,
  toFloat32,
  isInt8,
  isUInt8,
  isInt16,
  isUInt16,
  isInt32,
  isUInt32,
  isBigInt64,
  isBigUInt64,
  toFloat16,
  isFloat16,
  signbit,
  randomInt,
  randomFloat,
  inRange
};


if (typeof globalThis !== "undefined") {
  globalThis.celestra = celestra;
  celestra.__prevCEL__ = globalThis.CEL;
  globalThis.CEL = celestra;
}


}(globalThis));
