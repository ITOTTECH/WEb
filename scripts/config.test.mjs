import test from 'node:test';
import assert from 'node:assert/strict';
let id = 0;
async function config(value) {
  if (value === undefined) delete process.env.NEXT_PUBLIC_BASE_PATH;
  else process.env.NEXT_PUBLIC_BASE_PATH = value;
  return (await import(`../next.config.mjs?test=${id++}`)).default;
}
test('static export at domain root', async () => {
  const c = await config(undefined);
  assert.equal(c.output, 'export'); assert.equal(c.basePath, '');
  assert.equal(c.trailingSlash, true); assert.equal(c.images.unoptimized, true);
});
test('project site with a repository prefix', async () => {
  const c = await config('/itot-tech');
  assert.equal(c.basePath, '/itot-tech');
  assert.equal(c.env.NEXT_PUBLIC_BASE_PATH, '/itot-tech');
});
test('normalizes trailing slashes', async () => {
  assert.equal((await config('/itot-tech/')).basePath, '/itot-tech');
  assert.equal((await config('/')).basePath, '');
});
test('rejects malformed prefixes', async () => {
  for (const v of ['itot-tech', 'https://example.com', '/../bad', '/bad//path']) {
    await assert.rejects(config(v));
  }
  delete process.env.NEXT_PUBLIC_BASE_PATH;
});
