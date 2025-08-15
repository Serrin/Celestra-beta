/**
 * @name Celestra Assert plugin
 * @version 6.0.0 dev
 * @see https://github.com/Serrin/Celestra
 * @license MIT https://opensource.org/licenses/MIT
 * Required Celestra version: 6.0.0
 */

(function(globalThis, celestra){
"use strict";

const assert = function (c, m) { return celestra.assert(c, m); };

assert.strict = true;

assert.ok = (c, m) => celestra.assert(c, m);

assert.isTrue = (c, m) => celestra.assertTrue(c, m);

assert.isFalse = (c, m) => celestra.assertFalse(c, m);

assert.equal = (x, y, m) => (
  assert.strict ? celestra.assertStrictEqual(x, y, m)
    : celestra.assertEqual(x, y, m)
);

assert.notEqual = (x, y, m) => (
  assert.strict ? celestra.assertNotStrictEqual(x, y, m)
    : celestra.assertNotEqual(x, y, m)
);

assert.strictEqual = (x, y, m) => celestra.assertStrictEqual(x, y, m);

assert.notStrictEqual = (x, y, m) => celestra.assertNotStrictEqual(x, y, m);

assert.deepEqual = (x, y, m) => (
  assert.strict ? celestra.assertDeepStrictEqual(x, y, m)
    : celestra.assertDeepEqual(x, y, m)
);

assert.notDeepEqual = (x, y, m) => (
  assert.strict ? celestra.assertNotDeepStrictEqual(x, y, m)
    : celestra.assertNotDeepEqual(x, y, m)
);

assert.deepStrictEqual = (x, y, m) => celestra.assertDeepStrictEqual(x, y, m);

assert.notDeepStrictEqual = (x, y, m) =>
  celestra.assertNotDeepStrictEqual(x, y, m);

assert.typeOf = (v, t, m) => celestra.assertTypeOf(v, t, m);

assert.notTypeOf = (v, t, m) => celestra.assertNotTypeOf(v, t, m);

assert.instanceOf = (v, t, m) => celestra.assertInstanceOf(v, t, m);

assert.notInstanceOf = (v, t, m) => celestra.assertNotInstanceOf(v, t, m);

assert.isNil = (v, m) => celestra.assertIsNil(v, m);

assert.isNotNil = (v, m) => celestra.assertIsNotNil(v, m);

assert.Throws = (cb, m) => celestra.assertThrows(cb, m);

assert.fail = (m) => celestra.assertFail(m);

assert.match = (s, r, m) => celestra.assertMatch(s, r, m);

assert.doesNotMatch = (s, r, m) => celestra.assertDoesNotMatch(s, r, m);

globalThis.assert = assert;

}(globalThis, celestra));
