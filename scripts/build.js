const { build } = require('esbuild');

const buildCjs = build({
    entryPoints: ['./src/main.ts'],
    outfile: './lib/main.common.js',
    format: 'cjs',
    minify: true,
    bundle: true,
});

const buildEsm = build({
    entryPoints: ['./src/main.ts'],
    outfile: './lib/main.esm.js',
    format: 'esm',
    minify: true,
    bundle: true,
});

Promise.all([buildCjs, buildEsm]).catch((err) => {
    console.log(err);
    process.exit(1);
});
