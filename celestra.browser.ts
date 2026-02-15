// @ts-check
/// <reference lib="esnext" />
/// <reference lib="esnext.iterator" />
/// <reference lib="dom" />
/// <reference lib="dom.iterable" />
/// <reference lib="dom.asynciterable" />
/// <reference lib="webworker.importscripts" />
"use strict";


/**
 * @name Celestra
 * @version 6.4.1 browser
 * @author Ferenc Czigler
 * @see https://github.com/Serrin/Celestra/
 * @license MIT https://opensource.org/licenses/MIT
 */


const VERSION = "Celestra v6.4.1 browser";


/** TS types */


/**
 * @description Map-like object with string or number or symbol keys.
 *
 * @internal
 * */
type MapLike = Record<PropertyKey, any>;

/**
 * @description Set-like object.
 *
 * @internal
 * */
/*
type SetLike<T> ={
  readonly size: number;
  has(value: T): boolean;
};
*/

/**
 * @description Number-like object.
 *
 * @internal
 * */
type NumberLike = number | bigint;

/**
 * @description Any iterable or iterator. Includes: `Iterable<any>`, `Iterator<any>`, `IterableIterator<any>``
 */
type IterableLike = Iterable<any> | Iterator<any> | IterableIterator<any>;

/**
 * @description Any iterable, iterator, or array-like structure for type `T`. Broadly useful for generic functions that accept "sequence-like" inputs.
 */
type IterableLikeAndArrayLike =
  | Iterable<any>
  | Iterator<any>
  | IterableIterator<any>
  | ArrayLike<any>; /* built-in */

/**
 * @description Iterable and Iterator and Generator types.
 *
 * @internal
 */
type IteratorReturn = Iterable<any> | Generator<number, void, unknown>;

/**
 * @description Type for undefined and null values.
 *
 * @internal
 */
type Nullish = undefined | null;

/*
built-in type:
type NonNullable = number | boolean | string | symbol | object | Function;
*/

/**
 * @description Not null or undefined or object or function.
 *
 * @internal
 */
type NonNullablePrimitive = number | bigint | boolean | string | symbol;

/**
 * @description Not object or function.
 *
 * @internal
 */
type Primitive = null | undefined | number | bigint | boolean | string | symbol;

/**
 * Generic comparable types.
 *
 * @internal
 */
type Comparable = number | bigint | string | boolean | Date;

/**
 * @description Object key type.
 *
 * @internal
 */
type PropertyKey = string | symbol;

/**
 * @description Type AsyncFunction.
 */
type AsyncFunction = (...args: any[]) => Promise<any>;

/**
 * @description Primitive types.
 *
 * @internal
 */
type TypeOfTag =
  | "null" | "undefined"
  | "number" | "bigint" | "boolean" | "string" | "symbol"
  | "object" | "function";

/**
 * @description TypedArray types.
 *
 * @internal
 */
type TypedArray = Exclude<ArrayBufferView, DataView>;

/**
 * @description ClearCookiesOptions object type.
 *
 * @internal
 */
type ClearCookiesOptions = {
  path?: string | undefined;
  domain?: string | undefined;
  secure?: boolean | undefined;
  SameSite?: string | undefined;
  HttpOnly?: boolean | undefined;
};


/** polyfills **/


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


/* Math.sumPrecise(); */
if (!("sumPrecise" in Math)) {
  // @ts-ignore
  Math.sumPrecise = function sumPrecise ([...array]): number {
    /* empty iterator */
    if (array.length === 0) { return -0; }
    /* iterator with items */
    if (array.every((value: unknown): boolean => typeof value === "number")) {
      /* return NaN + Infinity + -Infinity */
      let inf = array.indexOf(Infinity) >- 1;
      let negInf = array.indexOf(-Infinity) > -1;
      if (array.some((value: unknown): boolean => value !== value)
        || (inf && negInf)) { return NaN; }
      if (inf) { return Infinity; }
      if (negInf) { return -Infinity; }
      /* sum hi */
      let hi = array.filter((value: unknown): boolean =>
        (value === 1e20 || value === -1e20))
          .reduce((acc, value): number => acc + value, 0);
      /* sum lo - Kahan sum */
      let lo: number = 0.0;
      let c: number = 0.0;
      for (let item of array.filter((value: unknown): boolean =>
        (value !== 1e20 && value !== -1e20))) {
        let y = item - c; let t = lo + y; c = (t - lo) - y; lo = t;
      }
      /* return sum values */
      /*
      if (lo === 0 && hi !== 0) { return hi; }
      if (lo > 0 && hi > 0) { return hi; }
      if (lo < 0 && hi < 0) { return hi; }
      if (lo > 0 && hi < 0) { return lo + hi; }
      if (lo < 0 && hi > 0) { return lo + hi; }
      if (lo === 0 && hi === 0) { return lo; }
      if (lo !== 0 && hi === 0) { return lo; }
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
  Error.isError = function isError (value: unknown) {
    let className =
      Object.prototype.toString.call(value).slice(8, -1).toLowerCase();
    return (className === "error" || className === "domexception");
  };
}


/* Object.groupBy(); */
if (!("groupBy" in Object)) {
  // @ts-ignore
  Object.defineProperty(Object, "groupBy", {
    "configurable": true, "writable": true, "enumerable": true,
    "value": function (items: IterableLike, callbackFn: Function) {
      if (!(typeof callbackFn === "function")) { throw new TypeError(); }
      let result = Object.create(null);
      let index: number = 0;
      for (let item of items as Iterable<any>) {
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
    "value": function (items: IterableLike, callbackFn: Function) {
      if (!(typeof callbackFn === "function")) { throw new TypeError(); }
      let result = new Map();
      let index: number = 0;
      for (let item of items as Iterable<any>) {
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
    const isConstructor = (value: unknown): boolean =>
      (typeof value === "function" && typeof value.prototype === "object");
    const errorMsg = "Input length exceed the Number.MAX_SAFE_INTEGER.";
    if (Symbol.asyncIterator in arrayLike || Symbol.iterator in arrayLike) {
      let result: any[] = isConstructor(this) ? new this : Array(0);
      let index: number = 0;
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
      let length: number = arrayLike.length;
      let result: any[] = isConstructor(this) ? new this(length) : Array(length);
      let index: number = 0;
      while (index < length) {
        if (index > Number.MAX_SAFE_INTEGER) { throw TypeError(errorMsg); }
        let item: any = await arrayLike[index];
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
      (c: any): any =>
        (c^crypto.getRandomValues(new Uint8Array(1))[0]&15 >> c/4).toString(16)
    );
  };
}


/* Object.hasOwn(); */
if (!Object.hasOwn) {
  Object.defineProperty(Object, "hasOwn", {
    configurable: true, enumerable: false, writable: true,
    value: function (object: object, property: string): boolean {
      if (object == null) {
        throw new TypeError("Cannot convert undefined or null to object");
      }
      return Object.prototype.hasOwnProperty.call(Object(object), property);
    }
  });
}


/* Array.prototype.toReversed(); */
if (!("toReversed" in Array.prototype)) {
  Object.defineProperty(Array.prototype, "toReversed", {
    "configurable": true, "writable": true, "enumerable": false,
    "value": function () { return this.slice().reverse(); }
  });
}


/* Array.prototype.toSorted(); */
if (!("toSorted" in Array.prototype)) {
  Object.defineProperty(Array.prototype, "toSorted", {
    "configurable": true, "writable": true, "enumerable": false,
    "value": function (fn: Function) { return this.slice().sort(fn); }
  });
}


/* Array.prototype.toSpliced(); */
if (!("toSpliced" in Array.prototype)) {
  Object.defineProperty(Array.prototype, "toSpliced", {
    "configurable": true, "writable": true, "enumerable": false,
    "value": function (
      start: number,
      deleteCount: number,
      ...items: any[]): any[] {
      let result: any[] = this.slice();
      result.splice(start, deleteCount, ...items);
      return result;
    }
  });
}


/* Array.prototype.with(); */
if (!("with" in Array.prototype)) {
  Object.defineProperty(Array.prototype, "with", {
    "configurable": true, "writable": true, "enumerable": false,
    "value": function (index: string | number, value: unknown): any[] {
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
    "value": function () {return this.slice().reverse();}
  });
}


/* TypedArray.prototype.toSorted(); */
if (!("toSorted" in Uint8Array.prototype)) {
  Object.defineProperty(Uint8Array.prototype, "toSorted", {
    "configurable": true, "writable": true, "enumerable": false,
    "value": function (fn: Function) { return this.slice().sort(fn); }
  });
}


/* TypedArray.prototype.with(); */
if (!("with" in Uint8Array.prototype)) {
  Object.defineProperty(Uint8Array.prototype, "with", {
    "configurable": true, "writable": true, "enumerable": false,
    "value": function (index: string | number, value: unknown) {
      let result = this.slice();
      result[index] = value;
      return result;
    }
  });
}


/* globalThis.GeneratorFunction; */
// @ts-ignore
if (!globalThis.GeneratorFunction) {
  // @ts-ignore
  globalThis.GeneratorFunction =
    Object.getPrototypeOf(function*(){}).constructor;
}


/* globalThis.AsyncFunction; */
// @ts-ignore
if (!globalThis.AsyncFunction) {
  // @ts-ignore
  globalThis.AsyncFunction =
    Object.getPrototypeOf(async function(){}).constructor;
}


/* globalThis.AsyncGeneratorFunction; */
// @ts-ignore
if (!globalThis.AsyncGeneratorFunction) {
  // @ts-ignore
  globalThis.AsyncGeneratorFunction =
    Object.getPrototypeOf(async function* () {}).constructor;
}


/** Core API **/


/* Alphabet constans */
const BASE16 = "0123456789ABCDEF";
const BASE32 = "234567ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const BASE36 = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const BASE58 = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
const BASE62 = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
const WORDSAFEALPHABET = "23456789CFGHJMPQRVWXcfghjmpqvwx"; /* 31 characters */


/**
 * @description Ensures that `condition` is truthy. Throws an `Error` if falsy.
 *
 * @param {unknown} condition The value to check.
 * @param {unknown} [message] - Optional message or Error to throw.
 * @throws {Error} If assertion is failed.
 */
function assert (condition: unknown, message?: unknown): asserts condition {
  if (!condition) {
    // @ts-ignore
    if (Error.isError(message)) { throw message; }
    let errorMessage =
      `[assert] Assertion failed: ${condition} should be truly${message ? " - " + message : ""}`;
    throw new Error(errorMessage, {cause: errorMessage});
  }
}


/**
 * @description SameValueZero equality (like `Object.is`, but +0 === -0).
 *
 * @param {unknown} value1
 * @param {unknown} value2
 * @returns {boolean}
 */
const eq = (value1: unknown, value2: unknown): boolean =>
  value1 === value2 || (value1 !== value1 && value2 !== value2);


/**
 * @description Greater than.
 *
 * @param {any} value1
 * @param {any} value2
 * @returns {boolean}
 */
function gt (value1: Comparable, value2: Comparable): boolean {
  const _typeOf = (value: unknown): string =>
    value === null ? "null" : typeof value;
  return _typeOf(value1) === _typeOf(value2) && value1 > value2;
}


/**
 * @description Greater than or equal (SameValueZero).
 *
 * @param {any} value1
 * @param {any} value2
 * @returns {boolean}
 */
function gte (value1: Comparable, value2: Comparable): boolean {
  const _typeOf = (value: unknown): string =>
    value === null ? "null" : typeof value;
  return _typeOf(value1) === _typeOf(value2)
    && (value1 > value2
      || value1 === value2
      || (value1 !== value1 && value2 !== value2));
}


/**
 * @description Less than.
 *
 * @param {any} value1
 * @param {any} value2
 * @returns {boolean}
 */
function lt (value1: Comparable, value2: Comparable): boolean {
  const _typeOf = (value: unknown): string =>
    value === null ? "null" : typeof value;
  return _typeOf(value1) === _typeOf(value2) && value1 < value2;
}


/**
 * @description Less than or equal (SameValueZero).
 *
 * @param {any} value1
 * @param {any} value2
 * @returns {boolean}
 */
function lte (value1: Comparable, value2: Comparable): boolean {
  const _typeOf = (value: unknown): string =>
    value === null ? "null" : typeof value;
  return _typeOf(value1) === _typeOf(value2)
    && (value1 < value2
      || value1 === value2
      || (value1 !== value1 && value2 !== value2));
}


/**
 * @description Calls `fn` with the given `value` and then returns `value`.
 *
 * @param {Function} fn
 * @returns {Function}
 */
function tap (fn: Function): any {
  return function (value: unknown): any { fn(value); return value; };
}


/**
 * @description Creates a function that is restricted to invoking `fn` once.
 *
 * @param {Function} fn
 * @returns {Function}
 */
function once (fn: Function): Function {
  let called: boolean = false;
  let result: any;
  return function (...args: any[]): any {
    if (!called) {
      called = true;
      result = fn(...args);
    }
    return result;
  };
}


/**
 * @description Transforms a function of N arguments into N functions of one argument.
 *
 * @param {Function} fn
 * @returns {Function}
 */
function curry (fn: Function): Function {
  const curried = (...args: any[]): any =>
    args.length >= fn.length
      ? fn(...args)
      : (...rest: any[]): any => curried(...args, ...rest);
  return curried;
}


/**
 * @description Creates a function that is the composition of the provided functions.
 *
 * @param {Function} functions
 * @returns {Function}
 */
const pipe = (...functions: Function[]): Function =>
  (first: any): any =>
    functions.reduce((value: unknown, fn: Function): any => fn(value), first);


/**
 * @description Creates a function that is the composition of the provided functions.
 *
 * @param {Function} functions
 * @returns {Function}
 */
const compose = (...functions: Function[]): Function =>
  (first: any): any => functions.reduceRight((value, fn): any => fn(value), first);


/**
 * @description Creates a new object composed of the picked `object` properties.
 *
 * @param {object} obj
 * @param {string[]} keys
 */
const pick = (obj: MapLike, keys: string[]): MapLike =>
  keys.reduce(function (acc: MapLike, key: string) {
    if (key in obj) { acc[key] = obj[key]; }
    return acc;
  }, {});


/**
 * @description Creates a new object composed of the `object` properties except for those omitted.
 *
 * @param {object} obj
 * @param {string[]} keys
 * @returns {object}
 */
const omit = (obj: MapLike, keys: string[]): MapLike =>
  Object.keys(obj).reduce(function (acc: MapLike, key: string) {
    // @ts-ignore
    if (!keys.includes(key)) { acc[key] = obj[key]; }
    return acc;
  }, {});


/**
 * @description Returns a new object with the specified key-value pair added or updated.
 *
 * @param {object} obj
 * @param {string} key
 * @param {object} value
 */
const assoc = (obj: MapLike, key: string, value: unknown): MapLike =>
  ({...obj, [key]: value});


/**
 * @description An asynchronous no-operation function that returns a resolved Promise.
 *
 * @returns {Promise<void>}
 */
// @ts-ignore
function asyncNoop (): Promise<void> {
  return new Promise(function (resolve: Function) { resolve(); });
}


/**
 * @description Asynchronous function that returns a resolved Promise with `true`.
 *
 * @returns {Promise<boolean>}
 */
async function asyncT (): Promise<boolean> { return true; }


/**
 * @description Asynchronous function that returns a resolved Promise with `false`.
 *
 * @returns {Promise<boolean>}
 */
async function asyncF (): Promise<boolean> { return false; }


/**
 * @description Creates an asynchronous function that returns a resolved Promise with the specified value.
 *
 * @param {unknown} value
 * @returns {Function}
 */
function asyncConstant (value: unknown): Function {
  return async function() { return value; };
}


/**
 * @description Asynchronous identity function that returns a resolved Promise with the given value.
 *
 * @param {unknown} value
 * @returns {Promise<any>}
 */
async function asyncIdentity (value: unknown): Promise<any> { return value; }


/* deleteOwnProperty(object, property [,Throw = false]): number | thrown error*/
/**
 * @description Deletes an own property from an object.
 *
 * @param {Object} obj - The object from which to delete the property.
 * @param {string} property - The name of the property to delete.
 * @param {boolean} [Throw=false] - If true, throws an error if deletion fails.
 * @returns {number} - Returns 1 if the property was deleted, 0 if it was not found, -1 if it did not exist.
 */
function deleteOwnProperty (
  obj: Object,
  property: string,
  Throw: boolean = false): number {
  if (Object.hasOwn(obj, property)) {
    // @ts-ignore
    delete obj[property];
    let result = Object.hasOwn(obj, property);
    if (result && Throw) { throw new Error("[deleteOwnProperty] error"); }
    return +!result;
  }
  return -1;
}


/**
 * @description Creates a polyfill method on an object if it does not already exist.
 *
 * @param {Object} obj - The object on which to create the method.
 * @param {string} property - The name of the method to create.
 * @param {Function} value - The function to assign as the method.
 * @returns {boolean} - Returns true if the method was created or already exists with the same value.
 */
function createPolyfillMethod (
  obj: Object,
  property: string,
  value: Function): boolean {
  if (!(Object.hasOwn(obj, property))) {
    Object.defineProperty(obj, property, {
      writable: true, enumerable: false, configurable: true, value: value
    });
  }
  // @ts-ignore
  return (obj[property] === value);
}


/**
 * @description Creates a polyfill property on an object if it does not already exist.
 *
 * @param {Object} obj - The object on which to create the property.
 * @param {string} property - The name of the property to create.
 * @param {unknown} value - The value to assign to the property.
 * @returns {boolean} - Returns true if the property was created or already exists with the same value.
 */
function createPolyfillProperty (
  obj: object,
  property: string,
  value: unknown): boolean {
  if (!(Object.hasOwn(obj, property))) {
    Object.defineProperty(obj, property, {
      writable: true, enumerable: true, configurable: true, value: value
    });
  }
  // @ts-ignore
  return (obj[property] === value);
}


/**
 * @description Generates a random UUID version 7 or UUID version 7 with version 4 ID.
 *
 * @param {boolean} [v4=false] - If true, generates a UUID version 4; otherwise, generates version 7.
 * @returns {string} A randomly generated UUID string.
 */
function randomUUIDv7 (v4: boolean = false): string {
  let ts = Date.now().toString(16).padStart(12,"0") + (v4 ? "4" : "7");
  // @ts-ignore
  let uuid = Array.from(([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, (c): any =>
    (c^crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  ));
  let index: number = 0;
  let pos: number = 0;
  while (index < 13) {
    if (pos === 8 || pos === 13) { pos++; }
    uuid[pos] = ts[index];
    pos++;
    index++;
  }
  return uuid.join("");
}


/**
 * @description Returns a Promise that resolves after a specified delay in milliseconds.
 *
 * @param {number} milisec - The delay duration in milliseconds.
 * @returns {Promise<void>} A Promise that resolves after the specified delay.
 */
const delay = (milisec: number): Promise<void> =>
  new Promise(resolve => setTimeout(resolve, milisec));


/**
 * @description Generates a random boolean value.
 *
 * @returns {boolean} A randomly generated boolean value.
 */
const randomBoolean = (): boolean => !Math.round(Math.random());


/**
 * @description Parses URL query parameters into an object.
 *
 * @param {string} [str=location.search] - The URL query string to parse. Defaults to the current location's search string.
 * @returns {Object} An object containing the parsed query parameters as key-value pairs.
 */
const getUrlVars = (str: string = location.search): Object =>
  [...new URLSearchParams(str).entries()]
    // @ts-ignore
    .reduce(function (obj, item) { obj[item[0]] = item[1]; return obj; }, {});


/**
 * @description Create a parsable string from an object.
 *
 * @param {object} obj
 * @returns {string}
 */
const obj2string = (obj: object): string => Object.keys(obj).reduce(
  (str, key: string): string => str
    // @ts-ignore
    += encodeURIComponent(key) + "=" + encodeURIComponent(obj[key]) + "&",
"").slice(0, -1);


/**
 * @description Deep assign of an object (Object, Array, etc.)
 *
 * @returns any
 */
function extend <T extends object, U extends object>(target: T, source: U): T & U;
function extend <T extends object, U extends object, V extends object>(target: T, s1: U, s2: V): T & U & V;
function extend <T extends object>(deep: true, target: T, ...sources: any[]): T;
function extend <T extends object>(deep: false, target: T, ...sources: any[]): T;
function extend (target: object, ...sources: any[]): object;
function extend (...args: any[]): any {
  /* Arguments checking */
  let deep: boolean = false;
  let target: any;
  let i = 0;
  if (args[0] === true) {
    deep = true;
    target = args[1] || {};
    i = 2;
  } else {
    target = args[0] || {};
    i = 1;
  }
  /* Helper functions */
  const _isPlainObject = (obj: any): obj is Record<string, any> =>
    obj != null
      && typeof obj === "object"
      && (obj.constructor === Object || obj.constructor == null);
  const _isDate = (value: any): value is Date => value instanceof Date;
  const _isRegExp = (value: any): value is RegExp => value instanceof RegExp;
  const _isMap = (value: any): value is Map<any, any> => value instanceof Map;
  const _isSet = (value: any): value is Set<any> => value instanceof Set;
  /*  */
  function merge(target: any, source: any): any {
    /* Identical or non-object -> direct assign */
    if (Object.is(source, target) || source == null || typeof source !== "object") {
      return source;
    }
    /* Date -> clone */
    if (_isDate(source)) { return new Date(source.getTime()); }
    /* RegExp -> clone */
    if (_isRegExp(source)) { return new RegExp(source); }
    /* Map -> deep merge entries */
    if (_isMap(source)) {
      if (!_isMap(target)) { target = new Map(); }
      for (let [key, value] of source) {
        const tv = target.get(key);
        target.set(key, deep ? merge(tv, value) : value);
      }
      return target;
    }
    /* Set -> deep union */
    if (_isSet(source)) {
      if (!_isSet(target)) { target = new Set(); }
      for (let item of source) {
        if (deep) {
          if (target.has(item)) { continue; }
        }
        target.add(item);
      }
      return target;
    }
    /* Array -> deep merge by index */
    if (Array.isArray(source)) {
      if (!Array.isArray(target)) { target = []; }
      const srcLength = source.length;
      for (let i = 0; i < srcLength; i++) {
        let sv = source[i];
        let tv = target[i];
        target[i] = deep ? merge(tv, sv) : sv;
      }
      return target;
    }
    /* Plain object -> deep merge keys */
    if (_isPlainObject(source)) {
      if (!_isPlainObject(target)) { target = {}; }
      for (let key in source) {
        let sv = source[key];
        let tv = target[key];
        target[key] = deep ? merge(tv, sv) : sv;
      }
      return target;
    }
    /* Fallback: copy by reference */
    return source;
  }
  /* Clone all sources */
  const length = args.length;
  for (; i < length; i++) { merge(target, args[i]); }
  return target;
}


/**
 * @description Returns the number of own properties (including symbols) of an object.
 *
 * @param {object} obj
 * @returns {number}
 */
const sizeIn = (obj: object): number =>
  Object.getOwnPropertyNames(obj).length
    + Object.getOwnPropertySymbols(obj).length;


/**
 * @description Creates a function that invokes `fn` with its `this` binding removed.
 *
 * @param {Function} fn
 * @returns {Function}
 */
const unBind = (fn: Function): Function => Function.prototype.call.bind(fn);


/**
 * @description Creates a function that invokes `fn` with its `this` binding set to the provided context.
 *
 * @param {Function} fn
 * @param {Function} context
 */
const bind = Function.prototype.call.bind(Function.prototype.bind);


/**
 * @description Returns a function that always returns the same value.
 *
 * @param {unknown} value
 * @returns {unknown}
 */
const constant = <T>(value: T): (() => T) => () => value;


/**
 * @description Returns value unchanged.
 *
 * @param {unknown} value
 * @returns {unknown}
 */
const identity = <T,> (value: T): T => value;


/**
 * @description A function that does nothing.
 *
 * @returns {void}
 */
function noop (): void {}


/**
 * @description Always returns true.
 *
 * @returns {true}
 */
const T = (): boolean => true;


/**
 * @description Always returns false.
 *
 * @returns {false}
 */
const F = (): boolean => false;


/**
 * @description Generates a random string ID of specified size using the provided alphabet.
 *
 * @param {number} [size=21] - The length of the generated ID.
 * @param {string} [alphabet="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_-"] - The set of characters to use for generating the ID.
 */
function nanoid (
  size = 21,
  alphabet: string =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_-"
  ): string {
  let result: string = "";
  let dl: number = alphabet.length;
  let pos: number;
  let index: number = size;
  while (index--) {
    do { pos = crypto.getRandomValues(new Uint8Array(1))[0]; } while
      (pos >= dl);
    result += alphabet[pos];
  }
  return result;
}


/**
 * @description Generates a timestamp-based string ID of specified size using the provided alphabet.
 *
 * @param {number} [size=21] - The total length of the generated ID, including the timestamp.
 * @param {string} [alphabet="123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz"] - The set of characters to use for generating the ID.
 * @returns {string} The generated timestamp-based ID.
 */
function timestampID (
  size: number = 21,
  alphabet: string =
    "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz"
  ): string {
  let result: string = Date.now().toString(36).padStart(10, "0") + "-";
  let dl: number = alphabet.length;
  let pos: number;
  let index: number = ((size > 11) ? size : 12) - 11;
  while (index--) {
    do { pos = crypto.getRandomValues(new Uint8Array(1))[0]; } while
      (pos >= dl);
    result += alphabet[pos];
  }
  return result;
}


/** String API **/


/**
 * @description Encodes a string to Base64 format.
 *
 * @param {any} str - The string to encode.
 * @returns {string} The Base64 encoded string.
 */
function b64Encode (str: any): string {
  return btoa(encodeURIComponent(String(str)).replace(/%([0-9A-F]{2})/g,
    function toSolidBytes (_match, p1): string {
       // @ts-ignore
      return String.fromCharCode("0x" + p1);
    }
  ));
}


/**
 * @description Decodes a Base64 encoded string.
 *
 * @param {string} str - The Base64 encoded string to decode.
 * @returns {string} The decoded string.
 */
function b64Decode (str: any): string {
  return decodeURIComponent(atob(String(str)).split("").map(function (c) {
    return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(""));
}


/**
 * @description Truncates a string to a specified length, optionally adding an omission string.
 *
 * @param {string} str - The string to truncate.
 * @param {number} newLength - The maximum length of the truncated string.
 * @param {string} [omission=""] - The string to append to the truncated string.
 * @returns {string} The truncated string.
 */
function strTruncate (
  str: any,
  newLength: number,
  omission: string = ""): string {
  str = String(str);
  omission = String(omission);
  let strUC = Array.from(str);
  if (newLength >= strUC.length) { return str; }
  return strUC.slice(0, newLength-Array.from(omission).length).join("")
    + omission;
}


/**
 * @description Converts the first character of each word in a string to uppercase and the rest to lowercase.
 *
 * @param {any} str - The string to convert.
 * @returns {string} The converted string.
 */
const strPropercase = (str: any): string =>
  String(str).trim().split(" ").map(function (value: string) {
    let chars = Array.from(value).map( (c: string): string => c.toLowerCase() );
    if (chars.length) { chars[0] = chars[0].toUpperCase(); }
    return chars.join("");
  }).join(" ");


/**
 * @description Converts the first character of each word in a string to uppercase and the rest to lowercase.
 *
 * @param {any} str - The string to convert.
 * @returns {string} The converted string.
 */
const strTitlecase = (str: any): string =>
  String(str).trim().split(" ").map(function (value: string) {
    let chars = Array.from(value).map( (c: string): string => c.toLowerCase() );
    if (chars.length) { chars[0] = chars[0].toUpperCase(); }
    return chars.join("");
  }).join(" ");


/**
 * @description Capitalizes the first character of a string and converts the rest to lowercase.
 *
 * @param {any} str - The string to capitalize.
 * @returns {string} The capitalized string.
 */
function strCapitalize (str: any): string {
  let chars = [...String(str).trim().toLowerCase()];
  if (chars.length) { chars[0] = chars[0].toUpperCase(); }
  return chars.join("");
}


/**
 * @description Converts the first character of a string to uppercase.
 *
 * @param {any} str - The string to modify.
 * @returns {string} The modified string.
 */
function strUpFirst (str: any): string {
  let chars = [...String(str).trim()];
  if (chars.length) { chars[0] = chars[0].toUpperCase(); }
  return chars.join("");
}


/**
 * @description Converts the first character of a string to lowercase.
 *
 * @param {any} str - The string to modify.
 * @returns {string} The modified string.
 */
function strDownFirst (str: any): string {
  let chars = [...String(str).trim()];
  if (chars.length) { chars[0] = chars[0].toLowerCase(); }
  return chars.join("");
}


/**
 * @description Reverses the characters in a string.
 *
 * @param {any} str - The string to reverse.
 * @returns {string} The reversed string.
 */
const strReverse = (str: any): string =>
  Array.from(String(str)).reverse().join("");


/**
 * @description Returns an array of Unicode code points for each character in a string.
 *
 * @param {any} str - The string to process.
 * @returns {number[]} An array of Unicode code points.
 */
const strCodePoints = (str: any): any[] =>
  Array.from(String(str), (value: string): number | undefined =>
    value.codePointAt(0));


/**
 * @description Creates a string from an array or iterable of Unicode code points.
 *
 * @param {Iterable<number>} iterator - An array or iterable of Unicode code points.
 * @returns {string} The constructed string.
 */
const strFromCodePoints = ([...array]): string =>
  String.fromCodePoint(...array);


/**
 * @description Gets or sets a unicode character at a specified index in a string.
 *
 * @param {string} str - The string to modify.
 * @param {number} index - The index of the character to get or set.
 */
function strAt (str: string, index: number, newChar?: string): string {
  let chars: string[] = Array.from(String(str));
  if (newChar == null) { return chars.at(index) || ""; }
  index = index < 0 ? chars.length + index : index;
  if (index > chars.length) { return chars.join(""); }
  chars[index] = newChar;
  return chars.join("");
}


/**
 * @description Splices a string by removing a specified number of characters at a given index and optionally adding new characters.
 *
 * @param {string} str - The string to splice.
 * @param {number} index - The index at which to start splicing.
 * @param {number} count - The number of characters to remove.
 * @param {string} [add] - The string to add at the splice index.
 * @returns {string} The spliced string.
 */
const strSplice = (str: string, index: number,count: number, ...add: any[]): string =>
  Array.from(str).toSpliced(index, count, add.join("")).join("");


/**
 * @description Removes HTML tags from a string.
 *
 * @param {any} str - The string from which to remove HTML tags.
 * @returns {string} The string without HTML tags.
 */
const strHTMLRemoveTags = (str: any): string =>
  String(str).trim().replace(/<[^>]*>/g, " ").replace(/\s{2,}/g, " ").trim();


/**
 * @description Escapes special HTML characters in a string.
 *
 * @param {any} str - The string to escape.
 * @returns {string} The escaped string.
 */
const strHTMLEscape = (str: any): string =>
  String(str).trim()
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");


/**
 * @description Unescapes special HTML characters in a string.
 *
 * @param {any} str - The string to unescape.
 * @returns {string} The unescaped string.
 */
const strHTMLUnEscape = (str: string): string =>
  String(str).trim()
    .replace(/&amp;/g, "&").replace(/&#38;/g, "&")
    .replace(/&lt;/g, "<").replace(/&#60;/g, "<")
    .replace(/&gt;/g, ">").replace(/&#62;/g, ">")
    .replace(/&quot;/g, '"').replace(/&#34;/g, '"')
    .replace(/&apos;/g, "'").replace(/&#39;/g, "'");


/** DOM API **/


/**
 * @description Selects all elements matching the specified CSS selector within the given context.
 *
 * @param {string} str - The CSS selector to match.
 * @param {Document | HTMLElement} [context=document] - The context in which to search for elements.
 * @returns {any[]} An array of matching elements.
 */
const qsa = (str: string, context: Document | HTMLElement = document): any[] =>
    Array.from(context.querySelectorAll(str));


/**
 * @description Selects the first element matching the specified CSS selector within the given context.
 *
 * @param {string} str - The CSS selector to match.
 * @param {Document | HTMLElement} [context=document] - The context in which to search for the element.
 * @returns {HTMLElement | null} The first matching element, or null if no match is found.
 */
const qs = (str: string, context: Document | Element = document): HTMLElement | null =>
    context.querySelector(str);


/**
 * @description Executes a callback function when the DOM is fully loaded.
 *
 * @param {Function} fn - The callback function to execute.
 * @returns {void}
 */
function domReady (fn: Function): void {
  if (document.readyState !== "loading") {
    fn();
  } else {
    document.addEventListener("DOMContentLoaded", function (_event) { fn(); });
  }
}


/* domCreate(type: string[, properties: object[, innerHTML: string]]):
  element */
/* domCreate(element descriptive object): element */
/**
 * @description Creates a new DOM element with specified properties and inner HTML.
 *
 * @param {string | object} elementType - The type of element to create or an object describing the element.
 * @param {object} [properties] - An object containing properties to set on the element.
 * @param {string} [innerHTML] - The inner HTML content to set for the element.
 * @returns {HTMLElement} The newly created DOM element.
 */
function domCreate (
  elementType: string | MapLike,
  properties: object,
  innerHTML: string): HTMLElement {
  if (arguments.length === 1 && typeof elementType === "object") {
    let obj = elementType;
    elementType = obj.elementType;
    properties = {};
    for (let key in obj) {
      // @ts-ignore
      if (key !== "elementType") { properties[key] = obj[key]; }
    }
  }
  let element: HTMLElement = document.createElement(elementType as string);
  if (properties) {
    for (let key in properties) {
      // @ts-ignore
      if (key !== "style" || typeof properties[key] === "string") {
        // @ts-ignore
        element[key] = properties[key];
      } else {
        // @ts-ignore
        Object.assign(element.style, properties[key]);
      }
    }
  }
  if (innerHTML) { element.innerHTML = innerHTML; }
  return element;
}


/**
 * @description Converts an HTML string to a DOM element.
 *
 * @param {string} str - The HTML string to convert.
 * @returns {Element | null} The resulting DOM element, or null if conversion fails.
 */
function domToElement (str: string): Element | null {
  let element: HTMLElement = document.createElement("div");
  element.innerHTML = str;
  return element.firstElementChild;
}


/**
 * @description Gets the computed CSS property value of a DOM element.
 *
 * @param {Element} element - The DOM element to retrieve the CSS property from.
 * @param {string | number} [property] - The CSS property name to retrieve. If omitted, returns the full CSSStyleDeclaration.
 * @returns {string | CSSStyleDeclaration} The computed CSS property value or the full CSSStyleDeclaration.
 */
const domGetCSS = (element: Element, property: string | number): string | CSSStyleDeclaration =>
  // @ts-ignore
  (property ? globalThis.getComputedStyle(element, null)[property] :
    globalThis.getComputedStyle(element, null));


/* domSetCSS(element, property: string, value: string): undefined */
/* domSetCSS(element, properties: object): undefined */
/**
 * @description Sets CSS property values on a DOM element.
 *
 * @param {HTMLElement} element - The DOM element to set the CSS properties on.
 * @param {string | object} property - The CSS property name to set or an object containing multiple properties and their values.
 * @param {string} [value] - The value to set for the specified CSS property (if `property` is a string).
 * @returns {void}
 */
function domSetCSS (
  element: HTMLElement,
  property: string | object,
  value: string): void {
  if (typeof property === "string") {
    // @ts-ignore
    element.style[property] = value;
  } else if (typeof property === "object") {
    Object.keys(property).forEach((key: string): void =>
      // @ts-ignore
      element.style[key] = property[key]
    );
  }
}


/**
 * @description Fades in a DOM element over a specified duration.
 *
 * @param {HTMLElement} element - The DOM element to fade in.
 * @param {number} [duration=500] - The duration of the fade-in effect in milliseconds.
 * @param {string} [display=""] - The CSS display value to set when the element is shown.
 * @returns {void}
 */
function domFadeIn (
  element: HTMLElement,
  duration: number,
  display: string): void {
  let s = element.style;
  let step: number = 25/(duration || 500);
  s.opacity = (s.opacity ?? 0);
  s.display = (display || "");
  (function fade () {
    // @ts-ignore
    (s.opacity=parseFloat(s.opacity)+step)>1 ? s.opacity=1 :setTimeout(fade,25);
  })();
}


/**
 * @description Fades out a DOM element over a specified duration.
 *
 * @param {HTMLElement} element - The DOM element to fade out.
 * @param {number} [duration=500] - The duration of the fade-out effect in milliseconds.
 * @returns {void}
 */
function domFadeOut (
  element: HTMLElement, duration: number): void {
  let style = element.style;
  let step: number = 25/(duration || 500);
  // @ts-ignore
  style.opacity = (style.opacity || 1);
  (function fade () {
     // @ts-ignore
    (style.opacity -= step) < 0 ? style.display = "none" : setTimeout(fade, 25);
  })();
}


/**
 * @description Toggles the fade in/out effect of a DOM element over a specified duration.
 *
 * @param {HTMLElement} element - The DOM element to toggle fade effect on.
 * @param {number} [duration=500] - The duration of the fade effect in milliseconds.
 * @param {string} [display=""] - The CSS display value to set when the element is shown.
 * @returns {void}
 */
function domFadeToggle (
  element: HTMLElement, duration: number, display: string = ""): void {
  if (globalThis.getComputedStyle(element, null).display === "none") {
    /* same as domFadeIn(); */
    let style = element.style;
    let step: number = 25/(duration || 500);
    style.opacity = (style.opacity ?? 0);
    style.display = (display || "");
    (function fade () {
      // @ts-ignore
      (style.opacity = parseFloat(style.opacity) + step) > 1 ? style.opacity = 1 :
        setTimeout(fade, 25);
    })();
  } else {
    /* same as domFadeOut(); */
    let style = element.style;
    let step: number = 25/(duration || 500);
    style.opacity = (style.opacity ?? 1);
    (function fade () {
      // @ts-ignore
      (style.opacity -= step) < 0 ? style.display = "none" : setTimeout(fade, 25);
    })();
  }
}


/**
 * @description Hides a DOM element by setting its display style to "none".
 *
 * @param {HTMLElement} element - The DOM element to hide.
 * @returns {void}
 */
const domHide = (element: HTMLElement): any => element.style.display = "none";


/**
 * @description Shows a DOM element by setting its display style.
 *
 * @param {HTMLElement} element - The DOM element to show.
 * @param {string} [display=""] - The CSS display value to set when showing the element.
 * @returns {void}
 */
const domShow = (element: HTMLElement, display: string = ""): any =>
  element.style.display = display;


/**
 * @description Toggles the visibility of a DOM element by changing its display style.
 *
 * @param {HTMLElement} element - The DOM element to toggle.
 * @param {string} [display=""] - The CSS display value to set when showing the element.
 * @returns {void}
 */
function domToggle (element: HTMLElement, display: string = ""): void {
  if (globalThis.getComputedStyle(element, null).display === "none") {
    element.style.display = display;
  } else {
    element.style.display = "none";
  }
}


/**
 * @description Checks if a DOM element is hidden (i.e., has display style set to "none").
 *
 * @param {Element} element - The DOM element to check.
 * @returns {boolean} True if the element is hidden, false otherwise.
 */
const domIsHidden = (element: Element): boolean =>
  (globalThis.getComputedStyle(element,null).display === "none");


/**
 * @description Retrieves all sibling elements of a given DOM element.
 *
 * @param {Element} element - The DOM element whose siblings are to be retrieved.
 * @returns {Element[]} An array of sibling elements.
 */
const domSiblings = (element: Element): Element[] =>
  // @ts-ignore
  Array.prototype.filter.call(element.parentNode.children,
    (item: Element): boolean => (item !== element)
  );


/**
 * @description Retrieves all sibling elements before a given DOM element.
 *
 * @param {Element} element - The DOM element whose previous siblings are to be retrieved.
 * @returns {Element[]} An array of previous sibling elements.
 */
const domSiblingsPrev = (element: Element): Element[] =>
  Array.prototype.slice.call(
    // @ts-ignore
    element.parentNode.children,
    0,
    // @ts-ignore
    Array.prototype.indexOf.call(element.parentNode.children, element)
  );


/**
 * @description Retrieves all sibling elements to the left of a given DOM element.
 *
 * @param {Element} element - The DOM element whose left siblings are to be retrieved.
 * @returns {Element[]} An array of left sibling elements.
 */
const domSiblingsLeft = (element: Element): Element[] =>
  Array.prototype.slice.call(
    // @ts-ignore
    element.parentNode.children,
    0,
    // @ts-ignore
    Array.prototype.indexOf.call(element.parentNode.children, element)
  );


/**
 * @description Retrieves all sibling elements after a given DOM element.
 *
 * @param {Element} element - The DOM element whose next siblings are to be retrieved.
 * @returns {Element[]} An array of next sibling elements.
 */
const domSiblingsNext = (element: Element): Element[] =>
  Array.prototype.slice.call(
    // @ts-ignore
    element.parentNode.children,
    // @ts-ignore
    Array.prototype.indexOf.call(element.parentNode.children, element) + 1,
    // @ts-ignore
    element.parentNode.children.length
  );


/**
 * @description Retrieves all sibling elements to the right of a given DOM element.
 *
 * @param {Element} element - The DOM element whose right siblings are to be retrieved.
 * @returns {Element[]} An array of right sibling elements.
 */
const domSiblingsRight = (element: HTMLElement): Element[] =>
  Array.prototype.slice.call(
    // @ts-ignore
    element.parentNode.children,
    // @ts-ignore
    Array.prototype.indexOf.call(element.parentNode.children, element) + 1,
    // @ts-ignore
    element.parentNode.children.length
  );


/**
 * @description Dynamically imports one or more JavaScript files into the document.
 *
 * @param {string[]} scripts - The URLs of the JavaScript files to import.
 * @returns {void}
 */
function importScript (...scripts: string[]): void {
  for (let item of scripts) {
    let element: HTMLScriptElement = document.createElement("script");
    element.type = "text\/javascript";
    element.src = item;
    // @ts-ignore
    element.onerror = function (error: Error): void {
      throw new URIError(
        // @ts-ignore
        "Loading failed for the script with source " + error.target.src
      );
    };
    (document.head||document.getElementsByTagName("head")[0])
      .appendChild(element);
  }
}


/**
 * @description Dynamically imports one or more CSS stylesheets into the document.
 *
 * @param {string[]} styles - The URLs of the CSS stylesheets to import.
 * @returns {void}
 */
function importStyle (...styles: string[]): void {
  for (let item of styles) {
    let element: HTMLLinkElement = document.createElement("link");
    element.rel = "stylesheet";
    element.type = "text\/css";
    element.href = item;
    element.onerror = function (error) {
      throw new URIError(
        // @ts-ignore
        "Loading failed for the style with source " + error.target.href
      );
    };
    (document.head ||document.getElementsByTagName("head")[0])
      .appendChild(element);
  }
}


/**
 * @description Converts a form element into an array of key-value pairs.
 *
 * @param {HTMLFormElement} form - The form element to convert.
 * @returns {object[]} An array of objects representing the form data.
 */
function form2array (form: HTMLFormElement): object[] {
  let field: any;
  let result = Array<object>();
  if (typeof form === "object" && form.nodeName.toLowerCase() === "form") {
    for (let i = 0, len = form.elements.length; i < len; i++) {
      field = form.elements[i];
      if (field.name && !field.disabled
        && field.type !== "file"
        && field.type !== "reset"
        && field.type !== "submit"
        && field.type !== "button") {
        if (field.type === "select-multiple") {
          // @ts-ignore
          for (let j = 0, l = form.elements[i].options.length; j < l; j++) {
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


/**
 * @description Converts a form element into a URL-encoded query string.
 *
 * @param {HTMLFormElement} form - The form element to convert.
 * @returns {string} A URL-encoded query string representing the form data.
 */
function form2string (form: HTMLFormElement): string {
  let field: any;
  let result: string[] = [];
  if (typeof form === "object" && form.nodeName.toLowerCase() === "form") {
    for (let i = 0, len = form.elements.length; i < len; i++) {
      field = form.elements[i];
      if (field.name && !field.disabled
        && field.type !== "file"
        && field.type !== "reset"
        && field.type !== "submit"
        && field.type !== "button") {
        if (field.type === "select-multiple") {
          // @ts-ignore
          for (let j = 0, l = form.elements[i].options.length; j < l; j++) {
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


/**
 * @description Checks if the Do Not Track setting is enabled in the browser.
 *
 * @returns {boolean} True if Do Not Track is enabled, false otherwise.
 */
const getDoNotTrack = (): boolean =>
   // @ts-ignore
  [navigator.doNotTrack, globalThis.doNotTrack, navigator.msDoNotTrack]
    .some((item: any): boolean => item === true || item === 1 || item === "1");


/**
 * @description Retrieves the current geographical location of the user.
 *
 * @param {Function} successFn - The callback function to execute on successful retrieval of location.
 * @param {Function} [errorFn] - The callback function to execute on error.
 * @returns {void}
 */
function getLocation (
  successFn: Function,
  errorFn: Function): void {
  if (!errorFn) { errorFn = function () {}; }
  function getE (error: any) {
    errorFn("ERROR(" + error.code + "): " + error.message);
  }
  if (navigator.geolocation) {
     // @ts-ignore
    navigator.geolocation.getCurrentPosition(successFn, getE);
  } else {
    getE("Geolocation is not supported in this browser.");
  }
}


/**
 * @description Creates and triggers a download of a file with specified content and data type.
 *
 * @param {string} filename - The name of the file to be created.
 * @param {string} content - The content to be included in the file.
 * @param {string} [dataType="text/plain"] - The MIME type of the file content.
 * @returns {void}
 */
function createFile (
  filename: string,
  content: string,
  dataType: string): void {
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


/**
 * @description Retrieves the current fullscreen element, if any.
 *
 * @returns {Document | HTMLElement | undefined} The fullscreen element or undefined if not in fullscreen mode.
 */
const getFullscreen = (): Document | HTMLElement | undefined => (
  document.fullscreenElement
   // @ts-ignore
  || document.mozFullScreenElement
   // @ts-ignore
  || document.webkitFullscreenElement
   // @ts-ignore
  || document.msFullscreenElement
  || undefined
);


/**
 * @description Sets the specified element to fullscreen mode.
 *
 * @param {HTMLElement | string} element - The DOM element or CSS selector of the element to set to fullscreen.
 * @returns {void}
 */
function setFullscreenOn (element: HTMLElement | string): void {
  let elem: HTMLElement | null;
  if (typeof element === "string") { elem = document.querySelector(element); }
    else if (typeof element === "object") { elem = element; }
  // @ts-ignore
  if (elem.requestFullscreen) { elem.requestFullscreen(); }
    // @ts-ignore
    else if (elem.mozRequestFullScreen) { elem.mozRequestFullScreen(); }
    // @ts-ignore
    else if (elem.webkitRequestFullscreen) { elem.webkitRequestFullscreen(); }
    // @ts-ignore
    else if (elem.msRequestFullscreen) { elem.msRequestFullscreen(); }
}


/**
 * @description Exits fullscreen mode.
 *
 * @returns {void}
 */
function setFullscreenOff (): void {
  if (document.exitFullscreen) { document.exitFullscreen(); }
   // @ts-ignore
    else if (document.mozCancelFullScreen) { document.mozCancelFullScreen(); }
    // @ts-ignore
    else if (document.webkitExitFullscreen) { document.webkitExitFullscreen(); }
    // @ts-ignore
    else if (document.msExitFullscreen) { document.msExitFullscreen(); }
}


/**
 * @description Gets the value of a CSS variable from the root element.
 *
 * @param {string} name - The name of the CSS variable to retrieve.
 * @returns {string} The value of the CSS variable.
 */
const domGetCSSVar = (name: string): string =>
  getComputedStyle(document.documentElement)
    .getPropertyValue( name[0] === "-" ? name : "--" + name );


/**
 * @description Sets the value of a CSS variable on the root element.
 *
 * @param {string} name - The name of the CSS variable to set.
 * @param {string | null} value - The value to set for the CSS variable.
 * @returns {void}
 */
const domSetCSSVar = (name: string, value: string | null): void =>
  document.documentElement.style.setProperty(
    (name[0] === "-" ? name : "--" + name),
    value
  );


/**
 * @description Scrolls the document to the top.
 *
 * @returns {void}
 */
const domScrollToTop = (): void => globalThis.scrollTo(0,0);


/**
 * @description Scrolls the document to the bottom.
 *
 * @returns {void}
 */
const domScrollToBottom = (): void =>
  globalThis.scrollTo(0, document.body.scrollHeight);


/**
 * @description Scrolls the document to bring a specified element into view.
 *
 * @param {Element} element - The DOM element to scroll to.
 * @param {boolean} [top=true] - If true, aligns the element to the top of the viewport; if false, aligns it to the bottom.
 * @returns {void}
 */
const domScrollToElement = (element: Element, top: boolean = true): void =>
  element.scrollIntoView(top);


/**
 * @description Removes all child elements from a given DOM element.
 *
 * @param {Element} element - The DOM element to clear.
 * @returns {void}
 */
// @ts-ignore
const domClear = (element: Element): void =>
  Array.from(element.children).forEach((item: Element): void => item.remove());


/** Type API **/


/**
 * @description Checks if the given value is NonNullable (not null or undefined).
 *
 * @param {unknown} value - The value to check.
 * @returns True if the value is a NonNullable, false otherwise.
 */
const isNonNullable = (value: unknown): value is NonNullable<unknown> =>
  value != null;


/**
 * @description Checks if the given value is NonNullablePrimitive.
 *
 * @param {unknown} value - The value to check.
 * @returns True if the value is a NonNullable, false otherwise.
 */
const isNonNullablePrimitive =
  (value: unknown): value is NonNullablePrimitive =>
    value != null && typeof value !== "object" && typeof value !== "function";


/**
 * @description Checks if all items in an iterable or iterator match the expected type(s) or constructor(s).
 *
 * @param {Iterable<any> | Iterator<any>} iter - The iterable or iterator to check.
 * @param {string | Function | Array<string | Function>} expectedType - The expected type(s) or constructor(s) for the items.
 * @param {boolean} [Throw=false] - If true, throws a TypeError on mismatch; otherwise returns false.
 * @returns {boolean} True if all items match the expected type(s) or constructor(s), false otherwise.
 * @throws {TypeError} If `iter` is not iterable or iterator, or if `expectedType` is invalid, or if a mismatch occurs and `Throw` is true.
 */
function isTypedCollection (
  iter: IterableLike,
  expectedType: string | Function | Array<string | Function>,
  Throw: boolean = false): boolean {
  /* helper functions */
  const _typeOf = (value: any): string =>
    value === null ? "null" : typeof value;
  const _isIterator = (value: any): boolean =>
    value != null && typeof value === "object"
      && typeof value.next === "function";
  const _isIterable = (value: any): boolean =>
    value != null && typeof value[Symbol.iterator] === "function";
  /* Validate `iter` */
  if (!_isIterator(iter) && !_isIterable(iter)) {
    throw new TypeError(
      `[isTypedCollection] TypeError: iter must be iterable or iterator. Got ${_typeOf(iter)}`
    );
  }
  /* Validate `expected` */
  if (!(["string", "function"].includes(typeof expectedType))
    && !Array.isArray(expectedType)) {
    throw new TypeError(
      `[isTypedCollection] TypeError: expectedType must be string, function, array. Got ${_typeOf(expectedType)}`
    );
  }
  /* Validate `Throw` */
  if (typeof Throw !== "boolean") {
    throw new TypeError(
      `[isTypedCollection] TypeError: Throw has to be a boolean. Got ${typeof Throw}`
    );
  }
  /* Normalize expected to an array */
  let expectedArray: any[] =
    Array.isArray(expectedType) ? expectedType : [expectedType];
  /* Check values of iter against expected types or constructors */
  let matched: boolean = true;
  for (let value of iter as Iterable<any>) {
    const valueType: string = _typeOf(value);
    matched = expectedArray.some(
      function (item: string | Function): boolean {
        if (typeof item === "string") { return valueType === item; }
        if (typeof item === "function") {
          return value != null && value instanceof item;
        }
        /* validate expected array elements */
        throw new TypeError(
          `[isTypedCollection] TypeError: expectedType array elements have to be a string or function. Got ${typeof item}`
        );
      }
    );
    if (!matched) { break; }
  }
  /* Throw error if mismatch and `Throw` is true */
  if (Throw && !matched) {
    let eNames: string = expectedArray.map((item: any): string =>
      (typeof item === "string" ? item.toString() : item.name ?? "anonymous")
    ).join(", ");
    throw new TypeError(
      `[isTypedCollection] TypeError: one or more items are not ${eNames}`
    );
  }
  return matched;
}


/**
 * @description Checks if a value matches the expected type(s) or constructor(s).
 *
 * @param {any} value - The value to check.
 * @param {string | Function | Array<string | Function> | undefined} expectedType - The expected type(s) or constructor(s).
 * @param {boolan} Throw
 * @returns {string | Function | boolean}
 */
function is (
  value: any,
  expectedType?: string | Function | Array<string | Function> | undefined,
  Throw: boolean = false): string | Function | boolean {
  /* Validate `expected` */
  if (!(["string", "function", "undefined"].includes(typeof expectedType))
    && !Array.isArray(expectedType)) {
    throw new TypeError(
      `[is] TypeError: expectedType must be string, function, array or undefined. Got ${typeof expectedType}`
    );
  }
  /* Validate `Throw` */
  if (typeof Throw !== "boolean") {
    throw new TypeError(
      `[is] TypeError: Throw has to be a boolean. Got ${typeof Throw}`
    );
  }
  /* Determine the type of `value` */
  const vType: string = (value === null ? "null" : typeof value);
  /* If no expected type provided, return type or constructor */
  if (expectedType == null) {
    return vType === "object"
      ? Object.getPrototypeOf(value)?.constructor ?? "object"
      : vType;
  }
  /* Normalize expected to an array */
  let expectedArray: Array<string | Function> =
    Array.isArray(expectedType) ? expectedType : [expectedType];
  /* Check against expected types or constructors */
  let matched: boolean = expectedArray.some(
    function (item: string | Function) {
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
    let vName: string =
      value.toString ? value.toString() : Object.prototype.toString.call(value);
    let eNames: string = expectedArray.map((item: any): string =>
      (typeof item === "string" ? item.toString() : item.name ?? "anonymous")
    ).join(", ");
    throw new TypeError(`[is] TypeError: ${vName} is not a ${eNames}`);
  }
  return matched;
}


/**
 * @description Converts a given value to an object, symbol, or function.
 *
 * @param {unknown} value - The value to convert.
 * @returns {Object | symbol | Function} The converted object, symbol, or function.
 * @throws {TypeError} If the value is null or undefined.
 */
function toObject (value: unknown): Object | symbol | Function {
  if (value == null) {
    throw new TypeError("[toObject] error: " + value);
  }
  return (["object", "function"].includes(typeof value))
    ? value
    : Object(value);
}


/* toPrimitiveValue(value: unknown): primitive | object | symbol | Function */
/**
 * @description Converts wrapper objects to their corresponding primitive values.
 *
 * @param {unknown} value - The value to convert.
 * @returns {any} The primitive value or the original object if not a wrapper.
 */
function toPrimitiveValue (value: unknown): any {
  if (value == null || typeof value !== "object") { return value; }
  const vType = Object.prototype.toString.call(value).slice(8, -1);
  if (["Boolean", "BigInt", "Number", "String", "Symbol"].includes(vType)) {
    return value.valueOf();
  }
  return value;
}


/**
 * @description This function is a general purpose, type safe, predictable stringifier. Converts a value into a human-readable string for error messages Handles symbols, functions, nullish, circular references, etc.
 *
 * @param {unknown} value The value to inspect.
 * @returns {string}
 */
function toSafeString (value: unknown): string {
  const seen = new WeakSet<object>();
  function replacer (_key: string, value: unknown): any {
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
  }
  if (["undefined", "null", "string", "number", "boolean", "bigint"]
    .includes(value === null ? "null" : typeof value)) {
    return String(value);
  }
  if (Array.isArray(value)) {
    return `[${value.map(v => toSafeString(v)).join(", ")}]`;
  }
  if (value instanceof Map) {
    return `Map(${value.size}){${Array.from(value.entries()).map(([k, v]): string => `${toSafeString(k)} => ${toSafeString(v)}`).join(", ")}}`;
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


/**
 * @description Checks if a value is a valid property key (string or symbol).
 *
 * @param {unknown} value - The value to check.
 * @returns {boolean} True if the value is a valid property key, otherwise false.
 */
const isPropertyKey = (value: unknown): value is PropertyKey =>
  typeof value === "string" || typeof value === "symbol";


/**
 * @description Converts a value to a property key (string or symbol).
 *
 * @param {unknown} value - The value to convert.
 * @returns {string | symbol} The converted property key.
 */
const toPropertyKey = (value: unknown): PropertyKey =>
  typeof value === "symbol" ? value : String(value);


/**
 * Checks if a value is a valid array index (integer between 0 and Number.MAX_SAFE_INTEGER).
 *
 * @param value - The value to check.
 * @returns True if the value is a valid array index, otherwise false.
 */
const isIndex = (value: unknown): value is number =>
  Number.isSafeInteger(value)
    && (value as number) >= 0
    && (value as number) <= Number.MAX_SAFE_INTEGER
    && 1 / (value as number) !== 1 / -0;


/**
 * Checks if a value is a valid array index (integer between 0 and Number.MAX_SAFE_INTEGER).
 *
 * @param value - The value to check.
 * @returns True if the value is a valid array index, otherwise false.
 */
const isLength = (value: unknown): value is number =>
  Number.isSafeInteger(value)
    && (value as number) >= 0
    && (value as number) <= Number.MAX_SAFE_INTEGER
    && 1 / (value as number) !== 1 / -0;


/**
 * @description Converts a value to a valid array index (unsigned integer).
 *
 * @param {unknown} value - The value to convert.
 * @returns {number} The converted unsigned integer index.
 */
function toIndex (value: any): number {
  value = ((value = Math.trunc(+value)) !== value || value === 0) ? 0 : value;
  if (value < 0 || value > (Math.pow(2, 53) - 1)) {
    throw new RangeError("toIndex(); RangeError: " + value);
  }
  return value;
}


/**
 * @description Converts a value to a valid length (unsigned integer).
 *
 * @param {unknown} value - The value to convert.
 * @returns {number} The converted unsigned integer length.
 */
function toLength (value: any): number {
  value = ((value = Math.trunc(+value)) !== value || value === 0) ? 0 : value;
  return Math.min(Math.max(value, 0), Math.pow(2, 53) - 1);
}


/**
 * Extended typeof operator with "null" type as string.
 *
 * @param {unknown} value
 * @returns string
 */
const typeOf = (value: unknown): TypeOfTag =>
  value === null ? "null" : typeof value;


/**
 * @description Checks if two values are of the same type.
 *
 * @param {any} value1 - The first value to compare.
 * @param {any} value2 - The second value to compare.
 * @returns {boolean} True if both values are of the same type, false otherwise.
 */
const isSameType = (value1: any, value2: any): boolean =>
  (value1 == null || value2 == null)
    ? (value1 === value2)
    : (typeof value1 === typeof value2);


/**
 * @description Checks if two values are instances of the same constructor.
 *
 * @param {any} value1 - The first value to check.
 * @param {any} value2 - The second value to check.
 * @param {Function} Contructor - The constructor function to check against.
 */
const isSameInstance = (value1: any, value2: any, Contructor: Function): boolean =>
  value1 instanceof Contructor && value2 instanceof Contructor;


/* type CoercedObjects = String | Number | BigInt | Boolean | Symbol; */
/**
 * @description Checks if a value is an coerced object (Number, String, etc.).
 *
 * @param {unknown} value The value to check.
 * @returns False if the value is not a coerced object, otherwise the constructor function.
 */
function isCoercedObject (value: unknown): Function | boolean {
  if (value != null && typeof value === "object") {
    if (value instanceof Number) { return Number; }
    if (value instanceof String) { return String; }
    if (value instanceof Boolean) { return Boolean; }
    if (value instanceof BigInt) { return BigInt; }
    if (typeof value.valueOf?.() === "symbol") { return Symbol; }
  }
  return false;
}


/**
 * @description Performs a deep strict equality check between two values.
 *
 * @param {any} value1 - The first value to compare.
 * @param {any} value2 - The second value to compare.
 * @returns {boolean} True if the values are deeply strictly equal, false otherwise.
 */
function isDeepStrictEqual (value1: any, value2: any): boolean {
  /* helper functions */
  const _deepType = (value: any): string =>
    (value === null) ? "null" : (value !== value) ? "NaN" : (typeof value);
  const _isPrimitive = (value: any): boolean =>
    value == null
      || (typeof value !== "object" && typeof value !== "function");
  const _isObject = (value: any): boolean =>
    value != null && typeof value === "object";
  const _isSameInstance = (value1: any, value2: any, Class: Function): boolean =>
    value1 instanceof Class && value2 instanceof Class;
  const _classof = (value: any): string =>
    Object.prototype.toString.call(value).slice(8, -1).toLowerCase();
    const _ownKeys = (value: object): any[] =>
      [...Object.getOwnPropertyNames(value),
        ...Object.getOwnPropertySymbols(value)];
  /* strict equality helper function */
  const _isEqual = (value1: any, value2: any): boolean =>
    Object.is(value1, value2);
  /* primitives: Boolean, Number, BigInt, String + Function + Symbol */
  if (_isEqual(value1, value2)) { return true; }
  /* Object Wrappers (Boolean, Number, BigInt, String) */
  if (_isObject(value1)
    && _isPrimitive(value2)
    && _classof(value1) === typeof value2) {
    return _isEqual(value1.valueOf(), value2);
  }
  if (_isPrimitive(value1)
    && _isObject(value2)
    && typeof value1 === _classof(value2)) {
    return _isEqual(value1, value2.valueOf());
  }
  /* type (primitives, object, null, NaN) */
  if (_deepType(value1) !== _deepType(value2)) { return false; }
  /* objects */
  if (_isObject(value1) && _isObject(value2)) {
    /* objects / same memory adress */
    if (_isEqual(value1, value2)) { return true; }
    /* objects / not same constructor */
    if (Object.getPrototypeOf(value1).constructor !==
      Object.getPrototypeOf(value2).constructor
    ) {
      return false;
    }
    /* objects / WeakMap + WeakSet */
    if (_isSameInstance(value1, value2, WeakMap)
      || _isSameInstance(value1, value2, WeakSet)) {
      return _isEqual(value1, value2);
    }
    /* objects / Wrapper objects: Number, Boolean, String, BigInt */
    if (_isSameInstance(value1, value2, Number)
      || _isSameInstance(value1, value2, Boolean)
      || _isSameInstance(value1, value2, String)
      || _isSameInstance(value1, value2, BigInt)
    ) {
      return _isEqual(value1.valueOf(), value2.valueOf());
    }
    /* objects / Array */
    if (Array.isArray(value1) && Array.isArray(value2)) {
      if (value1.length !== value2.length) { return false; }
      if (value1.length === 0) { return true; }
      return value1.every((value: unknown, index: any): boolean =>
        isDeepStrictEqual(value, value2[index])
      );
    }
    /* objects / TypedArrays */
    if ( _isSameInstance(value1, value2, Int8Array)
      || _isSameInstance(value1, value2, Uint8Array)
      || _isSameInstance(value1, value2, Uint8ClampedArray)
      || _isSameInstance(value1, value2, Int16Array)
      || _isSameInstance(value1, value2, Uint16Array)
      || _isSameInstance(value1, value2, Int32Array)
      || _isSameInstance(value1, value2, Uint32Array)
      || ("Float16Array" in globalThis ?
          _isSameInstance(value1, value2, Float16Array) : false
        )
      || _isSameInstance(value1, value2, Float32Array)
      || _isSameInstance(value1, value2, Float64Array)
      || _isSameInstance(value1, value2, BigInt64Array)
      || _isSameInstance(value1, value2, BigUint64Array)
    ) {
      if (value1.length !== value2.length) { return false; }
      if (value1.length === 0) { return true; }
      return value1.every(
        (value: unknown, index: any): boolean => _isEqual(value, value2[index])
      );
    }
    /* objects / ArrayBuffer */
    if (_isSameInstance(value1, value2, ArrayBuffer)) {
      if (value1.byteLength !== value2.byteLength) { return false; }
      if (value1.byteLength === 0) { return true; }
      let xTA = new Int8Array(value1), yTA = new Int8Array(value2);
      return xTA.every((value: unknown, index: any): boolean =>
        _isEqual(value, yTA[index]));
    }
    /* objects / DataView */
    if (_isSameInstance(value1, value2, DataView)) {
      if (value1.byteLength !== value2.byteLength) { return false; }
      if (value1.byteLength === 0) { return true; }
      for (let index = 0; index < value1.byteLength; index++) {
        if (!_isEqual(value1.getUint8(index), value2.getUint8(index))) {
          return false;
        }
      }
      return true;
    }
    /* objects / Map */
    if (_isSameInstance(value1, value2, Map)) {
      if (value1.size !== value2.size) { return false; }
      if (value1.size === 0) { return true; }
      return [...value1.keys()].every((value: unknown): boolean =>
        isDeepStrictEqual(value1.get(value), value2.get(value)));
    }
    /* objects / Set */
    if (_isSameInstance(value1, value2, Set)) {
      if (value1.size !== value2.size) { return false; }
      if (value1.size === 0) { return true; }
      return [...value1.keys()].every(
        (value: unknown): boolean => value2.has(value)
      );
    }
    /* objects / RegExp */
    if (_isSameInstance(value1, value2, RegExp)) {
      return _isEqual(value1.lastIndex, value2.lastIndex)
        && _isEqual(value1.flags, value2.flags)
        && _isEqual(value1.source, value2.source);
    }
    /* objects / Error */
    if (_isSameInstance(value1, value2, Error)) {
      return isDeepStrictEqual(
        Object.getOwnPropertyNames(value1)
          .reduce(
            (acc: any, k: any): object => { acc[k] = value1[k]; return acc; },
            {}
          ),
        Object.getOwnPropertyNames(value2)
          .reduce(
            (acc: any, k: any): object => { acc[k] = value2[k]; return acc; },
            {}
          )
      );
    }
    /* objects / Date */
    if (_isSameInstance(value1, value2, Date)) {
      return _isEqual(+value1, +value2);
    }
    /* objects / Proxy -> not detectable */
    /* objects / Objects */
      let value1Keys: any[] = _ownKeys(value1);
      let value2Keys: any[] = _ownKeys(value2);
    if (value1Keys.length !== value2Keys.length) { return false; }
    if (value1Keys.length === 0) { return true; }
    return value1Keys.every((key: any): boolean =>
      isDeepStrictEqual(value1[key], value2[key]));
  }
  /* default return false */
  return false;
}


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
function isEmptyValue (value: any): boolean {
  const _isObject = (value: unknown): value is object =>
    value != null && (typeof value === "object" || typeof value === "function");
  /**
   * Checks if a value is a TypedArray (Int8Array, etc.).
   *
   * @param {any} value The value to check.
   * @returns boolean
   */
  const _isTypedArray = (value: unknown): value is TypedArray =>
    ArrayBuffer.isView(value) && !(value instanceof DataView);
  /* Check undefined, null, NaN */
  if (value == null || Number.isNaN(value)) { return true; }
  /* Check Array, TypedArrays, string, String */
  if (Array.isArray(value)
    || _isTypedArray(value)
    || typeof value === "string"
    || value instanceof String) {
    return (value as any).length === 0;
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
      for (let _ of value) { return false; }
      return true;
    } catch { /* Not iterable */ }
  }
  /* Other objects - check own properties (including symbols) */
  if (_isObject(value)) {
    const keys: any[] = [
      ...Object.getOwnPropertyNames(value),
      ...Object.getOwnPropertySymbols(value)
    ];
    if (keys.length === 0) return true;
    /* Special case: object with single "length" property that is 0 */
    if (keys.length === 1
      && keys[0] === "length"
      && (value as { length?: unknown }).length === 0) {
      return true;
    }
  }
  /* Return default false */
  return false;
}


/**
 * @description Checks if the given value is a Proxy.
 *
 * @param {unknown} value - The value to check.
 * @returns True if the value is a Proxy, false otherwise.
 */
const isProxy = (value: any): boolean =>
  Boolean(value != null && value.__isProxy);


/**
 * @description Checks if the given value is an Async Generator Function.
 *
 * @param {unknown} value - The value to check.
 * @returns True if the value is an Async Generator Function, false otherwise.
 */
const isAsyncGeneratorFn = (value: unknown): boolean =>
  Object.getPrototypeOf(value).constructor ===
    Object.getPrototypeOf(async function*() {}).constructor;


/**
 * @description Checks if the given value is a plain object (i.e., created using {} or new Object()).
 *
 * @param {unknown} value - The value to check.
 * @returns True if the value is a plain object, false otherwise.
 */
const isPlainObject = (value: unknown): boolean =>
  value != null
    && typeof value === "object"
    && (Object.getPrototypeOf(value) === Object.prototype
      || Object.getPrototypeOf(value) === null);


/**
 * @description Checks if the given value is a single character string.
 *
 * @param {unknown} value - The value to check.
 * @returns True if the value is a single character string, false otherwise.
 */
const isChar = (value: unknown): boolean =>
  typeof value === "string" && (value.length === 1 || [...value].length === 1);


/**
 * @description Checks if the given value is numeric (number or bigint).
 *
 * @param {unknown} value - The value to check.
 * @returns True if the value is a numeric value, false otherwise.
 */
const isNumeric = (value: any): boolean =>
  ((typeof value === "number" || typeof value === "bigint") && value === value)
    ? true
    : (!isNaN(parseFloat(value)) && isFinite(value));


/**
 * @description Checks if the given value is an object.
 *
 * @param {unknown} value - The value to check.
 * @returns True if the value is a object, false otherwise.
 */
const isObject = (value: unknown): value is object =>
  value != null && (typeof value === "object" || typeof value === "function");


/**
 * @description Checks if the given value is a Function.
 *
 * @param {unknown} value - The value to check.
 * @returns True if the value is a function, false otherwise.
 */
const isFunction = (value: unknown): value is Function =>
  typeof value === "function";


/**
 * @description Checks if the give value is a callable object or function.
 *
 * @param {unknown} value - The value to check.
 * @returns True is the value is a callable object of function, false otherwise.
 */
const isCallable = (value: any): boolean =>
  (value != null && ["object", "function"].includes(typeof value))
    ? (typeof value.call === "function")
    : false;


/**
 * @description Checks if a value is an arraylike object.
 *
 * @param {unknown} value The value to check.
 * @returns boolean
 */
function isArraylike (value: unknown): value is ArrayLike<any> {
  if (value == null
    || (typeof value !== "object" && typeof value !== "string")) {
    return false;
  }
  const maybe = value as { length?: unknown };
  if (typeof maybe.length !== "number") { return false; }
  const len: number = maybe.length;
  return len >= 0 && Number.isFinite(len);
}


/**
 * @description Checks if the given value is null.
 *
 * @param {unknown} value - The value to check.
 * @returns True if the value is null, false otherwise.
 */
const isNull = (value: unknown): value is null => value === null;


/**
 * @description Checks if the given value is undefined.
 *
 * @param {unknown} value - The value to check.
 * @returns True If the value is undefined, false otherwise.
 */
const isUndefined = (value: unknown): value is undefined =>
  value === undefined;


/**
 * @description Checks if the given value is Nullish (null or undefined).
 * From MDN: The values null and undefined are nullish.
 *
 * @param {unknown} value - The value to check.
 * @returns True if the value is a Nullish, false otherwise.
 */
const isNullish = (value: unknown): value is Nullish => value == null;


/**
 * @description Checks if the given value is Primitive.
 *
 * @param {unknown} value - The value to check.
 * @returns True if the value is Primitive, false otherwise.
 */
const isPrimitive = (value: unknown): value is Primitive =>
  value == null || (typeof value !== "object" && typeof value !== "function");


/**
 * Tests whether a value is an Iterator.
 *
 * @param {unknown} value The value to check.
 * @returns {boolean} Return true if value is an Iterator, false if not.
 */
const isIterator = (value: unknown): value is Iterator<any> =>
  "Iterator" in globalThis
    ? value instanceof Iterator
    : (value != null && typeof value === "object"
        && typeof (value as any).next === "function");


/**
 * Tests whether a value is a RegExp.
 *
 * @param {unknown} value The value to check.
 * @returns {boolean} Return true if value is a RegExp, false if not.
 */
const isRegexp = (value: unknown): value is RegExp => value instanceof RegExp;


/**
 * Tests whether a value is a HTML element.
 *
 * @param {unknown} value The value to check.
 * @returns {boolean} Return true if value is a HTML element, false if not.
 */
const isElement = (value: any): boolean =>
  value != null && typeof value === "object" && value.nodeType === 1;


/**
 * Tests whether a value is an Iterable.
 *
 * @param {unknown} value The value to check.
 * @returns {boolean} Return true if value is an Iterable, false if not.
 */
const isIterable = (value: unknown): value is Iterable<any> =>
  value != null && typeof (value as any)[Symbol.iterator] === "function";


/**
 * Tests whether a value is an Async Iterable.
 *
 * @param {unknown} value The value to check.
 * @returns {boolean} Return true if value is an Async Iterable, false if not.
 */
const isAsyncIterable = (value: unknown): boolean =>
  value != null && typeof (value as any)[Symbol.asyncIterator] === "function";


/**
 * @description Checks if the given value is a TypedArray (Int8Array, etc.).
 *
 * @param {unknown} value - The value to check.
 * @returns True if the value is a TypedArray, false otherwise.
 */
const isTypedArray = (value: unknown): value is TypedArray =>
  ArrayBuffer.isView(value) && !(value instanceof DataView);


/**
 * @description Checks if the given value is a Generator Function.
 *
 * @param {unknown} value - The value to check.
 * @returns True if the value is a Generator Function, false otherwise.
 */
const isGeneratorFn = (value: unknown): boolean =>
  Object.getPrototypeOf(value).constructor ===
    Object.getPrototypeOf(function*(){}).constructor;


/**
 * @description Checks if the given value is an Async Function.
 *
 * @param {unknown} value - The value to check.
 * @returns True if the value is an Async Function, false otherwise.
 */
const isAsyncFn = (value: unknown): value is AsyncFunction =>
  Object.getPrototypeOf(value).constructor ===
    Object.getPrototypeOf(async function(){}).constructor;


/** Cookie API **/


/* setCookie(Options object): undefined */
/* setCookie(name: string, value: string [, hours = 8760 [, path = "/" [, domain
  [, secure [, SameSite = "Lax" [, HttpOnly]]]]]]): undefined */
/**
 * @description Set a cookie.
 *
 * @param {string | MapLike} name - The name of the cookie or an options object.
 * @param {string} value - The value of the cookie.
 * @param {number} [hours=8760] - The expiration time in hours (default is 1 year).
 * @param {string} [path="/"] - The path where the cookie is valid.
 * @param {string} [domain] - The domain where the cookie is valid.
 * @param {boolean} [secure] - Whether the cookie is only sent over secure connections.
 * @param {string} [SameSite="Lax"] - The SameSite attribute of the cookie.
 * @param {boolean} [HttpOnly] - Whether the cookie is inaccessible to JavaScript.
 * @returns {void}
 */
function setCookie (
  name: string | MapLike,
  value: string,
  hours: number = 8760,
  path: string = "/",
  domain: string,
  secure: boolean,
  SameSite: string = "Lax",
  HttpOnly: boolean): void {
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
  document.cookie = encodeURIComponent(name as string)
    + "=" + encodeURIComponent(value)
    + "; expires=" + expire.toUTCString()
    + "; path=" + path
    + (domain ? "; domain=" + domain : "")
    + (secure ? "; secure" : "")
    + (typeof SameSite==="string" && SameSite.length ?"; SameSite="+SameSite:"")
    + (HttpOnly ? "; HttpOnly" : "")
    + ";";
}


/* getCookie(): object | string | null */
/* getCookie([name: string]): object | string | null */
/**
 * @description Get a cookie by name or all cookies as an object.
 *
 * @param {string} [name] - The name of the cookie to retrieve.
 * @returns {object | string | null} An object with all cookies, the value of the specified cookie, or null if not found.
 */
function getCookie (name?: string | undefined):
  { [key: string]: string } | string | null {
  if (document.cookie.length !== 0) {
    let result: { [key: string]: string } = {};
    let array: string[] = document.cookie.split(";");
    for(let index = 0, length = array.length; index < length; index++) {
      let record = array[index].trim().split("=");
      result[decodeURIComponent(record[0])] = decodeURIComponent(record[1]);
    }
    return (name ? (result[name] ? result[name] : null) : result);
  }
  return (name ? null : {});
}


/**
 * @description Checks if a cookie with the given name exists.
 *
 * @param {string} name - The name of the cookie to check.
 * @returns {boolean} True if the cookie exists, false otherwise.
 */
const hasCookie = (name: string): boolean =>
  (document.cookie.includes(encodeURIComponent(name) + "="));


/* removeCookie(Options object);: boolean */
/* removeCookie(name: string [, path = "/"
  [, domain [, secure [, SameSite = "Lax" [, HttpOnly ]]]]]): boolean */
/**
 * @description Removes a cookie by name.
 *
 * @param {string | MapLike} name - The name of the cookie to remove or an options object.
 * @param {string} [path="/"] - The path where the cookie is valid.
 * @param {string} [domain] - The domain where the cookie is valid.
 * @param {boolean} [secure] - Whether the cookie is only sent over secure connections.
 * @param {string} [SameSite="Lax"] - The SameSite attribute of the cookie.
 * @param {boolean} [HttpOnly] - Whether the cookie is inaccessible to JavaScript.
 * @returns {boolean} True if the cookie existed and was removed, false otherwise.
 */
function removeCookie (
  name: string | MapLike,
  path: string = "/",
  domain: string,
  secure: boolean,
  SameSite: string = "Lax",
  HttpOnly: boolean): boolean {
  if (typeof name === "object") {
    let settings = name;
    name = settings.name;
    path = settings.path || "/";
    domain = settings.domain;
    secure = settings.secure;
    SameSite = settings.SameSite || "Lax";
    HttpOnly = settings.HttpOnly;
  }
  let result =
    (document.cookie.includes(encodeURIComponent(name as string) + "="));
  document.cookie = encodeURIComponent(name as string)
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
/**
 * @description Clears all cookies.
 *
 * @param {string | ClearCookiesOptions} [path="/"] - The path where the cookies are valid or an options object.
 * @param {string} [domain] - The domain where the cookies are valid.
 * @param {boolean} [secure] - Whether the cookies are only sent over secure connections.
 * @param {string} [SameSite="Lax"] - The SameSite attribute of the cookies.
 * @param {boolean} [HttpOnly] - Whether the cookies are inaccessible to JavaScript.
 * @returns {void}
 */
function clearCookies (
  path: string | ClearCookiesOptions = "/",
  domain?: string,
  secure?: boolean,
  SameSite: string | undefined = "Lax",
  HttpOnly?: boolean): void {
  if (typeof path === "object") {
    let settings = path;
    path = settings.path ?? "/";
    domain = settings.domain;
    secure = settings.secure;
    SameSite = settings.SameSite ?? "Lax";
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


/**
 * Returns an array wrapping the value, or the original array if already one.
 *
 * @param {any[]} args
 * @returns {any[]} An array wrapping the value, or the original array if already one.
 */
function castArray <T>(...args: [T] | []): T[] {
  if (!args.length) { return []; }
  const value = args[0];
  return Array.isArray(value) ? value : [value];
}


/**
 * @description Returns an array with truthy values (but keeps `0`) from the given Iterable or ArrayLike object.
 *
 * @param {IterableAndIteratorAndArrayLike} iter
 * @returns any[]
 */
const compact = (iter: IterableLikeAndArrayLike): any[] =>
  Array.from(iter as Iterable<any> | ArrayLike<any>).filter(
    (value: unknown): boolean => Boolean(value) || value === 0
  );


/**
 * @description Returns an array with unique values from the given Iterable.
 *
 * @param {IterableLike} iter - The iterable to process.
 * @param {string | Function} [resolver] - A property name or function to determine uniqueness.
 * @returns {any[] | void} An array with unique values, or void if no iterable is provided.
 */
function unique (
  iter: IterableLike,
  resolver?: string | Function | null | undefined): any[] | void {
  if (resolver == null) { return [...new Set(iter as Iterable<any>)]; }
  if (typeof resolver === "string") {
    return Array.from(iter as Iterable<any>).reduce(function (acc: any[], item: any) {
      if (acc.every((item2: any): boolean =>
        item2[resolver] !== item[resolver])) { acc.push(item); }
      return acc;
    }, []);
  }
  if (typeof resolver === "function") {
    let cache = new Map();
    for (let item of iter as Iterable<any>) {
      let key = resolver(item);
      if (!cache.has(key)) { cache.set(key, item); }
    }
    return [...cache.values()];
  }
}


/**
 * @description Counts the number of elements in an iterable that satisfy a given condition.
 *
 * @param {IterableLike} iter - The iterable to process.
 * @param {Function} fn - The callback function that tests each element.
 * @returns {number} The count of elements that satisfy the condition.
 */
function count (iter: IterableLike, fn: Function): number {
  let index: number = 0;
  let result: number = 0;
  for (let item of iter as Iterable<any>) {
    if (fn(item, index++)) { result++; }
  }
  return result;
}


/**
 * @description Creates a deep clone of an array, including nested arrays.
 *
 * @param {any[]} array - The array to clone.
 * @returns {any[]} A deep clone of the input array.
 */
function arrayDeepClone ([...array]): any[] {
  const _ADC = (value: unknown): any =>
    Array.isArray(value) ? Array.from(value, _ADC) : value;
  return _ADC(array);
}


/**
 * @description Returns all elements of an iterable except the last one.
 *
 * @param {IterableLike} iter - The iterable to process.
 * @returns {any[]} An array containing all elements except the last one.
 */
const initial = ([...array]): unknown[] => array.slice(0, -1);


/**
 * @description Returns a new array with the elements of the input iterable shuffled randomly.
 *
 * @param {IterableLike} iter - The iterable to shuffle.
 * @returns {any[]} A new array with the elements shuffled.
 */
function shuffle ([...array]): unknown[] {
  for (let index = array.length - 1; index > 0; index--) {
    let pos = Math.floor(Math.random() * (index + 1));
    [array[index], array[pos]] = [array[pos], array[index]];
  }
  return array;
}


/**
 * @description Splits an iterable into two arrays based on a predicate function.
 *
 * @param {IterableLike} iter - The iterable to partition.
 * @param {Function} fn - The predicate function to test each element.
 * @returns {any[][]} An array containing two arrays: the first with elements that satisfy the predicate, and the second with elements that do not.
 */
const partition = ([...array], fn: Function): any[] =>
   // @ts-ignore
  [array.filter(fn), array.filter((value, index, a): boolean => !(fn(value, index, a)))];


/**
 * @description Returns a new Set containing the union of all provided iterables.
 *
 * @param {...IterableLike} args - The iterables to unite.
 * @returns {Set<any>} A new Set containing the union of all provided iterables.
 */
const setUnion = (...args: any[]): Set<any> =>
  new Set(args.map(([...item]): any => item).flat());


/**
 * @description Returns a new Set containing the intersection of two Sets.
 *
 * @param {Set<any>} a - The first Set.
 * @param {Set<any>} b - The second Set.
 * @returns {Set<any>} A new Set containing the intersection of the two Sets.
 */
const setIntersection = ([...array], b: Set<any>): Set<any> =>
  new Set(array.filter((value: unknown): boolean => b.has(value)));


/**
 * @description Returns a new Set containing the difference of two Sets.
 *
 * @param {Set<any>} a - The first Set.
 * @param {Set<any>} b - The second Set.
 * @returns {Set<any>} A new Set containing the difference of the two Sets.
 */
const setDifference = ([...array], b: Set<any>): Set<any> =>
  new Set(array.filter((value: unknown): boolean => !(b.has(value))));


/**
 * @description Returns a new Set containing the symmetric difference of two Sets.
 *
 * @param {Set<any>} a - The first Set.
 * @param {Set<any>} b - The second Set.
 * @returns {Set<any>} A new Set containing the symmetric difference of the two Sets.
 */
const setSymmetricDifference = (array: Set<any>, b: Set<any>): Set<any> =>
  new Set(
    [...array].filter((value: unknown): boolean =>
      !(b.has(value))).concat([...b]
        .filter((value: unknown): boolean => !(array.has(value))))
  );


/**
 * @description Checks if one iterable is a superset of another.
 *
 * @param {IterableLike} superCollection - The potential superset iterable.
 * @param {IterableLike} subCollection - The potential subset iterable.
 * @returns {boolean} True if superCollection is a superset of subCollection, false otherwise.
 */
const isSuperset = ([...superSet], [...subSet]): boolean =>
  subSet.every((value: unknown): boolean => superSet.includes(value));


/**
 * @description Returns the minimum value from the provided arguments.
 *
 * @param {...any} args - The values to compare.
 * @returns {any} The minimum value among the provided arguments.
 */
const min = (...args: any[]): any =>
  args.reduce(
    (acc: any, value: any): any => (value < acc ? value : acc),
    args[0]
  );


/**
 * @description Returns the maximum value from the provided arguments.
 *
 * @param {...any} args - The values to compare.
 * @returns {any} The maximum value among the provided arguments.
 */
const max = (...args: any[]): any =>
  args.reduce((acc: any, value: any): any =>
    (value > acc ? value : acc),
    args[0]
  );


/**
 * @description Returns an array with the given value repeated n times.
 *
 * @param {unknown} value - The value to repeat.
 * @param {number} [num=100] - The number of times to repeat the value.
 */
const arrayRepeat = (value: unknown, num: number = 100): any[] =>
  Array(num).fill(value);


/**
 * @description Returns an array by cycling through the elements of the input iterable n times.
 *
 * @param {IterableLike} iter - The iterable to cycle through.
 * @param {number} [num=100] - The number of times to cycle through the iterable.
 * @returns {any[]} An array containing the cycled elements.
 */
const arrayCycle = ([...array], num: number = 100): any[] =>
  Array(num).fill(array).flat();


/**
 * @description Returns an array representing a range of numbers.
 *
 * @param {number} [start=0] - The starting number of the range.
 * @param {number} [end=99] - The ending number of the range.
 * @param {number} [step=1] - The step between each number in the range.
 * @returns {any[]} An array representing the range of numbers.
 */
const arrayRange = (
  start: number = 0,
  end: number = 99,
  step: number = 1): any[] =>
  Array.from(
    {length: (end - start) / step + 1},
    (_v, i: number): number => start + (i * step)
  );


/**
 * @description Merges multiple iterables into an array of tuples, where each tuple contains elements from the input iterables at the same index.
 *
 * @param {...IterableLike} args - The iterables to zip together.
 * @returns {any[][]} An array of tuples containing elements from the input iterables.
 */
function zip (...args: any[]): any[] {
  args = args.map((value: IterableLike): any =>
    Array.from(value as Iterable<any>));
  return Array.from({length: Math.min(...args.map(v => v.length))})
    .map((_, i: number): any[] => args.map(v => v[i]));
}


/**
 * @description Splits an array of tuples into multiple arrays, where each array contains elements from the input tuples at the same index.
 *
 * @param {IterableLike} iter - The iterable of tuples to unzip.
 * @returns {any[][]} An array of arrays containing elements from the input tuples.
 */
const unzip = ([...array]): any[] =>
  array.map((iter: IterableLike): any[] => Array.from(iter as Iterable<any>))
    .reduce((acc, value): any[] => {
      value.forEach((item, index): void => {
        if (!Array.isArray(acc[index])) { acc[index] = []; }
        acc[index].push(item);
      });
      return acc;
    }, []);


/**
 * @description Merges two iterables into an object, where elements from the first iterable are used as keys and elements from the second iterable are used as values.
 *
 * @param {IterableLike} array1 - The iterable to use as keys.
 * @param {IterableLike} array2 - The iterable to use as values.
 * @returns {object} An object containing key-value pairs from the input iterables.
 */
function zipObj ([...array1], [...array2]): MapLike {
  let result: MapLike = {};
  let length: number = Math.min(array1.length, array2.length);
  for (let index = 0; index < length; index++) {
    result[array1[index]] = array2[index];
  }
  return result;
}


/**
 * @description Adds a value to an array if it does not already exist in the array.
 *
 * @param {any[]} array - The array to add the value to.
 * @param {unknown} value - The value to add to the array.
 * @returns {boolean} True if the value was added, false if it already existed.
 */
const arrayAdd = (array: any[], value: unknown): boolean =>
  (!array.includes(value)) ? !!array.push(value) : false;


/**
 * @description Clears all elements from an array.
 *
 * @param {any[]} array - The array to clear.
 * @returns {any[]} The cleared array.
 */
function arrayClear (array: any[]): any[] {
  array.length = 0;
  return array;
}


/**
 * @description Removes a value from an array. If `all` is true, removes all occurrences of the value.
 *
 * @param {any[]} array - The array to remove the value from.
 * @param {unknown} value - The value to remove from the array.
 * @param {boolean} [all=false] - Whether to remove all occurrences of the value.
 */
function arrayRemove (
  array: any[],
  value: unknown,
  all: boolean = false): boolean {
  let found: boolean = array.indexOf(value) > -1;
  if (!all) {
    let pos = array.indexOf(value);
    if (pos > -1) { array.splice(pos, 1); }
  } else {
    let pos = -1;
    while ((pos = array.indexOf(value)) > -1) { array.splice(pos, 1); }
  }
  return found;
}


/**
 * @description Removes elements from an array that satisfy a given condition. If `all` is true, removes all occurrences that satisfy the condition.
 *
 * @param {any[]} array - The array to remove elements from.
 * @param {Function} fn - The callback function that tests each element.
 * @param {boolean} [all=false] - Whether to remove all occurrences that satisfy the condition.
 * @returns {boolean} True if any elements were removed, false otherwise.
 */
function arrayRemoveBy (
  array: any[],
  fn: Function,
  all: boolean = false): boolean {
  // @ts-ignore
  let found: boolean = array.findIndex(fn) > -1;
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


/**
 * @description Merges multiple arrays or values into the target array.
 *
 * @param {any[]} target - The array to merge into.
 * @param {...any} sources - The arrays or values to merge into the target array.
 * @returns {any[]} The merged array.
 */
function arrayMerge (target: any[], ...sources: any[]): any[] {
  target.push(... [].concat(...sources) );
  return target;
}


/**
 * @description Generates a sequence of numbers within a specified range.
 *
 * @param {number} [start=0] - The starting number of the range.
 * @param {number} [step=1] - The step between each number in the range.
 * @param {number} [end=Infinity] - The ending number of the range.
 * @yields {number} The next number in the range.
*/
function* iterRange (
  start: number = 0,
  step: number = 1,
  end: number = Infinity): Generator<number, void, unknown> {
  let index: number = start;
  while (index <= end) {
    yield index;
    index += step;
  }
}


/**
 * @description Cycles through the elements of the input iterable a specified number of times.
 *
 * @param {IterableLike} iter - The iterable to cycle through.
 * @param {number} [num=Infinity] - The number of times to cycle through the iterable.
 * @yields The next element in the cycled iterable.
 */
function* iterCycle ([...array], num: number = Infinity): IteratorReturn {
  let index: number = 0;
  while (index++ < num) { yield* array; }
}


/**
 * @description Repeats a given value a specified number of times.
 *
 * @param {unknown} value - The value to repeat.
 * @param {number} [num=Infinity] - The number of times to repeat the value.
 * @yields The next repeated value.
 */
function* iterRepeat (value: unknown, num: number = Infinity): IteratorReturn {
  let index: number = 0;
  while (index++ < num) { yield value; }
}


/**
 * Takes the elements from an iterable or iterator and returns a new iterator while the checking function returns true.
 *
 * @param iter - An iterable or iterator to take elements from.
 * @param fn - Number of elements to take (default: 1).
 * @yields The next element in the taken iterator.
 */
function* takeWhile <T>(iter: Iterable<T> | Iterator<T>, fn: Function): IterableIterator<T> {
  let iterator: Iterator<T>;
  // Normalize: if input is an iterator, use it directly; otherwise get an iterator
  if (typeof (iter as Iterator<T>).next === 'function') {
    iterator = iter as Iterator<T>;
  } else {
    iterator = (iter as Iterable<T>)[Symbol.iterator]();
  }
  /* Yield the elements */
  while (true) {
    const { value, done } = iterator.next();
    if (done || !fn(value)) { break; }
    yield value;
  }
}


/**
 * Take the elements from an iterable or iterator and returns a new iterator after the checking function returns false.
 *
 * @param iter - An iterable or iterator to take elements from.
 * @param fn - Number of elements to take (default: 1).
 * @yields The next element in the dropped iterator.
 */
function* dropWhile <T>(iter: Iterable<T> | Iterator<T>, fn: Function): IterableIterator<T> {
  let iterator: Iterator<T>;
  // Normalize: if input is an iterator, use it directly; otherwise get an iterator
  if (typeof (iter as Iterator<T>).next === 'function') {
    iterator = iter as Iterator<T>;
  } else {
    iterator = (iter as Iterable<T>)[Symbol.iterator]();
  }
  /* Yield the elements */
  let skip = true;
  while (true) {
    const { value, done } = iterator.next();
    if (done) { break; }
    if (skip) { skip = fn(value); }
    if (!skip) { yield value; }
  }
}


/**
 * Takes up to `num` elements from an iterable or iterator and returns a new iterator.
 *
 * @param iter - An iterable or iterator to take elements from.
 * @param num - Number of elements to take (default: 1).
 * @yields The next element in the taken iterator.
 */
function* take <T>(iter: Iterable<T> | Iterator<T>, num: number = 1): IterableIterator<T> {
  if (num <= 0) return;
  let iterator: Iterator<T>;
  // Normalize: if input is an iterator, use it directly; otherwise get an iterator
  if (typeof (iter as Iterator<T>).next === 'function') {
    iterator = iter as Iterator<T>;
  } else {
    iterator = (iter as Iterable<T>)[Symbol.iterator]();
  }
  for (let i = 0; i < num; i++) {
    const { value, done } = iterator.next();
    if (done) { break; }
    yield value;
  }
}


/**
 * Skips the first `num` elements from an iterable or iterator and yields the rest.
 *
 * @param iter - An iterable or iterator to drop elements from.
 * @param num - Number of elements to skip (default: 1).
 * @yields The next element in the dropped iterator.
 */
function* drop <T>(iter: Iterable<T> | Iterator<T>, num: number = 1): IterableIterator<T> {
  if (num <= 0) {
    /* If nothing to drop, just yield everything */
    yield* (typeof (iter as Iterator<T>).next === 'function'
      ? { [Symbol.iterator]: () => iter as Iterator<T> }
      : (iter as Iterable<T>));
    return;
  }
  let iterator: Iterator<T>;
  /* Normalize: if input is an iterator, use it directly; otherwise get an iterator */
  if (typeof (iter as Iterator<T>).next === 'function') {
    iterator = iter as Iterator<T>;
  } else {
    iterator = (iter as Iterable<T>)[Symbol.iterator]();
  }
  /* Drop the first `num` elements */
  for (let i = 0; i < num; i++) {
    const { done } = iterator.next();
    if (done) { return; }
  }
  /* Yield the rest */
  while (true) {
    const { value, done } = iterator.next();
    if (done) { break; }
    yield value;
  }
}


/**
 * @description Executes a provided function once for each element in an iterable.
 *
 * @param {IterableLike} iter - The iterable to iterate over.
 * @param {Function} fn - The function to call for each element.
 * @returns {void}
 */
function forEach (iter: IterableLike, fn: Function): void {
  let index: number = 0;
  for (let item of iter as Iterable<any>) { fn(item, index++); }
}


/**
 * @description Executes a provided function once for each element in an iterable, in reverse order.
 *
 * @param {IterableLike} iter - The iterable to iterate over.
 * @param {Function} fn - The function to call for each element.
 * @returns {void}
 */
function forEachRight ([...array], fn: Function): void {
  let index: number = array.length;
  while (index--) { fn(array[index], index); }
}


/**
 * @description Creates a new iterator with the results of calling a provided function on every element in the given iterable.
 *
 * @param {IterableLike} iter - The iterable to map over.
 * @param {Function} fn - The function to call for each element.
 * @returns {Iterator} A new iterator with the mapped values.
 */
function* map (iter: IterableLike, fn: Function): IteratorReturn {
  let index: number = 0;
  for (let item of iter as Iterable<any>) { yield fn(item, index++); }
}


/**
 * @description Creates a new iterator with all elements that pass the test implemented by the provided function.
 *
 * @param {IterableLike} iter - The iterable to filter.
 * @param {Function} fn - The function to test each element.
 * @returns {Iterator} A new iterator with the filtered values.
 */
function* filter (iter: IterableLike, fn: Function): IteratorReturn {
  let index: number = 0;
  for (let item of iter as Iterable<any>) {
    if (fn(item, index++)) { yield item; }
  }
}


/**
 * @description Creates a new iterator with all elements that do not pass the test implemented by the provided function.
 *
 * @param {IterableLike} iter - The iterable to reject from.
 * @param {Function} fn - The function to test each element.
 * @returns {Iterator} A new iterator with the rejected values.
 */
function* reject (iter: IterableLike, fn: Function): IteratorReturn {
  let index: number = 0;
  for (let item of iter as Iterable<any>) {
    if (!fn(item, index++)) { yield item; }
  }
}


/**
 * @description Yields elements from `begin` (inclusive) up to `end` (exclusive) from an iterable or iterator. Works similarly to Array.prototype.slice.
 *
 * @param iter - Iterable or iterator to slice.
 * @param begin - Start index (inclusive, default: 0).
 * @param end - End index (exclusive, default: Infinity).
 * @yields The elements from the specified slice of the input iterable or iterator.
 */
function* slice <T>(
  iter: Iterable<T> | Iterator<T>,
  begin: number = 0,
  end: number = Infinity
): IterableIterator<T> {
  if (begin < 0) { begin = 0; }
  if (end <= begin) { return; }
  let iterator: Iterator<T>;
  /* Normalize input: use iterator directly, or get one from iterable */
  if (typeof (iter as Iterator<T>).next === 'function') {
    iterator = iter as Iterator<T>;
  } else {
    iterator = (iter as Iterable<T>)[Symbol.iterator]();
  }
  let index = 0;
  while (true) {
    const { value, done } = iterator.next();
    if (done) { break };
    if (index >= begin && index <= end) { yield value; }
    if (index > end - 1) break;
    index++;
  }
}


/**
 * @description Yields all elements of an iterable or iterator except the first one. Similar to Array.prototype.slice(1).
 *
 * @param input - Iterable or iterator to process.
 * @yields The elements of the input iterable or iterator, excluding the first one.
 */
function* tail <T>(input: Iterable<T> | Iterator<T>): IterableIterator<T> {
  let iterator: Iterator<T>;
  /* Normalize: if input is already an iterator, use it directly */
  if (typeof (input as Iterator<T>).next === 'function') {
    iterator = input as Iterator<T>;
  } else {
    iterator = (input as Iterable<T>)[Symbol.iterator]();
  }
  /* Skip the first element */
  const first = iterator.next();
  if (first.done) { return; }
  /* Yield the rest */
  while (true) {
    const { value, done } = iterator.next();
    if (done) { break; }
    yield value;
  }
}


/**
 * @description Returns the element at a specific position from an iterable or iterator. If the position is out of range, returns undefined.
 *
 * @param iter - Iterable or iterator to extract from.
 * @param pos - Zero-based index of the desired element.
 * @returns The element at the specified position, or undefined if out of range.
 */
function item <T>(iter: Iterable<T> | Iterator<T>, pos: number): T | undefined {
  if (pos < 0) { return undefined; }
  let iterator: Iterator<T>;
  /* Normalize input: use iterator directly or create one from iterable */
  if (typeof (iter as Iterator<T>).next === "function") {
    iterator = iter as Iterator<T>;
  } else {
    iterator = (iter as Iterable<T>)[Symbol.iterator]();
  }
  let index = 0;
  while (true) {
    const { value, done } = iterator.next();
    if (done) { return undefined; }
    if (index === pos) { return value; }
    index++;
  }
}


/**
 * @description Returns the element at a specific position from an iterable or iterator. If the position is out of range, returns undefined.
 *
 * @param iter - Iterable or iterator to extract from.
 * @param pos - Zero-based index of the desired element.
 * @returns The element at the specified position, or undefined if out of range.
 */
function nth <T>(iter: Iterable<T> | Iterator<T>, pos: number): T | undefined {
  if (pos < 0) { return undefined; }
  let iterator: Iterator<T>;
  /* Normalize input: use iterator directly or create one from iterable */
  if (typeof (iter as Iterator<T>).next === "function") {
    iterator = iter as Iterator<T>;
  } else {
    iterator = (iter as Iterable<T>)[Symbol.iterator]();
  }
  let index = 0;
  while (true) {
    const { value, done } = iterator.next();
    if (done) { return undefined; }
    if (index === pos) { return value; }
    index++;
  }
}


/**
 * @description Return the size of the given value.
 *
 * @param {unknown} value - The value to check.
 * @returns {number} The size of the given value.
 */
function size (value: any): number {
  /* Check Array */
  if (Array.isArray(value)) { return value.length; }
  /* Check Map and Set */
  if (value instanceof Map || value instanceof Set) { return value.size; }
  /* Check ArrayBuffer and DataView */
  if (value instanceof ArrayBuffer || value instanceof DataView) {
    return value.byteLength;
  }
  /* Other objects with size property */
  if (typeof value.size === "number") { return value.size; }
  /* Check Iterable objects */
  let iterator: IterableLike;
  /* Normalize input: use iterator directly or create one from iterable */
  if (typeof (value as Iterator<unknown>).next === "function") {
    iterator = value as Iterator<unknown>;
  } else {
    iterator = (value as Iterable<unknown>)[Symbol.iterator]();
  }
  let index: number = 0;
  for (let _item of iterator as any) { index++; }
  return index;
}


/**
 * @description Returns the first element from an iterable or iterator. If the iterable is empty, returns undefined.
 *
 * @param input - Iterable or iterator to extract from.
 * @returns The first element, or undefined if the iterable is empty.
 */
function first <T>(input: Iterable<T> | Iterator<T>): T | undefined {
  let iterator: Iterator<T>;
  /* If input is already an iterator, use it directly */
  if (typeof (input as Iterator<T>).next === 'function') {
    iterator = input as Iterator<T>;
  } else {
    /* Otherwise, get an iterator from the iterable */
    iterator = (input as Iterable<T>)[Symbol.iterator]();
  }
  const result = iterator.next();
  return result.done ? undefined : result.value;
}


/**
 * @description Returns the first element from an iterable or iterator. If the iterable is empty, returns undefined.
 *
 * @param input - Iterable or iterator to extract from.
 * @returns The first element, or undefined if the iterable is empty.
 */
function head <T>(input: Iterable<T> | Iterator<T>): T | undefined {
  let iterator: Iterator<T>;
  /* If input is already an iterator, use it directly */
  if (typeof (input as Iterator<T>).next === 'function') {
    iterator = input as Iterator<T>;
  } else {
    /* Otherwise, get an iterator from the iterable */
    iterator = (input as Iterable<T>)[Symbol.iterator]();
  }
  const result = iterator.next();
  return result.done ? undefined : result.value;
}


/**
 * @description Returns the last element from an iterable or iterator. If the iterable is empty, returns undefined.
 *
 * @param input - Iterable or iterator to extract from.
 * @returns The last element, or undefined if the iterable is empty.
 */
const last = ([...array]): unknown => array[array.length - 1];


/**
 * @description Yields the elements of an iterable or iterator in reverse order.
 *
 * @param iter - Iterable or iterator to reverse.
 * @yields The elements of the input iterable or iterator in reverse order.
 */
function* reverse ([...array]): IteratorReturn {
  let index: number = array.length;
  while (index--) { yield array[index]; }
}


/**
 * @description Returns a new array with the elements of the input iterable sorted.
 *
 * @param iter - The iterable to sort.
 * @param numbers - Whether to sort the elements as numbers.
 * @returns A new array with the sorted elements.
 */
const sort = ([...array], numbers: boolean = false): any[] =>
  array.sort(numbers ? (value1: number, value2: number): number =>
    value1 - value2 : undefined);


/**
 * @param {any} collection - The collection to search through.
 * @param {any} value - The value to look for.
 * @param {undefined | Function} [comparator] - Optional comparator for equality check.
 * @returns {boolean} - Whether the value was found.
 * @throws {TypeError} - If comparator is not a Function or undefined.
 */
function includes (
  collection: any,
  value: unknown,
  comparator?: Function): boolean {
  /* Comparator Validation - has to be a function or undefined. */
    if (comparator !== undefined && typeof comparator !== "function") {
    throw new TypeError(
      `[includes] TypeError: comparator is not a function or undefined. Got ${typeof comparator}`
    );
  }
  /* helper functions */
  const _isIterator = (value: any): boolean =>
    value != null && typeof value === "object"
      && typeof value.next === "function";
  const _isIterable = (value: any): boolean =>
    value != null && typeof value[Symbol.iterator] === "function";
  const _isEqual = comparator ||
    ((value1: any, value2: any): boolean =>
      value1 === value2 || (value1 !== value1 && value2 !== value2));
    // SameValueZero
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
    if ([...collection.keys()].findIndex((item) => _isEqual(item, value)) > -1) {
      return true;
    }
    if ([...collection.values()].findIndex((item) => _isEqual(item, value)) > -1) {
      return true;
    }
    return false;
  }
  /* Iterator or Iterables (Array, Set, TypedArrays, other Iterables, etc.) */
  if (_isIterator(collection) || _isIterable(collection)) {
    if ([...collection].findIndex((item) => _isEqual(item, value)) > -1) {
      return true;
    }
    return false;
  }
  /* Plain object or function */
  if (["object", "function"].includes(cType)) {
    if (Object.keys(collection).findIndex((item) => _isEqual(item, value)) > -1) {
      return true;
    }
    if (Object.values(collection).findIndex((item) => _isEqual(item, value)) > -1) {
      return true;
    }
    if (Object.getOwnPropertySymbols(collection)
      .findIndex((item) => _isEqual(item, value)) > -1) {
      return true;
    }
    return false;
  }
  /* default return false */
  return false;
}


/**
 * @description Returns the first element in an iterable that satisfies the provided testing function.
 *
 * @param {IterableLike} iter - The iterable to search through.
 * @param {Function} fn - The function to test each element.
 * @returns {any} The first element that satisfies the testing function, or undefined if none do.
 */
const find = ([...array], fn: Function): unknown =>
  array.find((value, index) => fn(value, index));


/**
 * @description Returns the last element in an iterable that satisfies the provided testing function.
 *
 * @param {IterableLike} iter - The iterable to search through.
 * @param {Function} fn - The function to test each element.
 * @returns {any} The last element that satisfies the testing function, or undefined if none do.
 */
const findLast = ([...array], fn: Function): unknown =>
  array.findLast((value, index) => fn(value, index));


/**
 * @description Tests whether all elements in the iterable pass the test implemented by the provided function.
 *
 * @param {IterableLike} iter - The iterable to test.
 * @param {Function} fn - The function to test each element.
 * @returns {boolean} True if all elements pass the test, false otherwise.
 */
const every = ([...array], fn: Function): boolean => array.length
  ? array.every((value, index) => fn(value, index))
  : false;


/**
 * @description Tests whether at least one element in the iterable passes the test implemented by the provided function.
 *
 * @param {IterableLike} iter - The iterable to test.
 * @param {Function} fn - The function to test each element.
 * @returns {boolean} True if at least one element passes the test, false otherwise.
 */
const some = ([...array], fn: Function): boolean => array.length
  ? array.some((value, index) => fn(value, index))
  : false;


/**
 * @description Tests whether no elements in the iterable pass the test implemented by the provided function.
 *
 * @param {IterableLike} iter - The iterable to test.
 * @param {Function} fn - The function to test each element.
 * @returns {boolean} True if no elements pass the test, false otherwise.
 */
const none = ([...array], fn: Function): boolean =>
  !array.some((value, index) => fn(value, index));


/**
 * @description Returns the last `num` elements from an iterable as an array.
 *
 * @param {IterableLike} iter - The iterable to take elements from.
 * @param {number} [num=1] - The number of elements to take from the end.
 * @returns {any[]} An array containing the last `num` elements.
 */
const takeRight = ([...array], num: number = 1): any[] =>
  array.reverse().slice(0, num);


/**
 * @description Yields elements from the end of an iterable while the provided function returns true.
 *
 * @param {IterableLike} iter - The iterable to take elements from.
 * @param {Function} fn - The function to test each element.
 * @yields The elements from the end of the iterable that satisfy the testing function.
 */
function* takeRightWhile ([...array], fn: Function): IteratorReturn {
  if (!array.length) { return; }
  let index = array.length;
  while (index--) {
    let item = array[index];
    if (!fn(item, index)) { break; }
    yield item;
  }
}


/**
 * @description Returns a new array with the last `num` elements removed from the input iterable.
 *
 * @param {IterableLike} iter - The iterable to drop elements from.
 * @param {number} [num=1] - The number of elements to drop from the end.
 * @returns {any[]} A new array with the last `num` elements removed.
 */
const dropRight = ([...array], num: number = 1): any[] =>
  array.reverse().slice(num);


/**
 * @description Yields elements from the end of an iterable after the provided function returns false.
 *
 * @param {IterableLike} iter - The iterable to drop elements from.
 * @param {Function} fn - The function to test each element.
 * @yields The elements from the end of the iterable after the testing function returns false.
 */
function* dropRightWhile ([...array], fn: Function): IteratorReturn {
  if (!array.length) { return; }
  let index = array.length;
  let skip = true;
  while (index--) {
    let item = array[index];
    if (skip) { skip = fn(item, index); }
    if (!skip) { yield item; }
  }
}


/**
 * @description Concatenates multiple iterables or values into a single iterator.
 *
 * @param {...any} args - The iterables or values to concatenate.
 * @yields The elements from the concatenated iterables or values.
 */
function* concat (...args: any[]): IteratorReturn {
  for (let item of args) {
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


/**
 * @description Reduces an iterable to a single value by applying a function to each element and an accumulator.
 *
 * @param {IterableLike} iter - The iterable to reduce.
 * @param {Function} fn - The function to apply to each element and the accumulator.
 * @param {any} [initialvalue] - The initial value for the accumulator.
 * @returns {any} The reduced value.
 */
function reduce (
  iter: IterableLike,
  fn: Function,
  initialvalue?: any): any {
  let acc: any = initialvalue;
  let index: number = 0;
  for (let item of iter as Iterable<any>) {
    if (index === 0 && acc === undefined) {
      acc = item;
    } else {
      acc = fn(acc, item, index++);
    }
  }
  return acc;
}


/**
 * @description Yields pairs of index and element from an iterable, starting from the specified offset.
 *
 * @param {IterableLike} iter - The iterable to enumerate.
 * @param {number} [offset=0] - The starting index for enumeration.
 * @yields {[number, any]} Pairs of index and element from the iterable.
 */
function* enumerate (
  iter: IterableLike,
  offset: number = 0): IteratorReturn {
  let index: number = offset;
  for (let item of iter as Iterable<any>) { yield [index++, item]; }
}


/**
 * @description Flattens a nested iterable structure into a single-level iterator.
 *
 * @param {IterableLike} iter - The nested iterable to flatten.
 * @yields The elements from the flattened iterable.
 */
function* flat (iter: IterableLike): IteratorReturn {
  for (let item of iter as Iterable<any>) {
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


/**
 * @description Joins the elements of an iterable into a single string, separated by the specified separator.
 *
 * @param {IterableLike} iter - The iterable to join.
 * @param {string} [separator=","] - The separator to use between elements.
 * @returns {string} The joined string.
 */
function join (
  iter: IterableLike,
  separator: string = ","): string {
  separator = String(separator);
  let result: string = "";
  for (let item of iter as Iterable<any>) { result += separator + item; }
  return result.slice(separator.length);
}


/**
 * @description Returns a new array with elements from the input iterable that are not present in the filter iterable.
 *
 * @param {IterableLike} iter - The iterable to filter.
 * @param {IterableLike} filterIter - The iterable containing values to exclude.
 * @returns {any[]} A new array with the filtered elements.
 */
const withOut = ([...array], [...filterValues]): any[] =>
  array.filter((value: unknown): boolean => !filterValues.includes(value));


/** Math API **/


/**
 * @description Adds two numbers or bigints.
 *
 * @param {number | bigint} value1
 * @param {number | bigint} value2
 * @returns {number | bigint} The result of the operation.
 * @throws {TypeError} If x and y are of mixed types.
 */
function add(value1: number, value2: number): number;
function add(value1: bigint, value2: bigint): bigint;
function add(value1: NumberLike, value2: NumberLike): NumberLike {
  if (typeof value1 !== typeof value2
    || (typeof value1 !== "number" && typeof value1 !== "bigint")) {
    throw new TypeError(
      `[add] Value1 and Value2 must be of the same type and either number or bigint. Got: ${typeof value1} and ${typeof value2}`
    );
  }
  if (typeof value1 === "number" && typeof value2 === "number") {
    // @ts-ignore
    return Math.sumPrecise([value1, value2]);
  }
  return (value1 as bigint) + (value2 as bigint);
}


/**
 * @description Subtract two numbers or bigints.
 *
 * @param {number | bigint} value1
 * @param {number | bigint} value2
 * @returns {number | bigint} The result of the operation.
 * @throws {TypeError} If x and y are of mixed types.
 */
function sub(value1: number, value2: number): number;
function sub(value1: bigint, value2: bigint): bigint;
function sub(value1: NumberLike, value2: NumberLike): NumberLike {
  if (typeof value1 !== typeof value2
    || (typeof value1 !== "number" && typeof value1 !== "bigint")) {
    throw new TypeError(
      `[sub] Value1 and Value2 must be of the same type and either number or bigint. Got: ${typeof value1} and ${typeof value2}`
    );
  }
  if (typeof value1 === "number" && typeof value2 === "number") {
    // @ts-ignore
    Math.sumPrecise([value1, -value2]);
  }
  return (value1 as bigint) - (value2 as bigint);
}


/**
 * @description Multiply two numbers or bigints.
 *
 * @param {number | bigint} value1
 * @param {number | bigint} value2
 * @returns {number | bigint} The result of the operation.
 * @throws {TypeError} If x and y are of mixed types.
 */
function mul(value1: number, value2: number): number;
function mul(value1: bigint, value2: bigint): bigint;
function mul(value1: NumberLike, value2: NumberLike): NumberLike {
  if (typeof value1 !== typeof value2
    || (typeof value1 !== "number" && typeof value1 !== "bigint")) {
    throw new TypeError(
      `[mul] Value1 and Value2 must be of the same type and either number or bigint. Got: ${typeof value1} and ${typeof value2}`
    );
  }
  if (typeof value1 === "number" && typeof value2 === "number") {
    return value1 * value2;
  }
  return (value1 as bigint) * (value2 as bigint);
}


/**
 * @description Divide two numbers or bigints.
 *
 * @param {number | bigint} value1
 * @param {number | bigint} y
 * @returns {number | bigint} The result of the operation.
 * @throws {RangeError} If y is zero.
 * @throws {TypeError} If x and y are of mixed types.
 */
function div(value1: number, value2: number): number;
function div(value1: bigint, value2: bigint): bigint;
function div(value1: NumberLike, value2: NumberLike): NumberLike {
  if (typeof value1 !== typeof value2
    || (typeof value1 !== "number" && typeof value1 !== "bigint")) {
    throw new TypeError(
      `[div] Value1 and Value2 must be of the same type and either number or bigint. Got: ${typeof value1} and ${typeof value2}`
    );
  }
  if (value2 === 0 || value2 === 0n) {
    throw new RangeError("[div] Cannot divide by zero");
  }
  if (typeof value1 === "number" && typeof value2 === "number") {
    return value1 / value2;
  }
  return (value1 as bigint) / (value2 as bigint);
}


/**
 * @description Performs integer division of two numbers or bigints.
 *
 * @param {number | bigint} value1
 * @param {number | bigint} value2
 * @returns {number | bigint} The result of the operation.
 * @throws {RangeError} If y is zero.
 * @throws {TypeError} If x and y are of mixed types.
 */
function divMod(value1: number, value2: number): number;
function divMod(value1: bigint, value2: bigint): bigint;
function divMod(value1: NumberLike, value2: NumberLike): NumberLike {
  if (typeof value1 !== typeof value2
    || (typeof value1 !== "number" && typeof value1 !== "bigint")) {
    throw new TypeError(
      `[divMod] Value1 and Value2 must be of the same type and either number or bigint. Got: ${typeof value1} and ${typeof value2}`
    );
  }
  if (value2 === 0 || value2 === 0n) {
    throw new RangeError("[divMod] Cannot divide by zero");
  }
  if (typeof value1 === "number" && typeof value2 === "number") {
    return Math.trunc(value1 / value2);
  }
  return (value1 as bigint) / (value2 as bigint);
}


/*
https://www.w3schools.com/js/js_arithmetic.asp
% -> Modulus (Remainder)
*/
/**
 * @description Remainder of division (modulus) of two numbers or bigints.
 *
 * @param {number | bigint} value1
 * @param {number | bigint} value2
 * @returns {number | bigint} The result of the operation.
 * @throws {RangeError} If y is zero.
 * @throws {TypeError} If x and y are of mixed types.
 */
function mod(value1: number, value2: number): number;
function mod(value1: bigint, value2: bigint): bigint;
function mod(value1: NumberLike, value2: NumberLike): NumberLike {
  if (typeof value1 !== typeof value2
    || (typeof value1 !== "number" && typeof value1 !== "bigint")) {
    throw new TypeError(
      `[mod] Value1 and Value2 must be of the same type and either number or bigint. Got: ${typeof value1} and ${typeof value2}`
    );
  }
  if (value2 === 0 || value2 === 0n) {
    throw new RangeError("[mod] Cannot divide by zero");
  }
  if (typeof value1 === "number" && typeof value2 === "number") {
    return Math.trunc(value1 % value2);
  }
  return (value1 as bigint) % (value2 as bigint);
}


/**
 * @description Checks if a value is a floating-point number.
 *
 * @param {unknown} value - The value to check.
 * @returns {boolean} True if the value is a float, false otherwise.
 */
const isFloat = (value: unknown): boolean =>
  typeof value === "number" && value === value && Boolean(value % 1);


/**
 * @description Converts a value to an integer within the safe integer range.
 *
 * @param {unknown} value - The value to convert.
 * @returns {number} The converted integer.
 */
function toInteger (value: any): number {
  value = ((value = Math.trunc(Number(value))) !== value || value === 0) ? 0 : value;
  return Math.min(Math.max(value, -(Math.pow(2, 53) - 1)), Math.pow(2, 53) - 1);
}


/* toIntegerOrInfinity(value: unknown): integer | Infinity | -Infinity */
/**
 * @description Converts a value to an integer or infinity.
 *
 * @param {unknown} value - The value to convert.
 * @returns {number} The converted integer or infinity.
 */
const toIntegerOrInfinity = (value: unknown): number =>
  ((value = Math.trunc(Number(value))) !== value || value === 0) ? 0 : value as number;


/**
 * @description Sums multiple values, using precise addition for numbers.
 *
 * @param {...any} args - The values to sum.
 * @returns {any} The sum of the values.
 */
const sum = (...args: any[]): any =>
  args.every((value: unknown): boolean => typeof value === "number") ?
    // @ts-ignore
    Math.sumPrecise(args) : args.slice(1).reduce(
      (acc: any, value: any): any => acc + value, args[0]
    );


/**
 * @description Calculates the average of multiple numbers using precise addition.
 *
 * @param {...number} args - The numbers to average.
 * @returns {number} The average of the numbers.
 */
// @ts-ignore
const avg = (...args: number[]): number =>
   // @ts-ignore
  Math.sumPrecise(args) / args.length;


/**
 * @description Calculates the product of multiple numbers.
 *
 * @param {...number} args - The numbers to multiply.
 * @returns {number} The product of the numbers.
 */
const product = (first: number, ...args: number[]): number =>
  args.reduce((acc: number, v: number): number => acc * v, first);


/**
 * @description Clamps a value between a minimum and maximum.
 *
 * @param {any} value - The value to clamp.
 * @param {any} min - The minimum value.
 * @param {any} max - The maximum value.
 * @returns {number} The clamped value.
 */
function clamp(
  value: any,
  min: number | bigint = Number.MIN_SAFE_INTEGER,
  max: number | bigint = Number.MAX_SAFE_INTEGER): number | bigint {
  /* normalize */
  function _normalize (value: any): number | bigint {
    if (typeof value !== "bigint" && typeof value !== "number") {
      value = Number(value);
    }
    if (value === -Infinity) { return Number.MIN_SAFE_INTEGER; }
    if (value === Infinity) { return Number.MAX_SAFE_INTEGER; }
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
      "[clamp] RangeError: minimum and maximum should not to be NaN"
    );
  }
  /* min > max -> throw RangeError */
  if (min > max) {
    throw new RangeError(
      "[clamp] RangeError: minimum should be lower than maximum"
    );
  }
  /* clamp */
  return (value < min) ? min : ((value > max) ? max : value);
}



/**
 * @description Clamps a value between a minimum and maximum.
 *
 * @param {any} value - The value to clamp.
 * @param {any} min - The minimum value.
 * @param {any} max - The maximum value.
 * @returns {number} The clamped value.
 */
function minmax(
  value: any,
  min: number | bigint = Number.MIN_SAFE_INTEGER,
  max: number | bigint = Number.MAX_SAFE_INTEGER): number | bigint {
  /* normalize */
  function _normalize (value: any): number | bigint {
    if (typeof value !== "bigint" && typeof value !== "number") {
      value = Number(value);
    }
    if (value === -Infinity) { return Number.MIN_SAFE_INTEGER; }
    if (value === Infinity) { return Number.MAX_SAFE_INTEGER; }
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
      "[minmax] RangeError: minimum and maximum should not to be NaN"
    );
  }
  /* min > max -> throw RangeError */
  if (min > max) {
    throw new RangeError(
      "[minmax] RangeError: minimum should be lower than maximum"
    );
  }
  /* clamp */
  return (value < min) ? min : ((value > max) ? max : value);
}


/**
 * @description Checks if a number is even.
 *
 * @param {number} value - The number to check.
 * @returns {boolean} True if the number is even, false otherwise.
 */
function isEven (value: number): boolean {
  let result: number = value % 2;
  if (result === result) { return result === 0; }
  return false;
}


/**
 * @description Checks if a number is odd.
 *
 * @param {number} value - The number to check.
 * @returns {boolean} True if the number is odd, false otherwise.
 */
function isOdd (value: number): boolean {
  let result: number = value % 2;
  if (result === result) { return result !== 0; }
  return false;
}


/* toInt8(value: unknown): integer -127..128 */
/**
 * @description Converts a value to an 8-bit signed integer.
 *
 * @param {unknown} value - The value to convert.
 * @returns {number} The converted 8-bit signed integer.
 */
const toInt8 = (value: unknown): number =>
  ((value = Math.min(Math.max(-128, Math.trunc(Number(value))), 127)) === value)
    ? value as number : 0;


/* toUInt8(value: unknown): integer 0..255 */
/**
 * @description Converts a value to an 8-bit unsigned integer.
 *
 * @param {unknown} value - The value to convert.
 * @returns {number} The converted 8-bit unsigned integer.
 */
const toUInt8 = (value: unknown): number =>
  ((value = Math.min(Math.max(0, Math.trunc(Number(value))), 255)) === value)
    ? value as number : 0;


/* toInt16(value: unknown): integer -32768..32767 */
/**
 * @description Converts a value to a 16-bit signed integer.
 *
 * @param {unknown} value - The value to convert.
 * @returns {number} The converted 16-bit signed integer.
 */
const toInt16 = (value: unknown): number =>
  ((value = Math.min(Math.max(-32768, Math.trunc(Number(value))), 32767))
    === value) ? value as number : 0;


/* toUInt16(value: unknown) integer 0..65535 */
/**
 * @description Converts a value to a 16-bit unsigned integer.
 *
 * @param {unknown} value - The value to convert.
 * @returns {number} The converted 16-bit unsigned integer.
 */
const toUInt16 = (value: unknown): number =>
  ((value = Math.min(Math.max(0, Math.trunc(Number(value))), 65535)) === value)
    ? value as number : 0;


/* toInt32(value: unknown): integer -2147483648..2147483647 */
/**
 * @description Converts a value to a 32-bit signed integer.
 *
 * @param {unknown} value - The value to convert.
 * @returns {number} The converted 32-bit signed integer.
 */
const toInt32 = (value: unknown): number =>
  ((value = Math.min(Math.max(-2147483648, Math.trunc(Number(value))),
    2147483647)) === value) ? value as number : 0;


/* toUInt32(value: unknown): integer 0..4294967295 */
/**
 * @description Converts a value to a 32-bit unsigned integer.
 *
 * @param {unknown} value - The value to convert.
 * @returns {number} The converted 32-bit unsigned integer.
 */
const toUInt32 = (value: unknown): number =>
  ((value = Math.min(Math.max(0, Math.trunc(Number(value))), 4294967295))
    === value) ? value as number : 0;


/**
 * @description Converts a value to a 64-bit signed bigint.
 *
 * @param {unknown} value - The value to convert.
 * @returns {bigint} The converted 64-bit signed bigint.
 */
const toBigInt64 = (value: any | bigint): bigint =>
  BigInt(typeof value === "bigint"
    ? (value > Math.pow(2,63) -1 ? Math.pow(2, 63) -1 : value < Math.pow(-2, 63)
      ? Math.pow(-2, 63) : value)
  : ((value = Math.min(Math.max(Math.pow(-2, 63), Math.trunc(Number(value))),
    Math.pow(2, 63) - 1)) === value ) ? value : 0);


/**
 * @description Converts a value to a 64-bit unsigned bigint.
 *
 * @param {unknown} value - The value to convert.
 * @returns {bigint} The converted 64-bit unsigned bigint.
 */
const toBigUInt64 = (value: unknown): bigint =>
  BigInt(typeof value === "bigint"
    ? (value > Math.pow(2, 64) - 1 ? Math.pow(2,64) - 1 : value < 0 ? 0 : value)
    : ((value = Math.min(Math.max(0, Math.trunc(Number(value))),
      Math.pow(2, 64) -1)) === value) ? value as bigint : 0);


/**
 * @description Converts a value to a 32-bit floating-point number.
 *
 * @param {unknown} value - The value to convert.
 * @returns {number} The converted 32-bit floating-point number.
 */
const toFloat32 = (value: unknown): number =>
  ((value = Math.min(Math.max(-3.4e38, Number(value)), 3.4e38)) === value)
    ? value as number : 0;


/**
 * @description Checks if a value is an 8-bit signed integer.
 *
 * @param {unknown} value - The value to check.
 * @returns {boolean} True if the value is an 8-bit signed integer, false otherwise.
 */
const isInt8 = (value: unknown | number): boolean =>
  Number.isInteger(value) && value as number >= -128 && value as number <= 127;


/**
 * @description Checks if a value is an 8-bit unsigned integer.
 *
 * @param {unknown} value - The value to check.
 * @returns {boolean} True if the value is an 8-bit unsigned integer, false otherwise.
 */
const isUInt8 = (value: unknown | number): boolean =>
  Number.isInteger(value) && value as number >= 0 && value as number <= 255;


/**
 * @description Checks if a value is a 16-bit signed integer.
 *
 * @param {unknown} value - The value to check.
 * @returns {boolean} True if the value is a 16-bit signed integer, false otherwise.
 */
const isInt16 = (value: unknown): boolean =>
  Number.isInteger(value) && value as number >= -32768
    && value as number <= 32767;


/**
 * @description Checks if a value is a 16-bit unsigned integer.
 *
 * @param {unknown} value - The value to check.
 * @returns {boolean} True if the value is a 16-bit unsigned integer, false otherwise.
 */
const isUInt16 = (value: unknown): boolean =>
  Number.isInteger(value) && value as number >= 0 && value as number <= 65535;


/**
 * @description Checks if a value is a 32-bit signed integer.
 *
 * @param {unknown} value - The value to check.
 * @returns {boolean} True if the value is a 32-bit signed integer, false otherwise.
 */
const isInt32 = (value: unknown): boolean =>
  Number.isInteger(value) && value as number >= -2147483648
    && value as number <= 2147483647;


/**
 * @description Checks if a value is a 32-bit unsigned integer.
 *
 * @param {unknown} value - The value to check.
 * @returns {boolean} True if the value is a 32-bit unsigned integer, false otherwise.
 */
const isUInt32 = (value: unknown | number): boolean =>
  Number.isInteger(value) && value as number >= 0
    && value as number <= 4294967295;


/**
 * @description Checks if a value is a 64-bit signed integer.
 *
 * @param {unknown} value - The value to check.
 * @returns {boolean} True if the value is a 64-bit signed integer, false otherwise.
 */
const isBigInt64 = (value: unknown): boolean =>
  typeof value === "bigint"
    && value >= Math.pow(-2, 63) && value <= Math.pow(2, 63)-1;


/**
 * @description Checks if a value is a 64-bit unsigned integer.
 *
 * @param {unknown} value - The value to check.
 * @returns {boolean} True if the value is a 64-bit unsigned integer, false otherwise.
 */
const isBigUInt64 = (value: unknown | number | bigint): boolean =>
  typeof value === "bigint" && value >= 0 && value <= Math.pow(2,64) - 1;


/**
 * @description Converts a value to a 16-bit floating-point number.
 *
 * @param {unknown} value - The value to convert.
 */
const toFloat16 = (value: unknown): number =>
  ((value = Math.min(Math.max(-65504, Number(value)), 65504)) === value )
    ? value as number : 0;


/**
 * @description Checks if a value is a 16-bit floating-point number.
 *
 * @param {unknown} value - The value to check.
 * @returns {boolean} True if the value is a 16-bit floating-point number, false otherwise.
 */
const isFloat16 = (value: unknown | number | bigint): boolean =>
  typeof value === "number" && value === value && value >= -65504
    && value <= 65504;


/**
 * @description Checks if the sign bit of a number or bigint is set (i.e., if the value is negative).
 *
 * @param {unknown | number | bigint} value - The value to check.
 * @returns {boolean} True if the sign bit is set, false otherwise.
 */
const signbit = (value: unknown | number | bigint): boolean =>
  ((value = Number(value)) !== value)
    ? false : (Object.is(value, -0) || (value as number | bigint < 0));


/* randomInt([max: integer]): integer */
/* randomInt(min: integer, max: integer): integer */
/**
 * @description Generates a random integer between the specified minimum and maximum values.
 *
 * @param {number} [min=100] - The minimum value (inclusive) or the maximum value if only one argument is provided.
 * @param {number} [max] - The maximum value (inclusive).
 * @returns {number} A random integer between the specified range.
 */
function randomInt (
  min: number | undefined = 100,
  max?: number | null | undefined): number {
  if (max == null) {
    max = min;
    min = 0;
  }
  min = Math.ceil(Number(min));
  return Math.floor(Math.random() * (Math.floor(Number(max)) - min + 1) + min);
}


/* randomFloat([max: float]): float */
/* randomFloat(min: float, max: float): float */
/**
 * @description Generates a random floating-point number between the specified minimum and maximum values.
 *
 * @param {number} [min=100] - The minimum value (inclusive) or the maximum value if only one argument is provided.
 * @param {number} [max] - The maximum value (inclusive).
 * @returns {number} A random floating-point number between the specified range.
 */
function randomFloat (
  min: number | undefined = 100,
  max?: number | null | undefined): number {
  if (max == null) {
    max = min;
    min = 0;
  }
  let result: number = (Math.random() * (max - min + 1)) + min;
  return result > max ? max : result;
}


/**
 * @description Checks if a number is within a specified range (inclusive).
 *
 * @param {number} value - The number to check.
 * @param {number} min - The minimum value of the range.
 * @param {number} max - The maximum value of the range.
 * @returns {boolean} True if the number is within the range, false otherwise.
 */
const inRange = (value: number, min: number, max: number): boolean =>
  (value >= min && value <= max);


export default {
  /** object header **/
  VERSION,
  /** Core API **/
  BASE16,
  BASE32,
  BASE36,
  BASE58,
  BASE62,
  WORDSAFEALPHABET,
  assert,
  eq,
  gt,
  gte,
  lt,
  lte,
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
  /** Type API **/
  isNonNullable,
  isNonNullablePrimitive,
  isTypedCollection,
  is,
  toObject,
  toPrimitiveValue,
  toSafeString,
  isPropertyKey,
  toPropertyKey,
  isIndex,
  isLength,
  toIndex,
  toLength,
  typeOf,
  isSameType,
  isSameInstance,
  isCoercedObject,
  isDeepStrictEqual,
  isEmptyValue,
  isProxy,
  isAsyncGeneratorFn,
  isPlainObject,
  isChar,
  isNumeric,
  isObject,
  isFunction,
  isCallable,
  isArraylike,
  isNull,
  isUndefined,
  isNullish,
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
  add,
  sub,
  mul,
  div,
  divMod,
  mod,
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


export {
  /** object header **/
  VERSION,
  /** Core API **/
  BASE16,
  BASE32,
  BASE36,
  BASE58,
  BASE62,
  WORDSAFEALPHABET,
  assert,
  eq,
  gt,
  gte,
  lt,
  lte,
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
  /** Type API **/
  isNonNullable,
  isNonNullablePrimitive,
  isTypedCollection,
  is,
  toObject,
  toPrimitiveValue,
  toSafeString,
  isPropertyKey,
  toPropertyKey,
  isIndex,
  isLength,
  toIndex,
  toLength,
  typeOf,
  isSameType,
  isSameInstance,
  isCoercedObject,
  isDeepStrictEqual,
  isEmptyValue,
  isProxy,
  isAsyncGeneratorFn,
  isPlainObject,
  isChar,
  isNumeric,
  isObject,
  isFunction,
  isCallable,
  isArraylike,
  isNull,
  isUndefined,
  isNullish,
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
  add,
  sub,
  mul,
  div,
  divMod,
  mod,
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
