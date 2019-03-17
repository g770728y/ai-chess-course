import { appState } from '.';
import * as a from './actions';
import { writeLocalStorage, clearLocalStorage } from './helper';
import { client } from '../graphqls/apollo';
import { loginGql, registerGql } from '../graphqls/auth.gql';
import { updateUserGql, getUserGql } from '../graphqls/user.gql';
import { playersGql } from '../graphqls/player.gql';
import { historiesGql } from '../graphqls/history.gql';
import { deref } from '@libre/atom';
import { getStatsGql } from '../graphqls/stat.gql';
import { getDesksGql } from '../graphqls/desk.gql';

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

// 获取用户信息
export function getUser() {
  const user = deref(appState).user;
  if (user && user.id) {
    client
      .query({
        query: getUserGql,
        variables: { id: user.id },
        fetchPolicy: 'no-cache'
      })
      .then(({ data: { getUser: user } }) => {
        console.log('user:', user);
        a.updateUser(user);
      });
  }
}

// 历史记录
export function getHistories(playerId: number) {
  a.readyGetHistories();
  return client
    .query({
      query: historiesGql,
      variables: { playerId },
      fetchPolicy: 'no-cache'
    })
    .then(({ data: { histories } }) => {
      console.log('histories', histories);
      a.fillHistories(histories);
    });
}

// 统计信息
export function getStats() {
  a.readyGetStats();
  return client
    .query({
      query: getStatsGql,
      fetchPolicy: 'no-cache'
    })
    .then(({ data: { stats } }) => {
      console.log('stats:', stats);
      a.fillStats(stats);
    });
}

// 游戏大厅
export function getDesks() {
  a.readyGetDesks();
  return client
    .query({
      query: getDesksGql,
      fetchPolicy: 'no-cache'
    })
    .then(({ data: { desks } }) => {
      console.log('desks', desks);
      a.fillDesks(desks);
    });
}
