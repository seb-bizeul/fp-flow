import { default as curry } from 'ramda/src/curry'

import { GT, LT, EQ } from './constants'


export const compare = curry((x, y) => {
  if (x > y) return GT
  else if (x < y) return LT
  else return EQ
})

export {
  GT,
  LT,
  EQ
}
