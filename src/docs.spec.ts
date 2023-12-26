import { expect, test } from 'vitest';

import { combine, createSelector, pipe } from './index.js';

test('readme example', () => {
  const state = {
    user: {
      firstName: 'Willie',
      lastName: 'Martins',
      age: 42,
    },
  };

  type State = typeof state;

  const selectUser = createSelector((state: State) => state.user);

  const selectFirstName = pipe(selectUser, (user) => user.firstName);
  const selectLastName = pipe(selectUser, (user) => user.lastName);

  const selectFullName = combine(
    selectFirstName,
    selectLastName,
    (firstName, lastName) => `${firstName} ${lastName}`
  );

  const selectIsOld = pipe(selectUser, (user, max: number) => user.age >= max);

  expect(selectFullName(state)).toEqual('Willie Martins');
  expect(selectIsOld(state, 30)).toEqual(true);
});
