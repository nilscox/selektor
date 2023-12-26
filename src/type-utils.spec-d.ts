import { describe, expectTypeOf, test } from 'vitest';
import { MergeArrays, ArraysIntersection } from './type-utils.js';

describe('type utils', () => {
  type A = { a: string };
  type B = { b: string };
  type C = { c: string };
  type D = { d: string };

  describe('MergeArrays', () => {
    test('empty arrays', () => {
      type test = MergeArrays<[], []>;
      type expected = [];
      expectTypeOf<test>().toEqualTypeOf<expected>();
    });

    test('arrays with one element', () => {
      type test = MergeArrays<[A], [B]>;
      type expected = [A & B];
      expectTypeOf<test>().toEqualTypeOf<expected>();
    });

    test('arrays with two elements', () => {
      type test = MergeArrays<[A, B], [C, D]>;
      type expected = [A & C, B & D];
      expectTypeOf<test>().toEqualTypeOf<expected>();
    });

    test('first array with one element', () => {
      type test = MergeArrays<[A], [B, C]>;
      type expected = [A & B, C];
      expectTypeOf<test>().toEqualTypeOf<expected>();
    });

    test('second array with one element', () => {
      type test = MergeArrays<[A, B], [C]>;
      type expected = [A & C, B];
      expectTypeOf<test>().toEqualTypeOf<expected>();
    });
  });

  describe('ArraysIntersection', () => {
    test('empty array', () => {
      type test = ArraysIntersection<[]>;
      type expected = [];
      expectTypeOf<test>().toEqualTypeOf<expected>();
    });

    test('single element', () => {
      type test = ArraysIntersection<[[string]]>;
      type expected = [string];
      expectTypeOf<test>().toEqualTypeOf<expected>();
    });

    test('intersection of arrays', () => {
      type test = ArraysIntersection<[[A], [B]]>;
      type expected = [A & B];
      expectTypeOf<test>().toEqualTypeOf<expected>();
    });

    test('intersection of arrays', () => {
      type test = ArraysIntersection<[[A, B], [C, D]]>;
      type expected = [A & C, B & D];
      expectTypeOf<test>().toEqualTypeOf<expected>();
    });
  });
});
