const path = require("path");
const rollup = require("rollup");
const babel = require("rollup-plugin-babel");
const { terser } = require("rollup-plugin-terser");
const resolve = require("rollup-plugin-node-resolve");
const commonjs = require("rollup-plugin-commonjs");
const typescript = require("rollup-plugin-typescript2");

async function build(options, _outputOptions) {
  try {
    const bundle = await rollup.rollup(options);
    const outputOptions = {
      format: _outputOptions.format,
      exports: "named",
      file: path.resolve(__dirname, _outputOptions.filename),
      name: "fcanvas",
    };
    const { output } = await bundle.generate(outputOptions);
    await bundle.write(outputOptions);
    const code = output[0].code;
    console.log(blue(outputOptions.file) + " " + getSize(code));
  } catch (e) {
    console.error(e);
  }
}

function getSize(code) {
  return (Buffer.byteLength(code, "utf8") / 1024).toFixed(2) + "kb";
}

function blue(str) {
  return "\x1b[1m\x1b[34m" + str + "\x1b[39m\x1b[22m";
}

build(
  {
    input: path.resolve(__dirname, "src/index.ts"),
    plugins: [
      resolve(),
      typescript({
        clean: true,
        declarationDir: path.resolve(__dirname, "typings"),
        tsconfig: "./tsconfig.json",
        useTsconfigDeclarationDir: true,
      }),
      commonjs(),
      babel({
        babelrc: false,
        runtimeHelpers: true,
        presets: ["@babel/preset-env"],
        plugins: [
          "@babel/plugin-proposal-class-properties",
          "@babel/plugin-proposal-optional-chaining",
          "@babel/plugin-proposal-object-rest-spread",
          [
            "@babel/plugin-transform-runtime",
            {
              regenerator: true,
            },
          ],
        ],
        ignore: ["dist/*"],
      }),
      terser(),
    ],
  },
  {
    format: "umd",
    filename: "dist/fcanvas.js",
  }
);

build(
  {
    input: path.resolve(__dirname, "src/index.ts"),
    plugins: [
      resolve(),
      typescript({
        clean: true,
        declarationDir: path.resolve(__dirname, "typings"),
        tsconfig: "./tsconfig.json",
        useTsconfigDeclarationDir: true,
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
    ],
  },
  {
    format: "esm",
    filename: "dist/fcanvas.esm.js",
  }
);

build(
  {
    input: path.resolve(__dirname, "src/index.ts"),
    plugins: [
      resolve(),
      typescript({
        clean: true,
        declarationDir: path.resolve(__dirname, "typings"),
        tsconfig: "./tsconfig.json",
        useTsconfigDeclarationDir: true,
      }),
      commonjs(),
      babel({
        // babelrc: false,
        runtimeHelpers: true,
        presets: ["@babel/preset-env"],
        plugins: [
          "transform-es2015-modules-commonjs",
          "@babel/plugin-proposal-class-properties",
          "@babel/plugin-proposal-optional-chaining",
          "@babel/plugin-proposal-object-rest-spread",
          [
            "@babel/plugin-transform-runtime",
            {
              regenerator: true,
            },
          ],
        ],
        ignore: ["dist/*"],
      }),
    ],
  },
  {
    format: "esm",
    filename: "dist/fcanvas.node.esm.js",
  }
);

build(
  {
    input: path.resolve(__dirname, "src/index.ts"),
    plugins: [
      resolve(),
      typescript({
        clean: true,
        declarationDir: path.resolve(__dirname, "typings"),
        tsconfig: "./tsconfig.json",
        useTsconfigDeclarationDir: true,
      }),
      commonjs(),
      babel({
        babelrc: false,
        runtimeHelpers: true,
        presets: ["@babel/preset-env"],
        plugins: [
          "@babel/plugin-proposal-class-properties",
          "@babel/plugin-proposal-optional-chaining",
          "@babel/plugin-proposal-object-rest-spread",
          [
            "@babel/plugin-transform-runtime",
            {
              regenerator: true,
            },
          ],
        ],
        ignore: ["dist/*"],
      }),
    ],
  },
  {
    format: "cjs",
    filename: "dist/fcanvas.cjs",
  }
);
