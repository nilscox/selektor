import { describe, expect, test } from 'vitest';

import { combine } from './combine.js';
import { createSelector } from './create-selector.js';

describe('combine', () => {
  test('selectors combinaison', () => {
    const state = {
      users: { id: 'nilscox' } as Record<string, string>,
      userId: 'id',
    };

    type State = typeof state;

    const selectUsers = createSelector((state: State) => state.users);
    const selectUserId = createSelector((state: State) => state.userId);

    const result = combine(selectUsers, selectUserId, (users, userId) => users[userId]);

    expect(result(state)).toEqual('nilscox');
  });

  test('with parameters', () => {
    const result = combine(
      () => 'a',
      (b: string) => b,
      (a, b) => ({ a, b })
    );

    expect(result('b')).toEqual({ a: 'a', b: 'b' });
  });

  test('memoization', () => {
    const selectA = createSelector(() => ({}));
    const selectB = createSelector(() => ({}));

    const selector = combine(selectA, selectB, (a, b) => ({ a, b }));

    expect(selector()).toBe(selector());
  });
});
