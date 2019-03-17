import * as R from 'rambda';

interface User {
  id: number;
  no: string;
  password: string;
  name?: string;
}

export const users: User[] = R.range(1, 31).map(i => ({
  id: i,
  no: i + '',
  password: i + ''
}));
