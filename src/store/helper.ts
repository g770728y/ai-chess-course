import * as React from 'react';
import { deref, swap } from '@libre/atom';
import { IStore, appState, IRole } from '.';

// 找到最接近的可整除d的值(防止出现小数px值)
export function dividableNumber(n: number, d: number): number {
  return Math.round(n / d) * d;
}

// 走一步
export function onStep(step: [number, number, 'b' | 'w']) {
  const activeRole = deref(appState).currentGameData['activeRole'];
  const f = (s: IStore): IStore => ({
    ...s,
    currentGameData: {
      ...s.currentGameData,
      activeRole: activeRole === 'b' ? 'w' : 'b',
      steps: [...s.currentGameData.steps, step]
    }
  });
  swap(appState, f);
}

// 重置当前棋局
export function toggleCurrentGame(gameId: number) {
  swap(appState, s => ({ ...s, currentGameId: gameId }));
}

// 获取当前棋局当前的棋手
export function getActiveRole(): IRole {
  return deref(appState).currentGameData.activeRole || 'b';
}
