import * as React from 'react';
import { useUser } from '../../../store/hooks';
import { useFormState } from 'react-use-form-state';
import {
  IUserInput,
  doLogin,
  doRegister,
  doLogout
} from '../../../store/effects';
import { Typography, Button, Grid, TextField } from '@material-ui/core';

const Auth: React.SFC<any> = () => {
  const user = useUser();
  const [formState, { text, password }] = useFormState<IUserInput>({});

  // 当前只进行 required 校验
  const isInvalid = Object.values(formState.values).some(
    v => (v as string).length <= 0
  );

  const { values } = formState;

  const inputs = !user && (
    <Grid container item spacing={8}>
      <Grid item>
        <TextField
          style={{ width: 100 }}
          placeholder="用户名"
          {...text('name')}
          required
        />
      </Grid>
      <Grid item>
        <TextField
          style={{ width: 100 }}
          placeholder="学号"
          {...text('no')}
          required
        />
      </Grid>
      <Grid item>
        <TextField
          style={{ width: 100 }}
          placeholder="密码"
          {...password('password')}
          required
        />
      </Grid>
    </Grid>
  );

  const userInfo = user && (
    <Grid item>
      <span>学号:</span>
      <span>{user!.no}&nbsp;</span>
      <span>姓名:</span>
      <span>{user!.name}&nbsp;</span>
    </Grid>
  );

  const loginButton = !user && (
    <Grid item>
      <Button
        variant="contained"
        onClick={() => doLogin(values)}
        disabled={isInvalid}
        size="small"
      >
        登录
      </Button>
    </Grid>
  );

  const registerButton = !user && (
    <Grid item>
      <Button
        size="small"
        variant="contained"
        onClick={() => doRegister(values)}
        disabled={isInvalid}
      >
        注册
      </Button>
    </Grid>
  );

  const logoutButton = !!user && (
    <Grid item>
      <Button variant="contained" size="small" onClick={() => doLogout()}>
        注销
      </Button>
    </Grid>
  );

  return (
    <Typography component="div">
      <Grid
        wrap="nowrap"
        container={true}
        item={true}
        justify="space-between"
        alignItems="center"
        spacing={8}
      >
        {inputs}
        {loginButton}
        {registerButton}
        {userInfo}
        {logoutButton}
      </Grid>
    </Typography>
  );
};

export { Auth };
