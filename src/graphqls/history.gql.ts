import gql from 'graphql-tag';

export const historiesGql = gql`
  query histories($playerId: Int!) {
    histories(playerId: $playerId) {
      playerId
      opponent {
        userId
        no
        name
      }
      result
      createdAt
    }
  }
`;
