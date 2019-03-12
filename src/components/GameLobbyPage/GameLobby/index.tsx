import * as React from 'react';
import { useAtom } from '@dbeining/react-atom';
import { appState, IDesk } from '../../../store';
import styles from './style.module.css';
import { GameDesk } from '../GameDesk';
import { useDesks } from '../../../store/hooks';

export function GameLobby() {
  const desks = useDesks();

  const desksNode = desks.map(d => (
    <div className={styles['desk-container']} key={d.id}>
      <GameDesk data={d as IDesk} />
    </div>
  ));
  return (
    <div className={styles.container}>
      <div className={styles['desks-container']}>{desksNode}</div>
    </div>
  );
}
