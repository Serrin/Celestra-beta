"use strict";
const VERSION = "Celestra v6.1.1 node";
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
if (!("sumPrecise" in Math)) {
    Math.sumPrecise = function sumPrecise([...array]) {
        if (array.length === 0) {
            return -0;
        }
        if (array.every((value) => typeof value === "number")) {
            let inf = array.indexOf(Infinity) > -1;
            let negInf = array.indexOf(-Infinity) > -1;
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
            let hi = array.filter((value) => (value === 1e20 || value === -1e20))
                .reduce((acc, value) => acc + value, 0);
            let lo = 0.0;
            let c = 0.0;
            for (let item of array.filter((value) => (value !== 1e20 && value !== -1e20))) {
                let y = item - c;
                let t = lo + y;
                c = (t - lo) - y;
                lo = t;
            }
            if ((lo === 0 && hi !== 0) || (lo > 0 && hi > 0) || (lo < 0 && hi < 0)) {
                return hi;
            }
            if ((lo > 0 && hi < 0) || (lo < 0 && hi > 0)) {
                return lo + hi;
            }
            return lo;
        }
        throw new TypeError("values passed to Math.sumPrecise must be numbers");
    };
}
if (!("isError" in Error)) {
    Error.isError = function isError(value) {
        let className = Object.prototype.toString.call(value).slice(8, -1).toLowerCase();
        return (className === "error" || className === "domexception");
    };
}
if (!("groupBy" in Object)) {
    Object.defineProperty(Object, "groupBy", {
        "configurable": true, "writable": true, "enumerable": true,
        "value": function (items, callbackFn) {
            if (!(typeof callbackFn === "function")) {
                throw new TypeError();
            }
            let result = Object.create(null);
            let index = 0;
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
if (!("groupBy" in Map)) {
    Object.defineProperty(Map, "groupBy", {
        "configurable": true, "writable": true, "enumerable": true,
        "value": function (items, callbackFn) {
            if (!(typeof callbackFn === "function")) {
                throw new TypeError();
            }
            let result = new Map();
            let index = 0;
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
if (!Array.fromAsync) {
    Array.fromAsync = async function fromAsync(arrayLike, mapfn, thisArg) {
        const isConstructor = (value) => (typeof value === "function" && typeof value.prototype === "object");
        const errorMsg = "Input length exceed the Number.MAX_SAFE_INTEGER.";
        if (Symbol.asyncIterator in arrayLike || Symbol.iterator in arrayLike) {
            let result = isConstructor(this) ? new this : Array(0);
            let index = 0;
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
            let length = arrayLike.length;
            let result = isConstructor(this) ? new this(length) : Array(length);
            let index = 0;
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
if (("crypto" in globalThis) && !("randomUUID" in globalThis.crypto)) {
    globalThis.crypto.randomUUID = function randomUUID() {
        return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) => (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16));
    };
}
if (!Object.hasOwn) {
    Object.defineProperty(Object, "hasOwn", {
        configurable: true, enumerable: false, writable: true,
        value: function (object, property) {
            if (object == null) {
                throw new TypeError("Cannot convert undefined or null to object");
            }
            return Object.prototype.hasOwnProperty.call(Object(object), property);
        }
    });
}
if (!("toReversed" in Array.prototype)) {
    Object.defineProperty(Array.prototype, "toReversed", {
        "configurable": true, "writable": true, "enumerable": false,
        "value": function () { return this.slice().reverse(); }
    });
}
if (!("toSorted" in Array.prototype)) {
    Object.defineProperty(Array.prototype, "toSorted", {
        "configurable": true, "writable": true, "enumerable": false,
        "value": function (fn) { return this.slice().sort(fn); }
    });
}
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
if (!("toReversed" in Uint8Array.prototype)) {
    Object.defineProperty(Uint8Array.prototype, "toReversed", {
        "configurable": true, "writable": true, "enumerable": false,
        "value": function () { return this.slice().reverse(); }
    });
}
if (!("toSorted" in Uint8Array.prototype)) {
    Object.defineProperty(Uint8Array.prototype, "toSorted", {
        "configurable": true, "writable": true, "enumerable": false,
        "value": function (fn) { return this.slice().sort(fn); }
    });
}
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
if (!globalThis.GeneratorFunction) {
    globalThis.GeneratorFunction =
        Object.getPrototypeOf(function* () { }).constructor;
}
if (!globalThis.AsyncFunction) {
    globalThis.AsyncFunction =
        Object.getPrototypeOf(async function () { }).constructor;
}
if (!globalThis.AsyncGeneratorFunction) {
    globalThis.AsyncGeneratorFunction =
        Object.getPrototypeOf(async function* () { }).constructor;
}
const BASE16 = "0123456789ABCDEF";
const BASE32 = "234567ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const BASE36 = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const BASE58 = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
const BASE62 = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
const WORDSAFEALPHABET = "23456789CFGHJMPQRVWXcfghjmpqvwx";
const isNonNullable = (value) => value != null;
const isNonNullablePrimitive = (value) => value != null && typeof value !== "object" && typeof value !== "function";
const eq = (value1, value2) => value1 === value2 || (value1 !== value1 && value2 !== value2);
function gt(value1, value2) {
    const _typeOf = (value) => value === null ? "null" : typeof value;
    return _typeOf(value1) === _typeOf(value2) && value1 > value2;
}
function gte(value1, value2) {
    const _typeOf = (value) => value === null ? "null" : typeof value;
    return _typeOf(value1) === _typeOf(value2)
        && (value1 > value2
            || value1 === value2
            || (value1 !== value1 && value2 !== value2));
}
function lt(value1, value2) {
    const _typeOf = (value) => value === null ? "null" : typeof value;
    return _typeOf(value1) === _typeOf(value2) && value1 < value2;
}
function lte(value1, value2) {
    const _typeOf = (value) => value === null ? "null" : typeof value;
    return _typeOf(value1) === _typeOf(value2)
        && (value1 < value2
            || value1 === value2
            || (value1 !== value1 && value2 !== value2));
}
function tap(fn) {
    return function (value) { fn(value); return value; };
}
function once(fn) {
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
function curry(fn) {
    const curried = (...args) => args.length >= fn.length
        ? fn(...args)
        : (...rest) => curried(...args, ...rest);
    return curried;
}
const pipe = (...functions) => (first) => functions.reduce((value, fn) => fn(value), first);
const compose = (...functions) => (first) => functions.reduceRight((value, fn) => fn(value), first);
const pick = (obj, keys) => keys.reduce(function (acc, key) {
    if (key in obj) {
        acc[key] = obj[key];
    }
    return acc;
}, {});
const omit = (obj, keys) => Object.keys(obj).reduce(function (acc, key) {
    if (!keys.includes(key)) {
        acc[key] = obj[key];
    }
    return acc;
}, {});
const assoc = (obj, property, value) => ({ ...obj, [property]: value });
function asyncNoop() {
    return new Promise(function (resolve) { resolve(); });
}
async function asyncT() { return true; }
async function asyncF() { return false; }
function asyncConstant(value) {
    return async function () { return value; };
}
async function asyncIdentity(value) { return value; }
function deleteOwnProperty(obj, property, Throw = false) {
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
function createPolyfillMethod(obj, property, value) {
    if (!(Object.hasOwn(obj, property))) {
        Object.defineProperty(obj, property, {
            writable: true, enumerable: false, configurable: true, value: value
        });
    }
    return (obj[property] === value);
}
function createPolyfillProperty(obj, property, value) {
    if (!(Object.hasOwn(obj, property))) {
        Object.defineProperty(obj, property, {
            writable: true, enumerable: true, configurable: true, value: value
        });
    }
    return (obj[property] === value);
}
function randomUUIDv7(v4 = false) {
    let ts = Date.now().toString(16).padStart(12, "0") + (v4 ? "4" : "7");
    let uuid = Array.from(([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) => (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)));
    let index = 0;
    let pos = 0;
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
const delay = (milisec) => new Promise(resolve => setTimeout(resolve, milisec));
const randomBoolean = () => !Math.round(Math.random());
const getUrlVars = (str = location.search) => [...new URLSearchParams(str).entries()]
    .reduce(function (obj, item) { obj[item[0]] = item[1]; return obj; }, {});
const obj2string = (obj) => Object.keys(obj).reduce((str, key) => str
    += encodeURIComponent(key) + "=" + encodeURIComponent(obj[key]) + "&", "").slice(0, -1);
function extend(...args) {
    function _EXT(...args) {
        let targetObject;
        let deep;
        let start;
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
const sizeIn = (obj) => Object.getOwnPropertyNames(obj).length
    + Object.getOwnPropertySymbols(obj).length;
const unBind = (fn) => Function.prototype.call.bind(fn);
const bind = Function.prototype.call.bind(Function.prototype.bind);
const constant = (value) => () => value;
const identity = (value) => value;
function noop() { }
const T = () => true;
const F = () => false;
function nanoid(size = 21, alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_-") {
    let result = "";
    let dl = alphabet.length;
    let pos;
    let index = size;
    while (index--) {
        do {
            pos = crypto.getRandomValues(new Uint8Array(1))[0];
        } while (pos >= dl);
        result += alphabet[pos];
    }
    return result;
}
function timestampID(size = 21, alphabet = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz") {
    let result = Date.now().toString(36).padStart(10, "0") + "-";
    let dl = alphabet.length;
    let pos;
    let index = ((size > 11) ? size : 12) - 11;
    while (index--) {
        do {
            pos = crypto.getRandomValues(new Uint8Array(1))[0];
        } while (pos >= dl);
        result += alphabet[pos];
    }
    return result;
}
function assertIs(value, expected, message) {
    function _is(value, expected) {
        if (!(["string", "function"].includes(typeof expected))
            && !Array.isArray(expected)) {
            throw new TypeError(`[assertIs] TypeError: expectedType must be string, function, or array. Got ${typeof expected}`);
        }
        const vType = (value === null ? "null" : typeof value);
        let matched = (Array.isArray(expected) ? expected : [expected]).some(function (item) {
            if (typeof item === "string") {
                return vType === item;
            }
            if (typeof item === "function") {
                return value != null && value instanceof item;
            }
            throw new TypeError(`[assertIs] TypeError: expectedType array elements have to be a string or function. Got ${typeof item}`);
        });
        return matched;
    }
    if (!_is(value, expected)) {
        if (Error.isError(message)) {
            throw message;
        }
        let vName = value.toString ? value.toString() : Object.prototype.toString.call(value);
        let eNames = (Array.isArray(expected) ? expected : [expected]).map((item) => (typeof item === "string" ? item.toString() : item.name ?? "anonymous")).join(", ");
        throw new TypeError("[assertIs] Assertion failed: " + vName + " is not a " + eNames
            + (message ? " - " + message : ""));
    }
    return value;
}
function assertIsNot(value, expected, message) {
    function _is(value, expected) {
        if (!(["string", "function"].includes(typeof expected))
            && !Array.isArray(expected)) {
            throw new TypeError(`[assertIsNot] TypeError: expectedType must be string, function, or array. Got ${typeof expected}`);
        }
        const vType = (value === null ? "null" : typeof value);
        let matched = (Array.isArray(expected) ? expected : [expected]).some(function (item) {
            if (typeof item === "string") {
                return vType === item;
            }
            if (typeof item === "function") {
                return value != null && value instanceof item;
            }
            throw new TypeError(`[assertIsNot] TypeError: expectedType array elements have to be a string or function. Got ${typeof item}`);
        });
        return matched;
    }
    if (_is(value, expected)) {
        if (Error.isError(message)) {
            throw message;
        }
        let vName = value.toString
            ? value.toString()
            : Object.prototype.toString.call(value);
        let eNames = (Array.isArray(expected) ? expected : [expected]).map((item) => (typeof item === "string" ? item.toString() : item.name ?? "anonymous")).join(", ");
        throw new TypeError("[assertIsNot] Assertion failed: " + vName + " is a " + eNames
            + (message ? " - " + message : ""));
    }
    return value;
}
function assertFail(message) {
    if (Error.isError(message)) {
        throw message;
    }
    else {
        throw new Error("[assertFail] Assertion failed" + (message ? ": " + message : ""));
    }
}
function assertMatch(string, regexp, message) {
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
function assertDoesNotMatch(string, regexp, message) {
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
function assertThrows(callback, message) {
    if (typeof callback !== "function") {
        throw new TypeError("[assertThrows] TypeError: " + callback + " is not a function"
            + (message ? " - " + message : ""));
    }
    try {
        callback();
    }
    catch (error) {
        return error;
    }
    if (Error.isError(message)) {
        throw message;
    }
    throw new Error("[assertThrow] Assertion failed" + (message ? ": " + message : ""));
}
function assertIsNotNullish(value, message) {
    if (value == null) {
        if (Error.isError(message)) {
            throw message;
        }
        throw new TypeError("[assertIsNotNullish] Assertion failed: " + value + " is null or undefined"
            + (message ? " - " + message : ""));
    }
    return value;
}
function assertIsNullish(value, message) {
    if (value != null) {
        if (Error.isError(message)) {
            throw message;
        }
        throw new TypeError("[assertIsNullish] Assertion failed: " + value + " is not null or undefined"
            + (message ? " - " + message : ""));
    }
    return value;
}
function assert(condition, message) {
    if (!condition) {
        if (Error.isError(message)) {
            throw message;
        }
        throw new Error("[assert] Assertion failed" + (message ? ": " + message : ""));
    }
    return true;
}
function assertTrue(condition, message) {
    if (!condition) {
        if (Error.isError(message)) {
            throw message;
        }
        throw new Error("[assertTrue] Assertion failed" + (message ? ": " + message : ""));
    }
    return true;
}
function assertFalse(condition, message) {
    if (condition) {
        if (Error.isError(message)) {
            throw message;
        }
        throw new Error("[assertFalse] Assertion failed" + (message ? ": " + message : ""));
    }
    return true;
}
function assertEqual(value1, value2, message) {
    if (!(value1 == value2 || (value1 !== value1 && value2 !== value2))) {
        if (Error.isError(message)) {
            throw message;
        }
        throw new Error("[assertEqual] Assertion failed" + (message ? ": " + message : ""));
    }
    return true;
}
function assertStrictEqual(value1, value2, message) {
    if (!((value1 === value2)
        ? (value1 !== 0 || 1 / value1 === 1 / value2)
        : (value1 !== value1 && value2 !== value2))) {
        if (Error.isError(message)) {
            throw message;
        }
        throw new Error("[assertStrictEqual] Assertion failed"
            + (message ? ": " + message : ""));
    }
    return true;
}
function assertNotEqual(value1, value2, message) {
    if (value1 == value2 || (value1 !== value1 && value2 !== value2)) {
        if (Error.isError(message)) {
            throw message;
        }
        throw new Error("[assertNotEqual] Assertion failed"
            + (message ? ": " + message : ""));
    }
    return true;
}
function assertNotStrictEqual(value1, value2, message) {
    if ((value1 === value2)
        ? (value1 !== 0 || 1 / value1 === 1 / value2)
        : (value1 !== value1 && value2 !== value2)) {
        if (Error.isError(message)) {
            throw message;
        }
        throw new Error("[assertNotStrictEqual] Assertion failed"
            + (message ? ": " + message : ""));
    }
    return true;
}
function assertDeepEqual(value1, value2, message) {
    function _isDeepEqual(value1, value2) {
        const _isObject = (value) => value != null && typeof value === "object";
        const _isSameInstance = (value1, value2, Class) => (value1 instanceof Class) && (value2 instanceof Class);
        const _ownKeys = (value) => Object.getOwnPropertyNames(value)
            .concat(Object.getOwnPropertySymbols(value));
        const _isEqual = (value1, value2) => value1 == value2 || (value1 !== value1 && value2 !== value2);
        if (_isEqual(value1, value2)) {
            return true;
        }
        if (_isObject(value1) && _isObject(value2)) {
            if (_isEqual(value1, value2)) {
                return true;
            }
            if (_isSameInstance(value1, value2, WeakMap) || _isSameInstance(value1, value2, WeakSet)) {
                return _isEqual(value1, value2);
            }
            if (_isSameInstance(value1, value2, Number)
                || _isSameInstance(value1, value2, Boolean)
                || _isSameInstance(value1, value2, String)
                || _isSameInstance(value1, value2, BigInt)) {
                return _isEqual(value1.valueOf(), value2.valueOf());
            }
            if (Array.isArray(value1) && Array.isArray(value2)) {
                if (value1.length !== value2.length) {
                    return false;
                }
                if (value1.length === 0) {
                    return true;
                }
                return value1.every((value, index) => _isDeepEqual(value, value2[index]));
            }
            if (_isSameInstance(value1, value2, Int8Array)
                || _isSameInstance(value1, value2, Uint8Array)
                || _isSameInstance(value1, value2, Uint8ClampedArray)
                || _isSameInstance(value1, value2, Int16Array)
                || _isSameInstance(value1, value2, Uint16Array)
                || _isSameInstance(value1, value2, Int32Array)
                || _isSameInstance(value1, value2, Uint32Array)
                || ("Float16Array" in globalThis ?
                    _isSameInstance(value1, value2, Float16Array) : false)
                || _isSameInstance(value1, value2, Float32Array)
                || _isSameInstance(value1, value2, Float64Array)
                || _isSameInstance(value1, value2, BigInt64Array)
                || _isSameInstance(value1, value2, BigUint64Array)) {
                if (value1.length !== value2.length) {
                    return false;
                }
                if (value1.length === 0) {
                    return true;
                }
                return value1.every((value, index) => _isEqual(value, value2[index]));
            }
            if (_isSameInstance(value1, value2, ArrayBuffer)) {
                if (value1.byteLength !== value2.byteLength) {
                    return false;
                }
                if (value1.byteLength === 0) {
                    return true;
                }
                let xTA = new Int8Array(value1), yTA = new Int8Array(value2);
                return xTA.every((value, index) => _isEqual(value, yTA[index]));
            }
            if (_isSameInstance(value1, value2, DataView)) {
                if (value1.byteLength !== value2.byteLength) {
                    return false;
                }
                if (value1.byteLength === 0) {
                    return true;
                }
                for (let index = 0; index < value1.byteLength; index++) {
                    if (!_isEqual(value1.getUint8(index), value2.getUint8(index))) {
                        return false;
                    }
                }
                return true;
            }
            if (_isSameInstance(value1, value2, Map)) {
                if (value1.size !== value2.size) {
                    return false;
                }
                if (value1.size === 0) {
                    return true;
                }
                return [...value1.keys()].every((value) => _isDeepEqual(value1.get(value), value2.get(value)));
            }
            if (_isSameInstance(value1, value2, Set)) {
                if (value1.size !== value2.size) {
                    return false;
                }
                if (value1.size === 0) {
                    return true;
                }
                return [...value1.keys()].every((value) => value2.has(value));
            }
            if (_isSameInstance(value1, value2, RegExp)) {
                return _isEqual(value1.lastIndex, value2.lastIndex)
                    && _isEqual(value1.flags, value2.flags)
                    && _isEqual(value1.source, value2.source);
            }
            if (_isSameInstance(value1, value2, Error)) {
                return _isDeepEqual(Object.getOwnPropertyNames(value1)
                    .reduce((acc, k) => { acc[k] = value1[k]; return acc; }, {}), Object.getOwnPropertyNames(value2)
                    .reduce((acc, k) => { acc[k] = value2[k]; return acc; }, {}));
            }
            if (_isSameInstance(value1, value2, Date)) {
                return _isEqual(+value1, +value2);
            }
            let value1Keys = _ownKeys(value1);
            let value2Keys = _ownKeys(value2);
            if (value1Keys.length !== value2Keys.length) {
                return false;
            }
            if (value1Keys.length === 0) {
                return true;
            }
            return value1Keys.every((key) => _isDeepEqual(value1[key], value2[key]));
        }
        return false;
    }
    if (!_isDeepEqual(value1, value2)) {
        if (Error.isError(message)) {
            throw message;
        }
        throw new Error("[assertDeepEqual] Assertion failed"
            + (message ? ": " + message : ""));
    }
    return true;
}
function assertNotDeepStrictEqual(value1, value2, message) {
    function _isDeepStrictEqual(value1, value2) {
        const _deepType = (value) => (value === null) ? "null" : (value !== value) ? "NaN" : (typeof value);
        const _isPrimitive = (value) => value == null
            || (typeof value !== "object" && typeof value !== "function");
        const _isObject = (value) => (value != null && typeof value === "object");
        const _isSameInstance = (value1, value2, Class) => (value1 instanceof Class) && (value2 instanceof Class);
        const _classof = (value) => Object.prototype.toString.call(value).slice(8, -1).toLowerCase();
        const _ownKeys = (value) => Object.getOwnPropertyNames(value)
            .concat(Object.getOwnPropertySymbols(value));
        const _isEqual = (value1, value2) => Object.is(value1, value2);
        if (_isEqual(value1, value2)) {
            return true;
        }
        if (_isObject(value1)
            && _isPrimitive(value2) && _classof(value1) === typeof value2) {
            return _isEqual(value1.valueOf(), value2);
        }
        if (_isPrimitive(value1)
            && _isObject(value2) && typeof value1 === _classof(value2)) {
            return _isEqual(value1, value2.valueOf());
        }
        if (_deepType(value1) !== _deepType(value2)) {
            return false;
        }
        if (_isObject(value1) && _isObject(value2)) {
            if (_isEqual(value1, value2)) {
                return true;
            }
            if (Object.getPrototypeOf(value1).constructor !==
                Object.getPrototypeOf(value2).constructor) {
                return false;
            }
            if (_isSameInstance(value1, value2, WeakMap)
                || _isSameInstance(value1, value2, WeakSet)) {
                return _isEqual(value1, value2);
            }
            if (_isSameInstance(value1, value2, Number)
                || _isSameInstance(value1, value2, Boolean)
                || _isSameInstance(value1, value2, String)
                || _isSameInstance(value1, value2, BigInt)) {
                return _isEqual(value1.valueOf(), value2.valueOf());
            }
            if (Array.isArray(value1) && Array.isArray(value2)) {
                if (value1.length !== value2.length) {
                    return false;
                }
                if (value1.length === 0) {
                    return true;
                }
                return value1.every((value, index) => _isDeepStrictEqual(value, value2[index]));
            }
            if (_isSameInstance(value1, value2, Int8Array)
                || _isSameInstance(value1, value2, Uint8Array)
                || _isSameInstance(value1, value2, Uint8ClampedArray)
                || _isSameInstance(value1, value2, Int16Array)
                || _isSameInstance(value1, value2, Uint16Array)
                || _isSameInstance(value1, value2, Int32Array)
                || _isSameInstance(value1, value2, Uint32Array)
                || ("Float16Array" in globalThis ?
                    _isSameInstance(value1, value2, Float16Array) : false)
                || _isSameInstance(value1, value2, Float32Array)
                || _isSameInstance(value1, value2, Float64Array)
                || _isSameInstance(value1, value2, BigInt64Array)
                || _isSameInstance(value1, value2, BigUint64Array)) {
                if (value1.length !== value2.length) {
                    return false;
                }
                if (value1.length === 0) {
                    return true;
                }
                return value1.every((value, index) => _isEqual(value, value2[index]));
            }
            if (_isSameInstance(value1, value2, ArrayBuffer)) {
                if (value1.byteLength !== value2.byteLength) {
                    return false;
                }
                if (value1.byteLength === 0) {
                    return true;
                }
                let xTA = new Int8Array(value1), yTA = new Int8Array(value2);
                return xTA.every((value, index) => _isEqual(value, yTA[index]));
            }
            if (_isSameInstance(value1, value2, DataView)) {
                if (value1.byteLength !== value2.byteLength) {
                    return false;
                }
                if (value1.byteLength === 0) {
                    return true;
                }
                for (let index = 0; index < value1.byteLength; index++) {
                    if (!_isEqual(value1.getUint8(index), value2.getUint8(index))) {
                        return false;
                    }
                }
                return true;
            }
            if (_isSameInstance(value1, value2, Map)) {
                if (value1.size !== value2.size) {
                    return false;
                }
                if (value1.size === 0) {
                    return true;
                }
                return [...value1.keys()].every((value) => _isDeepStrictEqual(value1.get(value), value2.get(value)));
            }
            if (_isSameInstance(value1, value2, Set)) {
                if (value1.size !== value2.size) {
                    return false;
                }
                if (value1.size === 0) {
                    return true;
                }
                return [...value1.keys()].every((value) => value2.has(value));
            }
            if (_isSameInstance(value1, value2, RegExp)) {
                return _isEqual(value1.lastIndex, value2.lastIndex)
                    && _isEqual(value1.flags, value2.flags)
                    && _isEqual(value1.source, value2.source);
            }
            if (_isSameInstance(value1, value2, Error)) {
                return _isDeepStrictEqual(Object.getOwnPropertyNames(value1)
                    .reduce((acc, k) => { acc[k] = value1[k]; return acc; }, {}), Object.getOwnPropertyNames(value2)
                    .reduce((acc, k) => { acc[k] = value2[k]; return acc; }, {}));
            }
            if (_isSameInstance(value1, value2, Date)) {
                return _isEqual(+value1, +value2);
            }
            let value1Keys = _ownKeys(value1);
            let value2Keys = _ownKeys(value2);
            if (value1Keys.length !== value2Keys.length) {
                return false;
            }
            if (value1Keys.length === 0) {
                return true;
            }
            return value1Keys.every((key) => _isDeepStrictEqual(value1[key], value2[key]));
        }
        return false;
    }
    if (_isDeepStrictEqual(value1, value2)) {
        if (Error.isError(message)) {
            throw message;
        }
        throw new Error("[assertNotDeepStrictEqual] Assertion failed"
            + (message ? ": " + message : ""));
    }
    return true;
}
function assertNotDeepEqual(value1, value2, message) {
    function _isDeepEqual(value1, value2) {
        const _isObject = (value) => (value != null && typeof value === "object");
        const _isSameInstance = (value1, value2, Class) => (value1 instanceof Class) && (value2 instanceof Class);
        const _ownKeys = (value) => Object.getOwnPropertyNames(value)
            .concat(Object.getOwnPropertySymbols(value));
        const _isEqual = (value1, value2) => (value1 == value2 || (value1 !== value1 && value2 !== value2));
        if (_isEqual(value1, value2)) {
            return true;
        }
        if (_isObject(value1) && _isObject(value2)) {
            if (_isEqual(value1, value2)) {
                return true;
            }
            if (_isSameInstance(value1, value2, WeakMap) || _isSameInstance(value1, value2, WeakSet)) {
                return _isEqual(value1, value2);
            }
            if (_isSameInstance(value1, value2, Number)
                || _isSameInstance(value1, value2, Boolean)
                || _isSameInstance(value1, value2, String)
                || _isSameInstance(value1, value2, BigInt)) {
                return _isEqual(value1.valueOf(), value2.valueOf());
            }
            if (Array.isArray(value1) && Array.isArray(value2)) {
                if (value1.length !== value2.length) {
                    return false;
                }
                if (value1.length === 0) {
                    return true;
                }
                return value1.every((value, index) => _isDeepEqual(value, value2[index]));
            }
            if (_isSameInstance(value1, value2, Int8Array)
                || _isSameInstance(value1, value2, Uint8Array)
                || _isSameInstance(value1, value2, Uint8ClampedArray)
                || _isSameInstance(value1, value2, Int16Array)
                || _isSameInstance(value1, value2, Uint16Array)
                || _isSameInstance(value1, value2, Int32Array)
                || _isSameInstance(value1, value2, Uint32Array)
                || ("Float16Array" in globalThis ?
                    _isSameInstance(value1, value2, Float16Array) : false)
                || _isSameInstance(value1, value2, Float32Array)
                || _isSameInstance(value1, value2, Float64Array)
                || _isSameInstance(value1, value2, BigInt64Array)
                || _isSameInstance(value1, value2, BigUint64Array)) {
                if (value1.length !== value2.length) {
                    return false;
                }
                if (value1.length === 0) {
                    return true;
                }
                return value1.every((value, index) => _isEqual(value, value2[index]));
            }
            if (_isSameInstance(value1, value2, ArrayBuffer)) {
                if (value1.byteLength !== value2.byteLength) {
                    return false;
                }
                if (value1.byteLength === 0) {
                    return true;
                }
                let xTA = new Int8Array(value1), yTA = new Int8Array(value2);
                return xTA.every((value, index) => _isEqual(value, yTA[index]));
            }
            if (_isSameInstance(value1, value2, DataView)) {
                if (value1.byteLength !== value2.byteLength) {
                    return false;
                }
                if (value1.byteLength === 0) {
                    return true;
                }
                for (let index = 0; index < value1.byteLength; index++) {
                    if (!_isEqual(value1.getUint8(index), value2.getUint8(index))) {
                        return false;
                    }
                }
                return true;
            }
            if (_isSameInstance(value1, value2, Map)) {
                if (value1.size !== value2.size) {
                    return false;
                }
                if (value1.size === 0) {
                    return true;
                }
                return [...value1.keys()].every((value) => _isDeepEqual(value1.get(value), value2.get(value)));
            }
            if (_isSameInstance(value1, value2, Set)) {
                if (value1.size !== value2.size) {
                    return false;
                }
                if (value1.size === 0) {
                    return true;
                }
                return [...value1.keys()].every((value) => value2.has(value));
            }
            if (_isSameInstance(value1, value2, RegExp)) {
                return _isEqual(value1.lastIndex, value2.lastIndex)
                    && _isEqual(value1.flags, value2.flags)
                    && _isEqual(value1.source, value2.source);
            }
            if (_isSameInstance(value1, value2, Error)) {
                return _isDeepEqual(Object.getOwnPropertyNames(value1)
                    .reduce((acc, k) => { acc[k] = value1[k]; return acc; }, {}), Object.getOwnPropertyNames(value2)
                    .reduce((acc, k) => { acc[k] = value2[k]; return acc; }, {}));
            }
            if (_isSameInstance(value1, value2, Date)) {
                return _isEqual(+value1, +value2);
            }
            let value1Keys = _ownKeys(value1);
            let value2Keys = _ownKeys(value2);
            if (value1Keys.length !== value2Keys.length) {
                return false;
            }
            if (value1Keys.length === 0) {
                return true;
            }
            return value1Keys.every((key) => _isDeepEqual(value1[key], value2[key]));
        }
        return false;
    }
    if (_isDeepEqual(value1, value2)) {
        if (Error.isError(message)) {
            throw message;
        }
        throw new Error("[assertNotDeepEqual] Assertion failed"
            + (message ? ": " + message : ""));
    }
    return true;
}
function assertDeepStrictEqual(value1, value2, message) {
    function _isDeepStrictEqual(value1, value2) {
        const _deepType = (value) => (value === null) ? "null" : (value !== value) ? "NaN" : (typeof value);
        const _isPrimitive = (value) => (value == null || (typeof value !== "object" && typeof value !== "function"));
        const _isObject = (value) => (value != null && typeof value === "object");
        const _isSameInstance = (value1, value2, Class) => (value1 instanceof Class) && (value2 instanceof Class);
        const _classof = (value) => Object.prototype.toString.call(value).slice(8, -1).toLowerCase();
        const _ownKeys = (value) => Object.getOwnPropertyNames(value)
            .concat(Object.getOwnPropertySymbols(value));
        const _isEqual = (value1, value2) => Object.is(value1, value2);
        if (_isEqual(value1, value2)) {
            return true;
        }
        if (_isObject(value1) && _isPrimitive(value2) && _classof(value1) === typeof value2) {
            return _isEqual(value1.valueOf(), value2);
        }
        if (_isPrimitive(value1) && _isObject(value2) && typeof value1 === _classof(value2)) {
            return _isEqual(value1, value2.valueOf());
        }
        if (_deepType(value1) !== _deepType(value2)) {
            return false;
        }
        if (_isObject(value1) && _isObject(value2)) {
            if (_isEqual(value1, value2)) {
                return true;
            }
            if (Object.getPrototypeOf(value1).constructor !==
                Object.getPrototypeOf(value2).constructor) {
                return false;
            }
            if (_isSameInstance(value1, value2, WeakMap) || _isSameInstance(value1, value2, WeakSet)) {
                return _isEqual(value1, value2);
            }
            if (_isSameInstance(value1, value2, Number)
                || _isSameInstance(value1, value2, Boolean)
                || _isSameInstance(value1, value2, String)
                || _isSameInstance(value1, value2, BigInt)) {
                return _isEqual(value1.valueOf(), value2.valueOf());
            }
            if (Array.isArray(value1) && Array.isArray(value2)) {
                if (value1.length !== value2.length) {
                    return false;
                }
                if (value1.length === 0) {
                    return true;
                }
                return value1.every((value, index) => _isDeepStrictEqual(value, value2[index]));
            }
            if (_isSameInstance(value1, value2, Int8Array)
                || _isSameInstance(value1, value2, Uint8Array)
                || _isSameInstance(value1, value2, Uint8ClampedArray)
                || _isSameInstance(value1, value2, Int16Array)
                || _isSameInstance(value1, value2, Uint16Array)
                || _isSameInstance(value1, value2, Int32Array)
                || _isSameInstance(value1, value2, Uint32Array)
                || ("Float16Array" in globalThis ?
                    _isSameInstance(value1, value2, Float16Array) : false)
                || _isSameInstance(value1, value2, Float32Array)
                || _isSameInstance(value1, value2, Float64Array)
                || _isSameInstance(value1, value2, BigInt64Array)
                || _isSameInstance(value1, value2, BigUint64Array)) {
                if (value1.length !== value2.length) {
                    return false;
                }
                if (value1.length === 0) {
                    return true;
                }
                return value1.every((value, index) => _isEqual(value, value2[index]));
            }
            if (_isSameInstance(value1, value2, ArrayBuffer)) {
                if (value1.byteLength !== value2.byteLength) {
                    return false;
                }
                if (value1.byteLength === 0) {
                    return true;
                }
                let xTA = new Int8Array(value1), yTA = new Int8Array(value2);
                return xTA.every((value, index) => _isEqual(value, yTA[index]));
            }
            if (_isSameInstance(value1, value2, DataView)) {
                if (value1.byteLength !== value2.byteLength) {
                    return false;
                }
                if (value1.byteLength === 0) {
                    return true;
                }
                for (let index = 0; index < value1.byteLength; index++) {
                    if (!_isEqual(value1.getUint8(index), value2.getUint8(index))) {
                        return false;
                    }
                }
                return true;
            }
            if (_isSameInstance(value1, value2, Map)) {
                if (value1.size !== value2.size) {
                    return false;
                }
                if (value1.size === 0) {
                    return true;
                }
                return [...value1.keys()].every((value) => _isDeepStrictEqual(value1.get(value), value2.get(value)));
            }
            if (_isSameInstance(value1, value2, Set)) {
                if (value1.size !== value2.size) {
                    return false;
                }
                if (value1.size === 0) {
                    return true;
                }
                return [...value1.keys()].every((value) => value2.has(value));
            }
            if (_isSameInstance(value1, value2, RegExp)) {
                return _isEqual(value1.lastIndex, value2.lastIndex)
                    && _isEqual(value1.flags, value2.flags)
                    && _isEqual(value1.source, value2.source);
            }
            if (_isSameInstance(value1, value2, Error)) {
                return _isDeepStrictEqual(Object.getOwnPropertyNames(value1)
                    .reduce((acc, k) => { acc[k] = value1[k]; return acc; }, {}), Object.getOwnPropertyNames(value2)
                    .reduce((acc, k) => { acc[k] = value2[k]; return acc; }, {}));
            }
            if (_isSameInstance(value1, value2, Date)) {
                return _isEqual(+value1, +value2);
            }
            let value1Keys = _ownKeys(value1);
            let yKeys = _ownKeys(value2);
            if (value1Keys.length !== yKeys.length) {
                return false;
            }
            if (value1Keys.length === 0) {
                return true;
            }
            return value1Keys.every((key) => _isDeepStrictEqual(value1[key], value2[key]));
        }
        return false;
    }
    if (!_isDeepStrictEqual(value1, value2)) {
        if (Error.isError(message)) {
            throw message;
        }
        throw new Error("[assertDeepStrictEqual] Assertion failed"
            + (message ? ": " + message : ""));
    }
    return true;
}
function b64Encode(str) {
    return btoa(encodeURIComponent(String(str)).replace(/%([0-9A-F]{2})/g, function toSolidBytes(_match, p1) {
        return String.fromCharCode("0x" + p1);
    }));
}
function b64Decode(str) {
    return decodeURIComponent(atob(String(str)).split("").map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(""));
}
function strTruncate(str, newLength, omission = "") {
    str = String(str);
    omission = String(omission);
    let strUC = Array.from(str);
    if (newLength >= strUC.length) {
        return str;
    }
    return strUC.slice(0, newLength - Array.from(omission).length).join("")
        + omission;
}
const strPropercase = (str) => String(str).split(" ").map(function (value) {
    let chars = Array.from(value).map((c) => c.toLowerCase());
    if (chars.length) {
        chars[0] = chars[0].toUpperCase();
    }
    return chars.join("");
}).join(" ");
const strTitlecase = (str) => String(str).split(" ").map(function (value) {
    let chars = Array.from(value).map((c) => c.toLowerCase());
    if (chars.length) {
        chars[0] = chars[0].toUpperCase();
    }
    return chars.join("");
}).join(" ");
function strCapitalize(str) {
    let chars = [...String(str).toLowerCase()];
    if (chars.length) {
        chars[0] = chars[0].toUpperCase();
    }
    return chars.join("");
}
function strUpFirst(str) {
    let chars = [...String(str)];
    if (chars.length) {
        chars[0] = chars[0].toUpperCase();
    }
    return chars.join("");
}
function strDownFirst(str) {
    let chars = [...String(str)];
    if (chars.length) {
        chars[0] = chars[0].toLowerCase();
    }
    return chars.join("");
}
const strReverse = (str) => Array.from(String(str)).reverse().join("");
const strCodePoints = (str) => Array.from(String(str), (value) => value.codePointAt(0));
const strFromCodePoints = ([...array]) => String.fromCodePoint(...array);
function strAt(str, index, newChar) {
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
const strSplice = (str, index, count, ...add) => Array.from(str).toSpliced(index, count, add.join("")).join("");
const strHTMLRemoveTags = (str) => String(str).replace(/<[^>]*>/g, " ").replace(/\s{2,}/g, " ").trim();
const strHTMLEscape = (str) => String(str).replace(/&/g, "&amp;")
    .replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;").replace(/'/g, "&apos;");
const strHTMLUnEscape = (str) => String(str)
    .replace(/&amp;/g, "&").replace(/&#38;/g, "&")
    .replace(/&lt;/g, "<").replace(/&#60;/g, "<")
    .replace(/&gt;/g, ">").replace(/&#62;/g, ">")
    .replace(/&quot;/g, '"').replace(/&#34;/g, '"')
    .replace(/&apos;/g, "'").replace(/&#39;/g, "'");
function is(value, expected, Throw = false) {
    if (!(["string", "function", "undefined"].includes(typeof expected))
        && !Array.isArray(expected)) {
        throw new TypeError(`[is] TypeError: expectedType must be string, function, array or undefined. Got ${typeof expected}`);
    }
    if (typeof Throw !== "boolean") {
        throw new TypeError(`[is] TypeError: Throw has to be a boolean. Got ${typeof Throw}`);
    }
    const vType = (value === null ? "null" : typeof value);
    if (expected == null) {
        return vType === "object"
            ? Object.getPrototypeOf(value)?.constructor ?? "object"
            : vType;
    }
    let expectedArray = Array.isArray(expected) ? expected : [expected];
    let matched = expectedArray.some(function (item) {
        if (typeof item === "string") {
            return vType === item;
        }
        if (typeof item === "function") {
            return value != null && value instanceof item;
        }
        throw new TypeError(`[is] TypeError: expectedType array elements have to be a string or function. Got ${typeof item}`);
    });
    if (Throw && !matched) {
        let vName = value.toString ? value.toString() : Object.prototype.toString.call(value);
        let eNames = expectedArray.map((item) => (typeof item === "string" ? item.toString() : item.name ?? "anonymous")).join(", ");
        throw new TypeError(`[is] TypeError: ${vName} is not a ${eNames}`);
    }
    return matched;
}
function toObject(value) {
    if (value == null) {
        throw new TypeError("celestra.toObject(); error: " + value);
    }
    return (["object", "function"].includes(typeof value))
        ? value
        : Object(value);
}
function toPrimitiveValue(value) {
    if (value == null || typeof value !== "object") {
        return value;
    }
    const vType = Object.prototype.toString.call(value).slice(8, -1);
    if (["Boolean", "BigInt", "Number", "String", "Symbol"].includes(vType)) {
        return value.valueOf();
    }
    return value;
}
function toSafeString(value) {
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
const isPropertyKey = (value) => typeof value === "string" || typeof value === "symbol";
const toPropertyKey = (value) => typeof value === "symbol" ? value : String(value);
const isIndex = (value) => Number.isSafeInteger(value)
    && value >= 0
    && 1 / value !== 1 / -0;
const isLength = (value) => Number.isSafeInteger(value)
    && value >= 0
    && 1 / value !== 1 / -0;
function toIndex(value) {
    value = ((value = Math.trunc(+value)) !== value || value === 0) ? 0 : value;
    if (value < 0 || value > (Math.pow(2, 53) - 1)) {
        throw new RangeError("toIndex(); RangeError: " + value);
    }
    return value;
}
function toLength(value) {
    value = ((value = Math.trunc(+value)) !== value || value === 0) ? 0 : value;
    return Math.min(Math.max(value, 0), Math.pow(2, 53) - 1);
}
const typeOf = (value) => value === null ? "null" : typeof value;
const isSameType = (value1, value2) => (value1 == null || value2 == null)
    ? (value1 === value2)
    : (typeof value1 === typeof value2);
const isSameInstance = (value1, value2, Contructor) => value1 instanceof Contructor && value2 instanceof Contructor;
function isCoercedObject(value) {
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
function isDeepStrictEqual(value1, value2) {
    const _deepType = (value) => (value === null) ? "null" : (value !== value) ? "NaN" : (typeof value);
    const _isPrimitive = (value) => value == null
        || (typeof value !== "object" && typeof value !== "function");
    const _isObject = (value) => (value != null && typeof value === "object");
    const _isSameInstance = (value1, value2, Class) => (value1 instanceof Class) && (value2 instanceof Class);
    const _classof = (value) => Object.prototype.toString.call(value).slice(8, -1).toLowerCase();
    const _ownKeys = (value) => Object.getOwnPropertyNames(value)
        .concat(Object.getOwnPropertySymbols(value));
    const _isEqual = (value1, value2) => Object.is(value1, value2);
    if (_isEqual(value1, value2)) {
        return true;
    }
    if (_isObject(value1) && _isPrimitive(value2) && _classof(value1) === typeof value2) {
        return _isEqual(value1.valueOf(), value2);
    }
    if (_isPrimitive(value1) && _isObject(value2) && typeof value1 === _classof(value2)) {
        return _isEqual(value1, value2.valueOf());
    }
    if (_deepType(value1) !== _deepType(value2)) {
        return false;
    }
    if (_isObject(value1) && _isObject(value2)) {
        if (_isEqual(value1, value2)) {
            return true;
        }
        if (Object.getPrototypeOf(value1).constructor !==
            Object.getPrototypeOf(value2).constructor) {
            return false;
        }
        if (_isSameInstance(value1, value2, WeakMap)
            || _isSameInstance(value1, value2, WeakSet)) {
            return _isEqual(value1, value2);
        }
        if (_isSameInstance(value1, value2, Number)
            || _isSameInstance(value1, value2, Boolean)
            || _isSameInstance(value1, value2, String)
            || _isSameInstance(value1, value2, BigInt)) {
            return _isEqual(value1.valueOf(), value2.valueOf());
        }
        if (Array.isArray(value1) && Array.isArray(value2)) {
            if (value1.length !== value2.length) {
                return false;
            }
            if (value1.length === 0) {
                return true;
            }
            return value1.every((value, index) => isDeepStrictEqual(value, value2[index]));
        }
        if (_isSameInstance(value1, value2, Int8Array)
            || _isSameInstance(value1, value2, Uint8Array)
            || _isSameInstance(value1, value2, Uint8ClampedArray)
            || _isSameInstance(value1, value2, Int16Array)
            || _isSameInstance(value1, value2, Uint16Array)
            || _isSameInstance(value1, value2, Int32Array)
            || _isSameInstance(value1, value2, Uint32Array)
            || ("Float16Array" in globalThis ?
                _isSameInstance(value1, value2, Float16Array) : false)
            || _isSameInstance(value1, value2, Float32Array)
            || _isSameInstance(value1, value2, Float64Array)
            || _isSameInstance(value1, value2, BigInt64Array)
            || _isSameInstance(value1, value2, BigUint64Array)) {
            if (value1.length !== value2.length) {
                return false;
            }
            if (value1.length === 0) {
                return true;
            }
            return value1.every((value, index) => _isEqual(value, value2[index]));
        }
        if (_isSameInstance(value1, value2, ArrayBuffer)) {
            if (value1.byteLength !== value2.byteLength) {
                return false;
            }
            if (value1.byteLength === 0) {
                return true;
            }
            let xTA = new Int8Array(value1), yTA = new Int8Array(value2);
            return xTA.every((value, index) => _isEqual(value, yTA[index]));
        }
        if (_isSameInstance(value1, value2, DataView)) {
            if (value1.byteLength !== value2.byteLength) {
                return false;
            }
            if (value1.byteLength === 0) {
                return true;
            }
            for (let index = 0; index < value1.byteLength; index++) {
                if (!_isEqual(value1.getUint8(index), value2.getUint8(index))) {
                    return false;
                }
            }
            return true;
        }
        if (_isSameInstance(value1, value2, Map)) {
            if (value1.size !== value2.size) {
                return false;
            }
            if (value1.size === 0) {
                return true;
            }
            return [...value1.keys()].every((value) => isDeepStrictEqual(value1.get(value), value2.get(value)));
        }
        if (_isSameInstance(value1, value2, Set)) {
            if (value1.size !== value2.size) {
                return false;
            }
            if (value1.size === 0) {
                return true;
            }
            return [...value1.keys()].every((value) => value2.has(value));
        }
        if (_isSameInstance(value1, value2, RegExp)) {
            return _isEqual(value1.lastIndex, value2.lastIndex)
                && _isEqual(value1.flags, value2.flags)
                && _isEqual(value1.source, value2.source);
        }
        if (_isSameInstance(value1, value2, Error)) {
            return isDeepStrictEqual(Object.getOwnPropertyNames(value1)
                .reduce((acc, k) => { acc[k] = value1[k]; return acc; }, {}), Object.getOwnPropertyNames(value2)
                .reduce((acc, k) => { acc[k] = value2[k]; return acc; }, {}));
        }
        if (_isSameInstance(value1, value2, Date)) {
            return _isEqual(+value1, +value2);
        }
        let value1Keys = _ownKeys(value1);
        let value2Keys = _ownKeys(value2);
        if (value1Keys.length !== value2Keys.length) {
            return false;
        }
        if (value1Keys.length === 0) {
            return true;
        }
        return value1Keys.every((key) => isDeepStrictEqual(value1[key], value2[key]));
    }
    return false;
}
function isEmptyValue(value) {
    function _isTypedArray(value) {
        const constructors = [
            Int8Array, Uint8Array, Uint8ClampedArray,
            Int16Array, Uint16Array,
            Int32Array, Uint32Array,
            Float32Array, Float64Array,
            BigInt64Array, BigUint64Array
        ];
        if ("Float16Array" in globalThis) {
            constructors.push(globalThis.Float16Array);
        }
        return constructors.some((Class) => value instanceof Class);
    }
    if (value == null || Number.isNaN(value)) {
        return true;
    }
    if (Array.isArray(value)
        || _isTypedArray(value)
        || typeof value === "string"
        || value instanceof String) {
        return value.length === 0;
    }
    if (value instanceof Map || value instanceof Set) {
        return value.size === 0;
    }
    if (value instanceof ArrayBuffer || value instanceof DataView) {
        return value.byteLength === 0;
    }
    if (typeof value[Symbol.iterator] === "function") {
        const it = value[Symbol.iterator]();
        return it.next().done;
    }
    if ("Iterator" in globalThis ? (value instanceof Iterator)
        : (value != null && typeof value === "object"
            && typeof value.next === "function")) {
        try {
            for (const _ of value) {
                return false;
            }
            return true;
        }
        catch { }
    }
    if (isObject(value)) {
        const keys = [
            ...Object.getOwnPropertyNames(value),
            ...Object.getOwnPropertySymbols(value)
        ];
        if (keys.length === 0)
            return true;
        if (keys.length === 1
            && keys[0] === "length"
            && value.length === 0) {
            return true;
        }
    }
    return false;
}
const isProxy = (value) => Boolean(value != null && value.__isProxy);
const isAsyncGeneratorFn = (value) => Object.getPrototypeOf(value).constructor ===
    Object.getPrototypeOf(async function* () { }).constructor;
const isClass = (value) => typeof value === "function" && typeof value.prototype === "object";
const isPlainObject = (value) => value != null
    && typeof value === "object"
    && (Object.getPrototypeOf(value) === Object.prototype
        || Object.getPrototypeOf(value) === null);
const isChar = (value) => typeof value === "string"
    && (value.length === 1 || Array.from(value).length === 1);
const isNumeric = (value) => ((typeof value === "number" || typeof value === "bigint") && value === value)
    ? true : (!isNaN(parseFloat(value)) && isFinite(value));
const isObject = (value) => value != null && (typeof value === "object" || typeof value === "function");
const isFunction = (value) => typeof value === "function";
const isCallable = (value) => (value != null && ["object", "function"].includes(typeof value))
    ? (typeof value.call === "function")
    : false;
function isArraylike(value) {
    if (value == null
        || (typeof value !== "object" && typeof value !== "string")) {
        return false;
    }
    const maybe = value;
    if (typeof maybe.length !== "number") {
        return false;
    }
    const len = maybe.length;
    return len >= 0 && Number.isFinite(len);
}
const isNull = (value) => value === null;
const isUndefined = (value) => value === undefined;
const isNullish = (value) => value == null;
const isPrimitive = (value) => value == null || (typeof value !== "object" && typeof value !== "function");
const isIterator = (value) => "Iterator" in globalThis
    ? value instanceof Iterator
    : (value != null && typeof value === "object"
        && typeof value.next === "function");
const isRegexp = (value) => value instanceof RegExp;
const isElement = (value) => value != null && typeof value === "object" && value.nodeType === 1;
const isIterable = (value) => value != null && typeof value[Symbol.iterator] === "function";
const isAsyncIterable = (value) => value != null && typeof value[Symbol.asyncIterator] === "function";
function isTypedArray(value) {
    const constructors = [
        Int8Array, Uint8Array, Uint8ClampedArray,
        Int16Array, Uint16Array,
        Int32Array, Uint32Array,
        Float32Array, Float64Array,
        BigInt64Array, BigUint64Array
    ];
    if ("Float16Array" in globalThis) {
        constructors.push(globalThis.Float16Array);
    }
    return constructors.some((Class) => value instanceof Class);
}
const isGeneratorFn = (value) => Object.getPrototypeOf(value).constructor ===
    Object.getPrototypeOf(function* () { }).constructor;
const isAsyncFn = (value) => Object.getPrototypeOf(value).constructor ===
    Object.getPrototypeOf(async function () { }).constructor;
function castArray(...args) {
    if (!args.length) {
        return [];
    }
    const value = args[0];
    return Array.isArray(value) ? value : [value];
}
const compact = (iter) => Array.from(iter).filter((value) => Boolean(value) || value === 0);
function unique(iter, resolver) {
    if (resolver == null) {
        return [...new Set(iter)];
    }
    if (typeof resolver === "string") {
        return Array.from(iter).reduce(function (acc, item) {
            if (acc.every((item2) => item2[resolver] !== item[resolver])) {
                acc.push(item);
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
function count(iter, fn) {
    let index = 0;
    let result = 0;
    for (let item of iter) {
        if (fn(item, index++)) {
            result++;
        }
    }
    return result;
}
function arrayDeepClone([...array]) {
    const _ADC = (value) => (Array.isArray(value) ? Array.from(value, _ADC) : value);
    return _ADC(array);
}
const initial = ([...array]) => array.slice(0, -1);
function shuffle([...array]) {
    for (let index = array.length - 1; index > 0; index--) {
        let pos = Math.floor(Math.random() * (index + 1));
        [array[index], array[pos]] = [array[pos], array[index]];
    }
    return array;
}
const partition = ([...array], fn) => [array.filter(fn), array.filter((value, index, a) => !(fn(value, index, a)))];
const setUnion = (...args) => new Set(args.map(([...item]) => item).flat());
const setIntersection = ([...array], b) => new Set(array.filter((value) => b.has(value)));
const setDifference = ([...array], b) => new Set(array.filter((value) => !(b.has(value))));
const setSymmetricDifference = (array, b) => new Set([...array].filter((value) => !(b.has(value))).concat([...b]
    .filter((value) => !(array.has(value)))));
const isSuperset = ([...superSet], [...subSet]) => subSet.every((value) => superSet.includes(value));
const min = (...args) => args.reduce((acc, value) => (value < acc ? value : acc), args[0]);
const max = (...args) => args.reduce((acc, value) => (value > acc ? value : acc), args[0]);
const arrayRepeat = (value, num = 100) => Array(num).fill(value);
const arrayCycle = ([...array], num = 100) => Array(num).fill(array).flat();
const arrayRange = (start = 0, end = 99, step = 1) => Array.from({ length: (end - start) / step + 1 }, (_v, i) => start + (i * step));
function zip(...args) {
    args = args.map((value) => Array.from(value));
    return Array.from({ length: Math.min(...args.map(v => v.length)) })
        .map((_, i) => args.map(v => v[i]));
}
const unzip = ([...array]) => array.map((iter) => Array.from(iter))
    .reduce((acc, value) => {
    value.forEach((item, index) => {
        if (!Array.isArray(acc[index])) {
            acc[index] = [];
        }
        acc[index].push(item);
    });
    return acc;
}, []);
function zipObj([...array1], [...array2]) {
    let result = {};
    let length = Math.min(array1.length, array2.length);
    for (let index = 0; index < length; index++) {
        result[array1[index]] = array2[index];
    }
    return result;
}
const arrayAdd = (array, value) => (!array.includes(value)) ? !!array.push(value) : false;
function arrayClear(array) {
    array.length = 0;
    return array;
}
function arrayRemove(array, value, all = false) {
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
function arrayRemoveBy(array, fn, all = false) {
    let found = array.findIndex(fn) > -1;
    if (!all) {
        let pos = array.findIndex(fn);
        if (pos > -1) {
            array.splice(pos, 1);
        }
    }
    else {
        let pos = -1;
        while ((pos = array.findIndex(fn)) > -1) {
            array.splice(pos, 1);
        }
    }
    return found;
}
function arrayMerge(target, ...sources) {
    target.push(...[].concat(...sources));
    return target;
}
function* iterRange(start = 0, step = 1, end = Infinity) {
    let index = start;
    while (index <= end) {
        yield index;
        index += step;
    }
}
function* iterCycle([...array], num = Infinity) {
    let index = 0;
    while (index < num) {
        yield* array;
        index++;
    }
}
function* iterRepeat(value, num = Infinity) {
    let index = 0;
    while (index < num) {
        yield value;
        index++;
    }
}
function* takeWhile(iter, fn) {
    for (let item of iter) {
        if (!fn(item)) {
            break;
        }
        yield item;
    }
}
function* dropWhile(iter, fn) {
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
function* take(iter, num = 1) {
    let index = num;
    for (let item of iter) {
        if (index <= 0) {
            break;
        }
        yield item;
        index--;
    }
}
function* drop(iter, num = 1) {
    let index = num;
    for (let item of iter) {
        if (index < 1) {
            yield item;
        }
        else {
            index--;
        }
    }
}
function forEach(iter, fn) {
    let index = 0;
    for (let item of iter) {
        fn(item, index++);
    }
}
function forEachRight([...array], fn) {
    let index = array.length;
    while (index--) {
        fn(array[index], index);
    }
}
function* map(iter, fn) {
    let index = 0;
    for (let item of iter) {
        yield fn(item, index++);
    }
}
function* filter(iter, fn) {
    let index = 0;
    for (let item of iter) {
        if (fn(item, index++)) {
            yield item;
        }
    }
}
function* reject(iter, fn) {
    let index = 0;
    for (let item of iter) {
        if (!fn(item, index++)) {
            yield item;
        }
    }
}
function* slice(iter, begin = 0, end = Infinity) {
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
function* tail(iter) {
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
function item(iter, pos) {
    let i = 0;
    for (let item of iter) {
        if (i++ === pos) {
            return item;
        }
    }
}
function nth(iter, pos) {
    let i = 0;
    for (let item of iter) {
        if (i++ === pos) {
            return item;
        }
    }
}
function size(iter) {
    let index = 0;
    for (let _item of iter) {
        index++;
    }
    return index;
}
function first(iter) {
    for (let item of iter) {
        return item;
    }
}
function head(iter) {
    for (let item of iter) {
        return item;
    }
}
const last = ([...array]) => array[array.length - 1];
function* reverse([...array]) {
    let index = array.length;
    while (index--) {
        yield array[index];
    }
}
const sort = ([...array], numbers = false) => array.sort(numbers ? (value1, value2) => value1 - value2 : undefined);
function includes(collection, value, comparator) {
    if (comparator !== undefined && typeof comparator !== "function") {
        throw new TypeError(`[includes] TypeError: comparator is not a function or undefined. Got ${typeof comparator}`);
    }
    const _isIterator = (value) => value != null && typeof value === "object"
        && typeof value.next === "function";
    const _isIterable = (value) => value != null && typeof value[Symbol.iterator] === "function";
    const _isEqual = comparator ||
        ((value1, value2) => value1 === value2 || (value1 !== value1 && value2 !== value2));
    const cType = (collection === null ? "null" : typeof collection);
    if (collection == null
        || !(["object", "function", "string"].includes(cType))
        || collection instanceof WeakMap
        || collection instanceof WeakSet) {
        return false;
    }
    if (typeof collection === "string" || collection instanceof String) {
        return collection.includes(String(value));
    }
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
    if (_isIterator(collection) || _isIterable(collection)) {
        for (const item of collection) {
            if (_isEqual(item, value)) {
                return true;
            }
        }
        return false;
    }
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
    return false;
}
function find(iter, fn) {
    let index = 0;
    for (let item of iter) {
        if (fn(item, index++)) {
            return item;
        }
    }
}
function findLast(iter, fn) {
    let index = 0;
    let result;
    for (let item of iter) {
        if (fn(item, index++)) {
            result = item;
        }
    }
    return result;
}
function every(iter, fn) {
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
function some(iter, fn) {
    let index = 0;
    for (let item of iter) {
        if (fn(item, index++)) {
            return true;
        }
    }
    return false;
}
function none(iter, fn) {
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
const takeRight = ([...array], num = 1) => array.reverse().slice(0, num);
function* takeRightWhile([...array], fn) {
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
const dropRight = ([...array], num = 1) => array.reverse().slice(num);
function* dropRightWhile([...array], fn) {
    let dropping = true;
    let index = 0;
    for (let item of array.reverse()) {
        if (dropping && !fn(item, index++)) {
            dropping = false;
        }
        if (!dropping) {
            yield item;
        }
    }
}
function* concat(...args) {
    for (let item of args) {
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
function reduce(iter, fn, initialvalue) {
    let acc = initialvalue;
    let index = 0;
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
function* enumerate(iter, offset = 0) {
    let index = offset;
    for (let item of iter) {
        yield [index++, item];
    }
}
function* flat(iter) {
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
function join(iter, separator = ",") {
    separator = String(separator);
    let result = "";
    for (let item of iter) {
        result += separator + item;
    }
    return result.slice(separator.length);
}
const withOut = ([...array], [...filterValues]) => array.filter((value) => !filterValues.includes(value));
const isFloat = (value) => typeof value === "number" && value === value && !!(value % 1);
function toInteger(value) {
    value = ((value = Math.trunc(Number(value))) !== value || value === 0) ? 0 : value;
    return Math.min(Math.max(value, -(Math.pow(2, 53) - 1)), Math.pow(2, 53) - 1);
}
const toIntegerOrInfinity = (value) => ((value = Math.trunc(Number(value))) !== value || value === 0) ? 0 : value;
const sum = (...args) => args.every((value) => typeof value === "number") ?
    Math.sumPrecise(args) : args.slice(1).reduce((acc, value) => acc + value, args[0]);
const avg = (...args) => Math.sumPrecise(args) / args.length;
const product = (first, ...args) => args.reduce((acc, v) => acc * v, first);
function clamp(value, min = Number.MIN_SAFE_INTEGER, max = Number.MAX_SAFE_INTEGER) {
    function _normalize(value) {
        if (typeof value !== "bigint" && typeof value !== "number") {
            value = Number(value);
        }
        if (value === -Infinity) {
            return Number.MIN_SAFE_INTEGER;
        }
        if (value === Infinity) {
            return Number.MAX_SAFE_INTEGER;
        }
        if (value === 0) {
            return 0;
        }
        return value;
    }
    value = _normalize(value);
    min = _normalize(min);
    max = _normalize(max);
    if (value !== value) {
        return value;
    }
    if (min !== min || max !== max) {
        throw new RangeError("clamp(); RangeError: minimum and maximum should not to be NaN");
    }
    if (min > max) {
        throw new RangeError("clamp(); RangeError: minimum should be lower than maximum");
    }
    return (value < min) ? min : ((value > max) ? max : value);
}
function minmax(value, min = Number.MIN_SAFE_INTEGER, max = Number.MAX_SAFE_INTEGER) {
    function _normalize(value) {
        if (typeof value !== "bigint" && typeof value !== "number") {
            value = Number(value);
        }
        if (value === -Infinity) {
            return Number.MIN_SAFE_INTEGER;
        }
        if (value === Infinity) {
            return Number.MAX_SAFE_INTEGER;
        }
        if (value === 0) {
            return 0;
        }
        return value;
    }
    value = _normalize(value);
    min = _normalize(min);
    max = _normalize(max);
    if (value !== value) {
        return value;
    }
    if (min !== min || max !== max) {
        throw new RangeError("clamp(); RangeError: minimum and maximum should not to be NaN");
    }
    if (min > max) {
        throw new RangeError("clamp(); RangeError: minimum should be lower than maximum");
    }
    return (value < min) ? min : ((value > max) ? max : value);
}
function isEven(value) {
    let result = value % 2;
    if (result === result) {
        return result === 0;
    }
    return false;
}
function isOdd(value) {
    let result = value % 2;
    if (result === result) {
        return result !== 0;
    }
    return false;
}
const toInt8 = (value) => ((value = Math.min(Math.max(-128, Math.trunc(Number(value))), 127)) === value)
    ? value : 0;
const toUInt8 = (value) => ((value = Math.min(Math.max(0, Math.trunc(Number(value))), 255)) === value)
    ? value : 0;
const toInt16 = (value) => ((value = Math.min(Math.max(-32768, Math.trunc(Number(value))), 32767))
    === value) ? value : 0;
const toUInt16 = (value) => ((value = Math.min(Math.max(0, Math.trunc(Number(value))), 65535)) === value)
    ? value : 0;
const toInt32 = (value) => ((value = Math.min(Math.max(-2147483648, Math.trunc(Number(value))), 2147483647)) === value) ? value : 0;
const toUInt32 = (value) => ((value = Math.min(Math.max(0, Math.trunc(Number(value))), 4294967295))
    === value) ? value : 0;
const toBigInt64 = (value) => BigInt(typeof value === "bigint"
    ? (value > Math.pow(2, 63) - 1 ? Math.pow(2, 63) - 1 : value < Math.pow(-2, 63)
        ? Math.pow(-2, 63) : value)
    : ((value = Math.min(Math.max(Math.pow(-2, 63), Math.trunc(Number(value))), Math.pow(2, 63) - 1)) === value) ? value : 0);
const toBigUInt64 = (value) => BigInt(typeof value === "bigint"
    ? (value > Math.pow(2, 64) - 1 ? Math.pow(2, 64) - 1 : value < 0 ? 0 : value)
    : ((value = Math.min(Math.max(0, Math.trunc(Number(value))), Math.pow(2, 64) - 1)) === value) ? value : 0);
const toFloat32 = (value) => ((value = Math.min(Math.max(-3.4e38, Number(value)), 3.4e38)) === value)
    ? value : 0;
const isInt8 = (value) => Number.isInteger(value) && value >= -128 && value <= 127;
const isUInt8 = (value) => Number.isInteger(value) && value >= 0 && value <= 255;
const isInt16 = (value) => Number.isInteger(value) && value >= -32768
    && value <= 32767;
const isUInt16 = (value) => Number.isInteger(value) && value >= 0 && value <= 65535;
const isInt32 = (value) => Number.isInteger(value) && value >= -2147483648
    && value <= 2147483647;
const isUInt32 = (value) => Number.isInteger(value) && value >= 0
    && value <= 4294967295;
const isBigInt64 = (value) => typeof value === "bigint"
    && value >= Math.pow(-2, 63) && value <= Math.pow(2, 63) - 1;
const isBigUInt64 = (value) => typeof value === "bigint" && value >= 0 && value <= Math.pow(2, 64) - 1;
const toFloat16 = (value) => ((value = Math.min(Math.max(-65504, Number(value)), 65504)) === value)
    ? value : 0;
const isFloat16 = (value) => typeof value === "number" && value === value && value >= -65504
    && value <= 65504;
const signbit = (value) => ((value = Number(value)) !== value)
    ? false : (Object.is(value, -0) || (value < 0));
function randomInt(min = 100, max) {
    if (max == null) {
        max = min;
        min = 0;
    }
    min = Math.ceil(Number(min));
    return Math.floor(Math.random() * (Math.floor(Number(max)) - min + 1) + min);
}
function randomFloat(min = 100, max) {
    if (max == null) {
        max = min;
        min = 0;
    }
    let result = (Math.random() * (max - min + 1)) + min;
    return result > max ? max : result;
}
const inRange = (value, min, max) => (value >= min && value <= max);
export default {
    VERSION,
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
export { VERSION, BASE16, BASE32, BASE36, BASE58, BASE62, WORDSAFEALPHABET, isNonNullable, isNonNullablePrimitive, eq, gt, gte, lt, lte, tap, once, curry, pipe, compose, pick, omit, assoc, asyncNoop, asyncT, asyncF, asyncConstant, asyncIdentity, deleteOwnProperty, createPolyfillMethod, createPolyfillProperty, randomUUIDv7, delay, randomBoolean, getUrlVars, obj2string, extend, sizeIn, unBind, bind, constant, identity, noop, T, F, nanoid, timestampID, assertIs, assertIsNot, assertFail, assertMatch, assertDoesNotMatch, assertThrows, assertIsNotNullish, assertIsNullish, assert, assertTrue, assertFalse, assertEqual, assertStrictEqual, assertNotEqual, assertNotStrictEqual, assertDeepEqual, assertNotDeepStrictEqual, assertNotDeepEqual, assertDeepStrictEqual, b64Encode, b64Decode, strTruncate, strPropercase, strTitlecase, strCapitalize, strUpFirst, strDownFirst, strReverse, strCodePoints, strFromCodePoints, strAt, strSplice, strHTMLRemoveTags, strHTMLEscape, strHTMLUnEscape, is, toObject, toPrimitiveValue, toSafeString, isPropertyKey, toPropertyKey, isIndex, isLength, toIndex, toLength, typeOf, isSameType, isSameInstance, isCoercedObject, isDeepStrictEqual, isEmptyValue, isProxy, isAsyncGeneratorFn, isClass, isPlainObject, isChar, isNumeric, isObject, isFunction, isCallable, isArraylike, isNull, isUndefined, isNullish, isPrimitive, isIterator, isRegexp, isElement, isIterable, isAsyncIterable, isTypedArray, isGeneratorFn, isAsyncFn, castArray, compact, unique, count, arrayDeepClone, initial, shuffle, partition, setUnion, setIntersection, setDifference, setSymmetricDifference, isSuperset, min, max, arrayRepeat, arrayCycle, arrayRange, zip, unzip, zipObj, arrayAdd, arrayClear, arrayRemove, arrayRemoveBy, arrayMerge, iterRange, iterCycle, iterRepeat, takeWhile, dropWhile, take, drop, forEach, forEachRight, map, filter, reject, slice, tail, item, nth, size, first, head, last, reverse, sort, includes, find, findLast, every, some, none, takeRight, takeRightWhile, dropRight, dropRightWhile, concat, reduce, enumerate, flat, join, withOut, isFloat, toInteger, toIntegerOrInfinity, sum, avg, product, clamp, minmax, isEven, isOdd, toInt8, toUInt8, toInt16, toUInt16, toInt32, toUInt32, toBigInt64, toBigUInt64, toFloat32, isInt8, isUInt8, isInt16, isUInt16, isInt32, isUInt32, isBigInt64, isBigUInt64, toFloat16, isFloat16, signbit, randomInt, randomFloat, inRange };
