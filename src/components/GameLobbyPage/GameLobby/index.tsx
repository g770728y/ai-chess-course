import * as React from 'react';
import { useAtom } from '@dbeining/react-atom';
import { appState, IDesk } from '../../../store';
import styles from './style.module.css';
import { GameDesk } from '../GameDesk';
import { useDesks } from '../../../store/hooks';

export function GameLobby() {
  const desks = useDesks();
  console.log('desks:!!!', desks);
  const desksNode = desks.map(({ id }) => {
    console.log('...id:', id);
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
