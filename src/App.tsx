import React, { Component } from 'react';
import './App.css';
import { GameListPage } from './components/GameListPage';
import { useAtom } from '@dbeining/react-atom';
import { appState } from './store';
import { GameLobbyPage } from './components/GameLobbyPage';
import { Header } from './components/Header';

export function App() {
  const currentPage = useAtom(appState, { select: s => s.ui.currentPage });
  const page =
    currentPage === 'game-list' ? <GameListPage /> : <GameLobbyPage />;

  return (
    <div className="App">
      <Header />
      {page}
    </div>
  );
}
