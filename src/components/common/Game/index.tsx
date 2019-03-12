import * as React from 'react';
import styles from './index.module.scss';
import { GameInfo } from './GameInfo';
import { ChessBoard } from './ChessBoard';
import { GRID_COUNT } from '../../../constant';

interface IProps {
  gameId: number;
}

const Game: React.SFC<IProps> = ({ gameId }) => {
  // TODO: 从后台取出game信息

  return (
    <div className={styles['game-content']}>
      <div className={styles['chess-board-container']}>
        <ChessBoard w={1008} n={GRID_COUNT} />
      </div>
      <GameInfo />
    </div>
  );
};

export { Game };
