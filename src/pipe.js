export const pipe = (...funs) => {
  return x => funs.reduce((acc, f) => f(acc), x)
}
