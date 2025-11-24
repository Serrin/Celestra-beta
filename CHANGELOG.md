
# Celestra version history

## Celestra v6.4.0

1. Documentation, pdf and code fixes.
2. Many fixes in the __Collections API__
3. __Math API__ changes:

- Add these functions: `add();`, `sub();`, `mul();`, `div();`, `divMod();`
- Fix the function `mod();`
- Remove the function `rem();`

## Celestra v6.3.0

1. Documentation, pdf and code fixes.
2. Remove the __Legacy AJAX API__
3. Remove the __Legacy Assertion API__
4. Remove these AJAX test files: __unittest-data.json__, __unittest-data.txt__, __unittest-data.xml__
5. Add these new methods in the __js-cheatsheet.odt__ and __js-cheatsheet.pdf__: `Map#getOrInsert();`, `Map#getOrInsertComputed();`, `WeakMap#getOrInsert();`, `WeakMap#getOrInsertComputed();`

## Celestra v6.2.0

1. Documentation, pdf and code fixes.
2. Deprecate (_Stability: 1_) the __Legacy AJAX API__
3. Deprecate (_Stability: 1_) the __Legacy Assertion API__
4. Remove the __Legacy Assertion API__ from the __celestra-cheatsheet.odt__ and __celestra-cheatsheet.pdf__
5. Remove the __Assert Plugin__ and the files of the plugin.
6. Remove this deprecated function: `isClass();`
7. Add the __Minimal Assertion API__ (only one function: `assert(value: unknown [, message | error]): thrown error`) - copy from the __assert.js__ library.

## Celestra v6.1.2

1. Documentation, pdf and code fixes.
2. Rename the __AJAX and CORS API__ to __Legacy AJAX API__
3. Rename the __Assertion API__ to __Legacy Assertion API__
4. Set _Stability 3_ for the functions of the __Legacy Assertion API__, because the first stable version of [assert.js](https://github.com/Serrin/assert.js) library has been published.
5. Add these functions: `mod();`, `rem();`

## Celestra v6.1.1

1. Documentation, pdf and code fixes.
2. Deprecate this function (_stability: 1_): `isClass();`
3. Add these functions:

````javascript
eq();
gt();
gte();
isNonNullable();
isNonNullablePrimitive();
isTypedCollection();
lt();
lte();
````

## Celestra v6.1.0 Sulaco

Please read in the documentation about the new files and import methods for the browser edition!

1. Documentation, pdf and code fixes.
2. The __celestra.dev.js__ has been replaced with the __celestra.browser.ts__.
3. The __celestra.min.js__ has been replaced with the __celestra.browser.js__.
4. The __celestra.node.mjs__ has been remained and added the __celestra.node.mts__.
5. Rename these functions:

Old name|New name
--------|---------
`isNil();`|`isNullish();`
`assertIsNil();`|`assertIsNullish();`
`assertIsNotNil();`|`assertIsNotNullish();`
`type();`|`typeOf();`

6. Remove these functions:

````javascript
celestra.noConflict();
assertInstanceOf();
assertNotInstanceOf();
assertNotTypeOf();
assertTypeOf();
classof();
contains();
getType();
isSameClass();
````

## Celestra v6.0.5

1. Documentation, pdf and code fixes.
2. Refactoring the library JS code to rewrite in TypeScript in the next milestone.
3. Add these functions:

````javascript
castArray();
compact();
toSafeString();
````

## Celestra v6.0.4

1. Documentation, pdf and code fixes.
2. Add a new file __jsconfig.json__ and JSDOC comments for error checking in VSC
3. Small fixes in many functions
4. Deprecate this function: `contains();`
5. Replace this function with a new version: `includes();`
6. Add a `v4` parameter in the function `randomUUIDv7();`
7. Add this function: `isAsyncIterable();`

## Celestra v6.0.3

1. Documentation, pdf and code fixes.
2. Add left sidebar with function index in the __celestra.html__.
3. Add these functions: `assertIs();`, `assertIsNot();`, `is();`
4. Deprecate _(stability 1)_ these functions:

````javascript
assertInstanceOf();
assertNotInstanceOf();
assertNotTypeOf();
assertTypeOf();
classof();
getType();
isSameClass();
````

## Celestra v6.0.2

1. Documentation, pdf and code fixes.

## Celestra v6.0.1

1. Documentation, pdf and code fixes.
2. Add these FP functions: `assoc();`, `compose();`, `curry();`, `omit();`, `once();`, `pick();`, `pipe();`, `tap();`
3. Rename these files:

Old name | New name
---------|-----------
tesdata.json | unittest-data.json
testdata.txt| unittest-data.txt
testdata.xml | unittest-data.xml
testmodule1.css | unittest-module1.css
testmodule1.js| unittest-module1.js
testmodule2.css | unittest-module2.css
testmodule2.js| unittest-module2.js

## Celestra v6.0.0 David

1. Documentation, pdf and code fixes.
2. Remove the documentation of the functions, which have been marked with __Stability: 0 - Removed in v5.8.0__.
3. Remove the documentation of the functions, which have been marked with __Stability: 0 - Removed in v5.9.0__.
4. Same API as in v5.9.0, but add __Node.js and Deno support__ and these files:

- __celestra.node.mjs__
- __unittest.node.cmd__
- __unittest.node.js__

## Celestra v5.9.0 Final five

1. Documentation, pdf and code fixes.
2. Add [StructuredClone();](https://developer.mozilla.org/en-US/docs/Web/API/Window/structuredClone) in the __celestra-cheatsheet.odt__ and __celestra-cheatsheet.pdf__.
3. Replace the use of `window` with `globalThis`.
4. Add this polyfill: `globalThis.AsyncGeneratorFunction();`
5. Move the polyfill `BigInt.prototype.toJSON();` to __celestra-polyfills.dev.js__ and __celestra-polyfills.min.js__.
6. Remove these functions:

````javascript
arrayCreate();
arrayDifference();
arrayIntersection();
arraySymmetricDifference();
arrayUnion();
entries(iterator); // only an alias
filterIn();
forIn();
isConstructorFN(); // only an alias
javaHash();
popIn();
sleep(); // only an alias
````

## Celestra v5.8.1

1. Documentation, pdf and code fixes.
2. Fix the assert functions with the error parameter.
3. Deprecate (_stability: 1_) this polyfill: `BigInt.prototype.toJSON();`
4. Add these functions: `asyncConstant();`, `asyncF();`, `asyncIdentity();`, `asyncNoop();`, `asyncT();`
5. Deprecate (_stability: 1_) these functions:

````javascript
arrayCreate();
arrayDifference();
arrayIntersection();
arraySymmetricDifference();
arrayUnion();
entries(iterator); // only an alias
filterIn();
forIn();
isConstructorFN(); // only an alias
javaHash();
popIn();
sleep(); // only an alias
````

## Celestra v5.8.0 Uhura

1. Documentation, pdf and code fixes.
2. Add these new files: __celestra-assert-plugin.odt__ and __celestra-assert-plugin.pdf__
3. Add these assert functions and update Assert plugin:

````javascript
assertDoesNotMatch();
assertFail();
assertInstanceOf();
assertIsNil();
assertIsNotNil();
assertMatch();
assertNotInstanceOf();
assertNotTypeOf();
assertThrows();
assertTypeOf();
````

4. Remove these functions:

````javascript
isArrayBuffer();
isBigInt();
isBoolean();
isDataView();
isDate();
isEmptyArray();
isEmptyIterator();
isEmptyMap();
isEmptyObject();
isEmptySet();
isFalsy();
isMap();
isNullOrUndefined();
isNumber();
isPromise();
isSameArray();
isSameIterator();
isSameMap();
isSameObject();
isSameSet();
isSet();
isString();
isSymbol();
isTruthy();
isWeakMap();
isWeakSet();
arrayUnique();
assertType();

createDataProperty();
createDataPropertyOrThrow();
createMethodProperty();
createMethodPropertyOrThrow();
deletePropertyOrThrow();
getIn();
getInV();
hasIn();
setIn();
isLessThan();
isSameValue();
isSameValueNonNumber();
isSameValueZero();
requireObjectCoercible();
toArray();
toPrimitive();

_apply();
_apply();
_call();
_forEach();
_map();
_slice();
````

## Celestra v5.7.4

1. Documentation, pdf and code fixes.
2. __Celestra Unit Tester (CUT) v1.30.0:__ Add this function: `isError();`
3. Replace the __Demo plugin__ with the __Assert plugin__.
4. Add support of `DataView` and `ArrayBuffer` in these functions:

````javascript
assertDeepEqual();
assertDeepStrictEqual();
assertNotDeepEqual();
assertNotDeepStrictEqual();
isDeepStrictEqual();
````

## Celestra v5.7.3

1. Documentation and pdf fixes
2. Rename the __Type checking API__ to __Type API__
3. Replace the Celestra object with the ES6 simple object
4. Deprecate (__Stability 1 - will be removed__) this function: `toArray();`
5. Add these functions: `assertType();`, `assertNotType();`, `isCoercedObject();`, `isSameInstance();`
6. Deprecate (__Stability 1 - will be removed__) these abstract functions, because these are available in the new Zephyr (EcmaScript abstract) library:

````javascript
createDataProperty();
createDataPropertyOrThrow();
createMethodProperty();
createMethodPropertyOrThrow();
deletePropertyOrThrow();
getIn();
getInV();
hasIn();
setIn();
isLessThan();
isSameValue();
isSameValueNonNumber();
isSameValueZero();
requireObjectCoercible();
toPrimitive();
````

## Celestra v5.7.2

1. Documentation, pdf and code fixes.
2. Add new functions: `assertDeepEqual();`, `assertDeepStrictEqual();`, `assertNotDeepEqual();`, `assertNotDeepStrictEqual();`, `isDeepStrictEqual();`, `isEmptyValue();`
3. Set __Stability 1__ (will be removed in the next milestone) for this type checking functions:

````javascript
isTruthy();
isFalsy();
isSameObject();
isSameArray();
isSameMap();
isSameSet();
isSameIterator();
isDataView();
isEmptyObject();
isEmptyArray();
isEmptyMap();
isEmptySet();
isEmptyIterator();
isString();
isNumber();
isBoolean();
isPromise();
isSymbol();
isMap();
isSet();
isWeakMap();
isWeakSet();
isDate();
isBigInt();
isArrayBuffer();
````

4. Set __Stability 4__ (stable) for this type checking functions:

````javascript
isObject();
isRegexp();
isFunction();
isCallable();
isProxy();
isAsyncGeneratorFn();
isConstructorFn();
isClass();
isPlainObject();
isChar();
isFloat();
isNumeric();
isArraylike();
isNull();
isUndefined();
isNullOrUndefined();
isNil();
isPrimitive();
isElement();
isIterable();
isTypedArray();
isGeneratorFn();
isAsyncFn();
isIterator();
````

## Celestra v5.7.1

1. Documentation, pdf and code fixes.
2. Add these functions: `isProxy();` and `isSameClass();`
3. __Celestra Unit Tester (CUT) v0.8.29:__ Add this function: `getHumanReadableJSON();` and display the global error fields on the page.

## Celestra v5.7.0 Nostromo

1. Documentation, pdf and code fixes.
2. __Change the ESM edition:__ The default export will be the celestra object and the all of the functions will be exported.
3. Deprecate this function (__Stability 1__): `arrayUnique();`
4. Add this function: `unique();`
5. Remove these functions (__Stability 0__): `inherit();`, `isError();`, `group();`
6. Set __Stability 3__ of these functions:

````javascript
isSuperset();
arrayDifference();
arrayIntersection();
arraySymmetricDifference();
arrayUnion();
setDifference();
setIntersection();
setSymmetricDifference();
setUnion();
````

7. Replace the old assertion functions with the new __Assertion API__:

Old function|New function
------------|------------
`assertTrue(<message>[,value]);`|`assert(<value>[,message="value"]);` and `assertTrue(<value>[,message="value"]);`
`assertFalse(<message>[,value]);`|`assertFalse(<value>[,message="value"]);`
`assertEq(<message>,<value1>,<value2>[,strict=true]);`|`assertEqual(<value1>,<value2>[,message="values"]);` (_Loose equality + NaN equality_)and `assertStrictEqual(<value1>,<value2>[,message="values"]);` (_SameValue equality_)
`assertNotEq(<message>,<value1>,<value2>[,strict=true]);`|`assertNotEqual(<value1>,<value2>[,message="values"]);` (_Loose equality + NaN equality_) and`assertNotStrictEqual(<value1>,<value2>[,message="values"]);` (_SameValue equality_)

8. __Celestra Unit Tester (CUT) v0.8.28:__

- Add `token1` - `token10` variables instead of many testvariables of testcases.
- Add these functions:

````javascript
CUT.concat()
CUT.join();
CUT.logCode();
CUT.take();
````

## Celestra v5.6.6

1. Documentation, pdf and code fixes.
2. __Celestra Unit Tester (CUT) v0.8.27:__ Only fixes.
3. Add the "_Javascript Equality comparisons and sameness_" page in the __js-cheatsheet.odt__ and __js-cheatsheet.odt__
4. Add these functions:

````javascript
domClear();
deletePropertyOrThrow();
isLessThan();
isSameType();
requireObjectCoercible();
````

## Celestra v5.6.5

1. Documentation, pdf and code fixes.
2. __Celestra Unit Tester (CUT) v0.8.26:__ The global try-catch will add a failed line instead of an alert.
3. Replace "Unary plus" (+x) number conversions with the Number(); function to handle the BigInt values.
4. Deprecate the function `inherit();`
5. Add a new polyfill: `Math.sumPrecise();`
6. Add these functions: `getType();`, `isClass();`
7. Add stabilities in the __celestra.html__ and __README.md__:

````javascript
0 - Removed.
1 - Deprecated and will be removed.
2 - Deprecated.
3 - Not deprecated, but can get only fixes.
4 - Stable.
````

8. Add these functions:

````javascript
createDataPropertyOrThrow();
createMethodPropertyOrThrow();
createPolyfillMethod();
createPolyfillProperty();
deleteOwnProperty();
isLength(); -> alias of isIndex();
toLength(); -> alias of toIndex();
toIntegerOrInfinity();
toPrimitive();
toPrimitiveValue();
````

9. Replace these functions with a new version:

````javascript
clamp();
concat(); (fix to handle non-iterable items)
flat();   (fix to handle non-iterable items)
inRange();
minmax();
toArray();
toInteger();
toObject();
````

## Celestra v5.6.4

1. Documentation, pdf and code fixes.
2. Add MDN links at the polyfills in the __celestra-cheatsheet.odt__ and __celestra-cheatsheet.pdf__
3. Add page number in the __celestra-cheatsheet.odt__ and __celestra-cheatsheet.pdf__
4. Add a new polyfill: `Error.isError();`
5. Deprecate this function: `isError();`
6. Replace these functions with a new version:

````javascript
forIn();
getFullscreen();
isArrayBuffer();
isDataView();
isDate();
isEmptyMap();
isEmptySet();
isError();
isIterator();
isMap();
isPromise();
isRegexp();
isSameMap();
isSameSet();
isSet();
isTypedArray();
isWeakMap();
isWeakSet();
noop();
strFromCodePoints();
````

## Celestra v5.6.3

1. Documentation, pdf and code fixes.
2. Remove the __btc.app.html__
3. Fix the version number in the __celestra.min.js__

## Celestra v5.6.2

1. Documentation, pdf and code fixes.
2. Add these functions: `isFloat16();`, `toFloat16();`, `count();`, `randomUUIDv7();`
3. Add new contents in the __js-cheatsheet.odt__ and __js-cheatsheet.pdf__: new Set methods, Float16Array, new Iterator methods
4. Deprecate these functions:

- `arrayUnion();`
- `arrayIntersection();`
- `arrayDifference();`
- `arraySymmetricDifference();`
- `setUnion();`
- `setIntersection();`
- `setDifference();`
- `setSymmetricDifference();`
- `isSuperset();`

## Celestra v5.6.1

1. Fixed many errors in the documentation and pdf.

## Celestra v5.6.0 Razorback

1. Documentation, pdf and code fixes.
2. Remove these aliases: `domToTop();`, `domToBottom();`
3. Remove these functions: `randomString();`, `randomID();`
4. Deprecate this function: `group();`
5. Add the 4th page in the __celestra-cheatsheet.odt__ and __celestra-cheatsheet.pdf__ with the removed polyfills.
6. Add these polyfills: `Object.groupBy();`, `Map.groupBy();`
7. Move these polyfills in the __celestra-polyfills.dev.js__ and __celestra-polyfills.min.js__

````javascript
Array.prototype.at();
Array.prototype.findLast();
Array.prototype.findLastIndex();
Array.prototype.flat();
Array.prototype.flatMap();
Array.prototype.group();
Array.prototype.groupToMap();

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
````

## Celestra v5.5.5

1. Documentation, pdf and code fixes.
2. Add a polyfill: `Array.fromAsync);`
3. Add an alias of the function `clamp();`: `minmax();`

## Celestra v5.5.4

1. Documentation, pdf and code fixes.
2. Add a new section: __String API__
3. Add these alphabets: `BASE16`, `BASE32`, `BASE36`, `BASE58`, `BASE62`, `WORDSAFEALPHABET`
4. Add these functions: `strSplice();`, `domScrollToElement();`, `timestampID();`
5. Replace the function `strAt(<string>,<index: integer>): string` to `strAt(<string>,<index: integer>[,newChar: string]): string`
6. Deprecate this function: `randomID();`
7. Rename these functions and add an alias with the old name: `domToTop();` -> `domScrollToTop();`, `domToBottom();` -> `domScrollToBottom();
8. Rename these sections:

Old name|New name
--------|--------
DOM|DOM API
Type checking|Type checking API
Collections|Collections API
Math functions|Math API
Abstract|Abstract API
Cookie|Cookie API
AJAX and CORS|AJAX and CORS API

## Celestra v5.5.3

1. Documentation, pdf and code fixes.
2. Add these functions: `domToTop();`, `domToBottom();`
3. Add these polyfills:

````javascript
Array.prototype.toReversed();
Array.prototype.toSorted();
Array.prototype.toSpliced();
Array.prototype.with();
TypedArray.prototype.toReversed();
TypedArray.prototype.toSorted();
TypedArray.prototype.with();
````

## Celestra v5.5.2

1. Documentation, pdf and code fixes.
2. Add Map and Set objects in the __js-cheatsheet.odt__ and __js-cheatsheet.pdf__.
3. Deprecate the function `randomString([length[,specialCharactersEnabled=false]]);`
4. Add a new function: `nanoid([size=21[,alphabet="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_-"]]);`
5. __Celestra Unit Tester (CUT) v0.8.25:__ UP & DOWN buttons have been removed, because these caused errors on the test server.
6. Rename these files:

Old name|New name
--------|--------
__celestra-demoPlugin.html__|__celestra-demo-plugin.html__
__celestra-demoPlugin.dev.js__|__celestra-demo-plugin.dev.js__
__celestra-demoPlugin.min.js__|__celestra-demo-plugin.min.js__
__history.md__|__CHANGELOG.md__

## Celestra v5.5.1

1. Documentation, pdf and code fixes.

## Celestra v5.5.0

1. Documentation, pdf and code fixes.
2. Remove the Math plugin and move the functions in the `celestra.dev.js`, `celestra.min.js` and `celestra.esm.js`
3. Add a demo plugin with these files: `celestra-demoPlugin.html`, `celestra-demoPlugin.dev.js` and `celestra-demoPlugin.min.js`
4. Remove these aliases:

Alias|Function
-----|--------
getType();|classof();
toFunction();|unBind();
groupBy();|group();

## Celestra v5.4.4

1. Documentation, pdf and code fixes.
2. Rename the function `groupBy();` to `group();` and add an alias with the old name.
3. Rename these polyfills: `Array.prototype.groupBy();` -> `Array.prototype.group();`, `Array.prototype.groupByToMap();` -> `Array.prototype.groupToMap();`
4. Fix the description of these polyfills with MDN links:

````javascript
Array.prototype.findLast();
Array.prototype.findLastIndex();
TypedArray.prototype.findLast();
TypedArray.prototype.findLastIndex();
````

## Celestra v5.4.3

1. Documentation, pdf and code fixes.
2. Add the `Reflect object` in the __js-cheatsheet.odt__ and __js-cheatsheet.pdf__
3. Add an alias: `sleep);` -> `delay();`
4. Revert these functions to old versions -> use the `for of` instead of the array conversion:

````javascript
includes();
contains();
find();
findLast();
every();
some();
none();
join();
````

## Celestra v5.4.2

1. Documentation, pdf and code fixes.
2. Delete these files: __celestra-math.odt__ and __celestra-math.pdf__
3. __Celestra Unit Tester (CUT) v0.8.24:__ CSS and text changes

## Celestra v5.4.1

1. Documentation,pdf and code fixes.
2. Add this function: `toArray();`
3. Add these polyfills: `Array.prototype.groupBy();`, `Array.prototype.groupByToMap();`, `Number.MIN_SAFE_INTEGER;` , `Number.MAX_SAFE_INTEGER;`, `Object.is();`
4. Modify these functions:

Function|Fix
--------|---
`groupBy();`|Add a parameter: `map=false`
`toFunction();`|Rename to `unBind();` and add an alias with the old name

## Celestra v5.4.0

1. Documentation, pdf and code fixes.
2. Add these aliases: `isCallable();` -> `isFunction();`, `strTitlecase();` -> `strPropercase();`
3. Add these functions: `isTruthy();`, `isFalsy();`, `getInV();`
4. Add these topics in the __js-cheatsheet.odt__ and __js-cheatsheet.pdf__: Nullish coalescing operator (??), Logical nullish assignment (??=), Logical AND assignment (&&=), Logical OR assignment (||=)
5. Rename these files:

Old name|New name
--------|--------
__celestra.js__ |__celestra.dev.js__
__celestra-math.js__|__celestra-math.dev.js__
__celestra-polyfills.js__|__celestra-polyfills.dev.js__

6. Function fixes:

Function|Fix
-------|---
`arrayMerge();`|Remove the `[flat=false]` parameter.
`getType();`|Rename to `classof();` and add an alias with the old name.

## Celestra v5.3.2

1. Documentation, pdf and code fixes.
2. Deprecate the `[flat=false,]` parameter in the `arrayMerge([flat=false,]<target>,<source1>[,sourceN]);`
3. Fix this function: `arrayRange([start=0[,end=99[,step=1]]]);` - Change end default value to 99 instead of 100.
4. Add these files: __celestra-math.min.js__, __celestra-math.odt__, __celestra-math.pdf__
5. Add these functions:

- `arrayCreate();`
- `arrayDeepClone();`
- `createDataProperty();`
- `isAsyncGeneratorFn();`
- `isSameValue();`
- `isSameValueNonNumber();`

6. Add these functions in the __Math plugin__:

- `toInt8();` and `isInt8();`
- `toUInt8();` and `isUInt8();`
- `toInt16();` and `isInt16();`
- `toUInt16();` and `isUInt16();`
- `toInt32();` and `isInt32();`
- `toUInt32();` and `isUInt32();`
- `toBigInt64();` and `isBigInt64();`
- `toBigUInt64();` and `isBigUInt64();`
- `toFloat32();` _(There is the `isFloat();` in the main code.)_

## Celestra v5.3.1

1. Documentation, pdf and code fixes.
2. Add a new file: __history.md__
3. Add a new polyfill: `crypto.randomUUID();`
4. Add these functions: `isIndex();`, `toIndex();`, `toInteger();`, `isConstructorFn();`

## Celestra v5.3.0 Voyager

1. Documentation, pdf and code fixes.
2. Fixes in the __celestra-polyfills.js__ and __celestra-polyfills.min.js__
3. Add a new code section: __Abstract functions__
4. Add these functions:

- `isPropertyKey();`
- `toPropertyKey();`
- `toObject();`
- `isSameValueZero();`
- `createMethodProperty();`
- `type();`

## Celestra v5.2.1

1. Documentation, pdf and code fixes.
2. Remove many internal calls without breaking changes.

## Celestra v5.2.0

1. Documentation, pdf and code fixes.
2. Add the MDN links at the polyfills in the __readme.md__.
3. Modify the function `randomID();` to generate UUID/GUID v4 values.
4. Add a second parameter in this function: `randomID();`
5. Add a third parameter in this function: `getType();`
6. Add this function: `forEachRight();`

## Celestra v5.1.0

1. Documentation, pdf and code fixes.
2. Add these functions: `getIn();`, `setIn();`, `hasIn();`
3. Remove the `deepAssign();` function
4. Rename __Demo Plugin__ to __Math Plugin__
5. Replace these functions:

Old function|New function
------------|-------------
`min(<collection>);`|`min(<value1>[,valueN]);`
`max(<collection>);`|`max(<value1>[,valueN]);`

## Celestra v5.0.0 Defiant

1. Documentation, pdf and code fixes.
2. Replace the short object name `_` with a new short name `CEL`
3. __CUT v0.8.23:__ only fixes

## Celestra v4.5.2

1. Documentation, pdf and code fixes.
2. Add this function: `randomID([hyphens=false]);`
3. Add these functions in the __Demo Plugin__: `product();`  and `clamp();`

4. __CUT v0.8.22__

- Rename the `celTest` object to `CUT` in the __unittest.js__
- Remove the `_cut` alias of the `CUT` object to in the __unittest.js__
- Add these buttons in fixed positions: __goto top__ and __goto bottom__
- Add __Debug Console__ in the __unittest.html__

## Celestra v4.5.1

1. Documentation, pdf and code fixes.
2. Add these functions: `arrayRemoveBy();`, `inRange();`, `zipObj();`, `isPlainObject();`
3. __CUT v0.8.21__

- Show a message on the page, when a __Celestra edition__ and the __unittest.js__ is loaded.

## Celestra v4.5.0

1. Documentation, pdf and code fixes.
2. __CUT v0.8.20:__ Add a "reset page" button in the __unittest.html__
3. Add a comment at every function and polyfill in the __celestra.js__
4. Remove these functions: `importScripts();`, `importStyles();`
5. Add a new function: `strPropercase();`
6. Replace these functions:

Old function|New function
------------|-------------
`importScript(<url>[,success]);`|`importScript(<script1>[,scriptN]);`
`importStyle(<href>[,success]);`|`importStyle(<style1>[,styleN]);`

## Celestra v4.4.3

1. Documentation, pdf and code fixes.
2. Add a new function: `findLast();` and `contains();`
3. Remove the description of these removed collection `somethingOf();` functions in __celestra.html__ and __readme.md__
4. __CUT v0.8.19:__ Replace the __unittest.dev.html__, __unittest.min.html__ and __unittest.esm.html__ files with the __unittest.html__

## Celestra v4.4.2

1. Documentation, pdf and code fixes.
2. __u87.css v0.9.19 update 1__
3. Add these functions in the __Demo plugin__: `isEven();`, `isOdd();`
4. Replace the function `groupBy();` with a real groupBy function instead of the alias of the `partition();`
5. Remove manual testcases (_removed polyfills_) in the __celestra.html__:

````javascript
Object.create();
String.prototype.startsWith();
String.prototype.endsWith();
Object.is();
String.fromCodePoint();
String.prototype.codePointAt();
Array.from();
Array.of();
Array.prototype.fill();
Array.prototype.find();
Array.prototype.findIndex();
Array.prototype.copyWithin();
Number.MIN_SAFE_INTEGER;
Number.MAX_SAFE_INTEGER;
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
````

## Celestra v4.4.1

1. Documentation, pdf and code fixes.
2. Replace the file __testcors.html__ with __btc.app.html__
3. Move the __Non-starndard polyfills__ into a new section in these files: __celestra.js__, __celestra.min.js__, __celestra.esm.js__
4. Add this function: `reject();`
5. Add these polyfills: `Array.prototype.findLast();`, `Array.prototype.findLastIndex();`, `TypedArray.prototype.findLast();`, `TypedArray.prototype.findLastIndex();`
6. __CUT v0.8.18__

- Rename these files:

old name|new name
--------|--------
unittest-gs1.js|unittest-is1.js
unittest-gs2.js|unittest-is2.js
unittest-gsi.js|unittest-is3.js

- Remove these testcases (_removed polyfills_) in the __unittest.js__:

````javascript
Object.create();
String.prototype.startsWith();
String.prototype.endsWith();
Object.is();
String.fromCodePoint();
String.prototype.codePointAt();
Array.from();
Array.of();
Array.prototype.fill();
Array.prototype.find();
Array.prototype.findIndex();
Array.prototype.copyWithin();
Number.MIN_SAFE_INTEGER;
Number.MAX_SAFE_INTEGER;
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
````

## Celestra v4.4.0 Trinium

1. Documentation, pdf and code fixes.
2. __CUT v0.8.17:__ Add a `(settings object)` notation in the testcases of the section __cookie with settings object__ in the __unittest.js__
3. Rename the function `strRemoveTags();` to `strHTMLRemoveTags();`
4. Add these functions: `signbit();`, `randomBoolean();`, `strHTMLEscape();`, `strHTMLUnEscape();`

## Celestra v4.3.2

1. Documentation, pdf and code fixes.
2. Add a second `offset` parameter in these functions: `enumerate();` and `entries();`
3. Add these functions: `domSiblingsPrev();` and `domSiblingsNext();`
4. __Demo Plugin changes:__

- Replace these functions with a new version: `sum();`, `avg();`
- Add 2 new testcases for the `avg();` function in the __celestra-demo-plugin.html__

## Celestra v4.3.1

1. Documentation and pdf fixes:
2. Change the order of the error messages (`v1-v2-msg` -> `msg-v1-v2`) in these functions: `assertEq();`, `assertNotEq();`
3. __CUT v0.8.16:__

- Add a new section: __Manual testcases__
- Move the __delay (2x alert)__ button in the section __Manual testcases__
- Add the __assert functions (1x alert, 6x cases)__ button in the section __Manual testcases__
- Add the __importStyles__ button in the section __Manual testcases__
- Add the __importStyle__ button in the section __Manual testcases__
- Add the __noConflict (1x alert)__ button in the section __Manual testcases__
- Rename the __Save result in HTML__  button to __try createFile() - Save result in HTML__
- The __v3.8.1 aliases removed in v4.0.0__ steps convert to one step and move it in the __core api and DOM__ section in the __unittest.js__
- Replace the `assertSomething();` auto testcases in the __unittest.js__
- Other fixes

## Celestra v4.3.0

1. Documentation, pdf and code fixes.
2. Add an alias: `entries();` -> `enumerate();`
3. Remove this function: `strReplaceAll();`
4. Add these functions: `strCapitalize();`, `strUpFirst();`, `strDownFirst();`, `sizeIn();`, `filterIn();`, `popIn();`
5. __CUT v0.8.15:__

- Add a new testcase in the __unittest.js__: `Array.prototype.at.call();` with an arraylike object - _(test passed)_
- Comment many log messages (return values, etc.) in the __unittest.js__
- Move the __try delay__ button from the __unittest.js__ to __unittest.dev.html__, __unittest.min.html__ and __unittest.esm.html__
- Fixes under the hood.

## Celestra v4.2.0

1. Documentation, pdf and code fixes.
2. PDF design changes in __celestra-cheatsheet.odt__ and __celestra-cheatsheet.pdf__: move the __Cookie section__ to the second page
3. Remove these functions: `assert();`, `assertLog();`, `assertAlert();`
4. Add these polyfills: `Array.prototype.at();`, `TypedArray.prototype.at();`, `String.prototype.at();`
5. Add these functions:

- `isEmptyMap();`
- `isEmptySet();`
- `isEmptyIterator();`
- `assertEq();`
- `assertNotEq();`
- `assertTrue();`
- `assertFalse();`

## Celestra v4.1.0

1. Documentation, pdf and code fixes.
2. Modify the `sort();` function: add a second parameter.
3. __CUT v0.8.14__: Collect the failed testcases in new section above the browser information.
4. Add these functions:

- `head();`
- `initial();`
- `isDataView();`
- `isSameIterator();`
- `isSameMap();`
- `isSameObject();`
- `isSameSet();`
- `nth();`
- `shuffle();`
- `tail();`
- `withOut();`

## Celestra v4.0.0 Rocinante

1. Documentation, pdf and code fixes.
2. Remove these functions: `item();`, `hasOwn();`
3. Rename the `itemOf();` function to `item();`
4. Remove these aliases:

````javascript
forOf();
mapOf();
sizeOf();
filterOf();
hasOf();
findOf();
everyOf();
someOf();
noneOf();
firstOf();
lastOf();
sliceOf();
reverseOf();
sortOf();
reduceOf();
concatOf();
flatOf();
enumerateOf();
joinOf();
takeOf();
dropOf();
````

## Celestra v3.8.1

1. Documentation, pdf and code fixes.
2. Add a new function: `isError();`
3. Function name changes:

````javascript
forOf(); and forEach(); // rename forOf(); to forEach(); and add old alias
mapOf(); and map();     // rename mapOf(); to map(); and add old alias
sizeOf();               // rename to size(); and add old alias
filterOf();             // rename to filter(); and  add old alias
hasOf();                // rename to includes(); and add old alias
findOf();               // rename to find(); and add old alias
everyOf();              // rename to every();  and add old alias
someOf();               // rename to some(); and add old alias
noneOf();               // rename to none(); and add old alias
firstOf();              // rename to first(); and add old alias
lastOf();               // rename to last(); and add old alias
sliceOf();              // rename to slice(); and add old alias
reverseOf();            // rename to reverse(); and add old alias
sortOf();               // rename to sort(); and add old alias
reduceOf();             // rename to reduce(); and add old alias
concatOf();             // rename to concat(); and add old alias
flatOf();               // rename to flat(); and add old alias
enumerateOf();          // rename to enumerate(); and add old alias
joinOf();               // rename to join(); and add old alias
takeOf();               // rename to take(); and add old alias
dropOf();               // rename to drop(); and add old alias
````

## Celestra v3.8.0 Odo

1. Documentation, pdf and code fixes.
2. Add new files: __celestra-polyfills.js__, __celestra-polyfills.min.js__
3. Remove these functions: `minIndex();`, `maxIndex();`
4. Modify the 3 `assert` functions to return true, when the test was success
5. Add these functions: `arrayPartition();`, `arrayGroupBy();`, `isPromise();`
6. Add this polyfill: `Object.hasOwn();`
7. Depracate this function: `hasOwn();`
8. Add the `"dev"`/`"min"`/`"esm"` string in the `celestra.VERSION` property
9. Fix the description of the `globalThis;`
10. Rename the `uniqueArray();` function to `arrayUnique();`
11. Rename the `uniquePush();` function to `arrayAdd();`
12. Move these polyfills into the __celestra-polyfills.js__ and __celestra-polyfills.min.js__:

````javascript
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
````

## Celestra v3.7.0

1. Documentation, pdf and code fixes.
2. Collect the non-standard polyfills into a new section in the __celestra.html__, __readme.md__, __celestra-cheatsheet.odt__ and __celestra-cheatsheet.pdf__
3. Add handle of the Options object in these cookie functions: `setCookie(<name>,<value>[,hours=8760[,path="/"[,domain[,secure[,SameSite="Lax"[,HttpOnly]]]]]]);`, `removeCookie(<name>[,path="/"[,domain[,secure[,SameSite="Lax"[,HttpOnly]]]]]);`, `clearCookies([path="/"[,domain[,sec[,SameSite="Lax"[,HttpOnly]]]]]);`
4. Add default value `Lax` of the `SameSite` parameter in these cookie functions: `setCookie(<name>,<value>[,hours=8760[,path="/"[,domain[,secure[,SameSite="Lax"[,HttpOnly]]]]]]);`, `removeCookie(<name>[,path="/"[,domain[,secure[,SameSite="Lax"[,HttpOnly]]]]]);`, `clearCookies([path="/"[,domain[,sec[,SameSite="Lax"[,HttpOnly]]]]]);`
5. Add a new function: `delay(<ms>).then(<callback>);`
6. Modify the `domGetCSS(<element>,<property>);` to return the all css properties as an object (without property parameter) and remain the old method too.
7. Deprecate these functions: `minIndex();`, `maxIndex();`
8. __CUT v0.8.13__

- Removed functions: `isNotIE11();`, `isNotEdge();`
- The IE11 and the old EDGE have been removed from the supported browsers.
- Fixes under the hood.

## Celestra v3.6.1

1. __u87.css v0.9.19__
2. Documentation, pdf and code fixes.
3. Add new functions: `assert();`, `assertLog();`, `assertAlert();`
4. Replace the functions of the demo plugin with new ES6 functions: `sum();` and `avg();`

## Celestra 3.6.0 Galactica

1. Documentation, pdf and code fixes.
2. Remove the CommonJS and AMD module codes.
3. In the ESM version remove the export of the standalone functions, only the whole object export and default export have to be remained.
4. Remove these functions: `getUrlVar();`, `getUrlVarFromString();`
5. Rename the function `isGenerator();` to `isGeneratorFn();`
6. Add Fetch samples in the __js-cheatsheet.pdf__.

## Celestra 3.5.2

1. Documentation, pdf and code fixes.
2. Add new functions: `getUrlVars();`, `isAsyncFn();`
3. Add a new polyfill: `window.AsyncFunction();`
4. Deprecate these functions: `getUrlVar();`, `getUrlVarFromString();`
5. Replace the __spread operator__ with `Array.from();` in the `qsa();`

## Celestra 3.5.1

1. Documentation, pdf and code fixes.
2. __Celestra Unit Tester (CUT) v0.8.12__ - only fixes
3. __u87.css v0.9.18__
4. Add a polyfill: `String.prototype.replaceAll();`
5. Remove the description of the CommonJS and AMD module only from the documentation.

## Celestra 3.5.0.2

1. __u87.css v0.9.17__

## Celestra 3.5.0.1

1. __u87.css v0.9.16__

## Celestra 3.5.0

1. Documentation, pdf and code fixes.
2. Modify the license text to the default MIT text.
3. Remove the __Edge 12-18__ from the supported browsers.
4. __u87.css v0.9.15__
5. Remove these functions: `isEqual();`, `random();`
6. Add unicode string functions: `strCodePoints();`, `strFromCodePoints();`, `strAt();`

## Celestra 3.4.2

1. Documentation, pdf and code fixes.
2. __u87.css v0.9.14 (20K):__ _This is the last version which supports the IE11._ New utility classes, default text color changed to black from #333333, new print styles, fixes in themes, `-ms` vendor prefixed flex values have been removed (used only in IE10) and many fixes in the flex grid. The `.row` (`.flex`) and `.col-XX` (`.flex-XX`) aliases have been removed from the __flex grid__. __CSS GRID__ classes has been added as experimental tools in the __u87-0.9.14-cssgrid.css__ file.
3. __Celestra Unit Tester (CUT) v0.8.11__ - function `iter2JSON();` has been removed and CSS changes. The __u87.css blue theme__ is the new default theme, not the light.
4. Add these functions: `isSameArray();`, `randomFloat();`
5. Rename the function `random();` to `randomInt();` and add an alias with the name `random();`
6. Deprecate these functions: `isEqual();`, `random();`
7. Redesign the __testcors.html__

## Celestra 3.4.1

1. Documentation, pdf and code fixes.
2. __u87.css v0.9.13:__ New utility classes, new print styles and many fixes in the grid (_restructured to "mobile first"_).
3. Redesign the __testcors.html__

## Celestra v3.4.0 Blackbird

1. Documentation, pdf and code fixes.
2. Remove these functions: `domOn();`, `domOff();`, `domTrigger();` and remove testcases in the __CUT__
3. Add DOM events in the __js-cheatsheet.pdf__
4. Add default parameter values `(start = 0, end = 100, step = 1)` to the function `arrayRange();` and add new testcases in the __CUT__
5. Add these functions: `domGetCSSVar();`, `domSetCSSVar();`
6. __u87.css v0.9.12__: New utility classes and fixes in grid and `flex-w-*` classes.

## Celestra v3.3.0

1. Documentation, pdf and code fixes.
2. Remove the function `mapIn();`
3. Add the handle of `SameSite=value` parameter in the cookie functions
[https://www.chromestatus.com/feature/5088147346030592]([https://www.chromestatus.com/feature/5088147346030592)
[https://web.dev/samesite-cookies-explained](https://web.dev/samesite-cookies-explained)
[https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie](https://web.dev/samesite-cookies-explained)
values: `"; SameSite=Strict"`, `"; SameSite=Lax"`, `"; SameSite=None"`
`+ (typeof SameSite === "string" && SameSite.length > 0 ? "; SameSite="+SameSite : "")`

4. Deprecate these functions: `domOn();`, `domOff();`, `domTrigger();`
5. Replace these functions with smaller size functions: `domGetCSS();`, `domFadeToggle();`, `domToggle();`, `domIsHidden();`
6. __u87.css v0.9.11__: add new themes (blue, dark, light) and new flexbox based grid

## Celestra v3.2.0

1. Documentation, pdf and code fixes.
2. Fix the version numbers in the __celestra-demo-plugin.js__
3. Deprecate the function `mapIn();`
4. Replace the function `forEach();` with an alias of the `forOf();`
5. Replace the function `map();` with an alias of the `mapOf();`
6. Replace these functions with smaller size functions: `removeCookie();`, `arrayRemove();`

## Celestra v3.1.2

1. Documentation, pdf and code fixes.
2. Code and performance optimizations.
3. Add `BigInt` in __js-cheatsheet.pdf__
4. Add the polyfill `BigInt.prototype.toJSON();`
5. Add these functions: `flatOf();`, `joinOf();`
6. Replace these functions with smaller size functions: `iterCycle();`, `iterRepeat();`, `getType();`, `uniquePush();`, `strRemoveTags();`, `isEqual();`, `setSymmetricDifference();`, `isTypedArray();`, `arrayIntersection();`, `arrayDifference();`, `arraySymmetricDifference();`, `getCookie();`, `hasCookie();`, `setcookie();`
7. Fix the testcase `isNumeric() false`  in __unittest.js__
8. Add the `BigInt` to the testcases of the `getType();` in __unittest.js__
9. Remove the undocumented function `__objType__();`
10. Replace the calls of `__objType__();` with the `getType();`
11. Update the __u87.css__ to __v0.9.10__

## Celestra v3.1.1

1. Documentation, pdf and code fixes.
2. Add the function `strReplaceAll();`
3. __CUT v0.8.10__: Add the function `iter2JSON();`
4. Add the file __testcors.html__
5. In Samsung browser the handle of the unicode strings with iterator can causes error, so replace the `strReverse();` with this function: `const strReverse=(s)=>Array.from(String(s)).reverse().join("");`
6. Add the `String.prototype[Symbol.iterator]();` polyfill

## Celestra v3.1.0

1. Documentation, pdf and code fixes.
2. Remove these functions: `getAjax();`, `postAjax();`, `getCors();`, `postCors();`, `isInteger();`, `isArray();`, `arrayKeys();`, `arrayValues();`, `arrayEntries();`
3. Remove these polyfills: `Array.from();`, `Array.of();`, `Array.prototype.fill();`, `Array.prototype.find();`, `Array.prototype.findIndex();`, `Object.create();`, `String.prototype.startsWith();`, `String.prototype.endsWith();`, `Object.is();`, `Array.prototype.copyWithin();`, `String.fromCodePoint();`, `String.prototype.codePointAt();`, `Number.MIN_SAFE_INTEGER;`, `Number.MAX_SAFE_INTEGER();`, `Number.EPSILON;`, `Number.isNaN();`, `isNaN();`, `Number.isInteger();`, `Number.isFinite();`, `Number.isSafeInteger();`, `Number.parseInt();`, `Number.parseFloat();`, `Math.acosh();`, `Math.asinh();`, `Math.atanh();`, `Math.cbrt();`, `Math.clz32();`, `Math.cosh();`, `Math.expm1();`, `Math.fround();`, `Math.hypot();`, `Math.imul();`, `Math.log1p();`, `Math.log10();`, `Math.log2();`, `Math.sign();`, `Math.sinh();`, `Math.tanh();`, `Math.trunc();`
4. Store the `VERSION;` in a constant and use this in the object building and __ESM__ export.
5. Add the function `enumerateOf();`
6. Implement the __ESM v2__:

- Add `export default celestra;`
- Add function exports
- Modify the documentation
- Add new testcases

## Celestra v3.0.2

1. Documention and PDF fixes.
2. Deprecate these polyfills: `Array.from();`, `Array.of();`, `Array.prototype.fill();`, `Array.prototype.find();`, `Array.prototype.findIndex();`, `Object.create();`, `String.prototype.startsWith();`, `String.prototype.endsWith();`, `Object.is();`, `Array.prototype.copyWithin();`, `String.fromCodePoint();`, `String.prototype.codePointAt();`, `Number.MIN_SAFE_INTEGER;`, `Number.MAX_SAFE_INTEGER();`, `Number.EPSILON;`, `Number.isNaN();`, `isNaN();`, `Number.isInteger();`, `Number.isFinite();`, `Number.isSafeInteger();`, `Number.parseInt();`, `Number.parseFloat();`, `Math.acosh();`, `Math.asinh();`, `Math.atanh();`, `Math.cbrt();`, `Math.clz32();`, `Math.cosh();`, `Math.expm1();`, `Math.fround();`, `Math.hypot();`, `Math.imul();`, `Math.log1p();`, `Math.log10();`, `Math.log2();`, `Math.sign();`, `Math.sinh();`, `Math.tanh();`, `Math.trunc();`
3. Add a new minimized file, which uses the ES6 modules: __celestra.esm.js__
4. Modify the function `noConflict();` in the __ESM__: The function only returns the celestra object.
5. Update the __CUT__ to __v0.8.9__:  add new HTML file for the ESM version and rename the existing files to have consistent name.

## Celestra v3.0.1

1. Documentation, pdf and code fixes.
2. Add a new AJAX function (`ajax();`) which can replace the existing funtions.
3. Deprecate the old AJAX functions, except the shorthands.
4. Replace a the old AJAX shorthands functions with new functions which use the `ajax();`
5. Deprecate these functions: `isArray();`, `isInteger();`
6. Replace these functions with new versions: `arrayUnion();`, `arrayIntersection();`, `arrayDifference();`, `arraySymmetricDifference();`, `setUnion();`, `setIntersection();`, `setDifference();`, `setSymmetricDifference();`, `isSuperset();`, `min();`, `minIndex();`, `max();`, `maxIndex();`, `arrayRange();`, `unzip();`, `reverseOf();`, `sortOf();`, `domSiblings();`, `getDoNotTrack();`, `isPrimitive();`, `isArraylike();`
7. Remove the undocumented function `__toArray__();`

## Celestra v3.0.0-debug

Debug these testcases with __unittest.js__:

- In desktop Chrome: `domGetCSS();`, `domSetCSS();`, `domSetCSS();` -> not a bug: __Result / Expected: "299.991px" / "300px"__ and __Result / Expected: "349.997px" / "350px"__
- In Android Samsung Internet: `Object.is();` -> not a bug: In the browser the return value of the `Object.is(0, -0);` is true. In every other browsers the return value is false.

The changes of the __unittest.js__ will be merged in the next version of Celestra.

## Celestra v3.0.0 Hera

1. Deprecate these functions: `arrayKeys();`, `arrayValues();`, `arrayEntries();`
2. Replace many functions with new ES6 versions.
3. Remove the `const somethingOf =` at the __ES6E__ functions, where the function is not a fat arrow function
4. Merge the code of the __celestra.js__ and __celestra-es6.js__ and minimized sources too.
5. Merge the content of the __unittest.js__ and __unittest-es6.js__
6. Remove the `version;`
7. Remove the IE11 from the tested browsers
8. Remove the W10M EDGE 14 from the tested browsers

## Celestra v2.9.1

1. Redesign the __celestra-cheatsheet.pdf__: Move the __ES6E__ content to other categories (Collections, Type checking, Polyfills)
2. Add the __default value 1__ to the __n__ parameter in these functions: `takeOf();`, `dropOf();` in __ES6E__
3. Add the `VERSION;` and deprecate the `version;`
4. Rename the `version;` to `VERSION;` in __CUT v0.8.8__
5. Add these functions in __ES6E__:

- `sizeOf();`
- `lastOf();`
- `reverseOf();`
- `firstOf();`
- `hasOf();`
- `findOf();`
- `everyOf);`
- `someOf();`
- `noneOf();`
- `concatOf();`
- `reduceOf();`
- `takeRight();`
- `takeRightWhile();`
- `dropRight();`
- `dropRightWhile();`

## Celestra v2.9.0

1. Documentation, pdf and code fixes.
2. Remove the `toPairs();`
3. Remove the `range();`
4. Add the `isArrayBuffer();`
5. Add the `isTypedArray();`
6. Add `__objType__();` - _Only for internal use._
7. Add the "__unittest-dev.html__" file on the github.

## Celestra v2.8.0 Roy Batty

1. Documentation, pdf and code fixes.
2. Deprecated the `toPairs();`
3. Add the `zip();`
4. Add the `unzip();`
5. Rename the `range();` to `arrayRange();`
6. Add the alias `range();` to the `arrayRange();`
7. Add the `arrayRepeat();`
8. Add the `arrayCycle();`
9. Add the `clearCookies();`
10. Add the `isSuperset();`

## Celestra v2.7.2

1. Add `domIsHidden();`
2. Add `itemOf();` __in ES6E__
3. Add `isBigInt();`

## Celestra v2.7.1

1. Remove the extra spaces at the `isGenerator();` in the __celestra-es6.min.js__ - __bug__
2. Add the `RegExp.prototype.flags` polyfill
3. Add the `String.prototype.matchAll();` polyfill in __ES6E__

## Celestra v2.7.0

1. Remove the `merge();`
2. Remove the `tap();`
3. Move the __FP__ testcases to __Core API__ in the __unittest.html__
4. Add the alias `isNil();` to the `isNullOrUndefined();`
5. Add the `takeWhile();` in ES6E
6. Add the `dropWhile();` in ES6E
7. Add the __Beta Edge (chromium)__ to the test devices
8. Replace the `Array.from();` with `celestra.__toArray__();` in the `min();, minIndex();, max();, maxIndex();`

## Celestra v2.6.2

1. Deprecate the `tap();`
2. Update the u87.css to v0.9.9
3. Remove changes infos before v2.5.0 in the __celestra.html__ and __readme.md__

## Celestra v2.6.1

1. Move the functions from the __Functional programming__ to __Core API__
2. Move the `merge([deep,]<target>,<source1>[,srcN]);` from __Core API__ to __Collections__
3. Rename the `merge([deep,]<target>,<source1>[,srcN]);` to `arrayMerge([deep,]<target>,<source1>[,srcN]);`
4. Create the old alias for the `arrayMerge([deep,]<target>,<source1>[,srcN]);`

## Celestra v2.6.0

1. Documentation, pdf and code fixes.
2. Remove `iterTake();` from ES6E
3. Remove `iterDrop();` from ES6E

## Celestra v2.5.2

1. Documentation, pdf and code fixes.
2. Add `isIterable();`
3. Deprecate the "each()" method of the "qsa()" and the context as selector string of `qsa();` and `qs();`
4. Replace the `uniqueArray();` with a `celestra.__toArray__();` based function.
5. Replace the `strReverse();` with a `Array.from();` based function.

__Function changes in ES6E:__

1. Add `isGenerator();`
2. Add `filterOf();`
3. Add `sliceOf();`
4. Rename the `iterTake();` to `takeOf();`
5. Add the alias `iterTake();` for the `takeOf();`
6. Rename the `iterDrop();` to `dropOf();`
7. Add the alias `iterDrop();` for the `dropOf();`

## Celestra v2.5.1

1. Add `iterTake();` in __ES6E__
2. Add `iterDrop();` in __ES6E__
3. Move the `forOf();` and `mapOf();` functions in the ES6E and replace with `for..of` functions

## Celestra v2.5.0 Tamara - add the ES6 extension

1. Add new files: __celestra-es6.js__, __celestra-es6.min.js__, __unittest-es6.js__
2. Add the `iterRange();`
3. Add the `iterCycle();`
4. Add the `iterRepeat();`
5. Add the `GeneratorFunction`
6. Modify all of the documentation files.
7. Add new testcases and test loader buttons in the __CUT (unittest.js)__.

## Celestra v2.4.1

1. Add `Array.prototype.values();` - Missing in Samsung Android browser.

## Celestra v2.4.0

1. Remove `removeTags();`
2. Remove `getScript();`
3. Remove `getScripts();`
4. Remove `getStyle();`
5. Remove `getStyles();`
6. Add the `item();`

## Celestra v2.3.0

1. Add the `strReverse();`
2. Rename the `removeTags();` to `strRemoveTags();`
3. Add and mark as deprecated the old alias for the `strRemoveTags();`
4. Add a new arguments handling for the `getScripts(<script1>[,scriptN]);`
5. Add a new arguments handling for the `getStyles(<style1>[,styleN]);`
6. Rename the `getScript();` to `importScript();`
7. Rename the `getScripts();` to `importScripts();`
8. Rename the `getScript();` to `importStyle();`
9. Rename the `getScripts();` to `importStyles();`
10. Add and mark as deprecated the old alias for the `importScript();` and `importScripts();` and `importStyle();` and `importStyles();`
11. Add __Collection ES6__ functions: `setUnion();`, `setIntersection();`, `setDifference();`, `setSymmetricDifference();`
12. Add __Collection ES5__ functions:

- `arrayUnion();`
- `arrayIntersection();`
- `arrayDifference();`
- `arraySymmetricDifference();`
- `arrayKeys();`
- `arrayValues();`
- `arrayEntries();`
- `min();`
- `minIndex();`
- `max();`
- `maxIndex();`
- `range();`
- `toPairs();`

## Celestra v2.2.2

1. Add 2 functions: `isEqual();` and `isIterator();`

## Celestra v2.2.1

1. Modify the `forIn();` to return the object
2. CUT v0.8.7 changes: Add `log();`and `clear();`
3. Add 3 functions: `arrayClear();`, `arrayRemove();`, `tap();`

## Celestra v2.2.0

1. Documentation, pdf and code fixes.
2. Remove these functions: `each();`, `toArray();`, `toObject();`
3. Add these functions:

- `isWeakMap();` - _ES6_
- `isWeakSet();` - _ES6_
- `forOf();` - _ES6_
- `mapOf();` - _ES6_
- `T();`
- `F();`
- `domToElement();`

## Celestra v2.1.2

1. Add polyfill `window.screenLeft`
2. Add polyfill `window.screenTop`
3. Add `domSiblings();`
4. Add `uniquePush();`
5. Add `uniqueArray();`
6. Deprecate the `each();`
7. Add __DOMParser__ in the __js-cheatsheet.pdf__
8. Upgrade the __u87.css__ to 0.9.7
9. Add __dark mode__ links in the __celestra.html__ header and footer
10. Add __dark mode__ links in the __CUT (unittest.html)__ header and footer
11. Small text changes and fixes

## Celestra v2.1.1

1. Documentation, pdf and code fixes.
2. Add `merge();`
3. Deprecate these functions: `toArray();` and `toObject();`
4. Remove these sections and informations:

- Object name changes
- Functional programming (FP) variant
- `celToWindow();`
- `fromEntries();`

## Celestra v2.1.0 Lacy

1. Remove `window.Celestra;`
2. Remove `celestra.celToWindow();`
3. Remove `celestra.fromEntries();`
4. __CUT v0.8.6 changes:__ Add browser information (`navigator.appName`, etc.) in the top of the CUT html file.

## Celestra v2.0.8

1. Deprecate the `celToWindow();`
2. Add `Object.fromEntries();`
3. Deprecate the `celestra.fromEntries();`

## Celestra v2.0.7

1. Add or replace 21 polyfills:

- Array.prototype.copyWithin()
- String.fromCodePoint()
- String.prototype.codePointAt()
- Math.acosh()
- Math.asinh()
- Math.atanh()
- Math.cbrt()
- Math.clz32()
- Math.cosh()
- Math.expm1()
- Math.fround()
- Math.hypot()
- Math.imul()
- Math.log1p()
- Math.log10()
- Math.log2()
- Math.sign()
- Math.sinh()
- Math.tanh()
- Math.trunc()

## Celestra v2.0.6

1. Documentation, pdf and code fixes.
2. Update the u87.css to v0.9.6
3. Add 7 polyfills:

- `Element.prototype.toggleAttribute();`
- `Element.prototype.matches();`
- `Element.prototype.closest();`
- `Element.prototype.getAttributeNames();`
- `Number.parseInt();`
- `Number.parseFloat();`
- `Object.getOwnPropertyDescriptors();`

4. CUT v0.8.5 changes

- Add a new function: `isNotEdge ();` and use this at the `domCreate() - style string` test cases, because there is error in the __W10M Edge 14__.
- In the `addElement (type, innerHTML);` the __innerHTML__ parameter will be optional.
- Rename the `addTest ();` to `__addTest__ ();` and use this only for inner calls and in the selftest section.
- Change the `isEqual (step, expected, expression, strict)` from alias of the `__addTest__ ();` to call of the `__addTest__ ();`. The `isEqual (...);` will replace the `addTest ();` in the testcases.

## Celestra v2.0.5

1. Add these polyfills: `String.prototype.padStart();`, `String.prototype.padEnd();`, `String.prototype.repeat();`
2. Add 4 functions: `randomString();`, `b64Encode();`, `b64Decode();`, `javaHash();`
3. CUT v0.8.4 changes:

- Add `celTest.isTrue("step", expr, true|false );`
- Add `celTest.isFalse"step", expr, true|false );`
- Add `celTest.isEqual("step", true, expr, true|false );`
- Add `celTest.isNotEqual("step", true, expr, true|false);`
- Rename the __"Sample testcases"__ section to __"CUT Selftest"__

## Celestra v2.0.4

1. Recreate the "Celestra demo plugin"
2. Add 2 files: __celestra-demo-plugin.html__, __celestra-demo-plugin.js__

## Celestra v2.0.3

1. __CUT v0.8.3 changes:__ Only fixes.
2. Add `fromEntries();`
3. Add 5 polyfills:

- `Object.entries();`
- `Object.values();`
- `Object.is();`
- `Array.prototype.flat();` - mark as proposal
- `Array.prototype.flatMap();` - mark as proposal

## Celestra v2.0.2

1. Rename wrapper object from `Celestra` to `celestra`. Add a line `window.Celestra = celestra;` for compatibility reasons.
2. Add the Android Microsoft Edge to the tested browsers
3. Remove the description of the removed "doc" variable and removed functions
4. __CUT v0.8.2 changes:__ Change the object name from `_ct` to `_cut`
5. Add 5 polyfills:

- `Array.prototype.fill();`
- `String.prototype.trimStart()/trimLeft();`
- `String.prototype.trimEnd()/trimRight();`
- `String.prototype.startsWith();`
- `String.prototype.endsWith();`

## Celestra v2.0.1

1. Documentation, pdf and code fixes.
2. Add `Array.prototype.find();`
3. Add `Array.prototype.findIndex();`
4. Add `removeTags(s);`
5. Rename the _Basic API_ to _Core API_
6. __Add Celestra unit tester - CUT v0.8.1__

## Celestra v2.0 Zoe

1. Rename the milestones in Github
2. Remove the FP version
3. Make a new code base from the Main and FP variants in __celestra.js__
4. Add a new `celToWindow();` function to emulate the FP version
5. Regression test with the __celestra.html, celestra-fp.html, testgame.html, testgame-fp.html__
6. Replace the `repeat();` with a `for loop` in the testgames.
7. Add a default value (100) to the max parameter of the function random() + add a new testcase without parameter + update the documentation
8. Remove the deprecated functions:

````javascript
doc = document
repeat();
initArray();
initObject();
initString();
initTrue();
initFalse();
````

## Celestra v1.21.1

1. Documentation, pdf and code fixes.
2. Update the u87.css to v0.9.5
3. Deprecate these functions:

````javascript
repeat();
initArray();
initObject();
initString();
initTrue();
initFalse();
```

## Celestra v1.21.0

1. Documentation, pdf and code fixes.
2. Rename the `prevUnderscore` variable to `_prevUnderscore`
3. Deprecate the doc global variable

## Celestra v1.20.1 - v1.20.6

1. __u87.css v0.9.4__
2. Documentation, pdf and code fixes.
3. Archive the demo plugin
4. Fix the Ajax function parameters notations
5. Remove the testgame1
6. Add library version in the js-cheatsheet.pdf
7. Add these functions: createFile();, `isNumeric();`, `hasOwn();`

## Celestra 1.20.0 Zephyr

1. Add this function: deepAssign();

## Celestra v1.19.2

Add hasOwnProperty() object method in the extend function

## Celestra v1.19.1

Change the default cookie path to "/" (entire site)

## Celestra v1.19.0

1. Documentation, pdf and code fixes.

## Celestra v1.18.4

1. Documentation, pdf and code fixes.
2. Update the u87.css and the testgame2 custom css.
3. Merge the main and the FP cheatsheets.

## Celestra v1.18.3

1. Add "initType" functions:

```javascript
initArray () { return []; }
initObject () { return {}; }
initString () { return ""; }
initTrue () { return true; }
initFalse () { return false; }
```

2. Change the default css to the external u87.css in the HTML documentations and sample files

## Celestra v1.18.2

1. Add js-cheatsheet.pdf

## Celestra v1.18.1

1. Add `form2array();`
2. Add `form2string();`

## Celestra v1.18.0

1. __Add cookie functions__
2. __Fix geturlvar functions__
3. __Modify the type functions__:

- Add getType() testcase in the documentation for date
- Add getType() testcase in the documentation for regexp
- Add function isDate()
- Add function isRegexp()
- Add function isElement()

## Celestra v1.17.2

1. Only fixes.

## Celestra v1.17.1

1. Rename module*.* test files to testmodule*.*
2. Remove the Plugins section
3. Remove the Classic plugin

## Celestra v1.17.0 Caprica

1. Make a wrapper object and modify the code and the documentation:

`qsa();` -> `Celestra.qsa();` and/or `_.qsa();`
`domSetCSS();` -> `Celestra.domSetCSS();` and/or `_.domSetCSS();`

## Celestra v1.16.3

1. Only fixes.

## Celestra v1.16.2

1. Add `each();` function

## Celestra v1.16.1

1. Remove the deprecated and removed functions
2. Add testgame2.html

## Celestra v1.16.0

1. Add type checking functions
2. Add cheatsheet.pdf

## Celestra v1.15.6

1. Only fixes.

## Celestra v1.15.5

1. Only fixes.

## Celestra v1.15.4

1. Add `obj2string();`
2. Add `getUrlVarFromString();`

## Celestra v1.15.2

1. Only fixes.

## Celestra v1.15.1

1. Add this function: identity();

## Celestra v1.15.0

1. New project name: __Celestra__
