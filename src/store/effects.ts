import * as React from 'react';
import { IUser } from '.';
import * as a from './actions';
import { writeLocalStorage, clearLocalStorage } from './helper';
import { client } from '../graphqls/apollo';
import { loginGql, registerGql, updateUserGql } from '../graphqls/auth.gql';
import { playersGql } from '../graphqls/player.gql';

////////////////////////////////////////////////////////////////////////////////////////////////////////////
// 注册登录

export interface IUserInput {
  no: string;
  password: string;
}

export function doLogin(user: IUserInput) {
  client
    .mutate({
      mutation: loginGql,
      variables: user,
      fetchPolicy: 'no-cache'
    })
    .then(({ data: { login: { user, token } } }) => {
      console.log(user, token);
      writeLocalStorage('auth', { user, token });
      a.login(user);
    });
}

export function doRegister(user: IUserInput) {
  return client
    .mutate({
      mutation: registerGql,
      variables: user,
      fetchPolicy: 'no-cache'
    })
    .then(({ data: { register: { user, token } } }) => {
      console.log(user, token);
      writeLocalStorage('auth', { user, token });
      a.login(user);
    });
}

export function doLogout() {
  clearLocalStorage();
  a.logout();
}

// 完善 user 信息
export function updateUserInfo({ id, name }: { id: number; name: string }) {
  return client
    .mutate({
      mutation: updateUserGql,
      variables: { id, name },
      fetchPolicy: 'no-cache'
    })
    .then(({ data: { updateUser: isSuccess } }) => {
      isSuccess && a.updateUser({ id, name });
    });
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////
// 初始化
export function getPlayers() {
  a.readyGetPlayers();
  return client
    .query({
      query: playersGql,
      fetchPolicy: 'no-cache'
    })
    .then(({ data: { players } }) => {
      console.log('全部玩家', players);
      a.fillPlayers(players);
    });
}
