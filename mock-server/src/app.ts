import { ApolloServer, MockList } from 'apollo-server';
import typeDefs from './typeDefs';
import resolvers from './resolvers';
import faker from 'faker';
import { users } from './user/user.data';

faker.locale = 'zh_CN';

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: params => {
    if (!params.req) return {};
    const token = (params.req.headers.authorization || '').substring(7);
    return { user: token && token.length > 0 ? users[0] : undefined };
  }
});

server.listen({ port: 3999 }).then(({ url }) => {
  console.log(`👉🏻 Server ready at ${url}`);
});
