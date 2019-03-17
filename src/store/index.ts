import { Atom } from '@dbeining/react-atom';
import { store } from './mock';

export type IColor = 'white' | 'black';

export type IStep = [/* rowIdx */ number, /* colIdx */ number, IColor];

export type IActor = 'human' | 'ai';

export type IGameInfo_Player = {
  userId: number;
  color: IColor;
  name?: string;
  actor: IActor;
};

export type IGameState = 'ready' | 'working' | 'finished';

export interface IGame {
  id: number;
  status?: IGameState;
  activeColor?: IColor;
  steps?: IStep[];
  winner?: IColor;
  players: [IGameInfo_Player, IGameInfo_Player];
}

export interface IPlayer {
  userId: number;
  name?: string;
  no: string;
}

export interface IDesk {
  id: number;
  players: ({ userId: number; name?: string; actor: IActor } | undefined)[];
}

export type IStore = {
  errors?: string[];

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
  no: string;
  password?: string;
  name?: string;
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
