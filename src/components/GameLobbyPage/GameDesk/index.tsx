import * as React from 'react';
import styles from './style.module.css';
import { IDesk } from '../../../store';
import { sitDown } from '../../../store/actions';

export function GameDesk({ data }: { data: IDesk }) {
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

  return (
    <div className={styles.container}>
      <div className={styles.seat} onClick={() => handleSeatClick(0)}>
        {leftPlayerNode}
      </div>
      <div className={styles.desk}>{data.id}</div>
      <div className={styles.seat} onClick={() => handleSeatClick(1)}>
        {rightPlayerNode}
      </div>
    </div>
  );
}
