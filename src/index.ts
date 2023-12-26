import { createCombine } from './combine.js';
import { memoize } from './memoize.js';
import { createPipe } from './pipe.js';
export * from './types.js';

export { createCombine, createPipe };

export const createSelector = memoize;
export const combine = createCombine(memoize);
export const pipe = createPipe(memoize);
