import { describe, expect, test } from 'vitest';

import { createCombine } from './combine.js';
import { memoize } from './memoize.js';

const combine = createCombine(memoize);

describe('combine', () => {
  test('selectors combinaison', () => {
    const state = {
      users: { id: 'nilscox' } as Record<string, string>,
      userId: 'id',
    };

    type State = typeof state;

    const selectUsers = (state: State) => state.users;
    const selectUserId = (state: State) => state.userId;

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
    const selectA = memoize(() => ({}));
    const selectB = memoize(() => ({}));

    const selector = combine(selectA, selectB, (a, b) => ({ a, b }));

    expect(selector()).toBe(selector());
  });
});
