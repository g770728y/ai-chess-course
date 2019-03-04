import * as React from 'react';
import { ChessBoard } from './ChessBoard';
import { GRID_COUNT } from '../../constant';
import { GameList } from './GameList';
import { GameInfo } from './GameInfo';
import styles from './style.module.scss';

export function GameListPage() {
  return (
    <div className={styles['page-container']}>
      <div className={styles['game-list']}>
        <GameList />
      </div>
      <div className={styles['game-content']}>
        <div className={styles['chess-board-container']}>
          <ChessBoard w={1008} n={GRID_COUNT} />
        </div>
        <GameInfo />
      </div>
    </div>
  );
}
