import * as React from 'react';
import { IUser } from '.';
import { login } from './actions';

export function doLogin(user: IUser) {
  return Promise.resolve(user).then((user: IUser) => {
    login(user);
  });
}

export function doRegister(user: IUser) {
  return Promise.resolve(user).then((user: IUser) => {
    login(user);
  });
}
