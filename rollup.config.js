import postcss from 'rollup-plugin-postcss';

import resolve from '@rollup/plugin-node-resolve';

import commonjs from '@rollup/plugin-commonjs';

import typescript from "@rollup/plugin-typescript";

import dts from "rollup-plugin-dts";

import terser from "@rollup/plugin-terser";

import peerDepsExternal from "rollup-plugin-peer-deps-external";

const packageJson = require("./package.json");


export default [

    {

        input: "src/index.ts",

        output: [

            {

                file: packageJson.main,

                format: "cjs",

                sourcemap: true,

            },

            {

                file: packageJson.module,

                format: "esm",

                sourcemap: true,

            },

        ],

        plugins: [

            peerDepsExternal(),

            resolve(),

            commonjs(),

            typescript({ tsconfig: "./tsconfig.json" }),

            terser(),

            postcss({

                plugins: [

                    require('tailwindcss'), // Include Tailwind CSS

                    require('autoprefixer'), // Include Autoprefixer

                ],

                minimize: true,

            }),

        ],

        external: ["react", "react-dom"],
        watch: {
            chokidar: {
                // if the chokidar option is given, rollup-watch will
                // use it instead of fs.watch. You will need to install
                // chokidar separately.
                //
                // this options object is passed to chokidar. if you
                // don't have any options, just pass `chokidar: true`
            },

            // include and exclude govern which files to watch. by
            // default, all dependencies will be watched
            exclude: ['node_modules/**']
        }
    },

    {

        input: "src/index.ts",

        output: [{ file: packageJson.types }],

        plugins: [dts.default()],

        external: [/\.css/],

    },


];