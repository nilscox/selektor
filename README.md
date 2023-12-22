# Selektor

Create memoized selectors, an alternative to [reselect](https://github.com/reduxjs/reselect).

```ts
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

selectFullName(state); // Willie Martins
selectIsOld(state, 30); // true
```
