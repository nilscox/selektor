import { ArraysIntersection } from './type-utils.js';
import { Selector, SelectorResult, SelectorParams, CreateSelector } from './types.js';

export function createCombine(createSelector: CreateSelector) {
  return function combine<Inputs extends Selector[], Output extends OutputSelector<Inputs, any>>(
    ...params: [...inputs: Inputs, output: Output]
  ): CombineResult<Inputs, Output> {
    const inputs = params.slice(0, -1) as Inputs;
    const output = params[params.length - 1] as Output;

    return createSelector((...params) => {
      return output(...(inputs.map((input) => input(...params)) as SelectorsResults<Inputs>));
    });
  };
}

type OutputSelector<Inputs extends Selector[], Result> = Selector<SelectorsResults<Inputs>, Result>;

type SelectorsParams<Selectors extends Selector[]> = Selectors extends [
  infer First extends Selector,
  ...infer Rest extends Selector[]
]
  ? [SelectorParams<First>, ...SelectorsParams<Rest>]
  : [];

type SelectorsResults<Selectors extends Selector[]> = Selectors extends [
  infer First extends Selector,
  ...infer Rest extends Selector[]
]
  ? [SelectorResult<First>, ...SelectorsResults<Rest>]
  : [];

type CombineResult<Inputs extends Selector[], Output extends OutputSelector<Inputs, any>> = Selector<
  ArraysIntersection<SelectorsParams<Inputs>>,
  SelectorResult<Output>
>;
