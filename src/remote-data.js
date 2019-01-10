import { default as curry } from 'ramda/src/curry'
import { default as partial } from 'ramda/src/partial'
import deepEqual from 'fast-deep-equal'

import { just, nothing } from './maybe'
import {
  Just,
  Nothing,
  Left,
  Right,
  Success,
  Failure,
  NotAsked,
  Loading
} from './constants'
import { pipe } from './pipe'


const curryAndWrap = pipe(curry, pure)


export const pure = x => ({
  value: x,
  tag: Success
})

export const success = pure

export const of = success

export const failure = err => ({
  value: err,
  tag: Failure
})

export const notAsked = () => ({ tag: NotAsked })

export const loading = () => ({ tag: Loading })

export const fromNullable = x => x == null ? notAsked() : success(x)

export const fold = curry((cases, rd) => {
  switch (rd.tag) {
  case Success: return cases.Success(rd.value)
  case Failure: return cases.Failure(rd.value)
  case NotAsked: return cases.NotAsked()
  case Loading: return cases.Loading()
  }
})

export const map = curry((f, x) => {
  switch (x.tag) {
  case Success: return success(f(x.value))
  case Failure: return x
  case NotAsked: return x
  case Loading: return x
  }
})

export const mapLeft = curry((f, rd) => {
  switch (rd.tag) {
  case Success: return rd
  case Failure: return failure(f(rd.value))
  case NotAsked: return rd
  case Loading: return rd
  }
})

export const chain = curry((f, rd) => {
  switch (rd.tag) {
  case Success: return f(rd.value)
  case Failure: return rd
  case NotAsked: return rd
  case Loading: return rd
  }
})

export const ap = curry((rd, rdf) => {
  switch (rdf.tag) {
  case Success: return map(rdf.value, rd)
  case Failure: return rdf
  case NotAsked: return rdf
  case Loading: return rdf
  }
})

export const lift2 = curry((f, rd1, rd2) => {
  switch (f.tag) {
  case Success: return pipe(curry, pure, ap(rd1), ap(rd2))(f.value)
  default: return f
  }
})

export const lift3 = curry((f, rd1, rd2, rd3) => {
  switch (f.tag) {
  case Success: return pipe(curry, pure, ap(rd1), ap(rd2), ap(rd3))(f.value)
  default: return f
  }
})

export const map2 = curry((f, a, b) => lift2(pure(f), a, b))

export const map3 = curry((f, a, b, c) => lift3(pure(f), a, b, c))

export const map4 = (f, rd1, rd2, rd3, rd4) => pipe(
  curry,
  pure,
  ap(rd1),
  ap(rd2),
  ap(rd3),  
  ap(rd4)
)(f)

export const map5 = (f, rd1, rd2, rd3, rd4, rd5) => pipe(
  curry,
  pure,
  ap(rd1),
  ap(rd2),
  ap(rd3),  
  ap(rd4),
  ap(rd5)
)(f)

export const flatMap = chain

export const bind = chain

export const get = rd => {
  switch (rd.tag) {
  case Success: return rd.value
  default: throw new Error(`Cannot extract the value of a ${rd.tag}`)
  }
}

export const getOrElse = curry((x, rd) => {
  switch (rd.tag) {
  case Success: return rd.value
  default: return x()
  }
})

export const isSuccess = ({ tag }) => tag === Success

export const isFailure = ({ tag }) => tag === Failure

export const isLoading = ({ tag }) => tag === Loading

export const isNotAsked = ({ tag }) => tag === NotAsked

export const equals = (x, y) => x === y || deepEqual(x, y)

export const toMaybe = rd => {
  switch (rd.tag) {
  case Success: return just(rd.value)
  case Failure: return nothing()
  case NotAsked: return nothing()
  case Loading: return nothing()
  }
}

export const fromMaybe = maybe => {
  switch (maybe.tag) {
  case Just: return success(maybe.value)
  case Nothing: return notAsked()
  }
}

export const toEither = (rd, fallback) => {
  switch (rd.tag) {
  case Success: return right(rd.value)
  case Failure: return left(rd.value)
  case NotAsked: return left(fallback())
  case Loading: return left(fallback())
  }
}

export const fromEither = (either) => {
  switch (either.tag) {
  case Left: return failure(either.value)
  case Right: return success(either.value)
  }
}
