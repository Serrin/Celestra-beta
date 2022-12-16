/**
 * @name Celestra
 * @version 5.5.1 dev
 * @see https://github.com/Serrin/Celestra/
 * @license MIT https://opensource.org/licenses/MIT
 */
(function(window, document){
"use strict";

/** polyfills **/

/* Object.is(); */
if (!Object.is) {
  Object.is = function (x, y) {
    if (x===y) { return x!==0 || 1/x === 1/y; } else { return x!==x && y!==y; }
  };
}

/* Number.MIN_SAFE_INTEGER; */
if(!("MIN_SAFE_INTEGER" in Number)){Number.MIN_SAFE_INTEGER=-9007199254740991;}

/* Number.MAX_SAFE_INTEGER; */
if(!("MAX_SAFE_INTEGER" in Number)){Number.MAX_SAFE_INTEGER=9007199254740991;}

/* crypto.randomUUID(); */
if (("crypto" in window) && !("randomUUID" in window.crypto)) {
  window.crypto.randomUUID = function randomUUID () {
    return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g,
      (c)=>(c^crypto.getRandomValues(new Uint8Array(1))[0]&15>>c/4).toString(16)
    );
  };
}

/* Array.prototype.group(<fn>[,thisArg]); */
if (!("group" in Array.prototype)) {
  Object.defineProperty(Array.prototype, "group", {
    "configurable": true, "writable": true, "enumerable": false,
    "value": function (fn, thisArg) {
      "use strict";
      function toArray (O) { return (Array.isArray(O) ? O : Array.from(O)); }
      if (!(typeof fn === "function")) { throw new TypeError(); }
      var a = toArray(this);
      var key, r = Object.create(null), l = a.length;
      for (var i = 0; i < l; i++) {
        key = fn.call(thisArg, a[i], i, a);
        if (!(Object.prototype.hasOwnProperty.call(r, key))) { r[key] = []; }
        r[key].push(a[i]);
      }
      return r;
    }
  });
}

/* Array.prototype.groupToMap(<fn>[,thisArg]); */
if (!("groupToMap" in Array.prototype)) {
  Object.defineProperty(Array.prototype, "groupToMap", {
    "configurable": true, "writable": true, "enumerable": false,
    "value": function (fn, thisArg) {
      "use strict";
      function toArray (O) { return (Array.isArray(O) ? O : Array.from(O)); }
      if (!(typeof fn === "function")) { throw new TypeError(); }
      var a = toArray(this);
      var key, r = new Map(), l = a.length;
      for (var i = 0; i < l; i++) {
        key = fn.call(thisArg, a[i], i, a);
        if (!(r.has(key))) { r.set(key, []); }
        r.get(key).push(a[i]);
      }
      return r;
    }
  });
}

/* Array.prototype.at(); */
if (!("at" in Array.prototype)) {
  Object.defineProperty(Array.prototype, "at", {
    writable: true, enumerable: false, configurable: true,
    value: function at(n) {
      n = Math.trunc(n) || 0;
      if (n < 0) { n += this.length; }
      if (n < 0 || n >= this.length) { return undefined; }
      return this[String(n)];
    }
  });
}

/* TypedArray.prototype.at(); */
if (!("at" in Uint8Array.prototype)) {
  Object.defineProperty(Uint8Array.prototype, "at", {
    writable: true, enumerable: false, configurable: true,
    value: function at(n) {
      n = Math.trunc(n) || 0;
      if (n < 0) { n += this.length; }
      if (n < 0 || n >= this.length) { return undefined; }
      return this[String(n)];
    }
  });
}

/* String.prototype.at(); */
if (!("at" in String.prototype)) {
  Object.defineProperty(String.prototype, "at", {
    writable: true, enumerable: false, configurable: true,
    value: function at(n) {
      n = Math.trunc(n) || 0;
      if (n < 0) { n += this.length; }
      if (n < 0 || n >= this.length) { return undefined; }
      return String(this)[String(n)];
    }
  });
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

/* String.prototype.trimStart(); */
if (!("trimStart" in String.prototype)) {
  Object.defineProperty(String.prototype, "trimStart", {
    writable: true, enumerable: false, configurable: true,
    value: function () { return String(this).replace(/^\s+/, ""); }
  });
}

/* String.prototype.trimLeft(); */
if (!("trimLeft" in String.prototype)) {
  Object.defineProperty(String.prototype, "trimLeft", {
    writable: true, enumerable: false, configurable: true,
    value: function () { return String(this).replace(/^\s+/, ""); }
  });
}

/* String.prototype.trimEnd(); */
if (!("trimEnd" in String.prototype)) {
  Object.defineProperty(String.prototype, "trimEnd", {
    writable: true, enumerable: false, configurable: true,
    value: function () { return String(this).replace(/\s+$/, ""); }
  });
}

/* String.prototype.trimRight(); */
if (!("trimRight" in String.prototype)) {
  Object.defineProperty(String.prototype, "trimRight", {
    writable: true, enumerable: false, configurable: true,
    value: function () { return String(this).replace(/\s+$/, ""); }
  });
}

/* String.prototype.padStart(); */
if (!("padStart" in String.prototype)) {
  Object.defineProperty(String.prototype, "padStart", {
    writable: true, enumerable: false, configurable: true,
      value: function (len, str) {
      len = Math.floor(Number(len));
      if (len <= this.length || len === NaN ) {
        return String(this);
      } else {
        str = String(typeof str !== "undefined" ? str: " ");
        if (str.length === 0) { return String(this); }
        var res = "", n = Math.floor( (len - this.length) / str.length) + 1;
        for (var i = 0; i < n; i++) { res += str; }
        return res.slice(0, len - this.length) + String(this);
      }
    }
  });
}

/* String.prototype.padEnd(); */
if (!("padEnd" in String.prototype)) {
  Object.defineProperty(String.prototype, "padEnd", {
    writable: true, enumerable: false, configurable: true,
      value:  function (len, str) {
      len = Math.floor(Number(len));
      if (len <= this.length || len === NaN ) {
        return String(this);
      } else {
        str = String(typeof str !== "undefined" ? str: " ");
        if (str.length === 0) { return String(this); }
        var res = "", n = Math.floor( (len - this.length) / str.length) + 1;
        for (var i = 0; i < n; i++) { res += str; }
        return String(this) + res.slice(0, len - this.length);
      }
    }
  });
}

/* String.prototype.replaceAll(); */
if (!("replaceAll" in String.prototype)) {
  Object.defineProperty(String.prototype, "replaceAll", {
    "configurable": true, "writable": true, "enumerable": false,
    "value": function (searchValue, replaceValue) {
      "use strict";
      if (this == null) {
        throw new TypeError("String.prototype.replaceAll requires |this| not to be null nor undefined");
      }
      if (Object.prototype.toString.call(searchValue)
        .replace(/^\[object (.+)\]$/, "$1").toLowerCase() === "regexp") {
        if (!searchValue.global) {
          throw new TypeError("String.prototype.replaceAll must be called with a global RegExp");
        }
        return String(this).replace(searchValue, replaceValue);
      }
      return String(this).split(String(searchValue)).join(replaceValue);
    }
  });
}

/* Array.prototype.flat(); */
if (!("flat" in Array.prototype)) {
  Object.defineProperty(Array.prototype, "flat", {
    writable: true, enumerable: false, configurable: true,
      value: function (depth) {
      if (depth === undefined) {
        depth = 1;
      } else {
        depth = Math.floor(Number(depth));
        if (isNaN(depth) || depth < 1) { return this; }
      }
      function deepFlat (a, cd) {
        a.forEach(function (e) {
          if (Array.isArray(e)) {
            if (cd < depth) { deepFlat(e, cd+1); } else { res.push(e); }
          } else {
            res.push(e);
          }
        });
      }
      var res = [];
      deepFlat(this, 0);
      return res;
    }
  });
}

/* Array.prototype.flatMap(); */
if (!("flatMap" in Array.prototype)) {
  Object.defineProperty(Array.prototype, "flatMap", {
    writable: true, enumerable: false, configurable: true,
    value: function (fn) {
      var res = [];
      this.map(fn).forEach(function (e) {
        if (Array.isArray(e)) { res = res.concat(e); } else { res.push(e); }
      });
      return res;
    }
  });
}

/* Object.fromEntries(); */
if (!Object.fromEntries) {
  Object.fromEntries = function (entries) {
    var r = {};
    for (let e of entries) { r[e[0]] = e[1]; }
    return r;
  };
}

/* globalThis; */
(function (global) {
  if (!global.globalThis) {
    if (Object.defineProperty) {
      Object.defineProperty(global, "globalThis", {
        configurable: true, enumerable: false, value: global, writable: true
      });
    } else { global.globalThis = global; }
  }
})(typeof this === "object" ? this : Function("return this")());

/* String.prototype.matchAll(); */
if (!("matchAll" in String.prototype)) {
  Object.defineProperty(String.prototype, "matchAll", {
    writable: true, enumerable: false, configurable: true,
      value: function* (regex) {
      function ef (fls, fl) { return (fls.includes(fl) ? fls : fls + fl); }
      const lc = new RegExp(regex, ef(regex.flags, "g"));
      let match;
      while (match = lc.exec(this)) { yield match; }
    }
  });
}

/* Array.prototype.findLast(); */
if (!("findLast" in Array.prototype)) {
  Object.defineProperty(Array.prototype, "findLast", {
    writable: true, enumerable: false, configurable: true,
    value: function findLast (fn) {
      if (typeof fn !== "function") {
        throw new TypeError(String(fn) + " is not a function");
      }
      var i = this.length;
      while (i--) { if (fn(this[i],i,this)) { return this[i]; } }
      return undefined;
    }
  });
}

/* Array.prototype.findLastIndex(); */
if (!("findLastIndex" in Array.prototype)) {
  Object.defineProperty(Array.prototype, "findLastIndex", {
    writable: true, enumerable: false, configurable: true,
    value: function findLastIndex (fn) {
      if (typeof fn !== "function") {
        throw new TypeError(String(fn) + " is not a function");
      }
      var i = this.length;
      while (i--) { if (fn(this[i],i,this)) { return i; } }
      return -1;
    }
  });
}

/* TypedArray.prototype.findLast(); */
if (!("findLast" in Uint8Array.prototype)) {
  Object.defineProperty(Uint8Array.prototype, "findLast", {
    writable: true, enumerable: false, configurable: true,
    value: function findLast (fn) {
      if (typeof fn !== "function") {
        throw new TypeError(String(fn) + " is not a function");
      }
      var i = this.length;
      while (i--) { if (fn(this[i],i,this)) { return this[i]; } }
      return undefined;
    }
  });
}

/* TypedArray.prototype.findLastIndex(); */
if (!("findLastIndex" in Uint8Array.prototype)) {
  Object.defineProperty(Uint8Array.prototype, "findLastIndex", {
    writable: true, enumerable: false, configurable: true,
    value: function findLastIndex (fn) {
      if (typeof fn !== "function") {
        throw new TypeError(String(fn) + " is not a function");
      }
      var i = this.length;
      while (i--) { if (fn(this[i],i,this)) { return i; } }
      return -1;
    }
  });
}

/** non-standard polyfills **/

/* window.GeneratorFunction(); */
if (!window.GeneratorFunction) {
  window.GeneratorFunction = Object.getPrototypeOf(function*(){}).constructor;
}

/* window.AsyncFunction(); */
if (!window.AsyncFunction) {
  window.AsyncFunction = Object.getPrototypeOf(async function(){}).constructor;
}

/* BigInt.prototype.toJSON(); */
if (!!window.BigInt && !("toJSON" in BigInt.prototype)) {
  Object.defineProperty(BigInt.prototype, "toJSON", {
    writable: true, enumerable: false, configurable: true,
    value: function toJSON () { return this.toString(); }
  });
}

/** core api **/

/* randomID([hyphens = true][,usedate = false]) : string */
function randomID (hyphens = true, useDate = false) {
  let r = ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g,
    (c)=>(c^crypto.getRandomValues(new Uint8Array(1))[0]&15>>c/4).toString(16)
  );
  if (!useDate) { return hyphens ? r : r.replaceAll("-", ""); }
  if (useDate) {
    let rA = [...r.replaceAll("-","")], d = (new Date()).getTime().toString(16);
    for (let i = 0; i < d.length; i++) { rA[i] = d[i]; }
    rA[12] = "4";
    r = rA.join("");
    return !hyphens ? r : r.slice(0, 8)
      +"-"+r.slice(8,12)+"-"+r.slice(12,16) +"-"+r.slice(16,20)+"-"+r.slice(20);
  }
}

/* signbit(<value: any>): boolean */
const signbit = (v) => (((v = +v) !== v) ? !1 : ((v < 0) || Object.is(v, -0)));

/* delay(<ms: integer>).then(<callback: function>): promise */
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
/* sleep(<ms: integer>).then(<callback: function>): promise */
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

/* randomInt([max: int] OR <min: int>,<max: int>): int */
function randomInt (i = 100, a) {
  if (a == null) { a = i; i = 0; }
  i = Math.ceil(+i);
  return Math.floor(Math.random() * (Math.floor(+a) - i + 1) + i);
}

/* randomFloat([max: float] OR <min: float>,<max: float>): float */
function randomFloat (i = 100, a) {
  if (a == null) { a = i; i = 0; }
  var r = (Math.random() * (a - i + 1)) + i;
  return r > a ? a : r;
}

/* randomBoolean(): boolean */
const randomBoolean = () => (Math.random() >= 0.5);

/* randomString([length:integer[,specialCharactersEnabled=false]]): string */
function randomString (pl = 100, sc = false) {
  var chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  if (sc) { chars += ",?,.:-_*$ß¤Łł÷×¸¨˝´˙`˛°˘^ˇ~§'+!%/=()[]#<>&@{}\"\\/| éáűőúöüóíÉÁŰŐÚÖÜÓÍß"; }
  var s = "", l = chars.length;
  for (var i = 0; i < pl; i++) { s += chars[Math.floor(Math.random()*l)]; }
  return s;
}

/* inRange(<value: number>,<min: number>,<max: number>): boolean */
const inRange = (v, i, a) => (v >= i && v <= a);

/* b64Encode(<string>): string */
function b64Encode (s) {
  return btoa(encodeURIComponent(String(s)).replace(/%([0-9A-F]{2})/g,
    function toSolidBytes (match, p1) { return String.fromCharCode("0x" + p1); }
  ));
}

/* b64Decode(<string>): string */
function b64Decode (s) {
  return decodeURIComponent(atob(String(s)).split("").map(function (c) {
    return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(""));
}

/* javaHash(<data: any>[,hexa=false]): integer */
function javaHash (s, hx = false) {
  if (s !== undefined) { s = "" + s; } else { return 0; }
  var h = 0, l = s.length, c = "";
  if (l == 0) { return h; }
  for (var i = 0; i < l; i++) {
    c = s.charCodeAt(i);
    h = ((h << 5) - h) + c;
    h = h & h;
  }
  if (hx) { return h.toString(16); }
  return h;
}

/* inherit(<subclass: function>,<superclass: function>): function */
function inherit (c, p) {
  c.prototype = Object.create(p.prototype);
  c.prototype.constructor = c;
  return c;
}

/* getUrlVars([str=location.search]): string */
const getUrlVars = (str = location.search) =>
  [...new URLSearchParams(str).entries()]
    .reduce(function (o, item) { o[item[0]] = item[1]; return o; }, {});

/* obj2string(<object>): string */
const obj2string = (o) => Object.keys(o).reduce(
  (s,p) => s += encodeURIComponent(p) + "=" + encodeURIComponent(o[p]) + "&","")
  .slice(0, -1);

/* classof(<variable: any>): string */
/* classof(<variable: any>[,type: string[,throw=false]]): boolean or throw */
function classof (v, t, th = false) {
  var ot = Object.prototype.toString.call(v).slice(8, -1).toLowerCase();
  if (arguments.length < 2) { return ot; }
  if (!th) { return ot === t.toLowerCase(); }
  if (ot !== t.toLowerCase()) {
    throw TypeError("Celestra classof(); type error: " + ot + " - "  + t);
  }
  return true;
}

/* extend([deep: boolean,]<target: object>,<source1: object>[,sourceN]):object*/
function extend (...a) {
  function EXT (...as) {
    if (typeof as[0] === "boolean") {
      var t = as[1], d = as[0], s = 2;
    } else {
      var t = as[0], d = false, s = 1;
    }
    for (var i = s, l = as.length, so; i < l; i++) {
      so = as[i];
      if (so != null) {
        for (var p in so) {
          if (Object.hasOwn(so, p)) {
            if (typeof so[p] === "object" && d) {
              t[p] = EXT(true, {}, so[p]);
            } else {
              t[p] = so[p];
            }
          }
        }
      }
    }
    return t;
  }
  return EXT(...a);
}

/* strPropercase(<string>): string */
const strPropercase = (s) => String(s).split(" ").map(function (v) {
  var a = Array.from(v).map( (c) => c.toLowerCase() );
  if (a.length > 0) { a[0] = a[0].toUpperCase(); }
  return a.join("");
}).join(" ");
/* strTitlecase(<string>): string */
const strTitlecase = (s) => String(s).split(" ").map(function (v) {
  var a = Array.from(v).map( (c) => c.toLowerCase() );
  if (a.length > 0) { a[0] = a[0].toUpperCase(); }
  return a.join("");
}).join(" ");

/* strCapitalize(<string>): string */
function strCapitalize (s) {
  var a = [...String(s).toLowerCase()];
  if (a.length > 0) { a[0] = a[0].toUpperCase(); }
  return a.join("");
}

/* strUpFirst(<string>): string */
function strUpFirst (s) {
  var a = [...String(s)];
  if (a.length > 0) { a[0] = a[0].toUpperCase(); }
  return a.join("");
}

/* strDownFirst(<string>): string */
function strDownFirst (s) {
  var a = [...String(s)];
  if (a.length > 0) { a[0] = a[0].toLowerCase(); }
  return a.join("");
}

/* strHTMLRemoveTags(<string>): string */
const strHTMLRemoveTags = (s) =>
  String(s).replace(/<[^>]*>/g, " ").replace(/\s{2,}/g, " ").trim();

/* strReverse(<string>): string */
const strReverse = (s) => Array.from(String(s)).reverse().join("");

/* strCodePoints(<string>): array of strings */
const strCodePoints = (s) => Array.from(String(s), (v) => v.codePointAt(0) );

/* strFromCodePoints(<collection>): string */
const strFromCodePoints = ([...a]) => String.fromCodePoint.apply(null, a);

/* strAt(<string>,<index: integer>): string */
const strAt = (s, i) => (Array.from(String(s)).at(i) || "");

/* sizeIn(<object>): integer */
const sizeIn = (o) => Object.keys(o).length;

/* forIn(<object>,<callback: function>): object */
const forIn = (o,fn) => { Object.keys(o).forEach((v)=>fn(o[v],v,o)); return o; }

/* filterIn(<object>,<callback: function>): object */
const filterIn = (o, fn) => Object.keys(o)
  .reduce( (r, p) => { if (fn(o[p], p, o)) { r[p] = o[p]; } return r; }, {} );

/* popIn(<object>,<property: string>): any OR undefined*/
function popIn (o,p){if(Object.hasOwn(o,p)){var v=o[p]; delete o[p]; return v;}}

/* unBind(<function>): function */
const unBind = (fn) => Function.prototype.call.bind(fn);

/* bind(<function>,<context: any>): function */
const bind = Function.prototype.call.bind(Function.prototype.bind);

/* constant(<value: any>): any */
const constant = (v) => () => v;

/* identity(<value: any>): any */
const identity = (v) => v;

/* noop(): undefined */
const noop = () => {};

/* T(): true */
const T = () => true;

/* F(): false */
const F = () => false;

/* assertEq(<message: string>,<value1: any>,<value2: any>[,strict=true]):
  true OR throw error */
function assertEq (msg, v1, v2, strict = true) {
  if (strict ? v1 !== v2 : v1 != v2) {
    throw new Error("[assertEq] - " + msg + " - " +  v1 + " - " + v2);
  }
  return true;
}

/* assertNotEq(<message: string>,<value1: any>,<value2: any>[,strict=true]):
  true OR throw error */
function assertNotEq (msg, v1, v2, strict = true) {
  if (strict ? v1 === v2 : v1 == v2) {
    throw new Error("[assertNotEq] - " + msg + " - " +  v1 + " - " + v2);
  }
  return true;
}

/* assertTrue(<message: string>,<value: any>): true (boolean) OR throw error */
function assertTrue (msg, v) {
  if (!v) { throw new Error("[assertTrue] " + msg); }
  return true;
}

/* assertFalse(<message: string>,<value: any>): true (boolean) OR throw error */
function assertFalse (msg, v) {
  if (!!v) { throw new Error("[assertFalse] " + msg); }
  return true;
}

/* strHTMLEscape(<string>): string */
const strHTMLEscape = (s) => String(s).replace(/&/g, "&amp;")
  .replace(/</g, "&lt;").replace(/>/g, "&gt;")
  .replace(/"/g, "&quot;").replace(/'/g, "&apos;");

/* strHTMLUnEscape(<string>): string */
const strHTMLUnEscape = (s) => String(s)
  .replace(/&amp;/g, "&").replace(/&#38;/g, "&")
  .replace(/&lt;/g, "<").replace(/&#60;/g, "<")
  .replace(/&gt;/g, ">").replace(/&#62;/g, ">")
  .replace(/&quot;/g, '"').replace(/&#34;/g, '"')
  .replace(/&apos;/g, "'").replace(/&#39;/g, "'");

/** DOM **/

/* qsa(<selector: string>[,context: element object]): array */
const qsa = (s, c = document) => Array.from(c.querySelectorAll(s));

/* qs(<selector: string>[,context: element object]): element object OR null */
const qs = (s, c = document) => c.querySelector(s);

/* domReady(<callback: function>): undefined */
function domReady (fn) {
  if (document.readyState !== "loading") {
    fn();
  } else {
    document.addEventListener("DOMContentLoaded", function (event) { fn(); });
  }
}

/* domCreate(<type: string>[,properties: object[,innerHTML: string]]): element*/
/* domCreate(<element descriptive object>): element */
function domCreate (t, ps, iH) {
  if (arguments.length === 1 && typeof t === "object") {
    var obj = t;
    t = obj.elementType;
    ps = {};
    for (var p in obj) {
      if (p !== "elementType") { ps[p] = obj[p]; }
    }
  }
  var el = document.createElement(t);
  if (ps) {
    for (var p in ps) {
      if (p !== "style" || typeof ps[p] === "string") {
        el[p] = ps[p];
      } else {
        Object.assign(el.style, ps[p]);
      }
    }
  }
  if (iH) { el.innerHTML = iH; }
  return el;
}

/* domToElement(<htmlString>): element object */
function domToElement (s) {
  var e = document.createElement("div");
  e.innerHTML = s;
  return e.firstElementChild;
}

/* domGetCSS(<element>[,property: string]): string */
const domGetCSS = (e, p) =>
  (p ? window.getComputedStyle(e, null)[p] : window.getComputedStyle(e, null));

/* domSetCSS(<element>,<property: string>,<value: string>): undefined */
/* domSetCSS(<element>,<properties: object>): undefined */
function domSetCSS (e, n, v) {
  if (typeof n === "string") {
    e.style[n] = v;
  } else if (typeof n === "object") {
    Object.keys(n).forEach((p) => (e.style[p] = n[p]));
  }
}

/* domFadeIn(<element>[,duration = 500[,display = ""]]): undefined */
function domFadeIn (e, dur, d) {
  var s = e.style, step = 25/(dur || 500);
  s.opacity = (s.opacity || 0);
  s.display = (d || "");
  (function fade () {
    (s.opacity=parseFloat(s.opacity)+step)>1 ? s.opacity=1 :setTimeout(fade,25);
  })();
}

/* domFadeOut(<element>[,duration = 500]): undefined */
function domFadeOut (e, dur) {
  var s = e.style, step = 25/(dur || 500);
  s.opacity = (s.opacity || 1);
  (function fade () {
    (s.opacity -= step) < 0 ? s.display = "none" : setTimeout(fade, 25);
  })();
}

/* domFadeToggle(<element>[,duration = 500[,display = ""]]): undefined */
function domFadeToggle (e, dur, d = "") {
  if (window.getComputedStyle(e, null).display === "none") {
    /* domFadeIn(); */
    var s = e.style, step = 25/(dur || 500);
    s.opacity = (s.opacity || 0);
    s.display = (d || "");
    (function fade () {
      (s.opacity=parseFloat(s.opacity)+step)>1 ?s.opacity=1:setTimeout(fade,25);
    })();
  } else {
    /* domFadeOut(); */
    var s = e.style, step = 25/(dur || 500);
    s.opacity = (s.opacity || 1);
    (function fade () {
      (s.opacity -= step) < 0 ? s.display = "none" : setTimeout(fade, 25);
    })();
  }
}

/* domHide(<element>): undefined */
const domHide = (e) => e.style.display = "none";

/* domShow(<element>[,display = ""]): undefined */
const domShow = (e, d = "") => e.style.display = d;

/* domToggle(<element>[,display: string]): undefined */
function domToggle (e, d = "") {
  if (window.getComputedStyle(e, null).display === "none") {
    e.style.display = d;
  } else {
    e.style.display = "none";
  }
}

/* domIsHidden(<element>): boolean */
const domIsHidden = (e) => (window.getComputedStyle(e,null).display === "none");

/* domSiblings(<element>): array */
const domSiblings = (el) =>
  Array.prototype.filter.call(el.parentNode.children, (e) => (e !== el));

/* domSiblingsPrev(<element>): array */
const domSiblingsPrev = (el) => Array.prototype.slice.call(
  el.parentNode.children, 0,
  Array.prototype.indexOf.call(el.parentNode.children, el)
);
/* domSiblingsLeft(<element>): array */
const domSiblingsLeft = (el) => Array.prototype.slice.call(
  el.parentNode.children, 0,
  Array.prototype.indexOf.call(el.parentNode.children, el)
);

/* domSiblingsNext(<element>): array */
const domSiblingsNext = (el) => Array.prototype.slice.call(
  el.parentNode.children,
  Array.prototype.indexOf.call(el.parentNode.children, el) + 1,
  el.parentNode.children.length
);
/* domSiblingsRight(<element>): array */
const domSiblingsRight = (el) => Array.prototype.slice.call(
  el.parentNode.children,
  Array.prototype.indexOf.call(el.parentNode.children, el) + 1,
  el.parentNode.children.length
);

/* importScript(<script1: string>[,scriptN: string]): undefined */
function importScript (...a) {
  for (let item of a) {
    let scr = document.createElement("script");
    scr.type = "text\/javascript";
    scr.src = item;
    scr.onerror = function (e) {
      throw new URIError(
        "Loading failed for the script with source " + e.target.src
      );
    };
    (document.head||document.getElementsByTagName("head")[0]).appendChild(scr);
  }
}

/* importStyle(<style1: string>[,styleN: string]): undefined */
function importStyle (...a) {
  for (let item of a) {
    let stl = document.createElement("link");
    stl.rel = "stylesheet";
    stl.type = "text\/css";
    stl.href = item;
    stl.onerror = function (e) {
      throw new URIError(
        "Loading failed for the style with source " + e.target.href
      );
    };
    (document.head||document.getElementsByTagName("head")[0]).appendChild(stl);
  }
}

/* form2array(<form>): array */
function form2array (f) {
  var fld, a = [];
  if (typeof f === "object" && f.nodeName.toLowerCase() === "form") {
    for (var i=0, len=f.elements.length; i<len; i++) {
      fld = f.elements[i];
      if (fld.name && !fld.disabled
        && fld.type !== "file"
        && fld.type !== "reset"
        && fld.type !== "submit"
        && fld.type !== "button") {
        if (fld.type === "select-multiple") {
          for (var j=0, l=f.elements[i].options.length; j<l; j++) {
            if(fld.options[j].selected) {
              a.push({
                "name": encodeURIComponent(fld.name),
                "value": encodeURIComponent(fld.options[j].value)
              });
            }
          }
        } else if ((fld.type!=="checkbox" && fld.type!=="radio")||fld.checked) {
          a.push({
            "name": encodeURIComponent(fld.name),
            "value": encodeURIComponent(fld.value)
          });
        }
      }
    }
  }
  return a;
}

/* form2string(<form>): string */
function form2string (f) {
  var fld, a = [];
  if (typeof f === "object" && f.nodeName.toLowerCase() === "form") {
    for (var i=0, len=f.elements.length; i<len; i++) {
      fld = f.elements[i];
      if (fld.name && !fld.disabled
        && fld.type !== "file"
        && fld.type !== "reset"
        && fld.type !== "submit"
        && fld.type !== "button") {
        if (fld.type === "select-multiple") {
          for (var j=0, l=f.elements[i].options.length; j<l; j++) {
            if(fld.options[j].selected) {
              a.push(encodeURIComponent(fld.name)
                + "=" + encodeURIComponent(fld.options[j].value));
            }
          }
        } else if ((fld.type!=="checkbox" && fld.type!=="radio")||fld.checked) {
          a.push(encodeURIComponent(fld.name)
            + "=" + encodeURIComponent(fld.value));
        }
      }
    }
  }
  return a.join("&").replace(/%20/g, "+");
}

/* getDoNotTrack(): boolean */
const getDoNotTrack = () => (
  navigator.doNotTrack === true
    || navigator.doNotTrack === 1
    || navigator.doNotTrack === "1"
    || window.doNotTrack === true
    || window.doNotTrack === 1
    || window.doNotTrack === "1"
    || navigator.msDoNotTrack === true
    || navigator.msDoNotTrack === 1
    || navigator.msDoNotTrack === "1"
);

/* getLocation(<success: function>[,error: function]): undefined */
function getLocation (s, e) {
  if (!e) { var e = function () {}; }
  function getE (error) { e("ERROR(" + error.code + "): " + error.message); }
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(s, getE);
  } else {
    getE("Geolocation is not supported in this browser.");
  }
}

/* createFile(<filename:string>,<content:string>[,dataType:string]):undefined */
function createFile (fln, c, dt) {
  var l = arguments.length;
  if (l > 1) {
    if (l === 2) { dt = "text/plain"; }
    var b = new Blob([c], {type: dt});
    if (window.navigator.msSaveOrOpenBlob) {
      window.navigator.msSaveBlob(b, fln);
    } else {
      var e = window.document.createElement("a");
      e.href = window.URL.createObjectURL(b);
      e.download = fln;
      document.body.appendChild(e);
      e.click();
      document.body.removeChild(e);
      window.URL.revokeObjectURL(e.href);
    }
  } else {
    throw "Celestra createFile error: too few parameters.";
  }
}

/* getFullscreen(): element object OR undefined */
function getFullscreen () {
  return (document.fullscreenElement
    || document.mozFullScreenElement
    || document.webkitFullscreenElement
    || document.msFullscreenElement
    || undefined
  );
}

/* setFullscreenOn(<element>): undefined */
/* setFullscreenOn(<selector string>): undefined */
function setFullscreenOn (s) {
  if (typeof s === "string") { var e = document.querySelector(s); }
  else if (typeof s === "object") { var e = s; }
  if (e.requestFullscreen) { e.requestFullscreen(); }
  else if (e.mozRequestFullScreen) { e.mozRequestFullScreen(); }
  else if (e.webkitRequestFullscreen) { e.webkitRequestFullscreen(); }
  else if (e.msRequestFullscreen) { e.msRequestFullscreen(); }
}

/* setFullscreenOff(): undefined */
function setFullscreenOff () {
  if (document.exitFullscreen) { document.exitFullscreen(); }
  else if (document.mozCancelFullScreen) { document.mozCancelFullScreen(); }
  else if (document.webkitExitFullscreen) { document.webkitExitFullscreen(); }
  else if (document.msExitFullscreen) { document.msExitFullscreen(); }
}

/*  domGetCSSVar(<name: string>): string */
const domGetCSSVar = (n) => getComputedStyle(document.documentElement)
  .getPropertyValue( n[0] === "-" ? n : "--" + n );

/* domSetCSSVar(<name: string>,<value: string>): undefined */
const domSetCSSVar = (n, v) =>
  document.documentElement.style.setProperty( (n[0] === "-" ? n : "--" + n), v);

/** AJAX **/
/* getJson(); and getText(); shorthands -> ajax(); */

/* getText(<url: string>,<success: function>): undefined */
function getText (u, s) { celestra.ajax({url: u, success: s}); }

/* getJson(<url: string>,<success: function>): undefined */
function getJson (u, s) { celestra.ajax({url: u, format: "json", success: s}); }

/* ajax(<Options object>): undefined */
function ajax (o) {
  if (typeof o.url !== "string") {
    throw new TypeError("Celestra ajax error: The url parameter have to be a string.");
  }
  if (typeof o.success !== "function") {
    throw new TypeError("Celestra ajax error: The success parameter have to be a function.");
  }
  if (!(["function", "undefined"].includes(typeof o.error))) {
    throw new TypeError("Celestra ajax error: The error parameter have to be a function or undefined.");
  }
  if (!o.queryType) {
    o.queryType = "ajax";
  } else {
    o.queryType = o.queryType.toLowerCase();
  }
  if (!o.type) {
    o.type = "get";
  } else {
    o.type = o.type.toLowerCase();
  }
  if (o.type === "get") {
    var typeStr = "GET";
  } else if (o.type === "post") {
    var typeStr = "POST";
  } else {
    throw "Celestra ajax error: The type parameter have to be \"get\" or \"post\".";
  }
  if (!o.format) {
    o.format = "text";
  } else {
    o.format = o.format.toLowerCase();
    if (!(["text", "json", "xml"].includes(o.format))) {
      throw "Celestra ajax error: The format parameter have to be \"text\" or \"json\" or \"xml\".";
    }
  }
  var xhr;
  if (o.queryType === "ajax") {
    xhr = new XMLHttpRequest();
  } else if (o.queryType === "cors") {
    xhr = new XMLHttpRequest();
    if (!("withCredentials" in xhr)) { xhr = new XDomainRequest(); }
  } else {
    throw "Celestra ajax error: The querytype parameter have to be \"ajax\" or \"cors\".";
  }
  if (typeof user === "string" && typeof password === "string") {
    xhr.open(typeStr, o.url, true, o.user, o.password);
  } else {
    xhr.open(typeStr, o.url, true);
  }
  if (o.queryType === "ajax") {
    xhr.onreadystatechange = function () {
      if (this.readyState === 4 && this.status === 200) {
        switch (o.format.toLowerCase()) {
          case "text": o.success(this.responseText); break;
          case "json": o.success(JSON.parse(this.responseText)); break;
          case "xml": o.success(this.responseXML); break;
          default: o.success(this.responseText);
        }
      }
    };
    xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
    if (o.typeStr === "POST") {
      xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    }
  } else if (o.queryType === "cors") {
    xhr.onload = function (request) {
      switch (o.format.toLowerCase()) {
        case "text": o.success(request.target.responseText
          || request.currentTarget.response); break;
        case "json": o.success(JSON.parse(request.target.responseText
          || request.currentTarget.response)); break;
        case "xml": o.success(request.target.responseXML
          || request.currentTarget.responseXML); break;
        default: o.success(request.target.responseText
          || request.currentTarget.response);
      }
    };
  }
  if (typeof o.error === "function") { xhr.onerror = o.error; }
  if (typeStr === "GET") {
    xhr.send();
  } else if (typeStr === "POST") {
    xhr.send(encodeURI(o.data));
  }
}

/** type checking **/

/* isTruthy(<value: any>): boolean */
const isTruthy = (v) => !!v;

/* isFalsy(<value: any>): boolean */
const isFalsy = (v) => !v;

/* isAsyncGeneratorFn(<value: any>): boolean */
const isAsyncGeneratorFn = (v) => (Object.getPrototypeOf(v).constructor ===
  Object.getPrototypeOf(async function*() {}).constructor);

/* isConstructorFn(<value: any>): boolean */
const isConstructorFn = (v) =>
  (typeof v === "function" && typeof v.prototype === "object");

/* isPlainObject(<value: any>): boolean */
const isPlainObject = (v) => (v != null && typeof v === "object" &&
  (Object.getPrototypeOf(v) === Object.prototype
    || Object.getPrototypeOf(v) === null));

/* isEmptyMap(<value: any>): boolean */
const isEmptyMap = (v) =>
  (Object.prototype.toString.call(v).slice(8, -1).toLowerCase() === "map"
    && v.size === 0);

/* isEmptySet(<value: any>): boolean */
const isEmptySet = (v) =>
  (Object.prototype.toString.call(v).slice(8, -1).toLowerCase() === "set"
    && v.size === 0);

/* isEmptyIterator(<value: any>): boolean */
function isEmptyIterator (it) {for(let item of it) {return false;} return true;}

/* isDataView(<value: any>): boolean */
const isDataView = (v) =>
  (Object.prototype.toString.call(v).slice(8, -1).toLowerCase() === "dataview");

/* isError(<value: any>): boolean */
const isError = (v) =>
  (Object.prototype.toString.call(v).slice(8, -1).toLowerCase() === "error");

/* isPromise(<value: any>): boolean */
const isPromise = (v) =>
  (v != null && typeof v === "object" && typeof v.then === "function");

/* isSameObject(<object1>,<object2>): boolean */
function isSameObject (o1, o2) {
  if (o1.constructor !== o2.constructor) { return false; }
  var a1 = Object.keys(o1).sort(), a2 = Object.keys(o2).sort();
  if (a1.length === a2.length) {
    for (var i = 0, l = a1.length; i < l; i++) {
      if (a1[i] !== a2[i] || o1[a1[i]] !== o2[a1[i]]) { return false; }
    }
    return true;
  }
  return false;
}

/* isSameArray(<array1>,<array2>): boolean */
const isSameArray = (a, b) => ( Array.isArray(a) && Array.isArray(b)
  && (a.length === b.length) && a.every((v,i) => v === b[i]) );

/* isSameMap(<map1>,<map2>): boolean */
function isSameMap (m1, m2) {
  if (Object.prototype.toString.call(m1).slice(8, -1).toLowerCase() === "map"
    && Object.prototype.toString.call(m2).slice(8, -1).toLowerCase() === "map"
    && m1.size === m2.size) {
    for (const item of m1.keys()) {
      if (m1.get(item) !== m2.get(item)) { return false; }
    }
    return true;
  }
  return false;
}

/* isSameSet(<set1>,<set2>): boolean */
function isSameSet (s1, s2) {
  if (Object.prototype.toString.call(s1).slice(8, -1).toLowerCase() === "set"
    && Object.prototype.toString.call(s2).slice(8, -1).toLowerCase() === "set"
    && s1.size === s2.size) {
    for (const item of s1) {
      if (!s2.has(item)) { return false; }
    }
    return true;
  }
  return false;
}

/* isSameIterator(<iterator1>,<iterator2>): boolean */
const isSameIterator = ([...a1], [...a2]) =>
  (a1.sort().length === a2.sort().length && a1.every((v,i) => v === a2[i]));

/* isString(<value: any>): boolean */
const isString = (v) => (typeof v === "string");

/* isChar(<value: any>): boolean */
const isChar = (v) =>
  (typeof v === "string" && (v.length === 1 || Array.from(v).length === 1));

/* isNumber(<value: any>): boolean */
const isNumber = (v) => (typeof v === "number");

/* isFloat(<value: any>): boolean */
const isFloat = (v) => (typeof v === "number" && !!(v % 1));

/* isNumeric(<value: any>): boolean */
const isNumeric = (v) => ( (typeof v === "number" && v === v)
  ? true : (!isNaN(parseFloat(v)) && isFinite(v)) );

/* isBoolean(<value: any>): boolean */
const isBoolean = (v) => (typeof v === "boolean");

/* isObject(<value: any>): boolean */
const isObject = (v) => (v != null && typeof v === "object");

/* isEmptyObject(<value: any>): boolean */
const isEmptyObject = (v) =>
  (v != null && typeof v === "object" && Object.keys(v).length === 0);

/* isFunction(<value: any>): boolean */
const isFunction = (v) => (typeof v === "function");
/* isCallable(<value: any>): boolean */
const isCallable = (v) => (typeof v === "function");

/* isEmptyArray(<value: any>): boolean */
const isEmptyArray = (v) => (Array.isArray(v) && v.length === 0);

/* isArraylike(<value: any>): boolean */
const isArraylike = (v) =>
  ((typeof v === "object" || typeof v === "string") && v != null
    && typeof v.length === "number" && v.length >= 0 && v.length % 1 === 0);

/* isNull(<value: any>): boolean */
const isNull = (v) => (v === null);

/* isUndefined(<value: any>): boolean */
const isUndefined = (v) => (v === undefined);

/* isNullOrUndefined(<value: any>): boolean */
const isNullOrUndefined = (v) => (v == null);

/* isNil(<value: any>): boolean */
const isNil = (v) => (v == null || v !== v);

/* isPrimitive(<value: any>): boolean */
const isPrimitive = (v) =>
  ((typeof v !== "object" && typeof v !== "function") || v === null);

/* isSymbol(<value: any>): boolean */
const isSymbol = (v) => (typeof v === "symbol");

/* isMap(<value: any>): boolean */
const isMap = (v) =>
  (Object.prototype.toString.call(v).slice(8, -1).toLowerCase() === "map");

/* isSet(<value: any>): boolean */
const isSet = (v) =>
  (Object.prototype.toString.call(v).slice(8, -1).toLowerCase() === "set");

/* isWeakMap(<value: any>): boolean */
const isWeakMap = (v) =>
  (Object.prototype.toString.call(v).slice(8, -1).toLowerCase() === "weakmap");

/* isWeakSet(<value: any>): boolean */
const isWeakSet = (v) =>
  (Object.prototype.toString.call(v).slice(8, -1).toLowerCase() === "weakset");

/* isIterator(<value: any>): boolean */
const isIterator = (v) =>
  (v != null && typeof v === "object" && typeof v.next === "function");

/* isDate(<value: any>): boolean */
const isDate = (v) =>
  (Object.prototype.toString.call(v).slice(8, -1).toLowerCase() === "date");

/* isRegexp(<value: any>): boolean */
const isRegexp = (v) =>
  (Object.prototype.toString.call(v).slice(8, -1).toLowerCase() === "regexp");

/* isElement(<value: any>): boolean */
const isElement = (v) => (v!=null && typeof v === "object" && v.nodeType === 1);

/* isIterable(<value: any>): boolean */
const isIterable = (v) => (v!=null && typeof v[Symbol.iterator] === "function");

/* isBigInt(<value: any>): boolean */
const isBigInt = (v) => (typeof v === "bigint");

/* isArrayBuffer(<value: any>): boolean */
const isArrayBuffer = (v) =>
  (Object.prototype.toString.call(v).slice(8,-1).toLowerCase()==="arraybuffer");

/* isTypedArray(<value: any>): boolean */
const isTypedArray = (v) =>
  ["int8array", "uint8array", "uint8clampedarray", "int16array", "uint16array",
    "int32array", "uint32array", "float32array", "float64array",
    "bigint64array", "biguint64array"].includes(
      Object.prototype.toString.call(v).slice(8, -1).toLowerCase()
    );

/* isGeneratorFn(<value: any>): boolean */
const isGeneratorFn = (v) => (Object.getPrototypeOf(v).constructor ===
  Object.getPrototypeOf(function*(){}).constructor);

/* isAsyncFn(<value: any>): boolean */
const isAsyncFn = (v) => (Object.getPrototypeOf(v).constructor ===
  Object.getPrototypeOf(async function(){}).constructor);

/** cookie **/

/* setCookie(<Options object>): undefined */
/* setCookie(<name: string>,<value: string> [,hours=8760[,path="/"[,domain
  [,secure[,SameSite="Lax"[,HttpOnly]]]]]]): undefined */
function setCookie (name, value, hours = 8760, path = "/", domain, secure,
  SameSite = "Lax", HttpOnly) {
  if (typeof name === "object") {
    var settings = name;
    name = settings.name;
    value = settings.value;
    hours = settings.hours || 8760;
    path = settings.path || "/";
    domain = settings.domain;
    secure = settings.secure;
    SameSite = settings.SameSite || "Lax";
    HttpOnly = settings.HttpOnly;
  }
  var expire = new Date();
  expire.setTime(expire.getTime() + (Math.round(hours * 60 * 60 * 1000)));
  document.cookie = encodeURIComponent(name)
    + "=" + encodeURIComponent(value)
    + "; expires=" + expire.toUTCString()
    + "; path=" + path
    + (domain ? "; domain=" + domain : "")
    + (secure ? "; secure" : "")
    + (typeof SameSite==="string"&&SameSite.length>0 ?"; SameSite="+SameSite:"")
    + (HttpOnly ? "; HttpOnly" : "")
    + ";";
}

/* getCookie(): object */
/* getCookie([name: string]): string */
function getCookie (name) {
  if (document.cookie.length !== 0) {
    var r = {}, a = document.cookie.split(";");
    for(var i = 0, l = a.length; i < l; i++) {
      var e = a[i].trim().split("=");
      r[decodeURIComponent(e[0])] = decodeURIComponent(e[1]);
    }
    return (name ? (r[name] ? r[name] : null) : r);
  }
  return (name ? null : {});
}

/* hasCookie(<name: string>): boolean */
const hasCookie = (n) => (document.cookie.includes(encodeURIComponent(n)+"="));

/* removeCookie(<Options object>);: boolean */
/* removeCookie(<name: string>
  [,path="/"[,domain[,secure[,SameSite="Lax"[,HttpOnly]]]]]): boolean */
function removeCookie (name, path="/", domain, secure, SameSite="Lax",HttpOnly){
  if (typeof name === "object") {
    var settings = name;
    name = settings.name;
    path = settings.path || "/";
    domain = settings.domain;
    secure = settings.secure;
    SameSite = settings.SameSite || "Lax";
    HttpOnly = settings.HttpOnly;
  }
  var r = (document.cookie.includes(encodeURIComponent(name)+"="));
  document.cookie = encodeURIComponent(name)
    + "=; expires=Thu, 01 Jan 1970 00:00:01 GMT"
    + "; path=" + path
    + (domain ? "; domain=" + domain : "")
    + (secure ? "; secure" : "")
    + (typeof SameSite==="string"&&SameSite.length>0 ?"; SameSite="+SameSite:"")
    + (HttpOnly ? "; HttpOnly" : "")
    + ";";
  return r;
}

/* clearCookies(<Options object>): undefined */
/* clearCookies(
  [path="/"[,domain[,secure[,SameSite="Lax"[,HttpOnly]]]]]): undefined */
function clearCookies (path = "/", domain, secure, SameSite = "Lax", HttpOnly) {
  if (typeof path === "object") {
    var settings = path;
    path = settings.path || "/";
    domain = settings.domain;
    secure = settings.secure;
    SameSite = settings.SameSite || "Lax";
    HttpOnly = settings.HttpOnly;
  }
  if (document.cookie.length !== 0) {
    var a = document.cookie.split(";");
    for(var i = 0, l = a.length; i < l; i++) {
      document.cookie = encodeURIComponent(a[i].trim().split("=")[0])
        + "=; expires=Thu, 01 Jan 1970 00:00:01 GMT"
        + "; path=" + path
        + (domain ? "; domain=" + domain : "")
        + (secure ? "; secure" : "")
        + (typeof SameSite==="string"&&SameSite.length>0 ?"; SameSite="+SameSite:"")
        + (HttpOnly ? "; HttpOnly" : "")
        + ";";
    }
  }
}

/** collections **/

/* arrayDeepClone(<array>): array */
function arrayDeepClone ([...a]) {
  const ADC = (v) => (Array.isArray(v) ? Array.from(v, ADC) : v);
  return ADC(a);
}

/* arrayCreate(<length: any>): array OR throw error */
const arrayCreate = (length = 0) => Array( (1/+length === 1/-0) ? 0 : +length );

/* initial(<collection>): array */
const initial = ([...a]) => a.slice(0, -1);

/* shuffle(<collection>): array */
function shuffle([...a]) {
  for (let i = a.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/* partition(<collection>,<callback: function>): array */
const partition = ([...a],fn) => [a.filter(fn),a.filter((e,i,a)=>!(fn(e,i,a)))];

/* group(<collection>,<callback: function>[,map=false]): object */
const group =([...a], fn, map=false) => a[(map?"groupToMap":"group")](fn);

/* arrayUnion(<collection1>[,collectionN]): array */
const arrayUnion = (...a) => [...new Set(a.map(([...e]) => e).flat())];

/* arrayIntersection(<collection1>,<collection2>): array */
const arrayIntersection = ([...a], [...b]) =>
  a.filter((v) => b.includes(v)).filter((e, i, arr) => arr.indexOf(e) === i);

/* arrayDifference(<collection1>,<collection2>): array */
const arrayDifference = ([...a], [...b]) =>
  a.filter((v) => !(b.includes(v))).filter((e, i, arr) => arr.indexOf(e) === i);

/* arraySymmetricDifference(<collection1>,<collection2>): array */
const arraySymmetricDifference = ([...a], [...b]) =>
  a.filter((v) => !(b.includes(v)))
    .concat(b.filter((v) => !(a.includes(v))))
    .filter((e, i, arr) => arr.indexOf(e) === i);

/* setUnion(<collection1>[,collectionN]): set */
const setUnion = (...a) => new Set(a.map(([...e]) => e).flat());

/* setIntersection(<set1>,<set2>): set */
const setIntersection = ([...a], b) => new Set(a.filter((v) => b.has(v)));

/* setDifference(<set1>,<set2>): set */
const setDifference = ([...a], b) => new Set(a.filter((v) => !(b.has(v))));

/* setSymmetricDifference(<set1>,<set2>): set */
const setSymmetricDifference = (a, b) => new Set(
  [...a].filter((v) => !(b.has(v))).concat([...b].filter((v) => !(a.has(v))))
);

/* isSuperset(<superCollection>,<subCollection>): boolean */
const isSuperset = ([...sup], [...sub]) => sub.every( (v) => sup.includes(v) );

/* min(<value1: any>[,valueN]): any */
const min = (...a) => a.reduce((acc, v) => (v < acc ? v : acc), a[0]);

/* max(<value1: any>[,valueN]): any */
const max = (...a) => a.reduce((acc, v) => (v > acc ? v : acc), a[0]);

/* arrayRepeat(<value: any>[,n=100]): array */
const arrayRepeat = (v, n = 100) => Array(n).fill(v);

/* arrayCycle(<collection>[,n=100]): array */
const arrayCycle = ([...a], n = 100) => Array(n).fill(a).flat();

/* arrayRange([start=0[,end=99[,step=1]]]): array */
const arrayRange = (s = 0, e = 99, st = 1) =>
  Array.from({length: (e - s) / st + 1}, (v, i) => s + (i * st));

/* zip(<collection1>[,collectionN]): array */
function zip (...a) {
  a = a.map((v) => Array.from(v));
  let r = [], i, j, l = a.length, min = a[0].length, item;
  for (item of a) {
    if (item.length < min) { min = item.length; }
  }
  for (i = 0; i < min; i++) {
    item = [];
    for (j = 0; j < l; j++) { item.push(a[j][i]); }
    r.push(item);
  }
  return r;
}

/* unzip(<collection>): array */
function unzip ([...a]) {
  a = a.map(([...v]) => v);
  let r = [], i, j, l1 = a[0].length, l2 = a.length;
  for (i = 0; i < l1; i++) { r.push([]); }
  for (i = 0; i < l1; i++) {
    for (j = 0; j < l2; j++) { r[i].push(a[j][i]); }
  }
  return r;
}

/* zipObj(<collection1>,<collection2>): object */
function zipObj ([...a1], [...a2]) {
  var r = [], i, l = (a1.length < a2.length ? a1.length : a2.length);
  for (i = 0; i < l; i++) { r.push([a1[i], a2[i]]); }
  return Object.fromEntries(r);
}

/* arrayUnique(<collection>[,callback: function]): array */
const arrayUnique = (a) => [...new Set(a)];

/* arrayAdd(<array>,<value: any>): boolean */
const arrayAdd = (a, v) => (a.indexOf(v) === -1) ? !!a.push(v) : false;

/* arrayClear(<array>): array */
function arrayClear (a) { a.length = 0; return a; }

/* arrayRemove(<array>,<value: any>[,all=false]): boolean */
function arrayRemove (a, v, all = false) {
  var found = a.indexOf(v) > -1;
  if (!all) {
    var pos = a.indexOf(v);
    if (pos > -1) { a.splice(pos, 1); }
  } else {
    var pos = -1;
    while ((pos = a.indexOf(v)) > -1) { a.splice(pos, 1); }
  }
  return found;
}

/* arrayRemoveBy(<array>,<callback: function>[,all=false]): boolean */
function arrayRemoveBy (a, fn, all = false) {
  var found = a.findIndex(fn) > -1;
  if (!all) {
    var pos = a.findIndex(fn);
    if (pos > -1) { a.splice(pos, 1); }
  } else {
    var pos = -1;
    while ((pos = a.findIndex(fn)) > -1) { a.splice(pos, 1); }
  }
  return found;
}

/*arrayMerge([flat=false,]<target: array>,<source1: any>[,sourceN: any]):array*/
function arrayMerge (t, ...a) { t.push(... [].concat(...a) ); return t; }

/* iterRange([start=0[,step=1[,end=Infinity]]]): iterator */
function* iterRange (s = 0, st = 1, e = Infinity) {
  let i = s;
  while (i <= e) { yield i; i += st; }
}

/* iterCycle(<iter>[,n=Infinity]): iterator */
function* iterCycle ([...a], n=Infinity){ let i=0; while(i<n) {yield* a; i++;} }

/* iterRepeat(<value: any>[,n=Infinity]): iterator */
function* iterRepeat (v, n=Infinity) { let i=0; while (i<n) { yield v; i++; } }

/* takeWhile(<collection>,<callback: function>): iterator */
function* takeWhile (it, fn) {
  for (let item of it) {
    if (!fn(item)) { break; }
    yield item;
  }
}

/* dropWhile(<collection>,<callback: function>): iterator */
function* dropWhile (it, fn) {
  let d = true;
  for (let item of it) {
    if (d && !fn(item)) { d = false; }
    if (!d) { yield item; }
  }
}

/* take(<collection>[,n=1]): iterator */
function* take (it, n = 1) {
  let i = n;
  for (let item of it) {
    if (i <= 0) { break; }
    yield item;
    i--;
  }
}

/* drop(<collection>[,n=1]): iterator */
function* drop (it, n = 1) {
  let i = n;
  for (let item of it) {
    if (i < 1) { yield item; } else { i--; }
  }
}

/* forEach(<collection>,<callback: function>): undefined */
function forEach (it, fn) { let i = 0; for (let item of it) { fn(item, i++); } }

/* forEachRight(<collection>,<callback: function>): undefined */
function forEachRight ([...a],fn){ let i=a.length; while (i--) { fn(a[i],i); } }

/* map(<collection>,<callback: function>): iterator */
function* map (it, fn) { let i=0; for (let item of it) { yield fn(item,i++); } }

/* filter(<collection>,<callback: function>): iterator */
function* filter (it, fn) {
  let i = 0;
  for (let item of it) {
    if (fn(item, i++)) { yield item; }
  }
}

/* reject(<collection>,<callback: function>): iterator */
function* reject (it, fn) {
  let i = 0;
  for (let item of it) {
    if (!fn(item, i++)) { yield item; }
  }
}

/* slice(<collection>[,begin=0[,end=Infinity]]): iterator */
function* slice (it, begin = 0, end = Infinity) {
  let i = 0;
  for (let item of it) {
    if (i >= begin && i <= end) { yield item; } else if (i > end) { return; }
    i++;
  }
}

/* tail(<collection>): iterator */
function* tail (it) {
  let first = true;
  for (let item of it) {
    if (!first) { yield item; } else { first = false; }
  }
}

/* item(<collection>,<index: integer>): any */
function item (it,p) {let i=0; for(let item of it) {if(i++===p) {return item;}}}
/* nth(<collection>,<index: integer>): any */
function nth (it,p) { let i=0; for(let item of it) {if(i++===p) {return item;}}}

/* size(<collection>): integer */
function size (it) { let i = 0; for (let item of it) { i++; } return i; }

/* first(<collection>): any */
function first (it) { for (let item of it) { return item; } }
/* head(<collection>): any */
function head (it) { for (let item of it) { return item; } }

/* last(<collection>): any */
function last (it) { let item; for (item of it) { } return item; }

/* reverse(<collection>): array */
const reverse = ([...a]) => a.reverse();

/* sort(<collection>[,numbers=false]): array */
const sort = ([...a], ns) => a.sort(ns
  ? (a,b) => { if (a<b){return -1;} if(a>b){return 1;} return 0; } : undefined);

/* includes(<collection>,<value: any>): boolean */
function includes (it, v) {
  for (let item of it) {
    if (item === v) { return true; }
  }
  return false;
}
/* contains(<collection>,<value: any>): boolean */
function contains (it, v) {
  for (let item of it) {
    if (item === v) { return true; }
  }
  return false;
}

/* find(<collection>,<callback: function>): any */
function find (it, fn) {
  let i = 0;
  for (let item of it) {
    if (fn(item, i++)) { return item; }
  }
}

/* findLast(<collection>,<callback: function>): any */
function findLast (it, fn) {
  let i = 0, r;
  for (let item of it) {
    if (fn(item, i++)) { r = item; }
  }
  return r;
}

/* every(<collection>,<callback: function>): boolean */
function every (it, fn) {
  let i = 0;
  for (let item of it) {
    if (!fn(item, i++)) { return false; }
  }
  if (i === 0) { return false; }
  return true;
}

/* some(<collection>,<callback: function>): boolean */
function some (it, fn) {
  let i = 0;
  for (let item of it) {
    if (fn(item, i++)) { return true; }
  }
  return false;
}

/* none(<collection>,<callback: function>): boolean */
function none (it, fn) {
  let i = 0;
  for (let item of it) {
    if (fn(item, i++)) { return false; }
  }
  if (i === 0) { return false; }
  return true;
}

/* takeRight(<collection>[,n=1]): array */
const takeRight = ([...a], n = 1) => a.reverse().slice(0, n);

/* takeRightWhile(<collection>,<callback: function>): iterator */
function* takeRightWhile ([...a], fn) {
  let i = 0;
  for (let item of a.reverse()) {
    if (fn(item, i++)) { yield item; } else { break; }
  }
}

/* dropRight(<collection>[,n=1]): array */
const dropRight = ([...a], n = 1) => a.reverse().slice(n);

/* dropRightWhile(<collection>,<callback: function>): iterator */
function* dropRightWhile ([...a], fn) {
  let d = true, i = 0;
  for (let item of a.reverse()) {
    if (d && !fn(item, i++)) { d = false; }
    if (!d) { yield item; }
  }
}

/* concat(<collection1>[,collectionN]): iterator */
function* concat () { for (let item of arguments) { yield* item; } }

/* reduce(<collection>,<callback: function>[,initialvalue: any]): any */
function reduce (it, fn, iv) {
  let acc = iv, i = 0;
  for (let item of it) {
    if (i === 0 && acc === undefined) {
      acc = item;
    } else {
      acc = fn(acc, item, i++);
    }
  }
  return acc;
}

/* enumerate(<collection>[,offset=0]): iterator */
function* enumerate (it, offset = 0) {
  let i = offset;
  for (let item of it) { yield [i++, item]; }
}
/* entries(<collection>[,offset=0]): iterator */
function* entries (it, offset = 0) {
  let i = offset;
  for (let item of it) { yield [i++, item]; }
}

/* flat(<collection>): iterator */
function* flat (it) { for (let item of it) { yield* item; } }

/* join(<collection>[,separator=","]): string */
function join (it, sep = ",") {
  sep = String(sep);
  let r = "";
  for (let item of it) { r += sep + item; }
  return r.slice(sep.length);
}

/* withOut(<collection>,<filterCollection>): array */
const withOut = ([...a], [...fl]) => a.filter( (e) => fl.indexOf(e) === -1 );

/** abstract **/

/* getInV(<value: any>,<property: string>): any OR throw error */
function getInV (V,P) { if(V==null){ throw TypeError(); } return Object(V)[P]; }

/* getIn(<object>,<property: string>): any */
const getIn = (O, P) => O[P];

/* setIn(<object>,<property: string>,<value: any>): object */
const setIn = (O, P, V) => { O[P] = V; return O; }

/* hasIn(<object>,<property: string>): boolean */
const hasIn = (O, P) => (P in O);

/* isPropertyKey(<value: any>): boolean */
const isPropertyKey = (v) => (typeof v === "string" || typeof v === "symbol");

/* toPropertyKey(<value: any>): string OR symbol */
const toPropertyKey = (v) => (typeof v === "symbol" ? v : String(v));

/* toObject(<value: any>): object OR throw error */
function toObject (v) { if (v==null) { throw TypeError(); } return Object(v); }

/* isSameValue(<value1: any>,<value2: any>): boolean */
const isSameValue = (v1, v2) =>
  ((v1 === v2) ? (v1 !== 0 || 1/v1 === 1/v2) : (v1 !== v1 && v2 !== v2));

/* isSameValueZero(<value1: any>,<value2: any>): boolean */
const isSameValueZero = (v1, v2) => (v1 === v2 || (v1 !== v1 && v2 !== v2));

/* isSameValueNonNumber(<value1: any>,<value2: any>): boolean */
const isSameValueNonNumber = (v1, v2) => (v1 === v2);

/* createMethodProperty(<object>,<property>,<value: any>): object */
const createMethodProperty = (O, P, V) => Object.defineProperty(
  O, P, {value: V, writable: true, enumerable: false, configurable: true}
);

/* type(<value>): string */
const type = (v) => ((v === null) ? "null" : (typeof v));

/* isIndex(<value: any>): boolean */
const isIndex = (v) => (Number.isSafeInteger(v) && v >= 0 && 1/v !== 1/-0);

/* toIndex(<value: any>): unsigned integer */
const toIndex = (v) =>
  ((v = Math.min(Math.max(0, Math.trunc(+v)), 2147483647)) === v) ? v : 0;

/* toInteger(<value: any>): integer */
const toInteger = (v) =>
  ((v = Math.min(Math.max(-2147483648, Math.trunc(+v)), 2147483647)) === v)?v:0;

/* createDataProperty(<object>,<property>,<value: any>): object */
const createDataProperty = (O, P, V) => Object.defineProperty(
  O, P, {value: V, writable: true, enumerable: true, configurable: true}
);

/* toArray(<value: array OR iterable OR arraylike>): array */
function toArray (O) { return (Array.isArray(O) ? O : Array.from(O)); }

/** math **/

/* sum(<value1>[,valueN]): number */
const sum = (f, ...a) => a.reduce((acc, v) => acc + v, f);

/* avg(<value1>[,valueN]): number */
const avg = (f, ...a) => a.reduce((acc, v) => acc + v, f) / (a.length + 1);

/* product(<value1>[,valueN]): number */
const product = (f, ...a) => a.reduce((acc, v) => acc * v, f);

/* clamp(<value>,<min>,<max>): number */
const clamp = (v, i, a) => (v > a ? a : v < i ? i : v);

/* isEven(<value>): boolan */
function isEven (v) {
  var r = v % 2;
  if (!Number.isNaN(r)) { return r === 0; }
  return false;
}

/* isOdd(<value>): boolean */
function isOdd (v) {
  var r = v % 2;
  if (!Number.isNaN(r)) { return r !== 0; }
  return false;
}

/* toInt8(<value>): int -127..128 */
const toInt8 = (v) =>
  ((v = Math.min(Math.max(-128, Math.trunc(+v)), 127)) === v) ? v : 0;

/* toUInt8(<value>): int 0..255  */
const toUInt8 = (v) =>
  ((v = Math.min(Math.max(0, Math.trunc(+v)), 255)) === v) ? v : 0;

/* toInt16(<value>): int -32768..32767 */
const toInt16 = (v) =>
  ((v = Math.min(Math.max(-32768, Math.trunc(+v)), 32767)) === v) ? v : 0;

/* toUInt16(<value>) int 0..65535 */
const toUInt16 = (v) =>
  ((v = Math.min(Math.max(0, Math.trunc(+v)), 65535)) === v) ? v : 0;

/* toInt32(<value>): int -2147483648..2147483647 */
const toInt32 = (v) =>
  ((v = Math.min(Math.max(-2147483648, Math.trunc(+v)), 2147483647)) === v)?v:0;

/* toUInt32(<value>: int 0..4294967295 */
const toUInt32 = (v) =>
  ((v = Math.min(Math.max(0, Math.trunc(+v)), 4294967295)) === v) ? v : 0;

/* toBigInt64(<value>): bigint */
const toBigInt64 = (v) => BigInt(typeof v === "bigint"
  ? (v > Math.pow(2,63)-1 ?Math.pow(2,63)-1:v<Math.pow(-2,63)?Math.pow(-2,63):v)
  : ((v=Math.min(Math.max(Math.pow(-2,63),Math.trunc(+v)),Math.pow(2,63)-1))===v
    ) ? v : 0
);

/* toBigUInt64(<value>): unsigned bigint */
const toBigUInt64 = (v) => BigInt(typeof v === "bigint"
  ? (v > Math.pow(2, 64) - 1 ? Math.pow(2, 64) - 1 : v < 0 ? 0 : v)
  : ((v=Math.min(Math.max(0, Math.trunc(+v)), Math.pow(2,64) -1)) === v) ? v : 0
);

/* toFloat32(<value>): float */
const toFloat32 = (v) => ((v = Math.min(Math.max(-3.4e38, +v),3.4e38))===v)?v:0;

/* isInt8(<value>): boolean */
const isInt8 = (v) => (Number.isInteger(v) ? (v >= -128 && v <= 127) : false);

/* isUInt8(<value>): boolean */
const isUInt8 = (v) => (Number.isInteger(v) ? (v >= 0 && v <= 255) : false);

/* isInt16(<value>): boolean */
const isInt16 = (v) => (Number.isInteger(v) ?(v>=-32768 && v <= 32767) : false);

/* isUInt16(<value>): boolean */
const isUInt16 = (v) => (Number.isInteger(v) ? (v >= 0 && v <= 65535) : false);

/* isInt32(<value>): boolean */
const isInt32 = (v) =>
  (Number.isInteger(v) ? (v >= -2147483648 && v <= 2147483647) : false);

/* isUInt32(<value>): boolean */
const isUInt32 = (v) => (Number.isInteger(v) ? (v>=0 && v<=4294967295) : false);

/* isBigInt64(<value>): boolean */
const isBigInt64 = (v) => (typeof v === "bigint"
  ? (v >= Math.pow(-2, 63) && v <= Math.pow(2, 63)-1) : false);

/* isBigUInt64(<value>): boolean */
const isBigUInt64 = (v) =>
  (typeof v === "bigint" ? (v >= 0 && v <= Math.pow(2,64)-1) : false);

/** object header **/

const VERSION = "Celestra v5.5.1 dev";

/* celestra.noConflict(): celestra object */
function noConflict () { window.CEL = celestra.__prevCEL__; return celestra; }

var celestra = {
  /** object header **/
  VERSION: VERSION,
  noConflict: noConflict,
  /** core api **/
  randomID: randomID,
  signbit: signbit,
  delay: delay,
  sleep: sleep,
  randomInt: randomInt,
  randomFloat: randomFloat,
  randomBoolean: randomBoolean,
  randomString: randomString,
  inRange: inRange,
  b64Encode: b64Encode,
  b64Decode: b64Decode,
  javaHash: javaHash,
  inherit: inherit,
  getUrlVars: getUrlVars,
  obj2string: obj2string,
  classof: classof,
  extend: extend,
  strPropercase: strPropercase,
  strTitlecase: strTitlecase,
  strCapitalize: strCapitalize,
  strUpFirst: strUpFirst,
  strDownFirst: strDownFirst,
  strHTMLRemoveTags: strHTMLRemoveTags,
  strReverse: strReverse,
  strCodePoints: strCodePoints,
  strFromCodePoints: strFromCodePoints,
  strAt: strAt,
  sizeIn: sizeIn,
  forIn: forIn,
  filterIn: filterIn,
  popIn: popIn,
  unBind: unBind,
  bind: bind,
  constant: constant,
  identity: identity,
  noop: noop,
  T: T,
  F: F,
  assertEq: assertEq,
  assertNotEq: assertNotEq,
  assertTrue: assertTrue,
  assertFalse: assertFalse,
  strHTMLEscape: strHTMLEscape,
  strHTMLUnEscape: strHTMLUnEscape,
  /** DOM **/
  qsa: qsa,
  qs: qs,
  domReady: domReady,
  domCreate: domCreate,
  domToElement: domToElement,
  domGetCSS: domGetCSS,
  domSetCSS: domSetCSS,
  domFadeIn: domFadeIn,
  domFadeOut: domFadeOut,
  domFadeToggle: domFadeToggle,
  domHide: domHide,
  domShow: domShow,
  domToggle: domToggle,
  domIsHidden: domIsHidden,
  domSiblings: domSiblings,
  domSiblingsPrev: domSiblingsPrev,
  domSiblingsLeft: domSiblingsLeft,
  domSiblingsNext: domSiblingsNext,
  domSiblingsRight: domSiblingsRight,
  importScript: importScript,
  importStyle: importStyle,
  form2array: form2array,
  form2string: form2string,
  getDoNotTrack: getDoNotTrack,
  getLocation: getLocation,
  createFile: createFile,
  getFullscreen: getFullscreen,
  setFullscreenOn: setFullscreenOn,
  setFullscreenOff: setFullscreenOff,
  domGetCSSVar: domGetCSSVar,
  domSetCSSVar: domSetCSSVar,
  /** AJAX **/
  getText: getText,
  getJson: getJson,
  ajax: ajax,
  /** type checking **/
  isTruthy: isTruthy,
  isFalsy: isFalsy,
  isAsyncGeneratorFn: isAsyncGeneratorFn,
  isConstructorFn: isConstructorFn,
  isPlainObject: isPlainObject,
  isEmptyMap: isEmptyMap,
  isEmptySet: isEmptySet,
  isEmptyIterator: isEmptyIterator,
  isDataView: isDataView,
  isError: isError,
  isPromise: isPromise,
  isSameObject: isSameObject,
  isSameArray: isSameArray,
  isSameMap: isSameMap,
  isSameSet: isSameSet,
  isSameIterator: isSameIterator,
  isString: isString,
  isChar: isChar,
  isNumber: isNumber,
  isFloat: isFloat,
  isNumeric: isNumeric,
  isBoolean: isBoolean,
  isObject: isObject,
  isEmptyObject: isEmptyObject,
  isFunction: isFunction,
  isCallable: isCallable,
  isEmptyArray: isEmptyArray,
  isArraylike: isArraylike,
  isNull: isNull,
  isUndefined: isUndefined,
  isNullOrUndefined: isNullOrUndefined,
  isNil: isNil,
  isPrimitive: isPrimitive,
  isSymbol: isSymbol,
  isMap: isMap,
  isSet: isSet,
  isWeakMap: isWeakMap,
  isWeakSet: isWeakSet,
  isIterator: isIterator,
  isDate: isDate,
  isRegexp: isRegexp,
  isElement: isElement,
  isIterable: isIterable,
  isBigInt: isBigInt,
  isArrayBuffer: isArrayBuffer,
  isTypedArray: isTypedArray,
  isGeneratorFn: isGeneratorFn,
  isAsyncFn: isAsyncFn,
  /** cookie **/
  setCookie: setCookie,
  getCookie: getCookie,
  hasCookie: hasCookie,
  removeCookie: removeCookie,
  clearCookies: clearCookies,
  /** collections **/
  arrayDeepClone: arrayDeepClone,
  arrayCreate: arrayCreate,
  initial: initial,
  shuffle: shuffle,
  partition: partition,
  group: group,
  arrayUnion: arrayUnion,
  arrayIntersection: arrayIntersection,
  arrayDifference: arrayDifference,
  arraySymmetricDifference: arraySymmetricDifference,
  setUnion: setUnion,
  setIntersection: setIntersection,
  setDifference: setDifference,
  setSymmetricDifference: setSymmetricDifference,
  isSuperset: isSuperset,
  min: min,
  max: max,
  arrayRepeat: arrayRepeat,
  arrayCycle: arrayCycle,
  arrayRange: arrayRange,
  zip: zip,
  unzip: unzip,
  zipObj: zipObj,
  arrayUnique: arrayUnique,
  arrayAdd: arrayAdd,
  arrayClear: arrayClear,
  arrayRemove: arrayRemove,
  arrayRemoveBy: arrayRemoveBy,
  arrayMerge: arrayMerge,
  iterRange: iterRange,
  iterCycle: iterCycle,
  iterRepeat: iterRepeat,
  takeWhile: takeWhile,
  dropWhile: dropWhile,
  take: take,
  drop: drop,
  forEach: forEach,
  forEachRight: forEachRight,
  map: map,
  filter: filter,
  reject: reject,
  slice: slice,
  tail: tail,
  item: item,
  nth: nth,
  size: size,
  first: first,
  head: head,
  last: last,
  reverse: reverse,
  sort: sort,
  includes: includes,
  contains: contains,
  find: find,
  findLast: findLast,
  every: every,
  some: some,
  none: none,
  takeRight: takeRight,
  takeRightWhile: takeRightWhile,
  dropRight: dropRight,
  dropRightWhile: dropRightWhile,
  concat: concat,
  reduce: reduce,
  enumerate: enumerate,
  entries: entries,
  flat: flat,
  join: join,
  withOut: withOut,
  /** abstract **/
  getInV: getInV,
  getIn: getIn,
  setIn: setIn,
  hasIn: hasIn,
  isPropertyKey: isPropertyKey,
  toPropertyKey: toPropertyKey,
  toObject: toObject,
  isSameValue: isSameValue,
  isSameValueZero: isSameValueZero,
  isSameValueNonNumber: isSameValueNonNumber,
  createMethodProperty: createMethodProperty,
  type: type,
  isIndex: isIndex,
  toIndex: toIndex,
  toInteger: toInteger,
  createDataProperty:createDataProperty,
  toArray: toArray,
  /** math **/
  sum: sum,
  avg: avg,
  product: product,
  clamp: clamp,
  isEven: isEven,
  isOdd: isOdd,
  toInt8: toInt8,
  toUInt8: toUInt8,
  toInt16: toInt16,
  toUInt16: toUInt16,
  toInt32: toInt32,
  toUInt32: toUInt32,
  toBigInt64: toBigInt64,
  toBigUInt64: toBigUInt64,
  toFloat32: toFloat32,
  isInt8: isInt8,
  isUInt8: isUInt8,
  isInt16: isInt16,
  isUInt16: isUInt16,
  isInt32: isInt32,
  isUInt32: isUInt32,
  isBigInt64: isBigInt64,
  isBigUInt64: isBigUInt64
};

if (typeof window !== "undefined") {
  window.celestra = celestra;
  celestra.__prevCEL__ = window.CEL;
  window.CEL = celestra;
}

}(window, document));
