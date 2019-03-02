import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { ChessBoard } from './components/ChessBoard';
import { GRID_COUNT } from './constant';
import { useAtom } from '@dbeining/react-atom';
import { Page } from './components/Page';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Page />
      </div>
    );
  }
}

export default App;
