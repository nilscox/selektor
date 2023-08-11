import { describe, expect, test } from 'vitest';
import { createSelector } from './create-selector';
import { pipe } from './pipe';

describe('pipe', () => {
  const state = {
    user: { age: 30 },
  };

  type State = typeof state;

  const selectUser = createSelector((state: State) => state.user);
  const selectAge = pipe(selectUser, (user) => user.age);

  test('pipe from base selector', () => {
    expect(selectAge(state)).toEqual(30);
  });

  test('chain pipes', () => {
    const selectIsOld = pipe(selectAge, (age) => age > 20);

    expect(selectIsOld(state)).toEqual(true);
  });

  test('extra parameters', () => {
    const selectIsOlderThan = pipe(selectAge, (age, max: number) => age > max);

    expect(selectIsOlderThan(state, 20)).toEqual(true);
  });

  // limitation
  test.skip('variadic parameters', () => {
    const selectAgeMultipliedBy = pipe(selectAge, (age, ...nums: number[]) => nums.map((num) => age * num));

    expect(selectAgeMultipliedBy(state, 0, 1, 2)).toEqual([0, 30, 60]);
  });
});
