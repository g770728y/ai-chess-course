import * as React from 'react';
import { deref, swap } from '@libre/atom';
import { IStore, appState, IRole, IUser } from '.';

// 找到最接近的可整除d的值(防止出现小数px值)
export function dividableNumber(n: number, d: number): number {
  return Math.round(n / d) * d;
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
