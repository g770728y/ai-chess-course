import * as R from 'ramda';
import { IStore, IRole } from '.';
import { readLocalStorage } from './helper';

const desks = R.range(0, 20).map(i => ({
  id: i + 1,
  players: [undefined, undefined]
}));

export const store: IStore = {
  ui: {
    currentPage: 'game-lobby'
  },
  // user: {
  //   id: 1,
  //   name: 'gtt',
  //   password: 'xxx',
  //   no: 'xx'
  // },
  user: readLocalStorage('user', true),
  currentGameId: 1,
  currentGameData: {
    status: 'working',
    activeRole: 'w',
    steps: [[0, 0, 'b'], [0, 1, 'w']],
    winner: undefined
  },
  gameList: {
    1: {
      players: [
        { id: 1, role: 'b', name: 'gtt', active: 'ai' },
        { id: 2, role: 'w', name: 'wsq', active: 'human' }
      ]
    },
    2: {
      players: [
        { id: 3, role: 'b', name: '北乔峰', active: 'ai' },
        { id: 4, role: 'w', name: '南慕容', active: 'human' }
      ]
    }
  },

  players: [
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
  ],

  desks: [
    {
      id: 1,
      players: [
        { id: 1, name: 'gtt', active: 'ai' as IRole },
        { id: 2, name: 'wsq', active: 'human' as IRole }
      ]
    },
    {
      id: 2,
      players: [{ id: 3, name: '北乔峰', active: 'ai' as IRole }, undefined]
    },
    ...desks.slice(2)
  ]
};
