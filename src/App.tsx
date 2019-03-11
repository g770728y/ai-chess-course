import React, { Component } from 'react';
import styles from './App.module.scss';
import { GameListPage } from './components/GameListPage';
import { useAtom } from '@dbeining/react-atom';
import { appState } from './store';
import { GameLobbyPage } from './components/GameLobbyPage';
import { Header } from './components/Header';
import { BrowserRouter as Router } from 'react-router-dom';

export function App() {
  const currentPage = useAtom(appState, { select: s => s.ui.currentPage });
  const page =
    currentPage === 'game-list' ? <GameListPage /> : <GameLobbyPage />;

  return (
    <Router>
      <div className={styles['App']}>
        <Header />
        {page}
      </div>
    </Router>
  );
}
