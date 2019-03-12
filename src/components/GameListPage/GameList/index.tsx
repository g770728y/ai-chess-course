import * as React from 'react';
import { useCurrentGameId, useGameIds } from '../../../store/hooks';
import styles from './style.module.scss';
import { toggleCurrentGame } from '../../../store/actions';
import { List } from '@material-ui/core';

export function GameList() {
  const currentGameId = useCurrentGameId();
  const gameIds = useGameIds();

  // return <List component="nav" />;

  return (
    <div>
      <For each={_item_} index={_index_} of={[1, 2, 3]}>
        <span>
          {_item_}:{_index_}
        </span>
      </For>
    </div>
  );

  // return (
  //   <div>
  //     {(gameIds || []).map(gameId => {
  //       const className = `${styles['game-list-item']} ${currentGameId ===
  //         gameId && styles['active']}`;
  //       return (
  //         <div
  //           onClick={() => toggleCurrentGame(gameId)}
  //           key={gameId}
  //           className={className}
  //         >
  //           {gameId}
  //         </div>
  //       );
  //     })}
  //   </div>
  // );
}
