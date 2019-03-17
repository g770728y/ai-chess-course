import { range } from 'rambda';
import faker from 'faker';
import { players } from '../player/player.data';

// 共20张棋桌
export const desks = range(0, 20).map(i => {
  const playerCount = faker.random.arrayElement([0, 1, 2]);
  const _players = range(0, playerCount).map(_ => {
    const playersCount = players.length;
    const randomPlayerIndex = faker.random.number(playersCount - 1);
    const player = players[randomPlayerIndex];
    const actor = faker.random.arrayElement(['human', 'ai']);
    return { userId: player.userId, name: player.name, actor };
  });

  return { id: i, players: _players };
});
