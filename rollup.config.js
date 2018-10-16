import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import babel from 'rollup-plugin-babel'
import copy from 'rollup-plugin-copy'
import cleanup from 'rollup-plugin-cleanup'


export default {
  input: 'src/index.js',
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
    }),
    copy({
      'src/index.js.flow': './fp-flow.js.flow',
      verbose: true
    }),
    cleanup({
      extensions: [
        '.js',
        '.js.flow'
      ]
    })
  ]
}
