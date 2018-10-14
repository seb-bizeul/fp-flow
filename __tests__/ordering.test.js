// @flow
import test from 'tape'

import { ordering } from '../src'


test('compare string LT', t => {
  const output = ordering.compare('A', 'B')
  t.deepEqual(output, ordering.LT)
  t.end()
})

test('compare string GT', t => {
  const output = ordering.compare('B', 'A')
  t.deepEqual(output, ordering.GT)
  t.end()
})

test('compare string EQ', t => {
  const output = ordering.compare('A', 'A')
  t.deepEqual(output, ordering.EQ)
  t.end()
})

test('compare number LT', t => {
  const output = ordering.compare(0, 1)
  t.deepEqual(output, ordering.LT)
  t.end()
})

test('compare number GT', t => {
  const output = ordering.compare(1, 0)
  t.deepEqual(output, ordering.GT)
  t.end()
})

test('compare number EQ', t => {
  const output = ordering.compare(0, 0)
  t.deepEqual(output, ordering.EQ)
  t.end()
})
