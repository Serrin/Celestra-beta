````
        ___  ____  __    ____  ___  ____  ____    __
       / __)( ___)(  )  ( ___)/ __)(_  _)(  _ \  /__\
      ( (__  )__)  )(__  )__) \__ \  )(   )   / /(__)\
       \___)(____)(____)(____)(___/ (__) (_)\_)(__)(__)

````

# Celestra version history


## Celestra v5.7.0 Nostromo

1. Documentation and pdf fixes.
 
2. __Change the ESM edition:__ The default export will be the celestra object and the all of the functions will be exported.
 
3. Deprecate this function (__Stability 1__):
````javascript
arrayUnique();
````

4. Remove these functions (__Stability 0__):
````javascript
inherit()
isError();
group();
````

5. Set __Stability 3__ of these functions: 
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

6. Replace these functions with a new version:
````javascript
arrayCreate();
reverse();
````

7. Add this function:
````javascript
unique();
````

8. Replace the old assertion functions with the new __Assertion API__:

Old function|New function
------------|------------
`assertTrue(<message>[,value]);`|`assert(<value>[,message="value"]);`<BR>`assertTrue(<value>[,message="value"]);`
`assertFalse(<message>[,value]);`|`assertFalse(<value>[,message="value"]);`
`assertEq(<message>,<value1>,<value2>[,strict=true]);`|`assertEqual(<value1>,<value2>[,message="values"]);`<BR>(_Loose equality + NaN equality_)<BR>`assertStrictEqual(<value1>,<value2>[,message="values"]);`<BR>(_SameValue equality_)
`assertNotEq(<message>,<value1>,<value2>[,strict=true]);`|`assertNotEqual(<value1>,<value2>[,message="values"]);`<BR>(_Loose equality + NaN equality_)<BR>`assertNotStrictEqual(<value1>,<value2>[,message="values"]);`<BR>(_SameValue equality_)

9. __Celestra Unit Tester (CUT) v0.8.28:__ 

- Add `token1` - `token10` variables instead of many testvariables of testcases.
- Add these functions:
````javascript
CUT.concat()
CUT.join();
CUT.logCode();
CUT.take();
````

10. Close the milestone 5.7.0 Nostromo


## Celestra v5.6.6

1. Documentation and pdf fixes.

2. Add the "_Javascript Equality comparisons and sameness_" page in the __js-cheatsheet.odt__ and __js-cheatsheet.odt__

3. Add these functions:

````javascript
domClear();
strTruncate();
````

4. Add these abstract functions:

````javascript
deletePropertyOrThrow();
isLessThan();
isSameType();
requireObjectCoercible();
````

5. Replace these functions with a new version:

````javascript
arrayCreate();
clamp();
createDataPropertyOrThrow();
createMethodPropertyOrThrow();
createPolyfillMethod();
createPolyfillProperty();
getInV();
isObject();
minmax();
sizeIn();
setIn();
sum();      // use Math.sumPrecise(); if all items are number
toObject();
```` 

6. __Celestra Unit Tester (CUT) v0.8.27:__ 
- CSS and text changes
- Small fixes


## Celestra v5.6.5

1. Documentation and pdf fixes.

2. Add stabilities in the __celestra.html__ and __README.md__:
````
0 - Removed.
1 - Deprecated and will be removed.
2 - Deprecated.
3 - Not deprecated, but can get only fixes.
4 - Stable.
````

3. Replace "Unary plus" (+x) number conversions with the Number(); function to handle the BigInt values

4. Deprecate the function `inherit();`

5. Add a new polyfill: `Math.sumPrecise();`

6. Add these functions:

````javascript
getType();  -> alias of classof(); (readd)
isClass();  -> alias of isConstructorFn();
````

7. Add these abstract functions:

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

8. Replace these functions with a new version:

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

9. __Celestra Unit Tester (CUT) v0.8.26:__ 
- CSS and text changes
- The global try-catch will add a failed line instead of an alert.


## Celestra v5.6.4

1. Documentation and pdf fixes.

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

1. Documentation and pdf fixes.

2. Remove the **btc.app.html**

3. Fix the version number in the **celestra.min.js**


## Celestra v5.6.2

1. Documentation and pdf fixes.

2. Add Github page link in the **celestra.html** and **readme.md**
 
3. Add function categories links in the **celestra.html**

4. Add new contents in the **js-cheatsheet.odt** and **js-cheatsheet.pdf**:
- new Set methods
- Float16Array
- new Iterator methods

5. Add new functions: 
- `isFloat16(<value>);`
- `toFloat16(<value>);`
- `count();`
- `randomUUIDv7();`

6. Deprecate these functions: 
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

1. Fixed many errors in the documentation and pdf fixes.


## Celestra v5.6.0 Razorback

1. Documentation and pdf fixes.
````
HTML - clamp(<value>,<min>,<max>); - This is an alias of the minmax(<value>,<min>,<max>);.
HTML - REMOVED polyfills in v3.1.0 - String.prototype.codePointAt();7 
````

2. Remove these aliases: `domToTop();`, `domToBottom();`

3. Remove these functions: `randomString();`, `randomID();`

4. Add these polyfills:
````
Object.groupBy();
Map.groupBy();
````

5. Fix the function `group(<collection>,<callback>[,map=false]);` with the new, standard function calls.

6. Deprecate this function: `group(<collection>,<callback>[,map=false]);`

7. Add the 4th page in the __celestra-cheatsheet.odt__ and __celestra-cheatsheet.pdf__ with the removed polyfills.

8. Move these polyfills in the **celestra-polyfills.dev.js** and **celestra-polyfills.min.js**
````
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

9. Close the milestone __5.6.0 Razorback__.
 

## Celestra v5.5.5

1. Documentation and pdf fixes.

2. Add `Array.fromAsync();` in the __js-cheatsheet.pdf__

3. Add a polyfill: `Array.fromAsync(<arrayLike>[,mapFn[,thisArg]]); `

4. Add an alias of the function `clamp();`: `minmax();`

5. Fix these functions:

|Function|Fix|
|--------|---|
|`isSameIterator();`|Remove the method `sort();`|
|`isSuperset();`|Replace the method `includes();` with `indexOf();`|
|`arrayIntersection();`|Replace the method `includes();` with `indexOf();`|
|`arrayDifference();`|Replace the method `includes();` with `indexOf();`|
|`arraySymmetricDifference();`|Replace the method `includes();` with `indexOf();`|


## Celestra v5.5.4

1. Documentation and pdf fixes.

2. Rename this sections:

|Old name|New name|
|--------|--------|
|DOM|DOM API|
|Type checking|Type checking API|
|Collections|Collections API|
|Math functions|Math API|
|Abstract|Abstract API|
|Cookie|Cookie API|
|AJAX and CORS|AJAX and CORS API|

3. Add a new section: **String API**

4. Move these functions in the section **String API**:
````javascript
strPropercase(<string>);
strTitlecase(<string>);
strCapitalize(<string>);
strUpFirst(<string>);
strDownFirst(<string>);
strReverse(<string>);
strCodePoints(<string>);
strFromCodePoints(<collection>);
strAt(<string>,<index>[,newChar]);
strSplice(<str>,<index>,<count>[,add]);
strHTMLRemoveTags(<string>);
strHTMLEscape(<string>);
strHTMLUnEscape(<string>);
````

5. Add these alphabets:
````javascript
const BASE16 = "0123456789ABCDEF";
const BASE32 = "234567ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const BASE36 = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const BASE58 = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
const BASE62 = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
const WORDSAFEALPHABET= "23456789CFGHJMPQRVWXcfghjmpqvwx";
````

6. Add these functions:
- `strSplice(<string>,<index: integer>,<count: integer>[,add: string]): string`
- `domScrollToElement(<element>[,top=true]): undefined`
- `timestampID([size=21[,alphabet="123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz"]]): string`

7. Replace the function `strAt(<string>,<index: integer>): string`
to `strAt(<string>,<index: integer>[,newChar: string]): string`

8. Move this functions from __Core API__ to __Math functions__:
````javascript
signbit();
randomInt();
randomFloat();
inRange();
````

9. Deprecate this function: `randomID();`

10. Rename these functions and add an alias with the old name:

|Old name|New name|
|--------|--------|
|domToTop();|domScrollToTop();|
|domToBottom();|domScrollToBottom();|


## Celestra v5.5.3

1. Documentation and pdf fixes.

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

1. Documentation and pdf fixes.

2. Add Map and Set objects in the __js-cheatsheet.odt__ and __js-cheatsheet.pdf__.

3. Rename these files:

|Old name|New name|
|--------|--------|
|celestra-demoPlugin.html|celestra-demo-plugin.html|
|celestra-demoPlugin.dev.js|celestra-demo-plugin.dev.js|
|celestra-demoPlugin.min.js|celestra-demo-plugin.min.js|
|history.md|CHANGELOG.md|

4. Deprecate the function `randomString([length[,specialCharactersEnabled=false]]);`

5. Add a new function: `nanoid([size=21[,alphabet="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_-"]]);`

6. __Celestra Unit Tester (CUT) v0.8.25:__ 
- CSS and text changes
- UP & DOWN buttons have been removed, because these caused errors on the test server.
- Added UTC, local and Epoch time in the log.


## Celestra v5.5.1

1. Documentation and pdf fixes.


## Celestra v5.5.0

1. Documentation and pdf fixes.

2. `globalThis;` documentation text change: "window/self" -> "`window`/`self`"

3. Remove this line in the __celestra.dev.js__: `//const find = ([...a], fn) => a.find((v, i) => fn(v, i));`

4. Remove these aliases:

|Alias|Function|
|-----|--------|
|getType();|classof();|
|toFunction();|unBind();|
|groupBy();|group();|

5. Remove the Math plugin and move the functions in the `celestra.dev.js`, `celestra.min.js` and `celestra.esm.js`

6. Add a demo plugin with these files: `celestra-demoPlugin.html`, `celestra-demoPlugin.dev.js` and `celestra-demoPlugin.min.js`


## Celestra v5.4.4

1. Documentation and pdf fixes.

2. Fix the description of these polyfills with MDN links:
````javascript
Array.prototype.findLast();
Array.prototype.findLastIndex();
TypedArray.prototype.findLast();
TypedArray.prototype.findLastIndex();
````

3. Rename these prototypes:
````javascript
Array.prototype.groupBy(); -> Array.prototype.group();
Array.prototype.groupByToMap(); -> Array.prototype.groupToMap();
````

4. Rename the function `groupBy(<collection>,<callback>[,map=false]);` to `group(<collection>,<callback>[,map=false]);` and add an alias with the old name.


## Celestra v5.4.3

1. Documentation and pdf fixes.

2. Remove this line in the __README.md__:
````
Celestra Math plugin cheatsheet: __celestra-math.pdf__
````

3. Add the `Reflect object` in the __js-cheatsheet.odt__ and __js-cheatsheet.pdf__

4. Fix these MDN links at the polyfills in the __celestra.html__ and __README.md__:

Polyfill|Link
--------|----
`Array.prototype.groupBy();`|https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/groupBy
`Array.prototype.groupByToMap();`|https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/groupByToMap

5. Add an alias: `sleep(<ms>).then(<callback>);` -> `delay(<ms>).then(<callback>);`

6. Revert these functions to old versions -> use the `for of` instead of the array conversion:
````
includes(<collection>,<value>);
contains(<collection>,<value>);
find(<collection>,<callback>);
findLast(<collection>,<callback>);
every(<collection>,<callback>);
some(<collection>,<callback>);
none(<collection>,<callback>);
join(<collection>[,separator=","]);
````

7. Fix these polyfills to use the `Object.defineProperty();`:
````
Array.prototype.flat();
Array.prototype.flatMap();
String.prototype.matchAll();
String.prototype.trimStart();
String.prototype.trimLeft();
String.prototype.trimEnd();
String.prototype.trimRight();
String.prototype.padStart();
String.prototype.padEnd();
````


## Celestra v5.4.2

1. Documentation and pdf fixes.

2. Add a third page in the __celestra-cheatsheet.odt__ and __celestra-cheatsheet.pdf__

3. Delete these files and move the content in the __celestra-cheatsheet.odt__ and __celestra-cheatsheet.pdf__:
- __celestra-math.odt__
- __celestra-math.pdf__

4. Replace the `BigInt` `Xn` literals to `BigInt(X)` in the __unittest.js__

5. Fix the function `isSameValue(<value1>,<value2>);`: This is a standalone function instead of an alias of the `Object.is();`.

6. __Celestra Unit Tester (CUT) v0.8.24:__ CSS and text changes


## Celestra v5.4.1

1. Documentation and pdf fixes.

2. Add these functions:
- `toArray(<value>);` - in abstract

3. Add these polyfills:
- `Array.prototype.groupBy(<fn>[,thisArg]);`
- `Array.prototype.groupByToMap(<fn>[,thisArg]);`
- `Number.MIN_SAFE_INTEGER;`
- `Number.MAX_SAFE_INTEGER;`
- `Object.is();`

4. Fix these functions:

Function|Fix
--------|---
`groupBy(<collection>,<callback>);`|Add a parameter: `map=false`
`isChar(<value>);`|Make this function unicode compatible
`isNil(<value>);`|Add handle of value of `NaN`
`toFunction(<function>);`|Rename to `unBind(<function>);` and add an alias with the old name


## Celestra v5.4.0

1. Documentation and pdf fixes.

2. CSS changes in the __testgame.html__ and __btc.app.html__

3. Add these buttons in the __celestra-math.html__:
- __load celestra-math.js__
- __load celestra-math.min.js__
- __reset page__

4. Add these topics in the __js-cheatsheet.odt__ and __js-cheatsheet.pdf__:
- Nullish coalescing operator (??)
- Logical nullish assignment (??=)
- Logical AND assignment (&&=)
- Logical OR assignment (||=)

5. Rename these files:

Old name|New name
--------|--------
__celestra.js__ |__celestra.dev.js__
__celestra-math.js__|__celestra-math.dev.js__
__celestra-polyfills.js__|__celestra-polyfills.dev.js__

6. Add these aliases:

Alias|Function
-----|--------
`isCallable(<value>);`|`isFunction(<value>);`
`strTitlecase(<string>);`|`strPropercase(<string>);`

7. Add these functions:
- `isTruthy(<value>);`
- `isFalsy(<value>);`
- `getInV(<value>,<property>);`

8. Function fixes:

Function|Fix
-------|---
`arrayAdd(<array>,<value>);`|Small fixes.
`arrayMerge(<target>,<source1>[,sourceN]);`|Remove the `[flat=false,]` parameter.
`getType(<variable>[,type][,throw=false]);`|Rename to `classof(<variable>[,type][,throw=false]);` and add an alias with the old name.
`isElement(<value>);`|Use `null/undefined` checking.
`isIterable(<value>);`|Use `null/undefined` checking.
`isIterator(<value>);`|Use `null/undefined` checking.
`isPromise(<value>);`|Use `null/undefined` checking.
`randomInt([max] or <min>,<max>);`|Small fixes.
`randomFloat([max] or <min>,<max>);`|Use `null/undefined` checking.


## Celestra v5.3.2

1. Documentation and pdf fixes.

2. Deprecate the `[flat=false,]` parameter in the `arrayMerge([flat=false,]<target>,<source1>[,sourceN]);`

3. Add these files:
- __celestra-math.min.js__
- __celestra-math.odt__
- __celestra-math.pdf__

4. Add these functions:
- `arrayCreate([length=0]);`
- `arrayDeepClone(<array>);`
- `createDataProperty(<object>,<property>,<value>);`
- `isAsyncGeneratorFn(<value>);`
- `isSameValue(<value1>,<value2>);`
- `isSameValueNonNumber(<value1>,<value2>);`

5. Add autotests in the __celestra-math.html__

6. Add these functions in the __Math plugin__:
- `toInt8(<value>);` and `isInt8(<value>);`
- `toUInt8(<value>);` and `isUInt8(<value>);`
- `toInt16(<value>);` and `isInt16(<value>);`
- `toUInt16(<value>);` and `isUInt16(<value>);`
- `toInt32(<value>);` and `isInt32(<value>);`
- `toUInt32(<value>);` and `isUInt32(<value>);`
- `toBigInt64(<value>);` and `isBigInt64(<value>);`
- `toBigUInt64(<value>);` and `isBigUInt64(<value>);`
- `toFloat32(<value>);` _(There is the `isFloat(<value>);` in the main code.)_

7. Function fixes

Function|Fix
-------|---
`arrayMerge([flat=false,]<target>,<source1>[,sourceN]);`|Only optimizations.
`arrayRange([start=0[,end=99[,step=1]]]);`|Change end default value to 99 instead of 100.
`createMethodProperty(<obj>,<pr>,<v>);`|Only optimizations.
`extend([deep,]<target>,<source1>[,sourceN]);`|Only optimizations.
`getIn(<o>,<pr>);`|Only optimizations.
`hasIn(<obj>,<prop>);`|Only optimizations.
`setIn(<object>,<property>,<value>);`|Only optimizations.
`toIndex(<value>);`|Fix the handle of `Infinity`
`toInteger(<value>);`|Fix the handle of `Infinity` and `-Infinity`


## Celestra v5.3.1

1. Documentation and pdf fixes.

2. Add a new file: __history.md__

3. Add a new polyfill: `crypto.randomUUID();`

4. Add these functions:
- `isIndex(<value>);`
- `toIndex(<value>);`
- `toInteger(<value>);`
- `isConstructorFn(<value>);`

5. Function fixes

Function|Fix
-------|---
`contains(<collection>,<value>);`|Replace the alias code with the original function.
`domSiblingsLeft(<element>);`|Replace the alias code with the original function.
`domSiblingsRight(<element>);`|Replace the alias code with the original function.
`entries(<collection>[,offset=0]);`|Replace the alias code with the original function.
`head(<collection>);`|Replace the alias code with the original function.
`isNil(<value>);`|Replace the alias code with the original function.
`isObject(<value>);`|Small fixes.
`nth(<collection>,<index>);`|Replace the alias code with the original function.
`randomID([hyphens=true][,usedate=false]);`|Use the `crypto.getRandomValues();`.


## Celestra v5.3.0 Voyager

1. Documentation and pdf fixes.

2. Fixes in the __celestra-polyfills.js__ and __celestra-polyfills.min.js__

3. Add a new code section: __Abstract functions__

4. Move these functions to the code section __Abstract functions__:
- `hasIn(<object>,<property>);`
- `getIn(<object>,<property>);`
- `setIn(<object>,<property>,<value>);`

5. Add these functions in the code section __Abstract functions__:
- `isPropertyKey(<value>);`
- `toPropertyKey(<value>);`
- `toObject(<value>);`
- `isSameValueZero(<value1>,<value2>);`
- `createMethodProperty(<object>,<property>,<value>);`
- `type(<value>);`

6. Close the milestone __5.3.0 Voyager__


## Celestra v5.2.1

1. Documentation and pdf fixes.

2. Non breaking changes and fixes in these functions:

Function|Fix/Change
-------|----------
`b64Decode(<string>);`|small fixes
`b64Encode(<string>);`|small fixes
`clearCookies();`|Remove the internal calls of the `getCookie();` and `removeCookie();`
`domFadeToggle(<elem.>[,duration[,display]]);`|Remove the internal calls of the `domFadeIn(<element>[,duration[,display]]);` and `domFadeOut(<element>[,duration]);`
`extend([deep,]<target>,<source1>[,srcN]);`|Make a function inside the `extend();` function to remove the external recursion
`isArrayBuffer(<value>);`|Remove the internal calls of the `getType(<variable>[,type][,throw=false]);`
`isArraylike(<value>);`|small fixes
`isDataView(<value>);`|Remove the internal calls of the `getType(<variable>[,type][,throw=false]);`
`isDate(<value>);`|Remove the internal calls of the `getType(<variable>[,type][,throw=false]);`
`isEmptyMap(<value>);`|Remove the internal calls of the `getType(<variable>[,type][,throw=false]);`
`isEmptySet(<value>);`|Remove the internal calls of the `getType(<variable>[,type][,throw=false]);`
`isError(<value>);`|Remove the internal calls of the `getType(<variable>[,type][,throw=false]);`
`isIterator(<value>);`|Remove the internal calls of the `getType(<variable>[,type][,throw=false]);`
`isMap(<value>);`|Remove the internal calls of the `getType(<variable>[,type][,throw=false]);`
`isRegexp(<value>);`|Remove the internal calls of the `getType(<variable>[,type][,throw=false]);`
`isPlainObject(<value>);`|small fixes
`isSameIterator(<iter1>,<iter2>);`|small fixes
`isSameMap(<map1>,<map2>);`|Remove the internal calls of the `getType(<variable>[,type][,throw=false]);`
`isSameSet(<set1>,<set2>);`|Remove the internal calls of the `getType(<variable>[,type][,throw=false]);`
`isSet(<value>);`|Remove the internal calls of the `getType(<variable>[,type][,throw=false]);`
`isTypedArray(<value>);`|Remove the internal calls of the `getType(<variable>[,type][,throw=false]);`
`isWeakMap(<value>);`|Remove the internal calls of the `getType(<variable>[,type][,throw=false]);`
`isWeakSet(<value>);`|Remove the internal calls of the `getType(<variable>[,type][,throw=false]);`
`reduce(<collection>,<callback>[,initialvalue]);`|small fixes
`zipObj(<collection1>,<collection2>);`|Remove the internal call of the `zip(<collection1>[,collectionN]);`


## Celestra v5.2.0

1. Documentation and pdf fixes.

2. Add the MDN links at the polyfills in the __readme.md__.

3. Fix the function `randomID([hyphens=true][,usedate=false]);` to generate UUID/GUID v4 values.

4. Add a second parameter in this function: `randomID([hyphens=true][,usedate=false]);`

5. Add a third parameter in this function: `getType(<variable>[,type][,throw=false]);`

6. Add this function: `forEachRight(<collection>,<callback>);`


## Celestra v5.1.0

1. Documentation and pdf fixes.

2. Remove the `deepAssign(<target>,<source1>[,srcN]);` function

3. Rename __Demo Plugin__ to __Math Plugin__:
- __celestra-demo-plugin.html__ -> __celestra-math.html__
- __celestra-demo-plugin.js__ -> __celestra-math.js__

4. Add these functions:
- `getIn(<object>,<property>);`
- `setIn(<object>,<property>,<value>);`
- `hasIn(<object>,<property>);`

5. Replace these functions:

Old function|New function
------------|-------------
`min(<collection>);`|`min(<value1>[,valueN]);`
`max(<collection>);`|`max(<value1>[,valueN]);`


## Celestra v5.0.0 Defiant

1. Documentation and pdf fixes.

2. Remove many manual testcases in the __celestra.html__

3. Close the milestone __5.0.0 Defiant__

4. Replace the short object name `_` with a new short name `CEL` in these files:
- __btc.app.html__
- __celestra.html__
- __celestra.js__
- __celestra.min.js__
- __celestra-cheatsheet.odt__
- __celestra-cheatsheet.pdf__
- __celestra-demo-plugin.html__
- __README.md__
- __testgame.html__
- __unittest.html__
- __unittest.js__

5. __CUT v0.8.23__
- only fixes


## Celestra v4.5.2

1. Documentation and pdf fixes.

2. Add v5.0.0 new short object name info in the __celestra.html__ and __readme.md__.

3. Add this function: `randomID([hyphens=false]);`

4. Fix or replace these functions:

Function|Fix
--------|---
`isEmptyObject(<value>);`|new ES6+ syntax
`popIn(<object>,<property>);`|use the `Object.hasOwn();`
`groupBy(<collection>,<callback>);`|use the `Object.hasOwn();`
`extend([deep,]<target>,<source1>[,srcN]);`|use the `Object.hasOwn();`
`deepAssign(<target>,<source1>[,srcN]);`|use the `Object.hasOwn();`
`strCapitalize(<string>);`|add length check
`strUpFirst(<string>);`|add length check
`strDownFirst(<string>);`|add length check

5. Add these functions in the __Demo Plugin__:
- `product(<value1>[,valueN]);`
- `clamp(<value>,<min>,<max>);`

6. __CUT v0.8.22__
- Rename the `celTest` object to `CUT` in the __unittest.js__
- Remove the `_cut` alias of the `CUT` object to in the __unittest.js__
- Add these buttons in fixed positions: __goto top__ and __goto bottom__
- Add __Debug Console__ in the __unittest.html__


## Celestra v4.5.1

1. Documentation and pdf fixes.

2. Add these functions:
- `arrayRemoveBy(<array>,<callback>[,all=false]);`
- `inRange(<value>,<min>,<max>);`
- `zipObj(<collection1>,<collection2>);`
- `isPlainObject(<value>);`

3. Fix these functions and polyfills:

Function|Fix
--------|---
`takeRightWhile(<collection>,<callback>);`|fix the counter
`dropRightWhile(<collection>,<callback>);`|fix the counter
`clearCookies();`|iterate over only the own property keys
`Array.prototype.findLast(<callback>);`|only documentation
`Array.prototype.findLastIndex(<callback>);`|only documentation
`TypedArray.prototype.findLast(<callback>);`|only documentation
`TypedArray.prototype.findLastIndex(<callback>);`|only documentation
`Array.prototype.at(<index>);`|only documentation
`TypedArray.prototype.at(<index>);`|only documentation
`String.prototype.at(<index>);`|only documentation
`Object.hasOwn(<object>,<property>);`|only documentation

4. Replace these functions with a smaller size version:
````javascript
isNumeric(<value>):
forIn(<object>,<callback>);
every(<collection>,<callback>);
some(<collection>,<callback>);
none(<collection>,<callback>);
includes(<collection>,<value>);
contains(<collection>,<value>);
find(<collection>,<callback>);
findLast(<collection>,<callback>);
min(<collection>);
max(<collection>);
takeRight(<collection>[,n=1]);
dropRight(<collection>[,n=1]);
arrayAdd(<array>,<value>);
domSetCSS();
````

5. __CUT v0.8.21__
- Show a message on the page, when a __Celestra edition__ and the __unittest.js__ is loaded.


## Celestra v4.5.0

1. Documentation and pdf fixes.

2. Fixes in these functions:

Function|Fix
-------|---
`arrayRange([start=0[,end=100[,step=1]]]);`|only documentation
`slice(<collection>[,begin=0[,end=Infinity]]);`|only documentation
`sort(<collection>[,numbers=false]);`|only documentation
`arrayMerge([flat=false,]<target>,<source1>[,sourceN]);`|only documentation
`popIn(<object>,<property>);`|use the `Object.prototype.hasOwnProperty.call();`
`domSetCSS(<element>,<property>,<value>);`|use the `Object.prototype.hasOwnProperty.call();`
`arrayRange([start=0[,end=100[,step=1]]]);`|variable names

3. Add a comment at every function and polyfill in the __celestra.js__

4. Add a new function: `strPropercase(<string>);`

5. Replace these functions:

Old function|New function
------------|-------------
`importScript(<url>[,success]);`|`importScript(<script1>[,scriptN]);`
`importStyle(<href>[,success]);`|`importStyle(<style1>[,styleN]);`
`arrayMerge([flat=false,]<target>,<source1>[,sourceN]);`|new ES6+ function with same parameters
`obj2string(<object>);`|new ES6+ function with same parameters
`filterIn(<object>,<callback>);`|new ES6+ function with same parameters

6. Remove these functions:
- `importScripts(<scripts> or <script1>[,scN]);`
- `importStyles(<styles> or <style1>[,styleN]);`

7. __CUT v0.8.20__
- Add a "reset page" button in the __unittest.html__



## Celestra v4.4.3

1. Documentation and pdf fixes.

2. Add a new function: `findLast(<collection>,<callback>);`

3. Add an alias: `contains(<collection>,<value>);` -> `includes(<collection>,<value>);`

4. Fix the description of these functions:
````javascript
arrayRemove(<array>,<value>[,all=false]);
arrayCycle(<collection>[,n=100]);
arrayRepeat(<value>[,n=100]);
iterRange([start=0[,step=1[,end=Infinity]]]);
iterCycle(<iter>[,n=Infinity]);
iterRepeat(<value>[,n=Infinity]);
take(<collection>[,n=1]);
takeRight(<collection>[,n=1]);
drop(<collection>[,n=1]);
dropRight(<collection>[,n=1]);
setUnion(<collection1>[,collectionN]);
randomString([length[,specChar=false]]);
javaHash(<data>[,hexa=false]);
````

5. Remove the description of these removed function in __celestra.html__ and __readme.md__ and collect these function names in a new line of the __Collections__ table:
````javascript
forOf(<collection>,<callback>);
mapOf(<collection>,<callback>);
sizeOf(<collection>);
filterOf(<collection>,<callback>);
hasOf(<collection>,<value>);
findOf(<collection>,<callback>);
everyOf(<collection>,<callback>);
someOf(<collection>,<callback>);
noneOf(<collection>,<callback>);
firstOf(<collection>);
lastOf(<collection>);
sliceOf(<collection>[,begin[,end]]);
reverseOf(<collection>);
sortOf(<collection>);
reduceOf(<collection>,<callback>[,initialvalue]);
concatOf(<collection1>[,collectionN]);
flatOf(<collection>);
enumerateOf(<collection>);
joinOf(<collection>[,separator=","]);
takeOf(<collection>[,n]);
dropOf(<collection>[,n]);
````

6. __CUT v0.8.19__

- Replace the __unittest.dev.html__, __unittest.min.html__ and __unittest.esm.html__ files with the __unittest.html__


## Celestra v4.4.2

1.  Documentation and pdf fixes.

2. __u87.css v0.9.19 update 1__

3. Add these functions in the __Demo plugin__: `isEven(<value>);`, `isOdd(<value>);`

4. Replace the function `groupBy(<collection>,<callback>);` with a real groupBy function instead of the alias of the `partition(<collection>,<callback>);`

5. Amend the description of these functions (stage 3):
- `Array.prototype.findLast(<callback>);`
- `Array.prototype.findLastIndex(<callback>);`
- `TypedArray.prototype.findLast(<callback>);`
- `TypedArray.prototype.findLastIndex(<callback>);`

6. Remove manual testcases (_removed polyfills_) in the __celestra.html__:
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

1. Documentation and pdf fixes.

2. Replace the file __testcors.html__ with __btc.app.html__

3. Move the __Non-starndard polyfills__ into a new section in these files: __celestra.js__, __celestra.min.js__, __celestra.esm.js__

4. Add this function: `reject(<collection>,<callback>);`

5. Add these polyfills:
- `Array.prototype.findLast();`
- `Array.prototype.findLastIndex();`
- `TypedArray.prototype.findLast();`
- `TypedArray.prototype.findLastIndex();`

6. __CUT v0.8.18__
- Simplify the testcases of these polyfills: `Array.prototype.flat();`, `Array.prototype.flatMap();`
- Move the __Non-starndard polyfills__ into a new section in the __unittest.js__
- Remove unused and commented codes in the __unittest.js__
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

1. Documentation and pdf fixes.

2. Fix an error message in the function `ajax(<Options object>);`

3. Rename the function `strRemoveTags(<string>);` to `strHTMLRemoveTags(<string>);`

4. Add these functions:
- `signbit(<value>);`
- `randomBoolean();`
- `strHTMLEscape(<string>);`
- `strHTMLUnEscape(<string>);`

5. __CUT v0.8.17:__
- Change the HTML titles like this: `Celestra Unit Tester (CUT) - ???` -> `??? - Celestra Unit Tester (CUT)`
- Add a `(settings object)` notation in the testcases of the section __cookie with settings object__ in the __unittest.js__

6. Close the milestone __4.4.0 Trinium__


## Celestra v4.3.2

1. Documentation and pdf fixes.

2. Add a second `offset` parameter in these functions:
- `enumerate(<collection>[,offset=0]);`
- `entries(<collection>[,offset=0]);`

3. Add these functions:
- `domSiblingsPrev(<element>);` and an alias `domSiblingsLeft(<element>);`
- `domSiblingsNext(<element>);` and an alias `domSiblingsRight(<element>);`

4. __Demo Plugin changes:__
- Replace these functions with a new version: `sum();`, `avg();`
- Add 2 new testcases for the `avg();` function in the __celestra-demo-plugin.html__


## Celestra v4.3.1

1. Documentation and pdf fixes:
- Collect the downloadable editions (dev, min, esm) and CUT files in a table in the __celestra.html__ and __README.md__
- Collect the removed polyfill editions (dev, min) in a table in the __celestra.html__ and __README.md__
- Add a description about the polyfill files in the __celestra.html__ and __README.md__
- Recommend the use of the __FETCH__ at the __AJAX__ documentation in the __celestra.html__ and __README.md__
- Fix the description of the `isSuperset(<superset>,<subset>);` -> `isSuperset(<superCollection>,<subCollection>);`
- Other fixes

2. Replace the `strAt(<string>,<index>);` function with a new version, which can handle the negative indexes

3. Change the order of the error messages (`v1-v2-msg` -> `msg-v1-v2`) in these functions: `assertEq();`, `assertNotEq();`

4. __CUT v0.8.16:__
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

1. Documentation and pdf fixes.

2. Add an alias: `entries(<collection>);` -> `enumerate(<collection>);`

3. Fix the sort of the yielded elements of the `enumerate(<collection>);`: `[item, index]` -> `[index, item]`

4. Fix the `String.prototype.at();` polyfill: replace the `return String(this)[n];` with `return String(this)[String(n)];`

5. Replace this function with a new version: `isSameArray(<array1>,<array2>);`

6. Remove this function: `strReplaceAll(<str>,<search>,<replace>);`

7. Add these functions:
- __string:__ `strCapitalize(<string>);`, `strUpFirst(<string>);`, `strDownFirst(<string>);`
- __object:__ `sizeIn(<object>);`, `filterIn(<object>,<callback>);`, `popIn(<object>,<property>);`

8. __CUT v0.8.15:__
- Add a new testcase in the __unittest.js__: `Array.prototype.at.call();` with an arraylike object - _(test passed)_
- Comment many log messages (return values, etc.) in the __unittest.js__
- Move the __try delay__ button from the __unittest.js__ to __unittest.dev.html__, __unittest.min.html__ and __unittest.esm.html__
- Fixes under the hood.


## Celestra v4.2.0

1. Documentation and pdf fixes.

2. PDF design changes in __celestra-cheatsheet.odt__ and __celestra-cheatsheet.pdf__: move the __Cookie section__ to the second page

3. Fix the __testcors.html__

4. Fix the description of the `strAt(<string>,<pos>);` -> `strAt(<string>,<index>);`

5. Add these polyfills:
- `Array.prototype.at();`
- `TypedArray.prototype.at();`
- `String.prototype.at();`

6. Add these functions:
- `isEmptyMap(<value>);`
- `isEmptySet(<value>);`
- `isEmptyIterator(<value>);`
- `assertEq(<msg>,<value1>,<value2>[,strict=true]);`
- `assertNotEq(<msg>,<value1>,<value2>[,strict=true]);`
- `assertTrue(<msg>,<value>);`
- `assertFalse(<msg>,<value>);`

7. Remove these functions:
- `assert(<condition>[,message]);`
- `assertLog(<condition>[,message]);`
- `assertAlert(<condition>[,message]);`


## Celestra v4.1.0

1. Documentation and pdf fixes.

2. PDF design change: split in two columns the __Collection section__ in the __celestra-cheatsheet.odt__ and __celestra-cheatsheet.pdf__

3. Add these functions:
- `isDataView(<value>);`
- `withOut(<collection>,<filterCollection>);`
- `shuffle(<collection>);`
- `initial(<collection>);`
- `tail(<collection>);`
- `isSameObject(<object1>,<object2>);`
- `isSameMap(<map1>,<map2>);`
- `isSameSet(<set1>,<set2>);`
- `isSameIterator(<iter1>,<iter2>);`

4. Add these aliases:

|alias|function|
|-----|-------|
|`head(<collection>);`|`first(<collection>);`|
| `nth(<collection>,<index>);`|`item(<collection>,<index>);`|

5. Fix these functions: `reverse(<collection>);` and `sort(<collection>);` - return `array` instead of `array.values();`

6. Modify the `sort(<collection>);` function: add a second parameter -> `sort(<collection>[,numberSort]);`

7. __CUT v0.8.14__
- Collect the failed testcases in new section above the browser information.
- Fixes under the hood.


## Celestra v4.0.0 Rocinante

1. Documentation and pdf fixes.

2. Make a new branch for the v3.x

3. Close the milestone __4.0.0 Rocinante__

4. Remove these functions: `item(<collection>,<index>);`, `hasOwn(<object>,<property>);`

5. Rename the `itemOf(<collection>,<index>);` function to `item(<collection>,<index>);`

6. Fix these functions: `forIn(<object>,<callback>);`, `obj2string(<object>);`, `extend([deep,]<target>,<source1>[,srcN]);`, `deepAssign(<target>,<source1>[,srcN]);`

7. Remove these aliases:
````javascript
forOf(<collection>,<callback>);
mapOf(<collection>,<callback>);
sizeOf(<collection>);
filterOf(<collection>,<callback>);
hasOf(<collection>,<value>);
findOf(<collection>,<callback>);
everyOf(<collection>,<callback>);
someOf(<collection>,<callback>);
noneOf(<collection>,<callback>);
firstOf(<collection>);
lastOf(<collection>);
sliceOf(<collection>[,begin[,end]]);
reverseOf(<collection>);
sortOf(<collection>);
reduceOf(<collection>,<callback>[,initialvalue]);
concatOf(<collection1>[,collectionN]);
flatOf(<collection>);
enumerateOf(<collection>);
joinOf(<collection>[,separator=","]);
takeOf(<collection>[,n]);
dropOf(<collection>[,n]);
````


## Celestra v3.8.1

1. Documentation and pdf fixes.

2. Design changes in the __celestra-cheatsheet.odt__ and __celestra-cheatsheet.pdf__.

3. Add a new function: `isError(<value>);`

4. Function name changes:
````javascript
forOf(<collection>,<callback>);
forEach(<collection>,<callback>);
  -> rename forOf(); to forEach();
  -> add old alias

mapOf(<collection>,<callback>);
map(<collection>,<callback>);
  -> rename mapOf(); to map();
  -> add old alias

sizeOf(<collection>);
  -> rename to size();
  -> add old alias

filterOf(<collection>,<callback>);
  -> rename to filter();
  -> add old alias

hasOf(<collection>,<value>);
  -> rename to includes();
  -> add old alias

findOf(<collection>,<callback>);
  -> rename to find();
  -> add old alias

everyOf(<collection>,<callback>);
  -> rename to every();
  -> add old alias

someOf(<collection>,<callback>);
  -> rename to some();
  -> add old alias

noneOf(<collection>,<callback>);
  -> rename to none();
  -> add old alias

firstOf(<collection>);
  -> rename to first();
  -> add old alias

lastOf(<collection>);
  -> rename to last();
  -> add old alias

sliceOf(<collection>[,begin[,end]]);
  -> rename to slice();
  -> add old alias

reverseOf(<collection>);
  -> rename to reverse();
  -> add old alias

sortOf(<collection>);
  -> rename to sort();
  -> add old alias

reduceOf(<collection>,<callback>[,initialvalue]);
  -> rename to reduce();
  -> add old alias

concatOf(<collection1>[,collectionN]);
  -> rename to concat();
  -> add old alias

flatOf(<collection>);
  -> rename to flat();
  -> add old alias

enumerateOf(<collection>);
  -> rename to enumerate();
  -> add old alias

joinOf(<collection>[,separator=","]);
  -> rename to join();
  -> add old alias

takeOf(<collection>[,n]);
  -> rename to take();
  -> add old alias

dropOf(<collection>[,n]);
  -> rename to drop();
  -> add old alias
````


## Celestra v3.8.0 Odo

1. Documentation and pdf fixes.

2. Add new files: __celestra-polyfills.js__, __celestra-polyfills.min.js__

3. Remove these functions: `minIndex(<collection>);`, `maxIndex(<collection>);`

4. Modify the 3 `assert` functions to return true, when the test was success

5. Add these functions: `arrayPartition(<array>,<callback>);`, `arrayGroupBy(<array>,<callback>);`, `isPromise(<value>);`

6. Add this polyfill: `Object.hasOwn();`

7. Depracate this function:  `hasOwn(<object>,<property>);`

8. Add the `"dev"`/`"min"`/`"esm"` string in the `celestra.VERSION` property

9. Fix the description of the `globalThis;`

10. Rename the `uniqueArray(<value>);` function to `arrayUnique(<value>);`

11. Rename the `uniquePush(<array>,<value>);` function to `arrayAdd(<array>,<value>);`

12. Close the milestone __3.8.0 Odo__

13. Move these polyfills into the __celestra-polyfills.js__ and __celestra-polyfills.min.js__:
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


##  Celestra v3.7.0

1. Documentation and pdf fixes.

2. Fixes in the __demo plugin__.

3. Collect the non-standard polyfills into a new section in the __celestra.html__, __readme.md__, __celestra-cheatsheet.odt__ and __celestra-cheatsheet.pdf__

4. Add handle of the Options object in these cookie functions: `setCookie(<name>,<value>[,hours=8760[,path="/"[,domain[,secure[,SameSite="Lax"[,HttpOnly]]]]]]);`, `removeCookie(<name>[,path="/"[,domain[,secure[,SameSite="Lax"[,HttpOnly]]]]]);`, `clearCookies([path="/"[,domain[,sec[,SameSite="Lax"[,HttpOnly]]]]]);`

5. Add default value `Lax` of the `SameSite` parameter in these cookie functions: `setCookie(<name>,<value>[,hours=8760[,path="/"[,domain[,secure[,SameSite="Lax"[,HttpOnly]]]]]]);`, `removeCookie(<name>[,path="/"[,domain[,secure[,SameSite="Lax"[,HttpOnly]]]]]);`, `clearCookies([path="/"[,domain[,sec[,SameSite="Lax"[,HttpOnly]]]]]);`

6. Add a new function: `delay(<ms>).then(<callback>);`

7. Modify the `domGetCSS(<element>,<property>);` to return the all css properties as an object (without property parameter) and remain the old method too.

8. Fix the `isObject(<value>);` and `isEmptyObject(<value>);` - The return value has to be `false` when the given object is `null`.

9. Replace these functions with a smaller size function: `min(<collection>);`, `max(<collection>);`, `joinOf(<collection>[,separator=","]);`, `arrayRemove(<array>,<value>[,all]);`, `strFromCodePoints(<collection>);`, `getType(<variable>[,type]);`

10. Add new testcases in the __unittest.js__:
````javascript
_cut.isEqual("min(); number test", _.min([5, 10, 3]), 3);
_cut.isEqual("max(); number test", _.max([5, 10, 3]), 10);
````

11. Deprecate these functions: `minIndex(<collection>);`, `maxIndex(<collection>);`

12. __CUT v0.8.13__
- Removed functions: `isNotIE11();`, `isNotEdge();` - The IE11 and the old EDGE have been removed from the supported browsers.
- Fixes under the hood.


##  Celestra v3.6.1

1. __u87.css v0.9.19__

2. Documentation and pdf fixes.

3. Add new functions: `assert(<condition>[,message]);`, `assertLog(<condition>[,message]);`, `assertAlert(<condition>[,message]);`

4. Replace the function `arrayRange([start=0[,end=100[,step=1]]]);` with the  `Array.from();` based function!

5. Fix the documentation of these functions: `arrayRange([start=0[,end=100[,step=1]]]);`, `iterRange([start=0[,step=1[,end]]]);`, `arrayRemove(<array>,<value>[,all]);`

6. Fix the function `isSameArray(<array1>,<array2>);` - Remove the `...slice().sort()` lines!

7. Replace the functions of the demo plugin with new ES6 functions: `sum();` and `avg();`


## Celestra 3.6.0 Galactica

1. Documentation and pdf fixes.

2. Remove the CommonJS and AMD module codes!

3. In the ESM version remove the export of the standalone functions, only the whole object export and default export have to be remained.

4. Remove these functions: `getUrlVar([name]);`, `getUrlVarFromString(<querystr>[,name]);`

5. Rename the function `isGenerator(<value>);` to `isGeneratorFn(<value>);`

6. Add Fetch samples in the __js-cheatsheet.pdf__.


## Celestra 3.5.2

1. Documentation and pdf fixes.

2. Add new functions: `getUrlVars([str=location.search]);`, `isAsyncFn(<value>);`

3. Add a new polyfill: `window.AsyncFunction();`

4. Deprecate these functions: `getUrlVar([name]);`, `getUrlVarFromString(<querystr>[,name]);`

5. Rename the `GeneratorFunction();` to `window.GeneratorFunction();` in the documentation and __celestra-cheatsheet.pdf__.

6. Replace the __spread operator__ with `Array.from();` in the `function qsa();`


## Celestra 3.5.1

1. Documentation and pdf fixes.

2. __Celestra Unit Tester (CUT) v0.8.12__ - only fixes

3. __u87.css v0.9.18__

4. Add a polyfill: `String.prototype.replaceAll();`

5. Remove the description of the CommonJS and AMD module only from the documentation!


## Celestra 3.5.0.2

1. __u87.css v0.9.17__


## Celestra 3.5.0.1

1. __u87.css v0.9.16__


## Celestra 3.5.0

1. Documentation and pdf fixes.

2. Modify the license text to the default MIT text.

3. Remove the __Edge 12-18__ from the supported browsers.

4. __u87.css v0.9.15__

5. Remove these functions: `isEqual(<value1>,<value2>);`, `random();`

6. Add unicode string functions: `strCodePoints();`, `strFromCodePoints();`, `strAt();`


## Celestra 3.4.2

1. Documentation and pdf fixes.

2. __u87.css v0.9.14 (20K):__ _This is the last version which supports the IE11._ New utility classes, default text color changed to black from #333333, new print styles, fixes in themes, `-ms` vendor prefixed flex values have been removed (used only in IE10) and many fixes in the flex grid. The `.row` (`.flex`) and `.col-XX` (`.flex-XX`) aliases have been removed from the __flex grid__. __CSS GRID__ classes has been added as experimental tools in the __u87-0.9.14-cssgrid.css__ file.

3. __Celestra Unit Tester (CUT) v0.8.11__ - function `iter2JSON();` has been removed and CSS changes. The __u87.css blue theme__ is the new default theme, not the light.

4. Add these functions: `isSameArray(<array1>,<array2>);`, `randomFloat();`

5. Replace these functions: `noop();`, `uniqueArray();`, `isIterable();`, `T();`, `F();`

6. Rename the function `random();` to `randomInt();` and add an alias with the name `random();`

7. Deprecate these functions: `isEqual(<value1>,<value2>);`, `random();`

8. Redesign the __testcors.html__


## Celestra 3.4.1

1. Documentation and pdf fixes.

2. __u87.css v0.9.13:__ New utility classes, new print styles and many fixes in the grid (_restructured to "mobile first"_).

3. Replace these functions: `isNullOrUndefined();` and `isNil();`

4. Fix the function `forIn();` - use the `celestra.hasOwn();`

5. Fix the polyfill `Object.fromEntries();` - use the `for...of` loop

6. Redesign the __testcors.html__


## Celestra v3.4.0 Blackbird

1. Documentation and pdf fixes.

2. Remove these functions: `domOn();`, `domOff();`, `domTrigger();` and remove testcases in the __CUT__

3. Add DOM events in the __js-cheatsheet.pdf__

4. Add default parameter values `(start = 0, end = 100, step = 1)` to the function `arrayRange();` and add new testcases in the __CUT__

5. Replace these functions with smaller size functions: `zip();`, `unzip();`

6. Add new functions: `domGetCSSVar(<name>);`, `domSetCSSVar(<name>,<value>);`

7. __u87.css v0.9.12__: New utility classes and fixes in grid and `flex-w-*` classes.

8. Close the milestone __3.40.0 Blackbird__


## Celestra v3.3.0

1. Documentation and pdf fixes.

2. Remove the function `mapIn();`

3. Add the handle of `SameSite=value` parameter in the cookie functions
https://www.chromestatus.com/feature/5088147346030592
https://web.dev/samesite-cookies-explained
https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie
values:  `"; SameSite=Strict"`, `"; SameSite=Lax"`, `"; SameSite=None"`
` + (typeof SameSite === "string" && SameSite.length > 0 ? "; SameSite="+SameSite : "")`

4. Deprecate these functions: `domOn();`, `domOff();`, `domTrigger();`

5. Replace these functions with smaller size functions: `domGetCSS();`, `domFadeToggle();`, `domToggle();`, `domIsHidden();`

6. __u87.css v0.9.11__: add new themes (blue, dark, light) and new flexbox based grid


## Celestra v3.2.0

1. Documentation and pdf fixes.

2. Fix the version numbers in the __celestra-demo-plugin.js__

3. Deprecate the function `mapIn(<object>,<callback>);`

4. Replace the function `forEach(<collection>,<callback>);` with an alias of the `forOf(<collection>,<callback>);`

5. Replace the function `map(<collection>,<callback>);` with an alias of the `mapOf(<collection>,<callback>);`

6. Replace these functions with smaller size functions: `removeCookie();`, `arrayRemove();`


## Celestra v3.1.2

1. Documentation and pdf fixes.

2. Code and performance optimizations.

3. Add `BigInt` in __js-cheatsheet.pdf__

4. Add the polyfill `BigInt.prototype.toJSON();`

5. Add these functions: `flatOf(<collection>);`, `joinOf(<collection>[,separator]);`

6. Replace these functions with smaller size functions: `iterCycle();`, `iterRepeat();`, `getType();`, `uniquePush();`, `strRemoveTags();`, `isEqual();`, `setSymmetricDifference();`, `isTypedArray();`, `arrayIntersection();`, `arrayDifference();`, `arraySymmetricDifference();`, `getCookie();`, `hasCookie();`, `setcookie();`

7. Fix the testcase `isNumeric() false`  in __unittest.js__

8. Add the `BigInt` to the testcases of the `getType();` in __unittest.js__

9. Remove the undocumented function `__objType__();`

10. Replace the calls of `__objType__();` with the `getType();`

11. Update the __u87.css__ to __v0.9.10__


## Celestra v3.1.1

1. Documentation and PDF fixes.

2. Add the function `strReplaceAll(<string>,<search>,<replace>);`

3. __CUT v0.8.10__: Add the function `iter2JSON(<iter>);`

4. Add the file __testcors.html__

5. In Samsung browser the handle of the unicode strings with iterator can causes error, so replace the `strReverse();` with this function: `const strReverse=(s)=>Array.from(String(s)).reverse().join("");`

6. In the __unittest.js__ log the results of the `strReverse();` testcases

7. Add the  `String.prototype[Symbol.iterator]()` polyfill

8. In the __unittest.js__ log the results of the `String.prototype[Symbol.iterator]()` testcases

9. Fix the function `isIterator();`


## Celestra v3.1.0

1. Documentation and PDF fixes.

2. Remove these functions: `getAjax(<url>,<format>,<success>[,error[,user,<password>]]);`, `postAjax(<url>,<data>,<format>,<success>[,error[,user,<password>]]);`, `getCors(<url>,<format>,<success>[,error[,user,<password>]]);`, `postCors(<url>,<data>,<format>,<success>[,error[,user,<password>]]);`, `isInteger(<value>);`, `isArray(<value>);`, `arrayKeys(<collection>);`, `arrayValues(<collection>);`, `arrayEntries(<collection>);`

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

1. Documentation and pdf fixes.

2. Add a new AJAX function (`ajax();`) which can replace the existing funtions.

3. Deprecate the old AJAX functions, except the shorthands.

4. Replace a the old AJAX shorthands functions with new functions which use the `ajax();`

5. Deprecate these functions: `isArray(<value>);`, `isInteger(<value>);`

6. Replace these functions with new versions: `arrayUnion();`, `arrayIntersection();`, `arrayDifference();`, `arraySymmetricDifference();`, `setUnion();`, `setIntersection();`, `setDifference();`, `setSymmetricDifference();`, `isSuperset();`, `min();`, `minIndex();`, `max();`, `maxIndex();`, `arrayRange();`, `unzip();`, `reverseOf();`, `sortOf();`, `domSiblings();`, `getDoNotTrack();`, `isPrimitive();`, `isArraylike();`

7. Remove the undocumented function `__toArray__();`


## Celestra v3.0.0-debug

Debug these testcases with __unittest.js__:
- In desktop Chrome: `domGetCSS(<element>,<property>);`, `domSetCSS(<element>,<property>,<value>);`, `domSetCSS(<element>,<properties>);`
=> not a bug: __Result / Expected: "299.991px" / "300px"__ and __Result / Expected: "349.997px" / "350px"__
- In Android Samsung Internet: `Object.is();`
=> not a bug: In the browser the return value of the `Object.is(0, -0);` is true. In every other browsers the return value is false.

The changes of the __unittest.js__ will be merged in the next version of Celestra.


## Celestra v3.0.0 Hera

- Deprecate these functions: `arrayKeys(<collection>);`, `arrayValues(<collection>);`, `arrayEntries(<collection>);`

- Replace these functions with new ES6 versions: `qsa();`, `qs();`, `constant();`, `identity();`, `T();`, `F();`, `arrayKeys();`, `arrayValues();`, `arrayEntries();`, `strReverse();`, `uniqueArray();`, `toFunction();`, `bind();`, `hasOwn();`, `domHide();`, `domShow();`, `domOn();`, `domOff();`, `domTrigger();`, `isString();`, `isNumber();`, `isInteger();`, `isFloat();`, `isBoolean();`, `isObject();`, `isFunction();`, `isArray();`, `isNull();`, `isUndefined();`, `isNil();`, `isNullOrUndefined();`, `isSymbol();`, `isIterable();`, `isMap();`, `isSet();`, `isWeakSet();`, `isIterator();`, `isDate();`, `isRegexp();`, `isElement();`, `isArrayBuffer();`, `isBigInt();`, `arrayRepeat();`, `arrayCycle();`, `isEmptyArray();`, `hasCookie();`, `isChar();`, `arrayCycle();`, `item();`, `random();`, `randomString();`

- Move these functions from Core __API__ to __DOM__: `createFile(<filename>,<content>[,dType]);`, `getFullscreen();`, `setFullscreenOn(<selector> or <element>);`, `setFullscreenOff();`

- Remove the `const somethingOf =` at the __ES6E__ functions, where the function is not a fat arrow function

- Merge the code of the __celestra.js__ and __celestra-es6.js__ and minimized sources too.

- Merge the content of the __unittest.js__ and __unittest-es6.js__

- Remove the `version;`

- Remove the IE11 from the tested browsers

- Remove the W10M EDGE 14 from the tested browsers

- Remove the __ES6E__ labels and text comment in the __celestra-cheatsheet.pdf__

- Remove the __ES6E__ section in the documentation and place the content in the other sections (Collections,  Type checking, Polyfills)

- Insert a new section about the changes in v3.0.0

- Rename the open milestones from v2.x to v3.x

- Create a new branch for the v2.x code

- Close the milestone __3.0.0 Hera__


## Celestra v2.9.1

1. Add these functions in __ES6E__:
- `sizeOf(<collection>);`
- `lastOf(<collection>);`
- `reverseOf(<collection>);`
- `firstOf(<collection>);`
- `hasOf(<collection>,<value>);`
- `findOf(<collection>,<callback>);`
- `everyOf(<collection>,<callback>);`
- `someOf(<collection>,<callback>);`
- `noneOf(<collection>,<callback>);`
- `concatOf(<collection1>[,collectionN]);`
- `reduceOf(<collection>,<callback>[,initialvalue]);`
- `takeRight(<collection>[,n]);`
- `takeRightWhile(<collection>,<callback>);`
- `dropRight(<collec.>[,n]);`
- `dropRightWhile(<collection>,<callback>);`

2. Move these functions from __Core API__ to __DOM__:
- `qsa(<selector>[,context]).forEach(<fn>);`
- `qs(<selector>[,context]).argument;`
- `domReady(<function>);`
- `importScript(<url>[,success]);`
- `importScripts(<scripts> or  <script1>[,scrN]);`
- `importStyle(<href>[,success]);`
- `importStyles(<styles> or <style1>[,styleN]);`
- `getLocation(<success>[,error]);`
-  `form2array(<form>);`
- `form2string(<form>);`
- `getDoNotTrack();`

3. Redesign the __celestra-cheatsheet.pdf__: Move the __ES6E__ content to other categories (Collections, Type checking, Polyfills)

4. Add the __default value 1__ to the __n__ parameter in these functions: `takeOf(<collection>[,n]);`, `dropOf(<collection>[,n])` in __ES6E__

5. Add the `VERSION;` and deprecate the `version;`

6. Rename the `version;` to `VERSION;` in __CUT v0.8.8__

7. Replace the `isGenerator(<value>);` with a fat arrow function in __ES6E__


## Celestra v2.9.0

1. Documentation and PDF fixes.

2. Remove the `toPairs(<collection1>,<collection2>);` - __beta.1__

3. Remove the `range(<start>,<end>[,step]);` - __beta.1__

4. Add the `isArrayBuffer(<value>);` - __beta.1__

5. Add the `isTypedArray(<value>);` - __beta.1__

6. Add `__objType__(<value>);` - _Only for internal use._ - __beta.1__

7. Use the `__objType__(<value>);` in these functions: `isMap(<value>);`, `isSet(<value>);`, `isWeakMap(<value>); isWeakSet(<value>);`, `isIterator(<value>);`, `isDate(<value>);`, `isRegexp(<value>); isArrayBuffer(<value>);`, `isTypedArray(<value>);` - __beta.2__

8. Add the "**unittest-dev.html**" file on the github. - __beta.2__


## Celestra v2.8.0 Roy Batty

1. Documentation fixes.
2. Replace the `function isEmptyArray(v)` with a smaller size function
3. Add type checking of the arguments to the `Array.from()` polyfill
4. Fix the `function isArrayLike(v)` (`string`, `null`)
5. Replace the `function getDoNotTrack()` with a smaller size function
6. Replace the `Array.prototype.includes()` polyfill with a smaller size function
7. Replace the `String.prototype.includes()` polyfill with a smaller size function
8. Deprecated the `toPairs(<collection1>,<collection2>);`
9. Add the `zip(<collection1>[,collectionN]);`
10. Add the `unzip(<collection>);`
11. Rename the `range(<start>,<end>[,step]);` to `arrayRange(<start>,<end>[,step]);`
12. Add the alias `range(<start>,<end>[,step]);` to the  `arrayRange(<start>,<end>[,step]);`
13. Add the `arrayRepeat(<value>[,n]);`
14. Add the `arrayCycle(<collection>[,n]);`
15. Add the `clearCookies([path[,domain[,secure[,HttpOnly]]]]);`
16. Fixes in __unittest.js__
17. Replace the build of the `celestra` object with a faster, smaller method
18. Add the `isSuperset(<superset>,<subset>);`
19. Close the milestone _"2.8.0 Roy Batty"_

## Celestra v2.7.2

1. Add `domIsHidden(<element>);`
2. Replace the `T();` with a smaller size function
3. Replace the `F();` with a smaller size function
4. Small text changes
5. Add `itemOf(<collection>,<index>);` __in ES6E__
6. Add `isBigInt(<value>);`


## Celestra v2.7.1

1. Remove the extra spaces at the `function isGenerator()` in the __celestra-es6.min.js__ - __bug__
2. Add the `RegExp.prototype.flags` polyfill
3. Add the `String.prototype.matchAll()` polyfill in __ES6E__


## Celestra v2.7.0

1. Remove the `merge([deep,]<target>,<source1>, ...sources);`
2. Remove the `tap(<object>,<callback>);`
3. Move the __FP__ testcases to __Core API__ in the __unittest.html__
4. Add the alias `isNil(<value>);` to the `isNullOrUndefined(<value>);`
5. Add the `takeWhile(<collection>,<callback>);` in ES6E
6. Add the `dropWhile(<collection>,<callback>);` in ES6E
7. Add the **Beta Edge (chromium)** to the test devices
8. Replace the `Array.from()` with `celestra.__toArray__()` in the `min(<collection>);, minIndex(<collection>);, max(<collection>);, maxIndex(<collection>);`


## Celestra v2.6.2

1. Deprecate the `function tap()`
2. Update the u87.css to v0.9.9
3. Remove changes infos before v2.5.0 in the __celestra.html__ and __readme.md__
4. Replace the `function noop()` with this: `function noop () {}`


## Celestra v2.6.1

1.  Move the functions from the __Functional programming__ to __Core API__
2. Move the `merge([deep,]<target>,<source1>[,srcN]);` from __Core API__ to __Collections__
3. Rename the `merge([deep,]<target>,<source1>[,srcN]);` to `arrayMerge([deep,]<target>,<source1>[,srcN]);`
4. Create the old alias for the `arrayMerge([deep,]<target>,<source1>[,srcN]);`


## Celestra v2.6.0

1. Replace the `qsa();` with the smaller version
2. Replace the `qs();` with the smaller version
3. Remove `iterTake(<collection>,<n>);` from ES6E
4. Remove `iterDrop(<collection>,<n>);` from ES6E
5. Move the `forEach(<collection>,<callback>); ` from FP to Collections
6. Move the `map(<collection>,<callback>);` from FP to Collections
7. Move the `forIn(<object>,<callback>);` from FP to Core API
8. Move the `mapIn(<object>,<callback>);` from FP to Core API


## Celestra v2.5.2

1. Add `isIterable(<value>);`
2. Deprecate the "each()" method of the "qsa()" and the context as selector string of `qsa();` and `qs();`
-> https://github.com/Serrin/Celestra/issues/98
3. Replace the `uniqueArray();` with a `celestra.__toArray__();` based function.
4. Replace the `strReverse();` with a `Array.from();` based function.
5. Replace the `(""+s)` with `String(s)` in the `strRemoveTags(s);`
6. Replace the `domOn();` with a smaller function
7. Replace the `domOff();` with a smaller function
8. Replace the `(Array.from ? ...)` code to `Array.from()` in the `forEach(a,fn);`
9. Replace the `(Array.from ? ...)` code to `Array.from()` in the `map(a,fn);`

__Function changes in ES6E:__

1. Add `function isGenerator()`
2. Add ` function filterOf()`
3. Add ` function sliceOf()`
4. Rename the `function iterTake(<collection>,<n>);` to `function takeOf(<collection>,<n>);`
5. Add the alias `function iterTake(<collection>,<n>);` for the `function takeOf(<collection>,<n>);`
6. Rename the `function iterDrop(<collection>,<n>);` to `function dropOf(<collection>,<n>);`
7. Add the alias `function iterDrop(<collection>,<n>);` for the `function dropOf(<collection>,<n>);`

## Celestra v2.5.1

1. Add `iterTake(<collection>,<n>);` in __ES6E__
2. Add `iterDrop(<collection>,<n>);` in __ES6E__
3. Move the `forOf()` and `mapOf()` functions in the ES6E and replace with `for..of` functions


## Celestra v2.5.0 Tamara - add the ES6 extension

1. Add new files: __celestra-es6.js__, __celestra-es6.min.js__, __unittest-es6.js__

2. Add the `iterRange([start[,step[,end]]]);`
3. Add the `iterCycle(<iter>[,n]);`
4. Add the `iterRepeat(<value>[,n]);`
5. Add the `GeneratorFunction`
6. Modify all of the documentation files.
7. Add new testcases and test loader buttons in the **CUT (unittest.js)**.
8. Close the milestone __2.5.0 Tamara__ after the publishing of the v2.5.0.


## Celestra v2.4.1

1. Add `Array.prototype.values()` - Missing in Samsung Android browser.
2. Add the MDN link of the `globalThis`


## Celestra v2.4.0

1. Remove `removeTags();`
2. Remove `getScript();`
3. Remove `getScripts();`
4. Remove `getStyle();`
5. Remove `getStyles();`
6. Fix the `importStyles();` in the development version
7. Add the `item(<collection>,<index>);`


## Celestra v2.3.0

1. Add the `strReverse(<string>);`
2. Rename the `removeTags(<string>);` to `strRemoveTags(<string>);`
3. Add and mark as deprecated the old alias for the `strRemoveTags(<string>);`
4. Add a new arguments handling for the `getScripts(<script1>[,scriptN]);`
5. Add a new arguments handling for the `getStyles(<style1>[,styleN]);`
6. Fix the String return value of the `forEach(<collection>,<callback>);`
7. Rename the `getScript();` to `importScript();`
8. Rename the `getScripts();` to `importScripts();`
9. Rename the `getScript();` to `importStyle();`
10. Rename the `getScripts();` to `importStyles();`
11. Add and mark as deprecated the old alias for the `importScript();` and `importScripts();` and `importStyle();` and `importStyles();`
12. Add the `__toArray__(<collection>);`, only for inner use
13. Add __Collection__ functions:

__ES5__

- `arrayUnion(<collection1>, [collection2] ... [collectionN]);`
- `arrayIntersection(<collection1>,<collection2>);`
- `arrayDifference(<collection1>,<collection2>);`
- `arraySymmetricDifference(<collection1>,<collection2>);`
- `arrayKeys(<collection>);`
- `arrayValues(<collection>);`
- `arrayEntries(<collection>);`
- `min(<collection>);`
- `minIndex(<collection>);`
- `max(<collection>);`
- `maxIndex(<collection>);`
- `range(<start>,<end>[,step]);`
- `toPairs(<collection1>,<collection2>);`

__ES6__

- `setUnion(<collection1>, [collection2] ... [collectionN]);`
- `setIntersection(<set1>,<set2>);`
- `setDifference(<set1>,<set2>);`
- `setSymmetricDifference(<set1>,<set2>);`


## Celestra v2.2.2 (1998)

1. Add 2 functions:
- `isEqual(<value1>,<value2>);`
- `isIterator(<value>);`

2. Add or modify 4 polyfills:
- `globalThis`
- Fix the `Math.hypot();`
- Replace the `Object.values();` with a __Object.keys(o).map(...);__
- Replace the `Object.entries();` with a __Object.keys(o).map(...);__


## Celestra v2.2.1

1. Modify the "function forIn (o, fn)" to return the object

2. Add 3 functions:
- `arrayClear(<array>);`
- `arrayRemove(<array>,<value>[,all]);`
- `tap(<object>,<callback>);`

3. CUT v0.8.7 changes:
- Add `function log(<innerHTML>);` -  this is a shorthand to the `addElement("p", innerHTML);`
- Add `function clear ();` - this will clear all of the results


## Celestra v2.2.0

1. __Add 7 functions:__
- `isWeakMap()` - _ES6_
- `isWeakSet()` - _ES6_
- `forOf()` - _ES6_
- `mapOf()` - _ES6_
- `T()`
- `F()`
- `domToElement()`

2. __Remove 3 functions__:
- `each()`
- `toArray()`
- `toObject()`

3. Replace the "function forEach()" and "function map()" with ES6 compatible functions

## Celestra v2.1.2

- Add polyfill `window.screenLeft`
- Add polyfill `window.screenTop`
- Add `domSiblings()`
- Add `uniquePush()`
- Add `uniqueArray()`
- Deprecate the `each()`


- Add __DOMParser__ in the __js-cheatsheet.pdf__
- Fix the page structure in the __celestra-cheatsheet.pdf__
- Upgrade the __u87.css__ to 0.9.7
- Add __dark mode__  links in the __celestra.html__ header and footer
- Add __dark mode__  links in the __CUT (unittest.html)__ header and footer
- Small text changes and fixes

## Celestra v2.1.1

1. Fix the `createFile()`
Changes this line
`console.log("Celestra createFile error: too few parameters.");`
to
`throw "Celestra createFile error: too few parameters.";`

2. Add `merge()`

3. Deprecate these functions:
- `function toArray(<object>);`
- `function toObject(<array>);`

4. Remove these sections and informations:
- Object name changes
- Functional programming (FP) variant
- `function celToWindow();`
- ` function fromEntries(<entries>);`


## Celestra v2.1.0 Lacy

1. Remove `window.Celestra;`

2. Remove `celestra.celToWindow();`
3. Remove `celestra.fromEntries(<entries>);`
4. Create a new Github branch (**Celestra-2.0.x**) from v2.0.8
5. __CUT v0.8.6 changes:__ Add browser information (`navigator.appName`, etc.) in the top of the CUT html file.
6. Close the __"2.1.0 Lacy"__ milestone in v2.1.0

## Celestra v2.0.8

1. Deprecate the `function celToWindow()` - __beta.1__

2. Add `Object.fromEntries()` - __beta.1__

3. Deprecate the `celestra.fromEntries()` - __beta.1__

## Celestra v2.0.7

1. Add or replace 21 polyfills:
- Array.prototype.copyWithin() - __beta 1__
- String.fromCodePoint() - __beta 2__
- String.prototype.codePointAt() - __beta 2__
- Math.acosh() - __beta 3__
- Math.asinh() - __beta 3__
- Math.atanh() - __beta 3__
- Math.cbrt() - __beta 3__
- Math.clz32() - __beta 3__
- Math.cosh() - __beta 3__
- Math.expm1() - __beta 3__
- Math.fround() - __beta 3__
- Math.hypot() - __beta 3__
- Math.imul() - __beta 3__
- Math.log1p() - __beta 3__
- Math.log10() - __beta 3__
- Math.log2() - __beta 3__
- Math.sign() - __beta 3__
- Math.sinh() - __beta 3__
- Math.tanh() - __beta 3__
- Math.trunc() - __beta 3__
- NodeList.prototype.forEach() - _replaced with the official polyfill_ - __beta 4__

## Celestra v2.0.6

1. Modify and fix the function `getUrlVar()` and `function getUrlVarFromString()`:
- The __not found__ return value will be `null`, not `undefined`.
- Fix the empty object error: `{"":"undefined"}`
- Add new manual testcases for the __not found__ return value.
- Add new CUT testcases for the __not found__ return value.

2. Add 7 polyfills:
- `Element.prototype.toggleAttribute()`
- `Element.prototype.matches()`
- `Element.prototype.closest()`
- `Element.prototype.getAttributeNames()`
- `Number.parseInt()`
- `Number.parseFloat()`
- `Object.getOwnPropertyDescriptors()`

3. Update the u87.css to v0.9.6

4. CUT v0.8.5 changes
- Add a new function: `function isNotEdge ();` and use this at the `domCreate() - style string` test cases, because there is error in the __W10M Edge 14__.
- In the `function addElement (type, innerHTML);` the __innerHTML__ parameter will be optional.
- Rename the `function addTest ();` to `function __addTest__ ();` and use this only for inner calls and in the selftest section.
- Change the `function isEqual (step, expected, expression, strict)` from alias of the `function __addTest__ ();` to call of the `function __addTest__ ();`. The `function isEqual (...);` will replace the `function addTest ();` in the testcases.

## Celestra v2.0.5

1. Add 3 polyfills:
    String.prototype.padStart() - str.padStart(targetLength[,padString])
    String.prototype.padEnd()   - str.padEnd(targetLength[,padString])
    String.prototype.repeat()   - str.repeat(count);


2. Add 4 functions:

Name | Description
---- | -----------
`randomString([length[,specialCharactersEnabled]]);` | Generate a random string. The length parameter is optional and can be a number and the default value is 100. The specialCharactersEnabled parameter is optional and can be a boolean and the default value is false. Return the generated string.
`b64Encode(<string>);` | Unicode compatible string to base64 converter. Return the encoded string.
`b64Decode(<string>);` | Unicode compatible base64 to string converter. Return the original string.
`javaHash(<data>[,hexa]);` | Java `String.hashCode()` implementation in Javascript - this is a non-cryptographic hash function. The data parameter is mandatory and can be any type. The hexa parameter is optional and can be a boolean and sets the hexadecimal conversion of the return value and the default value is false. Return the generated integer hash.

3. Modify `function domCreate();`:

- **use with a single object too**

````
    {
       elementType: "p",
       id: "p1",
       innerHTML: "...",
       style: {"background-color": "red", "color": "white"},
       ...
    }
````

- **the style can be a string too**

````
    {
       elementType: "p",
       id: "p1",
       innerHTML: "...",
       style: "background-color: red; color: white;",
       ...
    }
````

4. CUT v0.8.4 changes:
- Add `celTest.isTrue("step", expr, true|false );`
- Add `celTest.isFalse"step", expr, true|false );`
- Add `celTest.isEqual("step", true, expr, true|false ); `
- Add `celTest.isNotEqual("step", true, expr, true|false );`
- Rename the __"Sample testcases"__ section to __"CUT Selftest"__

## Celestra v2.0.4

- Recreate the "Celestra demo plugin"
- Add 2 files: celestra-demo-plugin.html, celestra-demo-plugin.js

## Celestra v2.0.3

1. Add 5 polyfills:
- `Object.entries()`
- `Object.values()`
- `Object.is()`
- `Array.prototype.flat([depth])` - mark as proposal
- `Array.prototype.flatMap(callback)` - mark as proposal

2. Add `fromEntries(<entries>);`

3. CUT v0.8.3 changes:
- Change the date format after the library and CUT versions to ISO string
- Add new testcases

## Celestra v2.0.2

1. Add 5 polyfills:

- `Array.prototype.fill()`
- `String.prototype.trimStart()/trimLeft()`
- `String.prototype.trimEnd()/trimRight()`
- `String.prototype.startsWith()`
- `String.prototype.endsWith()`


2. Rename wrapper object from `Celestra` to `celestra`
Add a line `window.Celestra = celestra;` for compatibility reasons.
This line will be removed in the __Celestra v3.0__.

    /* global scope */
    if (typeof window !== "undefined") {
      window.celestra = celestra;
      window.Celestra = celestra;
      celestra.__prevUnderscore__ = window._;
      window._ = celestra;
    }

+ Find the name "Celestra" in the code samples in the full documentation and replace it, where it's used as object name.
+ Write a description about the changing.
+ Add new testcases and CUT testcases to test the object names. (`celestra`, `Celestra`, `_`)

3.  Add the Android Microsoft Edge to the tested browsers

4. Remove the description of the removed "doc" variable and removed functions
```
    doc = document
    repeat(<iteration>,<callback>);
    initArray();
    initObject();
    initString();
    initTrue();
    initFalse();
```

5. CUT v0.8.2 changes
A. **CUT tool**
- Rename the `Celestra unit tester`  to `Celestra Unit Tester (CUT)` in the documentation headers (celestra.html, README.md, unittest.html, unittest-fp.html)
- Change the CUT version to 0.8.2
- Change the object name from `_ct` to `_cut`
B. **Testcases**
- Change the `domCreate() and qs (core api)` textcase to `domCreate()`
- Change the `alert()` calls to `_cut.addTest() failed` in the AJAX testcases, test in Chrome
- Add testcases for the new polyfills
- Add testcases to test the object names. (`celestra`, `Celestra`, `_`)


## Celestra v2.0.1

1. Add `Array.prototype.find()`

2. Add `Array.prototype.findIndex()`
3. Add `removeTags(s)`
4. Fix the text of the celestra-cheatsheet.pdf, remove the description of the variable `doc`
5. Rename the _"Basic API"_ to _"Core API"_
6. CUT v0.8.1 changes:
- Developed in beta 3 (v0.8.0) and added in beta 4 (v0.8.1)
- Celestra unit tester - Add new HTML and JS files


## Celestra v2.0 Zoe

- Rename the milestones in Github
- Remove the FP version
- Make a new code base from the Main and FP variants in **celestra.js**
- Add a new `celToWindow()` function to emulate the FP version
- Reminimalize the code in the  in **celestra.min.js**
- Regression test with the **celestra.html, celestra-fp.html, testgame.html, testgame-fp.html**
- Changes of the cookie testcases
- Replace the `function repeat()` with a `for loop` in the testgames.
- `Number.isInteger()` documentation fixed, this was the same text as at the `Number.isSafeInteger()`
- Rename the testcase of the `function deepAssign() `from `try` to `deepAssign()`
- Add a default value (100) to the max parameter of the function random() + add a new testcase without parameter + update the documentation
- Add a new `getCookie()` function testcase without parameter -> return object, alert with the `JSON.stringify()`
- Replace the `setCookie()` function teststring with the unicode version
- Remove the deprecated functions
```
doc = document
repeat(<iteration>,<callback>);
initArray();
initObject();
initString();
initTrue();
initFalse();
```

## Celestra v1.21.1

1. Change the deprecated label at the `doc` variable in the `README.md`
2. Change these testcase names: `qsa(selector,qs(selector)).innerHTML`, `qsa(selector,context).innerHTML`
3. Update the u87.css to v0.9.5
4. Fix the testcases of the cookie functions
5. Other small text changes.

6. Deprecate functions:
```
repeat(<iteration>,<callback>);
initArray();
initObject();
initString();
initTrue();
initFalse();
```

## Celestra v1.21.0

1. Replace the function form2string() with a standalone function

2. Rename the "_prevUnderscore" variable to __ __prevUnderscore__ __

3. Change the result of the function form2array()
Array: `name=foo%20%C3%A9%C3%A1%C5%B1%C5%91%C3%BA%C3%B6%C3%BC%C3%B3%C3%AD%C3%A9%C3%A1%C5%B1%C5%91%C3%BA%C3%B6%C3%BC%C3%B3%C3%AD,password=bar,number=97,radio=male,animals=dog,animals-multiple=dog,animals-multiple=hippos,checkbox1=true,textarea1=textarea1`
The array elements will objects with name or id and value properties.
=> `{"name": "animals-multiple", "value": "dog"}`

4. Fix the testcase of the function toObject()
Replace the `typeof o1` with `getType(o1)`, because `typeof [1,2,3] -> "object"`.

5. Deprecate the doc global variable

## Celestra v1.20.1 - v1.20.6

- __u87.css v0.9.4__
- Simplify the code of the `getDoNotTrack()`
- Archive the demo plugin
- Fix the Ajax function parameters notations
- Remove the testgame1
- Add library version in the js-cheatsheet.pdf
- Add functions: `createFile();`, `isNumeric();`, `hasOwn();`
- Fix the incompatibility list of the function createFile()
  Change from:  _Doesn't work in iOS Safari and W10M Edge._
  To: _Doesn't work in iOS browsers (Safari, Firefox and Chrome) and W10M Edge._


## Celestra 1.20.0 Zephyr

- Add function `deepAssign()`
- Close the __Zephyr__ milestone


## Celestra v1.19.2

Add hasOwnProperty() object method in the extend function


## Celestra v1.19.1

Change the default cookie path to "/" (entire site)


## Celestra v1.19.0

Fix the removeCookie() function

If not found the cookie, then remove in this case too.
Path, httponly, etc. can cause the hidden cookie.

1. fix the function
2. fix the sample code


## Celestra v1.18.4

1. Remove the Classic plugin removing information in the download section!

2. Remove the v1.17.0 variants information in the download section!
3. Update the u87.css and the testgame2 custom css!
4. Add ASCII logo in the HTML files and in the README.md!
5. Merge the main and the FP cheatsheets!


## Celestra v1.18.3

1. Add "initType" functions:
```
    function initArray () { return []; }
    function initObject () { return {}; }
    function initString () { return ""; }
    function initTrue () { return true; }
    function initFalse () { return false; }
```
2. Change the default css to the external u87.css in the HTML documentations and sample files


## Celestra v1.18.2

Add js-cheatsheet.pdf


## Celestra v1.18.1

- Add `form2array()`
- Add `form2string()`

## Celestra v1.18.0

1. __Modify the type functions__:
- Add getType() testcase in the documentation for date
- Add getType() testcase in the documentation for regexp
- Add function isDate()
- Add function isRegexp()
- Add function isElement()

2. __Add cookie functions__
3. __Fix geturlvar functions__


## Celestra v1.17.2

- Fix the versions


## Celestra v1.17.1

- Rename module*.* test files to testmodule*.*
- Remove the Plugins section
- Remove the Classic plugin
- Change the "can be" texts to "has to be" where the FN parameters are mandatory


## Celestra v1.17.0 Caprica

Make a wrapper object and modify the code and the documentation

`qsa();` -> `Celestra.qsa();` and/or `_.qsa();`
`domSetCSS();` -> `Celestra.domSetCSS();` and/or `_.domSetCSS();`


## Celestra v1.16.3

- Fix the identity() function testcase


## Celestra v1.16.2

- Add `each();` function


## Celestra v1.16.1

- Remove the deprecated and removed functions
- Add testgame2.html


## Celestra v1.16.0

- Add type checking functions
- Add cheatsheet.pdf


## Celestra v1.15.6

- Documentation fix - remove the links to the migrate-1.12.1.js file


## Celestra v1.15.5

Fix the `function obj2string (o)`


## Celestra v1.15.4

- Add `obj2string(<object>);`
- Add `getUrlVarFromString(<querystr>[,name]);`


## Celestra v1.15.2

- Remove the renamined info at the domFadeIn, domFadeOut, domFadeToggle functions
- Fix: README.MD bug - double entry: getLocation(<success>[,error]);


## Celestra v1.15.1

- Add identity function: `function identity (v) { return v; }`

## Celestra v1.15.0

- New project name: __Celestra__
