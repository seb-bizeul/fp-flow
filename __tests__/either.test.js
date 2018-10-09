// @flow
import test from 'tape'
import { pipe } from 'ramda'

import { either } from '../src'

const x = 5
const double = x => x * 2
const triple = x => x * 3


test('pure', t => {
  const output = either.pure(x)
  const expected = {
    tag: 'Right',
    value: x
  }
  t.deepEqual(output, expected)
  t.end()
})

test('right constructor', t => {
  const output = either.right(x)
  const expected = {
    tag: 'Right',
    value: x
  }
  t.deepEqual(output, expected)
  t.end()
})

test('either of', t => {
  const output = either.of(x)
  t.deepEqual(output, either.right(x))
  t.end()
})

test('left constructor', t => {
  const output = either.left(x)
  const expected = {
    tag: 'Left',
    value: x
  }
  t.deepEqual(output, expected)
  t.end()
})

test('map right value', t => {
  const output = pipe(
    either.of,
    either.map(double)
  )(x)
  const expected = pipe(
    double,
    either.right
  )(x)
  t.deepEqual(output, expected)
  t.end()
})

test('map left value', t => {
  const output = pipe(
    either.left,
    either.mapLeft(double)
  )(x)
  const expected = pipe(
    double,
    either.left
  )(x)
  t.deepEqual(output, expected)
  t.end()
})

test('bimap left value', t => {
  const output = pipe(
    either.left,
    either.bimap(double, double)
  )(x)
  const expected = pipe(
    double,
    either.left
  )(x)
  t.deepEqual(output, expected)
  t.end()
})

test('bimap right value', t => {
  const output = pipe(
    either.of,
    either.bimap(double, double)
  )(x)
  const expected = pipe(
    double,
    either.right
  )(x)
  t.deepEqual(output, expected)
  t.end()
})

test('either chain', t => {
  const output = pipe(
    either.of,
    either.chain(x => either.of(double(x)))
  )(x)
  const expected = pipe(
    double,
    either.right
  )(x)
  t.deepEqual(output, expected)
  t.end()
})

test('either flatMap', t => {
  const output = pipe(
    either.of,
    either.flatMap(x => either.of(double(x)))
  )(x)
  const expected = pipe(
    double,
    either.right
  )(x)
  t.deepEqual(output, expected)
  t.end()
})

test('either bind', t => {
  const output = pipe(
    either.of,
    either.bind(x => either.of(double(x)))
  )(x)
  const expected = pipe(
    double,
    either.right
  )(x)
  t.deepEqual(output, expected)
  t.end()
})

test('either ap', t => {
  const wrappedDouble = either.of(double)
  const output = pipe(
    either.of,
    either.ap(wrappedDouble)
  )(x)
  const expected = pipe(
    double,
    either.right
  )(x)
  t.deepEqual(output, expected)
  t.end()
})

test('fold left value', t => {
  const output = pipe(
    either.left,
    either.fold(double, triple)
  )(x)
  t.deepEqual(output, double(x))
  t.end()
})

test('fold right value', t => {
  const output = pipe(
    either.of,
    either.fold(double, triple)
  )(x)
  t.deepEqual(output, triple(x))
  t.end()
})

test('either is left ?', t => {
  const output = pipe(
    either.left,
    either.isLeft
  )(x)
  t.deepEqual(output, true)
  t.end()
})

test('either is right ?', t => {
  const output = pipe(
    either.of,
    either.isRight
  )(x)
  t.deepEqual(output, true)
  t.end()
})

test('left are not equals when they does not hold the same values', t => {
  t.deepEqual(
    either.equals(either.left(5), either.left(6)),
    false
  )
  t.end()
})

test('right are not equals when they does not hold the same values', t => {
  t.deepEqual(
    either.equals(either.right(5), either.right(6)),
    false
  )
  t.end()
})

test('left are equals by reference', t => {
  const x = either.left(5)
  t.deepEqual(either.equals(x, x), true)
  t.end()
})

test('right are equals by reference', t => {
  const x = either.right(5)
  t.deepEqual(either.equals(x, x), true)
  t.end()
})

test('left are equals by deep equality', t => {
  const x = either.left(5)
  const y = either.left(5)
  t.deepEqual(either.equals(x, y), true)
  t.end()
})

test('right are equals by deep equality', t => {
  const x = either.right(5)
  const y = either.right(5)
  t.deepEqual(either.equals(x, y), true)
  t.end()
})

test('left and right are not equals', t => {
  const x = either.left(5)
  const y = either.right(5)
  t.deepEqual(either.equals(x, y), false)
  t.end()
})

test('unsafeGet right', t => {
  const output = pipe(
    either.of,
    either.unsafeGet
  )(x)
  t.deepEqual(output, x)
  t.end()
})

test('unsafeGet left', t => {
  const fn = pipe(
    either.left,
    either.unsafeGet
  )
  t.throws(fn)
  t.end()
})

test('getOrElse left', t => {
  const output = pipe(
    either.left,
    either.map(double),
    either.getOrElse(triple)
  )(x)
  t.deepEqual(output, triple(x))
  t.end()
})

test('getOrElse right', t => {
  const output = pipe(
    either.right,
    either.map(double),
    either.getOrElse(triple)
  )(x)
  t.deepEqual(output, double(x))
  t.end()
})
