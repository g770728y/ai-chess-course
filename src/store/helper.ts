import { IUser } from '.';

// 找到最接近的可整除d的值(防止出现小数px值)
export function dividableNumber(n: number, d: number): number {
  return Math.round(n / d) * d;
}

// 写到localStorage
export function writeLocalStorage(k: string, v: object | string) {
  localStorage.setItem(k, typeof v === 'string' ? v : JSON.stringify(v));
}

// 读取auth
export function readAuthFromLocalStorage():
  | { user: IUser; token: string }
  | undefined {
  const v = localStorage.getItem('auth');
  return v !== null && v !== 'undefined' ? JSON.parse(v) : undefined;
}

// 清空localStorage
export function clearLocalStorage() {
  localStorage.clear();
}
