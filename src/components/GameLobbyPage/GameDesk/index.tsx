import * as React from 'react';
import styles from './style.module.css';
import { useAtom } from '@dbeining/react-atom';
import { appState, IDesk } from '../../../store';

export function GameDesk({ data }: { data: IDesk }) {
  const [leftPlayer, rightPlayer] = data.players;

  const leftPlayerNode =
    leftPlayer === undefined ? '空' : `${leftPlayer.name}-${leftPlayer.active}`;
  const rightPlayerNode =
    rightPlayer === undefined
      ? '空'
      : `${rightPlayer.name}-${rightPlayer.active}`;

  return (
    <div className={styles.container}>
      <div className={styles.chair}>{leftPlayerNode}</div>
      <div className={styles.desk}>{data.id}</div>
      <div className={styles.chair}>{rightPlayerNode}</div>
    </div>
  );
}
