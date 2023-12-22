import { memoize } from './memoize.js';
import { Selector } from './types.js';

export function createSelector<S extends Selector>(selector: S): S {
  return memoize(selector);
}
