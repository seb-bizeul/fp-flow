// @flow
import test from 'tape'

import { io, pipe } from '../src'

const queryDatabase = x => 0 // eslint-disable-line no-unused-vars
const effect = () => queryDatabase('id')
const tostr = x => x.toString()

test('io - from creates IO instance', t => {
  const output = io.from(effect)
  t.deepEqual(output, { tag: 'IO', effect })
  t.end()
})

test('io - of creates IO instance', t => {
  const value = 0
  const output = pipe(
    io.of,
    io.run
  )(value)
  t.deepEqual(output, value)
  t.end()
})

test('io - IO is a functor', t => {
  const output = pipe(
    io.from,
    io.map(tostr),
    io.run
  )(effect)
  t.deepEqual(output, '0')
  t.end()
})

test('io - IO is applicative', t => {
  const output = pipe(
    io.from,
    io.ap(io.of(tostr)),
    io.run
  )(effect)
  t.deepEqual(output, '0')
  t.end()
})

test('io - chain IO', t => {
  const output = pipe(
    io.from,
    io.chain(x => io.from(() => tostr(x))),
    io.run
  )(effect)
  t.deepEqual(output, '0')
  t.end()
})

test('io - run IO', t => {
  const output = pipe(
    io.from,
    io.run
  )(effect)
  t.deepEqual(output, effect())
  t.end()
})
