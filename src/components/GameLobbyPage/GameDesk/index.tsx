import * as React from 'react';
import styles from './style.module.css';
import { IDesk } from '../../../store';
import { sitDown } from '../../../store/actions';
import { Button, ButtonBase } from '@material-ui/core';
import useRouter from 'use-react-router';
import { useDesk } from '../../../store/hooks';

export function GameDesk({ id }: { id: number }) {
  console.log('desks id:', id);
  const data = useDesk(id);
  const { history, match } = useRouter();

  const [leftPlayer, rightPlayer] = data.players;

  const leftPlayerNode =
    leftPlayer === undefined ? '空' : `${leftPlayer.name}-${leftPlayer.actor}`;
  const rightPlayerNode =
    rightPlayer === undefined
      ? '空'
      : `${rightPlayer.name}-${rightPlayer.actor}`;

  function handleSeatClick(idx: number) {
    if (data.players[idx] === undefined) {
      sitDown(data.id, idx, 'ai');
    }
  }

  if (id === 2) {
    console.log(rightPlayer);
  }
  const startGame = React.useCallback(() => {
    // TODO: 通知后台游戏开始
    console.log('这里应改为: 通知后台开始游戏, 并从后台获取游戏id');
    if (leftPlayer && rightPlayer) {
      history.push(`${match.path}/game/1`);
    }
  }, [leftPlayer, rightPlayer]);

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
