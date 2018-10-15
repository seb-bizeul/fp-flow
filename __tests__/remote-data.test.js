// @flow
import test from 'tape'

import { remoteData, maybe, pipe, either } from '../src'

const x = 5
const zero = () => 0
const one = () => 1
const double = x => x * 2
const triple = x => x * 3


test('pure', t => {
  const expected = { tag: 'Success', value: x }
  t.deepEqual(remoteData.pure(x), expected)
  t.end()
})

test('success constructor', t => {
  t.deepEqual(remoteData.success(x), remoteData.pure(x))
  t.end()
})

test('remote data of', t => {
  t.deepEqual(remoteData.of(x), remoteData.pure(x))
  t.end()
})

test('failure constructor', t => {
  const expected = { tag: 'Failure', value: x }
  t.deepEqual(remoteData.failure(x), expected)
  t.end()
})

test('notAsked constructor', t => {
  t.deepEqual(remoteData.notAsked(), { tag: 'NotAsked' })
  t.end()
})

test('loading constructor', t => {
  t.deepEqual(remoteData.loading(), { tag: 'Loading' })
  t.end()
})

test('map success', t => {
  const output = pipe(
    remoteData.of,
    remoteData.map(double)
  )(x)
  const expected = pipe(
    double,
    remoteData.success
  )(x)
  t.deepEqual(output, expected)
  t.end()
})

test('map failure', t => {
  const output = pipe(
    remoteData.failure,
    remoteData.mapLeft(double)
  )(x)
  const expected = pipe(
    double,
    remoteData.failure
  )(x)
  t.deepEqual(output, expected)
  t.end()
})

test('remote data chain', t => {
  const output = pipe(
    remoteData.of,
    remoteData.chain(x => remoteData.of(double(x)))
  )(x)
  const expected = pipe(
    double,
    remoteData.success
  )(x)
  t.deepEqual(output, expected)
  t.end()
})

test('remote data flatMap', t => {
  const output = pipe(
    remoteData.of,
    remoteData.flatMap(x => remoteData.of(double(x)))
  )(x)
  const expected = pipe(
    double,
    remoteData.success
  )(x)
  t.deepEqual(output, expected)
  t.end()
})

test('remote data bind', t => {
  const output = pipe(
    remoteData.of,
    remoteData.bind(x => remoteData.of(double(x)))
  )(x)
  const expected = pipe(
    double,
    remoteData.success
  )(x)
  t.deepEqual(output, expected)
  t.end()
})

test('remote data ap', t => {
  const wrappedDouble = remoteData.of(double)
  const output = pipe(
    remoteData.of,
    remoteData.ap(wrappedDouble)
  )(x)
  const expected = pipe(
    double,
    remoteData.success
  )(x)
  t.deepEqual(output, expected)
  t.end()
})

test('remote data all success', t => {
  const rd1 = remoteData.of(x)
  const rd2 = remoteData.of(x + 1)
  const output = remoteData.all([rd1, rd2])
  const expected = remoteData.success([x, x + 1])
  t.deepEqual(output, expected)
  t.end()
})

test('remote data all failure', t => {
  const rd1 = remoteData.of(x)
  const rd2 = remoteData.failure(x)
  const output = remoteData.all([rd1, rd2])
  const expected = remoteData.failure(x)
  t.deepEqual(output, expected)
  t.end()
})

test('remote data all loading', t => {
  const rd1 = remoteData.of(x)
  const rd2 = remoteData.loading()
  const output = remoteData.all([rd1, rd2])
  const expected = remoteData.loading()
  t.deepEqual(output, expected)
  t.end()
})

test('remote data all notAsked', t => {
  const rd1 = remoteData.of(x)
  const rd2 = remoteData.notAsked()
  const output = remoteData.all([rd1, rd2])
  const expected = remoteData.notAsked()
  t.deepEqual(output, expected)
  t.end()
})

test('fold success', t => {
  const output = pipe(
    remoteData.success,
    remoteData.fold({
      Success: double,
      Failure: triple,
      NotAsked: zero,
      Loading: one
    })
  )(x)
  t.deepEqual(output, double(x))
  t.end()
})

test('fold failure', t => {
  const output = pipe(
    remoteData.failure,
    remoteData.fold({
      Success: triple,
      Failure: double,
      NotAsked: zero,
      Loading: one
    })
  )(x)
  t.deepEqual(output, double(x))
  t.end()
})

test('fold not asked', t => {
  const notAsked = remoteData.notAsked()
  const output = remoteData.fold({
    Success: triple,
    Failure: double,
    NotAsked: zero,
    Loading: one
  }, notAsked)
  t.deepEqual(output, zero())
  t.end()
})

test('fold loading', t => {
  const loading = remoteData.loading()
  const output = remoteData.fold({
    Success: triple,
    Failure: double,
    NotAsked: zero,
    Loading: one
  }, loading)
  t.deepEqual(output, one())
  t.end()
})

test('remote data is success ?', t => {
  const output = pipe(
    remoteData.success,
    remoteData.isSuccess
  )(x)
  t.isEqual(output, true)
  t.end()
})

test('remote data is failure ?', t => {
  const output = pipe(
    remoteData.failure,
    remoteData.isFailure
  )(x)
  t.isEqual(output, true)
  t.end()
})

test('remote data is not asked ?', t => {
  const notAsked = remoteData.notAsked()
  t.isEqual(remoteData.isNotAsked(notAsked), true)
  t.end()
})

test('remote data is loading ?', t => {
  const loading = remoteData.loading()
  t.isEqual(remoteData.isLoading(loading), true)
  t.end()
})

test('success are not equals when they does not hold the same values', t => {
  t.isEqual(
    remoteData.equals(remoteData.success(5), remoteData.success(6)),
    false
  )
  t.end()
})

test('failure are not equals when they does not hold the same values', t => {
  t.isEqual(
    remoteData.equals(remoteData.failure(5), remoteData.failure(6)),
    false
  )
  t.end()
})

test('success are equals by reference', t => {
  const x = remoteData.success(5)
  t.isEqual(remoteData.equals(x, x), true)
  t.end()
})

test('failure are equals by reference', t => {
  const x = remoteData.failure(5)
  t.isEqual(remoteData.equals(x, x), true)
  t.end()
})

test('success are equals by deep equality', t => {
  const x = remoteData.success(5)
  const y = remoteData.success(5)
  t.isEqual(remoteData.equals(x, y), true)
  t.end()
})

test('failure are equals by deep equality', t => {
  const x = remoteData.failure(5)
  const y = remoteData.failure(5)
  t.isEqual(remoteData.equals(x, y), true)
  t.end()
})

test('success and failure are not equals', t => {
  const x = remoteData.success(5)
  const y = remoteData.failure(5)
  t.isEqual(remoteData.equals(x, y), false)
  t.end()
})

test('get success', t => {
  const output = pipe(
    remoteData.of,
    remoteData.get
  )(x)
  t.deepEqual(output, x)
  t.end()
})

test('get failure', t => {
  const fn = pipe(
    remoteData.failure,
    remoteData.get
  )
  t.throws(fn)
  t.end()
})

test('get not asked', t => {
  t.throws(() => remoteData.get(remoteData.notAsked()))
  t.end()
})

test('get loading', t => {
  t.throws(() => remoteData.get(remoteData.loading()))
  t.end()
})

test('getOrElse success', t => {
  const output = pipe(
    remoteData.success,
    remoteData.map(double),
    remoteData.getOrElse(zero)
  )(x)
  t.deepEqual(output, double(x))
  t.end()
})

test('getOrElse failure', t => {
  const output = pipe(
    remoteData.failure,
    remoteData.map(double),
    remoteData.getOrElse(zero)
  )(x)
  t.deepEqual(output, zero())
  t.end()
})

test('getOrElse loading', t => {
  const loading = remoteData.loading()
  const output = pipe(
    remoteData.map(double),
    remoteData.getOrElse(zero)
  )(loading)
  t.deepEqual(output, zero())
  t.end()
})

test('getOrElse not asked', t => {
  const notAsked = remoteData.notAsked()
  const output = pipe(
    remoteData.map(double),
    remoteData.getOrElse(zero)
  )(notAsked)
  t.deepEqual(output, zero())
  t.end()
})

test('remote data from maybe nothing', t => {
  const nothing = maybe.nothing()
  t.deepEqual(remoteData.fromMaybe(nothing), remoteData.notAsked())
  t.end()
})

test('remote data from maybe just', t => {
  const output = pipe(
    maybe.just,
    remoteData.fromMaybe
  )(x)
  t.deepEqual(output, remoteData.success(x))
  t.end()
})

test('remote data from either right', t => {
  const output = pipe(
    either.right,
    remoteData.fromEither
  )(x)
  t.deepEqual(output, remoteData.success(x))
  t.end()
})

test('remote data from either left', t => {
  const output = pipe(
    either.left,
    remoteData.fromEither
  )(x)
  t.deepEqual(output, remoteData.failure(x))
  t.end()
})

test('remote data success to maybe', t => {
  const output = pipe(
    remoteData.success,
    remoteData.toMaybe
  )(x)
  t.deepEqual(output, maybe.just(x))
  t.end()
})

test('remote data failure to maybe', t => {
  const output = pipe(
    remoteData.failure,
    remoteData.toMaybe
  )(x)
  t.deepEqual(output, maybe.nothing())
  t.end()
})

test('remote data not asked to maybe', t => {
  const notAsked = remoteData.notAsked()
  const output = remoteData.toMaybe(notAsked)
  t.deepEqual(output, maybe.nothing())
  t.end()
})

test('remote data loading to maybe', t => {
  const loading = remoteData.loading()
  const output = remoteData.toMaybe(loading)
  t.deepEqual(output, maybe.nothing())
  t.end()
})
