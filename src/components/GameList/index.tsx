import * as React from 'react';
import { toggleCurrentGame, useCurrentGameId, useGameIds } from '../../helper';

export function GameList() {
  const currentGameId = useCurrentGameId();
  const gameIds = useGameIds();

  return (
    <div>
      {(gameIds || []).map(gameId => {
        const className = `game-list-item ${currentGameId === gameId &&
          'active'}`;
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
