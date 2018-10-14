import { default as curry } from 'ramda/src/curry'


export const GT = 'GT'
export const LT = 'LT'
export const EQ = 'EQ'


export const compare = curry((x, y) => {
  if (x > y) return GT
  else if (x < y) return LT
  else return EQ
})
