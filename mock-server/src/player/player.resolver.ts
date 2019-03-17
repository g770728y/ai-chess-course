import { users } from '../user/user.data';
import * as R from 'rambda';
import { renameKey } from '../utils/object';

export const user2Player = R.compose(
  renameKey('id', 'userId'),
  R.pick(['id', 'name', 'no'])
);

export default {
  Query: {
    players: () => R.map(user2Player, users)
  }
};
