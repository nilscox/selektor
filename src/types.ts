export type Selector<Params extends any[] = any[], Result = any> = (...params: Params) => Result;
export type SelectorParams<S extends Selector> = Parameters<S>;
export type SelectorResult<S extends Selector> = ReturnType<S>;
