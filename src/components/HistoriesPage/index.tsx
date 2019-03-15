import * as React from 'react';
import { useUser } from '../../store/hooks';
import { Page404 } from '../common/404';
import { Histories } from './Histories';
import styles from './style.module.scss';

export const HistoriesPage: React.SFC<any> = () => {
  const user = useUser();

  return user ? <Histories /> : <Page404 />;
};
