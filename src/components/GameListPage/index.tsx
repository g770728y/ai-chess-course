import * as React from 'react';
import { GRID_COUNT } from '../../constant';
import { GameList } from './GameList';
import styles from './style.module.scss';
import { Game } from '../common/Game';

export function GameListPage() {
  return (
    <div className={styles['page-container']}>
      <div className={styles['game-list']}>
        <GameList />
      </div>
      <Game gameId={1} />
    </div>
  );
}
