import * as R from 'rambda';

export function renameKey<T>(fromK: keyof T, toK: string) {
  return function(o: T) {
    return { [toK]: o[fromK], ...R.omit(fromK, o) };
  };
}
