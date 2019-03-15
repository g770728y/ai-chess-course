import * as React from 'react';
import { AppBar, Toolbar, Typography, Tabs, Tab } from '@material-ui/core';
import useReactRouter from 'use-react-router';
import { Auth } from './Auth';

export function Header() {
  const { history, location } = useReactRouter();

  const handleTabClick = React.useCallback((e: any, value: string) => {
    history.push(value);
  }, []);

  const matched = /^(\/[^\/]+)\/?/.exec(location.pathname);
  const tabValue =
    !matched || location.pathname === '/' ? '/game-list' : matched[1];

  const result = (
    <AppBar position="static" color="inherit">
      <Toolbar variant="regular" style={{ minHeight: 48 }}>
        <Typography variant="h6" color="inherit" noWrap>
          围棋AI对战训练课
        </Typography>
        <div style={{ width: 32 }} />
        <Tabs
          onChange={handleTabClick}
          value={tabValue}
          indicatorColor="secondary"
          textColor="secondary"
        >
          <Tab label="观战" value="/game-list" />
          <Tab label="大厅" value="/lobby" />
          <Tab label="战绩" value="/history" />
          <Tab label="排行" value="/top" />
        </Tabs>

        <div style={{ width: 1, flexGrow: 1 }} />

        <Auth />
      </Toolbar>
    </AppBar>
  );

  return result;
}
