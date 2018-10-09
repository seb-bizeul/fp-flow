// @flow
import test from 'tape'

import { pipe } from '../src'

const x = 0
const add = x => y => x + y
const increment = add(1)

test('pipe 1', t => {
  const y = pipe(increment)(x)
  t.equal(y, 1)
  t.end()
})

test('pipe 2', t => {
  const y = pipe(
    increment,
    increment,
  )(x)
  t.equal(y, 2)
  t.end()
})

test('pipe 3', t => {
  const y = pipe(
    increment,
    increment,
    increment
  )(x)
  t.equal(y, 3)
  t.end()
})

test('pipe 4', t => {
  const y = pipe(
    increment,
    increment,
    increment,
    increment
  )(x)
  t.equal(y, 4)
  t.end()
})

test('pipe 5', t => {
  const y = pipe(
    increment,
    increment,
    increment,
    increment,
    increment
  )(x)
  t.equal(y, 5)
  t.end()
})

test('pipe 6', t => {
  const y = pipe(
    increment,
    increment,
    increment,
    increment,
    increment,
    increment
  )(x)
  t.equal(y, 6)
  t.end()
})

test('pipe 7', t => {
  const y = pipe(
    increment,
    increment,
    increment,
    increment,
    increment,
    increment,
    increment
  )(x)
  t.equal(y, 7)
  t.end()
})

test('pipe 8', t => {
  const y = pipe(
    increment,
    increment,
    increment,
    increment,
    increment,
    increment,
    increment,
    increment
  )(x)
  t.equal(y, 8)
  t.end()
})

test('pipe 9', t => {
  const y = pipe(
    increment,
    increment,
    increment,
    increment,
    increment,
    increment,
    increment,
    increment,
    increment
  )(x)
  t.equal(y, 9)
  t.end()
})

test('pipe 10', t => {
  const y = pipe(
    increment,
    increment,
    increment,
    increment,
    increment,
    increment,
    increment,
    increment,
    increment,
    increment
  )(x)
  t.equal(y, 10)
  t.end()
})
