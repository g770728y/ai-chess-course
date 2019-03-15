import * as React from 'react';
import { useCurrentGameId, useGames } from '../../../store/hooks';
import {
  List,
  ListItem,
  ListItemText,
  Typography,
  Icon,
  Grid,
  Drawer
} from '@material-ui/core';
import SwapHoriz from '@material-ui/icons/SwapHoriz';
import { IGame } from '../../../store';
import useRouter from 'use-react-router';

declare const gameItem: IGame;

export function GameList() {
  const { history, match } = useRouter();
  const currentGameId = useCurrentGameId();
  const games = useGames();

  const handleItemChange = React.useCallback((id: number) => {
    history.push(`${match.path}/game/${id}`);
  }, []);

  const itemText = (gameItem: IGame) => (
    <Grid
      container
      alignItems="center"
      justify="flex-start"
      style={{ width: '100%', padding: '4px 8px' }}
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
        <ListItem
          selected={gameItem.id === currentGameId}
          button
          key={gameItem.id}
          style={{ padding: 0 }}
          onClick={() => handleItemChange(gameItem.id)}
        >
          <ListItemText primary={itemText(gameItem)} />
        </ListItem>
      </For>{' '}
    </List>
  );
}
