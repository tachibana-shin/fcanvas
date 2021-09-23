import babel from "rollup-plugin-babel";
import { terser } from "rollup-plugin-terser";
import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import typescript from "rollup-plugin-typescript2";
import { name } from "./package.json";

export default {
  input: "src/index.ts",
  plugins: [
    resolve({
      browser: true,
      preferBuiltins: false,
    }),
    commonjs(),
    babel({
      babelrc: false,
      runtimeHelpers: true,
      // presets: ["@babel/preset-env"],
      plugins: [
        // "@babel/plugin-proposal-class-properties",
        "@babel/plugin-proposal-optional-chaining",
        // "@babel/plugin-proposal-object-rest-spread",
        [
          "@babel/plugin-transform-runtime",
          {
            regenerator: true,
          },
        ],
      ],
      ignore: ["dist/*"],
    }),
    typescript({
      clean: true,
      tsconfig: "./tsconfig.json",
      useTsconfigDeclarationDir: true,
    }),
  ],
  output: [
    {
      file: `dist/${name}.umd.js`,
      format: "umd",
      plugins: [],
      name: `${name}`,
    },
    {
      file: `dist/${name}.umd.min.js`,
      format: "umd",
      plugins: [terser()],
      name: `${name}`,
    },
    {
      file: `dist/${name}.esm.js`,
      format: "esm",
      plugins: [],
      exports: "auto",
    },
    {
      file: `dist/${name}.esm.min.js`,
      format: "esm",
      plugins: [terser()],
      exports: "auto",
    },
  ],
};
