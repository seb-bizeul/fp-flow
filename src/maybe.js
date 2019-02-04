import { default as curry } from 'ramda/src/curry'
import deepEqual from 'fast-deep-equal'

import { Just, Nothing, Left, Right } from './constants'
import { pipe } from './pipe'


export const pure = x => ({
  value: x,
  tag: Just,
})

export const just = pure

export const of = pure

export const nothing = () => ({ tag: Nothing })

export const fromNullable = x => x == null ? nothing() : just(x)

export const chain = curry((f, x) => {
  switch (x.tag) {
  case Just: return f(x.value)
  case Nothing: return x
  }
})

export const flatMap = chain

export const bind = chain

export const map = curry((f, x) => {
  switch (x.tag) {
  case Just: return just(f(x.value))
  case Nothing: return x
  }
})

export const lift2 = curry((f, a, b) => {
  switch (f.tag) {
  case Just: return pipe(curry, pure, ap(a), ap(b))(f.value)
  case Nothing: return f
  }
})

export const lift3 = curry((f, a, b, c) => {
  switch (f.tag) {
  case Just: return pipe(curry, pure, ap(a), ap(b), ap(c))(f.value)
  case Nothing: return f
  }
})

export const map2 = curry((f, a, b) => lift2(pure(f), a, b))

export const map3 = curry((f, a, b, c) => lift3(pure(f), a, b, c))

export const map4 = (f, a, b, c, d) => pipe(
  curry,
  pure,
  ap(a),
  ap(b),
  ap(c),
  ap(d)
)(f)

export const map5 = (f, a, b, c, d, e) => pipe(
  curry,
  pure,
  ap(a),
  ap(b),
  ap(c),
  ap(d),
  ap(e)
)(f)

export const fold = curry((n, j, x) => {
  switch (x.tag) {
  case Just: return j(x.value)
  case Nothing: return n()
  }
})

export const ap = curry((x, f) => isJust(f) ? map(f.value, x) : nothing())

export const get = x => {
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
  case Left: return nothing()
  case Right: return just(either.value)
  }
}

export const toEither = curry((err, x) => {
  switch (x.tag) {
  case Just: return right(either.value)
  case Nothing: return typeof err === 'function' ? left(err()) : left(err)
  }
})
