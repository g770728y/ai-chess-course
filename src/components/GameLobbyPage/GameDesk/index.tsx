import * as React from 'react';
import styles from './style.module.css';
import { IDesk, IGame, IActor } from '../../../store';
import { sitDown } from '../../../store/actions';
import { ButtonBase } from '@material-ui/core';
import useRouter from 'use-react-router';
import { useDesk, useUser, useGameOnDesk } from '../../../store/hooks';
import * as e from '../../../store/effects';
import { ActorPicker } from '../../common/ActorPicker';

export function GameDesk({ id }: { id: number }) {
  const data = useDesk(id);
  const user = useUser();
  const { history, match } = useRouter();

  const [isShowActorPicker, setShowActorPicker] = React.useState(false);
  const [seatIdx, setSeatIdx] = React.useState<number>(0);

  const [leftPlayer, rightPlayer] = data.players;

  const leftPlayerNode =
    leftPlayer === undefined ? '空' : `${leftPlayer.name}-${leftPlayer.actor}`;
  const rightPlayerNode =
    rightPlayer === undefined
      ? '空'
      : `${rightPlayer.name}-${rightPlayer.actor}`;

  function handleSeatClick(idx: number) {
    if (data.players[idx] === undefined) {
      setSeatIdx(idx);
      setShowActorPicker(true);
    }
  }

  const game = useGameOnDesk(id);
  const gameId = game ? game.id : undefined;

  const startGame = React.useCallback(() => {
    // TODO: 通知后台游戏开始
    if (leftPlayer && rightPlayer) {
      e.createGame({
        playerId0: leftPlayer.userId,
        player0Actor: leftPlayer.actor,
        playerId1: rightPlayer.userId,
        player1Actor: rightPlayer.actor,
        deskId: id
      }).then(game => {
        history.push(`${match.path}/game/${game.id}`);
      });
    }
  }, [leftPlayer, rightPlayer, gameId]);

  const continueGame = React.useCallback(() => {
    game && history.push(`${match.path}/game/${game.id}`);
  }, [gameId]);

  const watchGame = React.useCallback(() => {
    game && history.push(`game-list/game/${game.id}`);
  }, [gameId]);

  // 可 点击 开始
  const isMyDesk =
    leftPlayer &&
    rightPlayer &&
    user &&
    user.id &&
    [leftPlayer.userId, rightPlayer.userId].indexOf(user.id) >= 0;

  // 可点击 开始
  const startable = isMyDesk && (!game || game!.status === 'ready');

  // 可点击 继续
  const continuable = isMyDesk && game && game.status === 'working';

  // 可点击 观看
  const watchable =
    !isMyDesk && leftPlayer && rightPlayer && game && game.status === 'working';

  return (
    <div className={styles.container}>
      <ButtonBase>
        <div className={styles.seat} onClick={() => handleSeatClick(0)}>
          {leftPlayerNode}
        </div>
      </ButtonBase>
      <If condition={!!startable}>
        <ButtonBase style={{ borderRadius: '100%' }} onClick={startGame}>
          <div className={styles.desk}>
            <span style={{ fontSize: 20, color: 'red' }}>点击开始</span>
          </div>
        </ButtonBase>
      </If>

      <If condition={!!continuable}>
        <ButtonBase style={{ borderRadius: '100%' }} onClick={continueGame}>
          <div className={styles.desk}>
            <span style={{ fontSize: 20, color: 'red' }}>继续</span>
          </div>
        </ButtonBase>
      </If>

      <If condition={!!watchable}>
        <ButtonBase style={{ borderRadius: '100%' }} onClick={watchGame}>
          <div className={styles.desk}>
            <span style={{ fontSize: 20, color: 'red' }}>观看</span>
          </div>
        </ButtonBase>
      </If>

      <If condition={!startable && !continuable && !watchable}>
        <ButtonBase style={{ borderRadius: '100%' }}>
          <div className={styles.desk}>{data.id}</div>
        </ButtonBase>
      </If>

      <ButtonBase>
        <div className={styles.seat} onClick={() => handleSeatClick(1)}>
          {rightPlayerNode}
        </div>
      </ButtonBase>

      <ActorPicker
        isVisible={isShowActorPicker}
        onSelect={_actor => {
          setShowActorPicker(false);
          sitDown(data.id, seatIdx, _actor);
        }}
      />
    </div>
  );
}
