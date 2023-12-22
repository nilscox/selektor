import { createSelector } from './create-selector.js';
import { Selector, SelectorParams, SelectorResult } from './types.js';

type OmitFirst<A extends any[]> = A extends [any, ...infer R] ? R : never;

export function pipe<Input extends Selector, Output extends Selector<[SelectorResult<Input>, ...any[]], any>>(
  input: Input,
  output: Output
): Selector<[...SelectorParams<Input>, ...OmitFirst<SelectorParams<Output>>], SelectorResult<Output>> {
  const nbExtraParams = output.length - 1;

  return createSelector((...params) => {
    const nbInputParams = params.length - nbExtraParams;

    const inputParams = params.slice(0, nbInputParams);
    const outputParams = params.slice(nbInputParams);

    return output(input(...inputParams), ...outputParams);
  });
}
