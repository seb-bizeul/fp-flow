// @flow
import test from 'tape'

import { flip } from '../src'


const x = 'x'
const y = 'y'
const z = 'z'


test('flip reverse first and second arguments', t => {
  const concatString = (x, y) => x.concat(y)
  const flipped = flip(concatString)
  t.deepEqual(flipped(x, y), 'yx')
  t.end()
})

test('flip passes other arguments', t => {
  const concatThreeStrings = (x, y, z) => x + y + z
  const flipped = flip(concatThreeStrings)
  t.deepEqual(flipped(x, y, z), 'yxz')
  t.end()
})
