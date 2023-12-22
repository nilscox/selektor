import { Selector, SelectorResult, SelectorParams } from './types.js';
import { createSelector } from './create-selector.js';

export function combine<
  Inputs extends Selector[],
  Output extends Selector<
    {
      [Index in keyof Inputs]: SelectorResult<Inputs[Index]>;
    },
    any
  >
>(
  ...params: [...inputs: Inputs, output: Output]
): Selector<SelectorParams<Inputs[0]>, SelectorResult<Output>> {
  const inputs = params.slice(0, -1) as Inputs;
  const output = params[params.length - 1] as Output;

  return createSelector((...params) => {
    return output(...(inputs.map((input) => input(...params)) as Parameters<Output>));
  });
}
