import { desks } from '../desk/desk.data';
import faker from 'faker';
import { range, uniqWith, map, compose } from 'rambda';

export type IColor = 'white' | 'black';

export type IStep = { row: number; col: number; color: IColor };

export type IActor = 'human' | 'ai';

export type IGameState = 'ready' | 'working' | 'finished';

export type IGameInfo_Player = {
  userId: number;
  color: IColor;
  name?: string;
  actor: IActor;
};

export interface IGame {
  id: number;
  status?: IGameState;
  activeColor?: IColor;
  steps?: IStep[];
  winner?: IColor;
  players: IGameInfo_Player[];
}

export const games: IGame[] = desks
  .filter(desk => desk.players.length === 2)
  .map((desk, i) => {
    // const status = faker.random.arrayElement(['ready', 'working', 'finished']);
    const status = 'working' as IGameState;
    const activeColor = faker.random.arrayElement(['white', 'black']) as IColor;
    // const winner =
    //   status === 'finished'
    //     ? faker.random.arrayElement(['white', 'black'])
    //     : undefined;
    const winner = undefined;
    const players = desk.players.map(
      (p, i) =>
        ({
          ...p,
          color: i === 0 ? 'black' : 'white'
        } as IGameInfo_Player)
    );
    return {
      id: i,
      status,
      activeColor,
      winner,
      players
    };
  });

export const randomSteps = (): IStep[] => {
  const stepCount = faker.random.number(200);

  let steps = range(0, stepCount).map(i => ({
    row: faker.random.number(18),
    col: faker.random.number(18)
  }));
  steps = uniqWith((x: any, y) => x.row === y.row && x.col === y.col)(steps);
  steps = steps.map((step, i) => ({
    ...step,
    color: i % 2 === 0 ? 'black' : ('white' as IColor)
  }));

  return steps as IStep[];
};
