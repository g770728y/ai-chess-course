import * as React from 'react';
import { useAtom } from '@dbeining/react-atom';
import {
  appState,
  IStep,
  IColor,
  IUser,
  IDesk,
  IGame,
  IGameInfo_Player
} from '.';
import * as R from 'rambda';

///////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////  全部 hooks   //////////////////////////////////////////////////////
export function useUser(): IUser | undefined {
  return useAtom(appState, {
    select: s => s.user
  });
}

export function useCurrentGameId() {
  return useAtom(appState, {
    select: s => s.game.data.id
  });
}

export function useGames() {
  return useAtom(appState, {
    select: s => s.games.data
  }) as IGame[];
}

export function useFirstGameId() {
  return useAtom(appState, {
    select: s =>
      s.games.data && s.games.data.length > 0 ? s.games.data[0].id : undefined
  }) as number | undefined;
}

////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////
//////////////  当前棋局  ///////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////

// 当前棋局
export function useCurrentGame() {
  return useAtom(appState, {
    select: s => s.game
  });
}

// 当前用户是否是当前游戏参与者
// 真人参与者可以主动认输, 可以落子
export function useCurrentSteps() {
  return useAtom(appState, {
    select: s => s.game.data.steps || []
  }) as IStep[];
}

export function useCurrentPlayers() {
  return useAtom(appState, {
    select: s => s.game.data.players
  });
}

export function useCurrentActiveColor() {
  return useAtom(appState, {
    select: s => s.game.data.activeColor || 'black'
  });
}

// 当前棋局的活动参与者
export function useCurrentActivePlayer(): IGameInfo_Player {
  const activeColor = useCurrentActiveColor();
  const players = useCurrentPlayers();
  return players.find(p => p.color === activeColor)!;
}

// 获取当前游戏胜者
export function useCurrentGameWinner(): IColor | undefined {
  const { status, winner } = useAtom(appState, {
    select: s => ({
      status: s.game.data.status,
      winner: s.game.data.winner
    })
  });
  return status === 'finished' ? winner : undefined;
}

// 当前用户是否可以落子
// 1. 必须在当前棋局里
// 2. 必须是手动
export function useCurrentUserMovable() {
  const game = useCurrentGame();
  const user = useUser();
  return (
    game &&
    !game.loading &&
    user &&
    game.data.players.find(p => {
      const activePlayer = game.data.players.find(
        p => p.color === game.data.activeColor
      )!;
      return activePlayer.actor === 'human' && activePlayer.userId === user.id;
    })
  );
}

////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////
//////////////    ///////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////
// 获取当前游戏大厅的棋桌信息
export function useDesks(): IDesk[] {
  return useAtom(appState, { select: s => s.desks.data }) as IDesk[];
}

// 获取肖前游戏大厅某张棋桌的信息
export function useDesk(id: number): IDesk {
  return useAtom(appState, {
    select: s =>
      s.desks.data.find(desk => desk.id === id) || { id, players: [] }
  }) as IDesk;
}

// 获取当前用户的参赛历史
export function useHistories() {
  return useAtom(appState, {
    select: s => {
      const data = (s.histories.data || []).map(history => {
        const opponent = s.players.data.find(
          p => p.userId === history.opponentId
        )!;
        return { opponent, ...history };
      });
      return { ...s.histories, data };
    }
  });
}

// 获取全部选手的统计信息
export function useStats() {
  return useAtom(appState, {
    select: s => {
      const data = s.stats.data.map(stat => {
        const player = s.players.data.find(p => p.userId === stat.playerId)!;
        return { player, ...stat };
      });
      return { ...s.stats, data };
    }
  });
}

// 全部错误消息
export function useErrorMessages() {
  return useAtom(appState, {
    select: s => s.errors || []
  });
}
