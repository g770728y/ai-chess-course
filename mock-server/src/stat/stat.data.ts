import { players } from '../player/player.data';
import faker from 'faker';
import { range } from 'rambda';

export const stats = players.map(player => ({
  player,
  win: faker.random.arrayElement(range(0, 100)),
  lost: faker.random.arrayElement(range(0, 100)),
  draw: faker.random.arrayElement(range(0, 100))
}));
