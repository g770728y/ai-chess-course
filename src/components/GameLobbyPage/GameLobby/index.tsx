import * as React from 'react';
import styles from './style.module.css';
import { GameDesk } from '../GameDesk';
import { useDesks } from '../../../store/hooks';

export function GameLobby() {
  const desks = useDesks();
  const desksNode = desks.map(({ id }) => {
    return (
      <div className={styles['desk-container']} key={id}>
        <GameDesk id={id} />
      </div>
    );
  });
  return (
    <div className={styles.container}>
      <div className={styles['desks-container']}>{desksNode}</div>
    </div>
  );
}
