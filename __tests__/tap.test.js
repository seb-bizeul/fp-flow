// @flow
import test from 'tape'
import { spy } from 'sinon'

import { tap } from '../src'


test('tap execute function and returns the argument', t => {
    const f = spy()
    const x = 5
    t.deepEqual(tap(f, x), x)
    t.equal(f.callCount, 1)
    t.end()
})
