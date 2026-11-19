// Entry program for make.fun bounty gta6-meme-x-01 ("Post a GTA 6 meme on X").
// All it does is hand the post address to the gate: it reads POST.json from
// the repository root and writes those exact bytes to the output directory.
// Node 22, standard library only. No network, no clock, no files outside
// the repository, so repeated runs produce identical output.
//
// Local run (mirrors the grader):
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const botDir = process.env.MAKEFUN_BOT_DIR ?? '/bot';
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

const sourcePath = join(botDir, 'POST.json');
const targetPath = join(outputDir, 'POST.json');

if (!existsSync(sourcePath)) {
  console.error(`POST.json not found in ${botDir}`);
  process.exit(1);
}

const postBytes = readFileSync(sourcePath);

// POST.json is replaced with the real post address before submitting; the
// gate refuses a placeholder, so the copy below must stay byte for byte.
mkdirSync(outputDir, { recursive: true });
writeFileSync(targetPath, postBytes);
