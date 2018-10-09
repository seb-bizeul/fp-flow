// @flow
import test from 'tape'

import { maybe, pipe } from '../src'

const x = 5
const zero = () => 0
const double = x => x * 2
const triple = x => x * 3


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

test('maybe map2', t => {
  const output = maybe.map2(double, maybe.of(2), maybe.of(3))
  t.deepEqual(output, maybe.just([4, 6]))
  t.end()
})

test('maybe map2 with nothing', t => {
  const output = maybe.map2(double, maybe.of(2), maybe.nothing())
  t.deepEqual(output, maybe.nothing())
  t.end()
})

test('maybe map3', t => {
  const output = maybe.map3(double, maybe.of(2), maybe.of(3), maybe.of(4))
  t.deepEqual(output, maybe.just([4, 6, 8]))
  t.end()
})

test('maybe map3 with nothing', t => {
  const output = maybe.map3(double, maybe.of(2), maybe.nothing(), maybe.of(4))
  t.deepEqual(output, maybe.nothing())
  t.end()
})

test('maybe map4', t => {
  const output = maybe.map4(double, maybe.of(2), maybe.of(3), maybe.of(4), maybe.of(5))
  t.deepEqual(output, maybe.just([4, 6, 8, 10]))
  t.end()
})

test('maybe map4 with nothing', t => {
  const output = maybe.map4(double, maybe.of(2), maybe.nothing(), maybe.of(4), maybe.of(5))
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
  const output = pipe(
    maybe.of,
    maybe.ap(wrappedDouble)
  )(x)
  const expected = pipe(
    double,
    maybe.just
  )(x)
  t.deepEqual(output, expected)
  t.end()
})

test('maybe ap with nothing', t => {
  const wrappedDouble = maybe.of(double)
  const output = pipe(
    maybe.of,
    maybe.ap(maybe.nothing())
  )(x)
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

test('unsafeGet just', t => {
  const output = pipe(
    maybe.of,
    maybe.unsafeGet
  )(x)
  t.deepEqual(output, x)
  t.end()
})

test('unsafeGet nothing', t => {
  const nothing = maybe.nothing() 
  t.throws(() => maybe.unsafeGet(nothing))
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
