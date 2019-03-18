import { range } from 'rambda';
import faker from 'faker';
import { players } from '../player/player.data';

let n = 0;

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
  // 会造成循环引用
  // const gameIds = games.map(g => g.id);
  // const gameId = faker.random.arrayElement(gameIds);
  // 所以以下假设: 只要一张desk 有两人落座, 表示一局game
  return {
    id: i,
    players: _players,
    gameId: playerCount === 2 ? n++ : undefined
  };
});
