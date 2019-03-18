import { games, IStep, IColor } from './game.data';
import { without, range, last, map, concat, splitEvery, flatten } from 'rambda';
import faker from 'faker';
import { pubsub, STEP_ADDED, GAME_ENDED } from '../pubsub';

// 谁哪个颜色落子
function getNextColor(steps: IStep[]): IColor {
  return steps.length > 0
    ? last(steps)!.color === 'black'
      ? 'white'
      : 'black'
    : 'black';
}

// 随机落子
const _cells = map(i => map(j => [i, j], range(0, 18)), range(0, 18));
const allGridCells = (splitEvery(2, flatten(_cells)) as unknown) as number[][]; //
const toString = (x: number[]) => JSON.stringify(x);
const parse = (str: string) => JSON.parse(str);

function getNextXY(steps: IStep[]): { row: number; col: number } | undefined {
  const usedCells = steps.map(({ row, col }) => [row, col]);

  // 注意: 二维数组使用 without 结果不正确, 原因是 : [1,2] != [1,2];
  const restCells = without(
    usedCells.map(toString),
    allGridCells.map(toString)
  ).map(parse);

  if (restCells.length <= 0) {
    return undefined;
  } else {
    const cell = faker.random.arrayElement(restCells);
    return { row: cell[0], col: cell[1] };
  }
}

// 模拟游戏
export function startMock(gameId: number, color?: IColor) {
  const game = games.find(g => g.id === gameId);
  if (game && game.status !== 'finished') {
    // 硬改, 防止 前后台状态不一致 造成 颜色锁定
    if (game.steps && game.steps.length > 0) {
      game.steps[game.steps.length - 1].color = (color === 'black'
        ? 'white'
        : 'black') as IColor;
    }

    const timeHandler = setInterval(() => {
      const steps = game.steps || [];
      const nextColor = getNextColor(steps);
      const nextXY = getNextXY(steps);

      // 如果color存在, 则只返回该种颜色
      // 否则返回全部
      if (!color || color === nextColor) {
        if (nextXY !== undefined) {
          const colorStr = color ? `:${color}` : '';
          const nextStep = {
            ...nextXY,
            color: nextColor
          };
          game.steps = [...(game.steps || []), nextStep];
          pubsub.publish(`${STEP_ADDED}:${gameId}${colorStr}`, {
            stepAdded: nextStep
          });
        } else {
          // 棋格已放满, 结束游戏
          const gamePatch = {
            winner: faker.random.arrayElement(['black', 'white']),
            status: 'finished'
          };
          pubsub.publish(`${GAME_ENDED}:${gameId}`, {
            gameId,
            ...gamePatch
          });
          Object.assign(game, gamePatch);

          clearInterval(timeHandler);
        }
      }
    }, 1000);
  }
}
