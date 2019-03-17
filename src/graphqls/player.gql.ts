import gql from 'graphql-tag';

export const playersGql = gql`
  query players {
    players {
      userId
      name
      no
    }
  }
`;
