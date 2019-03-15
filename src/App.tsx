import React from 'react';
import styles from './App.module.scss';
import { GameListPage } from './components/GameListPage';
import { GameLobbyPage } from './components/GameLobbyPage';
import { Header } from './components/Header';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
import { TopPage } from './components/TopPage';
import { HistoriesPage } from './components/HistoriesPage';

export function App() {
  return (
    <Router>
      <div className={styles['App']}>
        <Header />
        <Switch>
          <Route path="/game-list" component={GameListPage} />
          <Route path="/lobby" component={GameLobbyPage} />
          <Route path="/history" component={HistoriesPage} />
          <Route path="/top" component={TopPage} />
          <Redirect from="/" to="/game-list" />
        </Switch>
      </div>
    </Router>
  );
}
