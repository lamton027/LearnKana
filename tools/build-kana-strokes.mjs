import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';

const sourceIndex = resolve(process.argv[2] || 'kana-data/index.json');
const outputFile = resolve(process.argv[3] || 'kana-strokes.js');
const sourceDirectory = dirname(sourceIndex);
const index = JSON.parse(readFileSync(sourceIndex, 'utf8'));
const characters = {};

for (const entry of index.kana) {
  const source = JSON.parse(readFileSync(join(sourceDirectory, entry.file), 'utf8'));
  characters[source.character] = {
    strokeCount: source.strokeCount,
    strokes: source.strokes.map(stroke => ({
      points: stroke.points,
      direction: stroke.direction,
      isCurl: stroke.isCurl
    }))
  };
}

const payload = {
  version: 1,
  source: 'KanjiVG / fude-kana-data',
  license: 'CC BY-SA 3.0',
  count: Object.keys(characters).length,
  characters
};

writeFileSync(
  outputFile,
  `/* Kana stroke-order data derived from KanjiVG via fude-kana-data. CC BY-SA 3.0.\n   See assets/stroke-data/LICENSE and NOTICE. */\nwindow.KANA_STROKES = ${JSON.stringify(payload)};\n`,
  'utf8'
);

console.log(`Wrote ${payload.count} Kana stroke records to ${outputFile}`);
