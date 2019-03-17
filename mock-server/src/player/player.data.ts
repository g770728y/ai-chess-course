import { renameKey } from '../utils/object';
import * as R from 'rambda';
import { users } from '../user/user.data';

export const user2Player = R.compose(
  renameKey('id', 'userId'),
  R.pick(['id', 'name', 'no'])
);

export const players = R.map(user2Player, users);
