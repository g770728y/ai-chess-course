import * as React from 'react';
import { useCurrentGameId, useGameIds } from '../../../store/hooks';
import { toggleCurrentGame } from '../../../store/helper';
import styles from './style.module.scss';

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
