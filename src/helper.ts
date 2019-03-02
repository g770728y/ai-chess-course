import { deref, swap } from '@libre/atom';
import { appState, IRole, IStep, IStore, IPlayer } from './components/store';
import * as R from 'ramda';
import { useAtom } from '@dbeining/react-atom';

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

///////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////  全部 hooks   //////////////////////////////////////////////////////
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
export function useGameActivePlayer(gameId: number): IPlayer {
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
