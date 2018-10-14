import { default as curry } from 'ramda/src/curry'
import { default as prepend } from 'ramda/src/prepend'
import deepEqual from 'fast-deep-equal'

import { just, nothing } from './maybe'
import { Just, Nothing } from './maybe'
import { Left, Right } from './either'


const Success = 'Success'
const Failure = 'Failure'
const NotAsked = 'NotAsked'
const Loading = 'Loading'

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

export const ap = curry((f, rd) => {
  switch (f.tag) {
  case Success: return map(f.value, rd)
  case Failure: return f
  case NotAsked: return f
  case Loading: return f
  }
})

export const all = arr => {
  return arr.reduceRight((acc, it) => ap(map(prepend, it), acc), of([]))
}

export const flatMap = chain

export const bind = chain

export const unsafeGet = rd => {
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
