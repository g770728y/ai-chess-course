import * as React from 'react';
import clock from './clock.png';
import styles from './style.module.scss';
import { IGameInfo_Player, IRole } from '../../../../store';
import {
  useGameActivePlayer,
  useCurrentGameWinner,
  useCurrentGameId,
  useGamePlayers
} from '../../../../store/hooks';

function piece(bg: 'black' | 'white') {
  return (
    <div
      className="chess-piece"
      style={{ width: 40, height: 40, borderRadius: 20, background: bg }}
    />
  );
}

function playerInfo(gameId: number, player: IGameInfo_Player) {
  const activePlayer = useGameActivePlayer(gameId);
  const winner: IRole | undefined = useCurrentGameWinner();
  const isActive = activePlayer.id === player.id;
  const isWinner = winner === player.role;

  return (
    <span style={{ marginLeft: 10 }}>
      {player.name}&nbsp;
      {isActive && <img src={clock} style={{ width: 24 }} />}
      &nbsp;
      {isWinner && <span style={{ color: 'red' }}>win!</span>}
    </span>
  );
}

export function GameInfo() {
  const gameId = useCurrentGameId();
  const players = useGamePlayers(gameId)
    .slice(0)
    .sort(
      ({ role: role0 }, { role: role1 }) =>
        role0.charCodeAt(0) - role1.charCodeAt(1)
    );
  return (
    <div className={styles['game-info']}>
      <div className={styles['row']}>
        {piece('black')}
        {playerInfo(gameId, players[0])}
      </div>
      <div className={styles['row']}>
        {piece('white')}
        {playerInfo(gameId, players[1])}
      </div>
    </div>
  );
}
