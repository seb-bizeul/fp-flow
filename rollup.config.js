import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import babel from 'rollup-plugin-babel'

export default {
  input: 'src/main.js',
  output: {
    file: 'fp-flow.js',
    format: 'umd',
    name: 'FpFlow'
  },
  plugins: [
    resolve(),
    commonjs({
      namedExports: {
        'node_modules/fast-deep-equal/index.js': [ 'deepEqual' ]
      }
    }),
    babel({
      exclude: 'node_modules/**'
    })
  ]
}