import { swap } from '@libre/atom';
import { appState, IPageType, IUser, IActive, IDesk, IPlayer, IStore } from '.';
import produce from 'immer';

////////////////////////////////////////////////////////////////////  updator ////////////////////////////////////////////////////////////
function update(updator: (store: IStore) => any) {
  swap(appState, s => produce(s, draft => updator(draft)));
}

export function enterPage(currentPage: IPageType) {
  update(s => {
    s.ui.currentPage = currentPage;
  });
}

export function enterGameListPage() {
  enterPage('game-list');
}

export function enterGameLobbyPage() {
  enterPage('game-lobby');
}

// TODO: 新用户需要加入到 s.players中
export function login(user: IUser) {
  update(s => {
    const playerIdx = s.players.findIndex(p => p.id === user.id);
    if (playerIdx < 0) {
      // 注册
      s.players.push(user);
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
export function sitDown(deskId: number, playerIdx: number, active: IActive) {
  update(s => {
    const player = s.players.find(p => p.id === s.user!.id)!;
    const deskIdx = s.desks.findIndex(d => d.id === deskId)!;
    s.desks.forEach(desk => {
      const deskPlayerIdx = desk.players.findIndex(
        p => !!p && p.id === player.id
      );
      delete desk['players'][deskPlayerIdx];
    });
    s.desks[deskIdx]['players'][playerIdx] = { ...player, active };
  });
}

// 走一步
export function onStep(step: [number, number, 'b' | 'w']) {
  update(s => {
    const activeRole = s.currentGameData['activeRole'];
    s.currentGameData.activeRole = activeRole === 'b' ? 'w' : 'b';
    s.currentGameData.steps.push(step);
  });
}

// 重置当前棋局
export function toggleCurrentGame(gameId: number) {
  update(s => {
    s.currentGameId = gameId;
  });
}
