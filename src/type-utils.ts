export type MergeArrays<A1, A2> = [A1, A2] extends [
  [infer First1, ...infer Rest1],
  [infer First2, ...infer Rest2]
]
  ? [First1 & First2, ...MergeArrays<Rest1, Rest2>]
  : A1 extends [any]
  ? A1
  : A2 extends [any]
  ? A2
  : A1;

export type ArraysIntersection<Arr, Output = []> = Arr extends [infer First, ...infer Rest]
  ? ArraysIntersection<Rest, MergeArrays<First, Output>>
  : Output;
