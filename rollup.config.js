import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'

export default {
  input: 'src/main.js',
  output: {
    file: 'fp-flow.js',
    format: 'umd',
    name: 'FPFlow'
  },
  plugins: [
    resolve(),
    commonjs({
      namedExports: {
        'node_modules/fast-deep-equal/index.js': [ 'deepEqual' ]
      }
    })
  ]
}