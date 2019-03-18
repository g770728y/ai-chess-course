import gql from 'graphql-tag';

export const getDesksGql = gql`
  query desks {
    desks {
      id
      players {
        userId
        name
        actor
      }
      gameId
    }
  }
`;
