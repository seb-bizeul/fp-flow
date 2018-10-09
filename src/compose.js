export const compose = (...funs) => {
  return x => funs.reduceRight((acc, f) => f(acc), x)
}
