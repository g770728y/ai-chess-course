import { users } from './user.data';

export default {
  Mutation: {
    updateUser: (root, { id, name }) => {
      const idx = users.findIndex(_user => _user.id === id);
      if (idx < 0) {
        throw new Error('用户不存在');
      } else {
        users[idx].name = name;
        return true;
      }
    }
  },

  Query: {
    getUser: (root, { id }) => {
      return users.find(user => user.id === id);
    }
  }
};
