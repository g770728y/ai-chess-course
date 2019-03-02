import { dividableNumber } from './helper';

it('dividableNumber', () => {
  expect(dividableNumber(9, 3)).toEqual(9);
  expect(dividableNumber(10, 3)).toEqual(9);
  expect(dividableNumber(11, 3)).toEqual(12);
  expect(dividableNumber(13, 3)).toEqual(12);
});
