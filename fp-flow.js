(function (global, factory) {
       typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
       typeof define === 'function' && define.amd ? define(['exports'], factory) :
       (factory((global.FpFlow = {})));
}(this, (function (exports) { 'use strict';

       function _isPlaceholder(a) {
              return a != null && typeof a === 'object' && a['@@functional/placeholder'] === true;
       }
       var _isPlaceholder_1 = _isPlaceholder;

       /**
        * Optimized internal one-arity curry function.
        *
        * @private
        * @category Function
        * @param {Function} fn The function to curry.
        * @return {Function} The curried function.
        */


       function _curry1(fn) {
         return function f1(a) {
           if (arguments.length === 0 || _isPlaceholder_1(a)) {
             return f1;
           } else {
             return fn.apply(this, arguments);
           }
         };
       }
       var _curry1_1 = _curry1;

       function _arity(n, fn) {
         /* eslint-disable no-unused-vars */
         switch (n) {
           case 0:
             return function () {
               return fn.apply(this, arguments);
             };
           case 1:
             return function (a0) {
               return fn.apply(this, arguments);
             };
           case 2:
             return function (a0, a1) {
               return fn.apply(this, arguments);
             };
           case 3:
             return function (a0, a1, a2) {
               return fn.apply(this, arguments);
             };
           case 4:
             return function (a0, a1, a2, a3) {
               return fn.apply(this, arguments);
             };
           case 5:
             return function (a0, a1, a2, a3, a4) {
               return fn.apply(this, arguments);
             };
           case 6:
             return function (a0, a1, a2, a3, a4, a5) {
               return fn.apply(this, arguments);
             };
           case 7:
             return function (a0, a1, a2, a3, a4, a5, a6) {
               return fn.apply(this, arguments);
             };
           case 8:
             return function (a0, a1, a2, a3, a4, a5, a6, a7) {
               return fn.apply(this, arguments);
             };
           case 9:
             return function (a0, a1, a2, a3, a4, a5, a6, a7, a8) {
               return fn.apply(this, arguments);
             };
           case 10:
             return function (a0, a1, a2, a3, a4, a5, a6, a7, a8, a9) {
               return fn.apply(this, arguments);
             };
           default:
             throw new Error('First argument to _arity must be a non-negative integer no greater than ten');
         }
       }
       var _arity_1 = _arity;

       /**
        * Optimized internal two-arity curry function.
        *
        * @private
        * @category Function
        * @param {Function} fn The function to curry.
        * @return {Function} The curried function.
        */


       function _curry2(fn) {
         return function f2(a, b) {
           switch (arguments.length) {
             case 0:
               return f2;
             case 1:
               return _isPlaceholder_1(a) ? f2 : _curry1_1(function (_b) {
                 return fn(a, _b);
               });
             default:
               return _isPlaceholder_1(a) && _isPlaceholder_1(b) ? f2 : _isPlaceholder_1(a) ? _curry1_1(function (_a) {
                 return fn(_a, b);
               }) : _isPlaceholder_1(b) ? _curry1_1(function (_b) {
                 return fn(a, _b);
               }) : fn(a, b);
           }
         };
       }
       var _curry2_1 = _curry2;

       /**
        * Internal curryN function.
        *
        * @private
        * @category Function
        * @param {Number} length The arity of the curried function.
        * @param {Array} received An array of arguments received thus far.
        * @param {Function} fn The function to curry.
        * @return {Function} The curried function.
        */


       function _curryN(length, received, fn) {
         return function () {
           var combined = [];
           var argsIdx = 0;
           var left = length;
           var combinedIdx = 0;
           while (combinedIdx < received.length || argsIdx < arguments.length) {
             var result;
             if (combinedIdx < received.length && (!_isPlaceholder_1(received[combinedIdx]) || argsIdx >= arguments.length)) {
               result = received[combinedIdx];
             } else {
               result = arguments[argsIdx];
               argsIdx += 1;
             }
             combined[combinedIdx] = result;
             if (!_isPlaceholder_1(result)) {
               left -= 1;
             }
             combinedIdx += 1;
           }
           return left <= 0 ? fn.apply(this, combined) : _arity_1(left, _curryN(length, combined, fn));
         };
       }
       var _curryN_1 = _curryN;

       /**
        * Returns a curried equivalent of the provided function, with the specified
        * arity. The curried function has two unusual capabilities. First, its
        * arguments needn't be provided one at a time. If `g` is `R.curryN(3, f)`, the
        * following are equivalent:
        *
        *   - `g(1)(2)(3)`
        *   - `g(1)(2, 3)`
        *   - `g(1, 2)(3)`
        *   - `g(1, 2, 3)`
        *
        * Secondly, the special placeholder value [`R.__`](#__) may be used to specify
        * "gaps", allowing partial application of any combination of arguments,
        * regardless of their positions. If `g` is as above and `_` is [`R.__`](#__),
        * the following are equivalent:
        *
        *   - `g(1, 2, 3)`
        *   - `g(_, 2, 3)(1)`
        *   - `g(_, _, 3)(1)(2)`
        *   - `g(_, _, 3)(1, 2)`
        *   - `g(_, 2)(1)(3)`
        *   - `g(_, 2)(1, 3)`
        *   - `g(_, 2)(_, 3)(1)`
        *
        * @func
        * @memberOf R
        * @since v0.5.0
        * @category Function
        * @sig Number -> (* -> a) -> (* -> a)
        * @param {Number} length The arity for the returned function.
        * @param {Function} fn The function to curry.
        * @return {Function} A new, curried function.
        * @see R.curry
        * @example
        *
        *      var sumArgs = (...args) => R.sum(args);
        *
        *      var curriedAddFourNumbers = R.curryN(4, sumArgs);
        *      var f = curriedAddFourNumbers(1, 2);
        *      var g = f(3);
        *      g(4); //=> 10
        */


       var curryN = /*#__PURE__*/_curry2_1(function curryN(length, fn) {
         if (length === 1) {
           return _curry1_1(fn);
         }
         return _arity_1(length, _curryN_1(length, [], fn));
       });
       var curryN_1 = curryN;

       /**
        * Returns a curried equivalent of the provided function. The curried function
        * has two unusual capabilities. First, its arguments needn't be provided one
        * at a time. If `f` is a ternary function and `g` is `R.curry(f)`, the
        * following are equivalent:
        *
        *   - `g(1)(2)(3)`
        *   - `g(1)(2, 3)`
        *   - `g(1, 2)(3)`
        *   - `g(1, 2, 3)`
        *
        * Secondly, the special placeholder value [`R.__`](#__) may be used to specify
        * "gaps", allowing partial application of any combination of arguments,
        * regardless of their positions. If `g` is as above and `_` is [`R.__`](#__),
        * the following are equivalent:
        *
        *   - `g(1, 2, 3)`
        *   - `g(_, 2, 3)(1)`
        *   - `g(_, _, 3)(1)(2)`
        *   - `g(_, _, 3)(1, 2)`
        *   - `g(_, 2)(1)(3)`
        *   - `g(_, 2)(1, 3)`
        *   - `g(_, 2)(_, 3)(1)`
        *
        * @func
        * @memberOf R
        * @since v0.1.0
        * @category Function
        * @sig (* -> a) -> (* -> a)
        * @param {Function} fn The function to curry.
        * @return {Function} A new, curried function.
        * @see R.curryN
        * @example
        *
        *      var addFourNumbers = (a, b, c, d) => a + b + c + d;
        *
        *      var curriedAddFourNumbers = R.curry(addFourNumbers);
        *      var f = curriedAddFourNumbers(1, 2);
        *      var g = f(3);
        *      g(4); //=> 10
        */


       var curry = /*#__PURE__*/_curry1_1(function curry(fn) {
         return curryN_1(fn.length, fn);
       });
       var curry_1 = curry;

       var isArray = Array.isArray;
       var keyList = Object.keys;
       var hasProp = Object.prototype.hasOwnProperty;

       var fastDeepEqual = function equal(a, b) {
         if (a === b) return true;

         if (a && b && typeof a == 'object' && typeof b == 'object') {
           var arrA = isArray(a)
             , arrB = isArray(b)
             , i
             , length
             , key;

           if (arrA && arrB) {
             length = a.length;
             if (length != b.length) return false;
             for (i = length; i-- !== 0;)
               if (!equal(a[i], b[i])) return false;
             return true;
           }

           if (arrA != arrB) return false;

           var dateA = a instanceof Date
             , dateB = b instanceof Date;
           if (dateA != dateB) return false;
           if (dateA && dateB) return a.getTime() == b.getTime();

           var regexpA = a instanceof RegExp
             , regexpB = b instanceof RegExp;
           if (regexpA != regexpB) return false;
           if (regexpA && regexpB) return a.toString() == b.toString();

           var keys = keyList(a);
           length = keys.length;

           if (length !== keyList(b).length)
             return false;

           for (i = length; i-- !== 0;)
             if (!hasProp.call(b, keys[i])) return false;

           for (i = length; i-- !== 0;) {
             key = keys[i];
             if (!equal(a[key], b[key])) return false;
           }

           return true;
         }

         return a!==a && b!==b;
       };

       var Left = 'Left';
       var Right = 'Right';
       var Just = 'Just';
       var Nothing = 'Nothing';
       var Success = 'Success';
       var Failure = 'Failure';
       var NotAsked = 'NotAsked';
       var Loading = 'Loading';
       var IO = 'IO';
       var GT = 'GT';
       var LT = 'LT';
       var EQ = 'EQ';

       var pure = function pure(x) {
         return {
           tag: Right,
           value: x
         };
       };
       var right$1 = pure;
       var of = pure;
       var left$1 = function left(x) {
         return {
           tag: Left,
           value: x
         };
       };
       var fromNullable = function fromNullable(x) {
         return x == null ? left$1(x) : right$1(x);
       };
       var tryCatch = curry_1(function (l, r) {
         try {
           return right$1(r());
         } catch (err) {
           left$1(l(err));
         }
       });
       var fromMaybe = curry_1(function (err, maybe) {
         switch (maybe.tag) {
           case Just:
             return right$1(maybe.value);

           case Nothing:
             return typeof err === 'function' ? left$1(err()) : left$1(err);
         }
       });
       var toMaybe = function toMaybe(x) {
         switch (x.tag) {
           case Left:
             return nothing();

           case Right:
             return just(maybe.value);
         }
       };
       var map = curry_1(function (f, x) {
         switch (x.tag) {
           case Left:
             return x;

           case Right:
             return right$1(f(x.value));
         }
       });
       var mapLeft = curry_1(function (f, x) {
         switch (x.tag) {
           case Left:
             return left$1(f(x.value));

           case Right:
             return x;
         }
       });
       var bimap = curry_1(function (f, g, x) {
         switch (x.tag) {
           case Left:
             return left$1(f(x.value));

           case Right:
             return right$1(f(x.value));
         }
       });
       var fold = curry_1(function (l, r, x) {
         switch (x.tag) {
           case Left:
             return l(x.value);

           case Right:
             return r(x.value);
         }
       });
       var chain = curry_1(function (f, x) {
         switch (x.tag) {
           case Left:
             return x;

           case Right:
             return f(x.value);
         }
       });
       var flatMap = chain;
       var bind = chain;
       var ap = curry_1(function (f, x) {
         return map(f.value, x);
       });
       var unsafeGet = function unsafeGet(x) {
         switch (x.tag) {
           case Right:
             return x.value;

           case Left:
             throw new Error("Cannot extract the value of a ".concat(x.tag));
         }
       };
       var getOrElse = curry_1(function (f, x) {
         switch (x.tag) {
           case Right:
             return x.value;

           case Left:
             return f(x.value);
         }
       });
       var isLeft = function isLeft(x) {
         return x.tag === Left;
       };
       var isRight = function isRight(x) {
         return x.tag === Right;
       };
       var equals = function equals(x, y) {
         return x === y || fastDeepEqual(x, y);
       };

       var either$1 = /*#__PURE__*/Object.freeze({
              pure: pure,
              right: right$1,
              of: of,
              left: left$1,
              fromNullable: fromNullable,
              tryCatch: tryCatch,
              fromMaybe: fromMaybe,
              toMaybe: toMaybe,
              map: map,
              mapLeft: mapLeft,
              bimap: bimap,
              fold: fold,
              chain: chain,
              flatMap: flatMap,
              bind: bind,
              ap: ap,
              unsafeGet: unsafeGet,
              getOrElse: getOrElse,
              isLeft: isLeft,
              isRight: isRight,
              equals: equals
       });

       /**
        * Private `concat` function to merge two array-like objects.
        *
        * @private
        * @param {Array|Arguments} [set1=[]] An array-like object.
        * @param {Array|Arguments} [set2=[]] An array-like object.
        * @return {Array} A new, merged array.
        * @example
        *
        *      _concat([4, 5, 6], [1, 2, 3]); //=> [4, 5, 6, 1, 2, 3]
        */
       function _concat(set1, set2) {
         set1 = set1 || [];
         set2 = set2 || [];
         var idx;
         var len1 = set1.length;
         var len2 = set2.length;
         var result = [];

         idx = 0;
         while (idx < len1) {
           result[result.length] = set1[idx];
           idx += 1;
         }
         idx = 0;
         while (idx < len2) {
           result[result.length] = set2[idx];
           idx += 1;
         }
         return result;
       }
       var _concat_1 = _concat;

       /**
        * Returns a new list containing the contents of the given list, followed by
        * the given element.
        *
        * @func
        * @memberOf R
        * @since v0.1.0
        * @category List
        * @sig a -> [a] -> [a]
        * @param {*} el The element to add to the end of the new list.
        * @param {Array} list The list of elements to add a new item to.
        *        list.
        * @return {Array} A new list containing the elements of the old list followed by `el`.
        * @see R.prepend
        * @example
        *
        *      R.append('tests', ['write', 'more']); //=> ['write', 'more', 'tests']
        *      R.append('tests', []); //=> ['tests']
        *      R.append(['tests'], ['write', 'more']); //=> ['write', 'more', ['tests']]
        */


       var append = /*#__PURE__*/_curry2_1(function append(el, list) {
         return _concat_1(list, [el]);
       });
       var append_1 = append;

       var pure$1 = function pure(x) {
         return {
           value: x,
           tag: Just
         };
       };
       var just$1 = pure$1;
       var of$1 = pure$1;
       var nothing$1 = function nothing() {
         return {
           tag: Nothing
         };
       };
       var fromNullable$1 = function fromNullable(x) {
         return x == null ? nothing$1() : just$1(x);
       };
       var map$1 = curry_1(function (f, x) {
         switch (x.tag) {
           case Just:
             return just$1(f(x.value));

           case Nothing:
             return x;
         }
       });
       var all = curry_1(function (f, arr) {
         return arr.reduce(function (acc, it) {
           return ap$1(map$1(append_1, it), acc);
         }, of$1([]));
       });
       var mapAll = curry_1(function (f, arr) {
         return arr.reduce(function (acc, it) {
           return ap$1(map$1(append_1, map$1(f, it)), acc);
         }, of$1([]));
       });
       var map2 = curry_1(function (f, m1, m2) {
         return mapAll(f, [m1, m2]);
       });
       var map3 = curry_1(function (f, m1, m2, m3) {
         return mapAll(f, [m1, m2, m3]);
       });
       var map4 = curry_1(function (f, m1, m2, m3, m4) {
         return mapAll(f, [m1, m2, m3, m4]);
       });
       var chain$1 = curry_1(function (f, x) {
         switch (x.tag) {
           case Just:
             return f(x.value);

           case Nothing:
             return x;
         }
       });
       var flatMap$1 = chain$1;
       var bind$1 = chain$1;
       var fold$1 = curry_1(function (n, j, x) {
         switch (x.tag) {
           case Just:
             return j(x.value);

           case Nothing:
             return n();
         }
       });
       var ap$1 = curry_1(function (f, x) {
         return isJust(f) ? map$1(f.value, x) : nothing$1();
       });
       var unsafeGet$1 = function unsafeGet(x) {
         switch (x.tag) {
           case Just:
             return x.value;

           case Nothing:
             throw new TypeError("Cannot extract the value of a ".concat(x.tag));
         }
       };
       var getOrElse$1 = curry_1(function (f, x) {
         switch (x.tag) {
           case Just:
             return x.value;

           case Nothing:
             return f();
         }
       });
       var isJust = function isJust(x) {
         return x.tag === Just;
       };
       var isNothing = function isNothing(x) {
         return x.tag === Nothing;
       };
       var equals$1 = function equals(x, y) {
         if (isNothing(x) && isNothing(y)) {
           return true;
         } else if (isJust(x) && isJust(y)) {
           return x === y || fastDeepEqual(x, y);
         } else {
           return false;
         }
       };
       var fromEither = function fromEither(either) {
         switch (either.tag) {
           case Left:
             return nothing$1();

           case Right:
             return just$1(either.value);
         }
       };
       var toEither = curry_1(function (err, x) {
         switch (x.tag) {
           case Just:
             return right(either.value);

           case Nothing:
             return typeof err === 'function' ? left(err()) : left(err);
         }
       });

       var maybe$1 = /*#__PURE__*/Object.freeze({
              pure: pure$1,
              just: just$1,
              of: of$1,
              nothing: nothing$1,
              fromNullable: fromNullable$1,
              map: map$1,
              map2: map2,
              map3: map3,
              map4: map4,
              chain: chain$1,
              flatMap: flatMap$1,
              bind: bind$1,
              fold: fold$1,
              ap: ap$1,
              unsafeGet: unsafeGet$1,
              getOrElse: getOrElse$1,
              isJust: isJust,
              isNothing: isNothing,
              equals: equals$1,
              fromEither: fromEither,
              toEither: toEither
       });

       /**
        * Returns a new list with the given element at the front, followed by the
        * contents of the list.
        *
        * @func
        * @memberOf R
        * @since v0.1.0
        * @category List
        * @sig a -> [a] -> [a]
        * @param {*} el The item to add to the head of the output list.
        * @param {Array} list The array to add to the tail of the output list.
        * @return {Array} A new array.
        * @see R.append
        * @example
        *
        *      R.prepend('fee', ['fi', 'fo', 'fum']); //=> ['fee', 'fi', 'fo', 'fum']
        */


       var prepend = /*#__PURE__*/_curry2_1(function prepend(el, list) {
         return _concat_1([el], list);
       });
       var prepend_1 = prepend;

       var pure$2 = function pure(x) {
         return {
           value: x,
           tag: Success
         };
       };
       var success = pure$2;
       var of$2 = success;
       var failure = function failure(err) {
         return {
           value: err,
           tag: Failure
         };
       };
       var notAsked = function notAsked() {
         return {
           tag: NotAsked
         };
       };
       var loading = function loading() {
         return {
           tag: Loading
         };
       };
       var fromNullable$2 = function fromNullable(x) {
         return x == null ? notAsked() : success(x);
       };
       var fold$2 = curry_1(function (cases, rd) {
         switch (rd.tag) {
           case Success:
             return cases.Success(rd.value);

           case Failure:
             return cases.Failure(rd.value);

           case NotAsked:
             return cases.NotAsked();

           case Loading:
             return cases.Loading();
         }
       });
       var map$2 = curry_1(function (f, x) {
         switch (x.tag) {
           case Success:
             return success(f(x.value));

           case Failure:
             return x;

           case NotAsked:
             return x;

           case Loading:
             return x;
         }
       });
       var mapLeft$1 = curry_1(function (f, rd) {
         switch (rd.tag) {
           case Success:
             return rd;

           case Failure:
             return failure(f(rd.value));

           case NotAsked:
             return rd;

           case Loading:
             return rd;
         }
       });
       var chain$2 = curry_1(function (f, rd) {
         switch (rd.tag) {
           case Success:
             return f(rd.value);

           case Failure:
             return rd;

           case NotAsked:
             return rd;

           case Loading:
             return rd;
         }
       });
       var ap$2 = curry_1(function (f, rd) {
         switch (f.tag) {
           case Success:
             return map$2(f.value, rd);

           case Failure:
             return f;

           case NotAsked:
             return f;

           case Loading:
             return f;
         }
       });
       var all$1 = function all(arr) {
         return arr.reduceRight(function (acc, it) {
           return ap$2(map$2(prepend_1, it), acc);
         }, of$2([]));
       };
       var flatMap$2 = chain$2;
       var bind$2 = chain$2;
       var unsafeGet$2 = function unsafeGet(rd) {
         switch (rd.tag) {
           case Success:
             return rd.value;

           default:
             throw new Error("Cannot extract the value of a ".concat(rd.tag));
         }
       };
       var getOrElse$2 = curry_1(function (x, rd) {
         switch (rd.tag) {
           case Success:
             return rd.value;

           default:
             return x();
         }
       });
       var isSuccess = function isSuccess(_ref) {
         var tag = _ref.tag;
         return tag === Success;
       };
       var isFailure = function isFailure(_ref2) {
         var tag = _ref2.tag;
         return tag === Failure;
       };
       var isLoading = function isLoading(_ref3) {
         var tag = _ref3.tag;
         return tag === Loading;
       };
       var isNotAsked = function isNotAsked(_ref4) {
         var tag = _ref4.tag;
         return tag === NotAsked;
       };
       var equals$2 = function equals(x, y) {
         return x === y || fastDeepEqual(x, y);
       };
       var toMaybe$1 = function toMaybe(rd) {
         switch (rd.tag) {
           case Success:
             return just$1(rd.value);

           case Failure:
             return nothing$1();

           case NotAsked:
             return nothing$1();

           case Loading:
             return nothing$1();
         }
       };
       var fromMaybe$1 = function fromMaybe(maybe) {
         switch (maybe.tag) {
           case Just:
             return success(maybe.value);

           case Nothing:
             return notAsked();
         }
       };
       var toEither$1 = function toEither$$1(rd, fallback) {
         switch (rd.tag) {
           case Success:
             return right(rd.value);

           case Failure:
             return left(rd.value);

           case NotAsked:
             return left(fallback());

           case Loading:
             return left(fallback());
         }
       };
       var fromEither$1 = function fromEither$$1(either) {
         switch (either.tag) {
           case Left:
             return failure(either.value);

           case Right:
             return success(either.value);
         }
       };

       var remoteData = /*#__PURE__*/Object.freeze({
              pure: pure$2,
              success: success,
              of: of$2,
              failure: failure,
              notAsked: notAsked,
              loading: loading,
              fromNullable: fromNullable$2,
              fold: fold$2,
              map: map$2,
              mapLeft: mapLeft$1,
              chain: chain$2,
              ap: ap$2,
              all: all$1,
              flatMap: flatMap$2,
              bind: bind$2,
              unsafeGet: unsafeGet$2,
              getOrElse: getOrElse$2,
              isSuccess: isSuccess,
              isFailure: isFailure,
              isLoading: isLoading,
              isNotAsked: isNotAsked,
              equals: equals$2,
              toMaybe: toMaybe$1,
              fromMaybe: fromMaybe$1,
              toEither: toEither$1,
              fromEither: fromEither$1
       });

       var from = function from(effect) {
         return {
           tag: IO,
           effect: effect
         };
       };
       var of$3 = function of(x) {
         return {
           tag: IO,
           effect: function effect() {
             return x;
           }
         };
       };
       var map$3 = curry_1(function (f, x) {
         return from(function () {
           return f(x.effect());
         });
       });
       var ap$3 = curry_1(function (f, x) {
         return from(function () {
           return run(f)(run(x));
         });
       });
       var chain$3 = curry_1(function (f, x) {
         return f(x.effect());
       });
       var run = function run(x) {
         return x.effect();
       };

       var io = /*#__PURE__*/Object.freeze({
              from: from,
              of: of$3,
              map: map$3,
              ap: ap$3,
              chain: chain$3,
              run: run
       });

       var compare = curry_1(function (x, y) {
         if (x > y) return GT;else if (x < y) return LT;else return EQ;
       });

       var ordering = /*#__PURE__*/Object.freeze({
              compare: compare,
              GT: GT,
              LT: LT,
              EQ: EQ
       });

       var pipe = function pipe() {
         for (var _len = arguments.length, funs = new Array(_len), _key = 0; _key < _len; _key++) {
           funs[_key] = arguments[_key];
         }

         return function (x) {
           return funs.reduce(function (acc, f) {
             return f(acc);
           }, x);
         };
       };

       var compose = function compose() {
         for (var _len = arguments.length, funs = new Array(_len), _key = 0; _key < _len; _key++) {
           funs[_key] = arguments[_key];
         }

         return function (x) {
           return funs.reduceRight(function (acc, f) {
             return f(acc);
           }, x);
         };
       };

       var tap = curry_1(function (f, x) {
         f();
         return x;
       });

       var flip = function flip(f) {
         return function (x, y) {
           for (var _len = arguments.length, rest = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
             rest[_key - 2] = arguments[_key];
           }

           return f.apply(void 0, [y, x].concat(rest));
         };
       };

       // @flow

       exports.either = either$1;
       exports.maybe = maybe$1;
       exports.remoteData = remoteData;
       exports.io = io;
       exports.pipe = pipe;
       exports.compose = compose;
       exports.tap = tap;
       exports.ordering = ordering;
       exports.flip = flip;

       Object.defineProperty(exports, '__esModule', { value: true });

})));
