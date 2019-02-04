import { default as curry } from 'ramda/src/curry'
import deepEqual from 'fast-deep-equal'

import { Left, Right, Just, Nothing } from './constants'
import { pipe } from './pipe'


export const pure = x => ({
  tag: Right,
  value: x
})

export const right = pure

export const of = pure

export const left = x => ({
  tag: Left,
  value: x
})

export const fromNullable = x => x == null ? left(x) : right(x)

export const tryCatch = curry((l, r) => {
  try {
    return right(r())
  }
  catch (err) {
    left(l(err))
  }
})

export const fromMaybe = curry((err, maybe) => {
  switch (maybe.tag) {
  case Just: return right(maybe.value)
  case Nothing: return typeof err === 'function' ? left(err()) : left(err)
  }
})

export const toMaybe = x => {
  switch (x.tag) {
  case Left: return nothing()
  case Right: return just(maybe.value)
  }
}

export const map = curry((f, x) => {
  switch (x.tag) {
  case Left: return x
  case Right: return right(f(x.value))
  }
})

export const mapLeft = curry((f, x) => {
  switch (x.tag) {
  case Left: return left(f(x.value))
  case Right: return x
  }
})

export const bimap = curry((f, g, x) => {
  switch (x.tag) {
  case Left: return left(f(x.value))
  case Right: return right(g(x.value))
  }
})

export const lift2 = curry((f, a, b) => {
  switch (f.tag) {
  case Right: return pipe(curry, pure, ap(a), ap(b))(f.value)
  case Left: return f
  }
})

export const lift3 = curry((f, a, b, c) => {
  switch (f.tag) {
  case Right: return pipe(curry, pure, ap(a), ap(b), ap(c))(f.value)
  case Left: return f
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

export const fold = curry((l, r, x) => {
  switch (x.tag) {
  case Left: return l(x.value)
  case Right: return r(x.value)
  }
})

export const chain = curry((f, x) => {
  switch (x.tag) {
  case Left: return x
  case Right: return f(x.value)
  }
})

export const flatMap = chain

export const bind = chain

export const ap = curry((x, f) => {
  return isRight(f) ? map(f.value, x) : f
})

export const get = x => {
  switch (x.tag) {
  case Right: return x.value
  case Left: throw new Error(`Cannot extract the value of a ${x.tag}`)
  }
}

export const getOrElse = curry((f, x) => {
  switch (x.tag) {
  case Right: return x.value
  case Left: return f(x.value)
  }
})

export const isLeft = x => x.tag === Left

export const isRight = x => x.tag === Right

export const equals = (x, y) => x === y || deepEqual(x, y)
