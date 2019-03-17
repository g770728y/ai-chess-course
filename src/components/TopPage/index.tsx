import * as React from 'react';
import { useUser } from '../../store/hooks';
import { Page404 } from '../common/404';
import { Tops } from './Tops';
import * as e from '../../store/effects';

const TopPage: React.SFC<any> = () => {
  const user = useUser();

  React.useEffect(() => {
    e.getStats();
  }, []);

  if (!user) {
    return <Page404 />;
  } else {
    return <Tops />;
  }
};

export { TopPage };
