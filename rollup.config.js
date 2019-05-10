import ts from "rollup-plugin-typescript";
import clean from "rollup-plugin-clean";
import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import progress from "rollup-plugin-progress";
import size from "rollup-plugin-size";

export default {
  input: "src/inject-sprites.ts",
  output: [
    {
      name: "sprites",
      format: "iife",
      file: "dist/index.js",
      browser: true
    },
    {
      format: "esm",
      file: "dist/esm/index.js",
      browser: true
    }
  ],
  plugins: [
    progress(),
    clean(),
    resolve(),
    commonjs(),
    ts(),
    size()
  ]
}
