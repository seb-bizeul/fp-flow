import { default as curry } from 'ramda/src/curry'

export const from = effect => ({
  tag: 'IO',
  effect
})

export const of = x => ({
  tag: 'IO',
  effect: () => x
})

export const map = curry((f, x) => from(() => f(x.effect())))

export const chain = curry((f, x) => f(x.effect()))

export const run = x => x.effect()
