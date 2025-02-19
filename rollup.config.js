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

    },

    {

        input: "src/index.ts",

        output: [{ file: packageJson.types }],

        plugins: [dts.default()],

        external: [/\.css/],

    },

];