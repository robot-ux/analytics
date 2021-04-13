import typescript from 'rollup-plugin-typescript2'
import resolve from '@rollup/plugin-node-resolve'
import { terser } from 'rollup-plugin-terser'

const plugins = [
  resolve(),
  // terser(),
  typescript({
    tsconfig: './tsconfig.json',
    tsconfigOverride: {
      declaration: false,
    },
    clean: true,
  }),
]

export default [
  {
    input: './src/index.ts',
    output: {
      format: 'umd',
      name: 'analyticsUmami',
      file: 'dist/umd/umami-plugin.js',
    },
    plugins,
  },
  {
    input: './src/full.ts',
    output: {
      format: 'iife',
      name: '_analytics',
      file: 'dist/umd/analytics-with-umami.js',
    },
    plugins,
  },
]
