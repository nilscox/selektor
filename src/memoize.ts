export function memoize<Fn extends (...args: any[]) => any>(fn: Fn): Fn {
  let prevArgs: Parameters<Fn>;
  let memo: ReturnType<Fn>;

  // @ts-expect-error
  return function (...params: Parameters<Fn>): ReturnType<Fn> {
    if (prevArgs?.length === params.length && prevArgs.every((arg, i) => params[i] === arg)) {
      return memo;
    }

    const result = fn(...params);

    prevArgs = params;
    memo = result;

    return result;
  };
}
