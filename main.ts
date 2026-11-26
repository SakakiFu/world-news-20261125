import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const PNG_SIGNATURE = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
const MAX_BYTES = 1048576;

function fail(message) {
  process.stderr.write(`error: ${message}\n`);
  process.exit(1);
}

const here = dirname(fileURLToPath(import.meta.url));
const sourcePath = join(here, "entry.png");

let source;
try {
  source = readFileSync(sourcePath);
} catch {
  fail("could not read entry.png in this directory");
}

if (source.length > MAX_BYTES) {
  fail(`entry.png is ${source.length} bytes, over the 1048576 byte limit`);
}
if (source.length < 33 || !source.subarray(0, 8).equals(PNG_SIGNATURE)) {
  fail("entry.png does not start with the PNG signature");
}

// Parse the IHDR chunk: length (4) + type "IHDR" (4) + width (4) + height (4).
if (source.readUInt32BE(8) !== 13 || source.toString("ascii", 12, 16) !== "IHDR") {
  fail("entry.png has no valid IHDR chunk");
}
const width = source.readUInt32BE(16);
const height = source.readUInt32BE(20);
if (width !== 1024 || height !== 1024) {
  fail(`entry.png is ${width}x${height}, expected 1024x1024`);
}

// The file must end with a valid IEND chunk: 4-byte zero length,
// "IEND", then its 4-byte CRC.
const tail = source.subarray(source.length - 12);
if (tail.readUInt32BE(0) !== 0 || tail.toString("ascii", 4, 8) !== "IEND") {
  fail("entry.png does not end with a valid IEND chunk");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR || here;
try {
  mkdirSync(outDir, { recursive: true });
} catch {
  fail(`could not create output directory ${outDir}`);
}
const outPath = join(outDir, "entry.png");
try {
  writeFileSync(outPath, source);
} catch {
  fail(`could not write entry.png to ${outDir}`);
}

let copy;
try {
  copy = readFileSync(outPath);
} catch {
  fail("could not read back the written entry.png");
}
if (!copy.equals(source)) {
  fail("written entry.png does not match the source byte-for-byte");
}

process.exit(0);
