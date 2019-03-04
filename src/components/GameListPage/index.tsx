import * as React from 'react';
import { ChessBoard } from '../ChessBoard';
import { GRID_COUNT } from '../../constant';
import { GameList } from '../GameList';
import { GameInfo } from '../GameInfo';

export function GameListPage() {
  return (
    <div className="page-container">
      <div className="game-list">
        <GameList />
      </div>
      <div className="game-content">
        <div className="chess-board-container">
          <ChessBoard w={1008} n={GRID_COUNT} />
        </div>
        <GameInfo />
      </div>
    </div>
  );
}
