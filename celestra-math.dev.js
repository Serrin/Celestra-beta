/**
 * @name Celestra Math plugin
 * @version 5.5.0 dev
 * @see https://github.com/Serrin/Celestra
 * @license MIT https://opensource.org/licenses/MIT
 * Required Celestra version: 5.5.0
 */

(function(celestra){
"use strict";

celestra.sum = (f, ...a) => a.reduce((acc, v) => acc + v, f);

celestra.avg = (f, ...a) => a.reduce((acc, v) => acc + v, f) / (a.length + 1);

celestra.product = (f, ...a) => a.reduce((acc, v) => acc * v, f);

celestra.clamp = (v, i, a) => (v > a ? a : v < i ? i : v);

celestra.isEven = (v) => {
  let r = v % 2;
  if (!Number.isNaN(r)) { return r === 0; }
  return false;
};

celestra.isOdd = (v) => {
  let r = v % 2;
  if (!Number.isNaN(r)) { return r !== 0; }
  return false;
};

celestra.toInt8 = (v) =>
  ((v = Math.min(Math.max(-128, Math.trunc(+v)), 127)) === v) ? v : 0;
celestra.toUInt8 = (v) =>
  ((v = Math.min(Math.max(0, Math.trunc(+v)), 255)) === v) ? v : 0;

celestra.toInt16 = (v) =>
  ((v = Math.min(Math.max(-32768, Math.trunc(+v)), 32767)) === v) ? v : 0;
celestra.toUInt16 = (v) =>
  ((v = Math.min(Math.max(0, Math.trunc(+v)), 65535)) === v) ? v : 0;

celestra.toInt32 = (v) =>
  ((v = Math.min(Math.max(-2147483648, Math.trunc(+v)), 2147483647)) === v)?v:0;
celestra.toUInt32 = (v) =>
  ((v = Math.min(Math.max(0, Math.trunc(+v)), 4294967295)) === v) ? v : 0;

celestra.toBigInt64 = (v) => BigInt(typeof v === "bigint"
  ? (v > Math.pow(2,63)-1 ?Math.pow(2,63)-1:v<Math.pow(-2,63)?Math.pow(-2,63):v)
  : ((v=Math.min(Math.max(Math.pow(-2,63),Math.trunc(+v)),Math.pow(2,63)-1))===v
    ) ? v : 0
);
celestra.toBigUInt64 = (v) => BigInt(typeof v === "bigint"
  ? (v > Math.pow(2, 64) - 1 ? Math.pow(2, 64) - 1 : v < 0 ? 0 : v)
  : ((v=Math.min(Math.max(0, Math.trunc(+v)), Math.pow(2,64) -1)) === v) ? v : 0
);

celestra.toFloat32 = (v) =>
  ((v = Math.min(Math.max(-3.4e38, +v), 3.4e38)) === v) ? v : 0;

celestra.isInt8 = (v) => (Number.isInteger(v) ? (v >= -128 && v <= 127) :false);
celestra.isUInt8 = (v) => (Number.isInteger(v) ? (v >= 0 && v <= 255) : false);

celestra.isInt16 = (v) => (Number.isInteger(v) ?(v>=-32768 && v<=32767) :false);
celestra.isUInt16 = (v) => (Number.isInteger(v) ? (v >= 0 && v<=65535) : false);

celestra.isInt32 = (v) =>
  (Number.isInteger(v) ? (v >= -2147483648 && v <= 2147483647) : false);
celestra.isUInt32 = (v) => (Number.isInteger(v) ?(v>=0 && v<=4294967295):false);

celestra.isBigInt64 = (v) => (typeof v === "bigint"
  ? (v >= Math.pow(-2, 63) && v <= Math.pow(2, 63)-1) : false);
celestra.isBigUInt64 = (v) =>
  (typeof v === "bigint" ? (v >= 0 && v <= Math.pow(2,64)-1) : false);

}(celestra));
