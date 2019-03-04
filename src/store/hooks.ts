import * as React from 'react';
import { useAtom } from '@dbeining/react-atom';
import { appState, IStep, IGameInfo_Player, IRole, IUser } from '.';

///////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////  全部 hooks   //////////////////////////////////////////////////////
export function useUser(): IUser | undefined {
  return useAtom(appState, {
    select: s => s.user
  });
}

export function useCurrentGameId() {
  return useAtom(appState, {
    select: s => s.currentGameId
  });
}

export function useGameIds() {
  return useAtom(appState, {
    select: s => Object.keys(s.gameList).map(i => parseInt(i))
  });
}

export function useCurrentSteps() {
  return useAtom(appState, {
    select: s => s.currentGameData.steps || []
  }) as IStep[];
}

export function useGamePlayers(gameId: number) {
  return useAtom(appState, {
    select: s => s.gameList[gameId].players
  });
}

export function useGameActiveRole(gameId: number) {
  return useAtom(appState, {
    select: s => s.currentGameData.activeRole
  });
}

// 当前棋局的活动参与者
export function useGameActivePlayer(gameId: number): IGameInfo_Player {
  const activeRole = useAtom(appState, {
    select: s => s.currentGameData.activeRole || 'b'
  });

  const players = useGamePlayers(gameId);

  return players.find(p => p.role === activeRole)!;
}

// 获取当前游戏胜者
export function useCurrentGameWinner(): IRole | undefined {
  const { status, winner } = useAtom(appState, {
    select: s => ({
      status: s.currentGameData.status,
      winner: s.currentGameData.winner
    })
  });
  return status === 'finished' ? winner : undefined;
}
