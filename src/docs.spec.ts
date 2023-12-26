import { expect, test } from 'vitest';

import { combine, createSelector, pipe } from './index.js';

test('readme example', () => {
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
  expect(selectFirstTodo(state)).toEqual({ id: 1, completed: true });

  // introduce extra parameters
  const selectFilteredTodos = pipe(selectTodos, (todos, completed: boolean) => {
    return todos.filter((todo) => todo.completed === completed);
  });

  selectFilteredTodos(state, false); // [{ id: 2, completed: false }]
  expect(selectFilteredTodos(state, false)).toEqual([{ id: 2, completed: false }]);

  const selectCurrentTodoId = createSelector((state) => state.currentTodoId);

  // combine outputs from multiple selectors
  const selectCurrentTodo = combine(selectTodos, selectCurrentTodoId, (todos, currentTodoId) =>
    todos.find((todo) => todo.id === currentTodoId)
  );

  selectCurrentTodo(state); // { id: 2, completed: false }
  expect(selectCurrentTodo(state)).toEqual({ id: 2, completed: false });
});
