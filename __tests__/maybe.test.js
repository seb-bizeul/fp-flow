// @flow
import test from 'tape'

import { maybe, pipe } from '../src'

const a = 1
const b = 3
const x = 5
const y = 10
const z = 100
const zero = () => 0
const double = x => x * 2
const triple = x => x * 3
const add = (a, b) => a + b
const add3 = (a, b, c) => add(a, b) + c
const add4 = (a, b, c, d) => add3(a, b, c) + d
const add5 = (a, b, c, d, e) => add4(a, b, c, d) + e


test('pure', t => {
  const output = maybe.pure(x)
  const expected = {
    tag: 'Just',
    value: x
  }
  t.deepEqual(output, expected)
  t.end()
})

test('just constructor', t => {
  const output = maybe.just(x)
  const expected = {
    tag: 'Just',
    value: x
  }
  t.deepEqual(output, expected)
  t.end()
})

test('nothing constructor', t => {
  const output = maybe.nothing()
  const expected = { tag: 'Nothing' }
  t.deepEqual(output, expected)
  t.end()
})

test('maybe of', t => {
  const output = maybe.of(x)
  t.deepEqual(output, maybe.just(x))
  t.end()
})

test('maybe from nullable', t => {
  const just = maybe.fromNullable(x)
  t.deepEqual(just, maybe.just(x))
  const nothing = maybe.fromNullable(null)
  t.deepEqual(nothing, maybe.nothing())
  t.end()
})

test('maybe map', t => {
  const output = pipe(
    maybe.of,
    maybe.map(double)
  )(x)
  const expected = pipe(
    double,
    maybe.just
  )(x)
  t.deepEqual(output, expected)
  t.end()
})

test('maybe - lift2 just', t => {
  const output = maybe.lift2(maybe.of(add), maybe.of(x), maybe.of(y))
  const expected = maybe.just(add(x, y))
  t.deepEqual(output, expected)
  t.end()
})

test('maybe - lift2 nothing', t => {
  const output = maybe.lift2(maybe.nothing(), maybe.of(x), maybe.of(y))
  t.deepEqual(output, maybe.nothing())
  t.end()
})

test('maybe - lift2 nothing first arg', t => {
  const output = maybe.lift2(maybe.of(add), maybe.nothing(), maybe.of(y))
  t.deepEqual(output, maybe.nothing())
  t.end()
})

test('maybe - lift2 nothing second arg', t => {
  const output = maybe.lift2(maybe.of(add), maybe.of(x), maybe.nothing())
  t.deepEqual(output, maybe.nothing())
  t.end()
})

test('maybe - lift3 just', t => {
  const output = maybe.lift3(maybe.of(add3), maybe.of(x), maybe.of(y), maybe.of(z))
  const expected = maybe.just(add3(x, y, z))
  t.deepEqual(output, expected)
  t.end()
})

test('maybe - lift3 nothing', t => {
  const output = maybe.lift3(maybe.nothing(), maybe.of(x), maybe.of(y), maybe.of(z))
  t.deepEqual(output, maybe.nothing())
  t.end()
})

test('maybe - lift3 nothing first arg', t => {
  const output = maybe.lift3(maybe.of(add3), maybe.nothing(), maybe.of(x), maybe.of(y))
  t.deepEqual(output, maybe.nothing())
  t.end()
})

test('maybe - lift3 nothing second arg', t => {
  const output = maybe.lift3(maybe.of(add3), maybe.of(x), maybe.nothing(), maybe.of(y))
  t.deepEqual(output, maybe.nothing())
  t.end()
})

test('maybe - lift3 nothing third arg', t => {
  const output = maybe.lift3(maybe.of(add3), maybe.of(x), maybe.of(y), maybe.nothing())
  t.deepEqual(output, maybe.nothing())
  t.end()
})

test('maybe - map2 with just', t => {
  const output = maybe.map2(add, maybe.of(x), maybe.of(y))
  t.deepEqual(output, maybe.just(add(x, y)))
  t.end()
})

test('maybe - map2 with nothing', t => {
  const output = maybe.map2(add, maybe.of(x), maybe.nothing())
  t.deepEqual(output, maybe.nothing())
  t.end()
})

test('maybe - map3 with just', t => {
  const z = 100
  const output = maybe.map3(add3, maybe.of(x), maybe.of(y), maybe.of(z))
  t.deepEqual(output, maybe.just(add3(x, y, z)))
  t.end()
})

test('maybe - map3 with nothing', t => {
  const output = maybe.map3(add3, maybe.of(x), maybe.nothing(), maybe.of(y))
  t.deepEqual(output, maybe.nothing())
  t.end()
})

test('maybe - map4 with just', t => {
  const output = maybe.map4(add4, maybe.of(x), maybe.of(y), maybe.of(z), maybe.of(a))
  t.deepEqual(output, maybe.just(add4(x, y, z, a)))
  t.end()
})

test('maybe - map4 with nothing', t => {
  const output = maybe.map4(double, maybe.of(x), maybe.nothing(), maybe.of(y), maybe.of(z))
  t.deepEqual(output, maybe.nothing())
  t.end()
})

test('maybe - map5 just', t => {
  const output = maybe.map5(add5, maybe.of(x), maybe.of(y), maybe.of(z), maybe.of(a), maybe.of(b))
  const expected = maybe.just(add5(x, y, z, a, b))
  t.deepEqual(output, expected)
  t.end()
})

test('maybe - map5 nothing first arg', t => {
  const output = maybe.map5(add5, maybe.nothing(), maybe.of(x), maybe.of(y), maybe.of(z), maybe.of(a))
  t.deepEqual(output, maybe.nothing())
  t.end()
})

test('maybe - map5 nothing second arg', t => {
  const output = maybe.map5(add5, maybe.of(x), maybe.nothing(), maybe.of(y), maybe.of(z), maybe.of(a))
  t.deepEqual(output, maybe.nothing())
  t.end()
})

test('maybe - map5 nothing third arg', t => {
  const output = maybe.map5(add5, maybe.of(x), maybe.of(y), maybe.nothing(), maybe.of(z), maybe.of(a))
  t.deepEqual(output, maybe.nothing())
  t.end()
})

test('maybe - map5 nothing fourth arg', t => {
  const output = maybe.map5(add5, maybe.of(x), maybe.of(y), maybe.of(z), maybe.nothing(), maybe.of(a))
  t.deepEqual(output, maybe.nothing())
  t.end()
})

test('maybe - map5 nothing fifth arg', t => {
  const output = maybe.map5(add5, maybe.of(x), maybe.of(y), maybe.of(z), maybe.of(a), maybe.nothing())
  t.deepEqual(output, maybe.nothing())
  t.end()
})

test('maybe chain', t => {
  const output = pipe(
    maybe.of,
    maybe.chain(x => maybe.of(double(x)))
  )(x)
  const expected = pipe(
    double,
    maybe.just
  )(x)
  t.deepEqual(output, expected)
  t.end()
})

test('maybe flatMap', t => {
  const output = pipe(
    maybe.of,
    maybe.flatMap(x => maybe.of(double(x)))
  )(x)
  const expected = pipe(
    double,
    maybe.just
  )(x)
  t.deepEqual(output, expected)
  t.end()
})

test('maybe bind', t => {
  const output = pipe(
    maybe.of,
    maybe.bind(x => maybe.of(double(x)))
  )(x)
  const expected = pipe(
    double,
    maybe.just
  )(x)
  t.deepEqual(output, expected)
  t.end()
})

test('maybe ap', t => {
  const wrappedDouble = maybe.of(double)
  const output = maybe.ap(maybe.of(x), wrappedDouble)
  const expected = pipe(
    double,
    maybe.just
  )(x)
  t.deepEqual(output, expected)
  t.end()
})

test('maybe ap with nothing', t => {
  const wrappedDouble = maybe.of(double)
  const nothing = maybe.nothing()
  const output = maybe.ap(wrappedDouble, nothing)
  t.deepEqual(output, maybe.nothing())
  t.end()
})

test('maybe fold', t => {
  const nothing = maybe.nothing()
  const output = maybe.fold(zero, triple, nothing)
  t.deepEqual(output, zero())
  t.end()
})

test('maybe is nothing ?', t => {
  const nothing = maybe.nothing()
  const output = maybe.isNothing(nothing)
  t.deepEqual(output, true)
  t.end()
})

test('maybe is just ?', t => {
  const output = pipe(
    maybe.of,
    maybe.isJust
  )(x)
  t.deepEqual(output, true)
  t.end()
})

test('nothing equals nothing', t => {
  t.deepEqual(
    maybe.equals(maybe.nothing(), maybe.nothing()),
    true
  )
  t.end()
})

test('just are not equals when they does not hold the same values', t => {
  t.deepEqual(
    maybe.equals(maybe.just(5), maybe.just(6)),
    false
  )
  t.end()
})

test('just are equals by reference', t => {
  const x = maybe.just(5)
  t.deepEqual(maybe.equals(x, x), true)
  t.end()
})

test('just are equals by deep equality', t => {
  const x = maybe.just(5)
  const y = maybe.just(5)
  t.deepEqual(maybe.equals(x, y), true)
  t.end()
})

test('nothing and just are not equals', t => {
  const x = maybe.just(5)
  const y = maybe.nothing()
  t.deepEqual(maybe.equals(x, y), false)
  t.end()
})

test('get just', t => {
  const output = pipe(
    maybe.of,
    maybe.get
  )(x)
  t.deepEqual(output, x)
  t.end()
})

test('get nothing', t => {
  const nothing = maybe.nothing()
  t.throws(() => maybe.get(nothing))
  t.end()
})

test('getOrElse nothing', t => {
  const nothing = maybe.nothing()
  const output = pipe(
    maybe.map(double),
    maybe.getOrElse(zero)
  )(nothing)
  t.deepEqual(output, zero())
  t.end()
})

test('getOrElse right', t => {
  const output = pipe(
    maybe.just,
    maybe.map(double),
    maybe.getOrElse(zero)
  )(x)
  t.deepEqual(output, double(x))
  t.end()
})
