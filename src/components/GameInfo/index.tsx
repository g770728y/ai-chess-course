import * as React from 'react';
import {
  useCurrentGameId,
  useGamePlayers,
  useGameActiveRole,
  useGameActivePlayer,
  useCurrentGameWinner
} from '../../helper';
import { IPlayer, IRole } from '../store';
import clock from './clock.png';

function piece(bg: 'black' | 'white') {
  return (
    <div
      className="chess-piece"
      style={{ width: 40, height: 40, borderRadius: 20, background: bg }}
    />
  );
}

function playerInfo(gameId: number, player: IPlayer) {
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
    <div className="game-info">
      <div className="row">
        {piece('black')}
        {playerInfo(gameId, players[0])}
      </div>
      <div className="row">
        {piece('white')}
        {playerInfo(gameId, players[1])}
      </div>
    </div>
  );
}
