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
 * @version 6.1.2 node
 * @author Ferenc Czigler
 * @see https://github.com/Serrin/Celestra/
 * @license MIT https://opensource.org/licenses/MIT
 */


const VERSION = "Celestra v6.1.2 node";


/** TS types */


/**
 * @description Map-like object with string or symbol keys.
 *
 * @internal
 * */
type MapLike = { [key: string | symbol]: any };

/**
 * @description Array-like object.
 *
 * @internal
 * */
type ArrayLike = { length: number; [n: number]: any; };
/* interface ArrayLike<T> { length: number; [n: number]: T; }; */

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
 * @description Iterable and Iterator types.
 *
 * @internal
 */
type IterableAndIterator =
  Iterable<any> | Iterator<any> | IterableIterator<any>;

/**
 * @description Iterable and Iterator and Array-like types.
 *
 * @internal
 */
type IterableAndIteratorAndArrayLike =
  Iterable<any> | Iterator<any> | IterableIterator<any> | ArrayLike;

/**
 * @description Iterable and Iterator and Generator types.
 *
 * @internal
 */
type IteratorReturn =
  Iterable<any> | IteratorResult<any> | Generator<number, void, unknown>;

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
type NonNullablePrimitive = number | boolean | string | symbol;

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
type Comparable = number | bigint | string | boolean;

/**
 * @description Object key type.
 *
 * @internal
 */
type PropertyKey = string | symbol;

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
type TypedArray =
  | Int8Array | Uint8Array | Uint8ClampedArray
  | Int16Array | Uint16Array
  | Int32Array | Uint32Array
  | Float32Array | Float64Array
  | BigInt64Array | BigUint64Array
  | (typeof globalThis extends { Float16Array: infer F } ? F : never);

  
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
    "value": function (items: IterableAndIterator, callbackFn: Function) {
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
    "value": function (items: IterableAndIterator, callbackFn: Function) {
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
    "value": function () { return this.slice().reverse(); }
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


const BASE16 = "0123456789ABCDEF";
const BASE32 = "234567ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const BASE36 = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const BASE58 = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
const BASE62 = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
const WORDSAFEALPHABET = "23456789CFGHJMPQRVWXcfghjmpqvwx"; /* 31 */


/* isNonNullable (value: unknown): boolean */
/**
 * @description Checks if the given value is NonNullable (not null or undefined).
 *
 * @param {unknown} value - The value to check.
 * @returns True if the value is a NonNullable, false otherwise.
 */
const isNonNullable = (value: unknown): value is NonNullable<unknown> =>
  value != null;


/* isNonNullablePrimitive (value: unknown): boolean */
/**
 * @description Checks if the given value is NonNullablePrimitive.
 *
 * @param {unknown} value - The value to check.
 * @returns True if the value is a NonNullable, false otherwise.
 */
const isNonNullablePrimitive =
  (value: unknown): value is NonNullablePrimitive =>
    value != null && typeof value !== "object" && typeof value !== "function";


/* eq (value1: any, value2: any): boolean */
/**
 * @description SameValueZero equality (like `Object.is`, but +0 === -0).
 *
 * @param {unknown} value1
 * @param {unknown} value2
 * @returns {boolean}
 */
const eq = (value1: unknown, value2: unknown): boolean =>
  value1 === value2 || (value1 !== value1 && value2 !== value2);


/* gt (value1: any, value2: any): boolean */
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


/* gte (value1: any, value2: any): boolean */
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


/* lt (value1: any, value2: any): boolean */
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


/* lte (value1: any, value2: any): boolean */
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


/* tap(function: function): function(v) */
function tap (fn: Function): any {
  return function (value: unknown): any { fn(value); return value; };
}


/* once(function: function): function */
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


/* curry (function: function): function */
function curry (fn: Function): Function {
  const curried = (...args: any[]): any =>
    args.length >= fn.length
      ? fn(...args)
      : (...rest: any[]): any => curried(...args, ...rest);
  return curried;
}


/* pipe (function1:function [, functionN: function]): function */
const pipe = (...functions: Function[]): Function =>
  (first: any): any =>
    functions.reduce((value: unknown, fn: Function): any => fn(value), first);


/* compose (function1: function [, functionN: function]): function */
const compose = (...functions: Function[]): Function =>
  (first: any): any => functions.reduceRight((value, fn): any => fn(value), first);


/* pick (object: object, keys: array): object */
const pick = (obj: MapLike, keys: string[]): MapLike =>
  keys.reduce(function (acc: MapLike, key: string) {
    if (key in obj) { acc[key] = obj[key]; }
    return acc;
  }, {});


/* omit (object: object, keys: array): object */
const omit = (obj: MapLike, keys: string[]): MapLike =>
  Object.keys(obj).reduce(function (acc: MapLike, key: string) {
    // @ts-ignore
    if (!keys.includes(key)) { acc[key] = obj[key]; }
    return acc;
  }, {});


/* assoc (object: object, key: string, value: unknown): object */
const assoc = (obj: MapLike, property: string, value: unknown): MapLike =>
  ({...obj, [property]: value});


/* asyncNoop (): Promise - do nothing */
// @ts-ignore
function asyncNoop (): Promise<void> {
  return new Promise(function (resolve: Function) { resolve(); });
}


/* asyncT (): Promise - return true */
async function asyncT (): Promise<boolean> { return true; }


/* asyncF (): Promise - return false */
async function asyncF (): Promise<boolean> { return false; }


/* asyncConstant (value): async function */
function asyncConstant (value: unknown): Function {
  return async function() { return value; };
}


/* asyncIdentity (value): Promise - return value */
async function asyncIdentity (value: unknown): Promise<any> { return value; }


/* deleteOwnProperty(object, property [,Throw = false]): number | thrown error*/
function deleteOwnProperty (
  obj: Object,
  property: string,
  Throw: boolean = false): number {
  if (Object.hasOwn(obj, property)) {
    // @ts-ignore
    delete obj[property];
    let result = Object.hasOwn(obj, property);
    if (result && Throw) {
      throw new Error("[deleteOwnProperty] error");
    }
    return +!result;
  }
  return -1;
}


/* createPolyfillMethod(object, property, function: any): boolean */
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


/* createPolyfillProperty(object, property, value: unknown): boolean */
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


/* randomUUIDv7(v4: boolean = false): string */
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


/* delay(ms: integer).then(callback: function): promise */
const delay = (milisec: number): Promise<void> =>
  new Promise(resolve => setTimeout(resolve, milisec));


/* randomBoolean(): boolean */
const randomBoolean = (): boolean => !Math.round(Math.random());


/* getUrlVars([str = location.search]): Object */
const getUrlVars = (str: string = location.search): Object =>
  [...new URLSearchParams(str).entries()]
    // @ts-ignore
    .reduce(function (obj, item) { obj[item[0]] = item[1]; return obj; }, {});


/* obj2string(object): string */
const obj2string = (obj: object): string => Object.keys(obj).reduce(
  (str, key: string): string => str
    // @ts-ignore
    += encodeURIComponent(key) + "=" + encodeURIComponent(obj[key]) + "&",
"").slice(0, -1);


/* extend([deep: boolean,] target: object, source1: object[, sourceN]): object*/
function extend (...args: Array<object | boolean>): object {
  function _EXT (...args: Array<object | boolean>): object {
    let targetObject: {};
    let deep: boolean;
    let start: number;
    if (typeof args[0] === "boolean") {
      targetObject = args[1], deep = args[0], start = 2;
    } else {
      targetObject = args[0], deep = false, start = 1;
    }
    for (let i: number = start, length: number = args.length,
      sourceObject: object; i < length; i++) {
      sourceObject = args[i] as object;
      if (sourceObject != null) {
        for (let key in sourceObject) {
          if (Object.hasOwn(sourceObject, key)) {
            // @ts-ignore
            if (typeof sourceObject[key] === "object" && deep) {
              // @ts-ignore
              targetObject[key] = _EXT(true, {}, sourceObject[key]);
            } else {
              // @ts-ignore
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
const sizeIn = (obj: object): number =>
  Object.getOwnPropertyNames(obj).length
    + Object.getOwnPropertySymbols(obj).length;


/* unBind(function): function */
const unBind = (fn: Function): Function => Function.prototype.call.bind(fn);


/* bind(function, context: any): function */
/** @return {Function} */
const bind = Function.prototype.call.bind(Function.prototype.bind);


/* constant(value: unknown): any */
const constant = (value: unknown): Function => (): any => value;


/* identity(value: unknown): any */
const identity = (value: unknown): any => value;


/* noop(): undefined */
function noop (): void {}


/* T(): true */
const T = (): boolean => true;


/* F(): false */
const F = (): boolean => false;


/* nanoid([size = 21 [,
  alphabet="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_-"]])
  : string */
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


/* timestampID([size = 21
  [, alphabet = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz"]])
  : string */
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


/** Legacy Assertion API **/


/* assertIs (
    value: unknown,
    expected: string | Function | Array<string | Function> | undefined,
    message: string | error
  ): any | throw TypeError */
/** @deprecated */
function assertIs (
  value: any,
  expected: string | Function | Array<string | Function> | undefined,
  message?: any): any {
  function _is (
    value: unknown,
    expected: string | Function | Array<string | Function> | undefined) {
    /* validate expected */
    if (!(["string", "function"].includes(typeof expected))
      && !Array.isArray(expected)) {
      throw new TypeError(
        `[assertIs] TypeError: expectedType must be string, function, or array. Got ${typeof expected}`
      );
    }
    /* check expected types and constructors */
    const vType: string = (value === null ? "null" : typeof value);
    let matched: boolean = (Array.isArray(expected) ? expected : [expected]).some(
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
    let eNames = (Array.isArray(expected) ? expected : [expected]).map((item): string =>
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
    value: unknown,
    expected: string | Function | Array<string | Function> | undefined,
    message: string | error
  ): any | throw TypeError */
/** @deprecated */
  function assertIsNot (
  value: any,
  expected: string | Function | Array<string | Function> | undefined,
  message?: any): any {
  function _is (
    value: unknown,
    expected: string | Function | Array<string | Function> | undefined) {
    /* validate expected */
    if (!(["string", "function"].includes(typeof expected))
      && !Array.isArray(expected)) {
      throw new TypeError(
        `[assertIsNot] TypeError: expectedType must be string, function, or array. Got ${typeof expected}`
      );
    }
    /* check expected types and constructors */
    const vType: string = (value === null ? "null" : typeof value);
    let matched: boolean = (Array.isArray(expected) ? expected : [expected]).some(
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
    let vName = value.toString
      ? value.toString()
      : Object.prototype.toString.call(value);
    let eNames =
      (Array.isArray(expected) ? expected : [expected]).map((item): string =>
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
/** @deprecated */
function assertFail (message?: any): void {
  if (Error.isError(message)) {
    throw message;
  } else {
    throw new Error(
      "[assertFail] Assertion failed" + (message ? ": " + message : "")
    );
  }
}


/* assertMatch(string, regexp [, message | error]): true | thrown error */
/** @deprecated */
function assertMatch (string: string, regexp: RegExp, message?: any): boolean {
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
/** @deprecated */
function assertDoesNotMatch(
  string: string,
  regexp: RegExp,
  message?: any): boolean {
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
/** @deprecated */
function assertThrows (callback: Function, message?: any): any  {
  if (typeof callback !== "function") {
    throw new TypeError(
      "[assertThrows] TypeError: " + callback + " is not a function"
        + (message ? " - " + message : "")
    );
  }
  try { callback(); } catch (error) { return error; }
  if (Error.isError(message)) { throw message; }
  throw new Error(
    "[assertThrow] Assertion failed" + (message ? ": " + message : "")
  );
}


/* assertIsNotNullish(value: unknown [, message | error]): value | thrown error */
/** @deprecated */
function assertIsNotNullish (value: unknown, message?: any) {
  if (value == null) {
    if (Error.isError(message)) { throw message; }
    throw new TypeError(
      "[assertIsNotNullish] Assertion failed: " + value + " is null or undefined"
        + (message ? " - " + message : "")
    );
  }
  return value;
}


/* assertIsNullish(value: unknown [, message | error]): value | thrown error */
/** @deprecated */
function assertIsNullish (value: unknown, message?: any): any  {
  if (value != null) {
    if (Error.isError(message)) { throw message; }
    throw new TypeError(
      "[assertIsNullish] Assertion failed: " + value + " is not null or undefined"
        + (message ? " - " + message : "")
    );
  }
  return value;
}


/* assert(value: unknown [, message | error]): true | thrown error */
/** @deprecated */
function assert (condition: any, message?: any): boolean {
  if (!condition) {
    if (Error.isError(message)) { throw message; }
    throw new Error(
      "[assert] Assertion failed" + (message ? ": " + message : "")
    );
  }
  return true;
}


/* assertTrue(value: unknown [, message]): true | thrown error */
/** @deprecated */
function assertTrue (condition: any, message?: any): boolean {
  if (!condition) {
    if (Error.isError(message)) { throw message; }
    throw new Error(
      "[assertTrue] Assertion failed" + (message ? ": " + message : "")
    );
  }
  return true;
}


/* assertFalse(value: unknown [, message] | error): true | thrown error */
/** @deprecated */
function assertFalse (condition: any, message?: any): boolean {
  if (condition) {
    if (Error.isError(message)) { throw message; }
    throw new Error(
      "[assertFalse] Assertion failed" + (message ? ": " + message : "")
    );
  }
  return true;
}


/* assertEqual(value1: any, value2: any [, message | error]): true | thrown error */
/* loose equality + NaN equality */
/** @deprecated */
function assertEqual (value1: any, value2: any, message?: any): boolean {
  if (!(value1 == value2 || (value1 !== value1 && value2 !== value2))) {
    if (Error.isError(message)) { throw message; }
    throw new Error(
      "[assertEqual] Assertion failed" + (message ? ": " + message : "")
    );
  }
  return true;
}


/* assertStrictEqual(value1: any, value2: any [, message | error]): true | thrown error */
/* SameValue equality */
/** @deprecated */
function assertStrictEqual (value1: any, value2: any, message?: any): boolean {
  if (!((value1 === value2)
    ? (value1 !== 0 || 1/value1 === 1/value2)
  : (value1 !== value1 && value2 !== value2))) {
    if (Error.isError(message)) { throw message; }
    throw new Error("[assertStrictEqual] Assertion failed"
      + (message ? ": " + message : "")
    );
  }
  return true;
}


/* assertNotEqual(value1: any, value2: any [, message | error]): true | thrown error */
/* loose equality + NaN equality */
/** @deprecated */
function assertNotEqual (value1: any, value2: any, message?: any): boolean {
  if (value1 == value2 || (value1 !== value1 && value2 !== value2)) {
    if (Error.isError(message)) { throw message; }
    throw new Error("[assertNotEqual] Assertion failed"
      + (message ? ": " + message : "")
    );
  }
  return true;
}


/* assertNotStrictEqual(value1: any, value2: any [, message | error]):
  true | thrown error */
/* SameValue equality */
/** @deprecated */
function assertNotStrictEqual (value1: any, value2: any, message?: any): boolean {
  if ((value1 === value2)
    ? (value1 !== 0 || 1/value1 === 1/value2)
    : (value1 !== value1 && value2 !== value2)) {
    if (Error.isError(message)) { throw message; }
    throw new Error("[assertNotStrictEqual] Assertion failed"
      + (message ? ": " + message : "")
    );
  }
  return true;
}


/* assertDeepEqual(value1: any, value2: any [, message | error]): true | thrown error */
/** @deprecated */
function assertDeepEqual (value1: any, value2: any, message?: any): boolean {
  function _isDeepEqual (value1: any, value2: any): boolean {
    /* helper functions */
    /*const _deepType = (value: any): string =>
      (value === null) ? "null" : (value !== value) ? "NaN" : (typeof value);*/
    /*const _isPrimitive = (value: any): boolean =>
      x == null || (typeof value !== "object" && typeof value !== "function");*/
    const _isObject = (value: any): boolean =>
      value != null && typeof value === "object";
    const _isSameInstance = (value1: any, value2: any, Class: Function): boolean =>
      (value1 instanceof Class) && (value2 instanceof Class);
    /*const _classof = (value: any): string =>
      Object.prototype.toString.call(value).slice(8, -1).toLowerCase();*/
    const _ownKeys = (value: object): any[] =>
      [...Object.getOwnPropertyNames(value), ...Object.getOwnPropertySymbols(value)];
    /* strict equality helper function */
    /* const _isEqual = (value1: any, value2: any): boolean => Object.is(value1, value2); */
    /* not strict equality helper function */
    const _isEqual = (value1: any, value2: any): boolean =>
      value1 == value2 || (value1 !== value1 && value2 !== value2);
    /* primitives: Boolean, Number, BigInt, String + Function + Symbol */
    if (_isEqual(value1, value2)) { return true; }
    /* objects */
    if (_isObject(value1) && _isObject(value2)) {
      /* objects / same memory adress */
      if (_isEqual(value1, value2)) { return true; }
      /* objects / WeakMap + WeakSet */
      if (_isSameInstance(value1, value2, WeakMap) || _isSameInstance(value1, value2, WeakSet)) {
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
        return value1.every(
          (value: unknown, index: any): boolean => _isDeepEqual(value, value2[index])
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
        return xTA.every(
          (value: unknown, index: any): boolean => _isEqual(value, yTA[index])
        );
      }
      /* objects / DataView */
      if (_isSameInstance(value1, value2, DataView)) {
        if (value1.byteLength !== value2.byteLength) { return false; }
        if (value1.byteLength === 0) { return true; }
        for (let index = 0; index < value1.byteLength; index++) {
          if (!_isEqual(value1.getUint8(index), value2.getUint8(index))) { return false; }
        }
        return true;
      }
      /* objects / Map */
      if (_isSameInstance(value1, value2, Map)) {
        if (value1.size !== value2.size) { return false; }
        if (value1.size === 0) { return true; }
        return [...value1.keys()].every((value: unknown): boolean =>
          _isDeepEqual(value1.get(value), value2.get(value)));
      }
      /* objects / Set */
      if (_isSameInstance(value1, value2, Set)) {
        if (value1.size !== value2.size) { return false; }
        if (value1.size === 0) { return true; }
        return [...value1.keys()].every((value: unknown): boolean => value2.has(value));
      }
      /* objects / RegExp */
      if (_isSameInstance(value1, value2, RegExp)) {
        return _isEqual(value1.lastIndex, value2.lastIndex)
          && _isEqual(value1.flags, value2.flags)
          && _isEqual(value1.source, value2.source);
      }
      /* objects / Error */
      if (_isSameInstance(value1, value2, Error)) {
        return _isDeepEqual(
          Object.getOwnPropertyNames(value1)
            .reduce((acc: Record<string, any>, k: string): object =>
              { acc[k] = value1[k]; return acc; }, {}
           ),
          Object.getOwnPropertyNames(value2)
            .reduce((acc: Record<string, any>, k: string): object =>
              { acc[k] = value2[k]; return acc; }, {}
            ),
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
        _isDeepEqual(value1[key], value2[key])
      );
    }
    /* default return false */
    return false;
  }
  /* throw error | return true */
  if (!_isDeepEqual(value1, value2)) {
    if (Error.isError(message)) { throw message; }
    throw new Error("[assertDeepEqual] Assertion failed"
      + (message ? ": " + message : "")
    );
  }
  return true;
}


/* assertNotDeepStrictEqual(value1: any, value2: any [, message | error]):
  true | throw error */
/** @deprecated */
function assertNotDeepStrictEqual (
  value1: any,
  value2: any,
  message?: any): boolean {
  function _isDeepStrictEqual (value1: any, value2: any): boolean {
    /* helper functions */
    const _deepType = (value: any): string =>
      (value === null) ? "null" : (value !== value) ? "NaN" : (typeof value);
    const _isPrimitive = (value: any): boolean =>
      value == null
        || (typeof value !== "object" && typeof value !== "function");
    const _isObject = (value: any): boolean =>
      (value != null && typeof value === "object");
    const _isSameInstance = (value1: any, value2: any, Class: Function): boolean =>
      (value1 instanceof Class) && (value2 instanceof Class);
    const _classof = (value: any): string =>
      Object.prototype.toString.call(value).slice(8, -1).toLowerCase();
     const _ownKeys = (value: object): any[] =>
      [...Object.getOwnPropertyNames(value), ...Object.getOwnPropertySymbols(value)];
    /* strict equality helper function */
    const _isEqual = (value1: any, value2: any): boolean =>
      Object.is(value1, value2);
    /* not strict equality helper function */
    /* const _isEqual = (value1, value2): boolean =>
      (value1 == value2 || (value1 !== value1 && value2 !== value2)); */
    /* primitives: Boolean, Number, BigInt, String + Function + Symbol */
    if (_isEqual(value1, value2)) { return true; }
    /* Object Wrappers (Boolean, Number, BigInt, String) */
    if (_isObject(value1)
      && _isPrimitive(value2) && _classof(value1) === typeof value2) {
      return _isEqual(value1.valueOf(), value2);
    }
    if (_isPrimitive(value1)
      && _isObject(value2) && typeof value1 === _classof(value2)) {
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
        return value1.every(
          (value: unknown, index: any): boolean =>
            _isDeepStrictEqual(value, value2[index])
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
          (value: unknown, index: any): boolean =>
            _isEqual(value, value2[index])
        );
      }
      /* objects / ArrayBuffer */
      if (_isSameInstance(value1, value2, ArrayBuffer)) {
        if (value1.byteLength !== value2.byteLength) { return false; }
        if (value1.byteLength === 0) { return true; }
        let xTA = new Int8Array(value1), yTA = new Int8Array(value2);
        return xTA.every(
          (value: unknown, index: any): boolean => _isEqual(value, yTA[index])
        );
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
          _isDeepStrictEqual(value1.get(value), value2.get(value)));
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
        return _isDeepStrictEqual(
          Object.getOwnPropertyNames(value1)
            .reduce(
              (acc: any, k: any): object => { acc[k] = value1[k]; return acc; },
            {}),
          Object.getOwnPropertyNames(value2)
            .reduce(
              (acc: any, k: any): object => { acc[k] = value2[k]; return acc; },
            {})
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
      return value1Keys.every(
        (key: any): boolean => _isDeepStrictEqual(value1[key], value2[key])
      );
    }
    /* default return false */
    return false;
  }
  /* throw error | return true */
  if (_isDeepStrictEqual(value1, value2)) {
    if (Error.isError(message)) { throw message; }
    throw new Error("[assertNotDeepStrictEqual] Assertion failed"
      + (message ? ": " + message : "")
    );
  }
  return true;
}


/* assertNotDeepEqual(value1: any, value2: any [, message | error]):
  true | thrown error */
/** @deprecated */
function assertNotDeepEqual (
  value1: any,
  value2: any,
  message?: any): boolean {
  function _isDeepEqual (value1: any, value2: any): boolean {
    /* helper functions */
    /*const _deepType = (value: any): string =>
      (value === null) ? "null" : (value !== value) ? "NaN" : (typeof value);*/
    /*const _isPrimitive = (value: any): boolean =>
      x == null || (typeof value !== "object" && typeof value !== "function");*/
    const _isObject = (value: any): boolean =>
      (value != null && typeof value === "object");
    const _isSameInstance = (value1: any, value2: any, Class: Function): boolean =>
      (value1 instanceof Class) && (value2 instanceof Class);
    /*const _classof = (value: any): string =>
      Object.prototype.toString.call(value).slice(8, -1).toLowerCase();*/
    const _ownKeys = (value: object): any[] =>
      [...Object.getOwnPropertyNames(value), ...Object.getOwnPropertySymbols(value)];
    /* strict equality helper function */
    /* const _isEqual = (value1, value2): boolean => Object.is(value1, value2); */
    /* not strict equality helper function */
    const _isEqual = (value1: any, value2: any): boolean =>
      (value1 == value2 || (value1 !== value1 && value2 !== value2));
    /* primitives: Boolean, Number, BigInt, String + Function + Symbol */
    if (_isEqual(value1, value2)) { return true; }
    /* objects */
    if (_isObject(value1) && _isObject(value2)) {
      /* objects / same memory adress */
      if (_isEqual(value1, value2)) { return true; }
      /* objects / WeakMap + WeakSet */
      if (_isSameInstance(value1, value2, WeakMap) || _isSameInstance(value1, value2, WeakSet)) {
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
          _isDeepEqual(value, value2[index])
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
        return xTA.every(
          (value: unknown, index: any): boolean => _isEqual(value, yTA[index])
        );
      }
      /* objects / DataView */
      if (_isSameInstance(value1, value2, DataView)) {
        if (value1.byteLength !== value2.byteLength) { return false; }
        if (value1.byteLength === 0) { return true; }
        for (let index = 0; index < value1.byteLength; index++) {
          if (!_isEqual(value1.getUint8(index), value2.getUint8(index))) { return false; }
        }
        return true;
      }
      /* objects / Map */
      if (_isSameInstance(value1, value2, Map)) {
        if (value1.size !== value2.size) { return false; }
        if (value1.size === 0) { return true; }
        return [...value1.keys()].every((value: unknown): boolean =>
          _isDeepEqual(value1.get(value), value2.get(value)));
      }
      /* objects / Set */
      if (_isSameInstance(value1, value2, Set)) {
        if (value1.size !== value2.size) { return false; }
        if (value1.size === 0) { return true; }
        return [...value1.keys()].every((value: unknown): boolean => value2.has(value));
      }
      /* objects / RegExp */
      if (_isSameInstance(value1, value2, RegExp)) {
        return _isEqual(value1.lastIndex, value2.lastIndex)
          && _isEqual(value1.flags, value2.flags)
          && _isEqual(value1.source, value2.source);
      }
      /* objects / Error */
      if (_isSameInstance(value1, value2, Error)) {
        return _isDeepEqual(
          Object.getOwnPropertyNames(value1)
            .reduce(
              (acc: any, k: any): object => { acc[k] = value1[k]; return acc; },
            {}),
          Object.getOwnPropertyNames(value2)
            .reduce(
              (acc: any, k: any): object => { acc[k] = value2[k]; return acc; },
            {}),
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
        _isDeepEqual(value1[key], value2[key])
      );
    }
    /* default return false */
    return false;
  }
  /* throw error | return true */
  if (_isDeepEqual(value1, value2)) {
    if (Error.isError(message)) { throw message; }
    throw new Error("[assertNotDeepEqual] Assertion failed"
      + (message ? ": " + message : "")
    );
  }
  return true;
}


/* assertDeepStrictEqual(value1: any, value2: any [, message | error]):
  true | thrown error */
/** @deprecated */
function assertDeepStrictEqual (
  value1: any,
  value2: any,
  message?: any): boolean {
  function _isDeepStrictEqual (value1: any, value2: any): boolean {
    /* helper functions */
    const _deepType = (value: any): string =>
      (value === null) ? "null" : (value !== value) ? "NaN" : (typeof value);
    const _isPrimitive = (value: any): boolean =>
      (value == null || (typeof value !== "object" && typeof value !== "function"));
    const _isObject = (value: any): boolean =>
      (value != null && typeof value === "object");
    const _isSameInstance = (
      value1: any,
      value2: any,
      Class: Function): boolean =>
      (value1 instanceof Class) && (value2 instanceof Class);
    const _classof = (value: any): string =>
      Object.prototype.toString.call(value).slice(8, -1).toLowerCase();
    const _ownKeys = (value: object): any[] =>
      [...Object.getOwnPropertyNames(value), ...Object.getOwnPropertySymbols(value)];
    /* strict equality helper function */
    const _isEqual = (value1: any, value2: any): boolean =>
      Object.is(value1, value2);
    /* not strict equality helper function */
    /* const _isEqual = (value1, value2): boolean =>
      value1 == value2 || (value1 !== value1 && value2 !== value2); */
    /* primitives: Boolean, Number, BigInt, String + Function + Symbol */
    if (_isEqual(value1, value2)) { return true; }
    /* Object Wrappers (Boolean, Number, BigInt, String) */
    if (_isObject(value1) && _isPrimitive(value2) && _classof(value1) === typeof value2) {
      return _isEqual(value1.valueOf(), value2);
    }
    if (_isPrimitive(value1) && _isObject(value2) && typeof value1 === _classof(value2)) {
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
      if (_isSameInstance(value1, value2, WeakMap) || _isSameInstance(value1, value2, WeakSet)) {
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
        return value1.every(
          (value: unknown, index: any): boolean =>
            _isDeepStrictEqual(value, value2[index])
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
          if (!_isEqual(value1.getUint8(index), value2.getUint8(index))) { return false; }
        }
        return true;
      }
      /* objects / Map */
      if (_isSameInstance(value1, value2, Map)) {
        if (value1.size !== value2.size) { return false; }
        if (value1.size === 0) { return true; }
        return [...value1.keys()].every(
          (value: unknown): boolean =>
            _isDeepStrictEqual(value1.get(value), value2.get(value))
        );
      }
      /* objects / Set */
      if (_isSameInstance(value1, value2, Set)) {
        if (value1.size !== value2.size) { return false; }
        if (value1.size === 0) { return true; }
        return [...value1.keys()].every((value: unknown): boolean => value2.has(value));
      }
      /* objects / RegExp */
      if (_isSameInstance(value1, value2, RegExp)) {
        return _isEqual(value1.lastIndex, value2.lastIndex)
          && _isEqual(value1.flags, value2.flags)
          && _isEqual(value1.source, value2.source);
      }
      /* objects / Error */
      if (_isSameInstance(value1, value2, Error)) {
        return _isDeepStrictEqual(
          Object.getOwnPropertyNames(value1)
            .reduce(
              (acc: any, k: any): object => { acc[k] = value1[k]; return acc; },
            {}),
          Object.getOwnPropertyNames(value2)
            .reduce(
              (acc: any, k: any): object => { acc[k] = value2[k]; return acc; },
            {})
        );
      }
      /* objects / Date */
      if (_isSameInstance(value1, value2, Date)) {
        return _isEqual(+value1, +value2);
      }
      /* objects / Proxy -> not detectable */
      /* objects / Objects */
      let value1Keys: any[] = _ownKeys(value1);
      let yKeys: any[] = _ownKeys(value2);
      if (value1Keys.length !== yKeys.length) { return false; }
      if (value1Keys.length === 0) { return true; }
      return value1Keys.every(
        (key: any): boolean => _isDeepStrictEqual(value1[key], value2[key])
      );
    }
    /* default return false */
    return false;
  }
  /* throw error | return true */
  if (!_isDeepStrictEqual(value1, value2)) {
    if (Error.isError(message)) { throw message; }
    throw new Error("[assertDeepStrictEqual] Assertion failed"
      + (message ? ": " + message : "")
    );
  }
  return true;
}


/** String API **/


/* b64Encode(s: any): string */
function b64Encode (str: any): string {
  return btoa(encodeURIComponent(String(str)).replace(/%([0-9A-F]{2})/g,
    function toSolidBytes (_match, p1): string {
       // @ts-ignore
      return String.fromCharCode("0x" + p1);
    }
  ));
}


/* b64Decode(s: string): string */
function b64Decode (str: any): string {
  return decodeURIComponent(atob(String(str)).split("").map(function (c) {
    return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(""));
}


/* strTruncate(string: string, newLength: integer [, omission: string = ""]):
  string */
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


/* strPropercase(s: any): string */
const strPropercase = (str: any): string =>
  String(str).trim().split(" ").map(function (value: string) {
    let chars = Array.from(value).map( (c: string): string => c.toLowerCase() );
    if (chars.length) { chars[0] = chars[0].toUpperCase(); }
    return chars.join("");
  }).join(" ");


/* strTitlecase(s: any): string */
const strTitlecase = (str: any): string =>
  String(str).trim().split(" ").map(function (value: string) {
    let chars = Array.from(value).map( (c: string): string => c.toLowerCase() );
    if (chars.length) { chars[0] = chars[0].toUpperCase(); }
    return chars.join("");
  }).join(" ");


/* strCapitalize(s: any): string */
function strCapitalize (str: any): string {
  let chars = [...String(str).trim().toLowerCase()];
  if (chars.length) { chars[0] = chars[0].toUpperCase(); }
  return chars.join("");
}


/* strUpFirst(s: any): string */
function strUpFirst (str: any): string {
  let chars = [...String(str).trim()];
  if (chars.length) { chars[0] = chars[0].toUpperCase(); }
  return chars.join("");
}


/* strDownFirst(s: any): string */
function strDownFirst (str: any): string {
  let chars = [...String(str).trim()];
  if (chars.length) { chars[0] = chars[0].toLowerCase(); }
  return chars.join("");
}


/* strReverse(s: any): string */
const strReverse = (str: any): string =>
  Array.from(String(str)).reverse().join("");


/* strCodePoints(s: any): array of strings */
const strCodePoints = (str: any): any[] =>
  Array.from(String(str), (value: string): number | undefined =>
    value.codePointAt(0));


/* strFromCodePoints(iterator: iterator): string */
const strFromCodePoints = ([...array]): string =>
  String.fromCodePoint(...array);


/* strAt(string: string, index: number [, newChar: string]): string */
function strAt (str: string, index: number, newChar?: string): string {
  let chars: string[] = Array.from(String(str));
  if (newChar == null) { return chars.at(index) || ""; }
  index = index < 0 ? chars.length + index : index;
  if (index > chars.length) { return chars.join(""); }
  chars[index] = newChar;
  return chars.join("");
}


/* strSplice(string: string, index: number, count: integer [, add: string]):
  string */
const strSplice = (str: string, index: number,count: number, ...add: any[]): string =>
  Array.from(str).toSpliced(index, count, add.join("")).join("");


/* strHTMLRemoveTags(s: any): string */
const strHTMLRemoveTags = (str: any): string =>
  String(str).trim().replace(/<[^>]*>/g, " ").replace(/\s{2,}/g, " ").trim();


/* strHTMLEscape(str: any): string */
const strHTMLEscape = (str: any): string =>
  String(str).trim()
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");


/* strHTMLUnEscape(s: any): string */
const strHTMLUnEscape = (str: string): string =>
  String(str).trim()
    .replace(/&amp;/g, "&").replace(/&#38;/g, "&")
    .replace(/&lt;/g, "<").replace(/&#60;/g, "<")
    .replace(/&gt;/g, ">").replace(/&#62;/g, ">")
    .replace(/&quot;/g, '"').replace(/&#34;/g, '"')
    .replace(/&apos;/g, "'").replace(/&#39;/g, "'");


/** Type API **/


/* isTypedCollection (
    iter: iterable<any>,
    expectedType: string | Function | Array<string | Function>,
    Throw: boolean = false
  ): boolean | throw TypeError */
function isTypedCollection (
  iter: IterableAndIterator,
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


/* is (
    value: unknown,
    expectedType: string | Function | Array<string | Function> | undefined,
    Throw: boolean = false
  ): string | Function | boolean | throw TypeError */
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


/* toObject(value: unknown): object | symbol | Function | thrown error */
function toObject (value: unknown): Object | symbol | Function {
  if (value == null) {
    throw new TypeError("[toObject] error: " + value);
  }
  return (["object", "function"].includes(typeof value))
    ? value
    : Object(value);
}


/* toPrimitiveValue(value: unknown): primitive | object | symbol | Function */
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
  const replacer = (_key: string, value: unknown): any => {
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


/* isPropertyKey(value: unknown): boolean */
const isPropertyKey = (value: unknown): value is PropertyKey =>
  typeof value === "string" || typeof value === "symbol";


/* toPropertyKey(value: unknown): string | symbol */
const toPropertyKey = (value: unknown): PropertyKey =>
  typeof value === "symbol" ? value : String(value);


/* isIndex(value: unknown): boolean */
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


/* isLength(value: unknown): boolean */
/**
 * Checks if a value is a valid array length (integer between 0 and Number.MAX_SAFE_INTEGER).
 *
 * @param value - The value to check.
 * @returns True if the value is a valid array length, otherwise false.
 */
const isLength = (value: unknown): value is number =>
  Number.isSafeInteger(value)
    && (value as number) >= 0
    && (value as number) <= Number.MAX_SAFE_INTEGER
    && 1 / (value as number) !== 1 / -0;


/* toIndex(value: unknown): unsigned integer */
function toIndex (value: any): number {
  value = ((value = Math.trunc(+value)) !== value || value === 0) ? 0 : value;
  if (value < 0 || value > (Math.pow(2, 53) - 1)) {
    throw new RangeError("toIndex(); RangeError: " + value);
  }
  return value;
}


/* toLength(value: unknown): unsigned integer */
function toLength (value: any): number {
  value = ((value = Math.trunc(+value)) !== value || value === 0) ? 0 : value;
  return Math.min(Math.max(value, 0), Math.pow(2, 53) - 1);
}


/* typeOf(value: unknown): string */
/**
 * Extended typeof operator with "null" type as string.
 *
 * @param {unknown} value
 * @returns string
 */
const typeOf = (value: unknown): TypeOfTag =>
  value === null ? "null" : typeof value;


/* isSameType(value1: any, value2: any): boolean */
const isSameType = (value1: any, value2: any): boolean =>
  (value1 == null || value2 == null)
    ? (value1 === value2)
    : (typeof value1 === typeof value2);


/* isSameInstance(value1: any, value2: any, Contructor: function): boolean */
const isSameInstance = (value1: any, value2: any, Contructor: Function): boolean =>
  value1 instanceof Contructor && value2 instanceof Contructor;


/* comment * @internal */
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


/* isDeepStrictEqual(value1: any, value2: any): boolean */
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
      [...Object.getOwnPropertyNames(value), ...Object.getOwnPropertySymbols(value)];
  /* strict equality helper function */
  const _isEqual = (value1: any, value2: any): boolean =>
    Object.is(value1, value2);
  /* not strict equality helper function */
  /* const _isEqual = (value1, value2): boolean =>
    value1 == value1 || (value1 !== value1 && value2 !== value2); */
  /* primitives: Boolean, Number, BigInt, String + Function + Symbol */
  if (_isEqual(value1, value2)) { return true; }
  /* Object Wrappers (Boolean, Number, BigInt, String) */
  if (_isObject(value1) && _isPrimitive(value2) && _classof(value1) === typeof value2) {
    return _isEqual(value1.valueOf(), value2);
  }
  if (_isPrimitive(value1) && _isObject(value2) && typeof value1 === _classof(value2)) {
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
      return value1.every((value: unknown, index: any): boolean =>
        _isEqual(value, value2[index]));
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
      return [...value1.keys()].every((value: unknown): boolean =>
        value2.has(value));
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
          .reduce((acc: any, k: any): object => { acc[k] = value1[k]; return acc; }, {}),
        Object.getOwnPropertyNames(value2)
          .reduce((acc: any, k: any): object => { acc[k] = value2[k]; return acc; }, {})
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
      isDeepStrictEqual(value1[key], value2[key])
    );
  }
  /* default return false */
  return false;
}


/* isEmptyValue(value: unknown): boolean */
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
  function _isTypedArray (value: any): boolean {
    const constructors = [
      Int8Array, Uint8Array, Uint8ClampedArray,
      Int16Array, Uint16Array,
      Int32Array, Uint32Array,
      Float32Array, Float64Array,
      BigInt64Array, BigUint64Array];
    if ("Float16Array" in globalThis) {
      constructors.push((globalThis as any).Float16Array);
    }
    return constructors.some((Class): boolean => value instanceof Class);
  }
  /* Check undefined, null, NaN */
  if (value == null || Number.isNaN(value)) { return true; }
  /* Check Array, TypedArrays, string, String */
  if (Array.isArray(value)
    || _isTypedArray(value)
    || typeof value === "string"
    || value instanceof String) {
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


/* isProxy(value: unknown): boolean */
const isProxy = (value: any): boolean =>
  Boolean(value != null && value.__isProxy);


/* isAsyncGeneratorFn(value: unknown): boolean */
const isAsyncGeneratorFn = (value: unknown): boolean =>
  Object.getPrototypeOf(value).constructor ===
    Object.getPrototypeOf(async function*() {}).constructor;


/* isClass(value: unknown): boolean */
/** @deprecated */
const isClass = (value: unknown): boolean =>
  typeof value === "function" && typeof value.prototype === "object";


/* isPlainObject(value: unknown): boolean */
const isPlainObject = (value: unknown): boolean =>
  value != null
    && typeof value === "object"
    && (Object.getPrototypeOf(value) === Object.prototype
      || Object.getPrototypeOf(value) === null);


/* isChar(value: unknown): boolean */
const isChar = (value: unknown): boolean =>
  typeof value === "string"
    && (value.length === 1 || Array.from(value).length === 1);


/* isNumeric(value: unknown): boolean */
const isNumeric = (value: any): boolean =>
  ((typeof value === "number" || typeof value === "bigint") && value === value)
    ? true : (!isNaN(parseFloat(value)) && isFinite(value));


/* isObject(value: unknown): boolean */
/**
 * @description Checks if the given value is an object.
 *
 * @param {unknown} value - The value to check.
 * @returns True if the value is a object, false otherwise.
 */
const isObject = (value: unknown): value is object =>
  value != null && (typeof value === "object" || typeof value === "function");


/* isFunction(value: unknown): boolean */
/**
 * @description Checks if the given value is a Function.
 *
 * @param {unknown} value - The value to check.
 * @returns True if the value is a function, false otherwise.
 */
const isFunction = (value: unknown): value is Function =>
  typeof value === "function";


/* isCallable(value: unknown): boolean */
const isCallable = (value: any): boolean =>
  (value != null && ["object", "function"].includes(typeof value))
    ? (typeof value.call === "function")
    : false;


/* isArraylike(value: unknown): boolean */
/**
 * @description Checks if a value is an arraylike object.
 *
 * @param {unknown} value The value to check.
 * @returns boolean
 */
function isArraylike (value: unknown): value is ArrayLike {
  if (value == null
    || (typeof value !== "object" && typeof value !== "string")) {
    return false;
  }
  const maybe = value as { length?: unknown };
  if (typeof maybe.length !== "number") { return false; }
  const len: number = maybe.length;
  return len >= 0 && Number.isFinite(len);
}


/* isNull(value: unknown): boolean */
/**
 * @description Checks if the given value is null.
 *
 * @param {unknown} value - The value to check.
 * @returns True if the value is null, false otherwise.
 */
const isNull = (value: unknown): value is null => value === null;


/* isUndefined(value: unknown): boolean */
/**
 * @description Checks if the given value is undefined.
 *
 * @param {unknown} value - The value to check.
 * @returns True If the value is undefined, false otherwise.
 */
const isUndefined = (value: unknown): value is undefined =>
  value === undefined;


/* isNullish(value: unknown): boolean */
/**
 * @description Checks if the given value is Nullish (null or undefined).
 * From MDN: The values null and undefined are nullish.
 *
 * @param {unknown} value - The value to check.
 * @returns True if the value is a Nullish, false otherwise.
 */
const isNullish = (value: unknown): value is Nullish => value == null;


/* isPrimitive(value: unknown): boolean */
/**
 * @description Checks if the given value is Primitive.
 *
 * @param {unknown} value - The value to check.
 * @returns True if the value is Primitive, false otherwise.
 */
const isPrimitive = (value: unknown): value is Primitive =>
  value == null || (typeof value !== "object" && typeof value !== "function");


/* isIterator(value: unknown): boolean */
/**
 * Tests whether a value is an Iterator.
 *
 * @param {unknown} value The value to check.
 * @return {boolean} Return true if value is an Iterator, false if not.
 * @internal
 */
const isIterator = (value: unknown): value is Iterator<any> =>
  "Iterator" in globalThis
    ? value instanceof Iterator
    : (value != null && typeof value === "object"
        && typeof (value as any).next === "function");


/* isRegexp(value: unknown): boolean */
const isRegexp = (value: unknown): value is RegExp => value instanceof RegExp;


/* isElement(value: unknown): boolean */
const isElement = (value: any): boolean =>
  value != null && typeof value === "object" && value.nodeType === 1;


/* isIterable(value: unknown): boolean */
/**
 * Tests whether a value is an Iterable.
 *
 * @param {unknown} value The value to check.
 * @return {boolean} Return true if value is an Iterable, false if not.
 * @internal
 */
const isIterable = (value: unknown): value is Iterable<any> =>
  value != null && typeof (value as any)[Symbol.iterator] === "function";


/* isAsyncIterable(value: unknown): boolean */
const isAsyncIterable = (value: unknown): boolean =>
  value != null && typeof (value as any)[Symbol.asyncIterator] === "function";


/* isTypedArray(value: unknown): boolean */
/**
 * @description Checks if the given value is a TypedArray (Int8Array, etc.).
 *
 * @param {unknown} value - The value to check.
 * @returns True if the value is a TypedArray, false otherwise.
 */
function isTypedArray (value: unknown): value is TypedArray {
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


/* isGeneratorFn(value: unknown): boolean */
const isGeneratorFn = (value: unknown): boolean =>
  Object.getPrototypeOf(value).constructor ===
    Object.getPrototypeOf(function*(){}).constructor;


/* isAsyncFn(value: unknown): boolean */
const isAsyncFn = (value: unknown): boolean =>
  Object.getPrototypeOf(value).constructor ===
    Object.getPrototypeOf(async function(){}).constructor;


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
const compact = (iter: IterableAndIteratorAndArrayLike): any[] =>
  Array.from(iter as Iterable<any> | ArrayLike).filter(
    (value: unknown): boolean => Boolean(value) || value === 0
  );


/* unique(iterator: iterator [, resolver: string | Function]): array */
function unique (
  iter: IterableAndIterator,
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


/* count(iterator, callback: function): integer */
function count (iter: IterableAndIterator, fn: Function): number {
  let index: number = 0;
  let result: number = 0;
  for (let item of iter as Iterable<any>) {
    if (fn(item, index++)) { result++; }
  }
  return result;
}


/* arrayDeepClone(array: array): array */
function arrayDeepClone ([...array]): any[] {
  const _ADC = (value: unknown): any =>
    Array.isArray(value) ? Array.from(value, _ADC) : value;
  return _ADC(array);
}


/* initial(iterator: iterator): array */
const initial = ([...array]): any[] => array.slice(0, -1);


/* shuffle(iterator: iterator): array */
function shuffle([...array]): any[] {
  for (let index = array.length - 1; index > 0; index--) {
    let pos = Math.floor(Math.random() * (index + 1));
    [array[index], array[pos]] = [array[pos], array[index]];
  }
  return array;
}


/* partition(iterator: iterator, callback: function): array */
const partition = ([...array], fn: Function): any[] =>
   // @ts-ignore
  [array.filter(fn), array.filter((value, index, a): boolean => !(fn(value, index, a)))];


/* setUnion(iterator1: iterator [, iteratorN: iterator]): set */
const setUnion = (...args: any[]): Set<any> =>
  new Set(args.map(([...item]): any => item).flat());


/* setIntersection(set1: set, set2: set): set */
const setIntersection = ([...array], b: Set<any>): Set<any> =>
  new Set(array.filter((value: unknown): boolean => b.has(value)));


/* setDifference(set1: set, set2: set): set */
const setDifference = ([...array], b: Set<any>): Set<any> =>
  new Set(array.filter((value: unknown): boolean => !(b.has(value))));


/* setSymmetricDifference(set1: set, set2: set): set */
const setSymmetricDifference = (array: Set<any>, b: Set<any>): Set<any> =>
  new Set(
    [...array].filter((value: unknown): boolean =>
      !(b.has(value))).concat([...b]
        .filter((value: unknown): boolean => !(array.has(value))))
  );


/* isSuperset(superCollection: iterator, subCollection: iterator): boolean */
const isSuperset = ([...superSet], [...subSet]): boolean =>
  subSet.every((value: unknown): boolean => superSet.includes(value));


/* min(value1: any [, valueN]): any */
const min = (...args: any[]): any =>
  args.reduce(
    (acc: any, value: any): any => (value < acc ? value : acc),
    args[0]
  );


/* max(value1: any [, valueN]): any */
const max = (...args: any[]): any =>
  args.reduce((acc: any, value: any): any =>
    (value > acc ? value : acc),
    args[0]
  );


/* arrayRepeat(value: unknown [, num = 100]): array */
const arrayRepeat = (value: unknown, num: number = 100): any[] =>
  Array(num).fill(value);


/* arrayCycle(iterator: iterator [, num: integer = 100]): array */
const arrayCycle = ([...array], num: number = 100): any[] =>
  Array(num).fill(array).flat();


/* arrayRange([ start = 0 [, end = 99 [, step = 1]]]): array */
const arrayRange = (
  start: number = 0,
  end: number = 99,
  step: number = 1): any[] =>
  Array.from(
    {length: (end - start) / step + 1},
    (_v, i: number): number => start + (i * step)
  );


/* zip(iterator1: iterator [, iteratorN: iterator]): array */
function zip (...args: any[]): any[] {
  args = args.map((value: IterableAndIterator): any =>
    Array.from(value as Iterable<any>));
  return Array.from({length: Math.min(...args.map(v => v.length))})
    .map((_, i: number): any[] => args.map(v => v[i]));
}


/* unzip(iterator: iterator): array */
const unzip = ([...array]): any[] =>
  array.map((iter: IterableAndIterator): any[] => Array.from(iter as Iterable<any>))
    .reduce((acc, value): any[] => {
      value.forEach((item, index): void => {
        if (!Array.isArray(acc[index])) { acc[index] = []; }
        acc[index].push(item);
      });
      return acc;
    }, []);


/* zipObj(iterator1: iterator, iterator2: iterator): object */
function zipObj (
  [...array1],
  [...array2]): MapLike {
  let result: MapLike = {};
  let length: number = Math.min(array1.length, array2.length);
  for (let index = 0; index < length; index++) {
    result[array1[index]] = array2[index];
  }
  return result;
}

/* arrayAdd(array: array, value: unknown): boolean */
const arrayAdd = (array: any[], value: unknown): boolean =>
  (!array.includes(value)) ? !!array.push(value) : false;


/* arrayClear(array: array): array */
function arrayClear (array: any[]): any[] {
  array.length = 0;
  return array;
}


//* arrayRemove(array: array, value: unknown [, all: boolean = false]): boolean */
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


/* arrayRemoveBy(array: array, callback: function [, all: boolean = false]):
  boolean */
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


/* arrayMerge(target: array, source1: any [, sourceN: any]): array */
function arrayMerge (target: any[], ...sources: any[]): any[] {
  target.push(... [].concat(...sources) );
  return target;
}


/* iterRange([start: number = 0 [,step: number = 1
  [, end: number = Infinity]]]): iterator */
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


/* iterCycle(iterator: iterator [, num = Infinity]): iterator */
function* iterCycle ([...array], num: number = Infinity): IteratorReturn {
  let index: number = 0;
  while (index < num) {
    yield* array;
    index++;
  }
}


/* iterRepeat(value: unknown [, num: number = Infinity]): iterator */
function* iterRepeat (value: unknown, num: number = Infinity): IteratorReturn {
  let index: number = 0;
  while (index < num) {
    yield value;
    index++;
  }
}


/* takeWhile(iterator: iterator, callback: function): iterator */
function* takeWhile (
  iter: IterableAndIterator,
  fn: Function): IteratorReturn {
  for (let item of iter as Iterable<any>) {
    if (!fn(item)) { break; }
    yield item;
  }
}


/* dropWhile(iterator: iterator, callback: function): iterator */
function* dropWhile (
  iter: IterableAndIterator,
  fn: Function): IteratorReturn {
  let dropping: boolean = true;
  for (let item of iter as Iterable<any>) {
    if (dropping && !fn(item)) { dropping = false; }
    if (!dropping) { yield item; }
  }
}


/* take(iterator: iterator [, num: number = 1]): iterator */
function* take (iter: IterableAndIterator, num: number = 1): IteratorReturn {
  let index: number = num;
  for (let item of iter as Iterable<any>) {
    if (index <= 0) { break; }
    yield item;
    index--;
  }
}


/* drop(iterator: iterator [, num: number =1 ]): iterator */
function* drop (iter: IterableAndIterator, num: number = 1): IteratorReturn {
  let index: number = num;
  for (let item of iter as Iterable<any>) {
    if (index < 1) {
      yield item;
    } else {
      index--;
    }
  }
}


/* forEach(iterator: iterator, callback: function): undefined */
function forEach (iter: IterableAndIterator, fn: Function): void {
  let index: number = 0;
  for (let item of iter as Iterable<any>) { fn(item, index++); }
}


/* forEachRight(iterator: iterator, callback: function): undefined */
function forEachRight ([...array], fn: Function): void {
  let index: number = array.length;
  while (index--) { fn(array[index], index); }
}


/* map(iterator: iterator, callback: function): iterator */
function* map (iter: IterableAndIterator, fn: Function): IteratorReturn {
  let index: number = 0;
  for (let item of iter as Iterable<any>) { yield fn(item, index++); }
}


/* filter(iterator: iterator, callback: function): iterator */
function* filter (iter: IterableAndIterator, fn: Function): IteratorReturn {
  let index: number = 0;
  for (let item of iter as Iterable<any>) {
    if (fn(item, index++)) { yield item; }
  }
}


/* reject(iterator: iterator, callback: function): iterator */
function* reject (iter: IterableAndIterator, fn: Function): IteratorReturn {
  let index: number = 0;
  for (let item of iter as Iterable<any>) {
    if (!fn(item, index++)) { yield item; }
  }
}


/* slice(iterator: iterator [, begin: number = 0 [, end: number = Infinity]]):
  iterator */
function* slice (
  iter: IterableAndIterator,
  begin: number = 0,
  end: number = Infinity): IteratorReturn {
  let index: number = 0;
  for (let item of iter as Iterable<any>) {
    if (index >= begin && index <= end) {
      yield item;
    } else if (index > end) {
      return;
    }
    index++;
  }
}


/* tail(iterator: iterator): iterator */
function* tail (iter: IterableAndIterator): IteratorReturn {
  let first: boolean = true;
  for (let item of iter as Iterable<any>) {
    if (!first) {
      yield item;
    } else {
      first = false;
    }
  }
}


/* item(iterator: iterator, index: integer): any */
function item (iter: IterableAndIterator, pos: number): any {
  let i: number = 0;
  for (let item of iter as Iterable<any>) {
    if (i++ === pos) { return item; }
  }
}


/* nth(iterator: iterator, index: integer): any */
function nth (iter: IterableAndIterator, pos: number): any {
  let i: number = 0;
  for (let item of iter as Iterable<any>) {
    if (i++ === pos) { return item; }
  }
}


/* size(iterator: iterator): integer */
/**
 * @description Return the size of the given value.
 *
 * @param {unknown} value - The value to check.
 * @returns {number} The size of the given value.
 */
function size (value: any): number {
  if (typeof value.size === "number") { return value.size; }
  let index: number = 0;
  for (let _item of value as Iterable<any>) { index++; }
  return index;
}


/* first(iterator: iterator): any */
function first (iter: IterableAndIterator): any {
  for (let item of iter as Iterable<any>) { return item; }
}


/* head(iterator: iterator): any */
function head (iter: IterableAndIterator): any {
  for (let item of iter as Iterable<any>) { return item; }
}


/* last(iterator: iterator): any */
const last = ([...array]): any => array[array.length - 1];


/* reverse(iterator: iterator): iterator */
function* reverse ([...array]): IteratorReturn {
  let index: number = array.length;
  while (index--) { yield array[index]; }
}


/* sort(iterator: iterator [, numbers = false]): array */
const sort = ([...array], numbers: boolean = false): any[] =>
  array.sort(
    numbers ? (value1: number, value2: number): number => value1 - value2 : undefined
  );


/* includes (collection: any, value: unknown, comparator: undefined | Function):
  boolean */
/**
 * @param {any} collection - The collection to search through.
 * @param {any} value - The value to look for.
 * @param {undefined | Function} [comparator] - Optional comparator for equality check.
 * @return {boolean} - Whether the value was found.
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


/* find(iterator: iterator, callback: function): any */
function find (iter: IterableAndIterator, fn: Function): any {
  let index: number = 0;
  for (let item of iter as Iterable<any>) {
    if (fn(item, index++)) { return item; }
  }
}


/* findLast(iterator: iterator, callback: function): any */
function findLast (
  iter: IterableAndIterator,
  fn: Function): any {
  let index: number = 0;
  let result: any;
  for (let item of iter as Iterable<any>) {
    if (fn(item, index++)) { result = item; }
  }
  return result;
}


/* every(iterator: iterator, callback: function): boolean */
function every (iter: IterableAndIterator, fn: Function): boolean {
  let index: number = 0;
  for (let item of iter as Iterable<any>) {
    if (!fn(item, index++)) { return false; }
  }
  if (index === 0) { return false; }
  return true;
}


/* some(iterator: iterator, callback: function): boolean */
function some (iter: IterableAndIterator, fn: Function): boolean {
  let index: number = 0;
  for (let item of iter as Iterable<any>) {
    if (fn(item, index++)) { return true; }
  }
  return false;
}


/* none(iterator: iterator, callback: function): boolean */
function none (iter: IterableAndIterator, fn: Function): boolean {
  let index: number = 0;
  for (let item of iter as Iterable<any>) {
    if (fn(item, index++)) { return false; }
  }
  if (index === 0) { return false; }
  return true;
}


/* takeRight(iterator: iterator [, num: number = 1]): array */
const takeRight = ([...array], num: number = 1): any[] =>
  array.reverse().slice(0, num);


/* takeRightWhile(iterator: iterator, callback: function): iterator */
function* takeRightWhile ([...array], fn: Function): IteratorReturn {
  let index: number = 0;
  for (let item of array.reverse()) {
    if (fn(item, index++)) {
      yield item;
    } else {
      break;
    }
  }
}


/* dropRight(iterator: iterator [, num: number = 1]): array */
const dropRight = ([...array], num: number = 1): any[] =>
  array.reverse().slice(num);


/* dropRightWhile(iterator: iterator, callback: function): iterator */
function* dropRightWhile ([...array], fn: Function): IteratorReturn {
  let dropping: boolean = true;
  let index: number = 0;
  for (let item of array.reverse()) {
    if (dropping && !fn(item, index++)) { dropping = false; }
    if (!dropping) { yield item; }
  }
}


/* concat(iterator1: iterator [, iteratorN]: iterator): iterator */
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


/* reduce(iterator: iterator, callback: function [, initialvalue: any]): any */
function reduce (
  iter: IterableAndIterator,
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


/* enumerate(iterator: iterator [, offset = 0]): iterator */
function* enumerate (
  iter: IterableAndIterator,
  offset: number = 0): IteratorReturn {
  let index: number = offset;
  for (let item of iter as Iterable<any>) { yield [index++, item]; }
}


/* flat(iterator: iterator): iterator */
function* flat (iter: IterableAndIterator): IteratorReturn {
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


/* join(iterator: iterator [, separator = ","]): string */
function join (
  iter: IterableAndIterator,
  separator: string = ","): string {
  separator = String(separator);
  let result: string = "";
  for (let item of iter as Iterable<any>) { result += separator + item; }
  return result.slice(separator.length);
}


/* withOut(iterator: iterator, filterIterator: iterator): array */
const withOut = ([...array], [...filterValues]): any[] =>
  array.filter((value: unknown): boolean => !filterValues.includes(value));


/** Math API **/


/* function mod(dividend: number | bigint, divisor: number | bigint): number | bigint; */
/**
 * @description Performs integer division type safely. Works for both `number` and `bigint` values.
 * `dividend / divisor = quotient + remainder`
 *
 * @throws {TypeError} If types mismatch.
 * @throws {TypeError} If arguments are not both `number` or both `bigint`.
 * @throws {RangeError} If divisor is zero.
 * @returns {number | bigint} The result of the integer division.
 */
function mod(dividend: number, divisor: number): number;
function mod(dividend: bigint, divisor: bigint): bigint;
function mod(dividend: NumberLike, divisor: NumberLike): NumberLike {
  const dividendType = typeof dividend;
  /* Ensure both are the same primitive type */
  if (dividendType !== typeof divisor) {
    throw new TypeError(
      "[mod] divisor and dividend must be the same type (both number or both bigint)"
    );
  }
  /* Ensure both are number or bigint */
  if (dividendType !== "number" && dividendType !== "bigint") {
    throw new TypeError(
      "[mod] divisor and dividend must be either both number or both bigint"
    );
  }
  // Handle division by zero safely
  if ((dividendType === "number" && divisor === 0)
    || (dividendType === "bigint" && divisor === 0n)) {
    throw new RangeError("[mod] divisor must not be zero");
  }
  /* Perform integer division depending on type */
  return dividendType === "number"
    ? Math.trunc((dividend as number) / (divisor as number))
    /* bigint division automatically truncates */
    : (dividend as bigint) / (divisor as bigint);
}


/* function rem(dividend: number | bigint, divisor: number | bigint): number | bigint; */
/**
 * @description Computes the integer remainder (modulus) type safely. Works for both `number` and `bigint` values.
 * `dividend = divisor * quotient + remainder`
 *
 * @throws {TypeError} If types mismatch.
 * @throws {TypeError} If arguments are not both `number` or both `bigint`.
 * @throws {RangeError} If divisor is zero.
 * @returns {number | bigint} The remainder of the integer division.
 */
function rem(dividend: number, divisor: number): number;
function rem(dividend: bigint, divisor: bigint): bigint;
function rem(dividend: NumberLike, divisor: NumberLike): NumberLike {
  const dividendType = typeof dividend;
  /* Ensure both are the same primitive type */
  if (dividendType !== typeof divisor) {
    throw new TypeError(
      "[rem] divisor and dividend must be the same type (both number or both bigint)"
    );
  }
  /* Ensure both are number or bigint */
  if (dividendType !== "number" && dividendType !== "bigint") {
    throw new TypeError(
      "[rem] divisor and dividend must be either both number or both bigint"
    );
  }
  // Handle division by zero safely
  if ((dividendType === "number" && divisor === 0)
    || (dividendType === "bigint" && divisor === 0n)) {
    throw new RangeError("[rem] divisor must not be zero");
  }
  /* Perform remainder operation depending on type */
  return dividendType === "number"
    ? (dividend as number) % (divisor as number)
    : (dividend as bigint) % (divisor as bigint);
}


/* isFloat(value: unknown): boolean */
const isFloat = (value: unknown): boolean =>
  typeof value === "number" && value === value && !!(value % 1);


/* toInteger(value: unknown): integer */
function toInteger (value: any): number {
  value = ((value = Math.trunc(Number(value))) !== value || value === 0) ? 0 : value;
  return Math.min(Math.max(value, -(Math.pow(2, 53) - 1)), Math.pow(2, 53) - 1);
}


/* toIntegerOrInfinity(value: unknown): integer | Infinity | -Infinity */
const toIntegerOrInfinity = (value: unknown): number =>
  ((value = Math.trunc(Number(value))) !== value || value === 0) ? 0 : value as number;


/* sum(value1: any [, valueN]: any): any */
const sum = (...args: any[]): any =>
  args.every((value: unknown): boolean => typeof value === "number") ?
    // @ts-ignore
    Math.sumPrecise(args) : args.slice(1).reduce(
      (acc: any, value: any): any => acc + value, args[0]
    );


/* avg(value1: number [, valueN: number]): number */
// @ts-ignore
const avg = (...args: number[]): number =>
   // @ts-ignore
  Math.sumPrecise(args) / args.length;


/* product(value1: number [, valueN: number]): number */
const product = (first: number, ...args: number[]): number =>
  args.reduce((acc: number, v: number): number => acc * v, first);


/* clamp(value: unknown, min: any, max: any): number */
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


/* minmax(value: unknown, min: any, max: any): number */
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


/* isEven(value: number): boolean */
function isEven (value: number): boolean {
  let result: number = value % 2;
  if (result === result) { return result === 0; }
  return false;
}


/* isOdd(value: number): boolean */
function isOdd (value: number): boolean {
  let result: number = value % 2;
  if (result === result) { return result !== 0; }
  return false;
}


/* toInt8(value: unknown): integer -127..128 */
const toInt8 = (value: unknown): number =>
  ((value = Math.min(Math.max(-128, Math.trunc(Number(value))), 127)) === value)
    ? value as number : 0;


/* toUInt8(value: unknown): integer 0..255 */
const toUInt8 = (value: unknown): number =>
  ((value = Math.min(Math.max(0, Math.trunc(Number(value))), 255)) === value)
    ? value as number : 0;


/* toInt16(value: unknown): integer -32768..32767 */
const toInt16 = (value: unknown): number =>
  ((value = Math.min(Math.max(-32768, Math.trunc(Number(value))), 32767))
    === value) ? value as number : 0;


/* toUInt16(value: unknown) integer 0..65535 */
const toUInt16 = (value: unknown): number =>
  ((value = Math.min(Math.max(0, Math.trunc(Number(value))), 65535)) === value)
    ? value as number : 0;


/* toInt32(value: unknown): integer -2147483648..2147483647 */
const toInt32 = (value: unknown): number =>
  ((value = Math.min(Math.max(-2147483648, Math.trunc(Number(value))),
    2147483647)) === value) ? value as number : 0;


/* toUInt32(value: unknown): integer 0..4294967295 */
const toUInt32 = (value: unknown): number =>
  ((value = Math.min(Math.max(0, Math.trunc(Number(value))), 4294967295))
    === value) ? value as number : 0;


/* toBigInt64(value: unknown): bigint */
const toBigInt64 = (value: any | bigint): bigint =>
  BigInt(typeof value === "bigint"
    ? (value > Math.pow(2,63) -1 ? Math.pow(2, 63) -1 : value < Math.pow(-2, 63)
      ? Math.pow(-2, 63) : value)
  : ((value = Math.min(Math.max(Math.pow(-2, 63), Math.trunc(Number(value))),
    Math.pow(2, 63) - 1)) === value ) ? value : 0);


/* toBigUInt64(value: unknown): unsigned bigint */
const toBigUInt64 = (value: unknown): bigint =>
  BigInt(typeof value === "bigint"
    ? (value > Math.pow(2, 64) - 1 ? Math.pow(2,64) - 1 : value < 0 ? 0 : value)
    : ((value = Math.min(Math.max(0, Math.trunc(Number(value))),
      Math.pow(2, 64) -1)) === value) ? value as bigint : 0);


/* toFloat32(value: unknown): float */
const toFloat32 = (value: unknown): number =>
  ((value = Math.min(Math.max(-3.4e38, Number(value)), 3.4e38)) === value)
    ? value as number : 0;


/* isInt8(value: unknown): boolean */
const isInt8 = (value: unknown | number): boolean =>
  Number.isInteger(value) && value as number >= -128 && value as number <= 127;


/* isUInt8(value: unknown): boolean */
const isUInt8 = (value: unknown | number): boolean =>
  Number.isInteger(value) && value as number >= 0 && value as number <= 255;


/* isInt16(value: unknown): boolean */
const isInt16 = (value: unknown): boolean =>
  Number.isInteger(value) && value as number >= -32768
    && value as number <= 32767;


/* isUInt16(value: unknown): boolean */
const isUInt16 = (value: unknown): boolean =>
  Number.isInteger(value) && value as number >= 0 && value as number <= 65535;


/* isInt32(value: unknown): boolean */
const isInt32 = (value: unknown): boolean =>
  Number.isInteger(value) && value as number >= -2147483648
    && value as number <= 2147483647;


/* isUInt32(value: unknown): boolean */
const isUInt32 = (value: unknown | number): boolean =>
  Number.isInteger(value) && value as number >= 0
    && value as number <= 4294967295;


/* isBigInt64(value: unknown): boolean */
const isBigInt64 = (value: unknown): boolean =>
  typeof value === "bigint"
    && value >= Math.pow(-2, 63) && value <= Math.pow(2, 63)-1;


/* isBigUInt64(value: unknown): boolean */
const isBigUInt64 = (value: unknown | number | bigint): boolean =>
  typeof value === "bigint" && value >= 0 && value <= Math.pow(2,64) - 1;


/* toFloat16(value: unknown): float16 */
const toFloat16 = (value: unknown): number =>
  ((value = Math.min(Math.max(-65504, Number(value)), 65504)) === value )
    ? value as number : 0;


/* isFloat16(value: unknown): boolean */
const isFloat16 = (value: unknown | number | bigint): boolean =>
  typeof value === "number" && value === value && value >= -65504
    && value <= 65504;


/* signbit(value: unknown): boolean */
const signbit = (value: unknown | number | bigint): boolean =>
  ((value = Number(value)) !== value)
    ? false : (Object.is(value, -0) || (value as number | bigint < 0));


/* randomInt([max: integer]): integer */
/* randomInt(min: integer, max: integer): integer */
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


/* inRange(value: number, min: number, max: number): boolean */
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
  isNonNullable,
  isNonNullablePrimitive,
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
  /** Legacy Assertion API **/
  assertIs,
  assertIsNot,
  assertFail,
  assertMatch,
  assertDoesNotMatch,
  assertThrows,
  assertIsNotNullish,
  assertIsNullish,
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
  /** Type API **/
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
  mod,
  rem,
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
  isNonNullable,
  isNonNullablePrimitive,
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
  /** Legacy Assertion API **/
  assertIs,
  assertIsNot,
  assertFail,
  assertMatch,
  assertDoesNotMatch,
  assertThrows,
  assertIsNotNullish,
  assertIsNullish,
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
  /** Type API **/
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
  mod,
  rem,
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
