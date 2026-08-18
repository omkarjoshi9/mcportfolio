import { readFileSync, writeFileSync } from "node:fs";
import ttf2woff2 from "ttf2woff2";

const [input, output] = process.argv.slice(2);
const ttf = readFileSync(input);
const woff2 = ttf2woff2(ttf);

writeFileSync(output, woff2);
console.log(
  `${input} ${ttf.length} bytes -> ${output} ${woff2.length} bytes ` +
    `(${Math.round((1 - woff2.length / ttf.length) * 100)}% smaller)`,
);
