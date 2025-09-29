// @ts-check
"use strict";

/**
 * @name Celestra
 * @version 6.0.5 dev
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
  // @ts-ignore
  Math.sumPrecise = function sumPrecise (
    /** @type {Iterable<number>} */ [...array]) {
    /* empty iterator */
    if (array.length === 0) { return -0; }
    /* iterator with items */
    if (array.every((/** @type {any} */ value) => typeof value === "number")) {
      /* return NaN + Infinity + -Infinity */
      let inf = array.indexOf(Infinity) >- 1,
        negInf = array.indexOf(-Infinity) > -1;
      if (array.some((/** @type {any} */ value) => value !== value)
        || (inf && negInf)) { return NaN; }
      if (inf) { return Infinity; }
      if (negInf) { return -Infinity; }
      /* sum hi */
      let hi = array.filter((/** @type {any} */ value) =>
        (value === 1e20 || value === -1e20))
          .reduce((acc, value) => acc + value, 0);
      /* sum lo - Kahan sum */
      let lo = 0.0, c = 0.0;
      for (let item of array.filter((/** @type {any} */ value) =>
        (value !== 1e20 && value !== -1e20))) {
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
  // @ts-ignore
  Error.isError = function isError (/** @type {any} */ value) {
    let s = Object.prototype.toString.call(/** @type {any} */ value)
      .slice(8, -1).toLowerCase();
    return (s === "error" || s === "domexception");
  };
}


/* Object.groupBy(); */
if (!("groupBy" in Object)) {
  // @ts-ignore
  Object.defineProperty(Object, "groupBy", {
    "configurable": true, "writable": true, "enumerable": true,
    "value": function (
      /** @type {Iterable} */ items,
      /** @type Function */ callbackFn) {
      "use strict";
      if (!(typeof callbackFn === "function")) { throw new TypeError(); }
      let result = Object.create(null), index = 0;
      for (let item of items) {
        let key = callbackFn(item, index++);
        if (!(Object.prototype.hasOwnProperty.call(result, key))) {
          result[key] = [];
        }
        result[key].push(item);
      }
      return result;
    }
  });
}


/* Map.groupBy(); */
if (!("groupBy" in Map)) {
  Object.defineProperty(Map, "groupBy", {
    "configurable": true, "writable": true, "enumerable": true,
    "value": function (
      /** @type {Iterable} */ items,
      /** @type {Function} */ callbackFn) {
      "use strict";
      if (!(typeof callbackFn === "function")) { throw new TypeError(); }
      let result = new Map(), index = 0;
      for (let item of items) {
        let key = callbackFn(item, index++);
        if (!(result.has(key))) { result.set(key, []); }
        result.get(key).push(item);
      }
      return result;
    }
  });
}


/* Array.fromAsync(); */
if (!Array.fromAsync) {
  // @ts-ignore
  Array.fromAsync = async function fromAsync (arrayLike, mapfn, thisArg) {
    const isConstructor = (/** @type {any} */ value) =>
      (typeof value === "function" && typeof value.prototype === "object");
    const errorMsg = "Input length exceed the Number.MAX_SAFE_INTEGER.";
    if (Symbol.asyncIterator in arrayLike || Symbol.iterator in arrayLike) {
      let result = isConstructor(this) ? new this : Array(0), index = 0;
      for await (const item of arrayLike) {
        if (index > Number.MAX_SAFE_INTEGER) {
          throw TypeError(errorMsg);
        } else {
          if (!mapfn) {
            result[index] = item;
          } else {
            result[index] = await mapfn.call(thisArg,item,index);
          }
        }
        index++;
      }
      result.length = index;
      return result;
    } else {
      let length = arrayLike.length,
        result = isConstructor(this) ? new this(length) : Array(length),
        index = 0;
      while (index < length) {
        if (index > Number.MAX_SAFE_INTEGER) { throw TypeError(errorMsg); }
        let item = await arrayLike[index];
        if (!mapfn) {
          result[index] = item;
        } else {
          result[index] = await mapfn.call(thisArg,item,index);
        }
        index++;
      }
      result.length = index;
      return result;
    }
  };
}


/* crypto.randomUUID(); */
if (("crypto" in globalThis) && !("randomUUID" in globalThis.crypto)) {
  // @ts-ignore
  globalThis.crypto.randomUUID = function randomUUID () {
    // @ts-ignore
    return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g,
      (/** @type {any} */ c) =>
        (c^crypto.getRandomValues(new Uint8Array(1))[0]&15 >> c/4).toString(16)
    );
  };
}


/* Object.hasOwn(); */
if (!Object.hasOwn) {
  Object.defineProperty(Object, "hasOwn", {
    value: function (
      /** @type {Object} */ object,
      /** @type {string} */ property) {
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
    "value": function () { "use strict"; return this.slice().reverse(); }
  });
}


/* Array.prototype.toSorted(); */
if (!("toSorted" in Array.prototype)) {
  Object.defineProperty(Array.prototype, "toSorted", {
    "configurable": true, "writable": true, "enumerable": false,
    "value": function (/** @type {Function} */ fn) {
      "use strict"; return this.slice().sort(fn);
    }
  });
}


/* Array.prototype.toSpliced(); */
if (!("toSpliced" in Array.prototype)) {
  Object.defineProperty(Array.prototype, "toSpliced", {
    "configurable": true, "writable": true, "enumerable": false,
    "value": function (
      /** @type {number} */ start,
      /** @type {number} */ deleteCount,
      /** @type {any} */ ...items) {
      let result = this.slice();
      result.splice(start, deleteCount, ...items);
      return result;
    }
  });
}


/* Array.prototype.with(); */
if (!("with" in Array.prototype)) {
  Object.defineProperty(Array.prototype, "with", {
    "configurable": true, "writable": true, "enumerable": false,
    "value": function (
      /** @type {string | number} */ index,
      /** @type {any} */ value) {
      "use strict";
      let result = this.slice();
      result[index] = value;
      return result;
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
    "value": function (/** @type {Function} */ fn) {
      "use strict";
      return this.slice().sort(fn);
    }
  });
}


/* TypedArray.prototype.with(); */
if (!("with" in Uint8Array.prototype)) {
  Object.defineProperty(Uint8Array.prototype, "with", {
    "configurable": true, "writable": true, "enumerable": false,
    "value": function (
      /** @type {string | number} */ index,
      /** @type {any} */ value) {
      "use strict";
      let result = this.slice();
      result[index] = value;
      return result;
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


/*export function toSafeString (value: unknown): string {
  const seen = new WeakSet<object>();
  const replacer = (_key: string, value: any) => {
    if (typeof value === "function") {
      return `[Function: ${value.name || "anonymous"}]`;
    }
    if (typeof value === "symbol") { return value.toString(); }
    if (value instanceof Date) { return `Date(${value.toISOString()})`; }
    if (value instanceof Error) {
      return `${value.name}: ${value.message}, ${value.stack ?? ""}`;
    }
    if (value && typeof value === "object") {
      if (seen.has(value)) { return "[Circular]" };
      seen.add(value);
    }
    return value;
  };
  if (["undefined", "null", "string", "number", "boolean", "bigint"]
    .includes(value === null ? "null" : typeof value)) {
    return String(value);
  }
  if (Array.isArray(value)) {
    return `[${value.map(v => toSafeString(v)).join(", ")}]`;
  }
  if (value instanceof Map) {
    return `Map(${value.size}){${Array.from(value.entries()).map(([k, v]) => `${toSafeString(k)} => ${toSafeString(v)}`).join(", ")}}`;
  }
  if (value instanceof Set) {
    return `Set(${value.size}){${Array.from(value.values()).map(v => toSafeString(v)).join(", ")}}`;
  }
  try {
    return JSON.stringify(value, replacer) ?? String(value);
  } catch (_e) {
    return String(value);
  }
}*/
/**
 * @description This function is a general purpose, type safe, predictable stringifier.
 * 
 * @param {unknown} value 
 * @returns {string}
 */
function toSafeString (value) {
  const seen = new WeakSet();
  const replacer = (/** @type {any} */ _key, /** @type {any} */ value) => {
    if (typeof value === "function") {
      return `[Function: ${value.name || "anonymous"}]`;
    }
    if (typeof value === "symbol") { return value.toString(); }
    if (value instanceof Date) { return `Date(${value.toISOString()})`; }
    if (value instanceof Error) {
      return `${value.name}: ${value.message}, ${value.stack ?? ""}`;
    }
    if (value && typeof value === "object") {
      if (seen.has(value)) { return "[Circular]" };
      seen.add(value);
    }
    return value;
  };
  if (["undefined", "null", "string", "number", "boolean", "bigint"]
    .includes(value === null ? "null" : typeof value)) {
    return String(value);
  }
  if (Array.isArray(value)) {
    return `[${value.map(v => toSafeString(v)).join(", ")}]`;
  }
  if (value instanceof Map) {
    return `Map(${value.size}){${Array.from(value.entries()).map(([k, v]) => `${toSafeString(k)} => ${toSafeString(v)}`).join(", ")}}`;
  }
  if (value instanceof Set) {
    return `Set(${value.size}){${Array.from(value.values()).map(v => toSafeString(v)).join(", ")}}`;
  }
  try {
    return JSON.stringify(value, replacer) ?? String(value);
  } catch (_e) {
    return String(value);
  }
}


/* tap(function: function): function(v) */
/** @return {any} */
const tap = (/** @type {Function} */ fn) =>
  function (/** @type {any} */ value) { fn(value); return value; };


/* once(function: function): function */
/** @return {Function} */
function once (/** @type {Function} */ fn) {
  let called = false, result;
  return function (/** @type {any[]} */ ...args) {
    if (!called) {
      called = true;
      result = fn(...args);
    }
    return result;
  };
}


/* curry (function: function): function */
/** @return {Function} */
function curry (/** @type {Function} */ fn) {
  const curried = (/** @type {any[]} */ ...args) =>
    args.length >= fn.length
      ? fn(...args)
      : (/** @type {any} */ ...rest) => curried(...args, ...rest);
  return curried;
}


/* pipe (function1:function [, functionN: function]): function */
/** @return {Function} */
const pipe = (/** @type {Function[]} */ ...functions) =>
  (/** @type {any} */ first) =>
    functions.reduce((/** @type {any} */value, /** @type {Function} */fn) =>
      fn(value), first);


/* compose (function1: function [, functionN: function]): function */
/** @return {Function} */
const compose = (/** @type {Function[]} */ ...functions) =>
  (/** @type {any} */ first) =>
    functions.reduceRight((value, fn) => fn(value), first);


/* pick (object: object, keys: array): object */
/** @return {Object} */
const pick = (/** @type {Object} */ obj, /** @type {string[]} */ keys) =>
  keys.reduce(function (acc, key) {
    if (key in obj) { acc[key] = obj[key]; }
    return acc;
  }, {});


/* omit (object: object, keys: array): object */
/** @return {Object} */
const omit = (/** @type {Object} */ obj, /** @type {string[]} */ keys) =>
  Object.keys(obj).reduce(function (acc, key) {
    if (!keys.includes(key)) { acc[key] = obj[key]; }
    return acc;
  }, {});


/* assoc (object: object, key: string, value: any): object */
/** @return {Object} */
const assoc = (
  /** @type {Object} */ obj,
  /** @type {string} */ property,
  /** @type {any} */ value) =>
  ({...obj, [property]: value});


/* asyncNoop (): Promise - do nothing */
/** @return {Promise} */
// @ts-ignore
function asyncNoop () {
  return new Promise(function (/** @type {Function} */ resolve) { resolve(); });
}


/* asyncT (): Promise - return true */
/** @return @async {boolean} */
async function asyncT () { return true; }


/* asyncF (): Promise - return false */
/** @return @async {boolean} */
async function asyncF () { return false; }


/* asyncConstant (value): async function */
/** @return @async {Function} */
function asyncConstant (/** @type {any} */ value) {
  return async function() { return value; };
}


/* asyncIdentity (value): Promise - return value */
/** @return @async {any} */
async function asyncIdentity (/** @type {any} */ value) { return value; }


/* deleteOwnProperty(object, property [,Throw = false]): number | thrown error*/
/** @return {number} */
function deleteOwnProperty (
  /** @type {Object} */ obj,
  /** @type {string} */ property,
  /** @type {boolean} */ Throw = false) {
  if (Object.hasOwn(obj, property)) {
    delete obj[property];
    let result = Object.hasOwn(obj, property);
    if (result && Throw) {
      throw new Error("Celestra.deleteOwnProperty(); error");
    }
    return +!result;
  }
  return -1;
}


/* createPolyfillMethod(object, property, function: any): boolean */
/** @return {boolean} */
function createPolyfillMethod (
  /** @type {Object} */ obj,
  /** @type {string} */ property,
  /** @type {Function} */ value) {
  if (!(Object.hasOwn(obj, property))) {
    Object.defineProperty(obj, property, {
      writable: true, enumerable: false, configurable: true, value: value
    });
  }
  return (obj[property] === value);
}


/* createPolyfillProperty(object, property, value: any): boolean */
/** @return {boolean} */
function createPolyfillProperty (
  /** @type {Object} */ obj,
  /** @type {string} */ property,
  /** @type {any} */ value) {
  if (!(Object.hasOwn(obj, property))) {
    Object.defineProperty(obj, property, {
      writable: true, enumerable: true, configurable: true, value: value
    });
  }
  return (obj[property] === value);
}


/* randomUUIDv7(v4: boolean = false): string */
/** @return {string} */
function randomUUIDv7 (/** @type {boolean} */ v4 = false) {
  let ts = Date.now().toString(16).padStart(12,"0") + (v4 ? "4" : "7");
  // @ts-ignore
  let uuid = Array.from(([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, (c) =>
    (c^crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  ));
  let index = 0, pos = 0;
  while (index < 13) {
    if (pos === 8 || pos === 13) { pos++; }
    uuid[pos] = ts[index];
    pos++;
    index++;
  }
  return uuid.join("");
}


/* delay(ms: integer).then(callback: function): promise */
/** @return {Promise} */
const delay = (/** @type {number} */ milisec) =>
  new Promise(resolve => setTimeout(resolve, milisec));


/* randomBoolean(): boolean */
/** @return {boolean} */
const randomBoolean = () => !Math.round(Math.random());


/* getUrlVars([str = location.search]): Object */
/** @return {Object} */
const getUrlVars = (/** @type {string} */ str = location.search) =>
  [...new URLSearchParams(str).entries()]
    .reduce(function (obj, item) { obj[item[0]] = item[1]; return obj; }, {});


/* obj2string(object): string */
/** @return {string} */
const obj2string = (/** @type {Object} */ obj) => Object.keys(obj).reduce(
  (s,p) => s += encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]) + "&",
  "").slice(0, -1);


/* extend([deep: boolean,] target: object, source1: object[, sourceN]): object*/
/** @return {Object} */
function extend (/** @type {Object[]} */ ...args) {
  function _EXT (/** @type {Object[]} */ ...args) {
    let targetObject, deep, start;
    if (typeof args[0] === "boolean") {
      targetObject = args[1], deep = args[0], start = 2;
    } else {
      targetObject = args[0], deep = false, start = 1;
    }
    for (let i = start, length = args.length, sourceObject; i < length; i++) {
      sourceObject = args[i];
      if (sourceObject != null) {
        for (let key in sourceObject) {
          if (Object.hasOwn(sourceObject, key)) {
            if (typeof sourceObject[key] === "object" && deep) {
              targetObject[key] = _EXT(true, {}, sourceObject[key]);
            } else {
              targetObject[key] = sourceObject[key];
            }
          }
        }
      }
    }
    return targetObject;
  }
  return _EXT(...args);
}


/* sizeIn(object): integer */
/** @return {number} */
const sizeIn = (/** @type {Object} */ obj) =>
  Object.getOwnPropertyNames(obj).length
    + Object.getOwnPropertySymbols(obj).length;


/* unBind(function): function */
/** @return {Function} */
const unBind = (/** @type {Function} */ fn) => Function.prototype.call.bind(fn);


/* bind(function, context: any): function */
/** @return {Function} */
const bind = Function.prototype.call.bind(Function.prototype.bind);


/* constant(value: any): any */
/** @return {any} */
const constant = (/** @type {any} */ value) => () => value;


/* identity(value: any): any */
/** @return {any} */
const identity = (/** @type {any} */ value) => value;


/* noop(): undefined */
/** @return {void} */
function noop () {}


/* T(): true */
/** @return {boolean} */
const T = () => true;


/* F(): false */
/** @return {boolean} */
const F = () => false;


/* nanoid([size = 21 [,
  alphabet="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_-"]])
  : string */
/** @return {string} */
function nanoid (
  /** @type {number} */ size = 21,
  /** @type {string} */
  alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_-"
  ) {
  let result = "", dl = alphabet.length, pos, index = size;
  while (index--) {
    do { pos = crypto.getRandomValues(new Uint8Array(1))[0]; } while (pos>=dl);
    result += alphabet[pos];
  }
  return result;
}


/* timestampID([size = 21
  [, alphabet = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz"]])
  : string */
/** @return {string} */
function timestampID (
  /** @type {number} */ size = 21,
  /** @type {string} */
  alphabet = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz"
  ) {
  let result = Date.now().toString(36).padStart(10, "0") + "-";
  let dl = alphabet.length, pos, index = ((size > 11) ? size : 12) - 11;
  while (index--) {
    do { pos = crypto.getRandomValues(new Uint8Array(1))[0]; } while (pos >=dl);
    result += alphabet[pos];
  }
  return result;
}


/** Assertion API **/


/* assertIs (
    value: any,
    expected: string | function | array<string | function> | undefined,
    message: string | error
  ): any | throw TypeError */
/** @return {any} */
function assertIs (
  /** @type {any} */ value,
  /** @type {string | function | Array<string | function> | undefined} */ expected,
  /** @type {any} */ message) {
  function _is (
    /** @type {any} */ value,
    /** @type {string | function | Array<string | function> | undefined} */ expected) {
    /* validate expected */
    if (!(["string", "function"].includes(typeof expected))
      && !Array.isArray(expected)) {
      throw new TypeError(
        `[assertIs] TypeError: expectedType must be string, function, or array. Got ${typeof expected}`
      );
    }
    /* check expected types and constructors */
    const vType = (value === null ? "null" : typeof value);
    let matched = (Array.isArray(expected) ? expected : [expected]).some(
      function (item) {
        if (typeof item === "string") { return vType === item; }
        if (typeof item === "function") {
          return value != null && value instanceof item;
        }
        /* validate expected array elements */
        throw new TypeError(
          `[assertIs] TypeError: expectedType array elements have to be a string or function. Got ${typeof item}`
        );
      }
    );
    return matched;
  }
  /* assert type checking */
  if (!_is(value, expected)) {
    if (Error.isError(message)) { throw message; }
    let vName = value.toString ? value.toString() : Object.prototype.toString.call(value);
    let eNames = (Array.isArray(expected) ? expected : [expected]).map((item) =>
      // @ts-ignore
      (typeof item === "string" ? item.toString() : item.name ?? "anonymous")
    ).join(", ");
    throw new TypeError(
      "[assertIs] Assertion failed: " + vName + " is not a " + eNames
        + (message ? " - " + message : "")
    );
  }
  return value;
}


/* assertIsNot (
    value: any,
    expected: string | function | array<string | function> | undefined,
    message: string | error
  ): any | throw TypeError */
/** @return {any} */
function assertIsNot (
  /** @type {any} */ value,
  /** @type {string | function | Array<string | function> | undefined} */ expected,
  /** @type {any} */ message) {
  function _is (
    /** @type {any} */ value,
    /** @type {string | function | Array<string | function> | undefined} */ expected) {
    /* validate expected */
    if (!(["string", "function"].includes(typeof expected))
      && !Array.isArray(expected)) {
      throw new TypeError(
        `[assertIsNot] TypeError: expectedType must be string, function, or array. Got ${typeof expected}`
      );
    }
    /* check expected types and constructors */
    const vType = (value === null ? "null" : typeof value);
    let matched = (Array.isArray(expected) ? expected : [expected]).some(
      function (item) {
        if (typeof item === "string") { return vType === item; }
        if (typeof item === "function") {
          return value != null && value instanceof item;
        }
        /* validate expected array elements */
        throw new TypeError(
          `[assertIsNot] TypeError: expectedType array elements have to be a string or function. Got ${typeof item}`
        );
      }
    );
    return matched;
  }
  /* assert type checking */
  if (_is(value, expected)) {
    if (Error.isError(message)) { throw message; }
    let vName = value.toString ? value.toString() : Object.prototype.toString.call(value);
    let eNames = (Array.isArray(expected) ? expected : [expected]).map((item) =>
      // @ts-ignore
      (typeof item === "string" ? item.toString() : item.name ?? "anonymous")
    ).join(", ");
    throw new TypeError(
      "[assertIsNot] Assertion failed: " + vName + " is a " + eNames
        + (message ? " - " + message : "")
    );
  }
  return value;
}


/* assertFail(message | error): thrown error */
/** @return {void} */
function assertFail(/** @type {any} */ message) {
  if (Error.isError(message)) {
    throw message;
  } else {
    throw new Error(
      "[assertFail] Assertion failed" + (message ? ": " + message : "")
    );
  }
}


/* assertMatch(string, regexp [, message | error]): true | thrown error */
/** @return {boolean} */
function assertMatch(
  /** @type {string} */ string,
  /** @type {RegExp} */ regexp,
  /** @type {any} */ message) {
  if (typeof string !== "string") {
    if (Error.isError(message)) { throw message; }
    throw new TypeError(
      "[assertMatch] TypeError: " + string + " is not a string"
        + (message ? " - " + message : "")
    );
  }
  if (!(regexp instanceof RegExp)) {
    if (Error.isError(message)) { throw message; }
    throw new TypeError(
      "[assertMatch] TypeError: " + regexp + " is not a RegExp"
        + (message ? " - " + message : "")
    );
  }
  if (!(regexp.test(string))) {
    if (Error.isError(message)) { throw message; }
    throw new Error(
      "[assertMatch] Assertion failed" + (message ? ": " + message : "")
    );
  }
  return true;
}


/* assertDoesNotMatch(string, regexp [, message | error]):
  true | thrown error */
/** @return {boolean} */
function assertDoesNotMatch(
  /** @type {string} */ string,
  /** @type {RegExp} */ regexp,
  /** @type {any} */ message) {
  if (typeof string !== "string") {
    if (Error.isError(message)) { throw message; }
    throw new TypeError(
      "[assertDoesNotMatch] TypeError: " + string + " is not a string"
        + (message ? " - " + message : "")
    );
  }
  if (!(regexp instanceof RegExp)) {
    if (Error.isError(message)) { throw message; }
    throw new TypeError(
      "[assertDoesNotMatch] TypeError: " + regexp + " is not a RegExp"
        + (message ? " - " + message : "")
    );
  }
  if (regexp.test(string)) {
    if (Error.isError(message)) { throw message; }
    throw new Error(
      "[assertDoesNotMatch] Assertion failed" + (message ? ": " + message : "")
    );
  }
  return true;
}


/* assertThrows(callback: function [, message | error]): error | thrown error */
/** @return {any} */
function assertThrows (
  /** @type {Function} */ callback,
  /** @type {any} */ message) {
  if (typeof callback !== "function") {
    throw new TypeError(
      "[assertThrows] TypeError: " + callback + " is not a function"
        + (message ? " - " + message : "")
    );
  }
  try { callback(); } catch (err) { return err; }
  if (Error.isError(message)) { throw message; }
  throw new Error(
    "[assertThrow] Assertion failed" + (message ? ": " + message : "")
  );
}


/* assertIsNotNil(value: any [, message | error]): value | thrown error */
function assertIsNotNil (/** @type {any} */ value, /** @type {any} */ message) {
  if (value == null) {
    if (Error.isError(message)) { throw message; }
    throw new TypeError(
      "[assertIsNotNil] Assertion failed: " + value + " is null or undefined"
        + (message ? " - " + message : "")
    );
  }
  return value;
}


/* assertIsNil(value: any [, message | error]): value | thrown error */
/** @return {any} */
function assertIsNil (/** @type {any} */ value, /** @type {any} */ message) {
  if (value != null) {
    if (Error.isError(message)) { throw message; }
    throw new TypeError(
      "[assertIsNil] Assertion failed: " + value + " is not null or undefined"
        + (message ? " - " + message : "")
    );
  }
  return value;
}


/* assertTypeOf(value: any, type: string [, message | error]):
  value | thrown error */
/** @deprecated * @return {any} */
function assertTypeOf (
  /** @type {any} */ value,
  /** @type {string} */ type,
  /** @type {any} */ message) {
  const _type = (/** @type {any} */ value) =>
    ((value === null) ? "null" : (typeof value));
  if (typeof type !== "string") {
    if (Error.isError(message)) { throw message; }
    throw new TypeError(
      "[assertTypeOf] TypeError: " + type + " is not a string"
        + (message ? " - " + message : "")
    );
  }
  if (_type(value) !== type) {
    if (Error.isError(message)) { throw message; }
    throw new TypeError(
      "[assertTypeOf] Assertion failed: " + value + " is not a " + type
        + (message ? " - " + message : "")
    );
  }
  return value;
}


/* assertNotTypeOf(value: any, type: string [, message | error]):
  value | thrown error */
/** @deprecated * @return {any} */
function assertNotTypeOf (
  /** @type {any} */ value,
  /** @type {string} */ type,
  /** @type {any} */ message) {
  const _type = (/** @type {any} */ value) =>
    ((value === null) ? "null" : (typeof value));
  if (typeof type !== "string") {
    if (Error.isError(message)) { throw message; }
    throw new TypeError(
      "[assertNotTypeOf] TypeError: " + type + " is not a string"
        + (message ? " - " + message : "")
    );
  }
  if (_type(value) === type) {
    if (Error.isError(message)) { throw message; }
    throw new TypeError(
      "[assertNotTypeOf] Assertion failed: " + value + " is not a " + type
        + (message ? " - " + message : "")
    );
  }
  return value;
}


/* assertInstanceOf(value: any, Class: constructor [, message | error]):
  value | thrown error */
/** @deprecated * @return {any} */
function assertInstanceOf (
  /** @type {any} */ value,
  /** @type {Function} */ Class,
  /** @type {any} */ message) {
  if (typeof Class !== "function") {
    if (Error.isError(message)) { throw message; }
    throw new TypeError(
      "[assertInstanceOf] TypeError: " + Class + " is not a function"
        + (message ? " - " + message : "")
    );
  }
  if (!(value instanceof Class)) {
    if (Error.isError(message)) { throw message; }
    throw new TypeError(
      "[assertInstanceOf] Assertion failed: " + value + " is not a "
        + ((Class.name !== "") ? Class.name : Class)
        + (message ? " - " + message : "")
    );
  }
  return value;
}


/* assertNotInstanceOf(value: any, Class: constructor [, message | error]):
  value | thrown error */
/** @deprecated * @return {any} */
function assertNotInstanceOf (
  /** @type {any} */ value,
  /** @type {Function} */ Class,
  /** @type {any} */ message) {
  if (typeof Class !== "function") {
    if (Error.isError(message)) { throw message; }
    throw new TypeError(
      "[assertNotInstanceOf] TypeError: " + Class + " is not a function"
        + (message ? " - " + message : "")
    );
  }
  if (value instanceof Class) {
    if (Error.isError(message)) { throw message; }
    throw new TypeError(
      "[assertNotInstanceOf] Assertion failed: " + value + " is not a "
        + ((Class.name !== "") ? Class.name : Class)
        + (message ? " - " + message : "")
    );
  }
  return value;
}


/* assert(value: any [, message | error]): true | thrown error */
/** @return {boolean} */
function assert (/** @type {any} */ condition, /** @type {any} */ message) {
  if (!condition) {
    if (Error.isError(message)) { throw message; }
    throw new Error(
      "[assert] Assertion failed" + (message ? ": " + message : "")
    );
  }
  return true;
}


/* assertTrue(value: any [, message]): true | thrown error */
/** @return {boolean} */
function assertTrue (/** @type {any} */ condition, /** @type {any} */ message) {
  if (!condition) {
    if (Error.isError(message)) { throw message; }
    throw new Error(
      "[assertTrue] Assertion failed" + (message ? ": " + message : "")
    );
  }
  return true;
}


/* assertFalse(value: any [, message] | error): true | thrown error */
/** @return {boolean} */
function assertFalse (/** @type {any} */ condition, /** @type {any} */ message) {
  if (condition) {
    if (Error.isError(message)) { throw message; }
    throw new Error(
      "[assertFalse] Assertion failed" + (message ? ": " + message : "")
    );
  }
  return true;
}


/* assertEqual(x: any, y: any [, message | error]): true | thrown error */
/* loose equality + NaN equality */
/** @return {boolean} */
function assertEqual (
  /** @type {any} */ x,
  /** @type {any} */ y,
  /** @type {any} */ message) {
  if (!(x == y || (x !== x && y !== y))) {
    if (Error.isError(message)) { throw message; }
    throw new Error(
      "[assertEqual] Assertion failed" + (message ? ": " + message : "")
    );
  }
  return true;
}


/* assertStrictEqual(x: any, y: any [, message | error]): true | thrown error */
/* SameValue equality */
/** @return {boolean} */
function assertStrictEqual (
  /** @type {any} */ x,
  /** @type {any} */ y,
  /** @type {any} */ message) {
  if (!((x === y) ? (x !== 0 || 1/x === 1/y) : (x !== x && y !== y))) {
    if (Error.isError(message)) { throw message; }
    throw new Error("[assertStrictEqual] Assertion failed"
      + (message ? ": " + message : "")
    );
  }
  return true;
}


/* assertNotEqual(x: any, y: any [, message | error]): true | thrown error */
/* loose equality + NaN equality */
/** @return {boolean} */
function assertNotEqual (
  /** @type {any} */ x,
  /** @type {any} */ y,
  /** @type {any} */ message) {
  if (x == y || (x !== x && y !== y)) {
    if (Error.isError(message)) { throw message; }
    throw new Error("[assertNotEqual] Assertion failed"
      + (message ? ": " + message : "")
    );
  }
  return true;
}


/* assertNotStrictEqual(x: any, y: any [, message | error]):
  true | thrown error */
/* SameValue equality */
/** @return {boolean} */
function assertNotStrictEqual (
  /** @type {any} */ x,
  /** @type {any} */ y,
  /** @type {any} */ message) {
  if ((x === y) ? (x !== 0 || 1/x === 1/y) : (x !== x && y !== y)) {
    if (Error.isError(message)) { throw message; }
    throw new Error("[assertNotStrictEqual] Assertion failed"
      + (message ? ": " + message : "")
    );
  }
  return true;
}


/* assertDeepEqual(x: any, y: any [, message | error]): true | thrown error */
/** @return {boolean} */
function assertDeepEqual (
  /** @type {any} */ x,
  /** @type {any} */ y,
  /** @type {any} */ message) {
  function _isDeepEqual (/** @type {any} */ x, /** @type {any} */ y) {
    /* helper functions */
    // @ts-ignore
    const _deepType = (/** @type {any} */ x) =>
      ((x === null) ? "null" : (x !== x) ? "NaN" : (typeof x));
    // @ts-ignore
    const _isPrimitive = (/** @type {any} */ x) =>
      (x == null || (typeof x !== "object" && typeof x !== "function"));
    const _isObject = (/** @type {any} */ x) =>
      (x != null && typeof x === "object");
    const _isSameInstance = (
      /** @type {any} */ x,
      /** @type {any} */ y,
      /** @type {Function} */ Class) =>
      (x instanceof Class) && (y instanceof Class);
    // @ts-ignore
    const _classof = (/** @type {any} */ x) =>
      Object.prototype.toString.call(x).slice(8, -1).toLowerCase();
    const _ownKeys = (/** @type {Object} */ x) =>
      // @ts-ignore
      Object.getOwnPropertyNames(x).concat(Object.getOwnPropertySymbols(x));
    /* strict equality helper function */
    /* const _isEqual = (x, y) => Object.is(x, y); */
    /* not strict equality helper function */
    const _isEqual = (/** @type {any} */ x, /** @type {any} */ y) =>
      (x == y || (x !== x && y !== y));
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
        return x.every(
          (/** @type {any} */ value, /** @type {string | number} */ index) =>
            _isDeepEqual(value, y[index])
        );
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
        return x.every(
          (/** @type {any} */ value, /** @type {string | number} */ index) =>
            _isEqual(value, y[index])
        );
      }
      /* objects / ArrayBuffer */
      if (_isSameInstance(x, y, ArrayBuffer)) {
        if (x.byteLength !== y.byteLength) { return false; }
        if (x.byteLength === 0) { return true; }
        let xTA = new Int8Array(x), yTA = new Int8Array(y);
        return xTA.every(
          (/** @type {any} */ value, /** @type {string | number} */ index) =>
            _isEqual(value, yTA[index]));
      }
      /* objects / DataView */
      if (_isSameInstance(x, y, DataView)) {
        if (x.byteLength !== y.byteLength) { return false; }
        if (x.byteLength === 0) { return true; }
        for (let index = 0; index < x.byteLength; index++) {
          if (!_isEqual(x.getUint8(index), y.getUint8(index))) { return false; }
        }
        return true;
      }
      /* objects / Map */
      if (_isSameInstance(x, y, Map)) {
        if (x.size !== y.size) { return false; }
        if (x.size === 0) { return true; }
        return [...x.keys()].every((/** @type {any} */ value) =>
          _isDeepEqual(x.get(value), y.get(value)));
      }
      /* objects / Set */
      if (_isSameInstance(x, y, Set)) {
        if (x.size !== y.size) { return false; }
        if (x.size === 0) { return true; }
        return [...x.keys()].every((/** @type {any} */value) => y.has(value));
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
    if (Error.isError(message)) { throw message; }
    throw new Error("[assertDeepEqual] Assertion failed"
      + (message ? ": " + message : "")
    );
  }
  return true;
}


/* assertNotDeepStrictEqual(x: any, y: any [, message | error]):
  true | throw error */
/** @return {boolean} */
function assertNotDeepStrictEqual (
  /** @type {any} */ x,
  /** @type {any} */ y,
  /** @type {any} */ message) {
  function _isDeepStrictEqual (/** @type {any} */ x, /** @type {any} */ y) {
    /* helper functions */
    const _deepType = (/** @type {any} */ x) =>
      ((x === null) ? "null" : (x !== x) ? "NaN" : (typeof x));
    const _isPrimitive = (/** @type {any} */ x) =>
      (x == null || (typeof x !== "object" && typeof x !== "function"));
    const _isObject = (/** @type {any} */ x) =>
      (x != null && typeof x === "object");
    const _isSameInstance = (
      /** @type {any} */ x,
      /** @type {any} */ y,
      /** @type {Function} */ Class) =>
      (x instanceof Class) && (y instanceof Class);
    const _classof = (/** @type {any} */ x) =>
      Object.prototype.toString.call(x).slice(8, -1).toLowerCase();
    /** @return {any[]} */
    const _ownKeys = (/** @type {Object} */ x) =>
      // @ts-ignore
      Object.getOwnPropertyNames(x).concat(Object.getOwnPropertySymbols(x));
    /* strict equality helper function */
    const _isEqual = (/** @type {any} */ x, /** @type {any} */ y) =>
      Object.is(x, y);
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
        return x.every(
          (/** @type {any} */ value, /** @type {string | number} */ index) =>
            _isDeepStrictEqual(value, y[index])
        );
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
        return x.every(
          (/** @type {any} */ value, /** @type {string | number} */ index) =>
            _isEqual(value, y[index])
        );
      }
      /* objects / ArrayBuffer */
      if (_isSameInstance(x, y, ArrayBuffer)) {
        if (x.byteLength !== y.byteLength) { return false; }
        if (x.byteLength === 0) { return true; }
        let xTA = new Int8Array(x), yTA = new Int8Array(y);
        return xTA.every(
          (/** @type {any} */ value, /** @type {string | number} */ index) =>
            _isEqual(value, yTA[index]));
      }
      /* objects / DataView */
      if (_isSameInstance(x, y, DataView)) {
        if (x.byteLength !== y.byteLength) { return false; }
        if (x.byteLength === 0) { return true; }
        for (let index = 0; index < x.byteLength; index++) {
          if (!_isEqual(x.getUint8(index), y.getUint8(index))) { return false; }
        }
        return true;
      }
      /* objects / Map */
      if (_isSameInstance(x, y, Map)) {
        if (x.size !== y.size) { return false; }
        if (x.size === 0) { return true; }
        return [...x.keys()].every((/** @type {any} */v) =>
          _isDeepStrictEqual(x.get(v), y.get(v)));
      }
      /* objects / Set */
      if (_isSameInstance(x, y, Set)) {
        if (x.size !== y.size) { return false; }
        if (x.size === 0) { return true; }
        return [...x.keys()].every((/** @type {any} */ value) => y.has(value));
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
    if (Error.isError(message)) { throw message; }
    throw new Error("[assertNotDeepStrictEqual] Assertion failed"
      + (message ? ": " + message : "")
    );
  }
  return true;
}


/* assertNotDeepEqual(x: any, y: any [, message | error]):
  true | thrown error */
/** @return {boolean} */
function assertNotDeepEqual (
  /** @type {any} */ x,
  /** @type {any} */ y,
  /** @type {any} */ message) {
  function _isDeepEqual (/** @type {any} */ x, /** @type {any} */ y) {
    /* helper functions */
    // @ts-ignore
    const _deepType = (/** @type {any} */ x) =>
      ((x === null) ? "null" : (x !== x) ? "NaN" : (typeof x));
    // @ts-ignore
    const _isPrimitive = (/** @type {any} */ x) =>
      (x == null || (typeof x !== "object" && typeof x !== "function"));
    const _isObject = (/** @type {any} */ x) =>
      (x != null && typeof x === "object");
    const _isSameInstance = (
      /** @type {any} */ x,
      /** @type {any} */ y,
      /** @type {Function} */ Class) =>
      (x instanceof Class) && (y instanceof Class);
    // @ts-ignore
    const _classof = (/** @type {any} */ x) =>
      Object.prototype.toString.call(x).slice(8, -1).toLowerCase();
    const _ownKeys = (/** @type {Object} */ x) =>
      // @ts-ignore
      Object.getOwnPropertyNames(x).concat(Object.getOwnPropertySymbols(x));
    /* strict equality helper function */
    /* const _isEqual = (x, y) => Object.is(x, y); */
    /* not strict equality helper function */
    const _isEqual = (/** @type {any} */ x, /** @type {any} */ y) =>
      (x == y || (x !== x && y !== y));
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
        return x.every(
          (/** @type {any} */ value, /** @type {string | number} */ index) =>
            _isDeepEqual(value, y[index])
        );
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
        return x.every(
          (/** @type {any} */ value, /** @type {string | number} */ index) =>
            _isEqual(value, y[index])
        );
      }
      /* objects / ArrayBuffer */
      if (_isSameInstance(x, y, ArrayBuffer)) {
        if (x.byteLength !== y.byteLength) { return false; }
        if (x.byteLength === 0) { return true; }
        let xTA = new Int8Array(x), yTA = new Int8Array(y);
        return xTA.every(
          (/** @type {any} */ value, /** @type {string | number} */ index) =>
            _isEqual(value, yTA[index]));
      }
      /* objects / DataView */
      if (_isSameInstance(x, y, DataView)) {
        if (x.byteLength !== y.byteLength) { return false; }
        if (x.byteLength === 0) { return true; }
        for (let index = 0; index < x.byteLength; index++) {
          if (!_isEqual(x.getUint8(index), y.getUint8(index))) { return false; }
        }
        return true;
      }
      /* objects / Map */
      if (_isSameInstance(x, y, Map)) {
        if (x.size !== y.size) { return false; }
        if (x.size === 0) { return true; }
        return [...x.keys()].every((/** @type {any} */v) =>
          _isDeepEqual(x.get(v), y.get(v)));
      }
      /* objects / Set */
      if (_isSameInstance(x, y, Set)) {
        if (x.size !== y.size) { return false; }
        if (x.size === 0) { return true; }
        return [...x.keys()].every((/** @type {any} */ value) => y.has(value));
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
    if (Error.isError(message)) { throw message; }
    throw new Error("[assertNotDeepEqual] Assertion failed"
      + (message ? ": " + message : "")
    );
  }
  return true;
}


/* assertDeepStrictEqual(x: any, y: any [, message | error]):
  true | thrown error */
/** @return {boolean} */
function assertDeepStrictEqual (
  /** @type {any} */ x,
  /** @type {any} */ y,
  /** @type {any} */ message) {
  function _isDeepStrictEqual (/** @type {any} */ x, /** @type {any} */ y) {
    /* helper functions */
    const _deepType = (/** @type {any} */ x) =>
      ((x === null) ? "null" : (x !== x) ? "NaN" : (typeof x));
    const _isPrimitive = (/** @type {any} */ x) =>
      (x == null || (typeof x !== "object" && typeof x !== "function"));
    const _isObject = (/** @type {any} */ x) =>
      (x != null && typeof x === "object");
    const _isSameInstance = (
      /** @type {any} */ x,
      /** @type {any} */ y,
      /** @type {Function} */ Class) =>
      (x instanceof Class) && (y instanceof Class);
    const _classof = (/** @type {any} */ x) =>
      Object.prototype.toString.call(x).slice(8, -1).toLowerCase();
    const _ownKeys = (/** @type {Object} */ x) =>
      // @ts-ignore
      Object.getOwnPropertyNames(x).concat(Object.getOwnPropertySymbols(x));
    /* strict equality helper function */
    const _isEqual = (/** @type {any} */ x, /** @type {any} */ y) =>
      Object.is(x, y);
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
        return x.every(
          (/** @type {any} */ value, /** @type {string | number} */ index) =>
            _isDeepStrictEqual(value, y[index])
        );
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
        return x.every(
          (/** @type {any} */ value, /** @type {string | number} */ index) =>
            _isEqual(value, y[index])
        );
      }
      /* objects / ArrayBuffer */
      if (_isSameInstance(x, y, ArrayBuffer)) {
        if (x.byteLength !== y.byteLength) { return false; }
        if (x.byteLength === 0) { return true; }
        let xTA = new Int8Array(x), yTA = new Int8Array(y);
        return xTA.every((/** @type {any} */ value, /** @type {string | number} */ index) =>
          _isEqual(value, yTA[index]));
      }
      /* objects / DataView */
      if (_isSameInstance(x, y, DataView)) {
        if (x.byteLength !== y.byteLength) { return false; }
        if (x.byteLength === 0) { return true; }
        for (let index = 0; index < x.byteLength; index++) {
          if (!_isEqual(x.getUint8(index), y.getUint8(index))) { return false; }
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
        return [...x.keys()].every((/** @type {any} */ value) => y.has(value));
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
            .reduce((acc, k) => { acc[k] = y[k]; return acc; }, {})
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
    if (Error.isError(message)) { throw message; }
    throw new Error("[assertDeepStrictEqual] Assertion failed"
      + (message ? ": " + message : "")
    );
  }
  return true;
}


/** String API **/


/* b64Encode(s: any): string */
/** @return {string} */
function b64Encode (/** @type {any} */ str) {
  return btoa(encodeURIComponent(String(str)).replace(/%([0-9A-F]{2})/g,
    function toSolidBytes (_match, p1) {
      // @ts-ignore
      return String.fromCharCode("0x" + p1);
    }
  ));
}


/* b64Decode(s: string): string */
/** @return {string} */
function b64Decode (/** @type {any} */ str) {
  return decodeURIComponent(atob(String(str)).split("").map(function (c) {
    return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(""));
}


/* strTruncate(string: string, newLength: integer [, omission: string = ""]):
  string */
/** @return {string} */
function strTruncate (
  /** @type {any} */ str,
  /** @type {number} */ newLength,
  /** @type {string} */ omission = "") {
  str = String(str);
  omission = String(omission);
  let strUC = Array.from(str);
  if (newLength >= strUC.length) { return str; }
  return strUC.slice(0, newLength-Array.from(omission).length).join("")
    + omission;
}


/* strPropercase(s: any): string */
/** @return {string} */
const strPropercase = (/** @type {any} */ str) =>
  String(str).split(" ").map(function (/** @type {string} */ value) {
    let chars = Array.from(value).map( (c) => c.toLowerCase() );
    if (chars.length) { chars[0] = chars[0].toUpperCase(); }
    return chars.join("");
  }).join(" ");


/* strTitlecase(s: any): string */
/** @return {string} */
const strTitlecase = (/** @type {any} */ str) =>
  String(str).split(" ").map(function (/** @type {string} */ value) {
    let chars = Array.from(value).map( (c) => c.toLowerCase() );
    if (chars.length) { chars[0] = chars[0].toUpperCase(); }
    return chars.join("");
  }).join(" ");


/* strCapitalize(s: any): string */
/** @return {string} */
function strCapitalize (/** @type {any} */ str) {
  let chars = [...String(str).toLowerCase()];
  if (chars.length) { chars[0] = chars[0].toUpperCase(); }
  return chars.join("");
}


/* strUpFirst(s: any): string */
/** @return {string} */
function strUpFirst (/** @type {any} */ str) {
  let chars = [...String(str)];
  if (chars.length) { chars[0] = chars[0].toUpperCase(); }
  return chars.join("");
}


/* strDownFirst(s: any): string */
/** @return {string} */
function strDownFirst (/** @type {any} */ str) {
  let chars = [...String(str)];
  if (chars.length) { chars[0] = chars[0].toLowerCase(); }
  return chars.join("");
}


/* strReverse(s: any): string */
/** @return {string} */
const strReverse = (/** @type {any} */ str) =>
  Array.from(String(str)).reverse().join("");


/* strCodePoints(s: any): array of strings */
/** @return {any[]} */
const strCodePoints = (/** @type {any} */ str) =>
  Array.from(String(str),
    (/** @type {string} */ value) => value.codePointAt(0)
  );


/* strFromCodePoints(iterator: iterator): string */
/** @return {string} */
const strFromCodePoints = (/** @type {Iterable<any>} */ [...array]) =>
  String.fromCodePoint(...array);


/* strAt(string: string, index: number [, newChar: string]): string */
/** @return {string} */
function strAt (
  /** @type {string} */ str,
   /** @type {number} */ index,
   /** @type {string} */ newChar) {
  let chars = Array.from(String(str));
  if (newChar == null) { return chars.at(index) || ""; }
  index = index < 0 ? chars.length + index : index;
  if (index > chars.length) { return chars.join(""); }
  chars[index] = newChar;
  return chars.join("");
}


/* strSplice(string: string, index: number, count: integer [, add: string]):
  string */
/** @return {string} */
const strSplice = (
  /** @type {string} */ str,
  /** @type {Number} */ index,
  /** @type {number} */ count,
  /** @type {any[]} */ ...add) =>
  Array.from(str).toSpliced(index, count, add.join("")).join("");


/* strHTMLRemoveTags(s: any): string */
/** @return {string} */
const strHTMLRemoveTags = (/** @type {any} */ str) =>
  String(str).replace(/<[^>]*>/g, " ").replace(/\s{2,}/g, " ").trim();


/* strHTMLEscape(s: any): string */
/** @return {string} */
const strHTMLEscape = (/** @type {string} */ str) =>
  String(str).replace(/&/g, "&amp;")
    .replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;").replace(/'/g, "&apos;");


/* strHTMLUnEscape(s: any): string */
/** @return {string} */
const strHTMLUnEscape = (/** @type {string} */ str) => String(str)
  .replace(/&amp;/g, "&").replace(/&#38;/g, "&")
  .replace(/&lt;/g, "<").replace(/&#60;/g, "<")
  .replace(/&gt;/g, ">").replace(/&#62;/g, ">")
  .replace(/&quot;/g, '"').replace(/&#34;/g, '"')
  .replace(/&apos;/g, "'").replace(/&#39;/g, "'");


/** DOM API **/


/* qsa(selector: string [, context: element object]): array */
/** @return {any[]} */
const qsa = (
  /** @type {string} */ str,
  /** @type {Object} */ context = document) =>
  Array.from(context.querySelectorAll(str));


/* qs(selector: string [, context: element object]): element object | null */
/** @return {HTMLElement} */
const qs = (
  /** @type {string} */ str,
  /** @type {Object} */ context = document) =>
  context.querySelector(str);


/* domReady(callback: function): undefined */
/** @return {void} */
function domReady (/** @type {Function} */ fn) {
  if (document.readyState !== "loading") {
    fn();
  } else {
    document.addEventListener("DOMContentLoaded", function (_event) { fn(); });
  }
}


/* domCreate(type: string[, properties: object[, innerHTML: string]]):
  element */
/* domCreate(element descriptive object): element */
/** @return {HTMLElement} */
function domCreate (
  /** @type {string | Object} */ elType,
  /** @type {Object} */ properties,
  /** @type {string} */ innerHTML) {
  if (arguments.length === 1 && typeof elType === "object") {
    let obj = elType;
    elType = obj.elementType;
    properties = {};
    for (let key in obj) {
      if (key !== "elementType") { properties[key] = obj[key]; }
    }
  }
  let el = document.createElement(elType);
  if (properties) {
    for (let key in properties) {
      if (key !== "style" || typeof properties[key] === "string") {
        el[key] = properties[key];
      } else {
        Object.assign(el.style, properties[key]);
      }
    }
  }
  if (innerHTML) { el.innerHTML = innerHTML; }
  return el;
}


/* domToElement(htmlString): element object */
/** @return {Element | null} */
function domToElement (/** @type {string} */ str) {
  let el = document.createElement("div");
  el.innerHTML = str;
  return el.firstElementChild;
}


/* domGetCSS(element [, property: string]): string */
/** @return {any} */
const domGetCSS = (
  /** @type {Element} */ el,
  /** @type {string | number} */ property) =>
  (property ? globalThis.getComputedStyle(el, null)[property] :
    globalThis.getComputedStyle(el, null));


/* domSetCSS(element, property: string, value: string): undefined */
/* domSetCSS(element, properties: object): undefined */
/** @return {void} */
function domSetCSS (
  /** @type {HTMLElement} */ el,
  /** @type {string | Object} */ property,
  /** @type {string} */ value) {
  if (typeof property === "string") {
    el.style[property] = value;
  } else if (typeof property === "object") {
    Object.keys(property).forEach((p) => (el.style[p] = property[p]));
  }
}


/* domFadeIn(element [, duration = 500 [, display = ""]]): undefined */
/** @return {void} */
function domFadeIn (
  /** @type {HTMLElement} */ el,
  /** @type {number} */ duration,
  /** @type {string} */ display) {
  let s = el.style, step = 25/(duration || 500);
  // @ts-ignore
  s.opacity = (s.opacity || 0);
  s.display = (display || "");
  (function fade () {
    // @ts-ignore
    (s.opacity=parseFloat(s.opacity)+step)>1 ? s.opacity=1 :setTimeout(fade,25);
  })();
}


/* domFadeOut(element [, duration = 500]): undefined */
/** @return {void} */
function domFadeOut (
  /** @type {HTMLElement} */ el,
  /** @type {number} */ duration) {
  let style = el.style, step = 25/(duration || 500);
  // @ts-ignore
  style.opacity = (style.opacity || 1);
  (function fade () {
    // @ts-ignore
    (style.opacity -= step) < 0 ? style.display = "none" : setTimeout(fade, 25);
  })();
}


/* domFadeToggle(element [, duration = 500 [, display = ""]]): undefined */
/** @return {void} */
function domFadeToggle (
  /** @type {HTMLElement} */ el,
  /** @type {number} */ duration,
  /** @type {string} */ display = "") {
  if (globalThis.getComputedStyle(el, null).display === "none") {
    /* same as domFadeIn(); */
    let style = el.style, step = 25/(duration || 500);
    // @ts-ignore
    style.opacity = (style.opacity || 0);
    style.display = (display || "");
    (function fade () {
      // @ts-ignore
      (style.opacity = parseFloat(style.opacity) + step) > 1 ? style.opacity = 1 :
        setTimeout(fade, 25);
    })();
  } else {
    /* same as domFadeOut(); */
    let style = el.style, step = 25/(duration || 500);
    // @ts-ignore
    style.opacity = (style.opacity || 1);
    (function fade () {
      // @ts-ignore
      (style.opacity -= step) < 0 ? style.display = "none" : setTimeout(fade, 25);
    })();
  }
}


/* domHide(element): undefined */
/** @return {any} */
const domHide = (/** @type {HTMLElement} */ el) => el.style.display = "none";


/* domShow(element [, display = ""]): undefined */
/** @return {any} */
const domShow = (
  /** @type {HTMLElement} */ el,
  /** @type {string} */ display = "") =>
  el.style.display = display;


/* domToggle(element [, display: string]): undefined */
/** @return {void} */
function domToggle (
  /** @type {HTMLElement} */ el,
  /** @type {string} */ display = "") {
  if (globalThis.getComputedStyle(el, null).display === "none") {
    el.style.display = display;
  } else {
    el.style.display = "none";
  }
}


/* domIsHidden(element): boolean */
/** @return {boolean} */
const domIsHidden = (/** @type {Element} */ el) =>
  (globalThis.getComputedStyle(el,null).display === "none");


/* domSiblings(element): array */
/** @return {any[]} */
const domSiblings = (/** @type {Element} */ el) =>
  // @ts-ignore
  Array.prototype.filter.call(el.parentNode.children,
    (/** @type {Element} */ e) => (e !== el)
  );


/* domSiblingsPrev(element): any[] */
/** @return {any[]} */
const domSiblingsPrev = (/** @type {Element} */ el) =>
  Array.prototype.slice.call(
    // @ts-ignore
    el.parentNode.children, 0,
    // @ts-ignore
    Array.prototype.indexOf.call(el.parentNode.children, el)
  );


/* domSiblingsLeft(element): any[] */
/** @return {any[]} */
const domSiblingsLeft = (/** @type {Element} */ el) =>
  Array.prototype.slice.call(
    // @ts-ignore
    el.parentNode.children, 0,
    // @ts-ignore
    Array.prototype.indexOf.call(el.parentNode.children, el)
  );


/* domSiblingsNext(element): any[] */
/** @return {any[]} */
const domSiblingsNext = (/** @type {Element} */ el) =>
  Array.prototype.slice.call(
    // @ts-ignore
    el.parentNode.children,
    // @ts-ignore
    Array.prototype.indexOf.call(el.parentNode.children, el) + 1,
    // @ts-ignore
    el.parentNode.children.length
  );


/* domSiblingsRight(element): any[] */
/** @return {any[]} */
const domSiblingsRight = (/** @type {HTMLElement} */ el) =>
  Array.prototype.slice.call(
    // @ts-ignore
    el.parentNode.children,
    // @ts-ignore
    Array.prototype.indexOf.call(el.parentNode.children, el) + 1,
    // @ts-ignore
    el.parentNode.children.length
  );


/* importScript(script1: string [, scriptN: string]): undefined */
/** @return {void} */
function importScript (/** @type {string[]} */ ...scripts) {
  for (let item of scripts) {
    let el = document.createElement("script");
    el.type = "text\/javascript";
    el.src = item;
    el.onerror = function (e) {
      throw new URIError(
        // @ts-ignore
        "Loading failed for the script with source " + e.target.src
      );
    };
    (document.head||document.getElementsByTagName("head")[0]).appendChild(el);
  }
}


/* importStyle(style1: string [, styleN: string]): undefined */
/** @return {void} */
function importStyle (/** @type {string[]} */ ...styles) {
  for (let item of styles) {
    let el = document.createElement("link");
    el.rel = "stylesheet";
    el.type = "text\/css";
    el.href = item;
    el.onerror = function (e) {
      throw new URIError(
        // @ts-ignore
        "Loading failed for the style with source " + e.target.href
      );
    };
    (document.head ||document.getElementsByTagName("head")[0]).appendChild(el);
  }
}


/* form2array(form): any[] */
/** @return {any[]} */
function form2array (/** @type {any} */ form) {
  let field, result = [];
  if (typeof form === "object" && form.nodeName.toLowerCase() === "form") {
    for (let i=0, len=form.elements.length; i<len; i++) {
      field = form.elements[i];
      if (field.name && !field.disabled
        && field.type !== "file"
        && field.type !== "reset"
        && field.type !== "submit"
        && field.type !== "button") {
        if (field.type === "select-multiple") {
          for (let j=0, l=form.elements[i].options.length; j<l; j++) {
            if(field.options[j].selected) {
              result.push({
                "name": encodeURIComponent(field.name),
                "value": encodeURIComponent(field.options[j].value)
              });
            }
          }
        } else if ((field.type!=="checkbox" && field.type!=="radio")
            ||field.checked
          ) {
          result.push({
            "name": encodeURIComponent(field.name),
            "value": encodeURIComponent(field.value)
          });
        }
      }
    }
  }
  return result;
}


/* form2string(form): string */
/** @return {string} */
function form2string (/** @type {any} */ form) {
  let field, result = [];
  if (typeof form === "object" && form.nodeName.toLowerCase() === "form") {
    for (let i=0, len=form.elements.length; i<len; i++) {
      field = form.elements[i];
      if (field.name && !field.disabled
        && field.type !== "file"
        && field.type !== "reset"
        && field.type !== "submit"
        && field.type !== "button") {
        if (field.type === "select-multiple") {
          for (let j=0, l=form.elements[i].options.length; j<l; j++) {
            if(field.options[j].selected) {
              result.push(encodeURIComponent(field.name)
                + "=" + encodeURIComponent(field.options[j].value));
            }
          }
        } else if ((field.type!=="checkbox" && field.type!=="radio")
          || field.checked) {
          result.push(encodeURIComponent(field.name)
            + "=" + encodeURIComponent(field.value)
          );
        }
      }
    }
  }
  return result.join("&").replace(/%20/g, "+");
}


/* getDoNotTrack(): boolean */
/** @return {boolean} */
const getDoNotTrack = () =>
  // @ts-ignore
  [navigator.doNotTrack, globalThis.doNotTrack, navigator.msDoNotTrack]
    .some((/** @type {any} */ item) =>
      (item === true || item === 1 || item === "1")
    );


/* getLocation(success: function [, error: function]): undefined */
/** @return {void} */
function getLocation (
  /** @type {Function} */ successFn,
  /** @type {Function} */ errorFn) {
  if (!errorFn) { errorFn = function () {}; }
  function getE (/** @type {any} */ error) {
    // @ts-ignore
    errorFn("ERROR(" + error.code + "): " + error.message);
  }
  if (navigator.geolocation) {
    // @ts-ignore
    navigator.geolocation.getCurrentPosition(successFn, getE);
  } else {
    getE("Geolocation is not supported in this browser.");
  }
}


/* createFile(filename: string, content: string [,dataType:string]):
  undefined */
/** @return {void} */
function createFile (
  /** @type {string} */ filename,
  /** @type {string} */ content,
  /** @type {string} */ dataType) {
  let length = arguments.length;
  if (length > 1) {
    if (length === 2) { dataType = "text/plain"; }
    let blob = new Blob([content], {type: dataType});
    let el = globalThis.document.createElement("a");
    el.href = globalThis.URL.createObjectURL(blob);
    el.download = filename;
    document.body.appendChild(el);
    el.click();
    document.body.removeChild(el);
    globalThis.URL.revokeObjectURL(el.href);
  } else {
    throw new Error("Celestra createFile error: too few parameters.");
  }
}


/* getFullscreen(): element object | undefined */
/** @return {document | HTMLElement | undefined} */
const getFullscreen = () => (
  document.fullscreenElement
  // @ts-ignore
  || document.mozFullScreenElement
  // @ts-ignore
  || document.webkitFullscreenElement
  // @ts-ignore
  || document.msFullscreenElement
  || undefined
);


/* setFullscreenOn(element): undefined */
/* setFullscreenOn(selector string): undefined */
/** @return {void} */
function setFullscreenOn (/** @type {HTMLElement | string} */ el) {
  let elem;
  if (typeof el === "string") { elem = document.querySelector(el); }
    else if (typeof el === "object") { elem = el; }
  // @ts-ignore
  if (elem.requestFullscreen) { elem.requestFullscreen(); }
    // @ts-ignore
    else if (elem.mozRequestFullScreen) { elem.mozRequestFullScreen(); }
    // @ts-ignore
    else if (elem.webkitRequestFullscreen) { elem.webkitRequestFullscreen(); }
    // @ts-ignore
    else if (elem.msRequestFullscreen) { elem.msRequestFullscreen(); }
}


/* setFullscreenOff(): undefined */
/** @return {void} */
function setFullscreenOff () {
  if (document.exitFullscreen) { document.exitFullscreen(); }
    // @ts-ignore
    else if (document.mozCancelFullScreen) { document.mozCancelFullScreen(); }
    // @ts-ignore
    else if (document.webkitExitFullscreen) { document.webkitExitFullscreen(); }
    // @ts-ignore
    else if (document.msExitFullscreen) { document.msExitFullscreen(); }
}


/* domGetCSSVar(name: string): string */
/** @return {string} */
const domGetCSSVar = (/** @type {string} */ name) =>
  getComputedStyle(document.documentElement)
    .getPropertyValue( name[0] === "-" ? name : "--" + name );


/* domSetCSSVar(name: string, value: string): undefined */
/** @return {any} */
const domSetCSSVar = (
  /** @type {string} */ name,
  /** @type {string | null} */ value) =>
  document.documentElement.style.setProperty(
    (name[0] === "-" ? name : "--" + name),
    value
  );


/* domScrollToTop(): undefined */
/** @return {any} */
const domScrollToTop = () => globalThis.scrollTo(0,0);


/* domScrollToBottom(): undefined */
/** @return {any} */
const domScrollToBottom = () =>
  globalThis.scrollTo(0, document.body.scrollHeight);


/* domScrollToElement(element [, top=true]): undefined */
/** @return {any} */
const domScrollToElement = (
  /** @type {Element} */ el,
  /** @type {boolean} */ top = true) =>
  el.scrollIntoView(top);


/* domClear(element): any */
/** @return {void} */
// @ts-ignore
const domClear = (/** @type {Element} */ el) =>
  Array.from(el.children).forEach((/** @type {Element} */ item) =>
    item.remove());


/** AJAX API **/


/* getText(url: string, success: function): undefined */
/** @return {void} */
function getText (
  /** @type {string} */ url,
  /** @type {Function} */ successFn) {
  if (typeof url !== "string") {
    throw new TypeError(
      "Celestra ajax error: The url parameter have to be a string."
    );
  }
  if (typeof successFn !== "function") {
    throw new TypeError(
      "Celestra ajax error: The success parameter have to be a function."
    );
  }
  let xhr = new XMLHttpRequest();
  xhr.onerror = (e) => console.log(
    "Celestra ajax GET error: " + JSON.stringify(e)
  );
  xhr.open("GET", url, true);
  xhr.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      successFn(this.responseText);
    }
  };
  xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
  xhr.send();
}


/* getJson(url: string, success: function): undefined */
/** @return {void} */
function getJson (
  /** @type {string} */ url,
  /** @type {Function} */ successFn) {
  if (typeof url !== "string") {
    throw new TypeError(
      "Celestra ajax error: The url parameter have to be a string."
    );
  }
  if (typeof successFn !== "function") {
    throw new TypeError(
      "Celestra ajax error: The success parameter have to be a function."
    );
  }
  let xhr = new XMLHttpRequest();
  xhr.onerror = (e) => console.log(
    "Celestra ajax GET error: " + JSON.stringify(e)
  );
  xhr.open("GET", url, true);
  xhr.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      successFn(JSON.parse(this.responseText));
    }
  };
  xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
  xhr.send();
}


/* ajax(Options object): undefined */
/** @return {void} */
function ajax (/** @type {Object} */ options) {
  if (typeof options.url !== "string") {
    throw new TypeError(
      "Celestra ajax error: The url property has to be a string."
    );
  }
  if (typeof options.success !== "function") {
    throw new TypeError(
      "Celestra ajax error: The success property has to be a function."
    );
  }
  if (options.error === undefined) {
    options.error = (e) => console.log(
      "Celestra ajax GET error: " + JSON.stringify(e)
    );
  }
  if (typeof options.error !== "function") {
    throw new TypeError(
      "Celestra ajax error: The error property has to be a function or undefined."
    );
  }
  if (!options.queryType) {
    options.queryType = "ajax";
  } else {
    options.queryType = options.queryType.toLowerCase();
  }
  if (!options.type) {
    options.type = "get";
  } else {
    options.type = options.type.toLowerCase();
  }
  let typeStr;
  if (options.type === "get") {
    typeStr = "GET";
  } else if (options.type === "post") {
    typeStr = "POST";
  } else {
    throw new Error(
      "Celestra ajax error: The type property has to be \"get\" or \"post\"."
    );
  }
  if (!options.format) {
    options.format = "text";
  } else {
    options.format = options.format.toLowerCase();
    if (!(["text", "json", "xml"].includes(options.format))) {
      throw new Error(
        "Celestra ajax error: The format property has to be \"text\" or \"json\" or \"xml\"."
      );
    }
  }
  let xhr;
  if (options.queryType === "ajax") {
    xhr = new XMLHttpRequest();
  } else if (options.queryType === "cors") {
    xhr = new XMLHttpRequest();
    // @ts-ignore
    if (!("withCredentials" in xhr)) { xhr = new XDomainRequest(); }
  } else {
    throw new Error(
      "Celestra ajax error: The querytype property has to be \"ajax\" or \"cors\"."
    );
  }
  if (typeof options.user === "string"
      && typeof options.password === "string"
  ) {
    xhr.open(
      typeStr,
      options.url,
      true, options.user,
      options.password);
  } else {
    xhr.open(typeStr, options.url, true);
  }
  if (options.queryType === "ajax") {
    xhr.onreadystatechange = function () {
      if (this.readyState === 4 && this.status === 200) {
        switch (options.format.toLowerCase()) {
          case "text": options.success(this.responseText); break;
          case "json": options.success(JSON.parse(this.responseText));
            break;
          case "xml": options.success(this.responseXML); break;
          default: options.success(this.responseText);
        }
      }
    };
    xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
    if (options.typeStr === "POST") {
      xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    }
  } else if (options.queryType === "cors") {
    xhr.onload = function (request) {
      switch (options.format.toLowerCase()) {
        case "text": options.success(request.target.responseText
          || request.currentTarget.response); break;
        case "json": options.success(
            JSON.parse(request.target.responseText
            || request.currentTarget.response)
          ); break;
        case "xml": options.success(request.target.responseXML
          || request.currentTarget.responseXML); break;
        default: options.success(request.target.responseText
          || request.currentTarget.response);
      }
    };
  }
  if (typeof options.error === "function") { xhr.onerror = options.error; }
  if (typeStr === "GET") {
    xhr.send();
  } else if (typeStr === "POST") {
    xhr.send(encodeURI(options.data));
  }
}


/** Type API **/


/* is (
    value: any,
    expected: string | function | array<string | function> | undefined,
    Throw: boolean = false
  ): string | function | boolean | throw TypeError */
/** @return {string | Function | boolean} */
function is (
  /** @type {any} */ value,
  /** @type {string | function | Array<string | function> | undefined} */ expected,
  /** @type {boolean} */ Throw = false) {
  /* Validate `expected` */
  if (!(["string", "function", "undefined"].includes(typeof expected))
    && !Array.isArray(expected)) {
    throw new TypeError(
      `[is] TypeError: expectedType must be string, function, array or undefined. Got ${typeof expected}`
    );
  }
  /* Validate `Throw` */
  if (typeof Throw !== "boolean") {
    throw new TypeError(
      `[is] TypeError: Throw has to be a boolean. Got ${typeof Throw}`
    );
  }
  /* Determine the type of `value` */
  /** @type {string} */
  const vType = (value === null ? "null" : typeof value);
  /* If no expected type provided, return type or constructor */
  if (expected == null) {
    return vType === "object"
      ? Object.getPrototypeOf(value)?.constructor ?? "object"
      : vType;
  }
  /* Normalize expected to an array */
  /** @type {Array<string | Function>} */
  let expectedArray = Array.isArray(expected) ? expected : [expected];
  /* Check against expected types or constructors */
  /** @type {boolean} */
  let matched = expectedArray.some(
    function ( /** @type {string | Function} */ item) {
      if (typeof item === "string") { return vType === item; }
      if (typeof item === "function") {
        return value != null && value instanceof item;
      }
      /* validate expected array elements */
      throw new TypeError(
        `[is] TypeError: expectedType array elements have to be a string or function. Got ${typeof item}`
      );
    }
  );
  /* Throw error if mismatch and `Throw` is true */
  if (Throw && !matched) {
    /** @type {string} */
    let vName = value.toString ? value : Object.prototype.toString.call(value);
    /** @type {string} */
    let eNames = expectedArray.map( (/** @type {any} */ item) =>
      (typeof item === "string" ? item.toString() : item.name ?? "anonymous")
    ).join(", ");
    throw new TypeError(`[is] TypeError: ${vName} is not a ${eNames}`);
  }
  return matched;
}


/* toObject(value: any): object | symbol | function | thrown error */
/** @return {Object | symbol | Function} */
function toObject (/** @type {any} */ value) {
  if (value == null) {
    throw new TypeError("celestra.toObject(); error: " + value);
  }
  return (["object", "function"].includes(typeof value))
    ? value : Object(value);
}


/* classof(variable: any): string */
/* classof(variable: any [, type: string [, throw =false]]):
  boolean | thrown error */
/** @deprecated * @return {string | boolean} */
function classof (
  /** @type {any} */ value,
  /** @type {string} */ type,
  /** @type {boolean} */ Throw = false) {
  let ot = Object.prototype.toString.call(value).slice(8, -1).toLowerCase();
  if (arguments.length < 2) { return ot; }
  if (!Throw) { return ot === type.toLowerCase(); }
  if (ot !== type.toLowerCase()) {
    throw TypeError("Celestra classof(); type error: " + ot + " - "  + type);
  }
  return true;
}


/* getType(variable: any): string */
/* getType(variable: any [, type: string [, throw =false]]):
  boolean | throw error */
/** @deprecated * @return {string | boolean} */
function getType (
  /** @type {any} */ value,
  /** @type {string} */ type,
  /** @type {boolean} */ Throw = false) {
  let ot = Object.prototype.toString.call(value).slice(8, -1).toLowerCase();
  if (arguments.length < 2) { return ot; }
  if (!Throw) { return ot === type.toLowerCase(); }
  if (ot !== type.toLowerCase()) {
    throw TypeError("Celestra getType(); type error: " + ot + " - "  + type);
  }
  return true;
}


/* toPrimitiveValue(value: any): primitive | object | symbol | function */
/** @return {any} */
function toPrimitiveValue (/** @type {any} */ value) {
  if (value == null || typeof value !== "object") { return value; }
  const ot = Object.prototype.toString.call(value).slice(8, -1);
  if (["Boolean", "BigInt", "Number", "String", "Symbol"].includes(ot)) {
    return value.valueOf();
  }
  return value;
}


/* isPropertyKey(value: any): boolean */
/** @return {boolean} */
const isPropertyKey = (/** @type {any} */ value) =>
  (typeof value === "string" || typeof value === "symbol");


/* toPropertyKey(value: any): string | symbol */
/** @return {string | symbol} */
const toPropertyKey = (/** @type {any} */ value) =>
  (typeof value === "symbol" ? value : String(value));


/* isIndex(value: any): boolean */
/** @return {boolean} */
const isIndex = (/** @type {any} */ value) =>
  (Number.isSafeInteger(value) && value >= 0 && 1/value !== 1 / -0);


/* isLength(value: any): boolean */
/** @return {boolean} */
const isLength = (/** @type {any} */ value) =>
  (Number.isSafeInteger(value) && value >= 0 && 1 / value !== 1 / -0);


/* toIndex(value: any): unsigned integer */
/** @return {number} */
function toIndex (/** @type {any} */ value) {
  value = ((value = Math.trunc(+value)) !== value || value === 0) ? 0 : value;
  if (value < 0 || value > (Math.pow(2, 53) - 1)) {
    throw new RangeError("toIndex(); RangeError: " + value);
  }
  return value;
}


/* toLength(value: any): unsigned integer */
/** @return {number} */
function toLength (/** @type {any} */ value) {
  value = ((value = Math.trunc(+value)) !== value || value === 0) ? 0 : value;
  return Math.min(Math.max(value, 0), Math.pow(2, 53) - 1);
}


/* type(value: any): string */
/** @return {string} */
const type = (/** @type {any} */ value) =>
  ((value === null) ? "null" : (typeof value));


/* isSameClass(value1: any, value2: any): boolean */
/** @deprecated * @return {boolean} */
const isSameClass = (/** @type {any} */ x, /** @type {any} */ y) =>
  (Object.prototype.toString.call(x) === Object.prototype.toString.call(y));


/* isSameType(value1: any, value2: any): boolean */
/** @return {boolean} */
const isSameType = (/** @type {any} */ x, /** @type {any} */ y) =>
  ((x == null || y == null) ? (x === y) : (typeof x === typeof y));


/* isSameInstance(value1: any, value2: any, Contructor: function): boolean */
/** @return {boolean} */
const isSameInstance = (
  /** @type {any} */ x,
  /** @type {any} */ y,
  /** @type {Function} */ Contructor) =>
  (x instanceof Contructor && y instanceof Contructor);


/* isCoercedObject(object: any): constructor function | false */
/** @return {Function | boolean} */
function isCoercedObject (/** @type {any} */ value) {
  if (value != null && typeof value === "object") {
    if (value instanceof Number) { return Number; }
    if (value instanceof String) { return String; }
    if (value instanceof Boolean) { return Boolean; }
    if (value instanceof BigInt) { return BigInt; }
    if (typeof value.valueOf?.() === "symbol") { return Symbol; }
  }
  return false;
}


/* isDeepStrictEqual(x: any, y: any): boolean */
/** @return {boolean} */
function isDeepStrictEqual (/** @type {any} */ x, /** @type {any} */ y) {
  /* helper functions */
  const _deepType = (/** @type {any} */ x) =>
    ((x === null) ? "null" : (x !== x) ? "NaN" : (typeof x));
  const _isPrimitive = (/** @type {any} */ x) =>
    (x == null || (typeof x !== "object" && typeof x !== "function"));
  const _isObject = (/** @type {any} */ x) =>
    (x != null && typeof x === "object");
  const _isSameInstance = (
    /** @type {any} */ x,
    /** @type {any} */ y,
    /** @type {Function} */ Class) =>
    (x instanceof Class) && (y instanceof Class);
  const _classof = (/** @type {any} */ x) =>
    Object.prototype.toString.call(x).slice(8, -1).toLowerCase();
  const _ownKeys = (/** @type {Object} */ x) =>
    // @ts-ignore
    Object.getOwnPropertyNames(x).concat(Object.getOwnPropertySymbols(x));
  /* strict equality helper function */
  const _isEqual = (/** @type {any} */ x, /** @type {any} */ y) =>
    Object.is(x, y);
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
      return x.every(
        (/** @type {any} */ value, /** @type {string | number} */ index) =>
          isDeepStrictEqual(value, y[index])
      );
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
      return x.every(
        (/** @type {any} */ value, /** @type {string | number} */ index) =>
          _isEqual(value, y[index])
      );
    }
    /* objects / ArrayBuffer */
    if (_isSameInstance(x, y, ArrayBuffer)) {
      if (x.byteLength !== y.byteLength) { return false; }
      if (x.byteLength === 0) { return true; }
      let xTA = new Int8Array(x), yTA = new Int8Array(y);
      return xTA.every(
        (/** @type {any} */ value, /** @type {string | number} */ index) =>
          _isEqual(value, yTA[index]));
    }
    /* objects / DataView */
    if (_isSameInstance(x, y, DataView)) {
      if (x.byteLength !== y.byteLength) { return false; }
      if (x.byteLength === 0) { return true; }
      for (let index = 0; index < x.byteLength; index++) {
        if (!_isEqual(x.getUint8(index), y.getUint8(index))) { return false; }
      }
      return true;
    }
    /* objects / Map */
    if (_isSameInstance(x, y, Map)) {
      if (x.size !== y.size) { return false; }
      if (x.size === 0) { return true; }
      return [...x.keys()].every((/** @type {any} */ value) =>
        isDeepStrictEqual(x.get(value), y.get(value)));
    }
    /* objects / Set */
    if (_isSameInstance(x, y, Set)) {
      if (x.size !== y.size) { return false; }
      if (x.size === 0) { return true; }
      return [...x.keys()].every((/** @type {any} */ value) => y.has(value));
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
          .reduce((acc, k) => { acc[k] = y[k]; return acc; }, {})
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
/**
 * Checks if a value is empty.
 *
 * - `null`, `undefined`, and `NaN` are empty.
 * - Arrays, TypedArrays, and strings are empty if length === 0.
 * - Maps and Sets are empty if size === 0.
 * - ArrayBuffer and DataView are empty if byteLength === 0.
 * - Iterable objects are empty if they have no elements.
 * - Plain objects are empty if they have no own properties.
 *
 * @param {any} value The value to check.
 * @returns boolean
 */
function isEmptyValue (value) {
  /**
   * Checks if a value is a TypedArray (Int8Array, etc.).
   *
   * @param {any} value The value to check.
   * @returns boolean
   */
  function _isTypedArray(value) {
    const constructors = [
      Int8Array, Uint8Array, Uint8ClampedArray,
      Int16Array, Uint16Array,
      Int32Array, Uint32Array,
      Float32Array, Float64Array,
      BigInt64Array, BigUint64Array];
    if ("Float16Array" in globalThis) {
      // @ts-ignore
      constructors.push(globalThis.Float16Array);
    }
    return constructors.some((Class) => value instanceof Class);
  }
  /* Check undefined, null, NaN */
  if (value == null || Number.isNaN(value)) { return true; }
  /* Check Array, TypedArrays, string, String */
  if (Array.isArray(value) || _isTypedArray(value)
    || typeof value === "string" || value instanceof String) {
    return value.length === 0;
  }
  /* Check Map and Set */
  if (value instanceof Map || value instanceof Set) { return value.size === 0; }
  /* Check ArrayBuffer and DataView */
  if (value instanceof ArrayBuffer || value instanceof DataView) {
    return value.byteLength === 0;
  }
  /* Check Iterable objects */
  if (typeof value[Symbol.iterator] === "function") {
    const it = value[Symbol.iterator]();
    return it.next().done; // avoids consuming entire iterator
  }
  /* Check Iterator objects */
  if ("Iterator" in globalThis ? (value instanceof Iterator)
    : (value != null && typeof value === "object"
      && typeof value.next === "function")) {
    try {
      /* Has at least one element */
      for (const _ of value) { return false; }
      return true;
    } catch { /* Not iterable */ }
  }
  /* Other objects - check own properties (including symbols) */
  if (isObject(value)) {
    const keys = [
      ...Object.getOwnPropertyNames(value),
      ...Object.getOwnPropertySymbols(value)
    ];
    if (keys.length === 0) return true;
    /* Special case: object with single "length" property that is 0 */
    if (keys.length === 1 && keys[0] === "length" &&
      value.length === 0) {
      return true;
    }
  }
  /* Return default false */
  return false;
}


/* isProxy(value: any): boolean */
/** @return {boolean} */
const isProxy = (/** @type {any} */ value) =>
  Boolean(value != null && value.__isProxy);


/* isAsyncGeneratorFn(value: any): boolean */
/** @return {boolean} */
const isAsyncGeneratorFn = (/** @type {any} */ value) =>
  (Object.getPrototypeOf(value).constructor ===
    Object.getPrototypeOf(async function*() {}).constructor);


/* isClass(value: any): boolean */
/** @return {boolean} */
const isClass = (/** @type {any} */ value) =>
  (typeof value === "function" && typeof value.prototype === "object");


/* isPlainObject(value: any): boolean */
/** @return {boolean} */
const isPlainObject = (/** @type {any} */ value) =>
  (value != null && typeof value === "object"
    && (Object.getPrototypeOf(value) === Object.prototype
      || Object.getPrototypeOf(value) === null));


/* isChar(value: any): boolean */
/** @return {boolean} */
const isChar = (/** @type {any} */ value) =>
  (typeof value === "string"
    && (value.length === 1 || Array.from(value).length === 1)
  );


/* isNumeric(value: any): boolean */
/** @return {boolean} */
const isNumeric = (/** @type {any} */ value) =>
  (((typeof value === "number" || typeof value === "bigint") && value === value)
    ? true : (!isNaN(parseFloat(value)) && isFinite(value)));


/* isObject(value: any): boolean */
/** @return {boolean} */
const isObject = (/** @type {any} */ value) =>
  (value != null && (typeof value === "object" || typeof value === "function"));


/* isFunction(value: any): boolean */
/** @return {boolean} */
const isFunction = (/** @type {any} */ value) => (typeof value === "function" ||
  Object.prototype.toString.call(value) === "[object Function]");


/* isCallable(value: any): boolean */
/** @return {boolean} */
const isCallable = (/** @type {any} */ value) =>
  ((value != null && ["object", "function"].includes(typeof value))
    ? (typeof value.call === "function") : false);


/* isArraylike(value: any): boolean */
/** @return {boolean} */
const isArraylike = (/** @type {any} */ value) => value != null
  && typeof value !== "function"
  && (typeof value === "object" || typeof value === "string")
  && Number.isSafeInteger(value.length) && value.length >= 0;


/* isNull(value: any): boolean */
/** @return {boolean} */
const isNull = (/** @type {any} */ value) => (value === null);


/* isUndefined(value: any): boolean */
/** @return {boolean} */
const isUndefined = (/** @type {any} */ value) => (value === undefined);


/* isNil(value: any): boolean */
/** @return {boolean} */
const isNil = (/** @type {any} */ value) => (value == null);


/* isPrimitive(value: any): boolean */
/** @return {boolean} */
const isPrimitive = (/** @type {any} */ value) =>
  (value == null || (typeof value !== "object" && typeof value !== "function"));


/* isIterator(value: any): boolean */
/** @return {boolean} */
const isIterator = (/** @type {any} */ value) =>
  ("Iterator" in globalThis ? (value instanceof Iterator)
    : (value != null && typeof value === "object" && typeof value.next === "function"));


/* isRegexp(value: any): boolean */
/** @return {boolean} */
const isRegexp = (/** @type {any} */ value) => (value instanceof RegExp);


/* isElement(value: any): boolean */
/** @return {boolean} */
const isElement = (/** @type {any} */ value) =>
  (value != null && typeof value === "object" && value.nodeType === 1);


/* isIterable(value: any): boolean */
/** @return {boolean} */
const isIterable = (/** @type {any} */ value) =>
  (value != null && typeof value[Symbol.iterator] === "function");


/* isAsyncIterable(value: any): boolean */
/** @return {boolean} */
const isAsyncIterable = (/** @type {any} */ value) =>
  (value != null && typeof value[Symbol.asyncIterator] === "function");


/* isTypedArray(value: any): boolean */
/**
 * Checks if a value is a TypedArray (Int8Array, etc.).
 *
 * @param {any} value The value to check.
 * @returns boolean
 */
function isTypedArray (value) {
  const constructors = [
    Int8Array, Uint8Array, Uint8ClampedArray,
    Int16Array, Uint16Array,
    Int32Array, Uint32Array,
    Float32Array, Float64Array,
    BigInt64Array, BigUint64Array];
  if ("Float16Array" in globalThis) {
    // @ts-ignore
    constructors.push(globalThis.Float16Array);
  }
  return constructors.some((Class) => value instanceof Class);
}


/* isGeneratorFn(value: any): boolean */
/** @return {boolean} */
const isGeneratorFn = (/** @type {any} */ value) =>
  (Object.getPrototypeOf(value).constructor ===
    Object.getPrototypeOf(function*(){}).constructor);


/* isAsyncFn(value: any): boolean */
/** @return {boolean} */
const isAsyncFn = (/** @type {any} */ value) =>
  (Object.getPrototypeOf(value).constructor ===
    Object.getPrototypeOf(async function(){}).constructor);


/** Cookie API **/


/* setCookie(Options object): undefined */
/* setCookie(name: string, value: string [, hours = 8760 [, path = "/" [, domain
  [, secure [, SameSite = "Lax" [, HttpOnly]]]]]]): undefined */
/** @return {void} */
function setCookie (
  /** @type {string | Object} */ name,
  /** @type {string} */ value,
  /** @type {number} */ hours = 8760,
  /** @type {string} */ path = "/",
  /** @type {string} */ domain,
  /** @type {boolean} */ secure,
  /** @type {string} */ SameSite = "Lax",
  /** @type {boolean} */ HttpOnly) {
  if (typeof name === "object") {
    let settings = name;
    name = settings.name;
    value = settings.value;
    hours = settings.hours || 8760;
    path = settings.path || "/";
    domain = settings.domain;
    secure = settings.secure;
    SameSite = settings.SameSite || "Lax";
    HttpOnly = settings.HttpOnly;
  }
  let expire = new Date();
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
/** @return {Object | string} */
function getCookie (/** @type {string | undefined} */ name) {
  if (document.cookie.length !== 0) {
    let result = {}, array = document.cookie.split(";");
    for(let index = 0, length = array.length; index < length; index++) {
      let record = array[index].trim().split("=");
      result[decodeURIComponent(record[0])] = decodeURIComponent(record[1]);
    }
    return (name ? (result[name] ? result[name] : null) : result);
  }
  return (name ? null : {});
}


/* hasCookie(name: string): boolean */
/** @return {boolean} */
const hasCookie = (/** @type {string} */ name) =>
  (document.cookie.includes(encodeURIComponent(name) + "="));


/* removeCookie(Options object);: boolean */
/* removeCookie(name: string [, path = "/"
  [, domain [, secure [, SameSite = "Lax" [, HttpOnly ]]]]]): boolean */
/** @return {boolean} */
function removeCookie (
  /** @type {string | Object} */ name,
  /** @type {string} */ path = "/",
  /** @type {string} */ domain,
  /** @type {boolean} */ secure,
  /** @type {string} */ SameSite="Lax",
  /** @type {boolean} */ HttpOnly){
  if (typeof name === "object") {
    let settings = name;
    name = settings.name;
    path = settings.path || "/";
    domain = settings.domain;
    secure = settings.secure;
    SameSite = settings.SameSite || "Lax";
    HttpOnly = settings.HttpOnly;
  }
  let result = (document.cookie.includes(encodeURIComponent(name) + "="));
  document.cookie = encodeURIComponent(name)
    + "=; expires=Thu, 01 Jan 1970 00:00:01 GMT"
    + "; path=" + path
    + (domain ? "; domain=" + domain : "")
    + (secure ? "; secure" : "")
    + (typeof SameSite === "string" && SameSite.length ? "; SameSite="
      + SameSite : "")
    + (HttpOnly ? "; HttpOnly" : "")
    + ";";
  return result;
}


/* clearCookies(Options object): undefined */
/* clearCookies([path = "/"
  [, domain [, secure [, SameSite = "Lax" [, HttpOnly ]]]]]): undefined */
/** @return {void} */
function clearCookies (
  /** @type {string | Object} */ path = "/",
  /** @type {string} */ domain,
  /** @type {boolean} */ secure,
  /** @type {string} */ SameSite = "Lax",
  /** @type {boolean} */ HttpOnly) {
  if (typeof path === "object") {
    let settings = path;
    path = settings.path || "/";
    domain = settings.domain;
    secure = settings.secure;
    SameSite = settings.SameSite || "Lax";
    HttpOnly = settings.HttpOnly;
  }
  if (document.cookie.length !== 0) {
    let array = document.cookie.split(";");
    for(let index = 0, length = array.length; index < length; index++) {
      document.cookie = encodeURIComponent(array[index].trim().split("=")[0])
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


/*function castArray <T>(...args: [T] | []): T[] {
  if (!args.length) { return []; }
  const value = args[0];
  return Array.isArray(value) ? value : [value];
}*/
/**
 * Returns the original value if this is an array or value a new array.
 *
 * @param {any[]} args
 * @returns An array wrapping the value, or the original array if already one.
 */
function castArray (...args) {
  if (!args.length) { return []; }
  const value = args[0];
  return Array.isArray(value) ? value : [value];
}


/*export function compact <T>(iter: IterableIterator<any> | Iterable<T> | ArrayLike<T>): T[] {
  return Array.from(iter).filter(
    (value) => value || value === 0
  );
}*/
/**
 * @description Returns an array with truthy values (but keeps `0`) from the given Iterable or ArrayLike object.
 *
 * @param {IterableIterator<any> | Iterable<any> | ArrayLike<any>} iter
 * @returns any[]
 */
const compact = (iter) => Array.from(iter).filter(
  (value) => value || value === 0
);


/* unique(iterator: iterator [, resolver: string | function]): array */
/** @return {Array | any} */
function unique (
  /** @type {Iterable<any>} */ iter,
  /** @type {string | Function | null | undefined} */ resolver) {
  if (resolver == null) { return [...new Set(iter)]; }
  if (typeof resolver === "string") {
    return Array.from(iter).reduce(function (acc, el) {
      if (acc.every((/** @type {any} */ e) =>
        e[resolver] !== el[resolver])) { acc.push(el); }
      return acc;
    }, []);
  }
  if (typeof resolver === "function") {
    let cache = new Map();
    for (let item of iter) {
      let key = resolver(item);
      if (!cache.has(key)) { cache.set(key, item); }
    }
    return [...cache.values()];
  }
}


/* count(iterator, callback: function): integer */
/** @return {number} */
function count (/** @type {Iterable<any>} */ iter, /** @type {Function} */ fn) {
  let index = 0, result = 0;
  for (let item of iter) {
    if (fn(item, index++)) { result++; }
  }
  return result;
}


/* arrayDeepClone(array: array): array */
/** @return {any[]} */
function arrayDeepClone (/** @type {Iterable<any>} */ [...array]) {
  const _ADC = (/** @type {any} */ value) =>
    (Array.isArray(value) ? Array.from(value, _ADC) : value);
  return _ADC(array);
}


/* initial(iterator: iterator): array */
/** @return {any[]} */
const initial = (/** @type {Iterable<any>} */ [...array]) => array.slice(0, -1);


/* shuffle(iterator: iterator): array */
/** @return {any[]} */
function shuffle(/** @type {Iterable<any>} */ [...array]) {
  for (let index = array.length - 1; index > 0; index--) {
    let pos = Math.floor(Math.random() * (index + 1));
    [array[index], array[pos]] = [array[pos], array[index]];
  }
  return array;
}


/* partition(iterator: iterator, callback: function): array */
/** @return {any[]} */
const partition = (
  /** @type {Iterable<any>} */ [...array],
  /** @type {Function} */ fn) =>
  // @ts-ignore
  [array.filter(fn), array.filter((value, index, a) => !(fn(value, index, a)))];


/* setUnion(iterator1: iterator [, iteratorN: iterator]): set */
/** @return {Set<any>} */
const setUnion = (/** @type {Iterable[]} */ ...args) =>
  new Set(args.map(([...item]) => item).flat());


/* setIntersection(set1: set, set2: set): set */
/** @return {Set<any>} */
const setIntersection = (
  /** @type {Iterable<any>} */ [...array],
  /** @type {Set<any>} */ b) =>
  new Set(array.filter((/** @type {any} */ value) => b.has(value)));


/* setDifference(set1: set, set2: set): set */
/** @return {Set<any>} */
const setDifference = (
  /** @type {Iterable<any>} */ [...array],
  /** @type {Set<any>} */ b) =>
  new Set(array.filter((/** @type {any} */ value) => !(b.has(value))));


/* setSymmetricDifference(set1: set, set2: set): set */
/** @return {Set<any>} */
const setSymmetricDifference = ( /** @type {Set<any>} */ array, /** @type {Set<any>} */ b) =>
  new Set(
    [...array].filter((/** @type {any} */ value) =>
      !(b.has(value))).concat([...b]
        .filter((/** @type {any} */ value) => !(array.has(value))))
  );


/* isSuperset(superCollection: iterator, subCollection: iterator): boolean */
/** @return {boolean} */
const isSuperset = (
  /** @type {Iterable<any>} */ [...superSet],
  /** @type {Iterable<any>} */ [...subSet]) =>
  subSet.every((/** @type {any} */ value) => superSet.includes(value));


/* min(value1: any [, valueN]): any */
/** @return {any} */
const min = (/** @type {any[]} */ ...args) =>
  args.reduce((/** @type {any} */ acc, /** @type {any} */ value) =>
    (value < acc ? value : acc), args[0]);


/* max(value1: any [, valueN]): any */
/** @return {any} */
const max = (/** @type {any[]} */ ...args) =>
  args.reduce((/** @type {any} */ acc, /** @type {any} */ value) =>
    (value > acc ? value : acc), args[0]);


/* arrayRepeat(value: any [, n = 100]): array */
/** @return {any[]} */
const arrayRepeat = (/** @type {any} */ value, /** @type {number} */ n = 100) =>
  Array(n).fill(value);


/* arrayCycle(iterator: iterator [, n: integer = 100]): array */
/** @return {any[]} */
const arrayCycle = (
  /** @type {Iterable<any>} */ [...array],
  /** @type {number} */ n = 100) =>
  Array(n).fill(array).flat();


/* arrayRange([ start = 0 [, end = 99 [, step = 1]]]): array */
/** @return {any[]} */
const arrayRange = (
  /** @type {number} */ start = 0,
  /** @type {number} */ end = 99,
  /** @type {number} */ step = 1) =>
  Array.from({length: (end - start) / step + 1}, (_v, i) => start + (i * step));


/* zip(iterator1: iterator [, iteratorN: iterator]): array */
/** @return {any[]} */
function zip (/** @type {any[]} */ ...args) {
  args = args.map((/** @type {Iterable} */ value) => Array.from(value));
  return Array.from({length: Math.min(...args.map(v => v.length))})
    .map((_, i) => args.map(v => v[i]));
}


/* unzip(iterator: iterator): array */
/** @return {any[]} */
const unzip = (/** @type {Iterable<any>} */ [...array]) =>
  array.map((/** @type {Iterable} */ iter) => Array.from(iter))
    .reduce((acc, v) => {
      v.forEach((item, index) => {
        if (!Array.isArray(acc[index])) { acc[index] = []; }
        acc[index].push(item);
      });
      return acc;
    }, []);


/* zipObj(iterator1: iterator, iterator2: iterator): object */
/** @return {Object} */
function zipObj (
  /** @type {Iterable<any>} */ [...array1],
  /** @type {Iterable<any>} */ [...array2]) {
  let result = {}, length = Math.min(array1.length, array2.length);
  for (let index = 0; index < length; index++) {
    result[array1[index]] = array2[index];
  }
  return result;
}

/* arrayAdd(array: array, value: any): boolean */
/** @return {boolean} */
const arrayAdd = (/** @type {any[]} */ array, /** @type {any} */ value) =>
  (!array.includes(value)) ? !!array.push(value) : false;


/* arrayClear(array: array): array */
/** @return {any[]} */
function arrayClear (/** @type {any[]} */ array) {
  array.length = 0;
  return array;
}


//* arrayRemove(array: array, value: any [, all: boolean = false]): boolean */
/** @return {boolean} */
function arrayRemove (
  /** @type {any[]} */ array,
  /** @type {any} */ value,
  /** @type {boolean} */ all = false) {
  let found = array.indexOf(value) > -1;
  if (!all) {
    let pos = array.indexOf(value);
    if (pos > -1) { array.splice(pos, 1); }
  } else {
    let pos = -1;
    while ((pos = array.indexOf(value)) > -1) { array.splice(pos, 1); }
  }
  return found;
}


/* arrayRemoveBy(array: array, callback: function [, all: boolean = false]):
  boolean */
/** @return {boolean} */
function arrayRemoveBy (
  /** @type {any[]} */ array,
  /** @type {Function} */ fn,
  /** @type {boolean} */ all = false) {
  // @ts-ignore
  let found = array.findIndex(fn) > -1;
  if (!all) {
    // @ts-ignore
    let pos = array.findIndex(fn);
    if (pos > -1) { array.splice(pos, 1); }
  } else {
    let pos = -1;
    // @ts-ignore
    while ((pos = array.findIndex(fn)) > -1) { array.splice(pos, 1); }
  }
  return found;
}


/* arrayMerge(target: array, source1: any [, sourceN: any]): array */
/** @return {any[]} */
function arrayMerge (
  /** @type {any[]} */ target,
  /** @type {any[]} */ ...sources) {
  target.push(... [].concat(...sources) );
  return target;
}


/* iterRange([start: number = 0 [,step: number = 1
  [, end: number = Infinity]]]): iterator */
/** @return {Iterator<any>} */
function* iterRange (
  /** @type {number} */ start = 0,
  /** @type {number} */ step = 1,
  /** @type {number} */ end = Infinity) {
  let index = start;
  while (index <= end) {
    yield index;
    index += step;
  }
}


/* iterCycle(iterator: iterator [, n = Infinity]): iterator */
/** @return {Iterator<any>} */
function* iterCycle (
  /** @type {Iterable<any>} */ [...array],
  /** @type {number} */ n = Infinity) {
  let index = 0;
  while (index < n) {
    yield* array;
    index++;
  }
}


/* iterRepeat(value: any [, n: number = Infinity]): iterator */
/** @return {Iterator<any>} */
function* iterRepeat (
  /** @type {any} */ value,
  /** @type {number} */ n = Infinity) {
  let index = 0;
  while (index < n) {
    yield value;
    index++;
  }
}


/* takeWhile(iterator: iterator, callback: function): iterator */
/** @return {Iterator<any>} */
function* takeWhile (
  /** @type {Iterable<any>} */ iter,
  /** @type {Function} */ fn) {
  for (let item of iter) {
    if (!fn(item)) { break; }
    yield item;
  }
}


/* dropWhile(iterator: iterator, callback: function): iterator */
/** @return {Iterator<any>} */
function* dropWhile (
  /** @type {Iterable<any>} */ iter,
  /** @type {Function} */ fn) {
  let dropping = true;
  for (let item of iter) {
    if (dropping && !fn(item)) { dropping = false; }
    if (!dropping) { yield item; }
  }
}


/* take(iterator: iterator [, n: number = 1]): iterator */
/** @return {Iterator<any>} */
function* take (
  /** @type {Iterable<any>} */ iter,
  /** @type {number} */ n = 1) {
  let index = n;
  for (let item of iter) {
    if (index <= 0) { break; }
    yield item;
    index--;
  }
}


/* drop(iterator: iterator [, n: number =1 ]): iterator */
/** @return {Iterator<any>} */
function* drop (
  /** @type {Iterable<any>} */ iter,
  /** @type {number} */ n = 1) {
  let index = n;
  for (let item of iter) {
    if (index < 1) {
      yield item;
    } else {
      index--;
    }
  }
}


/* forEach(iterator: iterator, callback: function): undefined */
/** @return {void} */
function forEach (
  /** @type {Iterable<any>} */ iter,
  /** @type {Function} */ fn) {
  let index = 0;
  for (let item of iter) { fn(item, index++); }
}


/* forEachRight(iterator: iterator, callback: function): undefined */
/** @return {void} */
function forEachRight (
  /** @type {Iterable<any>} */ [...array],
  /** @type {Function} */ fn) {
  let index = array.length;
  while (index--) { fn(array[index], index); }
}


/* map(iterator: iterator, callback: function): iterator */
/** @return {Iterator<any>} */
function* map (/** @type {Iterable<any>} */ iter, /** @type {Function} */ fn) {
  let index = 0;
  for (let item of iter) { yield fn(item, index++); }
}


/* filter(iterator: iterator, callback: function): iterator */
/** @return {Iterator<any>} */
function* filter (
  /** @type {Iterable<any>} */ iter,
  /** @type {Function} */ fn) {
  let index = 0;
  for (let item of iter) {
    if (fn(item, index++)) { yield item; }
  }
}


/* reject(iterator: iterator, callback: function): iterator */
/** @return {Iterator<any>} */
function* reject (
  /** @type {Iterable<any>} */ iter,
  /** @type {Function} */ fn) {
  let index = 0;
  for (let item of iter) {
    if (!fn(item, index++)) { yield item; }
  }
}


/* slice(iterator: iterator [, begin: number = 0 [, end: number = Infinity]]):
  iterator */
/** @return {Iterator<any>} */
function* slice (
  /** @type {Iterable<any>} */ iter,
  /** @type {number} */ begin = 0,
  /** @type {number} */ end = Infinity) {
  let index = 0;
  for (let item of iter) {
    if (index >= begin && index <= end) {
      yield item;
    } else if (index > end) {
      return;
    }
    index++;
  }
}


/* tail(iterator: iterator): iterator */
/** @return {Iterator<any>} */
function* tail (/** @type {Iterable<any>} */ iter) {
  let first = true;
  for (let item of iter) {
    if (!first) {
      yield item;
    } else {
      first = false;
    }
  }
}


/* item(iterator: iterator, index: integer): any */
/** @return {any} */
function item (/** @type {Iterable<any>} */ iter, /** @type {number} */ pos) {
  let i=0;
  for (let item of iter) {
    if (i++ === pos) { return item; }
  }
}


/* nth(iterator: iterator, index: integer): any */
/** @return {any} */
function nth (/** @type {Iterable<any>} */ iter, /** @type {number} */ pos) {
  let i=0;
  for (let item of iter) {
    if (i++ === pos) { return item; }
  }
}


/* size(iterator: iterator): integer */
/** @return {number} */
function size (/** @type {Iterable<any>} */ iter) {
  let index = 0;
  for (let _item of iter) { index++; }
  return index;
}


/* first(iterator: iterator): any */
/** @return {any} */
function first (/** @type {Iterable<any>} */ iter) {
  for (let item of iter) { return item; }
}


/* head(iterator: iterator): any */
/** @return {any} */
function head (/** @type {Iterable<any>} */ iter) {
  for (let item of iter) { return item; }
}


/* last(iterator: iterator): any */
/** @return {any} */
const last = (/** @type {Iterable<any>} */ [...array]) =>
  array[array.length - 1];


/* reverse(iterator: iterator): iterator */
/** @return {Iterator<any>} */
function* reverse (/** @type {Iterable<any>} */ [...array]) {
  let index = array.length;
  while (index--) { yield array[index]; }
}


/* sort(iterator: iterator [, numbers = false]): array */
/** @return {any[]} */
const sort = (
  /** @type {Iterable<any>} */ [...array],
  /** @type {number} */ numbers) =>
  array.sort(numbers ? (x, y) => x - y : undefined);


/* includes (collection: any, value: any, comparator: undefined | function):
  boolean */
/**
 * @param {any} collection - The collection to search through.
 * @param {any} value - The value to look for.
 * @param {undefined | ((a: any, b: any) => boolean)} [comparator] - Optional comparator for equality check.
 * @return {boolean} - Whether the value was found.
 * @throws {TypeError} - If comparator is not a Function or undefined.
 */
function includes (collection, value, comparator) {
  /* Comparator Validation - has to be a function or undefined. */
    if (comparator !== undefined && typeof comparator !== "function") {
    throw new TypeError(
      `[includes] TypeError: comparator is not a function or undefined. Got ${typeof comparator}`
    );
  }
  /* helper functions */
  /** @return {boolean} */
  const _isIterator = (/** @type {any} */ value) =>
    value != null && typeof value === "object"
      && typeof value.next === "function";
  /** @return {boolean} */
  const _isIterable = (/** @type {any} */ value) =>
    (value != null && typeof value[Symbol.iterator] === "function");
  /** @type {(a: any, b: any) => boolean} */
  const _isEqual = comparator ||
    (/** @return {boolean} */ (/** @type {any} */ x, /** @type {any} */ y) =>
      x === y || (x !== x && y !== y)); // SameValueZero
  /* Collection: Primitives, WeakMap, WeakSet */
  const cType = (collection === null ? "null" : typeof collection);
  if (collection == null
    || !(["object", "function", "string"].includes(cType))
    || collection instanceof WeakMap
    || collection instanceof WeakSet) {
    return false;
  }
  /* string and String object */
  if (typeof collection === "string" || collection instanceof String) {
    return collection.includes(String(value));
  }
  /* Map */
  if (collection instanceof Map) {
    for (const item of collection.keys()) {
      if (_isEqual(item, value)) { return true; }
    }
    for (const item of collection.values()) {
      if (_isEqual(item, value)) { return true; }
    }
    return false;
  }
  /* Iterator or Iterables (Array, Set, TypedArrays, other Iterables, etc.) */
  if (_isIterator(collection) || _isIterable(collection)) {
    for (const item of collection) {
      if (_isEqual(item, value)) { return true; }
    }
    return false;
  }
  /* Plain object or function */
  if (["object", "function"].includes(cType)) {
    for (const item of Object.keys(collection)) {
      if (_isEqual(item, value)) { return true; }
    }
    for (const item of Object.values(collection)) {
      if (_isEqual(item, value)) { return true; }
    }
    for (const item of Object.getOwnPropertySymbols(collection)) {
      if (_isEqual(item, value)) { return true; }
    }
    return false;
  }
  /* default return false */
  return false;
}


/* contains(iterator: iterator, value: any): boolean */
/** @deprecated * @return {boolean} */
function contains (
  /** @type {Iterable<any>} */ iter,
  /** @type {any} */ value) {
  for (let item of iter) {
    if (item === value || (item !== item && value !== value)) { return true; }
  }
  return false;
}


/* find(iterator: iterator, callback: function): any */
/** @return {any} */
function find (/** @type {Iterable<any>} */ iter, /** @type {Function} */ fn) {
  let index = 0;
  for (let item of iter) {
    if (fn(item, index++)) { return item; }
  }
}


/* findLast(iterator: iterator, callback: function): any */
/** @return {any} */
function findLast (
  /** @type {Iterable<any>} */ iter,
  /** @type {Function} */ fn) {
  let index = 0, result;
  for (let item of iter) {
    if (fn(item, index++)) { result = item; }
  }
  return result;
}


/* every(iterator: iterator, callback: function): boolean */
/** @return {boolean} */
function every (/** @type {Iterable<any>} */ iter, /** @type {Function} */ fn) {
  let index = 0;
  for (let item of iter) {
    if (!fn(item, index++)) { return false; }
  }
  if (index === 0) { return false; }
  return true;
}


/* some(iterator: iterator, callback: function): boolean */
/** @return {boolean} */
function some (/** @type {Iterable<any>} */ iter, /** @type {Function} */ fn) {
  let index = 0;
  for (let item of iter) {
    if (fn(item, index++)) { return true; }
  }
  return false;
}


/* none(iterator: iterator, callback: function): boolean */
/** @return {boolean} */
function none (/** @type {Iterable<any>} */ iter, /** @type {Function} */ fn) {
  let index = 0;
  for (let item of iter) {
    if (fn(item, index++)) { return false; }
  }
  if (index === 0) { return false; }
  return true;
}


/* takeRight(iterator: iterator [, n: number = 1]): array */
/** @return {any[]} */
const takeRight = (
  /** @type {Iterable<any>} */ [...array],
  /** @type {number} */ n = 1) =>
  array.reverse().slice(0, n);


/* takeRightWhile(iterator: iterator, callback: function): iterator */
/** @return {Iterator<any>} */
function* takeRightWhile (
  /** @type {Iterable<any>} */ [...array],
  /** @type {Function} */ fn) {
  let index = 0;
  for (let item of array.reverse()) {
    if (fn(item, index++)) {
      yield item;
    } else {
      break;
    }
  }
}


/* dropRight(iterator: iterator [, n: number = 1]): array */
/** @return {any[]} */
const dropRight = (
  /** @type {Iterable<any>} */ [...array],
  /** @type {number} */ n = 1) =>
  array.reverse().slice(n);


/* dropRightWhile(iterator: iterator, callback: function): iterator */
/** @return {Iterator<any>} */
function* dropRightWhile (
  /** @type {Iterable<any>} */ [...array],
  /** @type {Function} */ fn) {
  let dropping = true, index = 0;
  for (let item of array.reverse()) {
    if (dropping && !fn(item, index++)) { dropping = false; }
    if (!dropping) { yield item; }
  }
}


/* concat(iterator1: iterator [, iteratorN]: iterator): iterator */
/** @return {Iterator<any>} */
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
/** @return {any} */
function reduce (
  /** @type {Iterable<any>} */ iter,
  /** @type {Function} */ fn,
  /** @type {any} */ initialvalue) {
  let acc = initialvalue, index = 0;
  for (let item of iter) {
    if (index === 0 && acc === undefined) {
      acc = item;
    } else {
      acc = fn(acc, item, index++);
    }
  }
  return acc;
}


/* enumerate(iterator: iterator [, offset = 0]): iterator */
/** @return {Iterator<any>} */
function* enumerate (
  /** @type {Iterable<any>} */ iter,
  /** @type {number} */ offset = 0) {
  let index = offset;
  for (let item of iter) { yield [index++, item]; }
}


/* flat(iterator: iterator): iterator */
/** @return {Iterator<any>} */
function* flat (/** @type {Iterable<any>} */ iter) {
  for (let item of iter) {
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
/** @return {string} */
function join (
  /** @type {Iterable<any>} */ iter,
  /** @type {string} */ separator = ",") {
  separator = String(separator);
  let result = "";
  for (let item of iter) { result += separator + item; }
  return result.slice(separator.length);
}


/* withOut(iterator: iterator, filterIterator: iterator): array */
/** @return {any[]} */
const withOut = (
  /** @type {Iterable<any>} */ [...array],
  /** @type {Iterable<any>} */ [...filterValues]) =>
  array.filter((/** @type {any} */ e) => !filterValues.includes(e));


/** Math API **/


/* isFloat(value: any): boolean */
/** @return {boolean} */
const isFloat = (/** @type {any} */ value) =>
  (typeof value === "number" && value === value && !!(value % 1));


/* toInteger(value: any): integer */
/** @return {number} */
function toInteger (/** @type {any} */ value) {
  value = ((value = Math.trunc(+value)) !== value || value === 0) ? 0 : value;
  return Math.min(Math.max(value, -(Math.pow(2, 53) - 1)), Math.pow(2, 53) - 1);
}


/* toIntegerOrInfinity(value: any): integer | Infinity | -Infinity */
/** @return {number} */
const toIntegerOrInfinity = (/** @type {any} */ value) =>
  ((value = Math.trunc(+value)) !== value || value === 0) ? 0 : value;


/* sum(value1: any [, valueN]: any): any */
/** @return {any} */
const sum = (/** @type {any[]} */ ...values) =>
  (values.every((/** @type {any} */ value) => typeof value === "number") ?
    // @ts-ignore
    Math.sumPrecise(values) : values.slice(1).reduce(
      (acc, v) => acc + v, values[0])
    );


/* avg(value1: number [, valueN: number]): number */
/** @return {number} */
// @ts-ignore
const avg = (/** @type {number[]} */ ...args) => Math.sumPrecise(args) / args.length;


/* product(value1: number [, valueN]: number): number */
/** @return {number} */
const product = (/** @type {any} */ first, /** @type {any[]} */ ...args) =>
  args.reduce((acc, v) => acc * v, first);


/* clamp(value: any, min: any, max: any): number */
/** @return {number} */
function clamp(
  /** @type {any} */ value,
  /** @type {number} */ min = -9007199254740991,
  /** @type {number} */ max = 9007199254740991) {
  /* normalize */
  function _normalize (/** @type {any} */ value) {
    if (typeof value !== "bigint" && typeof value !== "number") {
      value = Number(value);
    }
    if (value === -Infinity) { return -9007199254740991; }
    if (value === Infinity) { return 9007199254740991; }
    if (value === 0) { return 0; }
    return value;
  }
  value = _normalize(value);
  min = _normalize(min);
  max = _normalize(max);
  /* NaN: val, min, max */
  if (value !== value) { return value; }
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
  return (value < min) ? min : ((value > max) ? max : value);
}


/* minmax(value: any, min: any, max: any): number */
/** @return {number} */
function minmax(
  /** @type {any} */ value,
  /** @type {number} */ min = -9007199254740991,
  /** @type {number} */ max = 9007199254740991) {
  /* normalize */
  function _normalize (/** @type {any} */ value) {
    if (typeof value !== "bigint" && typeof value !== "number") {
      value = Number(value);
    }
    if (value === -Infinity) { return -9007199254740991; }
    if (value === Infinity) { return 9007199254740991; }
    if (value === 0) { return 0; }
    return value;
  }
  value = _normalize(value);
  min = _normalize(min);
  max = _normalize(max);
  /* NaN: val, min, max */
  if (value !== value) { return value; }
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
  return (value < min) ? min : ((value > max) ? max : value);
}


/* isEven(value: number): boolan */
/** @return {boolean} */
function isEven (/** @type {number} */ value) {
  let result = value % 2;
  if (result === result) { return result === 0; }
  return false;
}


/* isOdd(value: number): boolean */
/** @return {boolean} */
function isOdd (/** @type {number} */ value) {
  let result = value % 2;
  if (result === result) { return result !== 0; }
  return false;
}


/* toInt8(value: any): integer -127..128 */
/** @return {number} */
const toInt8 = (/** @type {any} */ value) =>
  ((value = Math.min(Math.max(-128, Math.trunc(Number(value))), 127)) === value)
    ? value : 0;


/* toUInt8(value: any): integer 0..255 */
/** @return {number} */
const toUInt8 = (/** @type {any} */ value) =>
  ((value = Math.min(Math.max(0, Math.trunc(Number(value))), 255)) === value)
    ? value : 0;


/* toInt16(value: any): integer -32768..32767 */
/** @return {number} */
const toInt16 = (/** @type {any} */ value) =>
  ((value = Math.min(Math.max(-32768, Math.trunc(Number(value))), 32767))
    === value) ? value : 0;


/* toUInt16(value: any) integer 0..65535 */
/** @return {number} */
const toUInt16 = (/** @type {any} */ value) =>
  ((value = Math.min(Math.max(0, Math.trunc(Number(value))), 65535)) === value)
    ? value : 0;


/* toInt32(value: any): integer -2147483648..2147483647 */
/** @return {number} */
const toInt32 = (/** @type {any} */ value) =>
  ((value = Math.min(Math.max(-2147483648, Math.trunc(Number(value))),
    2147483647)) === value) ? value : 0;


/* toUInt32(value: any: integer 0..4294967295 */
/** @return {number} */
const toUInt32 = (/** @type {any} */ value) =>
  ((value = Math.min(Math.max(0, Math.trunc(Number(value))), 4294967295))
    === value) ? value : 0;


/* toBigInt64(value: any): bigint */
/** @return {bigint} */
const toBigInt64 = (/** @type {any} */ value) =>
  BigInt(typeof value === "bigint"
    ? (value > Math.pow(2,63) -1 ?Math.pow(2, 63) -1 : value < Math.pow(-2, 63)
      ? Math.pow(-2, 63) : value)
  : ((value = Math.min(Math.max(Math.pow(-2, 63), Math.trunc(Number(value))),
    Math.pow(2, 63) - 1)) === value ) ? value : 0);


/* toBigUInt64(value: any): unsigned bigint */
/** @return {bigint} */
const toBigUInt64 = (/** @type {any} */ value) =>
  BigInt(typeof value === "bigint"
    ? (value > Math.pow(2, 64) - 1 ? Math.pow(2,64) - 1 : value < 0 ? 0 : value)
    : ((value = Math.min(Math.max(0, Math.trunc(Number(value))),
      Math.pow(2, 64) -1)) === value) ? value : 0);


/* toFloat32(value: any): float */
/** @return {number} */
const toFloat32 = (/** @type {any} */ value) =>
  ((value = Math.min(Math.max(-3.4e38, Number(value)), 3.4e38)) === value)
    ? value : 0;


/* isInt8(value: any): boolean */
/** @return {boolean} */
const isInt8 = (/** @type {any} */ value) =>
  (Number.isInteger(value) ? (value >= -128 && value <= 127) : false);


/* isUInt8(value: any): boolean */
/** @return {boolean} */
const isUInt8 = (/** @type {any} */ value) =>
  (Number.isInteger(value) ? (value >= 0 && value <= 255) : false);


/* isInt16(value: any): boolean */
/** @return {boolean} */
const isInt16 = (/** @type {any} */ value) =>
  (Number.isInteger(value) ?(value >= -32768 && value <= 32767) : false);


/* isUInt16(value: any): boolean */
/** @return {boolean} */
const isUInt16 = (/** @type {any} */ value) =>
  (Number.isInteger(value) ? (value >= 0 && value <= 65535) : false);


/* isInt32(value: any): boolean */
/** @return {boolean} */
const isInt32 = (/** @type {any} */ value) =>
  (Number.isInteger(value) ? (value >= -2147483648 && value <= 2147483647)
    : false);


/* isUInt32(value: any): boolean */
/** @return {boolean} */
const isUInt32 = (/** @type {any} */ value) =>
  (Number.isInteger(value) ? (value >= 0 && value <= 4294967295) : false);


/* isBigInt64(value: any): boolean */
/** @return {boolean} */
const isBigInt64 = (/** @type {any} */ value) => (typeof value === "bigint"
  ? (value >= Math.pow(-2, 63) && value <= Math.pow(2, 63)-1) : false);


/* isBigUInt64(value: any): boolean */
/** @return {boolean} */
const isBigUInt64 = (/** @type {any} */ value) =>
  (typeof value === "bigint" ? (value >= 0 && value <= Math.pow(2,64)-1)
    : false);


/* toFloat16(value: any): float16 */
/** @return {number} */
const toFloat16 = (/** @type {any} */ value) =>
  ((value = Math.min(Math.max(-65504, Number(value)), 65504)) === value )
    ? value : 0;


/* isFloat16(value: any): boolean */
/** @return {boolean} */
const isFloat16 = (/** @type {any} */ value) =>
  ((typeof value === "number" && value === value)
    ? (value >= -65504 && value <= 65504) : false);


/* signbit(value: any): boolean */
/** @return {boolean} */
const signbit = (/** @type {any} */ value) =>
  (((value = Number(value)) !== value)
    ? false : ((value < 0) || Object.is(value, -0)));


/* randomInt([max: integer]): integer */
/* randomInt(min: integer, max: integer): integer */
/** @return {number} */
function randomInt (
  /** @type {number | undefined} */ min = 100,
  /** @type {number | null | undefined} */ max) {
  if (max == null) {
    max = min;
    min = 0;
  }
  min = Math.ceil(Number(min));
  return Math.floor(Math.random() * (Math.floor(Number(max)) - min + 1) + min);
}


/* randomFloat([max: float]): float */
/* randomFloat(min: float, max: float): float */
/** @return {number} */
function randomFloat (
  /** @type {number | undefined} */ min = 100,
  /** @type {number | null | undefined} */ max) {
  if (max == null) {
    max = min;
    min = 0;
  }
  let result = (Math.random() * (max - min + 1)) + min;
  return result > max ? max : result;
}


/* inRange(value: number, min: number, max: number): boolean */
/** @return {boolean} */
const inRange = (
  /** @type {number} */ value,
  /** @type {number} */ min,
  /** @type {number} */ max) =>
  (value >= min && value <= max);


/** object header **/


const VERSION = "Celestra v6.0.5 dev";


/* celestra.noConflict(): celestra object */
function noConflict () {
  globalThis.CEL = celestra.__prevCEL__; return celestra;
}


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
  toSafeString,
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
  assertIs,
  assertIsNot,
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
  is,
  toObject,
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
  isAsyncIterable,
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
  castArray,
  compact,
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
  // @ts-ignore
  globalThis.celestra = celestra;
  celestra.__prevCEL__ = globalThis.CEL;
  // @ts-ignore
  globalThis.CEL = celestra;
}


}(globalThis));
