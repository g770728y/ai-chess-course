import { renameKey } from './object';

it('renameKey', () => {
  expect(renameKey<{ a: number; c: number }>('a', 'b')({ a: 1, c: 3 })).toEqual(
    { b: 1, c: 3 }
  );
});
