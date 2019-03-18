import * as React from 'react';
import { GameList } from './GameList';
import styles from './style.module.scss';
import { Game } from '../common/Game';
import { Route, Redirect, Switch } from 'react-router';
import useRouter from 'use-react-router';
import { useFirstGameId } from '../../store/hooks';
import * as e from '../../store/effects';

export function GameListPage() {
  const { match, location } = useRouter();
  const firstGameId = useFirstGameId();
  const timeHandlerRef = React.useRef<any>();

  React.useEffect(() => {
    timeHandlerRef.current = setInterval(() => {
      e.getGames();
    }, 10000);
    return () => {
      clearInterval(timeHandlerRef.current);
    };
  }, []);

  if (firstGameId === undefined || firstGameId === null) {
    return <div>暂时没有进行中的棋局</div>;
  }

  return (
    <div className={styles['page-container']}>
      <div className={styles['game-list']}>
        <GameList />
      </div>
      <Switch>
        <Redirect
          exact
          from={`${match.path}`}
          to={`${match.path}/game/${firstGameId}`}
        />
        <Route path={`${match.path}/game/:id`} component={Game} />
      </Switch>
    </div>
  );
}
