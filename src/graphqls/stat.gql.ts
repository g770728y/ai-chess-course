import gql from 'graphql-tag';

export const getStatsGql = gql`
  query stats {
    stats {
      player {
        userId
        no
        name
      }
      win
      lost
      draw
    }
  }
`;
