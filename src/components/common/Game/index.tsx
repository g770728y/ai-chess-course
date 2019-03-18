import * as React from 'react';
import styles from './index.module.scss';
import { GameInfo } from './GameInfo';
import { ChessBoard } from './ChessBoard';
import { GRID_COUNT } from '../../../constant';
import useRouter from 'use-react-router';
import useComponentSize from '@rehooks/component-size';
import * as e from '../../../store/effects';
import { IGame } from '../../../store';
import { Subscription } from 'apollo-client/util/Observable';
import { useUser } from '../../../store/hooks';

const Game: React.SFC = () => {
  const ref = React.useRef<HTMLDivElement>(null);

  // 用于取消上次subs
  const subsRef = React.useRef<Subscription>();

  // 用于确保点击同一game不会多次sub
  const [lastGameId, setLastGameId] = React.useState<number>();

  // 有兼容问题, 只兼容chrome
  const { width } = useComponentSize(ref);

  const user = useUser();

  const { match, location } = useRouter<{ id: string }>();

  const gameId = parseInt(match.params['id']);

  React.useEffect(() => {
    if (gameId >= 0 && gameId !== lastGameId) {
      e.getGame(gameId).then((game: IGame) => {
        const me =
          user && game.players.find(({ userId }) => userId === user.id);
        const color = me && me.actor === 'human' ? me.color : undefined;
        console.log(
          'monitor: ',
          color === undefined
            ? undefined
            : color === 'black'
            ? 'white'
            : 'black'
        );
        const _subs = e.onGameStepAdded(
          game.id,
          color === undefined
            ? undefined
            : color === 'black'
            ? 'white'
            : 'black'
        );
        subsRef.current = _subs;
      });
      setLastGameId(gameId);
    }

    return () => {
      subsRef.current && subsRef.current.unsubscribe();
    };
  }, [gameId]);

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
