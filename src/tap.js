import { default as curry } from 'ramda/src/curry'

export const tap = curry((f, x) => {
	f()
	return x
})
