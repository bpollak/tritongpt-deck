import test from 'node:test';
import assert from 'node:assert/strict';
import { isSlideVisibleForAudience, normalizeAudienceType } from '../src/data/audiences.js';
import { selectLibrarySlides } from '../src/data/slideLibrary.js';
import { getSlideThumbnailKey } from '../src/data/slideThumbnailKey.js';

const library = [
  { id: 1, slug: 'opening', title: 'Opening', audiences: ['all', 'executive'] },
  { id: 2, slug: 'campus', title: 'Campus tools', audiences: ['LMU'], content: [{ body: 'Compare schedules in TSS', count: 52000 }] },
  { id: 3, slug: 'closing', title: 'Closing', audiences: ['all'] }
];

test('unknown and missing audience tags never reveal the default deck', () => {
  for (const tag of [null, '', ' ', 'exectuive', 'library', 'alll']) {
    assert.equal(normalizeAudienceType(tag), null);
    assert.equal(isSlideVisibleForAudience(library[0], tag), false);
  }
  assert.equal(normalizeAudienceType('  lMu '), 'LMU');
  assert.equal(isSlideVisibleForAudience(library[0], ' EXECUTIVE '), true);
});

test('entire library and default presentation have distinct, ordered selections', () => {
  assert.deepEqual(selectLibrarySlides(library).map((s) => s.id), [1, 2, 3]);
  assert.deepEqual(selectLibrarySlides(library, { audience: 'all' }).map((s) => s.id), [1, 3]);
  assert.deepEqual(selectLibrarySlides(library, { audience: 'LMU' }).map((s) => s.id), [2]);
});

test('search combines content terms with audience selection without changing the library', () => {
  const before = JSON.stringify(library);
  assert.deepEqual(selectLibrarySlides(library, { query: '  TSS  schedules  ' }).map((s) => s.id), [2]);
  assert.deepEqual(selectLibrarySlides(library, { query: '52000' }).map((s) => s.id), [2]);
  assert.deepEqual(selectLibrarySlides(library, { audience: 'all', query: 'TSS' }), []);
  assert.deepEqual(selectLibrarySlides(library, { query: 'missing-topic' }), []);
  assert.equal(JSON.stringify(library), before);
});

test('thumbnail content keys survive JSON key reordering but change with rendered content', () => {
  assert.equal(getSlideThumbnailKey({ title: 'Opening', id: 1 }), getSlideThumbnailKey({ id: 1, title: 'Opening' }));
  assert.notEqual(getSlideThumbnailKey(library[0]), getSlideThumbnailKey({ ...library[0], title: 'Updated opening' }));
  assert.equal(getSlideThumbnailKey(library[0]), getSlideThumbnailKey({ ...library[0], audiences: ['LMU'] }));
});
