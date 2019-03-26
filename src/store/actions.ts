import { swap } from '@libre/atom';
import {
  appState,
  IUser,
  IActor,
  IDesk,
  IPlayer,
  IStore,
  IColor,
  IHistory,
  IStat,
  IGame,
  IStep
} from '.';
import produce from 'immer';

////////////////////////////////////////////////////////////////////  updator ////////////////////////////////////////////////////////////
function update(updator: (store: IStore) => any) {
  swap(appState, s => produce(s, draft => updator(draft)));
}

// TODO: 新用户需要加入到 s.players中
export function login(user: IUser) {
  update(s => {
    const playerIdx = s.players.data.findIndex(p => p.userId === user.id);
    if (playerIdx < 0) {
      // 注册
      s.players.data.push({ userId: user.id, name: user.name, no: user.no });
    }
    s.user = user;
  });
}

export function logout() {
  update(s => {
    delete s.user;
  });
}

// 点击椅子, 加入游戏
// TODO: 这个方法应该在后台实现,  这里是mock
export function sitDown(deskId: number, playerIdx: number, active: IActor) {
  update(s => {
    const player = s.players.data.find(p => p.userId === s.user!.id)!;
    const deskIdx = s.desks.data.findIndex(d => d.id === deskId)!;
    s.desks.data.forEach(desk => {
      const deskPlayerIdx = desk.players.findIndex(
        p => !!p && p.userId === player.userId
      );
      delete desk['players'][deskPlayerIdx];
    });
    s.desks.data[deskIdx]['players'][playerIdx] = { ...player, actor: active };
  });
}

// 走一步
export function onStep(step: IStep) {
  update(s => {
    const activeColor = s.game.data['activeColor'];
    s.game.data.activeColor = activeColor === 'black' ? 'white' : 'black';
    s.game.data.steps!.push(step);
  });
}

// 重置当前棋局
export function toggleCurrentGame(gameId: number) {
  update(s => {
    s.game.data.id = gameId;
  });
}

// 重置 全局错误
export function clearErrorMessasges() {
  update(s => {
    s.errors = [];
  });
}

// 完善用户信息
export function updateUser(userPatch: { id: number; name: string }) {
  const { id, name } = userPatch;
  update(s => {
    // 更新当前user
    s.user!['name'] = name;

    // 更新players 列表
    if (s.players.data && s.players.data.length > 0) {
      const idx = s.players.data.findIndex(p => {
        return p.userId === id;
      });
      if (idx < 0) {
        console.log({ userId: id, name, no: s.user!['no'] });
        s.players.data.push({ userId: id, name, no: s.user!['no'] });
      } else {
        s.players.data[idx]['name'] = name;
      }
    }
  });
}

// 初始化, 填充全部players
export function readyGetPlayers() {
  update(s => {
    s.players.loading = true;
  });
}
export function fillPlayers(players: IPlayer[]) {
  update(s => {
    s.players.loading = false;
    s.players.data = players;
  });
}

// 历史页面初始化
export function readyGetHistories() {
  update(s => {
    s.histories.loading = true;
  });
}
export function fillHistories(histories: IHistory[]) {
  update(s => {
    s.histories.loading = false;
    s.histories.data = histories;
  });
}

// 统计页面初始化
export function readyGetStats() {
  update(s => {
    s.stats.loading = true;
  });
}
export function fillStats(stats: IStat[]) {
  update(s => {
    s.stats.loading = false;
    s.stats.data = stats.map(stat => ({
      playerId: stat.player!.userId,
      ...stat
    }));
  });
}

// 游戏大厅
export function readyGetDesks() {
  update(s => {
    s.desks.loading = true;
  });
}
export function fillDesks(desks: IDesk[]) {
  update(s => {
    s.desks.loading = false;
    s.desks.data = desks;
  });
}

// 游戏列表
export function readyGetGames() {
  update(s => {
    s.games.loading = true;
  });
}
export function fillGames(games: IGame[]) {
  update(s => {
    s.games.loading = false;
    s.games.data = games;
  });
}

// 某局游戏
export function readyGetGame() {
  update(s => {
    s.game.loading = true;
  });
}
export function fillGame(game: IGame) {
  update(s => {
    s.game.loading = false;
    s.game.data = game;
  });
}
export function lostGame(gameId: number, playerId: number) {
  update(s => {
    const game = s.games.data.find(g => g.id === gameId);
    if (game) {
      game.status = 'finished';
      game.winner = game.players.find(p => p.userId !== playerId)!.color;
    }
  });
}
