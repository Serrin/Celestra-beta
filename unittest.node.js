"use strict";

/* import method 1 - defaultExport */
// /*
console.log("import method 1 - defaultExport");
import defaultExport from "./celestra.node.mjs";
globalThis.celestra = defaultExport;
globalThis.CEL = defaultExport;
//*/

/* import method 2 - default as celestra */
/*
console.log("import method 2 - default as celestra");
import { default as celestra } from "./celestra.node.mjs";
globalThis.celestra = celestra;
globalThis.CEL = celestra;
*/

/* import method 3 - import *  as celestra */
/*
console.log("import method 3 - import * as celestra");
import * as celestra from "./celestra.node.mjs";
globalThis.celestra = celestra;
globalThis.CEL = celestra;
*/


const CUT = {};

CUT.VERSION = "Celestra Unit Tester (CUT) v1.30.0 for Node.js";

/* __addTest__(<step: string>, <expected>, <expression>); */
/* __addTest__(<step: string>, <expected>, <expression>[, strict: boolean]); */
/* only for inner calls and selftest */
CUT.__addTest__ = function __addTest__ (step,expected,expression, strict=true) {
  step = String(step);
  if (strict === undefined) { strict = true; }
  if (strict ? expected === expression : expected == expression) {
    /*
    let resultStr = "[" + Date.now().toString(36) + "] [passed] " + step;
    console.log(resultStr);
    */
  } else {
    let resultStr = "[" + Date.now().toString(36) + "] [failed] " + step;
    console.error(resultStr);
  }
};

/* isTrue(<step: string>, <expression>[, strict: boolean]); */
CUT.isTrue = function isTrue (step, expression, strict = true) {
  CUT.__addTest__(step, true, expression, strict);
};

/* isFalse(<step: string>, <expression>[, strict: boolean]); */
CUT.isFalse = function isFalse (step, expression, strict = true) {
  CUT.__addTest__(step, false, expression, strict);
};

/* isEqual(<step: string>, <expected>, <expression>); */
/* isEqual(<step: string>, <expected>, <expression>[, strict: boolean]); */
CUT.isEqual = function isEqual (step, expected, expression, strict = true) {
  CUT.__addTest__(step, expected, expression, strict);
};

/* isNotEqual(<step: string>, <notExpected>, <expression>); */
/* isNotEqual(<step: string>, <notExpected>, <expression>[, strict: boolean]);*/
CUT.isNotEqual = function (step, notExpected, expression, strict = true) {
  CUT.__addTest__(step, true,
    (strict ? notExpected !== expression : notExpected != expression), true
  );
};

/* isError((<step: string>, <callback: function>); */
CUT.isError = function (step, callback) {
  try {
    callback();
    CUT.isTrue(step, false);
  } catch (e) {
    CUT.isTrue(step + " - \n\`\"" + e + "\"\`", true);
  }
};

/* log(<innerHTML>); */
CUT.log = function log (str) {
  console.log("[" + Date.now().toString(36) + "] [info] " + str);
};

/* logCode(<innerHTML>); */
CUT.logCode = function log (str) {
  console.log(
    "[" + Date.now().toString(36) + "] [code] " + "`" + str + "`"
  );
};

/* clear(); */
CUT.clear = function clear () { console.clear(); };

/* concat(<item1, item2, ...itemN>): string */
CUT.concat = function concat (...args) {
  let r = "";
  for (let item of args) { r += item; }
  return r;
};

/* join(<iterator>[, separator = " "]): string */
CUT.join = function join (it, separator = " ") {
  separator = String(separator);
  let r = "";
  for (let item of it) { r += separator + item; }
  return r.slice(separator.length);
}

/* take(<iterator>[,n=1]): iterator); */
CUT.take = function* take (it, n = 1) {
  let i = n;
  for (let item of it) {
    if (i <= 0) { break; }
    yield item;
    i--;
  }
}

/* getHumanReadableJSON(<value>[, space]): string */
CUT.getHumanReadableJSON = function getReadableJSON (value, space) {
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
const nowISOString = now.toISOString().slice(0, 19) + "\n"
  +now.toISOString().slice(20);
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
console.table(process.versions);
console.log("");


/* ======================================================================== */


try {

/** Selftest **/
CUT.log("CUT Selftest");

CUT.__addTest__("[Selftest] - __addTest__(); success", 1, 1);
CUT.__addTest__("[Selftest] - __addTest__(); failed", 1, 2);
CUT.__addTest__("[Selftest] - __addTest__(); success non-strict",
  0, false, false
);
CUT.__addTest__("[Selftest] - __addTest__(); failed strict", 0, false, true);

CUT.isTrue("[Selftest] - isTrue(); success", true);
CUT.isTrue("[Selftest] - isTrue(); failed", false);

CUT.isFalse("[Selftest] - isFalse(); success", false);
CUT.isFalse("[Selftest] - isFalse(); failed", true);

CUT.isEqual("[Selftest] - isEqual(); success", 1, 1);
CUT.isEqual("[Selftest] - isEqual(); failed", 1, 2);
CUT.isEqual(
  "[Selftest] - isEqual(); success non-strict",
  0, false, false
);
CUT.isEqual("[Selftest] - isEqual(); failed strict", 0, false, true);

CUT.isNotEqual("[Selftest] - isNotEqual(); success", 1, 2);
CUT.isNotEqual("[Selftest] - isNotEqual(); failed", 1, 1);
CUT.isNotEqual(
  "[Selftest] - isNotEqual(); success strict", 0, false, true
);
CUT.isNotEqual(
  "[Selftest] - isNotEqual(); failed non-strict", 0, false, false
);

} catch (e) {
  console.error("CUT initialisation error: " + CUT.getHumanReadableJSON(e));
}


/* ======================================================================== */


try {


(function(){
"use strict";


var token1 = 0, token2 = 0, token3 = 0, token4 = 0, token5 = 0;
var token6 = 0, token7 = 0, token8 = 0, token9 = 0, token10 = 0;
var token11 = 0, token12 = 0, token13 = 0, token14 = 0, token15 = 0;


/* Celestra v6.0.1 testcases */


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
CUT.isTrue("randomUUIDv7(); - <code>\"" + token1 + "\"</code>",
  token1.length === 36
    && /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/
      .test(token1)
    && token1[14] === "7"
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



/* classof(); begin */
CUT.isEqual("classof(); ES5 values",
  "array number string object boolean null undefined function date regexp",
  CUT.join([
    CEL.classof([1, 2, 3]),
    CEL.classof(1998),
    CEL.classof("hello world"),
    CEL.classof({a: 1, b: 2}),
    CEL.classof(true),
    CEL.classof(null),
    CEL.classof(undefined),
    CEL.classof(function () {}),
    CEL.classof(new Date()),
    CEL.classof(/^\[object (.+)\]$/g)
  ])
);
CUT.isTrue("classof(); ES5 true",
  CEL.classof([1, 2, 3], "array")
    && CEL.classof(1998, "number")
    && CEL.classof("hello world", "string")
    && CEL.classof({a : 1, b: 2}, "object")
    && CEL.classof(true, "boolean")
    && CEL.classof(null, "null")
    && CEL.classof(undefined, "undefined")
    && CEL.classof(function(){},"function")
    && CEL.classof(new Date(),"date")
    && CEL.classof(/^\[object (.+)\]$/g, "regexp")
);
CUT.isFalse("classof(); ES5 false",
  CEL.classof([1, 2, 3], "number")
    || CEL.classof(1998, "array")
    || CEL.classof("hello world","object")
    || CEL.classof({a:1,b:2},"string")
    || CEL.classof(null, "undefined")
    || CEL.classof(undefined, "null")
    || CEL.classof(function(){}, "object")
    || CEL.classof(new Date(),"array")
    || CEL.classof(/^\[object (.+)\]$/g, "string")
);
CUT.isEqual("classof(); ES6 values", "map set weakmap weakset",
  CUT.join([
    CEL.classof(new Map()),
    CEL.classof(new Set()),
    CEL.classof(new WeakMap()),
    CEL.classof(new WeakSet())
  ])
);
CUT.isTrue("classof(); ES6 true",
  CEL.classof(new Map(), "map")
    && CEL.classof(new Set(), "set")
    && CEL.classof(new WeakMap(), "weakmap")
    && CEL.classof(new WeakSet(), "weakset")
);
CUT.isFalse("classof(); ES6 false",
  CEL.classof(new Map(), "object")
    || CEL.classof(new Set(), "object")
    || CEL.classof(new WeakMap(), "object")
    || CEL.classof(new WeakSet(), "object")
);
if (!!globalThis.BigInt) {
  CUT.isEqual("classof(); ES6 bigint", "bigint true false",
    CUT.join([
      CEL.classof(BigInt(456)),
      CEL.classof(BigInt(456), "bigint"),
      CEL.classof(BigInt(456), "object")
    ])
  );
}
/* classof(); end */


/* getType(); begin */
CUT.isEqual("getType(); ES5 values",
  "array number string object boolean null undefined function date regexp",
  CUT.join([
    CEL.getType([1, 2, 3]),
    CEL.getType(1998),
    CEL.getType("hello world"),
    CEL.getType({a:1,b:2}),
    CEL.getType(true),
    CEL.getType(null),
    CEL.getType(undefined),
    CEL.getType(function () {}),
    CEL.getType(new Date()),
    CEL.getType(/^\[object (.+)\]$/g)
  ])
);
CUT.isTrue("getType(); ES5 true",
  CEL.getType([1, 2, 3], "array")
    || CEL.getType(1998, "number")
    || CEL.getType("hello world", "string")
    || CEL.getType({ a: 1, b: 2}, "object")
    || CEL.getType(true, "boolean")
    || CEL.getType(null, "null")
    || CEL.getType(undefined, "undefined")
    || CEL.getType(function () {}, "function")
    || CEL.getType(new Date(), "date")
    || CEL.getType(/^\[object (.+)\]$/g, "regexp")
);
CUT.isFalse("getType(); ES5 false",
  CEL.getType([1, 2, 3], "number")
    || CEL.getType(1998, "array")
    || CEL.getType("hello world", "object")
    || CEL.getType({ a: 1 , b: 2}, "string")
    || CEL.getType(null, "undefined")
    || CEL.getType(undefined, "null")
    || CEL.getType(function(){}, "object")
    || CEL.getType(new Date(),"array")
    || CEL.getType(/^\[object (.+)\]$/g, "string")
);
CUT.isEqual("getType(); ES6 values", "map set weakmap weakset",
  CUT.join([
    CEL.getType(new Map()),
    CEL.getType(new Set()),
    CEL.getType(new WeakMap()),
    CEL.getType(new WeakSet())
  ])
);
CUT.isTrue("getType(); ES6 true",
  CEL.getType(new Map(), "map")
    && CEL.getType(new Set(), "set")
    && CEL.getType(new WeakMap(), "weakmap")
    && CEL.getType(new WeakSet(), "weakset")
);
CUT.isFalse("getType(); ES6 false",
  CEL.getType(new Map(), "object")
    || CEL.getType(new Set(), "object")
    || CEL.getType(new WeakMap(), "object")
    || CEL.getType(new WeakSet(), "object")
);
if (!!globalThis.BigInt) {
  CUT.isEqual("getType(); ES6 bigint", "bigint true false",
    CUT.join([
      CEL.getType(BigInt(456)),
      CEL.getType(456n, "bigint"),
      CEL.getType(456n, "object")
    ])
  );
}
/* getType(); end */


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


/* assertFail(); */
CUT.isError("assertFail(); 01 error", () => CEL.assertFail(42));
CUT.isError("assertFail(); 02 error", () => CEL.assertFail(new Error("ipsum")));


/* assertMatch(); */
CUT.isTrue("assertMatch(); 01 ok",
  CEL.assertMatch("table football", /fo+/, "lorem")
);
CUT.isError("assertMatch(); 02 error",
  () => CEL.assertMatch("table football", /go+/, "lorem")
);
CUT.isError("assertMatch(); 03 error",
  () => CEL.assertMatch(42, /go+/, "lorem")
);
CUT.isError("assertMatch(); 04 error",
  () => CEL.assertMatch("table football", 42, "lorem")
);
CUT.isError("assertMatch(); 05 error",
  () => CEL.assertMatch("table football", 42, new Error("ipsum"))
);


/* assertDoesNotMatch(); */
CUT.isTrue("assertDoesNotMatch(); 01 ok",
  CEL.assertDoesNotMatch("table football", /go+/, "lorem")
);
CUT.isError("assertDoesNotMatch(); 02 error",
  () => CEL.assertDoesNotMatch("table football", /fo+/, "lorem")
);
CUT.isError("assertDoesNotMatch(); 03 error",
  () => CEL.assertDoesNotMatch(42, /go+/, "lorem")
);
CUT.isError("assertDoesNotMatch(); 04 error",
  () => CEL.assertDoesNotMatch("table football", 42, "lorem")
);
CUT.isError("assertDoesNotMatch(); 05 error",
  () => CEL.assertDoesNotMatch("table football", 42, new Error("ipsum"))
);


/* assertThrows(); */
CUT.isTrue("assertThrows(); 01 ok",
  Error.isError(CEL.assertThrows(() => { throw new Error() }))
);
CUT.isError("not strict assert.assertThrows(); 02 error",
  () => CEL.assertThrows(42)
);
CUT.isError("not strict assert.assertThrows(); 03 error",
  () => CEL.assertThrows(
    () => {}, "not strict assert.assertThrows(); 03 error"
  )
);
CUT.isError("not strict assert.assertThrows(); 04 error",
  () => CEL.assertThrows(() => {}, new Error("ipsum"))
);


/* assertIsNil(); */
CUT.isEqual("assertIsNil(); 01 ok", null,
  CEL.assertIsNil(null, "assert.isNullable(); 01 ok")
);
CUT.isEqual("assertIsNil(); 01 ok", undefined,
  CEL.assertIsNil(undefined, "assert.isNullable(); 01 ok")
);
CUT.isError("assertIsNil(); 03 error",
  () => CEL.assertIsNil({}, "assertIsNil(); 03 error")
);
CUT.isError("assertIsNil(); 04 error",
  () => CEL.assertIsNil(42, "assertIsNil(); 04 error")
);
CUT.isError("assertIsNil(); 05 error",
  () => CEL.assertIsNil(42, new Error("ipsum"))
);


/* assertIsNotNil(); */
CUT.isEqual("assertIsNotNil(); 01 ok", 42,
  CEL.assertIsNotNil(42, "assertIsNotNil(); 01 ok")
);
token1 = {};
CUT.isEqual("assertIsNotNil(); 02 ok", token1,
  CEL.assertIsNotNil(token1, "assertIsNotNil(); 02 ok")
);
CUT.isError("assertIsNotNil(); 03 error",
  () => CEL.assertIsNotNil(null, "assertIsNotNil(); 03 error")
);
CUT.isError("assertIsNotNil(); 04 error",
  () => CEL.assertIsNotNil(undefined, "assertIsNotNil(); 04 error")
);
CUT.isError("assertIsNotNil(); 05 error",
  () => CEL.assertIsNotNil(undefined, new Error("ipsum"))
);



/* assertTypeOf(); */
token1 = 42;
token2 = Object(42);
token3 = [];
CUT.isEqual("assertTypeOf(); 01", token1, CEL.assertTypeOf(token1, "number"));
CUT.isError("assertTypeOf(); 02", () => CEL.assertTypeOf(token2, Number));
CUT.isError("assertTypeOf(); 03", () => CEL.assertTypeOf(token3, Array));
CUT.isError("assertTypeOf(); 04", () => CEL.assertTypeOf(token3, Object));
CUT.isError("assertTypeOf(); 05 error",
  () => CEL.assertTypeOf(token1, 42n, "assertTypeOf(); 05 error")
);
CUT.isError("assertTypeOf(); 06 error",
  () => CEL.assertTypeOf(token1, Number, "assertTypeOf(); 06 error")
);
CUT.isError("assertTypeOf(); 07 error",
  () => CEL.assertTypeOf(token3, Map, "assertTypeOf(); 07 error")
);
CUT.isError("assertTypeOf(); 08 error",
  () => CEL.assertTypeOf(token3, Map, new Error("ipsum"))
);


/* assertInstanceOf(); */
token1 = 42;
token2 = Object(42);
token3 = [];
CUT.isError("assertInstanceOf(); 01",
  () => CEL.assertInstanceOf(token1, "number")
);
CUT.isEqual("assertInstanceOf(); 02", token2, CEL.assertInstanceOf(token2, Number));
CUT.isEqual("assertInstanceOf(); 03", token3, CEL.assertInstanceOf(token3, Array));
CUT.isEqual("assertInstanceOf(); 04", token3, CEL.assertInstanceOf(token3, Object));
CUT.isError("assertInstanceOf(); 05 error",
  () => CEL.assertInstanceOf(token1, 42n, "assertInstanceOf(); 05 error")
);
CUT.isError("assertInstanceOf(); 06 error",
  () => CEL.assertInstanceOf(token1, Number, "assertInstanceOf(); 06 error")
);
CUT.isError("assertInstanceOf(); 07 error",
  () => CEL.assertInstanceOf(token3, Map, "assertInstanceOf(); 07 error")
);
CUT.isError("assertInstanceOf(); 08 error",
  () => CEL.assertInstanceOf(token3, Map, new Error("ipsum"))
);


/* assertNotTypeOf(); */
token1 = 42;
token2 = Object(42);
token3 = [];
CUT.isError("assertNotTypeOf(); 01 error",
  () => CEL.assertNotTypeOf(token1, "number", "assertNotTypeOf(); 01 error")
);
CUT.isError("assertNotTypeOf(); 02 error",
  () => CEL.assertNotTypeOf(token2, Number, "assertNotTypeOf(); 02 error")
);
CUT.isError("assertNotTypeOf(); 03 error",
  () => CEL.assertNotTypeOf(token3, Array, "assertNotTypeOf(); 03 error")
);
CUT.isError("assertNotTypeOf(); 04 error",
  () => CEL.assertNotTypeOf(token3, Object, "assertNotTypeOf(); 04 error")
);
CUT.isError("assertNotTypeOf(); 05 error",
  () => CEL.assertNotTypeOf(token1, 42, "assertNotTypeOf(); 05 error")
);
CUT.isError("assertNotTypeOf(); 06 error",
  () => CEL.assertNotTypeOf(token1, Number)
);
CUT.isEqual("assertNotTypeOf(); 07", token2,
  CEL.assertNotTypeOf(token2, "number")
);
CUT.isError("assertNotTypeOf(); 08", () => CEL.assertNotTypeOf(token3, Map));
CUT.isError("assertNotTypeOf(); 09",
  () => CEL.assertNotTypeOf(token3, Map, new Error("ipsum"))
);


/* assertNotInstanceOf(); */
token1 = 42;
token2 = Object(42);
token3 = [];
CUT.isError("assertNotInstanceOf(); 01 error",
  () => CEL.assertNotInstanceOf(token1, "number",
    "assertNotInstanceOf(); 01 error"
  )
);
CUT.isError("assertNotInstanceOf(); 02 error",
  () => CEL.assertNotInstanceOf(token2, Number,
    "assertNotInstanceOf(); 02 error"
  )
);
CUT.isError("assertNotInstanceOf(); 03 error",
  () => CEL.assertNotInstanceOf(token3, Array,
    "assertNotInstanceOf(); 03 error"
  )
);
CUT.isError("assertNotInstanceOf(); 04 error",
  () => CEL.assertNotInstanceOf(
    token3, Object, "assertNotInstanceOf(); 04 error"
  )
);
CUT.isError("assertNotInstanceOf(); 05 error",
  () => CEL.assertNotInstanceOf(token1, 42, "assertNotInstanceOf(); 05 error")
);
CUT.isEqual("assertNotInstanceOf(); 06", token1,
  CEL.assertNotInstanceOf(token1, Number)
);
CUT.isError("assertNotInstanceOf(); 07",
  () => CEL.assertNotInstanceOf(token2, "number")
);
CUT.isEqual("assertNotInstanceOf(); 08", token3,
  CEL.assertNotInstanceOf(token3, Map)
);
CUT.isEqual("assertNotInstanceOf(); 09", token3,
  CEL.assertNotInstanceOf(token3, Map, new Error("ipsum"))
);


/* assert(); */
CUT.isTrue("assert(); 01",
     CEL.assert(true)
  && CEL.assert(true, "assert true")
  && CEL.assert(1)
  && CEL.assert(1, "assert true")
);
CUT.isError("assert(); 02 error",
  () => CEL.assert(false, "assert(); 02 error")
);
CUT.isError("assert(); 03 error",
  () => CEL.assert(0, "assert(); 03 error")
);
CUT.isError("assert(); 04 error",
  () => CEL.assert(0, new Error("ipsum"))
);


/* assertTrue(); */
CUT.isTrue("assertTrue(); 01",
     CEL.assertTrue(true)
  && CEL.assertTrue(true, "assert true")
  && CEL.assertTrue(1)
  && CEL.assertTrue(1, "assert true")
);
CUT.isError("assertTrue(); 02 error",
  () => CEL.assert(false, "assertTrue(); 02 error")
);
CUT.isError("assertTrue(); 03 error",
  () => CEL.assert(0, "assertTrue(); 03 error")
);
CUT.isError("assertTrue(); 04 error", () => CEL.assert(0, new Error("ipsum")));


/* assertFalse(); */
CUT.isTrue("assertFalse(); 01",
     CEL.assertFalse(false)
  && CEL.assertFalse(false, "lorem")
  && CEL.assertFalse(0)
  && CEL.assertFalse(0, "lorem")
);
CUT.isError("assertFalse(); 02 error",
  () => CEL.assertFalse(true, "assertFalse(); 02 error")
);
CUT.isError("assertFalse(); 03 error",
  () => CEL.assertFalse(1, "assertFalse(); 03 error")
);
CUT.isError("assertFalse(); 04 error",
  () => CEL.assertFalse(1, new Error("ipsum"))
);


/* assertEqual(); */
CUT.isTrue("assertEqual(); 01",
     CEL.assertEqual(NaN, NaN)
  && CEL.assertEqual(42, 42)
  && CEL.assertEqual(42, "42")
);
CUT.isError("assertEqual(); 02 error",
  () => CEL.assertEqual(null, false, "assertEqual(); 02 error")
);
CUT.isError("assertEqual(); 03 error",
  () => CEL.assertEqual(null, false, new Error("ipsum"))
);


/* assertStrictEqual(); */
CUT.isTrue("assertStrictEqual(); 01", CEL.assertStrictEqual(NaN, NaN));
CUT.isTrue("assertStrictEqual(); 02", CEL.assertStrictEqual(42, 42));
CUT.isError("assertStrictEqual(); 03 error",
  () => CEL.assertStrictEqual(42, "42", "assertStrictEqual(); 03 error")
);
CUT.isError("assertStrictEqual(); 04 error",
  () => CEL.assertStrictEqual(null, false, "assertStrictEqual(); 04 error")
);
CUT.isError("assertStrictEqual(); 05 error",
  () => CEL.assertStrictEqual(null, false, new Error("ipsum"))
);


/* assertNotEqual(); */
CUT.isTrue("assertNotEqual(); 01", CEL.assertNotEqual(null, false, "lorem"));
CUT.isError("assertNotEqual(); 02 error",
  () => CEL.assertNotEqual(NaN, NaN, "assertNotEqual(); 02 error")
);
CUT.isError("assertNotEqual(); 03 error",
  () => CEL.assertNotEqual(42, 42, "assertNotEqual(); 03 error")
);
CUT.isError("42", "assertNotEqual(); 04 error",
  () => CEL.assertNotEqual(42, "42", "assertNotEqual(); 04 error")
);
CUT.isError("42", "assertNotEqual(); 05 error",
  () => CEL.assertNotEqual(42, "42", new Error("ipsum"))
);


/* assertNotStrictEqual(); */
CUT.isTrue("assertNotStrictEqual(); 01",
  CEL.assertNotStrictEqual(42, "42", "assertNotStrictEqual(); 01")
);
CUT.isTrue("assertNotStrictEqual(); 02",
  CEL.assertNotStrictEqual(null, false, "assertNotStrictEqual(); 02")
);
CUT.isError("assertNotStrictEqual(); 03 error",
  () => CEL.assertNotStrictEqual(NaN, NaN, "assertNotStrictEqual(); 03")
);
CUT.isError("assertNotStrictEqual(); 04 error",
  () => CEL.assertNotStrictEqual(42, 42, "assertNotStrictEqual(); 04 error")
);
CUT.isTrue("assertNotStrictEqual(); 05", CEL.assertNotStrictEqual(42, "42"));
CUT.isTrue("assertNotStrictEqual(); 05",
  CEL.assertNotStrictEqual(42, "42", new Error("ipsum"))
);


/* assertDeepEqual(); begin */
CUT.isError("assertDeepEqual(); 00 - error parameter",
  () => CEL.assertDeepEqual(42, 43, new Error("ipsum"))
);
/* primitives / number + Object wrappers */
CUT.isTrue("assertDeepEqual(); 01a - ok", CEL.assertDeepEqual(42, 42));
CUT.isError("assertDeepEqual(); 01b - error",
  () => CEL.assertDeepEqual(42, 43, "assertDeepEqual(); 01b - error")
);
CUT.isTrue("assertDeepEqual(); 01c - ok", CEL.assertDeepEqual(42, Object(42)));
CUT.isTrue("assertDeepEqual(); 01d - ok", CEL.assertDeepEqual(Object(42), 42));
CUT.isError("assertDeepEqual(); 01e - error",
  () => CEL.assertDeepEqual(42, Object(43), "assertDeepEqual(); 01e - error")
);
CUT.isError("assertDeepEqual(); 01f - error",
  () => CEL.assertDeepEqual(Object(42), 43, "assertDeepEqual(); 01f - error")
);
CUT.isTrue("assertDeepEqual(); 01g - ok",
  CEL.assertDeepEqual(Object(42), Object(42))
);
CUT.isError("assertDeepEqual(); 01h - error",
  () =>
  CEL.assertDeepEqual(Object(42), Object(43), "assertDeepEqual(); 01h - error")
);
/* primitives / number: 0, -0, NaN, Infinity, -Infinity */
CUT.isTrue("assertDeepEqual(); 01i - ok", CEL.assertDeepEqual(0, 0));
CUT.isTrue("assertDeepEqual(); 01j - ok", CEL.assertDeepEqual(-0, -0));
CUT.isTrue("assertDeepEqual(); 01k - ok", CEL.assertDeepEqual(-0, 0));
CUT.isTrue("assertDeepEqual(); 01l - ok", CEL.assertDeepEqual(-0, +0));
CUT.isTrue("assertDeepEqual(); 01m - ok", CEL.assertDeepEqual(NaN, NaN));
CUT.isTrue("assertDeepEqual(); 01n - ok",
  CEL.assertDeepEqual(Infinity, Infinity)
);
CUT.isTrue("assertDeepEqual(); 01o - ok",
  CEL.assertDeepEqual(-Infinity, -Infinity)
);
CUT.isError("assertDeepEqual(); 01p - error",
  () =>
    CEL.assertDeepEqual(Infinity, -Infinity, "assertDeepEqual(); 01p - error")
);
/* primitives / not same type */
CUT.isTrue("assertDeepEqual(); 01q - ok", CEL.assertDeepEqual(42, "42"));
CUT.isTrue("assertDeepEqual(); 01r - ok", CEL.assertDeepEqual(1, true));
CUT.isTrue("assertDeepEqual(); 01s - ok", CEL.assertDeepEqual(1n, true));
CUT.isError("assertDeepEqual(); 01t - error",
  () => CEL.assertDeepEqual(1n, "1n","assertDeepEqual(); 01t - error")
);
CUT.isTrue("assertDeepEqual(); 01u - ok", CEL.assertDeepEqual(false, ""));
/* primitives / bigint + Object wrappers */
CUT.isTrue("assertDeepEqual(); 02a - ok", CEL.assertDeepEqual(42n, 42n));
CUT.isError("assertDeepEqual(); 02b - error",
  () => CEL.assertDeepEqual(42n, 43n, "assertDeepEqual(); 02b - error")
);
CUT.isTrue("assertDeepEqual(); 02c - ok",
  CEL.assertDeepEqual(42n, Object(42n))
);
CUT.isTrue("assertDeepEqual(); 02d - ok",
  CEL.assertDeepEqual(Object(42n), 42n)
);
CUT.isError("assertDeepEqual(); 02e - error",
  () => CEL.assertDeepEqual(42n, Object(43n), "assertDeepEqual(); 02e - error")
);
CUT.isError("assertDeepEqual(); 02f - error",
  () => CEL.assertDeepEqual(Object(42n), 43n, "assertDeepEqual(); 02f - error")
);
CUT.isTrue("assertDeepEqual(); 02g - ok",
  CEL.assertDeepEqual(Object(42n), Object(42n))
);
CUT.isError("assertDeepEqual(); 02h - error",
  () => CEL.assertDeepEqual(
    Object(42n), Object(43n), "assertDeepEqual(); 02h - error"
  )
);
/* primitives / string + Object wrappers */
CUT.isTrue("assertDeepEqual(); 03a - ok",
  CEL.assertDeepEqual("lorem", "lorem")
);
CUT.isError("assertDeepEqual(); 03b - error",
  () => CEL.assertDeepEqual("lorem", "ipsum", "assertDeepEqual(); 03b - error")
);
CUT.isTrue("assertDeepEqual(); 03c - ok",
  CEL.assertDeepEqual("lorem", Object("lorem"))
);
CUT.isTrue("assertDeepEqual(); 03d - ok",
  CEL.assertDeepEqual(Object("lorem"), "lorem")
);
CUT.isError("assertDeepEqual(); 03e - error",
  () => CEL.assertDeepEqual("lorem", Object("ipsum"),
    "assertDeepEqual(); 03e - error"
  )
);
CUT.isError("assertDeepEqual(); 03f - error",
  () => CEL.assertDeepEqual(Object("lorem"), "ipsum",
    "assertDeepEqual(); 03f - error"
  )
);
CUT.isTrue("assertDeepEqual(); 03g - ok",
  CEL.assertDeepEqual(Object("lorem"), Object("lorem"))
);
CUT.isError("assertDeepEqual(); 03h - error",
  () => CEL.assertDeepEqual(Object("lorem"), Object("ipsum"),
    "assertDeepEqual(); 03h - error"
  )
);
/* primitives / boolean + Object wrappers */
CUT.isTrue("assertDeepEqual(); 04a - ok", CEL.assertDeepEqual(true, true));
CUT.isError("assertDeepEqual(); 04b - error",
  () => CEL.assertDeepEqual(true, false, "assertDeepEqual(); 04b - error")
);
CUT.isTrue("assertDeepEqual(); 04c - ok",
  CEL.assertDeepEqual(true, Object(true))
);
CUT.isTrue("assertDeepEqual(); 04d - ok",
  CEL.assertDeepEqual(Object(true), true)
);
CUT.isTrue("assertDeepEqual(); 04d - ok",
  CEL.assertDeepEqual(Object(true), true)
);
CUT.isError("assertDeepEqual(); 04e - error",
  () => CEL.assertDeepEqual(true, Object(false), "assertDeepEqual(); 04e - error")
);
CUT.isError("assertDeepEqual(); 04f - error",
  () =>
    CEL.assertDeepEqual(Object(true), false, "assertDeepEqual(); 04f - error")
);
CUT.isTrue("assertDeepEqual(); 04g - ok",
  CEL.assertDeepEqual(Object(true), Object(true))
);
CUT.isError("assertDeepEqual(); 04h - error",
  () => CEL.assertDeepEqual(
    Object(true), Object(false), "assertDeepEqual(); 04h - error"
  )
);
/* primitives / Symbol */
token1 = Symbol("Agradzsag");
token2 = Symbol("Agradzsag");
token3 = Symbol("Trillian");
CUT.isTrue("assertDeepEqual(); 05a - ok", CEL.assertDeepEqual(token1, token1));
CUT.isError("assertDeepEqual(); 05b - error",
  () => CEL.assertDeepEqual(token1, token2, "assertDeepEqual(); 05b - error")
);
CUT.isError("assertDeepEqual(); 05c - error",
  () => CEL.assertDeepEqual(token1, token3, "assertDeepEqual(); 05c - error")
);
/* objects / Array */
CUT.isTrue("assertDeepEqual(); 06a - ok", CEL.assertDeepEqual([1, 2], [1, 2]));
CUT.isError("assertDeepEqual(); 06b - error",
  () => CEL.assertDeepEqual([1, 2], [1, 3], "assertDeepEqual(); 06b - error")
);
CUT.isTrue("assertDeepEqual(); 06c - ok",
  CEL.assertDeepEqual([1, 2], [1, "2"])
);
CUT.isError("assertDeepEqual(); 06d - error",
  () => CEL.assertDeepEqual([1, 2], [1, 2, 3], "assertDeepEqual(); 06d - error")
);
/* objects / Set */
token1 = new Set([1, 2]);
token2 = new Set([1, 2]);
token3 = new Set([1, 3]);
token4 = new Set([1, "2"]);
token5 = new Set([1, 2, 3]);
CUT.isTrue("assertDeepEqual(); 07a - ok", CEL.assertDeepEqual(token1, token2));
CUT.isError("assertDeepEqual(); 07b - error",
  () => CEL.assertDeepEqual(token1, token3, "assertDeepEqual(); 07b - error")
);
CUT.isError("assertDeepEqual(); 07c - error",
  () => CEL.assertDeepEqual(token1, token4, "assertDeepEqual(); 07c - error")
);
CUT.isError("assertDeepEqual(); 07d - error",
  () => CEL.assertDeepEqual(token1, token5, "assertDeepEqual(); 07d - error")
);
/* objects / TypedArrays */
token1 = Int16Array.from([34, 45]);
token2 = Int16Array.from([34, 45]);
token3 = Int16Array.from([34, 46]);
token5 = Int16Array.from([34, 45, 56]);
CUT.isTrue("assertDeepEqual(); 08a - ok", CEL.assertDeepEqual(token1, token2));
CUT.isError("assertDeepEqual(); 08b - error",
  () => CEL.assertDeepEqual(token1, token3, "assertDeepEqual(); 08b - error")
);
CUT.isError("assertDeepEqual(); 08c - error",
  () => CEL.assertDeepEqual(token1, token5, "assertDeepEqual(); 08c - error")
);
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
CUT.isTrue("assertDeepEqual(); 09a - ok", CEL.assertDeepEqual(token1, token2));
CUT.isTrue("assertDeepEqual(); 09b - ok", CEL.assertDeepEqual(token6, token6));
CUT.isError("assertDeepEqual(); 09c - error",
  () => CEL.assertDeepEqual(token1, token3, "assertDeepEqual(); 09c - error")
);
CUT.isTrue("assertDeepEqual(); 09d - ok", CEL.assertDeepEqual(token1, token4));
CUT.isError("assertDeepEqual(); 09e - error",
  () => CEL.assertDeepEqual(token1, token5, "assertDeepEqual(); 09e - error")
);
CUT.isError("assertDeepEqual(); 09f - error",
  () => CEL.assertDeepEqual(token6, token7, "assertDeepEqual(); 09f - error")
);
CUT.isError("assertDeepEqual(); 09g - error",
  () => CEL.assertDeepEqual(token6, token8, "assertDeepEqual(); 09g - error")
);
/* objects / Map */
token1 = new Map([["a", 1], ["b", 2]]);
token2 = new Map([["a", 1], ["b", 2]]);
token3 = new Map([["a", 1], ["b", 3]]);
token4 = new Map([["a", 1], ["b", "2"]]);
token5 = new Map([["a", 1], ["b", 2], ["c", 3]]);
CUT.isTrue("assertDeepEqual(); 10a - ok", CEL.assertDeepEqual(token1, token2));
CUT.isError("assertDeepEqual(); 10b - error",
  () => CEL.assertDeepEqual(token1, token3, "assertDeepEqual(); 10b - error")
);
CUT.isTrue("assertDeepEqual(); 10c - ok", CEL.assertDeepEqual(token1, token4));
CUT.isError("assertDeepEqual(); 10d - error",
  () => CEL.assertDeepEqual(token1, token5, "assertDeepEqual(); 10d - error")
);
/* objects / weakset + weakmap*/
token1 = new WeakSet();
token2 = new WeakSet();
CUT.isTrue("assertDeepEqual(); 11a - ok", CEL.assertDeepEqual(token1, token1));
CUT.isError("assertDeepEqual(); 11b - error",
  () => CEL.assertDeepEqual(token1, token2, "assertDeepEqual(); 11b - error")
);
token1 = new WeakMap();
token2 = new WeakMap();
CUT.isTrue("assertDeepEqual(); 11c - ok", CEL.assertDeepEqual(token1, token1));
CUT.isError("assertDeepEqual(); 11d - error",
  () => CEL.assertDeepEqual(token1, token2, "assertDeepEqual(); 11d - error")
);
/* objects / Function */
CUT.isTrue("assertDeepEqual(); 12a - ok",
  CEL.assertDeepEqual(Array.from, Array.from)
);
CUT.isError("assertDeepEqual(); 12b - error",
  () => CEL.assertDeepEqual(
    Array.from, Array.of, "assertDeepEqual(); 12b - error"
  )
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
CUT.isTrue("assertDeepEqual(); 13a - ok", CEL.assertDeepEqual(token1, token1));
CUT.isError("assertDeepEqual(); 13b - error",
  () => CEL.assertDeepEqual(token1, token2, "assertDeepEqual(); 13b - error")
);
CUT.isTrue("assertDeepEqual(); 13c - ok", CEL.assertDeepEqual(token1, token3));
/* objects / Error */
token1 = new Error("Agradzsag");
token2 = new Error("Agradzsag");
token3 = new TypeError("Agradzsag");
token3 = new TypeError("Agradzsag");
CUT.isTrue("assertDeepEqual(); 14a - ok", CEL.assertDeepEqual(token1, token1));
CUT.isTrue("assertDeepEqual(); 14b - ok", CEL.assertDeepEqual(token3, token3));
CUT.isError("assertDeepEqual(); 14c - error",
  () => CEL.assertDeepEqual(token1, token2, "assertDeepEqual(); 14c - error")
);
CUT.isError("assertDeepEqual(); 14d - error",
  () => CEL.assertDeepEqual(token1, token3, "assertDeepEqual(); 14d - error")
);
/* types: null, undefined */
CUT.isTrue("assertDeepEqual(); 15a - ok", CEL.assertDeepEqual(null, null));
CUT.isTrue("assertDeepEqual(); 15b - ok",
  CEL.assertDeepEqual(undefined, undefined)
);
CUT.isTrue("assertDeepEqual(); 15c - ok", CEL.assertDeepEqual(null, undefined));
/* structures 1 */
token1 = new Error("Agradzsag");
token2 = [1,2,{"3": 4, "5": new Map([["6", 7], ["8", [9, token1]]])}];
token3 = [1,2,{"3": 4, "5": new Map([["6", 7], ["8", [9, token1]]])}];
token4 = [1,2,{"3": 4, "5": new Map([["6", 7], ["8", [9, 42]]])}];
token5 = [1,2,{"3": 4, "5": new Map([["6", 7], ["8", [9, token1, 42]]])}];
token6 = [1,2,{"3": 4, "5": new Map([["6", 7], ["8", [9, token1]]])}];
CUT.isTrue("assertDeepEqual(); 16a - ok", CEL.assertDeepEqual(token2, token2));
CUT.isTrue("assertDeepEqual(); 16b - ok", CEL.assertDeepEqual(token2, token3));
CUT.isError("assertDeepEqual(); 16c - error",
  () => CEL.assertDeepEqual(token2, token4, "assertDeepEqual(); 16c - error")
);
CUT.isError("assertDeepEqual(); 16d - error",
  () => CEL.assertDeepEqual(token2, token5, "assertDeepEqual(); 16d - error")
);
CUT.isTrue("assertDeepEqual(); 16e - ok", CEL.assertDeepEqual(token2, token6));
/* structures 2 */
token1 = new Error("Agradzsag");
token2 = [1, 2, {"3": 4, "5": new Map([["6", 7], ["8", [9, 10]], ["11", new Set([12, 13])]])}, token1];
token3 = [1, 2, {"3": 4, "5": new Map([["6", 7], ["8", [9, 10]], ["11", new Set([12, 13])]])}, token1];
token4 = [1, 2, {"3": 4, "5": new Map([["6", 7], ["8", ["a", 10]], ["11", new Set([12, 13])]])}, token1];
token5 = [1, 2, {"3": 4, "5": new Map([["6", 7], ["8", [9, 10]], ["11", new Set([12, 13, 14])]])}, token1];
token6 = [1, 2, {"3": 4, "5": new Map([["6", 7], ["8", [9, 10]], ["11", new Set([12, 13])]])}, token1];
CUT.isTrue("assertDeepEqual(); 17a - ok", CEL.assertDeepEqual(token2, token2));
CUT.isTrue("assertDeepEqual(); 17b - ok", CEL.assertDeepEqual(token2, token3));
CUT.isError("assertDeepEqual(); 17c - error",
  () => CEL.assertDeepEqual(token2, token4, "assertDeepEqual(); 17c - error")
);
CUT.isError("assertDeepEqual(); 17d - error",
  () => CEL.assertDeepEqual(token2, token5, "assertDeepEqual(); 17d - error")
);
CUT.isTrue("assertDeepEqual(); 17e - ok", CEL.assertDeepEqual(token2, token6));
/* structures 3 */
token1 = new Error("Agradzsag");
token2 = [1, 2, {"3": 4, "5": new Map([["6", 7], ["8", [9, 10]], ["11", new Set([12, 13])]])}, token1];
token3 = [1, 2, {"3": 4, "5": new Map([["6", 7], ["8", [9, 10]], ["11", new Set([12, 13])]])}, token1];
token4 = [1, 2, {"3": 4, "5": new Map([["6", 8], ["8", [9, 10]], ["11", new Set([12, 14])]])}, token1];
token5 = [1, 2, {"3": 4, "5": new Map([["6", 8], ["8", [9, 10, 15]], ["11", new Set([12, 13])]])}, token1];
token6 = [1, 2, {"3": 4, "5": new Map([["6", "7"], ["8", [9, 10]], ["11", new Set([12, 13])]])}, token1];
CUT.isTrue("assertDeepEqual(); 18a - ok", CEL.assertDeepEqual(token2, token2));
CUT.isTrue("assertDeepEqual(); 18b - ok", CEL.assertDeepEqual(token2, token3));
CUT.isError("assertDeepEqual(); 18c - error",
  () => CEL.assertDeepEqual(token2, token4, "assertDeepEqual(); 18c - error")
);
CUT.isError("assertDeepEqual(); 18d - error",
  () => CEL.assertDeepEqual(token2, token5, "assertDeepEqual(); 18d - error")
);
CUT.isTrue("assertDeepEqual(); 18e - ok", CEL.assertDeepEqual(token2, token6));
/* structures 4 */
token1 = new Error("Agradzsag");
token2 = [1,2,{"3": 4, "5": new Map([["6", 7], ["8", [9, 10]], ["11", new Set([12, 13])]])}, token1];
token3 = [1,2,{"3": 4, "5": new Map([["6", 7], ["8", [9, 10]], ["11", new Set([12, 13])]])}, token1];
token4 = [1,5,{"3": 4, "5": new Map([["6", 7], ["8", [9, 10]], ["11", new Set([12, 13])]])}, token1];
token5 = [1,2,{"3": 4, "5": new Map([["6", 7], ["8", [9, 10]], ["11", new Set([12, 13, 14])]])}, token1];
CUT.isTrue("assertDeepEqual(); 19a - ok", CEL.assertDeepEqual(token2, token2));
CUT.isTrue("assertDeepEqual(); 19b - ok", CEL.assertDeepEqual(token2, token3));
CUT.isError("assertDeepEqual(); 19c - error",
  () => CEL.assertDeepEqual(token2, token4, "assertDeepEqual(); 19c - error")
);
CUT.isError("assertDeepEqual(); 19d - error",
  () => CEL.assertDeepEqual(token2, token5, "assertDeepEqual(); 19d - error")
);
/* objects / not same prototype - array */
CUT.isError("assertDeepEqual(); 20a - error",
  () => CEL.assertDeepEqual({}, [], "assertDeepEqual(); 20a - error")
);
CUT.isError("assertDeepEqual(); 20b - error",
  () => CEL.assertDeepEqual(new Map(), [], "assertDeepEqual(); 20b - error")
);
CUT.isError("assertDeepEqual(); 20c - error",
  () => CEL.assertDeepEqual(new Set(), [], "assertDeepEqual(); 20c - error")
);
CUT.isError("assertDeepEqual(); 20d - error",
  () => CEL.assertDeepEqual(new WeakMap(), [], "assertDeepEqual(); 20d - error")
);
CUT.isError("assertDeepEqual(); 20e - error",
  () => CEL.assertDeepEqual(new WeakSet(), [], "assertDeepEqual(); 20e - error")
);
CUT.isError("assertDeepEqual(); 20f - error",
  () => CEL.assertDeepEqual(new Error(), [], "assertDeepEqual(); 20f - error")
);
CUT.isTrue("assertDeepEqual(); 20g - ok", CEL.assertDeepEqual(42, [42]));
CUT.isError("assertDeepEqual(); 20h - error",
  () => CEL.assertDeepEqual(Object(42), [42], "assertDeepEqual(); 20h - error")
);
CUT.isError("assertDeepEqual(); 20i - error",
  () => CEL.assertDeepEqual(true, [true], "assertDeepEqual(); 20i - error")
);
CUT.isError("assertDeepEqual(); 20j - error",
  () =>
    CEL.assertDeepEqual(Object(true), [true], "assertDeepEqual(); 20j - error")
);
CUT.isTrue("assertDeepEqual(); 20k - ok",
  CEL.assertDeepEqual("lorem", ["lorem"])
);
CUT.isError("assertDeepEqual(); 20l - error",
  () => CEL.assertDeepEqual(
    Object("lorem"), ["lorem"], "assertDeepEqual(); 20l - error"
  )
);
CUT.isTrue("assertDeepEqual(); 20m - ok", CEL.assertDeepEqual(42n, [42n]));
CUT.isError("assertDeepEqual(); 20n - error",
  () => CEL.assertDeepEqual(
    Object(42n), [42n], "assertDeepEqual(); 20n - error"
  )
);
/* objects / not same prototype - map */
CUT.isTrue("assertDeepEqual(); 21a - ok",
  CEL.assertDeepEqual(new Map(), new Set())
);
CUT.isTrue("assertDeepEqual(); 21b - ok",
  CEL.assertDeepEqual(new Map(), new WeakSet())
);
CUT.isTrue( "assertDeepEqual(); 21c - ok",
  CEL.assertDeepEqual(new Map(), new WeakMap())
);
CUT.isError("assertDeepEqual(); 21d - error",
  () => CEL.assertDeepEqual(
    new Error(), new Map(), "assertDeepEqual(); 21d - error"
  )
);
CUT.isError("assertDeepEqual(); 21e - error",
  () => CEL.assertDeepEqual(42, new Map(), "assertDeepEqual(); 21e - error")
);
CUT.isTrue("assertDeepEqual(); 21f - ok",
  CEL.assertDeepEqual(Object(42), new Map())
);
CUT.isError("assertDeepEqual(); 21g - error",
  () => CEL.assertDeepEqual(true, new Map(), "assertDeepEqual(); 21g - error")
);
CUT.isTrue("assertDeepEqual(); 21h - ok",
  CEL.assertDeepEqual(Object(true), new Map())
);
CUT.isError("assertDeepEqual(); 21i - error",
  () => CEL.assertDeepEqual(
    "lorem", new Map(), "assertDeepEqual(); 21i - error"
  )
);
CUT.isError("assertDeepEqual(); 21j - error",
  () => CEL.assertDeepEqual(
    Object("lorem"), new Map(), "assertDeepEqual(); 21j - error"
  )
);
CUT.isError("assertDeepEqual(); 21k - error",
  () => CEL.assertDeepEqual(42n, new Map(), "assertDeepEqual(); 21k - error")
);
CUT.isTrue("assertDeepEqual(); 21l - ok",
  CEL.assertDeepEqual(Object(42n), new Map())
);
/* objects / not same prototype - set */
CUT.isTrue("assertDeepEqual(); 22a - ok",
  CEL.assertDeepEqual(new WeakMap(), new Set())
);
CUT.isError("assertDeepEqual(); 22b - error",
  () => CEL.assertDeepEqual(
    new Error(), new Set(), "assertDeepEqual(); 22b - error"
  )
);
CUT.isError("assertDeepEqual(); 22c - error",
  () => CEL.assertDeepEqual(42, new Set(), "assertDeepEqual(); 22c - error")
);
CUT.isTrue("assertDeepEqual(); 22d - ok",
  CEL.assertDeepEqual(Object(42), new Set())
);
CUT.isError("assertDeepEqual(); 22e - error",
  () => CEL.assertDeepEqual(true, new Set(), "assertDeepEqual(); 22e - error")
);
CUT.isTrue("assertDeepEqual(); 22f - ok",
  CEL.assertDeepEqual(Object(true), new Set())
);
CUT.isError("assertDeepEqual(); 22g - error",
  () => CEL.assertDeepEqual(
    "lorem", new Set(), "assertDeepEqual(); 22g - error"
  )
);
CUT.isError("assertDeepEqual(); 22h - error",
  () => CEL.assertDeepEqual(
    Object("lorem"), new Set(), "assertDeepEqual(); 22h - error"
  )
);
CUT.isError("assertDeepEqual(); 22i - error",
  () => CEL.assertDeepEqual(42n, new Set(), "assertDeepEqual(); 22i - error")
);
CUT.isTrue("assertDeepEqual(); 22j - ok",
  CEL.assertDeepEqual(Object(42n), new Set())
);
/* objects / not same prototype - weakset */
CUT.isTrue("assertDeepEqual(); 23a - ok",
  CEL.assertDeepEqual(new WeakMap(), new WeakSet())
);
CUT.isError("assertDeepEqual(); 23b - error",
  () => CEL.assertDeepEqual(
    new Error(), new WeakSet(), "assertDeepEqual(); 23b - error"
  )
);
CUT.isError("assertDeepEqual(); 23c - error",
  () => CEL.assertDeepEqual(42, new WeakSet(), "assertDeepEqual(); 23c - error")
);
CUT.isTrue("assertDeepEqual(); 23d - ok",
  CEL.assertDeepEqual(Object(42), new WeakSet())
);
CUT.isError("assertDeepEqual(); 23e - error",
  () => CEL.assertDeepEqual(
    true, new WeakSet(), "assertDeepEqual(); 23e - error"
  )
);
CUT.isTrue( "assertDeepEqual(); 23f - ok",
  CEL.assertDeepEqual(Object(true), new WeakSet())
);
CUT.isError("assertDeepEqual(); 23g - error",
  () => CEL.assertDeepEqual(
    "lorem", new WeakSet(), "assertDeepEqual(); 23g - error"
  )
);
CUT.isError("assertDeepEqual(); 23h - error",
  () => CEL.assertDeepEqual(
    Object("lorem"), new WeakSet(), "assertDeepEqual(); 23h - error"
  )
);
CUT.isError("assertDeepEqual(); 23i - error",
  () =>
    CEL.assertDeepEqual(42n, new WeakSet(), "assertDeepEqual(); 23i - error")
);
CUT.isTrue("assertDeepEqual(); 23j - ok",
  CEL.assertDeepEqual(Object(42n), new WeakSet())
);
/* objects / not same prototype - weakmap */
CUT.isError("assertDeepEqual(); 24a - error",
  () => CEL.assertDeepEqual(
    new Error(), new WeakMap(), "assertDeepEqual(); 24a - error"
  )
);
CUT.isError("assertDeepEqual(); 24b - error",
  () => CEL.assertDeepEqual(42, new WeakMap(), "assertDeepEqual(); 24b - error")
);
CUT.isTrue("assertDeepEqual(); 24c - ok",
  CEL.assertDeepEqual(Object(42), new WeakMap())
);
CUT.isError("assertDeepEqual(); 24d - error",
  () =>
    CEL.assertDeepEqual(true, new WeakMap(), "assertDeepEqual(); 24d - error")
);
CUT.isTrue("assertDeepEqual(); 24e - ok",
  CEL.assertDeepEqual(Object(true), new WeakMap())
);
CUT.isError("assertDeepEqual(); 24f - error",
  () => CEL.assertDeepEqual(
    "lorem", new WeakMap(), "assertDeepEqual(); 24f - error"
  )
);
CUT.isError("assertDeepEqual(); 24g - error",
  () => CEL.assertDeepEqual(
    Object("lorem"), new WeakMap(), "assertDeepEqual(); 24g - error"
  )
);
CUT.isError("assertDeepEqual(); 24h - error",
  () =>
    CEL.assertDeepEqual(42n, new WeakMap(), "assertDeepEqual(); 24h - error")
);
CUT.isTrue("assertDeepEqual(); 24i - ok",
  CEL.assertDeepEqual(Object(42n), new WeakMap())
);
/* objects / not same prototype - error */
CUT.isError("assertDeepEqual(); 25a - error",
  () => CEL.assertDeepEqual(42, new Error(42), "assertDeepEqual(); 25a - error")
);
CUT.isError("assertDeepEqual(); 25b - error",
  () => CEL.assertDeepEqual(
    Object(42), new Error(42), "assertDeepEqual(); 25b - error"
  )
);
CUT.isError("assertDeepEqual(); 25c - error",
  () => CEL.assertDeepEqual(
    true, new Error(true), "assertDeepEqual(); 25c - error"
  )
);
CUT.isError("assertDeepEqual(); 25d - error",
  () => CEL.assertDeepEqual(
    Object(true), new Error(true), "assertDeepEqual(); 25d - error"
  )
);
CUT.isError("assertDeepEqual(); 25e - error",
  () => CEL.assertDeepEqual(
    "lorem", new Error("lorem"), "assertDeepEqual(); 25e - error"
  )
);
CUT.isError("assertDeepEqual(); 25f - error",
  () => CEL.assertDeepEqual(
    Object("lorem"), new Error("lorem"), "assertDeepEqual(); 25f - error"
  )
);
CUT.isError("assertDeepEqual(); 25g - error",
  () =>
    CEL.assertDeepEqual(42n, new Error(42n), "assertDeepEqual(); 25g - error")
);
CUT.isError("assertDeepEqual(); 25h - error",
  () => CEL.assertDeepEqual(
    Object(42n), new Error(42n), "assertDeepEqual(); 25h - error"
  )
);
/* objects / not same prototype - number */
CUT.isTrue("assertDeepEqual(); 26a - ok", CEL.assertDeepEqual(true, 1));
CUT.isTrue("assertDeepEqual(); 26b - ok", CEL.assertDeepEqual(Object(true), 1));
CUT.isTrue("assertDeepEqual(); 26c - ok", CEL.assertDeepEqual("1", 1));
CUT.isTrue("assertDeepEqual(); 26d - ok", CEL.assertDeepEqual(Object("1"), 1));
CUT.isTrue("assertDeepEqual(); 26e - ok", CEL.assertDeepEqual(42n, 42));
CUT.isTrue("assertDeepEqual(); 26f - ok", CEL.assertDeepEqual(Object(42n), 42));
/* objects / not same prototype - string */
CUT.isError("assertDeepEqual(); 27a - error",
  () => CEL.assertDeepEqual(true, "true", "assertDeepEqual(); 27a - error")
);
CUT.isError("assertDeepEqual(); 27b - error",
  () => CEL.assertDeepEqual(42n, "42n", "assertDeepEqual(); 27b - error")
);
CUT.isTrue("assertDeepEqual(); 27c - ok",
  CEL.assertDeepEqual(Object(42), "42")
);
CUT.isError("assertDeepEqual(); 27d - error",
  () =>
    CEL.assertDeepEqual(Object(42n), "42n", "assertDeepEqual(); 27d - error")
);
CUT.isError("assertDeepEqual(); 27e - error",
  () =>
    CEL.assertDeepEqual(Object(true), "true", "assertDeepEqual(); 27e - error")
);
/* objects / not same prototype - boolean */
CUT.isTrue("assertDeepEqual(); 28a - ok", CEL.assertDeepEqual(1n, true));
CUT.isTrue("assertDeepEqual(); 28b - ok",
  CEL.assertDeepEqual(Object(1n), true)
);
CUT.isTrue( "assertDeepEqual(); 28c - ok",
  CEL.assertDeepEqual(Object(1), true)
);
CUT.isError("assertDeepEqual(); 28d - error",
  () => CEL.assertDeepEqual("true", true, "assertDeepEqual(); 28d - error")
);
/* objects / not same prototype - bigint */
CUT.isTrue("assertDeepEqual(); 29a - ok",
  CEL.assertDeepEqual(Object(42), 42n)
);
CUT.isTrue("assertDeepEqual(); 29b - ok",
  CEL.assertDeepEqual(Object("42"), 42n)
);
/*
Object(true) == 1n -> Firefox: false, Chrome: true
CUT.isError("assertDeepEqual(); 29c - error",
  () => CEL.assertDeepEqual(Object(true), 1n, "assertDeepEqual(); 29c - error")
);
*/
/* objects / not same prototype - Object wrappers */
CUT.isError("assertDeepEqual(); 30a - error",
  () => CEL.assertDeepEqual(
    Object(42), Object("42"), "assertDeepEqual(); 30a - error"
  )
);
CUT.isTrue("assertDeepEqual(); 30b - ok",
  CEL.assertDeepEqual(Object(1), Object(true))
);
CUT.isTrue("assertDeepEqual(); 30c - ok",
  CEL.assertDeepEqual(Object(1), Object(1n))
);
CUT.isError("assertDeepEqual(); 30d - error",
  () => CEL.assertDeepEqual(
    Object("true"), Object(true), "assertDeepEqual(); 30d - error"
  )
);
CUT.isError("assertDeepEqual(); 30e - error",
  () => CEL.assertDeepEqual(
    Object(42n), Object("42n"), "assertDeepEqual(); 30e - error"
  )
);
CUT.isTrue("assertDeepEqual(); 30f - ok",
  CEL.assertDeepEqual(Object(1n), Object(true), )
);
/* dataview + arraybuffer */
token1 = new ArrayBuffer(2);
token2 = new DataView(token1);
token2.setInt8(0, 125, true);
token2.setInt8(1, 100, true);
token3 = new ArrayBuffer(2);
token4 = new DataView(token3);
token4.setInt8(0, 125, true);
token4.setInt8(1, 100, true);
token5 = new ArrayBuffer(2);
token6 = new DataView(token5);
token6.setInt8(0, 120, true);
token6.setInt8(1, 100, true);
token7 = new ArrayBuffer(3);
token8 = new DataView(token7);
token8.setInt8(0, 125, true);
token8.setInt8(1, 100, true);
CUT.isTrue("assertDeepEqual(); 31a",
     CEL.assertDeepEqual([1, 2, token1, 3], [1, 2, token1, 3])
  && CEL.assertDeepEqual([1, 2, token1, 3], [1, 2, token3, 3])
  && CEL.assertDeepEqual([1, 2, token2, 3], [1, 2, token2, 3])
  && CEL.assertDeepEqual([1, 2, token2, 3], [1, 2, token4, 3])
);
CUT.isError(
  "assertDeepEqual(); 31b error",
  () => CEL.assertDeepEqual(
    [1, 2, token1, 3], [1, 2, token5, 3], "assertDeepEqual(); 31b error"
  )
);
CUT.isError(
  "assertDeepEqual(); 31c error",
  () => CEL.assertDeepEqual(
    [1, 2, token1, 3], [1, 2, token7, 3], "assertDeepEqual(); 31c error"
  )
);
CUT.isError(
  "assertDeepEqual(); 31d error",
  () => CEL.assertDeepEqual(
    [1, 2, token2, 3], [1, 2, token6, 3], "assertDeepEqual(); 31d error"
  )
);
CUT.isError(
  "assertDeepEqual(); 31e error",
  () => CEL.assertDeepEqual(
    [1, 2, token2, 3], [1, 2, token8, 3], "assertDeepEqual(); 31e error"
  )
);
/* assertDeepEqual(); end */


/* assertNotDeepStrictEqual begin */
CUT.isError("assertNotDeepStrictEqual(); 00 - error parameter",
  () => CEL.assertNotDeepStrictEqual(42, 42, new Error("lorem"))
);
/* primitives / number + Object wrappers */
CUT.isError("assertNotDeepStrictEqual(); 01a - error",
  () => CEL.assertNotDeepStrictEqual(
    42, 42, "assertNotDeepStrictEqual(); 01a - error"
  )
);
CUT.isTrue("assertNotDeepStrictEqual(); 01b - ok",
  CEL.assertNotDeepStrictEqual(42, 43)
);
CUT.isError("assertNotDeepStrictEqual(); 01c - error",
  () => CEL.assertNotDeepStrictEqual(
    42, Object(42), "assertNotDeepStrictEqual(); 01c - error"
  )
);
CUT.isError("assertNotDeepStrictEqual(); 01d - error",
  () => CEL.assertNotDeepStrictEqual(
    Object(42), 42, "assertNotDeepStrictEqual(); 01d - error"
  )
);
CUT.isTrue("assertNotDeepStrictEqual(); 01e - ok",
  CEL.assertNotDeepStrictEqual(42, Object(43))
);
CUT.isTrue("assertNotDeepStrictEqual(); 01f - ok",
  CEL.assertNotDeepStrictEqual(Object(42), 43)
);
CUT.isError("assertNotDeepStrictEqual(); 01g - error",
  () => CEL.assertNotDeepStrictEqual(
    Object(42), Object(42), "assertNotDeepStrictEqual(); 01g - error"
  )
);
CUT.isTrue("assertNotDeepStrictEqual(); 01h - ok",
  CEL.assertNotDeepStrictEqual(Object(42), Object(43))
);
/* primitives / number: 0, -0, NaN, Infinity, -Infinity */
CUT.isError("assertNotDeepStrictEqual(); 01i - error",
  () => CEL.assertNotDeepStrictEqual(
    0, 0, "assertNotDeepStrictEqual(); 01i - error"
  )
);
CUT.isError("assertNotDeepStrictEqual(); 01j - error",
  () => CEL.assertNotDeepStrictEqual(
    -0, -0, "assertNotDeepStrictEqual(); 01j - error"
  )
);
CUT.isTrue("assertNotDeepStrictEqual(); 01k - ok",
  CEL.assertNotDeepStrictEqual(-0, 0)
);
CUT.isTrue("assertNotDeepStrictEqual(); 01l - ok",
  CEL.assertNotDeepStrictEqual(-0, +0)
);
CUT.isError("assertNotDeepStrictEqual(); 01m - error",
  () => CEL.assertNotDeepStrictEqual(
    NaN, NaN, "assertNotDeepStrictEqual(); 01m - error"
  )
);
CUT.isError("assertNotDeepStrictEqual(); 01n - error",
  () => CEL.assertNotDeepStrictEqual(
    Infinity, Infinity, "assertNotDeepStrictEqual(); 01n - error"
  )
);
CUT.isError("assertNotDeepStrictEqual(); 01o - error",
  () => CEL.assertNotDeepStrictEqual(
    -Infinity, -Infinity, "assertNotDeepStrictEqual(); 01o - error"
  )
);
CUT.isTrue("assertNotDeepStrictEqual(); 01p - ok",
  CEL.assertNotDeepStrictEqual(Infinity, -Infinity)
);
/* primitives / not same type */
CUT.isTrue("assertNotDeepStrictEqual(); 01q - ok",
  CEL.assertNotDeepStrictEqual(42, "42")
);
CUT.isTrue("assertNotDeepStrictEqual(); 01r - ok",
  CEL.assertNotDeepStrictEqual(1, true, )
);
CUT.isTrue("assertNotDeepStrictEqual(); 01s - ok",
  CEL.assertNotDeepStrictEqual(1n, true)
);
CUT.isTrue("assertNotDeepStrictEqual(); 01t - ok",
  CEL.assertNotDeepStrictEqual(1n, "1n")
);
CUT.isTrue("assertNotDeepStrictEqual(); 01u - ok",
  CEL.assertNotDeepStrictEqual(false, "")
);
/* primitives / bigint + Object wrappers */
CUT.isError("assertNotDeepStrictEqual(); 02a - error",
  () => CEL.assertNotDeepStrictEqual(
    42n, 42n, "assertNotDeepStrictEqual(); 02a - error"
  )
);
CUT.isTrue("assertNotDeepStrictEqual(); 02b - ok",
  CEL.assertNotDeepStrictEqual(42n, 43n)
);
CUT.isError("assertNotDeepStrictEqual(); 02c - error",
  () => CEL.assertNotDeepStrictEqual(
    42n, Object(42n), "assertNotDeepStrictEqual(); 02c - error"
  )
);
CUT.isError("assertNotDeepStrictEqual(); 02d - error",
  () => CEL.assertNotDeepStrictEqual(
    Object(42n), 42n, "assertNotDeepStrictEqual(); 02d - error"
  )
);
CUT.isTrue("assertNotDeepStrictEqual(); 02e - ok",
  CEL.assertNotDeepStrictEqual(42n, Object(43n), )
);
CUT.isTrue("assertNotDeepStrictEqual(); 02f - ok",
  CEL.assertNotDeepStrictEqual(Object(42n), 43n)
);
CUT.isError("assertNotDeepStrictEqual(); 02g - error",
  () => CEL.assertNotDeepStrictEqual(
    Object(42n), Object(42n),"assertNotDeepStrictEqual(); 02g - error"
  )
);
CUT.isTrue("assertNotDeepStrictEqual(); 02h - ok",
  CEL.assertNotDeepStrictEqual(Object(42n), Object(43n))
);
/* primitives / string + Object wrappers */
CUT.isError("assertNotDeepStrictEqual(); 03a - error",
  () => CEL.assertNotDeepStrictEqual(
    "lorem", "lorem", "assertNotDeepStrictEqual(); 03a - error"
  )
);
CUT.isTrue("assertNotDeepStrictEqual(); 03b - ok",
  CEL.assertNotDeepStrictEqual("lorem", "ipsum")
);
CUT.isError("assertNotDeepStrictEqual(); 03c - error",
  () => CEL.assertNotDeepStrictEqual(
    "lorem", Object("lorem"), "assertNotDeepStrictEqual(); 03c - error"
  )
);
CUT.isError("assertNotDeepStrictEqual(); 03d - error",
  () => CEL.assertNotDeepStrictEqual(
    Object("lorem"), "lorem", "assertNotDeepStrictEqual(); 03d - error"
  )
);
CUT.isTrue("assertNotDeepStrictEqual(); 03e - ok",
  CEL.assertNotDeepStrictEqual("lorem", Object("ipsum"), )
);
CUT.isTrue("assertNotDeepStrictEqual(); 03f - ok",
  CEL.assertNotDeepStrictEqual(Object("lorem"), "ipsum")
);
CUT.isError("assertNotDeepStrictEqual(); 03g - error",
  () => CEL.assertNotDeepStrictEqual(
    Object("lorem"), Object("lorem"), "assertNotDeepStrictEqual(); 03g - error"
  )
);
CUT.isTrue("assertNotDeepStrictEqual(); 03h - ok",
  CEL.assertNotDeepStrictEqual(Object("lorem"), Object("ipsum"))
);
/* primitives / boolean + Object wrappers */
CUT.isError("assertNotDeepStrictEqual(); 04a - error",
  () => CEL.assertNotDeepStrictEqual(
    true, true, "assertNotDeepStrictEqual(); 04a - error"
  )
);
CUT.isTrue("assertNotDeepStrictEqual(); 04b - ok",
  CEL.assertNotDeepStrictEqual(true, false)
);
CUT.isError("assertNotDeepStrictEqual(); 04c - error",
  () => CEL.assertNotDeepStrictEqual(
    true, Object(true), "assertNotDeepStrictEqual(); 04c - error"
  )
);
CUT.isError("assertNotDeepStrictEqual(); 04d - error",
  () => CEL.assertNotDeepStrictEqual(
    Object(true), true, "assertNotDeepStrictEqual(); 04d - error"
  )
);
CUT.isTrue("assertNotDeepStrictEqual(); 04e - ok",
  CEL.assertNotDeepStrictEqual(true, Object(false))
);
CUT.isTrue("assertNotDeepStrictEqual(); 04f - ok",
  CEL.assertNotDeepStrictEqual(Object(true), false)
);
CUT.isError("assertNotDeepStrictEqual(); 04g - error",
  () => CEL.assertNotDeepStrictEqual(
    Object(true), Object(true), "assertNotDeepStrictEqual(); 04g - error"
  )
);
CUT.isTrue("assertNotDeepStrictEqual(); 04h - ok",
  CEL.assertNotDeepStrictEqual(Object(true), Object(false))
);

/* primitives / Symbol */
token1 = Symbol("Agradzsag");
token2 = Symbol("Agradzsag");
token3 = Symbol("Trillian");
CUT.isError("assertNotDeepStrictEqual(); 05a - error",
  () => CEL.assertNotDeepStrictEqual(
    token1, token1, "assertNotDeepStrictEqual(); 05a - error"
  )
);
CUT.isTrue("assertNotDeepStrictEqual(); 05b - ok",
  CEL.assertNotDeepStrictEqual(token1, token2)
);
CUT.isTrue("assertNotDeepStrictEqual(); 05c - ok",
  CEL.assertNotDeepStrictEqual(token1, token3)
);
/* objects / Array */
CUT.isError("assertNotDeepStrictEqual(); 06a - error",
  () => CEL.assertNotDeepStrictEqual(
    [1, 2], [1, 2], "assertNotDeepStrictEqual(); 06a - error"
  )
);
CUT.isTrue("assertNotDeepStrictEqual(); 06b - ok",
  CEL.assertNotDeepStrictEqual([1, 2], [1, 3])
);
CUT.isTrue("assertNotDeepStrictEqual(); 06c - ok",
  CEL.assertNotDeepStrictEqual([1, 2], [1, "2"])
);
CUT.isTrue("assertNotDeepStrictEqual(); 06d - ok",
  CEL.assertNotDeepStrictEqual([1, 2], [1, 2, 3])
);
/* objects / Set */
token1 = new Set([1, 2]);
token2 = new Set([1, 2]);
token3 = new Set([1, 3]);
token4 = new Set([1, "2"]);
token5 = new Set([1, 2, 3]);
CUT.isError("assertNotDeepStrictEqual(); 07a - error",
  () => CEL.assertNotDeepStrictEqual(
    token1, token2, "assertNotDeepStrictEqual(); 07a - error"
  )
);
CUT.isTrue("assertNotDeepStrictEqual(); 07b - ok",
  CEL.assertNotDeepStrictEqual(token1, token3)
);
CUT.isTrue("assertNotDeepStrictEqual(); 07c - ok",
  CEL.assertNotDeepStrictEqual(token1, token4)
);
CUT.isTrue("assertNotDeepStrictEqual(); 07d - ok",
  CEL.assertNotDeepStrictEqual(token1, token5)
);
/* objects / TypedArrays */
token1 = Int16Array.from([34, 45]);
token2 = Int16Array.from([34, 45]);
token3 = Int16Array.from([34, 46]);
token5 = Int16Array.from([34, 45, 56]);
CUT.isError("assertNotDeepStrictEqual(); 08a - error",
  () => CEL.assertNotDeepStrictEqual(
    token1, token2, "assertNotDeepStrictEqual(); 08a - error"
  )
);
CUT.isTrue("assertNotDeepStrictEqual(); 08b - ok",
  CEL.assertNotDeepStrictEqual(token1, token3)
);
CUT.isTrue("assertNotDeepStrictEqual(); 08c - ok",
  CEL.assertNotDeepStrictEqual(token1, token5)
);
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
CUT.isError("assertNotDeepStrictEqual(); 09a - error",
  () => CEL.assertNotDeepStrictEqual(
    token1, token2, "assertNotDeepStrictEqual(); 09a - error"
  )
);
CUT.isError("assertNotDeepStrictEqual(); 09b - error",
  () => CEL.assertNotDeepStrictEqual(
    token6, token6, "assertNotDeepStrictEqual(); 09b - error"
  )
);
CUT.isTrue("assertNotDeepStrictEqual(); 09c - ok",
  CEL.assertNotDeepStrictEqual(token1, token3)
);
CUT.isTrue("assertNotDeepStrictEqual(); 09d - ok",
  CEL.assertNotDeepStrictEqual(token1, token4)
);
CUT.isTrue("assertNotDeepStrictEqual(); 09e - ok",
  CEL.assertNotDeepStrictEqual(token1, token5)
);
CUT.isTrue("assertNotDeepStrictEqual(); 09f - ok",
  CEL.assertNotDeepStrictEqual(token6, token7)
);
CUT.isTrue("assertNotDeepStrictEqual(); 09g - ok",
  CEL.assertNotDeepStrictEqual(token6, token8)
);
/* objects / Map */
token1 = new Map([["a", 1], ["b", 2]]);
token2 = new Map([["a", 1], ["b", 2]]);
token3 = new Map([["a", 1], ["b", 3]]);
token4 = new Map([["a", 1], ["b", "2"]]);
token5 = new Map([["a", 1], ["b", 2], ["c", 3]]);
CUT.isError("assertNotDeepStrictEqual(); 10a - error",
  () => CEL.assertNotDeepStrictEqual(
    token1, token2, "assertNotDeepStrictEqual(); 10a - error"
  )
);
CUT.isTrue("assertNotDeepStrictEqual(); 10b - ok",
  CEL.assertNotDeepStrictEqual(token1, token3)
);
CUT.isTrue("assertNotDeepStrictEqual(); 10c - ok",
  CEL.assertNotDeepStrictEqual(token1, token4)
);
CUT.isTrue("assertNotDeepStrictEqual(); 10d - ok",
  CEL.assertNotDeepStrictEqual(token1, token5)
);
/* objects / weakset + weakmap*/
token1 = new WeakSet();
token2 = new WeakSet();
CUT.isError("assertNotDeepStrictEqual(); 11a - error",
  () => CEL.assertNotDeepStrictEqual(
    token1, token1, "assertNotDeepStrictEqual(); 11a - error"
  )
);
CUT.isTrue("assertNotDeepStrictEqual(); 11b - ok",
  CEL.assertNotDeepStrictEqual(token1, token2)
);
token1 = new WeakMap();
token2 = new WeakMap();
CUT.isError("assertNotDeepStrictEqual(); 11c - error",
  () => CEL.assertNotDeepStrictEqual(
    token1, token1, "assertNotDeepStrictEqual(); 11c - error"
  )
);
CUT.isTrue("assertNotDeepStrictEqual(); 11d - ok",
  CEL.assertNotDeepStrictEqual(token1, token2)
);
/* objects / Function */
CUT.isError("assertNotDeepStrictEqual(); 12a - error",
  () => CEL.assertNotDeepStrictEqual(
    Array.from, Array.from, "assertNotDeepStrictEqual(); 12a - error"
  )
);
CUT.isTrue("assertNotDeepStrictEqual(); 12b - ok",
  CEL.assertNotDeepStrictEqual(Array.from, Array.of)
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
CUT.isError("assertNotDeepStrictEqual(); 13a - error",
  () => CEL.assertNotDeepStrictEqual(
    token1, token1, "assertNotDeepStrictEqual(); 13a - error"
  )
);
CUT.isTrue("assertNotDeepStrictEqual(); 13b - ok",
  CEL.assertNotDeepStrictEqual(token1, token2)
);
CUT.isTrue("assertNotDeepStrictEqual(); 13c - ok",
  CEL.assertNotDeepStrictEqual(token1, token3)
);
/* objects / Error */
token1 = new Error("Agradzsag");
token2 = new Error("Agradzsag");
token3 = new TypeError("Agradzsag");
token3 = new TypeError("Agradzsag");
CUT.isError("assertNotDeepStrictEqual(); 14a - error",
  () => CEL.assertNotDeepStrictEqual(
    token1, token1, "assertNotDeepStrictEqual(); 14a - error"
  )
);
CUT.isError("assertNotDeepStrictEqual(); 14b - error",
  () => CEL.assertNotDeepStrictEqual(
    token3, token3, "assertNotDeepStrictEqual(); 14b - error"
  )
);
CUT.isTrue("assertNotDeepStrictEqual(); 14c - ok",
  CEL.assertNotDeepStrictEqual(token1, token2)
);
CUT.isTrue("assertNotDeepStrictEqual(); 14d - ok",
  CEL.assertNotDeepStrictEqual(token1, token3)
);
/* types: null, undefined */
CUT.isError("assertNotDeepStrictEqual(); 15a - error",
  () => CEL.assertNotDeepStrictEqual(
    null, null, "assertNotDeepStrictEqual(); 15a - error"
  )
);
CUT.isError("assertNotDeepStrictEqual(); 15b - error",
  () => CEL.assertNotDeepStrictEqual(
    undefined, undefined, "assertNotDeepStrictEqual(); 15b - error"
  )
);
CUT.isTrue("assertNotDeepStrictEqual(); 15c - ok",
  CEL.assertNotDeepStrictEqual(null, undefined)
);
/* structures 1 */
token1 = new Error("Agradzsag");
token2 = [1,2,{"3": 4, "5": new Map([["6", 7], ["8", [9, token1]]])}];
token3 = [1,2,{"3": 4, "5": new Map([["6", 7], ["8", [9, token1]]])}];
token4 = [1,2,{"3": 4, "5": new Map([["6", 7], ["8", [9, 42]]])}];
token5 = [1,2,{"3": 4, "5": new Map([["6", 7], ["8", [9, token1, 42]]])}];
CUT.isError("assertNotDeepStrictEqual(); 16a - error",
  () => CEL.assertNotDeepStrictEqual(
    token2, token2, "assertNotDeepStrictEqual(); 16a - error"
  )
);
CUT.isError("assertNotDeepStrictEqual(); 16b - error",
  () => CEL.assertNotDeepStrictEqual(
    token2, token3, "assertNotDeepStrictEqual(); 16b - error"
  )
);
CUT.isTrue("assertNotDeepStrictEqual(); 16c - ok",
  CEL.assertNotDeepStrictEqual(token2, token4)
);
CUT.isTrue("assertNotDeepStrictEqual(); 16d - ok",
  CEL.assertNotDeepStrictEqual(token2, token5)
);
/* structures 2 */
token1 = new Error("Agradzsag");
token2 = [1, 2, {"3": 4, "5": new Map([["6", 7], ["8", [9, 10]], ["11", new Set([12, 13])]])}, token1];
token3 = [1, 2, {"3": 4, "5": new Map([["6", 7], ["8", [9, 10]], ["11", new Set([12, 13])]])}, token1];
token4 = [1, 2, {"3": 4, "5": new Map([["6", 7], ["8", ["a", 10]], ["11", new Set([12, 13])]])}, token1];
token5 = [1, 2, {"3": 4, "5": new Map([["6", 7], ["8", [9, 10]], ["11", new Set([12, 13, 14])]])}, token1];
CUT.isError("assertNotDeepStrictEqual(); 17a - error",
  () => CEL.assertNotDeepStrictEqual(
    token2, token2, "assertNotDeepStrictEqual(); 17a - error"
  )
);
CUT.isError("assertNotDeepStrictEqual(); 17b - error",
  () => CEL.assertNotDeepStrictEqual(
    token2, token3, "assertNotDeepStrictEqual(); 17b - error"
  )
);
CUT.isTrue("assertNotDeepStrictEqual(); 17c - ok",
  CEL.assertNotDeepStrictEqual(token2, token4)
);
CUT.isTrue("assertNotDeepStrictEqual(); 17d - ok",
  CEL.assertNotDeepStrictEqual(token2, token5)
);
/* structures 3 */
token1 = new Error("Agradzsag");
token2 = [1, 2, {"3": 4, "5": new Map([["6", 7], ["8", [9, 10]], ["11", new Set([12, 13])]])}, token1];
token3 = [1, 2, {"3": 4, "5": new Map([["6", 7], ["8", [9, 10]], ["11", new Set([12, 13])]])}, token1];
token4 = [1, 2, {"3": 4, "5": new Map([["6", 8], ["8", [9, 10]], ["11", new Set([12, 14])]])}, token1];
token5 = [1, 2, {"3": 4, "5": new Map([["6", 8], ["8", [9, 10, 15]], ["11", new Set([12, 13])]])}, token1];
CUT.isError("assertNotDeepStrictEqual(); 18a - error",
  () => CEL.assertNotDeepStrictEqual(
    token2, token2, "assertNotDeepStrictEqual(); 18a - error"
  )
);
CUT.isError("assertNotDeepStrictEqual(); 18b - error",
  () => CEL.assertNotDeepStrictEqual(
    token2, token3, "assertNotDeepStrictEqual(); 18b - error"
  )
);
CUT.isTrue("assertNotDeepStrictEqual(); 18c - ok",
  CEL.assertNotDeepStrictEqual(token2, token4)
);
CUT.isTrue("assertNotDeepStrictEqual(); 18d - ok",
  CEL.assertNotDeepStrictEqual(token2, token5)
);
/* structures 4 */
token1 = new Error("Agradzsag");
token2 = [1,2,{"3": 4, "5": new Map([["6", 7], ["8", [9, 10]], ["11", new Set([12, 13])]])}, token1];
token3 = [1,2,{"3": 4, "5": new Map([["6", 7], ["8", [9, 10]], ["11", new Set([12, 13])]])}, token1];
token4 = [1,5,{"3": 4, "5": new Map([["6", 7], ["8", [9, 10]], ["11", new Set([12, 13])]])}, token1];
token5 = [1,2,{"3": 4, "5": new Map([["6", 7], ["8", [9, 10]], ["11", new Set([12, 13, 14])]])}, token1];
CUT.isError("assertNotDeepStrictEqual(); 19a - error",
  () => CEL.assertNotDeepStrictEqual(
    token2, token2, "assertNotDeepStrictEqual(); 19a - error"
  )
);
CUT.isError("assertNotDeepStrictEqual(); 19b - error",
  () => CEL.assertNotDeepStrictEqual
    (token2, token3, "assertNotDeepStrictEqual(); 19b - error"
  )
);
CUT.isTrue("assertNotDeepStrictEqual(); 19c - ok",
  CEL.assertNotDeepStrictEqual(token2, token4)
);
CUT.isTrue("assertNotDeepStrictEqual(); 19d - ok",
  CEL.assertNotDeepStrictEqual(token2, token5)
);
/* objects / not same prototype - array */
CUT.isTrue("assertNotDeepStrictEqual(); 20a - ok",
  CEL.assertNotDeepStrictEqual({}, [])
);
CUT.isTrue("assertNotDeepStrictEqual(); 20b - ok",
  CEL.assertNotDeepStrictEqual(new Map(), [])
);
CUT.isTrue("assertNotDeepStrictEqual(); 20c - ok",
  CEL.assertNotDeepStrictEqual(new Set(), [])
);
CUT.isTrue("assertNotDeepStrictEqual(); 20d - ok",
  CEL.assertNotDeepStrictEqual(new WeakMap(), [])
);
CUT.isTrue("assertNotDeepStrictEqual(); 20e - ok",
  CEL.assertNotDeepStrictEqual(new WeakSet(), [])
);
CUT.isTrue("assertNotDeepStrictEqual(); 20f - ok",
  CEL.assertNotDeepStrictEqual(new Error(), [])
);
CUT.isTrue("assertNotDeepStrictEqual(); 20g - ok",
  CEL.assertNotDeepStrictEqual(42, [42])
);
CUT.isTrue("assertNotDeepStrictEqual(); 20h - ok",
  CEL.assertNotDeepStrictEqual(Object(42), [42])
);
CUT.isTrue("assertNotDeepStrictEqual(); 20i - ok",
  CEL.assertNotDeepStrictEqual(true, [true])
);
CUT.isTrue("assertNotDeepStrictEqual(); 20j - ok",
  CEL.assertNotDeepStrictEqual(Object(true), [true])
);
CUT.isTrue("assertNotDeepStrictEqual(); 20k - ok",
  CEL.assertNotDeepStrictEqual("lorem", ["lorem"])
);
CUT.isTrue("assertNotDeepStrictEqual(); 20l - ok",
  CEL.assertNotDeepStrictEqual(Object("lorem"), ["lorem"])
);
CUT.isTrue("assertNotDeepStrictEqual(); 20m - ok",
  CEL.assertNotDeepStrictEqual(42n, [42n])
);
CUT.isTrue("assertNotDeepStrictEqual(); 20n - ok",
  CEL.assertNotDeepStrictEqual(Object(42n), [42n])
);
/* objects / not same prototype - map */
CUT.isTrue("assertNotDeepStrictEqual(); 21a - ok",
  CEL.assertNotDeepStrictEqual(new Map(), new Set())
);
CUT.isTrue("assertNotDeepStrictEqual(); 21b - ok",
  CEL.assertNotDeepStrictEqual(new Map(), new WeakSet())
);
CUT.isTrue("assertNotDeepStrictEqual(); 21c - ok",
  CEL.assertNotDeepStrictEqual(new Map(), new WeakMap())
);
CUT.isTrue("assertNotDeepStrictEqual(); 21d - ok",
  CEL.assertNotDeepStrictEqual(new Error(), new Map())
);
CUT.isTrue("assertNotDeepStrictEqual(); 21e - ok",
  CEL.assertNotDeepStrictEqual(42, new Map())
);
CUT.isTrue("assertNotDeepStrictEqual(); 21f - ok",
  CEL.assertNotDeepStrictEqual(Object(42), new Map())
);
CUT.isTrue("assertNotDeepStrictEqual(); 21g - ok",
  CEL.assertNotDeepStrictEqual(true, new Map())
);
CUT.isTrue("assertNotDeepStrictEqual(); 21h - ok",
  CEL.assertNotDeepStrictEqual(Object(true), new Map())
);
CUT.isTrue("assertNotDeepStrictEqual(); 21i - ok",
  CEL.assertNotDeepStrictEqual("lorem", new Map())
);
CUT.isTrue("assertNotDeepStrictEqual(); 21j - ok",
  CEL.assertNotDeepStrictEqual(Object("lorem"), new Map())
);
CUT.isTrue("assertNotDeepStrictEqual(); 21k - ok",
  CEL.assertNotDeepStrictEqual(42n, new Map())
);
CUT.isTrue("assertNotDeepStrictEqual(); 21l - ok",
  CEL.assertNotDeepStrictEqual(Object(42n), new Map())
);
/* objects / not same prototype - set */
CUT.isTrue("assertNotDeepStrictEqual(); 22a - ok",
  CEL.assertNotDeepStrictEqual(new WeakMap(), new Set())
);
CUT.isTrue("assertNotDeepStrictEqual(); 22b - ok",
  CEL.assertNotDeepStrictEqual(new Error(), new Set())
);
CUT.isTrue("assertNotDeepStrictEqual(); 22c - ok",
  CEL.assertNotDeepStrictEqual(42, new Set())
);
CUT.isTrue("assertNotDeepStrictEqual(); 22d - ok",
  CEL.assertNotDeepStrictEqual(Object(42), new Set())
);
CUT.isTrue("assertNotDeepStrictEqual(); 22e - ok",
  CEL.assertNotDeepStrictEqual(true, new Set())
);
CUT.isTrue("assertNotDeepStrictEqual(); 22f - ok",
  CEL.assertNotDeepStrictEqual(Object(true), new Set())
);
CUT.isTrue("assertNotDeepStrictEqual(); 22g - ok",
  CEL.assertNotDeepStrictEqual("lorem", new Set())
);
CUT.isTrue("assertNotDeepStrictEqual(); 22h - ok",
  CEL.assertNotDeepStrictEqual(Object("lorem"), new Set())
);
CUT.isTrue("assertNotDeepStrictEqual(); 22i - ok",
  CEL.assertNotDeepStrictEqual(42n, new Set())
);
CUT.isTrue("assertNotDeepStrictEqual(); 22j - ok",
  CEL.assertNotDeepStrictEqual(Object(42n), new Set())
);
/* objects / not same prototype - weakset */
CUT.isTrue("assertNotDeepStrictEqual(); 23a - ok",
  CEL.assertNotDeepStrictEqual(new WeakMap(), new WeakSet())
);
CUT.isTrue("assertNotDeepStrictEqual(); 23b - ok",
  CEL.assertNotDeepStrictEqual(new Error(), new WeakSet())
);
CUT.isTrue("assertNotDeepStrictEqual(); 23c - ok",
  CEL.assertNotDeepStrictEqual(42, new WeakSet())
);
CUT.isTrue("assertNotDeepStrictEqual(); 23d - ok",
  CEL.assertNotDeepStrictEqual(Object(42), new WeakSet())
);
CUT.isTrue("assertNotDeepStrictEqual(); 23e - ok",
  CEL.assertNotDeepStrictEqual(true, new WeakSet())
);
CUT.isTrue("assertNotDeepStrictEqual(); 23f - ok",
  CEL.assertNotDeepStrictEqual(Object(true), new WeakSet())
);
CUT.isTrue("assertNotDeepStrictEqual(); 23g - ok",
  CEL.assertNotDeepStrictEqual("lorem", new WeakSet())
);
CUT.isTrue("assertNotDeepStrictEqual(); 23h - ok",
  CEL.assertNotDeepStrictEqual(Object("lorem"), new WeakSet())
);
CUT.isTrue("assertNotDeepStrictEqual(); 23i - ok",
  CEL.assertNotDeepStrictEqual(42n, new WeakSet())
);
CUT.isTrue("assertNotDeepStrictEqual(); 23j - ok",
  CEL.assertNotDeepStrictEqual(Object(42n), new WeakSet())
);
/* objects / not same prototype - weakmap */
CUT.isTrue("assertNotDeepStrictEqual(); 24a - ok",
  CEL.assertNotDeepStrictEqual(new Error(), new WeakMap())
);
CUT.isTrue("assertNotDeepStrictEqual(); 24b - ok",
  CEL.assertNotDeepStrictEqual(42, new WeakMap())
);
CUT.isTrue("assertNotDeepStrictEqual(); 24c - ok",
  CEL.assertNotDeepStrictEqual(Object(42), new WeakMap())
);
CUT.isTrue("assertNotDeepStrictEqual(); 24d - ok",
  CEL.assertNotDeepStrictEqual(true, new WeakMap())
);
CUT.isTrue("assertNotDeepStrictEqual(); 24e - ok",
  CEL.assertNotDeepStrictEqual(Object(true), new WeakMap())
);
CUT.isTrue("assertNotDeepStrictEqual(); 24f - ok",
  CEL.assertNotDeepStrictEqual("lorem", new WeakMap())
);
CUT.isTrue("assertNotDeepStrictEqual(); 24g - ok",
  CEL.assertNotDeepStrictEqual(Object("lorem"), new WeakMap())
);
CUT.isTrue("assertNotDeepStrictEqual(); 24h - ok",
  CEL.assertNotDeepStrictEqual(42n, new WeakMap())
);
CUT.isTrue("assertNotDeepStrictEqual(); 24i - ok",
  CEL.assertNotDeepStrictEqual(Object(42n), new WeakMap())
);
/* objects / not same prototype - ok */
CUT.isTrue("assertNotDeepStrictEqual(); 25a - ok",
  CEL.assertNotDeepStrictEqual(42, new Error(42))
);
CUT.isTrue("assertNotDeepStrictEqual(); 25b - ok",
  CEL.assertNotDeepStrictEqual(Object(42), new Error(42))
);
CUT.isTrue("assertNotDeepStrictEqual(); 25c - ok",
  CEL.assertNotDeepStrictEqual(true, new Error(true))
);
CUT.isTrue("assertNotDeepStrictEqual(); 25d - ok",
  CEL.assertNotDeepStrictEqual(Object(true), new Error(true))
);
CUT.isTrue("assertNotDeepStrictEqual(); 25e - ok",
  CEL.assertNotDeepStrictEqual("lorem", new Error("lorem"))
);
CUT.isTrue("assertNotDeepStrictEqual(); 25f - ok",
  CEL.assertNotDeepStrictEqual(Object("lorem"), new Error("lorem"))
);
CUT.isTrue("assertNotDeepStrictEqual(); 25g - ok",
  CEL.assertNotDeepStrictEqual(42n, new Error(42n))
);
CUT.isTrue("assertNotDeepStrictEqual(); 25h - ok",
  CEL.assertNotDeepStrictEqual(Object(42n), new Error(42n))
);
/* objects / not same prototype - number */
CUT.isTrue("assertNotDeepStrictEqual(); 26a - ok",
  CEL.assertNotDeepStrictEqual(true, 1)
);
CUT.isTrue("assertNotDeepStrictEqual(); 26b - ok",
  CEL.assertNotDeepStrictEqual(Object(true), 1)
);
CUT.isTrue("assertNotDeepStrictEqual(); 26c - ok",
  CEL.assertNotDeepStrictEqual("1", 1)
);
CUT.isTrue("assertNotDeepStrictEqual(); 26d - ok",
  CEL.assertNotDeepStrictEqual(Object("1"), 1)
);
CUT.isTrue("assertNotDeepStrictEqual(); 26e - ok",
  CEL.assertNotDeepStrictEqual(42n, 42)
);
CUT.isTrue("assertNotDeepStrictEqual(); 26f - ok",
  CEL.assertNotDeepStrictEqual(Object(42n), 42)
);
/* objects / not same prototype - string */
CUT.isTrue("assertNotDeepStrictEqual(); 27a - ok",
  CEL.assertNotDeepStrictEqual(true, "true")
);
CUT.isTrue("assertNotDeepStrictEqual(); 27b - ok",
  CEL.assertNotDeepStrictEqual(42n, "42n")
);
CUT.isTrue("assertNotDeepStrictEqual(); 27c - ok",
  CEL.assertNotDeepStrictEqual(Object(42), "42")
);
CUT.isTrue("assertNotDeepStrictEqual(); 27d - ok",
  CEL.assertNotDeepStrictEqual(Object(42n), "42n")
);
CUT.isTrue("assertNotDeepStrictEqual(); 27e - ok",
  CEL.assertNotDeepStrictEqual(Object(true), "true")
);
/* objects / not same prototype - boolean */
CUT.isTrue("assertNotDeepStrictEqual(); 28a - ok",
  CEL.assertNotDeepStrictEqual(1n, true)
);
CUT.isTrue("assertNotDeepStrictEqual(); 28b - ok",
  CEL.assertNotDeepStrictEqual(Object(1n), true)
);
CUT.isTrue("assertNotDeepStrictEqual(); 28c - ok",
  CEL.assertNotDeepStrictEqual(Object(1), true)
);
CUT.isTrue("assertNotDeepStrictEqual(); 28d - ok",
  CEL.assertNotDeepStrictEqual("true", true)
);
/* objects / not same prototype - bigint */
CUT.isTrue("assertNotDeepStrictEqual(); 29a - ok",
  CEL.assertNotDeepStrictEqual(Object(42), 42n)
);
CUT.isTrue("assertNotDeepStrictEqual(); 29b - ok",
  CEL.assertNotDeepStrictEqual(Object("42"), 42n)
);
/* Chrome - Firefox not the same result
CUT.isTrue("assertNotDeepStrictEqual(); 29c - ok",
  CEL.assertNotDeepStrictEqual(Object(true), 1n)
);
*/
/* objects / not same prototype - Object wrappers */
CUT.isTrue("assertNotDeepStrictEqual(); 30a - ok",
  CEL.assertNotDeepStrictEqual(Object(42), Object("42"))
);
CUT.isTrue("assertNotDeepStrictEqual(); 30b - ok",
  CEL.assertNotDeepStrictEqual(Object(1), Object(true))
);
CUT.isTrue("assertNotDeepStrictEqual(); 30c - ok",
  CEL.assertNotDeepStrictEqual(Object(1), Object(1n))
);
CUT.isTrue("assertNotDeepStrictEqual(); 30d - ok",
  CEL.assertNotDeepStrictEqual(Object("true"), Object(true))
);
CUT.isTrue("assertNotDeepStrictEqual(); 30e - ok",
  CEL.assertNotDeepStrictEqual(Object(42n), Object("42n"))
);
CUT.isTrue("assertNotDeepStrictEqual(); 30f - ok",
  CEL.assertNotDeepStrictEqual(Object(1n), Object(true))
);
/* dataview + arraybuffer */
token1 = new ArrayBuffer(2);
token2 = new DataView(token1);
token2.setInt8(0, 125, true);
token2.setInt8(1, 100, true);
token3 = new ArrayBuffer(2);
token4 = new DataView(token3);
token4.setInt8(0, 125, true);
token4.setInt8(1, 100, true);
token5 = new ArrayBuffer(2);
token6 = new DataView(token5);
token6.setInt8(0, 120, true);
token6.setInt8(1, 100, true);
token7 = new ArrayBuffer(3);
token8 = new DataView(token7);
token8.setInt8(0, 125, true);
token8.setInt8(1, 100, true);
CUT.isTrue("assertNotDeepStrictEqual(); 31a",
     CEL.assertNotDeepStrictEqual([1, 2, token1, 3], [1, 2, token5, 3])
  && CEL.assertNotDeepStrictEqual([1, 2, token1, 3], [1, 2, token7, 3])
  && CEL.assertNotDeepStrictEqual([1, 2, token2, 3], [1, 2, token6, 3])
  && CEL.assertNotDeepStrictEqual([1, 2, token2, 3], [1, 2, token8, 3])
);
CUT.isError(
  "assertNotDeepStrictEqual(); 31b",
  () => CEL.assertNotDeepStrictEqual(
    [1, 2, token1, 3], [1, 2, token1, 3], "assertNotDeepStrictEqual(); 31b"
  )
);
CUT.isError(
  "assertNotDeepStrictEqual(); 31c",
  () => CEL.assertNotDeepStrictEqual(
    [1, 2, token1, 3], [1, 2, token3, 3], "assertNotDeepStrictEqual(); 31c"
  )
);
CUT.isError(
  "assertNotDeepStrictEqual(); 31d",
  () => CEL.assertNotDeepStrictEqual(
    [1, 2, token2, 3], [1, 2, token2, 3], "assertNotDeepStrictEqual(); 31d"
  )
);
CUT.isError(
  "assertNotDeepStrictEqual(); 31e",
  () => CEL.assertNotDeepStrictEqual(
    [1, 2, token2, 3], [1, 2, token4, 3], "assertNotDeepStrictEqual(); 31e"
  )
);
/* assertNotDeepStrictEqual end */


/* assertNotDeepEqual begin */
CUT.isError("assertNotDeepEqual(); 00 - error parameter",
  () => CEL.assertNotDeepEqual(42, 42, new Error("lorem"))
);
/* primitives / number + Object wrappers */
CUT.isError("assertNotDeepEqual(); 01a - error",
  () => CEL.assertNotDeepEqual(42, 42, "assertNotDeepEqual(); 01a - error")
);
CUT.isTrue("assertNotDeepEqual(); 01b - ok", CEL.assertNotDeepEqual(42, 43));
CUT.isError("assertNotDeepEqual(); 01c - error",
  () =>
    CEL.assertNotDeepEqual(42, Object(42), "assertNotDeepEqual(); 01c - error")
);
CUT.isError("assertNotDeepEqual(); 01d - error",
  () =>
    CEL.assertNotDeepEqual(Object(42), 42, "assertNotDeepEqual(); 01d - error")
);
CUT.isTrue("assertNotDeepEqual(); 01e - ok",
  CEL.assertNotDeepEqual(42, Object(43))
);
CUT.isTrue("assertNotDeepEqual(); 01f - ok",
  CEL.assertNotDeepEqual(Object(42), 43)
);
CUT.isError("assertNotDeepEqual(); 01g - error",
  () => CEL.assertNotDeepEqual(
    Object(42), Object(42), "assertNotDeepEqual(); 01g - error"
  )
);
CUT.isTrue("assertNotDeepEqual(); 01h - ok",
  CEL.assertNotDeepEqual(Object(42), Object(43))
);
/* primitives / number: 0, -0, NaN, Infinity, -Infinity */
CUT.isError("assertNotDeepEqual(); 01i - error",
  () => CEL.assertNotDeepEqual(0, 0, "assertNotDeepEqual(); 01i - error")
);
CUT.isError("assertNotDeepEqual(); 01j - error",
  () => CEL.assertNotDeepEqual(-0, -0, "assertNotDeepEqual(); 01j - error")
);
CUT.isError("assertNotDeepEqual(); 01k - error",
  () => CEL.assertNotDeepEqual(-0, 0, "assertNotDeepEqual(); 01k - error")
);
CUT.isError("assertNotDeepEqual(); 01l - error",
  () => CEL.assertNotDeepEqual(-0, +0, "assertNotDeepEqual(); 01l - error")
);
CUT.isError("assertNotDeepEqual(); 01m - error",
  () => CEL.assertNotDeepEqual(NaN, NaN, "assertNotDeepEqual(); 01m - error")
);
CUT.isError("assertNotDeepEqual(); 01n - error",
  () => CEL.assertNotDeepEqual(
    Infinity, Infinity, "assertNotDeepEqual(); 01n - error"
  )
);
CUT.isError("assertNotDeepEqual(); 01o - error",
  () => CEL.assertNotDeepEqual(
    -Infinity, -Infinity, "assertNotDeepEqual(); 01o - error"
  )
);
CUT.isTrue("assertNotDeepEqual(); 01p - ok",
  CEL.assertNotDeepEqual(Infinity, -Infinity)
);
/* primitives / not same type */
CUT.isError("assertNotDeepEqual(); 01q - error",
  () => CEL.assertNotDeepEqual(42, "42", "assertNotDeepEqual(); 01q - error")
);
CUT.isError("assertNotDeepEqual(); 01r - error",
  () => CEL.assertNotDeepEqual(1, true, "assertNotDeepEqual(); 01r - error")
);
CUT.isError("assertNotDeepEqual(); 01s - error",
  () => CEL.assertNotDeepEqual(1n, true, "assertNotDeepEqual(); 01s - error")
);
CUT.isTrue("assertNotDeepEqual(); 01t - ok", CEL.assertNotDeepEqual(1n, "1n"));
CUT.isError("assertNotDeepEqual(); 01u - error",
  () => CEL.assertNotDeepEqual(false, "", "assertNotDeepEqual(); 01u - error")
);
/* primitives / bigint + Object wrappers */
CUT.isError("assertNotDeepEqual(); 02a - error",
  () => CEL.assertNotDeepEqual(42n, 42n, "assertNotDeepEqual(); 02a - error")
);
CUT.isTrue("assertNotDeepEqual(); 02b - ok", CEL.assertNotDeepEqual(42n, 43n));
CUT.isError("assertNotDeepEqual(); 02c - error",
  () => CEL.assertNotDeepEqual(
    42n, Object(42n), "assertNotDeepEqual(); 02c - error"
  )
);
CUT.isError("assertNotDeepEqual(); 02d - error",
  () => CEL.assertNotDeepEqual(
    Object(42n), 42n, "assertNotDeepEqual(); 02d - error"
  )
);
CUT.isTrue("assertNotDeepEqual(); 02e - ok",
  CEL.assertNotDeepEqual(42n, Object(43n))
);
CUT.isTrue("assertNotDeepEqual(); 02f - ok",
  CEL.assertNotDeepEqual(Object(42n), 43n)
);
CUT.isError("assertNotDeepEqual(); 02g - error",
  () => CEL.assertNotDeepEqual(
    Object(42n), Object(42n), "assertNotDeepEqual(); 02g - error"
  )
);
CUT.isTrue("assertNotDeepEqual(); 02h - ok",
  CEL.assertNotDeepEqual(Object(42n), Object(43n))
);
/* primitives / string + Object wrappers */
CUT.isError("assertNotDeepEqual(); 03a - error",
  () => CEL.assertNotDeepEqual(
    "lorem", "lorem", "assertNotDeepEqual(); 03a - error"
  )
);
CUT.isTrue("assertNotDeepEqual(); 03b - ok",
  CEL.assertNotDeepEqual("lorem", "ipsum")
);
CUT.isError("assertNotDeepEqual(); 03c - error",
  () => CEL.assertNotDeepEqual(
    "lorem", Object("lorem"), "assertNotDeepEqual(); 03c - error"
  )
);
CUT.isError("assertNotDeepEqual(); 03d - error",
  () => CEL.assertNotDeepEqual(
    Object("lorem"), "lorem", "assertNotDeepEqual(); 03d - error"
  )
);
CUT.isTrue("assertNotDeepEqual(); 03e - ok",
  CEL.assertNotDeepEqual("lorem", Object("ipsum"))
);
CUT.isTrue("assertNotDeepEqual(); 03f - ok",
  CEL.assertNotDeepEqual(Object("lorem"), "ipsum")
);
CUT.isError("assertNotDeepEqual(); 03g - error",
  () => CEL.assertNotDeepEqual(
    Object("lorem"), Object("lorem"), "assertNotDeepEqual(); 03g - error"
  )
);
CUT.isTrue("assertNotDeepEqual(); 03h - ok",
  CEL.assertNotDeepEqual(Object("lorem"), Object("ipsum"))
);
/* primitives / boolean + Object wrappers */
CUT.isError("assertNotDeepEqual(); 04a - error",
  () => CEL.assertNotDeepEqual(true, true, "assertNotDeepEqual(); 04a - error")
);
CUT.isTrue("assertNotDeepEqual(); 04b - ok",
  CEL.assertNotDeepEqual(true, false)
);
CUT.isError("assertNotDeepEqual(); 04c - error",
  () => CEL.assertNotDeepEqual(
    true, Object(true), "assertNotDeepEqual(); 04c - error"
  )
);
CUT.isError("assertNotDeepEqual(); 04d - error",
  () => CEL.assertNotDeepEqual(
    Object(true), true, "assertNotDeepEqual(); 04d - error"
  )
);
CUT.isTrue("assertNotDeepEqual(); 04e - ok",
  CEL.assertNotDeepEqual(true, Object(false))
);
CUT.isTrue("assertNotDeepEqual(); 04f - ok",
  CEL.assertNotDeepEqual(Object(true), false)
);
CUT.isError("assertNotDeepEqual(); 04g - error",
  () => CEL.assertNotDeepEqual(
    Object(true), Object(true), "assertNotDeepEqual(); 04g - error"
  )
);
CUT.isTrue("assertNotDeepEqual(); 04h - ok",
  CEL.assertNotDeepEqual(Object(true), Object(false))
);
/* primitives / Symbol */
token1 = Symbol("Agradzsag");
token2 = Symbol("Agradzsag");
token3 = Symbol("Trillian");
CUT.isError("assertNotDeepEqual(); 05a - error",
  () =>
    CEL.assertNotDeepEqual(token1, token1, "assertNotDeepEqual(); 05a - error")
);
CUT.isTrue("assertNotDeepEqual(); 05b - ok",
  CEL.assertNotDeepEqual(token1, token2)
);
CUT.isTrue("assertNotDeepEqual(); 06a - ok",
  CEL.assertNotDeepEqual(token1, token3)
);
/* objects / Array */
CUT.isError("assertNotDeepEqual(); 06a - error",
  () =>
    CEL.assertNotDeepEqual([1, 2], [1, 2], "assertNotDeepEqual(); 06a - error")
);
CUT.isTrue("assertNotDeepEqual(); 06b - ok",
  CEL.assertNotDeepEqual([1, 2], [1, 3])
);
CUT.isError("assertNotDeepEqual(); 06c - error",
  () => CEL.assertNotDeepEqual(
    [1, 2], [1, "2"], "assertNotDeepEqual(); 06c - error"
  )
);
CUT.isTrue("assertNotDeepEqual(); 06d - ok",
  CEL.assertNotDeepEqual([1, 2], [1, 2, 3])
);
/* objects / Set */
token1 = new Set([1, 2]);
token2 = new Set([1, 2]);
token3 = new Set([1, 3]);
token4 = new Set([1, "2"]);
token5 = new Set([1, 2, 3]);
CUT.isError("assertNotDeepEqual(); 07a - error",
  () =>
    CEL.assertNotDeepEqual(token1, token2, "assertNotDeepEqual(); 07a - error")
);
CUT.isTrue("assertNotDeepEqual(); 07b - ok",
  CEL.assertNotDeepEqual(token1, token3)
);
CUT.isTrue("assertNotDeepEqual(); 07c - ok",
  CEL.assertNotDeepEqual(token1, token4)
);
CUT.isTrue("assertNotDeepEqual(); 07d - ok",
  CEL.assertNotDeepEqual(token1, token5)
);
/* objects / TypedArrays */
token1 = Int16Array.from([34, 45]);
token2 = Int16Array.from([34, 45]);
token3 = Int16Array.from([34, 46]);
token5 = Int16Array.from([34, 45, 56]);
CUT.isError("assertNotDeepEqual(); 08a - error",
  () =>
    CEL.assertNotDeepEqual(token1, token2, "assertNotDeepEqual(); 08a - error")
);
CUT.isTrue("assertNotDeepEqual(); 08b - ok",
  CEL.assertNotDeepEqual(token1, token3)
);
CUT.isTrue("assertNotDeepEqual(); 08c - ok",
  CEL.assertNotDeepEqual(token1, token5)
);
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
CUT.isError("assertNotDeepEqual(); 09a - error",
  () =>
    CEL.assertNotDeepEqual(token1, token2, "assertNotDeepEqual(); 09a - error")
);
CUT.isError("assertNotDeepEqual(); 09b - error",
  () =>
    CEL.assertNotDeepEqual(token6, token6, "assertNotDeepEqual(); 09b - error")
);
CUT.isTrue("assertNotDeepEqual(); 09c - ok",
  CEL.assertNotDeepEqual(token1, token3)
);
CUT.isError("assertNotDeepEqual(); 09d - error",
  () =>
    CEL.assertNotDeepEqual(token1, token4, "assertNotDeepEqual(); 09d - error")
);
CUT.isTrue("assertNotDeepEqual(); 09e - ok",
  CEL.assertNotDeepEqual(token1, token5)
);
CUT.isTrue("assertNotDeepEqual(); 09f - ok",
  CEL.assertNotDeepEqual(token6, token7)
);
CUT.isTrue("assertNotDeepEqual(); 09g - ok",
  CEL.assertNotDeepEqual(token6, token8)
);
/* objects / Map */
token1 = new Map([["a", 1], ["b", 2]]);
token2 = new Map([["a", 1], ["b", 2]]);
token3 = new Map([["a", 1], ["b", 3]]);
token4 = new Map([["a", 1], ["b", "2"]]);
token5 = new Map([["a", 1], ["b", 2], ["c", 3]]);
CUT.isError("assertNotDeepEqual(); 10a - error",
  () =>
    CEL.assertNotDeepEqual(token1, token2, "assertNotDeepEqual(); 10a - error")
);
CUT.isTrue("assertNotDeepEqual(); 10b - ok",
  CEL.assertNotDeepEqual(token1, token3)
);
CUT.isError("assertNotDeepEqual(); 10c - error",
  () =>
    CEL.assertNotDeepEqual(token1, token4, "assertNotDeepEqual(); 10c - error")
);
CUT.isTrue("assertNotDeepEqual(); 10d - ok",
  CEL.assertNotDeepEqual(token1, token5)
);
/* objects / weakset + weakmap*/
token1 = new WeakSet();
token2 = new WeakSet();
CUT.isError("assertNotDeepEqual(); 11a - error",
  () =>
    CEL.assertNotDeepEqual(token1, token1, "assertNotDeepEqual(); 11a - error")
);
CUT.isTrue("assertNotDeepEqual(); 11b - ok",
  CEL.assertNotDeepEqual(token1, token2)
);
token1 = new WeakMap();
token2 = new WeakMap();
CUT.isError("assertNotDeepEqual(); 11c - error",
  () =>
    CEL.assertNotDeepEqual(token1, token1, "assertNotDeepEqual(); 11c - error")
);
CUT.isTrue("assertNotDeepEqual(); 11d - ok",
  CEL.assertNotDeepEqual(token1, token2)
);
/* objects / Function */
CUT.isError("assertNotDeepEqual(); 12a - error",
  () => CEL.assertNotDeepEqual(
    Array.from, Array.from, "assertNotDeepEqual(); 12a - error"
  )
);
CUT.isTrue("assertNotDeepEqual(); 12b - ok",
  CEL.assertNotDeepEqual(Array.from, Array.of)
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
CUT.isError("assertNotDeepEqual(); 13a - error",
  () =>
    CEL.assertNotDeepEqual(token1, token1, "assertNotDeepEqual(); 13a - error")
);
CUT.isTrue("assertNotDeepEqual(); 13b - ok",
  CEL.assertNotDeepEqual(token1, token2)
);
CUT.isError("assertNotDeepEqual(); 13c - error",
  () =>
    CEL.assertNotDeepEqual(token1, token3, "assertNotDeepEqual(); 13c - error")
);
/* objects / Error */
token1 = new Error("Agradzsag");
token2 = new Error("Agradzsag");
token3 = new TypeError("Agradzsag");
token3 = new TypeError("Agradzsag");
CUT.isError("assertNotDeepEqual(); 14a - error",
  () =>
    CEL.assertNotDeepEqual(token1, token1, "assertNotDeepEqual(); 14a - error")
);
CUT.isError("assertNotDeepEqual(); 14b - error",
  () =>
    CEL.assertNotDeepEqual(token3, token3, "assertNotDeepEqual(); 14b - error")
);
CUT.isTrue("assertNotDeepEqual(); 14c - ok",
  CEL.assertNotDeepEqual(token1, token2)
);
CUT.isTrue("assertNotDeepEqual(); 14d - ok",
  CEL.assertNotDeepEqual(token1, token3)
);
/* types: null, undefined */
CUT.isError("assertNotDeepEqual(); 15a - error",
  () => CEL.assertNotDeepEqual(null, null, "assertNotDeepEqual(); 15a - error")
);
CUT.isError("assertNotDeepEqual(); 15b - error",
  () => CEL.assertNotDeepEqual(
    undefined, undefined, "assertNotDeepEqual(); 15b - error"
  )
);
CUT.isError("assertNotDeepEqual(); 15c - error",
  () =>
    CEL.assertNotDeepEqual(null, undefined, "assertNotDeepEqual(); 15c - error")
);
/* structures 1 */
token1 = new Error("Agradzsag");
token2 = [1,2,{"3": 4, "5": new Map([["6", 7], ["8", [9, token1]]])}];
token3 = [1,2,{"3": 4, "5": new Map([["6", 7], ["8", [9, token1]]])}];
token4 = [1,2,{"3": 4, "5": new Map([["6", 7], ["8", [9, 42]]])}];
token5 = [1,2,{"3": 4, "5": new Map([["6", 7], ["8", [9, token1, 42]]])}];
token6 = [1,2,{"3": 4, "5": new Map([["6", 7], ["8", [9, token1]]])}];
CUT.isError("assertNotDeepEqual(); 16a - error",
  () =>
    CEL.assertNotDeepEqual(token2, token2, "assertNotDeepEqual(); 16a - error")
);
CUT.isError("assertNotDeepEqual(); 16b - error",
  () =>
    CEL.assertNotDeepEqual(token2, token3, "assertNotDeepEqual(); 16b - error")
);
CUT.isTrue("assertNotDeepEqual(); 16c - ok",
  CEL.assertNotDeepEqual(token2, token4)
);
CUT.isTrue("assertNotDeepEqual(); 16d - ok",
  CEL.assertNotDeepEqual(token2, token5)
);
CUT.isError("assertNotDeepEqual(); 16e - error",
  () =>
    CEL.assertNotDeepEqual(token2, token6, "assertNotDeepEqual(); 16e - error")
);
/* structures 2 */
token1 = new Error("Agradzsag");
token2 = [1, 2, {"3": 4, "5": new Map([["6", 7], ["8", [9, 10]], ["11", new Set([12, 13])]])}, token1];
token3 = [1, 2, {"3": 4, "5": new Map([["6", 7], ["8", [9, 10]], ["11", new Set([12, 13])]])}, token1];
token4 = [1, 2, {"3": 4, "5": new Map([["6", 7], ["8", ["a", 10]], ["11", new Set([12, 13])]])}, token1];
token5 = [1, 2, {"3": 4, "5": new Map([["6", 7], ["8", [9, 10]], ["11", new Set([12, 13, 14])]])}, token1];
token6 = [1, 2, {"3": 4, "5": new Map([["6", 7], ["8", [9, 10]], ["11", new Set([12, 13])]])}, token1];
CUT.isError("assertNotDeepEqual(); 17a - error",
  () =>
    CEL.assertNotDeepEqual(token2, token2, "assertNotDeepEqual(); 17a - error")
);
CUT.isError("assertNotDeepEqual(); 17b - error",
  () =>
    CEL.assertNotDeepEqual(token2, token3, "assertNotDeepEqual(); 17b - error")
);
CUT.isTrue("assertNotDeepEqual(); 17c - ok",
  CEL.assertNotDeepEqual(token2, token4)
);
CUT.isTrue("assertNotDeepEqual(); 17d - ok",
  CEL.assertNotDeepEqual(token2, token5)
);
CUT.isError("assertNotDeepEqual(); 17d - error",
  () =>
    CEL.assertNotDeepEqual(token2, token6, "assertNotDeepEqual(); 17d - error")
);
/* structures 3 */
token1 = new Error("Agradzsag");
token2 = [1, 2, {"3": 4, "5": new Map([["6", 7], ["8", [9, 10]], ["11", new Set([12, 13])]])}, token1];
token3 = [1, 2, {"3": 4, "5": new Map([["6", 7], ["8", [9, 10]], ["11", new Set([12, 13])]])}, token1];
token4 = [1, 2, {"3": 4, "5": new Map([["6", 8], ["8", [9, 10]], ["11", new Set([12, 14])]])}, token1];
token5 = [1, 2, {"3": 4, "5": new Map([["6", 8], ["8", [9, 10, 15]], ["11", new Set([12, 13])]])}, token1];
token6 = [1, 2, {"3": 4, "5": new Map([["6", "7"], ["8", [9, 10]], ["11", new Set([12, 13])]])}, token1];
CUT.isError("assertNotDeepEqual(); 18a - error",
  () =>
    CEL.assertNotDeepEqual(token2, token2, "assertNotDeepEqual(); 18a - error")
);
CUT.isError("assertNotDeepEqual(); 18b - error",
  () =>
    CEL.assertNotDeepEqual(token2, token3, "assertNotDeepEqual(); 18b - error")
);
CUT.isTrue("assertNotDeepEqual(); 18c - ok",
  CEL.assertNotDeepEqual(token2, token4)
);
CUT.isTrue("assertNotDeepEqual(); 18d - ok",
  CEL.assertNotDeepEqual(token2, token5)
);
CUT.isError("assertNotDeepEqual(); 18e - error",
  () =>
    CEL.assertNotDeepEqual(token2, token6, "assertNotDeepEqual(); 18e - error")
);
/* structures 4 */
token1 = new Error("Agradzsag");
token2 = [1,2,{"3": 4, "5": new Map([["6", 7], ["8", [9, 10]], ["11", new Set([12, 13])]])}, token1];
token3 = [1,2,{"3": 4, "5": new Map([["6", 7], ["8", [9, 10]], ["11", new Set([12, 13])]])}, token1];
token4 = [1,5,{"3": 4, "5": new Map([["6", 7], ["8", [9, 10]], ["11", new Set([12, 13])]])}, token1];
token5 = [1,2,{"3": 4, "5": new Map([["6", 7], ["8", [9, 10]], ["11", new Set([12, 13, 14])]])}, token1];
CUT.isError("assertNotDeepEqual(); 19a - error",
  () =>
    CEL.assertNotDeepEqual(token2, token2, "assertNotDeepEqual(); 19a - error")
);
CUT.isError("assertNotDeepEqual(); 19b - error",
  () =>
    CEL.assertNotDeepEqual(token2, token3, "assertNotDeepEqual(); 19b - error")
);
CUT.isTrue("assertNotDeepEqual(); 19c - ok",
  CEL.assertNotDeepEqual(token2, token4)
);
CUT.isTrue("assertNotDeepEqual(); 19d - ok",
  CEL.assertNotDeepEqual(token2, token5)
);
/* objects / not same prototype - array */
CUT.isTrue("assertNotDeepEqual(); 20a - ok", CEL.assertNotDeepEqual({}, []));
CUT.isTrue("assertNotDeepEqual(); 20b - ok",
  CEL.assertNotDeepEqual(new Map(), [])
);
CUT.isTrue("assertNotDeepEqual(); 20c - ok",
  CEL.assertNotDeepEqual(new Set(), [])
);
CUT.isTrue("assertNotDeepEqual(); 20d - ok",
  CEL.assertNotDeepEqual(new WeakMap(), [])
);
CUT.isTrue("assertNotDeepEqual(); 20e - ok",
  CEL.assertNotDeepEqual(new WeakSet(), [])
);
CUT.isTrue("assertNotDeepEqual(); 20f - ok",
  CEL.assertNotDeepEqual(new Error(), [])
);
CUT.isError("assertNotDeepEqual(); 20g - error",
  () => CEL.assertNotDeepEqual(42, [42], "assertNotDeepEqual(); 20g - error")
);
CUT.isTrue("assertNotDeepEqual(); 20h - ok",
  CEL.assertNotDeepEqual(Object(42), [42])
);
CUT.isTrue("assertNotDeepEqual(); 20i - ok",
  CEL.assertNotDeepEqual(true, [true])
);
CUT.isTrue("assertNotDeepEqual(); 20j - ok",
  CEL.assertNotDeepEqual(Object(true), [true])
);
CUT.isError("assertNotDeepEqual(); 20k - error",
  () => CEL.assertNotDeepEqual(
    "lorem", ["lorem"], "assertNotDeepEqual(); 20k - error"
  )
);
CUT.isTrue("assertNotDeepEqual(); 20l - ok",
  CEL.assertNotDeepEqual(Object("lorem"), ["lorem"])
);
CUT.isError("assertNotDeepEqual(); 20m - error",
  () => CEL.assertNotDeepEqual(42n, [42n], "assertNotDeepEqual(); 20m - error")
);
CUT.isTrue("assertNotDeepEqual(); 20n - ok",
  CEL.assertNotDeepEqual(Object(42n), [42n])
);
/* objects / not same prototype - map */
CUT.isError("assertNotDeepEqual(); 21a - error",
  () => CEL.assertNotDeepEqual(
    new Map(), new Set(), "assertNotDeepEqual(); 21a - error"
  )
);
CUT.isError("assertNotDeepEqual(); 21b - error",
  () => CEL.assertNotDeepEqual(
    new Map(), new WeakSet(), "assertNotDeepEqual(); 21b - error"
  )
);
CUT.isError("assertNotDeepEqual(); 21c - error",
  () => CEL.assertNotDeepEqual(
    new Map(), new WeakMap(), "assertNotDeepEqual(); 21c - error"
  )
);
CUT.isTrue("assertNotDeepEqual(); 21d - ok",
  CEL.assertNotDeepEqual(new Error(), new Map())
);
CUT.isTrue("assertNotDeepEqual(); 21e - ok",
  CEL.assertNotDeepEqual(42, new Map())
);
CUT.isError("assertNotDeepEqual(); 21f - error",
  () => CEL.assertNotDeepEqual(
    Object(42), new Map(), "assertNotDeepEqual(); 21f - error"
  )
);
CUT.isTrue("assertNotDeepEqual(); 21g - ok",
  CEL.assertNotDeepEqual(true, new Map())
);
CUT.isError("assertNotDeepEqual(); 21h - error",
  () => CEL.assertNotDeepEqual(
    Object(true), new Map(), "assertNotDeepEqual(); 21h - error"
  )
);
CUT.isTrue("assertNotDeepEqual(); 21i - ok",
  CEL.assertNotDeepEqual("lorem", new Map())
);
CUT.isTrue("assertNotDeepEqual(); 21j - ok",
  CEL.assertNotDeepEqual(Object("lorem"), new Map())
);
CUT.isTrue("assertNotDeepEqual(); 21k - ok",
  CEL.assertNotDeepEqual(42n, new Map())
);
CUT.isError("assertNotDeepEqual(); 21l - error",
  () => CEL.assertNotDeepEqual(
    Object(42n), new Map(), "assertNotDeepEqual(); 21l - error"
  )
);
/* objects / not same prototype - set */
CUT.isError("assertNotDeepEqual(); 22a - error",
  () => CEL.assertNotDeepEqual(
    new WeakMap(), new Set(), "assertNotDeepEqual(); 22a - error"
  )
);
CUT.isTrue("assertNotDeepEqual(); 22b - ok",
  CEL.assertNotDeepEqual(new Error(), new Set())
);
CUT.isTrue("assertNotDeepEqual(); 22c - ok",
  CEL.assertNotDeepEqual(42, new Set())
);
CUT.isError("assertNotDeepEqual(); 22d - error",
  () => CEL.assertNotDeepEqual(
    Object(42), new Set(), "assertNotDeepEqual(); 22d - error"
  )
);
CUT.isTrue("assertNotDeepEqual(); 22e - ok",
  CEL.assertNotDeepEqual(true, new Set())
);
CUT.isError("assertNotDeepEqual(); 22f - error",
  () => CEL.assertNotDeepEqual(
    Object(true), new Set(), "assertNotDeepEqual(); 22f - error"
  )
);
CUT.isTrue("assertNotDeepEqual(); 22g - ok",
  CEL.assertNotDeepEqual("lorem", new Set())
);
CUT.isTrue("assertNotDeepEqual(); 22h - ok",
  CEL.assertNotDeepEqual(Object("lorem"), new Set())
);
CUT.isTrue("assertNotDeepEqual(); 22i - ok",
  CEL.assertNotDeepEqual(42n, new Set())
);
CUT.isError("assertNotDeepEqual(); 22j - error",
  () => CEL.assertNotDeepEqual(
    Object(42n), new Set(), "assertNotDeepEqual(); 22j - error"
  )
);
/* objects / not same prototype - weakset */
CUT.isError("assertNotDeepEqual(); 23a - error",
  () => CEL.assertNotDeepEqual(
    new WeakMap(), new WeakSet(), "assertNotDeepEqual(); 23a - error"
  )
);
CUT.isTrue("assertNotDeepEqual(); 23b - ok",
  CEL.assertNotDeepEqual(new Error(), new WeakSet())
);
CUT.isTrue("assertNotDeepEqual(); 23c - ok",
  CEL.assertNotDeepEqual(42, new WeakSet())
);
CUT.isError("assertNotDeepEqual(); 23d - error",
  () => CEL.assertNotDeepEqual(
    Object(42), new WeakSet(), "assertNotDeepEqual(); 23d - error"
  )
);
CUT.isTrue("assertNotDeepEqual(); 23e - ok",
  CEL.assertNotDeepEqual(true, new WeakSet())
);
CUT.isError("assertNotDeepEqual(); 23f - error",
  () => CEL.assertNotDeepEqual(
    Object(true), new WeakSet(), "assertNotDeepEqual(); 23f - error"
  )
);
CUT.isTrue("assertNotDeepEqual(); 23g - ok",
  CEL.assertNotDeepEqual("lorem", new WeakSet())
);
CUT.isTrue("assertNotDeepEqual(); 23h - ok",
  CEL.assertNotDeepEqual(Object("lorem"), new WeakSet())
);
CUT.isTrue("assertNotDeepEqual(); 23i - ok",
  CEL.assertNotDeepEqual(42n, new WeakSet())
);
CUT.isError("assertNotDeepEqual(); 23j - error",
  () => CEL.assertNotDeepEqual(
    Object(42n), new WeakSet(), "assertNotDeepEqual(); 23j - error"
  )
);
/* objects / not same prototype - weakmap */
CUT.isTrue("assertNotDeepEqual(); 24a - ok",
  CEL.assertNotDeepEqual(new Error(), new WeakMap())
);
CUT.isTrue("assertNotDeepEqual(); 24b - ok",
  CEL.assertNotDeepEqual(42, new WeakMap())
);
CUT.isError("assertNotDeepEqual(); 24c - error",
  () => CEL.assertNotDeepEqual(
    Object(42), new WeakMap(), "assertNotDeepEqual(); 24c - error"
  )
);
CUT.isTrue("assertNotDeepEqual(); 24d - ok",
  CEL.assertNotDeepEqual(true, new WeakMap())
);
CUT.isError("assertNotDeepEqual(); 24e - error",
  () => CEL.assertNotDeepEqual(
    Object(true), new WeakMap(), "assertNotDeepEqual(); 24e - error"
  )
);
CUT.isTrue("assertNotDeepEqual(); 24f - ok",
  CEL.assertNotDeepEqual("lorem", new WeakMap())
);
CUT.isTrue("assertNotDeepEqual(); 24g - ok",
  CEL.assertNotDeepEqual(Object("lorem"), new WeakMap())
);
CUT.isTrue("assertNotDeepEqual(); 24h - ok",
  CEL.assertNotDeepEqual(42n, new WeakMap())
);
CUT.isError("assertNotDeepEqual(); 24i - error",
  () => CEL.assertNotDeepEqual(
    Object(42n), new WeakMap(), "assertNotDeepEqual(); 24i - error"
  )
);
/* objects / not same prototype - ok */
CUT.isTrue("assertNotDeepEqual(); 25a - ok",
  CEL.assertNotDeepEqual(42, new Error(42))
);
CUT.isTrue("assertNotDeepEqual(); 25b - ok",
  CEL.assertNotDeepEqual(Object(42), new Error(42))
);
CUT.isTrue("assertNotDeepEqual(); 25c - ok",
  CEL.assertNotDeepEqual(true, new Error(true))
);
CUT.isTrue("assertNotDeepEqual(); 25d - ok",
  CEL.assertNotDeepEqual(Object(true), new Error(true))
);
CUT.isTrue("assertNotDeepEqual(); 25e - ok",
  CEL.assertNotDeepEqual("lorem", new Error("lorem"))
);
CUT.isTrue("assertNotDeepEqual(); 25f - ok",
  CEL.assertNotDeepEqual(Object("lorem"), new Error("lorem"))
);
CUT.isTrue("assertNotDeepEqual(); 25g - ok",
  CEL.assertNotDeepEqual(42n, new Error(42n))
);
CUT.isTrue("assertNotDeepEqual(); 25h - ok",
  CEL.assertNotDeepEqual(Object(42n), new Error(42n))
);
/* objects / not same prototype - number */
CUT.isError("assertNotDeepEqual(); 26a - error",
  () => CEL.assertNotDeepEqual(true, 1, "assertNotDeepEqual(); 26a - error")
);
CUT.isError("assertNotDeepEqual(); 26b - error",
  () =>
    CEL.assertNotDeepEqual(Object(true), 1, "assertNotDeepEqual(); 26b - error")
);
CUT.isError("assertNotDeepEqual(); 26c - error",
  () => CEL.assertNotDeepEqual("1", 1, "assertNotDeepEqual(); 26c - error")
);
CUT.isError("assertNotDeepEqual(); 26d - error",
  () =>
    CEL.assertNotDeepEqual(Object("1"), 1, "assertNotDeepEqual(); 26d - error")
);
CUT.isError("assertNotDeepEqual(); 26e - error",
  () => CEL.assertNotDeepEqual(42n, 42, "assertNotDeepEqual(); 26e - error")
);
CUT.isError("assertNotDeepEqual(); 26f - error",
  () =>
    CEL.assertNotDeepEqual(Object(42n), 42, "assertNotDeepEqual(); 26f - error")
);
/* objects / not same prototype - string */
CUT.isTrue("assertNotDeepEqual(); 27a - ok",
  CEL.assertNotDeepEqual(true, "true")
);
CUT.isTrue("assertNotDeepEqual(); 27b - ok",
  CEL.assertNotDeepEqual(42n, "42n")
);
CUT.isError("assertNotDeepEqual(); 27c - error",
  () => CEL.assertNotDeepEqual(
    Object(42), "42", "assertNotDeepEqual(); 27c - error"
  )
);
CUT.isTrue("assertNotDeepEqual(); 27d - ok",
  CEL.assertNotDeepEqual(Object(42n), "42n")
);
CUT.isTrue("assertNotDeepEqual(); 27e - ok",
  CEL.assertNotDeepEqual(Object(true), "true")
);
/* objects / not same prototype - boolean */
CUT.isError("assertNotDeepEqual(); 28a - error",
  () => CEL.assertNotDeepEqual(1n, true, "assertNotDeepEqual(); 28a - error")
);
CUT.isError("assertNotDeepEqual(); 28b - error",
  () =>
    CEL.assertNotDeepEqual(Object(1n), true, "assertNotDeepEqual(); 28b - error")
);
CUT.isError("assertNotDeepEqual(); 28c - error",
  () =>
    CEL.assertNotDeepEqual(Object(1), true, "assertNotDeepEqual(); 28c - error")
);
CUT.isTrue("assertNotDeepEqual(); 28d - ok",
  CEL.assertNotDeepEqual("true", true)
);
/* objects / not same prototype - bigint */
CUT.isError("assertNotDeepEqual(); 29a - error",
  () =>
    CEL.assertNotDeepEqual(Object(42), 42n, "assertNotDeepEqual(); 29a - error")
);
CUT.isError("assertNotDeepEqual(); 29b - error",
  () => CEL.assertNotDeepEqual(
    Object("42"), 42n, "assertNotDeepEqual(); 29b - error"
  )
);
/* Chrome - Firefox not the same result
CUT.isTrue("assertNotDeepEqual(); 29c - error",
  CEL.assertNotDeepEqual(
    Object(true), 1n, "assertNotDeepEqual(); 29c - error"
  )
);
*/
/* objects / not same prototype - Object wrappers */
CUT.isTrue("assertNotDeepEqual(); 30a - ok",
  CEL.assertNotDeepEqual(Object(42), Object("42"))
);
CUT.isError("assertNotDeepEqual(); 30b - error",
  () => CEL.assertNotDeepEqual(
    Object(1), Object(true), "assertNotDeepEqual(); 30b - error"
  )
);
CUT.isError("assertNotDeepEqual(); 30c - error",
  () => CEL.assertNotDeepEqual(
    Object(1), Object(1n), "assertNotDeepEqual(); 30c - error"
  )
);
CUT.isTrue("assertNotDeepEqual(); 30d - ok",
  CEL.assertNotDeepEqual(Object("true"), Object(true))
);
CUT.isTrue("assertNotDeepEqual(); 30e - ok",
  CEL.assertNotDeepEqual(Object(42n), Object("42n"))
);
CUT.isError("assertNotDeepEqual(); 30f - error",
  () => CEL.assertNotDeepEqual(
    Object(1n), Object(true), "assertNotDeepEqual(); 30f - error"
  )
);
/* dataview + arraybuffer */
token1 = new ArrayBuffer(2);
token2 = new DataView(token1);
token2.setInt8(0, 125, true);
token2.setInt8(1, 100, true);
token3 = new ArrayBuffer(2);
token4 = new DataView(token3);
token4.setInt8(0, 125, true);
token4.setInt8(1, 100, true);
token5 = new ArrayBuffer(2);
token6 = new DataView(token5);
token6.setInt8(0, 120, true);
token6.setInt8(1, 100, true);
token7 = new ArrayBuffer(3);
token8 = new DataView(token7);
token8.setInt8(0, 125, true);
token8.setInt8(1, 100, true);
CUT.isTrue("assertNotDeepEqual(); 31a",
     CEL.assertNotDeepEqual([1, 2, token1, 3], [1, 2, token5, 3])
  && CEL.assertNotDeepEqual([1, 2, token1, 3], [1, 2, token7, 3])
  && CEL.assertNotDeepEqual([1, 2, token2, 3], [1, 2, token6, 3])
  && CEL.assertNotDeepEqual([1, 2, token2, 3], [1, 2, token8, 3])
);
CUT.isError(
  "assertNotDeepEqual(); 31b",
  () => CEL.assertNotDeepEqual(
    [1, 2, token1, 3], [1, 2, token1, 3], "assertNotDeepEqual(); 31b"
  )
);
CUT.isError(
  "assertNotDeepEqual(); 31c",
  () => CEL.assertNotDeepEqual(
    [1, 2, token1, 3], [1, 2, token3, 3], "assertNotDeepEqual(); 31c"
  )
);
CUT.isError(
  "assertNotDeepEqual(); 31d",
  () => CEL.assertNotDeepStrictEqual(
    [1, 2, token2, 3], [1, 2, token2, 3], "assertNotDeepEqual(); 31d"
  )
);
CUT.isError(
  "assertNotDeepEqual(); 31e",
  () => CEL.assertNotDeepStrictEqual(
    [1, 2, token2, 3], [1, 2, token4, 3], "assertNotDeepEqual(); 31e"
  )
);
/* assertNotDeepEqual end */


/* assertDeepStrictEqual begin */
CUT.isError("assertDeepStrictEqual(); 01b - error",
  () => CEL.assertDeepStrictEqual(42, 43, new Error("lorem"))
);
/* primitives / number + Object wrappers */
CUT.isTrue("assertDeepStrictEqual(); 01a - ok",
  CEL.assertDeepStrictEqual(42, 42)
);
CUT.isError("assertDeepStrictEqual(); 01b - error",
  () =>
    CEL.assertDeepStrictEqual(42, 43, "assertDeepStrictEqual(); 01b - error")
);
CUT.isTrue("assertDeepStrictEqual(); 01c - ok",
  CEL.assertDeepStrictEqual(42, Object(42))
);
CUT.isTrue("assertDeepStrictEqual(); 01d - ok",
  CEL.assertDeepStrictEqual(Object(42), 42)
);
CUT.isError("assertDeepStrictEqual(); 01e - error",
  () => CEL.assertDeepStrictEqual(
    42, Object(43), "assertDeepStrictEqual(); 01e - error"
  )
);
CUT.isError("assertDeepStrictEqual(); 01f - error",
  () => CEL.assertDeepStrictEqual(
    Object(42), 43, "assertDeepStrictEqual(); 01f - error"
  )
);
CUT.isTrue("assertDeepStrictEqual(); 01g - ok",
  CEL.assertDeepStrictEqual(Object(42), Object(42))
);
CUT.isError("assertDeepStrictEqual(); 01h - error",
  () => CEL.assertDeepStrictEqual(
    Object(42), Object(43), "assertDeepStrictEqual(); 01h - error"
  )
);
/* primitives / number: 0, -0, NaN, Infinity, -Infinity */
CUT.isTrue("assertDeepStrictEqual(); 01i - ok",
  CEL.assertDeepStrictEqual(0, 0)
);
CUT.isTrue("assertDeepStrictEqual(); 01j - ok",
  CEL.assertDeepStrictEqual(-0, -0)
);
CUT.isError("assertDeepStrictEqual(); 01k - error",
  () => CEL.assertDeepStrictEqual(-0, 0, "assertDeepStrictEqual(); 01k - error")
);
CUT.isError("assertDeepStrictEqual(); 01l - error",
  () =>
    CEL.assertDeepStrictEqual(-0, +0, "assertDeepStrictEqual(); 01l - error")
);
CUT.isTrue("assertDeepStrictEqual(); 01m - ok",
  CEL.assertDeepStrictEqual(NaN, NaN)
);
CUT.isTrue("assertDeepStrictEqual(); 01n - ok",
  CEL.assertDeepStrictEqual(Infinity, Infinity)
);
CUT.isTrue("assertDeepStrictEqual(); 01o - ok",
  CEL.assertDeepStrictEqual(-Infinity, -Infinity)
);
CUT.isError("assertDeepStrictEqual(); 01p - error",
  () => CEL.assertDeepStrictEqual(
    Infinity, -Infinity, "assertDeepStrictEqual(); 01p - error"
  )
);
/* primitives / not same type */
CUT.isError("assertDeepStrictEqual(); 01q - error",
  () =>
    CEL.assertDeepStrictEqual(42, "42", "assertDeepStrictEqual(); 01q - error")
);
CUT.isError("assertDeepStrictEqual(); 01r - error",
  () =>
    CEL.assertDeepStrictEqual(1, true, "assertDeepStrictEqual(); 01r - error")
);
CUT.isError("assertDeepStrictEqual(); 01s - error",
  () =>
    CEL.assertDeepStrictEqual(1n, true, "assertDeepStrictEqual(); 01s - error")
);
CUT.isError("assertDeepStrictEqual(); 01t - error",
  () =>
    CEL.assertDeepStrictEqual(1n, "1n", "assertDeepStrictEqual(); 01t - error")
);
CUT.isError("assertDeepStrictEqual(); 01u - error",
  () =>
    CEL.assertDeepStrictEqual(false, "", "assertDeepStrictEqual(); 01u - error")
);
/* primitives / bigint + Object wrappers */
CUT.isTrue("assertDeepStrictEqual(); 02a - ok",
  CEL.assertDeepStrictEqual(42n, 42n)
);
CUT.isError("assertDeepStrictEqual(); 02b - error",
  () =>
    CEL.assertDeepStrictEqual(42n, 43n, "assertDeepStrictEqual(); 02b - error")
);
CUT.isTrue("assertDeepStrictEqual(); 02c - ok",
  CEL.assertDeepStrictEqual(42n, Object(42n))
);
CUT.isTrue("assertDeepStrictEqual(); 02d - ok",
  CEL.assertDeepStrictEqual(Object(42n), 42n)
);
CUT.isError("assertDeepStrictEqual(); 02e - error",
  () => CEL.assertDeepStrictEqual(
    42n, Object(43n), "assertDeepStrictEqual(); 02e - error"
  )
);
CUT.isError("assertDeepStrictEqual(); 02f - error",
  () => CEL.assertDeepStrictEqual(
    Object(42n), 43n, "assertDeepStrictEqual(); 02f - error"
  )
);
CUT.isTrue("assertDeepStrictEqual(); 02g - ok",
  CEL.assertDeepStrictEqual(Object(42n), Object(42n))
);
CUT.isError("assertDeepStrictEqual(); 02h - error",
  () => CEL.assertDeepStrictEqual(
    Object(42n), Object(43n), "assertDeepStrictEqual(); 02h - error"
  )
);
/* primitives / string + Object wrappers */
CUT.isTrue("assertDeepStrictEqual(); 02i - error",
  CEL.assertDeepStrictEqual(
    "lorem", "lorem", "assertDeepStrictEqual(); 03a - ok"
  )
);
CUT.isError("assertDeepStrictEqual(); 03b - error",
  () => CEL.assertDeepStrictEqual(
    "lorem", "ipsum", "assertDeepStrictEqual(); 03b - error"
  )
);
CUT.isTrue("assertDeepStrictEqual(); 03c - ok",
  CEL.assertDeepStrictEqual("lorem", Object("lorem"))
);
CUT.isTrue("assertDeepStrictEqual(); 03d - ok",
  CEL.assertDeepStrictEqual(Object("lorem"), "lorem")
);
CUT.isError("assertDeepStrictEqual(); 03e - error",
  () => CEL.assertDeepStrictEqual(
    "lorem", Object("ipsum"), "assertDeepStrictEqual(); 03e - error"
  )
);
CUT.isError("assertDeepStrictEqual(); 03f - error",
  () => CEL.assertDeepStrictEqual(
    Object("lorem"), "ipsum", "assertDeepStrictEqual(); 03f - error"
  )
);
CUT.isTrue("assertDeepStrictEqual(); 03g - ok",
  CEL.assertDeepStrictEqual(Object("lorem"), Object("lorem"))
);
CUT.isError("assertDeepStrictEqual(); 03h - error",
  () => CEL.assertDeepStrictEqual(
    Object("lorem"), Object("ipsum"), "assertDeepStrictEqual(); 03h - error"
  )
);
/* primitives / boolean + Object wrappers */
CUT.isTrue("assertDeepStrictEqual(); 04a - ok",
  CEL.assertDeepStrictEqual(true, true)
);
CUT.isError("assertDeepStrictEqual(); 04b - error",
  () => CEL.assertDeepStrictEqual(
    true, false, "assertDeepStrictEqual(); 04b - error"
  )
);
CUT.isTrue("assertDeepStrictEqual(); 04c - ok",
  CEL.assertDeepStrictEqual(true, Object(true))
);
CUT.isTrue("assertDeepStrictEqual(); 04d - ok",
  CEL.assertDeepStrictEqual(Object(true), true)
);
CUT.isError("assertDeepStrictEqual(); 04e - error",
  () => CEL.assertDeepStrictEqual(
    true, Object(false), "assertDeepStrictEqual(); 04e - error"
  )
);
CUT.isError("assertDeepStrictEqual(); 04f - error",
  () => CEL.assertDeepStrictEqual(
    Object(true), false, "assertDeepStrictEqual(); 04f - error"
  )
);
CUT.isTrue("assertDeepStrictEqual(); 04g - ok",
  CEL.assertDeepStrictEqual(Object(true), Object(true))
);
CUT.isError("assertDeepStrictEqual(); 04h - error",
  () => CEL.assertDeepStrictEqual(
    Object(true), Object(false), "assertDeepStrictEqual(); 04h - error"
  )
);
/* primitives / Symbol */
token1 = Symbol("Agradzsag");
token2 = Symbol("Agradzsag");
token3 = Symbol("Trillian");
CUT.isTrue("assertDeepStrictEqual(); 05a - ok",
  CEL.assertDeepStrictEqual(token1, token1)
);
CUT.isError("assertDeepStrictEqual(); 05b - error",
  () => CEL.assertDeepStrictEqual(
    token1, token2, "assertDeepStrictEqual(); 05b - error"
  )
);
CUT.isError("assertDeepStrictEqual(); 05c - error",
  () => CEL.assertDeepStrictEqual(
    token1, token3, "assertDeepStrictEqual(); 05c - error"
  )
);
/* objects / Array */
CUT.isTrue("assertDeepStrictEqual(); 06a - ok",
  CEL.assertDeepStrictEqual([1, 2], [1, 2])
);
CUT.isError("assertDeepStrictEqual(); 06b - error",
  () => CEL.assertDeepStrictEqual(
    [1, 2], [1, 3], "assertDeepStrictEqual(); 06b - error"
  )
);
CUT.isError("assertDeepStrictEqual(); 06c - error",
  () => CEL.assertDeepStrictEqual(
    [1, 2], [1, "2"], "assertDeepStrictEqual(); 06c - error"
  )
);
CUT.isError("assertDeepStrictEqual(); 06d - error",
  () => CEL.assertDeepStrictEqual(
    [1, 2], [1, 2, 3], "assertDeepStrictEqual(); 06d - error"
  )
);
/* objects / Set */
token1 = new Set([1, 2]);
token2 = new Set([1, 2]);
token3 = new Set([1, 3]);
token4 = new Set([1, "2"]);
token5 = new Set([1, 2, 3]);
CUT.isTrue("assertDeepStrictEqual(); 07a - ok",
  CEL.assertDeepStrictEqual(token1, token2)
);
CUT.isError("assertDeepStrictEqual(); 07b - error",
  () => CEL.assertDeepStrictEqual(
    token1, token3, "assertDeepStrictEqual(); 07b - error"
  )
);
CUT.isError("assertDeepStrictEqual(); 07c - error",
  () => CEL.assertDeepStrictEqual(
    token1, token4, "assertDeepStrictEqual(); 07c - error"
  )
);
CUT.isError("assertDeepStrictEqual(); 07d - error",
  () => CEL.assertDeepStrictEqual(
    token1, token5, "assertDeepStrictEqual(); 07d - error"
  )
);
/* objects / TypedArrays */
token1 = Int16Array.from([34, 45]);
token2 = Int16Array.from([34, 45]);
token3 = Int16Array.from([34, 46]);
token5 = Int16Array.from([34, 45, 56]);
CUT.isTrue("assertDeepStrictEqual(); 08a - ok",
  CEL.assertDeepStrictEqual(token1, token2)
);
CUT.isError("assertDeepStrictEqual(); 08b - error",
  () => CEL.assertDeepStrictEqual(
    token1, token3, "assertDeepStrictEqual(); 08b - error"
  )
);
CUT.isError("assertDeepStrictEqual(); 08c - error",
  () => CEL.assertDeepStrictEqual(
    token1, token5, "assertDeepStrictEqual(); 08c - error"
  )
);
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
CUT.isTrue("assertDeepStrictEqual(); 09a - ok",
  CEL.assertDeepStrictEqual(token1, token2)
);
CUT.isTrue("assertDeepStrictEqual(); 09b - ok",
  CEL.assertDeepStrictEqual(token6, token6)
);
CUT.isError("assertDeepStrictEqual(); 09c - error",
  () => CEL.assertDeepStrictEqual(
    token1, token3, "assertDeepStrictEqual(); 09c - error"
  )
);
CUT.isError("assertDeepStrictEqual(); 09d - error",
  () => CEL.assertDeepStrictEqual(
    token1, token4, "assertDeepStrictEqual(); 09d - error"
  )
);
CUT.isError("assertDeepStrictEqual(); 09e - error",
  () => CEL.assertDeepStrictEqual(
    token1, token5, "assertDeepStrictEqual(); 09e - error"
  )
);
CUT.isError("assertDeepStrictEqual(); 09f - error",
  () => CEL.assertDeepStrictEqual(
    token6, token7, "assertDeepStrictEqual(); 09f - error"
  )
);
CUT.isError("assertDeepStrictEqual(); 09g - error",
  () => xCEL.assertDeepStrictEqual(
    token6, token8, "assertDeepStrictEqual(); 09g - error"
  )
);
/* objects / Map */
token1 = new Map([["a", 1], ["b", 2]]);
token2 = new Map([["a", 1], ["b", 2]]);
token3 = new Map([["a", 1], ["b", 3]]);
token4 = new Map([["a", 1], ["b", "2"]]);
token5 = new Map([["a", 1], ["b", 2], ["c", 3]]);
CUT.isTrue("assertDeepStrictEqual(); 10a - ok",
  CEL.assertDeepStrictEqual(token1, token2)
);
CUT.isError("assertDeepStrictEqual(); 10b - error",
  () => CEL.assertDeepStrictEqual(
    token1, token3, "assertDeepStrictEqual(); 10b - error"
  )
);
CUT.isError("assertDeepStrictEqual(); 10c - error",
  () => CEL.assertDeepStrictEqual(
    token1, token4, "assertDeepStrictEqual(); 10c - error"
  )
);
CUT.isError("assertDeepStrictEqual(); 10d - error",
  () => CEL.assertDeepStrictEqual(
    token1, token5, "assertDeepStrictEqual(); 10d - error"
  )
);
/* objects / weakset + weakmap*/
token1 = new WeakSet();
token2 = new WeakSet();
CUT.isTrue("assertDeepStrictEqual(); 11a - ok",
  CEL.assertDeepStrictEqual(token1, token1)
);
CUT.isError("assertDeepStrictEqual(); 11b - error",
  () => CEL.assertDeepStrictEqual(
    token1, token2, "assertDeepStrictEqual(); 11b - error"
  )
);
token1 = new WeakMap();
token2 = new WeakMap();
CUT.isTrue("assertDeepStrictEqual(); 11c - ok",
  CEL.assertDeepStrictEqual(token1, token1)
);
CUT.isError("assertDeepStrictEqual(); 11d - error",
  () => CEL.assertDeepStrictEqual(
    token1, token2, "assertDeepStrictEqual(); 11d - error"
  )
);
/* objects / Function */
CUT.isTrue("assertDeepStrictEqual(); 12a - ok",
  CEL.assertDeepStrictEqual(Array.from, Array.from)
);
CUT.isError("assertDeepStrictEqual(); 12b - error",
  () => CEL.assertDeepStrictEqual(
    Array.from, Array.of, "assertDeepStrictEqual(); 12b - error"
  )
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
CUT.isTrue("assertDeepStrictEqual(); 13a - ok",
  CEL.assertDeepStrictEqual(token1, token1)
);
CUT.isError("assertDeepStrictEqual(); 13b - error",
  () => CEL.assertDeepStrictEqual(
    token1, token2, "assertDeepStrictEqual(); 13b - error"
  )
);
CUT.isError("assertDeepStrictEqual(); 13c - error",
  () => CEL.assertDeepStrictEqual(
    token1, token3, "assertDeepStrictEqual(); 13c - error"
  )
);
/* objects / Error */
token1 = new Error("Agradzsag");
token2 = new Error("Agradzsag");
token3 = new TypeError("Agradzsag");
token3 = new TypeError("Agradzsag");
CUT.isTrue("assertDeepStrictEqual(); 14a - ok",
  CEL.assertDeepStrictEqual(token1, token1)
);
CUT.isTrue("assertDeepStrictEqual(); 14b - ok",
  CEL.assertDeepStrictEqual(token3, token3)
);
CUT.isError("assertDeepStrictEqual(); 14c - error",
  () => CEL.assertDeepStrictEqual(
    token1, token2, "assertDeepStrictEqual(); 14c - error"
  )
);
CUT.isError("assertDeepStrictEqual(); 14d - error",
  () => CEL.assertDeepStrictEqual(
    token1, token3, "assertDeepStrictEqual(); 14d - error"
  )
);
/* types: null, undefined */
CUT.isTrue("assertDeepStrictEqual(); 15a - ok",
  CEL.assertDeepStrictEqual(null, null)
);
CUT.isTrue("assertDeepStrictEqual(); 15b - ok",
  CEL.assertDeepStrictEqual(undefined, undefined)
);
CUT.isError("assertDeepStrictEqual(); 15c - error",
  () => CEL.assertDeepStrictEqual(
    null, undefined, "assertDeepStrictEqual(); 15c - error"
  )
);
/* structures 1 */
token1 = new Error("Agradzsag");
token2 = [1,2,{"3": 4, "5": new Map([["6", 7], ["8", [9, token1]]])}];
token3 = [1,2,{"3": 4, "5": new Map([["6", 7], ["8", [9, token1]]])}];
token4 = [1,2,{"3": 4, "5": new Map([["6", 7], ["8", [9, 42]]])}];
token5 = [1,2,{"3": 4, "5": new Map([["6", 7], ["8", [9, token1, 42]]])}];
CUT.isTrue("assertDeepStrictEqual(); 16a - ok",
  CEL.assertDeepStrictEqual(token2, token2)
);
CUT.isTrue("assertDeepStrictEqual(); 16b - ok",
  CEL.assertDeepStrictEqual(token2, token3)
);
CUT.isError("assertDeepStrictEqual(); 16c - error",
  () => CEL.assertDeepStrictEqual(
    token2, token4, "assertDeepStrictEqual(); 16c - error"
  )
);
CUT.isError("assertDeepStrictEqual(); 16d - error",
  () => CEL.assertDeepStrictEqual(
    token2, token5, "assertDeepStrictEqual(); 16d - error"
  )
);
/* structures 2 */
token1 = new Error("Agradzsag");
token2 = [1, 2, {"3": 4, "5": new Map([["6", 7], ["8", [9, 10]], ["11", new Set([12, 13])]])}, token1];
token3 = [1, 2, {"3": 4, "5": new Map([["6", 7], ["8", [9, 10]], ["11", new Set([12, 13])]])}, token1];
token4 = [1, 2, {"3": 4, "5": new Map([["6", 7], ["8", ["a", 10]], ["11", new Set([12, 13])]])}, token1];
token5 = [1, 2, {"3": 4, "5": new Map([["6", 7], ["8", [9, 10]], ["11", new Set([12, 13, 14])]])}, token1];
CUT.isTrue("assertDeepStrictEqual(); 17a - ok",
  CEL.assertDeepStrictEqual(token2, token2)
);
CUT.isTrue("assertDeepStrictEqual(); 17b - ok",
  CEL.assertDeepStrictEqual(token2, token3)
);
CUT.isError("assertDeepStrictEqual(); 17c - error",
  () => CEL.assertDeepStrictEqual(
    token2, token4, "assertDeepStrictEqual(); 17c - error"
  )
);
CUT.isError("assertDeepStrictEqual(); 17d - error",
  () => CEL.assertDeepStrictEqual(
    token2, token5, "assertDeepStrictEqual(); 17d - error"
  )
);
/* structures 3 */
token1 = new Error("Agradzsag");
token2 = [1, 2, {"3": 4, "5": new Map([["6", 7], ["8", [9, 10]], ["11", new Set([12, 13])]])}, token1];
token3 = [1, 2, {"3": 4, "5": new Map([["6", 7], ["8", [9, 10]], ["11", new Set([12, 13])]])}, token1];
token4 = [1, 2, {"3": 4, "5": new Map([["6", 8], ["8", [9, 10]], ["11", new Set([12, 14])]])}, token1];
token5 = [1, 2, {"3": 4, "5": new Map([["6", 8], ["8", [9, 10, 15]], ["11", new Set([12, 13])]])}, token1];
CUT.isTrue("assertDeepStrictEqual(); 18a - ok",
  CEL.assertDeepStrictEqual(token2, token2)
);
CUT.isTrue("assertDeepStrictEqual(); 18b - ok",
  CEL.assertDeepStrictEqual(token2, token3)
);
CUT.isError("assertDeepStrictEqual(); 18c - error",
  () => CEL.assertDeepStrictEqual(
    token2, token4, "assertDeepStrictEqual(); 18c - error"
  )
);
CUT.isError("assertDeepStrictEqual(); 18d - error",
  () => CEL.assertDeepStrictEqual(
    token2, token5, "assertDeepStrictEqual(); 18d - error"
  )
);
/* structures 4 */
token1 = new Error("Agradzsag");
token2 = [1,2,{"3": 4, "5": new Map([["6", 7], ["8", [9, 10]], ["11", new Set([12, 13])]])}, token1];
token3 = [1,2,{"3": 4, "5": new Map([["6", 7], ["8", [9, 10]], ["11", new Set([12, 13])]])}, token1];
token4 = [1,5,{"3": 4, "5": new Map([["6", 7], ["8", [9, 10]], ["11", new Set([12, 13])]])}, token1];
token5 = [1,2,{"3": 4, "5": new Map([["6", 7], ["8", [9, 10]], ["11", new Set([12, 13, 14])]])}, token1];
CUT.isTrue("assertDeepStrictEqual(); 19a - ok",
  CEL.assertDeepStrictEqual(token2, token2)
);
CUT.isTrue("assertDeepStrictEqual(); 19b - ok",
  CEL.assertDeepStrictEqual(token2, token3)
);
CUT.isError("assertDeepStrictEqual(); 19c - error",
  () => CEL.assertDeepStrictEqual(
    token2, token4, "assertDeepStrictEqual(); 19c - error"
  )
);
CUT.isError("assertDeepStrictEqual(); 19d - error",
  () => CEL.assertDeepStrictEqual(
    token2, token5, "assertDeepStrictEqual(); 19d - error"
  )
);
/* objects / not same prototype - array */
CUT.isError("assertDeepStrictEqual(); 20a - error",
  () => CEL.assertDeepStrictEqual(
    {}, [], "assertDeepStrictEqual(); 20a - error"
  )
);
CUT.isError("assertDeepStrictEqual(); 20b - error",
  () => CEL.assertDeepStrictEqual(
    new Map(), [], "assertDeepStrictEqual(); 20b - error"
  )
);
CUT.isError("assertDeepStrictEqual(); 20c - error",
  () => CEL.assertDeepStrictEqual(
    new Set(), [], "assertDeepStrictEqual(); 20c - error"
  )
);
CUT.isError("assertDeepStrictEqual(); 20d - error",
  () => CEL.assertDeepStrictEqual(
    new WeakMap(), [], "assertDeepStrictEqual(); 20d - error"
  )
);
CUT.isError("assertDeepStrictEqual(); 20e - error",
  () => CEL.assertDeepStrictEqual(
    new WeakSet(), [], "assertDeepStrictEqual(); 20e - error"
  )
);
CUT.isError("assertDeepStrictEqual(); 20f - error",
  () => CEL.assertDeepStrictEqual(
    new Error(), [], "assertDeepStrictEqual(); 20f - error"
  )
);
CUT.isError("assertDeepStrictEqual(); 20g - error",
  () => CEL.assertDeepStrictEqual(
    42, [42], "assertDeepStrictEqual(); 20g - error"
  )
);
CUT.isError("assertDeepStrictEqual(); 20h - error",
  () => CEL.assertDeepStrictEqual(
    Object(42), [42], "assertDeepStrictEqual(); 20h - error"
  )
);
CUT.isError("assertDeepStrictEqual(); 20i - error",
  () => CEL.assertDeepStrictEqual(
    true, [true], "assertDeepStrictEqual(); 20i - error"
  )
);
CUT.isError("assertDeepStrictEqual(); 20j - error",
  () => CEL.assertDeepStrictEqual(Object(
    true), [true], "assertDeepStrictEqual(); 20j - error"
  )
);
CUT.isError("assertDeepStrictEqual(); 20k - error",
  () => CEL.assertDeepStrictEqual(
    "lorem", ["lorem"], "assertDeepStrictEqual(); 20k - error"
  )
);
CUT.isError("assertDeepStrictEqual(); 20l - error",
  () => CEL.assertDeepStrictEqual(
    Object("lorem"), ["lorem"], "assertDeepStrictEqual(); 20l - error"
  )
);
CUT.isError("assertDeepStrictEqual(); 20m - error",
  () => CEL.assertDeepStrictEqual(
    42n, [42n], "assertDeepStrictEqual(); 20m - error"
  )
);
CUT.isError("assertDeepStrictEqual(); 20n - error",
  () => CEL.assertDeepStrictEqual(
    Object(42n), [42n], "assertDeepStrictEqual(); 20n - error"
  )
);
/* objects / not same prototype - map */
CUT.isError("assertDeepStrictEqual(); 21a - error",
  () => CEL.assertDeepStrictEqual(
    new Map(), new Set(), "assertDeepStrictEqual(); 21a - error"
  )
);
CUT.isError("assertDeepStrictEqual(); 21b - error",
  () => CEL.assertDeepStrictEqual(
    new Map(), new WeakSet(), "assertDeepStrictEqual(); 21b - error"
  )
);
CUT.isError("assertDeepStrictEqual(); 21c - error",
  () => CEL.assertDeepStrictEqual(
    new Map(), new WeakMap(), "assertDeepStrictEqual(); 21c - error"
  )
);
CUT.isError("assertDeepStrictEqual(); 21d - error",
  () => CEL.assertDeepStrictEqual(
    new Error(), new Map(), "assertDeepStrictEqual(); 21d - error"
  )
);
CUT.isError("assertDeepStrictEqual(); 21e - error",
  () => CEL.assertDeepStrictEqual(
    42, new Map(), "assertDeepStrictEqual(); 21e - error"
  )
);
CUT.isError("assertDeepStrictEqual(); 21f - error",
  () =>  CEL.assertDeepStrictEqual(
    Object(42), new Map(), "assertDeepStrictEqual(); 21f - error"
  )
);
CUT.isError("assertDeepStrictEqual(); 21g - error",
  () => CEL.assertDeepStrictEqual(
    true, new Map(), "assertDeepStrictEqual(); 21g - error"
  )
);
CUT.isError("assertDeepStrictEqual(); 21h - error",
  () => CEL.assertDeepStrictEqual(
    Object(true), new Map(), "assertDeepStrictEqual(); 21h - error"
  )
);
CUT.isError("assertDeepStrictEqual(); 21i - error",
  () => CEL.assertDeepStrictEqual(
    "lorem", new Map(), "assertDeepStrictEqual(); 21i - error"
  )
);
CUT.isError("assertDeepStrictEqual(); 21j - error",
  () => CEL.assertDeepStrictEqual(
    Object("lorem"), new Map(), "assertDeepStrictEqual(); 21j - error"
  )
);
CUT.isError("assertDeepStrictEqual(); 21k - error",
  () => CEL.assertDeepStrictEqual(
    42n, new Map(), "assertDeepStrictEqual(); 21k - error"
  )
);
CUT.isError("assertDeepStrictEqual(); 21l - error",
  () => CEL.assertDeepStrictEqual(
    Object(42n), new Map(), "assertDeepStrictEqual(); 21l - error"
  )
);
/* objects / not same prototype - set */
CUT.isError("assertDeepStrictEqual(); 22a - error",
  () => CEL.assertDeepStrictEqual(
    new WeakMap(), new Set(), "assertDeepStrictEqual(); 22a - error"
  )
);
CUT.isError( "assertDeepStrictEqual(); 22b - error",
  () => CEL.assertDeepStrictEqual(
    new Error(), new Set(), "assertDeepStrictEqual(); 22b - error"
  )
);
CUT.isError("assertDeepStrictEqual(); 22c - error",
  () => CEL.assertDeepStrictEqual(
    42, new Set(), "assertDeepStrictEqual(); 22c - error"
  )
);
CUT.isError("assertDeepStrictEqual(); 22d - error",
  () => CEL.assertDeepStrictEqual(
    Object(42), new Set(), "assertDeepStrictEqual(); 22d - error"
  )
);
CUT.isError("assertDeepStrictEqual(); 22e - error",
  () => CEL.assertDeepStrictEqual(
    true, new Set(), "assertDeepStrictEqual(); 22e - error"
  )
);
CUT.isError("assertDeepStrictEqual(); 22f - error",
  () => CEL.assertDeepStrictEqual(
    Object(true), new Set(), "assertDeepStrictEqual(); 22f - error"
  )
);
CUT.isError("assertDeepStrictEqual(); 22g - error",
  () => CEL.assertDeepStrictEqual(
    "lorem", new Set(), "assertDeepStrictEqual(); 22g - error"
  )
);
CUT.isError("assertDeepStrictEqual(); 22h - error",
  () => CEL.assertDeepStrictEqual(
    Object("lorem"), new Set(), "assertDeepStrictEqual(); 22h - error"
  )
);
CUT.isError("assertDeepStrictEqual(); 22i - error",
  () => CEL.assertDeepStrictEqual(
    42n, new Set(), "assertDeepStrictEqual(); 22i - error"
  )
);
CUT.isError("assertDeepStrictEqual(); 22j - error",
  () => CEL.assertDeepStrictEqual(
    Object(42n), new Set(), "assertDeepStrictEqual(); 22j - error"
  )
);
/* objects / not same prototype - weakset */
CUT.isError("assertDeepStrictEqual(); 23a - error",
  () => CEL.assertDeepStrictEqual(
    new WeakMap(), new WeakSet(), "assertDeepStrictEqual(); 23a - error"
  )
);
CUT.isError("assertDeepStrictEqual(); 23b - error",
  () => CEL.assertDeepStrictEqual(
    new Error(), new WeakSet(), "assertDeepStrictEqual(); 23b - error"
  )
);
CUT.isError("assertDeepStrictEqual(); 23c - error",
  () => CEL.assertDeepStrictEqual(
    42, new WeakSet(), "assertDeepStrictEqual(); 23c - error"
  )
);
CUT.isError("assertDeepStrictEqual(); 23d - error",
  () => CEL.assertDeepStrictEqual(
    Object(42), new WeakSet(), "assertDeepStrictEqual(); 23d - error"
  )
);
CUT.isError("assertDeepStrictEqual(); 23e - error",
  () => CEL.assertDeepStrictEqual(
    true, new WeakSet(), "assertDeepStrictEqual(); 23e - error"
  )
);
CUT.isError("assertDeepStrictEqual(); 23f - error",
  () => CEL.assertDeepStrictEqual(
    Object(true), new WeakSet(), "assertDeepStrictEqual(); 23f - error"
  )
);
CUT.isError("assertDeepStrictEqual(); 23g - error",
  () => CEL.assertDeepStrictEqual(
    "lorem", new WeakSet(), "assertDeepStrictEqual(); 23g - error"
  )
);
CUT.isError("assertDeepStrictEqual(); 23h - error",
  () => CEL.assertDeepStrictEqual(
    Object("lorem"), new WeakSet(), "assertDeepStrictEqual(); 23h - error"
  )
);
CUT.isError("assertDeepStrictEqual(); 23i - error",
  () => CEL.assertDeepStrictEqual(
    42n, new WeakSet(), "assertDeepStrictEqual(); 23i - error"
  )
);
CUT.isError("assertDeepStrictEqual(); 23j - error",
  () => CEL.assertDeepStrictEqual(
    Object(42n), new WeakSet(), "assertDeepStrictEqual(); 23j - error"
  )
);
/* objects / not same prototype - weakmap */
CUT.isError("assertDeepStrictEqual(); 24a - error",
  () => CEL.assertDeepStrictEqual(
    new Error(), new WeakMap(), "assertDeepStrictEqual(); 24a - error"
  )
);
CUT.isError("assertDeepStrictEqual(); 24b - error",
  () => CEL.assertDeepStrictEqual(
    42, new WeakMap(), "assertDeepStrictEqual(); 24b - error"
  )
);
CUT.isError("assertDeepStrictEqual(); 24c - error",
  () => CEL.assertDeepStrictEqual(
    Object(42), new WeakMap(), "assertDeepStrictEqual(); 24c - error"
  )
);
CUT.isError("assertDeepStrictEqual(); 24d - error",
  () => CEL.assertDeepStrictEqual(
    true, new WeakMap(), "assertDeepStrictEqual(); 24d - error"
  )
);
CUT.isError("assertDeepStrictEqual(); 24e - error",
  () => CEL.assertDeepStrictEqual(
    Object(true), new WeakMap(), "assertDeepStrictEqual(); 24e - error"
  )
);
CUT.isError("assertDeepStrictEqual(); 24f - error",
  () => CEL.assertDeepStrictEqual(
    "lorem", new WeakMap(), "assertDeepStrictEqual(); 24f - error"
  )
);
CUT.isError("assertDeepStrictEqual(); 24g - error",
  () => CEL.assertDeepStrictEqual(
    Object("lorem"), new WeakMap(), "assertDeepStrictEqual(); 24g - error"
  )
);
CUT.isError("assertDeepStrictEqual(); 24h - error",
  () => CEL.assertDeepStrictEqual(
    42n, new WeakMap(), "assertDeepStrictEqual(); 24h - error"
  )
);
CUT.isError("assertDeepStrictEqual(); 24i - error",
  () => CEL.assertDeepStrictEqual(
    Object(42n), new WeakMap(), "assertDeepStrictEqual(); 24i - error"
  )
);
/* objects / not same prototype - error */
CUT.isError("assertDeepStrictEqual(); 25a - error",
  () => CEL.assertDeepStrictEqual(
    42, new Error(42), "assertDeepStrictEqual(); 25a - error"
  )
);
CUT.isError("assertDeepStrictEqual(); 25b - error",
  () => CEL.assertDeepStrictEqual(
    Object(42), new Error(42), "assertDeepStrictEqual(); 25b - error"
  )
);
CUT.isError("assertDeepStrictEqual(); 25c - error",
  () => CEL.assertDeepStrictEqual(
    true, new Error(true), "assertDeepStrictEqual(); 25c - error"
  )
);
CUT.isError("assertDeepStrictEqual(); 25d - error",
  () => CEL.assertDeepStrictEqual(
    Object(true), new Error(true), "assertDeepStrictEqual(); 25d - error"
  )
);
CUT.isError("assertDeepStrictEqual(); 25e - error",
  () => CEL.assertDeepStrictEqual(
    "lorem", new Error("lorem"), "assertDeepStrictEqual(); 25e - error"
  )
);
CUT.isError("assertDeepStrictEqual(); 25f - error",
  () => CEL.assertDeepStrictEqual(
    Object("lorem"), new Error("lorem"), "assertDeepStrictEqual(); 25f - error"
  )
);
CUT.isError("assertDeepStrictEqual(); 25g - error",
  () => CEL.assertDeepStrictEqual(
    42n, new Error(42n), "assertDeepStrictEqual(); 25g - error"
  )
);
CUT.isError("assertDeepStrictEqual(); 25h - error",
  () => CEL.assertDeepStrictEqual(
    Object(42n), new Error(42n), "assertDeepStrictEqual(); 25h - error"
  )
);
/* objects / not same prototype - number */
CUT.isError("assertDeepStrictEqual(); 26a - error",
  () =>
    CEL.assertDeepStrictEqual(true, 1, "assertDeepStrictEqual(); 26a - error")
);
CUT.isError("assertDeepStrictEqual(); 26b - error",
  () => CEL.assertDeepStrictEqual(
    Object(true), 1, "assertDeepStrictEqual(); 26b - error"
  )
);
CUT.isError("assertDeepStrictEqual(); 26c - error",
  () =>
    CEL.assertDeepStrictEqual("1", 1, "assertDeepStrictEqual(); 26c - error")
);
CUT.isError("assertDeepStrictEqual(); 26d - error",
  () => CEL.assertDeepStrictEqual(
    Object("1"), 1, "assertDeepStrictEqual(); 26d - error"
  )
);
CUT.isError("assertDeepStrictEqual(); 26e - error",
  () => CEL.assertDeepStrictEqual(
    42n, 42, "assertDeepStrictEqual(); 26e - error"
  )
);
CUT.isError("assertDeepStrictEqual(); 26f - error",
  () => CEL.assertDeepStrictEqual(
    Object(42n), 42, "assertDeepStrictEqual(); 26f - error"
  )
);
/* objects / not same prototype - string */
CUT.isError("assertDeepStrictEqual(); 27a - error",
  () => CEL.assertDeepStrictEqual(
    true, "true", "assertDeepStrictEqual(); 27a - error"
  )
);
CUT.isError("assertDeepStrictEqual(); 27b - error",
  () => CEL.assertDeepStrictEqual(
    42n, "42n", "assertDeepStrictEqual(); 27b - error"
  )
);
CUT.isError("assertDeepStrictEqual(); 27c - error",
  () => CEL.assertDeepStrictEqual(
    Object(42), "42", "assertDeepStrictEqual(); 27c - error"
  )
);
CUT.isError("assertDeepStrictEqual(); 27d - error",
  () => CEL.assertDeepStrictEqual(
    Object(42n), "42n", "assertDeepStrictEqual(); 27d - error"
  )
);
CUT.isError("assertDeepStrictEqual(); 27e - error",
  () => CEL.assertDeepStrictEqual(
    Object(true), "true", "assertDeepStrictEqual(); 27e - error"
  )
);
/* objects / not same prototype - boolean */
CUT.isError("assertDeepStrictEqual(); 28a - error",
  () => CEL.assertDeepStrictEqual(
    1n, true, "assertDeepStrictEqual(); 28a - error"
  )
);
CUT.isError("assertDeepStrictEqual(); 28b - error",
  () => CEL.assertDeepStrictEqual(
    Object(1n), true, "assertDeepStrictEqual(); 28b - error"
  )
);
CUT.isError("assertDeepStrictEqual(); 28c - error",
  () => CEL.assertDeepStrictEqual(
    Object(1), true, "assertDeepStrictEqual(); 28c - error"
  )
);
CUT.isError("assertDeepStrictEqual(); 28d - error",
  () => CEL.assertDeepStrictEqual(
    "true", true, "assertDeepStrictEqual(); 28d - error"
  )
);
/* objects / not same prototype - bigint */
CUT.isError("assertDeepStrictEqual(); 29a - error",
  () => CEL.assertDeepStrictEqual(
    Object(42), 42n, "assertDeepStrictEqual(); 29a - error"
  )
);
CUT.isError("assertDeepStrictEqual(); 29b - error",
  () => CEL.assertDeepStrictEqual(
    Object("42"), 42n, "assertDeepStrictEqual(); 29b - error"
  )
);
/* Chrome - Firefox not the same result
CUT.isError("assertDeepStrictEqual(); 29c - error",
  () => CEL.assertDeepStrictEqual(
    Object(true), 1n, "assertDeepStrictEqual(); 29c - error"
  )
);
*/
/* objects / not same prototype - Object wrappers */
CUT.isError("assertDeepStrictEqual(); 30a - error",
  () => CEL.assertDeepStrictEqual(
    Object(42), Object("42"), "assertDeepStrictEqual(); 30a - error"
  )
);
CUT.isError("assertDeepStrictEqual(); 30b - error",
  () => CEL.assertDeepStrictEqual(
    Object(1), Object(true), "assertDeepStrictEqual(); 30b - error"
  )
);
CUT.isError("assertDeepStrictEqual(); 30c - error",
  () => CEL.assertDeepStrictEqual(
    Object(1), Object(1n), "assertDeepStrictEqual(); 30c - error"
  )
);
CUT.isError("assertDeepStrictEqual(); 30d - error",
  () => CEL.assertDeepStrictEqual(
    Object("true"), Object(true), "assertDeepStrictEqual(); 30d - error"
  )
);
CUT.isError("assertDeepStrictEqual(); 30e - error",
  () => CEL.assertDeepStrictEqual(
    Object(42n), Object("42n"), "assertDeepStrictEqual(); 30e - error"
  )
);
CUT.isError("assertDeepStrictEqual(); 30f - error",
  () => CEL.assertDeepStrictEqual(
    Object(1n), Object(true), "assertDeepStrictEqual(); 30f - error"
  )
);
/* dataview + arraybuffer */
token1 = new ArrayBuffer(2);
token2 = new DataView(token1);
token2.setInt8(0, 125, true);
token2.setInt8(1, 100, true);
token3 = new ArrayBuffer(2);
token4 = new DataView(token3);
token4.setInt8(0, 125, true);
token4.setInt8(1, 100, true);
token5 = new ArrayBuffer(2);
token6 = new DataView(token5);
token6.setInt8(0, 120, true);
token6.setInt8(1, 100, true);
token7 = new ArrayBuffer(3);
token8 = new DataView(token7);
token8.setInt8(0, 125, true);
token8.setInt8(1, 100, true);
CUT.isTrue("assertDeepStrictEqual(); 31a",
     CEL.assertDeepStrictEqual([1, 2, token1, 3], [1, 2, token1, 3])
  && CEL.assertDeepStrictEqual([1, 2, token1, 3], [1, 2, token3, 3])
  && CEL.assertDeepStrictEqual([1, 2, token2, 3], [1, 2, token2, 3])
  && CEL.assertDeepStrictEqual([1, 2, token2, 3], [1, 2, token4, 3])
);
CUT.isError(
  "assertDeepStrictEqual(); 31b",
  () => CEL.assertDeepStrictEqual(
    [1, 2, token1, 3], [1, 2, token5, 3], "assertDeepStrictEqual(); 31b"
  )
);
CUT.isError(
  "assertDeepStrictEqual(); 31c",
  () => CEL.assertDeepStrictEqual(
    [1, 2, token1, 3], [1, 2, token7, 3], "assertDeepStrictEqual(); 31c"
  )
);
CUT.isError(
  "assertDeepStrictEqual(); 31d",
  () => CEL.assertDeepStrictEqual(
    [1, 2, token2, 3], [1, 2, token6, 3], "assertDeepStrictEqual(); 31d"
  )
);
CUT.isError(
  "assertDeepStrictEqual(); 31e",
  () => CEL.assertDeepStrictEqual(
    [1, 2, token2, 3], [1, 2, token8, 3], "assertDeepStrictEqual(); 31e"
  )
);
/* assertDeepStrictEqual end */


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
  CUT.join(CEL.iterCycle(["a", "b", "c"], 5))
);
CUT.isEqual("iterCycle(); 02", "10 13 16 19 10 13 16 19 10 13 16 19",
  CUT.join(CEL.iterCycle(CEL.iterRange(10, 3, 20), 3))
);
CUT.isEqual("iterCycle(); 03", "A B A B A B A",
  CUT.join(CUT.take(CEL.iterCycle(['A', 'B']), 7))
);


/* iterRepeat(); */
CUT.isEqual("iterRepeat(); 01", "AB AB AB", CUT.join(CEL.iterRepeat("AB", 3)));
CUT.isEqual("iterRepeat(); 02", "AB AB AB AB AB",
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
CUT.isEqual("map(); 01", "2 4 6", CUT.join(CEL.map([1, 2, 3], (e) => e * 2)));
CUT.isEqual("map(); 02", "CAT, DOG, PIG",
  CUT.join(CEL.map("cat, dog, pig", (e) => e.toUpperCase()), "")
);
token1 = "";
for (let item of CEL.map(
  new Map([ ["foo", 1], ["bar", 2], ["baz", 3] ]), (e) => [e[0], e[1] * 2])) {
  token1 += item[0] + item[1];
}
CUT.isEqual("map(); 04", "foo2bar4baz6", token1);
CUT.isEqual("map(); 05", "2 4 6",
  CUT.join(CEL.map(new Set([1, 2, 3]), (e) => e * 2))
);
CUT.isEqual("map(); 06", "3 6 9",
  CUT.join(CEL.map((new Set([1, 2, 3])).values(), (e) => e * 3))
);


/* take(); */
token1 = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
CUT.isEqual("take(); 01", "", CUT.join(CEL.take(token1, 0)));
CUT.isEqual("take(); 02", "A B C D E F G", CUT.join(CEL.take(token1, 7)));
CUT.isEqual("take(); 03", "A B C D E F G H I J", CUT.join(CEL.take(token1, 12)));
CUT.isEqual("take(); 04 - default 1", "A", CUT.join(CEL.take(token1)));


/* drop(); */
token1 = ["A", "B" , "C", "D", "E", "F", "G", "H", "I", "J"];
CUT.isEqual("drop(); 01", "A B C D E F G H I J", CUT.join(CEL.drop(token1, 0)));
CUT.isEqual("drop(); 02", "H I J", CUT.join(CEL.drop(token1, 7)));
CUT.isEqual("drop(); 03", "", CUT.join(CEL.drop(token1, 12)));
CUT.isEqual("drop(); 04", "B C D E F G H I J", CUT.join(CEL.drop(token1)));


/* filter(); */
CUT.isEqual("filter();", "4 5 6 7 8",
  CUT.join(CEL.filter([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], (v) => (v > 3 && v < 9)))
);


/* reject(); */
CUT.isEqual("reject();", "1 2 3 9 10",
  CUT.join(CEL.reject([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], (v) => (v > 3 && v < 9)))
);


/* slice(); */
token1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
CUT.isEqual("slice(); 01", "1 2 3 4 5", CUT.join(CEL.slice(token1, 0, 4)));
CUT.isEqual("slice(); 02", "6 7 8 9 10", CUT.join(CEL.slice(token1, 5)));
CUT.isEqual("slice(); 03", "5 6 7 8 9", CUT.join(CEL.slice(token1, 4, 8)));
CUT.isEqual("slice(); 04", "1 2 3 4 5 6 7 8 9 10", CUT.join(CEL.slice(token1)));


/* tail(); */
CUT.isEqual("tail();", "2 3 4 5 6", CUT.join(CEL.tail([1, 2, 3, 4, 5, 6])));


/* takeWhile(); */
token1 = [0, 2, 4, 6, 8, 10, 12, 14, 16];
token2 = 0;
for (let item of CEL.takeWhile(token1, (e) => e < 10)) { token2 += item; }
CUT.isEqual("takeWhile(); 01", token2, 20);
token2 = 0;
for (let item of CEL.takeWhile(token1, (e) => e < 0)) { token2 += item; }
CUT.isEqual("takeWhile(); 02", token2, 0);
token2 = 0;
for (let item of CEL.takeWhile(token1, (e) => e < 30)) { token2 += item; }
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
CUT.isTrue("includes();",
  CEL.includes([4, 5, 6, 7, 8, 9], 9) && !CEL.includes([4, 5, 6, 7, 8, 9], 10)
);


/* contains(); */
CUT.isTrue("contains();",
  CEL.contains([4, 5, 6, 7, 8, 9], 9) && !CEL.contains([4, 5, 6, 7, 8, 9], 10)
);


/* find(); */
CUT.isEqual("find(); 01", 6, CEL.find([4, 5, 6, 7, 8, 9], (v) => (v > 5)));
CUT.isEqual("find(); 02", undefined, CEL.find([4, 5, 6, 7, 8, 9],(v) => (v>11)));


/* findLast(); */
CUT.isTrue("findLast();",
  CEL.findLast([4, 1, 7, 2, 9], (v) => v < 5) === 2
    && CEL.findLast([4, 1, 7, 2, 9], (v) => v > 10) === undefined
);


/* every(); */
CUT.isTrue("every();",
      CEL.every([2, 9, 3, 5, 8], (v) => v > 1)
  && !CEL.every([2, 9, 3, 5, 8], (v)=> v > 3)
  && !CEL.every([2, 9, 3, 5, 8], (v) =>v < 0)
  && !CEL.every([], (v) => v > 3)
);

/* some(); */
CUT.isTrue("some();",
      CEL.some([2, 9, 3, 5, 8], (v) => v > 3)
  && !CEL.some([2, 9, 3, 5, 8], (v) => v < 0)
  && !CEL.some([], (v) => v < 0)
);


/* none(); */
CUT.isTrue("none();",
      CEL.none([2, 9, 3, 5, 8], (v) => v < 0)
  && !CEL.none([2, 9, 3, 5, 8], (v) => v > 1)
  && !CEL.none([2, 9, 3, 5, 8], (v) => v > 3)
  && !CEL.none([], (v) => v > 3)
);


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
  CEL.reduce([4, 5, 6, 7, 8, 9].values(), (acc, v, i) => acc + v, 0)
);
CUT.isEqual("reduce(); 02", 39,
  CEL.reduce([4, 5, 6, 7, 8, 9].values(), (acc, v, i) => acc + v)
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
var token1 = [2, 4, 6, 4, 8, 2];
CUT.isEqual("join();",
  "2,4,6,4,8,2 2468 2;4;6;8 2x4x6x8 2true4true6true8 2114116118 ",
  CUT.join([
    CEL.join(token1),
    CEL.join(new Set(token1), ""),
    CEL.join(new Set(token1), ";"),
    CEL.join(new Set(token1), "x"),
    CEL.join(new Set(token1), true),
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
CUT.isEqual("Math.sumPrecise(); 01", Math.sumPrecise([]), -0);
CUT.isEqual("Math.sumPrecise(); 02", Math.sumPrecise([Infinity]), Infinity);
CUT.isEqual("Math.sumPrecise(); 03", Infinity,
  Math.sumPrecise([0.1, 0.2, 1e20, -1e20, 1e20, Infinity])
);
CUT.isEqual("Math.sumPrecise(); 04", Math.sumPrecise([-Infinity]), -Infinity);
CUT.isEqual("Math.sumPrecise(); 05", -Infinity,
  Math.sumPrecise([0.1, 0.2, 1e20, -1e20, 1e20, -Infinity])
);
CUT.isEqual("Math.sumPrecise(); 06",
  Math.sumPrecise([-4234233, 1e20]), 99999999999995770000
);
CUT.isEqual("Math.sumPrecise(); 07",
  Math.sumPrecise([-4234233.5, 1e20]), 99999999999995770000
);
CUT.isEqual("Math.sumPrecise(); 08",
  Math.sumPrecise([4234233, -1e20]), -99999999999995770000
);
CUT.isEqual("Math.sumPrecise(); 09",
  Math.sumPrecise([4234233.5, -1e20]), -99999999999995770000
);
CUT.isEqual("Math.sumPrecise(); 10", 1,
  Math.sumPrecise([0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1])
);
CUT.isEqual("Math.sumPrecise(); 11", Math.sumPrecise([1, 2]), 3);
CUT.isEqual("Math.sumPrecise(); 12", Math.sumPrecise([1, 2, 3]), 6);
CUT.isEqual("Math.sumPrecise(); 13", Math.sumPrecise([42]), 42);
CUT.isEqual("Math.sumPrecise(); 14", Math.sumPrecise([42, -98]), -56);
CUT.isEqual("Math.sumPrecise(); 15", Math.sumPrecise([42, 3.14]), 45.14);
CUT.isEqual("Math.sumPrecise(); 16", Math.sumPrecise([42, -53.14]), -11.14);
CUT.isEqual("Math.sumPrecise(); 17", Math.sumPrecise([0.1, 0.2]),
  0.30000000000000004
);
CUT.isEqual("Math.sumPrecise(); 18", Math.sumPrecise([1e20, 0.1, -1e20]), 0.1);
CUT.isEqual("Math.sumPrecise(); 19", Math.sumPrecise([2, 1e20-1]),
  100000000000000000000
);
CUT.isEqual("Math.sumPrecise(); 20", Math.sumPrecise([1e20, 0.1]),
  100000000000000000000
);
CUT.isEqual("Math.sumPrecise(); 21", Math.sumPrecise([1e20]),
  100000000000000000000
);
CUT.isEqual("Math.sumPrecise(); 22", Math.sumPrecise([-2, -1e20 + 1]),
  -100000000000000000000
);
CUT.isEqual("Math.sumPrecise(); 23", Math.sumPrecise([0.1, -1e20]),
  -100000000000000000000
);
CUT.isEqual("Math.sumPrecise(); 24", Math.sumPrecise([-1e20]),
  -100000000000000000000
);
CUT.isNotEqual("Math.sumPrecise(); 25", NaN,
  Math.sumPrecise([Infinity, 0.1, 0.2, -Infinity])
);
CUT.isNotEqual("Math.sumPrecise(); 26", NaN,
  Math.sumPrecise([-Infinity, 0.1, 0.2, Infinity])
);
CUT.isNotEqual("Math.sumPrecise(); 27", NaN, Math.sumPrecise([0.1, 0.1, NaN]));
CUT.isError("Math.sumPrecise(); 28", () => Math.sumPrecise(5));
CUT.isError("Math.sumPrecise(); 29", () => Math.sumPrecise("1848"));
CUT.isError("Math.sumPrecise(); 30", () => Math.sumPrecise("1848a"));
CUT.isError("Math.sumPrecise(); 31",
  () => Math.sumPrecise([0.1,0.1,0.1,0.1,0.1,0.1, 0.1, 0.1, 0.1, "0.1"])
);
CUT.isError("Math.sumPrecise(); 32",
  () => Math.sumPrecise([0.1,0.1,0.1,0.1,0.1, 0.1, 0.1, 0.1, 0.1, true])
);
CUT.isError("Math.sumPrecise(); 33",
  () => Math.sumPrecise(
    [0.1,0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, BigInt(5)]
  )
);
CUT.isError("Math.sumPrecise(); 34",
  () => Math.sumPrecise([Infinity,"0.1", 0.2])
);
CUT.isError("Math.sumPrecise(); 35",
  () => Math.sumPrecise([-Infinity, "0.1", 0.2])
);
CUT.isError("Math.sumPrecise(); 36",
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
token1 = new GeneratorFunction("v", "yield v * 3; yield v * 4;");
CUT.isEqual("GeneratorFunction();", "9 12", CUT.join(token1(3)));


/* AsyncFunction(); */
CUT.isEqual("AsyncFunction();", "asyncfunction",
  CEL.classof(new AsyncFunction("a", "b",
    "return await resolveAfter2Seconds(a) + await resolveAfter2Seconds(b);"
  )
));


/* AsyncGeneratorFunction(); */
CUT.isEqual("AsyncGeneratorFunction();", "asyncgeneratorfunction",
  CEL.classof(async function* () {})
);


/* isSameClass(); */
CUT.isTrue("isSameClass(); 01", CEL.isSameClass(NaN, 42));
CUT.isFalse("isSameClass(); 02", CEL.isSameClass(NaN, "lorem"));


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


/* isDeepStrictEqual(); begin */
/* only structures 1 copied */
token1 = new ArrayBuffer(2);
token2 = new DataView(token1);
token2.setInt8(0, 125, true);
token2.setInt8(1, 100, true);
token3 = new ArrayBuffer(2);
token4 = new DataView(token3);
token4.setInt8(0, 125, true);
token4.setInt8(1, 100, true);
token5 = new ArrayBuffer(2);
token6 = new DataView(token5);
token6.setInt8(0, 120, true);
token6.setInt8(1, 100, true);
token7 = new ArrayBuffer(3);
token8 = new DataView(token7);
token8.setInt8(0, 125, true);
token8.setInt8(1, 100, true);
CUT.isTrue("isDeepStrictEqual(); 01",
     CEL.isDeepStrictEqual([1, 2, token1, 3], [1, 2, token1, 3])
  && CEL.isDeepStrictEqual([1, 2, token1, 3], [1, 2, token3, 3])
  && CEL.isDeepStrictEqual([1, 2, token2, 3], [1, 2, token2, 3])
  && CEL.isDeepStrictEqual([1, 2, token2, 3], [1, 2, token4, 3])
);
CUT.isFalse("isDeepStrictEqual(); 02",
     CEL.isDeepStrictEqual([1, 2, token1, 3], [1, 2, token5, 3])
  || CEL.isDeepStrictEqual([1, 2, token1, 3], [1, 2, token7, 3])
  || CEL.isDeepStrictEqual([1, 2, token2, 3], [1, 2, token6, 3])
  || CEL.isDeepStrictEqual([1, 2, token2, 3], [1, 2, token8, 3])
);
token1 = new Error("Agradzsag");
token2 = [1,2,{"3": 4, "5": new Map([["6", 7], ["8", [9, token1]]])}];
token3 = [1,2,{"3": 4, "5": new Map([["6", 7], ["8", [9, token1]]])}];
token4 = [1,2,{"3": 4, "5": new Map([["6", 7], ["8", [9, 42]]])}];
token5 = [1,2,{"3": 4, "5": new Map([["6", 7], ["8", [9, token1, 42]]])}];
CUT.isTrue("isDeepStrictEqual(); 16a - ok",
  CEL.isDeepStrictEqual(token2, token2)
);
CUT.isTrue("isDeepStrictEqual(); 16b - ok",
  CEL.isDeepStrictEqual(token2, token3)
);
CUT.isFalse("isDeepStrictEqual(); 16c - error",
  CEL.isDeepStrictEqual(token2, token4)
);
CUT.isFalse("isDeepStrictEqual(); 16d - error",
  CEL.isDeepStrictEqual(token2, token5)
);
/* isDeepStrictEqual(); end */


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
token2 = { get(target, prop, receiver) { return "world"; } };
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


/* isClass(); */
CUT.isTrue("isClass();",
  CEL.isClass(Array) && !CEL.isClass(Array.from) && !CEL.isClass(0)
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
       new AsyncFunction("a", "b",
         "return await resolveAfter2Seconds(a) + await resolveAfter2Seconds(b);"
       ))
);


/* isAsyncFn(); */
CUT.isTrue("isAsyncFn();",
  CEL.isAsyncFn(
    new AsyncFunction("a", "b",
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


/* isNil(); */
CUT.isTrue("isNil();",
  CEL.isNil(undefined) &&  CEL.isNil(null) && !CEL.isNil(NaN) && !CEL.isNil(42)
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
  CEL.createPolyfillMethod(token1, "c", 3) &&
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


/* type(); */
CUT.isTrue("type();",
  CEL.type(null) === "null"
    && CEL.type(undefined) === "undefined"
    && CEL.type([]) === "object"
    && CEL.type(function () {}) === "function"
    && CEL.type(42) === "number"
    && CEL.type("42") === "string"
    && CEL.type(true) === "boolean"
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
CUT.isEqual("clamp(); 12",    0,   CEL.clamp(15,   -0n, 0));
CUT.isEqual("clamp(); 13",    0n,  CEL.clamp(0n,   -0,  15));
CUT.isEqual("clamp(); 14",    15,  CEL.clamp(10,   15,  20n));
CUT.isEqual("clamp(); 15",    0n,  CEL.clamp(-0n,  -10, 0));
CUT.isEqual("clamp(); 16",    0,   CEL.clamp(0,    -10, -0n));
CUT.isEqual("clamp(); 17",    20,  CEL.clamp(25,   10n, 20));
CUT.isEqual("clamp(); 18",    15n, CEL.clamp(15n,  10n, 20n));
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
CUT.isEqual("minmax(); 12",    0,   CEL.minmax(15,   -0n, 0));
CUT.isEqual("minmax(); 13",    0n,  CEL.minmax(0n,   -0,  15));
CUT.isEqual("minmax(); 14",    15,  CEL.minmax(10,   15,  20n));
CUT.isEqual("minmax(); 15",    0n,  CEL.minmax(-0n,  -10, 0));
CUT.isEqual("minmax(); 16",    0,   CEL.minmax(0,    -10, -0n));
CUT.isEqual("minmax(); 17",    20,  CEL.minmax(25,   10n, 20));
CUT.isEqual("minmax(); 18",    15n, CEL.minmax(15n,  10n, 20n));
CUT.isEqual("minmax(); 19",    10n, CEL.minmax(5,  10n, 20n));
CUT.isEqual("minmax(); 20",    10,  CEL.minmax(5,  10, 20));


/* product(); */
CUT.isEqual("product(); 01", CEL.product(3), 3);
CUT.isEqual("product(); 02", CEL.product(3, 5), 15);
CUT.isEqual("product(); 03", CEL.product(3.14, -5), -15.700000000000001);
CUT.isEqual("product(); 04", "NaN",
  String(CEL.product(true, 3.14, -9, 'Arthur Dent'))
);
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
  CEL.isEven(8) && !CEL.isEven(9) && !CEL.isEven(8.5) && !CEL.isEven("lorem")
);


/* isOdd(); */
CUT.isTrue("isOdd();",
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
CEL.asyncNoop().then(function(result) {
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
CEL.asyncIdentity(true).then(function(result) {
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
    + CUT.getHumanReadableJSON(e),
    false
  );
  console.log(CUT.getHumanReadableJSON(e, " "));
  console.log(CUT.getHumanReadableJSON(e));
  /* console.log(JSON.stringify(e, Object.getOwnPropertyNames(e))); */
}
