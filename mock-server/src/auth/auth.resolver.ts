import * as R from 'rambda';
import { users } from '../user/user.data';
import uuid from 'uuid/v4';

export default {
  Mutation: {
    register: (root, { no, password }) => {
      const id = users.map(R.prop('id')).reduce(R.max, 0) + 1;

      const user = { id: id, no, password };
      users.push(user);

      return { user, token: uuid() };
    },

    login: (root, { no, password }) => {
      const user = users.find(_user => _user.no === no);
      if (user) {
        return { user, token: uuid() };
      } else {
        throw new Error('学号或密码错误');
      }
    }
  }
};
