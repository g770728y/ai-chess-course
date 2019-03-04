import * as React from 'react';
import { enterGameListPage, enterGameLobbyPage } from '../../store/actions';
import styles from './style.module.css';

export function Header() {
  return (
    <div className={styles['app-header']}>
      <div>围棋AI对战训练</div>
      <button onClick={enterGameListPage}>观战</button>
      <button onClick={enterGameLobbyPage}>对战</button>
      <div style={{ width: 1, flexGrow: 1 }} />
      <input type="text" placeholder="用户名" />
      <input type="text" placeholder="学号" />
      <input type="text" placeholder="密码" />
      <button onClick={login}>登录</button>
      <button onClick={register}>注册</button>
    </div>
  );
}

function login() {
  console.log('login');
}

function register() {
  console.log('register');
}
