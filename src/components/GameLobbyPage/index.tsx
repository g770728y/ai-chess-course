import * as React from 'react';
import styles from './style.module.css';
import { Route, Switch } from 'react-router';
import { GameLobby } from './GameLobby';
import useRouter from 'use-react-router';
import { Game } from '../common/Game';
import * as e from '../../store/effects';

export function GameLobbyPage() {
  const { match } = useRouter();
  const timeHandlerRef = React.useRef<any>();

  React.useEffect(() => {
    e.getDesks();
    timeHandlerRef.current = setInterval(() => {
      e.getDesks();
    }, 10000);

    return () => clearInterval(timeHandlerRef.current);
  }, []);

  return (
    <div className={styles['container']}>
      <Switch>
        <Route exact path={`${match.path}`} component={GameLobby} />
        <Route exact path={`${match.path}/game/:id`} component={Game} />
      </Switch>
    </div>
  );
}
