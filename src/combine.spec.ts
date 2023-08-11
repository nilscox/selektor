import { expect, test } from 'vitest';

import { combine } from './combine';
import { createSelector } from './create-selector';

test('combine', () => {
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
