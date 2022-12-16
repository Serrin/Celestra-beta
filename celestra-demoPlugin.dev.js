/**
 * @name Celestra demo plugin
 * @version 5.5.1 dev
 * @see https://github.com/Serrin/Celestra
 * @license MIT https://opensource.org/licenses/MIT
 * Required Celestra version: 5.5.1
 */

(function(celestra){
"use strict";

function collect (it, mapFn) {
  var r = [], i = 0;
  for (let item of it) {
    if (typeof mapFn !== "function") {
      r.push(item);
    } else {
      r.push(mapFn(item, i++));
    }
  }
  return r;
}

celestra.collect = collect;

}(celestra));
