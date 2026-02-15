// @ts-check
"use strict";

console.log("\x1b[40m\x1b[37m"); /* black - white */
/* import method 1 - defaultExport */
// /*
console.log("import method 1 - defaultExport");
import defaultExport from "./celestra.node.mjs";
globalThis.celestra = defaultExport;
globalThis.CEL = defaultExport;
// */

/* import method 2 - default as celestra */
/*
console.log("import method 2 - default as celestra");
import { default as celestra } from "./celestra.node.mjs";
globalThis.celestra = celestra;
globalThis.CEL = celestra;
//*/

/* import method 3 - import *  as celestra */
/*
console.log("import method 3 - import * as celestra");
import * as celestra from "./celestra.node.mjs";
globalThis.celestra = celestra;
globalThis.CEL = celestra;
// */


const CUT = {};

CUT.VERSION = "Celestra Unit Tester (CUT) v1.30.0 for Node.js";

/* __addTest__(<step: string>, <expected>, <expression>); */
/* __addTest__(<step: string>, <expected>, <expression>[, strict: boolean]); */
/* only for inner calls and selftest */
CUT.__addTest__ = function __addTest__ (
  /** @type {any} */ step,
  /** @type {any} */ expected,
  /** @type {any} */ expression,
  /** @type {boolean} */ strict = true) {
  step = String(step);
  if (strict === undefined) { strict = true; }
  if (strict ? expected === expression : expected == expression) {
    /*
    let resultStr = "[" + Date.now().toString(36) + "] [passed] " + step;
    console.log(resultStr);
    */
  } else {
    let resultStr = "" + "\x1b[40m\x1b[31m❌\x1b[40m\x1b[37m [" + Date.now().toString(36)
      + "] \x1b[41m\x1b[37m[failed]\x1b[40m\x1b[37m " + step; //
    console.error(resultStr);
    /* black - red */
  }
};


/*
https://stackoverflow.com/questions/9781218/how-to-change-node-jss-console-font-color
https://en.wikipedia.org/wiki/ANSI_escape_code#Colors

ANSI escape codes:

Reset = "\x1b[0m"
Bright = "\x1b[1m"
Dim = "\x1b[2m"
Underscore = "\x1b[4m"
Blink = "\x1b[5m"
Reverse = "\x1b[7m"
Hidden = "\x1b[8m"

FgBlack = "\x1b[30m"
FgRed = "\x1b[31m"
FgGreen = "\x1b[32m"
FgYellow = "\x1b[33m"
FgBlue = "\x1b[34m"
FgMagenta = "\x1b[35m"
FgCyan = "\x1b[36m"
FgWhite = "\x1b[37m"
FgGray = "\x1b[90m"

BgBlack = "\x1b[40m"
BgRed = "\x1b[41m"
BgGreen = "\x1b[42m"
BgYellow = "\x1b[43m"
BgBlue = "\x1b[44m"
BgMagenta = "\x1b[45m"
BgCyan = "\x1b[46m"
BgWhite = "\x1b[47m"
BgGray = "\x1b[100m"
*/


/* isTrue(<step: string>, <expression>[, strict: boolean]); */
CUT.isTrue = function isTrue (
  /** @type {any} */ step,
  /** @type {any} */ expression,
  /** @type {boolean} */ strict = true) {
  CUT.__addTest__(step, true, expression, strict);
};

/* isFalse(<step: string>, <expression>[, strict: boolean]); */
CUT.isFalse = function isFalse (
  /** @type {any} */ step,
  /** @type {any} */ expression,
  /** @type {boolean} */ strict = true) {
  CUT.__addTest__(step, false, expression, strict);
};

/* isEqual(<step: string>, <expected>, <expression>); */
/* isEqual(<step: string>, <expected>, <expression>[, strict: boolean]); */
CUT.isEqual = function isEqual (
  /** @type {any} */ step,
  /** @type {any} */ expected,
  /** @type {any} */ expression,
  /** @type {boolean} */ strict = true) {
  CUT.__addTest__(step, expected, expression, strict);
};

/* isNotEqual(<step: string>, <notExpected>, <expression>); */
/* isNotEqual(<step: string>, <notExpected>, <expression>[, strict: boolean]);*/
CUT.isNotEqual = function (
  /** @type {any} */ step,
  /** @type {any} */ notExpected,
  /** @type {any} */ expression,
  /** @type {boolean} */ strict = true) {
  CUT.__addTest__(step, true,
    (strict ? notExpected !== expression : notExpected != expression), true
  );
};

/* isError((<step: string>, <callback: function>); */
CUT.isError = function (
  /** @type {string} */ step,
  /** @type {Function} */ callback) {
  try {
    callback();
    CUT.isTrue(step, false);
  } catch (e) {
    CUT.isTrue(step + " - \n\`\"" + e + "\"\`", true);
  }
};

/* log(<innerHTML>); */
CUT.log = function log (/** @type {any} */ str) {
  console.log(
    "\x1b[40m\x1b[36m" + "\u2139\x1b[40m\x1b[37m"
      + "  [" + Date.now().toString(36) + "] \x1b[44m\x1b[37m[info]\x1b[40m\x1b[37m " + str
    /* black - cyan */
  );
};

/* logCode(<innerHTML>); */
CUT.logCode = function log (/** @type {any} */ str) {
  console.log(
    "\x1b[40m\x1b[36m" + "\uD83D\uDEC8"
      + "  [" + Date.now().toString(36) + "] [code] "
      + "`" + "\x1b[40m\x1b[37m" + str + "`"
    /* black - cyan */
  );
};

/* clear(); */
CUT.clear = function clear () { console.clear(); };

/* concat(<item1, item2, ...itemN>): string */
CUT.concat = function concat (/** @type {any[]} */ ...args) {
  let r = "";
  // @ts-ignore
  for (let item of args) { r += item; }
  return r;
};

/* join(<iterator>[, separator = " "]): string */
/** @returns string */
CUT.join = function join (
  /** @type {Iterable<any> | Iterator<any> | Generator<any, void, unknown>} */ it,
  /** @type {string} */ separator = " ") {
  separator = String(separator);
  let r = "";
  // @ts-ignore
  for (let item of it) { r += separator + item; }
  return r.slice(separator.length);
}

/* take(<iterator>[,n=1]): iterator); */
/** @returns string */
CUT.take = function* take (
  /** @type {Iterable<any> | Iterator<any> | Generator<any, void, unknown>} */ it,
  /** @type {number} */  n = 1) {
  let i = n;
  // @ts-ignore
  for (let item of it) {
    if (i <= 0) { break; }
    yield item;
    i--;
  }
}

/* getHumanReadableJSON(<value>[, space]): string */
CUT.getHumanReadableJSON = function getReadableJSON (
  /** @type {any} */ value,
  /** @type {any} */ space) {
  function _JSONreplacer(_key, value) {
    if (value == null) { return String(value); }
    if (value !== value) { return String(value); }
    if (typeof value === "bigint") { return value.toString()+"n"; }
    if (typeof value === "function") { return String(value); }
    if (typeof value === "symbol") { return String(value); }
    if (value instanceof Set) { return "new Set("+[...value].toString()+");"; }
    if (value instanceof Map) { return "new Map("+[...value].toString()+");"; }
    if (Error.isError(value)) {
      return Object.getOwnPropertyNames(value)
        .reduce((acc, prop) => { acc[prop] = value[prop]; return acc; }, {});
    }
    return value;
  }
  return JSON.stringify(value, _JSONreplacer, space);
}


const now = new Date();
console.log("\nCelestra versions");
const versionTable = {
  "CUT.VERSION     ": CUT.VERSION,
  "celestra.VERSION": celestra.VERSION,
  "UTC date        ": now.toISOString(),
  "Local date      ": now.toString(),
  "EPOCH time (10) ": Number(now),
  "EPOCH time (16) ": Number(now).toString(16),
  "EPOCH time (36) ": Number(now).toString(36)
};
console.table(versionTable);
console.log("\nJS versions");
// @ts-ignore
console.table(process.versions);
console.log("");


/* ======================================================================== */


try {

/** Selftest **/
CUT.log("CUT Selftest");

CUT.__addTest__("[Selftest] ✅ - __addTest__(); success", 1, 1);
CUT.__addTest__("[Selftest] ✅ - __addTest__(); failed", 1, 2);
CUT.__addTest__("[Selftest] ✅ - __addTest__(); success non-strict",
  0, false, false
);
CUT.__addTest__("[Selftest] ✅ - __addTest__(); failed strict", 0, false, true);

CUT.isTrue("[Selftest] ✅ - isTrue(); success", true);
CUT.isTrue("[Selftest] ✅ - isTrue(); failed", false);

CUT.isFalse("[Selftest] ✅ - isFalse(); success", false);
CUT.isFalse("[Selftest] ✅ - isFalse(); failed", true);

CUT.isEqual("[Selftest] ✅ - isEqual(); success", 1, 1);
CUT.isEqual("[Selftest] ✅ - isEqual(); failed", 1, 2);
CUT.isEqual(
  "[Selftest] ✅ - isEqual(); success non-strict", 0, false, false
);
CUT.isEqual("[Selftest] ✅ - isEqual(); failed strict", 0, false, true);

CUT.isNotEqual("[Selftest] ✅ - isNotEqual(); success", 1, 2);
CUT.isNotEqual("[Selftest] ✅ - isNotEqual(); failed", 1, 1);
CUT.isNotEqual(
  "[Selftest] ✅ - isNotEqual(); success strict", 0, false, true
);
CUT.isNotEqual(
  "[Selftest] ✅ - isNotEqual(); failed non-strict", 0, false, false
);

} catch (e) {
  // @ts-ignore
  console.error("CUT initialisation error: " + CUT.getHumanReadableJSON(e));
}


/* ======================================================================== */


try {


(function(){
"use strict";


// @ts-ignore
var /** @type any */ token1, /** @type any */ token2, /** @type any */ token3;
// @ts-ignore
var /** @type any */ token4, /** @type any */ token5, /** @type any */ token6;
// @ts-ignore
var /** @type any */ token7, /** @type any */ token8, /** @type any */ token9;
// @ts-ignore
var /** @type any */ token10, /** @type any */ token11;
// @ts-ignore
var /** @type any */ token12, /** @type any */ token13;
// @ts-ignore
var /** @type any */ token14, /** @type any */ token15;


/* Celestra v6.4.1 testcases */


/** Not auto tested functions **/


/** Celestra object **/
CUT.log("Sync testcases");


/* Celestra object */
CUT.isEqual("Object name: \"celestra\"", true, celestra.randomInt(100, 200)>99);


/* CEL object */
CUT.isEqual("Object name: \"CEL\"", true, CEL.randomInt(100, 200) > 99);


/* VERSION; */
CUT.isTrue("VERSION;", CEL.VERSION.includes("Celestra v"));


/* random ID alphabets */
/* BASE16; */
CUT.isEqual("BASE16;", CEL.BASE16, "0123456789ABCDEF");
/* BASE32; */
CUT.isEqual("BASE32;", CEL.BASE32, "234567ABCDEFGHIJKLMNOPQRSTUVWXYZ");
/* BASE36; */
CUT.isEqual("BASE36;", CEL.BASE36, "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ");
/* BASE58; */
CUT.isEqual("BASE58;", CEL.BASE58,
  "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz"
);
/* BASE62; */
CUT.isEqual("BASE62;", CEL.BASE62,
  "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
);
/* WORDSAFEALPHABET; */
CUT.isEqual("WORDSAFEALPHABET;", CEL.WORDSAFEALPHABET,
  "23456789CFGHJMPQRVWXcfghjmpqvwx"
);


/* isTypedCollection(); begin */
CUT.isTrue("is(); 01 true",
  CEL.isTypedCollection([1,2,3], "number")
    && CEL.isTypedCollection([1,2,3], ["number"])
    && CEL.isTypedCollection([1,2,3], [Array, "number", Number])
    && CEL.isTypedCollection([1,{},3], [Array, "number", Object])
);
CUT.isFalse("is(); 02 false",
  CEL.isTypedCollection([1,2,3], "string", false)
    && CEL.isTypedCollection([1,2,3], ["string"])
    && CEL.isTypedCollection([1,2,3], [Array, "string", Number], false)
    && CEL.isTypedCollection([1,{},3], [Array, "string", Map])
);
CUT.isError("is(); 03 error",
  () => CEL.isTypedCollection([1,2,3], "string", true)
);
CUT.isError("is(); 04 error",
  () => CEL.isTypedCollection([1,2,3], ["string"], true)
);
CUT.isError("is(); 05 error",
  () => CEL.isTypedCollection([1,2,3], [Array, "string", Number], true)
);
CUT.isError("is(); 06 error",
  () => CEL.isTypedCollection([1,{},3], [Array, "string", Map], true)
);
CUT.isError("is(); 07 parameter error - iter",
  // @ts-ignore
  () => CEL.isTypedCollection(42, [Array, "number", Number])
);
CUT.isError("is(); 08 parameter error - expected",
  // @ts-ignore
  () => CEL.isTypedCollection([1,2,3], 42)
);
CUT.isError("is(); 09 parameter error - Throw",
  // @ts-ignore
  () => CEL.isTypedCollection([1,2,3], [Array, "number", Number], 42)
);
/* isTypedCollection(); end */


/* is(); begin */
CUT.isTrue("is(); ES5 values",
  CEL.is([1, 2, 3]) === Array
    && CEL.is(1998) === "number"
    && CEL.is("hello world") === "string"
    && CEL.is({a:1,b:2}) === Object
    && CEL.is(true) === "boolean"
    && CEL.is(null) === "null"
    && CEL.is(undefined) === "undefined"
    && CEL.is(function () {}) === "function"
    && CEL.is(new Date()) === Date
    && CEL.is(/^\[object (.+)\]$/g) === RegExp
);
CUT.isTrue("is(); ES5 true",
  CEL.is([1, 2, 3], "array")
    || CEL.is(1998, "number")
    || CEL.is("hello world", "string")
    || CEL.is({ a: 1, b: 2}, Object)
    || CEL.is(true, "boolean")
    || CEL.is(null, "null")
    || CEL.is(undefined, "undefined")
    || CEL.is(function () {}, "function")
    || CEL.is(new Date(), Date)
    || CEL.is(/^\[object (.+)\]$/g, RegExp)
);
CUT.isFalse("is(); ES5 false",
  CEL.is([1, 2, 3], "number")
    || CEL.is(1998, "array")
    || CEL.is("hello world", "object")
    || CEL.is({ a: 1 , b: 2}, "string")
    || CEL.is(null, "undefined")
    || CEL.is(undefined, "null")
    || CEL.is(function(){}, Array)
    || CEL.is(new Date(), "array")
    || CEL.is(/^\[object (.+)\]$/g, "string")
);
CUT.isTrue("is(); ES6 values",
  CEL.is(new Map()) === Map
    && CEL.is(new Set()) === Set
    && CEL.is(new WeakMap()) === WeakMap
    && CEL.is(new WeakSet()) === WeakSet
);
CUT.isTrue("is(); ES6 true",
  CEL.is(new Map(), Map)
    && CEL.is(new Set(), Set)
    && CEL.is(new WeakMap(), WeakMap)
    && CEL.is(new WeakSet(), WeakSet)
);
CUT.isTrue("is(); ES6 true object",
  CEL.is(new Map(), "object")
    || CEL.is(new Set(), "object")
    || CEL.is(new WeakMap(), "object")
    || CEL.is(new WeakSet(), "object")
);
// @ts-ignore
if (globalThis.BigInt) {
  CUT.isTrue("is(); ES6 bigint",
    CEL.is(BigInt(456)) === "bigint"
      &&  CEL.is(456n, "bigint")
      && !CEL.is(456n, "object")
  );
}
CUT.isTrue("is(); expectedTypes array",
  CEL.is(BigInt(456), [Object, "bigint"])
    &&  CEL.is([], ["string", Map, Array])
    && !CEL.is([], ["string", Map])
    &&  CEL.is(Object.create(null), [Object, "object"])
    && !CEL.is(Object.create(null), [Object, "string"])
);
CUT.isError("is(); error 1", () => CEL.is(Object.create(null), Object, true));
CUT.isError("is(); error 2", () => CEL.is([], ["number", Map], true));
CUT.isError("is(); error 3", () => CEL.is({}, ["string", Map, Array], true));
// @ts-ignore
CUT.isError("is(); error 4", () => CEL.is({}, ["string", Map, 42], true));
// @ts-ignore
CUT.isError("is(); error 5", () => CEL.is("dsgds", 42));
// @ts-ignore
CUT.isError("is(); error 6", () => CEL.is("dsgds", "string", 42));
CUT.isError("is(); error 7", () => CEL.is("fsdds", "number", true));
CUT.isError("is(); error 8", () => CEL.is("fsdds", Map, true));
/* is(); end */


/* toSafeString(); */
CUT.isEqual("toSafeString(); 01", CEL.toSafeString({"a": 1}), '{"a":1}');
CUT.isEqual("toSafeString(); 02", CEL.toSafeString(Symbol("a")), '"Symbol(a)"');
CUT.isEqual("toSafeString(); 03", CEL.toSafeString(null), "null");
CUT.isEqual("toSafeString(); 04", CEL.toSafeString(undefined), "undefined");


/* eq(); */
CUT.isTrue("eq();",
  CEL.eq(42, 42)
    && !CEL.eq(42, Object(42))
    && CEL.eq(NaN, NaN)
);


/* gt(); */
CUT.isTrue("gt();",
  CEL.gt(43, 42)
    && !CEL.gt(42, 43)
    && !CEL.gt(42, Object(42))
    && !CEL.gt(42, 42)
    && !CEL.gt(NaN, NaN)
);


/* gte(); */
CUT.isTrue("gte();",
  CEL.gte(43, 42)
    && !CEL.gte(42, 43)
    && !CEL.gte(42, Object(42))
    && CEL.gte(42, 42)
    && CEL.gte(NaN, NaN)
);


/* lt(); */
CUT.isTrue("lt();",
  !CEL.lt(43, 42)
    && CEL.lt(42, 43)
    && !CEL.lt(42, Object(42))
    && !CEL.lt(42, 42)
    && !CEL.lt(NaN, NaN)
);


/* lte(); */
CUT.isTrue("lte();",
  !CEL.lte(43, 42)
    && CEL.lte(42, 43)
    && !CEL.lte(42, Object(42))
    && CEL.lte(42, 42)
    && CEL.lte(NaN, NaN)
);


/* isNonNullable(); */
CUT.isTrue("isNonNullable();",
  CEL.isNonNullable(42)
    && CEL.isNonNullable(true)
    && CEL.isNonNullable("lorem")
    && CEL.isNonNullable(Symbol())
    && CEL.isNonNullable([])
    && CEL.isNonNullable(() => {})
    && !CEL.isNonNullable(null)
    && !CEL.isNonNullable(undefined)
);


/* isNonNullablePrimitive(); */
CUT.isTrue("isNonNullablePrimitive();",
  CEL.isNonNullablePrimitive(42)
    && CEL.isNonNullablePrimitive(true)
    && CEL.isNonNullablePrimitive("lorem")
    && CEL.isNonNullablePrimitive(Symbol())
    && !CEL.isNonNullablePrimitive([])
    && !CEL.isNonNullablePrimitive(() => {})
    && !CEL.isNonNullablePrimitive(null)
    && !CEL.isNonNullablePrimitive(undefined)
);


/* tap(); */
token1 = {"a": 1};
CUT.isTrue("tap();",
  CEL.tap((x) => x.a += 1)(token1) === token1 && token1.a === 2
);


/* once(); */
token1 = CEL.once((v) => v + 1);
CUT.isEqual("once();", 4, token1(1) + token1(2));


/* curry(); */
CUT.isEqual("curry();", 3, CEL.curry((a, b) => a +b)(1,2));


/* pipe(); */
CUT.isEqual("pipe();", 6, CEL.pipe((x) => x + 1, (x) => x * 2)(2));


/* compose(); */
CUT.isEqual("compose();", 6, CEL.compose((x) => x *2, (x) => x +1)(2));


/* pick(); */
token1 = {"a": 1, "b": 2, "c": 3, "d": 4};
token2 = CEL.pick(token1, ["a", "b"]);
CUT.isTrue("pick();",
  token1 !== token2 && JSON.stringify(token2) === "{\"a\":1,\"b\":2}"
);


/* omit(); */
token1 = {"a": 1, "b": 2, "c": 3, "d": 4};
token2 = CEL.omit(token1, ["a", "b"]);
CUT.isTrue("omit();",
  token1 !== token2 && JSON.stringify(token2) === "{\"c\":3,\"d\":4}"
);


/* assoc(); */
token1 = {"a": 1, "b": 2};
token2 = CEL.assoc(token1, "b", 3);
CUT.isTrue("assoc();",
  token1 !== token2 && JSON.stringify(token2) === "{\"a\":1,\"b\":3}"
);


/* randomUUIDv7(); */
token1 = CEL.randomUUIDv7();
CUT.isTrue("randomUUIDv7(); 01 - <code>\"" + token1 + "\"</code>",
  token1.length === 36
    && /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/
      .test(token1)
    && token1[14] === "7"
    && "89ab".includes(token1[19])
);
token1 = CEL.randomUUIDv7(false);
CUT.isTrue("randomUUIDv7(); 02 - <code>\"" + token1 + "\"</code>",
  token1.length === 36
    && /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/
      .test(token1)
    && token1[14] === "7"
    && "89ab".includes(token1[19])
);
token1 = CEL.randomUUIDv7(true);
CUT.isTrue("randomUUIDv7(); 03 - <code>\"" + token1 + "\"</code>",
  token1.length === 36
    && /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/
      .test(token1)
    && token1[14] === "4"
    && "89ab".includes(token1[19])
);


/* nanoid(); */
token1 = CEL.nanoid();
CUT.isTrue("nanoid(); 01 - <code>\"" + token1 + "\"</code>",
  typeof token1 === "string" && token1.length === 21
);
token1 = CEL.nanoid(15);
CUT.isTrue("nanoid(); 02 - <code>\"" + token1 + "\"</code>",
  typeof token1==="string" && token1.length === 15
);
token1 = CEL.nanoid(36);
CUT.isTrue("nanoid(); 03 - <code>\"" + token1 + "\"</code>",
  typeof token1==="string" && token1.length === 36
);
token1 = CEL.nanoid(5, "abcdeFGHIJK42");
CUT.isTrue("nanoid(); 04 - size 5 & <code>\"abcdeFGHIJK42\"</code> - <code>\""
    + token1 + "\"</code>",
  typeof token1 === "string" && token1.length === 5
);


/* timestampID(); */
token1 = CEL.timestampID();
CUT.isTrue("timestampID(); 01 - default size 21 - <code>\"" + token1
    + "\"</code>",
  typeof token1 === "string" && token1.length === 21
);
token1 = CEL.timestampID(15);
CUT.isTrue("timestampID(); 02 - size 15 - <code>\"" + token1 + "\"</code>",
  typeof token1 === "string" && token1.length === 15
);
token1 = CEL.timestampID(36);
CUT.isTrue("timestampID(); 03 - size 36 - <code>\"" + token1 + "\"</code>",
  typeof token1 === "string" && token1.length === 36
);
token1 = CEL.timestampID(5, "abcdeFGHIJK42");
CUT.isTrue(
  "timestampID(); 04 - size 5 -> 12 & <code>\"abcdeFGHIJK42\"</code> - <code>\""
    + token1 + "\"</code>",
  typeof token1 === "string" && token1.length === 12
);


/* extend(); */
token1 = {a: "1", b: "2"};
token2 = {c: "3", d: "4", baz: {e: 5, fn: function (n) {return n * n; }}};
token3 = CEL.extend(true, {} , token1, token2);
CUT.isEqual("extend(); 01", "12345121",
  token3.a + token3.b + token3.c + token3.d + token3.baz.e + token3.baz.fn(11)
);
token3 = CEL.extend(false, {}, token1, token2);
CUT.isEqual("extend(); 2", "12345121",
  token3.a + token3.b + token3.c + token3.d + token3.baz.e + token3.baz.fn(11)
);
token3 = CEL.extend({}, token1, token2);
CUT.isEqual("extend(); 3", "12345121",
  token3.a + token3.b + token3.c + token3.d + token3.baz.e + token3.baz.fn(11)
);


/* obj2string(); */
CUT.isEqual("obj2string();",
  CEL.obj2string({str:"éáűőúöüóíÉÁŰŐÚÖÜÓÍ", bool:true, pi:3.141592653589793}),
  "str=%C3%A9%C3%A1%C5%B1%C5%91%C3%BA%C3%B6%C3%BC%C3%B3%C3%AD%C3%89%C3%81%C5%B0%C5%90%C3%9A%C3%96%C3%9C%C3%93%C3%8D&bool=true&pi=3.141592653589793"
);



/*getUrlVars(); */
CUT.isEqual(
  'getUrlVars(); prop order_by from <code>"?showall=true&order_by=updated&o=asc"</code>',
  "updated", CEL.getUrlVars("?showall=true&order_by=updated&o=asc")["order_by"]
);
CUT.isEqual("getUrlVars(); prop not found - undefined", undefined,
  CEL.getUrlVars("?showall=true&order_by=updated&o=asc")["order_by2"]
);
CUT.isEqual("getUrlVars(); empty object", "{}",
  JSON.stringify(CEL.getUrlVars("?"))
);


/* randomBoolean(); */
CUT.isEqual("randomBoolean();", typeof CEL.randomBoolean(), "boolean");


/* b64Decode(); */
/* b64Encode(); */
token1 = "✓ à \r\n\t árvíztűrő tükörfúrógép ÁRVÍZTŰRŐ TÜKÖRFÚRÓGÉP ,?;.:-_* ¤÷×¨¸´˙`˛°˘^ˇ~'+!%/=()|\\<> \" \/ #&@{}[]€ ÍÄíŁß 0123456789 asdfghjklqwertzuiopyxcvbnm ASDFGHJKLQWERTZUIOPYXCVBNM";
CUT.isEqual("b64Encode();",
  "4pyTIMOgIA0KCSDDoXJ2w616dMWxcsWRIHTDvGvDtnJmw7pyw7Nnw6lwIMOBUlbDjVpUxbBSxZAgVMOcS8OWUkbDmlLDk0fDiVAgLD87LjotXyogwqTDt8OXwqjCuMK0y5lgy5vCsMuYXsuHficrISUvPSgpfFw8PiAiIC8gIyZAe31bXeKCrCDDjcOEw63FgcOfIDAxMjM0NTY3ODkgYXNkZmdoamtscXdlcnR6dWlvcHl4Y3Zibm0gQVNERkdISktMUVdFUlRaVUlPUFlYQ1ZCTk0=",
  CEL.b64Encode(token1)
);
CUT.isEqual("b64Decode(); + b64Encode();",
  token1, CEL.b64Decode(CEL.b64Encode(token1))
);


/* sizeIn(); */
CUT.isEqual("sizeIn();", 5, CEL.sizeIn({"a": 1, "b": 2, "c": 3,
  [Symbol.iterator]: function () {}, [Symbol.toPrimitive]: function () {}
}));


/* strTruncate(); */
CUT.isEqual("strTruncate();", "Arthur Art... Arthur Dent Arthur Dent",
  CUT.join([
    CEL.strTruncate("Arthur Dent", 6),
    CEL.strTruncate("Arthur Dent", 6, "..."),
    CEL.strTruncate("Arthur Dent", 20),
    CEL.strTruncate("Arthur Dent", 20, "...")
  ])
);


/* strPropercase(); */
CUT.isTrue("strPropercase();",
  CEL.strPropercase("arthur conan doyle") === "Arthur Conan Doyle"
    && CEL.strPropercase("arthur conan   doyle") === "Arthur Conan   Doyle"
);


/* strTitlecase(); */
CUT.isTrue("strTitlecase();",
  CEL.strTitlecase("arthur conan doyle") === "Arthur Conan Doyle"
    && CEL.strTitlecase("arthur conan   doyle") === "Arthur Conan   Doyle"
);


/* strCapitalize(); */
CUT.isEqual("strCapitalize();", CEL.strCapitalize("lorEm Ipsum"),"Lorem ipsum");


/* strUpFirst(); */
CUT.isEqual("strUpFirst();", CEL.strUpFirst("lorEm Ipsum"), "LorEm Ipsum");


/* strDownFirst(); */
CUT.isEqual("strDownFirst();", CEL.strDownFirst("LorEm Ipsum"), "lorEm Ipsum");


/* trHTMLRemoveTags */
CUT.isEqual("strHTMLRemoveTags();","lorem ipsum dolor sit amet , consectetuer",
  CEL.strHTMLRemoveTags("<p><img src=\"x.js\" /><img src=\"x.js\"/><img src=\"x.js\">lorem</p><p><a href=\"#\"><b>ipsum<br /><br/><br>dolor</b></a><script src=\"x.js\"></script></p>< p>< img src=\"x.js\" />< img src=\"x.js\"/>< img src=\"x.js\">sit< /p>< p>< a href=\"#\">< b>amet< br />< br/>< br>, consectetuer< /b>< / b>< /a>< script src=\"x.js\">< /script>< /p>")
);


/* strReverse(); */
token1 = CEL.strReverse(
  "I've seen things you people wouldn't believe. Attack ships on fire off the shoulder of Orion. I watched C-beams glitter in the dark near the Tannhäuser Gate. All those moments will be lost in time, like tears in rain. Time to die."
);
CUT.isEqual("strReverse(); without unicode", token1,
  ".eid ot emiT .niar ni sraet ekil ,emit ni tsol eb lliw stnemom esoht llA .etaG resuähnnaT eht raen krad eht ni rettilg smaeb-C dehctaw I .noirO fo redluohs eht ffo erif no spihs kcattA .eveileb t'ndluow elpoep uoy sgniht nees ev'I"
);
token1 = CEL.strReverse(
  "I've seen things you people wouldn't believe. \uD834\uDF06 Attack ships on fire off the shoulder of Orion."
);
CUT.isEqual("strReverse(); with unicode 1", token1,
  ".noirO fo redluohs eht ffo erif no spihs kcattA \uD834\uDF06 .eveileb t'ndluow elpoep uoy sgniht nees ev'I"
);


/* strCodePoints(); */
CUT.isEqual("strCodePoints();",
  "[102,111,111,32,119558,32,98,97,114,32,119809,32,98,97,122]",
  JSON.stringify(CEL.strCodePoints("foo \uD834\uDF06 bar \uD835\uDC01 baz"))
);


/* strFromCodePoints(); */
token1 = "foo \uD834\uDF06 bar \uD835\uDC01 baz";
CUT.isEqual("strFromCodePoints(); + strCodePoints();", token1,
  CEL.strFromCodePoints(CEL.strCodePoints(token1))
);


/* strAt(); */
CUT.isTrue("strAt();",
  /* get */
     CEL.strAt("\uD834\uDF06 ab cd",0)   === "\uD834\uDF06"
  && CEL.strAt("ab \uD834\uDF06 cd", 3)  === "\uD834\uDF06"
  && CEL.strAt("ab cd \uD834\uDF06", -1) === "\uD834\uDF06"
  && CEL.strAt("ab \uD834\uDF06 cd", 0)  === "a"
  && CEL.strAt("ab \uD834\uDF06 cd", 5)  === "c"
  && CEL.strAt("ab \uD834\uDF06 cd", -1) === "d"
  && CEL.strAt("", 0)  === ""
  && CEL.strAt("", 3)  === ""
  && CEL.strAt("", -1) === ""
  /* set */
  && CEL.strAt("ab \uD834\uDF06 cde", 3, "X")   === "ab X cde"
  && CEL.strAt("ab \uD834\uDF06 cde", -5, "X")  === "ab X cde"
  && CEL.strAt("ab \uD834\uDF06 cde", -2, "X")  === "ab \uD834\uDF06 cXe"
  && CEL.strAt("ab \uD834\uDF06 cde", 13, "X")  === "ab \uD834\uDF06 cde"
  && CEL.strAt("ab \uD834\uDF06 cde", -13, "X") === "ab \uD834\uDF06 cde"
  && CEL.strAt("ab \uD834\uDF06 cde", 3, "")    === "ab  cde"
  && CEL.strAt("ab \uD834\uDF06 cde", -2, "")   === "ab \uD834\uDF06 ce"
  && CEL.strAt("ab \uD834\uDF06 cde", 12, "")   === "ab \uD834\uDF06 cde"
  && CEL.strAt("ab \uD834\uDF06 cde", -12, "")  === "ab \uD834\uDF06 cde"
);


/* strSplice */
CUT.isTrue("strSplice();",
     CEL.strSplice("\uD834\uDF06 ab cde",0, 10) === ""
  && CEL.strSplice("ab \uD834\uDF06 cde", 4, 1) === "ab \uD834\uDF06cde"
  && CEL.strSplice("ab \uD834\uDF06 cde", 4, 1, "X")  === "ab \uD834\uDF06Xcde"
  && CEL.strSplice("ab \uD834\uDF06 cde",4,1,"X","Y") ==="ab \uD834\uDF06XYcde"
  && CEL.strSplice("ab \uD834\uDF06 cde",4,2,"X","Y") ==="ab \uD834\uDF06XYde"
  && CEL.strSplice("ab \uD834\uDF06 cde", 5, 2, "")   === "ab \uD834\uDF06 e"
);


/* "unBind(); */
CUT.isTrue("unBind();",
  Array.isArray(CEL.unBind([].slice)({length: 3, 0: 4, 1: 5, 2: 6}))
);


/* bind(); */
token1 = [4, 5, 6];
CUT.isTrue("bind();", CEL.bind(token1.slice, token1)().length > 0);


/* constant(); */
CUT.isEqual("constant();", 3.14, CEL.constant(3.14)());


/* identity(); */
CUT.isEqual("identity();", 100, CEL.identity(60) + CEL.identity(40));


/* noop(); */
CUT.isEqual("noop();", undefined, CEL.noop());


/* T(); */
CUT.isTrue("T();", CEL.T());


/* F(); */
CUT.isFalse("F();", CEL.F());


/* strHTMLEscape(); */
CUT.isEqual("strHTMLEscape();",
  "&lt;a href=&quot;#&quot; target=&quot;_blank&quot;&gt;&amp;#64;echo&amp;#65;&lt;/a&gt;&apos;str2&apos;",
  CEL.strHTMLEscape('<a href="#" target="_blank">&#64;echo&#65;</a>\'str2\'')
);


/* strHTMLUnEscape(); */
CUT.isEqual("strHTMLUnEscape();",
  '<a href="#" target="_blank">&#64;echo&#65;</a>\'str2\'',
  CEL.strHTMLUnEscape(
    "&lt;a href=&quot;#&quot; target=&quot;_blank&quot;&gt;&amp;#64;echo&amp;#65;&lt;/a&gt;&apos;str2&#39;"
  )
);


/* unique(); */
token1 = [
  { "name": "Picard", "rank": "captain" },
  { "name": "Riker", "rank": "captain" },
  { "name": "Data", "rank": "commander" },
  { "name": "Troi", "rank": "commander" }
];
CUT.isEqual("unique(); 01", "[4,7,5,6]",
  JSON.stringify(CEL.unique([4, 7, 5, 5, 6, 7]))
);
CUT.isEqual("unique(); 02",
  JSON.stringify(CEL.unique(token1, "rank")),
 "[{\"name\":\"Picard\",\"rank\":\"captain\"},{\"name\":\"Data\",\"rank\":\"commander\"}]"
);
CUT.isEqual("unique(); 03",
  JSON.stringify(CEL.unique(token1, (v) => v.rank)),
 "[{\"name\":\"Picard\",\"rank\":\"captain\"},{\"name\":\"Data\",\"rank\":\"commander\"}]"
);


/* count(); */
CUT.isTrue("count();",
  CEL.count([1,2,3,4,5,6,7], (x) => x > 3) === 4
    && CEL.count([1,2,3], (x) => x > 3) === 0
    && CEL.count([4,5,6], (x) => x > 3) === 3
);


/* arrayDeepClone(); */
token1 = [[0, 1, [2]], [4, 5, [6]]];
token2 = CEL.arrayDeepClone(token1);
CUT.isTrue("arrayDeepClone();",
  JSON.stringify(token1) === JSON.stringify(token2)
  && !(token1          === token2)
  && !(token1[0]       === token2[0])
  &&  (token1[0][0]    === token2[0][0])
  &&  (token1[0][1]    === token2[0][1])
  && !(token1[0][2]    === token2[0][2])
  &&  (token1[0][2][0] === token2[0][2][0])
  && !(token1[1]       === token2[1])
  &&  (token1[1][0]    === token2[1][0])
  &&  (token1[1][1]    === token2[1][1])
  && !(token1[1][2]    === token2[1][2])
  &&  (token1[1][2][0] === token2[1][2][0])
);


/* withOut(); */
CUT.isEqual("withOut();", "[\"a\",\"c\"]",
  JSON.stringify(CEL.withOut(["a", "b", "c", "d"], ["b", "d"]))
);


/* partition(); */
CUT.isEqual("partition();", "[[2,7,34],[-5,-9]]",
  JSON.stringify(CEL.partition([-5, 2, -9, 7, 34], (e) => (e > 0)))
);


/* initial(); */
CUT.isTrue("initial();",
  CEL.isDeepStrictEqual(CEL.initial(["a", "b", "c", "d"]), ["a", "b", "c"])
);


/* iterRange(); */
CUT.isEqual("iterRange(); 01", "10 13 16 19",
  CUT.join(CEL.iterRange(10, 3, 20))
);
CUT.isEqual("iterRange(); 02", "10 13.5 17",
  CUT.join(CEL.iterRange(10, 3.5, 20))
);


/* iterCycle(); */
CUT.isEqual("iterCycle(); 01", "a b c a b c a b c a b c a b c",
  // @ts-ignore
  CUT.join(CEL.iterCycle(["a", "b", "c"], 5))
);
CUT.isEqual("iterCycle(); 02", "10 13 16 19 10 13 16 19 10 13 16 19",
  // @ts-ignore
  CUT.join(CEL.iterCycle(CEL.iterRange(10, 3, 20), 3))
);
CUT.isEqual("iterCycle(); 03", "A B A B A B A",
  // @ts-ignore
  CUT.join(CUT.take(CEL.iterCycle(['A', 'B']), 7))
);


/* iterRepeat(); */
// @ts-ignore
CUT.isEqual("iterRepeat(); 01", "AB AB AB", CUT.join(CEL.iterRepeat("AB", 3)));
CUT.isEqual("iterRepeat(); 02", "AB AB AB AB AB",
  // @ts-ignore
  CUT.join(CUT.take(CEL.iterRepeat("AB"), 5))
);


/* forEach(); */
token1 = "";
CEL.forEach([1, 2, 3], function (e) { token1 += (e * 2); });
CUT.isEqual("forEach(); 01", "246", token1);
token1 = "";
CEL.forEach("cat, dog, pig", function (e) { token1 += e.toUpperCase(); });
CUT.isEqual("forEach(); 02", "CAT, DOG, PIG", token1);
token1 = "";
// @ts-ignore
CEL.forEach(new Map([ ["foo", 3.14], ["bar", 42], ["baz", "Wilson"] ]),
  function (e,i) { token1 += i + "-" + e + "-"; }
);
CUT.isEqual("forEach(); 05", "0-foo,3.14-1-bar,42-2-baz,Wilson-",token1);
token1 = 0;
CEL.forEach(new Set([4, 5, 6]), function (e) { token1 += (e * 3); });
CUT.isEqual("forEach(); 06", 45, token1);
token1 = 0;
CEL.forEach((new Set([4,5,6])).values(), function (e) { token1+=(e * 3); });
CUT.isEqual("forEach(); 07", 45, token1);


/* forEachRight(); */
token1 = "";
CEL.forEachRight([1, 2, 3], function (e) { token1 += (e * 2); });
CUT.isEqual("forEachRight();", "642", token1);


/* map(); */
// @ts-ignore
CUT.isEqual("map(); 01", "2 4 6", CUT.join(CEL.map([1, 2, 3], (e) => e * 2)));
CUT.isEqual("map(); 02", "CAT, DOG, PIG",
  CUT.join(
    // @ts-ignore
    CEL.map("cat, dog, pig", (/** @type {number} */ e) => e.toUpperCase()),
    ""
  )
);
token1 = "";
// @ts-ignore
for (let item of CEL.map(
  new Map([ ["foo", 1], ["bar", 2], ["baz", 3] ]), (e) => [e[0], e[1] * 2])) {
  token1 += item[0] + item[1];
}
CUT.isEqual("map(); 04", "foo2bar4baz6", token1);
CUT.isEqual("map(); 05", "2 4 6",
  // @ts-ignore
  CUT.join(CEL.map(new Set([1, 2, 3]), (e) => e * 2))
);
CUT.isEqual("map(); 06", "3 6 9",
  // @ts-ignore
  CUT.join(CEL.map((new Set([1, 2, 3])).values(), (e) => e * 3))
);


/* take(); */
token1 = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
// @ts-ignore
CUT.isEqual("take(); 01", "", CUT.join(CEL.take(token1, 0)));
// @ts-ignore
CUT.isEqual("take(); 02", "A B C D E F G", CUT.join(CEL.take(token1, 7)));
// @ts-ignore
CUT.isEqual("take(); 03", "A B C D E F G H I J", CUT.join(CEL.take(token1, 12)));
// @ts-ignore
CUT.isEqual("take(); 04 - default 1", "A", CUT.join(CEL.take(token1)));


/* drop(); */
token1 = ["A", "B" , "C", "D", "E", "F", "G", "H", "I", "J"];
// @ts-ignore
CUT.isEqual("drop(); 01", "A B C D E F G H I J", CUT.join(CEL.drop(token1, 0)));
// @ts-ignore
CUT.isEqual("drop(); 02", "H I J", CUT.join(CEL.drop(token1, 7)));
// @ts-ignore
CUT.isEqual("drop(); 03", "", CUT.join(CEL.drop(token1, 12)));
// @ts-ignore
CUT.isEqual("drop(); 04", "B C D E F G H I J", CUT.join(CEL.drop(token1)));


/* filter(); */
CUT.isEqual("filter();", "4 5 6 7 8",
  // @ts-ignore
  CUT.join(CEL.filter([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], (v) => (v > 3 && v < 9)))
);


/* reject(); */
CUT.isEqual("reject();", "1 2 3 9 10",
  // @ts-ignore
  CUT.join(CEL.reject([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], (v) => (v > 3 && v < 9)))
);


/* slice(); */
token1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
// @ts-ignore
CUT.isEqual("slice(); 01", "1 2 3 4 5", CUT.join(CEL.slice(token1, 0, 4)));
// @ts-ignore
CUT.isEqual("slice(); 02", "6 7 8 9 10", CUT.join(CEL.slice(token1, 5)));
// @ts-ignore
CUT.isEqual("slice(); 03", "5 6 7 8 9", CUT.join(CEL.slice(token1, 4, 8)));
// @ts-ignore
CUT.isEqual("slice(); 04", "1 2 3 4 5 6 7 8 9 10", CUT.join(CEL.slice(token1)));


/* tail(); */
// @ts-ignore
CUT.isEqual("tail();", "2 3 4 5 6", CUT.join(CEL.tail([1, 2, 3, 4, 5, 6])));


/* takeWhile(); */
token1 = [0, 2, 4, 6, 8, 10, 12, 14, 16];
token2 = 0;
// @ts-ignore
for (let item of CEL.takeWhile(token1, (/** @type {number} */ e) => e < 10)) {
  token2 += item;
}
CUT.isEqual("takeWhile(); 01", token2, 20);
token2 = 0;
for (let item of CEL.takeWhile(token1, (/** @type {number} */ e) => e < 0)) {
  token2 += item;
}
CUT.isEqual("takeWhile(); 02", token2, 0);
token2 = 0;
for (let item of CEL.takeWhile(token1, (/** @type {number} */ e) => e < 30)) {
  token2 += item;
}
CUT.isEqual("takeWhile(); 03", token2, 72);


/* dropWhile(); */
token1 = [0, 2, 4, 6, 8, 10, 12, 14, 16];
token2 = 0;
for (let item of CEL.dropWhile(token1, (e) => (e<10))) { token2 += item; }
CUT.isEqual("dropWhile(); 01", token2, 52);
token2 = 0;
for (let item of CEL.dropWhile(token1, (e) => (e<30))) { token2 += item; }
CUT.isEqual("dropWhile(); 02", token2, 0);
token2 = 0;
for (let item of CEL.dropWhile(token1, (e) => (e< 0))) { token2 += item; }
CUT.isEqual("dropWhile(); 03", token2, 72);


/* item(); */
CUT.isEqual("item(); 01", "\uD834\uDF06 r undefined",
  CEL.item("foo \uD834\uDF06 bar", 4)
    + " " + CEL.item("foo \uD834\uDF06 bar", 8)
    + " " + CEL.item("foo \uD834\uDF06 bar", 12)
);
CUT.isEqual("item(); 02", "7 undefined",
  CUT.join([CEL.item([4, 5, 6, 7, 8], 3), CEL.item([4, 5, 6, 7, 8], 12)])
);
CUT.isEqual("item(); 03", "[\"b\",2] undefined",
  JSON.stringify(CEL.item(new Map([["a", 1], ["b", 2], ["c", 3]]), 1))
    + " " + CEL.item(new Map([["a", 1], ["b", 2], ["c", 3]]), 12)
);
CUT.isEqual("item(); 04", "6 undefined",
  JSON.stringify(CEL.item(new Set([3, 3, 4, 5, 5, 6, 7, 7, 8]), 3))
    + " " + CEL.item(new Set([3, 3, 4, 5, 5, 6, 7, 7, 8]), 12)
);


/* nth(); */
CUT.isEqual("nth(); 01", "\uD834\uDF06 r undefined",
  CEL.nth("foo \uD834\uDF06 bar", 4)
    + " " + CEL.nth("foo \uD834\uDF06 bar", 8)
    + " " + CEL.nth("foo \uD834\uDF06 bar", 12)
);
CUT.isEqual("nth(); 02", "7 undefined",
  CEL.nth([4, 5, 6, 7, 8], 3) + " " + CEL.nth([4, 5, 6, 7, 8], 12)
);
CUT.isEqual("nth(); 03", "[\"b\",2] undefined",
  JSON.stringify(CEL.nth(new Map([["a", 1], ["b", 2], ["c", 3]]), 1))
    + " " + CEL.nth(new Map([["a", 1], ["b", 2], ["c", 3]]), 12)
);
CUT.isEqual("nth(); 04", "6 undefined",
  JSON.stringify(CEL.nth(new Set([3, 3, 4, 5, 5, 6, 7, 7, 8]), 3))
    + " " + CEL.nth(new Set([3, 3, 4, 5, 5, 6, 7, 7, 8]), 12)
);


/* size(); */
CUT.isEqual("size();", 6, CEL.size([4, 5, 6, 7, 8, 9]));


/* first(); */
CUT.isEqual("first();", 4, CEL.first([4, 5, 6, 7, 8, 9]));


/* head(); */
CUT.isEqual("head();", 4, CEL.head([4, 5, 6, 7, 8, 9]));


/* last(); */
CUT.isEqual("last();", 9, CEL.last([4, 5, 6, 7, 8, 9]));


/* reverse(); */
CUT.isEqual("reverse();", "[\"last\",9,8,7,6,5,4,\"first\"]",
  JSON.stringify([...CEL.reverse(["first", 4, 5, 6, 7, 8, 9, "last"])])
);


/* sort(); */
CUT.isEqual("sort(); 01", "[4,5,6,7,8,9,\"first\",\"last\"]",
  JSON.stringify([...CEL.sort(["first", 4, 5, 6, 7, 8, 9, "last"])])
);
CUT.isEqual("sort(); 02", "[\"first\",4,5,6,7,8,9,\"last\"]",
  JSON.stringify([...CEL.sort(["first", 4, 5, 6, 7, 8, 9, "last"], true)])
);
CUT.isEqual("sort(); 03", "[1,10,7,9]",
  JSON.stringify([...CEL.sort([7, 1, 10, 9])])
);
CUT.isEqual("sort(); 04", "[1,7,9,10]",
  JSON.stringify([...CEL.sort([7, 1, 10, 9], true)])
);


/* shuffle(); */
token1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
CUT.isFalse("shuffle();", CEL.isDeepStrictEqual(CEL.shuffle(token1), token1));


/* includes(); */
CUT.isTrue("includes(); 01",
      CEL.includes([4, 5, 6, 7, 8, 9], 9)
  && !CEL.includes([4, 5, 6, 7, 8, 9], 10)
  &&  CEL.includes([4, 5, 6, 7, 8, 0], 0)
  && !CEL.includes([4, 5, 6, 7, 8, -0], 0, Object.is)
  && !CEL.includes(5, 0)
  && !CEL.includes(true, 0)
  && !CEL.includes(new WeakMap(), 0)
  && !CEL.includes(new WeakSet(), 0)
  &&  CEL.includes("lorem ipsum", "ips")
  && !CEL.includes("lorem ipsum", "ipx")
  &&  CEL.includes(new String("lorem ipsum"), "ips")
  && !CEL.includes(new String("lorem ipsum"), "ipx")
  // @ts-ignore
  &&  CEL.includes(new Map([["lorem","ipsum"],[0, 1]]), "lorem")
  // @ts-ignore
  &&  CEL.includes(new Map([["lorem","ipsum"],[0, 1]]), 1)
  // @ts-ignore
  && !CEL.includes(new Map([["lorem","ipsum"],[0, 1]]), 2)
  // @ts-ignore
  &&  CEL.includes(new Map([["lorem","ipsum"],[0, 1]]), -0)
  // @ts-ignore
  && !CEL.includes(new Map([["lorem","ipsum"],[0, 1]]), -0, Object.is)
  &&  CEL.includes(new Set(["lorem","ipsum",0, 1]), -0)
  && !CEL.includes(new Set(["lorem","ipsum",0, 1]), -0, Object.is)
  && !CEL.includes(new Set(["lorem","ipsum",0, 1]), 2)
  // @ts-ignore
  &&  CEL.includes({"lorem": "ipsum","1": 0}, "lorem")
  // @ts-ignore
  &&  CEL.includes({"lorem": "ipsum","1": 0}, -0)
  // @ts-ignore
  && !CEL.includes({"lorem": "ipsum","1": 0}, 1)
  // @ts-ignore
  && !CEL.includes({"lorem": "ipsum","1": 0}, -0, Object.is)
);
// @ts-ignore
CUT.isError("includes(); 02 error", () => CEL.includes([], 2, 2));


/* find(); */
CUT.isEqual("find(); 01", 6, CEL.find([4, 5, 6, 7, 8, 9], (v) => (v > 5)));
CUT.isEqual("find(); 02", undefined, CEL.find([4, 5, 6, 7, 8, 9],(v) => (v>11)));


/* findLast(); */
CUT.isTrue("findLast();",
  CEL.findLast([4, 1, 7, 2, 9], (v) => v < 5) === 2
    && CEL.findLast([4, 1, 7, 2, 9], (v) => v > 10) === undefined
);


/* every(); */
/* every(); */
CUT.isTrue("every(); 01", CEL.every([2, 9, 3, 5, 8], (v) => v > 1));
CUT.isFalse("every(); 02", CEL.every([2, 9, 3, 5, 8], (v)=> v > 3));
CUT.isFalse("every(); 03", CEL.every([2, 9, 3, 5, 8], (v) =>v < 0));
CUT.isFalse("every(); 04", CEL.every([], (v) => v > 3));


/* some(); */
CUT.isTrue("some(); 01", CEL.some([2, 9, 3, 5, 8], (v) => v > 3));
CUT.isFalse("some(); 02", CEL.some([2, 9, 3, 5, 8], (v) => v < 0));
CUT.isFalse("some(); 03", CEL.some([], (v) => v < 0));


/* none(); */
CUT.isTrue("none(); 01", CEL.none([2, 9, 3, 5, 8], (v) => v < 0));
CUT.isFalse("none(); 02", CEL.none([2, 9, 3, 5, 8], (v) => v > 1));
CUT.isFalse("none(); 03", CEL.none([2, 9, 3, 5, 8], (v) => v > 3));
CUT.isTrue("none(); 04", CEL.none([], (v) => v > 3));


/* takeRight(); */
token1 = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
CUT.isEqual("takeRight(); 01", "", CUT.join(CEL.takeRight(token1, 0)));
CUT.isEqual("takeRight(); 02", "J I H G F E D",
  CUT.join(CEL.takeRight(token1, 7))
);
CUT.isEqual("takeRight(); 03", "J I H G F E D C B A",
  CUT.join(CEL.takeRight(token1, 12))
);
CUT.isEqual("takeRight(); 04", "J", CUT.join(CEL.takeRight(token1)));


/* dropRight(); */
token1 = ["J", "I", "H", "G", "F", "E", "D", "C", "B", "A"];
CUT.isEqual("dropRight(); 01", "A B C D E F G H I J",
  CUT.join(CEL.dropRight(token1, 0))
);
CUT.isEqual("dropRight(); 02", "H I J", CUT.join(CEL.dropRight(token1, 7)));
CUT.isEqual("dropRight(); 03", "", CUT.join(CEL.dropRight(token1, 12)));
CUT.isEqual("dropRight(); 04", "B C D E F G H I J",
  CUT.join(CEL.dropRight(token1))
);


/* takeRightWhile(); */
token1 = [16, 14, 12, 10, 8, 6, 4, 2, 0];
token2 = 0;
// @ts-ignore
for (let item of CEL.takeRightWhile(token1, (e) => e < 10)) { token2 += item; }
CUT.isEqual("takeRightWhile(); 01", token2, 20);
token2 = 0;
for (let item of CEL.takeRightWhile(token1, (e) => e < 0)) { token2 += item; }
CUT.isEqual("takeRightWhile(); 02", token2, 0);
token2 = 0;
for (let item of CEL.takeRightWhile(token1, (e) => e < 30)) { token2 += item; }
CUT.isEqual("takeRightWhile(); 03", token2, 72);


/* dropRightWhile(); */
token1 = [16, 14, 12, 10, 8, 6, 4, 2, 0];
token2 = 0;
for (let item of CEL.dropRightWhile(token1, (e) => e < 10)) { token2 += item; }
CUT.isEqual("dropRightWhile(); 01", token2, 52);
token2 = 0;
for (let item of CEL.dropRightWhile(token1, (e) => e < 30)) { token2 += item; }
CUT.isEqual("dropRightWhile(); 02", token2, 0);
token2 = 0;
for (let item of CEL.dropRightWhile(token1, (e) => e < 0)) { token2 += item; }
CUT.isEqual("dropRightWhile(); 03", token2, 72);


/* concat(); */
CUT.isEqual("concat(); 01", "[4,5,6]",
  JSON.stringify([...CEL.concat([4, 5, 6])])
);
CUT.isEqual("concat(); 02", "[\"1\",\"2\",\"3\",4,5,6,7,8,9,10]",
  JSON.stringify([...CEL.concat("123", [4, 5, 6].values(),
  new Set([7, 8, 9]), 10)])
);


/* reduce(); */
CUT.isEqual("reduce(); 01", 39,
  CEL.reduce([4, 5, 6, 7, 8, 9].values(), (acc, v, _i) => acc + v, 0)
);
CUT.isEqual("reduce(); 02", 39,
  CEL.reduce([4, 5, 6, 7, 8, 9].values(), (acc, v, _i) => acc + v)
);


/* enumerate(); */
CUT.isEqual("enumerate(); 01",
  JSON.stringify([...CEL.enumerate(["Picard", "Riker", "Data"])]),
  "[[0,\"Picard\"],[1,\"Riker\"],[2,\"Data\"]]"
);
CUT.isEqual("enumerate(); 02",
  JSON.stringify([...CEL.enumerate(["Picard", "Riker", "Data"], 2)]),
  "[[2,\"Picard\"],[3,\"Riker\"],[4,\"Data\"]]"
);


/* flat(); */
CUT.isEqual("flat();", "[1,2,3,4,5,6,7,8,9,10]",
  JSON.stringify([...CEL.flat([[1, 2, 3].values(),
  new Set([4, 5, 6, 6, 7, 7, 4]), [8, 9], 10])])
);


/* join(); */
// @ts-ignore
var token1 = [2, 4, 6, 4, 8, 2];
CUT.isEqual("join();",
  "2,4,6,4,8,2 2468 2;4;6;8 2x4x6x8 2true4true6true8 2114116118 ",
  CUT.join([
    CEL.join(token1),
    CEL.join(new Set(token1), ""),
    CEL.join(new Set(token1), ";"),
    CEL.join(new Set(token1), "x"),
    // @ts-ignore
    CEL.join(new Set(token1), true),
    // @ts-ignore
    CEL.join(new Set(token1), 11),
    CEL.join([])
  ])
);


/* arrayCycle(); begin */
CUT.isEqual("arrayCycle(); 01",
  JSON.stringify(CEL.arrayCycle([4, true, "fgh", 3.14], 5)),
  "[4,true,\"fgh\",3.14,4,true,\"fgh\",3.14,4,true,\"fgh\",3.14,4,true,\"fgh\",3.14,4,true,\"fgh\",3.14]"
);
CUT.isEqual("arrayCycle(); 02",
  JSON.stringify(CEL.arrayCycle([6, 7])),
  "[6,7,6,7,6,7,6,7,6,7,6,7,6,7,6,7,6,7,6,7,6,7,6,7,6,7,6,7,6,7,6,7,6,7,6,7,6,7,6,7,6,7,6,7,6,7,6,7,6,7,6,7,6,7,6,7,6,7,6,7,6,7,6,7,6,7,6,7,6,7,6,7,6,7,6,7,6,7,6,7,6,7,6,7,6,7,6,7,6,7,6,7,6,7,6,7,6,7,6,7,6,7,6,7,6,7,6,7,6,7,6,7,6,7,6,7,6,7,6,7,6,7,6,7,6,7,6,7,6,7,6,7,6,7,6,7,6,7,6,7,6,7,6,7,6,7,6,7,6,7,6,7,6,7,6,7,6,7,6,7,6,7,6,7,6,7,6,7,6,7,6,7,6,7,6,7,6,7,6,7,6,7,6,7,6,7,6,7,6,7,6,7,6,7,6,7,6,7,6,7]"
);
CUT.isEqual("arrayCycle(); 03",
  JSON.stringify(CEL.arrayCycle(new Map([[2, 3], [3, 4], [4, 5]]).keys(), 10)),
  "[2,3,4,2,3,4,2,3,4,2,3,4,2,3,4,2,3,4,2,3,4,2,3,4,2,3,4,2,3,4]"
);
CUT.isEqual("arrayCycle(); 04",
  JSON.stringify(CEL.arrayCycle(new Map([[3, 4], [4, 5]]).entries())),
  "[[3,4],[4,5],[3,4],[4,5],[3,4],[4,5],[3,4],[4,5],[3,4],[4,5],[3,4],[4,5],[3,4],[4,5],[3,4],[4,5],[3,4],[4,5],[3,4],[4,5],[3,4],[4,5],[3,4],[4,5],[3,4],[4,5],[3,4],[4,5],[3,4],[4,5],[3,4],[4,5],[3,4],[4,5],[3,4],[4,5],[3,4],[4,5],[3,4],[4,5],[3,4],[4,5],[3,4],[4,5],[3,4],[4,5],[3,4],[4,5],[3,4],[4,5],[3,4],[4,5],[3,4],[4,5],[3,4],[4,5],[3,4],[4,5],[3,4],[4,5],[3,4],[4,5],[3,4],[4,5],[3,4],[4,5],[3,4],[4,5],[3,4],[4,5],[3,4],[4,5],[3,4],[4,5],[3,4],[4,5],[3,4],[4,5],[3,4],[4,5],[3,4],[4,5],[3,4],[4,5],[3,4],[4,5],[3,4],[4,5],[3,4],[4,5],[3,4],[4,5],[3,4],[4,5],[3,4],[4,5],[3,4],[4,5],[3,4],[4,5],[3,4],[4,5],[3,4],[4,5],[3,4],[4,5],[3,4],[4,5],[3,4],[4,5],[3,4],[4,5],[3,4],[4,5],[3,4],[4,5],[3,4],[4,5],[3,4],[4,5],[3,4],[4,5],[3,4],[4,5],[3,4],[4,5],[3,4],[4,5],[3,4],[4,5],[3,4],[4,5],[3,4],[4,5],[3,4],[4,5],[3,4],[4,5],[3,4],[4,5],[3,4],[4,5],[3,4],[4,5],[3,4],[4,5],[3,4],[4,5],[3,4],[4,5],[3,4],[4,5],[3,4],[4,5],[3,4],[4,5],[3,4],[4,5],[3,4],[4,5],[3,4],[4,5],[3,4],[4,5],[3,4],[4,5],[3,4],[4,5],[3,4],[4,5],[3,4],[4,5],[3,4],[4,5],[3,4],[4,5],[3,4],[4,5],[3,4],[4,5],[3,4],[4,5],[3,4],[4,5],[3,4],[4,5],[3,4],[4,5],[3,4],[4,5],[3,4],[4,5],[3,4],[4,5],[3,4],[4,5],[3,4],[4,5],[3,4],[4,5]]"
);
/* arrayCycle(); end */


/* castArray(); */
CUT.isEqual("castArray(); 01",
  JSON.stringify(CEL.castArray("abc")),
  "[\"abc\"]"
);
CUT.isEqual("castArray(); 02",
  JSON.stringify(CEL.castArray(3)),
  "[3]"
);
CUT.isEqual("castArray(); 03",
  JSON.stringify(CEL.castArray([3, 4, 5])),
  "[3,4,5]"
);
CUT.isEqual("castArray(); 04", JSON.stringify(CEL.castArray()), "[]");
CUT.isEqual("castArray(); 05", JSON.stringify(CEL.castArray(null)), "[null]");


/* compact(); */
CUT.isEqual("compact(); 01", JSON.stringify(CEL.compact([])), "[]");
CUT.isEqual("compact(); 02",
  JSON.stringify(
    CEL.compact(
      [0, 1, false, 2, "", 3, null, 4, undefined, 5, NaN, "dsfsd", true]
    )
  ),
  "[0,1,2,3,4,5,\"dsfsd\",true]"
);


/* arrayRepeat(); */
CUT.isEqual("arrayRepeat(); 01",
  JSON.stringify(CEL.arrayRepeat("abc", 8)),
  "[\"abc\",\"abc\",\"abc\",\"abc\",\"abc\",\"abc\",\"abc\",\"abc\"]"
);
CUT.isEqual("arrayRepeat(); 02",
  JSON.stringify(CEL.arrayRepeat(3)),
  "[3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3]"
);


/* arrayRange(); */
CUT.isEqual("arrayRange(); 01", "[5,6,7]",
  JSON.stringify(CEL.arrayRange(5, 7))
);
CUT.isEqual("arrayRange(); 02", "[1,4,7,10,13,16]",
  JSON.stringify(CEL.arrayRange(1, 16, 3))
);
CUT.isEqual("arrayRange(); 03 - <i>(can be failed - float)<i>",
  "[1,4.2,7.4,10.600000000000001,13.8,17]",
  JSON.stringify(CEL.arrayRange(1, 17, 3.2))
);
CUT.isEqual("arrayRange(); 04",
  JSON.stringify(CEL.arrayRange()),
  "[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99]"
);
CUT.isEqual("arrayRange(); 05",
  "[90,91,92,93,94,95,96,97,98,99]", JSON.stringify(CEL.arrayRange(90))
);


/* zip(); */
CUT.isEqual("zip(); ES5 1", "[[\"a1\",\"c1\"],[\"a2\",\"c2\"],[\"a3\",\"c3\"]]",
  JSON.stringify(CEL.zip(["a1", "a2", "a3"], ["c1", "c2", "c3", "c4", "c5"]))
);
CUT.isEqual("zip(); ES5 2",
  "[[\"a1\",\"b1\",\"c1\",\"d1\",\"e1\"],[\"a2\",\"b2\",\"c2\",\"d2\",\"e2\"]]",
  JSON.stringify(CEL.zip(
    ["a1", "a2", "a3"],
    ["b1", "b2", "b3"],
    ["c1", "c2", "c3", "c4", "c5"],
    ["d1", "d2"],
    ["e1", "e2", "e3", "e4"]
  ))
);
CUT.isEqual("zip(); ES6 1", "[[\"a\",3],[\"b\",4],[\"c\",5],[\"d\",6]]",
  JSON.stringify(CEL.zip(
    new Set(["a", "b", "c", "d"]),
    new Map([[2, 3], [3, 4], [4, 5], [5, 6], [6, 7], [7, 8], [8, 9]]).values()
  ))
);
CUT.isEqual("zip(); ES6 2",
  "[[\"a\",3,\"c1\"],[\"b\",4,\"c2\"],[\"c\",5,\"c3\"],[\"d\",6,\"c4\"]]",
  JSON.stringify(CEL.zip(new Set(["a", "b", "c", "d"]),
    new Map([[2, 3], [3, 4], [4, 5], [5, 6], [6, 7], [7, 8], [8, 9]]).values(),
    ["c1", "c2", "c3", "c4", "c5"].values()
  ))
);


/* unzip(); */
CUT.isEqual("unzip(); ES5",
  "[[\"a1\",\"a2\"],[\"b1\",\"b2\"],[\"c1\",\"c2\"],[\"d1\",\"d2\"],[\"e1\",\"e2\"]]",
  JSON.stringify(CEL.unzip(CEL.zip(
    ["a1", "a2", "a3"],
    ["b1", "b2", "b3"],
    ["c1", "c2", "c3", "c4", "c5"],
    ["d1", "d2"],
    ["e1", "e2", "e3", "e4"]
  )))
);
CUT.isEqual("unzip(); ES6",
  "[[\"a\",\"b\",\"c\",\"d\"],[3,4,5,6],[\"c1\",\"c2\",\"c3\",\"c4\"]]",
  JSON.stringify(CEL.unzip(CEL.zip(new Set(["a", "b", "c", "d"]),
    new Map([[2, 3], [3, 4], [4, 5], [5, 6], [6, 7], [7, 8], [8, 9]]).values(),
      ["c1", "c2", "c3", "c4", "c5"].values()
  ).values()))
);


/* zipObj(); */
CUT.isEqual("zipObj();", "{\"a\":1,\"b\":2,\"c\":3}",
  JSON.stringify(CEL.zipObj(["a", "b", "c"], [1, 2, 3]))
);


/* min(); */
CUT.isEqual("min(); 01", 11, CEL.min(...[21, 11, 41, 51, 31]));
CUT.isEqual("min(); 02", 11, CEL.min(...new Set([21, 11, 41, 51, 31])));
CUT.isEqual("min(); 03", CEL.min(5, 10, 3), 3);


/* max(); */
CUT.isEqual("max(); 01", 51, CEL.max(...[21, 11, 41, 51, 31]));
CUT.isEqual("max(); 02", 51, CEL.max(...new Set([21, 51, 31]).keys()));
CUT.isEqual("max(); 03", CEL.max(5, 10, 3), 10);


/* isSuperset(); */
CUT.isTrue("isSuperset();",
      CEL.isSuperset([3,58,95,88], [88,95])
  &&  CEL.isSuperset(new Set([3, 11, 58, 95, 88]), [88, 95, 11].values())
  && !CEL.isSuperset([84,95], [3,58,95])
  && !CEL.isSuperset(new Set([88, 95, 11, 84]).keys(), [3, 11, 58,95,88].keys())
);


/* Set helper function */
const __setEquals__ = (s1, s2) =>
  ((s1 instanceof Set) && (s2 instanceof Set) && (s1.size === s2.size)
    && (JSON.stringify([...s1]) === JSON.stringify([...s2])));


/* setUnion(); */
CUT.isTrue("setUnion();",
  __setEquals__(
    CEL.setUnion(
      new Map([[2, 1], [3, 2], [4, 3], [5, 4]]).values(),
      new Set([3, 4, 5, 6]), [5 , 6, 7, 8]
    ),
    CEL.setUnion(
      [1, 2, 3, 4],
      new Map([[2,3], [3, 4], [4, 5], [5, 6]]).values(),
      new Set([5, 6, 7, 8]).values()
    )
  )
);


/* setIntersection(); */
CUT.isTrue("setIntersection();",
  __setEquals__(
    new Set([2, 3]), CEL.setIntersection(new Set([1, 2, 3]), new Set([2, 3, 4]))
  )
);


/* setDifference(); */
CUT.isTrue("setDifference();",
  __setEquals__(
    new Set([1, 2]),
    CEL.setDifference(new Set([1, 2, 3, 4]), new Set([3, 4, 5, 6]))
  )
);


/* setSymmetricDifference(); */
CUT.isTrue("setSymmetricDifference();",
  __setEquals__(
    new Set([1, 3]), CEL.setSymmetricDifference(new Set([1, 2]), new Set([2, 3]))
  )
);


/* arrayClear(); */
token1 = [4, 5, 6];
token2 = CEL.arrayClear(token1);
CUT.isTrue("arrayClear();",
  (token1 === token2 && token1.length === 0 && Array.isArray(token1))
);


/* arrayremove(); begin */
token1 = [1, 2, 3, 4, 5, 6, 5, 7, 8, 5, 9, 0];
CUT.isTrue("arrayRemove(); 01", CEL.arrayRemove(token1, 6));
CUT.isFalse("arrayRemove(); 02", CEL.arrayRemove(token1, 6));
CUT.isEqual("arrayRemove(); 03",
  "[1,2,3,4,5,5,7,8,5,9,0]", JSON.stringify(token1)
);
token1 = [1, 2, 3, 4, 5, 6, 5, 7, 8, 5, 9, 0];
CUT.isTrue("arrayRemove(); 04", CEL.arrayRemove(token1, 6, true));
CUT.isFalse("arrayRemove(); 05", CEL.arrayRemove(token1, 6, true));
CUT.isEqual("arrayRemove(); 06",
  "[1,2,3,4,5,5,7,8,5,9,0]", JSON.stringify(token1)
);
token1 = [1, 2, 3, 4, 5, 6, 5, 7, 8, 5, 9, 0];
CUT.isTrue("arrayRemove(); 07", CEL.arrayRemove(token1, 5));
CUT.isTrue("arrayRemove(); 08", CEL.arrayRemove(token1, 5, false));
CUT.isEqual("arrayRemove(); 09",
  "[1,2,3,4,6,7,8,5,9,0]", JSON.stringify(token1)
);
token1 = [1, 2, 3, 4, 5, 6, 5, 7, 8, 5, 9, 0];
CUT.isTrue("arrayRemove(); 10", CEL.arrayRemove(token1, 5, true));
CUT.isFalse("arrayRemove(); 11", CEL.arrayRemove(token1, 5, true));
CUT.isEqual("arrayRemove(); 12", "[1,2,3,4,6,7,8,9,0]", JSON.stringify(token1));
token1 = [1, 2, 3, 4, 5, 6, 5, 7, 8, 5, 9, 0];
CUT.isFalse("arrayRemove(); 13", CEL.arrayRemove(token1, 11));
CUT.isFalse("arrayRemove(); 14", CEL.arrayRemove(token1, 11, true));
CUT.isEqual("arrayRemove(); 15",
  "[1,2,3,4,5,6,5,7,8,5,9,0]", JSON.stringify(token1)
);
/* arrayremove(); end */


/* arrayremoveby(); begin */
token1 = [1, 3, 2, 4, 5, 9, 3, 2];
CUT.isTrue("arrayRemoveBy(); 01", CEL.arrayRemoveBy(token1, (v) => (v > 6)));
CUT.isFalse("arrayRemoveBy(); 02", CEL.arrayRemoveBy(token1, (v) => (v > 6)));
CUT.isEqual("arrayRemoveBy(); 03", "[1,3,2,4,5,3,2]", JSON.stringify(token1));
token1 = [1, 3, 2, 4, 5, 9, 3, 2];
CUT.isTrue("arrayRemoveBy(); 04",
  CEL.arrayRemoveBy(token1, (v) => (v > 6), true)
);
CUT.isFalse("arrayRemoveBy(); 05",
  CEL.arrayRemoveBy(token1, (v) => (v > 6), true)
);
CUT.isEqual("arrayRemoveBy(); 06", "[1,3,2,4,5,3,2]", JSON.stringify(token1));
token1 = [1, 3, 2, 4, 5, 9, 3, 2];
CUT.isTrue("arrayRemoveBy(); 07", CEL.arrayRemoveBy(token1, (v) => (v > 3)));
CUT.isTrue("arrayRemoveBy(); 08",
  CEL.arrayRemoveBy(token1, (v) => (v >3), false)
);
CUT.isEqual("arrayRemoveBy(); 09", "[1,3,2,9,3,2]", JSON.stringify(token1));
token1 = [1, 3, 2, 4, 5, 9, 3, 2];
CUT.isTrue("arrayRemoveBy(); 10",
  CEL.arrayRemoveBy(token1, (v) => (v > 3), true)
);
CUT.isFalse("arrayRemoveBy(); 11",
  CEL.arrayRemoveBy(token1, (v) => (v > 3), true)
);
CUT.isEqual("arrayRemoveBy(); 12", "[1,3,2,3,2]", JSON.stringify(token1));
token1 = [1, 3, 2, 4, 5, 9, 3, 2];
CUT.isFalse("arrayRemoveBy(); 13", CEL.arrayRemoveBy(token1, (v) => (v > 13)));
CUT.isFalse("arrayRemoveBy(); 14",
  CEL.arrayRemoveBy(token1, (v) => (v > 13), true)
);
CUT.isEqual("arrayRemoveBy(); 15", "[1,3,2,4,5,9,3,2]", JSON.stringify(token1));
/* arrayremoveby(); end */


/* arrayAdd(); */
token1 = [1, 2, 3, 5];
CUT.isTrue("arrayAdd(); 01", CEL.arrayAdd(token1, 4));
CUT.isFalse("arrayAdd(); 02", CEL.arrayAdd(token1, 4));
CUT.isEqual("arrayAdd(); 03", "[1,2,3,5,4]", JSON.stringify(token1));


/* arrayMerge(); */
token1 =  [1, 2, 3];
token2 =  [4, 5, 6];
token3 =  [7, 8, [10, 11, 12, [13, 14, 15]], 9];
token4 =  JSON.stringify(CEL.arrayMerge(token1, token2));
token4 += JSON.stringify(token1);
token1 =  [1,2,3];
token4 += JSON.stringify(CEL.arrayMerge(token1, token2, token3));
token4 += JSON.stringify(token1);
CUT.isEqual("arrayMerge();", token4,
  "[1,2,3,4,5,6]"
    + "[1,2,3,4,5,6]"
    + "[1,2,3,4,5,6,7,8,[10,11,12,[13,14,15]],9]"
    + "[1,2,3,4,5,6,7,8,[10,11,12,[13,14,15]],9]"
);


/* Math.sumPrecise(); begin */
// @ts-ignore
CUT.isEqual("Math.sumPrecise(); 01", Math.sumPrecise([]), -0);
// @ts-ignore
CUT.isEqual("Math.sumPrecise(); 02", Math.sumPrecise([Infinity]), Infinity);
CUT.isEqual("Math.sumPrecise(); 03", Infinity,
  // @ts-ignore
  Math.sumPrecise([0.1, 0.2, 1e20, -1e20, 1e20, Infinity])
);
// @ts-ignore
CUT.isEqual("Math.sumPrecise(); 04", Math.sumPrecise([-Infinity]), -Infinity);
CUT.isEqual("Math.sumPrecise(); 05", -Infinity,
  // @ts-ignore
  Math.sumPrecise([0.1, 0.2, 1e20, -1e20, 1e20, -Infinity])
);
CUT.isEqual("Math.sumPrecise(); 06",
  // @ts-ignore
  Math.sumPrecise([-4234233, 1e20]), 99999999999995770000
);
CUT.isEqual("Math.sumPrecise(); 07",
  // @ts-ignore
  Math.sumPrecise([-4234233.5, 1e20]), 99999999999995770000
);
CUT.isEqual("Math.sumPrecise(); 08",
  // @ts-ignore
  Math.sumPrecise([4234233, -1e20]), -99999999999995770000
);
CUT.isEqual("Math.sumPrecise(); 09",
  // @ts-ignore
  Math.sumPrecise([4234233.5, -1e20]), -99999999999995770000
);
CUT.isEqual("Math.sumPrecise(); 10", 1,
  // @ts-ignore
  Math.sumPrecise([0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1])
);
// @ts-ignore
CUT.isEqual("Math.sumPrecise(); 11", Math.sumPrecise([1, 2]), 3);
// @ts-ignore
CUT.isEqual("Math.sumPrecise(); 12", Math.sumPrecise([1, 2, 3]), 6);
// @ts-ignore
CUT.isEqual("Math.sumPrecise(); 13", Math.sumPrecise([42]), 42);
// @ts-ignore
CUT.isEqual("Math.sumPrecise(); 14", Math.sumPrecise([42, -98]), -56);
// @ts-ignore
CUT.isEqual("Math.sumPrecise(); 15", Math.sumPrecise([42, 3.14]), 45.14);
// @ts-ignore
CUT.isEqual("Math.sumPrecise(); 16", Math.sumPrecise([42, -53.14]), -11.14);
// @ts-ignore
CUT.isEqual("Math.sumPrecise(); 17", Math.sumPrecise([0.1, 0.2]),
  0.30000000000000004
);
// @ts-ignore
CUT.isEqual("Math.sumPrecise(); 18", Math.sumPrecise([1e20, 0.1, -1e20]), 0.1);
// @ts-ignore
CUT.isEqual("Math.sumPrecise(); 19", Math.sumPrecise([2, 1e20-1]),
  100000000000000000000
);
// @ts-ignore
CUT.isEqual("Math.sumPrecise(); 20", Math.sumPrecise([1e20, 0.1]),
  100000000000000000000
);
// @ts-ignore
CUT.isEqual("Math.sumPrecise(); 21", Math.sumPrecise([1e20]),
  100000000000000000000
);
// @ts-ignore
CUT.isEqual("Math.sumPrecise(); 22", Math.sumPrecise([-2, -1e20 + 1]),
  -100000000000000000000
);
// @ts-ignore
CUT.isEqual("Math.sumPrecise(); 23", Math.sumPrecise([0.1, -1e20]),
  -100000000000000000000
);
// @ts-ignore
CUT.isEqual("Math.sumPrecise(); 24", Math.sumPrecise([-1e20]),
  -100000000000000000000
);
CUT.isNotEqual("Math.sumPrecise(); 25", NaN,
  // @ts-ignore
  Math.sumPrecise([Infinity, 0.1, 0.2, -Infinity])
);
CUT.isNotEqual("Math.sumPrecise(); 26", NaN,
  // @ts-ignore
  Math.sumPrecise([-Infinity, 0.1, 0.2, Infinity])
);
// @ts-ignore
CUT.isNotEqual("Math.sumPrecise(); 27", NaN, Math.sumPrecise([0.1, 0.1, NaN]));
// @ts-ignore
CUT.isError("Math.sumPrecise(); 28", () => Math.sumPrecise(5));
// @ts-ignore
CUT.isError("Math.sumPrecise(); 29", () => Math.sumPrecise("1848"));
// @ts-ignore
CUT.isError("Math.sumPrecise(); 30", () => Math.sumPrecise("1848a"));
CUT.isError("Math.sumPrecise(); 31",
  // @ts-ignore
  () => Math.sumPrecise([0.1,0.1,0.1,0.1,0.1,0.1, 0.1, 0.1, 0.1, "0.1"])
);
CUT.isError("Math.sumPrecise(); 32",
  // @ts-ignore
  () => Math.sumPrecise([0.1,0.1,0.1,0.1,0.1, 0.1, 0.1, 0.1, 0.1, true])
);
CUT.isError("Math.sumPrecise(); 33",
  // @ts-ignore
  () => Math.sumPrecise(
    [0.1,0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, BigInt(5)]
  )
);
CUT.isError("Math.sumPrecise(); 34",
  // @ts-ignore
  () => Math.sumPrecise([Infinity,"0.1", 0.2])
);
CUT.isError("Math.sumPrecise(); 35",
  // @ts-ignore
  () => Math.sumPrecise([-Infinity, "0.1", 0.2])
);
CUT.isError("Math.sumPrecise(); 36",
  // @ts-ignore
  () => Math.sumPrecise([-Infinity, "1", 0.2])
);
/* Math.sumPrecise(); end */


/* Array.prototype.toReversed(); */
token1 = [4, 2, 5];
CUT.isTrue("Array.prototype.toReversed();",
  JSON.stringify(token1.toReversed()) === "[5,2,4]"
    && JSON.stringify(token1) === "[4,2,5]"
);


/* Array.prototype.toSorted(); */
token1 = [4, 2, 5];
CUT.isTrue("Array.prototype.toSorted();",
  JSON.stringify(token1.toSorted()) === "[2,4,5]"
    && JSON.stringify(token1) === "[4,2,5]"
);


/* Array.prototype.toSpliced(); */
token1 = [4, 2, 5];
CUT.isTrue("Array.prototype.toSpliced(); remove",
  JSON.stringify(token1.toSpliced(1, 1)) === "[4,5]"
    && JSON.stringify(token1) === "[4,2,5]"
);


/*Array.prototype.toSpliced(); */
token1 = [4, 2, 5];
CUT.isTrue("Array.prototype.toSpliced(); remove and add 2 items",
  JSON.stringify(token1.toSpliced(1, 1, 89, 79)) === "[4,89,79,5]"
    && JSON.stringify(token1) === "[4,2,5]"
);


/* Array.prototype.with(); */
token1 = [4, 2, 5];
CUT.isTrue("Array.prototype.with();",
  JSON.stringify(token1.with(1, 7)) === "[4,7,5]"
    && JSON.stringify(token1) === "[4,2,5]"
);


/* TypedArray.prototype.toReversed(); */
token1 = new Uint8Array([4, 2, 5]);
CUT.isTrue("TypedArray.prototype.toReversed();",
  JSON.stringify(token1.toReversed()) === "{\"0\":5,\"1\":2,\"2\":4}"
    && JSON.stringify(token1) === "{\"0\":4,\"1\":2,\"2\":5}"
);


/* TypedArray.prototype.toSorted(); */
token1 = new Uint8Array([4, 2, 5]);
CUT.isTrue("TypedArray.prototype.toSorted();",
  JSON.stringify(token1.toSorted()) === "{\"0\":2,\"1\":4,\"2\":5}"
    && JSON.stringify(token1) === "{\"0\":4,\"1\":2,\"2\":5}"
);


/*TypedArray.prototype.with(); */
token1 = new Uint8Array([4, 2, 5]);
CUT.isTrue("TypedArray.prototype.with();",
  JSON.stringify(token1.with(1,7)) === "{\"0\":4,\"1\":7,\"2\":5}"
    && JSON.stringify(token1) === "{\"0\":4,\"1\":2,\"2\":5}"
);


/* Object.groupBy(); */
CUT.isEqual("Object.groupBy();",
  JSON.stringify(Object.groupBy([
    { name: 'asparagus', type: 'vegetables', quantity: 9 },
    { name: 'bananas', type: 'fruit', quantity: 5 },
    { name: 'goat', type: 'meat', quantity: 23 },
    { name: 'cherries', type: 'fruit', quantity: 12 },
    { name: 'fish', type: 'meat', quantity: 3 }
  ], ({ quantity }) => (quantity < 6 ? "restock" : "sufficient"))),
  '{"sufficient":[{"name":"asparagus","type":"vegetables","quantity":9},{"name":"goat","type":"meat","quantity":23},{"name":"cherries","type":"fruit","quantity":12}],"restock":[{"name":"bananas","type":"fruit","quantity":5},{"name":"fish","type":"meat","quantity":3}]}'
);


/* Map.groupBy(); */
CUT.isEqual("Map.groupBy();",
  JSON.stringify(Array.from(Map.groupBy([
    { name: 'asparagus', type: 'vegetables', quantity: 9 },
    { name: 'bananas', type: 'fruit', quantity: 5 },
    { name: 'goat', type: 'meat', quantity: 23 },
    { name: 'cherries', type: 'fruit', quantity: 12 },
    { name: 'fish', type: 'meat', quantity: 3 }
  ], ({ quantity }) => (quantity < 6 ? "restock" : "sufficient")))),
  '[["sufficient",[{"name":"asparagus","type":"vegetables","quantity":9},{"name":"goat","type":"meat","quantity":23},{"name":"cherries","type":"fruit","quantity":12}]],["restock",[{"name":"bananas","type":"fruit","quantity":5},{"name":"fish","type":"meat","quantity":3}]]]'
);


/* crypto.randomUUID(); */
token1 = crypto.randomUUID();
CUT.isTrue("crypto.randomUUID(); <code>\"" + token1 + "\"</code>",
  token1.length === 36
    && /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/
      .test(token1)
    && token1[14] === "4"
    && "89ab".includes(token1[19])
);


/* Object.hasOwn(); */
token1 = {"a": 1, "b": 2};
token2 = [4, 5, 6];
CUT.isTrue("Object.hasOwn();",
      Object.hasOwn(token1, "a")
  && !Object.hasOwn(token1, "hasOwnProperty")
  && !Object.hasOwn(token1, "c")
  &&  Object.hasOwn(token2, "0")
  && !Object.hasOwn(token2, "map")
  && !Object.hasOwn(token2, "map2")
);


/* globalThis; */
CUT.isEqual("globalThis;", globalThis, globalThis);


/* GeneratorFunction(); */
// @ts-ignore
token1 = new GeneratorFunction("v", "yield v * 3; yield v * 4;");
// @ts-ignore
CUT.isEqual("GeneratorFunction();", "9 12", CUT.join(token1(3)));


/* AsyncFunction(); */
CUT.isEqual("AsyncFunction();", "asyncfunction",
  // @ts-ignore
  Object.prototype.toString.call(new AsyncFunction("a", "b",
    "return await resolveAfter2Seconds(a) + await resolveAfter2Seconds(b);"
  )).slice(8, -1).toLowerCase()
);


/* AsyncGeneratorFunction(); */
CUT.isEqual("AsyncGeneratorFunction();", "asyncgeneratorfunction",
  Object.prototype.toString.call(async function* () {}).slice(8, -1)
    .toLowerCase()
);


/* isSameType(); */
CUT.isTrue("isSameType();",
      CEL.isSameType(undefined, undefined)
  &&  CEL.isSameType(null, null)
  &&  CEL.isSameType(true, false)
  &&  CEL.isSameType(1n, 2n)
  &&  CEL.isSameType(Symbol(1), Symbol(2))
  &&  CEL.isSameType("Arthur", "Dent")
  &&  CEL.isSameType({"a": 1}, {"b": 2})
  &&  CEL.isSameType(function x(){}, function y(){})
  && !CEL.isSameType(null, undefined)
  && !CEL.isSameType(null, 0)
  && !CEL.isSameType(42, "42")
  && !CEL.isSameType(null, {})
  && !CEL.isSameType({}, null)
);


/* isSameInstance(); */
CUT.isTrue("isSameInstance(); 01",
  CEL.isSameInstance([], [], Array)
    && CEL.isSameInstance(new Map(), new Map(), Map)
    && CEL.isSameInstance(Object(42n), Object(3n), BigInt)
);
CUT.isFalse("isSameInstance(); 02",
  CEL.isSameInstance([], {"length": 0}, Array)
    || CEL.isSameInstance(new Map(), new Set(), Map)
    || CEL.isSameInstance(Object(42n), 3n, BigInt)
);


/* isCoercedObject(); */
CUT.isEqual("isCoercedObject(); 01", Number, CEL.isCoercedObject(Object(42)));
CUT.isEqual("isCoercedObject(); 02", BigInt, CEL.isCoercedObject(Object(42n)));
CUT.isEqual("isCoercedObject(); 03", String, CEL.isCoercedObject(Object("x")));
CUT.isEqual("isCoercedObject(); 04", Boolean, CEL.isCoercedObject(Object(!0)));
CUT.isFalse("isCoercedObject(); 05",
  CEL.isCoercedObject(42)
    || CEL.isCoercedObject(42n)
    || CEL.isCoercedObject("lorem")
    || CEL.isCoercedObject(true)
    || CEL.isCoercedObject({})
);


/* isDeepStrictEqual begin */
CUT.isFalse("isDeepStrictEqual(); 01b", CEL.isDeepStrictEqual(42, 43));
/* primitives / number + Object wrappers */
CUT.isTrue("isDeepStrictEqual(); 01a", CEL.isDeepStrictEqual(42, 42));
CUT.isFalse("isDeepStrictEqual(); 01b", CEL.isDeepStrictEqual(42, 43));
CUT.isTrue("isDeepStrictEqual(); 01c", CEL.isDeepStrictEqual(42, Object(42)));
CUT.isTrue("isDeepStrictEqual(); 01d", CEL.isDeepStrictEqual(Object(42), 42));
CUT.isFalse("isDeepStrictEqual(); 01e", CEL.isDeepStrictEqual(42, Object(43)));
CUT.isFalse("isDeepStrictEqual(); 01f", CEL.isDeepStrictEqual(Object(42), 43));
CUT.isTrue("isDeepStrictEqual(); 01g",
  CEL.isDeepStrictEqual(Object(42), Object(42))
);
CUT.isFalse("isDeepStrictEqual(); 01h",
  CEL.isDeepStrictEqual(Object(42), Object(43))
);
/* primitives / number: 0, -0, NaN, Infinity, -Infinity */
CUT.isTrue("isDeepStrictEqual(); 01i", CEL.isDeepStrictEqual(0, 0));
CUT.isTrue("isDeepStrictEqual(); 01j", CEL.isDeepStrictEqual(-0, -0));
CUT.isFalse("isDeepStrictEqual(); 01k", CEL.isDeepStrictEqual(-0, 0));
CUT.isFalse("isDeepStrictEqual(); 01l", CEL.isDeepStrictEqual(-0, +0));
CUT.isTrue("isDeepStrictEqual(); 01m", CEL.isDeepStrictEqual(NaN, NaN));
CUT.isTrue("isDeepStrictEqual(); 01n",
  CEL.isDeepStrictEqual(Infinity, Infinity)
);
CUT.isTrue("isDeepStrictEqual(); 01o",
  CEL.isDeepStrictEqual(-Infinity, -Infinity)
);
CUT.isFalse("isDeepStrictEqual(); 01p",
  CEL.isDeepStrictEqual(Infinity, -Infinity)
);
/* primitives / not same type */
CUT.isFalse("isDeepStrictEqual(); 01q", CEL.isDeepStrictEqual(42, "42"));
CUT.isFalse("isDeepStrictEqual(); 01r", CEL.isDeepStrictEqual(1, true));
CUT.isFalse("isDeepStrictEqual(); 01s", CEL.isDeepStrictEqual(1n, true));
CUT.isFalse("isDeepStrictEqual(); 01t", CEL.isDeepStrictEqual(1n, "1n"));
CUT.isFalse("isDeepStrictEqual(); 01u", CEL.isDeepStrictEqual(false, ""));
/* primitives / bigint + Object wrappers */
CUT.isTrue("isDeepStrictEqual(); 02a", CEL.isDeepStrictEqual(42n, 42n));
CUT.isFalse("isDeepStrictEqual(); 02b", CEL.isDeepStrictEqual(42n, 43n));
CUT.isTrue("isDeepStrictEqual(); 02c", CEL.isDeepStrictEqual(42n, Object(42n)));
CUT.isTrue("isDeepStrictEqual(); 02d", CEL.isDeepStrictEqual(Object(42n), 42n));
CUT.isFalse("isDeepStrictEqual(); 02e",
  CEL.isDeepStrictEqual(42n, Object(43n))
);
CUT.isFalse("isDeepStrictEqual(); 02f",
  CEL.isDeepStrictEqual(Object(42n), 43n)
);
CUT.isTrue("isDeepStrictEqual(); 02g",
  CEL.isDeepStrictEqual(Object(42n), Object(42n))
);
CUT.isFalse("isDeepStrictEqual(); 02h",
  CEL.isDeepStrictEqual(Object(42n), Object(43n))
);
/* primitives / string + Object wrappers */
CUT.isTrue("isDeepStrictEqual(); 02i", CEL.isDeepStrictEqual("lorem", "lorem"));
CUT.isFalse("isDeepStrictEqual(); 03b",
  CEL.isDeepStrictEqual("lorem", "ipsum")
);
CUT.isTrue("isDeepStrictEqual(); 03c",
  CEL.isDeepStrictEqual("lorem", Object("lorem"))
);
CUT.isTrue("isDeepStrictEqual(); 03d",
  CEL.isDeepStrictEqual(Object("lorem"), "lorem")
);
CUT.isFalse("isDeepStrictEqual(); 03e",
  CEL.isDeepStrictEqual("lorem", Object("ipsum"))
);
CUT.isFalse("isDeepStrictEqual(); 03f",
  CEL.isDeepStrictEqual(Object("lorem"), "ipsum")
);
CUT.isTrue("isDeepStrictEqual(); 03g",
  CEL.isDeepStrictEqual(Object("lorem"), Object("lorem"))
);
CUT.isFalse("isDeepStrictEqual(); 03h",
  CEL.isDeepStrictEqual(Object("lorem"), Object("ipsum"))
);
/* primitives / boolean + Object wrappers */
CUT.isTrue("isDeepStrictEqual(); 04a", CEL.isDeepStrictEqual(true, true));
CUT.isFalse("isDeepStrictEqual(); 04b", CEL.isDeepStrictEqual(true, false));
CUT.isTrue("isDeepStrictEqual(); 04c",
  CEL.isDeepStrictEqual(true, Object(true))
);
CUT.isTrue("isDeepStrictEqual(); 04d",
  CEL.isDeepStrictEqual(Object(true), true)
);
CUT.isFalse("isDeepStrictEqual(); 04e",
  CEL.isDeepStrictEqual(true, Object(false))
);
CUT.isFalse("isDeepStrictEqual(); 04f",
  CEL.isDeepStrictEqual(Object(true), false)
);
CUT.isTrue("isDeepStrictEqual(); 04g",
  CEL.isDeepStrictEqual(Object(true), Object(true))
);
CUT.isFalse("isDeepStrictEqual(); 04h",
  CEL.isDeepStrictEqual(Object(true), Object(false))
);
/* primitives / Symbol */
token1 = Symbol("Agradzsag");
token2 = Symbol("Agradzsag");
token3 = Symbol("Trillian");
CUT.isTrue("isDeepStrictEqual(); 05a", CEL.isDeepStrictEqual(token1, token1));
CUT.isFalse("isDeepStrictEqual(); 05b", CEL.isDeepStrictEqual(token1, token2));
CUT.isFalse("isDeepStrictEqual(); 05c", CEL.isDeepStrictEqual(token1, token3));
/* objects / Array */
CUT.isTrue("isDeepStrictEqual(); 06a", CEL.isDeepStrictEqual([1, 2], [1, 2]));
CUT.isFalse("isDeepStrictEqual(); 06b", CEL.isDeepStrictEqual([1, 2], [1, 3]));
CUT.isFalse("isDeepStrictEqual(); 06c",
  CEL.isDeepStrictEqual([1, 2], [1, "2"])
);
CUT.isFalse("isDeepStrictEqual(); 06d",
  CEL.isDeepStrictEqual([1, 2], [1, 2, 3])
);
/* objects / Set */
token1 = new Set([1, 2]);
token2 = new Set([1, 2]);
token3 = new Set([1, 3]);
token4 = new Set([1, "2"]);
token5 = new Set([1, 2, 3]);
CUT.isTrue("isDeepStrictEqual(); 07a", CEL.isDeepStrictEqual(token1, token2));
CUT.isFalse("isDeepStrictEqual(); 07b", CEL.isDeepStrictEqual(token1, token3));
CUT.isFalse("isDeepStrictEqual(); 07c", CEL.isDeepStrictEqual(token1, token4));
CUT.isFalse("isDeepStrictEqual(); 07d", CEL.isDeepStrictEqual(token1, token5));
/* objects / TypedArrays */
token1 = Int16Array.from([34, 45]);
token2 = Int16Array.from([34, 45]);
token3 = Int16Array.from([34, 46]);
token5 = Int16Array.from([34, 45, 56]);
CUT.isTrue("isDeepStrictEqual(); 08a", CEL.isDeepStrictEqual(token1, token2));
CUT.isFalse("isDeepStrictEqual(); 08b", CEL.isDeepStrictEqual(token1, token3));
CUT.isFalse("isDeepStrictEqual(); 08c", CEL.isDeepStrictEqual(token1, token5));
/* objects / Object (other objects) */
/* objects / same reference (same object) */
token1 = {"a": 1, "b": 2};
token2 = {"a": 1, "b": 2};
token3 = {"a": 1, "b": 3};
token4 = {"a": 1, "b": "2"};
token5 = {"a": 1, "b": 2, "c": 3};
token6 = {"a": 1, "b": 2, "c": 3, [Symbol()]: 4};
token7 = {"a": 1, "b": 2, "c": 3, [Symbol()]: 4};
token8 = {"a": 1, "b": 2, "c": 3, [Symbol()]: 5};
CUT.isTrue("isDeepStrictEqual(); 09a", CEL.isDeepStrictEqual(token1, token2));
CUT.isTrue("isDeepStrictEqual(); 09b", CEL.isDeepStrictEqual(token6, token6));
CUT.isFalse("isDeepStrictEqual(); 09c", CEL.isDeepStrictEqual(token1, token3));
CUT.isFalse("isDeepStrictEqual(); 09d", CEL.isDeepStrictEqual(token1, token4));
CUT.isFalse("isDeepStrictEqual(); 09e", CEL.isDeepStrictEqual(token1, token5));
CUT.isFalse("isDeepStrictEqual(); 09f", CEL.isDeepStrictEqual(token6, token7));
CUT.isFalse("isDeepStrictEqual(); 09g", CEL.isDeepStrictEqual(token6, token8));
/* objects / Map */
token1 = new Map([["a", 1], ["b", 2]]);
token2 = new Map([["a", 1], ["b", 2]]);
token3 = new Map([["a", 1], ["b", 3]]);
// @ts-ignore
token4 = new Map([["a", 1], ["b", "2"]]);
token5 = new Map([["a", 1], ["b", 2], ["c", 3]]);
CUT.isTrue("isDeepStrictEqual(); 10a", CEL.isDeepStrictEqual(token1, token2));
CUT.isFalse("isDeepStrictEqual(); 10b", CEL.isDeepStrictEqual(token1, token3));
CUT.isFalse("isDeepStrictEqual(); 10c", CEL.isDeepStrictEqual(token1, token4));
CUT.isFalse("isDeepStrictEqual(); 10d", CEL.isDeepStrictEqual(token1, token5));
/* objects / weakset + weakmap*/
token1 = new WeakSet();
token2 = new WeakSet();
CUT.isTrue("isDeepStrictEqual(); 11a", CEL.isDeepStrictEqual(token1, token1));
CUT.isFalse("isDeepStrictEqual(); 11b", CEL.isDeepStrictEqual(token1, token2));
token1 = new WeakMap();
token2 = new WeakMap();
CUT.isTrue("isDeepStrictEqual(); 11c", CEL.isDeepStrictEqual(token1, token1));
CUT.isFalse("isDeepStrictEqual(); 11d", CEL.isDeepStrictEqual(token1, token2));
/* objects / Function */
CUT.isTrue("isDeepStrictEqual(); 12a",
  CEL.isDeepStrictEqual(Array.from, Array.from)
);
CUT.isFalse("isDeepStrictEqual(); 12b",
  CEL.isDeepStrictEqual(Array.from, Array.of)
);
/* objects / Date */
token1 = new Date();
token2 = new Date();
if (token2.getMilliseconds() === 1) {
  token2.setMilliseconds(2);
} else {
  token2.setMilliseconds(1);
}
token3 = {};
Object.setPrototypeOf(token3, Date);
CUT.isTrue("isDeepStrictEqual(); 13a", CEL.isDeepStrictEqual(token1, token1));
CUT.isFalse("isDeepStrictEqual(); 13b", CEL.isDeepStrictEqual(token1, token2));
CUT.isFalse("isDeepStrictEqual(); 13c", CEL.isDeepStrictEqual(token1, token3));
/* objects / Error */
token1 = new Error("Agradzsag");
token2 = new Error("Agradzsag");
token3 = new TypeError("Agradzsag");
token3 = new TypeError("Agradzsag");
CUT.isTrue("isDeepStrictEqual(); 14a", CEL.isDeepStrictEqual(token1, token1));
CUT.isTrue("isDeepStrictEqual(); 14b", CEL.isDeepStrictEqual(token3, token3));
CUT.isFalse("isDeepStrictEqual(); 14c", CEL.isDeepStrictEqual(token1, token2));
CUT.isFalse("isDeepStrictEqual(); 14d", CEL.isDeepStrictEqual(token1, token3));
/* types: null, undefined */
CUT.isTrue("isDeepStrictEqual(); 15a",
  CEL.isDeepStrictEqual(null, null)
);
CUT.isTrue("isDeepStrictEqual(); 15b",
  CEL.isDeepStrictEqual(undefined, undefined)
);
CUT.isFalse("isDeepStrictEqual(); 15c", CEL.isDeepStrictEqual(null, undefined));
/* structures 1 */
token1 = new Error("Agradzsag");
// @ts-ignore
token2 = [1,2,{"3": 4, "5": new Map([["6", 7], ["8", [9, token1]]])}];
// @ts-ignore
token3 = [1,2,{"3": 4, "5": new Map([["6", 7], ["8", [9, token1]]])}];
// @ts-ignore
token4 = [1,2,{"3": 4, "5": new Map([["6", 7], ["8", [9, 42]]])}];
// @ts-ignore
token5 = [1,2,{"3": 4, "5": new Map([["6", 7], ["8", [9, token1, 42]]])}];
CUT.isTrue("isDeepStrictEqual(); 16a", CEL.isDeepStrictEqual(token2, token2));
CUT.isTrue("isDeepStrictEqual(); 16b", CEL.isDeepStrictEqual(token2, token3));
CUT.isFalse("isDeepStrictEqual(); 16c", CEL.isDeepStrictEqual(token2, token4));
CUT.isFalse("isDeepStrictEqual(); 16d", CEL.isDeepStrictEqual(token2, token5));
/* structures 2 */
token1 = new Error("Agradzsag");
// @ts-ignore
token2 = [1, 2, {"3": 4, "5": new Map([["6", 7], ["8", [9, 10]], ["11", new Set([12, 13])]])}, token1];
// @ts-ignore
token3 = [1, 2, {"3": 4, "5": new Map([["6", 7], ["8", [9, 10]], ["11", new Set([12, 13])]])}, token1];
// @ts-ignore
token4 = [1, 2, {"3": 4, "5": new Map([["6", 7], ["8", ["a", 10]], ["11", new Set([12, 13])]])}, token1];
// @ts-ignore
token5 = [1, 2, {"3": 4, "5": new Map([["6", 7], ["8", [9, 10]], ["11", new Set([12, 13, 14])]])}, token1];
CUT.isTrue("isDeepStrictEqual(); 17a", CEL.isDeepStrictEqual(token2, token2));
CUT.isTrue("isDeepStrictEqual(); 17b", CEL.isDeepStrictEqual(token2, token3));
CUT.isFalse("isDeepStrictEqual(); 17c", CEL.isDeepStrictEqual(token2, token4));
CUT.isFalse("isDeepStrictEqual(); 17d", CEL.isDeepStrictEqual(token2, token5));
/* structures 3 */
token1 = new Error("Agradzsag");
// @ts-ignore
token2 = [1, 2, {"3": 4, "5": new Map([["6", 7], ["8", [9, 10]], ["11", new Set([12, 13])]])}, token1];
// @ts-ignore
token3 = [1, 2, {"3": 4, "5": new Map([["6", 7], ["8", [9, 10]], ["11", new Set([12, 13])]])}, token1];
// @ts-ignore
token4 = [1, 2, {"3": 4, "5": new Map([["6", 8], ["8", [9, 10]], ["11", new Set([12, 14])]])}, token1];
// @ts-ignore
token5 = [1, 2, {"3": 4, "5": new Map([["6", 8], ["8", [9, 10, 15]], ["11", new Set([12, 13])]])}, token1];
CUT.isTrue("isDeepStrictEqual(); 18a", CEL.isDeepStrictEqual(token2, token2));
CUT.isTrue("isDeepStrictEqual(); 18b", CEL.isDeepStrictEqual(token2, token3));
CUT.isFalse("isDeepStrictEqual(); 18c", CEL.isDeepStrictEqual(token2, token4));
CUT.isFalse("isDeepStrictEqual(); 18d", CEL.isDeepStrictEqual(token2, token5));
/* structures 4 */
token1 = new Error("Agradzsag");
// @ts-ignore
token2 = [1,2,{"3": 4, "5": new Map([["6", 7], ["8", [9, 10]], ["11", new Set([12, 13])]])}, token1];
// @ts-ignore
token3 = [1,2,{"3": 4, "5": new Map([["6", 7], ["8", [9, 10]], ["11", new Set([12, 13])]])}, token1];
// @ts-ignore
token4 = [1,5,{"3": 4, "5": new Map([["6", 7], ["8", [9, 10]], ["11", new Set([12, 13])]])}, token1];
// @ts-ignore
token5 = [1,2,{"3": 4, "5": new Map([["6", 7], ["8", [9, 10]], ["11", new Set([12, 13, 14])]])}, token1];
CUT.isTrue("isDeepStrictEqual(); 19a", CEL.isDeepStrictEqual(token2, token2));
CUT.isTrue("isDeepStrictEqual(); 19b", CEL.isDeepStrictEqual(token2, token3));
CUT.isFalse("isDeepStrictEqual(); 19c", CEL.isDeepStrictEqual(token2, token4));
CUT.isFalse("isDeepStrictEqual(); 19d", CEL.isDeepStrictEqual(token2, token5));
/* objects / not same prototype - array */
CUT.isFalse("isDeepStrictEqual(); 20a", CEL.isDeepStrictEqual({}, []));
CUT.isFalse("isDeepStrictEqual(); 20b", CEL.isDeepStrictEqual(new Map(), []));
CUT.isFalse("isDeepStrictEqual(); 20c", CEL.isDeepStrictEqual(new Set(), []));
CUT.isFalse("isDeepStrictEqual(); 20d",
  CEL.isDeepStrictEqual(new WeakMap(), [])
);
CUT.isFalse("isDeepStrictEqual(); 20e",
  CEL.isDeepStrictEqual(new WeakSet(), [])
);
CUT.isFalse("isDeepStrictEqual(); 20f", CEL.isDeepStrictEqual(new Error(), []));
CUT.isFalse("isDeepStrictEqual(); 20g", CEL.isDeepStrictEqual(42, [42]));
CUT.isFalse("isDeepStrictEqual(); 20h",
  CEL.isDeepStrictEqual(Object(42), [42])
);
CUT.isFalse("isDeepStrictEqual(); 20i", CEL.isDeepStrictEqual(true, [true]));
CUT.isFalse("isDeepStrictEqual(); 20j",
  CEL.isDeepStrictEqual(Object(true), [true])
);
CUT.isFalse("isDeepStrictEqual(); 20k",
  CEL.isDeepStrictEqual("lorem", ["lorem"])
);
CUT.isFalse("isDeepStrictEqual(); 20l",
  CEL.isDeepStrictEqual(Object("lorem"), ["lorem"])
);
CUT.isFalse("isDeepStrictEqual(); 20m", CEL.isDeepStrictEqual(42n, [42n]));
CUT.isFalse("isDeepStrictEqual(); 20n",
  CEL.isDeepStrictEqual(Object(42n), [42n])
);
/* objects / not same prototype - map */
CUT.isFalse("isDeepStrictEqual(); 21a",
  CEL.isDeepStrictEqual(new Map(), new Set())
);
CUT.isFalse("isDeepStrictEqual(); 21b",
  CEL.isDeepStrictEqual(new Map(), new WeakSet())
);
CUT.isFalse("isDeepStrictEqual(); 21c",
  CEL.isDeepStrictEqual(new Map(), new WeakMap())
);
CUT.isFalse("isDeepStrictEqual(); 21d",
  CEL.isDeepStrictEqual(new Error(), new Map())
);
CUT.isFalse("isDeepStrictEqual(); 21e", CEL.isDeepStrictEqual(42, new Map()));
CUT.isFalse("isDeepStrictEqual(); 21f",
  CEL.isDeepStrictEqual(Object(42), new Map())
);
CUT.isFalse("isDeepStrictEqual(); 21g", CEL.isDeepStrictEqual(true, new Map()));
CUT.isFalse("isDeepStrictEqual(); 21h",
  CEL.isDeepStrictEqual(Object(true), new Map())
);
CUT.isFalse("isDeepStrictEqual(); 21i",
  CEL.isDeepStrictEqual("lorem", new Map())
);
CUT.isFalse("isDeepStrictEqual(); 21j",
  CEL.isDeepStrictEqual(Object("lorem"), new Map())
);
CUT.isFalse("isDeepStrictEqual(); 21k", CEL.isDeepStrictEqual(42n, new Map()));
CUT.isFalse("isDeepStrictEqual(); 21l",
  CEL.isDeepStrictEqual(Object(42n), new Map())
);
/* objects / not same prototype - set */
CUT.isFalse("isDeepStrictEqual(); 22a",
  CEL.isDeepStrictEqual(new WeakMap(), new Set())
);
CUT.isFalse( "isDeepStrictEqual(); 22b",
  CEL.isDeepStrictEqual(new Error(), new Set())
);
CUT.isFalse("isDeepStrictEqual(); 22c", CEL.isDeepStrictEqual(42, new Set()));
CUT.isFalse("isDeepStrictEqual(); 22d",
  CEL.isDeepStrictEqual(Object(42), new Set())
);
CUT.isFalse("isDeepStrictEqual(); 22e", CEL.isDeepStrictEqual(true, new Set()));
CUT.isFalse("isDeepStrictEqual(); 22f",
  CEL.isDeepStrictEqual(Object(true), new Set())
);
CUT.isFalse("isDeepStrictEqual(); 22g",
  CEL.isDeepStrictEqual("lorem", new Set())
);
CUT.isFalse("isDeepStrictEqual(); 22h",
  CEL.isDeepStrictEqual(Object("lorem"), new Set())
);
CUT.isFalse("isDeepStrictEqual(); 22i", CEL.isDeepStrictEqual(42n, new Set()));
CUT.isFalse("isDeepStrictEqual(); 22j",
  CEL.isDeepStrictEqual(Object(42n), new Set())
);
/* objects / not same prototype - weakset */
CUT.isFalse("isDeepStrictEqual(); 23a",
  CEL.isDeepStrictEqual(new WeakMap(), new WeakSet())
);
CUT.isFalse("isDeepStrictEqual(); 23b",
  CEL.isDeepStrictEqual(new Error(), new WeakSet())
);
CUT.isFalse("isDeepStrictEqual(); 23c",
  CEL.isDeepStrictEqual(42, new WeakSet())
);
CUT.isFalse("isDeepStrictEqual(); 23d",
  CEL.isDeepStrictEqual(Object(42), new WeakSet())
);
CUT.isFalse("isDeepStrictEqual(); 23e",
  CEL.isDeepStrictEqual(true, new WeakSet())
);
CUT.isFalse("isDeepStrictEqual(); 23f",
  CEL.isDeepStrictEqual(Object(true), new WeakSet())
);
CUT.isFalse("isDeepStrictEqual(); 23g",
  CEL.isDeepStrictEqual("lorem", new WeakSet())
);
CUT.isFalse("isDeepStrictEqual(); 23h",
  CEL.isDeepStrictEqual(Object("lorem"), new WeakSet())
);
CUT.isFalse("isDeepStrictEqual(); 23i",
  CEL.isDeepStrictEqual(42n, new WeakSet())
);
CUT.isFalse("isDeepStrictEqual(); 23j",
  CEL.isDeepStrictEqual(Object(42n), new WeakSet())
);
/* objects / not same prototype - weakmap */
CUT.isFalse("isDeepStrictEqual(); 24a",
  CEL.isDeepStrictEqual(new Error(), new WeakMap())
);
CUT.isFalse("isDeepStrictEqual(); 24b",
  CEL.isDeepStrictEqual(42, new WeakMap())
);
CUT.isFalse("isDeepStrictEqual(); 24c",
  CEL.isDeepStrictEqual(Object(42), new WeakMap())
);
CUT.isFalse("isDeepStrictEqual(); 24d",
  CEL.isDeepStrictEqual(true, new WeakMap())
);
CUT.isFalse("isDeepStrictEqual(); 24e",
  CEL.isDeepStrictEqual(Object(true), new WeakMap())
);
CUT.isFalse("isDeepStrictEqual(); 24f",
  CEL.isDeepStrictEqual("lorem", new WeakMap())
);
CUT.isFalse("isDeepStrictEqual(); 24g",
  CEL.isDeepStrictEqual(Object("lorem"), new WeakMap())
);
CUT.isFalse("isDeepStrictEqual(); 24h",
  CEL.isDeepStrictEqual(42n, new WeakMap())
);
CUT.isFalse("isDeepStrictEqual(); 24i",
  CEL.isDeepStrictEqual(Object(42n), new WeakMap())
);
/* objects / not same prototype */
CUT.isFalse("isDeepStrictEqual(); 25a",
  // @ts-ignore
  CEL.isDeepStrictEqual(42, new Error(42))
);
CUT.isFalse("isDeepStrictEqual(); 25b",
  // @ts-ignore
  CEL.isDeepStrictEqual(Object(42), new Error(42))
);
CUT.isFalse("isDeepStrictEqual(); 25c",
  // @ts-ignore
  CEL.isDeepStrictEqual(true, new Error(true))
);
CUT.isFalse("isDeepStrictEqual(); 25d",
  // @ts-ignore
  CEL.isDeepStrictEqual(Object(true), new Error(true))
);
CUT.isFalse("isDeepStrictEqual(); 25e",
  CEL.isDeepStrictEqual("lorem", new Error("lorem"))
);
CUT.isFalse("isDeepStrictEqual(); 25f",
  CEL.isDeepStrictEqual(Object("lorem"), new Error("lorem"))
);
CUT.isFalse("isDeepStrictEqual(); 25g",
  // @ts-ignore
  CEL.isDeepStrictEqual(42n, new Error(42n))
);
CUT.isFalse("isDeepStrictEqual(); 25h",
  // @ts-ignore
  CEL.isDeepStrictEqual(Object(42n), new Error(42n))
);
/* objects / not same prototype - number */
CUT.isFalse("isDeepStrictEqual(); 26a", CEL.isDeepStrictEqual(true, 1));
CUT.isFalse("isDeepStrictEqual(); 26b", CEL.isDeepStrictEqual(Object(true), 1));
CUT.isFalse("isDeepStrictEqual(); 26c", CEL.isDeepStrictEqual("1", 1));
CUT.isFalse("isDeepStrictEqual(); 26d", CEL.isDeepStrictEqual(Object("1"), 1));
CUT.isFalse("isDeepStrictEqual(); 26e", CEL.isDeepStrictEqual(42n, 42));
CUT.isFalse("isDeepStrictEqual(); 26f", CEL.isDeepStrictEqual(Object(42n), 42));
/* objects / not same prototype - string */
CUT.isFalse("isDeepStrictEqual(); 27a", CEL.isDeepStrictEqual(true, "true"));
CUT.isFalse("isDeepStrictEqual(); 27b", CEL.isDeepStrictEqual(42n, "42n"));
CUT.isFalse("isDeepStrictEqual(); 27c",
  CEL.isDeepStrictEqual(Object(42), "42")
);
CUT.isFalse("isDeepStrictEqual(); 27d",
  CEL.isDeepStrictEqual(Object(42n), "42n")
);
CUT.isFalse("isDeepStrictEqual(); 27e",
  CEL.isDeepStrictEqual(Object(true), "true")
);
/* objects / not same prototype - boolean */
CUT.isFalse("isDeepStrictEqual(); 28a", CEL.isDeepStrictEqual(1n, true));
CUT.isFalse("isDeepStrictEqual(); 28b",
  CEL.isDeepStrictEqual(Object(1n), true)
);
CUT.isFalse("isDeepStrictEqual(); 28c", CEL.isDeepStrictEqual(Object(1), true));
CUT.isFalse("isDeepStrictEqual(); 28d", CEL.isDeepStrictEqual("true", true));
/* objects / not same prototype - bigint */
CUT.isFalse("isDeepStrictEqual(); 29a",
  CEL.isDeepStrictEqual(Object(42), 42n)
);
CUT.isFalse("isDeepStrictEqual(); 29b",
  CEL.isDeepStrictEqual(Object("42"), 42n)
);
/* Chrome - Firefox not the same result
CUT.isFalse("isDeepStrictEqual(); 29c",
  CEL.isDeepStrictEqual(Object(true), 1n, "isDeepStrictEqual(); 29c")
);
*/
/* objects / not same prototype - Object wrappers */
CUT.isFalse("isDeepStrictEqual(); 30a",
  CEL.isDeepStrictEqual(Object(42), Object("42"))
);
CUT.isFalse("isDeepStrictEqual(); 30b",
  CEL.isDeepStrictEqual(Object(1), Object(true))
);
CUT.isFalse("isDeepStrictEqual(); 30c",
  CEL.isDeepStrictEqual(Object(1), Object(1n))
);
CUT.isFalse("isDeepStrictEqual(); 30d",
  CEL.isDeepStrictEqual(Object("true"), Object(true))
);
CUT.isFalse("isDeepStrictEqual(); 30e",
  CEL.isDeepStrictEqual(Object(42n), Object("42n"))
);
CUT.isFalse("isDeepStrictEqual(); 30f",
  CEL.isDeepStrictEqual(Object(1n), Object(true))
);
/* dataview + arraybuffer */
token1 = new ArrayBuffer(2);
token2 = new DataView(token1);
// @ts-ignore
token2.setInt8(0, 125, true);
// @ts-ignore
token2.setInt8(1, 100, true);
token3 = new ArrayBuffer(2);
token4 = new DataView(token3);
// @ts-ignore
token4.setInt8(0, 125, true);
// @ts-ignore
token4.setInt8(1, 100, true);
token5 = new ArrayBuffer(2);
token6 = new DataView(token5);
// @ts-ignore
token6.setInt8(0, 120, true);
// @ts-ignore
token6.setInt8(1, 100, true);
token7 = new ArrayBuffer(3);
token8 = new DataView(token7);
// @ts-ignore
token8.setInt8(0, 125, true);
// @ts-ignore
token8.setInt8(1, 100, true);
CUT.isTrue("isDeepStrictEqual(); 31a",
     CEL.isDeepStrictEqual([1, 2, token1, 3], [1, 2, token1, 3])
  && CEL.isDeepStrictEqual([1, 2, token1, 3], [1, 2, token3, 3])
  && CEL.isDeepStrictEqual([1, 2, token2, 3], [1, 2, token2, 3])
  && CEL.isDeepStrictEqual([1, 2, token2, 3], [1, 2, token4, 3])
);
CUT.isFalse("isDeepStrictEqual(); 31b",
  CEL.isDeepStrictEqual([1, 2, token1, 3], [1, 2, token5, 3])
);
CUT.isFalse("isDeepStrictEqual(); 31c",
  CEL.isDeepStrictEqual([1, 2, token1, 3], [1, 2, token7, 3])
);
CUT.isFalse("isDeepStrictEqual(); 31d",
  CEL.isDeepStrictEqual([1, 2, token2, 3], [1, 2, token6, 3])
);
CUT.isFalse("isDeepStrictEqual(); 31e",
  CEL.isDeepStrictEqual([1, 2, token2, 3], [1, 2, token8, 3])
);
/* isDeepStrictEqual end */


CUT.isTrue("isEmptyValue(); 01",
  CEL.isEmptyValue(null)
  && CEL.isEmptyValue(NaN)
  && CEL.isEmptyValue(undefined)
  && CEL.isEmptyValue("")
  && CEL.isEmptyValue([])
  && CEL.isEmptyValue(new Int32Array())
  && CEL.isEmptyValue(new Map())
  && CEL.isEmptyValue(new Set())
  && CEL.isEmptyValue(new ArrayBuffer(0))
  && CEL.isEmptyValue(new DataView(new ArrayBuffer(0)))
  && CEL.isEmptyValue([].values())
  && CEL.isEmptyValue({length: 0})
  && CEL.isEmptyValue({})
);
CUT.isFalse("isEmptyValue(); 02",
  CEL.isEmptyValue(3)
  || CEL.isEmptyValue(true)
  || CEL.isEmptyValue("Arthur Dent")
  || CEL.isEmptyValue(Symbol(42))
  || CEL.isEmptyValue(Array.from)
  || CEL.isEmptyValue([42])
  || CEL.isEmptyValue(new Int32Array([42]))
  || CEL.isEmptyValue(new ArrayBuffer(1))
  || CEL.isEmptyValue(new DataView(new ArrayBuffer(1)))
  || CEL.isEmptyValue(new Map([[42, 2]]))
  || CEL.isEmptyValue(new Set([42, 2]))
  || CEL.isEmptyValue([4, 5, 6].values())
  || CEL.isEmptyValue({length: 1, 0: 3.14})
  || CEL.isEmptyValue({a: 1})
);


/* isProxy(); */
token1 = { message1: "hello", message2: "everyone"};
token2 = { get(_target, _prop, _receiver) { return "world"; } };
CUT.isTrue("isProxy();",
  CEL.isProxy(new Proxy(token1, token2)) && !CEL.isProxy([])
);


/* isAsyncGeneratorFn(); */
CUT.isTrue("isAsyncGeneratorFn();",
  CEL.isAsyncGeneratorFn(async function*(){})
    && !CEL.isAsyncGeneratorFn(function*(){})
    && !CEL.isAsyncGeneratorFn(Array)
    && !CEL.isAsyncGeneratorFn(Array.from)
    && !CEL.isAsyncGeneratorFn(0)
);


/* isPlainObject(); */
CUT.isTrue("isPlainObject();",
      CEL.isPlainObject({})
  &&  CEL.isPlainObject({a: "1", b: "2"})
  &&  CEL.isPlainObject(Object.create(null))
  && !CEL.isPlainObject(null)
  && !CEL.isPlainObject("")
  && !CEL.isPlainObject([])
  && !CEL.isPlainObject(function(){})
);


/* isGeneratorFn(); */
CUT.isTrue("isGeneratorFn();",
      CEL.isGeneratorFn(function* fn42g () { yield 42; })
  && !CEL.isGeneratorFn(function fn42 () { return 42; })
  && !CEL.isGeneratorFn(42)
  && !CEL.isGeneratorFn(
       // @ts-ignore
       new AsyncFunction("a", "b",
         "return await resolveAfter2Seconds(a) + await resolveAfter2Seconds(b);"
       ))
);


/* isAsyncFn(); */
CUT.isTrue("isAsyncFn();",
  CEL.isAsyncFn(
    // @ts-ignore
    new AsyncFunction("a", "b",
      // @ts-ignore
      "return await resolveAfter2Seconds(a) + await resolveAfter2Seconds(b);"
    )
  )
  && !CEL.isAsyncFn(function fn42 () { return 42; })
  && !CEL.isAsyncFn(function* fn42g () { yield 42; })
  && !CEL.isAsyncFn(42)
);


/* isChar(); */
CUT.isTrue("isChar();",
      CEL.isChar("s")
  &&  CEL.isChar("\uD834\uDF06")
  && !CEL.isChar("str")
  && !CEL.isChar(533)
  && !CEL.isChar("s \uD834\uDF06 tr")
);


/* isFloat(); */
CUT.isTrue("isFloat();",
  CEL.isFloat(3.14) && !CEL.isFloat(98) && !CEL.isFloat("str")
);


/* isObject(); */
CUT.isTrue("isObject();",
      CEL.isObject({"a": 1})
  &&  CEL.isObject(Object(42))
  &&  CEL.isObject(function () {})
  &&  CEL.isObject([])
  && !CEL.isObject(null)
  && !CEL.isObject(undefined)
  && !CEL.isObject(42)
);


/* isFunction(); */
CUT.isTrue("isFunction();",
      CEL.isFunction(function () {})
  &&  CEL.isFunction(new Function())
  && !CEL.isFunction({"a": 1})
);


/* isCallable(); */
CUT.isTrue("isCallable();",
      CEL.isCallable(function () {})
  &&  CEL.isCallable(new Function())
  && !CEL.isCallable({"a": 1})
);


/* isArraylike(); */
CUT.isTrue("isArraylike();",
      CEL.isArraylike([])
  &&  CEL.isArraylike({0: 4, 1: 5, length: 2})
  &&  CEL.isArraylike("Pillangó")
  &&  CEL.isArraylike("")
  && !CEL.isArraylike({"a": 1})
  && !CEL.isArraylike(42)
  && !CEL.isArraylike(null)
  && !CEL.isArraylike({0:4,1:5})
);


/* isNull(); */
CUT.isTrue("isNull();", CEL.isNull(null) && !CEL.isNull({"a": 1}));


/* isUndefined(); */
CUT.isTrue("isUndefined();",
  CEL.isUndefined(undefined) && !CEL.isUndefined(42)
);


/* isNullish(); */
CUT.isTrue("isNullish();",
  CEL.isNullish(undefined)
    &&  CEL.isNullish(null)
    && !CEL.isNullish(NaN)
    && !CEL.isNullish(42)
);


/* isPrimitive(); */
CUT.isTrue("isPrimitive();",
      CEL.isPrimitive(98)
  &&  CEL.isPrimitive("str")
  && !CEL.isPrimitive({"a": 1})
  && !CEL.isPrimitive(function () {})
);


/* isRegexp(); */
CUT.isTrue("isRegexp();",
  CEL.isRegexp(/^\[object (.+)\]$/g) && !CEL.isRegexp("42")
);


/* isElement(); */
CUT.isFalse("isElement();", CEL.isElement([]));


/* isNumeric(); begin */
CUT.isTrue("isNumeric(); true",
  CEL.isNumeric(-42)
    && CEL.isNumeric(-1.42)
    && CEL.isNumeric(-0.42)
    && CEL.isNumeric(0)
    && CEL.isNumeric(0.42)
    && CEL.isNumeric(.42)
    && CEL.isNumeric(1.42)
    && CEL.isNumeric(42)
    && CEL.isNumeric(8e5)
    && CEL.isNumeric(-8e5)
    && CEL.isNumeric(0x89f)
    && CEL.isNumeric(-0x89f)
    && CEL.isNumeric("-42")
    && CEL.isNumeric("-1.42")
    && CEL.isNumeric("-0.42")
    && CEL.isNumeric("0")
    && CEL.isNumeric("0.42")
    && CEL.isNumeric(".42")
    && CEL.isNumeric("1.42")
    && CEL.isNumeric("42")
    && CEL.isNumeric("8e5")
    && CEL.isNumeric("-8e5")
    && CEL.isNumeric("0x89f")
    && CEL.isNumeric(42n)
    && CEL.isNumeric(0n)
);
CUT.isFalse("isNumeric(); false",
  CEL.isNumeric(null)
    || CEL.isNumeric(undefined)
    || CEL.isNumeric(NaN)
    || CEL.isNumeric("NaN")
    || CEL.isNumeric("1,42")
    || CEL.isNumeric("#foo")
    || CEL.isNumeric("1.2.3")
    || CEL.isNumeric("")
    || CEL.isNumeric("bar")
    || CEL.isNumeric(" ")
    || CEL.isNumeric("\r\n")
    || CEL.isNumeric("true")
    || CEL.isNumeric("false")
    || CEL.isNumeric("1<10")
    || CEL.isNumeric([])
    || CEL.isNumeric({})
    || CEL.isNumeric("-0x89f")
);
/* isNumeric(); end */


/* isTypedArray(); begin */
CUT.isTrue("isTypedArray();",
      CEL.isTypedArray(new Int8Array(5))
  &&  CEL.isTypedArray(new Uint8Array(5))
  &&  CEL.isTypedArray(new Int16Array(5))
  &&  CEL.isTypedArray(new Uint16Array(5))
  &&  CEL.isTypedArray(new Int32Array(5))
  &&  CEL.isTypedArray(new Uint32Array(5))
  &&  CEL.isTypedArray(new Float32Array(5))
  &&  CEL.isTypedArray(new Float64Array(5))
  &&  CEL.isTypedArray(new Uint8ClampedArray(5))
  &&  (globalThis.BigInt64Array ? CEL.isTypedArray(new BigInt64Array(5)) : true)
  &&  CEL.isTypedArray(new BigUint64Array(5))
  && !CEL.isTypedArray([4, 5, 6])
  && !CEL.isTypedArray(new ArrayBuffer(8))
);


/* isIterator(); */
CUT.isTrue("isIterator();",
      CEL.isIterator([4, 5, 6].values())
  &&  CEL.isIterator(new Set([4, 5, 7]).values())
  &&  CEL.isIterator(new Map([[4, 5], [5, 6]]).values())
  && !CEL.isIterator([4, 5, 7])
);


/* isIterable(); */
CUT.isTrue("isIterable();",
      CEL.isIterable([])
  &&  CEL.isIterable("")
  &&  CEL.isIterable(new Map([[1, 2], [3, 4]]))
  &&  CEL.isIterable(new Set([1,2]))
  && !CEL.isIterable(42)
  && !CEL.isIterable(3.14)
  && !CEL.isIterable({a:1,b:2})
  && !CEL.isIterable(true)
  && !CEL.isIterable(false)
);


/* isAsyncIterable(); */
CUT.isTrue("isAsyncIterable();",
      CEL.isAsyncIterable((async function* () { yield 1; yield 2; yield 3; })())
  && !CEL.isAsyncIterable([])
  && !CEL.isAsyncIterable("")
  && !CEL.isAsyncIterable(new Map([[1, 2], [3, 4]]))
  && !CEL.isAsyncIterable(new Set([1,2]))
  && !CEL.isAsyncIterable(42)
  && !CEL.isAsyncIterable(3.14)
  && !CEL.isAsyncIterable({a:1,b:2})
  && !CEL.isAsyncIterable(true)
  && !CEL.isAsyncIterable(false)
);


/* isPropertyKey(); */
CUT.isTrue("isPropertyKey();",
      CEL.isPropertyKey("")
  &&  CEL.isPropertyKey(Symbol(42))
  && !CEL.isPropertyKey(42)
);


/* toPropertyKey(); */
CUT.isTrue("toPropertyKey();",
  CEL.toPropertyKey("") === ""
    && CEL.toPropertyKey(Symbol("42")).toString() === "Symbol(42)"
    && CEL.toPropertyKey(42) === "42"
);


/* toObject(); */
CUT.isTrue("toObject();", typeof CEL.toObject("str") === "object");


/* toPrimitiveValue(); */
CUT.isTrue("toPrimitiveValue();",
  typeof CEL.toPrimitiveValue(null) === "object"
    && typeof CEL.toPrimitiveValue(undefined) === "undefined"
    && typeof CEL.toPrimitiveValue(true) === "boolean"
    && typeof CEL.toPrimitiveValue(42n) === "bigint"
    && typeof CEL.toPrimitiveValue(Object(42n)) === "bigint"
    && typeof CEL.toPrimitiveValue(42) === "number"
    && typeof CEL.toPrimitiveValue("lorem ipsum") === "string"
    && typeof CEL.toPrimitiveValue(Symbol(42)) === "symbol"
    && typeof CEL.toPrimitiveValue(new Boolean(true)) === "boolean"
    && typeof CEL.toPrimitiveValue(new Number(42)) === "number"
    && typeof CEL.toPrimitiveValue(new String("lorem ipsum")) === "string"
    && typeof CEL.toPrimitiveValue({"a":1}) === "object"
    && Array.isArray(CEL.toPrimitiveValue([]))
    && CEL.toPrimitiveValue(new Map()) instanceof Map
    && CEL.toPrimitiveValue(new Set()) instanceof Set
);


/* createPolyfillMethod(); */
token1 = {"a": 1, "b": 2};
CUT.isTrue("createPolyfillMethod(); - <code>"
    + JSON.stringify(token1) + "</code>",
  CEL.createPolyfillMethod(token1, "c", () => {}) &&
  !(Object.keys(token1).includes("c")) && ("c" in token1)
);


/* createPolyfillProperty(); */
token1 = {"a": 1, "b": 2};
CUT.isTrue(
  "createPolyfillProperty(); - <code>" + JSON.stringify(token1) + "</code>",
  CEL.createPolyfillProperty(token1, "c", 3)
    && Object.keys(token1).includes("c") && ("c" in token1)
);


/* deleteOwnProperty(); */
token1 = {"a": 1, "b": 2};
token2 = "" + CEL.deleteOwnProperty(token1, "a");
token2 += " " + CEL.deleteOwnProperty(token1, "a");
token2 += " " + CEL.deleteOwnProperty(token1, "a");
token1 = {"a": 1, "b": 2};
token2 += " " + CEL.deleteOwnProperty(token1, "a", true);
token2 += " " + CEL.deleteOwnProperty(token1, "a", true);
CUT.isEqual("deleteOwnProperty(); - <code>\"" + token2 + "\"</code>", token2,
  "1 -1 -1 1 -1"
);


/* typeOf(); */
CUT.isTrue("typeOf();",
  CEL.typeOf(null) === "null"
    && CEL.typeOf(undefined) === "undefined"
    && CEL.typeOf([]) === "object"
    && CEL.typeOf(function () {}) === "function"
    && CEL.typeOf(42) === "number"
    && CEL.typeOf("42") === "string"
    && CEL.typeOf(true) === "boolean"
);


/* isIndex(); */
CUT.isTrue("isIndex();",
      CEL.isIndex(3)
  &&  CEL.isIndex(0)
  && !CEL.isIndex("3")
  && !CEL.isIndex(true)
  && !CEL.isIndex(-0)
  && !CEL.isIndex(Infinity)
  && !CEL.isIndex(-Infinity)
  && !CEL.isIndex("Infinity")
  && !CEL.isIndex("-Infinity")
  && !CEL.isIndex(-3)
  && !CEL.isIndex(3.14)
  && !CEL.isIndex(-3.14)
  && !CEL.isIndex("fasdas")
  && !CEL.isIndex(false)
  && !CEL.isIndex("-3")
  && !CEL.isIndex("3.14")
  && !CEL.isIndex("-3.14")
  && !CEL.isIndex("adsasd")
  && !CEL.isIndex({})
  && !CEL.isIndex([])
  && !CEL.isIndex(undefined)
  && !CEL.isIndex(null)
);


/* isLength(); */
CUT.isTrue("isLength();",
      CEL.isLength(3)
  &&  CEL.isLength(0)
  && !CEL.isLength("3")
  && !CEL.isLength(true)
  && !CEL.isLength(-0)
  && !CEL.isLength(Infinity)
  && !CEL.isLength(-Infinity)
  && !CEL.isLength("Infinity")
  && !CEL.isLength("-Infinity")
  && !CEL.isLength(-3)
  && !CEL.isLength(3.14)
  && !CEL.isLength(-3.14)
  && !CEL.isLength("fasdas")
  && !CEL.isLength(false)
  && !CEL.isLength("-3")
  && !CEL.isLength("3.14")
  && !CEL.isLength("-3.14")
  && !CEL.isLength("adsasd")
  && !CEL.isLength({})
  && !CEL.isLength([])
  && !CEL.isLength(undefined)
  && !CEL.isLength(null)
);


/* toIndex(); */
CUT.isEqual("toIndex(); 01", "3 0 3 1 0 3 0 0 3 0 0 0 0 0",
  CUT.join([
    CEL.toIndex(3),
    CEL.toIndex(0),
    CEL.toIndex("3"),
    CEL.toIndex(true),
    CEL.toIndex(-0),
    CEL.toIndex(3.14),
    CEL.toIndex("lorem"),
    CEL.toIndex(false),
    CEL.toIndex("3.14"),
    CEL.toIndex("adsasd"),
    CEL.toIndex({}),
    CEL.toIndex([]),
    CEL.toIndex(undefined),
    CEL.toIndex(null)
  ])
);
CUT.isError("toIndex(); 02 error", () => CEL.toIndex(Infinity));
CUT.isError("toIndex(); 03 error", () => CEL.toIndex(-Infinity));
CUT.isError("toIndex(); 04 error", () => CEL.toIndex("Infinity"));
CUT.isError("toIndex(); 05 error", () => CEL.toIndex("-Infinity"));
CUT.isError("toIndex(); 06 error", () => CEL.toIndex(-3));
CUT.isError("toIndex(); 07 error", () => CEL.toIndex(-3.14));
CUT.isError("toIndex(); 08 error", () => CEL.toIndex("-3"));
CUT.isError("toIndex(); 09 error", () => CEL.toIndex("-3.14"));


/* toLength(); */
CUT.isEqual("toLength();",
  "3 0 3 1 0 9007199254740991 0 9007199254740991 0 0 3 0 0 0 0 3 0 0 0 0 0 0",
  CUT.join([
    CEL.toLength(3),
    CEL.toLength(0),
    CEL.toLength("3"),
    CEL.toLength(true),
    CEL.toLength(-0),
    CEL.toLength(Infinity),
    CEL.toLength(-Infinity),
    CEL.toLength("Infinity"),
    CEL.toLength("-Infinity"),
    CEL.toLength(-3),
    CEL.toLength(3.14),
    CEL.toLength(-3.14),
    CEL.toLength("fasdas"),
    CEL.toLength(false),
    CEL.toLength("-3"),
    CEL.toLength("3.14"),
    CEL.toLength("-3.14"),
    CEL.toLength("adsasd"),
    CEL.toLength({}),
    CEL.toLength([]),
    CEL.toLength(undefined),
    CEL.toLength(null)
  ])
);


/* toInteger(); */
CUT.isEqual("toInteger();",
  "3 3 3 3 -3 -3 -3 -3 1 0 0 9007199254740991 -9007199254740991 9007199254740991 -9007199254740991 0 0 0 0 0 0 0",
  CUT.join([
    CEL.toInteger(3),
    CEL.toInteger("3"),
    CEL.toInteger(3.14),
    CEL.toInteger("3.14"),
    CEL.toInteger(-3),
    CEL.toInteger(-3.14),
    CEL.toInteger("-3"),
    CEL.toInteger("-3.14"),
    CEL.toInteger(true),
    CEL.toInteger(0),
    CEL.toInteger(-0),
    CEL.toInteger(Infinity),
    CEL.toInteger(-Infinity),
    CEL.toInteger("Infinity"),
    CEL.toInteger("-Infinity"),
    CEL.toInteger("fasdas"),
    CEL.toInteger(false),
    CEL.toInteger("adsasd"),
    CEL.toInteger({}),
    CEL.toInteger([]),
    CEL.toIndex(undefined),
    CEL.toIndex(null)
  ])
);


/* toIntegerOrInfinity(); */
CUT.isEqual("toIntegerOrInfinity();",
  "3 3 3 3 -3 -3 -3 -3 1 0 0 Infinity -Infinity Infinity -Infinity 0 0 0 0 0 0 0",
  CUT.join([
    CEL.toIntegerOrInfinity(3),
    CEL.toIntegerOrInfinity("3"),
    CEL.toIntegerOrInfinity(3.14),
    CEL.toIntegerOrInfinity("3.14"),
    CEL.toIntegerOrInfinity(-3),
    CEL.toIntegerOrInfinity(-3.14),
    CEL.toIntegerOrInfinity("-3"),
    CEL.toIntegerOrInfinity("-3.14"),
    CEL.toIntegerOrInfinity(true),
    CEL.toIntegerOrInfinity(0),
    CEL.toIntegerOrInfinity(-0),
    CEL.toIntegerOrInfinity(Infinity),
    CEL.toIntegerOrInfinity(-Infinity),
    CEL.toIntegerOrInfinity("Infinity"),
    CEL.toIntegerOrInfinity("-Infinity"),
    CEL.toIntegerOrInfinity("fasdas"),
    CEL.toIntegerOrInfinity(false),
    CEL.toIntegerOrInfinity("adsasd"),
    CEL.toIntegerOrInfinity({}),
    CEL.toIntegerOrInfinity([]),
    CEL.toIntegerOrInfinity(undefined),
    CEL.toIntegerOrInfinity(null)
  ])
);


/* inRange(); */
CUT.isTrue("inRange();",
      CEL.inRange(4, 3, 6)
  &&  CEL.inRange(-3.14, -4.5, 9.21)
  && !CEL.inRange(2, 3, 6)
  && !CEL.inRange(7, 3, 6)
  && !CEL.inRange(-5.14, -4.5, 9.21)
  && !CEL.inRange(-9.24, -4.5, 9.21)
);


/* randomInt(); */
CUT.isTrue("randomInt();", CEL.randomInt() <= 101);
CUT.isTrue("randomInt(max);", CEL.randomInt(30) <= 30);
token1 = CEL.randomInt(51, 55);
CUT.isTrue("randomInt(min,max);", token1 >= 51 && token1 <= 55);


/* randomFloat(); */
CUT.isTrue("randomFloat();", CEL.randomFloat() <= 101);
CUT.isTrue("randomFloat(max);", CEL.randomFloat(30) <= 30);
token1 = CEL.randomFloat(51, 55);
CUT.isTrue("randomFloat(min,max);", token1 >= 51 && token1 <= 55);


/* toFloat16(); */
CUT.isEqual("toFloat16();",
  "0 0 0 65504 -65504 3.14 -3.14 65504 -65504 65504 -65504 65504 -65504 65504 -65504 0",
  CUT.join([
    CEL.toFloat16(0),
    CEL.toFloat16(+0),
    CEL.toFloat16(-0),
    CEL.toFloat16(Number.POSITIVE_INFINITY),
    CEL.toFloat16(Number.NEGATIVE_INFINITY),
    CEL.toFloat16(3.14),
    CEL.toFloat16(-3.14),
    CEL.toFloat16(65504),
    CEL.toFloat16(-65504),
    CEL.toFloat16(65504.0),
    CEL.toFloat16(-65504.0),
    CEL.toFloat16(65504.1),
    CEL.toFloat16(-65504.1),
    CEL.toFloat16(65505),
    CEL.toFloat16(-65505),
    CEL.toFloat16("lorem")
  ])
);


/* isFloat16(); */
CUT.isTrue("isFloat16();",
      CEL.isFloat16(0)
  &&  CEL.isFloat16(+0)
  &&  CEL.isFloat16(-0)
  &&  CEL.isFloat16(65504)
  &&  CEL.isFloat16(-65504)
  &&  CEL.isFloat16(3.14)
  &&  CEL.isFloat16(-3.14)
  && !CEL.isFloat16(65504.1)
  && !CEL.isFloat16(-65504.1)
  && !CEL.isFloat16(65505)
  && !CEL.isFloat16(-65505)
  && !CEL.isFloat16("lorem")
  && !CEL.isFloat16(true)
  && !CEL.isFloat16([])
);


/* signbit(); */
CUT.isTrue("signbit();",
      CEL.signbit("-5")
  &&  CEL.signbit("-4.2")
  &&  CEL.signbit(-3.14)
  &&  CEL.signbit(-1)
  &&  CEL.signbit(-0)
  &&  CEL.signbit(-Infinity)
  && !CEL.signbit("str")
  && !CEL.signbit("5")
  && !CEL.signbit("4.2")
  && !CEL.signbit(3.14)
  && !CEL.signbit(1)
  && !CEL.signbit(0)
  && !CEL.signbit(+0)
  && !CEL.signbit(Infinity)
  && !CEL.signbit(+Infinity)
);


/* divMod(); */
CUT.isEqual("divMod(); 01", CEL.divMod(7, 3), 2);
CUT.isEqual("divMod(); 02", CEL.divMod(-7, 3), -2);
CUT.isEqual("divMod(); 03", CEL.divMod(-7, -3), 2);
CUT.isEqual("divMod(); 04", CEL.divMod(7n, 3n), 2n);
CUT.isEqual("divMod(); 05", CEL.divMod(-7n, 3n), -2n);
CUT.isEqual("divMod(); 06", CEL.divMod(-7n, -3n), 2n);
// @ts-ignore
CUT.isError("divMod(); 07", () => CEL.divMod(10, 3n));
// @ts-ignore
CUT.isError("divMod(); 08", () => CEL.divMod(false, true));
CUT.isError("divMod(); 09", () => CEL.divMod(3, 0));
CUT.isError("divMod(); 10", () => CEL.divMod(3n, 0n));


/* mod(); */
CUT.isEqual("mod(); 01", CEL.mod(7, 3), 1);
CUT.isEqual("mod(); 02", CEL.mod(-7, 3), -1);
CUT.isEqual("mod(); 03", CEL.mod(-7, -3), -1);
CUT.isEqual("mod(); 04", CEL.mod(7n, 3n), 1n);
CUT.isEqual("mod(); 05", CEL.mod(-7n, 3n), -1n);
CUT.isEqual("mod(); 06", CEL.mod(-7n, -3n), -1n);
// @ts-ignore
CUT.isError("mod(); 07", () => CEL.mod(10, 3n));
// @ts-ignore
CUT.isError("mod(); 08", () => CEL.mod(false, true));
CUT.isError("mod(); 09", () => CEL.mod(3, 0));
CUT.isError("mod(); 10", () => CEL.mod(3n, 0n));


/* add(); */
CUT.isEqual("add(); 01", CEL.add(10, 5), 15);
CUT.isEqual("add(); 02", CEL.add(-10, 5), -5);
CUT.isEqual("add(); 03", CEL.add(10n, 5n), 15n);
CUT.isEqual("add(); 04", CEL.add(-10n, 5n), -5n);
// @ts-ignore
CUT.isError("add(); 05", () => CEL.add(10, 3n));
// @ts-ignore
CUT.isError("add(); 06", () => CEL.add(false, true));


/* sub(); */
CUT.isEqual("sub(); 01", CEL.sub(10, 5), 5);
CUT.isEqual("sub(); 02", CEL.sub(-10, 5), -15);
CUT.isEqual("sub(); 03", CEL.sub(10n, 5n), 5n);
CUT.isEqual("sub(); 04", CEL.sub(-10n, 5n), -15n);
// @ts-ignore
CUT.isError("sub(); 05", () => CEL.sub(10, 3n));
// @ts-ignore
CUT.isError("sub(); 06", () => CEL.sub(false, true));


/* mul(); */
CUT.isEqual("mul(); 01", CEL.mul(10, 5), 50);
CUT.isEqual("mul(); 02", CEL.mul(-10, 5), -50);
CUT.isEqual("mul(); 03", CEL.mul(10n, 5n), 50n);
CUT.isEqual("mul(); 04", CEL.mul(-10n, 5n), -50n);
// @ts-ignore
CUT.isError("mul(); 05", () => CEL.mul(10, 3n));
// @ts-ignore
CUT.isError("mul(); 06", () => CEL.mul(false, true));


/* div(); */
CUT.isEqual("div(); 01", CEL.div(10, 5), 2);
CUT.isEqual("div(); 02", CEL.div(-10, 5), -2);
CUT.isEqual("div(); 03", CEL.div(10n, 5n), 2n);
CUT.isEqual("div(); 04", CEL.div(-10n, 5n), -2n);
// @ts-ignore
CUT.isError("div(); 05", () => CEL.div(10, 3n));
// @ts-ignore
CUT.isError("div(); 06", () => CEL.div(false, true));


/* clamp(); */
CUT.isError("clamp(); 01 error", () => CEL.clamp(15, 10, NaN));
CUT.isError("clamp(); 02 error", () => CEL.clamp(15, Infinity, -Infinity));
CUT.isError("clamp(); 03 error", () => CEL.clamp(15, 10, 5));
CUT.isNotEqual("clamp(); 04", NaN, CEL.clamp(NaN, 10,   15));
CUT.isEqual("clamp(); 05",    0,   CEL.clamp(15,  -0,   0));
CUT.isEqual("clamp(); 06",    0,   CEL.clamp(0,   -0,   15));
CUT.isEqual("clamp(); 07",    15,  CEL.clamp(10,  15,   20));
CUT.isEqual("clamp(); 08",    0,   CEL.clamp(-0,  -10,  0));
CUT.isEqual("clamp(); 09",    0,   CEL.clamp(0,   -10,  -0));
CUT.isEqual("clamp(); 10",    20,  CEL.clamp(25,   10,  20));
CUT.isEqual("clamp(); 11",    15,  CEL.clamp(15,   10,  20));
// @ts-ignore
CUT.isEqual("clamp(); 12",    0,   CEL.clamp(15,   -0n, 0));
CUT.isEqual("clamp(); 13",    0n,  CEL.clamp(0n,   -0,  15));
// @ts-ignore
CUT.isEqual("clamp(); 14",    15,  CEL.clamp(10,   15,  20n));
CUT.isEqual("clamp(); 15",    0n,  CEL.clamp(-0n,  -10, 0));
// @ts-ignore
CUT.isEqual("clamp(); 16",    0,   CEL.clamp(0,    -10, -0n));
// @ts-ignore
CUT.isEqual("clamp(); 17",    20,  CEL.clamp(25,   10n, 20));
// @ts-ignore
CUT.isEqual("clamp(); 18",    15n, CEL.clamp(15n,  10n, 20n));
// @ts-ignore
CUT.isEqual("clamp(); 19",    10n, CEL.clamp(5,  10n, 20n));
CUT.isEqual("clamp(); 20",    10,  CEL.clamp(5,  10, 20));


/* minmax(); */
CUT.isError("minmax(); 01 error", () => CEL.minmax(15, 10, NaN));
CUT.isError("minmax(); 02 error", () => CEL.minmax(15, Infinity, -Infinity));
CUT.isError("minmax(); 03 error", () => CEL.minmax(15, 10, 5));
CUT.isNotEqual("minmax(); 04", NaN, CEL.minmax(NaN, 10,   15));
CUT.isEqual("minmax(); 05",    0,   CEL.minmax(15,  -0,   0));
CUT.isEqual("minmax(); 06",    0,   CEL.minmax(0,   -0,   15));
CUT.isEqual("minmax(); 07",    15,  CEL.minmax(10,  15,   20));
CUT.isEqual("minmax(); 08",    0,   CEL.minmax(-0,  -10,  0));
CUT.isEqual("minmax(); 09",    0,   CEL.minmax(0,   -10,  -0));
CUT.isEqual("minmax(); 10",    20,  CEL.minmax(25,   10,  20));
CUT.isEqual("minmax(); 11",    15,  CEL.minmax(15,   10,  20));
// @ts-ignore
CUT.isEqual("minmax(); 12",    0,   CEL.minmax(15,   -0n, 0));
CUT.isEqual("minmax(); 13",    0n,  CEL.minmax(0n,   -0,  15));
// @ts-ignore
CUT.isEqual("minmax(); 14",    15,  CEL.minmax(10,   15,  20n));
CUT.isEqual("minmax(); 15",    0n,  CEL.minmax(-0n,  -10, 0));
// @ts-ignore
CUT.isEqual("minmax(); 16",    0,   CEL.minmax(0,    -10, -0n));
// @ts-ignore
CUT.isEqual("minmax(); 17",    20,  CEL.minmax(25,   10n, 20));
// @ts-ignore
CUT.isEqual("minmax(); 18",    15n, CEL.minmax(15n,  10n, 20n));
// @ts-ignore
CUT.isEqual("minmax(); 19",    10n, CEL.minmax(5,    10n, 20n));
CUT.isEqual("minmax(); 20",    10,  CEL.minmax(5,    10, 20));


/* product(); */
CUT.isEqual("product(); 01", CEL.product(3), 3);
CUT.isEqual("product(); 02", CEL.product(3, 5), 15);
CUT.isEqual("product(); 03", CEL.product(3.14, -5), -15.700000000000001);
CUT.isEqual("product(); 04", "NaN",
  // @ts-ignore
  String(CEL.product(true, 3.14, -9, 'Arthur Dent'))
);
// @ts-ignore
CUT.isEqual("product(); 05", CEL.product(), undefined);


/* sum(); */
CUT.isEqual("sum(); 01", CEL.sum(3), 3);
CUT.isEqual("sum(); 02", CEL.sum(3, 5), 8);
CUT.isEqual("sum(); 03", CEL.sum(3.14, -5), -1.8599999999999999);
CUT.isEqual("sum(); 04",
  CEL.sum(true, 3.14, -9, "Arthur Dent"), "-4.859999999999999Arthur Dent"
);
CUT.isEqual("sum(); 05", CEL.sum(), 0);


/* avg(); */
CUT.isEqual("avg(); 01", CEL.avg(2, 4, 3), 3);
CUT.isEqual("avg(); 02", CEL.avg(2, 4, 3.14), 3.046666666666667);
CUT.isEqual("avg(); 03", CEL.avg(2, -8, 3.14), -0.9533333333333333);
CUT.isEqual("avg(); 04", CEL.avg(5), 5);
CUT.isEqual("avg(); 05", String(CEL.avg()), "NaN");


/* isEven(); */
CUT.isTrue("isEven();",
  // @ts-ignore
  CEL.isEven(8) && !CEL.isEven(9) && !CEL.isEven(8.5) && !CEL.isEven("lorem")
);


/* isOdd(); */
CUT.isTrue("isOdd();",
  // @ts-ignore
  CEL.isOdd(9) && CEL.isOdd(8.5) && !CEL.isOdd(8) && !CEL.isOdd("lorem")
);


/* toInt8(); */
CUT.isEqual("toInt8(); 01", CEL.toInt8(9), 9);
CUT.isEqual("toInt8(); 02", CEL.toInt8(-5), -5);
CUT.isEqual("toInt8(); 03", CEL.toInt8(8.5), 8);
CUT.isEqual("toInt8(); 04", CEL.toInt8(-8.5), -8);
CUT.isEqual("toInt8(); 05", CEL.toInt8(130), 127);
CUT.isEqual("toInt8(); 06", CEL.toInt8(-130), -128);
CUT.isEqual("toInt8(); 07", CEL.toInt8("Arthur Dent"), 0);
CUT.isEqual("toInt8(); 08", CEL.toInt8(Infinity), 127);
CUT.isEqual("toInt8(); 09", CEL.toInt8("-Infinity"), -128);


/* toUInt8(); */
CUT.isEqual("toUInt8(); 01", CEL.toUInt8(9), 9);
CUT.isEqual("toUInt8(); 02", CEL.toUInt8(-5), 0);
CUT.isEqual("toUInt8(); 03", CEL.toUInt8(8.5), 8);
CUT.isEqual("toUInt8(); 04", CEL.toUInt8(-8.5), 0);
CUT.isEqual("toUInt8(); 05", CEL.toUInt8(1130), 255);
CUT.isEqual("toUInt8(); 06", CEL.toUInt8("Arthur Dent"), 0);
CUT.isEqual("toUInt8(); 07", CEL.toUInt8(Infinity), 255);
CUT.isEqual("toUInt8(); 08", CEL.toUInt8("-Infinity"), 0);


/* toInt16(); */
CUT.isEqual("toInt16(); 01", CEL.toInt16(199), 199);
CUT.isEqual("toInt16(); 02", CEL.toInt16(-1845), -1845);
CUT.isEqual("toInt16(); 03", CEL.toInt16(8.5), 8);
CUT.isEqual("toInt16(); 04", CEL.toInt16(-8.5), -8);
CUT.isEqual("toInt16(); 05", CEL.toInt16(111130), 32767);
CUT.isEqual("toInt16(); 06", CEL.toInt16(-111130), -32768);
CUT.isEqual("toInt16(); 07", CEL.toInt16("Arthur Dent"), 0);
CUT.isEqual("toInt16(); 08", CEL.toInt16(Infinity), 32767);
CUT.isEqual("toInt16(); 09", CEL.toInt16("-Infinity"), -32768);


/* toUInt16(); */
CUT.isEqual("toUInt16(); 01", CEL.toUInt16(199), 199);
CUT.isEqual("toUInt16(); 02", CEL.toUInt16(-1845), 0);
CUT.isEqual("toUInt16(); 03", CEL.toUInt16(8.5), 8);
CUT.isEqual("toUInt16(); 04", CEL.toUInt16(-8.5), 0);
CUT.isEqual("toUInt16(); 05", CEL.toUInt16(111130), 65535);
CUT.isEqual("toUInt16(); 06", CEL.toUInt16("Arthur Dent"), 0);
CUT.isEqual("toUInt16(); 07", CEL.toUInt16(Infinity), 65535);
CUT.isEqual("toUInt16(); 08", CEL.toUInt16("-Infinity"), 0);


/* toInt32(); */
CUT.isEqual("toInt32(); 01", CEL.toInt32(199), 199);
CUT.isEqual("toInt32(); 02", CEL.toInt32(-1845), -1845);
CUT.isEqual("toInt32(); 03", CEL.toInt32(8.5), 8);
CUT.isEqual("toInt32(); 04", CEL.toInt32(-8.5), -8);
CUT.isEqual("toInt32(); 05", CEL.toInt32(2147483649), 2147483647);
CUT.isEqual("toInt32(); 06", CEL.toInt32(-3147483649), -2147483648);
CUT.isEqual("toInt32(); 07", CEL.toInt32("Arthur Dent"), 0);
CUT.isEqual("toInt32(); 08", CEL.toInt32(Infinity), 2147483647);
CUT.isEqual("toInt32(); 09", CEL.toInt32("-Infinity"), -2147483648);


/* toUInt32(); */
CUT.isEqual("toUInt32(); 01", CEL.toUInt32(199), 199);
CUT.isEqual("toUInt32(); 02", CEL.toUInt32(-1845), 0);
CUT.isEqual("toUInt32(); 03", CEL.toUInt32(8.5), 8);
CUT.isEqual("toUInt32(); 04", CEL.toUInt32(-8.5), 0);
CUT.isEqual("toUInt32(); 05", CEL.toUInt32(4294967297), 4294967295);
CUT.isEqual("toUInt32(); 06", CEL.toUInt32("Arthur Dent"), 0);
CUT.isEqual("toUInt32(); 07", CEL.toUInt32(Infinity), 4294967295);
CUT.isEqual("toUInt32(); 08", CEL.toUInt32("-Infinity"), 0);


/* toBigInt64(); */
CUT.isEqual("toBigInt64(); 01", CEL.toBigInt64(199), 199n);
CUT.isEqual("toBigInt64(); 02", CEL.toBigInt64(-1845), -1845n);
CUT.isEqual("toBigInt64(); 03", CEL.toBigInt64(8.5), 8n);
CUT.isEqual("toBigInt64(); 04", CEL.toBigInt64(-8.5), -8n);
CUT.isEqual("toBigInt64(); 05", CEL.toBigInt64(9223372036854775809),
  9223372036854775808n
);
CUT.isEqual("toBigInt64(); 06", CEL.toBigInt64("Arthur Dent"), 0n);
CUT.isEqual("toBigInt64(); 07", CEL.toBigInt64(Infinity),
  9223372036854775808n
);
CUT.isEqual("toBigInt64(); 08", CEL.toBigInt64("-Infinity"),
  -9223372036854775808n
);
CUT.isEqual("toBigInt64(); 09", CEL.toBigInt64(18446744073709551617),
  9223372036854775808n
);
CUT.isEqual("toBigInt64(); 10", CEL.toBigInt64(-18446744073709551617),
  -9223372036854775808n
);


/* toBigUInt64(); */
CUT.isEqual("toBigUInt64(); 01", CEL.toBigUInt64(199), 199n);
CUT.isEqual("toBigUInt64(); 02", CEL.toBigUInt64(-1845), 0n);
CUT.isEqual("toBigUInt64(); 03", CEL.toBigUInt64(8.5), 8n);
CUT.isEqual("toBigUInt64(); 04", CEL.toBigUInt64(-8.5), 0n);
CUT.isEqual("toBigUInt64(); 05", CEL.toBigUInt64(18446744073709551617),
  18446744073709551616n
);
CUT.isEqual("toBigUInt64(); 06", CEL.toBigUInt64("Arthur Dent"), 0n);
CUT.isEqual("toBigUInt64(); 07", CEL.toBigUInt64(Infinity),
  18446744073709551616n
);
CUT.isEqual("toBigUInt64(); 08", CEL.toBigUInt64("-Infinity"), 0n);
CUT.isEqual("toBigUInt64(); 09", CEL.toBigUInt64(-9223372036854775808n), 0n);


/* toFloat32(); */
CUT.isEqual("toFloat32(); 01", CEL.toFloat32(199), 199);
CUT.isEqual("toFloat32(); 02", CEL.toFloat32(-1845), -1845);
CUT.isEqual("toFloat32(); 03", CEL.toFloat32(8.5), 8.5);
CUT.isEqual("toFloat32(); 04", CEL.toFloat32(-8.5), -8.5);
CUT.isEqual("toFloat32(); 05", CEL.toFloat32(-3.4e39), -3.4e+38);
CUT.isEqual("toFloat32(); 06", CEL.toFloat32(3.4e39), +3.4e38);
CUT.isEqual("toFloat32(); 07", CEL.toFloat32("Arthur Dent"), 0);
CUT.isEqual("toFloat32(); 08", CEL.toFloat32(Infinity), 3.4e+38);
CUT.isEqual("toFloat32(); 09", CEL.toFloat32("-Infinity"), -3.4e+38);


/* isInt8(); */
CUT.isTrue("isInt8();",
      CEL.isInt8(34)
  &&  CEL.isInt8(-34)
  && !CEL.isInt8(-129)
  && !CEL.isInt8(128)
  && !CEL.isInt8(34.5)
  && !CEL.isInt8(-34.5)
  && !CEL.isInt8("Arthur Dent")
  && !CEL.isInt8(true)
  && !CEL.isInt8(false)
  && !CEL.isInt8(Infinity)
  && !CEL.isInt8(-Infinity)
  && !CEL.isInt8([])
  && !CEL.isInt8({})
);


/* isUInt8(); */
CUT.isTrue("isUInt8();",
      CEL.isUInt8(34)
  && !CEL.isUInt8(-34)
  && !CEL.isUInt8(-1)
  && !CEL.isUInt8(256)
  && !CEL.isUInt8(34.5)
  && !CEL.isUInt8(-34.5)
  && !CEL.isUInt8("Arthur Dent")
  && !CEL.isUInt8(true)
  && !CEL.isUInt8(false)
  && !CEL.isUInt8(Infinity)
  && !CEL.isUInt8(-Infinity)
  && !CEL.isUInt8([])
  && !CEL.isUInt8({})
);


/* isInt16(); */
CUT.isTrue("isInt16();",
      CEL.isInt16(34)
  &&  CEL.isInt16(-34)
  && !CEL.isInt16(-32769)
  && !CEL.isInt16(32768)
  && !CEL.isInt16(34.5)
  && !CEL.isInt16(-34.5)
  && !CEL.isInt16("Arthur Dent")
  && !CEL.isInt16(true)
  && !CEL.isInt16(false)
  && !CEL.isInt16(Infinity)
  && !CEL.isInt16(-Infinity)
  && !CEL.isInt16([])
  && !CEL.isInt16({})
);


/* isUInt16(); */
CUT.isTrue("isUInt16();",
      CEL.isUInt16(34)
  && !CEL.isUInt16(-34)
  && !CEL.isUInt16(-1)
  && !CEL.isUInt16(65536)
  && !CEL.isUInt16(34.5)
  && !CEL.isUInt16(-34.5)
  && !CEL.isUInt16("Arthur Dent")
  && !CEL.isUInt16(true)
  && !CEL.isUInt16(false)
  && !CEL.isUInt16(Infinity)
  && !CEL.isUInt16(-Infinity)
  && !CEL.isUInt16([])
  && !CEL.isUInt16({})
);


/* isInt32(); */
CUT.isTrue("isInt32();",
      CEL.isInt32(34)
  &&  CEL.isInt32(-34)
  && !CEL.isInt32(-2147483649)
  && !CEL.isInt32(2147483648)
  && !CEL.isInt32(34.5)
  && !CEL.isInt32(-34.5)
  && !CEL.isInt32("Arthur Dent")
  && !CEL.isInt32(true)
  && !CEL.isInt32(false)
  && !CEL.isInt32(Infinity)
  && !CEL.isInt32(-Infinity)
  && !CEL.isInt32([])
  && !CEL.isInt32({})
);


/* isUInt32(); */
CUT.isTrue("isUInt32();",
      CEL.isUInt32(34)
  && !CEL.isUInt32(-34)
  && !CEL.isUInt32(-1)
  && !CEL.isUInt32(4294967296)
  && !CEL.isUInt32(34.5)
  && !CEL.isUInt32(-34.5)
  && !CEL.isUInt32("Arthur Dent")
  && !CEL.isUInt32(true)
  && !CEL.isUInt32(false)
  && !CEL.isUInt32(Infinity)
  && !CEL.isUInt32(-Infinity)
  && !CEL.isUInt32([])
  && !CEL.isUInt32({})
);


/* isBigInt64(); */
CUT.isTrue("isBigInt64();",
      CEL.isBigInt64(34n)
  &&  CEL.isBigInt64(-34n)
  && !CEL.isBigInt64(-9223372036854775809n)
  && !CEL.isBigInt64(9223372036854775809n)
  && !CEL.isBigInt64(34.5)
  && !CEL.isBigInt64(-34.5)
  && !CEL.isBigInt64("Arthur Dent")
  && !CEL.isBigInt64(true)
  && !CEL.isBigInt64(false)
  && !CEL.isBigInt64(Infinity)
  && !CEL.isBigInt64(-Infinity)
  && !CEL.isBigInt64([])
  && !CEL.isBigInt64({})
);


/* isBigUInt64(); */
CUT.isTrue("isBigUInt64();",
      CEL.isBigUInt64(34n)
  && !CEL.isBigUInt64(-34n)
  && !CEL.isBigUInt64(-1n)
  && !CEL.isBigUInt64(18446744073709551617n)
  && !CEL.isBigUInt64(34.5)
  && !CEL.isBigUInt64(-34.5)
  && !CEL.isBigUInt64("Arthur Dent")
  && !CEL.isBigUInt64(true)
  && !CEL.isBigUInt64(false)
  && !CEL.isBigUInt64(Infinity)
  && !CEL.isBigUInt64(-Infinity)
  && !CEL.isBigUInt64([])
  && !CEL.isBigUInt64({})
);


/** Async **/
CUT.log("Async testcases");

/*
CUT.log("Here have to be these results:");
CUT.log("8x Array.fromAsync();");
CUT.log("1x asyncNoop(); is working");
CUT.log("1x asyncT(); is working");
CUT.log("1x asyncF(); is working</li>");
CUT.log("1x asyncConstant(); is working</li>");
CUT.log("1x asyncIdentity(); is working</li>");
*/


/* asyncNoop(); */
CEL.asyncNoop().then(function(_result) {
  CUT.isTrue("asyncNoop(); is working", true);
});


/* asyncT(); */
CEL.asyncT().then(function(result) {
  CUT.isTrue("asyncT(); is working", result);
});


/* asyncF(); */
CEL.asyncF().then(function(result) {
  CUT.isFalse("asyncF(); is working", result);
});


/* asyncConstant(); */
(CEL.asyncConstant(true))().then(function(result) {
  CUT.isTrue("asyncConstant(); is working", result);
});


/* asyncIdentity(); */
CEL.asyncIdentity(true).then(function(_result) {
  CUT.isTrue("asyncIdentity(); is working", true);
});


/* Array.fromAsync(); */
token1 = async function* asyncIterable () {
  for (let i = 0; i < 5; i++) {
    await new Promise((resolve)=> setTimeout(resolve,100*i));
    yield i;
  }
};
Array.fromAsync(token1()).then((res) =>
  CUT.isEqual("Array.fromAsync(); 01", JSON.stringify(res), "[0,1,2,3,4]")
);
Array.fromAsync(token1(), (x) => x * 2).then((res) =>
  CUT.isEqual("Array.fromAsync(); 02", JSON.stringify(res), "[0,2,4,6,8]")
);
Array.fromAsync([4, 5, 6, 7, 8]).then((res) =>
  CUT.isEqual("Array.fromAsync(); 03", JSON.stringify(res), "[4,5,6,7,8]")
);
Array.fromAsync([4, 5, 6, 7, 8], (x) => x * 2).then((res) =>
  CUT.isEqual("Array.fromAsync(); 04", JSON.stringify(res), "[8,10,12,14,16]")
);
Array.fromAsync(new Set([4, 5, 6, 6, 10])).then((res) =>
  CUT.isEqual("Array.fromAsync(); 05", JSON.stringify(res), "[4,5,6,10]")
);
Array.fromAsync(new Set([4, 5, 6, 6, 10]), (x) => x * 2).then((res) =>
  CUT.isEqual("Array.fromAsync(); 06", JSON.stringify(res), "[8,10,12,20]")
);
Array.fromAsync({"0": 3, "1": 4, "2": 5, length: 3}).then((res) =>
  CUT.isEqual("Array.fromAsync(); 07", JSON.stringify(res), "[3,4,5]")
);
Array.fromAsync({"0": 3, "1": 4, "2": 5, length: 3}, (x) => x * 2).then((res) =>
  CUT.isEqual("Array.fromAsync(); 08", JSON.stringify(res), "[6,8,10]")
);


CUT.log("End of the test.")


}());


} catch (e) {
  CUT.isTrue("[CUT global try-catch]"
    + "\n"
    + CUT.getHumanReadableJSON(e, " ")
    + "\n"
    // @ts-ignore
    + CUT.getHumanReadableJSON(e),
    false
  );
  console.log(CUT.getHumanReadableJSON(e, " "));
  // @ts-ignore
  console.log(CUT.getHumanReadableJSON(e));
  /* console.log(JSON.stringify(e, Object.getOwnPropertyNames(e))); */
}
