import { existsSync, readFileSync, writeFileSync } from 'node:fs';
if (!existsSync('out/index.html')) throw new Error('Missing out/index.html. Run next build first.');
if (!existsSync('out/build-info.json')) throw new Error('Missing generated build-info.json.');
const { basePath } = JSON.parse(readFileSync('out/build-info.json', 'utf8'));
writeFileSync('out/.nojekyll', '');
console.log(`Static export ready: out/ (basePath=${basePath || '/'})`);
