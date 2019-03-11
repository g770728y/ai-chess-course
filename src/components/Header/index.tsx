import * as React from 'react';
import { enterGameListPage, enterGameLobbyPage } from '../../store/actions';
import styles from './style.module.css';
import { doLogout, doLogin, doRegister, IUserInput } from '../../store/effects';
import { useUser } from '../../store/hooks';
import { useFormState } from 'react-use-form-state';
import { Link } from 'react-router-dom';
import { LinkButton } from '../common/LinkButton';

export function Header() {
  const user = useUser();
  const [formState, { text, password }] = useFormState<IUserInput>({});

  const { values } = formState;

  // 当前只进行 required 校验
  const isInvalid = Object.values(formState.values).some(
    v => (v as string).length <= 0
  );

  const inputs = !user && (
    <>
      <input placeholder="用户名" {...text('name')} required />
      <input placeholder="学号" {...text('no')} required />
      <input placeholder="密码" {...password('password')} required />
    </>
  );

  return (
    <div className={styles['app-header']}>
      <div>围棋AI对战训练</div>
      <LinkButton to={'/'}>111</LinkButton>
      <button onClick={enterGameListPage}>
        <Link to="/">观战</Link>
      </button>
      <button onClick={enterGameLobbyPage}>对战</button>
      <button
        onClick={() => {
          console.log('尚未实现');
        }}
      >
        战绩
      </button>
      <div style={{ width: 1, flexGrow: 1 }} />
      {inputs}
      {!user && (
        <button onClick={() => doLogin(values)} disabled={isInvalid}>
          登录
        </button>
      )}
      {!user && (
        <button onClick={() => doRegister(values)} disabled={isInvalid}>
          注册
        </button>
      )}
      {user && (
        <span>
          <span>学号:</span>
          <span>{user.no}&nbsp;</span>
          <span>姓名:</span>
          <span>{user.name}&nbsp;</span>
        </span>
      )}
      {!!user && <button onClick={() => doLogout()}>注销</button>}
    </div>
  );
}
