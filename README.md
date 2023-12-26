# Selektor

Create memoized selectors, an alternative to [reselect](https://github.com/reduxjs/reselect).

## Usage

```ts
import { createSelector, pipe, combine } from '@nilscox/selektor';

const state = {
  todos: [
    { id: 1, completed: true },
    { id: 2, completed: false },
  ],
  currentTodoId: 2,
};

type State = typeof state;

// create a memoized selector
const selectTodos = createSelector((state: State) => state.todos);

// create a new selector from another selector's output
const selectFirstTodo = pipe(selectTodos, (todos) => todos[0]);

selectFirstTodo(state); // { id: 1, completed: true }

// introduce extra parameters
const selectFilteredTodos = pipe(selectTodos, (todos, completed: boolean) => {
  return todos.filter((todo) => todo.completed === completed);
});

selectFilteredTodos(state, false); // [{ id: 2, completed: false }]

const selectCurrentTodoId = createSelector((state) => state.currentTodoId);

// combine outputs from multiple selectors
const selectCurrentTodo = combine(selectTodos, selectCurrentTodoId, (todos, currentTodoId) => {
  return todos.find((todo) => todo.id === currentTodoId);
});

selectCurrentTodo(state); // { id: 2, completed: false }
```

## Installation

```
<your package manager's install command> @nilscox/selektor
```

## API

**createSelector(fn)**

Creates a memoized selector. When the selector is called, the function `fn` is called and its returned value is cached. If the selector is called again with the same parameters, `fn` is not called and the cached value is returned.

```ts
const state = { foo: 42 };
const selectFoo = createSelector((state) => state.foo);

selectFoo(state); // 42
```

**pipe(input, output)**

Create a selector from another selector's output, optionally adding parameters.

```ts
const state = { foo: { bar: 42 } };
const selectFoo = createSelector((state) => state.foo);
const selectBar = pipe(selectFoo, (foo) => foo.bar);

selectBar(state); // 42

const selectBarPlusNum = pipe(selectFoo, (foo, num) => foo.bar + num);

selectBarPlusNum(state, 9); // 51
```

**combine(...inputs, output)**

Combine multiple selector's outputs into a new selector. The results of the input selectors will be given as parameters to the output selector.

```ts
const state = { foo: 42, bar: 51 };
const selectFoo = createSelector((state) => state.foo);
const selectBar = createSelector((state) => state.bar);
const selectForPlusBar = combine(selectFoo, selectBar, (foo, bar) => foo + bar);

selectFooPlusBar(state); // 93
```

## Custom memoization function

The default memoization only remembers the last call of the memoized function, similar to [memoize-one](https://github.com/alexreardon/memoize-one). Use `createPipe` and `createCombine` to create custom `pipe` and `combine` functions with a custom memoization function.

```ts
function memoize(fn) {
  return (...params) => {
    // custom memoization logic
  };
}

const pipe = createPipe(memoize);
const combine = createCombine(memoize);
```
