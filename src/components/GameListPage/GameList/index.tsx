import * as React from 'react';
import { useCurrentGameId, useGameIds } from '../../../store/hooks';
import styles from './style.module.scss';
import { toggleCurrentGame } from '../../../store/actions';

export function GameList() {
  const currentGameId = useCurrentGameId();
  const gameIds = useGameIds();

  return (
    <div>
      {(gameIds || []).map(gameId => {
        const className = `${styles['game-list-item']} ${currentGameId ===
          gameId && styles['active']}`;
        return (
          <div
            onClick={() => toggleCurrentGame(gameId)}
            key={gameId}
            className={className}
          >
            {gameId}
          </div>
        );
      })}
    </div>
  );
}
