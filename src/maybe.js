import { curry, append } from 'ramda'
import deepEqual from 'fast-deep-equal'


const Just = 'Just'
const Nothing = 'Nothing'

export const pure = x => ({
  value: x,
  tag: Just,
})

export const just = pure

export const of = pure

export const nothing = () => ({ tag: Nothing })

export const fromNullable = x => x == null ? just(x) : nothing()

export const map = curry((f, x) => {
  switch (x.tag) {
  case Just: return just(f(x.value))
  case Nothing: return x
  }
})

const all = curry((f, arr) => {
  return arr.reduce((acc, it) => {
    return ap(map(append, it), acc)
  }, of([]))
})

const mapAll = curry((f, arr) => {
  return arr.reduce((acc, it) => ap(map(append, map(f, it)), acc), of([]))
})

export const map2 = curry((f, m1, m2) => mapAll(f, [m1, m2]))

export const map3 = curry((f, m1, m2, m3) => mapAll(f, [m1, m2, m3]))

export const map4 = curry((f, m1, m2, m3, m4) => mapAll(f, [m1, m2, m3, m4]))

export const chain = curry((f, x) => {
  switch (x.tag) {
  case Just: return f(x.value)
  case Nothing: return x
  }
})

export const flatMap = chain

export const bind = chain

export const fold = curry((n, j, x) => {
  switch (x.tag) {
  case Just: return j(x.value)
  case Nothing: return n()
  }
})

export const ap = curry((f, x) => isJust(f) ? map(f.value, x) : nothing())

export const unsafeGet = x => {
  switch (x.tag) {
  case Just: return x.value
  case Nothing: throw new TypeError(`Cannot extract the value of a ${x.tag}`)
  }
}

export const getOrElse = curry((f, x) => {
  switch (x.tag) {
  case Just: return x.value
  case Nothing: return f()
  }
})

export const isJust = x => x.tag === Just

export const isNothing = x => x.tag === Nothing

export const equals = (x, y) => {
  if (isNothing(x) && isNothing(y)) {
    return true
  }
  else if (isJust(x) && isJust(y)) {
    return x === y || deepEqual(x, y)
  }
  else {
    return false
  }
}

export const fromEither = either => {
  switch (either.tag) {
  case 'Left': return nothing()
  case 'Right': return just(either.value)
  }
}

export const toEither = curry((err, x) => {
  switch (x.tag) {
  case Just: return right(either.value)
  case Nothing: return typeof err === 'function' ? left(err()) : left(err)
  }
})
