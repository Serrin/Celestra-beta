
/**
 * @name Celestra Removed Polyfills
 * @version 6.0.2 dev
 * @see https://github.com/Serrin/Celestra/
 * @license MIT https://opensource.org/licenses/MIT
 */

/*
Removed in v3.1.0

Object.create();
String.prototype.startsWith();
String.prototype.endsWith();
String.fromCodePoint();
String.prototype.codePointAt();
Array.from();
Array.of();
Array.prototype.fill();
Array.prototype.find();
Array.prototype.findIndex();
Array.prototype.copyWithin();
Number.EPSILON;
Number.isNaN();
isNaN();
Number.isInteger();
Number.isFinite();
Number.isSafeInteger();
Number.parseInt();
Number.parseFloat();
Math.acosh();
Math.asinh();
Math.atanh();
Math.cbrt();
Math.clz32();
Math.cosh();
Math.expm1();
Math.fround();
Math.hypot();
Math.imul();
Math.log1p();
Math.log10();
Math.log2();
Math.sign();
Math.sinh();
Math.tanh();
Math.trunc();
*/

/*
Removed in v3.8.0

Array.prototype.values();
Array.prototype.includes();
String.prototype.includes();
String.prototype.repeat();
String.prototype[Symbol.iterator]();
Object.assign();
Object.entries();
Object.values();
Object.getOwnPropertyDescriptors();
RegExp.prototype.flags;
NodeList.prototype.forEach();
ChildNode.after();
ChildNode.before();
ChildNode.remove();
ChildNode.replaceWith();
ParentNode.append();
ParentNode.prepend();
Element.prototype.matches();
Element.prototype.closest();
Element.prototype.toggleAttribute();
Element.prototype.getAttributeNames();
window.screenLeft;
window.screenTop;
*/

/*
Removed in v5.6.0

Array.prototype.at();
Array.prototype.findLast();
Array.prototype.findLastIndex();
Array.prototype.flat();
Array.prototype.flatMap();
Number.MIN_SAFE_INTEGER;
Number.MAX_SAFE_INTEGER;
Object.fromEntries();
Object.is();
String.prototype.at();
String.prototype.matchAll();
String.prototype.padStart();
String.prototype.padEnd();
String.prototype.replaceAll();
String.prototype.trimStart();
String.prototype.trimLeft();
String.prototype.trimEnd();
String.prototype.trimRight();
Typedarray.prototype.at();
TypedArray.prototype.findLast();
TypedArray.prototype.findLastIndex();
*/

/* 
Removed in v5.9.0

BigInt.prototype.toJSON();
*/


(function(window, document){
"use strict";

/* Removed in v3.1.0 */

if (!Object.create) {
  Object.create = function (o) {
    function F(){}
    F.prototype = o;
    return new F();
  };
}

if (!String.prototype.startsWith) {
	String.prototype.startsWith = function(searchString, position) {
    if (position === undefined) { position = 0; }
		return this.indexOf(searchString) === position;
	};
}

if (!String.prototype.endsWith) {
	String.prototype.endsWith = function(searchString, length) {
    if (length === undefined) { length = this.length; }
    var subs = this.substring(0, length);
		return subs.indexOf(searchString) === (subs.length - searchString.length);
	};
}

/*! https://mths.be/fromcodepoint v0.2.1 by @mathias */
if (!String.fromCodePoint) {
  (function() {
    var defineProperty = (function() {
      try {
        var object = {};
        var $defineProperty = Object.defineProperty;
        var result = $defineProperty(object, object, object) && $defineProperty;
      } catch(error) {}
      return result;
    }());
    var stringFromCharCode = String.fromCharCode;
    var floor = Math.floor;
    var fromCodePoint = function (_) {
      var MAX_SIZE = 0x4000, codeUnits = [], highSurrogate;
      var lowSurrogate, index = -1, length = arguments.length;
      if (!length) { return ""; }
      var result = "";
      while (++index < length) {
        var codePoint = Number(arguments[index]);
        if (!isFinite(codePoint) || codePoint < 0 ||
          codePoint > 0x10FFFF || floor(codePoint) != codePoint
        ) { throw RangeError("Invalid code point: " + codePoint); }
        if (codePoint <= 0xFFFF) {
          codeUnits.push(codePoint);
        } else {
          codePoint -= 0x10000;
          highSurrogate = (codePoint >> 10) + 0xD800;
          lowSurrogate = (codePoint % 0x400) + 0xDC00;
          codeUnits.push(highSurrogate, lowSurrogate);
        }
        if (index + 1 == length || codeUnits.length > MAX_SIZE) {
          result += stringFromCharCode.apply(null, codeUnits);
          codeUnits.length = 0;
        }
      }
      return result;
    };
    if (defineProperty) {
      defineProperty(String, "fromCodePoint", {
        "value": fromCodePoint, "configurable": true, "writable": true
      });
    } else {
      String.fromCodePoint = fromCodePoint;
    }
  }());
}

/*! https://mths.be/codepointat v0.2.0 by @mathias */
if (!String.prototype.codePointAt) {
  (function() {
    "use strict";
    var defineProperty = (function() {
      try {
        var object = {}, $defineProperty = Object.defineProperty;
        var result = $defineProperty(object, object, object) && $defineProperty;
      } catch(error) {}
      return result;
    }());
    var codePointAt = function (position) {
      if (this == null) { throw TypeError(); }
      var string = String(this);
      var size = string.length;
      var index = position ? Number(position) : 0;
      if (index != index) { index = 0; }
      if (index < 0 || index >= size) { return undefined; }
      var first = string.charCodeAt(index);
      var second;
      if (first >= 0xD800 && first <= 0xDBFF && size > index + 1) {
        second = string.charCodeAt(index + 1);
        if (second >= 0xDC00 && second <= 0xDFFF) {
          return (first - 0xD800) * 0x400 + second - 0xDC00 + 0x10000;
        }
      }
      return first;
    };
    if (defineProperty) {
      defineProperty(String.prototype, "codePointAt", {
        "value": codePointAt, "configurable": true, "writable": true
      });
    } else {
      String.prototype.codePointAt = codePointAt;
    }
  }());
}

if (!Array.from) {
  Array.from = function (o, fn) {
    if (o == null) {
      throw new TypeError("Array.from requires an array-like object - not null or undefined");
    }
    var a = Array.prototype.slice.call(o);
    if (fn) {
      if (typeof fn !== "function") {
        throw new TypeError("Array.from: when provided, the second argument must be a function");
      }
      return a.map(fn);
    }
    return a;
  };
}

if (!Array.of) {
  Array.of = function () { return Array.prototype.slice.call(arguments); };
}

if (!Array.prototype.find) {
  Array.prototype.find = function (fn) {
    for (var i = 0, l = this.length; i < l; i++) {
      if (fn(this[i],i,this)) { return this[i]; }
    }
    return undefined;
  };
}

if (!Array.prototype.findIndex) {
  Array.prototype.findIndex = function (fn) {
    for (var i = 0, l = this.length; i < l; i++) {
      if (fn(this[i],i,this)) { return i; }
    }
    return -1;
  };
}

if (!Array.prototype.fill) {
  Array.prototype.fill = function (value, start, end) {
    if (arguments.length === 2) {
      end = this.length;
    } else if (arguments.length < 2 ) {
      start = 0;
      end = this.length;
    }
    if (start < 0) { start = this.length + start; }
    if (end < 0) { end = this.length + end; }
    for (var i = start; i < end; i++) { this[i] = value; }
    return this;
  }
}

if (!Array.prototype.copyWithin) {
  Array.prototype.copyWithin = function(target, start) {
    if (this == null) { throw new TypeError("this is null or not defined"); }
    var O = Object(this);
    var len = O.length >>> 0;
    var relativeTarget = target >> 0;
    var to = relativeTarget < 0 ?
      Math.max(len + relativeTarget, 0) : Math.min(relativeTarget, len);
    var relativeStart = start >> 0;
    var fr = relativeStart < 0 ?
      Math.max(len + relativeStart, 0) : Math.min(relativeStart, len);
    var end = arguments[2];
    var relativeEnd = end === undefined ? len : end >> 0;
    var final = relativeEnd < 0 ?
      Math.max(len + relativeEnd, 0) : Math.min(relativeEnd, len);
    var count = Math.min(final - fr, len - to);
    var direction = 1;
    if (fr < to && to < (fr + count)) {
      direction = -1; fr += count - 1; to += count - 1;
    }
    while (count > 0) {
      if (fr in O) { O[to] = O[fr]; } else { delete O[to]; }
      fr += direction;
      to += direction;
      count--;
    }
    return O;
  };
}

if (Number.EPSILON === undefined) { Number.EPSILON = Math.pow(2, -52); }

if (!Number.isNaN) { Number.isNaN = function (v) { return v !== v; }; }

if (!window.isNaN) {
  window.isNaN = function isNaN (v) { return Number.isNaN(Number(v)); };
}

if (!Number.isInteger) {
  Number.isInteger = function (v) {
    return typeof v === "number"
      && isFinite(v)
      && v > -9007199254740992
      && v < 9007199254740992
      && Math.floor(v) === v;
  };
}

if (!Number.isFinite) {
  Number.isFinite = function (v) { return typeof v==="number" && isFinite(v); };
}

if (!Number.isSafeInteger) {
  Number.isSafeInteger = function (v) {
    return Number.isInteger(v) && Math.abs(v) <= Number.MAX_SAFE_INTEGER;
  };
}

if (!Number.parseInt) { Number.parseInt = window.parseInt; }
if (!Number.parseFloat) { Number.parseFloat = window.parseFloat; }

Math.acosh = Math.acosh || function (x) {
  return Math.log(x + Math.sqrt(x * x - 1));
};

Math.asinh = Math.asinh || function (x) {
  if (x === -Infinity) {
    return x;
  } else {
    return Math.log(x + Math.sqrt(x * x + 1));
  }
};

Math.atanh = Math.atanh || function (x) { return Math.log((1+x)/(1-x)) / 2; };

if (!Math.cbrt) {
  Math.cbrt = function (x) {
    var y = Math.pow(Math.abs(x), 1/3);
    return x < 0 ? -y : y;
  };
}

if (!Math.clz32) Math.clz32 = (function(log, LN2){
  return function(x) {
    if (x == null || x === 0) { return 32; }
    return 31 - log(x >>> 0) / LN2 | 0;
  };
})(Math.log, Math.LN2);

Math.cosh = Math.cosh || function (x) {
  var y = Math.exp(x);
  return (y + 1 / y) / 2;
};

Math.expm1 = Math.expm1 || function (x) { return Math.exp(x) - 1; };

Math.fround = Math.fround || (function (array) {
  return function (x) { return array[0] = x, array[0]; };
})(new Float32Array(1));

Math.hypot = Math.hypot || function (x, y) {
  var max = 0;
  var s = 0;
  for (var i = 0; i < arguments.length; i += 1) {
    var arg = Math.abs(Number(arguments[i]));
    if (arg > max) { s *= (max / arg) * (max / arg); max = arg; }
    s += arg === 0 && max === 0 ? 0 : (arg / max) * (arg / max);
  }
  return max === 1 / 0 ? 1 / 0 : max * Math.sqrt(s);
};

Math.imul = Math.imul || function (a, b) {
  var aHi = (a >>> 16) & 0xffff, aLo = a & 0xffff;
  var bHi = (b >>> 16) & 0xffff, bLo = b & 0xffff;
  return ((aLo * bLo) + (((aHi * bLo + aLo * bHi) << 16) >>> 0) | 0);
};

Math.log1p = Math.log1p || function (x) { return Math.log(1 + x); };

Math.log10 = Math.log10 || function (x) { return Math.log(x) * Math.LOG10E; };

Math.log2 = Math.log2 || function (x) { return Math.log(x) * Math.LOG2E; };

if (!Math.sign) { Math.sign = function (x) { return ((x>0) - (x<0)) || +x; }; }

Math.sinh = Math.sinh || function (x) { var y = Math.exp(x); return (y-1/y)/2; }

Math.tanh = Math.tanh || function (x) {
  var a = Math.exp(+x), b = Math.exp(-x);
  return a == Infinity ? 1 : b == Infinity ? -1 : (a - b) / (a + b);
}

if (!Math.trunc) {
	Math.trunc = function (v) {
		v = +v;
		return (v - v % 1) || (!isFinite(v) || v === 0 ? v : v < 0 ? -0 : 0);
	};
}

/* Removed in v3.8.0 */

if (Array.prototype.keys
  && Array.prototype.entries
  && !Array.prototype.values) {
  Array.prototype.values = Array.prototype[Symbol.iterator];
}

if (!Array.prototype.includes) {
  Array.prototype.includes = function (v, f) { return (this.indexOf(v,f)>-1); };
}

if (!String.prototype.includes) {
  String.prototype.includes = function (v,f) { return (this.indexOf(v,f)>-1); };
}

if (!String.prototype.repeat) {
  String.prototype.repeat = function (c) {
    "use strict";
    if (this == null) {
      throw new TypeError("can\"t convert " + this + " to object");
    }
    var str = "" + this;
    c = +c;
    if (c != c) { c = 0; }
    if (c < 0) { throw new RangeError("repeat count must be non-negative"); }
    if (c == Infinity) {
      throw new RangeError("repeat count must be less than infinity");
    }
    c = Math.floor(c);
    if (str.length == 0 || c == 0) { return ""; }
    if (str.length * c >= 1 << 28) {
      throw new RangeError("repeat count must not overflow maximum string size");
    }
    var maxCount = str.length * c;
    c = Math.floor(Math.log(c) / Math.log(2));
    while (c) { str += str; c--; }
    str += str.substring(0, maxCount - str.length);
    return str;
  }
}

if (!String.prototype[Symbol.iterator]) {
  String.prototype[Symbol.iterator] = function () {
    return Array.from(this).values();
  };
}

if (!Object.assign) {
  Object.assign = function () {
    var t = arguments[0] || {};
    for (var i = 0, l = arguments.length; i < l; i++) {
      var s = arguments[i];
      for (var a in s) { if (s.hasOwnProperty(a)) { t[a] = s[a]; } }
    }
    return t;
  };
}

if (!Object.entries) {
  Object.entries = function (o) {
    return Object.keys(o).map(function (e) { return [e, o[e]]; });
  };
}

if (!Object.values) {
  Object.values = function (o) {
    return Object.keys(o).map(function (e) { return o[e]; });
  };
}

if (!Object.getOwnPropertyDescriptors) {
  Object.getOwnPropertyDescriptors = function (obj) {
    var res = {};
    var n = Object.getOwnPropertyNames(obj);
    for (var i = 0, l = n.length; i < l; i++) {
      res[n[i]] = Object.getOwnPropertyDescriptor(obj, n[i]);
    }
    return res;
  };
}

if (RegExp.prototype.flags === undefined) {
  Object.defineProperty(RegExp.prototype, "flags", {
    configurable: true,
    get: function () { return this.toString().match(/[gimsuy]*$/)[0]; }
  });
}

if (window.NodeList && !NodeList.prototype.forEach) {
  NodeList.prototype.forEach = function (callback, thisArg) {
    thisArg = thisArg || window;
    for (var i = 0; i < this.length; i++) {
      callback.call(thisArg, this[i], i, this);
    }
  };
}

[Element.prototype, CharacterData.prototype, DocumentType.prototype].forEach(function (p) {
  if (!p.after) {
    p.after = function () {
      var t = this;
      Array.prototype.forEach.call(arguments, function (e) {
        t.parentNode.insertBefore(
          (e instanceof Node ? e : document.createTextNode(String(e))),
          t.nextSibling
        );
      });
    };
  }
  if (!p.before) {
    p.before = function () {
      var t = this;
      Array.prototype.forEach.call(arguments, function (e) {
        t.parentNode.insertBefore(
          (e instanceof Node ? e : document.createTextNode(String(e))), t
        );
      });
    };
  }
  if (!p.remove) {
    p.remove = function () { this.parentNode.removeChild(this); };
  }
  if (!p.replaceWith) {
    p.replaceWith = function () {
      var t = this;
      Array.prototype.forEach.call(arguments, function (e) {
        t.parentNode.replaceChild(
          (e instanceof Node ? e : document.createTextNode(String(e))), t
        );
      });
    };
  }
  if (!p.append) {
    p.append = function () {
      var t = this;
      Array.prototype.forEach.call(arguments, function (e) {
        t.appendChild(
          e instanceof Node ? e : document.createTextNode(String(e))
        );
      });
    };
  }
  if (!p.prepend) {
    p.prepend = function () {
      var t = this;
      Array.prototype.forEach.call(arguments, function (e) {
        t.insertBefore(
          (e instanceof Node ? e : document.createTextNode(String(e))),
          t.firstChild
        );
      });
    };
  }
});

if (!Element.prototype.matches) {
  Element.prototype.matches =
    Element.prototype.msMatchesSelector ||
    Element.prototype.webkitMatchesSelector ||
    Element.prototype.matchesSelector ||
    Element.prototype.mozMatchesSelector ||
    Element.prototype.oMatchesSelector ||
    function (s) {
      var matches = (this.document || this.ownerDocument).querySelectorAll(s),
        i = matches.length;
      while (--i >= 0 && matches.item(i) !== this) {}
      return i > -1;
    };
}

if (!Element.prototype.closest) {
  Element.prototype.closest = function (s) {
    var el = this;
    if (!document.documentElement.contains(el)) { return null; }
    do {
      if (el.matches(s)) { return el; }
      el = el.parentElement || el.parentNode;
    } while (el !== null && el.nodeType === 1);
    return null;
  };
}

if (!Element.prototype.toggleAttribute) {
  Element.prototype.toggleAttribute = function (name, force) {
    var forcePassed = (arguments.length === 2);
    var forceOn = !!force;
    var forceOff = (forcePassed && !force);
    if (this.getAttribute(name) !== null) {
      if (forceOn) { return true; }
      this.removeAttribute(name);
      return false;
    } else {
      if (forceOff) { return false; }
      this.setAttribute(name, "");
      return true;
    }
  };
}

if (!Element.prototype.getAttributeNames) {
  Element.prototype.getAttributeNames = function () {
    var attributes = this.attributes;
    var length = attributes.length;
    var result = new Array(length);
    for (var i = 0; i < length; i++) { result[i] = attributes[i].name; }
    return result;
  };
}

if (!("screenLeft" in window)) { window.screenLeft = window.screenX; }
if (!("screenTop" in window)) { window.screenTop = window.screenY; }

/* Removed in v5.6.0 */

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

/* Number.MIN_SAFE_INTEGER; */
if(!("MIN_SAFE_INTEGER" in Number)){Number.MIN_SAFE_INTEGER=-9007199254740991;}

/* Number.MAX_SAFE_INTEGER; */
if(!("MAX_SAFE_INTEGER" in Number)){Number.MAX_SAFE_INTEGER=9007199254740991;}

/* Object.fromEntries(); */
if (!Object.fromEntries) {
  Object.fromEntries = function (entries) {
    var r = {};
    for (let e of entries) { r[e[0]] = e[1]; }
    return r;
  };
}

/* Object.is(); SameValue */
if (!Object.is) {
  Object.is = function (x, y) {
    if (x===y) { return x !==0 || 1/x === 1/y; } else { return x!==x && y!==y; }
  };
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

/* Removed in v5.9.0 */

/* BigInt.prototype.toJSON(); */
if (!!globalThis.BigInt && !("toJSON" in BigInt.prototype)) {
  Object.defineProperty(BigInt.prototype, "toJSON", {
    writable: true, enumerable: false, configurable: true,
    value: function toJSON () { return this.toString(); }
  });
}

}(window, document));
