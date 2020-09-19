import typescript from 'rollup-plugin-typescript2';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import pathsTransformer from 'ts-transform-paths';

export default [
    {
        input: 'src/index.ts',
        output: {
            file: 'lib/index.common.js',
            format: 'cjs',
            sourcemap: true,
        },
        plugins: [typescript(), resolve(), commonjs()],
    },
    {
        input: 'src/index.ts',
        output: {
            file: 'lib/index.esm.js',
            format: 'esm',
            sourcemap: true,
        },
        plugins: [
            typescript({
                transformers: [(service) => pathsTransformer()],
            }),
            resolve(),
            commonjs(),
        ],
    },
];
