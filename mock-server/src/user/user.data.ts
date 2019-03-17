import * as R from 'rambda';
import faker from 'faker';

faker.locale = 'zh_CN';

export interface IUser {
  id: number;
  no: string;
  password: string;
  name?: string;
}

export const users: IUser[] = R.range(1, 31).map(i => ({
  id: i,
  no: i + '',
  password: i + '',
  name: faker.name.findName()
}));
