import svelte from 'rollup-plugin-svelte';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
import sveltePreprocess from 'svelte-preprocess';
import typescript from '@rollup/plugin-typescript';

export default [
  {
    input: 'src/index.ts',
    output: {
      sourcemap: true,
      format: 'esm',
      file: 'lib/index.esm.js',
    },
    external: ['@kalender/core'],
    plugins: [
      svelte({
        // we'll extract any component CSS out into
        // a separate file - better for performance
        //   css: (css) => {
        //     css.write('bundle.css');
        //   },
        preprocess: sveltePreprocess(),
        customElement: true,
      }),

      // If you have external dependencies installed from
      // npm, you'll most likely need these plugins. In
      // some cases you'll need additional configuration -
      // consult the documentation for details:
      // https://github.com/rollup/plugins/tree/master/packages/commonjs
      resolve({
        dedupe: ['svelte'],
      }),
      commonjs(),
      typescript({
        // sourceMap: !production,
        // inlineSources: !production,
      }),

      terser(),
    ],
  },
  {
    input: 'src/index.ts',
    output: {
      sourcemap: true,
      file: 'lib/index.common.js',
      format: 'cjs',
    },
    external: ['@kalender/core'],
    plugins: [
      svelte({
        // we'll extract any component CSS out into
        // a separate file - better for performance
        //   css: (css) => {
        //     css.write('bundle.css');
        //   },
        preprocess: sveltePreprocess(),
        customElement: true,
      }),

      // If you have external dependencies installed from
      // npm, you'll most likely need these plugins. In
      // some cases you'll need additional configuration -
      // consult the documentation for details:
      // https://github.com/rollup/plugins/tree/master/packages/commonjs
      resolve({
        dedupe: ['svelte'],
      }),
      commonjs(),
      typescript({
        // sourceMap: !production,
        // inlineSources: !production,
      }),

      terser(),
    ],
  },
  {
    input: 'src/index.ts',
    output: {
      sourcemap: true,
      file: 'lib/index.full.esm.js',
      format: 'esm',
    },
    plugins: [
      svelte({
        // we'll extract any component CSS out into
        // a separate file - better for performance
        //   css: (css) => {
        //     css.write('bundle.css');
        //   },
        preprocess: sveltePreprocess(),
        customElement: true,
      }),

      // If you have external dependencies installed from
      // npm, you'll most likely need these plugins. In
      // some cases you'll need additional configuration -
      // consult the documentation for details:
      // https://github.com/rollup/plugins/tree/master/packages/commonjs
      resolve({
        web: true,
        dedupe: ['svelte'],
      }),
      commonjs(),
      typescript({
        // sourceMap: !production,
        // inlineSources: !production,
      }),

      terser(),
    ],
  },
];
