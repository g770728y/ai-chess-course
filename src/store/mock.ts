import { IStore, IColor, IUser, IActor } from '.';
import { range } from 'rambda';
import { readAuthFromLocalStorage } from './helper';

const desks = range(0, 20).map(i => ({
  id: i + 1,
  players: [undefined, undefined]
}));

const authInfo = readAuthFromLocalStorage();

export const store: IStore = {
  errors: [],
  // user: {
  //   id: 1,
  //   name: 'gtt',
  //   password: 'xxx',
  //   no: 'xx'
  // },
  user: authInfo && authInfo.user,
  // 当前用户是否正在游戏(显示游戏界面)
  game: {
    loading: false,
    data: {
      id: 1,
      status: 'working',
      activeColor: 'white',
      steps: [[0, 0, 'black'], [0, 1, 'white']],
      winner: undefined,
      players: [
        { userId: 1, color: 'black', name: 'gtt', actor: 'ai' },
        { userId: 2, color: 'white', name: 'wsq', actor: 'human' }
      ]
    }
  },
  games: {
    loading: false,
    data: [
      {
        id: 1,
        players: [
          { userId: 1, color: 'black', name: 'gtt', actor: 'ai' },
          { userId: 2, color: 'white', name: 'wsq', actor: 'human' }
        ]
      },
      {
        id: 2,
        players: [
          { userId: 3, color: 'black', name: '北乔峰', actor: 'ai' },
          { userId: 4, color: 'white', name: '南慕容', actor: 'human' }
        ]
      }
    ]
  },

  players: {
    loading: false,
    data: [
      {
        userId: 1,
        name: 'gtt',
        no: '33'
      },
      {
        userId: 2,
        name: 'wsq',
        no: '34'
      },
      {
        userId: 3,
        name: '北乔峰',
        no: '35'
      },
      {
        userId: 4,
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
          { userId: 1, name: 'gtt', actor: 'ai' as IActor },
          { userId: 2, name: 'wsq', actor: 'human' as IActor }
        ]
      },
      {
        id: 2,
        players: [
          { userId: 3, name: '北乔峰', actor: 'ai' as IActor },
          undefined
        ]
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
