// @flow
import test from 'tape'

import { either, pipe } from '../src'


const x = 5
const y = 10
const z = 100
const a = 1
const b = 3
const err = 'err'

const double = x => x * 2
const triple = x => x * 3
const add = (a, b) => a + b
const add3 = (a, b, c) => add(a, b) + c
const add4 = (a, b, c, d) => add3(a, b, c) + d
const add5 = (a, b, c, d, e) => add4(a, b, c, d) + e


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
    either.bimap(double, () => null)
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
    either.bimap(() => null, double)
  )(x)
  const expected = pipe(
    double,
    either.right
  )(x)
  t.deepEqual(output, expected)
  t.end()
})

test('either - lift2 right', t => {
  const output = either.lift2(either.of(add), either.of(x), either.of(y))
  const expected = either.of(add(x, y))
  t.deepEqual(output, expected)
  t.end()
})

test('either - lift2 left', t => {
  const output = either.lift2(either.left(err), either.of(x), either.left(y))
  t.deepEqual(output, either.left(err))
  t.end()
})

test('either - lift2 left first arg', t => {
  const output = either.lift2(either.of(add), either.left(err), either.of(y))
  t.deepEqual(output, either.left(err))
  t.end()
})

test('either - lift2 nothing second arg', t => {
  const output = either.lift2(either.of(add), either.of(x), either.left(err))
  t.deepEqual(output, either.left(err))
  t.end()
})

test('either - lift3 right', t => {
  const output = either.lift3(either.of(add3), either.of(x), either.of(y), either.of(z))
  const expected = either.right(add3(x, y, z))
  t.deepEqual(output, expected)
  t.end()
})

test('either - lift3 left', t => {
  const output = either.lift3(either.left(err), either.of(x), either.of(y), either.of(z))
  t.deepEqual(output, either.left(err))
  t.end()
})

test('either - lift3 left first arg', t => {
  const output = either.lift3(either.of(add3), either.left(err), either.of(x), either.of(y))
  t.deepEqual(output, either.left(err))
  t.end()
})

test('either - lift3 left second arg', t => {
  const output = either.lift3(either.of(add3), either.of(x), either.left(err), either.of(y))
  t.deepEqual(output, either.left(err))
  t.end()
})

test('either - lift3 left third arg', t => {
  const output = either.lift3(either.of(add3), either.of(x), either.of(y), either.left(err))
  t.deepEqual(output, either.left(err))
  t.end()
})

test('either - map2 right', t => {
  const output = either.map2(add, either.of(x), either.of(y))
  t.deepEqual(output, either.of(add(x, y)))
  t.end()
})

test('either - map2 left', t => {
  const output = either.map2(add, either.of(x), either.left(err))
  t.deepEqual(output, either.left(err))
  t.end()
})

test('either - map3 right', t => {
  const output = either.map3(add3, either.of(x), either.of(y), either.of(z))
  t.deepEqual(output, either.of(add3(x, y, z)))
  t.end()
})

test('either - map3 left', t => {
  const output = either.map3(add3, either.of(x), either.left(err), either.of(y))
  t.deepEqual(output, either.left(err))
  t.end()
})

test('either - map4 just', t => {
  const output = either.map4(add4, either.of(x), either.of(y), either.of(z), either.of(a))
  t.deepEqual(output, either.of(add4(x, y, z, a)))
  t.end()
})

test('either - map4 left', t => {
  const output = either.map4(double, either.of(x), either.left(err), either.of(y), either.of(z))
  t.deepEqual(output, either.left(err))
  t.end()
})

test('either - map5 right', t => {
  const output = either.map5(add5, either.of(x), either.of(y), either.of(z), either.of(a), either.of(b))
  const expected = either.of(add5(x, y, z, a, b))
  t.deepEqual(output, expected)
  t.end()
})

test('either - map5 left first arg', t => {
  const output = either.map5(add5, either.left(err), either.of(x), either.of(y), either.of(z), either.of(a))
  t.deepEqual(output, either.left(err))
  t.end()
})

test('either - map5 left second arg', t => {
  const output = either.map5(add5, either.of(x), either.left(err), either.of(y), either.of(z), either.of(a))
  t.deepEqual(output, either.left(err))
  t.end()
})

test('either - map5 left third arg', t => {
  const output = either.map5(add5, either.of(x), either.of(y), either.left(err), either.of(z), either.of(a))
  t.deepEqual(output, either.left(err))
  t.end()
})

test('either - map5 left fourth arg', t => {
  const output = either.map5(add5, either.of(x), either.of(y), either.of(z), either.left(err), either.of(a))
  t.deepEqual(output, either.left(err))
  t.end()
})

test('either - map5 left fifth arg', t => {
  const output = either.map5(add5, either.of(x), either.of(y), either.of(z), either.of(a), either.left(err))
  t.deepEqual(output, either.left(err))
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
  const output = either.ap(either.of(x), wrappedDouble)
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

test('get right', t => {
  const output = pipe(
    either.of,
    either.get
  )(x)
  t.deepEqual(output, x)
  t.end()
})

test('get left', t => {
  const fn = pipe(
    either.left,
    either.get
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
