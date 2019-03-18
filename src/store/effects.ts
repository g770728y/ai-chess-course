import { appState, IActor, IStep, IColor } from '.';
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
import {
  getGamesGql,
  getGameGql,
  createGameGql,
  stepAddedGql,
  createStepGql,
  lostGameGql
} from '../graphqls/game.gql';

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
      a.fillDesks(desks);
    });
}

// 进行中的游戏
export function getGames() {
  console.log('get games');
  a.readyGetGames();
  return client
    .query({
      query: getGamesGql,
      fetchPolicy: 'no-cache'
    })
    .then(({ data: { games } }) => {
      a.fillGames(games);
    });
}

// 某局游戏
export function getGame(id: number) {
  a.readyGetGame();
  return client
    .query({
      query: getGameGql,
      variables: { id },
      fetchPolicy: 'no-cache'
    })
    .then(({ data: { game } }) => {
      a.fillGame(game);
      return game;
    });
}

// 认输
export function lostGame(gameId: number) {
  const user = deref(appState).user!;
  return client
    .mutate({
      mutation: lostGameGql,
      variables: { gameId, playerId: user.id },
      fetchPolicy: 'no-cache'
    })
    .then(({ data: { lostGame: success } }) => {
      if (success) {
        a.lostGame(gameId, user.id);
      }
    });
}

// 注册到游戏, 监听游戏落子
export function onGameStepAdded(gameId: number, color?: IColor) {
  return client
    .subscribe({
      query: stepAddedGql,
      variables: { gameId, color },
      fetchPolicy: 'no-cache'
    })
    .subscribe(({ data: { stepAdded: step } }) => {
      a.onStep(step);
    });
}

// 手动启动游戏
interface createGameInputType {
  playerId0: number;
  player0Actor: IActor;
  playerId1: number;
  player1Actor: IActor;
  deskId: number;
}
export function createGame(args: createGameInputType) {
  return client
    .mutate({
      mutation: createGameGql,
      variables: args,
      fetchPolicy: 'no-cache'
    })
    .then(({ data: { createGame: game } }) => {
      a.fillGame(game);
      return game;
    });
}

// 当前用户 使用 human , 可以手工添加 step
export function createStep(step: IStep) {
  const gameId = deref(appState).game.data.id;
  return client
    .mutate({
      mutation: createStepGql,
      variables: { gameId, ...step },
      fetchPolicy: 'no-cache'
    })
    .then(({ data: { createStep: success } }) => {
      if (success) {
        a.onStep({ row: step.row, col: step.col, color: step.color });
      }
    });
}
