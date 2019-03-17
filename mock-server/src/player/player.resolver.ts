import { users } from '../user/user.data';
import * as R from 'rambda';
import { renameKey } from '../utils/object';
import { players } from './player.data';

export default {
  Query: {
    players: () => players
  }
};
