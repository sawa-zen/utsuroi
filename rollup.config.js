import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import typescript from 'rollup-plugin-typescript2';
import pkg from './package.json';

require('fs').unlink('dist/utsuroi.d.ts', (err) => {});

export default {
  input: 'src/utsuroi.ts',
  output: [
    {
      file: pkg.unpkg,
      format: 'iife',
      name: 'Utsuroi',
      globals: {
        'three': 'THREE',
      },
    },
    {
      file: pkg.main,
      format: 'cjs',
    },
    {
      file: pkg.module,
      format: 'esm',
    },
  ],
  external: ['three'],
  watch: {
    include: 'src/**',
  },
  plugins: [
    resolve({
      browser: true
    }),
    commonjs({
      namedExports: { 
        'eventemitter3': ['EventEmitter'],
        '@tweenjs/tween.js': ['TWEEN'],
      }
    }),
    typescript()
  ],
};
