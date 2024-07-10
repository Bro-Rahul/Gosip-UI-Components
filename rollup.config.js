import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import typescript from '@rollup/plugin-typescript'
import dts from 'rollup-plugin-dts'
import url from '@rollup/plugin-url';

//NEW
import terser from '@rollup/plugin-terser'
import peerDepsExternal from 'rollup-plugin-peer-deps-external'
import postcss from 'rollup-plugin-postcss'; // Correct package name


const packageJson = require('./package.json')

export default [
  {
    input: 'src/index.ts',
    output: [
      {
        file: packageJson.main,
        format: 'esm',
        sourcemap: true,
      },
    ],
    plugins: [
      url({
        include: ['**/*.png', '**/*.jpg', '**/*.gif', '**/*.svg'],
        limit: 22528, // Inline files smaller than 22kb
        emitFiles: true, // Emit files larger than the limit
        fileName: '[name][extname]', // Filename pattern for emitted files
      }),
      typescript(),
      peerDepsExternal(),

      resolve(),
      commonjs(),

      // NEW
      postcss(),
      terser(),
    ],
  },
  {
    input: 'dist/cjs/types/src/index.d.ts',
    output: [{ file: 'dist/index.d.ts', format: 'esm' }],
    plugins: [dts.default()],
    external: [/\.css$/],
  },
]