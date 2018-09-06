export const pipe = (...funs) => {
  return x => funs.reduce((acc, f) => f(acc), x)
}

export const compose = (...funs) => {
  return x => funs.reduceRight((acc, f) => f(acc), x)
}
