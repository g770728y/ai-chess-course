import * as React from 'react';
import { useCurrentGameId, useGameIds, useGames } from '../../../store/hooks';
import styles from './style.module.scss';
import { toggleCurrentGame } from '../../../store/actions';
import {
  List,
  ListItem,
  ListItemText,
  Typography,
  Icon,
  Grid
} from '@material-ui/core';
import SwapHoriz from '@material-ui/icons/SwapHoriz';
import { IGame } from '../../../store';

declare const gameItem: IGame;

export function GameList() {
  const currentGameId = useCurrentGameId();
  const gameIds = useGameIds();
  const games = useGames();
  console.log('games:', games);

  const itemText = (gameItem: IGame) => (
    <Grid
      container
      alignItems="center"
      justify="flex-start"
      style={{ width: '100%' }}
    >
      <Grid item style={{ width: '35%', flex: '1 1 1px' }}>
        {gameItem.players[0].name}{' '}
      </Grid>
      <Grid item style={{ width: '30%', flex: '0 0 0' }}>
        <SwapHoriz />
      </Grid>
      <Grid item style={{ width: '35%', flex: '1 1 1px', textAlign: 'right' }}>
        {gameItem.players[1].name}
      </Grid>
    </Grid>
  );

  return (
    <List component="nav">
      <For each="gameItem" index="_index" of={games}>
        <ListItem button key={gameItem.id} style={{ padding: 0 }}>
          {/* <If condition={} /> */}
          <ListItemText primary={itemText(gameItem)} />
        </ListItem>
      </For>{' '}
    </List>
  );

  // return (
  //   <div>
  //     {(gameIds || []).map(gameId => {
  //       const className = `${styles['game-list-item']} ${currentGameId ===
  //         gameId && styles['active']}`;
  //       return (
  //         <div
  //           onClick={() => toggleCurrentGame(gameId)}
  //           key={gameId}
  //           className={className}
  //         >
  //           {gameId}
  //         </div>
  //       );
  //     })}
  //   </div>
  // );
}
