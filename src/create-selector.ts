import { Selector } from './types';
import { memoize } from './memoize';

export function createSelector<S extends Selector>(selector: S): S {
  return memoize(selector);
}
