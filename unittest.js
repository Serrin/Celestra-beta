"use strict";

try {

const today = new Date();

CUT.addElement("table",
  "<tr><td>CUT: </td><td><code>" + CUT.VERSION + "</code></td></tr>"
    + "<tr><td>Celestra: </td><td><code>" + celestra.VERSION
     + "</code></td></tr>"
    + "<tr><td>UTC date: </td><td><code>" + today.toISOString()
     + "</code></td></tr>"
    + "<tr><td>Local date: </td><td><code>" + today.toString()
      + "</code></td></tr>"
    + "<tr><td>EPOCH time: </td><td><code>" + Number(today) + " (10) / "
      + Number(today).toString(16) + " (16) / "
      + Number(today).toString(36) + " (36)" + "</code></td></tr>"
    + "<tr><td>navigator.appName: </td><td><code>" + navigator.appName
      + "</code></td></tr>"
    + "<tr><td>navigator.appCodeName: </td><td><code>" + navigator.appCodeName
      + "</code></td></tr>"
    + "<tr><td>navigator.product: </td><td><code>" + navigator.product
      + "</code></td></tr>"
    + "<tr><td>navigator.appVersion: </td><td><code>" + navigator.appVersion
      + "</code></td></tr>"
    + "<tr><td>navigator.buildID: </td><td><code>" + navigator.buildID
      + "</code></td></tr>"
    + "<tr><td>navigator.product: </td><td><code>" + navigator.product
      + "</code></td></tr>"
    + "<tr><td>navigator.productSub: </td><td><code>" + navigator.productSub
      + "</code></td></tr>"
    + "<tr><td>navigator.userAgent: </td><td><code>" + navigator.userAgent
      + "</code></td></tr>"
    + "<tr><td>navigator.userAgentData: </td><td><code>"
      + JSON.stringify(navigator.userAgentData) + "</code></td></tr>"
    + "<tr><td>navigator.doNotTrack: </td><td><code>" + navigator.doNotTrack
      + "</code></td></tr>"
    + "<tr><td>navigator.vendor: </td><td><code>" + navigator.vendor
      + "</code></td></tr>"
    + "<tr><td>navigator.platform: </td><td><code>" + navigator.platform
      + "</code></td></tr>"
    + "<tr><td>navigator.language: </td><td><code>" + navigator.language
      + "</code></td></tr>"
    + "<tr><td>navigator.oscpu: </td><td><code>" + navigator.oscpu
      + "</code></td></tr>"
    + "<tr><td>navigator.cookieEnabled: </td><td><code>"
      + navigator.cookieEnabled + "</code></td></tr>"
    + "<tr><td>navigator.javaEnabled(): </td><td><code>"
      + navigator.javaEnabled() + "</code></td></tr>"
    + "<tr><td>navigator.pdfViewerEnabled: </td><td><code>"
      + navigator.pdfViewerEnabled + "</code></td></tr>"
    + "<tr><td>window.innerWidth: </td><td><code>" + window.innerWidth
      + "</code></td></tr>"
    + "<tr><td>window.innerHeight: </td><td><code>" + window.innerHeight
      + "</code></td></tr>"
    + "<tr><td>screen.width: </td><td><code>" + screen.width
      + "</code></td></tr>"
    + "<tr><td>screen.height: </td><td><code>" + screen.height
      + "</code></td></tr>"
    + "<tr><td>screen.availWidth: </td><td><code>" + screen.availWidth
      + "</code></td></tr>"
    + "<tr><td>screen.availHeight: </td><td><code>" + screen.availHeight
      + "</code></td></tr>"
    + "<tr><td>screen.colorDepth: </td><td><code>" + screen.colorDepth
      + "</code></td></tr>"
    + "<tr><td>screen.pixelDepth: </td><td><code>" + screen.pixelDepth
      + "</code></td></tr>"
);

window.saveResults = function saveResults () {
  var dn = Date.now().toString(36);
  CEL.createFile("results-" + dn + ".html",
    "<!DOCTYPE html><meta charset=\"utf-8\"><title>Results " + dn + "</title>"
      + "<style>html { -ms-word-break: break-all; word-break: break-all; word-break: break-word; word-wrap: break-word; overflow-wrap: break-word; } body { margin: 0 auto; max-width: 1200px; font-family: Helvetica, Arial, sans-serif; } h1 { text-align : center; } .passed, .failed { display: inline-block; padding: 3px; }.passed { background-color: #3d9970 !important; color: white !important; }.failed { background-color: #ff4136 !important; color: white !important; } #results { padding: 3px 5px 3px 5px; font-size: 14.5px !important; font-family: consolas, monospace; } code { background-color: slategrey; color: white; padding: 3px 5px 3px 5px; display: inline-block; margin-top: 2px; } </style>"
      + "<h1>Results " + dn + "</h1>"
      + "<div id='results'>" + CUT.__results__.innerHTML + "</div>",
    "text/html"
 );
};


/* ======================================================================== */


/** Selftest **/
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

CUT.isTrue("<span class=\"info\">Selftest</span> - isTrue(); success", true);
CUT.isTrue("<span class=\"info\">Selftest</span> - isTrue(); failed", false);

CUT.isFalse("<span class=\"info\">Selftest</span> - isFalse(); success", false);
CUT.isFalse("<span class=\"info\">Selftest</span> - isFalse(); failed", true);

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

} catch (e) {
  alert("CUT initialisation error: " + CUT.getHumanReadableJSON(e));
}


/* ======================================================================== */


try {


(function(){
"use strict";


var token1 = 0, token2 = 0, token3 = 0, token4 = 0, token5 = 0;
var token6 = 0, token7 = 0, token8 = 0, token9 = 0, token10 = 0;


/* Celestra v5.7.3 testcases */


/** Not auto tested functions **/
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


/** Celestra object **/
CUT.addElement("hr");
CUT.addElement("h3", "Celestra object");


/* Celestra object */
CUT.isEqual("Object name: \"celestra\"", true, celestra.randomInt(100, 200)>99);


/* CEL object */
CUT.isEqual("Object name: \"CEL\"", true, CEL.randomInt(100, 200) > 99);


/** Core API and String API and DOM API **/
CUT.addElement("hr");
CUT.addElement("h3", "Core API and String API and DOM API");


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


/* crypto.randomUUID(); */
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
  typeof token1==="string" &&token1.length===15
);
token1 = CEL.nanoid(36);
CUT.isTrue("nanoid(); 03 - <code>\"" + token1 + "\"</code>",
  typeof token1==="string" &&token1.length===36
);
token1 = CEL.nanoid(5, "abcdeFGHIJK42");
CUT.isTrue("nanoid(); 04 - size 5 & <code>\"abcdeFGHIJK42\"</code> - <code>\""
    + token1 + "\"</code>",
  typeof token1 === "string" && token1.length === 5
);


/* timestampID(); */
token1 = CEL.timestampID();
CUT.isTrue("timestampID(); 01 - default size 21 - <code>\""
    + token1 + "\"</code>",
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


/* add html test element */
CUT.addElement(
  CEL.domCreate("div", {"id": "qsaDivTestElement"},
    "#qsaDiv test element"
      + "<p id='qsaDivP1'>#qsaDivP1 test element</p>"
      + "<p id='qsaDivP2'>#qsaDivP2 test element</p>"
  )
);


/* qs(); */
CUT.isEqual("qs(); 1",
  document.querySelector("#qsaDivTestElement"), CEL.qs("#qsaDivTestElement")
);
CUT.isEqual("qs(); 02",
  document.querySelector("#qsaDivP1"),
  CEL.qs("#qsaDivP1", CEL.qs("#qsaDivTestElement"))
);
CUT.isEqual("qs(); 03",
  document.querySelector("#qsaDivP1"),
  CEL.qs("#qsaDivP1", document.querySelector("#qsaDivTestElement"))
);


/* qsa(); */
token1 = CEL.qsa("#qsaDivTestElement > p")
CUT.isTrue("qsa(); 01",
  Array.isArray(token1)
    && token1.length === 2
    && token1[0] === CEL.qs("#qsaDivP1")
    && token1[1] === CEL.qs("#qsaDivP2")
);
token1 = CEL.qsa("p", CEL.qs("#qsaDivTestElement"))
CUT.isTrue("qsa(); 02",
  Array.isArray(token1)
    && token1.length === 2
    && token1[0] === CEL.qs("#qsaDivP1")
    && token1[1] === CEL.qs("#qsaDivP2")
);
token1 = CEL.qsa("p", CEL.qs("#qsaDivTestElement"))
CUT.isTrue("qsa(); 03",
  Array.isArray(token1)
    && token1.length === 2
    && token1[0] === CEL.qs("#qsaDivP1")
    && token1[1] === CEL.qs("#qsaDivP2")
);
token1.forEach(function (e) { e.innerHTML += " each"; });
CUT.isTrue("qsa(); 04",
  token1[0].innerHTML === "#qsaDivP1 test element each"
    && token1[1].innerHTML === "#qsaDivP2 test element each"
);


/* classof(); begin */
CUT.isEqual("classof(); ES5 values",
  "array number string object htmldocument boolean nodelist htmlparagraphelement null undefined function date regexp",
  CUT.join([
    CEL.classof([1, 2, 3]),
    CEL.classof(1998),
    CEL.classof("hello world"),
    CEL.classof({a: 1, b: 2}),
    CEL.classof(document),
    CEL.classof(true),
    CEL.classof(document.querySelectorAll("p")),
    CEL.classof(CEL.qs("p")),
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
    && CEL.classof(document, "htmldocument")
    && CEL.classof(true, "boolean")
    && CEL.classof(document.querySelectorAll("p"), "nodelist")
    && CEL.classof(CEL.qs("p"), "htmlparagraphelement")
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
    || CEL.classof(document, "boolean")
    || CEL.classof(true, "htmldocument")
    || CEL.classof(document.querySelectorAll("p"), "htmlheadingelement")
    || CEL.classof(CEL.qs("p"), "nodelist")
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
if (!!window.BigInt) {
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
  "array number string object htmldocument boolean nodelist htmlparagraphelement null undefined function date regexp",
  CUT.join([
    CEL.getType([1, 2, 3]),
    CEL.getType(1998),
    CEL.getType("hello world"),
    CEL.getType({a:1,b:2}),
    CEL.getType(document),
    CEL.getType(true),
    CEL.getType(document.querySelectorAll("p")),
    CEL.getType(CEL.qs("p")),
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
    || CEL.getType(document, "htmldocument")
    || CEL.getType(true, "boolean")
    || CEL.getType(document.querySelectorAll("p"), "nodelist")
    || CEL.getType(CEL.qs("p"), "htmlparagraphelement")
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
    || CEL.getType(document, "boolean")
    || CEL.getType(true, "htmldocument")
    || CEL.getType(document.querySelectorAll("p"), "htmlheadingelement")
    || CEL.getType(CEL.qs("p"), "nodelist")
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
if (!!window.BigInt) {
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


CUT.addElement(CEL.domCreate("div", {"id": "testFormDiv"},
  " <form id='form1'><br/>Text: <input type='text' name='name' value='foo éáűőúöüóíéáűőúöüóí'><br/>Password: <input type='password' name='password' value='bar'><br/>Number: <input type='number' name='number' value='97'><br/> Radio: <input type='radio' name='radio' value='male' checked='checked'>Male <input type='radio' name='radio' value='female'>Female<br/> <select name='animals'> <option value='dog'>dog</option> <option value='cat'>cat</option> <option value='cow'>cow</option> <option value='hippos'>hippos</option> </select><br/> <select name='animals-multiple' multiple='multiple'> <option value='dog' selected='selected'>dog</option> <option value='cat'>cat</option> <option value='cow'>cow</option> <option value='hippos' selected='selected'>hippos</option> </select><br/>Checkbox1: <input type='checkbox' name='checkbox1' value='true' checked='checked'>true<br/>Checkbox2: <input type='checkbox' name='checkbox2' value='false'>false<br/>Textarea1: <textarea name='textarea1'>textarea1</textarea><br/><input type='submit' value='Submit'><br/><input type='reset' value='Reset'><br/><input type='button' value='Button1'><br/><button>Button2</button> </form> "
));
/* form2array(); */
CUT.isEqual("form2array();",
  '[{"name":"name","value":"foo%20%C3%A9%C3%A1%C5%B1%C5%91%C3%BA%C3%B6%C3%BC%C3%B3%C3%AD%C3%A9%C3%A1%C5%B1%C5%91%C3%BA%C3%B6%C3%BC%C3%B3%C3%AD"},{"name":"password","value":"bar"},{"name":"number","value":"97"},{"name":"radio","value":"male"},{"name":"animals","value":"dog"},{"name":"animals-multiple","value":"dog"},{"name":"animals-multiple","value":"hippos"},{"name":"checkbox1","value":"true"},{"name":"textarea1","value":"textarea1"}]',
  JSON.stringify(CEL.form2array(CEL.qs("#form1")))
);
/* form2string(); */
CUT.isEqual("form2string();",
  "name=foo+%C3%A9%C3%A1%C5%B1%C5%91%C3%BA%C3%B6%C3%BC%C3%B3%C3%AD%C3%A9%C3%A1%C5%B1%C5%91%C3%BA%C3%B6%C3%BC%C3%B3%C3%AD&password=bar&number=97&radio=male&animals=dog&animals-multiple=dog&animals-multiple=hippos&checkbox1=true&textarea1=textarea1",
  CEL.form2string(CEL.qs("#form1"))
);
CEL.qs("#testFormDiv").remove();


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


/* javaHash(); begin */
token1 = "✓ à \r\n\t árvíztűrő tükörfúrógép ÁRVÍZTŰRŐ TÜKÖRFÚRÓGÉP ,?;.:-_* ¤÷×¨¸´˙`˛°˘^ˇ~'+!%/=()|\\<> \" \/ #&@{}[]€ ÍÄíŁß 0123456789 asdfghjklqwertzuiopyxcvbnm ASDFGHJKLQWERTZUIOPYXCVBNM";
CUT.isEqual("javaHash();",
  "1334063883 4f84330b 1334063883 48 30 48 1565118 17e1be 1565118 1662 67e 1662 3569038 36758e 3569038 3569038 36758e 3569038 97196323 5cb1923 97196323 97196323 5cb1923 97196323 3392903 33c587 3392903 33c587 3392903 0 0 0 -1038130864 -3de09eb0 -1038130864 0 0 0 0 0 0 48503 bd77 48503 50427 c4fb 50427 -1074417128 -400a4de8 -1074417128 -1074417128 -400a4de8 -1074417128 -1074417128 -400a4de8 -1074417128 -313568218 -12b0abda -313568218 LTMxMzU2ODIxOA== LTEyYjBhYmRh LTMxMzU2ODIxOA== -313568218 -12b0abda -313568218",
  CUT.join([
    CEL.javaHash(-0.578),
    CEL.javaHash(-0.578, true),
    CEL.javaHash(-0.578, false),
    CEL.javaHash(0),
    CEL.javaHash(0, true),
    CEL.javaHash(0, false),
    CEL.javaHash(3.14),
    CEL.javaHash(3.14, true),
    CEL.javaHash(3.14, false),
    CEL.javaHash(42),
    CEL.javaHash(42, true),
    CEL.javaHash(42, false),
    CEL.javaHash(true),
    CEL.javaHash(true, true),
    CEL.javaHash(true, false),
    CEL.javaHash("true"),
    CEL.javaHash("true", true),
    CEL.javaHash("true", false),
    CEL.javaHash(false),
    CEL.javaHash(false, true),
    CEL.javaHash(false, false),
    CEL.javaHash("false"),
    CEL.javaHash("false",true),
    CEL.javaHash("false", false),
    CEL.javaHash(null),
    CEL.javaHash(null, true, false),
    CEL.javaHash("null"),
    CEL.javaHash("null", true),
    CEL.javaHash("null", false),
    CEL.javaHash(undefined),
    CEL.javaHash(undefined, true),
    CEL.javaHash(undefined, false),
    CEL.javaHash("undefined"),
    CEL.javaHash("undefined", true),
    CEL.javaHash("undefined", false),
    CEL.javaHash(""),
    CEL.javaHash("", true),
    CEL.javaHash("", false),
    CEL.javaHash([]),
    CEL.javaHash([],true),
    CEL.javaHash([],false),
    CEL.javaHash([1,2]),
    CEL.javaHash([1,2], true),
    CEL.javaHash([1,2], false),
    CEL.javaHash([3,4]),
    CEL.javaHash([3,4], true),
    CEL.javaHash([3,4], false),
    CEL.javaHash({}),
    CEL.javaHash({}, true),
    CEL.javaHash({}, false),
    CEL.javaHash({a:1}),
    CEL.javaHash({a:1}, true),
    CEL.javaHash({a:1}, false),
    CEL.javaHash({b:2}),
    CEL.javaHash({b:2}, true),
    CEL.javaHash({b:2}, false),
    CEL.javaHash(token1),
    CEL.javaHash(token1, true),
    CEL.javaHash(token1, false),
    CEL.b64Encode(CEL.javaHash(token1)),
    CEL.b64Encode(CEL.javaHash(token1, true)),
    CEL.b64Encode(CEL.javaHash(token1, false)),
    CEL.b64Decode(CEL.b64Encode(CEL.javaHash(token1))),
    CEL.b64Decode(CEL.b64Encode(CEL.javaHash(token1, true))),
    CEL.b64Decode(CEL.b64Encode(CEL.javaHash(token1, false)))
  ])
);
/* javaHash(); end */


/* sizeIn(); */
CUT.isEqual("sizeIn();", 5, CEL.sizeIn({"a": 1, "b": 2, "c": 3,
  [Symbol.iterator]: function () {}, [Symbol.toPrimitive]: function () {}
}));


/* forIn(); */
token1 = {"a": 2, "b": 3, "c": 4};
token2 = "";
CEL.forIn(token1, (e) => { token2 += (e * 2); });
CUT.isEqual("forIn(); 01", "468", token2);
CUT.isEqual("forIn(); 02", token1, CEL.forIn(token1, function () {}));


/* filterIn(); */
CUT.isEqual("filterIn();", "{\"b\":2,\"c\":3}",
  JSON.stringify(CEL.filterIn({"a": 1, "b": 2, "c": 3}, (v, p, o) => (v > 1)))
);


/* popIn(); */
token1 = {"a": 1};
CUT.isEqual("popIn();", "1 undefined",
  CUT.join([CEL.popIn(token1, "a"), CEL.popIn(token1, "a")])
);


/* getDoNotTrack(); */
CUT.isEqual("getDoNotTrack();", typeof CEL.getDoNotTrack(), "boolean");


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
     CEL.strAt("\uD834\uDF06 ab cd",0) === "\uD834\uDF06"
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
  && CEL.strSplice("ab \uD834\uDF06 cde", 4, 1, "X") === "ab \uD834\uDF06Xcde"
  && CEL.strSplice("ab \uD834\uDF06 cde",4,1,"X","Y") ==="ab \uD834\uDF06XYcde"
  && CEL.strSplice("ab \uD834\uDF06 cde",4,2,"X","Y") ==="ab \uD834\uDF06XYde"
  && CEL.strSplice("ab \uD834\uDF06 cde", 5, 2, "") === "ab \uD834\uDF06 e"
);


/* "unBind(); */
CUT.isEqual("unBind();", true,
  Array.isArray(CEL.unBind([].slice)(document.querySelectorAll("h3")))
);


/* bind(); */
CUT.isTrue("bind();",
  CEL.bind(document.querySelectorAll,document)("h3").length > 0
);


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


/* domGetCSSVar(); */
/* domSetCSSVar(); */
CUT.isEqual("domGetCSSVar(); and domSetCSSVar(); without prefix 1", "",
  CEL.domGetCSSVar("testVar1"));
CEL.domSetCSSVar("testVar1", "value1");
CUT.isEqual("domGetCSSVar(); and domSetCSSVar(); without prefix 2 - "
  + CEL.domGetCSSVar("testVar1"), "value1",
  CEL.domGetCSSVar("testVar1")
);
CUT.isEqual("domGetCSSVar(); and domSetCSSVar(); with prefix 1 - "
  + CEL.domGetCSSVar("--testVar2"), "",
  CEL.domGetCSSVar("--testVar2")
);
CEL.domSetCSSVar("--testVar2", "value2");
CUT.isEqual("domGetCSSVar(); and domSetCSSVar(); with prefix 2 - "
  + CEL.domGetCSSVar("--testVar2"), "value2",
  CEL.domGetCSSVar("--testVar2")
);


/* domTestElement variable */
CUT.addElement( CEL.domCreate("p",
  {"id": "domTestElement", style: {"width": "250px"}}, "DOM test element"));
var domTestElement = CEL.qs("#domTestElement");


/* domCreate(); */
CUT.isTrue("domCreate(); with style object", CEL.isElement(domTestElement));
CUT.isTrue("domCreate(); with style string",
  CEL.isElement(CEL.domCreate("p",
    {"id": "domTestElement", style: "width: 250px; color: blue;" },
    "DOM test element"
  ))
);
CUT.isTrue("domCreate(object); with style object",
  CEL.isElement(CEL.domCreate({
    elementType: "p",
    "id": "domTestElementObject",
    style: {"width": "250px"},
    innerHTML: "DOM test element"
  }))
);
CUT.isTrue("domCreate(object); with style string",
  CEL.isElement(CEL.domCreate({
    elementType: "p",
    "id": "domTestElementObject",
    style: "width: 250px; color: blue;",
    innerHTML: "DOM test element"
  }))
);


/* domToElement(); */
CUT.isTrue("domToElement(); simple element",
  CEL.isElement(CEL.domToElement("<div>Hello world!</div>"))
);
CUT.isTrue("domToElement(); complex element",
  CEL.isElement(
    CEL.domToElement(
      "<p><span style=\"background-color: yellow; color: blue;\">Hello</span> <span style=\"background-color: blue; color: yellow;\">world</span>!</p>"
    ).firstElementChild
  )
);


/* domSetCSS(); */
/* domgetCSS(); */
CEL.domSetCSS(domTestElement, "width", "300px");
CUT.isEqual("domSetCSS(); property and domGetCSS(); - (300px) - "
  + CEL.domGetCSS(domTestElement, "width"), "300px",
  CEL.domGetCSS(domTestElement, "width")
);
CEL.domSetCSS(domTestElement, {"width": "350px", "font-weight": "bold"});
CUT.isEqual("domSetCSS(); properties object and domGetCSS(); - (350px) - "
  + CEL.domGetCSS(domTestElement, "width"),
  "350px", CEL.domGetCSS(domTestElement, "width")
);
CUT.isEqual("domSetCSS(); properties object and domGetCSS() object; (350px)- "
  + CEL.domGetCSS(domTestElement)["width"],
  "350px", CEL.domGetCSS(domTestElement)["width"]
);


/* domHide(); */
CEL.domHide(domTestElement);
CUT.isEqual("domHide();", "none", CEL.domGetCSS(domTestElement, "display"));


/* domShow(); */
CEL.domShow(domTestElement);
CUT.isEqual("domShow();", "block", CEL.domGetCSS(domTestElement, "display"));
CEL.domHide(domTestElement);
CEL.domShow(domTestElement, "inline-block");
CUT.isEqual("domShow(); inline-block", "inline-block",
  CEL.domGetCSS(domTestElement, "display")
);


/* domToggle(); */
CEL.domToggle(domTestElement);
CUT.isEqual("domToggle(); hide","none",CEL.domGetCSS(domTestElement,"display"));
CEL.domToggle(domTestElement);
CUT.isEqual("domToggle(); show", "block",
  CEL.domGetCSS(domTestElement, "display")
);
CEL.domToggle(domTestElement, "inline-block");
CUT.isEqual("domToggle(); hide inline-block", "none",
  CEL.domGetCSS(domTestElement, "display")
);


/* domHide(); */
CEL.domToggle(domTestElement, "inline-block");
CUT.isEqual("domHide(); show inline-block", "inline-block",
  CEL.domGetCSS(domTestElement, "display")
);


/* domIsHidden(); */
CEL.domShow(domTestElement);
CUT.isFalse("domIsHidden(); 01", CEL.domIsHidden(domTestElement));
CEL.domHide(domTestElement);
CUT.isTrue("domIsHidden(); 02", CEL.domIsHidden(domTestElement));


CUT.addElement(
  CEL.domCreate("div", {"id": "dsDiv"},
    "<p id=\"dsDivP1\">#dsDivP1</p>"
      + "<p id=\"dsDivP2\">#dsDivP2</p>"
      + "<p id=\"dsDivP3\">#dsDivP3</p>"
      + "<p id=\"dsDivP4\">#dsDivP4</p>"
      + "<p id=\"dsDivP5\">#dsDivP5</p>"
  )
);
/* domSiblings(); */
token1 = CEL.domSiblings(CEL.qs("#dsDivP3"));
CUT.isTrue("domSiblings();", (
  Array.isArray(token1)
    && token1.length === 4
    && token1[0].innerHTML === "#dsDivP1"
    && token1[1].innerHTML === "#dsDivP2"
    && token1[2].innerHTML === "#dsDivP4"
    && token1[3].innerHTML === "#dsDivP5"
  )
);
/* domSiblingsPrev(); */
token1 = CEL.domSiblingsPrev(CEL.qs("#dsDivP3"));
CUT.isTrue("domSiblingsPrev();", (
    Array.isArray(token1)
      && token1.length === 2
      && token1[0].innerHTML ==="#dsDivP1"
      && token1[1].innerHTML ==="#dsDivP2"
  )
);
/* domSiblingsLeft(); */
token1 = CEL.domSiblingsLeft(CEL.qs("#dsDivP3"));
CUT.isTrue("domSiblingsLeft();", (
  Array.isArray(token1) && token1.length === 2
    && token1[0].innerHTML === "#dsDivP1"
    && token1[1].innerHTML === "#dsDivP2"
));
/* domSiblingsNext(); */
token1 = CEL.domSiblingsNext(CEL.qs("#dsDivP3"));
CUT.isTrue("domSiblingsNext();", (
  Array.isArray(token1) && token1.length === 2
    && token1[0].innerHTML === "#dsDivP4"
    && token1[1].innerHTML === "#dsDivP5"
));
/* domSiblingsRight(); */
token1 = CEL.domSiblingsRight(CEL.qs("#dsDivP3"));
CUT.isTrue("domSiblingsRight();", (
  Array.isArray(token1)
    && token1.length === 2
    && token1[0].innerHTML === "#dsDivP4"
    && token1[1].innerHTML === "#dsDivP5"
));
CEL.qs("#dsDiv").remove();


/* domClear(); */
token1 = CEL.domToElement("<div><p>1</p><p>2</p><p>3</p>div>");
CEL.domClear(token1);
CUT.isEqual("domClear();", 0, token1.children.length);


/** Assertion API **/
CUT.addElement("hr");
CUT.addElement("h3", "Assertion API");


/* assert(); */


/* assertType(); */
token1 = 42;
token2 = Object(42);
token3 = [];
CUT.isEqual("assertType(); 01", token1, CEL.assertType(token1, "number"));
CUT.isEqual("assertType(); 02", token2, CEL.assertType(token2, Number));
CUT.isEqual("assertType(); 03", token3, CEL.assertType(token3, Array));
CUT.isEqual("assertType(); 04", token3, CEL.assertType(token3, Object));
try {
  CEL.assertType(token1, 42);
  CUT.isTrue("assertType(); 05 error", false);
} catch (e) { CUT.isTrue("assertType(); 05 error", true); }
try {
  CEL.assertType(token1, Number);
  CUT.isTrue("assertType(); 06 error", false, );
} catch (e) { CUT.isTrue("assertType(); 06 error", true); }
try {
  CEL.assertType(token3, Map);
  CUT.isTrue("assertType(); 07 error", false);
} catch (e) { CUT.isTrue("assertType(); 07 error", true); }


/* assertNotType(); */
token1 = 42;
token2 = Object(42);
token3 = [];
try {
  CEL.assertNotType(token1, "number");
  CUT.isTrue("assertNotType(); 01 error", false);
} catch (e) { CUT.isTrue("assertNotType(); 01 error", true); }
try {
  CEL.assertNotType(token2, Number);
  CUT.isTrue("assertNotType(); 02 error", false);
} catch (e) { CUT.isTrue("assertNotType(); 02 error", true); }

try {
  CEL.assertNotType(token3, Array);
  CUT.isTrue("assertNotType(); 03 error", false);
} catch (e) { CUT.isTrue("assertNotType(); 03 error", true); }

try {
  CEL.assertNotType(token3, Object);
  CUT.isTrue("assertNotType(); 04 error", false);
} catch (e) { CUT.isTrue("assertNotType(); 04 error", true); }
try {
  CEL.assertNotType(token1, 42);
  CUT.isTrue("assertNotType(); 05 error", false);
} catch (e) { CUT.isTrue("assertNotType(); 05 error", true); }
CUT.isEqual("assertNotType(); 06", token1, CEL.assertNotType(token1, Number));
CUT.isEqual("assertNotType(); 07", token2, CEL.assertNotType(token2, "number"));
CUT.isEqual("assertNotType(); 08", token3, CEL.assertNotType(token3, Map));


/* assert(); */
CUT.isTrue("assert(); 01", CEL.assert(true));
CUT.isTrue("assert(); 02", CEL.assert(true, "assert true"));
CUT.isTrue("assert(); 03", CEL.assert(1));
CUT.isTrue("assert(); 04", CEL.assert(1, "assert false"));
try {
  CEL.assert(false);
} catch (e) { CUT.isTrue("assert(); 05", true); }
try { CEL.assert(false, "lorem");
} catch (e) { CUT.isTrue("assert(); 06", true); }
try {
  CEL.assert(0);
} catch (e) { CUT.isTrue("assert(); 07", true); }
try {
  CEL.assert(0, "lorem");
} catch (e) { CUT.isTrue("assert(); 08", true); }


/* assertTrue(); */
CUT.isTrue("assertTrue(); 01", CEL.assertTrue(true));
CUT.isTrue("assertTrue(); 02", CEL.assertTrue(true, "assertTrue true"));
CUT.isTrue("assertTrue(); 03", CEL.assertTrue(1));
CUT.isTrue("assertTrue(); 04", CEL.assertTrue(1, "assertTrue false"));
try {
  CEL.assertTrue(false);
} catch (e) { CUT.isTrue("assertTrue(); 05", true); }
try {
  CEL.assertTrue(false, "lorem");
} catch (e) { CUT.isTrue("assertTrue(); 06", true); }
try {
  CEL.assertTrue(0);
} catch (e) { CUT.isTrue("assertTrue(); 07", true); }
try {
  CEL.assertTrue(0, "lorem");
} catch (e) { CUT.isTrue("assertTrue(); 08", true); }


/* assertFalse(); */
CUT.isTrue("assertFalse(); 01", CEL.assertFalse(false));
CUT.isTrue("assertFalse(); 02", CEL.assertFalse(false, "lorem"));
CUT.isTrue("assertFalse(); 03", CEL.assertFalse(0));
CUT.isTrue("assertFalse(); 04", CEL.assertFalse(0, "lorem"));
try {
  CEL.assertFalse(true);
} catch (e) { CUT.isTrue("assertFalse(); 05", true); }
try {
  CEL.assertFalse(true, "lorem");
} catch (e) { CUT.isTrue("assertFalse(); 06", true); }
try {
  CEL.assertFalse(1);
} catch (e) { CUT.isTrue("assertFalse(); 07", true); }
try {
  CEL.assertFalse(1, "assertFalse(); false");
} catch (e) { CUT.isTrue("assertFalse(); 08", true); }


/* assertEqual(); */
CUT.isTrue("assert(); 01", CEL.assert(true, "assert true"));
CUT.isTrue("assert(); 02", CEL.assert(1, "assert false"));


/* assertEqual(); */
CUT.isTrue("assertEqual(); 01", CEL.assertEqual(NaN, NaN));
CUT.isTrue("assertEqual(); 02", CEL.assertEqual(42, 42));
CUT.isTrue("assertEqual(); 03", CEL.assertEqual(42, "42", ""));
try {
  CEL.assertEqual(null,false,"assertEqual null false");
} catch (e) { CUT.isTrue("assertEqual(); 04", true); }
try {
  CEL.assertEqual(null,false);
} catch (e) { CUT.isTrue("assertEqual(); 05", true); }


/* assertStrictEqual(); */
CUT.isTrue("assertStrictEqual(); 01", CEL.assertStrictEqual(NaN, NaN));
CUT.isTrue("assertStrictEqual(); 09", CEL.assertStrictEqual(42, 42));
try {
  CEL.assertStrictEqual(42, "42", "assertStrictEqual 42 \"42\"");
} catch (e) { CUT.isTrue("assertStrictEqual(); 03", true); }
try {
  CEL.assertStrictEqual(42, "42");
} catch (e) { CUT.isTrue("assertStrictEqual(); 03", true); }
try {
  CEL.assertStrictEqual(null, false, "assertStrictEqual null false");
} catch (e) { CUT.isTrue("assertStrictEqual(); 04", true); }


/* assertNotEqual(); */
CUT.isTrue("assertNotEqual(); 01", CEL.assertNotEqual(null,false, "lorem"));
try {
  CEL.assertNotEqual(NaN, NaN);
} catch (e) { CUT.isTrue("assertNotEqual(); 02", true); }
try {
  CEL.assertNotEqual(42, 42);
} catch (e) { CUT.isTrue("assertNotEqual(); 03", true); }
try {
  CEL.assertNotEqual(42, "42", "assertNotEqual 42 \"42\"");
} catch (e) { CUT.isTrue("assertNotEqual(); 04", true); }


/* assertNotStrictEqual(); */
CUT.isTrue("assertNotStrictEqual(); 01",
  CEL.assertNotStrictEqual(42, "42", "assertNotStrictEqual 42 \"42\"")
);
CUT.isTrue("assertNotStrictEqual(); 02",
  CEL.assertNotStrictEqual(null, false, "assertNotStrictEqual null false")
);
try {
  CEL.assertNotStrictEqual(NaN, NaN, "assertNotStrictEqual(); 03");
} catch (e) { CUT.isTrue(e, true); }
try {
  CEL.assertNotStrictEqual(42, 42, "assertNotStrictEqual(); 04");
} catch (e) { CUT.isTrue(e, true); }
try {
  CEL.assertNotStrictEqual(42, "42", "assertNotStrictEqual(); 04");
} catch (e) { CUT.isTrue(e, true); }


/* assertDeepEqual(); begin */
/* primitives / number + Object wrappers */
CUT.isTrue("assertDeepEqual(); 01a - ok", CEL.assertDeepEqual(42, 42));
try {
  CEL.assertDeepEqual(42, 43);
} catch (e) { CUT.isTrue("assertDeepEqual(); 01b - error", true); }
CUT.isTrue("assertDeepEqual(); 01c - ok", CEL.assertDeepEqual(42, Object(42)));
CUT.isTrue("assertDeepEqual(); 01d - ok", CEL.assertDeepEqual(Object(42), 42));
try {
  CEL.assertDeepEqual(42, Object(43));
} catch (e) { CUT.isTrue("assertDeepEqual(); 01e - error", true); }
try {
  CEL.assertDeepEqual(Object(42), 43);
} catch (e) { CUT.isTrue("assertDeepEqual(); 01f - error", true); }
CUT.isTrue("assertDeepEqual(); 01g - ok",
  CEL.assertDeepEqual(Object(42), Object(42))
);
CUT.isTrue("assertDeepEqual(); 01h - ok",
  CEL.assertDeepEqual(Object(42), Object(43))
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
try {
  CEL.assertDeepEqual(Infinity, -Infinity);
} catch (e) { CUT.isTrue("assertDeepEqual(); 01p - error", true); }
/* primitives / not same type */
CUT.isTrue("assertDeepEqual(); 01q - ok", CEL.assertDeepEqual(42, "42"));
CUT.isTrue("assertDeepEqual(); 01r - ok", CEL.assertDeepEqual(1, true));
CUT.isTrue("assertDeepEqual(); 01s - ok", CEL.assertDeepEqual(1n, true));
try {
  CEL.assertDeepEqual(1n, "1n");
} catch (e) { CUT.isTrue("assertDeepEqual(); 01t - error", true); }
CUT.isTrue("assertDeepEqual(); 01u - ok", CEL.assertDeepEqual(false, ""));
/* primitives / bigint + Object wrappers */
CUT.isTrue("assertDeepEqual(); 02a - ok", CEL.assertDeepEqual(42n, 42n));
try {
  CEL.assertDeepEqual(42n, 43n);
} catch (e) { CUT.isTrue("assertDeepEqual(); 02b - error", true); }
CUT.isTrue("assertDeepEqual(); 02c - ok",
  CEL.assertDeepEqual(42n, Object(42n))
);
CUT.isTrue("assertDeepEqual(); 02d - ok",
  CEL.assertDeepEqual(Object(42n), 42n)
);
try {
  CEL.assertDeepEqual(42n, Object(43n));
} catch (e) { CUT.isTrue("assertDeepEqual(); 02e - error", true); }
try {
  CEL.assertDeepEqual(Object(42n), 43n, "assertDeepEqual(); 02f - error");
} catch (e) { CUT.isTrue(e, true); }
CUT.isTrue("assertDeepEqual(); 02g - ok",
  CEL.assertDeepEqual(Object(42n), Object(42n))
);
CUT.isTrue("assertDeepEqual(); 02h - ok",
  CEL.assertDeepEqual(Object(42n), Object(43n))
);
/* primitives / string + Object wrappers */
CUT.isTrue("assertDeepEqual(); 03a - ok",
  CEL.assertDeepEqual("lorem", "lorem")
);
try {
  CEL.assertDeepEqual("lorem", "ipsum", "assertDeepEqual(); 03b - error");
} catch (e) { CUT.isTrue(e, true); }
CUT.isTrue("assertDeepEqual(); 03c - ok",
  CEL.assertDeepEqual("lorem", Object("lorem"))
);
CUT.isTrue("assertDeepEqual(); 03d - ok",
  CEL.assertDeepEqual(Object("lorem"), "lorem")
);
try {
  CEL.assertDeepEqual("lorem", Object("ipsum"),
    "assertDeepEqual(); 03e - error"
  );
} catch (e) { CUT.isTrue(e, true); }
try {
  CEL.assertDeepEqual(Object("lorem"), "ipsum",
    "assertDeepEqual(); 03f - error"
  );
} catch (e) { CUT.isTrue(e, true); }
CUT.isTrue("assertDeepEqual(); 03g - ok",
  CEL.assertDeepEqual(Object("lorem"), Object("lorem"),)
);
try {
  CEL.assertDeepEqual(Object("lorem"), Object("ipsum"),
    "assertDeepEqual(); 03h - error"
  );
} catch (e) { CUT.isTrue(e, true); }
/* primitives / boolean + Object wrappers */
CUT.isTrue("assertDeepEqual(); 04a - ok", CEL.assertDeepEqual(true, true));
try {
  CEL.assertDeepEqual(true, false, "assertDeepEqual(); 04b - error");
} catch (e) { CUT.isTrue(e, true); }
CUT.isTrue("assertDeepEqual(); 04c - ok",
  CEL.assertDeepEqual(true, Object(true))
);
CUT.isTrue("assertDeepEqual(); 04d - ok",
  CEL.assertDeepEqual(Object(true), true)
);
CUT.isTrue("assertDeepEqual(); 04d - ok",
  CEL.assertDeepEqual(Object(true), true)
);
try {
  CEL.assertDeepEqual(true, Object(false), "assertDeepEqual(); 04e - error");
} catch (e) { CUT.isTrue(e, true); }
try {
  CEL.assertDeepEqual(Object(true), false, "assertDeepEqual(); 04f - error");
} catch (e) { CUT.isTrue(e, true); }
CUT.isTrue("assertDeepEqual(); 04g - ok",
  CEL.assertDeepEqual(Object(true), Object(true))
);
CUT.isTrue("assertDeepEqual(); 04h - ok",
  CEL.assertDeepEqual(Object(true), Object(false))
);
/* primitives / Symbol */
token1 = Symbol("Agradzsag");
token2 = Symbol("Agradzsag");
token3 = Symbol("Trillian");
CUT.isTrue("assertDeepEqual(); 05a - ok", CEL.assertDeepEqual(token1, token1));
try {
  CEL.assertDeepEqual(token1, token2, "assertDeepEqual(); 05b - error");
} catch (e) { CUT.isTrue(e, true); }
try {
  CEL.assertDeepEqual(token1, token3, "assertDeepEqual(); 05c - error");
} catch (e) { CUT.isTrue(e, true); }
/* objects / Array */
CUT.isTrue("assertDeepEqual(); 06a - ok", CEL.assertDeepEqual([1, 2], [1, 2]));
try {
  CEL.assertDeepEqual([1, 2], [1, 3], "assertDeepEqual(); 06b - error");
} catch (e) { CUT.isTrue(e, true); }
CUT.isTrue("assertDeepEqual(); 06c - ok",
  CEL.assertDeepEqual([1, 2], [1, "2"])
);
try {
  CEL.assertDeepEqual([1, 2], [1, 2, 3], "assertDeepEqual(); 06d - error");
} catch (e) { CUT.isTrue(e, true); }
/* objects / Set */
token1 = new Set([1, 2]);
token2 = new Set([1, 2]);
token3 = new Set([1, 3]);
token4 = new Set([1, "2"]);
token5 = new Set([1, 2, 3]);
CUT.isTrue("assertDeepEqual(); 07a - ok",
  CEL.assertDeepEqual(token1, token2)
);
try {
  CEL.assertDeepEqual(token1, token3, "assertDeepEqual(); 07b - error");
} catch (e) { CUT.isTrue(e, true); }
try {
  CEL.assertDeepEqual(token1, token4, "assertDeepEqual(); 07c - error");
} catch (e) { CUT.isTrue(e, true); }
try {
  CEL.assertDeepEqual(token1, token5, "assertDeepEqual(); 07d - error");
} catch (e) { CUT.isTrue(e, true); }
/* objects / TypedArrays */
token1 = Int16Array.from([34, 45]);
token2 = Int16Array.from([34, 45]);
token3 = Int16Array.from([34, 46]);
token5 = Int16Array.from([34, 45, 56]);
CUT.isTrue("assertDeepEqual(); 08a - ok",
  CEL.assertDeepEqual(token1, token2)
);
try {
  CEL.assertDeepEqual(token1, token3, "assertDeepEqual(); 08b - error");
} catch (e) { CUT.isTrue(e, true); }
try {
  CEL.assertDeepEqual(token1, token5, "assertDeepEqual(); 08c - error");
} catch (e) { CUT.isTrue(e, true); }
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
try {
  CEL.assertDeepEqual(token1, token3, "assertDeepEqual(); 09c - error");
} catch (e) { CUT.isTrue(e, true); }
CUT.isTrue("assertDeepEqual(); 09d - ok", CEL.assertDeepEqual(token1, token4));
try {
  CEL.assertDeepEqual(token1, token5, "assertDeepEqual(); 09e - error");
} catch (e) { CUT.isTrue(e, true); }
try {
  CEL.assertDeepEqual(token6, token7, "assertDeepEqual(); 09f - error");
} catch (e) { CUT.isTrue(e, true); }
try {
  CEL.assertDeepEqual(token6, token8, "assertDeepEqual(); 09g - error");
} catch (e) { CUT.isTrue(e, true); }
/* objects / Map */
token1 = new Map([["a", 1], ["b", 2]]);
token2 = new Map([["a", 1], ["b", 2]]);
token3 = new Map([["a", 1], ["b", 3]]);
token4 = new Map([["a", 1], ["b", "2"]]);
token5 = new Map([["a", 1], ["b", 2], ["c", 3]]);
CUT.isTrue("assertDeepEqual(); 10a - ok",
  CEL.assertDeepEqual(token1, token2)
);
try {
  CEL.assertDeepEqual(token1, token3, "assertDeepEqual(); 10b - error");
} catch (e) { CUT.isTrue(e, true); }
CUT.isTrue("assertDeepEqual(); 10c - ok", CEL.assertDeepEqual(token1, token4));
try {
  CEL.assertDeepEqual(token1, token5, "assertDeepEqual(); 10d - error");
} catch (e) { CUT.isTrue(e, true); }
/* objects / weakset + weakmap*/
token1 = new WeakSet();
token2 = new WeakSet();
CUT.isTrue("assertDeepEqual(); 11a - ok", CEL.assertDeepEqual(token1, token1));
try {
  CEL.assertDeepEqual(token1, token2, "assertDeepEqual(); 11b - error");
} catch (e) { CUT.isTrue(e, true); }
token1 = new WeakMap();
token2 = new WeakMap();
CUT.isTrue("assertDeepEqual(); 11c - ok", CEL.assertDeepEqual(token1, token1));
try {
  CEL.assertDeepEqual(token1, token2, "assertDeepEqual(); 11d - error");
} catch (e) { CUT.isTrue(e, true); }
/* objects / Function */
token1 = Array.from;
token2 = Array.of;
CUT.isTrue("assertDeepEqual(); 12a - ok", CEL.assertDeepEqual(token1, token1));
try {
  CEL.assertDeepEqual(token1, token2, "assertDeepEqual(); 12b - error");
} catch (e) { CUT.isTrue(e, true); }
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
try {
  CEL.assertDeepEqual(token1, token2, "assertDeepEqual(); 13b - error");
} catch (e) { CUT.isTrue(e, true); }
CUT.isTrue("assertDeepEqual(); 13c - ok", CEL.assertDeepEqual(token1, token3));
/* objects / Error */
token1 = new Error("Agradzsag");
token2 = new Error("Agradzsag");
token3 = new TypeError("Agradzsag");
token3 = new TypeError("Agradzsag");
CUT.isTrue("assertDeepEqual(); 14a - ok", CEL.assertDeepEqual(token1, token1));
CUT.isTrue("assertDeepEqual(); 14b - ok", CEL.assertDeepEqual(token3, token3));
try {
  CEL.assertDeepEqual(token1, token2, "assertDeepEqual(); 14c - error");
} catch (e) { CUT.isTrue(e, true); }
try {
  CEL.assertDeepEqual(token1, token3, "assertDeepEqual(); 14d - error");
} catch (e) { CUT.isTrue(e, true); }
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
CUT.isTrue("assertDeepEqual(); 16b - ok",
  CEL.assertDeepEqual(token2, token3)
);
try {
  CEL.assertDeepEqual(token2, token4, "assertDeepEqual(); 16c - error");
} catch (e) { CUT.isTrue(e, true); }
try {
  CEL.assertDeepEqual(token2, token5, "assertDeepEqual(); 16d - error");
} catch (e) { CUT.isTrue(e, true); }
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
try {
  CEL.assertDeepEqual(token2, token4, "assertDeepEqual(); 17c - error");
} catch (e) { CUT.isTrue(e, true); }
try {
  CEL.assertDeepEqual(token2, token5, "assertDeepEqual(); 17d - error");
} catch (e) { CUT.isTrue(e, true); }
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
try {
  CEL.assertDeepEqual(token2, token4, "assertDeepEqual(); 18c - error");
} catch (e) { CUT.isTrue(e, true); }
try {
  CEL.assertDeepEqual(token2, token5, "assertDeepEqual(); 18d - error");
} catch (e) { CUT.isTrue(e, true); }
CUT.isTrue("assertDeepEqual(); 18e - ok", CEL.assertDeepEqual(token2, token6));
/* structures 4 */
token1 = new Error("Agradzsag");
token2 = [1,2,{"3": 4, "5": new Map([["6", 7], ["8", [9, 10]], ["11", new Set([12, 13])]])}, token1];
token3 = [1,2,{"3": 4, "5": new Map([["6", 7], ["8", [9, 10]], ["11", new Set([12, 13])]])}, token1];
token4 = [1,5,{"3": 4, "5": new Map([["6", 7], ["8", [9, 10]], ["11", new Set([12, 13])]])}, token1];
token5 = [1,2,{"3": 4, "5": new Map([["6", 7], ["8", [9, 10]], ["11", new Set([12, 13, 14])]])}, token1];
CUT.isTrue("assertDeepEqual(); 19a - ok", CEL.assertDeepEqual(token2, token2));
CUT.isTrue("assertDeepEqual(); 19b - ok", CEL.assertDeepEqual(token2, token3));
try {
  CEL.assertDeepEqual(token2, token4, "assertDeepEqual(); 19c - error");
} catch (e) { CUT.isTrue(e, true); }
try {
  CEL.assertDeepEqual(token2, token5, "assertDeepEqual(); 19d - error");
} catch (e) { CUT.isTrue(e, true); }
/* objects / not same prototype - array */
try {
  CEL.assertDeepEqual({}, [], "assertDeepEqual(); 20a - error");
} catch (e) { CUT.isTrue(e, true); }
try {
  CEL.assertDeepEqual(new Map(), [], "assertDeepEqual(); 20b - error");
} catch (e) { CUT.isTrue(e, true); }
try {
  CEL.assertDeepEqual(new Set(), [], "assertDeepEqual(); 20c - error");
} catch (e) { CUT.isTrue(e, true); }
try {
  CEL.assertDeepEqual(new WeakMap(), [], "assertDeepEqual(); 20d - error");
} catch (e) { CUT.isTrue(e, true); }
try {
  CEL.assertDeepEqual(new WeakSet(), [], "assertDeepEqual(); 20e - error");
} catch (e) { CUT.isTrue(e, true); }
try {
  CEL.assertDeepEqual(new Error(), [], "assertDeepEqual(); 20f - error");
} catch (e) { CUT.isTrue(e, true); }
CUT.isTrue("assertDeepEqual(); 20g - ok", CEL.assertDeepEqual(42, [42]));
try {
  CEL.assertDeepEqual(Object(42), [42], "assertDeepEqual(); 20h - error");
} catch (e) { CUT.isTrue(e, true); }
try {
  CEL.assertDeepEqual(true, [true], "assertDeepEqual(); 20i - error");
} catch (e) { CUT.isTrue(e, true); }
try {
  CEL.assertDeepEqual(Object(true), [true], "assertDeepEqual(); 20j - error");
} catch (e) { CUT.isTrue(e, true); }
CUT.isTrue("assertDeepEqual(); 20k - ok",
  CEL.assertDeepEqual("lorem", ["lorem"])
);
try {
  CEL.assertDeepEqual(Object("lorem"), ["lorem"], "assertDeepEqual(); 20l - error");
} catch (e) { CUT.isTrue(e, true); }
CUT.isTrue("assertDeepEqual(); 20m - ok", CEL.assertDeepEqual(42n, [42n]));
try {
  CEL.assertDeepEqual(Object(42n), [42n], "assertDeepEqual(); 20n - error");
} catch (e) { CUT.isTrue(e, true); }
/* objects / not same prototype - map */
CUT.isTrue("assertDeepEqual(); 21a - ok",
  CEL.assertDeepEqual(new Map(), new Set())
);
CUT.isTrue("assertDeepEqual(); 21b - ok",
  CEL.assertDeepEqual(new Map(), new WeakSet())
);
CUT.isTrue( "assertDeepEqual(); 21c - ok",
  CEL.assertDeepEqual(new Map(), new WeakMap(),)
);
try {
  CEL.assertDeepEqual(new Error(), new Map(), "assertDeepEqual(); 21d - error");
} catch (e) { CUT.isTrue(e, true); }
try {
  CEL.assertDeepEqual(42, new Map(), "assertDeepEqual(); 21e - error");
} catch (e) { CUT.isTrue(e, true); }
CUT.isTrue("assertDeepEqual(); 21f - ok",
  CEL.assertDeepEqual(Object(42), new Map())
);
try {
  CEL.assertDeepEqual(true, new Map(), "assertDeepEqual(); 21g - error");
} catch (e) { CUT.isTrue(e, true); }
CUT.isTrue("assertDeepEqual(); 21h - ok",
  CEL.assertDeepEqual(Object(true), new Map())
);
try {
  CEL.assertDeepEqual("lorem", new Map(), "assertDeepEqual(); 21i - error");
} catch (e) { CUT.isTrue(e, true); }
try {
  CEL.assertDeepEqual(Object("lorem"), new Map(), "assertDeepEqual(); 21j - error");
} catch (e) { CUT.isTrue(e, true); }
try {
  CEL.assertDeepEqual(42n, new Map(), "assertDeepEqual(); 21k - error");
} catch (e) { CUT.isTrue(e, true); }
CUT.isTrue("assertDeepEqual(); 21l - ok",
  CEL.assertDeepEqual(Object(42n), new Map())
);
/* objects / not same prototype - set */
CUT.isTrue("assertDeepEqual(); 22a - ok",
  CEL.assertDeepEqual(new WeakMap(), new Set())
);
try {
  CEL.assertDeepEqual(new Error(), new Set(), "assertDeepEqual(); 22b - error");
} catch (e) { CUT.isTrue(e, true); }
try {
  CEL.assertDeepEqual(42, new Set(), "assertDeepEqual(); 22c - error");
} catch (e) { CUT.isTrue(e, true); }
CUT.isTrue("assertDeepEqual(); 22d - ok",
  CEL.assertDeepEqual(Object(42), new Set())
);
try {
  CEL.assertDeepEqual(true, new Set(), "assertDeepEqual(); 22e - error");
} catch (e) { CUT.isTrue(e, true); }
CUT.isTrue("assertDeepEqual(); 22f - ok",
  CEL.assertDeepEqual(Object(true), new Set())
);
try {
  CEL.assertDeepEqual("lorem", new Set(), "assertDeepEqual(); 22g - error");
} catch (e) { CUT.isTrue(e, true); }
try {
  CEL.assertDeepEqual(Object("lorem"), new Set(), "assertDeepEqual(); 22h - error");
} catch (e) { CUT.isTrue(e, true); }
try {
  CEL.assertDeepEqual(42n, new Set(), "assertDeepEqual(); 22i - error");
} catch (e) { CUT.isTrue(e, true); }
CUT.isTrue("assertDeepEqual(); 22j - ok",
  CEL.assertDeepEqual(Object(42n), new Set())
);
/* objects / not same prototype - weakset */
CUT.isTrue("assertDeepEqual(); 23a - ok",
  CEL.assertDeepEqual(new WeakMap(), new WeakSet())
);
try {
  CEL.assertDeepEqual(new Error(), new WeakSet(), "assertDeepEqual(); 23b - error");
} catch (e) { CUT.isTrue(e, true); }
try {
  CEL.assertDeepEqual(42, new WeakSet(), "assertDeepEqual(); 23c - error");
} catch (e) { CUT.isTrue(e, true); }
CUT.isTrue("assertDeepEqual(); 23d - ok",
  CEL.assertDeepEqual(Object(42), new WeakSet())
);
try {
  CEL.assertDeepEqual(true, new WeakSet(), "assertDeepEqual(); 23e - error");
} catch (e) { CUT.isTrue(e, true); }
CUT.isTrue( "assertDeepEqual(); 23f - ok",
  CEL.assertDeepEqual(Object(true), new WeakSet())
);
try {
  CEL.assertDeepEqual("lorem", new WeakSet(), "assertDeepEqual(); 23g - error");
} catch (e) { CUT.isTrue(e, true); }
try {
  CEL.assertDeepEqual(Object("lorem"), new WeakSet(), "assertDeepEqual(); 23h - error");
} catch (e) { CUT.isTrue(e, true); }
try {
  CEL.assertDeepEqual(42n, new WeakSet(), "assertDeepEqual(); 23i - error");
} catch (e) { CUT.isTrue(e, true); }
CUT.isTrue("assertDeepEqual(); 23j - ok",
  CEL.assertDeepEqual(Object(42n), new WeakSet())
);
/* objects / not same prototype - weakmap */
try {
  CEL.assertDeepEqual(new Error(), new WeakMap(), "assertDeepEqual(); 24a - error");
} catch (e) { CUT.isTrue(e, true); }
try {
  CEL.assertDeepEqual(42, new WeakMap(), "assertDeepEqual(); 24b - error");
} catch (e) { CUT.isTrue(e, true); }
CUT.isTrue("assertDeepEqual(); 24c - ok",
  CEL.assertDeepEqual(Object(42), new WeakMap())
);
try {
  CEL.assertDeepEqual(true, new WeakMap(), "assertDeepEqual(); 24d - error");
} catch (e) { CUT.isTrue(e, true); }
CUT.isTrue("assertDeepEqual(); 24e - ok",
  CEL.assertDeepEqual(Object(true), new WeakMap())
);
try {
  CEL.assertDeepEqual("lorem", new WeakMap(), "assertDeepEqual(); 24f - error");
} catch (e) { CUT.isTrue(e, true); }
try {
  CEL.assertDeepEqual(Object("lorem"), new WeakMap(), "assertDeepEqual(); 24g - error");
} catch (e) { CUT.isTrue(e, true); }
try {
  CEL.assertDeepEqual(42n, new WeakMap(), "assertDeepEqual(); 24h - error");
} catch (e) { CUT.isTrue(e, true); }
CUT.isTrue("assertDeepEqual(); 24i - ok",
  CEL.assertDeepEqual(Object(42n), new WeakMap())
);
/* objects / not same prototype - error */
try {
  CEL.assertDeepEqual(42, new Error(42), "assertDeepEqual(); 25a - error");
} catch (e) { CUT.isTrue(e, true); }
try {
  CEL.assertDeepEqual(Object(42), new Error(42), "assertDeepEqual(); 25b - error");
} catch (e) { CUT.isTrue(e, true); }
try {
  CEL.assertDeepEqual(true, new Error(true), "assertDeepEqual(); 25c - error");
} catch (e) { CUT.isTrue(e, true); }
try {
  CEL.assertDeepEqual(Object(true), new Error(true), "assertDeepEqual(); 25d - error");
} catch (e) { CUT.isTrue(e, true); }
try {
  CEL.assertDeepEqual("lorem", new Error("lorem"), "assertDeepEqual(); 25e - error");
} catch (e) { CUT.isTrue(e, true); }
try {
  CEL.assertDeepEqual(Object("lorem"), new Error("lorem"), "assertDeepEqual(); 25f - error");
} catch (e) { CUT.isTrue(e, true); }
try {
  CEL.assertDeepEqual(42n, new Error(42n), "assertDeepEqual(); 25g - error");
} catch (e) { CUT.isTrue(e, true); }
try {
  CEL.assertDeepEqual(Object(42n), new Error(42n), "assertDeepEqual(); 25h - error");
} catch (e) { CUT.isTrue(e, true); }
/* objects / not same prototype - number */
CUT.isTrue("assertDeepEqual(); 26a - ok", CEL.assertDeepEqual(true, 1));
CUT.isTrue("assertDeepEqual(); 26b - ok", CEL.assertDeepEqual(Object(true), 1));
CUT.isTrue("assertDeepEqual(); 26c - ok", CEL.assertDeepEqual("1", 1));
CUT.isTrue("assertDeepEqual(); 26d - ok", CEL.assertDeepEqual(Object("1"), 1));
CUT.isTrue("assertDeepEqual(); 26e - ok", CEL.assertDeepEqual(42n, 42));
CUT.isTrue("assertDeepEqual(); 26f - ok", CEL.assertDeepEqual(Object(42n), 42));
/* objects / not same prototype - string */
try {
  CEL.assertDeepEqual(true, "true", "assertDeepEqual(); 27a - error");
} catch (e) { CUT.isTrue(e, true); }
try {
  CEL.assertDeepEqual(42n, "42n", "assertDeepEqual(); 27b - error");
} catch (e) { CUT.isTrue(e, true); }
CUT.isTrue("assertDeepEqual(); 27c - ok",
  CEL.assertDeepEqual(Object(42), "42")
);
try {
  CEL.assertDeepEqual(Object(42n), "42n", "assertDeepEqual(); 27d - error");
} catch (e) { CUT.isTrue(e, true); }
try {
  CEL.assertDeepEqual(Object(true), "true", "assertDeepEqual(); 27e - error");
} catch (e) { CUT.isTrue(e, true); }
/* objects / not same prototype - boolean */
CUT.isTrue("assertDeepEqual(); 28a - ok", CEL.assertDeepEqual(1n, true));
CUT.isTrue("assertDeepEqual(); 28b - ok",
  CEL.assertDeepEqual(Object(1n), true)
);
CUT.isTrue( "assertDeepEqual(); 28c - ok",
  CEL.assertDeepEqual(Object(1), true)
);
try {
  CEL.assertDeepEqual("true", true, "assertDeepEqual(); 28d - error");
} catch (e) { CUT.isTrue(e, true); }
/* objects / not same prototype - bigint */
CUT.isTrue("assertDeepEqual(); 29a - ok",
  CEL.assertDeepEqual(Object(42), 42n)
);
CUT.isTrue("assertDeepEqual(); 29b - ok",
  CEL.assertDeepEqual(Object("42"), 42n)
);
try {
  CEL.assertDeepEqual(Object(true), 1n, "assertDeepEqual(); 29c - error");
} catch (e) { CUT.isTrue(e, true); }
/* objects / not same prototype - Object wrappers */
try {
  CEL.assertDeepEqual(Object(42), Object("42"), "assertDeepEqual(); 30a - error");
} catch (e) { CUT.isTrue(e, true); }
CUT.isTrue("assertDeepEqual(); 30b - ok",
  CEL.assertDeepEqual(Object(1), Object(true))
);
CUT.isTrue("assertDeepEqual(); 30c - ok",
  CEL.assertDeepEqual(Object(1), Object(1n))
);
try {
  CEL.assertDeepEqual(Object("true"), Object(true), "assertDeepEqual(); 30d - error");
} catch (e) { CUT.isTrue(e, true); }
try {
  CEL.assertDeepEqual(Object(42n), Object("42n"), "assertDeepEqual(); 30e - error");
} catch (e) { CUT.isTrue(e, true); }
CUT.isTrue("assertDeepEqual(); 30f - ok",
  CEL.assertDeepEqual(Object(1n), Object(true), )
);
/* assertDeepEqual(); end */



/* assertNotDeepStrictEqual begin */
/* primitives / number + Object wrappers */
try {
  CEL.assertNotDeepStrictEqual(
    42, 42, "assertNotDeepStrictEqual(); 01a - error"
  );
} catch (e) { CUT.isTrue(e, true); }
CUT.isTrue("assertNotDeepStrictEqual(); 01b - ok",
  CEL.assertNotDeepStrictEqual(42, 43)
);
try {
  CEL.assertNotDeepStrictEqual(
    42, Object(42), "assertNotDeepStrictEqual(); 01c - error"
  );
} catch (e) { CUT.isTrue(e, true); }
try {
  CEL.assertNotDeepStrictEqual(
    Object(42), 42, "assertNotDeepStrictEqual(); 01d - error"
  );
} catch (e) { CUT.isTrue(e, true); }
CUT.isTrue("assertNotDeepStrictEqual(); 01e - ok",
  CEL.assertNotDeepStrictEqual(42, Object(43))
);
CUT.isTrue("assertNotDeepStrictEqual(); 01f - ok",
  CEL.assertNotDeepStrictEqual(Object(42), 43)
);
try {
  CEL.assertNotDeepStrictEqual(
    Object(42), Object(42), "assertNotDeepStrictEqual(); 01g - error"
  );
} catch (e) { CUT.isTrue(e, true); }
CUT.isTrue("assertNotDeepStrictEqual(); 01h - ok",
  CEL.assertNotDeepStrictEqual(Object(42), Object(43))
);
/* primitives / number: 0, -0, NaN, Infinity, -Infinity */
try {
  CEL.assertNotDeepStrictEqual(0, 0, "assertNotDeepStrictEqual(); 01i - error");
} catch (e) { CUT.isTrue(e, true); }
try {
  CEL.assertNotDeepStrictEqual(
    -0, -0, "assertNotDeepStrictEqual(); 01j - error"
  );
} catch (e) { CUT.isTrue(e, true); }
CUT.isTrue("assertNotDeepStrictEqual(); 01k - ok",
  CEL.assertNotDeepStrictEqual(-0, 0)
);
CUT.isTrue("assertNotDeepStrictEqual(); 01l - ok",
  CEL.assertNotDeepStrictEqual(-0, +0)
);
try {
  CEL.assertNotDeepStrictEqual(
    NaN, NaN, "assertNotDeepStrictEqual(); 01m - error"
  );
} catch (e) { CUT.isTrue(e, true); }
try {
  CEL.assertNotDeepStrictEqual(
    Infinity, Infinity, "assertNotDeepStrictEqual(); 01n - error"
  );
} catch (e) { CUT.isTrue(e, true); }
try {
  CEL.assertNotDeepStrictEqual(
    -Infinity, -Infinity, "assertNotDeepStrictEqual(); 01o - error"
  );
} catch (e) { CUT.isTrue(e, true); }
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
try {
  CEL.assertNotDeepStrictEqual(
    42n, 42n, "assertNotDeepStrictEqual(); 02a - error"
  );
} catch (e) { CUT.isTrue(e, true); }
CUT.isTrue("assertNotDeepStrictEqual(); 02b - ok",
  CEL.assertNotDeepStrictEqual(42n, 43n)
);
try {
  CEL.assertNotDeepStrictEqual(
    42n, Object(42n), "assertNotDeepStrictEqual(); 02c - error"
  );
} catch (e) { CUT.isTrue(e, true); }
try {
  CEL.assertNotDeepStrictEqual(
    Object(42n), 42n, "assertNotDeepStrictEqual(); 02d - error"
  );
} catch (e) { CUT.isTrue(e, true); }
CUT.isTrue("assertNotDeepStrictEqual(); 02e - ok",
  CEL.assertNotDeepStrictEqual(42n, Object(43n), )
);
CUT.isTrue("assertNotDeepStrictEqual(); 02f - ok",
  CEL.assertNotDeepStrictEqual(Object(42n), 43n)
);
try {
  CEL.assertNotDeepStrictEqual(
    Object(42n), Object(42n),"assertNotDeepStrictEqual(); 02g - error"
  );
} catch (e) { CUT.isTrue(e, true); }
CUT.isTrue("assertNotDeepStrictEqual(); 02h - ok",
  CEL.assertNotDeepStrictEqual(Object(42n), Object(43n))
);
/* primitives / string + Object wrappers */
try {
  CEL.assertNotDeepStrictEqual(
    "lorem", "lorem", "assertNotDeepStrictEqual(); 03a - error"
  );
} catch (e) { CUT.isTrue(e, true); }
CUT.isTrue("assertNotDeepStrictEqual(); 03b - ok",
  CEL.assertNotDeepStrictEqual("lorem", "ipsum")
);
try {
  CEL.assertNotDeepStrictEqual(
    "lorem", Object("lorem"), "assertNotDeepStrictEqual(); 03c - error"
  );
} catch (e) { CUT.isTrue(e, true); }
try {
  CEL.assertNotDeepStrictEqual(
    Object("lorem"), "lorem", "assertNotDeepStrictEqual(); 03d - error"
  );
} catch (e) { CUT.isTrue(e, true); }
CUT.isTrue("assertNotDeepStrictEqual(); 03e - ok",
  CEL.assertNotDeepStrictEqual("lorem", Object("ipsum"), )
);
CUT.isTrue("assertNotDeepStrictEqual(); 03f - ok",
  CEL.assertNotDeepStrictEqual(Object("lorem"), "ipsum")
);
try {
  CEL.assertNotDeepStrictEqual(
    Object("lorem"), Object("lorem"), "assertNotDeepStrictEqual(); 03g - error"
  );
} catch (e) { CUT.isTrue(e, true); }
CUT.isTrue("assertNotDeepStrictEqual(); 03h - ok",
  CEL.assertNotDeepStrictEqual(Object("lorem"), Object("ipsum"))
);
/* primitives / boolean + Object wrappers */
try {
  CEL.assertNotDeepStrictEqual(
    true, true, "assertNotDeepStrictEqual(); 04a - error"
  );
} catch (e) { CUT.isTrue(e, true); }
CUT.isTrue("assertNotDeepStrictEqual(); 04b - ok",
  CEL.assertNotDeepStrictEqual(true, false)
);
try {
  CEL.assertNotDeepStrictEqual(
    true, Object(true), "assertNotDeepStrictEqual(); 04c - error"
  );
} catch (e) { CUT.isTrue(e, true); }
try {
  CEL.assertNotDeepStrictEqual(
    Object(true), true, "assertNotDeepStrictEqual(); 04d - error"
  );
} catch (e) { CUT.isTrue(e, true); }
CUT.isTrue("assertNotDeepStrictEqual(); 04e - ok",
  CEL.assertNotDeepStrictEqual(true, Object(false))
);
CUT.isTrue("assertNotDeepStrictEqual(); 04f - ok",
  CEL.assertNotDeepStrictEqual(Object(true), false)
);
try {
  CEL.assertNotDeepStrictEqual(
    Object(true), Object(true), "assertNotDeepStrictEqual(); 04g - error"
  );
} catch (e) { CUT.isTrue(e, true); }
CUT.isTrue("assertNotDeepStrictEqual(); 04h - ok",
  CEL.assertNotDeepStrictEqual(Object(true), Object(false))
);

/* primitives / Symbol */
token1 = Symbol("Agradzsag");
token2 = Symbol("Agradzsag");
token3 = Symbol("Trillian");
try {
  CEL.assertNotDeepStrictEqual(
    token1, token1, "assertNotDeepStrictEqual(); 05a - error"
  );
} catch (e) { CUT.isTrue(e, true); }
CUT.isTrue("assertNotDeepStrictEqual(); 05b - ok",
  CEL.assertNotDeepStrictEqual(token1, token2)
);
CUT.isTrue("assertNotDeepStrictEqual(); 05c - ok",
  CEL.assertNotDeepStrictEqual(token1, token3)
);
/* objects / Array */
try {
  CEL.assertNotDeepStrictEqual(
    [1, 2], [1, 2], "assertNotDeepStrictEqual(); 06a - error"
  );
} catch (e) { CUT.isTrue(e, true); }
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
try {
  CEL.assertNotDeepStrictEqual(
    token1, token2, "assertNotDeepStrictEqual(); 07a - error"
  );
} catch (e) { CUT.isTrue(e, true); }
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
try {
  CEL.assertNotDeepStrictEqual(
    token1, token2, "assertNotDeepStrictEqual(); 08a - error"
  );
} catch (e) { CUT.isTrue(e, true); }
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
try {
  CEL.assertNotDeepStrictEqual(
    token1, token2, "assertNotDeepStrictEqual(); 09a - error"
  );
} catch (e) { CUT.isTrue(e, true); }
try {
  CEL.assertNotDeepStrictEqual(
    token6, token6, "assertNotDeepStrictEqual(); 09b - error"
  );
} catch (e) { CUT.isTrue(e, true); }
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
try {
  CEL.assertNotDeepStrictEqual(
    token1, token2, "assertNotDeepStrictEqual(); 10a - error"
  );
} catch (e) { CUT.isTrue(e, true); }
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
try {
  CEL.assertNotDeepStrictEqual(
    token1, token1, "assertNotDeepStrictEqual(); 11a - error"
  );
} catch (e) { CUT.isTrue(e, true); }
CUT.isTrue("assertNotDeepStrictEqual(); 11b - ok",
  CEL.assertNotDeepStrictEqual(token1, token2)
);
token1 = new WeakMap();
token2 = new WeakMap();
try {
  CEL.assertNotDeepStrictEqual(
    token1, token1, "assertNotDeepStrictEqual(); 11c - error"
  );
} catch (e) { CUT.isTrue(e, true); }
CUT.isTrue("assertNotDeepStrictEqual(); 11d - ok",
  CEL.assertNotDeepStrictEqual(token1, token2)
);
/* objects / Function */
token1 = Array.from;
token2 = Array.of;
try {
  CEL.assertNotDeepStrictEqual(
    token1, token1, "assertNotDeepStrictEqual(); 12a - error"
  );
} catch (e) { CUT.isTrue(e, true); }
CUT.isTrue("assertNotDeepStrictEqual(); 12b - ok",
  CEL.assertNotDeepStrictEqual(token1, token2)
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
try {
  CEL.assertNotDeepStrictEqual(
    token1, token1, "assertNotDeepStrictEqual(); 13a - error"
  );
} catch (e) { CUT.isTrue(e, true); }
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
try {
  CEL.assertNotDeepStrictEqual(
    token1, token1, "assertNotDeepStrictEqual(); 14a - error"
  );
} catch (e) { CUT.isTrue(e, true); }
try {
  CEL.assertNotDeepStrictEqual(
    token3, token3, "assertNotDeepStrictEqual(); 14b - error"
  );
} catch (e) { CUT.isTrue(e, true); }
CUT.isTrue("assertNotDeepStrictEqual(); 14c - ok",
  CEL.assertNotDeepStrictEqual(token1, token2)
);
CUT.isTrue("assertNotDeepStrictEqual(); 14d - ok",
  CEL.assertNotDeepStrictEqual(token1, token3)
);
/* types: null, undefined */
try {
  CEL.assertNotDeepStrictEqual(
    null, null, "assertNotDeepStrictEqual(); 15a - error"
  );
} catch (e) { CUT.isTrue(e, true); }
try {
  CEL.assertNotDeepStrictEqual(
    undefined, undefined,"assertNotDeepStrictEqual(); 15b - error"
  );
} catch (e) { CUT.isTrue(e, true); }
CUT.isTrue("assertNotDeepStrictEqual(); 15c - ok",
  CEL.assertNotDeepStrictEqual(null, undefined)
);
/* structures 1 */
token1 = new Error("Agradzsag");
token2 = [1,2,{"3": 4, "5": new Map([["6", 7], ["8", [9, token1]]])}];
token3 = [1,2,{"3": 4, "5": new Map([["6", 7], ["8", [9, token1]]])}];
token4 = [1,2,{"3": 4, "5": new Map([["6", 7], ["8", [9, 42]]])}];
token5 = [1,2,{"3": 4, "5": new Map([["6", 7], ["8", [9, token1, 42]]])}];
try {
  CEL.assertNotDeepStrictEqual(
    token2, token2, "assertNotDeepStrictEqual(); 16a - error"
  );
} catch (e) { CUT.isTrue(e, true); }
try {
  CEL.assertNotDeepStrictEqual(
    token2, token3, "assertNotDeepStrictEqual(); 16b - error"
  );
} catch (e) { CUT.isTrue(e, true); }
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
try {
  CEL.assertNotDeepStrictEqual(
    token2, token2, "assertNotDeepStrictEqual(); 17a - error"
  );
} catch (e) { CUT.isTrue(e, true); }
try {
  CEL.assertNotDeepStrictEqual(
    token2, token3, "assertNotDeepStrictEqual(); 17b - error"
  );
} catch (e) { CUT.isTrue(e, true); }
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
try {
  CEL.assertNotDeepStrictEqual(
    token2, token2, "assertNotDeepStrictEqual(); 18a - error"
  );
} catch (e) { CUT.isTrue(e, true); }
try {
  CEL.assertNotDeepStrictEqual(
    token2, token3, "assertNotDeepStrictEqual(); 18b - error"
  );
} catch (e) { CUT.isTrue(e, true); }
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
try {
  CEL.assertNotDeepStrictEqual(
    token2, token2, "assertNotDeepStrictEqual(); 19a - error"
  );
} catch (e) { CUT.isTrue(e, true); }
try {
  CEL.assertNotDeepStrictEqual
    (token2, token3, "assertNotDeepStrictEqual(); 19b - error"
  );
} catch (e) { CUT.isTrue(e, true); }
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
CUT.isTrue("assertNotDeepStrictEqual(); 29c - ok",
  CEL.assertNotDeepStrictEqual(Object(true), 1n)
);
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
/* assertNotDeepStrictEqual end */


/* assertNotDeepEqual begin */
/* primitives / number + Object wrappers */
try {
  CEL.assertNotDeepEqual(42, 42, "assertNotDeepEqual(); 01a - error");
} catch (e) { CUT.isTrue(e, true); }
CUT.isTrue("assertNotDeepEqual(); 01b - ok", CEL.assertNotDeepEqual(42, 43));
try {
  CEL.assertNotDeepEqual(42, Object(42), "assertNotDeepEqual(); 01c - error");
} catch (e) { CUT.isTrue(e, true); }
try {
  CEL.assertNotDeepEqual(Object(42), 42, "assertNotDeepEqual(); 01d - error");
} catch (e) { CUT.isTrue(e, true); }
CUT.isTrue("assertNotDeepEqual(); 01e - ok",
  CEL.assertNotDeepEqual(42, Object(43))
);
CUT.isTrue("assertNotDeepEqual(); 01f - ok",
  CEL.assertNotDeepEqual(Object(42), 43)
);
try {
  CEL.assertNotDeepEqual(
    Object(42), Object(42), "assertNotDeepEqual(); 01g - error"
  );
} catch (e) { CUT.isTrue(e, true); }
try {
  CEL.assertNotDeepEqual(
    Object(42), Object(43), "assertNotDeepEqual(); 01h - error"
  );
} catch (e) { CUT.isTrue(e, true); }
/* primitives / number: 0, -0, NaN, Infinity, -Infinity */
try {
  CEL.assertNotDeepEqual(0, 0, "assertNotDeepEqual(); 01i - error");
} catch (e) { CUT.isTrue(e, true); }
try {
  CEL.assertNotDeepEqual(-0, -0, "assertNotDeepEqual(); 01j - error");
} catch (e) { CUT.isTrue(e, true); }
try {
} catch (e) { CUT.isTrue(e, true); }
try {
  CEL.assertNotDeepEqual(-0, 0, "assertNotDeepEqual(); 01k - error");
} catch (e) { CUT.isTrue(e, true); }
try {
  CEL.assertNotDeepEqual(-0, +0, "assertNotDeepEqual(); 01l - error");
} catch (e) { CUT.isTrue(e, true); }
try {
  CEL.assertNotDeepEqual(NaN, NaN, "assertNotDeepEqual(); 01m - error");
} catch (e) { CUT.isTrue(e, true); }
try {
  CEL.assertNotDeepEqual(
    Infinity, Infinity, "assertNotDeepEqual(); 01n - error"
  );
} catch (e) { CUT.isTrue(e, true); }
try {
  CEL.assertNotDeepEqual(
    -Infinity, -Infinity, "assertNotDeepEqual(); 01o - error"
  );
} catch (e) { CUT.isTrue(e, true); }
CUT.isTrue("assertNotDeepEqual(); 01p - ok",
  CEL.assertNotDeepEqual(Infinity, -Infinity)
);
/* primitives / not same type */
try {
  CEL.assertNotDeepEqual(42, "42", "assertNotDeepEqual(); 01q - error");
} catch (e) { CUT.isTrue(e, true); }
try {
  CEL.assertNotDeepEqual(1, true, "assertNotDeepEqual(); 01r - error");
} catch (e) { CUT.isTrue(e, true); }
try {
  CEL.assertNotDeepEqual(1n, true, "assertNotDeepEqual(); 01s - error");
} catch (e) { CUT.isTrue(e, true); }
CUT.isTrue("assertNotDeepEqual(); 01t - ok", CEL.assertNotDeepEqual(1n, "1n"));
try {
  CEL.assertNotDeepEqual(false, "", "assertNotDeepEqual(); 01u - error");
} catch (e) { CUT.isTrue(e, true); }
/* primitives / bigint + Object wrappers */
try {
  CEL.assertNotDeepEqual(42n, 42n, "assertNotDeepEqual(); 02a - error");
} catch (e) { CUT.isTrue(e, true); }
CUT.isTrue("assertNotDeepEqual(); 02b - ok", CEL.assertNotDeepEqual(42n, 43n));
try {
  CEL.assertNotDeepEqual(42n, Object(42n), "assertNotDeepEqual(); 02c - error");
} catch (e) { CUT.isTrue(e, true); }
try {
  CEL.assertNotDeepEqual(Object(42n), 42n, "assertNotDeepEqual(); 02d - error");
} catch (e) { CUT.isTrue(e, true); }
CUT.isTrue("assertNotDeepEqual(); 02e - ok",
  CEL.assertNotDeepEqual(42n, Object(43n))
);
CUT.isTrue("assertNotDeepEqual(); 02f - ok",
  CEL.assertNotDeepEqual(Object(42n), 43n)
);
try {
  CEL.assertNotDeepEqual(
    Object(42n), Object(42n), "assertNotDeepEqual(); 02g - error"
  );
} catch (e) { CUT.isTrue(e, true); }
try {
  CEL.assertNotDeepEqual(
    Object(42n), Object(43n), "assertNotDeepEqual(); 02h - error"
  );
} catch (e) { CUT.isTrue(e, true); }
/* primitives / string + Object wrappers */
try {
  CEL.assertNotDeepEqual("lorem", "lorem", "assertNotDeepEqual(); 03a - error");
} catch (e) { CUT.isTrue(e, true); }
CUT.isTrue("assertNotDeepEqual(); 03b - ok",
  CEL.assertNotDeepEqual("lorem", "ipsum")
);
try {
  CEL.assertNotDeepEqual(
    "lorem", Object("lorem"), "assertNotDeepEqual(); 03c - error"
  );
} catch (e) { CUT.isTrue(e, true); }
try {
  CEL.assertNotDeepEqual(
    Object("lorem"), "lorem", "assertNotDeepEqual(); 03d - error"
  );
} catch (e) { CUT.isTrue(e, true); }
CUT.isTrue("assertNotDeepEqual(); 03e - ok",
  CEL.assertNotDeepEqual("lorem", Object("ipsum"))
);
CUT.isTrue("assertNotDeepEqual(); 03f - ok",
  CEL.assertNotDeepEqual(Object("lorem"), "ipsum")
);
try {
  CEL.assertNotDeepEqual(
    Object("lorem"), Object("lorem"), "assertNotDeepEqual(); 03g - error"
  );
} catch (e) { CUT.isTrue(e, true); }
CUT.isTrue("assertNotDeepEqual(); 03h - ok",
  CEL.assertNotDeepEqual(Object("lorem"), Object("ipsum"))
);
/* primitives / boolean + Object wrappers */
try {
  CEL.assertNotDeepEqual(true, true, "assertNotDeepEqual(); 04a - error");
} catch (e) { CUT.isTrue(e, true); }
CUT.isTrue("assertNotDeepEqual(); 04b - ok",
  CEL.assertNotDeepEqual(true, false)
);
try {
  CEL.assertNotDeepEqual(
    true, Object(true), "assertNotDeepEqual(); 04c - error"
  );
} catch (e) { CUT.isTrue(e, true); }
try {
  CEL.assertNotDeepEqual(
    Object(true), true, "assertNotDeepEqual(); 04d - error"
  );
} catch (e) { CUT.isTrue(e, true); }
CUT.isTrue("assertNotDeepEqual(); 04e - ok",
  CEL.assertNotDeepEqual(true, Object(false))
);
CUT.isTrue("assertNotDeepEqual(); 04f - ok",
  CEL.assertNotDeepEqual(Object(true), false)
);
try {
  CEL.assertNotDeepEqual(
    Object(true), Object(true), "assertNotDeepEqual(); 04g - error"
  );
} catch (e) { CUT.isTrue(e, true); }
try {
  CEL.assertNotDeepEqual(
    Object(true), Object(false), "assertNotDeepEqual(); 04h - error"
  );
} catch (e) { CUT.isTrue(e, true); }
/* primitives / Symbol */
token1 = Symbol("Agradzsag");
token2 = Symbol("Agradzsag");
token3 = Symbol("Trillian");
try {
  CEL.assertNotDeepEqual(token1, token1, "assertNotDeepEqual(); 05a - error");
} catch (e) { CUT.isTrue(e, true); }
CUT.isTrue("assertNotDeepEqual(); 05b - ok",
  CEL.assertNotDeepEqual(token1, token2)
);
CUT.isTrue("assertNotDeepEqual(); 06a - error",
  CEL.assertNotDeepEqual(token1, token3, "assertNotDeepEqual(); 05c - ok")
);
/* objects / Array */
try {
  CEL.assertNotDeepEqual([1, 2], [1, 2]);
} catch (e) { CUT.isTrue(e, true); }
CUT.isTrue("assertNotDeepEqual(); 06b - ok",
  CEL.assertNotDeepEqual([1, 2], [1, 3])
);
try {
  CEL.assertNotDeepEqual([1, 2], [1, "2"], "assertNotDeepEqual(); 06c - error");
} catch (e) { CUT.isTrue(e, true); }
CUT.isTrue("assertNotDeepEqual(); 06d - ok",
  CEL.assertNotDeepEqual([1, 2], [1, 2, 3])
);
/* objects / Set */
token1 = new Set([1, 2]);
token2 = new Set([1, 2]);
token3 = new Set([1, 3]);
token4 = new Set([1, "2"]);
token5 = new Set([1, 2, 3]);
try {
  CEL.assertNotDeepEqual(token1, token2, "assertNotDeepEqual(); 07a - error");
} catch (e) { CUT.isTrue(e, true); }
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
try {
  CEL.assertNotDeepEqual(token1, token2, "assertNotDeepEqual(); 08a - error");
} catch (e) { CUT.isTrue(e, true); }
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
try {
  CEL.assertNotDeepEqual(token1, token2, "assertNotDeepEqual(); 09a - error");
} catch (e) { CUT.isTrue(e, true); }
try {
  CEL.assertNotDeepEqual(token6, token6, "assertNotDeepEqual(); 09b - error");
} catch (e) { CUT.isTrue(e, true); }
CUT.isTrue("assertNotDeepEqual(); 09c - ok",
  CEL.assertNotDeepEqual(token1, token3)
);
try {
  CEL.assertNotDeepEqual(token1, token4, "assertNotDeepEqual(); 09d - error");
} catch (e) { CUT.isTrue(e, true); }
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
try {
  CEL.assertNotDeepEqual(token1, token2, "assertNotDeepEqual(); 10a - error");
} catch (e) { CUT.isTrue(e, true); }
CUT.isTrue("assertNotDeepEqual(); 10b - ok",
  CEL.assertNotDeepEqual(token1, token3)
);
try {
  CEL.assertNotDeepEqual(token1, token4, "assertNotDeepEqual(); 10c - error");
} catch (e) { CUT.isTrue(e, true); }
CUT.isTrue("assertNotDeepEqual(); 10d - ok",
  CEL.assertNotDeepEqual(token1, token5)
);
/* objects / weakset + weakmap*/
token1 = new WeakSet();
token2 = new WeakSet();
try {
  CEL.assertNotDeepEqual(token1, token1, "assertNotDeepEqual(); 11a - error");
} catch (e) { CUT.isTrue(e, true); }
CUT.isTrue("assertNotDeepEqual(); 11b - ok",
  CEL.assertNotDeepEqual(token1, token2)
);
token1 = new WeakMap();
token2 = new WeakMap();
try {
  CEL.assertNotDeepEqual(token1, token1, "assertNotDeepEqual(); 11c - error");
} catch (e) { CUT.isTrue(e, true); }
CUT.isTrue("assertNotDeepEqual(); 11d - ok",
  CEL.assertNotDeepEqual(token1, token2)
);
/* objects / Function */
token1 = Array.from;
token2 = Array.of;
try {
  CEL.assertNotDeepEqual(token1, token1, "assertNotDeepEqual(); 12a - error");
} catch (e) { CUT.isTrue(e, true); }
CUT.isTrue("assertNotDeepEqual(); 12b - ok",
  CEL.assertNotDeepEqual(token1, token2)
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
try {
  CEL.assertNotDeepEqual(token1, token1, "assertNotDeepEqual(); 13a - error");
} catch (e) { CUT.isTrue(e, true); }
CUT.isTrue("assertNotDeepEqual(); 13b - ok",
  CEL.assertNotDeepEqual(token1, token2)
);
try {
  CEL.assertNotDeepEqual(token1, token3, "assertNotDeepEqual(); 13c - error");
} catch (e) { CUT.isTrue(e, true); }
/* objects / Error */
token1 = new Error("Agradzsag");
token2 = new Error("Agradzsag");
token3 = new TypeError("Agradzsag");
token3 = new TypeError("Agradzsag");
try {
  CEL.assertNotDeepEqual(token1, token1, "assertNotDeepEqual(); 14a - error");
} catch (e) { CUT.isTrue(e, true); }
try {
  CEL.assertNotDeepEqual(token3, token3, "assertNotDeepEqual(); 14b - error");
} catch (e) { CUT.isTrue(e, true); }
CUT.isTrue("assertNotDeepEqual(); 14c - ok",
  CEL.assertNotDeepEqual(token1, token2)
);
CUT.isTrue("assertNotDeepEqual(); 14d - ok",
  CEL.assertNotDeepEqual(token1, token3)
);
/* types: null, undefined */
try {
  CEL.assertNotDeepEqual(null, null, "assertNotDeepEqual(); 15a - error");
} catch (e) { CUT.isTrue(e, true); }
try {
  CEL.assertNotDeepEqual(
    undefined, undefined, "assertNotDeepEqual(); 15b - error"
  );
} catch (e) { CUT.isTrue(e, true); }
try {
  CEL.assertNotDeepEqual(null, undefined, "assertNotDeepEqual(); 15c - error");
} catch (e) { CUT.isTrue(e, true); }
/* structures 1 */
token1 = new Error("Agradzsag");
token2 = [1,2,{"3": 4, "5": new Map([["6", 7], ["8", [9, token1]]])}];
token3 = [1,2,{"3": 4, "5": new Map([["6", 7], ["8", [9, token1]]])}];
token4 = [1,2,{"3": 4, "5": new Map([["6", 7], ["8", [9, 42]]])}];
token5 = [1,2,{"3": 4, "5": new Map([["6", 7], ["8", [9, token1, 42]]])}];
token6 = [1,2,{"3": 4, "5": new Map([["6", 7], ["8", [9, token1]]])}];
try {
  CEL.assertNotDeepEqual(token2, token2, "assertNotDeepEqual(); 16a - error");
} catch (e) { CUT.isTrue(e, true); }
try {
  CEL.assertNotDeepEqual(token2, token3, "assertNotDeepEqual(); 16b - error");
} catch (e) { CUT.isTrue(e, true); }
CUT.isTrue("assertNotDeepEqual(); 16c - ok",
  CEL.assertNotDeepEqual(token2, token4)
);
CUT.isTrue("assertNotDeepEqual(); 16d - ok",
  CEL.assertNotDeepEqual(token2, token5)
);
try {
  CEL.assertNotDeepEqual(token2, token6, "assertNotDeepEqual(); 16e - error");
} catch (e) { CUT.isTrue(e, true); }
/* structures 2 */
token1 = new Error("Agradzsag");
token2 = [1, 2, {"3": 4, "5": new Map([["6", 7], ["8", [9, 10]], ["11", new Set([12, 13])]])}, token1];
token3 = [1, 2, {"3": 4, "5": new Map([["6", 7], ["8", [9, 10]], ["11", new Set([12, 13])]])}, token1];
token4 = [1, 2, {"3": 4, "5": new Map([["6", 7], ["8", ["a", 10]], ["11", new Set([12, 13])]])}, token1];
token5 = [1, 2, {"3": 4, "5": new Map([["6", 7], ["8", [9, 10]], ["11", new Set([12, 13, 14])]])}, token1];
token6 = [1, 2, {"3": 4, "5": new Map([["6", 7], ["8", [9, 10]], ["11", new Set([12, 13])]])}, token1];
try {
  CEL.assertNotDeepEqual(token2, token2, "assertNotDeepEqual(); 17a - error");
} catch (e) { CUT.isTrue(e, true); }
try {
  CEL.assertNotDeepEqual(token2, token3, "assertNotDeepEqual(); 17b - error");
} catch (e) { CUT.isTrue(e, true); }
CUT.isTrue("assertNotDeepEqual(); 17c - ok",
  CEL.assertNotDeepEqual(token2, token4)
);
CUT.isTrue("assertNotDeepEqual(); 17d - ok",
  CEL.assertNotDeepEqual(token2, token5)
);
try {
  CEL.assertNotDeepEqual(token2, token6, "assertNotDeepEqual(); 17d - error");
} catch (e) { CUT.isTrue(e, true); }
/* structures 3 */
token1 = new Error("Agradzsag");
token2 = [1, 2, {"3": 4, "5": new Map([["6", 7], ["8", [9, 10]], ["11", new Set([12, 13])]])}, token1];
token3 = [1, 2, {"3": 4, "5": new Map([["6", 7], ["8", [9, 10]], ["11", new Set([12, 13])]])}, token1];
token4 = [1, 2, {"3": 4, "5": new Map([["6", 8], ["8", [9, 10]], ["11", new Set([12, 14])]])}, token1];
token5 = [1, 2, {"3": 4, "5": new Map([["6", 8], ["8", [9, 10, 15]], ["11", new Set([12, 13])]])}, token1];
token6 = [1, 2, {"3": 4, "5": new Map([["6", "7"], ["8", [9, 10]], ["11", new Set([12, 13])]])}, token1];
try {
  CEL.assertNotDeepEqual(token2, token2, "assertNotDeepEqual(); 18a - error");
} catch (e) { CUT.isTrue(e, true); }
try {
  CEL.assertNotDeepEqual(token2, token3, "assertNotDeepEqual(); 18b - error");
} catch (e) { CUT.isTrue(e, true); }
CUT.isTrue("assertNotDeepEqual(); 18c - ok",
  CEL.assertNotDeepEqual(token2, token4)
);
CUT.isTrue("assertNotDeepEqual(); 18d - ok",
  CEL.assertNotDeepEqual(token2, token5)
);
try {
  CEL.assertNotDeepEqual(token2, token6, "assertNotDeepEqual(); 18e - error");
} catch (e) { CUT.isTrue(e, true); }
/* structures 4 */
token1 = new Error("Agradzsag");
token2 = [1,2,{"3": 4, "5": new Map([["6", 7], ["8", [9, 10]], ["11", new Set([12, 13])]])}, token1];
token3 = [1,2,{"3": 4, "5": new Map([["6", 7], ["8", [9, 10]], ["11", new Set([12, 13])]])}, token1];
token4 = [1,5,{"3": 4, "5": new Map([["6", 7], ["8", [9, 10]], ["11", new Set([12, 13])]])}, token1];
token5 = [1,2,{"3": 4, "5": new Map([["6", 7], ["8", [9, 10]], ["11", new Set([12, 13, 14])]])}, token1];
try {
  CEL.assertNotDeepEqual(token2, token2, "assertNotDeepEqual(); 19a - error");
} catch (e) { CUT.isTrue(e, true); }
try {
  CEL.assertNotDeepEqual(token2, token3, "assertNotDeepEqual(); 19b - error");
} catch (e) { CUT.isTrue(e, true); }
CUT.isTrue("assertNotDeepEqual(); 19c - ok",
  CEL.assertNotDeepEqual(token2, token4)
);
CUT.isTrue("assertNotDeepEqual(); 19d - ok",
  CEL.assertNotDeepEqual(token2, token5)
);
/* objects / not same prototype - array */
CUT.isTrue("assertNotDeepEqual(); 20a - ok",
  CEL.assertNotDeepEqual({}, [])
);
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
try {
  CEL.assertNotDeepEqual(42, [42], "assertNotDeepEqual(); 20g - error");
} catch (e) { CUT.isTrue(e, true); }
CUT.isTrue("assertNotDeepEqual(); 20h - ok",
  CEL.assertNotDeepEqual(Object(42), [42])
);
CUT.isTrue("assertNotDeepEqual(); 20i - ok",
  CEL.assertNotDeepEqual(true, [true])
);
CUT.isTrue("assertNotDeepEqual(); 20j - ok",
  CEL.assertNotDeepEqual(Object(true), [true])
);
try {
  CEL.assertNotDeepEqual(
    "lorem", ["lorem"], "assertNotDeepEqual(); 20k - error"
  );
} catch (e) { CUT.isTrue(e, true); }
CUT.isTrue("assertNotDeepEqual(); 20l - ok",
  CEL.assertNotDeepEqual(Object("lorem"), ["lorem"])
);
try {
  CEL.assertNotDeepEqual(42n, [42n], "assertNotDeepEqual(); 20m - error");
} catch (e) { CUT.isTrue(e, true); }
CUT.isTrue("assertNotDeepEqual(); 20n - ok",
  CEL.assertNotDeepEqual(Object(42n), [42n])
);
/* objects / not same prototype - map */
try {
  CEL.assertNotDeepEqual(
    new Map(), new Set(), "assertNotDeepEqual(); 21a - error"
  );
} catch (e) { CUT.isTrue(e, true); }
try {
  CEL.assertNotDeepEqual(
    new Map(), new WeakSet(), "assertNotDeepEqual(); 21b - error"
  );
} catch (e) { CUT.isTrue(e, true); }
try {
  CEL.assertNotDeepEqual(
    new Map(), new WeakMap(), "assertNotDeepEqual(); 21c - error"
  );
} catch (e) { CUT.isTrue(e, true); }
CUT.isTrue("assertNotDeepEqual(); 21d - ok",
  CEL.assertNotDeepEqual(new Error(), new Map())
);
CUT.isTrue("assertNotDeepEqual(); 21e - ok",
  CEL.assertNotDeepEqual(42, new Map())
);
try {
  CEL.assertNotDeepEqual(
    Object(42), new Map(), "assertNotDeepEqual(); 21f - error"
  );
} catch (e) { CUT.isTrue(e, true); }
CUT.isTrue("assertNotDeepEqual(); 21g - ok",
  CEL.assertNotDeepEqual(true, new Map())
);
try {
  CEL.assertNotDeepEqual(
    Object(true), new Map(), "assertNotDeepEqual(); 21h - error"
  );
} catch (e) { CUT.isTrue(e, true); }
CUT.isTrue("assertNotDeepEqual(); 21i - ok",
  CEL.assertNotDeepEqual("lorem", new Map())
);
CUT.isTrue("assertNotDeepEqual(); 21j - ok",
  CEL.assertNotDeepEqual(Object("lorem"), new Map())
);
CUT.isTrue("assertNotDeepEqual(); 21k - ok",
  CEL.assertNotDeepEqual(42n, new Map())
);
try {
  CEL.assertNotDeepEqual(
    Object(42n), new Map(), "assertNotDeepEqual(); 21l - error"
  );
} catch (e) { CUT.isTrue(e, true); }
/* objects / not same prototype - set */
try {
  CEL.assertNotDeepEqual(
    new WeakMap(), new Set(), "assertNotDeepEqual(); 22a - error"
  );
} catch (e) { CUT.isTrue(e, true); }
CUT.isTrue("assertNotDeepEqual(); 22b - ok",
  CEL.assertNotDeepEqual(new Error(), new Set())
);
CUT.isTrue("assertNotDeepEqual(); 22c - ok",
  CEL.assertNotDeepEqual(42, new Set())
);
try {
  CEL.assertNotDeepEqual(
    Object(42), new Set(), "assertNotDeepEqual(); 22d - error"
  );
} catch (e) { CUT.isTrue(e, true); }
CUT.isTrue("assertNotDeepEqual(); 22e - ok",
  CEL.assertNotDeepEqual(true, new Set())
);
try {
  CEL.assertNotDeepEqual(
    Object(true), new Set(), "assertNotDeepEqual(); 22f - error"
  );
} catch (e) { CUT.isTrue(e, true); }
CUT.isTrue("assertNotDeepEqual(); 22g - ok",
  CEL.assertNotDeepEqual("lorem", new Set())
);
CUT.isTrue("assertNotDeepEqual(); 22h - ok",
  CEL.assertNotDeepEqual(Object("lorem"), new Set())
);
CUT.isTrue("assertNotDeepEqual(); 22i - ok",
  CEL.assertNotDeepEqual(42n, new Set())
);
try {
  CEL.assertNotDeepEqual(
    Object(42n), new Set(), "assertNotDeepEqual(); 22j - error"
  );
} catch (e) { CUT.isTrue(e, true); }
/* objects / not same prototype - weakset */
try {
  CEL.assertNotDeepEqual(
    new WeakMap(), new WeakSet(), "assertNotDeepEqual(); 23a - error"
  );
} catch (e) { CUT.isTrue(e, true); }
CUT.isTrue("assertNotDeepEqual(); 23b - ok",
  CEL.assertNotDeepEqual(new Error(), new WeakSet())
);
CUT.isTrue("assertNotDeepEqual(); 23c - ok",
  CEL.assertNotDeepEqual(42, new WeakSet())
);
try {
  CEL.assertNotDeepEqual(
    Object(42), new WeakSet(), "assertNotDeepEqual(); 23d - error"
  );
} catch (e) { CUT.isTrue(e, true); }
CUT.isTrue("assertNotDeepEqual(); 23e - ok",
  CEL.assertNotDeepEqual(true, new WeakSet())
);
try {
  CEL.assertNotDeepEqual(
    Object(true), new WeakSet(), "assertNotDeepEqual(); 23f - error"
  );
} catch (e) { CUT.isTrue(e, true); }
CUT.isTrue("assertNotDeepEqual(); 23g - ok",
  CEL.assertNotDeepEqual("lorem", new WeakSet())
);
CUT.isTrue("assertNotDeepEqual(); 23h - ok",
  CEL.assertNotDeepEqual(Object("lorem"), new WeakSet())
);
CUT.isTrue("assertNotDeepEqual(); 23i - ok",
  CEL.assertNotDeepEqual(42n, new WeakSet())
);
try {
  CEL.assertNotDeepEqual(
    Object(42n), new WeakSet(), "assertNotDeepEqual(); 23j - error"
  );
} catch (e) { CUT.isTrue(e, true); }
/* objects / not same prototype - weakmap */
CUT.isTrue("assertNotDeepEqual(); 24a - ok",
  CEL.assertNotDeepEqual(new Error(), new WeakMap())
);
CUT.isTrue("assertNotDeepEqual(); 24b - ok",
  CEL.assertNotDeepEqual(42, new WeakMap())
);
try {
  CEL.assertNotDeepEqual(
    Object(42), new WeakMap(), "assertNotDeepEqual(); 24c - error"
  );
} catch (e) { CUT.isTrue(e, true); }
CUT.isTrue("assertNotDeepEqual(); 24d - ok",
  CEL.assertNotDeepEqual(true, new WeakMap())
);
try {
  CEL.assertNotDeepEqual(
    Object(true), new WeakMap(), "assertNotDeepEqual(); 24e - error"
  );
} catch (e) { CUT.isTrue(e, true); }
CUT.isTrue("assertNotDeepEqual(); 24f - ok",
  CEL.assertNotDeepEqual("lorem", new WeakMap())
);
CUT.isTrue("assertNotDeepEqual(); 24g - ok",
  CEL.assertNotDeepEqual(Object("lorem"), new WeakMap())
);
CUT.isTrue("assertNotDeepEqual(); 24h - ok",
  CEL.assertNotDeepEqual(42n, new WeakMap())
);
try {
  CEL.assertNotDeepEqual(
    Object(42n), new WeakMap(), "assertNotDeepEqual(); 24i - error"
  );
} catch (e) { CUT.isTrue(e, true); }
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
try {
  CEL.assertNotDeepEqual(true, 1, "assertNotDeepEqual(); 26a - error");
} catch (e) { CUT.isTrue(e, true); }
try {
  CEL.assertNotDeepEqual(Object(true), 1, "assertNotDeepEqual(); 26b - error");
} catch (e) { CUT.isTrue(e, true); }
try {
  CEL.assertNotDeepEqual("1", 1, "assertNotDeepEqual(); 26c - error");
} catch (e) { CUT.isTrue(e, true); }
try {
  CEL.assertNotDeepEqual(Object("1"), 1, "assertNotDeepEqual(); 26d - error");
} catch (e) { CUT.isTrue(e, true); }
try {
  CEL.assertNotDeepEqual(42n, 42, "assertNotDeepEqual(); 26e - error");
} catch (e) { CUT.isTrue(e, true); }
try {
  CEL.assertNotDeepEqual(Object(42n), 42, "assertNotDeepEqual(); 26f - error");
} catch (e) { CUT.isTrue(e, true); }
/* objects / not same prototype - string */
CUT.isTrue("assertNotDeepEqual(); 27a - ok",
  CEL.assertNotDeepEqual(true, "true")
);
CUT.isTrue("assertNotDeepEqual(); 27b - ok",
  CEL.assertNotDeepEqual(42n, "42n")
);
try {
  CEL.assertNotDeepEqual(Object(42), "42", "assertNotDeepEqual(); 27c - error");
} catch (e) { CUT.isTrue(e, true); }
CUT.isTrue("assertNotDeepEqual(); 27d - ok",
  CEL.assertNotDeepEqual(Object(42n), "42n")
);
CUT.isTrue("assertNotDeepEqual(); 27e - ok",
  CEL.assertNotDeepEqual(Object(true), "true")
);
/* objects / not same prototype - boolean */
try {
  CEL.assertNotDeepEqual(1n, true, "assertNotDeepEqual(); 28a - error");
} catch (e) { CUT.isTrue(e, true); }
try {
  CEL.assertNotDeepEqual(Object(1n), true, "assertNotDeepEqual(); 28b - error");
} catch (e) { CUT.isTrue(e, true); }
try {
  CEL.assertNotDeepEqual(Object(1), true, "assertNotDeepEqual(); 28c - error");
} catch (e) { CUT.isTrue(e, true); }
CUT.isTrue("assertNotDeepEqual(); 28d - ok",
  CEL.assertNotDeepEqual("true", true)
);
/* objects / not same prototype - bigint */
try {
  CEL.assertNotDeepEqual(Object(42), 42n, "assertNotDeepEqual(); 29a - error");
} catch (e) { CUT.isTrue(e, true); }
try {
  CEL.assertNotDeepEqual(
    Object("42"), 42n, "assertNotDeepEqual(); 29b - error"
  );
} catch (e) { CUT.isTrue(e, true); }
try {
  CEL.assertNotDeepEqual(Object(true), 1n, "assertNotDeepEqual(); 29c - error");
} catch (e) { CUT.isTrue(e, true); }
/* objects / not same prototype - Object wrappers */
CUT.isTrue("assertNotDeepEqual(); 30a - ok",
  CEL.assertNotDeepEqual(Object(42), Object("42"))
);
try {
  CEL.assertNotDeepEqual(
    Object(1), Object(true), "assertNotDeepEqual(); 30b - error"
  );
} catch (e) { CUT.isTrue(e, true); }
try {
  CEL.assertNotDeepEqual(
    Object(1), Object(1n), "assertNotDeepEqual(); 30c - error"
  );
} catch (e) { CUT.isTrue(e, true); }
CUT.isTrue("assertNotDeepEqual(); 30d - ok",
  CEL.assertNotDeepEqual(Object("true"), Object(true))
);
CUT.isTrue("assertNotDeepEqual(); 30e - ok",
  CEL.assertNotDeepEqual(Object(42n), Object("42n"))
);
try {
  CEL.assertNotDeepEqual(
    Object(1n), Object(true), "assertNotDeepEqual(); 30f - error"
  );
} catch (e) { CUT.isTrue(e, true); }
/* assertNotDeepEqual end */


/* assertDeepStrictEqual begin */
/* primitives / number + Object wrappers */
CUT.isTrue("assertDeepStrictEqual(); 01a - ok",
  CEL.assertDeepStrictEqual(42, 42)
);
try {
  CEL.assertDeepStrictEqual(42, 43, "assertDeepStrictEqual(); 01b - error");
} catch (e) { CUT.isTrue(e, true); }
CUT.isTrue("assertDeepStrictEqual(); 01c - ok",
  CEL.assertDeepStrictEqual(42, Object(42))
);
CUT.isTrue("assertDeepStrictEqual(); 01d - ok",
  CEL.assertDeepStrictEqual(Object(42), 42)
);
try {
  CEL.assertDeepStrictEqual(
    42, Object(43), "assertDeepStrictEqual(); 01e - error"
  );
} catch (e) { CUT.isTrue(e, true); }
try {
  CEL.assertDeepStrictEqual(
    Object(42), 43, "assertDeepStrictEqual(); 01f - error"
  );
} catch (e) { CUT.isTrue(e, true); }
CUT.isTrue("assertDeepStrictEqual(); 01g - ok",
  CEL.assertDeepStrictEqual(Object(42), Object(42))
);
try {
  CEL.assertDeepStrictEqual(
    Object(42), Object(43), "assertDeepStrictEqual(); 01h - error"
  );
} catch (e) { CUT.isTrue(e, true); }
/* primitives / number: 0, -0, NaN, Infinity, -Infinity */
CUT.isTrue("assertDeepStrictEqual(); 01i - ok",
  CEL.assertDeepStrictEqual(0, 0)
);
CUT.isTrue("assertDeepStrictEqual(); 01j - ok",
  CEL.assertDeepStrictEqual(-0, -0)
);
try {
  CEL.assertDeepStrictEqual(-0, 0, "assertDeepStrictEqual(); 01k - error");
} catch (e) { CUT.isTrue(e, true); }
try {
  CEL.assertDeepStrictEqual(-0, +0, "assertDeepStrictEqual(); 01l - error");
} catch (e) { CUT.isTrue(e, true); }
CUT.isTrue("assertDeepStrictEqual(); 01m - ok",
  CEL.assertDeepStrictEqual(NaN, NaN)
);
CUT.isTrue("assertDeepStrictEqual(); 01n - ok",
  CEL.assertDeepStrictEqual(Infinity, Infinity)
);
CUT.isTrue("assertDeepStrictEqual(); 01o - ok",
  CEL.assertDeepStrictEqual(-Infinity, -Infinity)
);
try {
  CEL.assertDeepStrictEqual(
    Infinity, -Infinity, "assertDeepStrictEqual(); 01p - error"
  );
} catch (e) { CUT.isTrue(e, true); }
/* primitives / not same type */
try {
  CEL.assertDeepStrictEqual(42, "42", "assertDeepStrictEqual(); 01q - error");
} catch (e) { CUT.isTrue(e, true); }
try {
  CEL.assertDeepStrictEqual(1, true, "assertDeepStrictEqual(); 01r - error");
} catch (e) { CUT.isTrue(e, true); }
try {
  CEL.assertDeepStrictEqual(1n, true, "assertDeepStrictEqual(); 01s - error");
} catch (e) { CUT.isTrue(e, true); }
try {
  CEL.assertDeepStrictEqual(1n, "1n", "assertDeepStrictEqual(); 01t - error");
} catch (e) { CUT.isTrue(e, true); }
try {
  CEL.assertDeepStrictEqual(false, "", "assertDeepStrictEqual(); 01u - error");
} catch (e) { CUT.isTrue(e, true); }
/* primitives / bigint + Object wrappers */
CUT.isTrue("assertDeepStrictEqual(); 02a - ok",
  CEL.assertDeepStrictEqual(42n, 42n)
);
try {
  CEL.assertDeepStrictEqual(42n, 43n, "assertDeepStrictEqual(); 02b - error");
} catch (e) { CUT.isTrue(e, true); }
CUT.isTrue("assertDeepStrictEqual(); 02c - ok",
  CEL.assertDeepStrictEqual(42n, Object(42n))
);
CUT.isTrue("assertDeepStrictEqual(); 02d - ok",
  CEL.assertDeepStrictEqual(Object(42n), 42n)
);
try {
  CEL.assertDeepStrictEqual(
    42n, Object(43n), "assertDeepStrictEqual(); 02e - error"
  );
} catch (e) { CUT.isTrue(e, true); }
try {
  CEL.assertDeepStrictEqual(
    Object(42n), 43n, "assertDeepStrictEqual(); 02f - error"
  );
} catch (e) { CUT.isTrue(e, true); }
CUT.isTrue("assertDeepStrictEqual(); 02g - ok",
  CEL.assertDeepStrictEqual(Object(42n), Object(42n))
);
try {
  CEL.assertDeepStrictEqual(Object(42n), Object(43n));
} catch (e) { CUT.isTrue(e, true); }
/* primitives / string + Object wrappers */
CUT.isTrue("assertDeepStrictEqual(); 02h - error",
  CEL.assertDeepStrictEqual(
    "lorem", "lorem", "assertDeepStrictEqual(); 03a - ok"
  )
);
try {
  CEL.assertDeepStrictEqual(
    "lorem", "ipsum", "assertDeepStrictEqual(); 03b - error"
  );
} catch (e) { CUT.isTrue(e, true); }
CUT.isTrue("assertDeepStrictEqual(); 03c - ok",
  CEL.assertDeepStrictEqual("lorem", Object("lorem"))
);
CUT.isTrue("assertDeepStrictEqual(); 03d - ok",
  CEL.assertDeepStrictEqual(Object("lorem"), "lorem")
);
try {
  CEL.assertDeepStrictEqual(
    "lorem", Object("ipsum"), "assertDeepStrictEqual(); 03e - error"
  );
} catch (e) { CUT.isTrue(e, true); }
try {
  CEL.assertDeepStrictEqual(
    Object("lorem"), "ipsum", "assertDeepStrictEqual(); 03f - error"
  );
} catch (e) { CUT.isTrue(e, true); }
CUT.isTrue("assertDeepStrictEqual(); 03g - ok",
  CEL.assertDeepStrictEqual(Object("lorem"), Object("lorem"))
);
try {
  CEL.assertDeepStrictEqual(
    Object("lorem"), Object("ipsum"), "assertDeepStrictEqual(); 03h - error"
  );
} catch (e) { CUT.isTrue(e, true); }
/* primitives / boolean + Object wrappers */
CUT.isTrue("assertDeepStrictEqual(); 04a - ok",
  CEL.assertDeepStrictEqual(true, true)
);
try {
  CEL.assertDeepStrictEqual(
    true, false, "assertDeepStrictEqual(); 04b - error"
  );
} catch (e) { CUT.isTrue(e, true); }
CUT.isTrue("assertDeepStrictEqual(); 04c - ok",
  CEL.assertDeepStrictEqual(true, Object(true))
);
CUT.isTrue("assertDeepStrictEqual(); 04d - ok",
  CEL.assertDeepStrictEqual(Object(true), true)
);
try {
  CEL.assertDeepStrictEqual(
    true, Object(false), "assertDeepStrictEqual(); 04e - error"
  );
} catch (e) { CUT.isTrue(e, true); }
try {
  CEL.assertDeepStrictEqual(
    Object(true), false, "assertDeepStrictEqual(); 04f - error"
  );
} catch (e) { CUT.isTrue(e, true); }
CUT.isTrue("assertDeepStrictEqual(); 04g - ok",
  CEL.assertDeepStrictEqual(Object(true), Object(true))
);
try {
  CEL.assertDeepStrictEqual(
    Object(true), Object(false), "assertDeepStrictEqual(); 04h - error"
  );
} catch (e) { CUT.isTrue(e, true); }
/* primitives / Symbol */
token1 = Symbol("Agradzsag");
token2 = Symbol("Agradzsag");
token3 = Symbol("Trillian");
CUT.isTrue("assertDeepStrictEqual(); 05a - ok",
  CEL.assertDeepStrictEqual(token1, token1)
);
try {
  CEL.assertDeepStrictEqual(
    token1, token2, "assertDeepStrictEqual(); 05b - error"
  );
} catch (e) { CUT.isTrue(e, true); }
try {
  CEL.assertDeepStrictEqual(
    token1, token3, "assertDeepStrictEqual(); 05c - error"
  );
} catch (e) { CUT.isTrue(e, true); }
/* objects / Array */
CUT.isTrue("assertDeepStrictEqual(); 06a - ok",
  CEL.assertDeepStrictEqual([1, 2], [1, 2])
);
try {
  CEL.assertDeepStrictEqual(
    [1, 2], [1, 3], "assertDeepStrictEqual(); 06b - error"
  );
} catch (e) { CUT.isTrue(e, true); }
try {
  CEL.assertDeepStrictEqual(
    [1, 2], [1, "2"], "assertDeepStrictEqual(); 06c - error"
  );
} catch (e) { CUT.isTrue(e, true); }
try {
  CEL.assertDeepStrictEqual(
    [1, 2], [1, 2, 3], "assertDeepStrictEqual(); 06d - error"
  );
} catch (e) { CUT.isTrue(e, true); }
/* objects / Set */
token1 = new Set([1, 2]);
token2 = new Set([1, 2]);
token3 = new Set([1, 3]);
token4 = new Set([1, "2"]);
token5 = new Set([1, 2, 3]);
CUT.isTrue("assertDeepStrictEqual(); 07a - ok",
  CEL.assertDeepStrictEqual(token1, token2)
);
try {
  CEL.assertDeepStrictEqual(
    token1, token3, "assertDeepStrictEqual(); 07b - error"
  );
} catch (e) { CUT.isTrue(e, true); }
try {
  CEL.assertDeepStrictEqual(
    token1, token4, "assertDeepStrictEqual(); 07c - error"
  );
} catch (e) { CUT.isTrue(e, true); }
try {
  CEL.assertDeepStrictEqual(
    token1, token5, "assertDeepStrictEqual(); 07d - error"
  );
} catch (e) { CUT.isTrue(e, true); }
/* objects / TypedArrays */
token1 = Int16Array.from([34, 45]);
token2 = Int16Array.from([34, 45]);
token3 = Int16Array.from([34, 46]);
token5 = Int16Array.from([34, 45, 56]);
CUT.isTrue("assertDeepStrictEqual(); 08a - ok",
  CEL.assertDeepStrictEqual(token1, token2)
);
try {
  CEL.assertDeepStrictEqual(
    token1, token3, "assertDeepStrictEqual(); 08b - error"
  );
} catch (e) { CUT.isTrue(e, true); }
try {
  CEL.assertDeepStrictEqual(
    token1, token5, "assertDeepStrictEqual(); 08c - error"
  );
} catch (e) { CUT.isTrue(e, true); }
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
try {
  CEL.assertDeepStrictEqual(
    token1, token3, "assertDeepStrictEqual(); 09c - error"
  );
} catch (e) { CUT.isTrue(e, true); }
try {
  CEL.assertDeepStrictEqual(
    token1, token4, "assertDeepStrictEqual(); 09d - error"
  );
} catch (e) { CUT.isTrue(e, true); }
try {
  CEL.assertDeepStrictEqual(
    token1, token5, "assertDeepStrictEqual(); 09e - error"
  );
} catch (e) { CUT.isTrue(e, true); }
try {
  CEL.assertDeepStrictEqual(
    token6, token7, "assertDeepStrictEqual(); 09f - error"
  );
} catch (e) { CUT.isTrue(e, true); }
try {
  CEL.assertDeepStrictEqual(
    token6, token8, "assertDeepStrictEqual(); 09g - error"
  );
} catch (e) { CUT.isTrue(e, true); }
try {
/* objects / Map */
token1 = new Map([["a", 1], ["b", 2]]);
token2 = new Map([["a", 1], ["b", 2]]);
token3 = new Map([["a", 1], ["b", 3]]);
token4 = new Map([["a", 1], ["b", "2"]]);
token5 = new Map([["a", 1], ["b", 2], ["c", 3]]);
CUT.isTrue("assertDeepStrictEqual(); 10a - ok",
  CEL.assertDeepStrictEqual(token1, token2)
);
try {
  CEL.assertDeepStrictEqual(
    token1, token3, "assertDeepStrictEqual(); 10b - error"
  );
} catch (e) { CUT.isTrue(e, true); }
try {
  CEL.assertDeepStrictEqual(
    token1, token4, "assertDeepStrictEqual(); 10c - error"
  );
} catch (e) { CUT.isTrue(e, true); }
try {
  CEL.assertDeepStrictEqual(
    token1, token5, "assertDeepStrictEqual(); 10d - error"
  );
} catch (e) { CUT.isTrue(e, true); }
/* objects / weakset + weakmap*/
token1 = new WeakSet();
token2 = new WeakSet();
CUT.isTrue("assertDeepStrictEqual(); 11a - ok",
  CEL.assertDeepStrictEqual(token1, token1)
);
try {
  CEL.assertDeepStrictEqual(
    token1, token2, "assertDeepStrictEqual(); 11b - error"
  );
} catch (e) { CUT.isTrue(e, true); }
token1 = new WeakMap();
token2 = new WeakMap();
CUT.isTrue("assertDeepStrictEqual(); 11c - ok",
  CEL.assertDeepStrictEqual(token1, token1)
);
try {
  CEL.assertDeepStrictEqual(
    token1, token2, "assertDeepStrictEqual(); 11d - error"
  );
} catch (e) { CUT.isTrue(e, true); }
/* objects / Function */
token1 = Array.from;
token2 = Array.of;
CUT.isTrue("assertDeepStrictEqual(); 12a - ok",
  CEL.assertDeepStrictEqual(token1, token1)
);
try {
  CEL.assertDeepStrictEqual(
    token1, token2, "assertDeepStrictEqual(); 12b - error"
  );
} catch (e) { CUT.isTrue(e, true); }
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
try {
  CEL.assertDeepStrictEqual(
    token1, token2, "assertDeepStrictEqual(); 13b - error"
  );
} catch (e) { CUT.isTrue(e, true); }
try {
  CEL.assertDeepStrictEqual(
    token1, token3, "assertDeepStrictEqual(); 13c - error"
  );
} catch (e) { CUT.isTrue(e, true); }
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
try {
  CEL.assertDeepStrictEqual(
    token1, token2, "assertDeepStrictEqual(); 14c - error"
  );
} catch (e) { CUT.isTrue(e, true); }
try {
  CEL.assertDeepStrictEqual(
    token1, token3, "assertDeepStrictEqual(); 14d - error"
  );
} catch (e) { CUT.isTrue(e, true); }
/* types: null, undefined */
CUT.isTrue("assertDeepStrictEqual(); 15a - ok",
  CEL.assertDeepStrictEqual(null, null)
);
CUT.isTrue("assertDeepStrictEqual(); 15b - ok",
  CEL.assertDeepStrictEqual(undefined, undefined)
);
try {
  CEL.assertDeepStrictEqual(
    null, undefined, "assertDeepStrictEqual(); 15c - error"
  );
} catch (e) { CUT.isTrue(e, true); }
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
try {
  CEL.assertDeepStrictEqual(
    token2, token4, "assertDeepStrictEqual(); 16c - error"
  );
} catch (e) { CUT.isTrue(e, true); }
try {
  CEL.assertDeepStrictEqual(
    token2, token5, "assertDeepStrictEqual(); 16d - error"
  );
} catch (e) { CUT.isTrue(e, true); }
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
try {
  CEL.assertDeepStrictEqual(
    token2, token4, "assertDeepStrictEqual(); 17c - error"
  );
} catch (e) { CUT.isTrue(e, true); }
try {
  CEL.assertDeepStrictEqual(
    token2, token5, "assertDeepStrictEqual(); 17d - error"
  );
} catch (e) { CUT.isTrue(e, true); }
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
try {
  CEL.assertDeepStrictEqual(
    token2, token4, "assertDeepStrictEqual(); 18c - error"
  );
} catch (e) { CUT.isTrue(e, true); }
try {
  CEL.assertDeepStrictEqual(
    token2, token5, "assertDeepStrictEqual(); 18d - error"
  );
} catch (e) { CUT.isTrue(e, true); }
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
try {
  CEL.assertDeepStrictEqual(
    token2, token4, "assertDeepStrictEqual(); 19c - error"
  );
} catch (e) { CUT.isTrue(e, true); }
try {
  CEL.assertDeepStrictEqual(
    token2, token5, "assertDeepStrictEqual(); 19d - error"
  );
} catch (e) { CUT.isTrue(e, true); }
/* objects / not same prototype - array */
try {
  CEL.assertDeepStrictEqual(
    {}, [], "assertDeepStrictEqual(); 20a - error"
  );
} catch (e) { CUT.isTrue(e, true); }
try {
  CEL.assertDeepStrictEqual(
    new Map(), [], "assertDeepStrictEqual(); 20b - error"
  );
} catch (e) { CUT.isTrue(e, true); }
try {
  CEL.assertDeepStrictEqual(
    new Set(), [], "assertDeepStrictEqual(); 20c - error"
  );
} catch (e) { CUT.isTrue(e, true); }
try {
  CEL.assertDeepStrictEqual(
    new WeakMap(), [], "assertDeepStrictEqual(); 20d - error"
  );
} catch (e) { CUT.isTrue(e, true); }
try {
  CEL.assertDeepStrictEqual(
    new WeakSet(), [], "assertDeepStrictEqual(); 20e - error"
  );
} catch (e) { CUT.isTrue(e, true); }
try {
  CEL.assertDeepStrictEqual(
    new Error(), [], "assertDeepStrictEqual(); 20f - error"
  );
} catch (e) { CUT.isTrue(e, true); }
try {
  CEL.assertDeepStrictEqual(
    42, [42], "assertDeepStrictEqual(); 20g - error"
  );
} catch (e) { CUT.isTrue(e, true); }
try {
  CEL.assertDeepStrictEqual(
    Object(42), [42], "assertDeepStrictEqual(); 20h - error"
  );
} catch (e) { CUT.isTrue(e, true); }
try {
  CEL.assertDeepStrictEqual(
    true, [true], "assertDeepStrictEqual(); 20i - error"
  );
} catch (e) { CUT.isTrue(e, true); }
try {
  CEL.assertDeepStrictEqual(Object(
    true), [true], "assertDeepStrictEqual(); 20j - error"
  );
} catch (e) { CUT.isTrue(e, true); }
try {
  CEL.assertDeepStrictEqual(
    "lorem", ["lorem"], "assertDeepStrictEqual(); 20k - error"
  );
} catch (e) { CUT.isTrue(e, true); }
try {
  CEL.assertDeepStrictEqual(
    Object("lorem"), ["lorem"], "assertDeepStrictEqual(); 20l - error"
  );
} catch (e) { CUT.isTrue(e, true); }
try {
  CEL.assertDeepStrictEqual(42n, [42n], "assertDeepStrictEqual(); 20m - error");
} catch (e) { CUT.isTrue(e, true); }
try {
  CEL.assertDeepStrictEqual(
    Object(42n), [42n], "assertDeepStrictEqual(); 20n - error"
  );
} catch (e) { CUT.isTrue(e, true); }
/* objects / not same prototype - map */
try {
  CEL.assertDeepStrictEqual(
    new Map(), new Set(), "assertDeepStrictEqual(); 21a - error"
  );
} catch (e) { CUT.isTrue(e, true); }
try {
  CEL.assertDeepStrictEqual(
    new Map(), new WeakSet(), "assertDeepStrictEqual(); 21b - error"
  );
} catch (e) { CUT.isTrue(e, true); }
try {
  CEL.assertDeepStrictEqual(
    new Map(), new WeakMap(), "assertDeepStrictEqual(); 21c - error"
  );
} catch (e) { CUT.isTrue(e, true); }
try {
  CEL.assertDeepStrictEqual(
    new Error(), new Map(), "assertDeepStrictEqual(); 21d - error"
  );
} catch (e) { CUT.isTrue(e, true); }
try {
  CEL.assertDeepStrictEqual(
    42, new Map(), "assertDeepStrictEqual(); 21e - error"
  );
} catch (e) { CUT.isTrue(e, true); }
try {
  CEL.assertDeepStrictEqual(
    Object(42), new Map(), "assertDeepStrictEqual(); 21f - error"
  );
} catch (e) { CUT.isTrue(e, true); }
try {
  CEL.assertDeepStrictEqual(
    true, new Map(), "assertDeepStrictEqual(); 21g - error"
  );
} catch (e) { CUT.isTrue(e, true); }
try {
  CEL.assertDeepStrictEqual(
    Object(true), new Map(), "assertDeepStrictEqual(); 21h - error"
  );
} catch (e) { CUT.isTrue(e, true); }
try {
  CEL.assertDeepStrictEqual(
    "lorem", new Map(), "assertDeepStrictEqual(); 21i - error"
  );
} catch (e) { CUT.isTrue(e, true); }
try {
  CEL.assertDeepStrictEqual(
    Object("lorem"), new Map(), "assertDeepStrictEqual(); 21j - error"
  );
} catch (e) { CUT.isTrue(e, true); }
try {
  CEL.assertDeepStrictEqual(
    42n, new Map(), "assertDeepStrictEqual(); 21k - error"
  );
} catch (e) { CUT.isTrue(e, true); }
try {
  CEL.assertDeepStrictEqual(
    Object(42n), new Map(), "assertDeepStrictEqual(); 21l - error"
  );
} catch (e) { CUT.isTrue(e, true); }
/* objects / not same prototype - set */
try {
  CEL.assertDeepStrictEqual(
    new WeakMap(), new Set(), "assertDeepStrictEqual(); 22a - error"
  );
} catch (e) { CUT.isTrue(e, true); }
try {
  CEL.assertDeepStrictEqual(
    new Error(), new Set(), "assertDeepStrictEqual(); 22b - error"
  );
} catch (e) { CUT.isTrue(e, true); }
try {
  CEL.assertDeepStrictEqual(
    42, new Set(), "assertDeepStrictEqual(); 22c - error"
  );
} catch (e) { CUT.isTrue(e, true); }
try {
  CEL.assertDeepStrictEqual(
    Object(42), new Set(), "assertDeepStrictEqual(); 22d - error"
  );
} catch (e) { CUT.isTrue(e, true); }
try {
  CEL.assertDeepStrictEqual(
    true, new Set(), "assertDeepStrictEqual(); 22e - error"
  );
} catch (e) { CUT.isTrue(e, true); }
try {
  CEL.assertDeepStrictEqual(
    Object(true), new Set(), "assertDeepStrictEqual(); 22f - error"
  );
} catch (e) { CUT.isTrue(e, true); }
try {
  CEL.assertDeepStrictEqual(
    "lorem", new Set(), "assertDeepStrictEqual(); 22g - error"
  );
} catch (e) { CUT.isTrue(e, true); }
try {
  CEL.assertDeepStrictEqual(
    Object("lorem"), new Set(), "assertDeepStrictEqual(); 22h - error"
  );
} catch (e) { CUT.isTrue(e, true); }
try {
  CEL.assertDeepStrictEqual(
    42n, new Set(), "assertDeepStrictEqual(); 22i - error"
  );
} catch (e) { CUT.isTrue(e, true); }
try {
  CEL.assertDeepStrictEqual(
    Object(42n), new Set(), "assertDeepStrictEqual(); 22j - error"
  );
} catch (e) { CUT.isTrue(e, true); }
/* objects / not same prototype - weakset */
try {
  CEL.assertDeepStrictEqual(
    new WeakMap(), new WeakSet(), "assertDeepStrictEqual(); 23a - error"
  );
} catch (e) { CUT.isTrue(e, true); }
try {
  CEL.assertDeepStrictEqual(
    new Error(), new WeakSet(), "assertDeepStrictEqual(); 23b - error"
  );
} catch (e) { CUT.isTrue(e, true); }
try {
  CEL.assertDeepStrictEqual(
    42, new WeakSet(), "assertDeepStrictEqual(); 23c - error"
  );
} catch (e) { CUT.isTrue(e, true); }
try {
  CEL.assertDeepStrictEqual(
    Object(42), new WeakSet(), "assertDeepStrictEqual(); 23d - error"
  );
} catch (e) { CUT.isTrue(e, true); }
try {
  CEL.assertDeepStrictEqual(
    true, new WeakSet(), "assertDeepStrictEqual(); 23e - error"
  );
} catch (e) { CUT.isTrue(e, true); }
try {
  CEL.assertDeepStrictEqual(
    Object(true), new WeakSet(), "assertDeepStrictEqual(); 23f - error"
  );
} catch (e) { CUT.isTrue(e, true); }
try {
  CEL.assertDeepStrictEqual(
    "lorem", new WeakSet(), "assertDeepStrictEqual(); 23g - error"
  );
} catch (e) { CUT.isTrue(e, true); }
try {
  CEL.assertDeepStrictEqual(
    Object("lorem"), new WeakSet(), "assertDeepStrictEqual(); 23h - error"
  );
} catch (e) { CUT.isTrue(e, true); }
try {
  CEL.assertDeepStrictEqual(
    42n, new WeakSet(), "assertDeepStrictEqual(); 23i - error"
  );
} catch (e) { CUT.isTrue(e, true); }
try {
  CEL.assertDeepStrictEqual(
    Object(42n), new WeakSet(), "assertDeepStrictEqual(); 23j - error"
  );
} catch (e) { CUT.isTrue(e, true); }
/* objects / not same prototype - weakmap */
try {
  CEL.assertDeepStrictEqual(
    new Error(), new WeakMap(), "assertDeepStrictEqual(); 24a - error"
  );
} catch (e) { CUT.isTrue(e, true); }
try {
  CEL.assertDeepStrictEqual(
    42, new WeakMap(), "assertDeepStrictEqual(); 24b - error"
  );
} catch (e) { CUT.isTrue(e, true); }
try {
  CEL.assertDeepStrictEqual(
    Object(42), new WeakMap(), "assertDeepStrictEqual(); 24c - error"
  );
} catch (e) { CUT.isTrue(e, true); }
try {
  CEL.assertDeepStrictEqual(
    true, new WeakMap(), "assertDeepStrictEqual(); 24d - error"
  );
} catch (e) { CUT.isTrue(e, true); }
try {
  CEL.assertDeepStrictEqual(
    Object(true), new WeakMap(), "assertDeepStrictEqual(); 24e - error"
  );
} catch (e) { CUT.isTrue(e, true); }
try {
  CEL.assertDeepStrictEqual(
    "lorem", new WeakMap(), "assertDeepStrictEqual(); 24f - error"
  );
} catch (e) { CUT.isTrue(e, true); }
try {
  CEL.assertDeepStrictEqual(
    Object("lorem"), new WeakMap(), "assertDeepStrictEqual(); 24g - error"
  );
} catch (e) { CUT.isTrue(e, true); }
try {
  CEL.assertDeepStrictEqual(
    42n, new WeakMap(), "assertDeepStrictEqual(); 24h - error"
  );
} catch (e) { CUT.isTrue(e, true); }
try {
  CEL.assertDeepStrictEqual(
    Object(42n), new WeakMap(), "assertDeepStrictEqual(); 24i - error"
  );
} catch (e) { CUT.isTrue(e, true); }
/* objects / not same prototype - error */
try {
  CEL.assertDeepStrictEqual(
    42, new Error(42), "assertDeepStrictEqual(); 25a - error"
  );
} catch (e) { CUT.isTrue(e, true); }
try {
  CEL.assertDeepStrictEqual(
    Object(42), new Error(42), "assertDeepStrictEqual(); 25b - error"
  );
} catch (e) { CUT.isTrue(e, true); }
try {
  CEL.assertDeepStrictEqual(
    true, new Error(true), "assertDeepStrictEqual(); 25c - error"
  );
} catch (e) { CUT.isTrue(e, true); }
try {
  CEL.assertDeepStrictEqual(
    Object(true), new Error(true), "assertDeepStrictEqual(); 25d - error"
  );
} catch (e) { CUT.isTrue(e, true); }
try {
  CEL.assertDeepStrictEqual(
    "lorem", new Error("lorem"), "assertDeepStrictEqual(); 25e - error"
  );
} catch (e) { CUT.isTrue(e, true); }
try {
  CEL.assertDeepStrictEqual(
    Object("lorem"), new Error("lorem"), "assertDeepStrictEqual(); 25f - error"
  );
} catch (e) { CUT.isTrue(e, true); }
try {
  CEL.assertDeepStrictEqual(
    42n, new Error(42n), "assertDeepStrictEqual(); 25g - error"
  );
} catch (e) { CUT.isTrue(e, true); }
try {
  CEL.assertDeepStrictEqual(
    Object(42n), new Error(42n), "assertDeepStrictEqual(); 25h - error"
  );
} catch (e) { CUT.isTrue(e, true); }
/* objects / not same prototype - number */
  CEL.assertDeepStrictEqual(true, 1, "assertDeepStrictEqual(); 26a - error");
} catch (e) { CUT.isTrue(e, true); }
try {
  CEL.assertDeepStrictEqual(
    Object(true), 1, "assertDeepStrictEqual(); 26b - error"
  );
} catch (e) { CUT.isTrue(e, true); }
try {
  CEL.assertDeepStrictEqual("1", 1, "assertDeepStrictEqual(); 26c - error");
} catch (e) { CUT.isTrue(e, true); }
try {
  CEL.assertDeepStrictEqual(
    Object("1"), 1, "assertDeepStrictEqual(); 26d - error"
  );
} catch (e) { CUT.isTrue(e, true); }
try {
  CEL.assertDeepStrictEqual(
    42n, 42, "assertDeepStrictEqual(); 26e - error"
  );
} catch (e) { CUT.isTrue(e, true); }
try {
  CEL.assertDeepStrictEqual(
    Object(42n), 42, "assertDeepStrictEqual(); 26f - error"
  );
} catch (e) { CUT.isTrue(e, true); }
/* objects / not same prototype - string */
try {
  CEL.assertDeepStrictEqual(
    true, "true", "assertDeepStrictEqual(); 27a - error"
  );
} catch (e) { CUT.isTrue(e, true); }
try {
  CEL.assertDeepStrictEqual(
    42n, "42n", "assertDeepStrictEqual(); 27b - error"
  );
} catch (e) { CUT.isTrue(e, true); }
try {
  CEL.assertDeepStrictEqual(
    Object(42), "42", "assertDeepStrictEqual(); 27c - error"
  );
} catch (e) { CUT.isTrue(e, true); }
try {
  CEL.assertDeepStrictEqual(
    Object(42n), "42n", "assertDeepStrictEqual(); 27d - error"
  );
} catch (e) { CUT.isTrue(e, true); }
try {
  CEL.assertDeepStrictEqual(
    Object(true), "true", "assertDeepStrictEqual(); 27e - error"
  );
} catch (e) { CUT.isTrue(e, true); }
try {
/* objects / not same prototype - boolean */
  CEL.assertDeepStrictEqual(
    1n, true, "assertDeepStrictEqual(); 28a - error"
  );
} catch (e) { CUT.isTrue(e, true); }
try {
  CEL.assertDeepStrictEqual(
    Object(1n), true, "assertDeepStrictEqual(); 28b - error"
  );
} catch (e) { CUT.isTrue(e, true); }
try {
  CEL.assertDeepStrictEqual(
    Object(1), true, "assertDeepStrictEqual(); 28c - error"
  );
} catch (e) { CUT.isTrue(e, true); }
try {
  CEL.assertDeepStrictEqual(
    "true", true, "assertDeepStrictEqual(); 28d - error"
  );
} catch (e) { CUT.isTrue(e, true); }
/* objects / not same prototype - bigint */
try {
  CEL.assertDeepStrictEqual(
    Object(42), 42n, "assertDeepStrictEqual(); 29a - error"
  );
} catch (e) { CUT.isTrue(e, true); }
try {
  CEL.assertDeepStrictEqual(
    Object("42"), 42n, "assertDeepStrictEqual(); 29b - error"
  );
} catch (e) { CUT.isTrue(e, true); }
try {
  CEL.assertDeepStrictEqual(
    Object(true), 1n, "assertDeepStrictEqual(); 29c - error"
  );
} catch (e) { CUT.isTrue(e, true); }
/* objects / not same prototype - Object wrappers */
try {
  CEL.assertDeepStrictEqual(
    Object(42), Object("42"), "assertDeepStrictEqual(); 30a - error"
  );
} catch (e) { CUT.isTrue(e, true); }
try {
  CEL.assertDeepStrictEqual(
    Object(1), Object(true), "assertDeepStrictEqual(); 30b - error"
  );
} catch (e) { CUT.isTrue(e, true); }
try {
  CEL.assertDeepStrictEqual(
    Object(1), Object(1n), "assertDeepStrictEqual(); 30c - error"
  );
} catch (e) { CUT.isTrue(e, true); }
try {
  CEL.assertDeepStrictEqual(
    Object("true"), Object(true), "assertDeepStrictEqual(); 30d - error"
  );
} catch (e) { CUT.isTrue(e, true); }
try {
  CEL.assertDeepStrictEqual(
    Object(42n), Object("42n"), "assertDeepStrictEqual(); 30e - error"
  );
} catch (e) { CUT.isTrue(e, true); }
try {
  CEL.assertDeepStrictEqual(
    Object(1n), Object(true), "assertDeepStrictEqual(); 30f - error"
  );
} catch (e) { CUT.isTrue(e, true); }
/* assertDeepStrictEqual end */


/** Collections API **/
CUT.addElement("hr");
CUT.addElement("h3", "Collections API");


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


/* arrayCreate(); */
token1 = CEL.arrayCreate(4);
CUT.isTrue("arrayCreate(); 01", Array.isArray(token1) && token1.length === 4);
token1 = CEL.arrayCreate(0);
CUT.isTrue("arrayCreate(); 02", Array.isArray(token1) && token1.length === 0);
token1 = CEL.arrayCreate(-0);
CUT.isTrue("arrayCreate(); 03", Array.isArray(token1) && token1.length === 0);
token1 = CEL.arrayCreate("5");
CUT.isTrue("arrayCreate(); 04", Array.isArray(token1) && token1.length === 5);
token1 = CEL.arrayCreate(true);
CUT.isTrue("arrayCreate(); 05", Array.isArray(token1) && token1.length === 1);
token1 = CEL.arrayCreate(false);
CUT.isTrue("arrayCreate(); 06", Array.isArray(token1) && token1.length === 0);
token1 = CEL.arrayCreate();
CUT.isTrue("arrayCreate(); 07", Array.isArray(token1) && token1.length === 0);
try { token1 = CEL.arrayCreate(Math.pow(2, 32)); } catch (e) {
  CUT.isTrue("arrayCreate(); 08", true);
}


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
  CEL.isSameArray(CEL.initial(["a", "b", "c", "d"]), ["a", "b", "c"])
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
token1 = 0;
CEL.forEach(document.querySelectorAll("h3"), function (e) { token1++; });
CUT.isEqual("forEach(); 03", token1, document.querySelectorAll("h3").length);
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
token1 = [...CEL.map(document.querySelectorAll("h3"), (e) => e)];
CUT.isTrue("map(); 03",
  Array.isArray(token1) && token1.every((e) => CEL.isElement(e))
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
CUT.isFalse("shuffle();", CEL.isSameArray(CEL.shuffle(token1), token1));


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


/* entries(); */
CUT.isEqual("entries(); 01",
  JSON.stringify([...CEL.entries(["Picard", "Riker", "Data"])]),
  "[[0,\"Picard\"],[1,\"Riker\"],[2,\"Data\"]]"
);
CUT.isEqual("entries(); 02",
  JSON.stringify([...CEL.entries(["Picard", "Riker", "Data"], 2)]),
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


/* arrayUnion(); */
CUT.isEqual(
  "arrayUnion(); ES5","[1,2,3,4,5,6,7,8]", JSON.stringify(CEL.arrayUnion(
    [1, 2, 3, 4], [3, 4, 5, 6], [5, 6, 7, 8]
  ))
);
CUT.isEqual("arrayUnion(); ES6", "[1,2,3,4,5,6,7,8]",
  JSON.stringify(CEL.arrayUnion(
    new Set([1, 2, 3, 4]), [3, 4, 5, 6].values(),
    new Set([5, 6, 7, 8]).values()
  )
));


/* arrayIntersection(); */
CUT.isEqual(
  "arrayIntersection(); ES5","[3,4]",
  JSON.stringify(CEL.arrayIntersection([1, 2, 3, 4], [3, 4, 5, 6]))
);
CUT.isEqual("arrayIntersection(); ES6", "[3,4]",
  JSON.stringify(CEL.arrayIntersection([1,2,3,4].values(), new Set([3,4,5, 6])))
);


/* arrayDifference(); */
CUT.isEqual("arrayDifference(); ES5", "[1,2]",
  JSON.stringify(CEL.arrayDifference([1, 2, 3, 4], [3, 4, 5, 6]))
);
CUT.isEqual("arrayDifference(); ES6", "[1,2]",
  JSON.stringify(
    CEL.arrayDifference(
      new Map([[1, 2], [2, 3], [3, 4], [4, 5]]).keys(),
      [3, 4, 5, 6].values()
    )
  )
);


/* arraySymmetricDifference(); */
CUT.isEqual("arraySymmetricDifference(); ES5", "[1,2,5,6]",
  JSON.stringify(CEL.arraySymmetricDifference([1, 2, 3, 4], [3, 4, 5, 6]))
);
CUT.isEqual("arraySymmetricDifference(); ES6", "[1,2,5,6]",
  JSON.stringify(
    CEL.arraySymmetricDifference(
      new Set([1, 2, 3, 4]).keys(),
      new Map([[1, 3], [2, 4], [3, 5], [4, 6]]).values()
    )
  )
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


/* arrayremove begin */
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
/* arrayremove end */


/* arrayremoveby begin */
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
/* arrayremoveby end */


/* arrayUnique(); */
CUT.isEqual("arrayUnique(); 01",
  JSON.stringify(CEL.arrayUnique(
    ["A", "r", "r", "a", "y", "y", "a", "n", "d", "d", "M", "M", "a", "p"]
  )),
  JSON.stringify(CEL.arrayUnique("ArrayyanddMMap"))
);
CUT.isEqual("arrayUnique(); 02",
  JSON.stringify(CEL.arrayUnique([1, 2, 2, 3, 4, 4, 5, 6, 6, 7])),
  JSON.stringify(CEL.arrayUnique(new Set([1, 2, 2, 3, 4, 4, 5, 6, 6, 7])))
);
CUT.isEqual("arrayUnique(); 03",
  JSON.stringify(CEL.arrayUnique([1, 2, 2, 3, 4, 4, 5, 6, 6, 7])),
  JSON.stringify(
    CEL.arrayUnique((new Map([
      ["extendObj1", 1], ["extendObj2", 2], ["baz1", 2], ["foo2",3], ["bar2",4],
      ["baz2", 4], ["foo3", 5], ["bar3", 6], ["baz3", 6], ["foo4", 7]
    ])).values())
  )
);


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


/** Cookie API **/
CUT.addElement("hr");
CUT.addElement("h3", "Cookie API");


/* getCookie(); */
/* hasCookie(); */
/* setcookie(); */
/* removeCookie(); */
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

CEL.setCookie("ctest4", "cookieUnitTestStr");
CEL.setCookie("ctest5", "cookieUnitTestStr");
token1 = String(+CEL.hasCookie("ctest4"));
token1 += " " + +CEL.hasCookie("ctest5");
CEL.clearCookies();
token1 += " " + +CEL.hasCookie("ctest4");
token1 += " " + +CEL.hasCookie("ctest5");
CUT.isEqual("clearCookies();", "1 1 0 0", token1);


/** cookie with settings object begin **/
CUT.addElement("hr");
CUT.addElement("h3", "cookie with settings object");


CEL.setCookie({"name": "ctest3", "value":"cookieUnitTestStr","SameSite":"Lax"});
CUT.isTrue("setcookie(); + hasCookie(); true <i>(settings object)</i>",
  CEL.hasCookie("ctest3")
);
CUT.isEqual("getCookie(name) value <i>(settings object)</i>",
  "cookieUnitTestStr", CEL.getCookie("ctest3")
);
CUT.isEqual("getCookie(); <i>(settings object)</i>", "cookieUnitTestStr",
  CEL.getCookie()["ctest3"]
);
CUT.isTrue("removeCookie(); true <i>(settings object)</i>",
  CEL.removeCookie({"name": "ctest3", "SameSite": "Lax"})
);
CUT.isFalse("removeCookie(); false <i>(settings object)</i>",
  CEL.removeCookie({"name": "ctest3", "SameSite": "Lax"})
);
CUT.isFalse("hasCookie(); false <i>(settings object)</i>",
  CEL.hasCookie("ctest3")
);
CUT.isEqual("getCookie(name) null <i>(settings object)</i>", null,
  CEL.getCookie("ctest3")
);
CUT.isEqual("getCookie(); undefined <i>(settings object)</i>", undefined,
  CEL.getCookie()["ctest3"]
);

CEL.setCookie({"name":"ctest4", "value":"cookieUnitTestStr", "SameSite":"Lax"});
CEL.setCookie({"name":"ctest5", "value":"cookieUnitTestStr", "SameSite":"Lax"});
token1 = String(+CEL.hasCookie("ctest4"));
token1 += " " + +CEL.hasCookie("ctest5");
CEL.clearCookies({"SameSite": "Lax"});
token1 += " " + +CEL.hasCookie("ctest4");
token1 += " " + +CEL.hasCookie("ctest5");
CUT.isEqual("clearCookies(); <i>(settings object)</i>", "1 1 0 0", token1);
/** cookie with settings object end **/


/** Polyfills **/
CUT.addElement("hr");
CUT.addElement("h3", "polyfills");


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
try {
  Math.sumPrecise(5);
} catch (e) { CUT.isTrue("Math.sumPrecise(); 28", true); }
try {
  Math.sumPrecise("1848");
} catch (e) { CUT.isTrue("Math.sumPrecise(); 29", true); }
try {
  Math.sumPrecise("1848a");
} catch (e) { CUT.isTrue("Math.sumPrecise(); 30", true); }
try {
  Math.sumPrecise([0.1,0.1,0.1,0.1,0.1,0.1, 0.1, 0.1, 0.1, "0.1"]);
} catch (e) { CUT.isTrue("Math.sumPrecise(); 31", true); }
try {
  Math.sumPrecise([0.1,0.1,0.1,0.1,0.1, 0.1, 0.1, 0.1, 0.1, true]);
} catch (e) { CUT.isTrue("Math.sumPrecise(); 32", true); }
try {
  Math.sumPrecise([0.1,0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, BigInt(5)]);
} catch (e) { CUT.isTrue("Math.sumPrecise(); 33", true); }
try {
  Math.sumPrecise([Infinity,"0.1", 0.2]);
} catch (e) { CUT.isTrue("Math.sumPrecise(); 34", true); }
try {
  Math.sumPrecise([-Infinity, "0.1", 0.2]);
} catch (e) { CUT.isTrue("Math.sumPrecise(); 35", true); }
try {
  Math.sumPrecise([-Infinity, "1", 0.2]);
} catch (e) { CUT.isTrue("Math.sumPrecise(); 36", true); }
/* Math.sumPrecise(); end */


/* Error.isError(); */
document.body.appendChild(document.createElement("iframe"));
token1 = CUT.join([
  /* true */
  +(Error.isError(new window.frames[window.frames.length - 1].Error())),
  +(Error.isError(new Error())),
  +(Error.isError(new TypeError())),
  +(Error.isError(new DOMException())),
  /* false */
  +(Error.isError({ __proto__: Error.prototype })),
  +(Error.isError({})),
  +(Error.isError(null)),
  +(Error.isError(undefined)),
  +(Error.isError(17)),
  +(Error.isError(3.14)),
  +(Error.isError("Error")),
  +(Error.isError(true)),
  +(Error.isError(false))
]);
CEL.qs("iframe").remove();
CUT.isEqual("Error.isError();", "1 1 1 1 0 0 0 0 0 0 0 0 0", token1);
CUT.logCode(token1);
CUT.log(
  "In Safari 18.3-18.x and 26 with the DOMException returns false. (4th value)"
);


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
CUT.isEqual("globalThis;", window, globalThis);


/** non-standard polyfills **/
CUT.addElement("hr");
CUT.addElement("h3", "non-standard polyfills");


/* BigInt.prototype.toJSON(); */
if (!!window.BigInt) {
  CUT.isEqual("BigInt.prototype.toJSON();", '"42"', JSON.stringify(BigInt(42)));
}


/* GeneratorFunction(); */
token1 = new GeneratorFunction("v", "yield v * 3; yield v * 4;");
CUT.isEqual("GeneratorFunction();", "9 12", CUT.join(token1(3)));


/* AsyncFunction(); */
CUT.isEqual("AsyncFunction();", "asyncfunction",
  CEL.classof(new AsyncFunction("a", "b",
    "return await resolveAfter2Seconds(a) + await resolveAfter2Seconds(b);"
  )
));


/** Type API **/
CUT.addElement("hr");
CUT.addElement("h3", "Type API");


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


/* isDeepStrictEqual(); */
/* only structures 1 copied */
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
      CEL.isProxy(new Proxy(token1, token2))
  && !CEL.isProxy([])
);


/* isTruthy(); */
CUT.isTrue("isTruthy();",
      CEL.isTruthy(1)
  &&  CEL.isTruthy(42)
  &&  CEL.isTruthy(3.14)
  &&  CEL.isTruthy([])
  &&  CEL.isTruthy({})
  && !CEL.isTruthy(false)
  && !CEL.isTruthy(0)
  && !CEL.isTruthy(-0)
  &&  (!!window.BigInt ? !CEL.isTruthy(BigInt(0)) : true)
  && !CEL.isTruthy("")
  && !CEL.isTruthy(null)
  && !CEL.isTruthy(undefined)
  && !CEL.isTruthy(NaN)
);


/* isFalsy(); */
CUT.isTrue("isFalsy();",
     !CEL.isFalsy(1)
  && !CEL.isFalsy(42)
  && !CEL.isFalsy(3.14)
  && !CEL.isFalsy([])
  && !CEL.isFalsy({})
  &&  CEL.isFalsy(false)
  &&  CEL.isFalsy(0)
  &&  CEL.isFalsy(-0)
  &&  (!!window.BigInt ? CEL.isFalsy(BigInt(0)) : true)
  &&  CEL.isFalsy("")
  &&  CEL.isFalsy(null)
  &&  CEL.isFalsy(undefined)
  &&  CEL.isFalsy(NaN)
);


/* isAsyncGeneratorFn(); */
CUT.isTrue("isAsyncGeneratorFn();",
  CEL.isAsyncGeneratorFn(async function*(){})
    && !CEL.isAsyncGeneratorFn(function*(){})
    && !CEL.isAsyncGeneratorFn(Array)
    && !CEL.isAsyncGeneratorFn(Array.from)
    && !CEL.isAsyncGeneratorFn(0)
);


/* isConstructorFn(); */
CUT.isTrue("isConstructorFn();",
  CEL.isConstructorFn(Array)
    && !CEL.isConstructorFn(Array.from)
    && !CEL.isConstructorFn(0)
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


/* isEmptyMap(); */
CUT.isTrue("isEmptyMap();",
  CEL.isEmptyMap(new Map())
    && !CEL.isEmptyMap(new Map([[4, 5], [6, 7]]))
    && !CEL.isEmptyMap([])
);


/* isEmptySet(); */
CUT.isTrue("isEmptySet();",
  CEL.isEmptySet(new Set())
    && !CEL.isEmptySet(new Set([4, 5, 6]))
    && !CEL.isEmptySet([])
);


/* isEmptyIterator(); */
CUT.isTrue("isEmptyIterator();",
  CEL.isEmptyIterator([]) && !CEL.isEmptyIterator([4, 5, 6])
);


/* isDataView(); */
CUT.isTrue("isDataView();",
  CEL.isDataView(new DataView(new ArrayBuffer(2)), "dataview")
    && !CEL.isDataView({}, "dataview")
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


/* isString(); */
CUT.isTrue("isString();", CEL.isString("str") && !CEL.isString(533));


/* isChar(); */
CUT.isTrue("isChar();",
      CEL.isChar("s")
  &&  CEL.isChar("\uD834\uDF06")
  && !CEL.isChar("str")
  && !CEL.isChar(533)
  && !CEL.isChar("s \uD834\uDF06 tr")
);


/* isNumber(); */
CUT.isTrue("isNumber();",
  CEL.isNumber(98) && CEL.isNumber(3.14) && !CEL.isNumber("str")
);


/* isFloat(); */
CUT.isTrue("isFloat();",
  CEL.isFloat(3.14) && !CEL.isFloat(98) && !CEL.isFloat("str")
);


/* isBoolean(); */
CUT.isTrue("isBoolean();", CEL.isBoolean(true) && !CEL.isBoolean(98));


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


/* isEmptyObject(); */
CUT.isTrue("isEmptyObject();",
      CEL.isEmptyObject({})
  && !CEL.isEmptyObject({"a": 1})
  && !CEL.isEmptyObject(98)
  && !CEL.isEmptyObject(null)
  && !CEL.isEmptyObject(undefined)
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


/* isEmptyArray(); */
CUT.isTrue("isEmptyArray();",
      CEL.isEmptyArray([])
  && !CEL.isEmptyArray([1, 2])
  && !CEL.isEmptyArray({"a": 1})
);


/* isArraylike(); */
CUT.isTrue("isArraylike();",
      CEL.isArraylike([])
  &&  CEL.isArraylike(document.querySelectorAll("p"))
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


/* isNullOrUndefined(); */
CUT.isTrue("isNullOrUndefined();",
      CEL.isNullOrUndefined(undefined)
  &&  CEL.isNullOrUndefined(null)
  && !CEL.isNullOrUndefined({"a": 1})
);


/* isNil(); */
CUT.isTrue("isNil();",
  CEL.isNil(undefined) &&  CEL.isNil(null) && CEL.isNil(NaN) && !CEL.isNil(42)
);


/* isPrimitive(); */
CUT.isTrue("isPrimitive();",
      CEL.isPrimitive(98)
  &&  CEL.isPrimitive("str")
  && !CEL.isPrimitive({"a": 1})
  && !CEL.isPrimitive(function () {})
);


/* isDate(); */
CUT.isTrue("isDate();", CEL.isDate(new Date()) && !CEL.isDate({"a": 1}));


/* isRegexp(); */
CUT.isTrue("isRegexp();",
  CEL.isRegexp(/^\[object (.+)\]$/g) && !CEL.isRegexp("42")
);


/* isElement(); */
CUT.isTrue("isElement();",
      CEL.isElement(document.body)
  &&  CEL.isElement(CEL.qs("div"))
  && !CEL.isElement(document.createTextNode("sample text"))
  && !CEL.isElement(document.createComment("sample comment"))
  && !CEL.isElement([])
);


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


/* isArrayBuffer(); */
CUT.isTrue("isArrayBuffer();",
      CEL.isArrayBuffer(new ArrayBuffer(8))
  && !CEL.isArrayBuffer([4, 5, 6])
  && !CEL.isArrayBuffer(new Int8Array(5))
);


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
  &&  (window.BigInt64Array ? CEL.isTypedArray(new BigInt64Array(5)) : true)
  &&  CEL.isTypedArray(new BigUint64Array(5))
  && !CEL.isTypedArray([4, 5, 6])
  && !CEL.isTypedArray(new ArrayBuffer(8))
);


/* isPromise(); */
CUT.isTrue("isPromise();", CEL.isPromise(CEL.delay(100)) && !CEL.isPromise({}));


/* isSymbol(); */
CUT.isTrue("isSymbol();", CEL.isSymbol(Symbol("str")) && !CEL.isSymbol(42));


/* isMap(); */
CUT.isTrue("isMap();", CEL.isMap(new Map()) && !CEL.isMap(function () {}));


/* isSet(); */
CUT.isTrue("isSet();", CEL.isSet(new Set()) && !CEL.isSet(function () {}));


/* isWeakMap(); */
CUT.isTrue("isWeakMap();", CEL.isWeakMap(new WeakMap()) && !CEL.isWeakMap([]));


/* isWeakSet(); */
CUT.isTrue("isWeakSet();", CEL.isWeakSet(new WeakSet()) && !CEL.isWeakSet([]));


/* isIterator(); */
CUT.isTrue("isIterator();",
      CEL.isIterator([4, 5, 6].values())
  &&  CEL.isIterator(new Set([4, 5, 7]).values())
  &&  CEL.isIterator(new Map([[4, 5], [5, 6]]).values())
  &&  CEL.isIterator(document.querySelectorAll("h3").values())
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


/* isBigInt(); */
if (window.BigInt) {
  CUT.isTrue("isBigInt();",
        CEL.isBigInt(9007199254740991n + 5n)
    && !CEL.isBigInt(9007199254740990)
    && !CEL.isBigInt(3.14)
    && !CEL.isBigInt("Arthur Dent")
  );
}


/** isSame<type>(); functions **/
CUT.addElement("hr");
CUT.addElement("h3", "isSame<type>(); functions");


/* isSameArray(); */
CUT.isTrue("isSameArray();",
      CEL.isSameArray([], [])
  &&  CEL.isSameArray([5, 4, 5], [5, 4, 5])
  && !CEL.isSameArray([5, 4, 5], [4, 5, 6])
  && !CEL.isSameArray([5, 4, 6], [4, 5, 5])
  && !CEL.isSameArray([5, 4, 5], [4, 4, 5])
  && !CEL.isSameArray([5, 5], [5, 5, 4])
  && !CEL.isSameArray([5, 5, 4], [5, 5])
  && !CEL.isSameArray([5 ,5], new Map([[5, 5], [5, 5]]))
  && !CEL.isSameArray([5, 5], new Set([5, 5]))
  && !CEL.isSameArray([], {})
  && !CEL.isSameArray({}, {})
  && !CEL.isSameArray("4", "4")
  && !CEL.isSameArray(4, 4)
  && !CEL.isSameArray(4, 5)
);


/* isSameObject(); */
CUT.isTrue("isSameObject();",
      CEL.isSameObject({"p1": 4, "p2": 5, "p3": 6}, {"p1": 4, "p2": 5, "p3": 6})
  &&  CEL.isSameObject({}, {})
  && !CEL.isSameObject({"p1": 4, "p2": 5, "p3": 6}, {"p1": 4, "p2": 5, "p3": 7})
  && !CEL.isSameObject({"p1": 4,"p2":5, "p3":6}, {"p1":4, "p2":5,"p3":6,"p4":7})
  && !CEL.isSameObject([4,5], {"0": 4, "1": 5, "length": 2})
);


/* isSameSet(); */
CUT.isTrue("isSameSet();",
      CEL.isSameSet(new Set([4, 6, 8, 2]), new Set([2, 4, 6, 8, 4]))
  && !CEL.isSameSet(new Set([4, 6, 8, 2]), new Set([2, 4, 6, 9]))
  && !CEL.isSameSet(new Set([4, 6, 8, 2]), new Set([2, 4, 6, 8, 9]))
  && !CEL.isSameSet(new Set([4, 6, 8, 2]), [4,6,8,2])
);


/* isSameMap(); */
CUT.isTrue("isSameMap();",
  CEL.isSameMap(
    new Map([["str", 1], [17, "x"]]), new Map([["str", 1], [17, "x"]])
  )
  && !CEL.isSameMap(
    new Map([["str", 1], [true, "x"]]), new Map([["str", 1], [false, "x"]])
  )
  && !CEL.isSameMap(
    new Map([["str", 1], [17, "x"]]),
    new Map([["str", 1], [17, "x"], [false, 42]])
  )
  && !CEL.isSameMap(
    new Map([["str", 1], [17, "x"], [true, 42]]),
    [["str", 1], [17, "x"], [true, 42]]
  )
);


/* isSameIterator(); */
CUT.isTrue("isSameIterator();",
      CEL.isSameIterator([1, 2, 3], [1, 2, 3])
  && !CEL.isSameIterator([1, 2, 3], [1, 2, 3, 4])
  && !CEL.isSameIterator(new Set([1, 2, 3, 4]), [1, 2, 3, 5])
);


/** Abstract API **/
CUT.addElement("hr");
CUT.addElement("h3", "Abstract API");


/* deletePropertyOrThrow(); */
token1 = {"a": 1, "b": 2};
try { CEL.deletePropertyOrThrow(token1, "b"); } catch (e) { console.log(e); }
CUT.isEqual("deletePropertyOrThrow();", "{\"a\":1}", JSON.stringify(token1));


/* isLessThan (); */
CUT.isTrue("isLessThan();",
      CEL.isLessThan(1, 2)
  &&  CEL.isLessThan(1, 2, true)
  &&  CEL.isLessThan(2, 1, false)
  && !CEL.isLessThan(1, 2, false)
  && !CEL.isLessThan(2, 1)
  && !CEL.isLessThan(2, 1, true)
);


/* requireObjectCoercible(); */
token1 = function(){};
CUT.isTrue("requireObjectCoercible(); 01", CEL.requireObjectCoercible(true));
CUT.isEqual("requireObjectCoercible(); 02", 42, CEL.requireObjectCoercible(42));
CUT.isEqual("requireObjectCoercible(); 03", "Arthur Dent",
  CEL.requireObjectCoercible("Arthur Dent")
);
CUT.isEqual("requireObjectCoercible(); 04", "Symbol(42)",
  CEL.requireObjectCoercible(Symbol(42)).toString()
);
CUT.isEqual("requireObjectCoercible(); 05", "{\"a\":1}",
  JSON.stringify(CEL.requireObjectCoercible({"a":1}))
);
CUT.isEqual("requireObjectCoercible(); 06", token1,
  CEL.requireObjectCoercible(token1)
);
try { CEL.requireObjectCoercible(null) } catch (e) {
  CUT.isTrue("requireObjectCoercible(); 07", true);
}
try { CEL.requireObjectCoercible(undefined) } catch (e) {
  CUT.isTrue("requireObjectCoercible(); 08", true);
}


/* getIn(); */
/* getInV(); */
/* setIn(); */
/* hasIn(); */
token1 = {};
CUT.isTrue("getIn(); + getInV(); + setIn(); + hasIn();",
     !CEL.hasIn(token1, "pr1")
  &&  CEL.getIn(token1, "pr1") === undefined
  &&  CEL.getInV(token1, "pr1") === undefined
  &&  CEL.setIn(token1, "pr1", 42) === true
  &&  CEL.hasIn(token1, "pr1")
  &&  CEL.getIn(token1, "pr1") === 42
  &&  CEL.getInV(token1, "pr1") === 42
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


/* isSameValue(); */
token1 = { "a": 1 };
CUT.isEqual("isSameValue();", "1 1 0 1 1 1 0 1 0 0 0 1 1 1 1 1 1 1 0",
  CUT.join([
    +CEL.isSameValue(25, 25),
    +CEL.isSameValue("foo", "foo"),
    +CEL.isSameValue("foo", "bar"),
    +CEL.isSameValue(null, null),
    +CEL.isSameValue(undefined, undefined),
    +CEL.isSameValue(window, window),
    +CEL.isSameValue([], []),
    +CEL.isSameValue(token1, token1),
    +CEL.isSameValue(token1, {"a": 1}),
    +CEL.isSameValue(0, -0),
    +CEL.isSameValue(+0, -0),
    +CEL.isSameValue(-0,-0),
    (!!window.BigInt ? +CEL.isSameValue(BigInt(0), BigInt(-0)) : 1),
    +CEL.isSameValue(NaN, 0/0),
    +CEL.isSameValue(NaN, Number.NaN),
    +CEL.isSameValue(+Infinity, Infinity),
    +CEL.isSameValue(Infinity, Infinity),
    +CEL.isSameValue(-Infinity, -Infinity),
    +CEL.isSameValue(+Infinity, -Infinity)
  ])
);


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


/* toPrimitive(); */
CUT.isTrue("toPrimitive();",
  CEL.toPrimitive(new Object(100)) === 100
    && CEL.toPrimitive(new Object(100)) + "" === "100"
    && CEL.toPrimitive({"a":1, toString: ()=>42}, "number") === 42
    && CEL.toPrimitive([1,2]) === "1,2"
    && CEL.toPrimitive(()=>56) === "()=>56"
);


/* isSameValueZero(); */
token1 = {"a": 1};
CUT.isEqual("isSameValueZero();", "1 1 0 1 1 1 0 1 0 1 1 1 1 1 1 1 1 1 0",
  CUT.join([
    +CEL.isSameValueZero(25, 25),
    +CEL.isSameValueZero("foo", "foo"),
    +CEL.isSameValueZero("foo", "bar"),
    +CEL.isSameValueZero(null, null),
    +CEL.isSameValueZero(undefined, undefined),
    +CEL.isSameValueZero(window, window),
    +CEL.isSameValueZero([], []),
    +CEL.isSameValueZero(token1, token1),
    +CEL.isSameValueZero(token1, {"a": 1}),
    +CEL.isSameValueZero(0, -0),
    +CEL.isSameValueZero(+0, -0),
    +CEL.isSameValueZero(-0, -0),
    (!!window.BigInt ? +CEL.isSameValueZero(BigInt(0), BigInt(-0)) : 1),
    +CEL.isSameValueZero(NaN, 0/0),
    +CEL.isSameValueZero(NaN, Number.NaN),
    +CEL.isSameValueZero(+Infinity, Infinity),
    +CEL.isSameValueZero(Infinity, Infinity),
    +CEL.isSameValueZero(-Infinity, -Infinity),
    +CEL.isSameValueZero(+Infinity, -Infinity)
  ])
);


/* isSameValueNonNumber(); */
token1 = {"a": 1};
CUT.isEqual("isSameValueNonNumber(); 01", "1 0 1 1 1 0 1 0 1",
  CUT.join([
    +CEL.isSameValueNonNumber("foo", "foo"),
    +CEL.isSameValueNonNumber("foo", "bar"),
    +CEL.isSameValueNonNumber(null, null),
    +CEL.isSameValueNonNumber(undefined, undefined),
    +CEL.isSameValueNonNumber(window, window),
    +CEL.isSameValueNonNumber([], []),
    +CEL.isSameValueNonNumber(token1, token1),
    +CEL.isSameValueNonNumber(token1, {"a": 1}),
    (!!window.BigInt ? +CEL.isSameValueNonNumber(BigInt(0), BigInt(-0)) : 1)
  ])
);
try {
  CEL.isSameValueNonNumber(42, 42);
  CUT.isTrue("isSameValueNonNumber(); 02 error", false);
} catch (e) {
  CUT.isTrue("isSameValueNonNumber(); 02 error", true);
}
try {
  CEL.isSameValueNonNumber(42, true);
  CUT.isTrue("isSameValueNonNumber(); 03 error", false);
} catch (e) {
  CUT.isTrue("isSameValueNonNumber(); 03 error", true);
}
try {
  CEL.isSameValueNonNumber(true, 42);
  CUT.isTrue("isSameValueNonNumber(); 04 error", false);
} catch (e) {
  CUT.isTrue("isSameValueNonNumber(); 04 error", true);
}


/* createMethodProperty(); */
token1 = function () {};
token2 = String("getX" in token1.prototype);
token2 += CEL.createMethodProperty(
  token1.prototype, "getX", function () { return this.x; }
);
token2 += ("getX" in token1.prototype);
CUT.isEqual("createMethodProperty();", "false[object Object]true", token2);


/* createMethodPropertyOrThrow(); */
token1 = function () {};
token2 = String("getX" in token1.prototype);
token2 += CEL.createMethodPropertyOrThrow(
  token1.prototype, "getX", function () { return this.x; }
);
token2 += ("getX" in token1.prototype);
CUT.isEqual("createMethodPropertyOrThrow();",token2,"false[object Object]true");


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
  CEL.createPolyfillProperty(token1, "c", 3) &&
  Object.keys(token1).includes("c") && ("c" in token1)
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
try { CEL.toIndex(Infinity); } catch (e) { CUT.isTrue("toIndex(); 02", true); }
try { CEL.toIndex(-Infinity); } catch (e) { CUT.isTrue("toIndex(); 03", true); }
try { CEL.toIndex("Infinity"); } catch (e) {
  CUT.isTrue("toIndex(); 04", true);
}
try { CEL.toIndex("-Infinity"); } catch (e) {
  CUT.isTrue("toIndex(); 05", true);
}
try { CEL.toIndex(-3); } catch (e) { CUT.isTrue("toIndex(); 06", true); }
try { CEL.toIndex(-3.14); } catch (e) { CUT.isTrue("toIndex(); 07", true); }
try { CEL.toIndex("-3"); } catch (e) { CUT.isTrue("toIndex(); 08", true); }
try { CEL.toIndex("-3.14"); } catch (e) { CUT.isTrue("toIndex(); 09", true);}


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


/* createDataPropertyOrThrow(); */
function createDataPropertyFN () {};
token1 = Object.hasOwn(createDataPropertyFN.prototype,"x")
  + " "
  + CEL.createDataPropertyOrThrow(createDataPropertyFN.prototype, "x", 42);
token2 = new createDataPropertyFN();
token1 += " " + (token2.x === 42);
CUT.isEqual("createDataPropertyOrThrow();", token1,
"false [object Object] true");


/* createDataProperty(); */
function createDataPropertyOrThrowFN () {};
token1 = CUT.join([
  Object.hasOwn(createDataPropertyOrThrowFN.prototype,"x"),
  CEL.createDataPropertyOrThrow(createDataPropertyOrThrowFN.prototype, "x", 42)
]);
token2 = new createDataPropertyOrThrowFN();
token1 += " " + (token2.x === 42);
CUT.isEqual("createDataProperty();", token1, "false [object Object] true");


/* toArray(); */
token1 = [4, 5, 6];
CUT.isTrue("toArray();", token1 === CEL.toArray(token1)
  && JSON.stringify(CEL.toArray({"length":3, 0 :7, 1: 8, 2: 9})) === "[7,8,9]"
);


/** Math API **/
CUT.addElement("hr");
CUT.addElement("h3", "Math API");


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
try { CEL.clamp(15, 10, NaN); } catch (e) { CUT.isTrue("clamp(); 01", true); }
try { CEL.clamp(15, Infinity, -Infinity) } catch (e) {
  CUT.isTrue("clamp(); 02", true);
}
try { CEL.clamp(15, 10, 5); } catch (e) { CUT.isTrue("clamp(); 03", true); }
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
try { CEL.minmax(15, 10, NaN); } catch (e) { CUT.isTrue("minmax(); 01", true); }
try { CEL.minmax(15, Infinity, -Infinity) } catch (e) {
  CUT.isTrue("minmax(); 02", true);
}
try { CEL.minmax(15, 10, 5); } catch (e) { CUT.isTrue("minmax(); 03", true); }
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
CUT.addElement("hr");
CUT.addElement("h3", "AJAX, domReady(); and other async functions");


CUT.addElement("p", "Here have to be these results:");
CUT.addElement("ul", "<li>1x domReady(); (core api) is working</li>"
  + "<li>2x importScript(); (core api) - first script loaded</li>"
  + "<li>2x importScript(); (core api) - second script loaded</li>"
  + "<li>1x importScript(); (core api) - with more scripts"
  + "<li>1x importScript(); (core api) - with error</li>"
  + "<li>1x getJson()</li>"
  + "<li>1x getText()</li>"
  + "<li>12x ajax()</li>"
  + "<li>8x Array.fromAsync()</li>"
);


/* domReady(); */
CEL.domReady(function () {
  CUT.isTrue("domReady(); (core api) is working", true);
});


/* importScript(); */
CEL.importScript("unittest-notExist.js");
CEL.importScript("unittest-is1.js", "unittest-is2.js", "unittest-is3.js");
CEL.importScript("unittest-is1.js");
CEL.importScript("unittest-is2.js");
/*
Uncaught URIError: Loading failed for the script with source unittest-notExist.js
The error cannot be caught here, because not happens here.
In the adding of the HTML script tag causes the error.
*/


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


/* AJAX API */
/*
XML Parsing Error: not well-formed
Location: testdata.json
Line Number 1, Column 1:
-> MIME Content-Type: application/json can fix it
*/


token1 = "img/app-app-catalog/app-bricks.png";
token2 = "<p><span class=\"big\">Lorem ipsum dolor sit amet, consectetuer adipiscing elit.</span> Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. <small>In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo.</small></p>";


/* getText(); */
CEL.getText("testdata.txt",
  function(r){ CUT.isEqual("getText();", token2, r); }
);


/* getJson(); */
CEL.getJson("testdata.json",
  function (r) { CUT.isEqual("getJson();", token1, r.testArray[0].image); }
);


/* ajax begin */
CEL.ajax({
  queryType: "ajax", type: "get", url: "testdata.txt", format: "text",
  success: function(r){ CUT.isEqual("ajax(); ajax get text", token2, r); },
  error: function (e) {
    CUT.isTrue("ajax(); ajax 1 get text: " + JSON.stringify(e), false);
  }
});
CEL.ajax({
  queryType: "ajax", type: "get", url: "testdata.json", format: "json",
  success: function (r) {
    CUT.isEqual("ajax(); ajax get json", token1, r.testArray[0].image);
  },
  error: function (e) {
    CUT.isTrue("ajax(); ajax get json: " + JSON.stringify(e), false);
  }
});
CEL.ajax({
  queryType: "ajax", type: "get", url: "testdata.xml", format: "xml",
  success: function (r) {
    var xa = r.getElementsByTagName("picture");
    var xb = xa[0].getElementsByTagName("title")[0].childNodes[0].nodeValue;
    CUT.isEqual("ajax(); ajax get xml", "Vapelyfe", xb);
  },
  error: function (e) {
    CUT.isTrue("ajax(); ajax get xml: " + JSON.stringify(e), false);
  }
});

CEL.ajax({
  queryType: "ajax", type: "post", url: "testdata.txt", format: "text",
  data: "a=foo&b=bar baz",
  success: function (r) { CUT.isEqual("ajax(); ajax post text", token2, r);},
  error: function (e) {
    CUT.isTrue("ajax(); ajax post text: " + JSON.stringify(e), false);
  }
});
CEL.ajax({
  queryType: "ajax", type: "post", url: "testdata.json", format: "json",
  data: "a=foo&b=bar baz",
  success: function (r) {
    CUT.isEqual("ajax(); ajax post json", token1, r.testArray[0].image);
  },
  error: function (e) {
    CUT.isTrue("ajax(); ajax post json: " + JSON.stringify(e), false);
  }
});
CEL.ajax({
  queryType: "ajax", type: "post", url: "testdata.xml", format: "xml",
  data: "a=foo&b=bar baz",
  success: function (r) {
    var xa = r.getElementsByTagName("picture");
    var xb = xa[0].getElementsByTagName("title")[0].childNodes[0].nodeValue;
    CUT.isEqual("ajax(); ajax post xml", "Vapelyfe", xb);
  },
  error: function (e) {
    CUT.isTrue("ajax(); ajax post xml: " + JSON.stringify(e), false);
  }
});

CEL.ajax({
  queryType: "cors", type: "get", url: "testdata.txt", format: "text",
  success: function (r) { CUT.isEqual("ajax(); cors get text", token2, r);},
  error: function (e) {
    CUT.isTrue("ajax(); cors get text: " + JSON.stringify(e), false);
  }
});
CEL.ajax({
  queryType: "cors", type: "get", url: "testdata.json", format: "json",
  success: function (r) {
    CUT.isEqual("ajax(); cors get json", token1, r.testArray[0].image);
  },
  error: function (e) {
    CUT.isTrue("ajax(); cors get json: " + JSON.stringify(e), false);
  }
});
CEL.ajax({
  queryType: "cors", type: "get", url: "testdata.xml", format: "xml",
  success: function (r) {
    var xa = r.getElementsByTagName("picture");
    var xb = xa[0].getElementsByTagName("title")[0].childNodes[0].nodeValue;
    CUT.isEqual("ajax(); cors get xml", "Vapelyfe", xb);
  },
  error: function (e) {
    CUT.isTrue("ajax(); cors get xml: " + JSON.stringify(e), false);
  }
});

CEL.ajax({
  queryType: "cors", type: "post", url: "testdata.txt", format: "text",
  data: "a=foo&b=bar baz",
  success: function (r) {
    CUT.isEqual("ajax(); cors post text", token2, r);
  },
  error: function (e) {
    CUT.isTrue("ajax(); cors post text: " + JSON.stringify(e), false);
  }
});
CEL.ajax({
  queryType: "cors", type: "post", url: "testdata.json", format: "json",
  data: "a=foo&b=bar baz",
  success: function (r) {
    CUT.isEqual("ajax(); cors post json", token1, r.testArray[0].image);
  },
  error: function (e) {
    CUT.isTrue("ajax(); cors post json: " + JSON.stringify(e), false);
  }
});
CEL.ajax({
  queryType: "cors", type: "post", url: "testdata.xml", format: "xml",
  data: "a=foo&b=bar baz",
  success: function (r) {
    var xa = r.getElementsByTagName("picture");
    var xb = xa[0].getElementsByTagName("title")[0].childNodes[0].nodeValue;
    CUT.isEqual("ajax(); cors post xml", "Vapelyfe", xb);
  },
  error: function (e) {
    CUT.isTrue("ajax(); cors post xml: " + JSON.stringify(e), false);
  }
});
/* ajax end */


}());


//CEL.toIndex(Infinity);
// this causes an error


} catch (e) {
  CUT.isTrue("<span class=\"failed\">[CUT global try-catch]</span>"
    + "<pre>" + CUT.getHumanReadableJSON(e, " ") + "</pre>"
    + "<pre>" + CUT.getHumanReadableJSON(e) + "</pre>",
    false
  );
  console.log(CUT.getHumanReadableJSON(e, " "));
  console.log(CUT.getHumanReadableJSON(e));
  /* console.log(JSON.stringify(e, Object.getOwnPropertyNames(e))); */
}
