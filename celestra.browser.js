"use strict";
const VERSION = "Celestra v6.4.1 browser";
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
function assert(condition, message) {
    if (!condition) {
        if (Error.isError(message)) {
            throw message;
        }
        let errorMessage = `[assert] Assertion failed: ${condition} should be truly${message ? " - " + message : ""}`;
        throw new Error(errorMessage, { cause: errorMessage });
    }
}
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
const assoc = (obj, key, value) => ({ ...obj, [key]: value });
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
            throw new Error("[deleteOwnProperty] error");
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
    let deep = false;
    let target;
    let i = 0;
    if (args[0] === true) {
        deep = true;
        target = args[1] || {};
        i = 2;
    }
    else {
        target = args[0] || {};
        i = 1;
    }
    const _isPlainObject = (obj) => obj != null
        && typeof obj === "object"
        && (obj.constructor === Object || obj.constructor == null);
    const _isDate = (value) => value instanceof Date;
    const _isRegExp = (value) => value instanceof RegExp;
    const _isMap = (value) => value instanceof Map;
    const _isSet = (value) => value instanceof Set;
    function merge(target, source) {
        if (Object.is(source, target) || source == null || typeof source !== "object") {
            return source;
        }
        if (_isDate(source)) {
            return new Date(source.getTime());
        }
        if (_isRegExp(source)) {
            return new RegExp(source);
        }
        if (_isMap(source)) {
            if (!_isMap(target)) {
                target = new Map();
            }
            for (let [key, value] of source) {
                const tv = target.get(key);
                target.set(key, deep ? merge(tv, value) : value);
            }
            return target;
        }
        if (_isSet(source)) {
            if (!_isSet(target)) {
                target = new Set();
            }
            for (let item of source) {
                if (deep) {
                    if (target.has(item)) {
                        continue;
                    }
                }
                target.add(item);
            }
            return target;
        }
        if (Array.isArray(source)) {
            if (!Array.isArray(target)) {
                target = [];
            }
            const srcLength = source.length;
            for (let i = 0; i < srcLength; i++) {
                let sv = source[i];
                let tv = target[i];
                target[i] = deep ? merge(tv, sv) : sv;
            }
            return target;
        }
        if (_isPlainObject(source)) {
            if (!_isPlainObject(target)) {
                target = {};
            }
            for (let key in source) {
                let sv = source[key];
                let tv = target[key];
                target[key] = deep ? merge(tv, sv) : sv;
            }
            return target;
        }
        return source;
    }
    const length = args.length;
    for (; i < length; i++) {
        merge(target, args[i]);
    }
    return target;
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
const strPropercase = (str) => String(str).trim().split(" ").map(function (value) {
    let chars = Array.from(value).map((c) => c.toLowerCase());
    if (chars.length) {
        chars[0] = chars[0].toUpperCase();
    }
    return chars.join("");
}).join(" ");
const strTitlecase = (str) => String(str).trim().split(" ").map(function (value) {
    let chars = Array.from(value).map((c) => c.toLowerCase());
    if (chars.length) {
        chars[0] = chars[0].toUpperCase();
    }
    return chars.join("");
}).join(" ");
function strCapitalize(str) {
    let chars = [...String(str).trim().toLowerCase()];
    if (chars.length) {
        chars[0] = chars[0].toUpperCase();
    }
    return chars.join("");
}
function strUpFirst(str) {
    let chars = [...String(str).trim()];
    if (chars.length) {
        chars[0] = chars[0].toUpperCase();
    }
    return chars.join("");
}
function strDownFirst(str) {
    let chars = [...String(str).trim()];
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
const strHTMLRemoveTags = (str) => String(str).trim().replace(/<[^>]*>/g, " ").replace(/\s{2,}/g, " ").trim();
const strHTMLEscape = (str) => String(str).trim()
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
const strHTMLUnEscape = (str) => String(str).trim()
    .replace(/&amp;/g, "&").replace(/&#38;/g, "&")
    .replace(/&lt;/g, "<").replace(/&#60;/g, "<")
    .replace(/&gt;/g, ">").replace(/&#62;/g, ">")
    .replace(/&quot;/g, '"').replace(/&#34;/g, '"')
    .replace(/&apos;/g, "'").replace(/&#39;/g, "'");
const qsa = (str, context = document) => Array.from(context.querySelectorAll(str));
const qs = (str, context = document) => context.querySelector(str);
function domReady(fn) {
    if (document.readyState !== "loading") {
        fn();
    }
    else {
        document.addEventListener("DOMContentLoaded", function (_event) { fn(); });
    }
}
function domCreate(elementType, properties, innerHTML) {
    if (arguments.length === 1 && typeof elementType === "object") {
        let obj = elementType;
        elementType = obj.elementType;
        properties = {};
        for (let key in obj) {
            if (key !== "elementType") {
                properties[key] = obj[key];
            }
        }
    }
    let element = document.createElement(elementType);
    if (properties) {
        for (let key in properties) {
            if (key !== "style" || typeof properties[key] === "string") {
                element[key] = properties[key];
            }
            else {
                Object.assign(element.style, properties[key]);
            }
        }
    }
    if (innerHTML) {
        element.innerHTML = innerHTML;
    }
    return element;
}
function domToElement(str) {
    let element = document.createElement("div");
    element.innerHTML = str;
    return element.firstElementChild;
}
const domGetCSS = (element, property) => (property ? globalThis.getComputedStyle(element, null)[property] :
    globalThis.getComputedStyle(element, null));
function domSetCSS(element, property, value) {
    if (typeof property === "string") {
        element.style[property] = value;
    }
    else if (typeof property === "object") {
        Object.keys(property).forEach((key) => element.style[key] = property[key]);
    }
}
function domFadeIn(element, duration, display) {
    let s = element.style;
    let step = 25 / (duration || 500);
    s.opacity = (s.opacity ?? 0);
    s.display = (display || "");
    (function fade() {
        (s.opacity = parseFloat(s.opacity) + step) > 1 ? s.opacity = 1 : setTimeout(fade, 25);
    })();
}
function domFadeOut(element, duration) {
    let style = element.style;
    let step = 25 / (duration || 500);
    style.opacity = (style.opacity || 1);
    (function fade() {
        (style.opacity -= step) < 0 ? style.display = "none" : setTimeout(fade, 25);
    })();
}
function domFadeToggle(element, duration, display = "") {
    if (globalThis.getComputedStyle(element, null).display === "none") {
        let style = element.style;
        let step = 25 / (duration || 500);
        style.opacity = (style.opacity ?? 0);
        style.display = (display || "");
        (function fade() {
            (style.opacity = parseFloat(style.opacity) + step) > 1 ? style.opacity = 1 :
                setTimeout(fade, 25);
        })();
    }
    else {
        let style = element.style;
        let step = 25 / (duration || 500);
        style.opacity = (style.opacity ?? 1);
        (function fade() {
            (style.opacity -= step) < 0 ? style.display = "none" : setTimeout(fade, 25);
        })();
    }
}
const domHide = (element) => element.style.display = "none";
const domShow = (element, display = "") => element.style.display = display;
function domToggle(element, display = "") {
    if (globalThis.getComputedStyle(element, null).display === "none") {
        element.style.display = display;
    }
    else {
        element.style.display = "none";
    }
}
const domIsHidden = (element) => (globalThis.getComputedStyle(element, null).display === "none");
const domSiblings = (element) => Array.prototype.filter.call(element.parentNode.children, (item) => (item !== element));
const domSiblingsPrev = (element) => Array.prototype.slice.call(element.parentNode.children, 0, Array.prototype.indexOf.call(element.parentNode.children, element));
const domSiblingsLeft = (element) => Array.prototype.slice.call(element.parentNode.children, 0, Array.prototype.indexOf.call(element.parentNode.children, element));
const domSiblingsNext = (element) => Array.prototype.slice.call(element.parentNode.children, Array.prototype.indexOf.call(element.parentNode.children, element) + 1, element.parentNode.children.length);
const domSiblingsRight = (element) => Array.prototype.slice.call(element.parentNode.children, Array.prototype.indexOf.call(element.parentNode.children, element) + 1, element.parentNode.children.length);
function importScript(...scripts) {
    for (let item of scripts) {
        let element = document.createElement("script");
        element.type = "text\/javascript";
        element.src = item;
        element.onerror = function (error) {
            throw new URIError("Loading failed for the script with source " + error.target.src);
        };
        (document.head || document.getElementsByTagName("head")[0])
            .appendChild(element);
    }
}
function importStyle(...styles) {
    for (let item of styles) {
        let element = document.createElement("link");
        element.rel = "stylesheet";
        element.type = "text\/css";
        element.href = item;
        element.onerror = function (error) {
            throw new URIError("Loading failed for the style with source " + error.target.href);
        };
        (document.head || document.getElementsByTagName("head")[0])
            .appendChild(element);
    }
}
function form2array(form) {
    let field;
    let result = Array();
    if (typeof form === "object" && form.nodeName.toLowerCase() === "form") {
        for (let i = 0, len = form.elements.length; i < len; i++) {
            field = form.elements[i];
            if (field.name && !field.disabled
                && field.type !== "file"
                && field.type !== "reset"
                && field.type !== "submit"
                && field.type !== "button") {
                if (field.type === "select-multiple") {
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
function form2string(form) {
    let field;
    let result = [];
    if (typeof form === "object" && form.nodeName.toLowerCase() === "form") {
        for (let i = 0, len = form.elements.length; i < len; i++) {
            field = form.elements[i];
            if (field.name && !field.disabled
                && field.type !== "file"
                && field.type !== "reset"
                && field.type !== "submit"
                && field.type !== "button") {
                if (field.type === "select-multiple") {
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
const getDoNotTrack = () => [navigator.doNotTrack, globalThis.doNotTrack, navigator.msDoNotTrack]
    .some((item) => item === true || item === 1 || item === "1");
function getLocation(successFn, errorFn) {
    if (!errorFn) {
        errorFn = function () { };
    }
    function getE(error) {
        errorFn("ERROR(" + error.code + "): " + error.message);
    }
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(successFn, getE);
    }
    else {
        getE("Geolocation is not supported in this browser.");
    }
}
function createFile(filename, content, dataType) {
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
const getFullscreen = () => (document.fullscreenElement
    || document.mozFullScreenElement
    || document.webkitFullscreenElement
    || document.msFullscreenElement
    || undefined);
function setFullscreenOn(element) {
    let elem;
    if (typeof element === "string") {
        elem = document.querySelector(element);
    }
    else if (typeof element === "object") {
        elem = element;
    }
    if (elem.requestFullscreen) {
        elem.requestFullscreen();
    }
    else if (elem.mozRequestFullScreen) {
        elem.mozRequestFullScreen();
    }
    else if (elem.webkitRequestFullscreen) {
        elem.webkitRequestFullscreen();
    }
    else if (elem.msRequestFullscreen) {
        elem.msRequestFullscreen();
    }
}
function setFullscreenOff() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    }
    else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
    }
    else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    }
    else if (document.msExitFullscreen) {
        document.msExitFullscreen();
    }
}
const domGetCSSVar = (name) => getComputedStyle(document.documentElement)
    .getPropertyValue(name[0] === "-" ? name : "--" + name);
const domSetCSSVar = (name, value) => document.documentElement.style.setProperty((name[0] === "-" ? name : "--" + name), value);
const domScrollToTop = () => globalThis.scrollTo(0, 0);
const domScrollToBottom = () => globalThis.scrollTo(0, document.body.scrollHeight);
const domScrollToElement = (element, top = true) => element.scrollIntoView(top);
const domClear = (element) => Array.from(element.children).forEach((item) => item.remove());
const isNonNullable = (value) => value != null;
const isNonNullablePrimitive = (value) => value != null && typeof value !== "object" && typeof value !== "function";
function isTypedCollection(iter, expectedType, Throw = false) {
    const _typeOf = (value) => value === null ? "null" : typeof value;
    const _isIterator = (value) => value != null && typeof value === "object"
        && typeof value.next === "function";
    const _isIterable = (value) => value != null && typeof value[Symbol.iterator] === "function";
    if (!_isIterator(iter) && !_isIterable(iter)) {
        throw new TypeError(`[isTypedCollection] TypeError: iter must be iterable or iterator. Got ${_typeOf(iter)}`);
    }
    if (!(["string", "function"].includes(typeof expectedType))
        && !Array.isArray(expectedType)) {
        throw new TypeError(`[isTypedCollection] TypeError: expectedType must be string, function, array. Got ${_typeOf(expectedType)}`);
    }
    if (typeof Throw !== "boolean") {
        throw new TypeError(`[isTypedCollection] TypeError: Throw has to be a boolean. Got ${typeof Throw}`);
    }
    let expectedArray = Array.isArray(expectedType) ? expectedType : [expectedType];
    let matched = true;
    for (let value of iter) {
        const valueType = _typeOf(value);
        matched = expectedArray.some(function (item) {
            if (typeof item === "string") {
                return valueType === item;
            }
            if (typeof item === "function") {
                return value != null && value instanceof item;
            }
            throw new TypeError(`[isTypedCollection] TypeError: expectedType array elements have to be a string or function. Got ${typeof item}`);
        });
        if (!matched) {
            break;
        }
    }
    if (Throw && !matched) {
        let eNames = expectedArray.map((item) => (typeof item === "string" ? item.toString() : item.name ?? "anonymous")).join(", ");
        throw new TypeError(`[isTypedCollection] TypeError: one or more items are not ${eNames}`);
    }
    return matched;
}
function is(value, expectedType, Throw = false) {
    if (!(["string", "function", "undefined"].includes(typeof expectedType))
        && !Array.isArray(expectedType)) {
        throw new TypeError(`[is] TypeError: expectedType must be string, function, array or undefined. Got ${typeof expectedType}`);
    }
    if (typeof Throw !== "boolean") {
        throw new TypeError(`[is] TypeError: Throw has to be a boolean. Got ${typeof Throw}`);
    }
    const vType = (value === null ? "null" : typeof value);
    if (expectedType == null) {
        return vType === "object"
            ? Object.getPrototypeOf(value)?.constructor ?? "object"
            : vType;
    }
    let expectedArray = Array.isArray(expectedType) ? expectedType : [expectedType];
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
        throw new TypeError("[toObject] error: " + value);
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
    function replacer(_key, value) {
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
    }
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
    && value <= Number.MAX_SAFE_INTEGER
    && 1 / value !== 1 / -0;
const isLength = (value) => Number.isSafeInteger(value)
    && value >= 0
    && value <= Number.MAX_SAFE_INTEGER
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
    const _isObject = (value) => value != null && typeof value === "object";
    const _isSameInstance = (value1, value2, Class) => value1 instanceof Class && value2 instanceof Class;
    const _classof = (value) => Object.prototype.toString.call(value).slice(8, -1).toLowerCase();
    const _ownKeys = (value) => [...Object.getOwnPropertyNames(value),
        ...Object.getOwnPropertySymbols(value)];
    const _isEqual = (value1, value2) => Object.is(value1, value2);
    if (_isEqual(value1, value2)) {
        return true;
    }
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
    const _isObject = (value) => value != null && (typeof value === "object" || typeof value === "function");
    const _isTypedArray = (value) => ArrayBuffer.isView(value) && !(value instanceof DataView);
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
            for (let _ of value) {
                return false;
            }
            return true;
        }
        catch { }
    }
    if (_isObject(value)) {
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
const isPlainObject = (value) => value != null
    && typeof value === "object"
    && (Object.getPrototypeOf(value) === Object.prototype
        || Object.getPrototypeOf(value) === null);
const isChar = (value) => typeof value === "string" && (value.length === 1 || [...value].length === 1);
const isNumeric = (value) => ((typeof value === "number" || typeof value === "bigint") && value === value)
    ? true
    : (!isNaN(parseFloat(value)) && isFinite(value));
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
const isTypedArray = (value) => ArrayBuffer.isView(value) && !(value instanceof DataView);
const isGeneratorFn = (value) => Object.getPrototypeOf(value).constructor ===
    Object.getPrototypeOf(function* () { }).constructor;
const isAsyncFn = (value) => Object.getPrototypeOf(value).constructor ===
    Object.getPrototypeOf(async function () { }).constructor;
function setCookie(name, value, hours = 8760, path = "/", domain, secure, SameSite = "Lax", HttpOnly) {
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
function getCookie(name) {
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
const hasCookie = (name) => (document.cookie.includes(encodeURIComponent(name) + "="));
function removeCookie(name, path = "/", domain, secure, SameSite = "Lax", HttpOnly) {
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
function clearCookies(path = "/", domain, secure, SameSite = "Lax", HttpOnly) {
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
    const _ADC = (value) => Array.isArray(value) ? Array.from(value, _ADC) : value;
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
    while (index++ < num) {
        yield* array;
    }
}
function* iterRepeat(value, num = Infinity) {
    let index = 0;
    while (index++ < num) {
        yield value;
    }
}
function* takeWhile(iter, fn) {
    let iterator;
    if (typeof iter.next === 'function') {
        iterator = iter;
    }
    else {
        iterator = iter[Symbol.iterator]();
    }
    while (true) {
        const { value, done } = iterator.next();
        if (done || !fn(value)) {
            break;
        }
        yield value;
    }
}
function* dropWhile(iter, fn) {
    let iterator;
    if (typeof iter.next === 'function') {
        iterator = iter;
    }
    else {
        iterator = iter[Symbol.iterator]();
    }
    let skip = true;
    while (true) {
        const { value, done } = iterator.next();
        if (done) {
            break;
        }
        if (skip) {
            skip = fn(value);
        }
        if (!skip) {
            yield value;
        }
    }
}
function* take(iter, num = 1) {
    if (num <= 0)
        return;
    let iterator;
    if (typeof iter.next === 'function') {
        iterator = iter;
    }
    else {
        iterator = iter[Symbol.iterator]();
    }
    for (let i = 0; i < num; i++) {
        const { value, done } = iterator.next();
        if (done) {
            break;
        }
        yield value;
    }
}
function* drop(iter, num = 1) {
    if (num <= 0) {
        yield* (typeof iter.next === 'function'
            ? { [Symbol.iterator]: () => iter }
            : iter);
        return;
    }
    let iterator;
    if (typeof iter.next === 'function') {
        iterator = iter;
    }
    else {
        iterator = iter[Symbol.iterator]();
    }
    for (let i = 0; i < num; i++) {
        const { done } = iterator.next();
        if (done) {
            return;
        }
    }
    while (true) {
        const { value, done } = iterator.next();
        if (done) {
            break;
        }
        yield value;
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
    if (begin < 0) {
        begin = 0;
    }
    if (end <= begin) {
        return;
    }
    let iterator;
    if (typeof iter.next === 'function') {
        iterator = iter;
    }
    else {
        iterator = iter[Symbol.iterator]();
    }
    let index = 0;
    while (true) {
        const { value, done } = iterator.next();
        if (done) {
            break;
        }
        ;
        if (index >= begin && index <= end) {
            yield value;
        }
        if (index > end - 1)
            break;
        index++;
    }
}
function* tail(input) {
    let iterator;
    if (typeof input.next === 'function') {
        iterator = input;
    }
    else {
        iterator = input[Symbol.iterator]();
    }
    const first = iterator.next();
    if (first.done) {
        return;
    }
    while (true) {
        const { value, done } = iterator.next();
        if (done) {
            break;
        }
        yield value;
    }
}
function item(iter, pos) {
    if (pos < 0) {
        return undefined;
    }
    let iterator;
    if (typeof iter.next === "function") {
        iterator = iter;
    }
    else {
        iterator = iter[Symbol.iterator]();
    }
    let index = 0;
    while (true) {
        const { value, done } = iterator.next();
        if (done) {
            return undefined;
        }
        if (index === pos) {
            return value;
        }
        index++;
    }
}
function nth(iter, pos) {
    if (pos < 0) {
        return undefined;
    }
    let iterator;
    if (typeof iter.next === "function") {
        iterator = iter;
    }
    else {
        iterator = iter[Symbol.iterator]();
    }
    let index = 0;
    while (true) {
        const { value, done } = iterator.next();
        if (done) {
            return undefined;
        }
        if (index === pos) {
            return value;
        }
        index++;
    }
}
function size(value) {
    if (Array.isArray(value)) {
        return value.length;
    }
    if (value instanceof Map || value instanceof Set) {
        return value.size;
    }
    if (value instanceof ArrayBuffer || value instanceof DataView) {
        return value.byteLength;
    }
    if (typeof value.size === "number") {
        return value.size;
    }
    let iterator;
    if (typeof value.next === "function") {
        iterator = value;
    }
    else {
        iterator = value[Symbol.iterator]();
    }
    let index = 0;
    for (let _item of iterator) {
        index++;
    }
    return index;
}
function first(input) {
    let iterator;
    if (typeof input.next === 'function') {
        iterator = input;
    }
    else {
        iterator = input[Symbol.iterator]();
    }
    const result = iterator.next();
    return result.done ? undefined : result.value;
}
function head(input) {
    let iterator;
    if (typeof input.next === 'function') {
        iterator = input;
    }
    else {
        iterator = input[Symbol.iterator]();
    }
    const result = iterator.next();
    return result.done ? undefined : result.value;
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
        if ([...collection.keys()].findIndex((item) => _isEqual(item, value)) > -1) {
            return true;
        }
        if ([...collection.values()].findIndex((item) => _isEqual(item, value)) > -1) {
            return true;
        }
        return false;
    }
    if (_isIterator(collection) || _isIterable(collection)) {
        if ([...collection].findIndex((item) => _isEqual(item, value)) > -1) {
            return true;
        }
        return false;
    }
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
    return false;
}
const find = ([...array], fn) => array.find((value, index) => fn(value, index));
const findLast = ([...array], fn) => array.findLast((value, index) => fn(value, index));
const every = ([...array], fn) => array.length
    ? array.every((value, index) => fn(value, index))
    : false;
const some = ([...array], fn) => array.length
    ? array.some((value, index) => fn(value, index))
    : false;
const none = ([...array], fn) => !array.some((value, index) => fn(value, index));
const takeRight = ([...array], num = 1) => array.reverse().slice(0, num);
function* takeRightWhile([...array], fn) {
    if (!array.length) {
        return;
    }
    let index = array.length;
    while (index--) {
        let item = array[index];
        if (!fn(item, index)) {
            break;
        }
        yield item;
    }
}
const dropRight = ([...array], num = 1) => array.reverse().slice(num);
function* dropRightWhile([...array], fn) {
    if (!array.length) {
        return;
    }
    let index = array.length;
    let skip = true;
    while (index--) {
        let item = array[index];
        if (skip) {
            skip = fn(item, index);
        }
        if (!skip) {
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
function add(value1, value2) {
    if (typeof value1 !== typeof value2
        || (typeof value1 !== "number" && typeof value1 !== "bigint")) {
        throw new TypeError(`[add] Value1 and Value2 must be of the same type and either number or bigint. Got: ${typeof value1} and ${typeof value2}`);
    }
    if (typeof value1 === "number" && typeof value2 === "number") {
        return Math.sumPrecise([value1, value2]);
    }
    return value1 + value2;
}
function sub(value1, value2) {
    if (typeof value1 !== typeof value2
        || (typeof value1 !== "number" && typeof value1 !== "bigint")) {
        throw new TypeError(`[sub] Value1 and Value2 must be of the same type and either number or bigint. Got: ${typeof value1} and ${typeof value2}`);
    }
    if (typeof value1 === "number" && typeof value2 === "number") {
        Math.sumPrecise([value1, -value2]);
    }
    return value1 - value2;
}
function mul(value1, value2) {
    if (typeof value1 !== typeof value2
        || (typeof value1 !== "number" && typeof value1 !== "bigint")) {
        throw new TypeError(`[mul] Value1 and Value2 must be of the same type and either number or bigint. Got: ${typeof value1} and ${typeof value2}`);
    }
    if (typeof value1 === "number" && typeof value2 === "number") {
        return value1 * value2;
    }
    return value1 * value2;
}
function div(value1, value2) {
    if (typeof value1 !== typeof value2
        || (typeof value1 !== "number" && typeof value1 !== "bigint")) {
        throw new TypeError(`[div] Value1 and Value2 must be of the same type and either number or bigint. Got: ${typeof value1} and ${typeof value2}`);
    }
    if (value2 === 0 || value2 === 0n) {
        throw new RangeError("[div] Cannot divide by zero");
    }
    if (typeof value1 === "number" && typeof value2 === "number") {
        return value1 / value2;
    }
    return value1 / value2;
}
function divMod(value1, value2) {
    if (typeof value1 !== typeof value2
        || (typeof value1 !== "number" && typeof value1 !== "bigint")) {
        throw new TypeError(`[divMod] Value1 and Value2 must be of the same type and either number or bigint. Got: ${typeof value1} and ${typeof value2}`);
    }
    if (value2 === 0 || value2 === 0n) {
        throw new RangeError("[divMod] Cannot divide by zero");
    }
    if (typeof value1 === "number" && typeof value2 === "number") {
        return Math.trunc(value1 / value2);
    }
    return value1 / value2;
}
function mod(value1, value2) {
    if (typeof value1 !== typeof value2
        || (typeof value1 !== "number" && typeof value1 !== "bigint")) {
        throw new TypeError(`[mod] Value1 and Value2 must be of the same type and either number or bigint. Got: ${typeof value1} and ${typeof value2}`);
    }
    if (value2 === 0 || value2 === 0n) {
        throw new RangeError("[mod] Cannot divide by zero");
    }
    if (typeof value1 === "number" && typeof value2 === "number") {
        return Math.trunc(value1 % value2);
    }
    return value1 % value2;
}
const isFloat = (value) => typeof value === "number" && value === value && Boolean(value % 1);
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
        throw new RangeError("[clamp] RangeError: minimum and maximum should not to be NaN");
    }
    if (min > max) {
        throw new RangeError("[clamp] RangeError: minimum should be lower than maximum");
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
        throw new RangeError("[minmax] RangeError: minimum and maximum should not to be NaN");
    }
    if (min > max) {
        throw new RangeError("[minmax] RangeError: minimum should be lower than maximum");
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
    setCookie,
    getCookie,
    hasCookie,
    removeCookie,
    clearCookies,
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
export { VERSION, BASE16, BASE32, BASE36, BASE58, BASE62, WORDSAFEALPHABET, assert, eq, gt, gte, lt, lte, tap, once, curry, pipe, compose, pick, omit, assoc, asyncNoop, asyncT, asyncF, asyncConstant, asyncIdentity, deleteOwnProperty, createPolyfillMethod, createPolyfillProperty, randomUUIDv7, delay, randomBoolean, getUrlVars, obj2string, extend, sizeIn, unBind, bind, constant, identity, noop, T, F, nanoid, timestampID, b64Encode, b64Decode, strTruncate, strPropercase, strTitlecase, strCapitalize, strUpFirst, strDownFirst, strReverse, strCodePoints, strFromCodePoints, strAt, strSplice, strHTMLRemoveTags, strHTMLEscape, strHTMLUnEscape, qsa, qs, domReady, domCreate, domToElement, domGetCSS, domSetCSS, domFadeIn, domFadeOut, domFadeToggle, domHide, domShow, domToggle, domIsHidden, domSiblings, domSiblingsPrev, domSiblingsLeft, domSiblingsNext, domSiblingsRight, importScript, importStyle, form2array, form2string, getDoNotTrack, getLocation, createFile, getFullscreen, setFullscreenOn, setFullscreenOff, domGetCSSVar, domSetCSSVar, domScrollToTop, domScrollToBottom, domScrollToElement, domClear, isNonNullable, isNonNullablePrimitive, isTypedCollection, is, toObject, toPrimitiveValue, toSafeString, isPropertyKey, toPropertyKey, isIndex, isLength, toIndex, toLength, typeOf, isSameType, isSameInstance, isCoercedObject, isDeepStrictEqual, isEmptyValue, isProxy, isAsyncGeneratorFn, isPlainObject, isChar, isNumeric, isObject, isFunction, isCallable, isArraylike, isNull, isUndefined, isNullish, isPrimitive, isIterator, isRegexp, isElement, isIterable, isAsyncIterable, isTypedArray, isGeneratorFn, isAsyncFn, setCookie, getCookie, hasCookie, removeCookie, clearCookies, castArray, compact, unique, count, arrayDeepClone, initial, shuffle, partition, setUnion, setIntersection, setDifference, setSymmetricDifference, isSuperset, min, max, arrayRepeat, arrayCycle, arrayRange, zip, unzip, zipObj, arrayAdd, arrayClear, arrayRemove, arrayRemoveBy, arrayMerge, iterRange, iterCycle, iterRepeat, takeWhile, dropWhile, take, drop, forEach, forEachRight, map, filter, reject, slice, tail, item, nth, size, first, head, last, reverse, sort, includes, find, findLast, every, some, none, takeRight, takeRightWhile, dropRight, dropRightWhile, concat, reduce, enumerate, flat, join, withOut, add, sub, mul, div, divMod, mod, isFloat, toInteger, toIntegerOrInfinity, sum, avg, product, clamp, minmax, isEven, isOdd, toInt8, toUInt8, toInt16, toUInt16, toInt32, toUInt32, toBigInt64, toBigUInt64, toFloat32, isInt8, isUInt8, isInt16, isUInt16, isInt32, isUInt32, isBigInt64, isBigUInt64, toFloat16, isFloat16, signbit, randomInt, randomFloat, inRange };
