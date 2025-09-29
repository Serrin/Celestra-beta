/** Core API **/
export declare const BASE16 = "0123456789ABCDEF";
export declare const BASE32 = "234567ABCDEFGHIJKLMNOPQRSTUVWXYZ";
export declare const BASE36 = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
export declare const BASE58 = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
export declare const BASE62 = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
export declare const WORDSAFEALPHABET = "23456789CFGHJMPQRVWXcfghjmpqvwx";
/**
 * @description This function is a general purpose, type safe, predictable stringifier.
 *
 * @param {unknown} value
 * @returns {string}
 */
export declare function toSafeString(value: unknown): string;
export declare const tap: (fn: Function) => any;
export declare function once(fn: Function): Function;
export declare function curry(fn: Function): Function;
export declare const pipe: (...functions: Function[]) => Function;
export declare const compose: (...functions: Function[]) => Function;
export declare const pick: (obj: object, keys: string[]) => object;
export declare const omit: (obj: object, keys: string[]) => object;
export declare const assoc: (obj: object, property: string, value: any) => object;
export declare function asyncNoop(): Promise<void>;
declare function asyncT(): Promise<boolean>;
declare function asyncF(): Promise<boolean>;
export declare function asyncConstant(value: any): Function;
declare function asyncIdentity(value: any): Promise<any>;
export declare function deleteOwnProperty(obj: Object, property: string, Throw?: boolean): number;
export declare function createPolyfillMethod(obj: Object, property: string, value: Function): boolean;
export declare function createPolyfillProperty(obj: object, property: string, value: any): boolean;
export declare function randomUUIDv7(v4?: boolean): string;
export declare const delay: (milisec: number) => Promise<void>;
export declare const randomBoolean: () => boolean;
export declare const getUrlVars: (str?: string) => Object;
export declare const obj2string: (obj: object) => string;
export declare function extend(...args: Array<object | boolean>): object;
export declare const sizeIn: (obj: object) => number;
export declare const unBind: (fn: Function) => Function;
/** @return {Function} */
export declare const bind: (thisArg: any, ...argArray: any[]) => any;
export declare const constant: (value: any) => Function;
export declare const identity: (value: any) => any;
export declare function noop(): void;
export declare const T: () => boolean;
export declare const F: () => boolean;
export declare function nanoid(size?: number, alphabet?: string): string;
export declare function timestampID(size?: number, alphabet?: string): string;
/** Assertion API **/
export declare function assertIs(value: any, expected: string | Function | Array<string | Function> | undefined, message: any): any;
export declare function assertIsNot(value: any, expected: string | Function | Array<string | Function> | undefined, message: any): any;
export declare function assertFail(message: any): void;
export declare function assertMatch(string: string, regexp: RegExp, message: any): boolean;
export declare function assertDoesNotMatch(string: string, regexp: RegExp, message: any): boolean;
export declare function assertThrows(callback: Function, message: any): any;
export declare function assertIsNotNil(value: any, message: any): any;
export declare function assertIsNil(value: any, message: any): any;
/** @deprecated * @return {any} */
export declare function assertTypeOf(value: any, type: string, message: any): any;
/** @deprecated * @return {any} */
export declare function assertNotTypeOf(value: any, type: string, message: any): any;
/** @deprecated * @return {any} */
export declare function assertInstanceOf(value: any, Class: Function, message: any): {};
/** @deprecated * @return {any} */
export declare function assertNotInstanceOf(value: any, Class: Function, message: any): any;
export declare function assert(condition: any, message: any): boolean;
export declare function assertTrue(condition: any, message: any): boolean;
export declare function assertFalse(condition: any, message: any): boolean;
export declare function assertEqual(x: any, y: any, message: any): boolean;
export declare function assertStrictEqual(x: any, y: any, message: any): boolean;
export declare function assertNotEqual(x: any, y: any, message: any): boolean;
export declare function assertNotStrictEqual(x: any, y: any, message: any): boolean;
export declare function assertDeepEqual(x: any, y: any, message: any): boolean;
export declare function assertNotDeepStrictEqual(x: any, y: any, message: any): boolean;
export declare function assertNotDeepEqual(x: any, y: any, message: any): boolean;
export declare function assertDeepStrictEqual(x: any, y: any, message: any): boolean;
/** String API **/
export declare function b64Encode(str: any): string;
export declare function b64Decode(str: any): string;
export declare function strTruncate(str: any, newLength: number, omission?: string): string;
export declare const strPropercase: (str: any) => string;
export declare const strTitlecase: (str: any) => string;
export declare function strCapitalize(str: any): string;
export declare function strUpFirst(str: any): string;
export declare function strDownFirst(str: any): string;
export declare const strReverse: (str: any) => string;
export declare const strCodePoints: (str: any) => any[];
export declare const strFromCodePoints: ([...array]: any[]) => string;
export declare function strAt(str: string, index: number, newChar?: string): string;
export declare const strSplice: (str: string, index: number, count: number, ...add: any[]) => string;
export declare const strHTMLRemoveTags: (str: any) => string;
export declare const strHTMLEscape: (str: any) => string;
export declare const strHTMLUnEscape: (str: string) => string;
/** DOM API **/
export declare const qsa: (str: string, context?: Document | Element) => any[];
export declare const qs: (str: string, context?: Document | Element) => HTMLElement | null;
export declare function domReady(fn: Function): void;
export declare function domCreate(elType: string | {
    [key: string]: any;
}, properties: object, innerHTML: string): HTMLElement;
export declare function domToElement(str: string): Element | null;
export declare const domGetCSS: (el: Element, property: string | number) => string | CSSStyleDeclaration;
export declare function domSetCSS(el: HTMLElement, property: string | object, value: string): void;
export declare function domFadeIn(el: HTMLElement, duration: number, display: string): void;
export declare function domFadeOut(el: HTMLElement, duration: number): void;
export declare function domFadeToggle(el: HTMLElement, duration: number, display?: string): void;
export declare const domHide: (el: HTMLElement) => any;
export declare const domShow: (el: HTMLElement, display?: string) => any;
export declare function domToggle(el: HTMLElement, display?: string): void;
export declare const domIsHidden: (el: Element) => boolean;
export declare const domSiblings: (el: Element) => Element[];
export declare const domSiblingsPrev: (el: Element) => Element[];
export declare const domSiblingsLeft: (el: Element) => Element[];
export declare const domSiblingsNext: (el: Element) => Element[];
export declare const domSiblingsRight: (el: HTMLElement) => Element[];
export declare function importScript(...scripts: string[]): void;
export declare function importStyle(...styles: string[]): void;
export declare function form2array(form: HTMLFormElement): object[];
export declare function form2string(form: HTMLFormElement): string;
export declare const getDoNotTrack: () => boolean;
export declare function getLocation(successFn: Function, errorFn: Function): void;
export declare function createFile(filename: string, content: string, dataType: string): void;
export declare const getFullscreen: () => Document | HTMLElement | undefined;
export declare function setFullscreenOn(el: HTMLElement | string): void;
export declare function setFullscreenOff(): void;
export declare const domGetCSSVar: (name: string) => string;
export declare const domSetCSSVar: (name: string, value: string | null) => void;
export declare const domScrollToTop: () => void;
export declare const domScrollToBottom: () => void;
export declare const domScrollToElement: (el: Element, top?: boolean) => void;
export declare const domClear: (el: Element) => void;
/** AJAX API **/
export declare function getText(url: string, successFn: Function): void;
export declare function getJson(url: string, successFn: Function): void;
export declare function ajax(options: {
    [key: string]: any;
}): void;
/** Type API **/
export declare function is(value: any, expected: string | Function | Array<string | Function> | undefined, Throw?: boolean): string | Function | boolean;
export declare function toObject(value: any): Object | symbol | Function;
/** @deprecated * @return {string | boolean} */
export declare function classof(value: any, type: string, Throw?: boolean): string | boolean;
/** @deprecated * @return {string | boolean} */
export declare function getType(value: any, type: string, Throw?: boolean): string | boolean;
export declare function toPrimitiveValue(value: any): any;
export declare const isPropertyKey: (value: any) => boolean;
export declare const toPropertyKey: (value: any) => string | symbol;
export declare const isIndex: (value: any) => boolean;
export declare const isLength: (value: any) => boolean;
export declare function toIndex(value: any): number;
export declare function toLength(value: any): number;
export declare const type: (value: any) => string;
/** @deprecated * @return {boolean} */
export declare const isSameClass: (x: any, y: any) => boolean;
export declare const isSameType: (x: any, y: any) => boolean;
export declare const isSameInstance: (x: any, y: any, Contructor: Function) => boolean;
export declare function isCoercedObject(value: any): Function | boolean;
export declare function isDeepStrictEqual(x: any, y: any): boolean;
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
export declare function isEmptyValue(value: any): boolean;
export declare const isProxy: (value: any) => boolean;
export declare const isAsyncGeneratorFn: (value: any) => boolean;
export declare const isClass: (value: any) => boolean;
export declare const isPlainObject: (value: any) => boolean;
export declare const isChar: (value: any) => boolean;
export declare const isNumeric: (value: any) => boolean;
export declare const isObject: (value: any) => boolean;
export declare const isFunction: (value: any) => boolean;
export declare const isCallable: (value: any) => boolean;
export declare const isArraylike: (value: any) => boolean;
export declare const isNull: (value: any) => boolean;
export declare const isUndefined: (value: any) => boolean;
export declare const isNil: (value: any) => boolean;
export declare const isPrimitive: (value: any) => boolean;
export declare const isIterator: (value: any) => boolean;
export declare const isRegexp: (value: any) => boolean;
export declare const isElement: (value: any) => boolean;
export declare const isIterable: (value: any) => boolean;
export declare const isAsyncIterable: (value: any) => boolean;
/**
 * Checks if a value is a TypedArray (Int8Array, etc.).
 *
 * @param {any} value The value to check.
 * @returns boolean
 */
export declare function isTypedArray(value: any): boolean;
export declare const isGeneratorFn: (value: any) => boolean;
export declare const isAsyncFn: (value: any) => boolean;
/** Cookie API **/
export declare function setCookie(name: string | {
    [key: string]: any;
}, value: string, hours: number | undefined, path: string | undefined, domain: string, secure: boolean, SameSite: string | undefined, HttpOnly: boolean): void;
export declare function getCookie(name?: string | undefined): {
    [key: string]: string;
} | string | null;
export declare const hasCookie: (name: string) => boolean;
export declare function removeCookie(name: string | {
    [key: string]: any;
}, path: string | undefined, domain: string, secure: boolean, SameSite: string | undefined, HttpOnly: boolean): boolean;
type ClearCookiesOptions = {
    path?: string | undefined;
    domain?: string | undefined;
    secure?: boolean | undefined;
    SameSite?: string | undefined;
    HttpOnly?: boolean | undefined;
};
export declare function clearCookies(path?: string | ClearCookiesOptions, domain?: string, secure?: boolean, SameSite?: string | undefined, HttpOnly?: boolean): void;
/** Collections API **/
/**
 * Returns the original value if this is an array or value a new array.
 *
 * @param {any[]} args
 * @returns {any[]} An array wrapping the value, or the original array if already one.
 */
export declare function castArray<T>(...args: [T] | []): T[];
/**
 * @description Returns an array with truthy values (but keeps `0`) from the given Iterable or ArrayLike object.
 *
 * @param {IterableIterator<any> | IterableIterator<any> | ArrayLike<any>} iter
 * @returns any[]
 */
export declare const compact: (iter: IterableIterator<any> | ArrayLike<any>) => any[];
export declare function unique(iter: IterableIterator<any>, resolver: string | Function | null | undefined): any[] | void;
export declare function count(iter: IterableIterator<any>, fn: Function): number;
export declare function arrayDeepClone([...array]: any[]): any[];
export declare const initial: ([...array]: any[]) => any[];
export declare function shuffle([...array]: any[]): any[];
export declare const partition: ([...array]: any[], fn: Function) => any[];
export declare const setUnion: (...args: IterableIterator<any>[]) => Set<any>;
export declare const setIntersection: ([...array]: any[], b: Set<any>) => Set<any>;
export declare const setDifference: ([...array]: any[], b: Set<any>) => Set<any>;
export declare const setSymmetricDifference: (array: Set<any>, b: Set<any>) => Set<any>;
export declare const isSuperset: ([...superSet]: any[], [...subSet]: any[]) => boolean;
export declare const min: (...args: any[]) => any;
export declare const max: (...args: any[]) => any;
export declare const arrayRepeat: (value: any, n?: number) => any[];
export declare const arrayCycle: ([...array]: any[], n?: number) => any[];
export declare const arrayRange: (start?: number, end?: number, step?: number) => any[];
export declare function zip(...args: any[]): any[];
export declare const unzip: ([...array]: any[]) => any[];
export declare function zipObj([...array1]: any[], [...array2]: any[]): {
    [key: string]: any;
};
export declare const arrayAdd: (array: any[], value: any) => boolean;
export declare function arrayClear(array: any[]): any[];
export declare function arrayRemove(array: any[], value: any, all?: boolean): boolean;
export declare function arrayRemoveBy(array: any[], fn: Function, all?: boolean): boolean;
export declare function arrayMerge(target: any[], ...sources: any[]): any[];
export declare function iterRange(start?: number, step?: number, end?: number): Iterator<any>;
export declare function iterCycle([...array]: any[], n?: number): Iterator<any>;
export declare function iterRepeat(value: any, n?: number): Iterator<any>;
export declare function takeWhile(iter: IterableIterator<any>, fn: Function): Iterator<any>;
export declare function dropWhile(iter: IterableIterator<any>, fn: Function): Iterator<any>;
export declare function take(iter: IterableIterator<any>, n?: number): Iterator<any>;
export declare function drop(iter: IterableIterator<any>, n?: number): Iterator<any>;
export declare function forEach(iter: IterableIterator<any>, fn: Function): void;
export declare function forEachRight([...array]: any[], fn: Function): void;
export declare function map(iter: IterableIterator<any>, fn: Function): Iterator<any>;
export declare function filter(iter: IterableIterator<any>, fn: Function): Iterator<any>;
export declare function reject(iter: IterableIterator<any>, fn: Function): Iterator<any>;
export declare function slice(iter: IterableIterator<any>, begin?: number, end?: number): Iterator<any>;
export declare function tail(iter: IterableIterator<any>): Iterator<any>;
export declare function item(iter: IterableIterator<any>, pos: number): any;
export declare function nth(iter: IterableIterator<any>, pos: number): any;
export declare function size(iter: IterableIterator<any>): number;
export declare function first(iter: IterableIterator<any>): any;
export declare function head(iter: IterableIterator<any>): any;
export declare const last: ([...array]: any[]) => any;
export declare function reverse([...array]: any[]): Iterator<any>;
export declare const sort: ([...array]: IterableIterator<any>, numbers: boolean) => any[];
/**
 * @param {any} collection - The collection to search through.
 * @param {any} value - The value to look for.
 * @param {undefined | ((a: any, b: any) => boolean)} [comparator] - Optional comparator for equality check.
 * @return {boolean} - Whether the value was found.
 * @throws {TypeError} - If comparator is not a Function or undefined.
 */
export declare function includes(collection: any, value: any, comparator?: (a: any, b: any) => boolean): boolean;
/** @deprecated */
export declare function contains(iter: IterableIterator<any>, value: any): boolean;
export declare function find(iter: IterableIterator<any>, fn: Function): any;
export declare function findLast(iter: IterableIterator<any>, fn: Function): any;
export declare function every(iter: IterableIterator<any>, fn: Function): boolean;
export declare function some(iter: IterableIterator<any>, fn: Function): boolean;
export declare function none(iter: IterableIterator<any>, fn: Function): boolean;
export declare const takeRight: ([...array]: any[], n?: number) => any[];
export declare function takeRightWhile([...array]: any[], fn: Function): Iterator<any>;
export declare const dropRight: ([...array]: any[], n?: number) => any[];
export declare function dropRightWhile([...array]: any[], fn: Function): Iterator<any>;
export declare function concat(): Iterator<any>;
export declare function reduce(iter: IterableIterator<any>, fn: Function, initialvalue: any): any;
export declare function enumerate(iter: IterableIterator<any>, offset?: number): Iterator<any>;
export declare function flat(iter: IterableIterator<any>): Iterator<any>;
export declare function join(iter: IterableIterator<any>, separator?: string): string;
export declare const withOut: ([...array]: any[], [...filterValues]: any[]) => any[];
/** Math API **/
export declare const isFloat: (value: any) => boolean;
export declare function toInteger(value: any): number;
export declare const toIntegerOrInfinity: (value: any) => number;
export declare const sum: (...values: any[]) => any;
export declare const avg: (...args: number[]) => number;
export declare const product: (first: number, ...args: number[]) => number;
export declare function clamp(value: any, min?: number, max?: number): number;
export declare function minmax(value: any, min?: number, max?: number): number;
export declare function isEven(value: number): boolean;
export declare function isOdd(value: number): boolean;
export declare const toInt8: (value: any) => number;
export declare const toUInt8: (value: any) => number;
export declare const toInt16: (value: any) => number;
export declare const toUInt16: (value: any) => number;
export declare const toInt32: (value: any) => number;
export declare const toUInt32: (value: any) => number;
export declare const toBigInt64: (value: any) => bigint;
export declare const toBigUInt64: (value: any) => bigint;
export declare const toFloat32: (value: any) => number;
export declare const isInt8: (value: any) => boolean;
export declare const isUInt8: (value: any) => boolean;
export declare const isInt16: (value: any) => boolean;
export declare const isUInt16: (value: any) => boolean;
export declare const isInt32: (value: any) => boolean;
export declare const isUInt32: (value: any) => boolean;
export declare const isBigInt64: (value: any) => boolean;
export declare const isBigUInt64: (value: any) => boolean;
export declare const toFloat16: (value: any) => number;
export declare const isFloat16: (value: any) => boolean;
export declare const signbit: (value: any) => boolean;
export declare function randomInt(min: number | undefined, max: number | null | undefined): number;
export declare function randomFloat(min: number | undefined, max: number | null | undefined): number;
export declare const inRange: (value: number, min: number, max: number) => boolean;
/** object header **/
export declare const VERSION = "Celestra v6.1.0 dev";
declare const celestra: {
    /** object header **/
    VERSION: string;
    /** Core API **/
    BASE16: string;
    BASE32: string;
    BASE36: string;
    BASE58: string;
    BASE62: string;
    WORDSAFEALPHABET: string;
    toSafeString: typeof toSafeString;
    tap: (fn: Function) => any;
    once: typeof once;
    curry: typeof curry;
    pipe: (...functions: Function[]) => Function;
    compose: (...functions: Function[]) => Function;
    pick: (obj: object, keys: string[]) => object;
    omit: (obj: object, keys: string[]) => object;
    assoc: (obj: object, property: string, value: any) => object;
    asyncNoop: typeof asyncNoop;
    asyncT: typeof asyncT;
    asyncF: typeof asyncF;
    asyncConstant: typeof asyncConstant;
    asyncIdentity: typeof asyncIdentity;
    deleteOwnProperty: typeof deleteOwnProperty;
    createPolyfillMethod: typeof createPolyfillMethod;
    createPolyfillProperty: typeof createPolyfillProperty;
    randomUUIDv7: typeof randomUUIDv7;
    delay: (milisec: number) => Promise<void>;
    randomBoolean: () => boolean;
    getUrlVars: (str?: string) => Object;
    obj2string: (obj: object) => string;
    extend: typeof extend;
    sizeIn: (obj: object) => number;
    unBind: (fn: Function) => Function;
    bind: (thisArg: any, ...argArray: any[]) => any;
    constant: (value: any) => Function;
    identity: (value: any) => any;
    noop: typeof noop;
    T: () => boolean;
    F: () => boolean;
    nanoid: typeof nanoid;
    timestampID: typeof timestampID;
    /** Assertion API **/
    assertIs: typeof assertIs;
    assertIsNot: typeof assertIsNot;
    assertFail: typeof assertFail;
    assertMatch: typeof assertMatch;
    assertDoesNotMatch: typeof assertDoesNotMatch;
    assertThrows: typeof assertThrows;
    assertIsNotNil: typeof assertIsNotNil;
    assertIsNil: typeof assertIsNil;
    assertTypeOf: typeof assertTypeOf;
    assertNotTypeOf: typeof assertNotTypeOf;
    assertInstanceOf: typeof assertInstanceOf;
    assertNotInstanceOf: typeof assertNotInstanceOf;
    assert: typeof assert;
    assertTrue: typeof assertTrue;
    assertFalse: typeof assertFalse;
    assertEqual: typeof assertEqual;
    assertStrictEqual: typeof assertStrictEqual;
    assertNotEqual: typeof assertNotEqual;
    assertNotStrictEqual: typeof assertNotStrictEqual;
    assertDeepEqual: typeof assertDeepEqual;
    assertNotDeepStrictEqual: typeof assertNotDeepStrictEqual;
    assertNotDeepEqual: typeof assertNotDeepEqual;
    assertDeepStrictEqual: typeof assertDeepStrictEqual;
    /** String API **/
    b64Encode: typeof b64Encode;
    b64Decode: typeof b64Decode;
    strTruncate: typeof strTruncate;
    strPropercase: (str: any) => string;
    strTitlecase: (str: any) => string;
    strCapitalize: typeof strCapitalize;
    strUpFirst: typeof strUpFirst;
    strDownFirst: typeof strDownFirst;
    strReverse: (str: any) => string;
    strCodePoints: (str: any) => any[];
    strFromCodePoints: ([...array]: any[]) => string;
    strAt: typeof strAt;
    strSplice: (str: string, index: number, count: number, ...add: any[]) => string;
    strHTMLRemoveTags: (str: any) => string;
    strHTMLEscape: (str: any) => string;
    strHTMLUnEscape: (str: string) => string;
    /** DOM API **/
    qsa: (str: string, context?: Document | Element) => any[];
    qs: (str: string, context?: Document | Element) => HTMLElement | null;
    domReady: typeof domReady;
    domCreate: typeof domCreate;
    domToElement: typeof domToElement;
    domGetCSS: (el: Element, property: string | number) => string | CSSStyleDeclaration;
    domSetCSS: typeof domSetCSS;
    domFadeIn: typeof domFadeIn;
    domFadeOut: typeof domFadeOut;
    domFadeToggle: typeof domFadeToggle;
    domHide: (el: HTMLElement) => any;
    domShow: (el: HTMLElement, display?: string) => any;
    domToggle: typeof domToggle;
    domIsHidden: (el: Element) => boolean;
    domSiblings: (el: Element) => Element[];
    domSiblingsPrev: (el: Element) => Element[];
    domSiblingsLeft: (el: Element) => Element[];
    domSiblingsNext: (el: Element) => Element[];
    domSiblingsRight: (el: HTMLElement) => Element[];
    importScript: typeof importScript;
    importStyle: typeof importStyle;
    form2array: typeof form2array;
    form2string: typeof form2string;
    getDoNotTrack: () => boolean;
    getLocation: typeof getLocation;
    createFile: typeof createFile;
    getFullscreen: () => Document | HTMLElement | undefined;
    setFullscreenOn: typeof setFullscreenOn;
    setFullscreenOff: typeof setFullscreenOff;
    domGetCSSVar: (name: string) => string;
    domSetCSSVar: (name: string, value: string | null) => void;
    domScrollToTop: () => void;
    domScrollToBottom: () => void;
    domScrollToElement: (el: Element, top?: boolean) => void;
    domClear: (el: Element) => void;
    /** AJAX API **/
    getText: typeof getText;
    getJson: typeof getJson;
    ajax: typeof ajax;
    /** Type API **/
    is: typeof is;
    toObject: typeof toObject;
    classof: typeof classof;
    getType: typeof getType;
    toPrimitiveValue: typeof toPrimitiveValue;
    isPropertyKey: (value: any) => boolean;
    toPropertyKey: (value: any) => string | symbol;
    isIndex: (value: any) => boolean;
    isLength: (value: any) => boolean;
    toIndex: typeof toIndex;
    toLength: typeof toLength;
    type: (value: any) => string;
    isSameClass: (x: any, y: any) => boolean;
    isSameType: (x: any, y: any) => boolean;
    isSameInstance: (x: any, y: any, Contructor: Function) => boolean;
    isCoercedObject: typeof isCoercedObject;
    isDeepStrictEqual: typeof isDeepStrictEqual;
    isEmptyValue: typeof isEmptyValue;
    isProxy: (value: any) => boolean;
    isAsyncGeneratorFn: (value: any) => boolean;
    isClass: (value: any) => boolean;
    isPlainObject: (value: any) => boolean;
    isChar: (value: any) => boolean;
    isNumeric: (value: any) => boolean;
    isObject: (value: any) => boolean;
    isFunction: (value: any) => boolean;
    isCallable: (value: any) => boolean;
    isArraylike: (value: any) => boolean;
    isNull: (value: any) => boolean;
    isUndefined: (value: any) => boolean;
    isNil: (value: any) => boolean;
    isPrimitive: (value: any) => boolean;
    isIterator: (value: any) => boolean;
    isRegexp: (value: any) => boolean;
    isElement: (value: any) => boolean;
    isIterable: (value: any) => boolean;
    isAsyncIterable: (value: any) => boolean;
    isTypedArray: typeof isTypedArray;
    isGeneratorFn: (value: any) => boolean;
    isAsyncFn: (value: any) => boolean;
    /** Cookie API **/
    setCookie: typeof setCookie;
    getCookie: typeof getCookie;
    hasCookie: (name: string) => boolean;
    removeCookie: typeof removeCookie;
    clearCookies: typeof clearCookies;
    /** Collections API **/
    castArray: typeof castArray;
    compact: (iter: IterableIterator<any> | ArrayLike<any>) => any[];
    unique: typeof unique;
    count: typeof count;
    arrayDeepClone: typeof arrayDeepClone;
    initial: ([...array]: any[]) => any[];
    shuffle: typeof shuffle;
    partition: ([...array]: any[], fn: Function) => any[];
    setUnion: (...args: IterableIterator<any>[]) => Set<any>;
    setIntersection: ([...array]: any[], b: Set<any>) => Set<any>;
    setDifference: ([...array]: any[], b: Set<any>) => Set<any>;
    setSymmetricDifference: (array: Set<any>, b: Set<any>) => Set<any>;
    isSuperset: ([...superSet]: any[], [...subSet]: any[]) => boolean;
    min: (...args: any[]) => any;
    max: (...args: any[]) => any;
    arrayRepeat: (value: any, n?: number) => any[];
    arrayCycle: ([...array]: any[], n?: number) => any[];
    arrayRange: (start?: number, end?: number, step?: number) => any[];
    zip: typeof zip;
    unzip: ([...array]: any[]) => any[];
    zipObj: typeof zipObj;
    arrayAdd: (array: any[], value: any) => boolean;
    arrayClear: typeof arrayClear;
    arrayRemove: typeof arrayRemove;
    arrayRemoveBy: typeof arrayRemoveBy;
    arrayMerge: typeof arrayMerge;
    iterRange: typeof iterRange;
    iterCycle: typeof iterCycle;
    iterRepeat: typeof iterRepeat;
    takeWhile: typeof takeWhile;
    dropWhile: typeof dropWhile;
    take: typeof take;
    drop: typeof drop;
    forEach: typeof forEach;
    forEachRight: typeof forEachRight;
    map: typeof map;
    filter: typeof filter;
    reject: typeof reject;
    slice: typeof slice;
    tail: typeof tail;
    item: typeof item;
    nth: typeof nth;
    size: typeof size;
    first: typeof first;
    head: typeof head;
    last: ([...array]: any[]) => any;
    reverse: typeof reverse;
    sort: ([...array]: IterableIterator<any>, numbers: boolean) => any[];
    includes: typeof includes;
    contains: typeof contains;
    find: typeof find;
    findLast: typeof findLast;
    every: typeof every;
    some: typeof some;
    none: typeof none;
    takeRight: ([...array]: any[], n?: number) => any[];
    takeRightWhile: typeof takeRightWhile;
    dropRight: ([...array]: any[], n?: number) => any[];
    dropRightWhile: typeof dropRightWhile;
    concat: typeof concat;
    reduce: typeof reduce;
    enumerate: typeof enumerate;
    flat: typeof flat;
    join: typeof join;
    withOut: ([...array]: any[], [...filterValues]: any[]) => any[];
    /** Math API **/
    isFloat: (value: any) => boolean;
    toInteger: typeof toInteger;
    toIntegerOrInfinity: (value: any) => number;
    sum: (...values: any[]) => any;
    avg: (...args: number[]) => number;
    product: (first: number, ...args: number[]) => number;
    clamp: typeof clamp;
    minmax: typeof minmax;
    isEven: typeof isEven;
    isOdd: typeof isOdd;
    toInt8: (value: any) => number;
    toUInt8: (value: any) => number;
    toInt16: (value: any) => number;
    toUInt16: (value: any) => number;
    toInt32: (value: any) => number;
    toUInt32: (value: any) => number;
    toBigInt64: (value: any) => bigint;
    toBigUInt64: (value: any) => bigint;
    toFloat32: (value: any) => number;
    isInt8: (value: any) => boolean;
    isUInt8: (value: any) => boolean;
    isInt16: (value: any) => boolean;
    isUInt16: (value: any) => boolean;
    isInt32: (value: any) => boolean;
    isUInt32: (value: any) => boolean;
    isBigInt64: (value: any) => boolean;
    isBigUInt64: (value: any) => boolean;
    toFloat16: (value: any) => number;
    isFloat16: (value: any) => boolean;
    signbit: (value: any) => boolean;
    randomInt: typeof randomInt;
    randomFloat: typeof randomFloat;
    inRange: (value: number, min: number, max: number) => boolean;
};
export default celestra;
//# sourceMappingURL=celestra.browser.d.ts.map