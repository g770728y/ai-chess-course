import * as React from 'react';
import styles from './style.module.css';
import { IDesk } from '../../../store';
import { sitDown } from '../../../store/actions';
import { Button, ButtonBase } from '@material-ui/core';
import useRouter from 'use-react-router';

export function GameDesk({ data }: { data: IDesk }) {
  const { history, match } = useRouter();

  const [leftPlayer, rightPlayer] = data.players;

  const leftPlayerNode =
    leftPlayer === undefined ? '空' : `${leftPlayer.name}-${leftPlayer.active}`;
  const rightPlayerNode =
    rightPlayer === undefined
      ? '空'
      : `${rightPlayer.name}-${rightPlayer.active}`;

  function handleSeatClick(idx: number) {
    if (data.players[idx] === undefined) {
      sitDown(data.id, idx, 'ai');
    }
  }

  const startGame = React.useCallback(() => {
    // TODO: 通知后台游戏开始
    if (leftPlayer && rightPlayer) {
      history.push(`${match.path}/game`);
    }
  }, []);

  return (
    <div className={styles.container}>
      <ButtonBase>
        <div className={styles.seat} onClick={() => handleSeatClick(0)}>
          {leftPlayerNode}
        </div>
      </ButtonBase>
      <ButtonBase style={{ borderRadius: '100%' }} onClick={startGame}>
        <div className={styles.desk}>
          {leftPlayer && rightPlayer ? (
            <span style={{ fontSize: 20, color: 'red' }}>点击开始</span>
          ) : (
            data.id
          )}
        </div>
      </ButtonBase>
      <ButtonBase>
        <div className={styles.seat} onClick={() => handleSeatClick(1)}>
          {rightPlayerNode}
        </div>
      </ButtonBase>
    </div>
  );
}
