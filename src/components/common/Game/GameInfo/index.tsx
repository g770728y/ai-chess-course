import * as React from 'react';
import clock from './clock.png';
import styles from './style.module.scss';
import { IRole, IGameInfo_Player } from '../../../../store';
import {
  useCurrentGameWinner,
  useCurrentActivePlayer,
  useCurrentPlayers,
  useCurrentGame,
  useUser
} from '../../../../store/hooks';
import {
  Card,
  CardContent,
  Divider,
  Typography,
  Button
} from '@material-ui/core';
import { ChessPieceRaw } from '../ChessBoard/ChessPiece';
import useRouter from 'use-react-router';

function playerInfo(gameId: number, player: IGameInfo_Player) {
  const activePlayer = useCurrentActivePlayer();
  const winner: IRole | undefined = useCurrentGameWinner();
  const isActive = activePlayer.id === player.id;
  const isWinner = winner === player.role;

  return (
    <span style={{ marginLeft: 15, color: '#666' }}>
      {player.name}&nbsp;
      {isActive && <img src={clock} style={{ width: 24 }} />}
      &nbsp;
      {isWinner && <span style={{ color: 'red' }}>win!</span>}
    </span>
  );
}

export const GameInfo: React.SFC<{ gameId: number }> = ({ gameId }) => {
  const players = useCurrentPlayers()
    .slice(0)
    .sort(
      ({ role: role0 }, { role: role1 }) =>
        role0.charCodeAt(0) - role1.charCodeAt(1)
    );

  const { history } = useRouter();

  const giveup = React.useCallback(() => {
    history.goBack();
  }, []);

  const game = useCurrentGame();
  const user = useUser();

  const canGiveup =
    game &&
    !game.loading &&
    user &&
    game.data.players.find(p => p.id === user.id);

  return (
    <div className={styles['game-info']}>
      <Card>
        <CardContent>
          <Typography variant="h4" style={{ textAlign: 'center' }}>
            玩家
          </Typography>
          <Divider style={{ marginTop: 15, marginBottom: 15 }} />
          <div className={styles['row']}>
            <ChessPieceRaw role="b" r={14} />
            {playerInfo(gameId, players[0])}
          </div>
          <div className={styles['row']}>
            <ChessPieceRaw role="w" r={14} />
            {playerInfo(gameId, players[1])}
          </div>
        </CardContent>
      </Card>

      <If condition={!!canGiveup}>
        <Button
          onClick={giveup}
          variant="contained"
          style={{ width: '100%', marginTop: 20 }}
        >
          放弃此局
        </Button>
      </If>
    </div>
  );
};
