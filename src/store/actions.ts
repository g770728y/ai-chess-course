import { swap } from '@libre/atom';
import { appState, IPageType, IUser, IRole, IActive, IDesk, IPlayer } from '.';

////////////////////////////////////////////////////////////////////  updator ////////////////////////////////////////////////////////////
export function enterPage(currentPage: IPageType) {
  swap(appState, s => ({
    ...s,
    ui: {
      ...s.ui,
      currentPage: currentPage
    }
  }));
}

export function enterGameListPage() {
  enterPage('game-list');
}

export function enterGameLobbyPage() {
  enterPage('game-lobby');
}

// TODO: 新用户需要加入到 s.players中
export function login(user: IUser) {
  swap(appState, s => {
    const playerIdx = s.players.findIndex(p => p.id === user.id);
    let players: IPlayer[] = [];
    if (playerIdx >= 0) {
      // 登录
      players = [
        ...s.players.slice(0, playerIdx),
        user as IPlayer,
        ...s.players.slice(playerIdx + 1)
      ];
    } else {
      // 注册
      players = [...s.players, user as IPlayer];
    }
    return {
      ...s,
      user,
      players
    };
  });
}

export function logout() {
  swap(appState, s => ({
    ...s,
    user: undefined
  }));
}

// 点击椅子, 加入游戏
// TODO: 这个方法应该在后台实现,  这里是mock
export function sitDown(deskId: number, playerIdx: number, active: IActive) {
  swap(appState, s => {
    const player = s.players.find(p => p.id === s.user!.id)!;
    const deskIdx = s.desks.findIndex(d => d.id === deskId)!;
    const desk = s.desks[deskIdx];
    const players = desk.players;
    // TODO: 清除desk.players中已在存在的(防重复)
    const newDesk: IDesk = {
      ...desk,
      players: [
        ...players.slice(0, playerIdx),
        { ...player, active },
        ...players.slice(playerIdx + 1)
      ]
    };
    return {
      ...s,
      desks: [
        ...s.desks.slice(0, deskIdx),
        newDesk,
        ...s.desks.slice(deskIdx + 1)
      ]
    };
  });
}
