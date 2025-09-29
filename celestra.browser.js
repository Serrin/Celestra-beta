// @ts-check
"use strict";
/**
 * @name Celestra
 * @version 6.1.0 browser
 * @author Ferenc Czigler
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
        }
        else {
            global.globalThis = global;
        }
    }
})(typeof this === "object" ? this : Function("return this")());
/** polyfills **/
/* Math.sumPrecise(); */
if (!("sumPrecise" in Math)) {
    // @ts-ignore
    Math.sumPrecise = function sumPrecise([...array]) {
        /* empty iterator */
        if (array.length === 0) {
            return -0;
        }
        /* iterator with items */
        if (array.every((value) => typeof value === "number")) {
            /* return NaN + Infinity + -Infinity */
            let inf = array.indexOf(Infinity) > -1, negInf = array.indexOf(-Infinity) > -1;
            if (array.some((value) => value !== value)
                || (inf && negInf)) {
                return NaN;
            }
            if (inf) {
                return Infinity;
            }
            if (negInf) {
                return -Infinity;
            }
            /* sum hi */
            let hi = array.filter((value) => (value === 1e20 || value === -1e20))
                .reduce((acc, value) => acc + value, 0);
            /* sum lo - Kahan sum */
            let lo = 0.0, c = 0.0;
            for (let item of array.filter((value) => (value !== 1e20 && value !== -1e20))) {
                let y = item - c;
                let t = lo + y;
                c = (t - lo) - y;
                lo = t;
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
            if ((lo > 0 && hi < 0) || (lo < 0 && hi > 0)) {
                return lo + hi;
            }
            return lo;
        }
        /* not number items -> TypeError */
        throw new TypeError("values passed to Math.sumPrecise must be numbers");
    };
}
/* Error.isError(); */
if (!("isError" in Error)) {
    // @ts-ignore
    Error.isError = function isError(value) {
        let s = Object.prototype.toString.call(value).slice(8, -1).toLowerCase();
        return (s === "error" || s === "domexception");
    };
}
/* Object.groupBy(); */
if (!("groupBy" in Object)) {
    // @ts-ignore
    Object.defineProperty(Object, "groupBy", {
        "configurable": true, "writable": true, "enumerable": true,
        "value": function (items, callbackFn) {
            "use strict";
            if (!(typeof callbackFn === "function")) {
                throw new TypeError();
            }
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
        "value": function (items, callbackFn) {
            "use strict";
            if (!(typeof callbackFn === "function")) {
                throw new TypeError();
            }
            let result = new Map(), index = 0;
            for (let item of items) {
                let key = callbackFn(item, index++);
                if (!(result.has(key))) {
                    result.set(key, []);
                }
                result.get(key).push(item);
            }
            return result;
        }
    });
}
/* Array.fromAsync(); */
if (!Array.fromAsync) {
    // @ts-ignore
    Array.fromAsync = async function fromAsync(arrayLike, mapfn, thisArg) {
        const isConstructor = (value) => (typeof value === "function" && typeof value.prototype === "object");
        const errorMsg = "Input length exceed the Number.MAX_SAFE_INTEGER.";
        if (Symbol.asyncIterator in arrayLike || Symbol.iterator in arrayLike) {
            let result = isConstructor(this) ? new this : Array(0), index = 0;
            for await (const item of arrayLike) {
                if (index > Number.MAX_SAFE_INTEGER) {
                    throw TypeError(errorMsg);
                }
                else {
                    if (!mapfn) {
                        result[index] = item;
                    }
                    else {
                        result[index] = await mapfn.call(thisArg, item, index);
                    }
                }
                index++;
            }
            result.length = index;
            return result;
        }
        else {
            let length = arrayLike.length, result = isConstructor(this) ? new this(length) : Array(length), index = 0;
            while (index < length) {
                if (index > Number.MAX_SAFE_INTEGER) {
                    throw TypeError(errorMsg);
                }
                let item = await arrayLike[index];
                if (!mapfn) {
                    result[index] = item;
                }
                else {
                    result[index] = await mapfn.call(thisArg, item, index);
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
    globalThis.crypto.randomUUID = function randomUUID() {
        // @ts-ignore
        return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) => (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16));
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
        "value": function (fn) { return this.slice().sort(fn); }
    });
}
/* Array.prototype.toSpliced(); */
if (!("toSpliced" in Array.prototype)) {
    Object.defineProperty(Array.prototype, "toSpliced", {
        "configurable": true, "writable": true, "enumerable": false,
        "value": function (start, deleteCount, ...items) {
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
        "value": function (index, value) {
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
        "value": function () {
            "use strict";
            return this.slice().reverse();
        }
    });
}
/* TypedArray.prototype.toSorted(); */
if (!("toSorted" in Uint8Array.prototype)) {
    Object.defineProperty(Uint8Array.prototype, "toSorted", {
        "configurable": true, "writable": true, "enumerable": false,
        "value": function (fn) { return this.slice().sort(fn); }
    });
}
/* TypedArray.prototype.with(); */
if (!("with" in Uint8Array.prototype)) {
    Object.defineProperty(Uint8Array.prototype, "with", {
        "configurable": true, "writable": true, "enumerable": false,
        "value": function (index, value) {
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
        Object.getPrototypeOf(function* () { }).constructor;
}
/* globalThis.AsyncFunction; */
// @ts-ignore
if (!globalThis.AsyncFunction) {
    // @ts-ignore
    globalThis.AsyncFunction =
        Object.getPrototypeOf(async function () { }).constructor;
}
/* globalThis.AsyncGeneratorFunction; */
// @ts-ignore
if (!globalThis.AsyncGeneratorFunction) {
    // @ts-ignore
    globalThis.AsyncGeneratorFunction =
        Object.getPrototypeOf(async function* () { }).constructor;
}
/** Core API **/
export const BASE16 = "0123456789ABCDEF";
export const BASE32 = "234567ABCDEFGHIJKLMNOPQRSTUVWXYZ";
export const BASE36 = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
export const BASE58 = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
export const BASE62 = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
export const WORDSAFEALPHABET = "23456789CFGHJMPQRVWXcfghjmpqvwx"; /* 31 */
/**
 * @description This function is a general purpose, type safe, predictable stringifier.
 *
 * @param {unknown} value
 * @returns {string}
 */
export function toSafeString(value) {
    const seen = new WeakSet();
    const replacer = (_key, value) => {
        if (typeof value === "function") {
            return `[Function: ${value.name || "anonymous"}]`;
        }
        if (typeof value === "symbol") {
            return value.toString();
        }
        if (value instanceof Date) {
            return `Date(${value.toISOString()})`;
        }
        if (value instanceof Error) {
            return `${value.name}: ${value.message}, ${value.stack ?? ""}`;
        }
        if (value && typeof value === "object") {
            if (seen.has(value)) {
                return "[Circular]";
            }
            ;
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
    }
    catch (_e) {
        return String(value);
    }
}
/* tap(function: function): function(v) */
export const tap = (fn) => function (value) { fn(value); return value; };
/* once(function: function): function */
export function once(fn) {
    let called = false;
    let result;
    return function (...args) {
        if (!called) {
            called = true;
            result = fn(...args);
        }
        return result;
    };
}
/* curry (function: function): function */
export function curry(fn) {
    const curried = (...args) => args.length >= fn.length
        ? fn(...args)
        : (...rest) => curried(...args, ...rest);
    return curried;
}
/* pipe (function1:function [, functionN: function]): function */
export const pipe = (...functions) => (first) => functions.reduce((value, fn) => fn(value), first);
/* compose (function1: function [, functionN: function]): function */
export const compose = (...functions) => (first) => functions.reduceRight((value, fn) => fn(value), first);
/* pick (object: object, keys: array): object */
export const pick = (obj, keys) => keys.reduce(function (acc, key) {
    if (key in obj) {
        acc[key] = obj[key];
    }
    return acc;
}, {});
/* omit (object: object, keys: array): object */
export const omit = (obj, keys) => Object.keys(obj).reduce(function (acc, key) {
    if (!keys.includes(key)) {
        acc[key] = obj[key];
    }
    return acc;
}, {});
/* assoc (object: object, key: string, value: any): object */
export const assoc = (obj, property, value) => ({ ...obj, [property]: value });
/* asyncNoop (): Promise - do nothing */
// @ts-ignore
export function asyncNoop() {
    return new Promise(function (resolve) { resolve(); });
}
/* asyncT (): Promise - return true */
async function asyncT() { return true; }
/* asyncF (): Promise - return false */
async function asyncF() { return false; }
/* asyncConstant (value): async function */
export function asyncConstant(value) {
    return async function () { return value; };
}
/* asyncIdentity (value): Promise - return value */
async function asyncIdentity(value) { return value; }
/* deleteOwnProperty(object, property [,Throw = false]): number | thrown error*/
export function deleteOwnProperty(obj, property, Throw = false) {
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
export function createPolyfillMethod(obj, property, value) {
    if (!(Object.hasOwn(obj, property))) {
        Object.defineProperty(obj, property, {
            writable: true, enumerable: false, configurable: true, value: value
        });
    }
    return (obj[property] === value);
}
/* createPolyfillProperty(object, property, value: any): boolean */
export function createPolyfillProperty(obj, property, value) {
    if (!(Object.hasOwn(obj, property))) {
        Object.defineProperty(obj, property, {
            writable: true, enumerable: true, configurable: true, value: value
        });
    }
    return (obj[property] === value);
}
/* randomUUIDv7(v4: boolean = false): string */
export function randomUUIDv7(v4 = false) {
    let ts = Date.now().toString(16).padStart(12, "0") + (v4 ? "4" : "7");
    // @ts-ignore
    let uuid = Array.from(([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) => (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)));
    let index = 0, pos = 0;
    while (index < 13) {
        if (pos === 8 || pos === 13) {
            pos++;
        }
        uuid[pos] = ts[index];
        pos++;
        index++;
    }
    return uuid.join("");
}
/* delay(ms: integer).then(callback: function): promise */
export const delay = (milisec) => new Promise(resolve => setTimeout(resolve, milisec));
/* randomBoolean(): boolean */
export const randomBoolean = () => !Math.round(Math.random());
/* getUrlVars([str = location.search]): Object */
export const getUrlVars = (str = location.search) => [...new URLSearchParams(str).entries()]
    .reduce(function (obj, item) { obj[item[0]] = item[1]; return obj; }, {});
/* obj2string(object): string */
export const obj2string = (obj) => Object.keys(obj).reduce((s, p) => s += encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]) + "&", "").slice(0, -1);
/* extend([deep: boolean,] target: object, source1: object[, sourceN]): object*/
export function extend(...args) {
    function _EXT(...args) {
        let targetObject, deep, start;
        if (typeof args[0] === "boolean") {
            targetObject = args[1], deep = args[0], start = 2;
        }
        else {
            targetObject = args[0], deep = false, start = 1;
        }
        for (let i = start, length = args.length, sourceObject; i < length; i++) {
            sourceObject = args[i];
            if (sourceObject != null) {
                for (let key in sourceObject) {
                    if (Object.hasOwn(sourceObject, key)) {
                        if (typeof sourceObject[key] === "object" && deep) {
                            targetObject[key] = _EXT(true, {}, sourceObject[key]);
                        }
                        else {
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
export const sizeIn = (obj) => Object.getOwnPropertyNames(obj).length
    + Object.getOwnPropertySymbols(obj).length;
/* unBind(function): function */
export const unBind = (fn) => Function.prototype.call.bind(fn);
/* bind(function, context: any): function */
/** @return {Function} */
export const bind = Function.prototype.call.bind(Function.prototype.bind);
/* constant(value: any): any */
export const constant = (value) => () => value;
/* identity(value: any): any */
export const identity = (value) => value;
/* noop(): undefined */
export function noop() { }
/* T(): true */
export const T = () => true;
/* F(): false */
export const F = () => false;
/* nanoid([size = 21 [,
  alphabet="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_-"]])
  : string */
export function nanoid(size = 21, alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_-") {
    let result = "", dl = alphabet.length, pos, index = size;
    while (index--) {
        do {
            pos = crypto.getRandomValues(new Uint8Array(1))[0];
        } while (pos >= dl);
        result += alphabet[pos];
    }
    return result;
}
/* timestampID([size = 21
  [, alphabet = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz"]])
  : string */
export function timestampID(size = 21, alphabet = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz") {
    let result = Date.now().toString(36).padStart(10, "0") + "-";
    let dl = alphabet.length, pos, index = ((size > 11) ? size : 12) - 11;
    while (index--) {
        do {
            pos = crypto.getRandomValues(new Uint8Array(1))[0];
        } while (pos >= dl);
        result += alphabet[pos];
    }
    return result;
}
/** Assertion API **/
/* assertIs (
    value: any,
    expected: string | Function | Array<string | Function> | undefined,
    message: string | error
  ): any | throw TypeError */
export function assertIs(value, expected, message) {
    function _is(value, expected) {
        /* validate expected */
        if (!(["string", "function"].includes(typeof expected))
            && !Array.isArray(expected)) {
            throw new TypeError(`[assertIs] TypeError: expectedType must be string, function, or array. Got ${typeof expected}`);
        }
        /* check expected types and constructors */
        const vType = (value === null ? "null" : typeof value);
        let matched = (Array.isArray(expected) ? expected : [expected]).some(function (item) {
            if (typeof item === "string") {
                return vType === item;
            }
            if (typeof item === "function") {
                return value != null && value instanceof item;
            }
            /* validate expected array elements */
            throw new TypeError(`[assertIs] TypeError: expectedType array elements have to be a string or function. Got ${typeof item}`);
        });
        return matched;
    }
    /* assert type checking */
    if (!_is(value, expected)) {
        if (Error.isError(message)) {
            throw message;
        }
        let vName = value.toString ? value.toString() : Object.prototype.toString.call(value);
        let eNames = (Array.isArray(expected) ? expected : [expected]).map((item) => 
        // @ts-ignore
        (typeof item === "string" ? item.toString() : item.name ?? "anonymous")).join(", ");
        throw new TypeError("[assertIs] Assertion failed: " + vName + " is not a " + eNames
            + (message ? " - " + message : ""));
    }
    return value;
}
/* assertIsNot (
    value: any,
    expected: string | Function | Array<string | Function> | undefined,
    message: string | error
  ): any | throw TypeError */
export function assertIsNot(value, expected, message) {
    function _is(value, expected) {
        /* validate expected */
        if (!(["string", "function"].includes(typeof expected))
            && !Array.isArray(expected)) {
            throw new TypeError(`[assertIsNot] TypeError: expectedType must be string, function, or array. Got ${typeof expected}`);
        }
        /* check expected types and constructors */
        const vType = (value === null ? "null" : typeof value);
        let matched = (Array.isArray(expected) ? expected : [expected]).some(function (item) {
            if (typeof item === "string") {
                return vType === item;
            }
            if (typeof item === "function") {
                return value != null && value instanceof item;
            }
            /* validate expected array elements */
            throw new TypeError(`[assertIsNot] TypeError: expectedType array elements have to be a string or function. Got ${typeof item}`);
        });
        return matched;
    }
    /* assert type checking */
    if (_is(value, expected)) {
        if (Error.isError(message)) {
            throw message;
        }
        let vName = value.toString ? value.toString() : Object.prototype.toString.call(value);
        let eNames = (Array.isArray(expected) ? expected : [expected]).map((item) => 
        // @ts-ignore
        (typeof item === "string" ? item.toString() : item.name ?? "anonymous")).join(", ");
        throw new TypeError("[assertIsNot] Assertion failed: " + vName + " is a " + eNames
            + (message ? " - " + message : ""));
    }
    return value;
}
/* assertFail(message | error): thrown error */
export function assertFail(message) {
    if (Error.isError(message)) {
        throw message;
    }
    else {
        throw new Error("[assertFail] Assertion failed" + (message ? ": " + message : ""));
    }
}
/* assertMatch(string, regexp [, message | error]): true | thrown error */
export function assertMatch(string, regexp, message) {
    if (typeof string !== "string") {
        if (Error.isError(message)) {
            throw message;
        }
        throw new TypeError("[assertMatch] TypeError: " + string + " is not a string"
            + (message ? " - " + message : ""));
    }
    if (!(regexp instanceof RegExp)) {
        if (Error.isError(message)) {
            throw message;
        }
        throw new TypeError("[assertMatch] TypeError: " + regexp + " is not a RegExp"
            + (message ? " - " + message : ""));
    }
    if (!(regexp.test(string))) {
        if (Error.isError(message)) {
            throw message;
        }
        throw new Error("[assertMatch] Assertion failed" + (message ? ": " + message : ""));
    }
    return true;
}
/* assertDoesNotMatch(string, regexp [, message | error]):
  true | thrown error */
export function assertDoesNotMatch(string, regexp, message) {
    if (typeof string !== "string") {
        if (Error.isError(message)) {
            throw message;
        }
        throw new TypeError("[assertDoesNotMatch] TypeError: " + string + " is not a string"
            + (message ? " - " + message : ""));
    }
    if (!(regexp instanceof RegExp)) {
        if (Error.isError(message)) {
            throw message;
        }
        throw new TypeError("[assertDoesNotMatch] TypeError: " + regexp + " is not a RegExp"
            + (message ? " - " + message : ""));
    }
    if (regexp.test(string)) {
        if (Error.isError(message)) {
            throw message;
        }
        throw new Error("[assertDoesNotMatch] Assertion failed" + (message ? ": " + message : ""));
    }
    return true;
}
/* assertThrows(callback: function [, message | error]): error | thrown error */
export function assertThrows(callback, message) {
    if (typeof callback !== "function") {
        throw new TypeError("[assertThrows] TypeError: " + callback + " is not a function"
            + (message ? " - " + message : ""));
    }
    try {
        callback();
    }
    catch (err) {
        return err;
    }
    if (Error.isError(message)) {
        throw message;
    }
    throw new Error("[assertThrow] Assertion failed" + (message ? ": " + message : ""));
}
/* assertIsNotNil(value: any [, message | error]): value | thrown error */
export function assertIsNotNil(value, message) {
    if (value == null) {
        if (Error.isError(message)) {
            throw message;
        }
        throw new TypeError("[assertIsNotNil] Assertion failed: " + value + " is null or undefined"
            + (message ? " - " + message : ""));
    }
    return value;
}
/* assertIsNil(value: any [, message | error]): value | thrown error */
export function assertIsNil(value, message) {
    if (value != null) {
        if (Error.isError(message)) {
            throw message;
        }
        throw new TypeError("[assertIsNil] Assertion failed: " + value + " is not null or undefined"
            + (message ? " - " + message : ""));
    }
    return value;
}
/* assertTypeOf(value: any, type: string [, message | error]):
  value | thrown error */
/** @deprecated * @return {any} */
export function assertTypeOf(value, type, message) {
    const _type = (value) => ((value === null) ? "null" : (typeof value));
    if (typeof type !== "string") {
        if (Error.isError(message)) {
            throw message;
        }
        throw new TypeError("[assertTypeOf] TypeError: " + type + " is not a string"
            + (message ? " - " + message : ""));
    }
    if (_type(value) !== type) {
        if (Error.isError(message)) {
            throw message;
        }
        throw new TypeError("[assertTypeOf] Assertion failed: " + value + " is not a " + type
            + (message ? " - " + message : ""));
    }
    return value;
}
/* assertNotTypeOf(value: any, type: string [, message | error]):
  value | thrown error */
/** @deprecated * @return {any} */
export function assertNotTypeOf(value, type, message) {
    const _type = (value) => ((value === null) ? "null" : (typeof value));
    if (typeof type !== "string") {
        if (Error.isError(message)) {
            throw message;
        }
        throw new TypeError("[assertNotTypeOf] TypeError: " + type + " is not a string"
            + (message ? " - " + message : ""));
    }
    if (_type(value) === type) {
        if (Error.isError(message)) {
            throw message;
        }
        throw new TypeError("[assertNotTypeOf] Assertion failed: " + value + " is not a " + type
            + (message ? " - " + message : ""));
    }
    return value;
}
/* assertInstanceOf(value: any, Class: constructor [, message | error]):
  value | thrown error */
/** @deprecated * @return {any} */
export function assertInstanceOf(value, Class, message) {
    if (typeof Class !== "function") {
        if (Error.isError(message)) {
            throw message;
        }
        throw new TypeError("[assertInstanceOf] TypeError: " + Class + " is not a function"
            + (message ? " - " + message : ""));
    }
    if (!(value instanceof Class)) {
        if (Error.isError(message)) {
            throw message;
        }
        throw new TypeError("[assertInstanceOf] Assertion failed: " + value + " is not a "
            + ((Class.name !== "") ? Class.name : Class)
            + (message ? " - " + message : ""));
    }
    return value;
}
/* assertNotInstanceOf(value: any, Class: constructor [, message | error]):
  value | thrown error */
/** @deprecated * @return {any} */
export function assertNotInstanceOf(value, Class, message) {
    if (typeof Class !== "function") {
        if (Error.isError(message)) {
            throw message;
        }
        throw new TypeError("[assertNotInstanceOf] TypeError: " + Class + " is not a function"
            + (message ? " - " + message : ""));
    }
    if (value instanceof Class) {
        if (Error.isError(message)) {
            throw message;
        }
        throw new TypeError("[assertNotInstanceOf] Assertion failed: " + value + " is not a "
            + ((Class.name !== "") ? Class.name : Class)
            + (message ? " - " + message : ""));
    }
    return value;
}
/* assert(value: any [, message | error]): true | thrown error */
export function assert(condition, message) {
    if (!condition) {
        if (Error.isError(message)) {
            throw message;
        }
        throw new Error("[assert] Assertion failed" + (message ? ": " + message : ""));
    }
    return true;
}
/* assertTrue(value: any [, message]): true | thrown error */
export function assertTrue(condition, message) {
    if (!condition) {
        if (Error.isError(message)) {
            throw message;
        }
        throw new Error("[assertTrue] Assertion failed" + (message ? ": " + message : ""));
    }
    return true;
}
/* assertFalse(value: any [, message] | error): true | thrown error */
export function assertFalse(condition, message) {
    if (condition) {
        if (Error.isError(message)) {
            throw message;
        }
        throw new Error("[assertFalse] Assertion failed" + (message ? ": " + message : ""));
    }
    return true;
}
/* assertEqual(x: any, y: any [, message | error]): true | thrown error */
/* loose equality + NaN equality */
export function assertEqual(x, y, message) {
    if (!(x == y || (x !== x && y !== y))) {
        if (Error.isError(message)) {
            throw message;
        }
        throw new Error("[assertEqual] Assertion failed" + (message ? ": " + message : ""));
    }
    return true;
}
/* assertStrictEqual(x: any, y: any [, message | error]): true | thrown error */
/* SameValue equality */
export function assertStrictEqual(x, y, message) {
    if (!((x === y) ? (x !== 0 || 1 / x === 1 / y) : (x !== x && y !== y))) {
        if (Error.isError(message)) {
            throw message;
        }
        throw new Error("[assertStrictEqual] Assertion failed"
            + (message ? ": " + message : ""));
    }
    return true;
}
/* assertNotEqual(x: any, y: any [, message | error]): true | thrown error */
/* loose equality + NaN equality */
export function assertNotEqual(x, y, message) {
    if (x == y || (x !== x && y !== y)) {
        if (Error.isError(message)) {
            throw message;
        }
        throw new Error("[assertNotEqual] Assertion failed"
            + (message ? ": " + message : ""));
    }
    return true;
}
/* assertNotStrictEqual(x: any, y: any [, message | error]):
  true | thrown error */
/* SameValue equality */
export function assertNotStrictEqual(x, y, message) {
    if ((x === y) ? (x !== 0 || 1 / x === 1 / y) : (x !== x && y !== y)) {
        if (Error.isError(message)) {
            throw message;
        }
        throw new Error("[assertNotStrictEqual] Assertion failed"
            + (message ? ": " + message : ""));
    }
    return true;
}
/* assertDeepEqual(x: any, y: any [, message | error]): true | thrown error */
export function assertDeepEqual(x, y, message) {
    function _isDeepEqual(x, y) {
        /* helper functions */
        // @ts-ignore
        const _deepType = (x) => ((x === null) ? "null" : (x !== x) ? "NaN" : (typeof x));
        // @ts-ignore
        const _isPrimitive = (x) => (x == null || (typeof x !== "object" && typeof x !== "function"));
        const _isObject = (x) => (x != null && typeof x === "object");
        const _isSameInstance = (x, y, Class) => (x instanceof Class) && (y instanceof Class);
        // @ts-ignore
        const _classof = (x) => Object.prototype.toString.call(x).slice(8, -1).toLowerCase();
        const _ownKeys = (x) => 
        // @ts-ignore
        Object.getOwnPropertyNames(x).concat(Object.getOwnPropertySymbols(x));
        /* strict equality helper function */
        /* const _isEqual = (x, y) => Object.is(x, y); */
        /* not strict equality helper function */
        const _isEqual = (x, y) => (x == y || (x !== x && y !== y));
        /* primitives: Boolean, Number, BigInt, String + Function + Symbol */
        if (_isEqual(x, y)) {
            return true;
        }
        /* objects */
        if (_isObject(x) && _isObject(y)) {
            /* objects / same memory adress */
            if (_isEqual(x, y)) {
                return true;
            }
            /* objects / WeakMap + WeakSet */
            if (_isSameInstance(x, y, WeakMap) || _isSameInstance(x, y, WeakSet)) {
                return _isEqual(x, y);
            }
            /* objects / Wrapper objects: Number, Boolean, String, BigInt */
            if (_isSameInstance(x, y, Number)
                || _isSameInstance(x, y, Boolean)
                || _isSameInstance(x, y, String)
                || _isSameInstance(x, y, BigInt)) {
                return _isEqual(x.valueOf(), y.valueOf());
            }
            /* objects / Array */
            if (Array.isArray(x) && Array.isArray(y)) {
                if (x.length !== y.length) {
                    return false;
                }
                if (x.length === 0) {
                    return true;
                }
                return x.every((value, index) => _isDeepEqual(value, y[index]));
            }
            /* objects / TypedArrays */
            if (_isSameInstance(x, y, Int8Array)
                || _isSameInstance(x, y, Uint8Array)
                || _isSameInstance(x, y, Uint8ClampedArray)
                || _isSameInstance(x, y, Int16Array)
                || _isSameInstance(x, y, Uint16Array)
                || _isSameInstance(x, y, Int32Array)
                || _isSameInstance(x, y, Uint32Array)
                || ("Float16Array" in globalThis ?
                    _isSameInstance(x, y, Float16Array) : false)
                || _isSameInstance(x, y, Float32Array)
                || _isSameInstance(x, y, Float64Array)
                || _isSameInstance(x, y, BigInt64Array)
                || _isSameInstance(x, y, BigUint64Array)) {
                if (x.length !== y.length) {
                    return false;
                }
                if (x.length === 0) {
                    return true;
                }
                return x.every((value, index) => _isEqual(value, y[index]));
            }
            /* objects / ArrayBuffer */
            if (_isSameInstance(x, y, ArrayBuffer)) {
                if (x.byteLength !== y.byteLength) {
                    return false;
                }
                if (x.byteLength === 0) {
                    return true;
                }
                let xTA = new Int8Array(x), yTA = new Int8Array(y);
                return xTA.every((value, index) => _isEqual(value, yTA[index]));
            }
            /* objects / DataView */
            if (_isSameInstance(x, y, DataView)) {
                if (x.byteLength !== y.byteLength) {
                    return false;
                }
                if (x.byteLength === 0) {
                    return true;
                }
                for (let index = 0; index < x.byteLength; index++) {
                    if (!_isEqual(x.getUint8(index), y.getUint8(index))) {
                        return false;
                    }
                }
                return true;
            }
            /* objects / Map */
            if (_isSameInstance(x, y, Map)) {
                if (x.size !== y.size) {
                    return false;
                }
                if (x.size === 0) {
                    return true;
                }
                return [...x.keys()].every((value) => _isDeepEqual(x.get(value), y.get(value)));
            }
            /* objects / Set */
            if (_isSameInstance(x, y, Set)) {
                if (x.size !== y.size) {
                    return false;
                }
                if (x.size === 0) {
                    return true;
                }
                return [...x.keys()].every((value) => y.has(value));
            }
            /* objects / RegExp */
            if (_isSameInstance(x, y, RegExp)) {
                return _isEqual(x.lastIndex, y.lastIndex)
                    && _isEqual(x.flags, y.flags)
                    && _isEqual(x.source, y.source);
            }
            /* objects / Error */
            if (_isSameInstance(x, y, Error)) {
                return _isDeepEqual(Object.getOwnPropertyNames(x)
                    .reduce((acc, k) => { acc[k] = x[k]; return acc; }, {}), Object.getOwnPropertyNames(y)
                    .reduce((acc, k) => { acc[k] = y[k]; return acc; }, {}));
            }
            /* objects / Date */
            if (_isSameInstance(x, y, Date)) {
                return _isEqual(+x, +y);
            }
            /* objects / Proxy -> not detectable */
            /* objects / Objects */
            let xKeys = _ownKeys(x), yKeys = _ownKeys(y);
            if (xKeys.length !== yKeys.length) {
                return false;
            }
            if (xKeys.length === 0) {
                return true;
            }
            return xKeys.every((key) => _isDeepEqual(x[key], y[key]));
        }
        /* default return false */
        return false;
    }
    /* throw error | return true */
    if (!_isDeepEqual(x, y)) {
        if (Error.isError(message)) {
            throw message;
        }
        throw new Error("[assertDeepEqual] Assertion failed"
            + (message ? ": " + message : ""));
    }
    return true;
}
/* assertNotDeepStrictEqual(x: any, y: any [, message | error]):
  true | throw error */
export function assertNotDeepStrictEqual(x, y, message) {
    function _isDeepStrictEqual(x, y) {
        /* helper functions */
        const _deepType = (x) => ((x === null) ? "null" : (x !== x) ? "NaN" : (typeof x));
        const _isPrimitive = (x) => (x == null || (typeof x !== "object" && typeof x !== "function"));
        const _isObject = (x) => (x != null && typeof x === "object");
        const _isSameInstance = (x, y, Class) => (x instanceof Class) && (y instanceof Class);
        const _classof = (x) => Object.prototype.toString.call(x).slice(8, -1).toLowerCase();
        const _ownKeys = (x) => 
        // @ts-ignore
        Object.getOwnPropertyNames(x).concat(Object.getOwnPropertySymbols(x));
        /* strict equality helper function */
        const _isEqual = (x, y) => Object.is(x, y);
        /* not strict equality helper function */
        /* const _isEqual = (x, y) => (x == y || (x !== x && y !== y)); */
        /* primitives: Boolean, Number, BigInt, String + Function + Symbol */
        if (_isEqual(x, y)) {
            return true;
        }
        /* Object Wrappers (Boolean, Number, BigInt, String) */
        if (_isObject(x) && _isPrimitive(y) && _classof(x) === typeof y) {
            return _isEqual(x.valueOf(), y);
        }
        if (_isPrimitive(x) && _isObject(y) && typeof x === _classof(y)) {
            return _isEqual(x, y.valueOf());
        }
        /* type (primitives, object, null, NaN) */
        if (_deepType(x) !== _deepType(y)) {
            return false;
        }
        /* objects */
        if (_isObject(x) && _isObject(y)) {
            /* objects / same memory adress */
            if (_isEqual(x, y)) {
                return true;
            }
            /* objects / not same constructor */
            if (Object.getPrototypeOf(x).constructor !==
                Object.getPrototypeOf(y).constructor) {
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
                || _isSameInstance(x, y, BigInt)) {
                return _isEqual(x.valueOf(), y.valueOf());
            }
            /* objects / Array */
            if (Array.isArray(x) && Array.isArray(y)) {
                if (x.length !== y.length) {
                    return false;
                }
                if (x.length === 0) {
                    return true;
                }
                return x.every((value, index) => _isDeepStrictEqual(value, y[index]));
            }
            /* objects / TypedArrays */
            if (_isSameInstance(x, y, Int8Array)
                || _isSameInstance(x, y, Uint8Array)
                || _isSameInstance(x, y, Uint8ClampedArray)
                || _isSameInstance(x, y, Int16Array)
                || _isSameInstance(x, y, Uint16Array)
                || _isSameInstance(x, y, Int32Array)
                || _isSameInstance(x, y, Uint32Array)
                || ("Float16Array" in globalThis ?
                    _isSameInstance(x, y, Float16Array) : false)
                || _isSameInstance(x, y, Float32Array)
                || _isSameInstance(x, y, Float64Array)
                || _isSameInstance(x, y, BigInt64Array)
                || _isSameInstance(x, y, BigUint64Array)) {
                if (x.length !== y.length) {
                    return false;
                }
                if (x.length === 0) {
                    return true;
                }
                return x.every((value, index) => _isEqual(value, y[index]));
            }
            /* objects / ArrayBuffer */
            if (_isSameInstance(x, y, ArrayBuffer)) {
                if (x.byteLength !== y.byteLength) {
                    return false;
                }
                if (x.byteLength === 0) {
                    return true;
                }
                let xTA = new Int8Array(x), yTA = new Int8Array(y);
                return xTA.every((value, index) => _isEqual(value, yTA[index]));
            }
            /* objects / DataView */
            if (_isSameInstance(x, y, DataView)) {
                if (x.byteLength !== y.byteLength) {
                    return false;
                }
                if (x.byteLength === 0) {
                    return true;
                }
                for (let index = 0; index < x.byteLength; index++) {
                    if (!_isEqual(x.getUint8(index), y.getUint8(index))) {
                        return false;
                    }
                }
                return true;
            }
            /* objects / Map */
            if (_isSameInstance(x, y, Map)) {
                if (x.size !== y.size) {
                    return false;
                }
                if (x.size === 0) {
                    return true;
                }
                return [...x.keys()].every((value) => _isDeepStrictEqual(x.get(value), y.get(value)));
            }
            /* objects / Set */
            if (_isSameInstance(x, y, Set)) {
                if (x.size !== y.size) {
                    return false;
                }
                if (x.size === 0) {
                    return true;
                }
                return [...x.keys()].every((value) => y.has(value));
            }
            /* objects / RegExp */
            if (_isSameInstance(x, y, RegExp)) {
                return _isEqual(x.lastIndex, y.lastIndex)
                    && _isEqual(x.flags, y.flags)
                    && _isEqual(x.source, y.source);
            }
            /* objects / Error */
            if (_isSameInstance(x, y, Error)) {
                return _isDeepStrictEqual(Object.getOwnPropertyNames(x)
                    .reduce((acc, k) => { acc[k] = x[k]; return acc; }, {}), Object.getOwnPropertyNames(y)
                    .reduce((acc, k) => { acc[k] = y[k]; return acc; }, {}));
            }
            /* objects / Date */
            if (_isSameInstance(x, y, Date)) {
                return _isEqual(+x, +y);
            }
            /* objects / Proxy -> not detectable */
            /* objects / Objects */
            let xKeys = _ownKeys(x), yKeys = _ownKeys(y);
            if (xKeys.length !== yKeys.length) {
                return false;
            }
            if (xKeys.length === 0) {
                return true;
            }
            return xKeys.every((key) => _isDeepStrictEqual(x[key], y[key]));
        }
        /* default return false */
        return false;
    }
    /* throw error | return true */
    if (_isDeepStrictEqual(x, y)) {
        if (Error.isError(message)) {
            throw message;
        }
        throw new Error("[assertNotDeepStrictEqual] Assertion failed"
            + (message ? ": " + message : ""));
    }
    return true;
}
/* assertNotDeepEqual(x: any, y: any [, message | error]):
  true | thrown error */
export function assertNotDeepEqual(x, y, message) {
    function _isDeepEqual(x, y) {
        /* helper functions */
        // @ts-ignore
        const _deepType = (x) => ((x === null) ? "null" : (x !== x) ? "NaN" : (typeof x));
        // @ts-ignore
        const _isPrimitive = (x) => (x == null || (typeof x !== "object" && typeof x !== "function"));
        const _isObject = (x) => (x != null && typeof x === "object");
        const _isSameInstance = (x, y, Class) => (x instanceof Class) && (y instanceof Class);
        // @ts-ignore
        const _classof = (x) => Object.prototype.toString.call(x).slice(8, -1).toLowerCase();
        const _ownKeys = (x) => 
        // @ts-ignore
        Object.getOwnPropertyNames(x).concat(Object.getOwnPropertySymbols(x));
        /* strict equality helper function */
        /* const _isEqual = (x, y) => Object.is(x, y); */
        /* not strict equality helper function */
        const _isEqual = (x, y) => (x == y || (x !== x && y !== y));
        /* primitives: Boolean, Number, BigInt, String + Function + Symbol */
        if (_isEqual(x, y)) {
            return true;
        }
        /* objects */
        if (_isObject(x) && _isObject(y)) {
            /* objects / same memory adress */
            if (_isEqual(x, y)) {
                return true;
            }
            /* objects / WeakMap + WeakSet */
            if (_isSameInstance(x, y, WeakMap) || _isSameInstance(x, y, WeakSet)) {
                return _isEqual(x, y);
            }
            /* objects / Wrapper objects: Number, Boolean, String, BigInt */
            if (_isSameInstance(x, y, Number)
                || _isSameInstance(x, y, Boolean)
                || _isSameInstance(x, y, String)
                || _isSameInstance(x, y, BigInt)) {
                return _isEqual(x.valueOf(), y.valueOf());
            }
            /* objects / Array */
            if (Array.isArray(x) && Array.isArray(y)) {
                if (x.length !== y.length) {
                    return false;
                }
                if (x.length === 0) {
                    return true;
                }
                return x.every((value, index) => _isDeepEqual(value, y[index]));
            }
            /* objects / TypedArrays */
            if (_isSameInstance(x, y, Int8Array)
                || _isSameInstance(x, y, Uint8Array)
                || _isSameInstance(x, y, Uint8ClampedArray)
                || _isSameInstance(x, y, Int16Array)
                || _isSameInstance(x, y, Uint16Array)
                || _isSameInstance(x, y, Int32Array)
                || _isSameInstance(x, y, Uint32Array)
                || ("Float16Array" in globalThis ?
                    _isSameInstance(x, y, Float16Array) : false)
                || _isSameInstance(x, y, Float32Array)
                || _isSameInstance(x, y, Float64Array)
                || _isSameInstance(x, y, BigInt64Array)
                || _isSameInstance(x, y, BigUint64Array)) {
                if (x.length !== y.length) {
                    return false;
                }
                if (x.length === 0) {
                    return true;
                }
                return x.every((value, index) => _isEqual(value, y[index]));
            }
            /* objects / ArrayBuffer */
            if (_isSameInstance(x, y, ArrayBuffer)) {
                if (x.byteLength !== y.byteLength) {
                    return false;
                }
                if (x.byteLength === 0) {
                    return true;
                }
                let xTA = new Int8Array(x), yTA = new Int8Array(y);
                return xTA.every((value, index) => _isEqual(value, yTA[index]));
            }
            /* objects / DataView */
            if (_isSameInstance(x, y, DataView)) {
                if (x.byteLength !== y.byteLength) {
                    return false;
                }
                if (x.byteLength === 0) {
                    return true;
                }
                for (let index = 0; index < x.byteLength; index++) {
                    if (!_isEqual(x.getUint8(index), y.getUint8(index))) {
                        return false;
                    }
                }
                return true;
            }
            /* objects / Map */
            if (_isSameInstance(x, y, Map)) {
                if (x.size !== y.size) {
                    return false;
                }
                if (x.size === 0) {
                    return true;
                }
                return [...x.keys()].every((value) => _isDeepEqual(x.get(value), y.get(value)));
            }
            /* objects / Set */
            if (_isSameInstance(x, y, Set)) {
                if (x.size !== y.size) {
                    return false;
                }
                if (x.size === 0) {
                    return true;
                }
                return [...x.keys()].every((value) => y.has(value));
            }
            /* objects / RegExp */
            if (_isSameInstance(x, y, RegExp)) {
                return _isEqual(x.lastIndex, y.lastIndex)
                    && _isEqual(x.flags, y.flags)
                    && _isEqual(x.source, y.source);
            }
            /* objects / Error */
            if (_isSameInstance(x, y, Error)) {
                return _isDeepEqual(Object.getOwnPropertyNames(x)
                    .reduce((acc, k) => { acc[k] = x[k]; return acc; }, {}), Object.getOwnPropertyNames(y)
                    .reduce((acc, k) => { acc[k] = y[k]; return acc; }, {}));
            }
            /* objects / Date */
            if (_isSameInstance(x, y, Date)) {
                return _isEqual(+x, +y);
            }
            /* objects / Proxy -> not detectable */
            /* objects / Objects */
            let xKeys = _ownKeys(x), yKeys = _ownKeys(y);
            if (xKeys.length !== yKeys.length) {
                return false;
            }
            if (xKeys.length === 0) {
                return true;
            }
            return xKeys.every((key) => _isDeepEqual(x[key], y[key]));
        }
        /* default return false */
        return false;
    }
    /* throw error | return true */
    if (_isDeepEqual(x, y)) {
        if (Error.isError(message)) {
            throw message;
        }
        throw new Error("[assertNotDeepEqual] Assertion failed"
            + (message ? ": " + message : ""));
    }
    return true;
}
/* assertDeepStrictEqual(x: any, y: any [, message | error]):
  true | thrown error */
export function assertDeepStrictEqual(x, y, message) {
    function _isDeepStrictEqual(x, y) {
        /* helper functions */
        const _deepType = (x) => ((x === null) ? "null" : (x !== x) ? "NaN" : (typeof x));
        const _isPrimitive = (x) => (x == null || (typeof x !== "object" && typeof x !== "function"));
        const _isObject = (x) => (x != null && typeof x === "object");
        const _isSameInstance = (x, y, Class) => (x instanceof Class) && (y instanceof Class);
        const _classof = (x) => Object.prototype.toString.call(x).slice(8, -1).toLowerCase();
        const _ownKeys = (x) => 
        // @ts-ignore
        Object.getOwnPropertyNames(x).concat(Object.getOwnPropertySymbols(x));
        /* strict equality helper function */
        const _isEqual = (x, y) => Object.is(x, y);
        /* not strict equality helper function */
        /* const _isEqual = (x, y) => (x == y || (x !== x && y !== y)); */
        /* primitives: Boolean, Number, BigInt, String + Function + Symbol */
        if (_isEqual(x, y)) {
            return true;
        }
        /* Object Wrappers (Boolean, Number, BigInt, String) */
        if (_isObject(x) && _isPrimitive(y) && _classof(x) === typeof y) {
            return _isEqual(x.valueOf(), y);
        }
        if (_isPrimitive(x) && _isObject(y) && typeof x === _classof(y)) {
            return _isEqual(x, y.valueOf());
        }
        /* type (primitives, object, null, NaN) */
        if (_deepType(x) !== _deepType(y)) {
            return false;
        }
        /* objects */
        if (_isObject(x) && _isObject(y)) {
            /* objects / same memory adress */
            if (_isEqual(x, y)) {
                return true;
            }
            /* objects / not same constructor */
            if (Object.getPrototypeOf(x).constructor !==
                Object.getPrototypeOf(y).constructor) {
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
                || _isSameInstance(x, y, BigInt)) {
                return _isEqual(x.valueOf(), y.valueOf());
            }
            /* objects / Array */
            if (Array.isArray(x) && Array.isArray(y)) {
                if (x.length !== y.length) {
                    return false;
                }
                if (x.length === 0) {
                    return true;
                }
                return x.every((value, index) => _isDeepStrictEqual(value, y[index]));
            }
            /* objects / TypedArrays */
            if (_isSameInstance(x, y, Int8Array)
                || _isSameInstance(x, y, Uint8Array)
                || _isSameInstance(x, y, Uint8ClampedArray)
                || _isSameInstance(x, y, Int16Array)
                || _isSameInstance(x, y, Uint16Array)
                || _isSameInstance(x, y, Int32Array)
                || _isSameInstance(x, y, Uint32Array)
                || ("Float16Array" in globalThis ?
                    _isSameInstance(x, y, Float16Array) : false)
                || _isSameInstance(x, y, Float32Array)
                || _isSameInstance(x, y, Float64Array)
                || _isSameInstance(x, y, BigInt64Array)
                || _isSameInstance(x, y, BigUint64Array)) {
                if (x.length !== y.length) {
                    return false;
                }
                if (x.length === 0) {
                    return true;
                }
                return x.every((value, index) => _isEqual(value, y[index]));
            }
            /* objects / ArrayBuffer */
            if (_isSameInstance(x, y, ArrayBuffer)) {
                if (x.byteLength !== y.byteLength) {
                    return false;
                }
                if (x.byteLength === 0) {
                    return true;
                }
                let xTA = new Int8Array(x), yTA = new Int8Array(y);
                return xTA.every((value, index) => _isEqual(value, yTA[index]));
            }
            /* objects / DataView */
            if (_isSameInstance(x, y, DataView)) {
                if (x.byteLength !== y.byteLength) {
                    return false;
                }
                if (x.byteLength === 0) {
                    return true;
                }
                for (let index = 0; index < x.byteLength; index++) {
                    if (!_isEqual(x.getUint8(index), y.getUint8(index))) {
                        return false;
                    }
                }
                return true;
            }
            /* objects / Map */
            if (_isSameInstance(x, y, Map)) {
                if (x.size !== y.size) {
                    return false;
                }
                if (x.size === 0) {
                    return true;
                }
                return [...x.keys()].every((v) => _isDeepStrictEqual(x.get(v), y.get(v)));
            }
            /* objects / Set */
            if (_isSameInstance(x, y, Set)) {
                if (x.size !== y.size) {
                    return false;
                }
                if (x.size === 0) {
                    return true;
                }
                return [...x.keys()].every((value) => y.has(value));
            }
            /* objects / RegExp */
            if (_isSameInstance(x, y, RegExp)) {
                return _isEqual(x.lastIndex, y.lastIndex)
                    && _isEqual(x.flags, y.flags)
                    && _isEqual(x.source, y.source);
            }
            /* objects / Error */
            if (_isSameInstance(x, y, Error)) {
                return _isDeepStrictEqual(Object.getOwnPropertyNames(x)
                    .reduce((acc, k) => { acc[k] = x[k]; return acc; }, {}), Object.getOwnPropertyNames(y)
                    .reduce((acc, k) => { acc[k] = y[k]; return acc; }, {}));
            }
            /* objects / Date */
            if (_isSameInstance(x, y, Date)) {
                return _isEqual(+x, +y);
            }
            /* objects / Proxy -> not detectable */
            /* objects / Objects */
            let xKeys = _ownKeys(x), yKeys = _ownKeys(y);
            if (xKeys.length !== yKeys.length) {
                return false;
            }
            if (xKeys.length === 0) {
                return true;
            }
            return xKeys.every((key) => _isDeepStrictEqual(x[key], y[key]));
        }
        /* default return false */
        return false;
    }
    /* throw error | return true */
    if (!_isDeepStrictEqual(x, y)) {
        if (Error.isError(message)) {
            throw message;
        }
        throw new Error("[assertDeepStrictEqual] Assertion failed"
            + (message ? ": " + message : ""));
    }
    return true;
}
/** String API **/
/* b64Encode(s: any): string */
export function b64Encode(str) {
    return btoa(encodeURIComponent(String(str)).replace(/%([0-9A-F]{2})/g, function toSolidBytes(_match, p1) {
        // @ts-ignore
        return String.fromCharCode("0x" + p1);
    }));
}
/* b64Decode(s: string): string */
export function b64Decode(str) {
    return decodeURIComponent(atob(String(str)).split("").map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(""));
}
/* strTruncate(string: string, newLength: integer [, omission: string = ""]):
  string */
export function strTruncate(str, newLength, omission = "") {
    str = String(str);
    omission = String(omission);
    let strUC = Array.from(str);
    if (newLength >= strUC.length) {
        return str;
    }
    return strUC.slice(0, newLength - Array.from(omission).length).join("")
        + omission;
}
/* strPropercase(s: any): string */
export const strPropercase = (str) => String(str).split(" ").map(function (value) {
    let chars = Array.from(value).map((c) => c.toLowerCase());
    if (chars.length) {
        chars[0] = chars[0].toUpperCase();
    }
    return chars.join("");
}).join(" ");
/* strTitlecase(s: any): string */
export const strTitlecase = (str) => String(str).split(" ").map(function (value) {
    let chars = Array.from(value).map((c) => c.toLowerCase());
    if (chars.length) {
        chars[0] = chars[0].toUpperCase();
    }
    return chars.join("");
}).join(" ");
/* strCapitalize(s: any): string */
export function strCapitalize(str) {
    let chars = [...String(str).toLowerCase()];
    if (chars.length) {
        chars[0] = chars[0].toUpperCase();
    }
    return chars.join("");
}
/* strUpFirst(s: any): string */
export function strUpFirst(str) {
    let chars = [...String(str)];
    if (chars.length) {
        chars[0] = chars[0].toUpperCase();
    }
    return chars.join("");
}
/* strDownFirst(s: any): string */
export function strDownFirst(str) {
    let chars = [...String(str)];
    if (chars.length) {
        chars[0] = chars[0].toLowerCase();
    }
    return chars.join("");
}
/* strReverse(s: any): string */
export const strReverse = (str) => Array.from(String(str)).reverse().join("");
/* strCodePoints(s: any): array of strings */
export const strCodePoints = (str) => Array.from(String(str), (value) => value.codePointAt(0));
/* strFromCodePoints(iterator: iterator): string */
export const strFromCodePoints = ([...array]) => String.fromCodePoint(...array);
/* strAt(string: string, index: number [, newChar: string]): string */
export function strAt(str, index, newChar) {
    let chars = Array.from(String(str));
    if (newChar == null) {
        return chars.at(index) || "";
    }
    index = index < 0 ? chars.length + index : index;
    if (index > chars.length) {
        return chars.join("");
    }
    chars[index] = newChar;
    return chars.join("");
}
/* strSplice(string: string, index: number, count: integer [, add: string]):
  string */
export const strSplice = (str, index, count, ...add) => Array.from(str).toSpliced(index, count, add.join("")).join("");
/* strHTMLRemoveTags(s: any): string */
export const strHTMLRemoveTags = (str) => String(str).replace(/<[^>]*>/g, " ").replace(/\s{2,}/g, " ").trim();
/* strHTMLEscape(str: any): string */
export const strHTMLEscape = (str) => String(str).replace(/&/g, "&amp;")
    .replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;").replace(/'/g, "&apos;");
/* strHTMLUnEscape(s: any): string */
export const strHTMLUnEscape = (str) => String(str)
    .replace(/&amp;/g, "&").replace(/&#38;/g, "&")
    .replace(/&lt;/g, "<").replace(/&#60;/g, "<")
    .replace(/&gt;/g, ">").replace(/&#62;/g, ">")
    .replace(/&quot;/g, '"').replace(/&#34;/g, '"')
    .replace(/&apos;/g, "'").replace(/&#39;/g, "'");
/** DOM API **/
/* qsa(selector: string [, context: element object]): array */
export const qsa = (str, context = document) => Array.from(context.querySelectorAll(str));
/* qs(selector: string [, context: element object]): element object | null */
export const qs = (str, context = document) => context.querySelector(str);
/* domReady(callback: function): undefined */
export function domReady(fn) {
    if (document.readyState !== "loading") {
        fn();
    }
    else {
        document.addEventListener("DOMContentLoaded", function (_event) { fn(); });
    }
}
/* domCreate(type: string[, properties: object[, innerHTML: string]]):
  element */
/* domCreate(element descriptive object): element */
export function domCreate(elType, properties, innerHTML) {
    if (arguments.length === 1 && typeof elType === "object") {
        let obj = elType;
        elType = obj.elementType;
        properties = {};
        for (let key in obj) {
            if (key !== "elementType") {
                properties[key] = obj[key];
            }
        }
    }
    let el = document.createElement(elType);
    if (properties) {
        for (let key in properties) {
            if (key !== "style" || typeof properties[key] === "string") {
                el[key] = properties[key];
            }
            else {
                Object.assign(el.style, properties[key]);
            }
        }
    }
    if (innerHTML) {
        el.innerHTML = innerHTML;
    }
    return el;
}
/* domToElement(htmlString): element object */
export function domToElement(str) {
    let el = document.createElement("div");
    el.innerHTML = str;
    return el.firstElementChild;
}
/* domGetCSS(element [, property: string]): string */
export const domGetCSS = (el, property) => (property ? globalThis.getComputedStyle(el, null)[property] :
    globalThis.getComputedStyle(el, null));
/* domSetCSS(element, property: string, value: string): undefined */
/* domSetCSS(element, properties: object): undefined */
export function domSetCSS(el, property, value) {
    if (typeof property === "string") {
        el.style[property] = value;
    }
    else if (typeof property === "object") {
        Object.keys(property).forEach((key) => el.style[key] = property[key]);
    }
}
/* domFadeIn(element [, duration = 500 [, display = ""]]): undefined */
export function domFadeIn(el, duration, display) {
    let s = el.style, step = 25 / (duration || 500);
    // @ts-ignore
    s.opacity = (s.opacity || 0);
    s.display = (display || "");
    (function fade() {
        // @ts-ignore
        (s.opacity = parseFloat(s.opacity) + step) > 1 ? s.opacity = 1 : setTimeout(fade, 25);
    })();
}
/* domFadeOut(element [, duration = 500]): undefined */
export function domFadeOut(el, duration) {
    let style = el.style, step = 25 / (duration || 500);
    // @ts-ignore
    style.opacity = (style.opacity || 1);
    (function fade() {
        // @ts-ignore
        (style.opacity -= step) < 0 ? style.display = "none" : setTimeout(fade, 25);
    })();
}
/* domFadeToggle(element [, duration = 500 [, display = ""]]): undefined */
export function domFadeToggle(el, duration, display = "") {
    if (globalThis.getComputedStyle(el, null).display === "none") {
        /* same as domFadeIn(); */
        let style = el.style, step = 25 / (duration || 500);
        // @ts-ignore
        style.opacity = (style.opacity || 0);
        style.display = (display || "");
        (function fade() {
            // @ts-ignore
            (style.opacity = parseFloat(style.opacity) + step) > 1 ? style.opacity = 1 :
                setTimeout(fade, 25);
        })();
    }
    else {
        /* same as domFadeOut(); */
        let style = el.style, step = 25 / (duration || 500);
        // @ts-ignore
        style.opacity = (style.opacity || 1);
        (function fade() {
            // @ts-ignore
            (style.opacity -= step) < 0 ? style.display = "none" : setTimeout(fade, 25);
        })();
    }
}
/* domHide(element): undefined */
export const domHide = (el) => el.style.display = "none";
/* domShow(element [, display = ""]): undefined */
export const domShow = (el, display = "") => el.style.display = display;
/* domToggle(element [, display: string]): undefined */
export function domToggle(el, display = "") {
    if (globalThis.getComputedStyle(el, null).display === "none") {
        el.style.display = display;
    }
    else {
        el.style.display = "none";
    }
}
/* domIsHidden(element): boolean */
export const domIsHidden = (el) => (globalThis.getComputedStyle(el, null).display === "none");
/* domSiblings(element): array */
export const domSiblings = (el) => 
// @ts-ignore
Array.prototype.filter.call(el.parentNode.children, (e) => (e !== el));
/* domSiblingsPrev(element): any[] */
export const domSiblingsPrev = (el) => Array.prototype.slice.call(
// @ts-ignore
el.parentNode.children, 0, 
// @ts-ignore
Array.prototype.indexOf.call(el.parentNode.children, el));
/* domSiblingsLeft(element): any[] */
export const domSiblingsLeft = (el) => Array.prototype.slice.call(
// @ts-ignore
el.parentNode.children, 0, 
// @ts-ignore
Array.prototype.indexOf.call(el.parentNode.children, el));
/* domSiblingsNext(element): any[] */
export const domSiblingsNext = (el) => Array.prototype.slice.call(
// @ts-ignore
el.parentNode.children, 
// @ts-ignore
Array.prototype.indexOf.call(el.parentNode.children, el) + 1, 
// @ts-ignore
el.parentNode.children.length);
/* domSiblingsRight(element): any[] */
export const domSiblingsRight = (el) => Array.prototype.slice.call(
// @ts-ignore
el.parentNode.children, 
// @ts-ignore
Array.prototype.indexOf.call(el.parentNode.children, el) + 1, 
// @ts-ignore
el.parentNode.children.length);
/* importScript(script1: string [, scriptN: string]): undefined */
export function importScript(...scripts) {
    for (let item of scripts) {
        let el = document.createElement("script");
        el.type = "text\/javascript";
        el.src = item;
        el.onerror = function (e) {
            throw new URIError(
            // @ts-ignore
            "Loading failed for the script with source " + e.target.src);
        };
        (document.head || document.getElementsByTagName("head")[0]).appendChild(el);
    }
}
/* importStyle(style1: string [, styleN: string]): undefined */
export function importStyle(...styles) {
    for (let item of styles) {
        let el = document.createElement("link");
        el.rel = "stylesheet";
        el.type = "text\/css";
        el.href = item;
        el.onerror = function (e) {
            throw new URIError(
            // @ts-ignore
            "Loading failed for the style with source " + e.target.href);
        };
        (document.head || document.getElementsByTagName("head")[0]).appendChild(el);
    }
}
/* form2array(form): object[] */
export function form2array(form) {
    let field, result = Array();
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
                        if (field.options[j].selected) {
                            result.push({
                                "name": encodeURIComponent(field.name),
                                "value": encodeURIComponent(field.options[j].value)
                            });
                        }
                    }
                }
                else if ((field.type !== "checkbox" && field.type !== "radio")
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
/* form2string(form): string */
export function form2string(form) {
    let field, result = [];
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
                        if (field.options[j].selected) {
                            result.push(encodeURIComponent(field.name)
                                + "=" + encodeURIComponent(field.options[j].value));
                        }
                    }
                }
                else if ((field.type !== "checkbox" && field.type !== "radio")
                    || field.checked) {
                    result.push(encodeURIComponent(field.name)
                        + "=" + encodeURIComponent(field.value));
                }
            }
        }
    }
    return result.join("&").replace(/%20/g, "+");
}
/* getDoNotTrack(): boolean */
export const getDoNotTrack = () => 
// @ts-ignore
[navigator.doNotTrack, globalThis.doNotTrack, navigator.msDoNotTrack]
    .some((item) => (item === true || item === 1 || item === "1"));
/* getLocation(success: function [, error: function]): undefined */
export function getLocation(successFn, errorFn) {
    if (!errorFn) {
        errorFn = function () { };
    }
    function getE(error) {
        errorFn("ERROR(" + error.code + "): " + error.message);
    }
    if (navigator.geolocation) {
        // @ts-ignore
        navigator.geolocation.getCurrentPosition(successFn, getE);
    }
    else {
        getE("Geolocation is not supported in this browser.");
    }
}
/* createFile(filename: string, content: string [,dataType:string]):
  undefined */
export function createFile(filename, content, dataType) {
    let length = arguments.length;
    if (length > 1) {
        if (length === 2) {
            dataType = "text/plain";
        }
        let blob = new Blob([content], { type: dataType });
        let el = globalThis.document.createElement("a");
        el.href = globalThis.URL.createObjectURL(blob);
        el.download = filename;
        document.body.appendChild(el);
        el.click();
        document.body.removeChild(el);
        globalThis.URL.revokeObjectURL(el.href);
    }
    else {
        throw new Error("Celestra createFile error: too few parameters.");
    }
}
/* getFullscreen(): element object | undefined */
export const getFullscreen = () => (document.fullscreenElement
    // @ts-ignore
    || document.mozFullScreenElement
    // @ts-ignore
    || document.webkitFullscreenElement
    // @ts-ignore
    || document.msFullscreenElement
    || undefined);
/* setFullscreenOn(element): undefined */
/* setFullscreenOn(selector string): undefined */
export function setFullscreenOn(el) {
    let elem;
    if (typeof el === "string") {
        elem = document.querySelector(el);
    }
    else if (typeof el === "object") {
        elem = el;
    }
    // @ts-ignore
    if (elem.requestFullscreen) {
        elem.requestFullscreen();
    }
    // @ts-ignore
    else if (elem.mozRequestFullScreen) {
        elem.mozRequestFullScreen();
    }
    // @ts-ignore
    else if (elem.webkitRequestFullscreen) {
        elem.webkitRequestFullscreen();
    }
    // @ts-ignore
    else if (elem.msRequestFullscreen) {
        elem.msRequestFullscreen();
    }
}
/* setFullscreenOff(): undefined */
export function setFullscreenOff() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    }
    // @ts-ignore
    else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
    }
    // @ts-ignore
    else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    }
    // @ts-ignore
    else if (document.msExitFullscreen) {
        document.msExitFullscreen();
    }
}
/* domGetCSSVar(name: string): string */
export const domGetCSSVar = (name) => getComputedStyle(document.documentElement)
    .getPropertyValue(name[0] === "-" ? name : "--" + name);
/* domSetCSSVar(name: string, value: string): undefined */
export const domSetCSSVar = (name, value) => document.documentElement.style.setProperty((name[0] === "-" ? name : "--" + name), value);
/* domScrollToTop(): undefined */
export const domScrollToTop = () => globalThis.scrollTo(0, 0);
/* domScrollToBottom(): undefined */
export const domScrollToBottom = () => globalThis.scrollTo(0, document.body.scrollHeight);
/* domScrollToElement(element [, top=true]): undefined */
export const domScrollToElement = (el, top = true) => el.scrollIntoView(top);
/* domClear(element): any */
// @ts-ignore
export const domClear = (el) => Array.from(el.children).forEach((item) => item.remove());
/** AJAX API **/
/* getText(url: string, success: function): undefined */
export function getText(url, successFn) {
    if (typeof url !== "string") {
        throw new TypeError("Celestra ajax error: The url parameter have to be a string.");
    }
    if (typeof successFn !== "function") {
        throw new TypeError("Celestra ajax error: The success parameter have to be a function.");
    }
    let xhr = new XMLHttpRequest();
    xhr.onerror = (e) => console.log("Celestra ajax GET error: " + JSON.stringify(e));
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
export function getJson(url, successFn) {
    if (typeof url !== "string") {
        throw new TypeError("Celestra ajax error: The url parameter have to be a string.");
    }
    if (typeof successFn !== "function") {
        throw new TypeError("Celestra ajax error: The success parameter have to be a function.");
    }
    let xhr = new XMLHttpRequest();
    xhr.onerror = (e) => console.log("Celestra ajax GET error: " + JSON.stringify(e));
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
export function ajax(options) {
    if (typeof options.url !== "string") {
        throw new TypeError("Celestra ajax error: The url property has to be a string.");
    }
    if (typeof options.success !== "function") {
        throw new TypeError("Celestra ajax error: The success property has to be a function.");
    }
    if (options.error === undefined) {
        options.error = (e) => console.log("Celestra ajax GET error: " + JSON.stringify(e));
    }
    if (typeof options.error !== "function") {
        throw new TypeError("Celestra ajax error: The error property has to be a function or undefined.");
    }
    if (!options.queryType) {
        options.queryType = "ajax";
    }
    else {
        options.queryType = options.queryType.toLowerCase();
    }
    if (!options.type) {
        options.type = "get";
    }
    else {
        options.type = options.type.toLowerCase();
    }
    let typeStr;
    if (options.type === "get") {
        typeStr = "GET";
    }
    else if (options.type === "post") {
        typeStr = "POST";
    }
    else {
        throw new Error("Celestra ajax error: The type property has to be \"get\" or \"post\".");
    }
    if (!options.format) {
        options.format = "text";
    }
    else {
        options.format = options.format.toLowerCase();
        if (!(["text", "json", "xml"].includes(options.format))) {
            throw new Error("Celestra ajax error: The format property has to be \"text\" or \"json\" or \"xml\".");
        }
    }
    let xhr;
    if (options.queryType === "ajax") {
        xhr = new XMLHttpRequest();
    }
    else if (options.queryType === "cors") {
        xhr = new XMLHttpRequest();
        // @ts-ignore
        if (!("withCredentials" in xhr)) {
            xhr = new XDomainRequest();
        }
    }
    else {
        throw new Error("Celestra ajax error: The querytype property has to be \"ajax\" or \"cors\".");
    }
    if (typeof options.user === "string"
        && typeof options.password === "string") {
        xhr.open(typeStr, options.url, true, options.user, options.password);
    }
    else {
        xhr.open(typeStr, options.url, true);
    }
    if (options.queryType === "ajax") {
        xhr.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                switch (options.format.toLowerCase()) {
                    case "text":
                        options.success(this.responseText);
                        break;
                    case "json":
                        options.success(JSON.parse(this.responseText));
                        break;
                    case "xml":
                        options.success(this.responseXML);
                        break;
                    default: options.success(this.responseText);
                }
            }
        };
        xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
        if (options.typeStr === "POST") {
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        }
    }
    else if (options.queryType === "cors") {
        xhr.onload = function (request) {
            switch (options.format.toLowerCase()) {
                case "text":
                    options.success(request.target.responseText
                        || request.currentTarget.response);
                    break;
                case "json":
                    options.success(JSON.parse(request.target.responseText
                        || request.currentTarget.response));
                    break;
                case "xml":
                    options.success(request.target.responseXML
                        || request.currentTarget.responseXML);
                    break;
                default: options.success(request.target.responseText
                    || request.currentTarget.response);
            }
        };
    }
    if (typeof options.error === "function") {
        xhr.onerror = options.error;
    }
    if (typeStr === "GET") {
        xhr.send();
    }
    else if (typeStr === "POST") {
        xhr.send(encodeURI(options.data));
    }
}
/** Type API **/
/* is (
    value: any,
    expected: string | Function | Array<string | Function> | undefined,
    Throw: boolean = false
  ): string | Function | boolean | throw TypeError */
export function is(value, expected, Throw = false) {
    /* Validate `expected` */
    if (!(["string", "function", "undefined"].includes(typeof expected))
        && !Array.isArray(expected)) {
        throw new TypeError(`[is] TypeError: expectedType must be string, function, array or undefined. Got ${typeof expected}`);
    }
    /* Validate `Throw` */
    if (typeof Throw !== "boolean") {
        throw new TypeError(`[is] TypeError: Throw has to be a boolean. Got ${typeof Throw}`);
    }
    /* Determine the type of `value` */
    const vType = (value === null ? "null" : typeof value);
    /* If no expected type provided, return type or constructor */
    if (expected == null) {
        return vType === "object"
            ? Object.getPrototypeOf(value)?.constructor ?? "object"
            : vType;
    }
    /* Normalize expected to an array */
    let expectedArray = Array.isArray(expected) ? expected : [expected];
    /* Check against expected types or constructors */
    let matched = expectedArray.some(function (item) {
        if (typeof item === "string") {
            return vType === item;
        }
        if (typeof item === "function") {
            return value != null && value instanceof item;
        }
        /* validate expected array elements */
        throw new TypeError(`[is] TypeError: expectedType array elements have to be a string or function. Got ${typeof item}`);
    });
    /* Throw error if mismatch and `Throw` is true */
    if (Throw && !matched) {
        let vName = value.toString ? value : Object.prototype.toString.call(value);
        let eNames = expectedArray.map((item) => (typeof item === "string" ? item.toString() : item.name ?? "anonymous")).join(", ");
        throw new TypeError(`[is] TypeError: ${vName} is not a ${eNames}`);
    }
    return matched;
}
/* toObject(value: any): object | symbol | Function | thrown error */
export function toObject(value) {
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
export function classof(value, type, Throw = false) {
    let ot = Object.prototype.toString.call(value).slice(8, -1).toLowerCase();
    if (arguments.length < 2) {
        return ot;
    }
    if (!Throw) {
        return ot === type.toLowerCase();
    }
    if (ot !== type.toLowerCase()) {
        throw TypeError("Celestra classof(); type error: " + ot + " - " + type);
    }
    return true;
}
/* getType(variable: any): string */
/* getType(variable: any [, type: string [, throw =false]]):
  boolean | throw error */
/** @deprecated * @return {string | boolean} */
export function getType(value, type, Throw = false) {
    let ot = Object.prototype.toString.call(value).slice(8, -1).toLowerCase();
    if (arguments.length < 2) {
        return ot;
    }
    if (!Throw) {
        return ot === type.toLowerCase();
    }
    if (ot !== type.toLowerCase()) {
        throw TypeError("Celestra getType(); type error: " + ot + " - " + type);
    }
    return true;
}
/* toPrimitiveValue(value: any): primitive | object | symbol | Function */
export function toPrimitiveValue(value) {
    if (value == null || typeof value !== "object") {
        return value;
    }
    const ot = Object.prototype.toString.call(value).slice(8, -1);
    if (["Boolean", "BigInt", "Number", "String", "Symbol"].includes(ot)) {
        return value.valueOf();
    }
    return value;
}
/* isPropertyKey(value: any): boolean */
export const isPropertyKey = (value) => (typeof value === "string" || typeof value === "symbol");
/* toPropertyKey(value: any): string | symbol */
export const toPropertyKey = (value) => (typeof value === "symbol" ? value : String(value));
/* isIndex(value: any): boolean */
export const isIndex = (value) => (Number.isSafeInteger(value) && value >= 0 && 1 / value !== 1 / -0);
/* isLength(value: any): boolean */
export const isLength = (value) => (Number.isSafeInteger(value) && value >= 0 && 1 / value !== 1 / -0);
/* toIndex(value: any): unsigned integer */
export function toIndex(value) {
    value = ((value = Math.trunc(+value)) !== value || value === 0) ? 0 : value;
    if (value < 0 || value > (Math.pow(2, 53) - 1)) {
        throw new RangeError("toIndex(); RangeError: " + value);
    }
    return value;
}
/* toLength(value: any): unsigned integer */
export function toLength(value) {
    value = ((value = Math.trunc(+value)) !== value || value === 0) ? 0 : value;
    return Math.min(Math.max(value, 0), Math.pow(2, 53) - 1);
}
/* type(value: any): string */
export const type = (value) => ((value === null) ? "null" : (typeof value));
/* isSameClass(value1: any, value2: any): boolean */
/** @deprecated * @return {boolean} */
export const isSameClass = (x, y) => (Object.prototype.toString.call(x) === Object.prototype.toString.call(y));
/* isSameType(value1: any, value2: any): boolean */
export const isSameType = (x, y) => ((x == null || y == null) ? (x === y) : (typeof x === typeof y));
/* isSameInstance(value1: any, value2: any, Contructor: function): boolean */
export const isSameInstance = (x, y, Contructor) => (x instanceof Contructor && y instanceof Contructor);
/* isCoercedObject(object: any): constructor function | false */
export function isCoercedObject(value) {
    if (value != null && typeof value === "object") {
        if (value instanceof Number) {
            return Number;
        }
        if (value instanceof String) {
            return String;
        }
        if (value instanceof Boolean) {
            return Boolean;
        }
        if (value instanceof BigInt) {
            return BigInt;
        }
        if (typeof value.valueOf?.() === "symbol") {
            return Symbol;
        }
    }
    return false;
}
/* isDeepStrictEqual(x: any, y: any): boolean */
export function isDeepStrictEqual(x, y) {
    /* helper functions */
    const _deepType = (x) => ((x === null) ? "null" : (x !== x) ? "NaN" : (typeof x));
    const _isPrimitive = (x) => (x == null || (typeof x !== "object" && typeof x !== "function"));
    const _isObject = (x) => (x != null && typeof x === "object");
    const _isSameInstance = (x, y, Class) => (x instanceof Class) && (y instanceof Class);
    const _classof = (x) => Object.prototype.toString.call(x).slice(8, -1).toLowerCase();
    const _ownKeys = (x) => 
    // @ts-ignore
    Object.getOwnPropertyNames(x).concat(Object.getOwnPropertySymbols(x));
    /* strict equality helper function */
    const _isEqual = (x, y) => Object.is(x, y);
    /* not strict equality helper function */
    /* const _isEqual = (x, y) => (x == y || (x !== x && y !== y)); */
    /* primitives: Boolean, Number, BigInt, String + Function + Symbol */
    if (_isEqual(x, y)) {
        return true;
    }
    /* Object Wrappers (Boolean, Number, BigInt, String) */
    if (_isObject(x) && _isPrimitive(y) && _classof(x) === typeof y) {
        return _isEqual(x.valueOf(), y);
    }
    if (_isPrimitive(x) && _isObject(y) && typeof x === _classof(y)) {
        return _isEqual(x, y.valueOf());
    }
    /* type (primitives, object, null, NaN) */
    if (_deepType(x) !== _deepType(y)) {
        return false;
    }
    /* objects */
    if (_isObject(x) && _isObject(y)) {
        /* objects / same memory adress */
        if (_isEqual(x, y)) {
            return true;
        }
        /* objects / not same constructor */
        if (Object.getPrototypeOf(x).constructor !==
            Object.getPrototypeOf(y).constructor) {
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
            || _isSameInstance(x, y, BigInt)) {
            return _isEqual(x.valueOf(), y.valueOf());
        }
        /* objects / Array */
        if (Array.isArray(x) && Array.isArray(y)) {
            if (x.length !== y.length) {
                return false;
            }
            if (x.length === 0) {
                return true;
            }
            return x.every((value, index) => isDeepStrictEqual(value, y[index]));
        }
        /* objects / TypedArrays */
        if (_isSameInstance(x, y, Int8Array)
            || _isSameInstance(x, y, Uint8Array)
            || _isSameInstance(x, y, Uint8ClampedArray)
            || _isSameInstance(x, y, Int16Array)
            || _isSameInstance(x, y, Uint16Array)
            || _isSameInstance(x, y, Int32Array)
            || _isSameInstance(x, y, Uint32Array)
            || ("Float16Array" in globalThis ?
                _isSameInstance(x, y, Float16Array) : false)
            || _isSameInstance(x, y, Float32Array)
            || _isSameInstance(x, y, Float64Array)
            || _isSameInstance(x, y, BigInt64Array)
            || _isSameInstance(x, y, BigUint64Array)) {
            if (x.length !== y.length) {
                return false;
            }
            if (x.length === 0) {
                return true;
            }
            return x.every((value, index) => _isEqual(value, y[index]));
        }
        /* objects / ArrayBuffer */
        if (_isSameInstance(x, y, ArrayBuffer)) {
            if (x.byteLength !== y.byteLength) {
                return false;
            }
            if (x.byteLength === 0) {
                return true;
            }
            let xTA = new Int8Array(x), yTA = new Int8Array(y);
            return xTA.every((value, index) => _isEqual(value, yTA[index]));
        }
        /* objects / DataView */
        if (_isSameInstance(x, y, DataView)) {
            if (x.byteLength !== y.byteLength) {
                return false;
            }
            if (x.byteLength === 0) {
                return true;
            }
            for (let index = 0; index < x.byteLength; index++) {
                if (!_isEqual(x.getUint8(index), y.getUint8(index))) {
                    return false;
                }
            }
            return true;
        }
        /* objects / Map */
        if (_isSameInstance(x, y, Map)) {
            if (x.size !== y.size) {
                return false;
            }
            if (x.size === 0) {
                return true;
            }
            return [...x.keys()].every((value) => isDeepStrictEqual(x.get(value), y.get(value)));
        }
        /* objects / Set */
        if (_isSameInstance(x, y, Set)) {
            if (x.size !== y.size) {
                return false;
            }
            if (x.size === 0) {
                return true;
            }
            return [...x.keys()].every((value) => y.has(value));
        }
        /* objects / RegExp */
        if (_isSameInstance(x, y, RegExp)) {
            return _isEqual(x.lastIndex, y.lastIndex)
                && _isEqual(x.flags, y.flags)
                && _isEqual(x.source, y.source);
        }
        /* objects / Error */
        if (_isSameInstance(x, y, Error)) {
            return isDeepStrictEqual(Object.getOwnPropertyNames(x)
                .reduce((acc, k) => { acc[k] = x[k]; return acc; }, {}), Object.getOwnPropertyNames(y)
                .reduce((acc, k) => { acc[k] = y[k]; return acc; }, {}));
        }
        /* objects / Date */
        if (_isSameInstance(x, y, Date)) {
            return _isEqual(+x, +y);
        }
        /* objects / Proxy -> not detectable */
        /* objects / Objects */
        let xKeys = _ownKeys(x), yKeys = _ownKeys(y);
        if (xKeys.length !== yKeys.length) {
            return false;
        }
        if (xKeys.length === 0) {
            return true;
        }
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
export function isEmptyValue(value) {
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
            BigInt64Array, BigUint64Array
        ];
        if ("Float16Array" in globalThis) {
            // @ts-ignore
            constructors.push(globalThis.Float16Array);
        }
        return constructors.some((Class) => value instanceof Class);
    }
    /* Check undefined, null, NaN */
    if (value == null || Number.isNaN(value)) {
        return true;
    }
    /* Check Array, TypedArrays, string, String */
    if (Array.isArray(value) || _isTypedArray(value)
        || typeof value === "string" || value instanceof String) {
        return value.length === 0;
    }
    /* Check Map and Set */
    if (value instanceof Map || value instanceof Set) {
        return value.size === 0;
    }
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
            for (const _ of value) {
                return false;
            }
            return true;
        }
        catch { /* Not iterable */ }
    }
    /* Other objects - check own properties (including symbols) */
    if (isObject(value)) {
        const keys = [
            ...Object.getOwnPropertyNames(value),
            ...Object.getOwnPropertySymbols(value)
        ];
        if (keys.length === 0)
            return true;
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
export const isProxy = (value) => Boolean(value != null && value.__isProxy);
/* isAsyncGeneratorFn(value: any): boolean */
export const isAsyncGeneratorFn = (value) => (Object.getPrototypeOf(value).constructor ===
    Object.getPrototypeOf(async function* () { }).constructor);
/* isClass(value: any): boolean */
export const isClass = (value) => (typeof value === "function" && typeof value.prototype === "object");
/* isPlainObject(value: any): boolean */
export const isPlainObject = (value) => (value != null && typeof value === "object"
    && (Object.getPrototypeOf(value) === Object.prototype
        || Object.getPrototypeOf(value) === null));
/* isChar(value: any): boolean */
export const isChar = (value) => (typeof value === "string"
    && (value.length === 1 || Array.from(value).length === 1));
/* isNumeric(value: any): boolean */
export const isNumeric = (value) => (((typeof value === "number" || typeof value === "bigint") && value === value)
    ? true : (!isNaN(parseFloat(value)) && isFinite(value)));
/* isObject(value: any): boolean */
export const isObject = (value) => (value != null && (typeof value === "object" || typeof value === "function"));
/* isFunction(value: any): boolean */
export const isFunction = (value) => (typeof value === "function" ||
    Object.prototype.toString.call(value) === "[object Function]");
/* isCallable(value: any): boolean */
export const isCallable = (value) => ((value != null && ["object", "function"].includes(typeof value))
    ? (typeof value.call === "function") : false);
/* isArraylike(value: any): boolean */
export const isArraylike = (value) => value != null
    && typeof value !== "function"
    && (typeof value === "object" || typeof value === "string")
    && Number.isSafeInteger(value.length) && value.length >= 0;
/* isNull(value: any): boolean */
export const isNull = (value) => (value === null);
/* isUndefined(value: any): boolean */
export const isUndefined = (value) => (value === undefined);
/* isNil(value: any): boolean */
export const isNil = (value) => (value == null);
/* isPrimitive(value: any): boolean */
export const isPrimitive = (value) => (value == null || (typeof value !== "object" && typeof value !== "function"));
/* isIterator(value: any): boolean */
export const isIterator = (value) => ("Iterator" in globalThis ? (value instanceof Iterator)
    : (value != null && typeof value === "object" && typeof value.next === "function"));
/* isRegexp(value: any): boolean */
export const isRegexp = (value) => (value instanceof RegExp);
/* isElement(value: any): boolean */
export const isElement = (value) => (value != null && typeof value === "object" && value.nodeType === 1);
/* isIterable(value: any): boolean */
export const isIterable = (value) => (value != null && typeof value[Symbol.iterator] === "function");
/* isAsyncIterable(value: any): boolean */
export const isAsyncIterable = (value) => (value != null && typeof value[Symbol.asyncIterator] === "function");
/* isTypedArray(value: any): boolean */
/**
 * Checks if a value is a TypedArray (Int8Array, etc.).
 *
 * @param {any} value The value to check.
 * @returns boolean
 */
export function isTypedArray(value) {
    const constructors = [
        Int8Array, Uint8Array, Uint8ClampedArray,
        Int16Array, Uint16Array,
        Int32Array, Uint32Array,
        Float32Array, Float64Array,
        BigInt64Array, BigUint64Array
    ];
    if ("Float16Array" in globalThis) {
        // @ts-ignore
        constructors.push(globalThis.Float16Array);
    }
    return constructors.some((Class) => value instanceof Class);
}
/* isGeneratorFn(value: any): boolean */
export const isGeneratorFn = (value) => (Object.getPrototypeOf(value).constructor ===
    Object.getPrototypeOf(function* () { }).constructor);
/* isAsyncFn(value: any): boolean */
export const isAsyncFn = (value) => (Object.getPrototypeOf(value).constructor ===
    Object.getPrototypeOf(async function () { }).constructor);
/** Cookie API **/
/* setCookie(Options object): undefined */
/* setCookie(name: string, value: string [, hours = 8760 [, path = "/" [, domain
  [, secure [, SameSite = "Lax" [, HttpOnly]]]]]]): undefined */
export function setCookie(name, value, hours = 8760, path = "/", domain, secure, SameSite = "Lax", HttpOnly) {
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
        + (typeof SameSite === "string" && SameSite.length ? "; SameSite=" + SameSite : "")
        + (HttpOnly ? "; HttpOnly" : "")
        + ";";
}
/* getCookie(): object | string | null */
/* getCookie([name: string]): object | string | null */
export function getCookie(name) {
    if (document.cookie.length !== 0) {
        let result = {};
        let array = document.cookie.split(";");
        for (let index = 0, length = array.length; index < length; index++) {
            let record = array[index].trim().split("=");
            result[decodeURIComponent(record[0])] = decodeURIComponent(record[1]);
        }
        return (name ? (result[name] ? result[name] : null) : result);
    }
    return (name ? null : {});
}
/* hasCookie(name: string): boolean */
export const hasCookie = (name) => (document.cookie.includes(encodeURIComponent(name) + "="));
/* removeCookie(Options object);: boolean */
/* removeCookie(name: string [, path = "/"
  [, domain [, secure [, SameSite = "Lax" [, HttpOnly ]]]]]): boolean */
export function removeCookie(name, path = "/", domain, secure, SameSite = "Lax", HttpOnly) {
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
export function clearCookies(path = "/", domain, secure, SameSite = "Lax", HttpOnly) {
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
        for (let index = 0, length = array.length; index < length; index++) {
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
 * Returns the original value if this is an array or value a new array.
 *
 * @param {any[]} args
 * @returns {any[]} An array wrapping the value, or the original array if already one.
 */
export function castArray(...args) {
    if (!args.length) {
        return [];
    }
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
 * @param {IterableIterator<any> | IterableIterator<any> | ArrayLike<any>} iter
 * @returns any[]
 */
export const compact = (iter) => Array.from(iter).filter((value) => value || value === 0);
/* unique(iterator: iterator [, resolver: string | Function]): array */
export function unique(iter, resolver) {
    if (resolver == null) {
        return [...new Set(iter)];
    }
    if (typeof resolver === "string") {
        return Array.from(iter).reduce(function (acc, el) {
            if (acc.every((e) => e[resolver] !== el[resolver])) {
                acc.push(el);
            }
            return acc;
        }, []);
    }
    if (typeof resolver === "function") {
        let cache = new Map();
        for (let item of iter) {
            let key = resolver(item);
            if (!cache.has(key)) {
                cache.set(key, item);
            }
        }
        return [...cache.values()];
    }
}
/* count(iterator, callback: function): integer */
export function count(iter, fn) {
    let index = 0, result = 0;
    for (let item of iter) {
        if (fn(item, index++)) {
            result++;
        }
    }
    return result;
}
/* arrayDeepClone(array: array): array */
export function arrayDeepClone([...array]) {
    const _ADC = (value) => (Array.isArray(value) ? Array.from(value, _ADC) : value);
    return _ADC(array);
}
/* initial(iterator: iterator): array */
export const initial = ([...array]) => array.slice(0, -1);
/* shuffle(iterator: iterator): array */
export function shuffle([...array]) {
    for (let index = array.length - 1; index > 0; index--) {
        let pos = Math.floor(Math.random() * (index + 1));
        [array[index], array[pos]] = [array[pos], array[index]];
    }
    return array;
}
/* partition(iterator: iterator, callback: function): array */
export const partition = ([...array], fn) => 
// @ts-ignore
[array.filter(fn), array.filter((value, index, a) => !(fn(value, index, a)))];
/* setUnion(iterator1: iterator [, iteratorN: iterator]): set */
export const setUnion = (...args) => new Set(args.map(([...item]) => item).flat());
/* setIntersection(set1: set, set2: set): set */
export const setIntersection = ([...array], b) => new Set(array.filter((value) => b.has(value)));
/* setDifference(set1: set, set2: set): set */
export const setDifference = ([...array], b) => new Set(array.filter((value) => !(b.has(value))));
/* setSymmetricDifference(set1: set, set2: set): set */
export const setSymmetricDifference = (array, b) => new Set([...array].filter((value) => !(b.has(value))).concat([...b]
    .filter((value) => !(array.has(value)))));
/* isSuperset(superCollection: iterator, subCollection: iterator): boolean */
export const isSuperset = ([...superSet], [...subSet]) => subSet.every((value) => superSet.includes(value));
/* min(value1: any [, valueN]): any */
export const min = (...args) => args.reduce((acc, value) => (value < acc ? value : acc), args[0]);
/* max(value1: any [, valueN]): any */
export const max = (...args) => args.reduce((acc, value) => (value > acc ? value : acc), args[0]);
/* arrayRepeat(value: any [, n = 100]): array */
export const arrayRepeat = (value, n = 100) => Array(n).fill(value);
/* arrayCycle(iterator: iterator [, n: integer = 100]): array */
export const arrayCycle = ([...array], n = 100) => Array(n).fill(array).flat();
/* arrayRange([ start = 0 [, end = 99 [, step = 1]]]): array */
export const arrayRange = (start = 0, end = 99, step = 1) => Array.from({ length: (end - start) / step + 1 }, (_v, i) => start + (i * step));
/* zip(iterator1: iterator [, iteratorN: iterator]): array */
export function zip(...args) {
    args = args.map((value) => Array.from(value));
    return Array.from({ length: Math.min(...args.map(v => v.length)) })
        .map((_, i) => args.map(v => v[i]));
}
/* unzip(iterator: iterator): array */
export const unzip = ([...array]) => array.map((iter) => Array.from(iter))
    .reduce((acc, v) => {
    v.forEach((item, index) => {
        if (!Array.isArray(acc[index])) {
            acc[index] = [];
        }
        acc[index].push(item);
    });
    return acc;
}, []);
/* zipObj(iterator1: iterator, iterator2: iterator): object */
export function zipObj([...array1], [...array2]) {
    let result = {};
    let length = Math.min(array1.length, array2.length);
    for (let index = 0; index < length; index++) {
        result[array1[index]] = array2[index];
    }
    return result;
}
/* arrayAdd(array: array, value: any): boolean */
export const arrayAdd = (array, value) => (!array.includes(value)) ? !!array.push(value) : false;
/* arrayClear(array: array): array */
export function arrayClear(array) {
    array.length = 0;
    return array;
}
//* arrayRemove(array: array, value: any [, all: boolean = false]): boolean */
export function arrayRemove(array, value, all = false) {
    let found = array.indexOf(value) > -1;
    if (!all) {
        let pos = array.indexOf(value);
        if (pos > -1) {
            array.splice(pos, 1);
        }
    }
    else {
        let pos = -1;
        while ((pos = array.indexOf(value)) > -1) {
            array.splice(pos, 1);
        }
    }
    return found;
}
/* arrayRemoveBy(array: array, callback: function [, all: boolean = false]):
  boolean */
export function arrayRemoveBy(array, fn, all = false) {
    // @ts-ignore
    let found = array.findIndex(fn) > -1;
    if (!all) {
        // @ts-ignore
        let pos = array.findIndex(fn);
        if (pos > -1) {
            array.splice(pos, 1);
        }
    }
    else {
        let pos = -1;
        // @ts-ignore
        while ((pos = array.findIndex(fn)) > -1) {
            array.splice(pos, 1);
        }
    }
    return found;
}
/* arrayMerge(target: array, source1: any [, sourceN: any]): array */
export function arrayMerge(target, ...sources) {
    target.push(...[].concat(...sources));
    return target;
}
/* iterRange([start: number = 0 [,step: number = 1
  [, end: number = Infinity]]]): iterator */
export function* iterRange(start = 0, step = 1, end = Infinity) {
    let index = start;
    while (index <= end) {
        yield index;
        index += step;
    }
}
/* iterCycle(iterator: iterator [, n = Infinity]): iterator */
export function* iterCycle([...array], n = Infinity) {
    let index = 0;
    while (index < n) {
        yield* array;
        index++;
    }
}
/* iterRepeat(value: any [, n: number = Infinity]): iterator */
export function* iterRepeat(value, n = Infinity) {
    let index = 0;
    while (index < n) {
        yield value;
        index++;
    }
}
/* takeWhile(iterator: iterator, callback: function): iterator */
export function* takeWhile(iter, fn) {
    for (let item of iter) {
        if (!fn(item)) {
            break;
        }
        yield item;
    }
}
/* dropWhile(iterator: iterator, callback: function): iterator */
export function* dropWhile(iter, fn) {
    let dropping = true;
    for (let item of iter) {
        if (dropping && !fn(item)) {
            dropping = false;
        }
        if (!dropping) {
            yield item;
        }
    }
}
/* take(iterator: iterator [, n: number = 1]): iterator */
export function* take(iter, n = 1) {
    let index = n;
    for (let item of iter) {
        if (index <= 0) {
            break;
        }
        yield item;
        index--;
    }
}
/* drop(iterator: iterator [, n: number =1 ]): iterator */
export function* drop(iter, n = 1) {
    let index = n;
    for (let item of iter) {
        if (index < 1) {
            yield item;
        }
        else {
            index--;
        }
    }
}
/* forEach(iterator: iterator, callback: function): undefined */
export function forEach(iter, fn) {
    let index = 0;
    for (let item of iter) {
        fn(item, index++);
    }
}
/* forEachRight(iterator: iterator, callback: function): undefined */
export function forEachRight([...array], fn) {
    let index = array.length;
    while (index--) {
        fn(array[index], index);
    }
}
/* map(iterator: iterator, callback: function): iterator */
export function* map(iter, fn) {
    let index = 0;
    for (let item of iter) {
        yield fn(item, index++);
    }
}
/* filter(iterator: iterator, callback: function): iterator */
export function* filter(iter, fn) {
    let index = 0;
    for (let item of iter) {
        if (fn(item, index++)) {
            yield item;
        }
    }
}
/* reject(iterator: iterator, callback: function): iterator */
export function* reject(iter, fn) {
    let index = 0;
    for (let item of iter) {
        if (!fn(item, index++)) {
            yield item;
        }
    }
}
/* slice(iterator: iterator [, begin: number = 0 [, end: number = Infinity]]):
  iterator */
export function* slice(iter, begin = 0, end = Infinity) {
    let index = 0;
    for (let item of iter) {
        if (index >= begin && index <= end) {
            yield item;
        }
        else if (index > end) {
            return;
        }
        index++;
    }
}
/* tail(iterator: iterator): iterator */
export function* tail(iter) {
    let first = true;
    for (let item of iter) {
        if (!first) {
            yield item;
        }
        else {
            first = false;
        }
    }
}
/* item(iterator: iterator, index: integer): any */
export function item(iter, pos) {
    let i = 0;
    for (let item of iter) {
        if (i++ === pos) {
            return item;
        }
    }
}
/* nth(iterator: iterator, index: integer): any */
export function nth(iter, pos) {
    let i = 0;
    for (let item of iter) {
        if (i++ === pos) {
            return item;
        }
    }
}
/* size(iterator: iterator): integer */
export function size(iter) {
    let index = 0;
    for (let _item of iter) {
        index++;
    }
    return index;
}
/* first(iterator: iterator): any */
export function first(iter) {
    for (let item of iter) {
        return item;
    }
}
/* head(iterator: iterator): any */
export function head(iter) {
    for (let item of iter) {
        return item;
    }
}
/* last(iterator: iterator): any */
export const last = ([...array]) => array[array.length - 1];
/* reverse(iterator: iterator): iterator */
export function* reverse([...array]) {
    let index = array.length;
    while (index--) {
        yield array[index];
    }
}
/* sort(iterator: iterator [, numbers = false]): array */
export const sort = ([...array], numbers) => array.sort(numbers ? (x, y) => x - y : undefined);
/* includes (collection: any, value: any, comparator: undefined | Function):
  boolean */
/**
 * @param {any} collection - The collection to search through.
 * @param {any} value - The value to look for.
 * @param {undefined | ((a: any, b: any) => boolean)} [comparator] - Optional comparator for equality check.
 * @return {boolean} - Whether the value was found.
 * @throws {TypeError} - If comparator is not a Function or undefined.
 */
export function includes(collection, value, comparator) {
    /* Comparator Validation - has to be a function or undefined. */
    if (comparator !== undefined && typeof comparator !== "function") {
        throw new TypeError(`[includes] TypeError: comparator is not a function or undefined. Got ${typeof comparator}`);
    }
    /* helper functions */
    const _isIterator = (value) => value != null && typeof value === "object"
        && typeof value.next === "function";
    const _isIterable = (value) => (value != null && typeof value[Symbol.iterator] === "function");
    const _isEqual = comparator ||
        ((x, y) => x === y || (x !== x && y !== y));
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
            if (_isEqual(item, value)) {
                return true;
            }
        }
        for (const item of collection.values()) {
            if (_isEqual(item, value)) {
                return true;
            }
        }
        return false;
    }
    /* Iterator or Iterables (Array, Set, TypedArrays, other Iterables, etc.) */
    if (_isIterator(collection) || _isIterable(collection)) {
        for (const item of collection) {
            if (_isEqual(item, value)) {
                return true;
            }
        }
        return false;
    }
    /* Plain object or function */
    if (["object", "function"].includes(cType)) {
        for (const item of Object.keys(collection)) {
            if (_isEqual(item, value)) {
                return true;
            }
        }
        for (const item of Object.values(collection)) {
            if (_isEqual(item, value)) {
                return true;
            }
        }
        for (const item of Object.getOwnPropertySymbols(collection)) {
            if (_isEqual(item, value)) {
                return true;
            }
        }
        return false;
    }
    /* default return false */
    return false;
}
/* contains(iterator: iterator, value: any): boolean */
/** @deprecated */
export function contains(iter, value) {
    for (let item of iter) {
        if (item === value || (item !== item && value !== value)) {
            return true;
        }
    }
    return false;
}
/* find(iterator: iterator, callback: function): any */
export function find(iter, fn) {
    let index = 0;
    for (let item of iter) {
        if (fn(item, index++)) {
            return item;
        }
    }
}
/* findLast(iterator: iterator, callback: function): any */
export function findLast(iter, fn) {
    let index = 0, result;
    for (let item of iter) {
        if (fn(item, index++)) {
            result = item;
        }
    }
    return result;
}
/* every(iterator: iterator, callback: function): boolean */
export function every(iter, fn) {
    let index = 0;
    for (let item of iter) {
        if (!fn(item, index++)) {
            return false;
        }
    }
    if (index === 0) {
        return false;
    }
    return true;
}
/* some(iterator: iterator, callback: function): boolean */
export function some(iter, fn) {
    let index = 0;
    for (let item of iter) {
        if (fn(item, index++)) {
            return true;
        }
    }
    return false;
}
/* none(iterator: iterator, callback: function): boolean */
export function none(iter, fn) {
    let index = 0;
    for (let item of iter) {
        if (fn(item, index++)) {
            return false;
        }
    }
    if (index === 0) {
        return false;
    }
    return true;
}
/* takeRight(iterator: iterator [, n: number = 1]): array */
export const takeRight = ([...array], n = 1) => array.reverse().slice(0, n);
/* takeRightWhile(iterator: iterator, callback: function): iterator */
export function* takeRightWhile([...array], fn) {
    let index = 0;
    for (let item of array.reverse()) {
        if (fn(item, index++)) {
            yield item;
        }
        else {
            break;
        }
    }
}
/* dropRight(iterator: iterator [, n: number = 1]): array */
export const dropRight = ([...array], n = 1) => array.reverse().slice(n);
/* dropRightWhile(iterator: iterator, callback: function): iterator */
export function* dropRightWhile([...array], fn) {
    let dropping = true, index = 0;
    for (let item of array.reverse()) {
        if (dropping && !fn(item, index++)) {
            dropping = false;
        }
        if (!dropping) {
            yield item;
        }
    }
}
/* concat(iterator1: iterator [, iteratorN]: iterator): iterator */
export function* concat() {
    for (let item of arguments) {
        if (typeof item[Symbol.iterator] === "function" ||
            ("Iterator" in globalThis ? (item instanceof Iterator)
                : (typeof item === "object" && typeof item.next === "function"))) {
            yield* item;
        }
        else {
            yield item;
        }
    }
}
/* reduce(iterator: iterator, callback: function [, initialvalue: any]): any */
export function reduce(iter, fn, initialvalue) {
    let acc = initialvalue, index = 0;
    for (let item of iter) {
        if (index === 0 && acc === undefined) {
            acc = item;
        }
        else {
            acc = fn(acc, item, index++);
        }
    }
    return acc;
}
/* enumerate(iterator: iterator [, offset = 0]): iterator */
export function* enumerate(iter, offset = 0) {
    let index = offset;
    for (let item of iter) {
        yield [index++, item];
    }
}
/* flat(iterator: iterator): iterator */
export function* flat(iter) {
    for (let item of iter) {
        if (typeof item[Symbol.iterator] === "function" ||
            ("Iterator" in globalThis ? (item instanceof Iterator)
                : (typeof item === "object" && typeof item.next === "function"))) {
            yield* item;
        }
        else {
            yield item;
        }
    }
}
/* join(iterator: iterator [, separator = ","]): string */
export function join(iter, separator = ",") {
    separator = String(separator);
    let result = "";
    for (let item of iter) {
        result += separator + item;
    }
    return result.slice(separator.length);
}
/* withOut(iterator: iterator, filterIterator: iterator): array */
export const withOut = ([...array], [...filterValues]) => array.filter((value) => !filterValues.includes(value));
/** Math API **/
/* isFloat(value: any): boolean */
export const isFloat = (value) => (typeof value === "number" && value === value && !!(value % 1));
/* toInteger(value: any): integer */
export function toInteger(value) {
    value = ((value = Math.trunc(+value)) !== value || value === 0) ? 0 : value;
    return Math.min(Math.max(value, -(Math.pow(2, 53) - 1)), Math.pow(2, 53) - 1);
}
/* toIntegerOrInfinity(value: any): integer | Infinity | -Infinity */
export const toIntegerOrInfinity = (value) => ((value = Math.trunc(+value)) !== value || value === 0) ? 0 : value;
/* sum(value1: any [, valueN]: any): any */
export const sum = (...values) => (values.every((value) => typeof value === "number") ?
    // @ts-ignore
    Math.sumPrecise(values) : values.slice(1).reduce((acc, v) => acc + v, values[0]));
/* avg(value1: number [, valueN: number]): number */
// @ts-ignore
export const avg = (...args) => 
// @ts-ignore
Math.sumPrecise(args) / args.length;
/* product(value1: number [, valueN: number]): number */
export const product = (first, ...args) => args.reduce((acc, v) => acc * v, first);
/* clamp(value: any, min: any, max: any): number */
export function clamp(value, min = -9007199254740991, max = 9007199254740991) {
    /* normalize */
    function _normalize(value) {
        if (typeof value !== "bigint" && typeof value !== "number") {
            value = Number(value);
        }
        if (value === -Infinity) {
            return -9007199254740991;
        }
        if (value === Infinity) {
            return 9007199254740991;
        }
        if (value === 0) {
            return 0;
        }
        return value;
    }
    value = _normalize(value);
    min = _normalize(min);
    max = _normalize(max);
    /* NaN: val, min, max */
    if (value !== value) {
        return value;
    }
    if (min !== min || max !== max) {
        throw new RangeError("clamp(); RangeError: minimum and maximum should not to be NaN");
    }
    /* min > max -> throw RangeError */
    if (min > max) {
        throw new RangeError("clamp(); RangeError: minimum should be lower than maximum");
    }
    /* clamp */
    return (value < min) ? min : ((value > max) ? max : value);
}
/* minmax(value: any, min: any, max: any): number */
export function minmax(value, min = -9007199254740991, max = 9007199254740991) {
    /* normalize */
    function _normalize(value) {
        if (typeof value !== "bigint" && typeof value !== "number") {
            value = Number(value);
        }
        if (value === -Infinity) {
            return -9007199254740991;
        }
        if (value === Infinity) {
            return 9007199254740991;
        }
        if (value === 0) {
            return 0;
        }
        return value;
    }
    value = _normalize(value);
    min = _normalize(min);
    max = _normalize(max);
    /* NaN: val, min, max */
    if (value !== value) {
        return value;
    }
    if (min !== min || max !== max) {
        throw new RangeError("clamp(); RangeError: minimum and maximum should not to be NaN");
    }
    /* min > max -> throw RangeError */
    if (min > max) {
        throw new RangeError("clamp(); RangeError: minimum should be lower than maximum");
    }
    /* clamp */
    return (value < min) ? min : ((value > max) ? max : value);
}
/* isEven(value: number): boolean */
export function isEven(value) {
    let result = value % 2;
    if (result === result) {
        return result === 0;
    }
    return false;
}
/* isOdd(value: number): boolean */
export function isOdd(value) {
    let result = value % 2;
    if (result === result) {
        return result !== 0;
    }
    return false;
}
/* toInt8(value: any): integer -127..128 */
export const toInt8 = (value) => ((value = Math.min(Math.max(-128, Math.trunc(Number(value))), 127)) === value)
    ? value : 0;
/* toUInt8(value: any): integer 0..255 */
export const toUInt8 = (value) => ((value = Math.min(Math.max(0, Math.trunc(Number(value))), 255)) === value)
    ? value : 0;
/* toInt16(value: any): integer -32768..32767 */
export const toInt16 = (value) => ((value = Math.min(Math.max(-32768, Math.trunc(Number(value))), 32767))
    === value) ? value : 0;
/* toUInt16(value: any) integer 0..65535 */
export const toUInt16 = (value) => ((value = Math.min(Math.max(0, Math.trunc(Number(value))), 65535)) === value)
    ? value : 0;
/* toInt32(value: any): integer -2147483648..2147483647 */
export const toInt32 = (value) => ((value = Math.min(Math.max(-2147483648, Math.trunc(Number(value))), 2147483647)) === value) ? value : 0;
/* toUInt32(value: any): integer 0..4294967295 */
export const toUInt32 = (value) => ((value = Math.min(Math.max(0, Math.trunc(Number(value))), 4294967295))
    === value) ? value : 0;
/* toBigInt64(value: any): bigint */
export const toBigInt64 = (value) => BigInt(typeof value === "bigint"
    ? (value > Math.pow(2, 63) - 1 ? Math.pow(2, 63) - 1 : value < Math.pow(-2, 63)
        ? Math.pow(-2, 63) : value)
    : ((value = Math.min(Math.max(Math.pow(-2, 63), Math.trunc(Number(value))), Math.pow(2, 63) - 1)) === value) ? value : 0);
/* toBigUInt64(value: any): unsigned bigint */
export const toBigUInt64 = (value) => BigInt(typeof value === "bigint"
    ? (value > Math.pow(2, 64) - 1 ? Math.pow(2, 64) - 1 : value < 0 ? 0 : value)
    : ((value = Math.min(Math.max(0, Math.trunc(Number(value))), Math.pow(2, 64) - 1)) === value) ? value : 0);
/* toFloat32(value: any): float */
export const toFloat32 = (value) => ((value = Math.min(Math.max(-3.4e38, Number(value)), 3.4e38)) === value)
    ? value : 0;
/* isInt8(value: any): boolean */
export const isInt8 = (value) => (Number.isInteger(value) ? (value >= -128 && value <= 127) : false);
/* isUInt8(value: any): boolean */
export const isUInt8 = (value) => (Number.isInteger(value) ? (value >= 0 && value <= 255) : false);
/* isInt16(value: any): boolean */
export const isInt16 = (value) => (Number.isInteger(value) ? (value >= -32768 && value <= 32767) : false);
/* isUInt16(value: any): boolean */
export const isUInt16 = (value) => (Number.isInteger(value) ? (value >= 0 && value <= 65535) : false);
/* isInt32(value: any): boolean */
export const isInt32 = (value) => (Number.isInteger(value) ? (value >= -2147483648 && value <= 2147483647)
    : false);
/* isUInt32(value: any): boolean */
export const isUInt32 = (value) => (Number.isInteger(value) ? (value >= 0 && value <= 4294967295) : false);
/* isBigInt64(value: any): boolean */
export const isBigInt64 = (value) => (typeof value === "bigint"
    ? (value >= Math.pow(-2, 63) && value <= Math.pow(2, 63) - 1) : false);
/* isBigUInt64(value: any): boolean */
export const isBigUInt64 = (value) => (typeof value === "bigint" ? (value >= 0 && value <= Math.pow(2, 64) - 1)
    : false);
/* toFloat16(value: any): float16 */
export const toFloat16 = (value) => ((value = Math.min(Math.max(-65504, Number(value)), 65504)) === value)
    ? value : 0;
/* isFloat16(value: any): boolean */
export const isFloat16 = (value) => ((typeof value === "number" && value === value)
    ? (value >= -65504 && value <= 65504) : false);
/* signbit(value: any): boolean */
export const signbit = (value) => (((value = Number(value)) !== value)
    ? false : ((value < 0) || Object.is(value, -0)));
/* randomInt([max: integer]): integer */
/* randomInt(min: integer, max: integer): integer */
export function randomInt(min = 100, max) {
    if (max == null) {
        max = min;
        min = 0;
    }
    min = Math.ceil(Number(min));
    return Math.floor(Math.random() * (Math.floor(Number(max)) - min + 1) + min);
}
/* randomFloat([max: float]): float */
/* randomFloat(min: float, max: float): float */
export function randomFloat(min = 100, max) {
    if (max == null) {
        max = min;
        min = 0;
    }
    let result = (Math.random() * (max - min + 1)) + min;
    return result > max ? max : result;
}
/* inRange(value: number, min: number, max: number): boolean */
export const inRange = (value, min, max) => (value >= min && value <= max);
/** object header **/
export const VERSION = "Celestra v6.1.0 dev";
const celestra = {
    /** object header **/
    VERSION,
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
export default celestra;
