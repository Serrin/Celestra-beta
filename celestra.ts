/// <reference lib="esnext" />
/// <reference lib="dom" />
/// <reference lib="webworker.importscripts" />
/// <reference lib="scripthost" />
/*
https://github.com/microsoft/TypeScript/blob/main/src/lib/esnext.full.d.ts
https://github.com/microsoft/TypeScript/blob/main/src/compiler/commandLineParser.ts
*/
"use strict";


/**
 * @name Celestra
 * @version 7.1.0
 * @author Ferenc Czigler
 * @see https://github.com/Serrin/Celestra/
 * @license MIT https://opensource.org/licenses/MIT
 */


const VERSION = "Celestra v7.1.0";


/** TS browser and NodeJS common types **/


/**
 * @description False like values.
 * @see https://developer.mozilla.org/en-US/docs/Glossary/Falsy
 * @note Missing values: NaN and document.all
 * @private
 */
type Falsy = null | undefined | false | 0 | -0 | 0n | "";

/** * @description Truthy like values. * @private */
/* @ts-ignore */
type Truthy<T> = Exclude<T, Falsy>;

/** * @description Object key type. Built-in type. * @private */
/* type PropertyKey = string | number | symbol; */

/** * @description Object with string, number or symbol keys. * @private */
type ObjectLike = Record<PropertyKey, any>;

/** * @description String-like object. * @private */
type BooleanLike = boolean | Boolean;

/** * @description Number-like object. * @private */
type NumberLike = number | Number;

/** * @description BigInt-like object. * @private */
type BigIntLike = bigint | BigInt;

/** * @description Number-like object. * @private */
type Numeric = number | bigint;

/** * @description Number-like and BigInt-like object. * @private */
type NumericLike = NumberLike | BigIntLike;

/** * @description String-like object. * @private */
type StringLike = string | String;

/** * @description String-like object. * @private */
type SymbolLike = symbol | Symbol;

/** * @description Any iterable or iterator. * @private */
type IterableLike = Iterable<any> | Iterator<any> | IterableIterator<any>;

/** * @description Any iterable, iterator or array-like objects. * @private */
/* @ts-ignore */
type IterableLikeAndArrayLike = IterableLike | ArrayLike<any>;

/** * @description Iterable and Iterator and Generator types. * @private */
/* @ts-ignore */
type GeneratorLike = IterableLike | Generator<any, void, unknown>;

/** * @description Type for undefined and null values. * @private */
type Nullish = undefined | null;

/** * @description Not null or undefined. Built-in type. * @private */
/* type NonNullable = number | boolean | string | symbol | object | Function; */

/** * @description Not null or undefined or object or function. * @private */
type NonNullablePrimitive = boolean | number | bigint | string | symbol;

/** * @description NonNullablePrimitiveLike object. * @private */
type NonNullablePrimitiveLike =
  BooleanLike | NumericLike | StringLike | SymbolLike;

/** * @description Not object or function. * @private */
type Primitive = Nullish | NonNullablePrimitive;

/** * @description Primitive-like object. * @private */
/* @ts-ignore */
type PrimitiveLike = Nullish | NonNullablePrimitiveLike;

/** * @description Object or function. * @private */
/* @ts-ignore */
type NonPrimitive = object | Function;

/** * @description Generic comparable types. * @private */
type Comparable = number | bigint | string | boolean | Date;

/** * @description AsyncFunction. * @private */
type AsyncFunction<T> = (...args: ReadonlyArray<any>) => Promise<T>;

/** * @description ArrowFunction. * @private */
type ArrowFunction<Args extends any[] = [], R = any> =
  (this: void, ...args: Args) => R;

/** * @description TypedArray types. * @private */
type TypedArray = Exclude<ArrayBufferView, DataView>;


/** TS browser only types **/


/** * @description ClearCookiesOptions object type. * @private */
type ClearCookiesOptions = {
  path?: string;
  domain?: string;
  secure?: boolean;
  SameSite?: string;
  HttpOnly?: boolean;
};


/** Standard helpers **/

const _isNan = Number.isNaN;

const {
  getPrototypeOf,
  getOwnPropertyNames,
  getOwnPropertySymbols
} = Object;

const _oIs = Object.is;

const { isArray } = Array;


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
  (Math as ObjectLike).sumPrecise = function sumPrecise ([...array]): number {
    if (array.length === 0) { return -0; }
    /* iterator with items */
    if (array.every((value: unknown): boolean => typeof value === "number")) {
      /* return NaN + Infinity + -Infinity */
      let inf = array.indexOf(Infinity) >- 1;
      let negInf = array.indexOf(-Infinity) > -1;
      if (array.some(_isNan) || (inf && negInf)) { return NaN; }
      if (inf) { return Infinity; }
      if (negInf) { return -Infinity; }
      /* sum hi */
      let hi = array.filter((value: unknown): boolean =>
        (value === 1e20 || value === -1e20))
          .reduce((acc, value): number => acc + value, 0);
      /* sum lo - Kahan sum */
      let lo = 0.0;
      let c = 0.0;
      for (let item of array.filter((value: unknown): boolean =>
        (value !== 1e20 && value !== -1e20))) {
        let y = item - c; let t = lo + y; c = (t - lo) - y; lo = t;
      }
      /* return sum values */
      if (lo === 0 && hi !== 0) { return hi; }
      if (lo > 0 && hi > 0) { return hi; }
      if (lo < 0 && hi < 0) { return hi; }
      if (lo > 0 && hi < 0) { return lo + hi; }
      if (lo < 0 && hi > 0) { return lo + hi; }
      if (lo === 0 && hi === 0) { return lo; }
      if (lo !== 0 && hi === 0) { return lo; }
    }
    /* not number items -> TypeError */
    throw new TypeError("values passed to Math.sumPrecise must be numbers");
  };
}


/* Error.isError(); */
if (!("isError" in Error)) {
  (Error as ObjectLike).isError = function isError (value: unknown) {
    let className =
      Object.prototype.toString.call(value).slice(8, -1).toLowerCase();
    return (className === "error" || className === "domexception");
  };
}


/* crypto.randomUUID(); */
if ("crypto" in globalThis && !("randomUUID" in globalThis.crypto)) {
  (globalThis.crypto as ObjectLike).randomUUID = function randomUUID () {
    return "10000000-1000-4000-8000-100000000000".replace(/[018]/g,
      (c: string): string =>
        (Number(c) ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (Number(c) / 4))))
          .toString(16)
    );
  };
}


/* globalThis.GeneratorFunction; */
if (!(globalThis as ObjectLike).GeneratorFunction) {
  (globalThis as ObjectLike).GeneratorFunction =
    getPrototypeOf(function*(){}).constructor;
}


/* globalThis.AsyncFunction; */
if (!(globalThis as ObjectLike).AsyncFunction) {
  (globalThis as ObjectLike).AsyncFunction =
    getPrototypeOf(async function(){}).constructor;
}


/* globalThis.AsyncGeneratorFunction; */
if (!(globalThis as ObjectLike).AsyncGeneratorFunction) {
  (globalThis as ObjectLike).AsyncGeneratorFunction =
    getPrototypeOf(async function* () {}).constructor;
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
 * @param {unknown} condition The value to check.
 * @param {unknown} [message] - Optional message or Error to throw.
 * @throws {Error} If assertion is failed.
 */
function assert (condition: unknown, message?: unknown): asserts condition {
  if (!condition) {
    if (Error.isError(message)) { throw message; }
    let msg =
      `[assert] Assertion failed: ${condition} should be truly${message ? ` - ${message}` : ""}`;
    throw new Error(msg, {cause: msg});
  }
}


/**
 * @description SameValueZero equality (like `Object.is`, but +0 === -0).
 * @param {unknown} value1
 * @param {unknown} value2
 * @returns {boolean}
 */
const eq = (value1: unknown, value2: unknown): boolean =>
  value1 === value2 || (_isNan(value1) && _isNan(value2));


/**
 * @description Greater than.
 * @param {Comparable} value1
 * @param {Comparable} value2
 * @returns {boolean}
 */
const gt = (value1: Comparable, value2: Comparable): boolean =>
  typeOf(value1) === typeOf(value2) && value1 > value2;


/**
 * @description Greater than or equal (SameValueZero).
 * @param {Comparable} value1
 * @param {Comparable} value2
 * @returns {boolean}
 */
const gte = (value1: Comparable, value2: Comparable): boolean =>
  gt(value1, value2) || eq(value1, value2);


/**
 * @description Less than.
 * @param {Comparable} value1
 * @param {Comparable} value2
 * @returns {boolean}
 */
const lt = (value1: Comparable, value2: Comparable): boolean =>
  typeOf(value1) === typeOf(value2) && value1 < value2;


/**
 * @description Less than or equal (SameValueZero).
 * @param {Comparable} value1
 * @param {Comparable} value2
 * @returns {boolean}
 */
const lte = (value1: Comparable, value2: Comparable): boolean =>
  lt(value1, value2) || eq(value1, value2);


/**
 * @description Calls `callback` with the given `value` and then returns `value`.
 * @param {Function} callback
 * @returns {Function}
 */
const tap = (callback: Function): Function =>
  function (value: unknown): unknown { callback(value); return value; };


/**
 * @description Creates a function that is restricted to invoking `callback` once.
 * @param {Function} callback
 * @returns {Function}
 */
function once (callback: Function): Function {
  let called = false;
  let result: unknown;
  return function (...args: unknown[]): unknown {
    if (!called) {
      called = true;
      result = callback(...args);
    }
    return result;
  };
}


/**
 * @description Transforms a function of N arguments into N functions of one argument.
 * @param {Function} callback
 * @returns {Function}
 */
function curry (callback: Function): Function {
  const curried = (...args: unknown[]): unknown =>
    args.length >= callback.length
      ? callback(...args)
      : (...rest: unknown[]): unknown => curried(...args, ...rest);
  return curried;
}


/**
 * @description Creates a function that is the composition of the provided functions.
 * @param {Function} functions
 * @returns {Function}
 */
const pipe = (...functions: Function[]): Function =>
  (first: unknown): unknown => functions.reduce(
    (value: unknown, callback: Function): unknown => callback(value),
    first
  );


/**
 * @description Creates a function that is the composition of the provided functions.
 * @param {Function} functions
 * @returns {Function}
 */
const compose = (...functions: Function[]): Function =>
  (first: unknown): unknown => functions.reduceRight(
    (value, callback): unknown => callback(value),
    first
  );


/**
 * @description Creates a new object composed of the picked `object` properties.
 * @param {object} obj
 * @param {string[]} keys
 */
const pick = (obj: ObjectLike, keys: string[]): ObjectLike =>
  keys.reduce(function (acc: ObjectLike, key: string) {
    if (key in obj) { acc[key] = obj[key]; }
    return acc;
  }, {});


/**
 * @description Creates a new object composed of the `object` properties except for those omitted.
 * @param {object} obj
 * @param {string[]} keys
 * @returns {object}
 */
const omit = (obj: ObjectLike, keys: string[]): ObjectLike =>
  Object.keys(obj).reduce(function (acc: ObjectLike, key: string) {
    if (!keys.includes(key)) { acc[key] = obj[key]; }
    return acc;
  }, {});


/**
 * @description Returns a new object with the specified key-value pair added or updated.
 * @param {ObjectLike} obj
 * @param {string} key
 * @param {ObjectLike} value
 */
const assoc = (obj: ObjectLike, key: string, value: unknown): ObjectLike =>
  ({...obj, [key]: value});


/**
 * @description An asynchronous no-operation function that returns a resolved Promise.
 * @returns {Promise<void>}
 */
async function asyncNoop (): Promise<void> {
  return new Promise(function (resolve: Function) { resolve(); });
}


/**
 * @description Asynchronous function that returns a resolved Promise with `true`.
 * @returns {Promise<boolean>}
 */
async function asyncT (): Promise<boolean> { return true; }


/**
 * @description Asynchronous function that returns a resolved Promise with `false`.
 * @returns {Promise<boolean>}
 */
async function asyncF (): Promise<boolean> { return false; }


/**
 * @description Creates an asynchronous function that returns a resolved Promise with the specified value.
 * @param {unknown} value
 * @returns {Function}
 */
function asyncConstant <T>(value: T): AsyncFunction<T> {
  return async function () { return value; };
}


/**
 * @description Asynchronous identity function that returns a resolved Promise with the given value.
 * @param {unknown} value
 * @returns {Promise<unknown>}
 */
async function asyncIdentity (value: unknown): Promise<unknown> {
  return value;
}


/**
 * @description Generates a random UUID version 7 or UUID version 7 with version 4 ID.
 * @param {boolean} [v4=false] - If true, generates a UUID version 4; otherwise, generates version 7.
 * @returns {string} A randomly generated UUID string.
 */
function randomUUIDv7(v4: boolean = false): string {
  /* 12 hex timestamp digits + 1 version char = 13, but UUID positions 0-7, 9-12 = 12 slots */
  let timestamp = Date.now().toString(16).padStart(12, "0");
  let uuid: string[] = Array.from(
    "99999999-9999-4000-8000-100000000000"
      .replace(/[018]/g, (c: string): string => {
        let n = parseInt(c, 10);
        return (n ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (n / 4))))
          .toString(16);
      }
    )
  );
  /* Write 12 timestamp chars into positions 0-7, 9-12 (skipping dash at 8) */
  let index = 0;
  for (let pos = 0; index < 12; pos++) {
    if (pos === 8) { continue; } /* skip dash */
    uuid[pos] = timestamp[index++];
  }
  /* Write version into position 14 (after second dash) */
  uuid[14] = v4 ? "4" : "7";
  return uuid.join("");
}


/**
 * @description Returns a Promise that resolves after a specified delay in milliseconds.
 * @param {number} milisec - The delay duration in milliseconds.
 * @returns {Promise<void>} A Promise that resolves after the specified delay.
 */
const delay = (milisec: number): Promise<void> =>
  new Promise(resolve => setTimeout(resolve, milisec));


/**
 * @description Generates a random boolean value.
 * @returns {boolean} A randomly generated boolean value.
 */
const randomBoolean = (): boolean => !Math.round(Math.random());


/**
 * @description Deep assign of an object (Object, Array, etc.)
 * @returns {unknown}
 */
function deepAssign (target: unknown, ...sources: unknown[]): unknown {
  function _deepClone(value: unknown) {
    try { return structuredClone(value); } catch { return value; }
  }
  if (!sources.length) { return target == null ? target : _deepClone(target); }
  for (let source of sources) {
    Object.assign((target as ObjectLike), _deepClone(source));
  }
  return target;
}


/**
 * @description Returns the number of own properties (including symbols) of an object.
 * @param {object} object
 * @returns {number}
 */
const sizeIn = (object: object): number =>
  getOwnPropertyNames(object).length + getOwnPropertySymbols(object).length;


/**
 * @description Creates a function that invokes `callback` with its `this` binding removed.
 * @param {Function} callback
 * @returns {Function}
 */
const unBind = (callback: Function): Function =>
  Function.prototype.call.bind(callback);


/**
 * @description Creates a function that invokes `callback` with its `this` binding set to the provided context.
 * @param {Function} callback
 * @param {Function} context
 */
const bind = Function.prototype.call.bind(Function.prototype.bind);


/**
 * @description Returns a function that always returns the same value.
 * @param {unknown} value
 * @returns {Function}
 */
const constant = <T>(value: T): (() => T) => () => value;


/**
 * @description Returns value unchanged.
 * @param {unknown} value
 * @returns {unknown}
 */
const identity = <T,> (value: T): T => value;


/** * @description A function that does nothing. * @returns {void} */
function noop (): void {}


/** * @description Always returns true. * @returns {true} */
const T = (): true => true;


/** * @description Always returns false. * @returns {false} */
const F = (): false => false;


/**
 * @description Generates a timestamp-based string ID of specified size using the provided alphabet.
 * @param {number} [size=21] - The total length of the generated ID, including the timestamp.
 * @param {string} [alphabet="23456789CFGHJMPQRVWXcfghjmpqvwx"] - The set of characters to use for generating the ID.
 * @returns {string} The generated timestamp-based ID.
 */
function timestampID (
  size: number = 21,
  alphabet: string = "23456789CFGHJMPQRVWXcfghjmpqvwx"
  ): string {
  /**
   * @description Generates a random string ID of specified size using the provided alphabet.
   * @param {number} [size=10] - The length of the generated ID.
   * @param {string} [alphabet="23456789CFGHJMPQRVWXcfghjmpqvwx"] - The set of characters to use for generating the ID.
   */
  function _innerID (
    size: number = 10,
    alphabet: string = "23456789CFGHJMPQRVWXcfghjmpqvwx"
    ): string {
    let mask = (2 << (31 - Math.clz32(alphabet.length - 1))) - 1;
    let result = "";
    let index = size;
    while (index--) {
      let pos: number;
      do {
        pos = crypto.getRandomValues(new Uint8Array(1))[0] & mask;
      } while (pos >= alphabet.length);
      result += alphabet[pos];
    }
    return result;
  }
  if (!Number.isSafeInteger(size)
    || size < 11
    || alphabet.length > 255) {
    throw new RangeError(
      "[timestampID] Size should be an integer in between 11 and 255."
    );
  }
  if (typeof alphabet !== "string"
    || !alphabet.length
    || alphabet.length > 255) {
    throw new TypeError(
      "[timestampID] Alphabet should be a non-empty string with maximum length 255."
    );
  }
  return Date.now().toString(36).padStart(10, "0")
    + (size > 11 ? "-" + _innerID(size - 11, alphabet) : "-");
}


/** String API **/


/**
 * @description Encodes a string to Base64 format.
 * @param {unknown} str
 * @returns {string}
 */
const b64Encode = (str: unknown): string =>
  btoa(encodeURIComponent(String(str)).replace(/%([0-9A-F]{2})/g,
    (_match, p1): string => String.fromCharCode(parseInt(p1, 16))
  ));


/**
 * @description Decodes a Base64 encoded string.
 * @param {unknown} str
 * @returns {string}
 */
const b64Decode = (str: unknown): string =>
  decodeURIComponent(atob(String(str)).split("").map((c) =>
    "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2)
  ).join(""));


/**
 * @description Counts the occurrences of a substring in a string.
 * @param {unknown} str
 * @param {unknown} substr
 * @returns {number}
 */
function strCount (str: unknown, substr: unknown): number {
  let count = (String(str)?.split(String(substr)) ?? []).length - 1;
  return count < 0 ? 0 : count;
}


/**
 * @description Truncates a string to a specified length, optionally adding an omission string.
 * @param {string} str
 * @param {number} newLength - The maximum length of the truncated string.
 * @param {string} [omission=""] - The string to append to the truncated string.
 * @returns {string}
 */
function strTruncate (
  str: string,
  newLength: number,
  omission: string = ""): string {
  str = String(str);
  omission = String(omission);
  let strUC = Array.from(str);
  if (newLength >= strUC.length) { return str; }
  return strUC.slice(0, newLength - Array.from(omission).length).join("")
    + omission;
}


/**
 * @description Converts the first character of each word in a string to uppercase and the rest to lowercase.
 * @param {unknown} str
 * @returns {string}
 */
const strPropercase = (str: unknown): string =>
  String(str).trim().split(" ").map(function (value: string) {
    let chars = Array.from(value).map((c: string): string => c.toLowerCase());
    if (chars.length) { chars[0] = chars[0].toUpperCase(); }
    return chars.join("");
  }).join(" ");
/* alias */
const strTitlecase = strPropercase;


/**
 * @description Capitalizes the first character of a string and converts the rest to lowercase.
 * @param {unknown} str
 * @returns {string}
 */
function strCapitalize (str: unknown): string {
  let chars = [...String(str).trim().toLowerCase()];
  if (chars.length) { chars[0] = chars[0].toUpperCase(); }
  return chars.join("");
}


/**
 * @description Converts the first character of a string to uppercase.
 * @param {unknown} str
 * @returns {string}
 */
function strUpFirst (str: unknown): string {
  let chars = [...String(str).trim()];
  if (chars.length) { chars[0] = chars[0].toUpperCase(); }
  return chars.join("");
}


/**
 * @description Converts the first character of a string to lowercase.
 * @param {unknown} str
 * @returns {string}
 */
function strDownFirst (str: unknown): string {
  let chars = [...String(str).trim()];
  if (chars.length) { chars[0] = chars[0].toLowerCase(); }
  return chars.join("");
}


/**
 * @description Reverses the characters in a string.
 * @param {unknown} str
 * @returns {string}
 */
const strReverse = (str: unknown): string =>
  Array.from(String(str)).reverse().join("");


/**
 * @description Returns an array of Unicode code points for each character in a string.
 * @param {unknown} str
 * @returns {Array<number | undefined>}
 */
const strCodePoints = (str: unknown): Array<number | undefined> =>
  Array.from(String(str), (value: string): number | undefined =>
    value.codePointAt(0)
  );


/**
 * @description Creates a string from an array or iterable of Unicode code points.
 * @param {Iterable<number>} iterator - An array or iterable of Unicode code points.
 * @returns {string} The constructed string.
 */
const strFromCodePoints = ([...array]: Iterable<number>): string =>
  String.fromCodePoint(...array);


/**
 * @description Gets or sets a unicode character at a specified index in a string.
 * @param {string} str
 * @param {number} index
 * @returns {string}
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
 * @param {string} str
 * @param {number} index - The index at which to start splicing.
 * @param {number} count - The number of characters to remove.
 * @param {string} [add] - The string to add at the splice index.
 * @returns {string}
 */
const strSplice = (
  str: string,
  index: number,
  count: number,
  ...add: string[]): string =>
  Array.from(str).toSpliced(index, count, add.join("")).join("");


/**
 * @description Removes HTML tags from a string.
 * @param {unknown} str
 * @returns {string}
 */
const strHTMLRemoveTags = (str: unknown): string =>
  String(str).trim().replace(/<[^>]*>/g, " ").replace(/\s{2,}/g, " ").trim();


/**
 * @description Escapes special HTML characters in a string.
 * @param {unknown} str
 * @returns {string}
 */
const strHTMLEscape = (str: unknown): string => String(str).trim()
  .replace(/&/g, "&amp;")
  .replace(/</g, "&lt;")
  .replace(/>/g, "&gt;")
  .replace(/"/g, "&quot;")
  .replace(/'/g, "&apos;");


/**
 * @description Unescapes special HTML characters in a string.
 * @param {unknown} str
 * @returns {string}
 */
const strHTMLUnEscape = (str: unknown): string => String(str).trim()
  .replace(/&amp;/g, "&").replace(/&#38;/g, "&")
  .replace(/&lt;/g, "<").replace(/&#60;/g, "<")
  .replace(/&gt;/g, ">").replace(/&#62;/g, ">")
  .replace(/&quot;/g, '"').replace(/&#34;/g, '"')
  .replace(/&apos;/g, "'").replace(/&#39;/g, "'");


/** DOM API **/


/**
 * @description Selects all elements matching the specified CSS selector within the given context.
 * @param {string} str - The CSS selector to match.
 * @param {Document | HTMLElement} [context=document] - The context in which to search for elements.
 * @returns {HTMLElement[]} An array of matching elements.
 */
const qsa = (
  str: string,
  context: Document | HTMLElement = document): HTMLElement[] =>
  Array.from(context.querySelectorAll(str));


/**
 * @description Selects the first element matching the specified CSS selector within the given context.
 * @param {string} str - The CSS selector to match.
 * @param {Document | HTMLElement} [context=document] - The context in which to search for the element.
 * @returns {HTMLElement | null} The first matching element, or null if no match is found.
 */
const qs = (
  str: string,
  context: Document | HTMLElement = document): HTMLElement | null =>
    context.querySelector(str);


/**
 * @description Executes a callback function when the DOM is fully loaded.
 * @param {Function} callback - The callback function to execute.
 * @returns {void}
 */
function domReady (callback: Function): void {
  if (document.readyState !== "loading") {
    callback();
  } else {
    document.addEventListener(
      "DOMContentLoaded",
      function (_event) { callback(); }
    );
  }
}


/* domCreate(type: string[, properties: object[, innerHTML: string]]):
  element */
/* domCreate(element descriptive object): HTMLelement */
/**
 * @description Creates a new DOM element with specified properties and inner HTML.
 * @param {string | object} elementType - The type of element to create or an object describing the element.
 * @param {object} [properties] - An object containing properties to set on the element.
 * @param {string} [innerHTML] - The inner HTML content to set for the element.
 * @returns {HTMLElement}
 */
function domCreate (
  elementType: string | ObjectLike,
  properties: object,
  innerHTML: string): HTMLElement {
  if (arguments.length === 1 && typeof elementType  === "object") {
    let obj = elementType;
    elementType = obj.elementType;
    properties = {};
    for (const [key, value] of Object.entries(obj)) {
      if (key !== "elementType") {(globalThis as ObjectLike)[key] = value; }
    }
  }
  let element = document.createElement(elementType as string);
  if (properties) {
    for (let [key, value] of Object.entries(properties)) {
      if (key !== "style" || typeof value === "string") {
        (element as ObjectLike)[key] = value;
      } else {
        Object.assign(element.style, value);
      }
    }
  }
  if (innerHTML) { element.innerHTML = innerHTML; }
  return element;
}


/**
 * @description Converts an HTML string to a DOM element.
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
 * @param {HTMLElement} element
 * @param {string | number} [property] - The CSS property name to retrieve. If omitted, returns the full CSSStyleDeclaration.
 * @returns {string | CSSStyleDeclaration} The computed CSS property value or the full CSSStyleDeclaration.
 */
const domGetCSS = (
  element: HTMLElement,
  property: string | number): string | CSSStyleDeclaration =>
  (property
    ? (globalThis.getComputedStyle(element, null) as ObjectLike)[property]
    : globalThis.getComputedStyle(element, null)
  );


/* domSetCSS(element, property: string, value: string): undefined */
/* domSetCSS(element, properties: object): undefined */
/**
 * @description Sets CSS property values on a DOM element.
 * @param {HTMLElement} element
 * @param {string | object} property - The CSS property name to set or an object containing multiple properties and their values.
 * @param {string} [value] - The value to set for the specified CSS property (if `property` is a string).
 * @returns {void}
 */
function domSetCSS (
  element: HTMLElement,
  property: string | object,
  value: string): void {
  if (typeof property === "string") {
    (element.style as ObjectLike)[property] = value;
  } else if (typeof property === "object") {
    Object.keys(property).forEach((key: string): void =>
      (element.style as ObjectLike)[key] = (property as ObjectLike)[key]
    );
  }
}


/**
 * @description Fades in a DOM element over a specified duration.
 * @param {HTMLElement} element
 * @param {number} [duration=500] - The duration of the fade-in effect in milliseconds.
 * @param {string} [display=""] - The CSS display value to set when the element is shown.
 * @returns {void}
 */
function domFadeIn (
  element: HTMLElement,
  duration: number,
  display: string): void {
  let style = element.style;
  let step = 25/(duration || 500);
  style.opacity = (style.opacity ?? 0);
  style.display = (display || "");
  (function fade () {
    ((style as ObjectLike).opacity = parseFloat(style.opacity) + step) > 1
      ? (style as ObjectLike).opacity = 1
      : setTimeout(fade,25);
  })();
}


/**
 * @description Fades out a DOM element over a specified duration.
 * @param {HTMLElement} element
 * @param {number} [duration=500] - The duration of the fade-out effect in milliseconds.
 * @returns {void}
 */
function domFadeOut (element: HTMLElement, duration: number): void {
  let style = element.style;
  let step = 25/(duration || 500);
  (style as ObjectLike).opacity = (style.opacity || 1);
  (function fade () {
    ((style as ObjectLike).opacity -= step) < 0
      ? style.display = "none"
      : setTimeout(fade, 25);
  })();
}


/**
 * @description Toggles the fade in/out effect of a DOM element over a specified duration.
 * @param {HTMLElement} element
 * @param {number} [duration=500] - The duration of the fade effect in milliseconds.
 * @param {string} [display=""] - The CSS display value to set when the element is shown.
 * @returns {void}
 */
function domFadeToggle (
  element: HTMLElement,
  duration: number,
  display: string = ""): void {
  if (getComputedStyle(element, null).display === "none") {
    domFadeIn(element, duration, display);
  } else {
    domFadeOut(element, duration);
  }
}


/**
 * @description Hides a DOM element by setting its display style to "none".
 * @param {element} element
 * @returns {void}
 */
const domHide = (element: HTMLElement): void =>
  void(element.style.display = "none");


/**
 * @description Shows a DOM element by setting its display style.
 * @param {HTMLElement} element
 * @param {string} [display=""] - The CSS display value to set when showing the element.
 * @returns {void}
 */
const domShow = (element: HTMLElement, display: string = ""): void =>
  void(element.style.display = display);


/**
 * @description Toggles the visibility of a DOM element by changing its display style.
 * @param {HTMLElement} element
 * @param {string} [display] - The CSS display value to set when showing the element.
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
 * @param {HTMLElement} element
 * @returns {boolean}
 */
const domIsHidden = (element: HTMLElement): boolean =>
  globalThis.getComputedStyle(element, null).display === "none";


/**
 * @description Retrieves all sibling elements of a given DOM element.
 * @param {Element} element
 * @returns {Element[]} An array of sibling elements.
 */
function domSiblings (element: Element): Element[] {
  let parent = element.parentNode;
  if (!parent) { return []; }
  return Array.prototype.filter.call(parent.children,
    (item: HTMLElement): boolean => (item !== element)
  );
}


/**
 * @description Retrieves all sibling elements before a given DOM element.
 * @param {Element} element
 * @returns {Element[]} An array of previous sibling elements.
 */
function domSiblingsPrev (element: Element): Element[] {
  let parent = element.parentNode;
  if (!parent) { return []; }
  let siblings = Array.from((parent as Element).children);
  return siblings.slice(0, siblings.indexOf(element));
}
/* alias */
const domSiblingsLeft = domSiblingsPrev;


/**
 * @description Retrieves all sibling elements after a given DOM element.
 * @param {Element} element
 * @returns {Element[]} An array of next sibling elements.
 */
function domSiblingsNext (element: Element): Element[] {
  let parent = element.parentNode;
  if (!parent) { return []; }
  let siblings = Array.from((parent as Element).children);
  return siblings.slice(siblings.indexOf(element) + 1, parent.children.length);
}
/* alias */
const domSiblingsRight = domSiblingsNext;


/**
 * @description Dynamically imports one or more JavaScript files into the document.
 * @param {string[]} scripts - The URLs of the JavaScript files to import.
 * @returns {void}
 */
function importScript (...scripts: string[]): void {
  for (let item of scripts) {
    let element: HTMLScriptElement = document.createElement("script");
    element.type = "text\/javascript";
    element.src = item;
    element.onerror = function (error: Event | string): void {
      let source = "";
      if (typeOf(error) === "object") {
        source = ((error as ObjectLike).target as ObjectLike).src || "";
      }
      throw new URIError(
        `[importScript] Loading failed${source ? ` for the script with source ${source}` : ""}`
      );
    };
    (document.head||document.getElementsByTagName("head")[0])
      .appendChild(element);
  }
}


/**
 * @description Dynamically imports one or more CSS stylesheets into the document.
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
        `[importStyle] Loading failed for the style with source ${(error as ObjectLike).target.href}`
      );
    };
    (document.head||document.getElementsByTagName("head")[0])
      .appendChild(element);
  }
}


/**
 * @description Converts a form element into an array of key-value pairs.
 * @param {HTMLFormElement} form - The form element to convert.
 * @returns {object[]} An array of objects representing the form data.
 */
function form2array (form: HTMLFormElement): object[] {
  let field: ObjectLike;
  let result = Array<object>();
  if (typeOf(form) === "object" && form.nodeName.toLowerCase() === "form") {
    for (let index = 0, length = form.elements.length; index < length; index++) {
      field = form.elements[index];
      if (field.name
        && !field.disabled
        && field.type !== "file"
        && field.type !== "reset"
        && field.type !== "submit"
        && field.type !== "button") {
        if (field.type === "select-multiple") {
          for (let j = 0, l = ((form.elements[index] as ObjectLike).options as ObjectLike).length; j < l; j++) {
            if(field.options[j].selected) {
              result.push({
                "name": encodeURIComponent(field.name),
                "value": encodeURIComponent(field.options[j].value)
              });
            }
          }
        } else if ((field.type!=="checkbox" && field.type!=="radio")
          || field.checked) {
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
 * @param {HTMLFormElement} form - The form element to convert.
 * @returns {string} A URL-encoded query string representing the form data.
 */
function form2string (form: HTMLFormElement): string {
  let field: ObjectLike;
  let result: string[] = [];
  if (typeOf(form) === "object" && form.nodeName.toLowerCase() === "form") {
    for (let index = 0, length = form.elements.length; index < length; index++) {
      field = form.elements[index];
      if (field.name && !field.disabled
        && field.type !== "file"
        && field.type !== "reset"
        && field.type !== "submit"
        && field.type !== "button") {
        if (field.type === "select-multiple") {
          for (let j = 0, l = (form.elements[index] as ObjectLike).options.length; j < l; j++) {
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
 * @returns {boolean}
 */
const getDoNotTrack = (): boolean => [
    navigator.doNotTrack,
    (globalThis as ObjectLike).doNotTrack,
    (navigator as ObjectLike).msDoNotTrack
  ].some((item: unknown): boolean => item === true || item === 1 || item === "1");


/**
 * @description Retrieves the current geographical location of the user.
 * @param {PositionCallback} successCallback - The callback function to execute on successful retrieval of location.
 * @param {PositionErrorCallback} [errorCallback] - The callback function to execute on error.
 * @returns {void}
 */
function getLocation (
  successCallback: PositionCallback,
  errorCallback: PositionErrorCallback = console.error): void {
  function getError (error: unknown) {
    if (typeof error === "string") {
      errorCallback({
        code: 0,
        message: error,
        PERMISSION_DENIED: 1,
        POSITION_UNAVAILABLE: 2,
        TIMEOUT: 3
      } as GeolocationPositionError);
    } else {
      errorCallback(error as GeolocationPositionError);
    }
  }
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(successCallback, getError);
  } else {
    getError("Geolocation is not supported in this browser.");
  }
}


/**
 * @description Creates and triggers a download of a file with specified content and data type.
 * @param {string} filename - The name of the file to be created.
 * @param {string} content - The content to be included in the file.
 * @param {string} [dataType="text/plain"] - The MIME type of the file content.
 * @returns {void}
 */
function createFile (
  filename: string,
  content: string,
  dataType: string = "text/plain"): void {
  let blob = new Blob([content], {type: dataType});
  let el = document.createElement("a");
  el.href = globalThis.URL.createObjectURL(blob);
  el.download = filename;
  document.body.appendChild(el);
  el.click();
  document.body.removeChild(el);
  globalThis.URL.revokeObjectURL(el.href);
}


/**
 * @description Retrieves the current fullscreen element or undefined if not in fullscreen mode.
 * @returns {Document | Element | undefined}
 */
const getFullscreen = (): Document | Element | undefined =>
  document.fullscreenElement
    ?? (document as ObjectLike).mozFullScreenElement
    ?? (document as ObjectLike).webkitFullscreenElement
    ?? (document as ObjectLike).msFullscreenElement
    ?? undefined;


/**
 * @description Sets the specified element to fullscreen mode.
 * @param {HTMLElement | string} element
 * @returns {void}
 */
function setFullscreenOn (element: HTMLElement | string): void {
  let elem: HTMLElement | null = null;
  if (typeof element === "string") {
    elem = document.querySelector(element);
  } else if (element && typeof element === "object") {
    elem = element;
  }
  if (elem && elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if ((elem as ObjectLike).mozRequestFullScreen) {
    (elem as ObjectLike).mozRequestFullScreen();
  } else if ((elem as ObjectLike).webkitRequestFullscreen) {
    (elem as ObjectLike).webkitRequestFullscreen();
  } else if ((elem as ObjectLike).msRequestFullscreen) {
    (elem as ObjectLike).msRequestFullscreen();
  }
}


/**
 * @description Exits fullscreen mode.
 * @returns {void}
 */
function setFullscreenOff (): void {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if ((document as ObjectLike).mozCancelFullScreen) {
    (document as ObjectLike).mozCancelFullScreen();
  } else if ((document as ObjectLike).webkitExitFullscreen) {
    (document as ObjectLike).webkitExitFullscreen();
  } else if ((document as ObjectLike).msExitFullscreen) {
    (document as ObjectLike).msExitFullscreen();
  }
}


/**
 * @description Gets the value of a CSS variable from the root element.
 * @param {string} name - The name of the CSS variable to retrieve.
 * @returns {string} The value of the CSS variable.
 */
const domGetCSSVar = (name: string): string =>
  getComputedStyle(document.documentElement)
    .getPropertyValue(name[0] === "-" ? name : "--" + name);


/**
 * @description Sets the value of a CSS variable on the root element.
 * @param {string} name
 * @param {string | null} value
 * @returns {void}
 */
const domSetCSSVar = (name: string, value: string | null): void =>
  document.documentElement.style.setProperty(
    (name[0] === "-" ? name : "--" + name),
    value
  );


/** * @description Scrolls the document to the top. * @returns {void} */
const domScrollToTop = (): void => globalThis.scrollTo(0,0);


/** * @description Scrolls the document to the bottom. * @returns {void} */
const domScrollToBottom = (): void =>
  globalThis.scrollTo(0, document.body.scrollHeight);


/**
 * @description Scrolls the document to bring a specified element into view.
 * @param {HTMLElement} element
 * @param {boolean} [top=true] - If true, aligns the element to the top of the viewport; if false, aligns it to the bottom.
 * @returns {void}
 */
const domScrollToElement = (element: HTMLElement, top = true): void =>
  element.scrollIntoView(top);


/**
 * @description Removes all child elements from a given DOM element.
 * @param {Element} element
 * @returns {void}
 */
const domClear = (element: Element): void =>
  Array.from(element.children).forEach((item: Element): void => item.remove());


/** Type API **/


/**
 * The constructorOf function returns the constructor property of value, using optional chaining to avoid throwing if value is `null` or `undefined`.
 * @param {unknown} value
 * @returns {Function | undefined}
 */
const constructorOf = (value: unknown): Function | undefined =>
  (value)?.constructor;


/**
 * @description Checks if the given value is NonNullable (not null or undefined).
 * @param {unknown} value
 * @returns {boolean}
 */
const isNonNullable = (value: unknown): value is NonNullable<unknown> =>
  value != null;


/**
 * @description Checks if the given value is NonNullablePrimitive.
 * @param {unknown} value
 * @returns {boolean}
 */
const isNonNullablePrimitive =
  (value: unknown): value is NonNullablePrimitive =>
    value != null && typeof value !== "object" && typeof value !== "function";


/**
 * @description Checks if a value is an arrow function.
 * @param {unknown} value
 * @returns {boolean}
 */
function isArrowFunction (value: unknown): value is ArrowFunction {
  if (typeof value !== "function"
    || ("prototype" in value && value.prototype !== undefined)
    || !(value.toString().includes("=>"))) {
    return false;
  }
  /* This will throw an error if it's an arrow function */
  try {
    new (value as new (...args: unknown[]) => unknown)();
    return false;
  } catch (error) {
    return true;
  }
}


/**
 * @description Checks if a value is an async iterator.
 * @param {unknown} value
 * @returns {boolean}
 */
const isAsyncIterator = (value: unknown): value is AsyncIterator<unknown> =>
  value != null
    && typeof (value as ObjectLike).next === "function"
    && typeof (value as ObjectLike)[Symbol.asyncIterator] === "function";


/**
 * @description Checks if all items in an iterable or iterator match the expected type(s) or constructor(s).
 * @param {IterableLike} iter - The iterable or iterator to check.
 * @param {string | Function | Array<string | Function>} expectedType - The expected type(s) or constructor(s) for the items.
 * @param {boolean} [Throw=false] - If true, throws a TypeError on mismatch; otherwise returns false.
 * @returns {boolean} True if all items match the expected type(s) or constructor(s), false otherwise.
 * @throws {TypeError} If `iter` is not iterable or iterator, or if `expectedType` is invalid, or if a mismatch occurs and `Throw` is true.
 */
function isTypedCollection (
  iter: IterableLike,
  expectedType: string | Function | Array<string | Function>,
  Throw: boolean = false): boolean {
  /* Validate `iter` */
  if (!isIterator(iter) && !isIterable(iter)) {
    throw new TypeError(
      `[isTypedCollection] TypeError: iter must be iterable or iterator. Got ${typeOf(iter)}`
    );
  }
  /* Validate `expected` */
  if (!(["string", "function"].includes(typeof expectedType))
    && !isArray(expectedType)) {
    throw new TypeError(
      `[isTypedCollection] TypeError: expectedType must be string, function, array. Got ${typeOf(expectedType)}`
    );
  }
  /* Validate `Throw` */
  if (typeOf(Throw) !== "boolean") {
    throw new TypeError(
      `[isTypedCollection] TypeError: Throw has to be a boolean. Got ${typeOf(Throw)}`
    );
  }
  /* Normalize expected to an array */
  let expectedArray =
    isArray(expectedType) ? expectedType : [expectedType];
  /* Check values of iter against expected types or constructors */
  let matched = true;
  for (let value of iter as Iterable<unknown>) {
    let valueType = typeOf(value);
    matched = expectedArray.some(
      function (item: string | Function): boolean {
        if (typeof item === "string") { return valueType === item; }
        if (typeof item === "function") {
          return value != null && value instanceof item;
        }
        /* validate expected array elements */
        throw new TypeError(
          `[isTypedCollection] TypeError: expectedType array elements have to be a string or function. Got ${typeOf(item)}`
        );
      }
    );
    if (!matched) { break; }
  }
  /* Throw error if mismatch and `Throw` is true */
  if (Throw && !matched) {
    let eNames = expectedArray.map((item: unknown): string =>
      (typeof item === "string"
        ? item.toString()
        : (item as ObjectLike).name ?? "anonymous"
      )
    ).join(", ");
    throw new TypeError(
      `[isTypedCollection] TypeError: one or more items are not ${eNames}`
    );
  }
  return matched;
}


/**
 * @description Checks if the given value is the given type(s).
 * @param {unknown} value
 * @param {string | Function | (string | Function)[]} expectedType
 * @returns {boolean}
 * @throws {RangeError} If expectedType array is empty.
 * @throws {TypeError} If elements of expectedType array are not a valid type.
 * @throws {TypeError} If expectedType is not a valid type.
 */
function is (
  value: unknown,
  expectedType: string | Function | (string | Function)[]): boolean {
  /* helper functions */
  function _matches (value: unknown, expected: string | Function): boolean {
    if (typeof expected === "string") { return typeOf(value) === expected; }
    try {
      return value instanceof expected;
    } catch (_error) {
      return false;
    }
  }
  /* expectedType is a `string` or `function` */
  if (typeof expectedType === "string" || typeof expectedType  === "function") {
    return _matches(value, expectedType);
  }
  /* expectedType is an `Array` */
  if (Array.isArray(expectedType)) {
    /* expectedType array is empty -> throw a `RangeError` */
    if (!expectedType.length) {
      throw new RangeError(`[is] expectedType array must be not empty.`);
    }
    for (const item of expectedType) {
      if (typeof item !== "string" && typeof item !== "function") {
        /* item of expectedType is not a string or function -> throw a TypeError */
        throw new TypeError(
          `[is] TypeError: expectedType array elements must be string or function. Got ${typeOf(item)}`
        );
      }
    }
    return expectedType.some((item) => _matches(value, item));
  }
  /* expectedType error -> throw a `TypeError` */
  throw new TypeError(
    `[is] expectedType array elements must be strings or constructors. Got ${typeOf(expectedType)}`
  );
}


/**
 * @description Converts a given value to an object, symbol, or function.
 * @param {unknown} value
 * @returns {Object | symbol | Function}
 * @throws {TypeError} If the value is null or undefined.
 */
function toObject (value: unknown): Object | symbol | Function {
  if (value == null) { throw new TypeError(`[toObject] value is ${value}`); }
  return (["object", "function"].includes(typeof value))
    ? value
    : Object(value);
}


/* toPrimitive(value: unknown): primitive | object | symbol | Function */
/**
 * @description Converts wrapper objects to their corresponding primitive values.
 * @param {unknown} value
 * @returns {unknown} The primitive value or the original object if value isn't not a wrapper.
 */
function toPrimitive (value: unknown): unknown {
  if (value == null || typeof value !== "object") { return value; }
  let vType = Object.prototype.toString.call(value).slice(8, -1);
  if (["Boolean", "BigInt", "Number", "String", "Symbol"].includes(vType)) {
    return value.valueOf();
  }
  return value;
}


/**
 * @description This function is a general purpose, type safe, predictable stringifier. Converts a value into a human-readable string for error messages Handles symbols, functions, nullish, circular references, etc.
 * @param {unknown} value
 * @returns {string}
 */
function toSafeString (value: unknown): string {
  let seen = new WeakSet<object>();
  function replacer (_key: string, value: unknown): unknown {
    if (typeof value === "function") {
      return `[Function: ${value.name || "anonymous"}]`;
    }
    if (typeof value === "symbol") { return value.toString(); }
    if (value instanceof Date) { return `Date(${value.toISOString()})`; }
    if (value instanceof Error) {
      return `${value.name}: ${value.message}, ${value.stack ?? ""}`;
    }
    if (value && typeOf(value) === "object") {
      if (seen.has(value)) { return "[Circular]" };
      seen.add(value);
    }
    return value;
  }
  if (["undefined", "null", "string", "number", "boolean", "bigint"]
    .includes(typeOf(value))) {
    return String(value);
  }
  if (isArray(value)) {
    return `[${value.map(v => toSafeString(v)).join(", ")}]`;
  }
  if (ArrayBuffer.isView(value) && !(value instanceof DataView)) {
    // ArrayBuffer views (typed arrays) are iterable; cast to any to satisfy TS
    return `[${Array.from(value as any).map(v => toSafeString(v)).join(", ")}]`;
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
 * @param {unknown} value
 * @returns {boolean}
 */
const isPropertyKey = (value: unknown): value is PropertyKey =>
  typeof value === "string" || typeof value === "symbol";


/**
 * @description Converts a value to a property key (string or symbol).
 * @param {unknown} value
 * @returns {string | symbol}
 */
const toPropertyKey = (value: unknown): PropertyKey =>
  typeof value === "symbol" ? value : String(value);


/**
 * Checks if a value is a valid array index (integer between 0 and Number.MAX_SAFE_INTEGER).
 * @param {unknown} value
 * @returns {boolean}
 */
const isIndex = (value: unknown): value is number => Number.isSafeInteger(value)
  && (value as number) >= 0
  && 1 / (value as number) !== 1 / -0;
/* alias */
const isLength = isIndex;


/**
 * @description Converts a value to a valid array index (unsigned integer).
 * @param {number} value
 * @returns {number}
 */
function toIndex (value: number): number {
  value = ((value = Math.trunc(+value)) !== value || value === 0) ? 0 : value;
  if (value < 0 || value > Number.MAX_SAFE_INTEGER) {
    throw new RangeError(`[toIndex] RangeError: ${value}`);
  }
  return value;
}


/**
 * @description Converts a value to a valid length (unsigned integer).
 * @param {number} value
 * @returns {number}
 */
function toLength (value: number): number {
  value = ((value = Math.trunc(+value)) !== value || value === 0) ? 0 : value;
  return Math.min(Math.max(value, 0), Number.MAX_SAFE_INTEGER);
}


/**
 * @description Extended typeof operator with "null" type as string.
 * @param {unknown} value
 * @returns {string}
 */
const typeOf = (value: unknown): string =>
  value === null ? "null" : typeof value;


/**
 * @description Checks if two values are the same type.
 * @param {unknown} value1
 * @param {unknown} value2
 * @param {string} [type]
 * @returns {boolean}
 */
const isSameType = (value1: unknown, value2: unknown, type?: string): boolean =>
  typeof type === "string"
    ? typeOf(value1) === type && typeOf(value2) === type
    : typeOf(value1) === typeOf(value2);


/**
 * @description Checks if two values are instances of the same constructor.
 * @param {unknown} value1
 * @param {unknown} value2
 * @param {Function} Contructor - The constructor function to check against.
 * @returns {boolean}
 */
const isSameInstance = (
  value1: unknown,
  value2: unknown,
  Contructor: Function): boolean =>
  value1 instanceof Contructor && value2 instanceof Contructor;


/**
 * @description Checks if a value is an coerced object (Number, String, etc.).
 * @param {unknown} value
 * @returns {boolean}
 */
function isCoercedObject (value: unknown): Function | boolean {
  if (typeOf(value) === "object") {
    if (value instanceof Number) { return Number; }
    if (value instanceof String) { return String; }
    if (value instanceof Boolean) { return Boolean; }
    if (value instanceof BigInt) { return BigInt; }
    if (typeof (value as symbol).valueOf?.() === "symbol") { return Symbol; }
  }
  return false;
}


/**
 * @description Performs a deep strict equality check between two values.
 * @param {unknown} value1
 * @param {unknown} value2
 * @returns {boolean}
 */
function isDeepStrictEqual (value1: unknown, value2: unknown): boolean {
  /* helper functions */
  const _typeOfOrNaN = (value: unknown): string =>
    _isNan(value) ? "NaN" : typeOf(value);
  const _classOf = (value: unknown): string =>
    Object.prototype.toString.call(value).slice(8, -1).toLowerCase();
  /* primitives: Boolean, Number, BigInt, String + Function + Symbol */
  if (_oIs(value1, value2)) { return true; }
  /* Object Wrappers (Boolean, Number, BigInt, String) */
  if (typeOf(value1) === "object"
    && isPrimitive(value2)
    && _classOf(value1) === typeOf(value2)) {
    return _oIs((value1 as ObjectLike).valueOf(), value2);
  }
  if (isPrimitive(value1)
    && typeOf(value2) === "object"
    && typeOf(value1) === _classOf(value2)) {
    return _oIs(value1, (value2 as ObjectLike).valueOf());
  }
  /* type (primitives, object, null, NaN) */
  if (_typeOfOrNaN(value1) !== _typeOfOrNaN(value2)) { return false; }
  /* objects */
  if (typeOf(value1) === "object" && typeOf(value2) === "object") {
    /* objects / same memory adress */
    if (_oIs(value1, value2)) { return true; }
    /* objects / not same constructor */
    if (getPrototypeOf(value1).constructor !==
      getPrototypeOf(value2).constructor) {
      return false;
    }
    /* objects / WeakMap + WeakSet */
    if (isSameInstance(value1, value2, WeakMap)
      || isSameInstance(value1, value2, WeakSet)) {
      return _oIs(value1, value2);
    }
    /* objects / Wrapper objects: Number, Boolean, String, BigInt */
    if (isSameInstance(value1, value2, Number)
      || isSameInstance(value1, value2, Boolean)
      || isSameInstance(value1, value2, String)
      || isSameInstance(value1, value2, BigInt)) {
      return _oIs(
        (value1 as ObjectLike).valueOf(),
        (value2 as ObjectLike).valueOf()
      );
    }
    /* objects / Array */
    if (isArray(value1) && isArray(value2)) {
      if (value1.length !== value2.length) { return false; }
      if (value1.length === 0) { return true; }
      return value1.every((value: unknown, index: number): boolean =>
        isDeepStrictEqual(value, value2[index])
      );
    }
    /* objects / TypedArrays */
    if ((ArrayBuffer.isView(value1) && !(value1 instanceof DataView))
      && (ArrayBuffer.isView(value2) && !(value2 instanceof DataView))
      && _classOf(value1) === _classOf(value2)) {
      if ((value1 as ObjectLike).length !== (value2 as ObjectLike).length) {
        return false;
      }
      if ((value1 as ObjectLike).length === 0) { return true; }
      return (value1 as ObjectLike).every(
        (value: unknown, index: number): boolean =>
          _oIs(value, (value2 as ObjectLike)[index])
      );
    }
    /* objects / ArrayBuffer */
    if (isSameInstance(value1, value2, ArrayBuffer)) {
      if ((value1 as ObjectLike).byteLength !==
        (value2 as ObjectLike).byteLength) {
        return false;
      }
      if ((value1 as ObjectLike).byteLength === 0) { return true; }
      let xTA = new Int8Array(value1 as Iterable<number>);
      let yTA = new Int8Array(value2 as Iterable<number>);
      return xTA.every((value: unknown, index: number): boolean =>
        _oIs(value, yTA[index]));
    }
    /* objects / DataView */
    if (isSameInstance(value1, value2, DataView)) {
      if ((value1 as ObjectLike).byteLength !==
      (value2 as ObjectLike).byteLength) {
        return false;
      }
      if ((value1 as ObjectLike).byteLength === 0) { return true; }
      for (let index = 0; index < (value1 as ObjectLike).byteLength; index++) {
        if (!_oIs(
          (value1 as ObjectLike).getUint8(index),
          (value2 as ObjectLike).getUint8(index))) {
          return false;
        }
      }
      return true;
    }
    /* objects / Map */
    if (isSameInstance(value1, value2, Map)) {
      if ((value1 as ObjectLike).size !== (value2 as ObjectLike).size) {
        return false;
      }
      if ((value1 as ObjectLike).size === 0) { return true; }
      return [...(value1 as ObjectLike).keys()].every((value: unknown): boolean =>
        isDeepStrictEqual(
          (value1 as ObjectLike).get(value),
          (value2 as ObjectLike).get(value))
        );
    }
    /* objects / Set */
    if (isSameInstance(value1, value2, Set)) {
      if ((value1 as ObjectLike).size !== (value2 as ObjectLike).size) {
        return false;
      }
      if ((value1 as ObjectLike).size === 0) { return true; }
      return [...(value1 as ObjectLike).keys()].every(
        (value: unknown): boolean => (value2 as ObjectLike).has(value)
      );
    }
    /* objects / RegExp */
    if (isSameInstance(value1, value2, RegExp)) {
      return _oIs((value1 as RegExp).lastIndex, (value2 as RegExp).lastIndex)
        && _oIs((value1 as RegExp).flags, (value2 as RegExp).flags)
        && _oIs((value1 as RegExp).source, (value2 as RegExp).source);
    }
    /* objects / Error */
    if (isSameInstance(value1, value2, Error)) {
      return isDeepStrictEqual(
        getOwnPropertyNames(value1)
          .reduce(
            function (acc: object, k: PropertyKey): object {
              (acc as ObjectLike)[k] = (value1 as ObjectLike)[k];
              return acc;
            },
            {}
          ),
        getOwnPropertyNames(value2).reduce(
          function (acc: object, k: PropertyKey): object {
            (acc as ObjectLike)[k] = (value2 as ObjectLike)[k];
            return acc; },
          {}
        )
      );
    }
    /* objects / Date */
    if (isSameInstance(value1, value2, Date)) {
      return _oIs(+(value1 as Date), +(value2 as Date));
    }
    /* objects / Proxy -> not detectable */
    /* objects / Objects */
    let value1Keys = Reflect.ownKeys(value1 as ObjectLike);
    let value2Keys = Reflect.ownKeys(value2 as ObjectLike);
    if (value1Keys.length !== value2Keys.length) { return false; }
    if (value1Keys.length === 0) { return true; }
    return value1Keys.every((key: PropertyKey): boolean => isDeepStrictEqual(
      (value1 as ObjectLike)[key],
      (value2 as ObjectLike)[key]
    ));
  }
  /* default return false */
  return false;
}


/**
 * @description Checks if a value is empty.
 * - `null`, `undefined`, and `NaN` are empty.
 * - Arrays, TypedArrays, and strings are empty if length === 0.
 * - Maps and Sets are empty if size === 0.
 * - ArrayBuffer and DataView are empty if byteLength === 0.
 * - Iterable objects are empty if they have no elements.
 * - Plain objects are empty if they have no own properties.
 *
 * @param {unknown} value
 * @returns boolean
 */
function isEmpty (value: unknown): boolean {
  /* Check undefined, null, NaN */
  if (value == null || _isNan(value)) { return true; }
  /* Check Array, TypedArrays, string, String */
  if (isArray(value)
    || (ArrayBuffer.isView(value) && !(value instanceof DataView))
    || typeof value === "string"
    || value instanceof String) {
    return (value as ObjectLike).length === 0;
  }
  /* Check Map and Set */
  if (value instanceof Map || value instanceof Set) { return value.size === 0; }
  /* Check ArrayBuffer and DataView */
  if (value instanceof ArrayBuffer || value instanceof DataView) {
    return value.byteLength === 0;
  }
  /* Check Iterable objects */
  if (typeof (value as ObjectLike)[Symbol.iterator] === "function") {
    let it = (value as ObjectLike)[Symbol.iterator]();
    return it.next().done; /* avoids consuming entire iterator */
  }
  /* Check Iterator objects */
  if ("Iterator" in globalThis ? (value instanceof Iterator)
    : (typeOf(value) === "object"
      && typeof (value as ObjectLike).next === "function")) {
    try {
      /* Has at least one element */
      for (let _item of value as Iterable<unknown>) { return false; }
      return true;
    } catch { /* Not iterable */ }
  }
  /* Other objects - check own properties (including symbols) */
  if (typeOf(value) === "object") {
    let keys = Reflect.ownKeys(value);
    if (keys.length === 0) { return true; }
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
 * @param {unknown} value
 * @returns {boolean}
 */
const isProxy = (value: unknown): boolean =>
  Boolean(value != null && (value as ObjectLike).__isProxy);


/**
 * @description Checks if the given value is an Async Generator Function.
 * @param {unknown} value
 * @returns {boolean}
 */
const isAsyncGeneratorFunction =
  (value: unknown): value is AsyncGeneratorFunction =>
    getPrototypeOf(value).constructor ===
      getPrototypeOf(async function*() {}).constructor;


/**
 * @description Checks if the given value is a plain object (created using {} or new Object()).
 * @param {unknown} value
 * @returns {boolean}
 */
function isPlainObject (value: unknown): boolean {
  if (typeOf(value) !== "object") { return false; }
  let proto = getPrototypeOf(value);
  return proto === Object.prototype || proto === null;
}


/**
 * @description Checks if the given value is an object.
 * @param {unknown} value
 * @returns {boolean}
 */
const isObject = (value: unknown): value is object =>
  value !== null && typeof value === "object";


/**
 * @description Checks if the given value is a Function.
 * @note type Function -> built-in TS type in lib.es5.d.ts
 * @param {unknown} value
 * @returns {boolean}
 */
const isFunction = (value: unknown): value is Function =>
  typeof value === "function";


/**
 * @description Checks if a value is an arraylike object.
 * @param {unknown} value
 * @returns {boolean}
 */
function isArraylike <T>(value: unknown): value is ArrayLike<T> {
  let tValue = typeOf(value);
  if (value == null || (tValue !== "object" && tValue !== "string")) {
    return false;
  }
  let maybe = value as { length?: unknown };
  if (typeof maybe.length !== "number") { return false; }
  let len = maybe.length;
  return len >= 0 && Number.isFinite(len);
}


/**
 * @description Checks if the given value is null.
 * @param {unknown} value
 * @returns {boolean}
 */
const isNull = (value: unknown): value is null => value === null;


/**
 * @description Checks if the given value is undefined.
 * @param {unknown} value
 * @returns {boolean}
 */
const isUndefined = (value: unknown): value is undefined =>
  value === undefined;


/**
 * @description Checks if the given value is Nullish (null or undefined).
 * @note The values null and undefined are nullish.
 * @param {unknown} value
 * @returns {boolean}
 */
const isNullish = (value: unknown): value is Nullish => value == null;


/**
 * @description Checks if the given value is Primitive.
 * @param {unknown} value
 * @returns {boolean}
 */
const isPrimitive = (value: unknown): value is Primitive =>
  value == null || (typeof value !== "object" && typeof value !== "function");


/**
 * @description Tests whether a value is an Iterator.
 * @param {unknown} value
 * @returns {boolean}
 */
const isIterator = <T>(value: unknown): value is Iterator<T> =>
  "Iterator" in globalThis
    ? value instanceof Iterator
    : (typeOf(value) === "object"
      && typeof (value as ObjectLike).next === "function");


/**
 * @description Tests whether a value is a RegExp.
 * @param {unknown} value
 * @returns {boolean}
 */
const isRegexp = (value: unknown): value is RegExp => value instanceof RegExp;


/**
 * @description Tests whether a value is a HTML element.
 * @param {unknown} value
 * @returns {boolean}
 */
const isElement = (value: unknown): boolean =>
  typeOf(value) === "object" && (value as ObjectLike).nodeType === 1;


/**
 * @description Tests whether a value is an Iterable.
 * @param {unknown} value
 * @returns {boolean}
 */
const isIterable = (value: unknown): value is Iterable<unknown> =>
  value != null && typeof (value as ObjectLike)[Symbol.iterator] === "function";


/**
 * @description Tests whether a value is an Async Iterable.
 * @param {unknown} value
 * @returns {boolean}
 */
const isAsyncIterable = <T>(value: unknown): value is AsyncIterable<T> =>
  value != null
    && typeof (value as ObjectLike)[Symbol.asyncIterator] === "function";


/**
 * @description Checks if the given value is a TypedArray (Int8Array, etc.).
 * @param {unknown} value
 * @returns {boolean}
 */
const isTypedArray = (value: unknown): value is TypedArray =>
  ArrayBuffer.isView(value) && !(value instanceof DataView);


/**
 * @description Checks if the given value is a Generator Function.
 * @note GeneratorFunction -> built-in TS type in lib.es2015.generator.d.ts
 * @param {unknown} value
 * @returns {boolean}
 */
const isGeneratorFunction = (value: unknown): value is GeneratorFunction =>
  getPrototypeOf(value).constructor ===
    getPrototypeOf(function*(){}).constructor;


/**
 * @description Checks if the given value is an Async Function.
 * @param {unknown} value
 * @returns {boolean}
 */
const isAsyncFunction = <T,>(value: unknown): value is AsyncFunction<T> =>
  getPrototypeOf(value).constructor ===
    getPrototypeOf(async function(){}).constructor;


/** Cookie API **/


/* setCookie(Options object): undefined */
/* setCookie(name: string, value: string [, hours = 8760 [, path = "/" [, domain
  [, secure [, SameSite = "Lax" [, HttpOnly]]]]]]): undefined */
/**
 * @description Set a cookie.
 * @param {string | ObjectLike} name - The name of the cookie or an options object.
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
  name: string | ObjectLike,
  value: string,
  hours: number = 8760,
  path: string = "/",
  domain: string,
  secure: boolean,
  SameSite: string = "Lax",
  HttpOnly: boolean): void {
  if (typeOf(name) === "object") {
    let settings = name;
    name = (settings as ObjectLike).name;
    value = (settings as ObjectLike).value;
    hours = (settings as ObjectLike).hours || 8760;
    path = (settings as ObjectLike).path || "/";
    domain = (settings as ObjectLike).domain;
    secure = (settings as ObjectLike).secure;
    SameSite = (settings as ObjectLike).SameSite || "Lax";
    HttpOnly = (settings as ObjectLike).HttpOnly;
  }
  let expire = new Date();
  expire.setTime(expire.getTime() + (Math.round(hours * 60 * 60 * 1000)));
  document.cookie = encodeURIComponent(name as string)
    + "=" + encodeURIComponent(value)
    + "; expires=" + expire.toUTCString()
    + "; path=" + path
    + (domain ? "; domain=" + domain : "")
    + (secure ? "; secure" : "")
    + (typeof SameSite==="string" && SameSite.length
      ? "; SameSite=" + SameSite
      : ""
    )
    + (HttpOnly ? "; HttpOnly" : "")
    + ";";
}


/* getCookie(): object | string | null */
/* getCookie([name: string]): object | string | null */
/**
 * @description Get a cookie by name or all cookies as an object.
 * @param {string} [name] - The name of the cookie to retrieve.
 * @returns {object | string | null} An object with all cookies, the value of the specified cookie, or null if not found.
 */
function getCookie (name: string): string | null | ObjectLike {
  /* if no cookies -> return null or empty object */
  if (!document.cookie.length) { return typeof name === "string" ? null : {}; }
   /* create cookieObject with names and values */
  let cookieObject: ObjectLike = {};
  for (let cookie of document.cookie.split(";")) {
    const [cookieName, value] = cookie.trim().split("=");
    cookieObject[decodeURIComponent(cookieName)] = decodeURIComponent(value);
  }
  /* return the value of a cookie or the cookieObject */
  return typeof name === "string" ? (cookieObject[name] ?? null) : cookieObject;
}


/**
 * @description Checks if a cookie with the given name exists.
 * @param {string} name - The name of the cookie to check.
 * @returns {boolean}
 */
function hasCookie (name: string): boolean {
  /* if no cookies -> return false */
  if (!document.cookie.length) { return false; }
  /* check the existing of the cookie with name */
  for (let cookie of document.cookie.split(";")) {
    if (decodeURIComponent(cookie.trim().split("=")[0]) === name) {
      return true;
    }
  }
  return false;
}


/* removeCookie(Options object);: boolean */
/* removeCookie(name: string [, path = "/"
  [, domain [, secure [, SameSite = "Lax" [, HttpOnly ]]]]]): boolean */
/**
 * @description Removes a cookie by name.
 * @param {string | ObjectLike} name - The name of the cookie to remove or an options object.
 * @param {string} [path="/"] - The path where the cookie is valid.
 * @param {string} [domain] - The domain where the cookie is valid.
 * @param {boolean} [secure] - Whether the cookie is only sent over secure connections.
 * @param {string} [SameSite="Lax"] - The SameSite attribute of the cookie.
 * @param {boolean} [HttpOnly] - Whether the cookie is inaccessible to JavaScript.
 * @returns {boolean} True if the cookie existed and was removed, false otherwise.
 */
function removeCookie (
  name: string | ObjectLike,
  path: string = "/",
  domain: string,
  secure: boolean,
  SameSite: string = "Lax",
  HttpOnly: boolean): boolean {
  /* if no cookies -> return false */
  if (!document.cookie.length) { return false; }
  if (name && typeof name === "object") {
    let settings = name;
    name = settings.name;
    path = settings.path || "/";
    domain = settings.domain;
    secure = settings.secure;
    SameSite = settings.SameSite || "Lax";
    HttpOnly = settings.HttpOnly;
  }
  /* check the existing of the cookie with name */
  let result = false;
  for (let cookie of document.cookie.split(";")) {
    if (decodeURIComponent(cookie.trim().split("=")[0]) === name) {
      result = true;
      break;
    }
  }
  /* if cookie doesn't exists -> return false */
  if (result) {
    document.cookie = encodeURIComponent(name as string)
      + "=; expires=Thu, 01 Jan 1970 00:00:01 GMT"
      + "; path=" + path
      + (domain ? "; domain=" + domain : "")
      + (secure ? "; secure" : "")
      + (typeof SameSite === "string" && SameSite.length ?
        "; SameSite=" + SameSite : "")
      + (HttpOnly ? "; HttpOnly" : "")
      + ";";
  }
  return result;
}


/* clearCookies(Options object): undefined */
/* clearCookies([path = "/"
  [, domain [, secure [, SameSite = "Lax" [, HttpOnly ]]]]]): undefined */
/**
 * @description Clears all cookies.
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
  if (path && typeof path === "object") {
    let settings = path;
    path = settings.path ?? "/";
    domain = settings.domain;
    secure = settings.secure;
    SameSite = settings.SameSite ?? "Lax";
    HttpOnly = settings.HttpOnly;
  }
  if (document.cookie.length) {
    /* get the cookie names */
    for(let item of document.cookie.split(";")) {
      document.cookie = encodeURIComponent(item.trim().split("=")[0])
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
 * @param {unknown} value
 * @returns {unknown[]} An array wrapping the value, or the original array if already one.
 */
const castArray = (value: unknown): unknown[] =>
  typeof value === "undefined" ? [] : (isArray(value) ? value : [value]);


/**
 * @description Returns an iterator with not `null` and `undefined` values from the given Iterable or ArrayLike object.
 * @param {IterableLike} iter
 * @returns {Iterator<unknown>}
 */
const compact = (iter: IterableLike): Iterator<unknown> =>
  Iterator.from(iter).filter((value: unknown): boolean => value != null);


/**
 * @description Returns an array with unique values from the given Iterable.
 * @param {IterableLike} iter - The iterable to process.
 * @param {string | Function} [resolver] - A property name or function to determine uniqueness.
 * @returns {unknown[] | void} An array with unique values, or void if no iterable is provided.
 */
function unique (
  iter: IterableLike,
  resolver?: string | Function | null | undefined): unknown[] | void {
  if (resolver == null) { return [...new Set(iter as Iterable<unknown>)]; }
  if (typeof resolver === "string") {
    return Array.from(iter as Iterable<unknown>).reduce(
      function (acc: unknown[], item: unknown) {
        if (acc.every((item2: unknown): boolean =>
          (item2 as ObjectLike)[resolver] !== (item as ObjectLike)[resolver])) {
          acc.push(item);
        }
        return acc;
      }, []);
  }
  if (typeof resolver === "function") {
    let cache = new Map();
    for (let item of iter as Iterable<unknown>) {
      let key = resolver(item);
      if (!cache.has(key)) { cache.set(key, item); }
    }
    return [...cache.values()];
  }
}


/**
 * @description Counts the number of elements in an iterable that satisfy a given condition.
 * @param {IterableLike} iter - The iterable to process.
 * @param {Function} callback - The callback function that tests each element.
 * @returns {number} The count of elements that satisfy the condition.
 */
const count = (iter: IterableLike, callback: Function): number =>
  Iterator.from(iter).reduce(
    (acc, value, index) => callback(value, index) ? ++acc : acc,
    0
  );

/**
 * @description Creates a deep clone of an array, including nested arrays.
 * @param {unknown[]} array - The array to clone.
 * @returns {unknown[]} A deep clone of the input array.
 */
function arrayDeepClone ([...array]: unknown[]): unknown[] {
  const _ADC = (value: unknown): unknown[] =>
    isArray(value) ? Array.from(value, _ADC) : (value as unknown[]);
  return _ADC(array);
}


/**
 * @description Returns all elements of an iterable except the last one.
 * @param {IterableLike} iter - The iterable to process.
 * @returns {Iterable<unknown>} An array containing all elements except the last one.
 */
function* initial (iter: IterableLike): Iterable<unknown> {
  let iterator = Iterator.from(iter);
  let lastValue = iterator.next().value;
  let nextResult = iterator.next();
  while (!nextResult.done) {
    yield lastValue;
    lastValue = nextResult.value;
    nextResult = iterator.next();
  }
}


/**
 * @description Returns a new array with the elements of the input iterable shuffled randomly.
 * @param {IterableLike} iter - The iterable to shuffle.
 * @returns {unknown[]} A new array with the elements shuffled.
 */
function shuffle ([...array]: unknown[]): unknown[] {
  for (let index = array.length - 1; index > 0; index--) {
    let pos = Math.floor(Math.random() * (index + 1));
    [array[index], array[pos]] = [array[pos], array[index]];
  }
  return array;
}


/**
 * @description Returns the minimum value from the provided arguments.
 * @param {...unknown} args - The values to compare.
 * @returns {unknown} The minimum value among the provided arguments.
 */
const min = (...args: unknown[]): unknown => args.reduce(
    (acc: any, value: any): unknown => value < acc ? value : acc,
    args[0]
  );


/**
 * @description Returns the maximum value from the provided arguments.
 * @param {...unknown} args - The values to compare.
 * @returns {unknown} The maximum value among the provided arguments.
 */
const max = (...args: unknown[]): unknown => args.reduce(
    (acc: any, value: any): unknown => value > acc ? value : acc,
    args[0]
  );


/**
 * @description Returns an array with the given value repeated n times.
 * @param {unknown} value
 * @param {number} [num=100] - The number of times to repeat the value.
 * @returns {unknown[]}
 */
const arrayRepeat = (value: unknown, num: number = 100): unknown[] =>
  Array(num).fill(value);


/**
 * @description Returns an array by cycling through the elements of the input iterable n times.
 * @param {IterableLike} iter - The iterable to cycle through.
 * @param {number} [num=100] - The number of times to cycle through the iterable.
 * @returns {unknown[]} An array containing the cycled elements.
 */
const arrayCycle = ([...array]: unknown[], num: number = 100): unknown[] =>
  Array(num).fill(array).flat();


/**
 * @description Returns an array representing a range of numbers.
 * @param {number} [start=0] - The starting number of the range.
 * @param {number} [end=99] - The ending number of the range.
 * @param {number} [step=1] - The step between each number in the range.
 * @returns {unknown[]} An array representing the range of numbers.
 */
const arrayRange = (
  start: number = 0,
  end: number = 99,
  step: number = 1): unknown[] => Array.from(
    {length: (end - start) / step + 1},
    (_v, i: number): number => start + (i * step)
  );


/**
 * @description Merges multiple iterables into an array of tuples, where each tuple contains elements from the input iterables at the same index.
 * @param {...IterableLike} args - The iterables to zip together.
 * @returns {unknown[][]} An array of tuples containing elements from the input iterables.
 */
function zip (...args: unknown[]): unknown[] {
  args = args.map((value: unknown): unknown =>
    Array.from(value as Iterable<unknown>));
  return Array.from(
      {length: Math.min(...args.map(v => (v as ObjectLike).length))}
    ).map((_, i: number): unknown[] => args.map(v => (v as ObjectLike)[i]));
}


/**
 * @description Splits an array of tuples into multiple arrays, where each array contains elements from the input tuples at the same index.
 * @param {IterableLike} iter - The iterable of tuples to unzip.
 * @returns {unknown[]} An array of arrays containing elements from the input tuples.
 */
const unzip = ([...array]: unknown[]): unknown[] =>
  array.map((iter: unknown): unknown[] => Array.from(iter as Iterable<unknown>))
    .reduce(function (acc, value): unknown[] {
      value.forEach(function (item, index): void {
        if (!isArray(acc[index])) { acc[index] = []; }
        (acc as ObjectLike)[index].push(item);
      });
      return acc;
    }, []);


/**
 * @description Merges two iterables into an object, where elements from the first iterable are used as keys and elements from the second iterable are used as values.
 * @param {IterableLike} array1 - The iterable to use as keys.
 * @param {IterableLike} array2 - The iterable to use as values.
 * @returns {object} An object containing key-value pairs from the input iterables.
 */
function zipObj ([...array1]: unknown[], [...array2]: unknown[]): ObjectLike {
  let result: ObjectLike = {};
  let length = Math.min(array1.length, array2.length);
  for (let index = 0; index < length; index++) {
    (result as ObjectLike)[(array1 as ObjectLike)[index]] = array2[index];
  }
  return result;
}


/**
 * @description Adds a value to an array if it does not already exist in the array.
 * @param {unknown[]} array - The array to add the value to.
 * @param {unknown} value - The value to add to the array.
 * @returns {boolean} True if the value was added, false if it already existed.
 */
const arrayAdd = (array: unknown[], value: unknown): boolean =>
  !array.includes(value) ? !!array.push(value) : false;


/**
 * @description Clears all elements from an array.
 * @param {unknown[]} array
 * @returns {unknown[]}
 */
function arrayClear (array: unknown[]): unknown[] {
  array.length = 0;
  return array;
}


/**
 * @description Removes a value from an array. If `all` is true, removes all occurrences of the value.
 * @param {unknown[]} array - The array to remove the value from.
 * @param {unknown} value - The value to remove from the array.
 * @param {boolean} [all=false] - Whether to remove all occurrences of the value.
 * @returns {boolean}
 */
function arrayRemove (
  array: unknown[],
  value: unknown,
  all: boolean = false): boolean {
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


/**
 * @description Removes elements from an array that satisfy a given condition. If `all` is true, removes all occurrences that satisfy the condition.
 * @param {unknown[]} array - The array to remove elements from.
 * @param {(value: unknown, index: number, obj: unknown[]) => unknown} callback - The callback function that tests each element.
 * @param {boolean} [all=false] - Whether to remove all occurrences that satisfy the condition.
 * @returns {boolean} True if any elements were removed, false otherwise.
 */
function arrayRemoveBy (
  array: unknown[],
  callback: (value: unknown, index: number, obj: unknown[]) => unknown,
  all: boolean = false): boolean {
  let found = array.findIndex(callback) > -1;
  if (!all) {
    let pos = array.findIndex(callback);
    if (pos > -1) { array.splice(pos, 1); }
  } else {
    let pos = -1;
    while ((pos = array.findIndex(callback)) > -1) { array.splice(pos, 1); }
  }
  return found;
}


/**
 * @description Merges multiple arrays or values into the target array.
 * @param {unknown[]} target - The array to merge into.
 * @param {...unknown} sources - The arrays or values to merge into the target array.
 * @returns {unknown[]} The merged array.
 */
function arrayMerge (target: unknown[], ...sources: unknown[]): unknown[] {
  for (const source of sources) {
    if (Array.isArray(source)) {
      target.push(...source);
    } else {
      target.push(source);
    }
  }
  return target;
}


/**
 * @description Generates a sequence of numbers within a specified range.
 * @param {number} [start=0] - The starting number of the range.
 * @param {number} [step=1] - The step between each number in the range.
 * @param {number} [end=Infinity] - The ending number of the range.
 * @yields {number} The next number in the range.
*/
function* iterRange (
  start: number = 0,
  step: number = 1,
  end: number = Infinity): Generator<number, void, unknown> {
  let index = start;
  while (index <= end) {
    yield index;
    index += step;
  }
}


/**
 * @description Cycles through the elements of the input iterable a specified number of times.
 * @param {unknown[]} array - The iterable to cycle through.
 * @param {number} [num=Infinity] - The number of times to cycle through the iterable.
 * @yields The next element in the cycled iterable.
 */
function* iterCycle (
  [...array]: unknown[],
  num: number = Infinity): Iterator<unknown> {
  let index = 0;
  while (index++ < num) { yield* array; }
}


/**
 * @description Repeats a given value a specified number of times.
 * @param {unknown} value
 * @param {number} [num=Infinity] - The number of times to repeat the value.
 * @yields The next repeated value.
 */
function* iterRepeat (value: unknown, num: number = Infinity): Iterator<unknown> {
  let index = 0;
  while (index++ < num) { yield value; }
}


/**
 * @description Yields elements from `begin` (inclusive) up to `end` (exclusive) from an iterable or iterator. Works similarly to Array.prototype.slice.
 * @param {IterableLike} iter - Iterable or iterator to slice.
 * @param {number} begin - Start index (inclusive, default: 0).
 * @param {number} end - End index (exclusive, default: Infinity).
 * @yields The elements from the specified slice of the input iterable or iterator.
 */
function* slice (
  iter: IterableLike,
  begin: number = 0,
  end: number = Infinity): Iterator<unknown> {
  let length = end - begin;
  yield* Iterator.from(iter).drop(begin).take(length < 0 ? 0 : length);
}


/**
 * @description Yields all elements of an iterable or iterator except the first one. Similar to Array.prototype.slice(1).
 * @param iter - Iterable or iterator to process.
 * @yields The next element in the tail iterator.
 */
function* tail (iter: IterableLike): Iterator<unknown> {
  yield* Iterator.from(iter).drop(1);
}


/**
 * @description Returns the element at a specific position from an iterable or iterator. If the position is out of range, returns undefined.
 * @param iter - Iterable or iterator to extract from.
 * @param pos - Zero-based index of the desired element.
 * @returns The element at the specified position, or undefined if out of range.
 */
function item <T>(iter: IterableLike, pos: number): T | undefined {
  if (pos < 0) { return undefined; }
  let iterator = Iterator.from(iter);
  let index = 0;
  while (true) {
    const { value, done } = iterator.next();
    if (done) { return undefined; }
    if (index === pos) { return value; }
    index++;
  }
}
/* alias */
const nth = item;


/**
 * @description Return the size of the given value.
 * @param {unknown} value
 * @returns {number}
 */
function size (value: unknown): number {
  /* Map + Set + Objects with size property */
  if (typeof (value as ObjectLike).size === "number") {
    return  (value as ObjectLike).size;
  }
  /* Array + TypedArray*/
  if (isArray(value) || isTypedArray(value)) {
    return (value as ObjectLike).length;
  }
  /* ArrayBuffer + DataView */
  if (value instanceof ArrayBuffer || value instanceof DataView) {
    return value.byteLength;
  }
  /* Iterable objects */
  let index = 0;
  for (let _item of Iterator.from(value as IterableLike)) { index++; }
  return index;
}


/**
 * @description Returns the first element from an iterable or iterator. If the iterable is empty, returns undefined.
 * @param iter - Iterable or iterator to extract from.
 * @returns The first element, or undefined if the iterable is empty.
 */
function first <T>(iter: IterableLike): T | undefined {
  let result = Iterator.from(iter).next();
  return result.done ? undefined : result.value;
}
/* alias */
const head = first;


/**
 * @description Returns the last element from an iterable or iterator. If the iterable is empty, returns undefined.
 * @param {IterableLike} iter - Iterable or iterator to extract from.
 * @returns {unknown} The last element, or undefined if the iterable is empty.
 */
const last = (iter: IterableLike): unknown =>
  Iterator.from(iter).reduce((_acc, value) => value);


/**
 * @description Yields the elements of an iterable or iterator in reverse order.
 * @param {unknown[]} array
 * @yields The elements of the input iterable or iterator in reverse order.
 */
function* reverse ([...array]: unknown[]): Iterator<unknown> {
  let index = array.length;
  while (index--) { yield array[index]; }
}


/**
 * @description Returns a new array with the elements of the input iterable sorted.
 * @param {unknown[]} array
 * @param {boolean} numbers - Whether to sort the elements as numbers.
 * @returns {unknown[]} A new array with the sorted elements.
 */
const sort = ([...array]: unknown[], numbers: boolean = false): unknown[] =>
  array.sort(numbers
    ? (a: unknown, b: unknown): number => Number(a) - Number(b)
    : undefined
  );


/**
 * @param {unknown} collection - The collection to search through.
 * @param {unknown} value - The value to look for.
 * @param {undefined | Function} [comparator] - Optional comparator for equality check.
 * @returns {boolean} - Whether the value was found.
 * @throws {TypeError} - If comparator is not a Function or undefined.
 */
function includes (
  collection: unknown,
  value: unknown,
  comparator?: Function): boolean {
  /* Comparator Validation - has to be a function or undefined. */
    if (comparator !== undefined && typeof comparator !== "function") {
    throw new TypeError(
      `[includes] TypeError: comparator is not a function or undefined. Got ${typeOf(comparator)}`
    );
  }
  /* helper functions */
  const _eq = comparator ?? eq; /* SameValueZero */
  /* Collection: Primitives, WeakMap, WeakSet */
  let cType = typeOf(collection);
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
    if ([...collection.keys()].findIndex((item) => _eq(item, value)) > -1) {
      return true;
    }
    if ([...collection.values()].findIndex((item) => _eq(item, value)) > -1) {
      return true;
    }
    return false;
  }
  /* Iterator or Iterables (Array, Set, TypedArrays, other Iterables, etc.) */
  if (isIterator(collection) || isIterable(collection)) {
    if ([...(collection as Iterable<unknown>)].findIndex((item) =>
      _eq(item, value)) > -1) {
      return true;
    }
    return false;
  }
  /* Plain object or function */
  if (["object", "function"].includes(cType)) {
    if (Object.keys(collection).findIndex((item) => _eq(item, value)) > -1) {
      return true;
    }
    if (Object.values(collection).findIndex((item) => _eq(item, value)) > -1) {
      return true;
    }
    if (getOwnPropertySymbols(collection)
      .findIndex((item) => _eq(item, value)) > -1) {
      return true;
    }
    return false;
  }
  /* default return false */
  return false;
}


/**
 * @description Returns the last element in an iterable that satisfies the provided testing function.
 * @param {IterableLike} iter - The iterable to search through.
 * @param {Function} callback - The function to test each element.
 * @returns {unknown} The last element that satisfies the testing function, or undefined if none do.
 */
const findLast = (iter: IterableLike, callback: Function): unknown =>
  Iterator.from(iter).reduce(
    (acc, value, index) => callback(value, index) ? value : acc,
    undefined
  );


/**
 * @description Concatenates multiple iterables or values into a single iterator.
 * @param {unknown[]} ...args - The iterables or values to concatenate.
 * @yields The elements from the concatenated iterables or values.
 */
function* concat (...iterables: unknown[]): Iterator<unknown> {
  for (const iterable of iterables) { yield* (iterable as Iterable<unknown>); }
}


/**
 * @description Joins the elements of an iterable into a single string, separated by the specified separator.
 * @param {IterableLike} iter - The iterable to join.
 * @param {string} [separator=","] - The separator to use between elements.
 * @returns {string} The joined string.
 */
function join (iter: IterableLike, separator: string = ","): string {
  let sep = String(separator);
  return Iterator.from(iter).reduce((acc, item) => acc + sep + item, "")
    .slice(sep.length);
}


/** Math API **/


/**
 * @description Adds two numbers or bigints.
 * @param {Numeric} value1
 * @param {Numeric} value2
 * @returns {Numeric} The result of the operation.
 * @throws {TypeError} If value1 and value2 are of mixed types.
 */
function add (value1: number, value2: number): number;
function add (value1: bigint, value2: bigint): bigint;
function add (value1: Numeric, value2: Numeric): Numeric {
  let tValue1 = typeOf(value1);
  let tValue2 = typeOf(value2);
  if (tValue1 === "number" && tValue2 === "number") {
    return (Math as ObjectLike).sumPrecise([value1, value2]);
  }
  if (tValue1 === "bigint" && tValue2 === "bigint") {
    return (value1 as number) + (value2 as number);
  }
  throw new TypeError(
    `[add] value1 and value2 must be of the same type and either number or bigint. Got: ${tValue1} and ${tValue2}`
  );
}


/**
 * @description Subtract two numbers or bigints.
 * @param {Numeric} value1
 * @param {Numeric} value2
 * @returns {Numeric} The result of the operation.
 * @throws {TypeError} If value1 and value2 are of mixed types.
 */
function sub (value1: number, value2: number): number;
function sub (value1: bigint, value2: bigint): bigint;
function sub (value1: Numeric, value2: Numeric): Numeric {
  let tValue1 = typeOf(value1);
  let tValue2 = typeOf(value2);
  if (tValue1 === "number" && tValue2 === "number") {
    return (Math as ObjectLike).sumPrecise([value1, -value2]);
  }
  if (tValue1 === "bigint" && tValue2 === "bigint") {
    return (value1 as bigint) - (value2 as bigint);
  }
  throw new TypeError(
    `[add] value1 and value2 must be of the same type and either number or bigint. Got: ${tValue1} and ${tValue2}`
  );
}


/**
 * @description Multiply two numbers or bigints.
 * @param {Numeric} value1
 * @param {Numeric} value2
 * @returns {Numeric} The result of the operation.
 * @throws {TypeError} If value1 and value2 are of mixed types.
 */
function mul (value1: number, value2: number): number;
function mul (value1: bigint, value2: bigint): bigint;
function mul (value1: Numeric, value2: Numeric): Numeric {
  let tValue1 = typeOf(value1);
  let tValue2 = typeOf(value2);
  if (tValue1 === "number" && tValue2 === "number") {
    return (value1 as number) * (value2 as number);
  }
  if (tValue1 === "bigint" && tValue2 === "bigint") {
    return (value1 as bigint) * (value2 as bigint);
  }
  throw new TypeError(
    `[mul] value1 and value2 must be of the same type and either number or bigint. Got: ${tValue1} and ${tValue2}`
  );
}


/**
 * @description Divide two numbers or bigints.
 * @param {Numeric} value1
 * @param {Numeric} value2
 * @returns {Numeric} The result of the operation.
 * @throws {RangeError} If value2 is zero.
 * @throws {TypeError} If value1 and value2 are of mixed types.
 */
function div (value1: number, value2: number): number;
function div (value1: bigint, value2: bigint): bigint;
function div (value1: Numeric, value2: Numeric): Numeric {
  let tValue1 = typeOf(value1);
  let tValue2 = typeOf(value2);
  if ((tValue1 === "number" && value2 === 0)
    || (tValue1 === "bigint" && value2 === 0n)) {
    throw new RangeError("[div] Cannot divide by zero");
  }
  if (tValue1 === "number" && tValue2 === "number") {
    return (value1 as number) / (value2 as number);
  }
  if (tValue1 === "bigint" && tValue2 === "bigint") {
    return (value1 as bigint) /(value2 as bigint);
  }
  throw new TypeError(
    `[div] value1 and value2 must be of the same type and either number or bigint. Got: ${tValue1} and ${tValue2}`
  );
}


/**
 * @description Performs integer division of two numbers or bigints.
 * @param {Numeric} value1
 * @param {Numeric} value2
 * @returns {Numeric} The result of the operation.
 * @throws {RangeError} If value2 is zero.
 * @throws {TypeError} If value1 and value2 are of mixed types.
 */
function divMod (value1: number, value2: number): number;
function divMod (value1: bigint, value2: bigint): bigint;
function divMod (value1: Numeric, value2: Numeric): Numeric {
  let tValue1 = typeOf(value1);
  let tValue2 = typeOf(value2);
  if ((tValue1 === "number" && value2 === 0)
    || (tValue1 === "bigint" && value2 === 0n)) {
    throw new RangeError("[divMod] Cannot divide by zero");
  }
  if (tValue1 === "number" && tValue2 === "number") {
    return Math.trunc((value1 as number) / (value2 as number));
  }
  if (tValue1 === "bigint" && tValue2 === "bigint") {
    return (value1 as bigint) / (value2 as bigint);
  }
  throw new TypeError(
    `[divMod] value1 and value2 must be of the same type and either number or bigint. Got: ${tValue1} and ${tValue2}`
  );
}


/**
 * @description Remainder of division (modulus) of two numbers or bigints.
 * @param {Numeric} value1
 * @param {Numeric} value2
 * @returns {Numeric} The result of the operation.
 * @throws {RangeError} If value2 is zero.
 * @throws {TypeError} If value1 and value2 are of mixed types.
 */
function mod (value1: number, value2: number): number;
function mod (value1: bigint, value2: bigint): bigint;
function mod (value1: Numeric, value2: Numeric): Numeric {
  let tValue1 = typeOf(value1);
  let tValue2 = typeOf(value2);
  if ((tValue1 === "number" && value2 === 0)
    || (tValue1 === "bigint" && value2 === 0n)) {
    throw new RangeError("[mod] Cannot divide by zero");
  }
  if (tValue1 === "number" && tValue2 === "number") {
    return Math.trunc((value1 as number) % (value2 as number));
  }
  if (tValue1 === "bigint" && tValue2 === "bigint") {
    return (value1 as bigint) % (value2 as bigint);
  }
  throw new TypeError(
    `[mod] value1 and value2 must be of the same type and either number or bigint. Got: ${tValue1} and ${tValue2}`
  );
}


/**
 * @description Checks if a value is a floating-point number.
 * @param {unknown} value
 * @returns {boolean}
 */
const isFloat = (value: unknown): boolean =>
  typeof value === "number" && value === value && !Number.isInteger(value);


/**
 * @description Converts a value to an integer within the safe integer range.
 * @param {unknown} value
 * @returns {number}
 */
function toInteger (value: unknown): number {
  value = ((value = Math.trunc(Number(value))) !== value || value === 0)
    ? 0
    : value;
  return Math.min(
    Math.max(value as number, Number.MIN_SAFE_INTEGER),
    Number.MAX_SAFE_INTEGER
  );
}


/* toIntegerOrInfinity(value: unknown): integer | Infinity | -Infinity */
/**
 * @description Converts a value to an integer or infinity.
 * @param {unknown} value
 * @returns {number}
 */
const toIntegerOrInfinity = (value: unknown): number =>
  ((value = Math.trunc(Number(value))) !== value || value === 0)
    ? 0
    : value as number;


/**
 * @description Sums multiple values, using precise addition for numbers.
 * @param {...Numeric} args - The values to sum.
 * @returns {Numeric} The sum of the values.
 * @throws {TypeError} If all parameter are not number or bigint.
 */
function sum (...args: Numeric[]): Numeric {
  if (args.every((value: unknown): boolean => typeof value === "number")) {
    return (Math as ObjectLike).sumPrecise(args);
  }
  if (args.every((value: unknown): boolean => typeof value === "bigint")) {
    return args.slice(1).reduce((acc: bigint, value: Numeric): bigint =>
      (acc as bigint) + (value as bigint), args[0] as bigint);
  }
  throw new TypeError(
    `[sum] all arguments must be of the same type and either number or bigint. Got: ${args.map((v) => typeOf(v)).join(", ")}`
  );
}


/**
 * @description Calculates the average of multiple numbers using precise addition.
 * @param {...number} args - The numbers to average.
 * @returns {number} The average of the numbers.
 */
const avg = (...args: number[]): number =>
  (Math as ObjectLike).sumPrecise(args) / args.length;


/**
 * @description Calculates the product of multiple numbers and bigints.
 * @param {Numeric} first
 * @param {...Numeric} args - The numbers to multiply.
 * @returns {Numeric} The product of the numbers.
 */
function product (first: number, ...args: number[]): number;
function product (first: bigint, ...args: bigint[]): bigint;
function product (first: Numeric, ...args: Numeric[]): Numeric {
  return (typeof first === "bigint")
    ? (args as bigint[])
      .reduce((acc: bigint, v: bigint): bigint => acc * v, first as bigint)
    : (args as number[])
      .reduce((acc: number, v: number): number => acc * v, first as number);
}


/**
 * @description Returns the value of a base raised to a power.
 * @param {Numeric} base - The base value.
 * @param {Numeric} power - The power value.
 * @returns {Numeric} The product of the numbers.
 * @throws {TypeError} if base and power are of mixed types or not number or bigint.
 */
function pow (base: number, power: number): number;
function pow (base: bigint, power: bigint): bigint;
function pow (base: Numeric, power: Numeric): Numeric {
  let tBase = typeOf(base);
  let tPower = typeOf(power);
  if (tBase !== tPower || (tBase !== "number" && tBase !== "bigint")) {
    throw new TypeError(
      `[pow] base and power must be of the same type and either number or bigint. Got: ${tBase} and ${tPower}`
    );
  }
  return (tBase === "bigint" && tPower === "bigint")
    ? (base as bigint) ** (power as bigint)
    : (base as number) ** (power as number);
}


/**
 * @description Clamps a value between a minimum and maximum.
 * @param {Numeric} value
 * @param {Numeric} min
 * @param {Numeric} max
 * @returns {Numeric}
 */
function clamp (value: number, min: number, max: number): number;
function clamp (value: bigint, min: bigint, max: bigint): bigint;
function clamp (
  value: Numeric,
  min: Numeric = Number.MIN_SAFE_INTEGER,
  max: Numeric = Number.MAX_SAFE_INTEGER): Numeric {
  /* normalize */
  function _numberNormalize (value: unknown): Numeric {
    let tValue = typeof value;
    if (tValue !== "bigint" && tValue !== "number") { value = Number(value); }
    return value === -Infinity ? Number.MIN_SAFE_INTEGER
      : value === Infinity ? Number.MAX_SAFE_INTEGER
      : value === 0 ? 0
      : value as Numeric;
  }
  if (typeof value !== "bigint"
    && typeof min !== "bigint"
    && typeof max !== "bigint") {
    value = _numberNormalize(value);
    min = _numberNormalize(min);
    max = _numberNormalize(max);
  }
  /* NaN: val, min, max */
  if (_isNan(value)) { return value; }
  if (_isNan(min) || _isNan(max)) {
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
/* alias */
const minmax = clamp;


/**
 * @description Checks if a number is safe integer and even.
 * @param {unknown} value
 * @returns {boolean}
 */
const isEven = (value: unknown): boolean =>
  (typeof value === "number" && Number.isSafeInteger(value)) ? value % 2 === 0
    : (typeof value === "bigint") ? value % 2n === 0n
    : false;


/**
 * @description Checks if a number is safe integer and odd.
 * @param {unknown} value
 * @returns {boolean}
 */
const isOdd = (value: unknown): boolean =>
  (typeof value === "number" && Number.isSafeInteger(value)) ? value % 2 !== 0
    : (typeof value === "bigint") ? value % 2n !== 0n
    : false;


/**
 * @description Checks if the sign bit of a number or bigint is set (i.e., if the value is negative).
 * @param {unknown | Numeric} value
 * @returns {boolean}
 */
const signbit = (value: unknown | Numeric): boolean =>
  ((value = Number(value)) !== value)
    ? false
    : (_oIs(value, -0) || (
        (typeof value === "number" && value < 0)
          || (typeof value === "bigint" && value < 0n)
      )
    );


/* randomInt([max: integer]): integer */
/* randomInt(min: integer, max: integer): integer */
/**
 * @description Generates a random integer between the specified minimum and maximum values.
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
  let result = (Math.random() * (max - min + 1)) + min;
  return result > max ? max : result;
}


/**
 * @description Checks if a number is within a specified range (inclusive).
 * @param {Numeric} value
 * @param {Numeric} min
 * @param {Numeric} max
 * @returns {boolean}
 */
function inRange (value: number, min: number, max: number): boolean;
function inRange (value: bigint, min: bigint, max: number): boolean;
function inRange (value: Numeric, min: Numeric, max: Numeric): boolean {
  let tValue = typeof value;
  let tMin = typeof min;
  let tMax = typeof max;
  if ((tValue=== "number" && tMin === "number" && tMax === "number")
    || (tValue === "bigint" && tMin === "bigint" && tMax === "bigint")) {
    return value >= min && value <= max;
  }
  return false;
}


export default {
  /** object header **/
  VERSION: `${VERSION} node"`,
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
  randomUUIDv7,
  delay,
  randomBoolean,
  deepAssign,
  sizeIn,
  unBind,
  bind,
  constant,
  identity,
  noop,
  T,
  F,
  timestampID,
  /** String API **/
  b64Encode,
  b64Decode,
  strCount,
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
  constructorOf,
  isNonNullable,
  isNonNullablePrimitive,
  isArrowFunction,
  isAsyncIterator,
  isTypedCollection,
  is,
  toObject,
  toPrimitive,
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
  isEmpty,
  isProxy,
  isAsyncGeneratorFunction,
  isPlainObject,
  isObject,
  isFunction,
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
  isGeneratorFunction,
  isAsyncFunction,
  /** Collections API **/
  castArray,
  compact,
  unique,
  count,
  arrayDeepClone,
  initial,
  shuffle,
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
  findLast,
  concat,
  join,
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
  pow,
  clamp,
  minmax,
  isEven,
  isOdd,
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
  randomUUIDv7,
  delay,
  randomBoolean,
  deepAssign,
  sizeIn,
  unBind,
  bind,
  constant,
  identity,
  noop,
  T,
  F,
  timestampID,
  /** String API **/
  b64Encode,
  b64Decode,
  strCount,
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
  constructorOf,
  isNonNullable,
  isNonNullablePrimitive,
  isArrowFunction,
  isAsyncIterator,
  isTypedCollection,
  is,
  toObject,
  toPrimitive,
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
  isEmpty,
  isProxy,
  isAsyncGeneratorFunction,
  isPlainObject,
  isObject,
  isFunction,
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
  isGeneratorFunction,
  isAsyncFunction,
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
  findLast,
  concat,
  join,
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
  pow,
  clamp,
  minmax,
  isEven,
  isOdd,
  signbit,
  randomInt,
  randomFloat,
  inRange
};
