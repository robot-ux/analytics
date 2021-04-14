import typescript from 'rollup-plugin-typescript2';
import resolve from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import tsconfig from './tsconfig.json';

const plugins = [
  resolve(),
  terser(),
  typescript({
    tsconfigOverride: {
      ...tsconfig,
      compilerOptions: {
        ...tsconfig.compilerOptions,
        declaration: false,
      },
    },
    clean: true,
  }),
];

export default [
  {
    input: './src/index.ts',
    output: {
      format: 'umd',
      name: 'analyticsUmami',
      file: 'dist/umd/umami-plugin.min.js',
    },
    plugins,
  },
  {
    input: './src/full.ts',
    output: {
      format: 'umd',
      name: '_analytics',
      file: 'dist/umd/analytics-with-umami.min.js',
    },
    plugins,
  },
];
