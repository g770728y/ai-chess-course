import * as React from 'react';
import { useUser } from '../../store/hooks';
import { Grid } from '@material-ui/core';
import { Page404 } from '../common/404';

export const ScorePage: React.SFC<any> = () => {
  const user = useUser();

  if (!user) {
    return <Page404 />;
  } else {
    return <div>score</div>;
  }
};
