import * as React from 'react';
import styles from './style.module.css';
import { GameDesk } from './GameDesk';
import * as R from 'ramda';
import { useAtom } from '@dbeining/react-atom';
import { appState, IPlayer, IDesk } from '../../store';

export function GameLobbyPage() {
  const { desks } = useAtom(appState, { select: s => ({ desks: s.desks }) });

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
