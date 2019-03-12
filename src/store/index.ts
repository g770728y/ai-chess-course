import { Atom } from '@dbeining/react-atom';
import { store } from './mock';

export type IRole = 'w' | 'b';

export type IStep = [/* rowIdx */ number, /* colIdx */ number, 'w' | 'b'];

export type IActive = 'human' | 'ai';

export type IGameInfo_Player = {
  id: number;
  role: IRole;
  name: string;
  active: IActive;
};

export interface IGameInfo {
  players: [IGameInfo_Player, IGameInfo_Player];
}

export type IGameState = 'ready' | 'working' | 'finished';

export interface IGameData {
  id: number;
  status: IGameState;
  activeRole: IRole;
  steps: IStep[];
  winner?: IRole;
  players: [IGameInfo_Player, IGameInfo_Player];
}

export type IPageType = 'game-list' | 'game-lobby';

export interface IPlayer {
  id: number;
  name: string;
  no: string;
}

export interface IDesk {
  id: number;
  players: ({ id: number; name: string; active: IActive } | undefined)[];
}

export type IStore = {
  ui: {
    currentPage: IPageType;
  };
  user?: IUser;
  game: {
    loading: boolean;
    data: IGameData;
  };
  gameList: { [id: number]: IGameInfo };
  players: IPlayer[];
  desks: IDesk[];
};

export interface IUser {
  id: number;
  name: string;
  password?: string;
  no: string;
}

export const appState = Atom.of<IStore>(store);
