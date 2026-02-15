```text
        ___  ____  __    ____  ___  ____  ____    __
       / __)( ___)(  )  ( ___)/ __)(_  _)(  _ \  /__\
      ( (__  )__)  )(__  )__) \__ \  )(   )   / /(__)\
       \___)(____)(____)(____)(___/ (__) (_)\_)(__)(__)

```

# Celestra

## Download

__A helper JavaScript library with useful functions and polyfills and zero dependencies.__

Latest version: 6.4.1

Date: 2025-11-24T19:19:26.074Z

__Tested on these environments:__

- Windows Firefox
- Windows Chrome
- Windows Edge
- iOS Safari
- iOS Firefox
- iOS Chrome
- iOS Edge
- Android Firefox
- Android Chrome
- Android Samsung Internet
- Android Edge
- Node.js (latest current, not LTS)
- Deno (latest current, not LTS)

version|page link
-------|--------
Stable repository|__[https://github.com/Serrin/Celestra](https://github.com/Serrin/Celestra)__
Beta repository|__[https://github.com/Serrin/Celestra-beta](https://github.com/Serrin/Celestra-beta)__

Edition|Javascript or documentation
-------|-----------------------------
Browser module|__celestra.browser.js__<BR>__celestra.browser.ts__
Node.js and Deno module|__celestra.node.mjs__<BR>__celestra.node.mts__
Celestra Unit Tester (CUT)|__unittest.html__
Celestra cheatsheet|__celestra-cheatsheet.odt__<BR>__celestra-cheatsheet.pdf__
JavaScript cheatsheet|__js-cheatsheet.odt__<BR>__js-cheatsheet.pdf__
Version history|__CHANGELOG.md__
Removed polyfills (developer)|__celestra-polyfills.dev.js__
Removed polyfills (minified)|__celestra-polyfills.min.js__
RPG dice roller|__testgame.html__

### How to import the browser edition

````html
<script type="module">
// import the defaultExport object
import defaultExport from "./celestra.browser.js";
globalThis.celestra = defaultExport;
globalThis.CEL = defaultExport;
</script>

<script type="module">
// import with default with name
import { default as celestra } from "./celestra.browser.js";
globalThis.celestra = celestra;
globalThis.CEL = celestra;
</script>

<script type="module">
// import all into a new celestra object
import * as celestra from "./celestra.browser.js";
globalThis.celestra = celestra;
globalThis.CEL = celestra;
</script>

<script type="module">
// import some functions
import { first, map } from "./celestra.browser.js";
globalThis.first = first;
globalThis.map = map;
</script>

<script type="module">
// dynamic import
const celestra = await import("./celestra.browser.js");
globalThis.celestra = celestra;
globalThis.CEL = celestra;
</script>
````

### How to import the Node.js edition

````javascript
// import the defaultExport object
import defaultExport from "./celestra.nodejs.mjs";
globalThis.celestra = defaultExport;
globalThis.CEL = defaultExport;

// import with default with name
import { default as celestra } from "./celestra.nodejs.mjs";
globalThis.celestra = celestra;
globalThis.CEL = celestra;

// import all into a new celestra object
import * as celestra from "./celestra.nodejs.mjs";
globalThis.celestra = celestra;
globalThis.CEL = celestra;

// import some functions
import { first, map } from "./celestra.nodejs.mjs";
globalThis.first = first;
globalThis.map = map;

// dynamic import
const celestra = await import("./celestra.node.mjs");
globalThis.celestra = celestra;
globalThis.CEL = celestra;
````

### Removed functions in the Node.js edition

API|Function
----|-----------
__DOM API__|`qsa();`<BR>`qs();`<BR>`domReady();`<BR>`domClear();`<BR>`domCreate();`<BR>`domToElement();`<BR>`domGetCSS();`<BR>`domSetCSS();`<BR>`domFadeIn();`<BR>`domFadeOut();`<BR>`domFadeToggle();`<BR>`domShow();`<BR>`domHide();`<BR>`domToggle();`<BR>`domIsHidden();`<BR>`domScrollToTop();`<BR>`domScrollToBottom();`<BR>`domScrollToElement();`<BR>`domSiblings();`<BR>`domSiblingsPrev();`<BR>`domSiblingsLeft();`<BR>`domSiblingsNext();`<BR>`domSiblingsRight();`<BR>`domGetCSSVar();`<BR>`domSetCSSVar();`<BR>`importScript();`<BR>`importStyle();`<BR>`setFullscreenOn();`<BR>`setFullscreenOn();`<BR>`setFullscreenOff();`<BR>`getFullscreen();`<BR>`form2array(form);`<BR>`form2string(form);`<BR>`getDoNotTrack();`<BR>`getLocation();`<BR>`createFile();`
__Cookie API__|`getCookie();`<BR>`hasCookie();`<BR>`setCookie();`<BR>`removeCookie();`<BR>`clearCookies();`

### Celestra v3.0.0 (Hera) changes

- Only modern browsers (ES6+) are supported. The Internet Explorer 11 and W10M Edge have been removed from the supported browsers.

- If you would like to use Celestra with older browsers, then you can download the latest v2.x version here: [https://github.com/Serrin/Celestra/releases](https://github.com/Serrin/Celestra/releases)

- The library sources have been merged and all of the ES6E functions are available in the __celestra.dev.js__ and __celestra.min.js__.

- Many functions have been deprecated or removed.

### Celestra v3.6.0 (Galactica) changes

- CommonJS and AMD module compatibility have been removed.

- In the ESM (ECMAScript 6 module) edition only the whole celestra object is exported as default export and as standalone object.

- Many functions have been deprecated or removed.

### Celestra v5.0.0 (Defiant) changes

- The underscore `_` short object name has been changed to `CEL` to avoid the compatibility issues.

### Celestra v5.5.0 changes

- The Math functions are available in the main code files (dev, min, esm) instead of the Math plugins.

### Celestra v5.6.0 (Razorback) changes

- 21 polyfills have been removed.

### Celestra v5.7.0 (Nostromo) changes

- The module edition (__celestra.esm.js__) import has been changed.
- Added __Assert API v3__ and the old assert functions have been removed.
- The `getText();` and `getJson();` functions have been modified to standalone function.

### Celestra v5.8.0 (Uhura) changes

- 50 functions have been removed.

### Celestra v5.9.0 (Final five) changes

- 12 functions and a polyfill have been removed.

### Celestra v6.0.0 (David) changes

- The Node.js and Deno support has been added.

### Celestra v6.1.0 (Sulaco) changes

- Please read in the documentation about the new files and import methods for the browser edition!
- The __celestra.dev.js__ has been replaced with the __celestra.browser.ts__.
- The __celestra.min.js__ has been replaced with the __celestra.browser.js__.
- The __celestra.node.mjs__ has been remained and added the __celestra.node.mts__.
- The `isNil();` function has been renamed to `isNullish();`.
- The `assertIsNil();` function has been renamed to `assertIsNullish();`.
- The `assertIsNotNil();` function has been renamed to `assertIsNotNullish();`.
- The `type();` function has been renamed to `typeOf();`.
- The `celestra.noConflict();` function has been removed.
- Some deprecated functions have been removed.

### Celestra v6.3.0 (Bishop) changes

- The __Legacy AJAX API__ has been removed.
- The __Legacy Assertion API (Assert API v3)__ has been removed.

-----

## Functions

### Stabilities

- __Stability: 0 - Removed.__
- __Stability: 1 - Deprecated and will be removed.__
- __Stability: 2 - Deprecated.__
- __Stability: 3 - Legacy and can get only fixes.__
- __Stability: 4 - Stable.__

__Removed__ and __Deprecated__: Don't use these in production.

### Core API

Name|Description
----|-----------
`noConflict();`|__Stability: 0 - Removed in v6.1.0__<BR>Restore the previous `CEL` object value and return the `celestra` object to create a new alias.<BR>__Tip: You can make a new alias without this function too. Example: `globalThis._cel = globalThis.celestra;`__<BR>__In the ESM edition only returns the celestra object.__
`VERSION;`|__Stability: 4 - Stable.__<BR>The library version.
`BASE16;`|__Stability: 4 - Stable.__<BR>`"0123456789ABCDEF"`<BR>Can be used with the ID generator functions.
`BASE32;`|__Stability: 4 - Stable.__<BR>`"234567ABCDEFGHIJKLMNOPQRSTUVWXYZ"`<BR>Can be used with the ID generator functions.
`BASE36;`|__Stability: 4 - Stable.__<BR>`"0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ"`<BR>Can be used with the ID generator functions.
`BASE58;`|__Stability: 4 - Stable.__<BR>`"123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz"`<BR>Can be used with the ID generator functions.
`BASE62;`|__Stability: 4 - Stable.__<BR>`"0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"`<BR>Can be used with the ID generator functions.
`WORDSAFEALPHABET;`|__Stability: 4 - Stable.__<BR>`"23456789CFGHJMPQRVWXcfghjmpqvwx"`<BR>Can be used with the ID generator functions.
`assert(condition [, message \| error]);`|__Stability: 4 - Stable.__<BR>This function throws an error with the message if the condition is falsy. The message parameter is optional.
`assoc(object, key, value);`|__Stability: 4 - Stable.__<BR>Clone the original object (immutably) and return this new object with original keys and values and the given key and value.
`asyncConstant(value);`|__Stability: 4 - Stable.__<BR>This function returns an async function, which returns a promise with the given value.
`asyncIdentity(value);`|__Stability: 4 - Stable.__<BR>This async function returns a promise with the given value.
`asyncF();`|__Stability: 4 - Stable.__<BR>This async function returns a promise with false value.
`asyncNoop();`|__Stability: 4 - Stable.__<BR>This function does nothing and returns a resolved promise.
`asyncT();`|__Stability: 4 - Stable.__<BR>This async function returns a promise with true value.
`bind(function,context);`|__Stability: 4 - Stable.__<BR>Returns a function that is bound to a context. Both of the parameters are mandatory.
`compose(function1 [, functionN]);`|__Stability: 4 - Stable.__<BR>Compose functions right to left. At least one function parameter is mandatory.
`constant(value);`|__Stability: 4 - Stable.__<BR>A one time assignment function to create a constant value in ES5. This returns a function, which returns the given value. (In math: `f(x)=x`)
`createPolyfillMethod(object,property,value);`|__Stability: 4 - Stable.__<BR>This function creates a writable, configurable and non-enumerable property with the given value in the object if the property doesn't exist in the object. The return value boolean and checks that the creating of the method was successful.<BR>__Example:__<BR>`CEL.createPolyfillMethod(Array.prototype, "at", function(...){...});`
`createPolyfillProperty(object,property, value);`|__Stability: 4 - Stable.__<BR>This function creates a writable, configurable and enumerable property with the given value in the object if the property doesn't exist in the object. The return value boolean and checks that the creating of the property was successful.
`curry(function);`|__Stability: 4 - Stable.__<BR>Curries a function, allowing it to be called with a single argument at a time and returning a new function that takes the next argument. The function parameter is mandatory.
`delay(ms).then(callback);`|__Stability: 1 - Deprecated and will be removed.__<BR>A promise based delay function. The ms (milliseconds) parameter is mandatory and have to be an integer.<BR>__Sample:__<BR>`CEL.sleep(5000).then(() => alert("5 seconds")).catch(console.log.bind(console)).finally(() => alert("done"));`
`deleteOwnProperty(object,property[,Throw = false]);`|__Stability: 4 - Stable.__<BR>This function deletes an own property in the given object. If Throw is true and the deleting was unsuccessful, then an error will be thrown.<BR>__Return values:__<BR>1 - The property was own and the delete was successful.<BR>0 - The property is own and the delete was unsuccessful.<BR>-1 - The property is not own or not exists.
`extend([deep,]target,source1[,sourceN]);`|__Stability: 4 - Stable.__<BR>This is an enhanced version of the `Object.assign` method. The deep parameter (boolean) is optional and sets the deep copy (recursive) of the sources.
`eq(value1, value2);`|__Stability: 4 - Stable.__<BR>SameValueZero equality (like `Object.is();`, but `+0 === -0`). All of the parameters are mandatory and can be any type. The return value is boolean.
`F();`|__Stability: 4 - Stable.__<BR>This function returns false.
`getUrlVars([str=location.search]);`|__Stability: 4 - Stable.__<BR>Get the values of the url variables in an object from the `location.search` _(default value)_ or another given url. The str parameter name is optional and can be a string. Example: `"?showall=true&order_by=updated&o=asc"` -> `Object { showall: "true", order_by: "updated", o: "asc" }`
`gt(value1, value2);`|__Stability: 4 - Stable.__<BR>Strict type greater than. All of the parameters are mandatory and can be number, bigint, string or boolean, but the values have to be same type. If the type of the values are not the same, then return value is false. The return value is boolean.
`gte(value1, value2);`|__Stability: 4 - Stable.__<BR>Strict type greater than or equal (SameValueZero). All of the parameters are mandatory and can be number, bigint, string or boolean, but the values have to be same type. If the type of the values are not the same, then return value is false. The return value is boolean.
`identity(value);`|__Stability: 4 - Stable.__<BR>Return the given value. (In math: `f(x)=x`)
`lt(value1, value2);`|__Stability: 4 - Stable.__<BR>Strict type less than. All of the parameters are mandatory and can be number, bigint, string or boolean, but the values have to be same type. If the type of the values are not the same, then return value is false. The return value is boolean.
`lte(value1, value2);`|__Stability: 4 - Stable.__<BR>Strict type less than or equal (SameValueZero). All of the parameters are mandatory and can be number, bigint, string or boolean, but the values have to be same type. If the type of the values are not the same, then return value is false. The return value is boolean.
`nanoid([size=21[,alphabet= "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_-"]]);`|__Stability: 4 - Stable.__<BR>Generate a nanoid. The size parameter is optional and the default value is 21. The alphabet parameter is optional and the default value is "A-Za-z0-9_-". The return value is the generated nanoid (string).
`noop();`|__Stability: 4 - Stable.__<BR>It's an empty function (no operation) that returns undefined and usable for optional callback arguments.
`obj2string(object);`|__Stability: 4 - Stable.__<BR>Convert object to a querystring. The return value is the string. The object parameter is mandatory.
`omit(object, keys);`|__Stability: 4 - Stable.__<BR>Exclude (filter) keys from an object and return these keys and values in a new object (immutably). All of the parameters are mandatory and the keys has to be an array.
`once(functions);`|__Stability: 4 - Stable.__<BR>Ensures a function is only called once. The return value is a new function. The function parameter is mandatory.
`pick(object, keys);`|__Stability: 4 - Stable.__<BR>Select (filter) keys from an object and return these keys and values in a new object (immutably). All of the parameters are mandatory and the keys has to be an array.
`pipe(function1 [, functionN]);`|__Stability: 4 - Stable.__<BR>Compose functions left to right. At least one function parameter is mandatory.
`randomBoolean();`|__Stability: 4 - Stable.__<BR>Get a random boolean value. The return value is `true` or `false`.
`randomUUIDv7(v4 = false);`|__Stability: 4 - Stable.__<BR>This function returns a UUID v7, which cointains a timestamp too. For more information please read the [this page](https://www.rfc-editor.org/rfc/rfc9562.html#name-uuid-version-7)!<BR>Example result: `"0195d74b-b8c8-7302-a7d3-919df45087f3"`<BR>If the v4 parameter (optional) is `true`, then the version in the string will be 4.<BR>Example result: `"0195d74b-b8c8-4302-a7d3-919df45087f3"`.
`sizeIn(object);`|__Stability: 4 - Stable.__<BR>Returns the count of the owned properties and symbols of the given object. The object parameter is mandatory. The return value is an integer.
`T();`|__Stability: 4 - Stable.__<BR>This function returns true.
`tap(function): function(value);`|__Stability: 4 - Stable.__<BR>This functions returns a new function, which runs the given function with the value parameter, then returns the value. Usable for testing and logging. All of the parameters are mandatory.
`timestampID([size=21[,alphabet= "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz"]]);`|__Stability: 4 - Stable.__<BR>Generate a timestamp based sortable ID. The size parameter is optional and the default value is 21, but if the given value smaller than 12, then the value will be 12. The alphabet parameter is optional and the default value is `"123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz"`, same as BASE58. The return value is the generated id (string).<BR>Example ID:`"00lirtqi4e-wgGn8vGPyY"`
`unBind(function);`|__Stability: 4 - Stable.__<BR>__Old name before v5.4.1:__ `toFunction`.<BR>Returns an unbinded function from an object method. The function parameter is mandatory.

### String API

Name|Description
----|-----------
`b64Decode(string);`|__Stability: 4 - Stable.__<BR>Unicode compatible base64 to string converter. Return the original string.
`b64Encode(string);`|__Stability: 4 - Stable.__<BR>Unicode compatible string to base64 converter. Return the encoded string.
`strAt(string,index[,newChar]);`|__Stability: 4 - Stable.__<BR>If the newchar is undefined, then returns the unicode character, which has to be on the given index in the string. The index can be negative value (`-1 -> last`). If the index is out of the string length, then the return value is an empty string. All of the parameters are mandatory and index has to be an integer.<BR>If the newChar is not undefined, then the indexed character will be replaced with the newChar and returns the modified string.
`strCapitalize(string);`|__Stability: 4 - Stable.__<BR>This function is unicode compatible and converts the first character to uppercase and the other characters to lowercase. The string parameter is mandatory. The return value is a string.
`strCodePoints(string);`|__Stability: 4 - Stable.__<BR>Returns the array of the unicode codepoints of characters of the given string. The string parameter is mandatory.
`strDownFirst(string);`|__Stability: 4 - Stable.__<BR>This function is unicode compatible and converts the first character to lowercase. The string parameter is mandatory. The return value is a string.
`strFromCodePoints(iterable);`|__Stability: 4 - Stable.__<BR>Returns the joined string of the given unicode codepoints. The iterator parameter is mandatory.
`strHTMLEscape(string);`|__Stability: 4 - Stable.__<BR>This function escapes these characters: `<`, `>`, `&`, `"`, `'`. The String parameter is mandatory. The return value is the escaped string.
`strHTMLRemoveTags(string);`|__Stability: 4 - Stable.__<BR>Remove HTML tags from the given string. The string parameter is mandatory. The return value is the new string.
`strHTMLUnEscape(string);`|__Stability: 4 - Stable.__<BR>This function unescapes these characters: `<`, `>`, `&`, `"`, `'`. The String parameter is mandatory. The return value is the unescaped string.
`strReverse(string);`|__Stability: 4 - Stable.__<BR>Returns the reversed variant of the given string. In the ES6 compatible browsers the result will be unicode compatible. The string parameter is mandatory.
`strPropercase(string);`|__Stability: 4 - Stable.__<BR>This function is unicode compatible and capitalizes every word of the given string. The string parameter is mandatory. The return value is a string.<BR>__Example:__<BR>
`strSplice(string,index,count[,add]);`|__Stability: 4 - Stable.__<BR>This function works like the [Array.prototype.splice();](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice), but with strings and can remove characters on the index or replace with other string. The return value is the modified string.
`strTitlecase(string);`|__Stability: 4 - Stable.__<BR>Alias of the `strPropercase(string);`.
`strTruncate(string, newLength[,omission = ""]);`|__Stability: 4 - Stable.__<BR>This function truncats the given string to the new length. If the new length is bigger than the original length, then the return value is the original string. The omission parameter is optional.<BR>__Samples:__<BR>`CEL.strTruncate("Arthur Dent", 6);` -> `"Arthur"`<BR>`CEL.strTruncate("Arthur Dent", 6, "...");` -> `"Art..."`<BR>`CEL.strTruncate("Arthur Dent", 20, "...");` -> `"Arthur Dent"`
`strUpFirst(string);`|__Stability: 4 - Stable.__<BR>This function is unicode compatible and converts the first character to uppercase. The string parameter is mandatory. The return value is a string.

### Legacy Assertion API

__These functions have been removed in v6.3.0, because the first stable version of the [assert.js](https://github.com/Serrin/assert.js) library has been published.__

### DOM API

Name|Description
----|-----------
`createFile(filename,content[,dataType]);`|__Stability: 4 - Stable.__<BR>Create and save file without a server. The filename and content parameters are mandatory and have to be a string. The dataType parameter is optional and can be a string. The default value of the dataType parameter is "_text/plain_". ___Doesn't work in iOS browsers (Safari, Firefox and Chrome) and W10M Edge 14.___
`domClear(element);`|__Stability: 4 - Stable.__<BR>Remove all child element of the given element. The parameter is mandatory.
`domCreate(type[,properties[,innerHTML]]);`|__Stability: 4 - Stable.__<BR>Create a new HTML element. The type is mandatory and has to be a string. The properties object is optional and sets the element properties. (class, style object/string, data-*, etc.) The innerHTML is optional and can be a string.
`domCreate(element descriptive object);`|__Stability: 4 - Stable.__<BR>Since v2.0.5, a new element can be created with an object. In this case the element descriptive object is mandatory. The `style` can be a subobject or a string. __Sample code:__ `CEL.domCreate({elementType: "a", href: "https://developer.mozilla.org/en-US/", target: "_blank", style: {"background-color": "red", "color": "white"}, innerHTML: "MDN Sample url"});`
`domFadeIn(element [,duration [,display]]);`|__Stability: 4 - Stable.__<BR>Fade in and show animation for an element. The element is mandatory and has to be a HTML element. The duration parameter is optional and sets the animation time in millisecond (the default is 500ms). The display is optional and can be a string (CSS display property values).
`domFadeOut(element [,duration]);`|__Stability: 4 - Stable.__<BR>Fade out and hide animation for an element. The element is mandatory and has to be a HTML element. The duration parameter is optional and sets the animation time in millisecond (the default is 500ms).
`domFadeToggle(element [,duration [,display]]);`|__Stability: 4 - Stable.__<BR>Fade in or fade out animation which depends on the state of the element. The element is mandatory and has to be a HTML element. The duration parameter is optional and sets the animation time in millisecond (the default is 500ms). The display is optional and can be a string (CSS display property values).
`domGetCSS(element [,property]);`|__Stability: 4 - Stable.__<BR>Get a CSS property value of an element or all of the css properties in an object. The element is mandatory and has to be a HTML element. The property is optional and can be a string.
`domGetCSSVar(name);`|__Stability: 4 - Stable.__<BR>This function returns a value of a CSS variable or an empty string, if the variable is unset. The name parameter is mandatory and has to be a string. If the "--" characters are missing at the begin of the variable name, then the function will add these.
`domHide(element);`|__Stability: 4 - Stable.__<BR>Hide an element. The element is mandatory and has to be a HTML element.
`domIsHidden(element);`|__Stability: 4 - Stable.__<BR>This function determines whether the element is hidden. The element is mandatory and has to be a HTML element. The return value is boolean.
`domReady(callback);`|__Stability: 4 - Stable.__<BR>Set the document ready (content fully loaded) event.
`domSetCSS(element, property,value);`|__Stability: 4 - Stable.__<BR>Set a CSS property value of an element. The element is mandatory and has to be a HTML element. The property is mandatory and has to be a string. The value is mandatory and has to be a string.
`domSetCSS(element, properties);`|__Stability: 4 - Stable.__<BR>Set CSS property values of an element. The element is mandatory and has to be a HTML element. The properties object is mandatory. The object properties can be the CSS properties and the property values will be applied to the element.
`domSetCSSVar(name,value);`|__Stability: 4 - Stable.__<BR>This function set a value of a CSS variable. Both of the parameters are mandatory and have to be a string. If the "--" characters are missing at the begin of the variable name, then the function will add these.
`domShow(element [,display]);`|__Stability: 4 - Stable.__<BR>Show an element. The element is mandatory and has to be a HTML element. The display is optional and can be a string (CSS display values).
`domScrollToBottom();`|__Stability: 4 - Stable.__<BR>__Old name before v5.5.4:__ `domToBottom`.<BR>This function is scrolling to the bottom of the page.
`domScrollToElement(element [,top=true]);`|__Stability: 4 - Stable.__<BR>This function is scrolling to top or the bottom of element. The element parameter is mandatory and the top parameter is optional and can be boolean.
`domScrollToTop();`|__Stability: 4 - Stable.__<BR>__Old name before v5.5.4:__ `domToTop`.<BR>This function is scrolling to the top of the page.
`domSiblings(element);`|__Stability: 4 - Stable.__<BR>Get the siblings of an element. The element parameter is mandatory and the return value is the array.
`domSiblingsLeft(element);`|__Stability: 4 - Stable.__<BR>Alias of the `domSiblingsPrev(element);`.
`domSiblingsNext(element);`|__Stability: 4 - Stable.__<BR>Get the nextsiblings of an element. The element parameter is mandatory and the return value is the array.
`domSiblingsPrev(element);`|__Stability: 4 - Stable.__<BR>Get the previous siblings of an element. The element parameter is mandatory and the return value is the array.
`domSiblingsRight(element);`|__Stability: 4 - Stable.__<BR>Alias of the `domSiblingsNext(element);`.
`domToElement(htmlString);`|__Stability: 4 - Stable.__<BR>This function returns a HTML element which is created from the htmlString parameter. The htmlString parameter is mandatory and has to be a string.
`domToggle(element [,display]);`|__Stability: 4 - Stable.__<BR>Show or hide an element. The element is mandatory and has to be a HTML element. The display is optional and can be a string (CSS display values).
`importScript(script1[,scriptN]);`|__Stability: 4 - Stable.__<BR>Load JavaScript files. The first parameter is mandatory and has to be a string. The other parameters are optional and can be a string.<BR>__Tip:__<BR>To prevent the caching of a js/css file use versioning in the file url. Example: `mylib.js?version=1.10.0`
`importStyle(style1[,styleN]);`|__Stability: 4 - Stable.__<BR>Load CSS files. The first parameter is mandatory and has to be a string. The other parameters are optional and can be a string.
`form2array(form);`|__Stability: 4 - Stable.__<BR>Convert (serialize) form input tag names and values to an array with object elements (name and value properties). The return value is the array. The form parameter is mandatory and has to be a html form element.
`form2string(form);`|__Stability: 4 - Stable.__<BR>Convert (serialize) form input tag names and values to a query string. The return value is the string. The form parameter is mandatory and has to be a html form element.
`getDoNotTrack();`|__Stability: 4 - Stable.__<BR>Return the DoNotTrack setting (boolean) of the browser.
`getFullscreen();`|__Stability: 4 - Stable.__<BR>Get the fullscreen element. If this isn't set, then the return value is undefined. Please check the incompatibility issues on the [http://caniuse.com/#search=fullscreen](http://caniuse.com/#search=fullscreen) page.
`getLocation(success[,error]);`|__Stability: 4 - Stable.__<BR>Get the current location as an object with the coordinates. The success is mandatory and has to be a function. The error is optional and can be a function.
`setFullscreenOff();`|__Stability: 4 - Stable.__<BR>Set off the fullscreen.
`setFullscreenOn(selector);`|__Stability: 4 - Stable.__<BR>Set the fullscreen element. The selector can be a css selector string or an element.
`qs(selector[,context]);`|__Stability: 4 - Stable.__<BR>Get the first matched HTML element. The context is optional and can be an element.
`qsa(selector[,context]);`|__Stability: 4 - Stable.__<BR>Get matched HTML elements in an array. The context is optional and can be an element.

### Legacy AJAX API

__These functions have been removed in v6.3.0. It's recommend to use the [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API), because this is [supported](https://caniuse.com/?search=fetch) in every modern browsers.__

### Type API

Name|Description
----|-----------
`is(value[,expectedType[,Throw=false]];`|__Stability: 4 - Stable.__<BR>This function determines whether the provided value type or class is the given expectedType. The expectedType can be a type string, constructor function or an array of the type strings and constructors. If the Throw is true and the value is not matched with the expectedType, then a TypeError will be thrown with detailed error message. The return value is boolean or the type or constructor of the value.
`isTypedCollection(iter, expectedType, Throw = false);`|__Stability: 4 - Stable.__<BR>This function determines whether values of the provided iterable or iterator are the given expectedType. The expectedType is mandatory and can be a type string, constructor function or an array of the type strings and constructors. If the Throw is true and the values are not matched with the expectedType, then a TypeError will be thrown with detailed error message. The return value is boolean.
`isArraylike(value);`|__Stability: 4 - Stable.__<BR>This function determines whether the provided value is an arraylike object. The return value is boolean.
`isAsyncIterable(value);`|__Stability: 4 - Stable.__<BR>This function determines whether the provided value is an async iterable object. The return value is boolean.
`isAsyncFn(value);`|__Stability: 4 - Stable.__<BR>This function determines whether the provided value is an async function. The return value is boolean.
`isAsyncGeneratorFn(value);`|__Stability: 4 - Stable.__<BR>This function determines whether the provided value is an async generator function. The return value is boolean.
`isCallable(value);`|__Stability: 4 - Stable.__<BR>This function determines whether the provided object has a call method. The return value is boolean.
`isChar(value);`|__Stability: 4 - Stable.__<BR>This function determines whether the provided value is a string with length 1 character. This function is unicode compatible. The return value is boolean.
`isCoercedObject(object);`|__Stability: 4 - Stable.__<BR>If the given object is a coerced object (Number, BigInt, String, Boolean), then the return value is the constructor function. In any other cases retuns false. The object parameter is mandatory.
`isDeepStrictEqual(value1, value2);`|__Stability: 4 - Stable.__<BR>This function determines whether the provided values are deep equals. (_Deep strict equality + NaN equality: primitives (SameValue - Object.is()), Array, TypedArray, Plain Object, Map, Set, WeakMap (only reference), WeakSet (only reference), Object wrappers (primitives), Function (only reference), RegExp, Error, Date_) The return value is boolean.
`isElement(value);`|__Stability: 4 - Stable.__<BR>This function determines whether the provided value is a HTML element. The return value is boolean.
`isEmptyValue(value1, value2);`|__Stability: 4 - Stable.__<BR>This function determines whether the provided value is an empty value. Returns true in these cases: null, undefined, NaN, array, typedarray, arraybuffer, dataview, object, arraylike object, map, set, iterator, iterable. The return value is boolean.
`isFunction(value);`|__Stability: 4 - Stable.__<BR>This function determines whether the provided value is a function. The return value is boolean.
`isGeneratorFn(value);`|__Stability: 4 - Stable.__<BR>This function determines whether the provided value is a generator function. The return value is boolean.
`isIndex(value);`|__Stability: 4 - Stable.__<BR>This function determines whether the provided value is a valid arraylike index number. The return value is boolean.
`isIterable(value);`|__Stability: 4 - Stable.__<BR>This function determines whether the provided value is an iterable object. The return value is boolean.
`isIterator(value);`|__Stability: 4 - Stable.__<BR>This function determines whether the provided value is an iterator. The return value is boolean.
`isLength(value);`|__Stability: 4 - Stable.__<BR>Alias of `isIndex(value);`.
`isNonNullable(value);`|__Stability: 4 - Stable.__<BR>Checks if the given value is NonNullable (not null or undefined). The value parameter is mandatory and can be any type. The return value is boolean.
`isNonNullablePrimitive(value);`|__Stability: 4 - Stable.__<BR>Checks if the given value is NonNullable (not null, undefined, object or function). The value parameter is mandatory and can be any type. The return value is boolean.
`isNull(value);`|__Stability: 4 - Stable.__<BR>This function determines whether the provided value is null. The return value is boolean.
`isNullish(value);`|__Stability: 4 - Stable.__<BR>__Old name before v6.1.0: `isNil();`.__<BR>This function determines whether the provided value is null or undefined. The return value is boolean.
`isNumeric(value);`|__Stability: 4 - Stable.__<BR>This function determines whether the provided value is a number or can be converted to number. The return value is boolean.
`isObject(value);`|__Stability: 4 - Stable.__<BR>This function determines whether the provided value is an object or function and not null. The return value is boolean.
`isPlainObject(value);`|__Stability: 4 - Stable.__<BR>This function determines whether the provided value is an object, which own prototype is the Object.prototype or null. The return value is boolean.
`isPrimitive(value);`|__Stability: 4 - Stable.__<BR>This function determines whether the provided value is not null, not object and not function. The return value is boolean.
`isPropertyKey(value);`|__Stability: 4 - Stable.__<BR>This function determines whether the provided value is a valid propertx key (string or symbol). The return value is boolean.
`isProxy(value);`|__Stability: 4 - Stable.__<BR>This function determines whether the provided value is a proxy object. The return value is boolean.
`isRegexp(value);`|__Stability: 4 - Stable.__<BR>This function determines whether the provided value is a regexp. The return value is boolean.
`isSameInstance(value1, value2,Contructor);`|__Stability: 4 - Stable.__<BR>This function returns true if the values are same class and uses the `instanceof` operator. The parameters are mandatory. The return value is boolean.
`isSameType(value1, value2);`|__Stability: 4 - Stable.__<BR>This function returns true if the values are same type or both are null or both are undefined. The parameters are mandatory. The return value is boolean.
`isTypedArray(value);`|__Stability: 4 - Stable.__<BR>This function determines whether the provided value is an typedarray. The return value is boolean.
`isUndefined(value);`|__Stability: 4 - Stable.__<BR>This function determines whether the provided value is undefined. The return value is boolean.
`toIndex(value);`|__Stability: 4 - Stable.__<BR>This function converts the provided value to a valid arraylike index number. The return value is an unsigned integer (number). If the value is out of integer range, then a RangeError will be thrown.
`toLength(value);`|__Stability: 4 - Stable.__<BR>This function converts the provided value to a valid arraylike length number. The return value is an unsigned integer (number).
`toObject(value);`|__Stability: 4 - Stable.__<BR>If the given value is not null or undefined, then the return value is an object, which has been converted from the value, else a `TypeError()` will be throwned.<BR>If the given value is an object, function or symbol, then the original value will return.
`toPrimitiveValue(value);`|__Stability: 4 - Stable.__<BR>If the given value is null or undefined, then a `TypeError()` will be throwned.<BR>If the given value is an object, which can be converted to a primitive variable, then the return value is a primitive variable.<BR>If the given value is a not convertable object (array, map, set, etc.), function or symbol, then the original value will return.
`toPropertyKey(value);`|__Stability: 4 - Stable.__<BR>This function convert the given value to a valid property key. If the value is not symbol, then will be converted to string, else the symbol will be returned.
`toSafeString(value);`|__Stability: 4 - Stable.__<BR>This function is a general purpose, type safe, predictable stringifier. The value parameter is mandatory and can be any type. The return value is a string.
`typeOf(value);`|__Stability: 4 - Stable.__<BR>__Old name before v6.1.0: `type();`.__<BR>This function returns the typeof operator result of the given value, except the null object (`"null"` instead of `"object"`).

### Cookie API

Cookie values help:

- [https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie)
- [https://web.dev/samesite-cookies-explained](https://web.dev/samesite-cookies-explained)

Name|Description
----|-----------
`clearCookies([path="/"[, domain[, secure[, SameSite="Lax"[, HttpOnly]]]]]);`|__Stability: 4 - Stable.__<BR>Clear all of the cookies. The path is optional and can be a string _(default value: "/")_. To the local path set the `""` value! The domain is optional and can be a string. The secure is optional and can be a boolean. The SameSite is optional and can be a string _("Lax", "Strict", "None", default value: "Lax")_. The HttpOnly is optional and can be a boolean.
`clearCookies(Options object);`|__Stability: 4 - Stable.__<BR>In this case the names of object properties are the same as the function arguments and the default values are the same too.
`getCookie([name]);`|__Stability: 4 - Stable.__<BR>Get a cookie value or all cookies in an object. With the name parameter (string) the return value is the current cookie value or null. Without the parameter the return value is an object with the values or an empty object.
`hasCookie(name);`|__Stability: 4 - Stable.__<BR>This function determines whether the cookie is set with the name. The return value is boolean.
`removeCookie(name[, path="/"[, domain[, secure[, SameSite="Lax"[, HttpOnly]]]]]);`|__Stability: 4 - Stable.__<BR>Remove a cookie. The name is mandatory and has to be a string. The path is optional and can be a string _(default value: "/")_. The To the local path set the `""` value! The domain is optional and can be a string. The secure is optional and can be a boolean. The SameSite is optional and can be a string _("Lax", "Strict", "None", default value: "Lax")_. The HttpOnly is optional and can be a boolean. The return value (boolean) is determines whether the cookie was set with the name before the removing.
`removeCookie(Options object);`|__Stability: 4 - Stable.__<BR>In this case the names of object properties are the same as the function arguments and the default values are the same too.
`setCookie(name,value[, hours=8760[, path="/"[, domain[, secure[, SameSite="Lax"[, HttpOnly]]]]]]);`|__Stability: 4 - Stable.__<BR>Set a cookie. The name is mandatory and has to be a string. The value is mandatory and has to be a string. The hours is the expire value and optional and can be a number _(default value: 8760 = 1 year)_. The path is optional and can be a string _(default value: "/")_. To the local path set the `""` value! The domain is optional and can be a string. The secure is optional and can be a boolean. The SameSite is optional and can be a string _("Lax", "Strict", "None", default value: "Lax")_. The HttpOnly is optional and can be a boolean.
`setCookie(Options object);`|__Stability: 4 - Stable.__<BR>In this case the names of object properties are the same as the function arguments and the default values are the same too.

### Collections API

Name|Description
----|-----------
`arrayAdd(array,value);`|__Stability: 4 - Stable.__<BR>Push the value to the array if the array doesn't contain the value. The return value is true, when the value is added and false, when not added.
`arrayClear(array);`|__Stability: 4 - Stable.__<BR>Clear the array and returns the empty array. The array parameter is mandatory.
`arrayCycle(iterator[,n=100]);`|__Stability: 4 - Stable.__<BR>Cycle the given iterator and returns an array with these elements. The iterator parameter is mandatory. The n parameter is optional and can be an integer. Default parameter value: n = 100.
`arrayDeepClone(array);`|__Stability: 4 - Stable.__<BR>This function deeply (recursively) clones an array. The return value is the cloned array.
`arrayMerge(target,source1[,sourceN]);`|__Stability: 4 - Stable.__<BR>Merge two or more arrays or push any values in the target array. The return value is the target array.
`arrayRange([start=0[,end=99[,step=1]]]);`|__Stability: 4 - Stable.__<BR>Returns the array of values between the start and end parameters. All of the parameters are mandatory and have to be a number. Default parameter values: start = 0, end = 99, step = 1.<BR>__Example:__<BR>`CEL.arrayRange("A".codePointAt(0),"Z".codePointAt(0)).map((v)=>String.fromCodePoint(v));`<BR>-><BR>`Array(26) [ "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z" ]`
`arrayRemove(array,value[,all=false]);`|__Stability: 4 - Stable.__<BR>Remove the first or all equivalent values from the array. Returns true, when the value was found and false when not found. The array and value parameters are mandatory. The all parameter is optional and has to be a boolean.
`arrayRemoveBy(array,callback[,all=false]);`|__Stability: 4 - Stable.__<BR>Remove the first or all values from the array with which the given function returns true. Returns true, when the value was found and false when not found. The array and value parameters are mandatory. The all parameter is optional and has to be a boolean.
`arrayRepeat(value);`|__Stability: 4 - Stable.__<BR>Returns an array with same repeatedly elements. The value parameter is mandatory and the n parameter is optional and can be an integer. Default parameter value: n = 100.
`castArray([value]);`|__Stability: 4 - Stable.__<BR>This function returns the original value if this is an array or value a new array. If there is no given value, then the return value is an empty array.
`compact(iterator);`|__Stability: 4 - Stable.__<BR>This function merges the iterators and yields the elements of the merged iterator. At least one iterator has to been given.
`concat(iterator1[,iteratorN]);`|__Stability: 4 - Stable.__<BR>This function merges the iterators and yields the elements of the merged iterator. At least one iterator has to been given.
`count(iterator,callback);`|__Stability: 4 - Stable.__<BR>This function executes a counter function (that you provide) on each element of the iterator, returning in a single output value. The iterator parameter is mandatory. The callback parameter is mandatory and has to be a function.
`drop(iterator[,n=1]);`|__Stability: 3 - Legacy and can get only fixes.__<BR>__Can be replaced with `Iterator.from(iterable/iterator).drop();`__<BR>Drop the first N elements of an iterator and yield the remained elements. The iterator parameter is mandatory. The n parameter is optional and can be an integer. Default parameter value: n = 1
`dropRight(iterator[,n=1]);`|__Stability: 4 - Stable.__<BR>Drop the last N elements of an iterator and return the remained elements in an array. The iterator parameter is mandatory. The n parameter is optional and can be an integer. Default parameter value: n = 1.
`dropRightWhile(iterator,callback);`|__Stability: 4 - Stable.__<BR>Drop the elements from the end of an iterator while the callback (filter) function returns true and yield the remained elements. The callback function will be called with the actual element of the iterator. The iterator parameter is mandatory. The callback parameter is mandatory and has to be a function.
`dropWhile(iterator,callback);`|__Stability: 4 - Stable.__<BR>Drop the elements of an iterator while the callback (filter) function returns true and yield the remained elements. The callback function will be called with the actual element of the iterator. The iterator parameter is mandatory. The callback parameter is mandatory and has to be a function.
`enumerate(iterator[,offset=0]);`|__Stability: 4 - Stable.__<BR>Yield generated pairs (arrays) from the elements of an iterator and a counter. The iterator parameter is mandatory. The offset parameter is optional and can be an integer and it's default value is 0.<BR>__Example:__<BR>`CEL.enumerate(["Picard", "Riker", "Data"], 2);` -> `[2, "Picard"]`, `[3, "Riker"]`, `[4, "Data"]`
`every(iterator,callback);`|__Stability: 3 - Legacy and can get only fixes.__<BR>__Can be replaced with `Iterator.from(iterable/iterator).every();`__<BR>This function whether all elements in the iterator pass the test implemented by the provided function. It returns a Boolean value and all of the parameters are mandatory. If the iterator is empty, then the return value is false.
`filter(iterator,callback);`|__Stability: 3 - Legacy and can get only fixes.__<BR>__Can be replaced with `Iterator.from(iterable/iterator).filter();`__<BR>Filter and yield elements of an iterator. The iterator parameter is mandatory. The callback parameter is mandatory and has to be a function and called with two parameters: the item and the index of the item (only a counter).
`find(iterator,callback);`|__Stability: 3 - Legacy and can get only fixes.__<BR>__Can be replaced with `Iterator.from(iterable/iterator).find();`__<BR>This function returns the value of the first element in the iterator that satisfies the provided testing function. Otherwise undefined is returned. All of the parameters are mandatory.
`findLast(iterator,callback);`|__Stability: 4 - Stable.__<BR>This function returns the value of the last element in the iterator that satisfies the provided testing function. Otherwise undefined is returned. All of the parameters are mandatory.
`first(iterator);`|__Stability: 4 - Stable.__<BR>This function returns the first element of the given iterator. The iterator parameter is mandatory.
`forEach(iterator,callback);`|__Stability: 3 - Legacy and can get only fixes.__<BR>__Can be replaced with `Iterator.from(iterable/iterator).forEach();`__<BR>This function executes a provided function once for each iterator items. The iterator parameter is mandatory. The callback parameter is mandatory and has to be a function and called with two parameters: the item and the index of the item (only a counter).
`forEachRight(iterator,callback);`|__Stability: 4 - Stable.__<BR>This function executes a provided function once for each iterator items in reversed order. The iterator parameter is mandatory. The callback parameter is mandatory and has to be a function and called with two parameters: the item and the index of the item (only a reversed counter).
`head(iterator);`|__Stability: 4 - Stable.__<BR>This is an alias of the `first(iterator);`.
`includes(iterator,value);`|__Stability: 4 - Stable.__<BR>This function determines whether a collection includes a certain value among its entries, returning true or false as appropriate. The collection and the value of the parameters are mandatory and the comparator is optional.<BR>The default comparasion is SameValueZero algorithm, but with the comparator (function) can be other solution. (e.g.: Object.is, which uses the SameValue algorithm).<BR>The collection can be: _String_ (uses the String#includes method), _String object_ (uses the String#includes method), _Map_, _Iterables_ (Array, Set, TypedArrays, other Iterables), _plain objects_, _functions_ (as object).<BR>The own keys, values, symbols are compared, example: `CEL.includes({"lorem": "ipsum","1": 0}, -0);` returns true.
`initial(iterator);`|__Stability: 4 - Stable.__<BR>Returns an array with the values of the given iterator, but without the last value.<BR>__Example:__<BR>`CEL.initial([-5, 2, -9, 7, 34]);`<BR>-><BR>`[-5, 2, -9, 7]`
`isSuperset(superCollection,subCollection);`|__Stability: 3 - Legacy and can get only fixes.__<BR>__Can be replaced with `Set.prototype.isSupersetOf();`.__<BR>This function determines whether the first provided iterator is superset of the second iterator. The parameters are mandatory. The return value is a boolean.
`item(iterator,index);`|__Stability: 4 - Stable.__<BR>TThis function returns the item from the given iterator on the given index. The iterator parameter is mandatory and has to be an iterator/iterable. The index is mandatory and can be a positive integer (examples: 0 = the first item, 1 = the second item, 2 = the third item, etc.) Compatible with the Unicode strings.
`iterCycle(iter[,n=Infinity]);`|__Stability: 4 - Stable.__<BR>Yield the items of an iterator over and over. The iter parameter is mandatory and the n parameter is optional and can be an integer. Default parameter value: n = Infinity __Note: PLease don't use with infinite iterators!__
`iterRange([start=0[,step=1[,end=Infinity]]]);`|__Stability: 4 - Stable.__<BR>Yield a range (counter) iterator. All of the parameters are optional. Default parameter values: start = 0, step = 1, end = Infinity.
`iterRepeat(value[,n=Infinity]);`|__Stability: 4 - Stable.__<BR>Yield a value over and over. The value parameter is mandatory and the n parameter is optional and can be an integer. Default parameter value: n = Infinity
`join(iterator[,separator=","]);`|__Stability: 4 - Stable.__<BR>This function creates and returns a new string by concatenating all of the elements in an iterator, separated by commas or a specified separator string. The separator is converted to a string if necessary. If the iterator has only one item, then that item will be returned without using the separator. The iterator parameter is mandatory.
`flat(iterator);`|__Stability: 4 - Stable.__<BR>Yield the subelements of the elements of the given iterator. the iterator parameter is mandatory and all of the elements have to be an iterator or iterable.
`last(iterator);`|__Stability: 4 - Stable.__<BR>This function returns the last element of the given iterator. The iterator parameter is mandatory.
`map(iterator,callback);`|__Stability: 3 - Legacy and can get only fixes.__<BR>__Can be replaced with `Iterator.from(iterable/iterator).map();`__<BR>This function creates a new iterator with the results of calling a provided function on every element. The iterator parameter is mandatory. The callback parameter is mandatory and has to be a function and called with two parameters: the item and the index of the item (only a counter).
`max(value1[,valueN]);`|__Stability: 4 - Stable.__<BR>Returns the maximum value of the given values. The first value parameter is mandatory and can be any type. Works with any type of values, not only with numbers.
`min(value1[,valueN]);`|__Stability: 4 - Stable.__<BR>Returns the minimum value of the given values. The first value parameter is mandatory and can be any type. Works with any type of values, not only with numbers.
`none(iterator,callback);`|__Stability: 4 - Stable.__<BR>This function whether all elements in the iterator do not pass the test implemented by the provided function. It returns a Boolean value and all of the parameters are mandatory. If the iterator is empty, then the return value is false.
`nth(iterator,index);`|__Stability: 4 - Stable.__<BR>This is an alias of the `item(iterator,index);`.
`partition(iterator,callback);`|__Stability: 4 - Stable.__<BR>Returns an array, with filtered and negative filtered groups of the elements of the original iterator. All of the parameters are mandatory.<BR>__Example:__<BR>`CEL.partition([-5, 2, -9, 7, 34], (e) => (e > 0) );`<BR>-><BR>`[[2, 7, 34], [-5, -9]]]`
`reduce(iterator,callback[,initialvalue]);`|__Stability: 3 - Legacy and can get only fixes.__<BR>__Can be replaced with `Iterator.from(iterable/iterator).reduce();`__<BR>This function executes a reducer function (that you provide) on each element of the iterator, returning in a single output value. The iterator parameter is mandatory. The callback parameter is mandatory and has to be a function. The initialvalue parameter is optional and can be any variable type of the Javascript.
`reject(iterator,callback);`|__Stability: 4 - Stable.__<BR>This is the opposite of the function `filter(iterator,callback);`. The elements to which the given callback gives a false will be yield. The iterator parameter is mandatory. The callback parameter is mandatory and has to be a function and called with two parameters: the item and the index of the item (only a counter).
`reverse(iterator);`|__Stability: 4 - Stable.__<BR>This function returns an iterator with values of the given iterator in reverse order. The iterator parameter is mandatory.
`setDifference(set1,set2);`|__Stability: 3 - Legacy and can get only fixes.__<BR>__Can be replaced with `Set.prototype.difference();`.__<BR>Returns the set of unique values that are in the iterator1, excluding the values that are also in the iterator2. All of the parameters are mandatory and have to be a Set. The return value is a Set.
`setIntersection(set1,set2);`|__Stability: 3 - Legacy and can get only fixes.__<BR>__Can be replaced with `Set.prototype.intersection();`.__<BR>Returns the set of unique values that are in both of the given iterators. All of the parameters are mandatory and have to be a Set. The return value is a Set.
`setSymmetricDifference(set1,set2);`|__Stability: 3 - Legacy and can get only fixes.__<BR>__Can be replaced with `Set.prototype.symmetricDifference();`.__<BR>Returns the set of unique values that are only in one of given iterators. All of the parameters are mandatory and have to be a Set. The return value is a Set.
`setUnion(iterator1[,iteratorN]);`|__Stability: 3 - Legacy and can get only fixes.__<BR>__Can be replaced with `Set.prototype.union();`.__<BR>Returns the set of unique values including all values from the given iterators. The first parameter is mandatory. The return value is a Set.
`size(iterator);`|__Stability: 4 - Stable.__<BR>This function returns the count of the elements in the given iterator. The iterator parameter is mandatory. The return value is an integer.
`shuffle(iterator);`|__Stability: 4 - Stable.__<BR>Returns an array with the values of the given iterator, but in shuffled order.<BR>__Example:__<BR>`CEL.shuffle(["first",4,5,6,7,8,9,"last"]);`<BR>-><BR>`[4,8,5,6,"last",9,7,"first"]`
`slice(iterator[,begin=0[,end=Infinity]]);`|__Stability: 4 - Stable.__<BR>Take a slice of an iterator and yield the elements. The iterator parameter is mandatory. The begin parameter is optional and can be a number and the default value is 0. The end parameter is optional and can be a number and the default value is Infinity.
`some(iterator,callback);`|__Stability: 3 - Legacy and can get only fixes.__<BR>__Can be replaced with `Iterator.from(iterable/iterator).some();`__<BR>This function tests whether at least one element in the array passes the test implemented by the provided function. It returns a Boolean value and all of the parameters are mandatory. If the iterator is empty, then the return value is false.
`sort(iterator[,numbers=false]);`|__Stability: 4 - Stable.__<BR>This function sorts the values of the given iterator. The iterator parameter is mandatory. The numbers paramater is optional (boolean) and set true, if the iterator contains only numbers. The return value is an array.
`tail(iterator);`|__Stability: 4 - Stable.__<BR>Yield the values of an iterator but without the first value. The iterator parameter is mandatory.
`take(iterator[,n=1]);`|__Stability: 3 - Legacy and can get only fixes.__<BR>__Can be replaced with `Iterator.from(iterable/iterator).take();`__<BR>Yield the first N elements of an iterator. The iterator parameter is mandatory. The n parameter is optional and can be an integer. Default parameter value: n = 1
`takeRight(iterator[,n=1]);`|__Stability: 4 - Stable.__<BR>Take the last N elements of an iterator. The iterator parameter is mandatory. The n parameter is optional and can be an integer. Default parameter value: n = 1. The return value is an array.
`takeRightWhile(iterator,callback);`|__Stability: 4 - Stable.__<BR>Yield the elements from the end of an iterator while the callback (filter) function returns true. The callback function will be called with the actual element of the iterator. The iterator parameter is mandatory. The callback parameter is mandatory and has to be a function.
`unique(iterator[, resolver]);`|__Stability: 4 - Stable.__<BR>This function returns a new iterator with unique values.<BR>The iterator parameter is mandatory.<BR>The resolver parameter can be an object field name or function.<BR>__Examles__<BR>Without resolver:<BR>`JSON.stringify( CEL.unique( [1, 2, 2, 3] ) );`<BR>-><BR>`'[1,2,3]'`<BR>With resolver:<BR>`let array = [`<BR>`  { "name": "Picard", "rank": "captain" },`<BR>`  { "name": "Riker", "rank": "captain" },`<BR>`  { "name": "Data", "rank": "commander" },`<BR>`  { "name": "Troi", "rank": "commander" }`<BR>`];`<BR>Key resolver<BR>`JSON.stringify( CEL.unique(array, "rank") );`<BR>-><BR>`'[{"name":"Picard","rank":"captain"},{"name":"Data","rank":"commander"}]'`<BR>Function resolver<BR>`JSON.stringify( CEL.unique(array, (v) => v.rank) );`<BR>-><BR>`'[{"name":"Picard","rank":"captain"},{"name":"Data","rank":"commander"}]'`
`takeWhile(iterator,callback);`|__Stability: 4 - Stable.__<BR>Yield the elements of an iterator while the callback (filter) function returns true. The callback function will be called with the actual element of the iterator. The iterator parameter is mandatory. The callback parameter is mandatory and has to be a function.
`unzip(iterator);`|__Stability: 4 - Stable.__<BR>Returns the array of arrays of unpaired values. In the modern browsers compatible with finite iterators.<BR>__Example:__<BR>`CEL.unzip([ [ "a", 3 ], [ "b", 4 ], [ "c", 5 ], [ "d", 6 ] ]);`<BR>-><BR>`Array (2) [ ["a","b","c","d"], [3,4,5,6] ]`
`withOut(iterator,filterIterator);`|__Stability: 4 - Stable.__<BR>Returns an array with the values of the first iterator, but without the values of the filterIterator. All of the parameters are mandatory.<BR>__Example:__<BR>`CEL.withOut(["a","b","c","d"], ["b","d"]);`<BR>-><BR>`["a","c"]`
`zip(iterator1[,iteratorN]);`|__Stability: 4 - Stable.__<BR>Returns the array of paired values of the given iterators. In the modern browsers compatible with finite iterators. The return value is an Array.<BR>__Example:__<BR>`CEL.zip(["a","b","c","d"], [3,4,5,6,7,8,9]);`<BR>-><BR>`Array (4) [ [ "a", 3 ], [ "b", 4 ], [ "c", 5 ], [ "d", 6 ] ]`
`zipObj(iterator1, iterator2);`|__Stability: 4 - Stable.__<BR>Returns an object, whose properties are from the first iterator and its values are from the second iterator. The two iterators must be the same size. In the modern browsers compatible with finite iterators.<BR>__Example:__<BR>`zipObj(["a","b","c"],[1,2,3])`<BR>-><BR>`{"a":1,"b":2,"c":3}`

### Abstract API

The Ecmascript abstract functions are available in the [Zephyr library](https://github.com/Serrin/Zephyr).

### Math API

Name|Description
----|-----------
`add(value1,value2);`|__Stability: 4 - Stable.__<BR>Performs addition type safely. Works for both `number` and `bigint` values. All of the parameter is mandatory and can be both number or both bigint. The return value is `number` or `bigint`.
`avg(value1[,valueN]);`|__Stability: 4 - Stable.__<BR>This function returns the average value from the parameter values.
`clamp(value,min,max);`|__Stability: 4 - Stable.__<BR>If the given value is between the min and max values, then this function returns the value. If smaller then the min value, then the return value is the min. If greater then the max value, then the return value is the max. All of the parameters are mandatory and can be `number` or `bigint` and if not these types, then will be converted to number. The return value is `number` or `bigint` or throw a rangeerror, if the parameters are invalid.
`div(value1,value2);`|__Stability: 4 - Stable.__<BR>Performs integer division type safely. Works for both `number` and `bigint` values. All of the parameter is mandatory and can be both number or both bigint. The return value is `number` or `bigint`.
`divMod(value1,value2);`|__Stability: 4 - Stable.__<BR>Performs integer division type safely. Works for both `number` and `bigint` values. All of the parameter is mandatory and can be both number or both bigint. The return value is `number` or `bigint`.
`inRange(value,min,max);`|__Stability: 4 - Stable.__<BR>This function determines whether the provided value is between the min and max values. All of the parameters are mandatory and have to be number. The return value is boolean.
`isEven(value);`|__Stability: 4 - Stable.__<BR>This function determines whether the provided value is an even number. The return value is boolean.
`isBigInt64(value);`|__Stability: 4 - Stable.__<BR>This function determines whether the provided value is a BigInt (Int64) value between -2^63 and 2^63 - 1. The return value is boolean.
`isBigUInt64(value);`|__Stability: 4 - Stable.__<BR>This function determines whether the provided value is a BigInt (Int64) value between 0 and 2^64 - 1. The return value is boolean.
`isFloat(value);`|__Stability: 4 - Stable.__<BR>This function determines whether the provided value is a float number. The return value is boolean.
`isInt8(value);`|__Stability: 4 - Stable.__<BR>This function determines whether the provided value is an integer between -128 and 127. The return value is boolean.
`isInt16(value);`|__Stability: 4 - Stable.__<BR>This function determines whether the provided value is an integer between -32768 and 32767. The return value is boolean.
`isInt32(value);`|__Stability: 4 - Stable.__<BR>This function determines whether the provided value is an integer between -2147483648 and 2147483647. The return value is boolean.
`isOdd(value);`|__Stability: 4 - Stable.__<BR>This function determines whether the provided value is an odd number. The return value is boolean.
`isUInt8(value);`|__Stability: 4 - Stable.__<BR>This function determines whether the provided value is an integer between 0 and 255. The return value is boolean.
`isUInt16(value);`|__Stability: 4 - Stable.__<BR>This function determines whether the provided value is an integer between 0 and 65535. The return value is boolean.
`isUInt32(value);`|__Stability: 4 - Stable.__<BR>This function determines whether the provided value is an integer between 0 and 4294967295. The return value is boolean.
`isFloat16(value);`|__Stability: 4 - Stable.__<BR>This function determines whether the provided value is a number between -65504 and 65504. The return value is boolean.
`minmax(value,min,max);`|__Stability: 4 - Stable.__<BR>This is an alias of the `clamp(value,min,max);`.
`mod(value1,value2);`|__Stability: 4 - Stable.__<BR>Computes the integer remainder (modulus) type safely. Works for both `number` and `bigint` values. All of the parameter is mandatory and can be both number or both bigint. The return value is `number` or `bigint`.
`mul(value1,value2);`|__Stability: 4 - Stable.__<BR>Performs multiplication type safely. Works for both `number` and `bigint` values. All of the parameter is mandatory and can be both number or both bigint. The return value is `number` or `bigint`.
`product(value1[,valueN]);`|__Stability: 4 - Stable.__<BR>This function returns the product value from the parameter values.
`randomFloat([max]);`|__Stability: 4 - Stable.__<BR>Get a random float number value within 0 and max value. Without parameter the maximum value is 100.
`randomFloat(min,max);`|__Stability: 4 - Stable.__<BR>Get a random float number value within min and max value.
`randomInt([max]);`|__Stability: 4 - Stable.__<BR>Get a random integer number value within 0 and max value. Without parameter the maximum value is 100.
`randomInt(min,max);`|__Stability: 4 - Stable.__<BR>Get a random integer number value within min and max value.
`signbit(value);`|__Stability: 4 - Stable.__<BR>This function is based on this proposal:<BR>[https://github.com/tc39/proposal-Math.signbit](https://github.com/tc39/proposal-Math.signbit)<BR>`Returns whether the sign bit of x is set.`<BR>`If n is NaN, the result is false.`<BR>`If n is -0, the result is true.`<BR>`If n is negative, the result is true.`<BR>`Otherwise, the result is false.`<BR>The value parameter is mandatory.
`sub(value1,value2);`|__Stability: 4 - Stable.__<BR>Performs subtraction type safely. Works for both `number` and `bigint` values. All of the parameter is mandatory and can be both number or both bigint. The return value is `number` or `bigint`. `bigint` values.
`sum(value1>[,valueN]);`|__Stability: 4 - Stable.__<BR>This function returns the sum value from the parameter values.
`toBigInt64(value);`|__Stability: 4 - Stable.__<BR>This function clamps ("minmax") the given value to BigInt (Int64) value (-2^63 to 2^63 - 1).
`toBigUInt64(value);`|__Stability: 4 - Stable.__<BR>This function clamps ("minmax") the given value to unsigned BigInt (Int64) value (0 to 2^64 - 1).
`toFloat16(value);`|__Stability: 4 - Stable.__<BR>This function clamps ("minmax") the given value to float 16 value (-65504 to 65504).
`toFloat32(value);`|__Stability: 4 - Stable.__<BR>This function clamps ("minmax") the given value to float 32 value (-3.4e38 to 3.4e38).
`toInt8(value);`|__Stability: 4 - Stable.__<BR>This function clamps ("minmax") the given value to integer 8 value (-127 to 128).
`toInt16(value);`|__Stability: 4 - Stable.__<BR>This function clamps ("minmax") the given value to integer 16 value (-32768 to 32767).
`toInt32(value);`|__Stability: 4 - Stable.__<BR>This function clamps ("minmax") the given value to integer 32 value (-2147483648 to 2147483647).
`toInteger(value);`|__Stability: 4 - Stable.__<BR>This function always converts the provided value to an integer. If the value cannot be converted to an integer, then the return value is 0.
`toIntegerOrInfinity(value);`|__Stability: 4 - Stable.__<BR>This function always converts the provided value to an integer or Infitiy or -Infinity. If the value cannot be converted to an integer, then the return value is 0.
`toUInt8(value);`|__Stability: 4 - Stable.__<BR>This function clamps ("minmax") the given value to unsigned integer 8 value (0 to 255).
`toUInt16(value);`|__Stability: 4 - Stable.__<BR>This function clamps ("minmax") the given value to unsigned integer 16 value (0 to 65535).
`toUInt32(value);`|__Stability: 4 - Stable.__<BR>This function clamps ("minmax") the given value to unsigned integer 32 value (0 to 4294967295).

### Polyfills

Name|Description
----|-----------
`Array.fromAsync();`|The Array.fromAsync() static method creates a new, shallow-copied Array instance from an async iterable, iterable, or array-like object. For more information please read the [MDN Article](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/fromAsync)!
`Array.prototype.toReversed();`|The toReversed() method of an Array instance is the copying counterpart of the reverse() method. It returns a new array with the elements in reversed order. For more information please read the [MDN Article](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/toReversed)!
`Array.prototype.toSorted();`|The toSorted() method of an Array instance is the copying version of the sort() method. It returns a new array with the elements sorted in ascending order. For more information please read the [MDN Article](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/toSorted)!
`Array.prototype.toSpliced();`|The toSpliced() method of an Array instance is the copying version of the splice() method. It returns a new array with some elements removed and/or replaced at a given index. For more information please read the [MDN Article](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/toSpliced)!
`Array.prototype.with();`|The with() method of an Array instance is the copying version of using the bracket notation to change the value of a given index. It returns a new array with the element at the given index replaced with the given value. For more information please read the [MDN Article](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/with)!
`crypto.randomUUID();`|The randomUUID() method of the Crypto interface is used to generate a v4 UUID using a cryptographically secure random number generator. For more information please read the [MDN Article](https://developer.mozilla.org/en-US/docs/Web/API/Crypto/randomUUID)!
`Error.isError();`|The Error.isError() static method determines whether the passed value is an Error or DOMException. For more information please read the [MDN Article](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error/isError)!
`globalThis;`|The globalThis global property contains the global `this`</code>` value, which is usually akin to the global object. For more information please read the [MDN Article](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/globalThis)!
`Map.groupBy();`|The Map.groupBy() static method groups the elements of a given iterable using the values returned by a provided callback function. The final returned Map uses the unique values from the test function as keys, which can be used to get the array of elements in each group. For more information please read the [MDN Article](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/groupBy)!
`Math.sumPrecise();`|The Math.sumPrecise() static method takes an iterable of numbers and returns the sum of them. It is more precise than summing them up in a loop, because it avoids floating point precision loss in intermediate results. For more information please read the [MDN Article](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/sumPrecise)!
`Object.groupBy();`|The Object.groupBy() static method groups the elements of a given iterable according to the string values returned by a provided callback function. The returned object has separate properties for each group, containing arrays with the elements in the group. For more information please read the [MDN Article](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/groupBy)!
`Object.hasOwn();`|The Object.hasOwn() static method returns true if the specified object has the indicated property as its own property. If the property is inherited, or does not exist, the method returns false. For more information please read the [MDN Article](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwn)!
`TypedArray.prototype.toReversed();`|The toReversed() method is the copying counterpart of the reverse() method. It returns a new array with the elements in reversed order. This method has the same algorithm as Array.prototype.reverse(). For more information please read the [MDN Article](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/toReversed)!
`TypedArray.prototype.toSorted();`|The toSorted() method is the copying version of the sort() method. It returns a new array with the elements sorted in ascending order. This method has the same algorithm as Array.prototype.toSorted(), except that it sorts the values numerically instead of as strings by default. For more information please read the [MDN Article](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/toSorted)!
`TypedArray.prototype.with();`|The with() method is the copying version of using the bracket notation to change the value of a given index. It returns a new array with the element at the given index replaced with the given value. This method has the same algorithm as Array.prototype.with(). For more information please read the [MDN Article](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/with)!
`globalThis.AsyncFunction();`|The AsyncFunction constructor creates a new async function object. In JavaScript, every asynchronous function is actually an AsyncFunction object. Note that AsyncFunction is not a global object, but in the Celestra this is available in the `globalThis` object. For more information please read the [MDN Article](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/AsyncFunction)!
`globalthis.AsyncGeneratorFunction();`|The AsyncGeneratorFunction() constructor creates AsyncGeneratorFunction objects. Note that AsyncGeneratorFunction is not a global object, but in the Celestra this is available in the `globalThis` object. For more information please read the [MDN Article](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/AsyncGeneratorFunction/AsyncGeneratorFunction)!
`globalThis.GeneratorFunction();`|The GeneratorFunction constructor creates a new generator function object. In JavaScript every generator function is actually a GeneratorFunction object. Note that GeneratorFunction is not a global object, but in the Celestra this is available in the `globalThis` object. For more information please read the [MDN Article](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/GeneratorFunction)!
REMOVED polyfills in v3.1.0|`Array.from();`<BR>`Array.of();`<BR>`Array.prototype.fill();`<BR>`Array.prototype.find();`<BR>`Array.prototype.findIndex();`<BR>`Object.create();`<BR>`String.prototype.startsWith();`<BR>`String.prototype.endsWith();`<BR>`Array.prototype.copyWithin();`<BR>`String.fromCodePoint();`<BR>`String.prototype.codePointAt();`<BR>`Number.EPSILON;`<BR>`Number.isNaN();`<BR>`isNaN();`<BR>`Number.isInteger();`<BR>`Number.isFinite();`<BR>`Number.isSafeInteger();`<BR>`Number.parseInt();`<BR>`Number.parseFloat();`<BR>`Math.acosh();`<BR>`Math.asinh();`<BR>`Math.atanh();`<BR>`Math.cbrt();`<BR>`Math.clz32();`<BR>`Math.cosh();`<BR>`Math.expm1();`<BR>`Math.fround();`<BR>`Math.hypot();`<BR>`Math.imul();`<BR>`Math.log1p();`<BR>`Math.log10();`<BR>`Math.log2();`<BR>`Math.sign();`<BR>`Math.sinh();`<BR>`Math.tanh();`<BR>`Math.trunc();`
REMOVED polyfills in v3.8.0|`Array.prototype.values();`<BR>`Array.prototype.includes();`<BR>`String.prototype.includes();`<BR>`String.prototype.repeat();`<BR>`String.prototype[Symbol.iterator]();`<BR>`Object.assign();`<BR>`Object.entries();`<BR>`Object.values();`<BR>`Object.getOwnPropertyDescriptors();`<BR>`RegExp.prototype.flags;`<BR>`NodeList.prototype.forEach();`<BR>`ChildNode.after();`<BR>`ChildNode.before();`<BR>`ChildNode.remove();`<BR>`ChildNode.replaceWith();`<BR>`ParentNode.append();`<BR>`ParentNode.prepend();`<BR>`Element.prototype.matches();`<BR>`Element.prototype.closest();`<BR>`Element.prototype.toggleAttribute();`<BR>`Element.prototype.getAttributeNames();`<BR>`window.screenLeft;`<BR>`window.screenTop;`
REMOVED polyfills in v5.6.0|`Array.prototype.at();`<BR>`Array.prototype.findLast();`<BR>`Array.prototype.findLastIndex();`<BR>`Array.prototype.flat();`<BR>`Array.prototype.flatMap();`<BR>`Number.MIN_SAFE_INTEGER;`<BR>`Number.MAX_SAFE_INTEGER;`<BR>`Object.fromEntries();`<BR>`Object.is();`<BR>`String.prototype.at();`<BR>`String.prototype.matchAll();`<BR>`String.prototype.padStart();`<BR>`String.prototype.padEnd();`<BR>`String.prototype.replaceAll();`<BR>`String.prototype.trimStart();`<BR>`String.prototype.trimLeft();`<BR>`String.prototype.trimEnd();`<BR>`String.prototype.trimRight();`<BR>`Typedarray.prototype.at();`<BR>`TypedArray.prototype.findLast();`<BR>`TypedArray.prototype.findLastIndex();`
REMOVED polyfills in v5.9.0|`BigInt.prototype.toJSON();`

-----

## Samples

There are code samples in the __celestra.html__ and __unittest.js__.

-----

## License

[https://opensource.org/licenses/MIT](https://opensource.org/licenses/MIT)

MIT License

SPDX short identifier: MIT

Copyright (c) 2017 Ferenc Czigler

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
