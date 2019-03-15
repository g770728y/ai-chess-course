import * as React from 'react';
import styles from './index.module.scss';
import { GameInfo } from './GameInfo';
import { ChessBoard } from './ChessBoard';
import { GRID_COUNT } from '../../../constant';
import useRouter from 'use-react-router';
import useComponentSize from '@rehooks/component-size';

const Game: React.SFC = () => {
  const ref = React.useRef<HTMLDivElement>(null);

  const { width } = useComponentSize(ref);

  const { match, location } = useRouter<{ id: string }>();
  const gameId = parseInt(match.params['id']);

  return (
    <div className={styles['game-content']}>
      <div ref={ref} className={styles['chess-board-container']}>
        <ChessBoard w={width - 50 * 2} n={GRID_COUNT} />
      </div>

      <div className={styles['game-info-container']}>
        <GameInfo gameId={gameId} />
      </div>
    </div>
  );
};

export { Game };
