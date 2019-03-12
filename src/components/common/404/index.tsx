import * as React from 'react';
import { Grid } from '@material-ui/core';

const Page404: React.SFC<any> = () => {
  return (
    <Grid
      direction="column"
      container
      justify="center"
      alignItems="center"
      style={{ paddingTop: 100 }}
    >
      <Grid item>
        <img src="/oops.jpg" />
      </Grid>
      <Grid item style={{ textAlign: 'center' }}>
        <h1>你还没有登录呢...</h1>
        <h4 style={{ color: '#666' }}>请先在右上方注册(或登录)</h4>
      </Grid>
    </Grid>
  );
};

export { Page404 };
