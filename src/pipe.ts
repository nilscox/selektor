import { CreateSelector, Selector, SelectorParams, SelectorResult } from './types.js';

type OmitFirst<A extends any[]> = A extends [any, ...infer R] ? R : never;

export function createPipe(createSelector: CreateSelector) {
  return function pipe<
    Input extends Selector,
    Output extends Selector<[SelectorResult<Input>, ...any[]], any>
  >(
    input: Input,
    output: Output
  ): Selector<[...SelectorParams<Input>, ...OmitFirst<SelectorParams<Output>>], SelectorResult<Output>> {
    const nbExtraParams = output.length - 1;

    const selector = createSelector((...params) => {
      const nbInputParams = (input as { params?: number }).params ?? params.length - nbExtraParams;

      const inputParams = params.slice(0, nbInputParams);
      const outputParams = params.slice(nbInputParams);

      return output(input(...inputParams), ...outputParams);
    });

    Object.assign(selector, { params: output.length });

    return selector;
  };
}
