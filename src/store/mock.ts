import { IStore, IRole, IUser, IActive } from '.';
import { readUserFromLocalStorage } from './helper';
import { range } from 'rambda';

const desks = range(0, 20).map(i => ({
  id: i + 1,
  players: [undefined, undefined]
}));

export const store: IStore = {
  // user: {
  //   id: 1,
  //   name: 'gtt',
  //   password: 'xxx',
  //   no: 'xx'
  // },
  user: readUserFromLocalStorage(),
  // 当前用户是否正在游戏(显示游戏界面)
  game: {
    loading: false,
    data: {
      id: 1,
      status: 'working',
      activeRole: 'w',
      steps: [[0, 0, 'b'], [0, 1, 'w']],
      winner: undefined,
      players: [
        { id: 1, role: 'b', name: 'gtt', active: 'ai' },
        { id: 2, role: 'w', name: 'wsq', active: 'human' }
      ]
    }
  },
  games: {
    loading: false,
    data: [
      {
        id: 1,
        players: [
          { id: 1, role: 'b', name: 'gtt', active: 'ai' },
          { id: 2, role: 'w', name: 'wsq', active: 'human' }
        ]
      },
      {
        id: 2,
        players: [
          { id: 3, role: 'b', name: '北乔峰', active: 'ai' },
          { id: 4, role: 'w', name: '南慕容', active: 'human' }
        ]
      }
    ]
  },

  players: {
    loading: false,
    data: [
      {
        id: 1,
        name: 'gtt',
        no: '33'
      },
      {
        id: 2,
        name: 'wsq',
        no: '34'
      },
      {
        id: 3,
        name: '北乔峰',
        no: '35'
      },
      {
        id: 4,
        name: '南慕容',
        no: '36'
      }
    ]
  },

  desks: {
    loading: false,
    data: [
      {
        id: 1,
        players: [
          { id: 1, name: 'gtt', active: 'ai' as IActive },
          { id: 2, name: 'wsq', active: 'human' as IActive }
        ]
      },
      {
        id: 2,
        players: [{ id: 3, name: '北乔峰', active: 'ai' as IActive }, undefined]
      },
      ...desks.slice(2)
    ]
  },

  histories: {
    loading: false,
    data: [
      { opponentId: 1, result: 'win', createdAt: '2019-01-05' },
      { opponentId: 2, result: 'lost', createdAt: '2019-01-03' },
      { opponentId: 3, result: 'draw', createdAt: '2019-01-01' }
    ]
  },

  stats: {
    loading: false,
    data: [
      {
        playerId: 2,
        win: 3,
        lost: 4,
        draw: 3
      },
      {
        playerId: 1,
        win: 5,
        lost: 10,
        draw: 2
      }
    ]
  }
};
