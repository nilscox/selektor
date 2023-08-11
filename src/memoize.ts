export const memoize = <Fn extends (...args: any[]) => any>(fn: Fn) => fn;
