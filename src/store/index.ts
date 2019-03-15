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

export type IGameState = 'ready' | 'working' | 'finished';

export interface IGame {
  id: number;
  status?: IGameState;
  activeRole?: IRole;
  steps?: IStep[];
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
  user?: IUser;
  game: {
    loading: boolean;
    data: IGame;
  };
  games: {
    loading: boolean;
    data: IGame[];
  };
  players: {
    loading: boolean;
    data: IPlayer[];
  };
  desks: {
    loading: boolean;
    data: IDesk[];
  };
  histories: {
    loading: boolean;
    data: IHistory[];
  };
  stats: {
    loading: boolean;
    data: IStat[];
  };
};

export interface IUser {
  id: number;
  name: string;
  password?: string;
  no: string;
}

export interface IStat {
  playerId: number;
  player?: IPlayer;
  win: number;
  lost: number;
  draw: number;
}

export interface IHistory {
  opponentId: number;
  opponent?: IPlayer;
  result: IGameResult;
  createdAt: string;
}

export type IGameResult = 'win' | 'lost' | 'draw';

export const appState = Atom.of<IStore>(store);
