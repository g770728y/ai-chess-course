import { swap } from '@libre/atom';
import { appState, IPageType, IUser } from '.';

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

export function login(user: IUser) {
  swap(appState, s => ({
    ...s,
    user
  }));
}

export function logout() {
  swap(appState, s => ({
    ...s,
    user: undefined
  }));
}
