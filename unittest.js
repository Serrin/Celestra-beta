"use strict";

try {

/* Celestra unit tester */

var CUT = {};

CUT.VERSION = "Celestra Unit Tester (CUT) v0.8.24";

CUT.__results__ = document.querySelector("#results");
CUT.__resultsFailed__ = document.querySelector("#resultsFailed");

/* __addTest__(a"step", true, expr); */
/* __addTest__("step", true, expr, true|false); */
/* only for inner calls and selftest */
CUT.__addTest__ = function __addTest__ (step, expected, expression, strict) {
  if (strict === undefined) { strict = true; }
  var el = document.createElement("p");
  if (strict ? expected === expression : expected == expression) {
    el.innerHTML = "["+Date.now().toString(36)+"] <span class=\"passed\">[passed]</span> "+step;
    CUT.__results__.append(el);
  } else {
    el.innerHTML = "["+Date.now().toString(36)+"] <span class=\"failed\">[failed]</span> "+step;
    CUT.__results__.append(el);
    CUT.__resultsFailed__.append(el.cloneNode(true));
  }
};

/* isTrue("step", expr); */
CUT.isTrue = function isTrue (step, expression) {
  CUT.__addTest__(step, true, expression, true);
};

/* isFalse("step", expr); */
CUT.isFalse = function isFalse (step, expression) {
  CUT.__addTest__(step, false, expression, true);
};

/* isEqual("step", true, expr); */
/* isEqual("step", true, expr, true|false); */
CUT.isEqual = function isEqual (step, expected, expression, strict) {
  CUT.__addTest__(step, expected, expression, strict);
};

/* isNotEqual("step", true, expr); */
/* isNotEqual("step", true, expr, true|false); */
CUT.isNotEqual = function (step, notExpected, expression, strict) {
  if (strict === undefined) { strict = true; }
  CUT.__addTest__(step, true,
    (strict ? notExpected !== expression : notExpected != expression), true
  );
};

/* addElement(<element>); */
/* addElement(<type>[,innerHTML]); */
CUT.addElement = function addElement (type, iHtml) {
  if (typeof type === "object" && type.nodeType === 1) {
    CUT.__results__.append(type);
  } else {
    var el = document.createElement(type);
    if (iHtml) { el.innerHTML = iHtml; }
    CUT.__results__.append(el);
  }
};

/* log(<innerHTML>); */
CUT.log = function log (iHtml) { CUT.addElement("p", iHtml); };

/* clear(); */
CUT.clear = function clear () { CUT.__results__.innerHTML = ""; };


/* ======================================================================== */


//CUT.addElement("hr");

const today = new Date();

CUT.addElement("table",
  "<tr><td>CUT: </td><td><code>"+CUT.VERSION+"</code></td></tr>"
    + "<tr><td>Celestra: </td><td><code>"+celestra.VERSION+"</code></td></tr>"
    + "<tr><td>UTC date: </td><td><code>"+today.toISOString()+"</code></td></tr>"
    + "<tr><td>Local date: </td><td><code>"+today.toString()+"</code></td></tr>"
    + "<tr><td>EPOCH time: </td><td><code>"+(+today) + " (10) / " + ((+today).toString(16)) + " (16) / " + ((+today).toString(36)) + " (36)" +"</code></td></tr>"
    + "<tr><td>navigator.appName: </td><td><code>"+navigator.appName+"</code></td></tr>"
    + "<tr><td>navigator.appCodeName: </td><td><code>"+navigator.appCodeName+"</code></td></tr>"
    + "<tr><td>navigator.product: </td><td><code>"+navigator.product+"</code></td></tr>"
    + "<tr><td>navigator.appVersion: </td><td><code>"+navigator.appVersion+"</code></td></tr>"
    + "<tr><td>navigator.buildID: </td><td><code>"+navigator.buildID+"</code></td></tr>"
    + "<tr><td>navigator.product: </td><td><code>"+navigator.product+"</code></td></tr>"
    + "<tr><td>navigator.productSub: </td><td><code>"+navigator.productSub+"</code></td></tr>"
    + "<tr><td>navigator.userAgent: </td><td><code>"+navigator.userAgent+"</code></td></tr>"
    + "<tr><td>navigator.userAgentData: </td><td><code>"+JSON.stringify(navigator.userAgentData)+"</code></td></tr>"
    + "<tr><td>navigator.doNotTrack: </td><td><code>"+navigator.doNotTrack+"</code></td></tr>"
    + "<tr><td>navigator.vendor: </td><td><code>"+navigator.vendor+"</code></td></tr>"
    + "<tr><td>navigator.platform: </td><td><code>"+navigator.platform+"</code></td></tr>"
    + "<tr><td>navigator.language: </td><td><code>"+navigator.language+"</code></td></tr>"
    + "<tr><td>navigator.oscpu: </td><td><code>"+navigator.oscpu+"</code></td></tr>"
    + "<tr><td>navigator.cookieEnabled: </td><td><code>"+navigator.cookieEnabled+"</code></td></tr>"
    + "<tr><td>navigator.javaEnabled(): </td><td><code>"+navigator.javaEnabled()+"</code></td></tr>"
    + "<tr><td>navigator.pdfViewerEnabled: </td><td><code>"+navigator.pdfViewerEnabled+"</code></td></tr>"
    + "<tr><td>window.innerWidth: </td><td><code>"+window.innerWidth+"</code></td></tr>"
    + "<tr><td>window.innerHeight: </td><td><code>"+window.innerHeight+"</code></td></tr>"
    + "<tr><td>screen.width: </td><td><code>"+screen.width+"</code></td></tr>"
    + "<tr><td>screen.height: </td><td><code>"+screen.height+"</code></td></tr>"
    + "<tr><td>screen.availWidth: </td><td><code>"+screen.availWidth+"</code></td></tr>"
    + "<tr><td>screen.availHeight: </td><td><code>"+screen.availHeight+"</code></td></tr>"
    + "<tr><td>screen.colorDepth: </td><td><code>"+screen.colorDepth+"</code></td></tr>"
    + "<tr><td>screen.pixelDepth: </td><td><code>"+screen.pixelDepth+"</code></td></tr>"
);

window.saveResults = function saveResults () {
  var dn = Date.now().toString(36);
  CEL.createFile("results-"+dn+".html",
    "<!DOCTYPE html><meta charset=\"utf-8\"><title>Results "+dn+"</title>"
      +"<style>html { -ms-word-break: break-all; word-break: break-all; word-break: break-word; word-wrap: break-word; overflow-wrap: break-word; } body { margin: 0 auto; max-width: 1200px; font-family: Helvetica, Arial, sans-serif; } h1 { text-align : center; } .passed, .failed { display: inline-block; padding: 3px; }.passed { background-color: #3d9970 !important; color: white !important; }.failed { background-color: #ff4136 !important; color: white !important; } #results { padding: 3px 5px 3px 5px; font-size: 14.5px !important; font-family: consolas, monospace; } code { background-color: slategrey; color: white; padding: 3px 5px 3px 5px; display: inline-block; margin-top: 2px; } </style>"
      +"<h1>Results "+dn+"</h1>"
      +"<div id='results'>"+CUT.__results__.innerHTML+"</div>",
    "text/html"
 );
};


/* ======================================================================== */


/* Selftest */
CUT.addElement("hr");
CUT.addElement("h3", "CUT Selftest");

CUT.__addTest__(
  "<span class=\"info\">Selftest</span> - __addTest__(); success", 1, 1
);
CUT.__addTest__(
  "<span class=\"info\">Selftest</span> - __addTest__(); failed", 1, 2
);
CUT.__addTest__(
  "<span class=\"info\">Selftest</span> - __addTest__(); success non-strict",
  0, false, false
);
CUT.__addTest__(
  "<span class=\"info\">Selftest</span> - __addTest__(); failed strict",
  0, false, true
);

CUT.isTrue("<span class=\"info\">Selftest</span> - isTrue(); success", 1 < 10);
CUT.isTrue("<span class=\"info\">Selftest</span> - isTrue(); failed", 1 > 10);

CUT.isFalse("<span class=\"info\">Selftest</span> - isFalse(); success", 1>10);
CUT.isFalse("<span class=\"info\">Selftest</span> - isFalse(); failed", 1<10);

CUT.isEqual("<span class=\"info\">Selftest</span> - isEqual(); success", 1, 1);
CUT.isEqual("<span class=\"info\">Selftest</span> - isEqual(); failed", 1, 2);
CUT.isEqual(
  "<span class=\"info\">Selftest</span> - isEqual(); success non-strict",
  0, false, false
);
CUT.isEqual(
  "<span class=\"info\">Selftest</span> - isEqual(); failed strict",0,false,true
);

CUT.isNotEqual(
  "<span class=\"info\">Selftest</span> - isNotEqual(); success", 1, 2
);
CUT.isNotEqual(
  "<span class=\"info\">Selftest</span> - isNotEqual(); failed", 1, 1
);
CUT.isNotEqual(
  "<span class=\"info\">Selftest</span> - isNotEqual(); success strict",
  0, false, true
);
CUT.isNotEqual(
  "<span class=\"info\">Selftest</span> - isNotEqual(); failed non-strict",
  0, false, false
);


/* ======================================================================== */


(function(){
"use strict";

/* Celestra v5.6.4 testcases */

/* Not auto tested functions */
CUT.addElement("hr");
CUT.addElement("h3", "Not auto tested functions");
CUT.addElement("ul",
  "<li>getUrlVars(); no str parameter</li>"
    +"<li>getLocation(&#60;success&#62;[,error]);</li>"
    +"<li>getFullscreen();</li>"
    +"<li>setFullscreenOn(&#60;selector&#62; or &#60;element&#62;);</li>"
    +"<li>setFullscreenOff();</li>"
    +"<li>createFile(&#60;filename&#62;,&#60;content&#62;[,dType]);</li>"
    +"<li>domFadeIn(&#60;element&#62;[,duration[,display]]);</li>"
    +"<li>domFadeOut(&#60;element&#62;[,duration]);</li>"
    +"<li>domFadeToggle(&#60;element&#62;[,duration[,display]]);</li>"
    +"<li>noConflict();</li>"
);


/* Celestra object */
CUT.addElement("hr");
CUT.addElement("h3", "Celestra object");

CUT.isEqual("Object name: \"celestra\"", true, celestra.randomInt(100, 200)>99);
CUT.isEqual("Object name: \"CEL\"", true, CEL.randomInt(100,200)>99);


/* Core API and String API and DOM API */

CUT.addElement("hr");
CUT.addElement("h3", "Core API and String API and DOM API");

CUT.isEqual("VERSION", true, CEL.VERSION.includes("Celestra v"));

CUT.isEqual("BASE16", CEL.BASE16, "0123456789ABCDEF");
CUT.isEqual("BASE32", CEL.BASE32, "234567ABCDEFGHIJKLMNOPQRSTUVWXYZ");
CUT.isEqual("BASE36", CEL.BASE36, "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ");
CUT.isEqual("BASE58", CEL.BASE58, "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz");
CUT.isEqual("BASE62", CEL.BASE62, "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz");
CUT.isEqual("WORDSAFEALPHABET", CEL.WORDSAFEALPHABET, "23456789CFGHJMPQRVWXcfghjmpqvwx");

CUT.isTrue("v3.8.1 aliases removed in v4.0.0",
  CEL.isUndefined(CEL.someOf)
    && CEL.isUndefined(CEL.everyOf)
    && CEL.isUndefined(CEL.findOf)
    && CEL.isUndefined(CEL.dropOf)
    && CEL.isUndefined(CEL.takeOf)
    && CEL.isUndefined(CEL.joinOf)
    && CEL.isUndefined(CEL.enumerateOf)
    && CEL.isUndefined(CEL.flatOf)
    && CEL.isUndefined(CEL.concatOf)
    && CEL.isUndefined(CEL.reduceOf)
    && CEL.isUndefined(CEL.sortOf)
    && CEL.isUndefined(CEL.reverseOf)
    && CEL.isUndefined(CEL.sliceOf)
    && CEL.isUndefined(CEL.lastOf)
    && CEL.isUndefined(CEL.firstOf)
    && CEL.isUndefined(CEL.noneOf)
    && CEL.isUndefined(CEL.filterOf)
    && CEL.isUndefined(CEL.sizeOf)
    && CEL.isUndefined(CEL.hasOf)
    && CEL.isUndefined(CEL.mapOf)
    && CEL.isUndefined(CEL.forOf)
);

CUT.isTrue("assertTrue();",    CEL.assertTrue("lorem ipsum", true) );
CUT.isTrue("assertFalse();",   CEL.assertFalse("lorem ipsum", false) );
CUT.isTrue("assertEq(); 1",    CEL.assertEq("lorem ipsum", 1, 1) );
CUT.isTrue("assertEq(); 2",    CEL.assertEq("lorem ipsum", 1, true, false) );
CUT.isTrue("assertNotEq(); 1", CEL.assertNotEq("lorem ipsum", 1, 2) );
CUT.isTrue("assertNotEq(); 2", CEL.assertNotEq("lorem ipsum", 1, 2, false) );

var randomUUIDv7Result = CEL.randomUUIDv7();
CUT.isTrue("randomUUIDv7();",
  CEL.isString(randomUUIDv7Result) && randomUUIDv7Result.length === 36
);
CUT.log("<code>\""+randomUUIDv7Result+"\"<code>");

var nanoidStr = CEL.nanoid();
CUT.isTrue("nanoid 1 - default size 21",
  CEL.isString(nanoidStr) && nanoidStr.length === 21
);
CUT.log("<code>\""+nanoidStr+"\"</code>");
var nanoidStr = CEL.nanoid(15);
CUT.isTrue("nanoid 2 - size 15",
  CEL.isString(nanoidStr) && nanoidStr.length === 15
);
CUT.log("<code>\""+nanoidStr+"\"</code>");
var nanoidStr = CEL.nanoid(36);
CUT.isTrue("nanoid 3 - size 36",
  CEL.isString(nanoidStr) && nanoidStr.length === 36);
CUT.log("<code>\""+nanoidStr+"\"</code>");
var nanoidStr = CEL.nanoid(5, "abcdeFGHIJK42");
CUT.isTrue("nanoid 4 - size 5 & \"abcdeFGHIJK42\"",
  CEL.isString(nanoidStr) && nanoidStr.length === 5
);
CUT.log("<code>\""+nanoidStr+"\"</code>");

var timestampIDStr = CEL.timestampID();
CUT.isTrue("timestampID 1 - default size 21",
  CEL.isString(timestampIDStr) && timestampIDStr.length === 21
);
CUT.log("<code>\""+timestampIDStr+"\"</code>");
var timestampIDStr = CEL.timestampID(15);
CUT.isTrue("timestampID 2 - size 15",
  CEL.isString(timestampIDStr) && timestampIDStr.length === 15
);
CUT.log("<code>\""+timestampIDStr+"\"</code>");
var timestampIDStr = CEL.timestampID(36);
CUT.isTrue("timestampID 3 - size 36",
  CEL.isString(timestampIDStr) && timestampIDStr.length === 36);
CUT.log("<code>\""+timestampIDStr+"\"</code>");
var timestampIDStr = CEL.timestampID(5, "abcdeFGHIJK42");
CUT.isTrue("timestampID 4 - size 5 -> 12 & \"abcdeFGHIJK42\"",
  CEL.isString(timestampIDStr) && timestampIDStr.length === 12
);
CUT.log("<code>\""+timestampIDStr+"\"</code>");

CUT.addElement(
  CEL.domCreate("div", {"id": "qsaDivTestElement"},
    "#qsaDiv test element"
      + "<p id='qsaDivP1'>#qsaDivP1 test element</p>"
      + "<p id='qsaDivP2'>#qsaDivP2 test element</p>"
  )
);

CUT.isEqual("qs(); selector",
  document.querySelector("#qsaDivTestElement"), CEL.qs("#qsaDivTestElement")
);

CUT.isEqual("qs(); selector + element 1",
  document.querySelector("#qsaDivP1"),
  CEL.qs("#qsaDivP1", CEL.qs("#qsaDivTestElement"))
);

CUT.isEqual("qs(); selector + element 2",
  document.querySelector("#qsaDivP1"),
  CEL.qs("#qsaDivP1", document.querySelector("#qsaDivTestElement"))
);

var testQsa1 = CEL.qsa("#qsaDivTestElement > p")
CUT.isTrue("qsa(); selector",
  Array.isArray(testQsa1) && testQsa1.length === 2 &&
    testQsa1[0] === CEL.qs("#qsaDivP1") && testQsa1[1] === CEL.qs("#qsaDivP2")
);

var testQsa2 = CEL.qsa("p", CEL.qs("#qsaDivTestElement"))
CUT.isTrue("qsa(); selector + element 1",
  Array.isArray(testQsa2) && testQsa2.length === 2 &&
    testQsa2[0] === CEL.qs("#qsaDivP1") && testQsa2[1] === CEL.qs("#qsaDivP2")
);

var testQsa3 = CEL.qsa("p", document.querySelector("#qsaDivTestElement"))
CUT.isTrue("qsa(); selector + element 2",
  Array.isArray(testQsa3) && testQsa3.length === 2 &&
    testQsa3[0] === CEL.qs("#qsaDivP1") && testQsa3[1] === CEL.qs("#qsaDivP2")
);

testQsa3.forEach(function (e) { e.innerHTML += " each"; });
CUT.isTrue("qsa(); forEach",
  testQsa3[0].innerHTML === "#qsaDivP1 test element each" &&
    testQsa3[1].innerHTML === "#qsaDivP2 test element each"
);

CUT.isEqual("classof(); ES5 values",
  "array  number  string  object  htmldocument  boolean  nodelist  htmlparagraphelement  null  undefined  function  date  regexp",
  CEL.classof([1,2,3])+"  "+CEL.classof(1998)+"  "+CEL.classof("hello world")
    + "  " +CEL.classof({a:1,b:2})+"  "+CEL.classof(document)
    + "  " +CEL.classof(true)+"  "+CEL.classof(document.querySelectorAll("p"))
    + "  " +CEL.classof(document.querySelector("p"))+"  "+CEL.classof(null)
    + "  " +CEL.classof(undefined)+"  "+CEL.classof(function(){})
    + "  " +CEL.classof(new Date())+"  "+CEL.classof(/^\[object (.+)\]$/g)
);
CUT.isEqual("classof(); ES5 all true",
  "true  true  true  true  true  true  true  true  true  true  true  true  true",
 CEL.classof([1,2,3], "array")+"  "+CEL.classof(1998, "number")
    +"  "+CEL.classof("hello world", "string")+"  "+CEL.classof({a:1,b:2}, "object")
    +"  "+CEL.classof(document, "htmldocument")+"  "+CEL.classof(true, "boolean")
    +"  "+CEL.classof(document.querySelectorAll("p"), "nodelist")
    +"  "+CEL.classof(document.querySelector("p"), "htmlparagraphelement")
    +"  "+CEL.classof(null, "null")+"  "+CEL.classof(undefined, "undefined")
    +"  "+CEL.classof(function(){}, "function")+"  "+CEL.classof(new Date(), "date")
    +"  "+CEL.classof(/^\[object (.+)\]$/g, "regexp")
);
CUT.isEqual("classof(); ES5 all false",
  "false  false  false  false  false  false  false  false  false  false  false  false  false",
  CEL.classof([1,2,3], "number")+"  "+CEL.classof(1998, "array")
    +"  "+CEL.classof("hello world", "object")+"  "+CEL.classof({a:1,b:2}, "string")
    +"  "+CEL.classof(document, "boolean")+"  "+CEL.classof(true, "htmldocument")
    +"  "+CEL.classof(document.querySelectorAll("p"), "htmlheadingelement")
    +"  "+CEL.classof(document.querySelector("p"), "nodelist")
    +"  "+CEL.classof(null, "undefined")+"  "+CEL.classof(undefined, "null")
    +"  "+CEL.classof(function(){}, "object")+"  "+CEL.classof(new Date(), "array")
    +"  "+CEL.classof(/^\[object (.+)\]$/g, "string")
);

CUT.isEqual("classof(); ES6 values", "map  set  weakmap  weakset",
  CEL.classof(new Map()) +"  "+CEL.classof(new Set())
    +"  "+CEL.classof(new WeakMap())
    +"  "+CEL.classof(new WeakSet())
);
CUT.isEqual("classof(); ES6 all true", "true  true  true  true",
  CEL.classof(new Map(), "map") +"  "+CEL.classof(new Set(), "set")
    +"  "+CEL.classof(new WeakMap(), "weakmap")
    +"  "+CEL.classof(new WeakSet(), "weakset")
);
CUT.isEqual("classof(); ES6 all false", "false  false  false  false",
  CEL.classof(new Map(), "object") +"  "+CEL.classof(new Set(), "object")
    +"  "+CEL.classof(new WeakMap(), "object")
    +"  "+CEL.classof(new WeakSet(), "object")
);
if (!!window.BigInt) {
  CUT.isEqual("classof(); ES6 bigint", "bigint  true  false",
  CEL.classof(BigInt(456))
    +"  "+CEL.classof(BigInt(456), "bigint")
    +"  "+CEL.classof(BigInt(456), "object")
  );
}


var foo1 = {a: "1", b: "2"};
var bar1 = {c: "3", d: "4", baz: {e: 5,fn: function(num) { return num*num;} } };

var extObj1 = CEL.extend(true,{},foo1,bar1);
CUT.isEqual("extend(); true", "1  2  3  4  5  121",
  extObj1.a+"  "+extObj1.b+"  "+extObj1.c+"  "+extObj1.d+"  "+extObj1.baz.e
    +"  "+extObj1.baz.fn(11)
);

var extObj1 = CEL.extend(false,{},foo1,bar1);
CUT.isEqual("extend(); false 1", "1  2  3  4  5  121",
  extObj1.a+"  "+extObj1.b+"  "+extObj1.c+"  "+extObj1.d+"  "+extObj1.baz.e
    +"  "+extObj1.baz.fn(11)
);

var extObj1 = CEL.extend({},foo1,bar1);
CUT.isEqual("extend(); false 2", "1  2  3  4  5  121",
  extObj1.a+"  "+extObj1.b+"  "+extObj1.c+"  "+extObj1.d+"  "+extObj1.baz.e
    +"  "+extObj1.baz.fn(11)
);

var obj2stringObj = {str:"éáűőúöüóíÉÁŰŐÚÖÜÓÍ",bool:true,pi:3.141592653589793};
CUT.isEqual("obj2string();",
  "str=%C3%A9%C3%A1%C5%B1%C5%91%C3%BA%C3%B6%C3%BC%C3%B3%C3%AD%C3%89%C3%81%C5%B0%C5%90%C3%9A%C3%96%C3%9C%C3%93%C3%8D&bool=true&pi=3.141592653589793",
  CEL.obj2string(obj2stringObj)
);
CUT.log(`<code>"${CEL.obj2string(obj2stringObj)}"</code>`);

/* inherit(); */

function Human (name,age) { this.name = name; this.age = age; }
Human.prototype.getName = function () { return this.name;}
Human.prototype.getAge = function () { return this.age;}

function Worker (name,age,job) {
  this.name = name; this.age = age; this.job = job;
}

CEL.inherit(Worker,Human);

Worker.prototype.setJob = function (job) { this.job = job;}
Worker.prototype.getJob = function () { return this.job;}

var David = new Human("David",27);
var Amy = new Worker ("Amy",25,"Engineer");

CUT.isEqual("inherit();",
  "David, 27" +"Amy, 25, Engineer" + "David instanceof Human: true"
    + "David instanceof Worker: false" + "Amy instanceof Human: true"
    + "Amy instanceof Worker: true",
  David.getName()+", "+David.getAge()
    + Amy.getName()+", "+Amy.getAge()+", "+Amy.getJob()
    + "David instanceof Human: " + (David instanceof Human)
    + "David instanceof Worker: " + (David instanceof Worker)
    + "Amy instanceof Human: " + (Amy instanceof Human)
    + "Amy instanceof Worker: " + (Amy instanceof Worker)
);

/* / inherit(); */

CUT.isEqual(
  'getUrlVars(); prop order_by from <code>"?showall=true&order_by=updated&o=asc"</code>',
  "updated", CEL.getUrlVars("?showall=true&order_by=updated&o=asc")["order_by"],
);
CUT.isEqual("getUrlVars(); prop not found - undefined", undefined,
  CEL.getUrlVars("?showall=true&order_by=updated&o=asc")["order_by2"] );
CUT.isEqual("getUrlVars(); empty object","{}",JSON.stringify(CEL.getUrlVars("?")));

CUT.addElement(CEL.domCreate("div", {"id": "testFormDiv"},
  " <form id='form1'><br/>Text: <input type='text' name='name' value='foo éáűőúöüóíéáűőúöüóí'><br/>Password: <input type='password' name='password' value='bar'><br/>Number: <input type='number' name='number' value='97'><br/> Radio: <input type='radio' name='radio' value='male' checked='checked'>Male <input type='radio' name='radio' value='female'>Female<br/> <select name='animals'> <option value='dog'>dog</option> <option value='cat'>cat</option> <option value='cow'>cow</option> <option value='hippos'>hippos</option> </select><br/> <select name='animals-multiple' multiple='multiple'> <option value='dog' selected='selected'>dog</option> <option value='cat'>cat</option> <option value='cow'>cow</option> <option value='hippos' selected='selected'>hippos</option> </select><br/>Checkbox1: <input type='checkbox' name='checkbox1' value='true' checked='checked'>true<br/>Checkbox2: <input type='checkbox' name='checkbox2' value='false'>false<br/>Textarea1: <textarea name='textarea1'>textarea1</textarea><br/><input type='submit' value='Submit'><br/><input type='reset' value='Reset'><br/><input type='button' value='Button1'><br/><button>Button2</button> </form> "
));

CUT.isEqual("form2array();",
  '[{"name":"name","value":"foo%20%C3%A9%C3%A1%C5%B1%C5%91%C3%BA%C3%B6%C3%BC%C3%B3%C3%AD%C3%A9%C3%A1%C5%B1%C5%91%C3%BA%C3%B6%C3%BC%C3%B3%C3%AD"},{"name":"password","value":"bar"},{"name":"number","value":"97"},{"name":"radio","value":"male"},{"name":"animals","value":"dog"},{"name":"animals-multiple","value":"dog"},{"name":"animals-multiple","value":"hippos"},{"name":"checkbox1","value":"true"},{"name":"textarea1","value":"textarea1"}]',
  JSON.stringify(CEL.form2array(CEL.qs("#form1")))
);

CUT.isEqual("form2string();",
  "name=foo+%C3%A9%C3%A1%C5%B1%C5%91%C3%BA%C3%B6%C3%BC%C3%B3%C3%AD%C3%A9%C3%A1%C5%B1%C5%91%C3%BA%C3%B6%C3%BC%C3%B3%C3%AD&password=bar&number=97&radio=male&animals=dog&animals-multiple=dog&animals-multiple=hippos&checkbox1=true&textarea1=textarea1",
  CEL.form2string(CEL.qs("#form1"))
);

CEL.qs("#testFormDiv").remove();

var testRandom = CEL.randomBoolean();
CUT.isTrue("randomBoolean(); - <code>" + testRandom + "</code>",
  CEL.isBoolean(testRandom) && (testRandom === true || testRandom === false) );

var kayleeStr = "✓ à \r\n\t árvíztűrő tükörfúrógép ÁRVÍZTŰRŐ TÜKÖRFÚRÓGÉP ,?;.:-_* ¤÷×¨¸´˙`˛°˘^ˇ~'+!%/=()|\\<> \" \/ #&@{}[]€ ÍÄíŁß 0123456789 asdfghjklqwertzuiopyxcvbnm ASDFGHJKLQWERTZUIOPYXCVBNM";
CUT.isEqual("b64Encode();",
  "4pyTIMOgIA0KCSDDoXJ2w616dMWxcsWRIHTDvGvDtnJmw7pyw7Nnw6lwIMOBUlbDjVpUxbBSxZAgVMOcS8OWUkbDmlLDk0fDiVAgLD87LjotXyogwqTDt8OXwqjCuMK0y5lgy5vCsMuYXsuHficrISUvPSgpfFw8PiAiIC8gIyZAe31bXeKCrCDDjcOEw63FgcOfIDAxMjM0NTY3ODkgYXNkZmdoamtscXdlcnR6dWlvcHl4Y3Zibm0gQVNERkdISktMUVdFUlRaVUlPUFlYQ1ZCTk0=",
  CEL.b64Encode(kayleeStr)
);
CUT.isEqual("b64Decode(); + b64Encode();", kayleeStr, CEL.b64Decode(CEL.b64Encode(kayleeStr)));
CUT.isEqual("javaHash();",
  "-0.578: 1334063883 / 4f84330b / 13340638830: 48 / 30 / 48 / 3.14: 1565118 / 1565118 / 156511842: 1662 / 67e / 1662true: 3569038 / 36758e / 3569038\"true\": 3569038 / 36758e / 3569038false: 97196323 / 5cb1923 / 97196323\"false\": 97196323 / 5cb1923 / 97196323null: 3392903339290333c587\"null\": 3392903 / 33c587 / 3392903undefined: 0 / 0 / 0\"undefined\": -1038130864 / -3de09eb0 / -1038130864\"\": 0 / 0 / 0[]: 0 / 0 / 0[1,2]: 48503 / bd77 / 48503[3,4]: 50427 / c4fb / 50427{}: -1074417128 / -400a4de8 / -1074417128{a:1}: -1074417128 / -400a4de8 / -1074417128{b:2}: -1074417128 / -400a4de8 / -1074417128str variable: -313568218 / -12b0abda / -313568218str variable + b64Encode: LTMxMzU2ODIxOA== / LTEyYjBhYmRh / LTMxMzU2ODIxOA==str variable + b64Encode + b64Decode: -313568218 / -12b0abda / -313568218",
  "-0.578: " + CEL.javaHash(-0.578) + " / " + CEL.javaHash(-0.578,true) + " / " + CEL.javaHash(-0.578,false)
    + "0: " + CEL.javaHash(0) + " / " + CEL.javaHash(0,true) + " / " + CEL.javaHash(0,false) + " / "
    + "3.14: " + CEL.javaHash(3.14) + " / " + CEL.javaHash(3.14) + " / " + CEL.javaHash(3.14,false)
    + "42: " + CEL.javaHash(42) + " / " + CEL.javaHash(42,true) + " / " + CEL.javaHash(42,false)
    + "true: " + CEL.javaHash(true)  + " / " + CEL.javaHash(true,true)  + " / " + CEL.javaHash(true,false)
    + "\"true\": " + CEL.javaHash("true") + " / " + CEL.javaHash("true",true) + " / " + CEL.javaHash("true",false)
    + "false: " + CEL.javaHash(false) + " / " + CEL.javaHash(false,true) + " / " + CEL.javaHash(false,false)
    + "\"false\": " + CEL.javaHash("false") + " / " + CEL.javaHash("false",true) + " / " + CEL.javaHash("false",false)
    + "null: " + CEL.javaHash(null) + CEL.javaHash(null) + CEL.javaHash(null,true,false)
    + "\"null\": " + CEL.javaHash("null") + " / " + CEL.javaHash("null",true) + " / " + CEL.javaHash("null",false)
    + "undefined: " + CEL.javaHash(undefined) + " / " + CEL.javaHash(undefined,true) + " / " + CEL.javaHash(undefined,false)
    + "\"undefined\": " + CEL.javaHash("undefined") + " / " + CEL.javaHash("undefined",true) + " / " + CEL.javaHash("undefined",false)
    + "\"\": " + CEL.javaHash("") + " / " + CEL.javaHash("",true) + " / " + CEL.javaHash("",false)
    + "[]: " + CEL.javaHash([]) + " / " + CEL.javaHash([],true) + " / " + CEL.javaHash([],false)
    + "[1,2]: " + CEL.javaHash([1,2]) + " / " + CEL.javaHash([1,2],true) + " / " + CEL.javaHash([1,2],false)
    + "[3,4]: " + CEL.javaHash([3,4]) + " / " + CEL.javaHash([3,4],true) + " / " + CEL.javaHash([3,4],false)
    + "{}: " + CEL.javaHash({}) + " / " + CEL.javaHash({},true) + " / " + CEL.javaHash({},false)
    + "{a:1}: " + CEL.javaHash({a:1}) + " / " + CEL.javaHash({a:1},true) + " / " + CEL.javaHash({a:1},false)
    + "{b:2}: " + CEL.javaHash({b:2}) + " / " + CEL.javaHash({b:2},true) + " / " + CEL.javaHash({b:2},false)
    + "str variable: " + CEL.javaHash(kayleeStr) + " / " + CEL.javaHash(kayleeStr,true) + " / " + CEL.javaHash(kayleeStr,false)
    + "str variable + b64Encode: " + CEL.b64Encode(CEL.javaHash(kayleeStr)) + " / " + CEL.b64Encode(CEL.javaHash(kayleeStr,true)) + " / " + CEL.b64Encode(CEL.javaHash(kayleeStr,false))
    + "str variable + b64Encode + b64Decode: " + CEL.b64Decode(CEL.b64Encode(CEL.javaHash(kayleeStr))) + " / " + CEL.b64Decode(CEL.b64Encode(CEL.javaHash(kayleeStr,true))) + " / " + CEL.b64Decode(CEL.b64Encode(CEL.javaHash(kayleeStr,false)))
);

var FPObject = {a: 2, b: 3, c: 4};

CUT.isEqual("sizeIn();", "" + CEL.sizeIn(FPObject) + CEL.sizeIn({}), "30");

var forInStr = "";
CEL.forIn(FPObject, (e) => forInStr += (e*2) );
CUT.isEqual("forIn();", "468", forInStr);
CUT.isEqual("forIn(); return value",FPObject,CEL.forIn(FPObject,function(){}));

CUT.isEqual("filterIn();", "{\"b\":2,\"c\":3}",
  JSON.stringify( CEL.filterIn({"a": 1, "b": 2, "c": 3},(v, p, o) => (v>1)) ) );

CUT.isEqual("popIn();","1undefined",""+CEL.popIn({"a":1},"a")+CEL.popIn({},"a"));

CUT.isEqual("getDoNotTrack();", true,
  CEL.getDoNotTrack() === true || CEL.getDoNotTrack() === false );

CUT.isTrue("strPropercase();",
  CEL.strPropercase("arthur conan doyle") === "Arthur Conan Doyle" &&
  CEL.strPropercase("arthur conan   doyle") === "Arthur Conan   Doyle" );
CUT.isTrue("strTitlecase();",
  CEL.strTitlecase("arthur conan doyle") === "Arthur Conan Doyle" &&
  CEL.strTitlecase("arthur conan   doyle") === "Arthur Conan   Doyle" );

CUT.isEqual("strCapitalize();", CEL.strCapitalize("lorEm Ipsum"),"Lorem ipsum");

CUT.isEqual("strUpFirst();", CEL.strUpFirst("lorEm Ipsum"), "LorEm Ipsum");

CUT.isEqual("strDownFirst();", CEL.strDownFirst("LorEm Ipsum"), "lorEm Ipsum");

CUT.isEqual("strHTMLRemoveTags();","lorem ipsum dolor sit amet , consectetuer",
  CEL.strHTMLRemoveTags("<p><img src=\"x.js\" /><img src=\"x.js\"/><img src=\"x.js\">lorem</p><p><a href=\"#\"><b>ipsum<br /><br/><br>dolor</b></a><script src=\"x.js\"></script></p>< p>< img src=\"x.js\" />< img src=\"x.js\"/>< img src=\"x.js\">sit< /p>< p>< a href=\"#\">< b>amet< br />< br/>< br>, consectetuer< /b>< / b>< /a>< script src=\"x.js\">< /script>< /p>")
);

var strReverseRes = CEL.strReverse("I've seen things you people wouldn't believe. Attack ships on fire off the shoulder of Orion. I watched C-beams glitter in the dark near the Tannhäuser Gate. All those moments will be lost in time, like tears in rain. Time to die.");
CUT.isEqual("strReverse(); without unicode",
  ".eid ot emiT .niar ni sraet ekil ,emit ni tsol eb lliw stnemom esoht llA .etaG resuähnnaT eht raen krad eht ni rettilg smaeb-C dehctaw I .noirO fo redluohs eht ffo erif no spihs kcattA .eveileb t'ndluow elpoep uoy sgniht nees ev'I",
  strReverseRes
);
var strReverseRes = CEL.strReverse("I've seen things you people wouldn't believe. \uD834\uDF06 Attack ships on fire off the shoulder of Orion.");
CUT.isEqual("strReverse(); with unicode 1",
  ".noirO fo redluohs eht ffo erif no spihs kcattA \uD834\uDF06 .eveileb t'ndluow elpoep uoy sgniht nees ev'I",
  strReverseRes
);

const testUnicodeStr22222 = "foo \uD834\uDF06 bar \uD835\uDC01 baz";
CUT.isEqual("strCodePoints();",
  "[102,111,111,32,119558,32,98,97,114,32,119809,32,98,97,122]",
  JSON.stringify(CEL.strCodePoints(testUnicodeStr22222)) );
CUT.isEqual("strFromCodePoints(); + strCodePoints();", testUnicodeStr22222,
  CEL.strFromCodePoints(CEL.strCodePoints(testUnicodeStr22222)) );

CUT.isTrue("strAt();",
  CEL.strAt("\uD834\uDF06 ab cd",0) === "\uD834\uDF06"
    // get
    && CEL.strAt("ab \uD834\uDF06 cd", 3) === "\uD834\uDF06"
    && CEL.strAt("ab cd \uD834\uDF06", -1) === "\uD834\uDF06"
    && CEL.strAt("ab \uD834\uDF06 cd", 0) === "a"
    && CEL.strAt("ab \uD834\uDF06 cd", 5) === "c"
    && CEL.strAt("ab \uD834\uDF06 cd", -1) === "d"
    && CEL.strAt("", 0) === ""
    && CEL.strAt("", 3) === ""
    && CEL.strAt("", -1) === ""
    // set
    && CEL.strAt("ab \uD834\uDF06 cde", 3, "X") === "ab X cde"
    && CEL.strAt("ab \uD834\uDF06 cde", -5, "X") === "ab X cde"
    && CEL.strAt("ab \uD834\uDF06 cde", -2, "X") === "ab \uD834\uDF06 cXe"
    && CEL.strAt("ab \uD834\uDF06 cde", 13, "X") === "ab \uD834\uDF06 cde"
    && CEL.strAt("ab \uD834\uDF06 cde", -13, "X") === "ab \uD834\uDF06 cde"
    && CEL.strAt("ab \uD834\uDF06 cde", 3, "") === "ab  cde"
    && CEL.strAt("ab \uD834\uDF06 cde", -2, "") === "ab \uD834\uDF06 ce"
    && CEL.strAt("ab \uD834\uDF06 cde", 12, "") === "ab \uD834\uDF06 cde"
    && CEL.strAt("ab \uD834\uDF06 cde", -12, "") === "ab \uD834\uDF06 cde"
);


CUT.isTrue("strSplice();",
  CEL.strSplice("\uD834\uDF06 ab cde",0, 10) === ""
    && CEL.strSplice("ab \uD834\uDF06 cde", 4, 1) === "ab \uD834\uDF06cde"
    && CEL.strSplice("ab \uD834\uDF06 cde", 4, 1, "X") === "ab \uD834\uDF06Xcde"
    && CEL.strSplice("ab \uD834\uDF06 cde", 4, 1, "X", "Y") === "ab \uD834\uDF06XYcde"
    && CEL.strSplice("ab \uD834\uDF06 cde", 4, 2, "X", "Y") === "ab \uD834\uDF06XYde"
    && CEL.strSplice("ab \uD834\uDF06 cde", 5, 2, "") === "ab \uD834\uDF06 e"
);

var FPArray = [1,2,3];

CUT.isEqual("unBind();", true,
  Array.isArray(CEL.unBind([].slice)(document.querySelectorAll("h3")))
);

CUT.isTrue("bind();",CEL.bind(document.querySelectorAll,document)("h3").length>0);
CUT.isEqual("constant();", 3.14, CEL.constant(3.14)());
CUT.isEqual("identity();", 100, CEL.identity(60) + CEL.identity(40));
CUT.isEqual("noop();", undefined, CEL.noop());
CUT.isTrue("T();", CEL.T());
CUT.isFalse("F();", CEL.F());

CUT.isEqual("strHTMLEscape();",
  "&lt;a href=&quot;#&quot; target=&quot;_blank&quot;&gt;&amp;#64;echo&amp;#65;&lt;/a&gt;&apos;str2&apos;",
  CEL.strHTMLEscape('<a href="#" target="_blank">&#64;echo&#65;</a>\'str2\'')
);

CUT.isEqual("strHTMLUnEscape();",
  '<a href="#" target="_blank">&#64;echo&#65;</a>\'str2\'',
  CEL.strHTMLUnEscape("&lt;a href=&quot;#&quot; target=&quot;_blank&quot;&gt;&amp;#64;echo&amp;#65;&lt;/a&gt;&apos;str2&#39;")
);

CUT.isEqual("domGetCSSVar(); and domSetCSSVar(); without prefix 1", "",
  CEL.domGetCSSVar("testVar1"));
CEL.domSetCSSVar("testVar1","value1");
CUT.isEqual("domGetCSSVar(); and domSetCSSVar(); without prefix 2 - " + CEL.domGetCSSVar("testVar1"), "value1",
  CEL.domGetCSSVar("testVar1"));
CUT.isEqual("domGetCSSVar(); and domSetCSSVar(); with prefix 1 - " + CEL.domGetCSSVar("--testVar2"), "",
  CEL.domGetCSSVar("--testVar2"));
CEL.domSetCSSVar("--testVar2","value2");
CUT.isEqual("domGetCSSVar(); and domSetCSSVar(); with prefix 2 - " + CEL.domGetCSSVar("--testVar2"), "value2",
  CEL.domGetCSSVar("--testVar2"));

CUT.addElement( CEL.domCreate("p",
  {"id": "domTestElement", style: {"width": "250px"} }, "DOM test element"));
var domTestElement = CEL.qs("#domTestElement");

CUT.isTrue("domCreate(); with style object", CEL.isElement(domTestElement));
CUT.isTrue("domCreate(); with style string",
  CEL.isElement(CEL.domCreate("p", {"id": "domTestElement", style: "width: 250px; color: blue;" }, "DOM test element"))
);

CUT.isTrue("domCreate(object); with style object", CEL.isElement(CEL.domCreate({ elementType: "p", "id": "domTestElementObject", style: {"width": "250px"}, innerHTML: "DOM test element" })));
CUT.isTrue("domCreate(object); with style string", CEL.isElement(CEL.domCreate({ elementType: "p", "id": "domTestElementObject", style: "width: 250px; color: blue;", innerHTML: "DOM test element" })));

CUT.isTrue("domToElement(); simple element",
  CEL.isElement(CEL.domToElement("<div>Hello world!</div>")));

CUT.isTrue("domToElement(); complex element",
  CEL.isElement(CEL.domToElement("<p><span style=\"background-color: yellow; color: blue;\">Hello</span> <span style=\"background-color: blue; color: yellow;\">world</span>!</p>").firstElementChild)
);

CEL.domSetCSS(domTestElement, "width", "300px");
CUT.isEqual("domSetCSS(); property and domGetCSS(); - (300px) - " + CEL.domGetCSS(domTestElement, "width"), "300px",
  CEL.domGetCSS(domTestElement, "width"));
CEL.domSetCSS(domTestElement, {"width": "350px", "font-weight": "bold"});
CUT.isEqual("domSetCSS(); properties object and domGetCSS(); - (350px) - " + CEL.domGetCSS(domTestElement, "width"),
  "350px", CEL.domGetCSS(domTestElement, "width"));
CUT.isEqual("domSetCSS(); properties object and domGetCSS() object; (350px)- " + CEL.domGetCSS(domTestElement)["width"],
  "350px", CEL.domGetCSS(domTestElement)["width"]);

CEL.domHide(domTestElement);
CUT.isEqual("domHide();", "none", CEL.domGetCSS(domTestElement, "display"));

CEL.domShow(domTestElement);
CUT.isEqual("domShow();", "block", CEL.domGetCSS(domTestElement, "display"));

CEL.domHide(domTestElement);
CEL.domShow(domTestElement, "inline-block");
CUT.isEqual("domShow(); inline-block", "inline-block",
  CEL.domGetCSS(domTestElement, "display"));

CEL.domToggle(domTestElement);
CUT.isEqual("domToggle(); hide", "none",
  CEL.domGetCSS(domTestElement, "display"));

CEL.domToggle(domTestElement);
CUT.isEqual("domToggle(); show", "block",
  CEL.domGetCSS(domTestElement, "display"));

CEL.domToggle(domTestElement, "inline-block");
CUT.isEqual("domToggle(); hide inline-block", "none",
  CEL.domGetCSS(domTestElement, "display"));

CEL.domToggle(domTestElement, "inline-block");
CUT.isEqual("domHide(); show inline-block", "inline-block",
  CEL.domGetCSS(domTestElement, "display"));

CEL.domShow(domTestElement);
CUT.isFalse("domIsHidden(); false", CEL.domIsHidden(domTestElement));
CEL.domHide(domTestElement);
CUT.isTrue("domIsHidden(); true", CEL.domIsHidden(domTestElement));

CUT.addElement(
  CEL.domCreate("div", {"id": "dsDiv"},
    '<p id="dsDivP1">#dsDivP1</p>' +'<p id="dsDivP2">#dsDivP2</p>'
      +'<p id="dsDivP3">#dsDivP3</p>' +'<p id="dsDivP4">#dsDivP4</p>'
      +'<p id="dsDivP5">#dsDivP5</p>'
  )
);
var dsArray = CEL.domSiblings(CEL.qs("#dsDivP3"));
CUT.isTrue("domSiblings();", (
  Array.isArray(dsArray) && dsArray.length === 4
    && dsArray[0].innerHTML === "#dsDivP1" && dsArray[1].innerHTML==="#dsDivP2"
    && dsArray[2].innerHTML === "#dsDivP4" && dsArray[3].innerHTML==="#dsDivP5"
));
var dsArray = CEL.domSiblingsPrev(CEL.qs("#dsDivP3"));
CUT.isTrue("domSiblingsPrev();", (
  Array.isArray(dsArray) && dsArray.length === 2
    && dsArray[0].innerHTML === "#dsDivP1" && dsArray[1].innerHTML==="#dsDivP2"
));
var dsArray = CEL.domSiblingsLeft(CEL.qs("#dsDivP3"));
CUT.isTrue("domSiblingsLeft();", (
  Array.isArray(dsArray) && dsArray.length === 2
    && dsArray[0].innerHTML === "#dsDivP1" && dsArray[1].innerHTML==="#dsDivP2"
));
var dsArray = CEL.domSiblingsNext(CEL.qs("#dsDivP3"));
CUT.isTrue("domSiblingsNext();", (
  Array.isArray(dsArray) && dsArray.length === 2
    && dsArray[0].innerHTML === "#dsDivP4" && dsArray[1].innerHTML==="#dsDivP5"
));
var dsArray = CEL.domSiblingsRight(CEL.qs("#dsDivP3"));
CUT.isTrue("domSiblingsRight();", (
  Array.isArray(dsArray) && dsArray.length === 2
    && dsArray[0].innerHTML === "#dsDivP4" && dsArray[1].innerHTML==="#dsDivP5"
));
CEL.qs("#dsDiv").remove();


/* Collections API */

CUT.addElement("hr");
CUT.addElement("h3", "Collections");

CUT.isTrue("count();",
  CEL.count([1,2,3,4,5,6,7], (x) => x > 3) === 4
    && CEL.count([1,2,3], (x) => x > 3) === 0
    && CEL.count([4,5,6], (x) => x > 3) === 3
);

var arrayDeepCloneA1 = [[0, 1, [2]], [4, 5, [6]]];
var arrayDeepCloneA2 = CEL.arrayDeepClone(arrayDeepCloneA1);
CUT.isTrue("arrayDeepClone();",
  JSON.stringify(arrayDeepCloneA1) === JSON.stringify(arrayDeepCloneA2)
    && !(arrayDeepCloneA1          === arrayDeepCloneA2)
    && !(arrayDeepCloneA1[0]       === arrayDeepCloneA2[0])
    &&  (arrayDeepCloneA1[0][0]    === arrayDeepCloneA2[0][0])
    &&  (arrayDeepCloneA1[0][1]    === arrayDeepCloneA2[0][1])
    && !(arrayDeepCloneA1[0][2]    === arrayDeepCloneA2[0][2])
    &&  (arrayDeepCloneA1[0][2][0] === arrayDeepCloneA2[0][2][0])
    && !(arrayDeepCloneA1[1]       === arrayDeepCloneA2[1])
    &&  (arrayDeepCloneA1[1][0]    === arrayDeepCloneA2[1][0])
    &&  (arrayDeepCloneA1[1][1]    === arrayDeepCloneA2[1][1])
    && !(arrayDeepCloneA1[1][2]    === arrayDeepCloneA2[1][2])
    &&  (arrayDeepCloneA1[1][2][0] === arrayDeepCloneA2[1][2][0])
);

var arrayCreateArr = CEL.arrayCreate(4);
CUT.isTrue("arrayCreate(); return array 4",
  Array.isArray(arrayCreateArr) && arrayCreateArr.length === 4);
var arrayCreateArr = CEL.arrayCreate(0);
CUT.isTrue("arrayCreate(); return array 0",
  Array.isArray(arrayCreateArr) && arrayCreateArr.length === 0);
var arrayCreateArr = CEL.arrayCreate(-0);
CUT.isTrue("arrayCreate(); return array -0",
  Array.isArray(arrayCreateArr) && arrayCreateArr.length === 0);
var arrayCreateArr = CEL.arrayCreate("5");
CUT.isTrue("arrayCreate(); return array \"5\"",
  Array.isArray(arrayCreateArr) && arrayCreateArr.length === 5);
var arrayCreateArr = CEL.arrayCreate(true);
CUT.isTrue("arrayCreate(); return array true",
  Array.isArray(arrayCreateArr) && arrayCreateArr.length === 1);
var arrayCreateArr = CEL.arrayCreate(false);
CUT.isTrue("arrayCreate(); return array false",
  Array.isArray(arrayCreateArr) && arrayCreateArr.length === 0);
var arrayCreateArr = CEL.arrayCreate(4294967295);
CUT.isTrue("arrayCreate(); return array 4294967295 max size",
  Array.isArray(arrayCreateArr) && arrayCreateArr.length === 4294967295);
var arrayCreateArr = CEL.arrayCreate();
CUT.isTrue("arrayCreate(); return array without parameter",
  Array.isArray(arrayCreateArr) && arrayCreateArr.length === 0);

CUT.isEqual("withOut();",
  JSON.stringify(CEL.withOut(["a","b","c","d"], ["b","d"])), "[\"a\",\"c\"]");

var arrPartition = [-5, 2, -9, 7, 34];
CUT.isEqual("partition();",
  JSON.stringify(CEL.partition(arrPartition, (e)=> (e>0) )),"[[2,7,34],[-5,-9]]"
);

var strGroup = JSON.stringify( CEL.group([1,2,3,4,5],
  (i) => (i % 2 === 0 ? "even" : "odd")));
CUT.isTrue("group(); 1", strGroup === "{\"odd\":[1,3,5],\"even\":[2,4]}"
  || strGroup === "{\"even\":[2,4],\"odd\":[1,3,5]}");

var RESGroupToMap=CEL.group([1,2,3,4,5], (i)=>(i%2===0?"even":"odd"), true);
CUT.isTrue("group(); 2 map",
  Object.prototype.toString.call(RESGroupToMap).slice(8, -1).toLowerCase()
    === "map"
    && RESGroupToMap.size === 2
    && RESGroupToMap.has("even")
    && RESGroupToMap.has("odd")
    && JSON.stringify(RESGroupToMap.get("even")) === "[2,4]"
    && JSON.stringify(RESGroupToMap.get("odd")) === "[1,3,5]"
);

CUT.isTrue("initial();",
  CEL.isSameArray(CEL.initial(["a","b","c","d"]), ["a","b","c"]) );

var sum = "";
for (let x of CEL.iterRange(10, 3, 20)) { sum += x; }
CUT.isEqual("iterRange(); integer", "10131619", sum);
sum = "";
for (let x of CEL.iterRange(10, 3.5, 20)) { sum += x; }
CUT.isEqual("iterRange(); float", "1013.517", sum);

sum = "";
for (let x of CEL.iterCycle(["a", "b", "c"], 4)) { sum += x; }
CUT.isEqual("iterCycle(); array", "abcabcabcabc", sum);
sum = "";
for (let x of CEL.iterCycle(CEL.iterRange(10, 3, 20), 3)) { sum += x; }
CUT.isEqual("iterCycle(); + iterRange();", "101316191013161910131619", sum);
sum = "";
var itrr1 = CEL.iterCycle(['A', 'B'].values());
for (let i = 0; i < 7; i++) { sum += itrr1.next().value; }
CUT.isEqual("iterCycle(); infinity", "ABABABA", sum);

sum = "";
for (let x of CEL.iterRepeat("HW", 5)) { sum += x; }
CUT.isEqual("iterRepeat();", "HWHWHWHWHW", sum);
sum = "";
var itrr2 = CEL.iterRepeat('HW2');
for (let i = 0; i < 3; i++) { sum += itrr2.next().value; }
CUT.isEqual("iterRepeat(); infinity", "HW2HW2HW2", sum);


var FPArray = [1,2,3];

var forEachStr = "";
CEL.forEach(FPArray, function (e) { forEachStr += (e*2); });
CUT.isEqual("forEach(); 1 ES5 Array", "246", forEachStr);
forEachStr = "";
CEL.forEach("cat, dog, pig", function (e) { forEachStr += e.toUpperCase(); });
CUT.isEqual("forEach(); 2 ES5 String", "CAT, DOG, PIG", forEachStr);
var forEachCount = 0;
CEL.forEach(document.querySelectorAll("h3"), function (e) { forEachCount++; });
CUT.isEqual("forEach(); 3 ES5 Nodelist",
  document.querySelectorAll("h3").length, forEachCount
);
forEachStr = "";
CEL.forEach(new Map([ ["foo", 3.14], ["bar", 42], ["baz", "Wilson"] ]),
  function (e,i) { forEachStr += i + "-" + e + "-"; });
CUT.isEqual("forEach(); 5 ES6 Map", "0-foo,3.14-1-bar,42-2-baz,Wilson-",
  forEachStr);
forEachCount = 0;
CEL.forEach(new Set([4,5,6]), function (e) { forEachCount += (e*3); });
CUT.isEqual("forEach(); 6 ES6 Set", 45, forEachCount);
forEachCount = 0;
CEL.forEach((new Set([4,5,6])).values(), function (e) { forEachCount+=(e*3); });
CUT.isEqual("forEach(); 7 ES6 Set values(); iterator", 45, forEachCount);

var forEachStr = "";
CEL.forEachRight(FPArray, function (e) { forEachStr += (e*2); });
CUT.isEqual("forEachRight();", "642", forEachStr);

var mapStr = "";
for (let item of CEL.map([1,2,3], function(e){ return e*2; })){ mapStr += item;}
CUT.isEqual("map(); 1 ES5 Array", "246", mapStr);
var mapStr = "";
for (let item of CEL.map("cat, dog, pig", function (e) {
  return e.toUpperCase(); })) {mapStr += item;}
CUT.isEqual("map(); 2 ES5 String", "CAT, DOG, PIG", mapStr);

var mapNL = [];
for (let item of CEL.map(document.querySelectorAll("h3"),
  function (e) { return e; })) { mapNL.push(item); }
CUT.isTrue("map(); 3 ES5 Nodelist",
  Array.isArray(mapNL) && mapNL.every(function(e){ return CEL.isElement(e); }));
var mapStr = "";
for (let item of CEL.map(
  new Map([ ["foo", 1], ["bar", 2], ["baz", 3] ]),
  function(e) { return [ e[0], e[1]*2 ]; }
)) { mapStr += item[0] + item[1]; }
CUT.isEqual("map(); 5 ES6 Map", "foo2bar4baz6", mapStr);
var mapStr = "";
for (let item of CEL.map(new Set([1,2,3]), function(e) { return e*2; })) {
  mapStr += item;
}
CUT.isEqual("map(); 6 ES6 Set", "246", mapStr);
var mapStr = "";
for (let item of CEL.map((new Set([1,2,3])).values(),
  function(e) { return e*3; })) { mapStr += item; }
CUT.isEqual("map(); 7 ES6 Set values(); iterator", "369", mapStr);


var FParray2 = ["A","B","C","D","E","F","G","H","I","J"];

var iterStr = "";
for (let item of CEL.take(FParray2, 0)) { iterStr += item; }
CUT.isEqual("take(); - step 1 - 0", "", iterStr);
var iterStr = "";
for (let item of CEL.take(FParray2, 7)) { iterStr += item; }
CUT.isEqual("take(); - step 2 - 7", "ABCDEFG", iterStr);
var iterStr = "";
for (let item of CEL.take(FParray2, 12)) { iterStr += item; }
CUT.isEqual("take(); - step 3 - 12", "ABCDEFGHIJ", iterStr);
var iterStr = "";
for (let item of CEL.take(FParray2)) { iterStr += item; }
CUT.isEqual("take(); - step 4 - default 1", "A", iterStr);

var iterStr = "";
for (let item of CEL.drop(FParray2, 0)) { iterStr += item; }
CUT.isEqual("drop(); - step 1 - 0", "ABCDEFGHIJ", iterStr);
var iterStr = "";
for (let item of CEL.drop(FParray2, 7)) { iterStr += item; }
CUT.isEqual("drop(); - step 2 - 7", "HIJ", iterStr);
var iterStr = "";
for (let item of CEL.drop(FParray2, 12)) { iterStr += item; }
CUT.isEqual("drop(); - step 3 - 12", "", iterStr);
var iterStr = "";
for (let item of CEL.drop(FParray2)) { iterStr += item; }
CUT.isEqual("drop(); - step 4 - default 1", "BCDEFGHIJ", iterStr);


var FPArray3 = [1,2,3,4,5,6,7,8,9,10];

var iterStr = "";
for (let item of CEL.filter(FPArray3, (v) => (v>3 && v<9))) { iterStr += item; }
CUT.isEqual("filter();", "45678", iterStr);

var iterStr = "";
for (let item of CEL.reject(FPArray3, (v) => (v>3 && v<9))) { iterStr += item; }
CUT.isEqual("reject();", "123910", iterStr);

var iterStr = "";
for (let item of CEL.slice(FPArray3,0,4)) { iterStr += item; }
CUT.isEqual("slice(); - step 1 - 0 to 4", "12345", iterStr);
var iterStr = "";
for (let item of CEL.slice(FPArray3,5)) { iterStr += item; }
CUT.isEqual("slice(); - step 2 - 5 to Infinity", "678910", iterStr);
var iterStr = "";
for (let item of CEL.slice(FPArray3,4,8)) { iterStr += item; }
CUT.isEqual("slice(); - step 3 - 4 to 8", "56789", iterStr);
var iterStr = "";
for (let item of CEL.slice(FPArray3)) { iterStr += item; }
CUT.isEqual("slice(); - step 4 - all", "12345678910", iterStr);

var iterStr = "";
for (let item of CEL.tail(FPArray3)) { iterStr += item; }
CUT.isEqual("tail();", "2345678910", iterStr);

var whileArray = [0,2,4,6,8,10,12,14,16];

var whileSum = 0;
for (let item of CEL.takeWhile(whileArray, (e) => (e<10))) { whileSum += item; }
CUT.isEqual("takeWhile(); values", whileSum, 20);
whileSum = 0;
for (let item of CEL.takeWhile(whileArray, (e) => (e<0))) { whileSum += item; }
CUT.isEqual("takeWhile(); empty list", whileSum, 0);
whileSum = 0;
for (let item of CEL.takeWhile(whileArray, (e) => (e<30))) { whileSum += item; }
CUT.isEqual("takeWhile(); full list", whileSum, 72);

whileSum = 0;
for (let item of CEL.dropWhile(whileArray, (e) => (e<10))) { whileSum += item; }
CUT.isEqual("dropWhile(); values", whileSum, 52);
whileSum = 0;
for (let item of CEL.dropWhile(whileArray, (e) => (e<30))) { whileSum += item; }
CUT.isEqual("dropWhile(); empty list", whileSum, 0);
whileSum = 0;
for (let item of CEL.dropWhile(whileArray, (e) => (e<0))) { whileSum += item; }
CUT.isEqual("dropWhile(); full list", whileSum, 72);

CUT.isEqual("item(); string unicode",
  CEL.item("foo \uD834\uDF06 bar", 4)
    + CEL.item("foo \uD834\uDF06 bar", 8)
    + CEL.item("foo \uD834\uDF06 bar", 12),
  "\uD834\uDF06" + "r" + "undefined"
);
var itemOfArray = [4,5,6,7,8];
CUT.isEqual("item(); array",
  "" + CEL.item(itemOfArray, 3) + CEL.item(itemOfArray, 12), "7" + "undefined");
var itemOfMap = new Map([ ["a",1], ["b",2], ["c",3] ]);
CUT.isEqual("item(); map",
  JSON.stringify(CEL.item(itemOfMap, 1)) + CEL.item(itemOfMap, 12),
  "[\"b\",2]undefined");
var itemOfSet = new Set([3,3,4,5,5,6,7,7,8]);
CUT.isEqual("item(); set",
  ""+JSON.stringify(CEL.item(itemOfSet,3))+CEL.item(itemOfSet,12),"6undefined");

var itemOfArray = [4,5,6,7,8];
CUT.isEqual("nth();", "" + CEL.nth(itemOfArray, 3) + CEL.nth(itemOfArray, 12),
  "7undefined");

var sizeLastArray = [4,5,6,7,8,"last"];
CUT.isEqual("size();", 6, CEL.size(sizeLastArray));
CUT.isEqual("first();", 4, CEL.first(sizeLastArray));
CUT.isEqual("head();", 4, CEL.head(sizeLastArray));
CUT.isEqual("last();", "last", CEL.last(sizeLastArray));

var reverseSortArray = ["first",4,5,6,7,8,9,"last"];

CUT.isEqual("reverse();", "[\"last\",9,8,7,6,5,4,\"first\"]",
  JSON.stringify([...CEL.reverse(reverseSortArray)]) );

CUT.isEqual("sort(); without numbers", "[4,5,6,7,8,9,\"first\",\"last\"]",
  JSON.stringify([...CEL.sort(reverseSortArray)]));
CUT.isEqual("sort(); with numbers", "[\"first\",4,5,6,7,8,9,\"last\"]",
  JSON.stringify([...CEL.sort(reverseSortArray, true)]) );
CUT.isEqual("sort(); numbers without numbers", "[1,10,7,9]",
  JSON.stringify([...CEL.sort([7,1,10,9])]) );
CUT.isEqual("sort(); numbers with numbers", "[1,7,9,10]",
  JSON.stringify([...CEL.sort([7,1,10,9], true)]) );

const shuffledReverseSortArray = CEL.shuffle(reverseSortArray);
CUT.isFalse("shuffle();",
  CEL.isSameArray(reverseSortArray, shuffledReverseSortArray) );

CUT.isTrue("includes(); true", CEL.includes(reverseSortArray, "last"));
CUT.isFalse("includes(); false", CEL.includes(reverseSortArray, "world"));

CUT.isTrue("contains(); true", CEL.contains(reverseSortArray, "last"));
CUT.isFalse("contains(); false", CEL.contains(reverseSortArray, "world"));

CUT.isEqual("find(); found", 6, CEL.find(reverseSortArray, (v) => (v > 5)));
CUT.isEqual("find(); not found", undefined,
  CEL.find(reverseSortArray, (v) => (v > 11)) );

CUT.isTrue("findLast();",
  CEL.findLast( [4,1,7,2,9], (v) => v < 5 ) === 2
    && CEL.findLast( [4,1,7,2,9], (v) => v > 10 ) === undefined
);

var everySomeNoneArray = [2,9,3,5,8];
var everySomeNoneEmptyArray = [];
CUT.isTrue("every(); true", CEL.every(everySomeNoneArray, (v) => v > 1));
CUT.isFalse("every(); false 1 - some", CEL.every(everySomeNoneArray, (v)=>v>3));
CUT.isFalse("every(); false 1 - none", CEL.every(everySomeNoneArray, (v)=>v<0));
CUT.isFalse("every(); false 3 - empty",
  CEL.every(everySomeNoneEmptyArray, (v) => v > 3));
CUT.isTrue("some(); true", CEL.some(everySomeNoneArray, (v) => v > 3));
CUT.isFalse("some(); false 1 - none", CEL.some(everySomeNoneArray, (v) => v<0));
CUT.isFalse("some(); false 2 - empty",
  CEL.some(everySomeNoneEmptyArray, (v) => v < 0));
CUT.isTrue("none(); true", CEL.none(everySomeNoneArray, (v) => v < 0));
CUT.isFalse("none(); false 1 - every",CEL.none(everySomeNoneArray, (v) => v>1));
CUT.isFalse("none(); false 2 - some",
  CEL.none(everySomeNoneArray, (v) => v > 3));
CUT.isFalse("none(); false 3 - empty",
  CEL.none(everySomeNoneEmptyArray, (v) => v > 3));


FParray2.reverse();

var iterStr = "";
for (let item of CEL.takeRight(FParray2, 0)) { iterStr += item; }
CUT.isEqual("takeRight(); - step 1 - 0", "", iterStr);
var iterStr = "";
for (let item of CEL.takeRight(FParray2, 7)) { iterStr += item; }
CUT.isEqual("takeRight(); - step 2 - 7", "ABCDEFG", iterStr);
var iterStr = "";
for (let item of CEL.takeRight(FParray2, 12)) { iterStr += item; }
CUT.isEqual("takeRight(); - step 3 - 12", "ABCDEFGHIJ", iterStr);
var iterStr = "";
for (let item of CEL.takeRight(FParray2)) { iterStr += item; }
CUT.isEqual("takeRight(); - step 4 - default 1", "A", iterStr);

var iterStr = "";
for (let item of CEL.dropRight(FParray2, 0)) { iterStr += item; }
CUT.isEqual("dropRight(); - step 1 - 0", "ABCDEFGHIJ", iterStr);
var iterStr = "";
for (let item of CEL.dropRight(FParray2, 7)) { iterStr += item; }
CUT.isEqual("dropRight(); - step 2 - 7", "HIJ", iterStr);
var iterStr = "";
for (let item of CEL.dropRight(FParray2, 12)) { iterStr += item; }
CUT.isEqual("dropRight(); - step 3 - 12", "", iterStr);
var iterStr = "";
for (let item of CEL.dropRight(FParray2)) { iterStr += item; }
CUT.isEqual("dropRight(); - step 4 - default 1", "BCDEFGHIJ", iterStr);


whileArray.reverse();

var whileSum = 0;
for (let item of CEL.takeRightWhile(whileArray, (e) => (e<10))){whileSum+=item;}
CUT.isEqual("takeRightWhile(); values", whileSum, 20);
whileSum = 0;
for (let item of CEL.takeRightWhile(whileArray, (e) => (e<0))) {whileSum+=item;}
CUT.isEqual("takeRightWhile(); empty list", whileSum, 0);
whileSum = 0;
for (let item of CEL.takeRightWhile(whileArray, (e) => (e<30))){whileSum+=item;}
CUT.isEqual("takeRightWhile(); full list", whileSum, 72);

whileSum = 0;
for (let item of CEL.dropRightWhile(whileArray, (e) => (e<10))){whileSum+=item;}
CUT.isEqual("dropRightWhile(); values", whileSum, 52);
whileSum = 0;
for (let item of CEL.dropRightWhile(whileArray, (e) => (e<30))){whileSum+=item;}
CUT.isEqual("dropRightWhile(); empty list", whileSum, 0);
whileSum = 0;
for (let item of CEL.dropRightWhile(whileArray, (e) => (e<0))) {whileSum+=item;}
CUT.isEqual("dropRightWhile(); full list", whileSum, 72);


CUT.isEqual("concat(); one","[4,5,6]",JSON.stringify([...CEL.concat([4,5,6])]));
CUT.isEqual("concat(); more", "[\"1\",\"2\",\"3\",4,5,6,7,8,9]",
  JSON.stringify([...CEL.concat("123", [4,5,6].values(), new Set([7,8,9]))])
);

var reduceArray = [4,5,6,7,8,9];
CUT.isEqual("reduce(); with initialvalue", 39,
  CEL.reduce(reduceArray.values(), (acc, v, i) => acc + v, 0) );
CUT.isEqual("reduce(); without initialvalue", 39,
  CEL.reduce(reduceArray.values(), (acc, v, i) => acc + v) );

CUT.isEqual("enumerate();",
  JSON.stringify([...CEL.enumerate(["Picard","Riker","Data"])]),
  "[[0,\"Picard\"],[1,\"Riker\"],[2,\"Data\"]]" );
CUT.isEqual("enumerate(); with offset",
  JSON.stringify([...CEL.enumerate(["Picard","Riker","Data"],2)]),
  "[[2,\"Picard\"],[3,\"Riker\"],[4,\"Data\"]]" );
CUT.isEqual("entries();",
  JSON.stringify([...CEL.entries(["Picard","Riker","Data"])]),
  "[[0,\"Picard\"],[1,\"Riker\"],[2,\"Data\"]]" );
CUT.isEqual("entries(); with offset",
  JSON.stringify([...CEL.entries(["Picard","Riker","Data"],2)]),
  "[[2,\"Picard\"],[3,\"Riker\"],[4,\"Data\"]]" );

CUT.isEqual("flat();", "[1,2,3,4,5,6,7,8,9]",
  JSON.stringify([...CEL.flat([[1,2,3].values(),
  new Set([4,5,6,6,7,7,4]),[8,9]])]) );

var joinSet = new Set([2,4,6,4,8,2]);
CUT.isEqual("join();",
  "2,4,6,8"+"2468"+"2;4;6;8"+"2abc4abc6abc8"+"2true4true6true8"+"2114116118",
  CEL.join(joinSet) + CEL.join(joinSet, "")
    + CEL.join(joinSet, ";") + CEL.join(joinSet, "abc")
    + CEL.join(joinSet, true) + CEL.join(joinSet, 11) );
CUT.isEqual("join(); - empty", "", CEL.join([]))

var FPArray = [1,2,3];

CUT.isEqual("arrayCycle(); - ES5 1 - with 2 parameters",
  "[4,true,\"fgh\",3.14,4,true,\"fgh\",3.14,4,true,\"fgh\",3.14,4,true,\"fgh\",3.14,4,true,\"fgh\",3.14,4,true,\"fgh\",3.14,4,true,\"fgh\",3.14]",
  JSON.stringify(CEL.arrayCycle([4,true,"fgh",3.14], 7)) );
CUT.isEqual("arrayCycle(); - ES5 2 - with default parameter (n = 100);",
  "[4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6]",
  JSON.stringify(CEL.arrayCycle([4,5,6])) );
CUT.isEqual("arrayCycle(); - ES6 1 - ES5 1 - with 2 parameters",
  "[2,3,4,2,3,4,2,3,4,2,3,4,2,3,4,2,3,4,2,3,4,2,3,4,2,3,4,2,3,4]",
  JSON.stringify(CEL.arrayCycle(new Map([ [2,3],[3,4],[4,5] ]).keys(), 10)) );
CUT.isEqual("arrayCycle(); - ES6 2 - with default parameter (n = 100);",
  "[[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5]]",
  JSON.stringify(CEL.arrayCycle(new Map([ [2,3],[3,4],[4,5] ]).entries()))
);

CUT.isEqual("arrayRepeat(); - 1 - with 2 parameters",
  "[\"abc\",\"abc\",\"abc\",\"abc\",\"abc\",\"abc\",\"abc\",\"abc\"]",
  JSON.stringify(CEL.arrayRepeat("abc", 8))
);
CUT.isEqual("arrayRepeat(); - 2 - with default parameter (n = 100);",
  "[3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14]",
  JSON.stringify(CEL.arrayRepeat(3.14))
);

CUT.isEqual("arrayRange(); - 1 - step default 1",
  "[5,6,7,8,9,10,11,12]", JSON.stringify(CEL.arrayRange(5,12)) );
CUT.isEqual("arrayRange(); - 2 - step 3",
  "[1,4,7,10,13,16]", JSON.stringify(CEL.arrayRange(1,16,3)) );
CUT.isEqual(
  "arrayRange(); - 3 - step 3.2 <i>(can be failed - float storage)<i>",
  "[1,4.2,7.4,10.600000000000001,13.8,17]",
  JSON.stringify(CEL.arrayRange(1,17,3.2))
);
CUT.isEqual("arrayRange(); - 4 - without parameters",
  "[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99]",
  JSON.stringify(CEL.arrayRange())
);
CUT.isEqual("arrayRange(); - 4 - with 1 parameter",
  "[42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99]",
  JSON.stringify(CEL.arrayRange(42))
);

var a = ["a","b","c","d"];
var b = [3,4,5,6,7,8,9];
var zipA = ["a1","a2","a3"];
var zipB = ["b1","b2","b3"];
var zipC = ["c1","c2","c3","c4","c5"];
var zipD = ["d1","d2"];
var zipE = ["e1","e2","e3","e4"];
var zipF = ["a","b","c","d"];
CUT.isEqual("zip(); ES5 1","[[\"a1\",\"c1\"],[\"a2\",\"c2\"],[\"a3\",\"c3\"]]",
  JSON.stringify(CEL.zip(zipA, zipC)));
CUT.isEqual("zip(); ES5 2",
  "[[\"a1\",\"b1\",\"c1\",\"d1\",\"e1\"],[\"a2\",\"b2\",\"c2\",\"d2\",\"e2\"]]",
  JSON.stringify(CEL.zip(zipA, zipB, zipC, zipD, zipE))
);
CUT.isEqual("zip(); ES6 1", "[[\"a\",3],[\"b\",4],[\"c\",5],[\"d\",6]]",
  JSON.stringify(CEL.zip(
    new Set(a), new Map([ [2,3],[3,4],[4,5],[5,6],[6,7],[7,8],[8,9] ]).values()
 ))
);
CUT.isEqual("zip(); ES6 2",
  "[[\"a\",3,\"c1\"],[\"b\",4,\"c2\"],[\"c\",5,\"c3\"],[\"d\",6,\"c4\"]]",
  JSON.stringify(CEL.zip(new Set(zipF),
    new Map([[2,3],[3,4],[4,5],[5,6],[6,7],[7,8],[8,9]]).values(), zipC.values()
  ))
);


CUT.isEqual("unzip(); ES5",
  "[[\"a1\",\"a2\"],[\"b1\",\"b2\"],[\"c1\",\"c2\"],[\"d1\",\"d2\"],[\"e1\",\"e2\"]]",
  JSON.stringify(CEL.unzip(CEL.zip(zipA, zipB, zipC, zipD, zipE)))
);
CUT.isEqual("unzip(); ES6",
  "[[\"a\",\"b\",\"c\",\"d\"],[3,4,5,6],[\"c1\",\"c2\",\"c3\",\"c4\"]]",
  JSON.stringify(
    CEL.unzip(
      CEL.zip(new Set(zipF),
        new Map([ [2,3],[3,4],[4,5],[5,6],[6,7],[7,8],[8,9] ]).values(),
        zipC.values()
      ).values()
    )
  )
);

CUT.isEqual("zipObj();",
  '{"a":1,"b":2,"c":3}', JSON.stringify(CEL.zipObj(["a","b","c"],[1,2,3])) );

var a = [21,11,41,51,31];
CUT.isEqual("min(); array", 11, CEL.min(...a));
CUT.isEqual("max(); array", 51, CEL.max(...a));
CUT.isEqual("min(); Set", 11, CEL.min(...new Set(a)));
CUT.isEqual("max(); Set keys", 51, CEL.max(...new Set(a).keys()));
CUT.isEqual("min(); number test", CEL.min(5, 10, 3), 3);
CUT.isEqual("max(); number test", CEL.max(5, 10, 3), 10);

var superset1 = [3,11,58,95,88];
var superset2 = [88,95,11];
var superset3 = [88,95,11,84];
CUT.isTrue("isSuperset(); - ES5 - true", CEL.isSuperset(superset1, superset2));
CUT.isFalse("isSuperset(); - ES5 - false", CEL.isSuperset(superset3,superset1));
CUT.isTrue("isSuperset(); - ES6 - true",
  CEL.isSuperset(new Set(superset1), superset2.values()));
CUT.isFalse("isSuperset(); - ES6 - false",
  CEL.isSuperset(new Set(superset3).keys(), superset1.keys()));

var a = [21,11,41,51,31];

var a = [1,2,3,4], b = [3,4,5,6], c = [5,6,7,8];
CUT.isEqual(
  "arrayUnion(); ES5","[1,2,3,4,5,6,7,8]",JSON.stringify(CEL.arrayUnion(a,b,c)));
CUT.isEqual(
  "arrayIntersection(); ES5","[3,4]",JSON.stringify(CEL.arrayIntersection(a,b)));
CUT.isEqual(
  "arrayDifference(); ES5", "[1,2]", JSON.stringify(CEL.arrayDifference(a, b)));
CUT.isEqual("arraySymmetricDifference(); ES5",
  "[1,2,5,6]", JSON.stringify(CEL.arraySymmetricDifference(a,b))
);
try {
  CUT.isEqual("arrayUnion(); ES6", "[1,2,3,4,5,6,7,8]",
    JSON.stringify(CEL.arrayUnion(new Set(a),b.values(),new Set(c).values())));
  CUT.isEqual("arrayIntersection(); ES6", "[3,4]",
    JSON.stringify(CEL.arrayIntersection(a.values(),new Set(b))));
  CUT.isEqual("arrayDifference(); ES6", "[1,2]",
    JSON.stringify(
      CEL.arrayDifference(new Map([[1,2],[2,3],[3,4],[4,5]]).keys(),b.values()))
    );
  CUT.isEqual("arraySymmetricDifference(); ES6", "[1,2,5,6]",
    JSON.stringify(CEL.arraySymmetricDifference(
      new Set(a).keys(), new Map([[1,3],[2,4],[3,5],[4,6]]).values())));
} catch (e) {alert(e);}

function __setEquals__(set1, set2) {
  if (!CEL.isSet(set1) || !CEL.isSet(set2)) { return false; }
  if (set1.size !== set2.size) { return false; }
  if (JSON.stringify(Array.from(set1)) !== JSON.stringify(Array.from(set2))) {
    return false;
  }
  return true;
}
var a = [1,2,3,4], b = [3,4,5,6], c = [5,6,7,8];
var sa = new Set(a), sb = new Set(b), sc = new Set(c);
CUT.isTrue("setUnion(); ES6",
  __setEquals__(
    CEL.setUnion(new Map([ [2,1],[3,2],[4,3],[5,4] ]).values(),sb,c),
    CEL.setUnion(a,new Map([ [2,3],[3,4],[4,5],[5,6] ]).values(),sc.values())
  )
);
CUT.isTrue("setIntersection(); ES6",
  __setEquals__(new Set([3,4]), CEL.setIntersection(sa,sb)) );
CUT.isTrue("setDifference(); ES6",
  __setEquals__(new Set([1,2]), CEL.setDifference(sa,sb)) );
CUT.isTrue("setSymmetricDifference(); ES6",
  __setEquals__(new Set([1,2,5,6]), CEL.setSymmetricDifference(sa,sb)) );

var arrTestClearRemove1 = [1,2,3,4,5,6,7,8,9,0];
var arrTestClearRemove2 = CEL.arrayClear(arrTestClearRemove1);
CUT.isTrue("arrayClear();",
  (arrTestClearRemove1 === arrTestClearRemove2
    && arrTestClearRemove1.length === 0 && Array.isArray(arrTestClearRemove1))
);

/* arrayremove begin */
var arrTestClearRemove1 = [1,2,3,4,5,6,5,7,8,5,9,0];
CUT.isTrue("arrayRemove(); - 1 found - not all - true",
  CEL.arrayRemove(arrTestClearRemove1, 6));
CUT.isFalse("arrayRemove(); - 1 found - not all - false",
  CEL.arrayRemove(arrTestClearRemove1, 6));
CUT.isEqual("arrayRemove(); - 1 found - not all - value check",
  "[1,2,3,4,5,5,7,8,5,9,0]", JSON.stringify(arrTestClearRemove1));

var arrTestClearRemove1 = [1,2,3,4,5,6,5,7,8,5,9,0];
CUT.isTrue("arrayRemove(); - 1 found - all - true",
  CEL.arrayRemove(arrTestClearRemove1, 6, true));
CUT.isFalse("arrayRemove(); - 1 found - all - false",
  CEL.arrayRemove(arrTestClearRemove1, 6, true));
CUT.isEqual("arrayRemove(); - 1 found - all - value check",
  "[1,2,3,4,5,5,7,8,5,9,0]", JSON.stringify(arrTestClearRemove1));

var arrTestClearRemove1 = [1,2,3,4,5,6,5,7,8,5,9,0];
CUT.isTrue("arrayRemove(); - 3 found - not all - true",
  CEL.arrayRemove(arrTestClearRemove1, 5));
CUT.isTrue("arrayRemove(); - 3 found - not all - true",
  CEL.arrayRemove(arrTestClearRemove1, 5, false));
CUT.isEqual("arrayRemove(); - 3 found - not all - value check",
  "[1,2,3,4,6,7,8,5,9,0]", JSON.stringify(arrTestClearRemove1) );

var arrTestClearRemove1 = [1,2,3,4,5,6,5,7,8,5,9,0];
CUT.isTrue("arrayRemove(); - 3 found - all - true",
  CEL.arrayRemove(arrTestClearRemove1, 5, true));
CUT.isFalse("arrayRemove(); - 3 found - all - false",
  CEL.arrayRemove(arrTestClearRemove1, 5, true));
CUT.isEqual("arrayRemove(); - 3 found - all - value check",
  "[1,2,3,4,6,7,8,9,0]", JSON.stringify(arrTestClearRemove1) );

var arrTestClearRemove1 = [1,2,3,4,5,6,5,7,8,5,9,0];
CUT.isFalse("arrayRemove(); - 0 found - not all - false",
  CEL.arrayRemove(arrTestClearRemove1, 11));
CUT.isFalse("arrayRemove(); - 0 found - all - false",
  CEL.arrayRemove(arrTestClearRemove1, 11, true));
CUT.isEqual("arrayRemove(); - 0 found - value check",
  "[1,2,3,4,5,6,5,7,8,5,9,0]", JSON.stringify(arrTestClearRemove1));
/* arrayremove end */

/* arrayremoveby begin */
var arrTestClearRemove1 = [1,3,2,4,5,9,3,2];
CUT.isTrue("arrayRemoveBy(); - 1 found - not all - true",
  CEL.arrayRemoveBy(arrTestClearRemove1, (v) => (v>6) ));
CUT.isFalse("arrayRemoveBy(); - 1 found - not all - false",
  CEL.arrayRemoveBy(arrTestClearRemove1, (v) => (v>6)));
CUT.isEqual("arrayRemoveBy(); - 1 found - not all - value check",
  "[1,3,2,4,5,3,2]", JSON.stringify(arrTestClearRemove1));

var arrTestClearRemove1 = [1,3,2,4,5,9,3,2];
CUT.isTrue("arrayRemoveBy(); - 1 found - all - true",
  CEL.arrayRemoveBy(arrTestClearRemove1, (v) => (v>6), true));
CUT.isFalse("arrayRemoveBy(); - 1 found - all - false",
  CEL.arrayRemoveBy(arrTestClearRemove1, (v) => (v>6), true));
CUT.isEqual("arrayRemoveBy(); - 1 found - all - value check",
  "[1,3,2,4,5,3,2]", JSON.stringify(arrTestClearRemove1));

var arrTestClearRemove1 = [1,3,2,4,5,9,3,2];
CUT.isTrue("arrayRemoveBy(); - 3 found - not all - true",
  CEL.arrayRemoveBy(arrTestClearRemove1, (v) => (v>3)));
CUT.isTrue("arrayRemoveBy(); - 3 found - not all - true",
  CEL.arrayRemoveBy(arrTestClearRemove1, (v) => (v>3), false));
CUT.isEqual("arrayRemoveBy(); - 3 found - not all - value check",
  "[1,3,2,9,3,2]", JSON.stringify(arrTestClearRemove1));

var arrTestClearRemove1 = [1,3,2,4,5,9,3,2];
CUT.isTrue("arrayRemoveBy(); - 3 found - all - true",
  CEL.arrayRemoveBy(arrTestClearRemove1, (v) => (v>3), true));
CUT.isFalse("arrayRemoveBy(); - 3 found - all - false",
  CEL.arrayRemoveBy(arrTestClearRemove1, (v) => (v>3), true));
CUT.isEqual("arrayRemoveBy(); - 3 found - all - value check",
  "[1,3,2,3,2]", JSON.stringify(arrTestClearRemove1));

var arrTestClearRemove1 = [1,3,2,4,5,9,3,2];
CUT.isFalse("arrayRemoveBy(); - 0 found - not all - false",
  CEL.arrayRemoveBy(arrTestClearRemove1, (v) => (v>13)));
CUT.isFalse("arrayRemoveBy(); - 0 found - all - false",
  CEL.arrayRemoveBy(arrTestClearRemove1, (v) => (v>13), true));
CUT.isEqual("arrayRemoveBy(); - 0 found - value check",
  "[1,3,2,4,5,9,3,2]", JSON.stringify(arrTestClearRemove1));
/* arrayremoveby end */

CUT.isEqual("arrayUnique(); 1 ES5 - Array and String",
  JSON.stringify(CEL.arrayUnique(
    ["A","r","r","a","y","y","a","n","d","d","M","M","a","p"]
  )),
  JSON.stringify(CEL.arrayUnique("ArrayyanddMMap"))
);
CUT.isEqual("arrayUnique(); 2 ES6 - Array and Set",
  JSON.stringify(CEL.arrayUnique([1,2,2,3,4,4,5,6,6,7])),
  JSON.stringify(CEL.arrayUnique(new Set([1,2,2,3,4,4,5,6,6,7])))
);
CUT.isEqual("arrayUnique(); 3 ES6 - Array and Map values(); iterator",
  JSON.stringify(CEL.arrayUnique([1,2,2,3,4,4,5,6,6,7])),
  JSON.stringify(
    CEL.arrayUnique(
      (new Map([
        ["foo1", 1], ["bar1", 2], ["baz1", 2], ["foo2", 3], ["bar2", 4],
        ["baz2", 4], ["foo3", 5], ["bar3", 6], ["baz3", 6], ["foo4", 7]
      ])).values()
    )
  )
);

var arrayAddTest = [1,2,3,5];
CUT.isTrue("arrayAdd(); true", CEL.arrayAdd(arrayAddTest, 4));
CUT.isFalse("arrayAdd(); false", CEL.arrayAdd(arrayAddTest, 4));
CUT.isEqual("arrayAdd(); value check", "[1,2,3,5,4]",
  JSON.stringify(arrayAddTest));

var arrMerge1 = [1,2,3];
var arrMerge2 = [4,5,6];
var arrMerge3 = [7,8,[10,11,12,[13,14,15]],9];
var arrMergeStr = JSON.stringify(CEL.arrayMerge(arrMerge1, arrMerge2));
arrMergeStr += JSON.stringify(arrMerge1);
arrMerge1 = [1,2,3];
arrMergeStr += JSON.stringify(CEL.arrayMerge(arrMerge1, arrMerge2, arrMerge3));
arrMergeStr += JSON.stringify(arrMerge1);
CUT.isEqual("arrayMerge();",
  "[1,2,3,4,5,6]"
    + "[1,2,3,4,5,6]"
    + "[1,2,3,4,5,6,7,8,[10,11,12,[13,14,15]],9]"
    + "[1,2,3,4,5,6,7,8,[10,11,12,[13,14,15]],9]",
  arrMergeStr
);


/* Cookie API */

CUT.addElement("hr");
CUT.addElement("h3", "Cookie API");

CEL.setCookie("ctest3", "cookieUnitTestStr");
CUT.isTrue("setcookie(); + hasCookie(); true", CEL.hasCookie("ctest3"));
CUT.isEqual("getCookie(name) value", "cookieUnitTestStr",
  CEL.getCookie("ctest3"));
CUT.isEqual("getCookie();", "cookieUnitTestStr", CEL.getCookie()["ctest3"]);
CUT.isTrue("removeCookie(); true", CEL.removeCookie("ctest3"));
CUT.isFalse("removeCookie(); false", CEL.removeCookie("ctest3"));
CUT.isFalse("hasCookie(); false", CEL.hasCookie("ctest3"));
CUT.isEqual("getCookie(name) null", null, CEL.getCookie("ctest3"));
CUT.isEqual("getCookie(); undefined", undefined, CEL.getCookie()["ctest3"]);

var cookieClearStr = "";
CEL.setCookie("ctest4", "cookieUnitTestStr");
CEL.setCookie("ctest5", "cookieUnitTestStr");
cookieClearStr+=String(CEL.hasCookie("ctest4"))+String(CEL.hasCookie("ctest5"));
CEL.clearCookies();
cookieClearStr+=String(CEL.hasCookie("ctest4"))+String(CEL.hasCookie("ctest5"));
CUT.isEqual("clearCookies();", "truetruefalsefalse", cookieClearStr);


/* cookie with settings object */

CUT.addElement("hr");
CUT.addElement("h3", "cookie with settings object");

CEL.setCookie({"name": "ctest3", "value":"cookieUnitTestStr","SameSite":"Lax"});
CUT.isTrue("setcookie(); + hasCookie(); true <i>(settings object)</i>",
  CEL.hasCookie("ctest3"));
CUT.isEqual("getCookie(name) value <i>(settings object)</i>",
  "cookieUnitTestStr", CEL.getCookie("ctest3"));
CUT.isEqual("getCookie(); <i>(settings object)</i>", "cookieUnitTestStr",
  CEL.getCookie()["ctest3"]);
CUT.isTrue("removeCookie(); true <i>(settings object)</i>",
  CEL.removeCookie({"name": "ctest3", "SameSite": "Lax"}));
CUT.isFalse("removeCookie(); false <i>(settings object)</i>",
  CEL.removeCookie({"name": "ctest3", "SameSite": "Lax"}));
CUT.isFalse("hasCookie(); false <i>(settings object)</i>",
  CEL.hasCookie("ctest3"));
CUT.isEqual("getCookie(name) null <i>(settings object)</i>", null,
  CEL.getCookie("ctest3"));
CUT.isEqual("getCookie(); undefined <i>(settings object)</i>", undefined,
  CEL.getCookie()["ctest3"]);

var cookieClearStr = "";
CEL.setCookie({"name":"ctest4", "value":"cookieUnitTestStr", "SameSite":"Lax"});
CEL.setCookie({"name":"ctest5", "value":"cookieUnitTestStr", "SameSite":"Lax"});
cookieClearStr+=String(CEL.hasCookie("ctest4"))+String(CEL.hasCookie("ctest5"));
CEL.clearCookies({"SameSite": "Lax"});
cookieClearStr+=String(CEL.hasCookie("ctest4"))+String(CEL.hasCookie("ctest5"));
CUT.isEqual("clearCookies(); <i>(settings object)</i>", "truetruefalsefalse",
  cookieClearStr);


/* Polyfills */

CUT.addElement("hr");
CUT.addElement("h3", "polyfills");


var iframe = document.createElement("iframe");
document.body.appendChild(iframe);
var xError = window.frames[window.frames.length - 1].Error;
var newxError = new xError();
var isErrorStr = ""
 // true
 + +(Error.isError(newxError))
 + +(Error.isError(new Error()))
 + +(Error.isError(new TypeError()))
 + +(Error.isError(new DOMException()))
 // false
 + +(Error.isError({ __proto__: Error.prototype }))
 + +(Error.isError({}))
 + +(Error.isError(null))
 + +(Error.isError(undefined))
 + +(Error.isError(17))
 + +(Error.isError(3.14))
 + +(Error.isError("Error"))
 + +(Error.isError(true))
 + +(Error.isError(false));
CUT.isEqual("Error.isError(); <code>\"" + isErrorStr + "\"</code>",
  isErrorStr, "1111000000000"
);

var arrayCopy = [4,2,5], arrayCopyStr = "[4,2,5]";
CUT.isTrue("Array.prototype.toReversed();",
  JSON.stringify(arrayCopy.toReversed()) === "[5,2,4]"
  && JSON.stringify(arrayCopy) === arrayCopyStr
);
CUT.isTrue("Array.prototype.toSorted();",
  JSON.stringify(arrayCopy.toSorted()) === "[2,4,5]"
  && JSON.stringify(arrayCopy) === arrayCopyStr
);
CUT.isTrue("Array.prototype.toSpliced(); remove",
  JSON.stringify(arrayCopy.toSpliced(1,1)) === "[4,5]"
  && JSON.stringify(arrayCopy) === arrayCopyStr
);
CUT.isTrue("Array.prototype.toSpliced(); remove and add 2 items",
  JSON.stringify(arrayCopy.toSpliced(1,1,89,79)) === "[4,89,79,5]"
  && JSON.stringify(arrayCopy) === arrayCopyStr
);
CUT.isTrue("Array.prototype.with();",
  JSON.stringify(arrayCopy.with(1,7)) === "[4,7,5]"
  && JSON.stringify(arrayCopy) === arrayCopyStr
);

var Uint8ArrayCopy = new Uint8Array([4,2,5]);
var Uint8ArrayCopyStr = "{\"0\":4,\"1\":2,\"2\":5}";
CUT.isTrue("TypedArray.prototype.toReversed();",
  JSON.stringify(Uint8ArrayCopy.toReversed()) === "{\"0\":5,\"1\":2,\"2\":4}"
  && JSON.stringify(Uint8ArrayCopy) === Uint8ArrayCopyStr
);
CUT.isTrue("TypedArray.prototype.toSorted();",
  JSON.stringify(Uint8ArrayCopy.toSorted()) === "{\"0\":2,\"1\":4,\"2\":5}"
  && JSON.stringify(Uint8ArrayCopy) === Uint8ArrayCopyStr
);
CUT.isTrue("TypedArray.prototype.with();",
  JSON.stringify(Uint8ArrayCopy.with(1,7)) === "{\"0\":4,\"1\":7,\"2\":5}"
  && JSON.stringify(Uint8ArrayCopy) === Uint8ArrayCopyStr
);

var objIsStr = "", isArr = [1,2], isTest = { x: 12 };
objIsStr += Object.is("lorem", "lorem");
objIsStr += Object.is(-0, -0);
objIsStr += Object.is(0, 0);
objIsStr += Object.is(NaN, 0/0);
objIsStr += Object.is(NaN, NaN);
objIsStr += Object.is(42, 42);
objIsStr += Object.is(3.14, 3.14);
objIsStr += Object.is(true, true);
objIsStr += Object.is(false, false);
objIsStr += Object.is(undefined, undefined);
objIsStr += Object.is(null, null);
objIsStr += Object.is(isArr, isArr);
objIsStr += Object.is(isTest, isTest);
objIsStr += Object.is(window, window);
objIsStr += Object.is([], []);
objIsStr += Object.is([1,2], [1,2]);
objIsStr += Object.is(isArr, [1,2]);
objIsStr += Object.is(isTest, { x: 12 });
objIsStr += Object.is("lorem", "ipsum");
objIsStr += Object.is("lorem", "Lorem");
objIsStr += Object.is("lorem", "dolorem");
objIsStr += Object.is(0, -0);
CUT.isEqual("Object.is();",
  "truetruetruetruetruetruetruetruetruetruetruetruetruetruefalsefalsefalsefalsefalsefalsefalsefalse",
  objIsStr
);

CUT.isEqual("Number.MIN_SAFE_INTEGER;",Number.MIN_SAFE_INTEGER,-9007199254740991);
CUT.isEqual("Number.MAX_SAFE_INTEGER;",Number.MAX_SAFE_INTEGER,9007199254740991);

const groupByInventory = [
  { name: 'asparagus', type: 'vegetables', quantity: 9 },
  { name: 'bananas', type: 'fruit', quantity: 5 },
  { name: 'goat', type: 'meat', quantity: 23 },
  { name: 'cherries', type: 'fruit', quantity: 12 },
  { name: 'fish', type: 'meat', quantity: 3 },
];


CUT.isEqual("Object.groupBy();",
  JSON.stringify(Object.groupBy(groupByInventory, ({ quantity }) => (quantity < 6 ? "restock" : "sufficient"))),
  '{"sufficient":[{"name":"asparagus","type":"vegetables","quantity":9},{"name":"goat","type":"meat","quantity":23},{"name":"cherries","type":"fruit","quantity":12}],"restock":[{"name":"bananas","type":"fruit","quantity":5},{"name":"fish","type":"meat","quantity":3}]}'
);

CUT.isEqual("Map.groupBy();",
  JSON.stringify(Array.from(Map.groupBy(groupByInventory, ({ quantity }) => (quantity < 6 ? "restock" : "sufficient")))),
  '[["sufficient",[{"name":"asparagus","type":"vegetables","quantity":9},{"name":"goat","type":"meat","quantity":23},{"name":"cherries","type":"fruit","quantity":12}]],["restock",[{"name":"bananas","type":"fruit","quantity":5},{"name":"fish","type":"meat","quantity":3}]]]'
);

var rIDstr = crypto.randomUUID();
CUT.isTrue("crypto.randomUUID();",
  rIDstr.length === 36
    && /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/
      .test(rIDstr)
    && rIDstr[14] === "4"
    && "89ab".includes(rIDstr[19])
);
CUT.log("<code>\"" + rIDstr + "\"</code>");

var arrFindLast = [1,2,5,6,3,4,7,8];
CUT.isTrue("Array.prototype.findLast();",
  arrFindLast.findLast( (v) => (v < 5) ) === 4
    && arrFindLast.findLast( (v) => (v < 0) ) === undefined
    && arrFindLast.findLast( (v) => (v < 2) ) === 1
    && arrFindLast.findLast( (v) => (v > 1) ) === 8
    && [].findLast( (v) => (v < 0) ) === undefined
);
CUT.isTrue("Array.prototype.findLastIndex();",
  arrFindLast.findLastIndex( (v) => (v < 5) ) === 5
    && arrFindLast.findLastIndex( (v) => (v < 0) ) === -1
    && arrFindLast.findLastIndex( (v) => (v < 2) ) === 0
    && arrFindLast.findLastIndex( (v) => (v > 1) ) === 7
    && [].findLastIndex( (v) => (v < 0) ) === -1
);

var arrFindLast = new Uint8Array([1,2,5,6,3,4,7,8]);
CUT.isTrue("Uint8Array.prototype.findLast();",
  arrFindLast.findLast( (v) => (v < 5) ) === 4
    && arrFindLast.findLast( (v) => (v < 0) ) === undefined
    && arrFindLast.findLast( (v) => (v < 2) ) === 1
    && arrFindLast.findLast( (v) => (v > 1) ) === 8
    && [].findLast( (v) => (v < 0) ) === undefined
);
CUT.isTrue("Uint8Array.prototype.findLastIndex();",
  arrFindLast.findLastIndex( (v) => (v < 5) ) === 5
    && arrFindLast.findLastIndex( (v) => (v < 0) ) === -1
    && arrFindLast.findLastIndex( (v) => (v < 2) ) === 0
    && arrFindLast.findLastIndex( (v) => (v > 1) ) === 7
    && [].findLastIndex( (v) => (v < 0) ) === -1
);

var arrayAt = [4,5,6,7,8];
var arrayAtStr = "" + arrayAt.at(0)  + arrayAt.at(1)  + arrayAt.at(2)
  + arrayAt.at(3)   + arrayAt.at(4)  + arrayAt.at(5)  + arrayAt.at(-0)
  + arrayAt.at(-1)  + arrayAt.at(-2) + arrayAt.at(-3) + arrayAt.at(-4)
  + arrayAt.at(-5)  + arrayAt.at(-6);
CUT.isEqual("Array.prototype.at();", arrayAtStr,
  "45678undefined487654undefined");

var arraylikeAt = {0:4, 1:5, 2:6, 3:7, 4:8, length:5};
var arralikeAtStr = ""
  + Array.prototype.at.call(arraylikeAt,0)
  + Array.prototype.at.call(arraylikeAt,1)
  + Array.prototype.at.call(arraylikeAt,2)
  + Array.prototype.at.call(arraylikeAt,3)
  + Array.prototype.at.call(arraylikeAt,4)
  + Array.prototype.at.call(arraylikeAt,5)
  + Array.prototype.at.call(arraylikeAt,-0)
  + Array.prototype.at.call(arraylikeAt,-1)
  + Array.prototype.at.call(arraylikeAt,-2)
  + Array.prototype.at.call(arraylikeAt,-3)
  + Array.prototype.at.call(arraylikeAt,-4)
  + Array.prototype.at.call(arraylikeAt,-5)
  + Array.prototype.at.call(arraylikeAt,-6);
CUT.isEqual("Array.prototype.at(); - arraylike object", arralikeAtStr,
  "45678undefined487654undefined"
);

var stringAt = "45678";
var stringAtStr = ""
  + stringAt.at(0)  + stringAt.at(1)  + stringAt.at(2)  + stringAt.at(3)
  + stringAt.at(4)  + stringAt.at(5)  + stringAt.at(-0) + stringAt.at(-1)
  + stringAt.at(-2) + stringAt.at(-3) + stringAt.at(-4) + stringAt.at(-5)
  + stringAt.at(-6);
CUT.isEqual("String.prototype.at();", stringAtStr,
  "45678undefined487654undefined" );

var typedarrayAt = new Uint8Array([4,5,6,7,8]);
var typedarrayAtStr = ""
  + typedarrayAt.at(0)  + typedarrayAt.at(1)  + typedarrayAt.at(2)
  + typedarrayAt.at(3)  + typedarrayAt.at(4)  + typedarrayAt.at(5)
  + typedarrayAt.at(-0) + typedarrayAt.at(-1) + typedarrayAt.at(-2)
  + typedarrayAt.at(-3) + typedarrayAt.at(-4) + typedarrayAt.at(-5)
  + typedarrayAt.at(-6);
CUT.isEqual("Uint8Array.prototype.at();",
  typedarrayAtStr, "45678undefined487654undefined" );

var hasOwnObject = {"a": 1, "b": 2};
var hasOwnArray = [4,5,6];
CUT.isEqual("Object.hasOwn();",
  "true false false true false false", ""
    + Object.hasOwn(hasOwnObject, "a")
    + " " + Object.hasOwn(hasOwnObject, "hasOwnProperty")
    + " " + Object.hasOwn(hasOwnObject, "c")
    + " " + Object.hasOwn(hasOwnArray, "0")
    + " " + Object.hasOwn(hasOwnArray, "map")
    + " " + Object.hasOwn(hasOwnArray, "map2")
);

CUT.isEqual("String.prototype.replaceAll();",
  "aabbcc".replaceAll("b", ".")+"aabbcc".replaceAll(/b/g, '.'),"aa..cc"+"aa..cc"
);

const regexp = RegExp("foo*","g");
const str = "table football, foosball";
var matches1 = str.matchAll(regexp);
var resMatchAll1 = "";
for (const item of matches1) { resMatchAll1 += item; }
var matches2 = str.matchAll(regexp);
var resMatchAll2 = JSON.stringify(Array.from(matches2, m => m[0]));
CUT.isTrue("String.prototype.matchAll();",
  (resMatchAll1 === "foofoo" && resMatchAll2 === "[\"foo\",\"foo\"]"));

var padStr = "lorem".padStart(10);
padStr += "lorem".padStart(10, "foo") + "lorem".padStart(6,"123465");
padStr += "lorem".padStart(15,"123465") + "lorem".padStart(8, "0");
padStr += "lorem".padStart(1) + "lorem".padStart(NaN);
padStr += "lorem".padStart(15,undefined) + "lorem".padStart(15,null);
padStr += "lorem".padStart(15,true) + "lorem".padStart(15,false);
padStr += "lorem".padStart(15,{a:1}) + "lorem".padStart(15,[]);
padStr += "lorem".padStart(15,[1,2,"c"]) + "lorem".padStart(15,42);
padStr += "lorem".padStart(15,3.14);
CUT.isEqual("String.prototype.padStart();",
  "     lorem"+"foofolorem"+"1lorem"+"1234651234lorem"+"000lorem"+"lorem"
    +"lorem"+"          lorem"+"nullnullnulorem"+"truetruetrlorem"
    +"falsefalselorem"+"[object Oblorem"+"lorem"+"1,2,c1,2,clorem"
    +"4242424242lorem"+"3.143.143.lorem",
  padStr
);

padStr = "lorem".padEnd(10) + "lorem".padEnd(10, "foo");
padStr += "lorem".padEnd(6,"123465") + "lorem".padEnd(15,"123465");
padStr += "lorem".padEnd(8, "0") + "lorem".padEnd(1);
padStr += "lorem".padEnd(NaN) + "lorem".padEnd(15,undefined);
padStr += "lorem".padEnd(15,null) + "lorem".padEnd(15,true);
padStr += "lorem".padEnd(15,false) + "lorem".padEnd(15,{a:1});
padStr += "lorem".padEnd(15,[]) + "lorem".padEnd(15,[1,2,"c"]);
padStr += "lorem".padEnd(15,42) + "lorem".padEnd(15,3.14);
CUT.isEqual("String.prototype.padEnd();",
  "lorem     "+"loremfoofo"+"lorem1"+"lorem1234651234"+"lorem000"+"lorem"
    +"lorem"+"lorem          "+"loremnullnullnu"+"loremtruetruetr"
    +"loremfalsefalse"+"lorem[object Ob"+"lorem"+"lorem1,2,c1,2,c"
    +"lorem4242424242"+"lorem3.143.143.",
  padStr
);

var trimStr = "\n \t   Lorem ipsum dolor sit amet, consectetuer adipiscing elit.   \t \n";
CUT.isEqual("String.prototype.trimStart();",
  "Lorem ipsum dolor sit amet, consectetuer adipiscing elit.   \t \n",
  trimStr.trimStart()
);
CUT.isEqual("String.prototype.trimLeft();",
  "Lorem ipsum dolor sit amet, consectetuer adipiscing elit.   \t \n",
  trimStr.trimLeft()
);
CUT.isEqual("String.prototype.trimEnd();",
  "\n \t   Lorem ipsum dolor sit amet, consectetuer adipiscing elit.",
  trimStr.trimEnd()
);
CUT.isEqual("String.prototype.trimRight();",
  "\n \t   Lorem ipsum dolor sit amet, consectetuer adipiscing elit.",
  trimStr.trimRight()
);

var testArrayFI = [66, 7, 135, 75, 190, 89];

CUT.addElement(CEL.domCreate("div", {"id": "testDivNode"}, "#testDivNode"));
var testDivNode = CEL.qs("#testDivNode");
testDivNode.append(CEL.domCreate("p", {"id": "testNodeP1"}, "testNodeP1"));
testDivNode.append(CEL.domCreate("p", {"id": "testNodeP2"}, "testNodeP2"));

var dqsaList = document.querySelectorAll("#testDivNode > p")
dqsaList.forEach(function (e) { e.style["color"] = "blue"; });
CUT.isEqual("NodeList.prototype.forEach();", true,
  dqsaList[0].style["color"] === "blue" && dqsaList[1].style["color"]==="blue");

var testNodeP1 = CEL.qs("#testNodeP1");
var testNodeP2 = CEL.qs("#testNodeP2");

CUT.isEqual("globalThis;", window, globalThis);

var arr = [ ["0","a"], ["1","b"], ["2","c"] ];
CUT.isEqual("Object.fromEntries(); step 1 array",'{"0":"a","1":"b","2":"c"}',
  JSON.stringify(Object.fromEntries(arr)));

var obj = {"a":1,"b":2,"c":3};
CUT.isEqual("Object.fromEntries(); step 2 Object.entries",
  '{"a":1,"b":2,"c":3}', JSON.stringify(Object.fromEntries(Object.entries(obj)))
);

var fromEntriesMap = new Map([ ["foo","bar"], ["baz",42] ]);
CUT.isEqual(
  "Object.fromEntries(); step 3 Map - doesn't work in IE11",'{"foo":"bar","baz":42}',
  JSON.stringify(Object.fromEntries(fromEntriesMap))
);

var flatArr1 = [1,2,3,4];
var flatArr2 = [1,2,[3,4]];
var flatArr3 = [1,2,[3,4,[5,6]]];
CUT.isTrue("Array.prototype.flat();",
  "[1,2,3,4]" === JSON.stringify(flatArr1.flat())
    && "[1,2,3,4]" === JSON.stringify(flatArr1.flat(1000))
    && "[1,2,3,4]" === JSON.stringify(flatArr1.flat(Infinity))
    && "[1,2,3,4]" === JSON.stringify(flatArr2.flat())
    && "[1,2,3,4,[5,6]]" === JSON.stringify(flatArr3.flat())
    && "[1,2,3,4,[5,6]]" === JSON.stringify(flatArr3.flat(1))
    && "[1,2,3,4,5,6]" === JSON.stringify(flatArr3.flat(2))
    && "[1,2,3,4,5,6]" === JSON.stringify(flatArr3.flat(1000))
    && "[1,2,3,4,5,6]" === JSON.stringify(flatArr3.flat(Infinity))
    && "[1,2,[3,4,[5,6]]]" === JSON.stringify(flatArr3.flat(0))
    && "[1,2,[3,4,[5,6]]]" === JSON.stringify(flatArr3.flat(-1))
    && "[1,2,[3,4,[5,6]]]" === JSON.stringify(flatArr3.flat("a2"))
    && "[1,2,[3,4,[5,6]]]" === JSON.stringify(flatArr3.flat(false))
    && "[1,2,3,4,[5,6]]" === JSON.stringify(flatArr3.flat(true))
);

var flatMapArr1 = [1,2,3,4];
var flatMapArr2 = ["lorem ipsum dolor", "", "sit"];
CUT.isTrue("Array.prototype.flatMap();",
  "[[2],[4],[6],[8]]"===JSON.stringify(flatMapArr1.map(function(x){return [x*2];}))
    && "[2,4,6,8]"===JSON.stringify(flatMapArr1.flatMap(function(x){return [x*2];}))
    && "[[2],[4],[6],[8]]"===JSON.stringify(flatMapArr1.flatMap(function(x){return [[x*2]];}))
    && '[["lorem","ipsum","dolor"],[""],["sit"]]'===JSON.stringify(flatMapArr2.map(function(x){return x.split(" ");}))
    && '["lorem","ipsum","dolor","","sit"]'===JSON.stringify(flatMapArr2.flatMap(function (x){return x.split(" ");}))
);

/* non-standard polyfills */

CUT.addElement("hr");
CUT.addElement("h3", "non-standard polyfills");

if (!!window.BigInt) {
  CUT.isEqual("BigInt.prototype.toJSON();", '"42"', JSON.stringify(BigInt(42)));
}

const testGenFn = new GeneratorFunction("v", "yield v * 3; yield v * 4;");
var sum = "";
for (let x of testGenFn(3)) { sum += x; }
CUT.isEqual("GeneratorFunction();", "912", sum);

var afunction = new AsyncFunction("a","b",
  "return await resolveAfter2Seconds(a) + await resolveAfter2Seconds(b);");
CUT.isEqual("AsyncFunction();", "asyncfunction", CEL.classof(afunction));


/* type checking */

CUT.addElement("hr");
CUT.addElement("h3", "type checking");

CUT.isTrue("isTruthy();",
  CEL.isTruthy(1)
    && CEL.isTruthy(42)
    && CEL.isTruthy(3.14)
    && CEL.isTruthy([])
    && CEL.isTruthy({})
    && !CEL.isTruthy(false)
    && !CEL.isTruthy(0)
    && !CEL.isTruthy(-0)
    && (!!window.BigInt ? !CEL.isTruthy(BigInt(0)) : true)
    && !CEL.isTruthy("")
    && !CEL.isTruthy(null)
    && !CEL.isTruthy(undefined)
    && !CEL.isTruthy(NaN)
);

CUT.isTrue("isFalsy();",
  !CEL.isFalsy(1)
    && !CEL.isFalsy(42)
    && !CEL.isFalsy(3.14)
    && !CEL.isFalsy([])
    && !CEL.isFalsy({})
    && CEL.isFalsy(false)
    && CEL.isFalsy(0)
    && CEL.isFalsy(-0)
    && (!!window.BigInt ? CEL.isFalsy(BigInt(0)) : true)
    && CEL.isFalsy("")
    && CEL.isFalsy(null)
    && CEL.isFalsy(undefined)
    && CEL.isFalsy(NaN)
);

CUT.isTrue("isAsyncGeneratorFn();",
  CEL.isAsyncGeneratorFn(async function*(){})
    && !CEL.isAsyncGeneratorFn(function*(){})
    && !CEL.isAsyncGeneratorFn(Array)
    && !CEL.isAsyncGeneratorFn(Array.from)
    && !CEL.isAsyncGeneratorFn(0)
);

CUT.isTrue("isConstructorFn();",
  CEL.isConstructorFn(Array)
    && !CEL.isConstructorFn(Array.from)
    && !CEL.isConstructorFn(0)
);

CUT.isTrue("isPlainObject();",
  !CEL.isPlainObject(null)
    && !CEL.isPlainObject("")
    && !CEL.isPlainObject([])
    && !CEL.isPlainObject(function(){})
    && CEL.isPlainObject({})
    && CEL.isPlainObject({a: "1", b: "2"})
    && CEL.isPlainObject(Object.create(null))
);

CUT.isTrue("isEmptyMap(); true", CEL.isEmptyMap(new Map()));
CUT.isFalse("isEmptyMap(); false 1", CEL.isEmptyMap(new Map([[4, 5], [6, 7]])));
CUT.isFalse("isEmptyMap(); false 2 array", CEL.isEmptyMap([]));

CUT.isTrue("isEmptySet(); true", CEL.isEmptySet(new Set()));
CUT.isFalse("isEmptySet(); false 1", CEL.isEmptySet(new Set([4,5,6])));
CUT.isFalse("isEmptySet(); false 2 array", CEL.isEmptySet([]));

CUT.isTrue("isEmptyIterator(); true", CEL.isEmptyIterator([]));
CUT.isFalse("isEmptyIterator(); false", CEL.isEmptyIterator([4,5,6]));

CUT.isTrue("isDataView(); true",
  CEL.isDataView(new DataView(new ArrayBuffer(2)), "dataview")
);
CUT.isFalse("isDataView(); false", CEL.isDataView({}, "dataview"));

var iframe = document.createElement("iframe");
document.body.appendChild(iframe);
var xError = window.frames[window.frames.length - 1].Error;
var newxError = new xError();
var isErrorStr = ""
 // true
 + +(CEL.isError(newxError))
 + +(CEL.isError(new Error()))
 + +(CEL.isError(new TypeError()))
 + +(CEL.isError(new DOMException()))
 // false
 + +(CEL.isError({ __proto__: Error.prototype }))
 + +(CEL.isError({}))
 + +(CEL.isError(null))
 + +(CEL.isError(undefined))
 + +(CEL.isError(17))
 + +(CEL.isError(3.14))
 + +(CEL.isError("Error"))
 + +(CEL.isError(true))
 + +(CEL.isError(false));
CUT.isEqual("isError(); <code>\"" + isErrorStr + "\"</code>",
  isErrorStr, "1111000000000"
);

CUT.isTrue("isGeneratorFn(); true",
  CEL.isGeneratorFn(function* fn42g () { yield 42; }));
CUT.isFalse("isGeneratorFn(); false 1 fn",
  CEL.isGeneratorFn(function fn42 () { return 42; }));
CUT.isFalse("isGeneratorFn(); false 2 async fn",
  CEL.isGeneratorFn(new AsyncFunction("a","b","return await resolveAfter2Seconds(a) + await resolveAfter2Seconds(b);"))
);
CUT.isFalse("isGeneratorFn(); false 3 number", CEL.isGeneratorFn(42));

CUT.isTrue("isAsyncFn(); true",
  CEL.isAsyncFn(new AsyncFunction("a","b","return await resolveAfter2Seconds(a) + await resolveAfter2Seconds(b);"))
);
CUT.isFalse("isAsyncFn(); false 1 fn",
  CEL.isAsyncFn(function fn42 () { return 42; }) );
CUT.isFalse("isAsyncFn(); false 2 generator fn",
  CEL.isAsyncFn(function* fn42g () { yield 42; }) );
CUT.isFalse("isAsyncFn(); false 3 number", CEL.isAsyncFn(42));

CUT.isTrue("isString(); true", CEL.isString("str"));
CUT.isFalse("isString(); false", CEL.isString(533));
CUT.isTrue("isChar(); true 1", CEL.isChar("s"));
CUT.isTrue("isChar(); true 2 unicode", CEL.isChar("\uD834\uDF06"));
CUT.isFalse("isChar(); false 1", CEL.isChar("str"));
CUT.isFalse("isChar(); false 2", CEL.isChar(533));
CUT.isFalse("isChar(); false 3 unicode", CEL.isChar("s \uD834\uDF06 tr"));
CUT.isTrue("isNumber(); true 1", CEL.isNumber(98));
CUT.isTrue("isNumber(); true 2", CEL.isNumber(3.14));
CUT.isFalse("isNumber(); false", CEL.isNumber("str"));
CUT.isTrue("isFloat(); true", CEL.isFloat(3.14));
CUT.isFalse("isFloat(); false 1", CEL.isFloat(98));
CUT.isFalse("isFloat(); false 2", CEL.isFloat("str"));
CUT.isTrue("isBoolean(); true", CEL.isBoolean(false));
CUT.isFalse("isBoolean(); false", CEL.isBoolean(98));
CUT.isTrue("isObject(); 1 true {}", CEL.isObject({}));
CUT.isTrue("isObject(); 2 true array", CEL.isObject([]));
CUT.isFalse("isObject(); 3 false null", CEL.isObject(null));
CUT.isFalse("isObject(); 4 false number", CEL.isObject(98));
CUT.isTrue("isEmptyObject(); 1 true", CEL.isEmptyObject({}));
CUT.isFalse("isEmptyObject(); 2 false ", CEL.isEmptyObject({a:1}));
CUT.isFalse("isEmptyObject(); 3 false number", CEL.isEmptyObject(98));
CUT.isFalse("isEmptyObject(); 4 false null", CEL.isEmptyObject(null));
CUT.isFalse("isEmptyObject(); 5 false undefined", CEL.isEmptyObject(undefined));
CUT.isTrue("isFunction(); true 1", CEL.isFunction(CEL.noop));
CUT.isTrue("isFunction(); true 2", CEL.isFunction(new Function()));
CUT.isFalse("isFunction(); false", CEL.isFunction(document.querySelector("p")));
CUT.isTrue("isCallable(); true 1", CEL.isCallable(CEL.noop));
CUT.isTrue("isCallable(); true 2", CEL.isCallable(new Function()));
CUT.isFalse("isCallable(); false", CEL.isCallable(document.querySelector("p")));
CUT.isTrue("isEmptyArray(); true", CEL.isEmptyArray([]));
CUT.isFalse("isEmptyArray(); false 1", CEL.isEmptyArray([1,2,3]));
CUT.isFalse("isEmptyArray(); false 2",
  CEL.isEmptyArray(document.querySelector("p")));
CUT.isTrue("isArraylike(); true 1 array", CEL.isArraylike([]));
CUT.isTrue("isArraylike(); true 2 querySelectorAll",
  CEL.isArraylike(document.querySelectorAll("p")));
CUT.isTrue("isArraylike(); true 3 arraylike object",
  CEL.isArraylike({0:4,1:5,length:2}));
CUT.isTrue("isArraylike(); true 4 string", CEL.isArraylike("Pillangó"));
CUT.isTrue("isArraylike(); true 5 empty string", CEL.isArraylike(""));
CUT.isFalse("isArraylike(); false 1 element",
  CEL.isArraylike(document.querySelector("p")));
CUT.isFalse("isArraylike(); false 2 number", CEL.isArraylike(42));
CUT.isFalse("isArraylike(); false 3 null", CEL.isArraylike(null));
CUT.isFalse("isArraylike(); false 4 object", CEL.isArraylike({0:4,1:5}));
CUT.isTrue("isNull(); true", CEL.isNull(null));
CUT.isFalse("isNull(); false", CEL.isNull(document.querySelectorAll("p")));
CUT.isTrue("isUndefined(); true", CEL.isUndefined(undefined));
CUT.isFalse("isUndefined(); false",
  CEL.isUndefined(document.querySelectorAll("p")));
CUT.isTrue("isNullOrUndefined(); true 1", CEL.isNullOrUndefined(undefined));
CUT.isTrue("isNullOrUndefined(); true 2", CEL.isNullOrUndefined(null));
CUT.isFalse("isNullOrUndefined(); false",
  CEL.isNullOrUndefined(document.querySelectorAll("p")));
CUT.isTrue("isNil(); true 1", CEL.isNil(undefined));
CUT.isTrue("isNil(); true 2", CEL.isNil(null));
CUT.isTrue("isNil(); true 3", CEL.isNil(+"asd"));
CUT.isFalse("isNil(); false", CEL.isNil(document.querySelectorAll("p")));
CUT.isTrue("isPrimitive(); true 1", CEL.isPrimitive(98));
CUT.isTrue("isPrimitive(); true 2", CEL.isPrimitive("str"));
CUT.isFalse("isPrimitive(); false 1",
  CEL.isPrimitive(document.querySelectorAll("p")));
CUT.isFalse("isPrimitive(); false 2", CEL.isPrimitive(CEL.noop));
CUT.isTrue("isDate(); true", CEL.isDate(new Date()));
CUT.isFalse("isDate(); false", CEL.isDate({}));
CUT.isTrue("isRegexp(); true", CEL.isRegexp(/^\[object (.+)\]$/g));
CUT.isFalse("isRegexp(); false", CEL.isRegexp("string"));
CUT.isTrue("isElement(); true 1", CEL.isElement(document.body));
CUT.isTrue("isElement(); true 2", CEL.isElement(CEL.qs("div")));
CUT.isFalse("isElement(); false 1",
  CEL.isElement(document.createTextNode("sample text")));
CUT.isFalse("isElement(); false 2 ",
  CEL.isElement(document.createComment("sample comment")));
CUT.isFalse("isElement(); false 3 ", CEL.isElement([]));

CUT.isTrue("isNumeric(); true",
  CEL.isNumeric(-42) && CEL.isNumeric(-1.42) && CEL.isNumeric(-0.42)
    && CEL.isNumeric(0) && CEL.isNumeric(0.42) && CEL.isNumeric(.42)
    && CEL.isNumeric(1.42) && CEL.isNumeric(42) && CEL.isNumeric(8e5)
    && CEL.isNumeric(-8e5) && CEL.isNumeric(0x89f) && CEL.isNumeric(-0x89f)
    && CEL.isNumeric("-42") && CEL.isNumeric("-1.42") && CEL.isNumeric("-0.42")
    && CEL.isNumeric("0") && CEL.isNumeric("0.42") && CEL.isNumeric(".42")
    && CEL.isNumeric("1.42") && CEL.isNumeric("42") && CEL.isNumeric("8e5")
    && CEL.isNumeric("-8e5") && CEL.isNumeric("0x89f")
);
CUT.isFalse("isNumeric(); false",
  CEL.isNumeric(null) || CEL.isNumeric(undefined) || CEL.isNumeric(NaN)
    || CEL.isNumeric("NaN") || CEL.isNumeric("1,42") || CEL.isNumeric("#foo")
    || CEL.isNumeric("1.2.3") || CEL.isNumeric("") || CEL.isNumeric("bar")
    || CEL.isNumeric(" ") || CEL.isNumeric("\r\n") || CEL.isNumeric("true")
    || CEL.isNumeric("false") || CEL.isNumeric("1<10") || CEL.isNumeric([])
    || CEL.isNumeric({}) || CEL.isNumeric("-0x89f")
);

CUT.isTrue("isArrayBuffer(); true", CEL.isArrayBuffer(new ArrayBuffer(8)));
CUT.isFalse("isArrayBuffer(); false 1", CEL.isArrayBuffer([4,5,6]));
CUT.isFalse("isArrayBuffer(); false 2", CEL.isArrayBuffer(new Int8Array(5)));
CUT.isTrue("isTypedArray - true 1 - Int8Array",
  CEL.isTypedArray(new Int8Array(5)));
CUT.isTrue("isTypedArray - true 2 - Uint8Array",
  CEL.isTypedArray(new Uint8Array(5)));
CUT.isTrue("isTypedArray - true 3 - Int16Array",
  CEL.isTypedArray(new Int16Array(5)));
CUT.isTrue("isTypedArray - true 4 - Uint16Array",
  CEL.isTypedArray(new Uint16Array(5)));
CUT.isTrue("isTypedArray - true 5 - Int32Array",
  CEL.isTypedArray(new Int32Array(5)));
CUT.isTrue("isTypedArray - true 6 - Uint32Array",
  CEL.isTypedArray(new Uint32Array(5)));
CUT.isTrue("isTypedArray - true 7 - Float32Array",
  CEL.isTypedArray(new Float32Array(5)));
CUT.isTrue("isTypedArray - true 8 - Float64Array",
  CEL.isTypedArray(new Float64Array(5)));
CUT.isTrue("isTypedArray - true 9 - Uint8ClampedArray",
  CEL.isTypedArray(new Uint8ClampedArray(5)));
if (!!window.BigInt64Array){CUT.isTrue("isTypedArray - true 10 - BigInt64Array",
  CEL.isTypedArray(new BigInt64Array(5)));}
if (window.BigUint64Array) {
  CUT.isTrue("isTypedArray - true 11 - BigUint64Array",
    CEL.isTypedArray(new BigUint64Array(5)));
}
CUT.isFalse("isTypedArray - false 1 - Array", CEL.isTypedArray([4,5,6]));
CUT.isFalse("isTypedArray - false 2 - ArrayBuffer",
  CEL.isTypedArray(new ArrayBuffer(8)));
CUT.isTrue("isPromise(); - true ", CEL.isPromise(CEL.delay(1000)));
CUT.isFalse("isPromise(); - false ", CEL.isPromise({}));
CUT.isTrue("isSymbol(); true", CEL.isSymbol(Symbol("str")));
CUT.isFalse("isSymbol(); false", CEL.isSymbol(CEL.noop));
CUT.isTrue("isMap(); true", CEL.isMap(new Map()));
CUT.isFalse("isMap(); false", CEL.isMap(CEL.noop));
CUT.isTrue("isSet(); true", CEL.isSet(new Set()));
CUT.isFalse("isSet(); false", CEL.isSet(CEL.noop));
CUT.isTrue("isWeakMap(); true", CEL.isWeakMap(new WeakMap()));
CUT.isFalse("isWeakMap(); false", CEL.isWeakMap(CEL.noop));
CUT.isTrue("isWeakSet(); true", CEL.isWeakSet(new WeakSet()));
CUT.isFalse("isWeakSet(); false", CEL.isWeakSet(CEL.noop));
CUT.isTrue("isIterator(); true - Array values();",
  CEL.isIterator([4,5,6].values()));
CUT.isTrue("isIterator(); true - Set values();",
  CEL.isIterator(new Set([4,5,7]).values()));
CUT.isTrue("isIterator(); true - Map values();",
  CEL.isIterator(new Map([[4,5],[5,6]]).values()));
CUT.isTrue("isIterator(); true - Nodelist values();",
  CEL.isIterator(document.querySelectorAll("h3").values()));

CUT.isFalse("isIterator(); false - Array", CEL.isIterator([4,5,7]));
CUT.isTrue("isIterable(); true", CEL.isIterable([]) && CEL.isIterable("")
    && CEL.isIterable(new Map([[1,2],[3,4]])) && CEL.isIterable(new Set([1,2]))
);
CUT.isFalse("isIterable(); false", CEL.isIterable(42) || CEL.isIterable(3.14)
  || CEL.isIterable({a:1,b:2}) || CEL.isIterable(true) ||CEL.isIterable(false));

if (!!window.BigInt) {
  CUT.isTrue("isBigInt(); true",CEL.isBigInt(BigInt(9007199254740991)+BigInt(5)));
  CUT.isFalse("isBigInt(); false 1", CEL.isBigInt(9007199254740990));
  CUT.isFalse("isBigInt(); false 2", CEL.isBigInt(3.14));
  CUT.isFalse("isBigInt(); false 3", CEL.isBigInt("Arthur Dent"));
}


/* isSameType(); */
CUT.addElement("hr");
CUT.addElement("h3", "isSameType();");
CUT.isTrue("isSameArray(); step 1", CEL.isSameArray([], []) );
CUT.isTrue("isSameArray(); step 2", CEL.isSameArray([5,4,5], [5,4,5]) );
CUT.isFalse("isSameArray(); step 3", CEL.isSameArray([5,4,5], [4,5,6]) );
CUT.isFalse("isSameArray(); step 4", CEL.isSameArray([5,4,6], [4,5,5]) );
CUT.isFalse("isSameArray(); step 5", CEL.isSameArray([5,4,5], [4,4,5]) );
CUT.isFalse("isSameArray(); step 6", CEL.isSameArray([5,5], [5,5,4]) );
CUT.isFalse("isSameArray(); step 7", CEL.isSameArray([5,5,4], [5,5]) );
CUT.isFalse("isSameArray(); step 8", CEL.isSameArray([5,5], new Map([[5,5],[5,5]])) );
CUT.isFalse("isSameArray(); step 9", CEL.isSameArray([5,5], new Set([5,5])) );
CUT.isFalse("isSameArray(); step 10", CEL.isSameArray([], {}) );
CUT.isFalse("isSameArray(); step 11", CEL.isSameArray({}, {}) );
CUT.isFalse("isSameArray(); step 12", CEL.isSameArray("4", "4") );
CUT.isFalse("isSameArray(); step 13", CEL.isSameArray(4, 4) );
CUT.isFalse("isSameArray(); step 14", CEL.isSameArray(4, 5) );

var
  isSameObjectO1 = { "p1": 4, "p2": 5, "p3": 6 },
  isSameObjectO2 = { "p1": 4, "p2": 5, "p3": 6 },
  isSameObjectO3 = { "p1": 4, "p2": 5, "p3": 7 },
  isSameObjectO4 = { "p1": 4, "p2": 5, "p3": 6, "p4": 7 };
CUT.isTrue("isSameObject(); true 1",
  CEL.isSameObject(isSameObjectO1, isSameObjectO2));
CUT.isTrue("isSameObject(); true 2 empty", CEL.isSameObject({}, {}) );
CUT.isFalse("isSameObject(); false 1",
  CEL.isSameObject(isSameObjectO1, isSameObjectO3));
CUT.isFalse("isSameObject(); false 2",
  CEL.isSameObject(isSameObjectO1, isSameObjectO4));
CUT.isFalse("isSameObject(); false 3",
  CEL.isSameObject([4,5], {"0": 4, "1": 5, "length": 2}));

CUT.isTrue("isSameSet(); true",
  CEL.isSameSet(new Set([4,6,8,2]), new Set([2, 4, 6, 8, 4])));
CUT.isFalse("isSameSet(); false 1",
  CEL.isSameSet(new Set([4,6,8,2]), new Set([2, 4, 6, 9])));
CUT.isFalse("isSameSet(); false 2",
  CEL.isSameSet(new Set([4,6,8,2]), new Set([2, 4, 6, 8, 9])));
CUT.isFalse("isSameSet(); false 3",
  CEL.isSameSet(new Set([4,6,8,2]), [4,6,8,2]));

CUT.isTrue("isSameMap(); true", CEL.isSameMap(
  new Map([["str", 1], [17, "x"], [true, 42]]),
  new Map([["str", 1], [17, "x"], [true, 42]])
));
CUT.isFalse("isSameMap(); false 1", CEL.isSameMap(
  new Map([["str", 1], [17, "x"], [true, 42]]),
  new Map([["str", 1], [17, "x"], [false, 42]])
));
CUT.isFalse("isSameMap(); false 2", CEL.isSameMap(
  new Map([["str", 1], [17, "x"], [true, 42]]),
  new Map([["str", 1], [17, "x"], [false, 42], [true, 42]])
));
CUT.isFalse("isSameMap(); false 3", CEL.isSameMap(
  new Map([["str", 1], [17, "x"], [true, 42]]), [["str",1], [17,"x"], [true,42]]
));

CUT.isTrue("isSameIterator(); true",
  CEL.isSameIterator([4,8,6,2], [4,8,6,2]));
CUT.isFalse("isSameIterator(); false 1",
  CEL.isSameIterator([4,8,6,2,1], [4,8,6,2,5]));
CUT.isFalse("isSameIterator(); false 2",
  CEL.isSameIterator(new Set([4,6,8,2,6,4]), [4,8,6,2,5]));


/* Abstract API */

CUT.addElement("hr");
CUT.addElement("h3", "Abstract API");

var getSetHasObj = {};
CUT.isTrue("getInV(); + getIn(); + setIn(); + hasIn();",
  !CEL.hasIn(getSetHasObj, "pr1")
    && CEL.getIn(getSetHasObj, "pr1") === undefined
    && CEL.getInV(getSetHasObj, "pr1") === undefined
    && CEL.setIn(getSetHasObj, "pr1", 42) === getSetHasObj
    && CEL.hasIn(getSetHasObj, "pr1")
    && CEL.getIn(getSetHasObj, "pr1") === 42
    && CEL.getInV(getSetHasObj, "pr1") === 42
);

CUT.isTrue("isPropertyKey();",
  CEL.isPropertyKey("str")
    && CEL.isPropertyKey(Symbol("42"))
    && !CEL.isPropertyKey(42)
);

CUT.isTrue("toPropertyKey();",
  typeof CEL.toPropertyKey("str") === "string"
    && typeof CEL.toPropertyKey(Symbol("42")) === "symbol"
    && typeof CEL.toPropertyKey(42) === "string"
);

CUT.isTrue("toObject();", typeof CEL.toObject("str") === "object");

var isSameValuefoo = { "a": 1 }, isSameValuebar = { "a": 1 };
var isSameValueStr = ""
  + +CEL.isSameValue(25,25)
  + +CEL.isSameValue("foo","foo")
  + +CEL.isSameValue("foo","bar")
  + +CEL.isSameValue(null,null)
  + +CEL.isSameValue(undefined,undefined)
  + +CEL.isSameValue(window,window)
  + +CEL.isSameValue([],[])
  + +CEL.isSameValue(isSameValuefoo,isSameValuefoo)
  + +CEL.isSameValue(isSameValuefoo,isSameValuebar)
  + +CEL.isSameValue(0,-0)
  + +CEL.isSameValue(+0,-0)
  + +CEL.isSameValue(-0,-0)
  + (!!window.BigInt ? +CEL.isSameValue(BigInt(0),BigInt(-0)) : 1)
  + +CEL.isSameValue(NaN,0/0)
  + +CEL.isSameValue(NaN,Number.NaN)
  + +CEL.isSameValue(+Infinity,Infinity)
  + +CEL.isSameValue(Infinity,Infinity)
  + +CEL.isSameValue(-Infinity,-Infinity)
  + +CEL.isSameValue(+Infinity,-Infinity);
CUT.isEqual("isSameValue(); "+"<code>"+isSameValueStr+"</code>",
  isSameValueStr, "1101110100011111110"
);

var isSameValueZerofoo = { "a": 1 }, isSameValueZerobar = { "a": 1 };
var isSameValueZeroStr = ""
  + +CEL.isSameValueZero(25,25)
  + +CEL.isSameValueZero("foo","foo")
  + +CEL.isSameValueZero("foo","bar")
  + +CEL.isSameValueZero(null,null)
  + +CEL.isSameValueZero(undefined,undefined)
  + +CEL.isSameValueZero(window,window)
  + +CEL.isSameValueZero([],[])
  + +CEL.isSameValueZero(isSameValueZerofoo,isSameValueZerofoo)
  + +CEL.isSameValueZero(isSameValueZerofoo,isSameValueZerobar)
  + +CEL.isSameValueZero(0,-0)
  + +CEL.isSameValueZero(+0,-0)
  + +CEL.isSameValueZero(-0,-0)
  + (!!window.BigInt ? +CEL.isSameValueZero(BigInt(0),BigInt(-0)) : 1)
  + +CEL.isSameValueZero(NaN,0/0)
  + +CEL.isSameValueZero(NaN,Number.NaN)
  + +CEL.isSameValueZero(+Infinity,Infinity)
  + +CEL.isSameValueZero(Infinity,Infinity)
  + +CEL.isSameValueZero(-Infinity,-Infinity)
  + +CEL.isSameValueZero(+Infinity,-Infinity);
CUT.isEqual("isSameValueZero(); "+"<code>"+isSameValueZeroStr+"</code>",
  isSameValueZeroStr, "1101110101111111110"
);

var isSameValueNonNumberfoo = { "a": 1 }, isSameValueNonNumberbar = { "a": 1 };
var isSameValueNonNumberStr = ""
  + +CEL.isSameValueNonNumber(25,25)
  + +CEL.isSameValueNonNumber("foo","foo")
  + +CEL.isSameValueNonNumber("foo","bar")
  + +CEL.isSameValueNonNumber(null,null)
  + +CEL.isSameValueNonNumber(undefined,undefined)
  + +CEL.isSameValueNonNumber(window,window)
  + +CEL.isSameValueNonNumber([],[])
  + +CEL.isSameValueNonNumber(isSameValueNonNumberfoo,isSameValueNonNumberfoo)
  + +CEL.isSameValueNonNumber(isSameValueNonNumberfoo,isSameValueNonNumberbar)
  + +CEL.isSameValueNonNumber(0,-0)
  + +CEL.isSameValueNonNumber(+0,-0)
  + +CEL.isSameValueNonNumber(-0,-0)
  + (!!window.BigInt ? +CEL.isSameValueNonNumber(BigInt(0),BigInt(-0)) : 1)
  + +CEL.isSameValueNonNumber(NaN,0/0)
  + +CEL.isSameValueNonNumber(NaN,Number.NaN)
  + +CEL.isSameValueNonNumber(+Infinity,Infinity)
  + +CEL.isSameValueNonNumber(Infinity,Infinity)
  + +CEL.isSameValueNonNumber(-Infinity,-Infinity)
  + +CEL.isSameValueNonNumber(+Infinity,-Infinity);
CUT.isEqual("isSameValueNonNumber(); "+"<code>"+isSameValueNonNumberStr+"</code>",
  isSameValueNonNumberStr, "1101110101111001110"
);

function createMethodPropertyFN () {};
var createMethodPropertySTR = "" + ("getX" in createMethodPropertyFN.prototype);
createMethodPropertySTR += CEL.createMethodProperty(
  createMethodPropertyFN.prototype, "getX", function () { return this.x; }
);
createMethodPropertySTR += ("getX" in createMethodPropertyFN.prototype);
CUT.isEqual("createMethodProperty();", createMethodPropertySTR,
  "false[object Object]true"
);

CUT.isEqual("type();",
 "nullundefinedobjectfunctionnumberstring",
 CEL.type(null) + CEL.type(undefined)
  + CEL.type([]) + CEL.type(CEL.noop) + CEL.type(42) + CEL.type("42")
);

CUT.isEqual("isIndex();", "1100000000000000000000", ""
  + +CEL.isIndex(3)
  + +CEL.isIndex(0)
  + +CEL.isIndex("3")
  + +CEL.isIndex(true)
  + +CEL.isIndex(-0)
  + +CEL.isIndex(Infinity)
  + +CEL.isIndex(-Infinity)
  + +CEL.isIndex("Infinity")
  + +CEL.isIndex("-Infinity")
  + +CEL.isIndex(-3)
  + +CEL.isIndex(3.14)
  + +CEL.isIndex(-3.14)
  + +CEL.isIndex("fasdas")
  + +CEL.isIndex(false)
  + +CEL.isIndex("-3")
  + +CEL.isIndex("3.14")
  + +CEL.isIndex("-3.14")
  + +CEL.isIndex("adsasd")
  + +CEL.isIndex({})
  + +CEL.isIndex([])
  + +CEL.isIndex(undefined)
  + +CEL.isIndex(null)
);

CUT.isEqual("toIndex();", "3031021474836470214748364700300003000000", ""
  +CEL.toIndex(3)
  +CEL.toIndex(0)
  +CEL.toIndex("3")
  +CEL.toIndex(true)
  +CEL.toIndex(-0)
  +CEL.toIndex(Infinity)
  +CEL.toIndex(-Infinity)
  +CEL.toIndex("Infinity")
  +CEL.toIndex("-Infinity")
  +CEL.toIndex(-3)
  +CEL.toIndex(3.14)
  +CEL.toIndex(-3.14)
  +CEL.toIndex("fasdas")
  +CEL.toIndex(false)
  +CEL.toIndex("-3")
  +CEL.toIndex("3.14")
  +CEL.toIndex("-3.14")
  +CEL.toIndex("adsasd")
  +CEL.toIndex({})
  +CEL.toIndex([])
  +CEL.toIndex(undefined)
  +CEL.toIndex(null)
);

CUT.isEqual("toInteger();",
  "3333-3-3-3-31002147483647-21474836482147483647-21474836480000000",
  ""
  +CEL.toInteger(3)
  +CEL.toInteger("3")
  +CEL.toInteger(3.14)
  +CEL.toInteger("3.14")
  +CEL.toInteger(-3)
  +CEL.toInteger(-3.14)
  +CEL.toInteger("-3")
  +CEL.toInteger("-3.14")
  +CEL.toInteger(true)
  +CEL.toInteger(0)
  +CEL.toInteger(-0)
  +CEL.toInteger(Infinity)
  +CEL.toInteger(-Infinity)
  +CEL.toInteger("Infinity")
  +CEL.toInteger("-Infinity")
  +CEL.toInteger("fasdas")
  +CEL.toInteger(false)
  +CEL.toInteger("adsasd")
  +CEL.toInteger({})
  +CEL.toInteger([])
  +CEL.toIndex(undefined)
  +CEL.toIndex(null)
);

function createDataPropertyFN () {};
var createDataPropertySTR= ""+Object.hasOwn(createDataPropertyFN.prototype,"x");
createDataPropertySTR += CEL.createDataProperty(
  createDataPropertyFN.prototype, "x", 42
);
var createDataPropertyFNObject = new createDataPropertyFN();
createDataPropertySTR += createDataPropertyFNObject.x === 42;
CUT.isEqual("createDataProperty();",
  createDataPropertySTR, "false[object Object]true"
);

var toArrayA1 = [4,5,6];
CUT.isTrue("toArray();", toArrayA1 === CEL.toArray(toArrayA1)
  && JSON.stringify(CEL.toArray({"length":3, 0:7, 1:8, 2:9})) === "[7,8,9]"
);

/* Math API */

CUT.addElement("hr");
CUT.addElement("h3", "Math API");

CUT.isTrue("inRange();",
  CEL.inRange(4,3,6) && CEL.inRange(-3.14, -4.5, 9.21)
    && !CEL.inRange(2,3,6) && !CEL.inRange(7,3,6)
    && !CEL.inRange(-5.14, -4.5, 9.21) && !CEL.inRange(-9.24, -4.5, 9.21)
);

CUT.isTrue("randomInt();", CEL.randomInt() <= 101);
CUT.isTrue("randomInt(max);", CEL.randomInt(30) <= 30);
var testRandom = CEL.randomInt(51,55);
CUT.isTrue("randomInt(min,max);", testRandom >= 51 && testRandom <= 55);

CUT.isTrue("randomFloat();", CEL.randomFloat() <= 101);
CUT.isTrue("randomFloat(max);", CEL.randomFloat(30) <= 30);
var testRandom = CEL.randomFloat(51,55);
CUT.isTrue("randomFloat(min,max);", testRandom >= 51 && testRandom <= 55);

var float16str = "#" + CEL.toFloat16(0)
  + "#" + CEL.toFloat16(+0)
  + "#" + CEL.toFloat16(-0)
  + "#" + CEL.toFloat16(Number.POSITIVE_INFINITY)
  + "#" + CEL.toFloat16(Number.NEGATIVE_INFINITY)
  + "#" + CEL.toFloat16(3.14)
  + "#" + CEL.toFloat16(-3.14)
  + "#" + CEL.toFloat16(65504)
  + "#" + CEL.toFloat16(-65504)
  + "#" + CEL.toFloat16(65504.0)
  + "#" + CEL.toFloat16(-65504.0)
  + "#" + CEL.toFloat16(65504.1)
  + "#" + CEL.toFloat16(-65504.1)
  + "#" + CEL.toFloat16(65505)
  + "#" + CEL.toFloat16(-65505)
  + "#" + CEL.toFloat16("lorem");
CUT.isEqual("toFloat16();", float16str,
  "#0#0#0#65504#-65504#3.14#-3.14#65504#-65504#65504#-65504#65504#-65504#65504#-65504#0"
);
CUT.log("<code>\""+float16str+"\"</code>");

var float16str = ""
  + +CEL.isFloat16(0)
  + +CEL.isFloat16(+0)
  + +CEL.isFloat16(-0)
  + +CEL.isFloat16(65504)
  + +CEL.isFloat16(-65504)
  + +CEL.isFloat16(3.14)
  + +CEL.isFloat16(-3.14)
  + +CEL.isFloat16(65504.1)
  + +CEL.isFloat16(-65504.1)
  + +CEL.isFloat16(65505)
  + +CEL.isFloat16(-65505)
  + +CEL.isFloat16("lorem")
  + +CEL.isFloat16(true)
  + +CEL.isFloat16([]);
CUT.isEqual("isFloat16();", float16str, "11111110000000");
CUT.log("<code>\""+float16str+"\"</code>");

CUT.isTrue(
  "signbit();",
  !CEL.signbit("str") && !CEL.signbit("5") && CEL.signbit("-5")
    && !CEL.signbit("4.2") && CEL.signbit("-4.2") && CEL.signbit(-3.14)
    && !CEL.signbit(3.14) && CEL.signbit(-1) && !CEL.signbit(1)
    && !CEL.signbit(0) && CEL.signbit(-0) && !CEL.signbit(+0)
    && !CEL.signbit(Infinity) && CEL.signbit(-Infinity)
    && !CEL.signbit(+Infinity)
);

// clamp();
CUT.isEqual("clamp - try 1", CEL.clamp(3,2,5), 3);
CUT.isEqual("clamp - try 2", CEL.clamp(-2.5,3.1,5), 3.1);
CUT.isEqual("clamp - try 3", CEL.clamp(8,3,5), 5);
CUT.isEqual("clamp - try without parameter", CEL.clamp(), undefined);
// minmax();
CUT.isEqual("minmax - try 1", CEL.minmax(3,2,5), 3);
CUT.isEqual("minmax - try 2", CEL.minmax(-2.5,3.1,5), 3.1);
CUT.isEqual("minmax - try 3", CEL.minmax(8,3,5), 5);
CUT.isEqual("minmax - try without parameter", CEL.minmax(), undefined);
// product();
CUT.isEqual("product - try 1", CEL.product(3), 3);
CUT.isEqual("product - try 2", CEL.product(3, 5), 15);
CUT.isEqual("product - try 3", CEL.product(3.14, -5), -15.700000000000001);
CUT.isEqual("product - try with many parameter types",
  ""+CEL.product(true, 3.14, -9, 'Arthur Dent'), "NaN");
CUT.isEqual("product - try without parameter", CEL.product(), undefined);
// sum();
CUT.isEqual("SUM - try 1", CEL.sum(3), 3);
CUT.isEqual("SUM - try 2", CEL.sum(3, 5), 8);
CUT.isEqual("SUM - try 3", CEL.sum(3.14, -5), -1.8599999999999999);
CUT.isEqual("SUM - try with many parameter types",
  CEL.sum(true, 3.14, -9, 'Arthur Dent'), "-4.859999999999999Arthur Dent");
CUT.isEqual("SUM - try without parameter", CEL.sum(), undefined);
// avg();
CUT.isEqual("AVG1", CEL.avg(2, 4, 3), 3);
CUT.isEqual("AVG2", CEL.avg(2, 4, 3.14), 3.046666666666667);
CUT.isEqual("AVG3", CEL.avg(2, -8, 3.14), -0.9533333333333333);
CUT.isEqual("AVG4", CEL.avg(5), 5);
CUT.isEqual("AVG5", ""+CEL.avg(), "NaN");
// isEven();
CUT.isEqual("isEven1", CEL.isEven(8), true);
CUT.isEqual("isEven2", CEL.isEven(9), false);
CUT.isEqual("isEven3", CEL.isEven(8.5), false);
CUT.isEqual("isEven4", CEL.isEven(9.5), false);
CUT.isEqual("isEven5", CEL.isEven('Arthur Dent'), false);
// isOdd();
CUT.isEqual("isOdd2", CEL.isOdd(9), true);
CUT.isEqual("isOdd1", CEL.isOdd(8), false);
CUT.isEqual("isOdd3", CEL.isOdd(8.5), true);
CUT.isEqual("isOdd4", CEL.isOdd(9.5), true);
CUT.isEqual("isOdd5", CEL.isOdd('Arthur Dent'), false);
// toInt8();
CUT.isEqual("toInt8 1", CEL.toInt8(9), 9);
CUT.isEqual("toInt8 2", CEL.toInt8(-5), -5);
CUT.isEqual("toInt8 3", CEL.toInt8(8.5), 8);
CUT.isEqual("toInt8 4", CEL.toInt8(-8.5), -8);
CUT.isEqual("toInt8 5", CEL.toInt8(130), 127);
CUT.isEqual("toInt8 6", CEL.toInt8(-130), -128);
CUT.isEqual("toInt8 7", CEL.toInt8('Arthur Dent'), 0);
CUT.isEqual("toInt8 8", CEL.toInt8(Infinity), 127);
CUT.isEqual("toInt8 9", CEL.toInt8('-Infinity'), -128);
// toUInt8();
CUT.isEqual("toUInt8 1", CEL.toUInt8(9), 9);
CUT.isEqual("toUInt8 2", CEL.toUInt8(-5), 0);
CUT.isEqual("toUInt8 3", CEL.toUInt8(8.5), 8);
CUT.isEqual("toUInt8 4", CEL.toUInt8(-8.5), 0);
CUT.isEqual("toUInt8 5", CEL.toUInt8(1130), 255);
CUT.isEqual("toUInt8 6", CEL.toUInt8('Arthur Dent'), 0);
CUT.isEqual("toUInt8 7", CEL.toUInt8(Infinity), 255);
CUT.isEqual("toUInt8 8", CEL.toUInt8('-Infinity'), 0);
// toInt16();
CUT.isEqual("toInt16 1", CEL.toInt16(199), 199);
CUT.isEqual("toInt16 2", CEL.toInt16(-1845), -1845);
CUT.isEqual("toInt16 3", CEL.toInt16(8.5), 8);
CUT.isEqual("toInt16 4", CEL.toInt16(-8.5), -8);
CUT.isEqual("toInt16 5", CEL.toInt16(111130), 32767);
CUT.isEqual("toInt16 6", CEL.toInt16(-111130), -32768);
CUT.isEqual("toInt16 7", CEL.toInt16('Arthur Dent'), 0);
CUT.isEqual("toInt16 8", CEL.toInt16(Infinity), 32767);
CUT.isEqual("toInt16 9", CEL.toInt16('-Infinity'), -32768);
// toUInt16();
CUT.isEqual("toUInt16 1", CEL.toUInt16(199), 199);
CUT.isEqual("toUInt16 2", CEL.toUInt16(-1845), 0);
CUT.isEqual("toUInt16 3", CEL.toUInt16(8.5), 8);
CUT.isEqual("toUInt16 4", CEL.toUInt16(-8.5), 0);
CUT.isEqual("toUInt16 5", CEL.toUInt16(111130), 65535);
CUT.isEqual("toUInt16 6", CEL.toUInt16('Arthur Dent'), 0);
CUT.isEqual("toUInt16 7", CEL.toUInt16(Infinity), 65535);
CUT.isEqual("toUInt16 8", CEL.toUInt16('-Infinity'), 0);
// toInt32();
CUT.isEqual("toInt32 1", CEL.toInt32(199), 199);
CUT.isEqual("toInt32 2", CEL.toInt32(-1845), -1845);
CUT.isEqual("toInt32 3", CEL.toInt32(8.5), 8);
CUT.isEqual("toInt32 4", CEL.toInt32(-8.5), -8);
CUT.isEqual("toInt32 5", CEL.toInt32(2147483649), 2147483647);
CUT.isEqual("toInt32 6", CEL.toInt32(-3147483649), -2147483648);
CUT.isEqual("toInt32 7", CEL.toInt32('Arthur Dent'), 0);
CUT.isEqual("toInt32 8", CEL.toInt32(Infinity), 2147483647);
CUT.isEqual("toInt32 9", CEL.toInt32('-Infinity'), -2147483648);
// toUInt32();
CUT.isEqual("toUInt32 1", CEL.toUInt32(199), 199);
CUT.isEqual("toUInt32 2", CEL.toUInt32(-1845), 0);
CUT.isEqual("toUInt32 3", CEL.toUInt32(8.5), 8);
CUT.isEqual("toUInt32 4", CEL.toUInt32(-8.5), 0);
CUT.isEqual("toUInt32 5", CEL.toUInt32(4294967297), 4294967295);
CUT.isEqual("toUInt32 6", CEL.toUInt32('Arthur Dent'), 0);
CUT.isEqual("toUInt32 7", CEL.toUInt32(Infinity), 4294967295);
CUT.isEqual("toUInt32 8", CEL.toUInt32('-Infinity'), 0);
// toBigInt64();
CUT.isEqual("toBigInt64 1", CEL.toBigInt64(199), 199n);
CUT.isEqual("toBigInt64 2", CEL.toBigInt64(-1845), -1845n);
CUT.isEqual("toBigInt64 3", CEL.toBigInt64(8.5), 8n);
CUT.isEqual("toBigInt64 4", CEL.toBigInt64(-8.5), -8n);
CUT.isEqual("toBigInt64 5", CEL.toBigInt64(9223372036854775809),
  9223372036854775808n);
CUT.isEqual("toBigInt64 6", CEL.toBigInt64('Arthur Dent'), 0n);
CUT.isEqual("toBigInt64 7", CEL.toBigInt64(Infinity),
  9223372036854775808n);
CUT.isEqual("toBigInt64 8", CEL.toBigInt64('-Infinity'),
  -9223372036854775808n);
CUT.isEqual("toBigInt64 9", CEL.toBigInt64(18446744073709551617),
  9223372036854775808n);
CUT.isEqual("toBigInt64 10", CEL.toBigInt64(-18446744073709551617),
  -9223372036854775808n);
// toBigUInt64();
CUT.isEqual("toBigUInt64 1", CEL.toBigUInt64(199), 199n);
CUT.isEqual("toBigUInt64 2", CEL.toBigUInt64(-1845), 0n);
CUT.isEqual("toBigUInt64 3", CEL.toBigUInt64(8.5), 8n);
CUT.isEqual("toBigUInt64 4", CEL.toBigUInt64(-8.5), 0n);
CUT.isEqual("toBigUInt64 5", CEL.toBigUInt64(18446744073709551617),
  18446744073709551616n);
CUT.isEqual("toBigUInt64 6", CEL.toBigUInt64('Arthur Dent'), 0n);
CUT.isEqual("toBigUInt64 7", CEL.toBigUInt64(Infinity),
  18446744073709551616n);
CUT.isEqual("toBigUInt64 8", CEL.toBigUInt64('-Infinity'), 0n);
CUT.isEqual("toBigUInt64 9", CEL.toBigUInt64(-9223372036854775808n), 0n);
// toFloat32();
CUT.isEqual("toFloat32 1", CEL.toFloat32(199), 199);
CUT.isEqual("toFloat32 2", CEL.toFloat32(-1845), -1845);
CUT.isEqual("toFloat32 3", CEL.toFloat32(8.5), 8.5);
CUT.isEqual("toFloat32 4", CEL.toFloat32(-8.5), -8.5);
CUT.isEqual("toFloat32 5", CEL.toFloat32(-3.4e39), -3.4e+38);
CUT.isEqual("toFloat32 6", CEL.toFloat32(3.4e39), +3.4e38);
CUT.isEqual("toFloat32 7", CEL.toFloat32('Arthur Dent'), 0);
CUT.isEqual("toFloat32 8", CEL.toFloat32(Infinity), 3.4e+38);
CUT.isEqual("toFloat32 9", CEL.toFloat32('-Infinity'), -3.4e+38);
// isInt8();
CUT.isEqual("isInt8 1", CEL.isInt8(34), true);
CUT.isEqual("isInt8 2", CEL.isInt8(-34), true);
CUT.isEqual("isInt8 3", CEL.isInt8(-129), false);
CUT.isEqual("isInt8 4", CEL.isInt8(128), false);
CUT.isEqual("isInt8 5", CEL.isInt8(34.5), false);
CUT.isEqual("isInt8 6", CEL.isInt8(-34.5), false);
CUT.isEqual("isInt8 7", CEL.isInt8('Arthur Dent'), false);
CUT.isEqual("isInt8 8", CEL.isInt8(true), false);
CUT.isEqual("isInt8 9", CEL.isInt8(false), false);
CUT.isEqual("isInt8 10", CEL.isInt8(Infinity), false);
CUT.isEqual("isInt8 11", CEL.isInt8(-Infinity), false);
CUT.isEqual("isInt8 12", CEL.isInt8([]), false);
CUT.isEqual("isInt8 13", CEL.isInt8({}), false);
// isUInt8();
CUT.isEqual("isUInt8 1", CEL.isUInt8(34), true);
CUT.isEqual("isUInt8 2", CEL.isUInt8(-34), false);
CUT.isEqual("isUInt8 3", CEL.isUInt8(-1), false);
CUT.isEqual("isUInt8 4", CEL.isUInt8(256), false);
CUT.isEqual("isUInt8 5", CEL.isUInt8(34.5), false);
CUT.isEqual("isUInt8 6", CEL.isUInt8(-34.5), false);
CUT.isEqual("isUInt8 7", CEL.isUInt8('Arthur Dent'), false);
CUT.isEqual("isUInt8 8", CEL.isUInt8(true), false);
CUT.isEqual("isUInt8 9", CEL.isUInt8(false), false);
CUT.isEqual("isUInt8 10", CEL.isUInt8(Infinity), false);
CUT.isEqual("isUInt8 11", CEL.isUInt8(-Infinity), false);
CUT.isEqual("isUInt8 12", CEL.isUInt8([]), false);
CUT.isEqual("isUInt8 13", CEL.isUInt8({}), false);
// isInt16();
CUT.isEqual("isInt16 1", CEL.isInt16(34), true);
CUT.isEqual("isInt16 2", CEL.isInt16(-34), true);
CUT.isEqual("isInt16 3", CEL.isInt16(-32769), false);
CUT.isEqual("isInt16 4", CEL.isInt16(32768), false);
CUT.isEqual("isInt16 5", CEL.isInt16(34.5), false);
CUT.isEqual("isInt16 6", CEL.isInt16(-34.5), false);
CUT.isEqual("isInt16 7", CEL.isInt16('Arthur Dent'), false);
CUT.isEqual("isInt16 8", CEL.isInt16(true), false);
CUT.isEqual("isInt16 9", CEL.isInt16(false), false);
CUT.isEqual("isInt16 10", CEL.isInt16(Infinity), false);
CUT.isEqual("isInt16 11", CEL.isInt16(-Infinity), false);
CUT.isEqual("isInt16 12", CEL.isInt16([]), false);
CUT.isEqual("isInt16 13", CEL.isInt16({}), false);
// isUInt16();
CUT.isEqual("isUInt16 1", CEL.isUInt16(34), true);
CUT.isEqual("isUInt16 2", CEL.isUInt16(-34), false);
CUT.isEqual("isUInt16 3", CEL.isUInt16(-1), false);
CUT.isEqual("isUInt16 4", CEL.isUInt16(65536), false);
CUT.isEqual("isUInt16 5", CEL.isUInt16(34.5), false);
CUT.isEqual("isUInt16 6", CEL.isUInt16(-34.5), false);
CUT.isEqual("isUInt16 7", CEL.isUInt16('Arthur Dent'), false);
CUT.isEqual("isUInt16 8", CEL.isUInt16(true), false);
CUT.isEqual("isUInt16 9", CEL.isUInt16(false), false);
CUT.isEqual("isUInt16 10", CEL.isUInt16(Infinity), false);
CUT.isEqual("isUInt16 11", CEL.isUInt16(-Infinity), false);
CUT.isEqual("isUInt16 12", CEL.isUInt16([]), false);
CUT.isEqual("isUInt16 13", CEL.isUInt16({}), false);
// isInt32();
CUT.isEqual("isInt32 1", CEL.isInt32(34), true);
CUT.isEqual("isInt32 2", CEL.isInt32(-34), true);
CUT.isEqual("isInt32 3", CEL.isInt32(-2147483649), false);
CUT.isEqual("isInt32 4", CEL.isInt32(2147483648), false);
CUT.isEqual("isInt32 5", CEL.isInt32(34.5), false);
CUT.isEqual("isInt32 6", CEL.isInt32(-34.5), false);
CUT.isEqual("isInt32 7", CEL.isInt32('Arthur Dent'), false);
CUT.isEqual("isInt32 8", CEL.isInt32(true), false);
CUT.isEqual("isInt32 9", CEL.isInt32(false), false);
CUT.isEqual("isInt32 10", CEL.isInt32(Infinity), false);
CUT.isEqual("isInt32 11", CEL.isInt32(-Infinity), false);
CUT.isEqual("isInt32 12", CEL.isInt32([]), false);
CUT.isEqual("isInt32 13", CEL.isInt32({}), false);
// isUInt32();
CUT.isEqual("isUInt32 1", CEL.isUInt32(34), true);
CUT.isEqual("isUInt32 2", CEL.isUInt32(-34), false);
CUT.isEqual("isUInt32 3", CEL.isUInt32(-1), false);
CUT.isEqual("isUInt32 4", CEL.isUInt32(4294967296), false);
CUT.isEqual("isUInt32 5", CEL.isUInt32(34.5), false);
CUT.isEqual("isUInt32 6", CEL.isUInt32(-34.5), false);
CUT.isEqual("isUInt32 7", CEL.isUInt32('Arthur Dent'), false);
CUT.isEqual("isUInt32 8", CEL.isUInt32(true), false);
CUT.isEqual("isUInt32 9", CEL.isUInt32(false), false);
CUT.isEqual("isUInt32 10", CEL.isUInt32(Infinity), false);
CUT.isEqual("isUInt32 11", CEL.isUInt32(-Infinity), false);
CUT.isEqual("isUInt32 12", CEL.isUInt32([]), false);
CUT.isEqual("isUInt32 13", CEL.isUInt32({}), false);
// isBigInt64();
CUT.isEqual("isBigInt64 1", CEL.isBigInt64(34n), true);
CUT.isEqual("isBigInt64 2", CEL.isBigInt64(-34n), true);
CUT.isEqual("isBigInt64 3", CEL.isBigInt64(-9223372036854775809n), false);
CUT.isEqual("isBigInt64 4", CEL.isBigInt64(9223372036854775809n), false);
CUT.isEqual("isBigInt64 5", CEL.isBigInt64(34.5), false);
CUT.isEqual("isBigInt64 6", CEL.isBigInt64(-34.5), false);
CUT.isEqual("isBigInt64 7", CEL.isBigInt64('Arthur Dent'), false);
CUT.isEqual("isBigInt64 8", CEL.isBigInt64(true), false);
CUT.isEqual("isBigInt64 9", CEL.isBigInt64(false), false);
CUT.isEqual("isBigInt64 10", CEL.isBigInt64(Infinity), false);
CUT.isEqual("isBigInt64 11", CEL.isBigInt64(-Infinity), false);
CUT.isEqual("isBigInt64 12", CEL.isBigInt64([]), false);
CUT.isEqual("isBigInt64 13", CEL.isBigInt64({}), false);
// isBigUInt64();
CUT.isEqual("isBigUInt64 1", CEL.isBigUInt64(34n), true);
CUT.isEqual("isBigUInt64 2", CEL.isBigUInt64(-34n), false);
CUT.isEqual("isBigUInt64 3", CEL.isBigUInt64(-1n), false);
CUT.isEqual("isBigUInt64 4", CEL.isBigUInt64(18446744073709551617n), false);
CUT.isEqual("isBigUInt64 5", CEL.isBigUInt64(34.5), false);
CUT.isEqual("isBigUInt64 6", CEL.isBigUInt64(-34.5), false);
CUT.isEqual("isBigUInt64 7", CEL.isBigUInt64('Arthur Dent'), false);
CUT.isEqual("isBigUInt64 8", CEL.isBigUInt64(true), false);
CUT.isEqual("isBigUInt64 9", CEL.isBigUInt64(false), false);
CUT.isEqual("isBigUInt64 10", CEL.isBigUInt64(Infinity), false);
CUT.isEqual("isBigUInt64 11", CEL.isBigUInt64(-Infinity), false);
CUT.isEqual("isBigUInt64 12", CEL.isBigUInt64([]), false);
CUT.isEqual("isBigUInt64 13", CEL.isBigUInt64({}), false);


/* Async */

CUT.addElement("hr");
CUT.addElement("h3", "AJAX, domReady(); and other callbacks");

CEL.domReady(function () { CUT.isTrue("domReady(); is working", true); });

/* importScript(); and importScripts(); */
CUT.addElement("p", "Here have to be these results:");
CUT.addElement("ul", "<li>1x domReady(); (core api) is working</li>"
  + "<li>2x importScript(); (core api) - first script loaded</li>"
  + "<li>2x importScript(); (core api) - second script loaded</li>"
  + "<li>1x importScript(); (core api) - with more scripts"
  + "<li>1x importScript(); (core api) with error</li>"
  + "<li>1x getJson()</li>"
  + "<li>1x getText()</li>"
  + "<li>12x ajax()</li>"
  + "<li>8x Array.fromAsync()</li>"
);

CEL.importScript("unittest-is1.js");
CEL.importScript("unittest-is2.js");
CEL.importScript("unittest-is1.js", "unittest-is2.js", "unittest-is3.js");
CEL.importScript("unittest-notExist.js");

/* AJAX API */

var
  resAjaxJson = "img/app-app-catalog/app-bricks.png",
  resAjaxXml = "Vapelyfe",
  resAjaxText = "<p><span class=\"big\">Lorem ipsum dolor sit amet, consectetuer adipiscing elit.</span> Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. <span class=\"small\">In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo.</span></p>\r\n<p><b>Nullam dictum felis eu pede mollis pretium.</b> Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. <small>Etiam ultricies nisi vel augue.</small></p>";

CEL.getText("testdata.txt",function(r){CUT.isEqual("getText();",resAjaxText,r);});
CEL.getJson("testdata.json",function(r){CUT.isEqual("getJson();",resAjaxJson,r[0].image);});

CEL.ajax({
  queryType: "ajax", type: "get", url: "testdata.txt", format: "text",
  success: function(r){ CUT.isEqual("ajax(); ajax get text", resAjaxText, r); },
  error: function (e) {
    CUT.isEqual("ajax(); ajax get text: "+JSON.stringify(e), true, false);
  }
});
CEL.ajax({
  queryType: "ajax", type: "get", url: "testdata.json", format: "json",
  success: function (r) {
    CUT.isEqual("ajax(); ajax get json", resAjaxJson, r[0].image);
  },
  error: function (e) {
    CUT.isEqual("ajax(); ajax get json: "+JSON.stringify(e), true, false);
  }
});
CEL.ajax({
  queryType: "ajax", type: "get", url: "testdata.xml", format: "xml",
  success: function (r) {
    var xa = r.getElementsByTagName("picture");
    var xb = xa[0].getElementsByTagName("title")[0].childNodes[0].nodeValue;
    CUT.isEqual("ajax(); ajax get xml", resAjaxXml, xb);
  },
  error: function (e) {
    CUT.isEqual("ajax(); ajax get xml: "+JSON.stringify(e), true, false);
  }
});

CEL.ajax({
  queryType: "ajax", type: "post", url: "testdata.txt", format: "text",
  data: "a=foo&b=bar baz",
  success: function (r) { CUT.isEqual("ajax(); ajax post text",resAjaxText,r);},
  error: function (e) {
    CUT.isEqual("ajax(); ajax post text: "+JSON.stringify(e), true, false);
  }
});
CEL.ajax({
  queryType: "ajax", type: "post", url: "testdata.json", format: "json",
  data: "a=foo&b=bar baz",
  success: function (r) {
    CUT.isEqual("ajax(); ajax post json", resAjaxJson, r[0].image);
  },
  error: function (e) {
    CUT.isEqual("ajax(); ajax post json: "+JSON.stringify(e), true, false);
  }
});
CEL.ajax({
  queryType: "ajax", type: "post", url: "testdata.xml", format: "xml",
  data: "a=foo&b=bar baz",
  success: function (r) {
    var xa = r.getElementsByTagName("picture");
    var xb = xa[0].getElementsByTagName("title")[0].childNodes[0].nodeValue;
    CUT.isEqual("ajax(); ajax post xml", resAjaxXml, xb);
  },
  error: function (e) {
    CUT.isEqual("ajax(); ajax post xml: "+JSON.stringify(e), true, false);
  }
});

CEL.ajax({
  queryType: "cors", type: "get", url: "testdata.txt", format: "text",
  success: function (r) { CUT.isEqual("ajax(); cors get text",resAjaxText,r);},
  error: function (e) {
    CUT.isEqual("ajax(); cors get text: "+JSON.stringify(e), true, false);
  }
});
CEL.ajax({
  queryType: "cors", type: "get", url: "testdata.json", format: "json",
  success: function (r) {
    CUT.isEqual("ajax(); cors get json", resAjaxJson, r[0].image);
  },
  error: function (e) {
    CUT.isEqual("ajax(); cors get json: "+JSON.stringify(e), true, false);
  }
});
CEL.ajax({
  queryType: "cors", type: "get", url: "testdata.xml", format: "xml",
  success: function (r) {
    var xa = r.getElementsByTagName("picture");
    var xb = xa[0].getElementsByTagName("title")[0].childNodes[0].nodeValue;
    CUT.isEqual("ajax(); cors get xml", resAjaxXml, xb);
  },
  error: function (e) {
    CUT.isEqual("ajax(); cors get xml: "+JSON.stringify(e), true, false);
  }
});

CEL.ajax({
  queryType: "cors", type: "post", url: "testdata.txt", format: "text",
  data: "a=foo&b=bar baz",
  success: function (r) {
    CUT.isEqual("ajax(); cors post text", resAjaxText, r);
  },
  error: function (e) {
    CUT.isEqual("ajax(); cors post text: "+JSON.stringify(e), true, false);
  }
});
CEL.ajax({
  queryType: "cors", type: "post", url: "testdata.json", format: "json",
  data: "a=foo&b=bar baz",
  success: function (r) {
    CUT.isEqual("ajax(); cors post json", resAjaxJson, r[0].image);
  },
  error: function (e) {
    CUT.isEqual("ajax(); cors post json: "+JSON.stringify(e), true, false);
  }
});
CEL.ajax({
  queryType: "cors", type: "post", url: "testdata.xml", format: "xml",
  data: "a=foo&b=bar baz",
  success: function (r) {
    var xa = r.getElementsByTagName("picture");
    var xb = xa[0].getElementsByTagName("title")[0].childNodes[0].nodeValue;
    CUT.isEqual("ajax(); cors post xml", resAjaxXml, xb);
  },
  error: function (e) {
    CUT.isEqual("ajax(); cors post xml: "+JSON.stringify(e), true, false);
  }
});

/* Array.fromAsync(); */
async function* asyncIterable () {
  for (let i = 0; i < 5; i++) {
    await new Promise((resolve)=> setTimeout(resolve,100*i));
    yield i;
  }
}
Array.fromAsync(asyncIterable()).then((res) =>
    CUT.isEqual("Array.fromAsync(); - asyncIterable: [0,1,2,3,4]",JSON.stringify(res),"[0,1,2,3,4]")
  );
Array.fromAsync(asyncIterable(), (x) => x*2).then((res) =>
  CUT.isEqual("Array.fromAsync(); - asyncIterable + fn: [0,2,4,6,8]",JSON.stringify(res),"[0,2,4,6,8]")
);
Array.fromAsync([4,5,6,7,8]).then((res) =>
  CUT.isEqual("Array.fromAsync(); - [4,5,6,7,8]: [4,5,6,7,8]",JSON.stringify(res),"[4,5,6,7,8]")
);
Array.fromAsync([4,5,6,7,8], (x) => x*2).then((res) =>
  CUT.isEqual("Array.fromAsync(); - [4,5,6,7,8] + fn: [8,10,12,14,16]",JSON.stringify(res),"[8,10,12,14,16]")
);
Array.fromAsync(new Set([4,5,6,6,10])).then((res) =>
  CUT.isEqual("Array.fromAsync(); - Set: [4,5,6,10]",JSON.stringify(res),"[4,5,6,10]")
);
Array.fromAsync(new Set([4,5,6,6,10]), (x) => x*2).then((res) =>
  CUT.isEqual("Array.fromAsync(); - Set + fn: [8,10,12,20]",JSON.stringify(res),"[8,10,12,20]")
);
Array.fromAsync({"0": 3, "1": 4, "2": 5, length: 3}).then((res) =>
  CUT.isEqual("Array.fromAsync(); - arraylike: [3,4,5]",JSON.stringify(res),"[3,4,5]")
);
Array.fromAsync({"0": 3, "1": 4, "2": 5, length: 3}, (x) => x*2).then((res) =>
  CUT.isEqual("Array.fromAsync(); - arraylike + fn: [6,8,10]",JSON.stringify(res),"[6,8,10]")
);

}());

} catch (e) { alert("CUT global try-catch:\n" + e); }
