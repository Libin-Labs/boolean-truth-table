import assert from 'node:assert/strict';
import test from 'node:test';
import * as api from '../dist/esm/index.js';
test('AND mask', () => {
  assert.deepEqual(
    api.truthTable(2, 8n).map((r) => r.output),
    [false, false, false, true],
  );
});
test('input order', () => {
  assert.deepEqual(api.truthTable(2, 6n)[2].inputs, [true, false]);
});
test('zero arity', () => {
  assert.deepEqual(api.truthTable(0, 1n), [{ inputs: [], output: true }]);
});
test('pack inverse exhaustive', () => {
  for (let m = 0n; m < 256n; m++)
    assert.equal(api.packOutcomes(api.truthTable(3, m).map((r) => r.output)), m);
});
test('mask and arity bounds', () => {
  assert.throws(() => api.truthTable(2, 16n));
  assert.throws(() => api.truthTable(13, 0n));
  assert.throws(() => api.truthTable(1, -1n));
});
test('dense Boolean results', () => {
  assert.throws(() => api.packOutcomes([true, , false, false]));
  assert.throws(() => api.packOutcomes([1]));
  assert.throws(() => api.packOutcomes([true, false, true]));
});
