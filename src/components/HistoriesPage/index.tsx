import * as React from 'react';
import { useUser } from '../../store/hooks';
import { Page404 } from '../common/404';
import { Histories } from './Histories';
import * as e from '../../store/effects';

export const HistoriesPage: React.SFC<any> = () => {
  const user = useUser();
  const userId = user ? user.id : undefined;

  React.useEffect(() => {
    userId && e.getHistories(userId);
  }, [userId]);

  return user ? <Histories /> : <Page404 />;
};
