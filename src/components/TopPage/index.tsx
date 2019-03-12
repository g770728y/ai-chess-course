import * as React from 'react';
import { useUser } from '../../store/hooks';
import { Page404 } from '../common/404';

const TopPage: React.SFC<any> = () => {
  const user = useUser();

  if (!user) {
    return <Page404 />;
  } else {
    return <div>尚未实现</div>;
  }
};

export { TopPage };
