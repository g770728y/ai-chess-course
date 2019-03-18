import { histories } from './history.data';
import { players } from '../player/player.data';

export default {
  Query: {
    // 当前playerId 的全部对战历史
    histories: (_, { playerId }: { playerId: number }) => {
      return histories
        .filter(h => h.playerId === playerId)
        .map(h => ({
          opponent: players.find(p => p.userId === h.opponentId)!,
          ...h
        }));
    }
  }
};
