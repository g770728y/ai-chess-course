import * as React from 'react';
import { deref, swap } from '@libre/atom';
import { IStore, appState, IRole, IUser } from '.';

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

// 写到localStorage
export function writeLocalStorage(k: string, v: object | string) {
  localStorage.setItem(k, typeof v === 'string' ? v : JSON.stringify(v));
}

// 读取localStorage
export function readUserFromLocalStorage(): IUser | undefined {
  const v = localStorage.getItem('user');
  return v !== null ? (JSON.parse(v) as IUser) : undefined;
}

// 清空localStorage
export function clearLocalStorage() {
  localStorage.clear();
}
