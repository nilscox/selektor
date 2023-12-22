import { describe, expect, test } from 'vitest';

import { memoize } from './memoize.js';

describe('memoize', () => {
  test('no parameters', () => {
    const fn = memoize(() => ({}));

    expect(fn()).toBe(fn());
  });

  test('same parameters', () => {
    const fn = memoize((a: number, b: object) => ({ a, b }));
    const obj = {};

    expect(fn(42, obj)).toBe(fn(42, obj));
  });

  test('different parameters', () => {
    const fn = memoize((a: number, b: object) => ({ a, b }));

    expect(fn(42, {})).toEqual(fn(42, {}));
    expect(fn(42, {})).not.toBe(fn(42, {}));
  });

  test('default parameters', () => {
    const fn = memoize((a: number = 1) => ({ a }));

    expect(fn(1)).toEqual(fn());
    expect(fn(1)).not.toBe(fn());
  });
});
