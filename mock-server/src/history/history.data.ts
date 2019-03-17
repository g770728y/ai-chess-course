import faker from 'faker';
import dayjs from 'dayjs';
import { users, IUser } from '../user/user.data';
import * as R from 'rambda';

export interface IHistory {
  playerId: number;
  opponentId: number;
  result: IGameResult;
  createdAt: string;
}

export type IGameResult = 'win' | 'lost' | 'draw';

const randomHistory = (userIds: number[]): IHistory => {
  const playerId = faker.random.arrayElement(userIds);
  const opponentId = faker.random.arrayElement(userIds);
  const result = faker.random.arrayElement([
    'win',
    'lost',
    'draw'
  ]) as IGameResult;
  const createdAt = faker.date.between(
    '2019-03-01 01:01:01',
    '2019-03-05 01:01:01'
  );
  return {
    playerId,
    opponentId,
    result,
    createdAt: dayjs(createdAt).format('YYYY-MM-DD HH:mm:ss')
  };
};

const userIds = users.map(u => u.id);
export const histories = R.range(1, 1000).map(_ => randomHistory(userIds));
