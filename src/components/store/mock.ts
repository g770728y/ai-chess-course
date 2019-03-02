import { IStore } from '.';

export const store: IStore = {
  user: {
    id: 1,
    name: 'gtt',
    password: 'xxx',
    no: 'xx'
  },
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
        { id: 2, role: 'w', name: 'wsq', active: 'me' }
      ]
    },
    2: {
      players: [
        { id: 3, role: 'b', name: '北乔峰', active: 'ai' },
        { id: 4, role: 'w', name: '南慕容', active: 'me' }
      ]
    }
  }
};
