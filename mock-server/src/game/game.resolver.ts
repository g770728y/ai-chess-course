import { games, randomSteps, IActor, IGame, IColor } from './game.data';
import { desks } from '../desk/desk.data';
import { players } from '../player/player.data';
import { max } from 'rambda';
import { pubsub, STEP_ADDED } from '../pubsub';
import { startMock } from './helper';

export default {
  Query: {
    games: () => games,
    game: (root, { id }) => {
      const _game = games.find(g => g.id === id);
      if (!_game) {
        throw new Error('游戏不存在, 可能已经终止了');
      } else {
        if (_game.steps && _game.steps.length > 0) {
        } else {
          _game.steps = randomSteps();
        }
        return { ..._game };
      }
    }
  },

  Mutation: {
    createGame: (
      root,
      {
        playerId0,
        player0Actor,
        playerId1,
        player1Actor,
        deskId
      }: {
        playerId0: number;
        player0Actor: IActor;
        playerId1: number;
        player1Actor: IActor;
        deskId: number;
      }
    ) => {
      const id = games.map(g => g.id).reduce(max, 0) + 1;

      const player0 = players.find(player => player.userId === playerId0)!;
      const player1 = players.find(player => player.userId === playerId1)!;
      const _players = [
        {
          userId: player0.userId,
          color: 'black',
          name: player0.name,
          actor: player0Actor
        },
        {
          userId: player1.userId,
          color: 'white',
          name: player1.name,
          actor: player1Actor
        }
      ];

      const newGame = {
        id,
        status: 'working',
        activeColor: 'black',
        steps: [],
        winner: undefined,
        players: _players
      } as IGame;

      games.push(newGame);

      // 关联到 desk
      const deskIndex = desks.findIndex(desk => desk.id === deskId)!;
      desks[deskIndex]['gameId'] = id;
      desks[deskIndex]['players'] = _players;

      return newGame;
    },

    createStep: (
      root,
      {
        gameId,
        row,
        col,
        color
      }: { gameId: number; row: number; col: number; color: IColor }
    ) => {
      const game = games.find(g => g.id === gameId);
      if (game) {
        game.steps = game.steps || [];
        game.steps.push({ row, col, color });
        return true;
      }
      return false;
    },

    lostGame: (root, { gameId, playerId }) => {
      const game = games.find(g => g.id === gameId);
      if (game) {
        game.status = 'finished';
        game.winner = game.players.find(p => p.userId !== playerId)!.color;
        return true;
      }
      return false;
    }
  },

  Subscription: {
    stepAdded: {
      subscribe: (
        root,
        { gameId, color }: { gameId: number; color?: IColor }
      ) => {
        const colorStr = color ? `:${color}` : '';
        startMock(gameId, color);
        return pubsub.asyncIterator(`${STEP_ADDED}:${gameId}${colorStr}`);
      }
    }
  }
};
