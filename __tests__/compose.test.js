// @flow
import test from 'tape'

import { compose } from '../src'

const x = 0
const substract = x => y => y - x
const decrement = substract(1)


test('compose 1', t => {
  const y = compose(decrement)(x)
  t.equal(y, -1)
  t.end()
})

test('compose 2', t => {
  const y = compose(
    decrement,
    decrement,
  )(x)
  t.equal(y, -2)
  t.end()
})

test('compose 3', t => {
  const y = compose(
    decrement,
    decrement,
    decrement
  )(x)
  t.equal(y, -3)
  t.end()
})

test('compose 4', t => {
  const y = compose(
    decrement,
    decrement,
    decrement,
    decrement
  )(x)
  t.equal(y, -4)
  t.end()
})

test('compose 5', t => {
  const y = compose(
    decrement,
    decrement,
    decrement,
    decrement,
    decrement
  )(x)
  t.equal(y, -5)
  t.end()
})

test('compose 6', t => {
  const y = compose(
    decrement,
    decrement,
    decrement,
    decrement,
    decrement,
    decrement
  )(x)
  t.equal(y, -6)
  t.end()
})

test('compose 7', t => {
  const y = compose(
    decrement,
    decrement,
    decrement,
    decrement,
    decrement,
    decrement,
    decrement
  )(x)
  t.equal(y, -7)
  t.end()
})

test('compose 8', t => {
  const y = compose(
    decrement,
    decrement,
    decrement,
    decrement,
    decrement,
    decrement,
    decrement,
    decrement
  )(x)
  t.equal(y, -8)
  t.end()
})

test('compose 9', t => {
  const y = compose(
    decrement,
    decrement,
    decrement,
    decrement,
    decrement,
    decrement,
    decrement,
    decrement,
    decrement
  )(x)
  t.equal(y, -9)
  t.end()
})

test('compose 10', t => {
  const y = compose(
    decrement,
    decrement,
    decrement,
    decrement,
    decrement,
    decrement,
    decrement,
    decrement,
    decrement,
    decrement
  )(x)
  t.equal(y, -10)
  t.end()
})
