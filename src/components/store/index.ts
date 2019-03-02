import { Atom } from '@dbeining/react-atom';
import { store } from './mock';

export type IRole = 'w' | 'b';

export type IStep = [/* rowIdx */ number, /* colIdx */ number, 'w' | 'b'];

export type IActive = 'me' | 'ai';

export type IPlayer = {
  id: number;
  role: IRole;
  name: string;
  active: IActive;
};

export interface IGameInfo {
  players: [IPlayer, IPlayer];
}

export type IGameState = 'ready' | 'working' | 'finished';

export interface IGameData {
  status: IGameState;
  activeRole: IRole;
  steps: IStep[];
  winner?: IRole;
}

export type IStore = {
  user?: IUser;
  currentGameId: number;
  currentGameData: IGameData;
  gameList: { [id: number]: IGameInfo };
};

export const appState = Atom.of<IStore>(store);

export interface IUser {
  id: number;
  name: string;
  password?: string;
  no: string;
}
