import * as React from 'react';
import { IUser } from '.';
import { login, logout } from './actions';
import { writeLocalStorage, clearLocalStorage } from './helper';

export interface IUserInput {
  no: string;
  name: string;
  password: string;
}

export function doLogin(user: IUserInput) {
  return Promise.resolve({ ...user, id: 1 }).then((user: IUser) => {
    writeLocalStorage('user', user);
    login(user);
  });
}

export function doRegister(user: IUserInput) {
  return Promise.resolve({ ...user, id: 1 }).then((user: IUser) => {
    writeLocalStorage('user', user);
    login(user);
  });
}

export function doLogout() {
  clearLocalStorage();
  logout();
}
