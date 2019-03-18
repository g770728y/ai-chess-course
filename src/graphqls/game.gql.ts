import gql from 'graphql-tag';

export const getGamesGql = gql`
  query games {
    games {
      id
      status
      activeColor
      winner
      players {
        userId
        color
        name
        actor
      }
    }
  }
`;

export const getGameGql = gql`
  query game($id: Int) {
    game(id: $id) {
      id
      status
      activeColor
      winner
      players {
        userId
        color
        name
        actor
      }
      steps {
        row
        col
        color
      }
    }
  }
`;

export const createGameGql = gql`
  mutation createGame(
    $playerId0: Int!
    $player0Actor: Actor!
    $playerId1: Int!
    $player1Actor: Actor!
    $deskId: Int
  ) {
    createGame(
      playerId0: $playerId0
      player0Actor: $player0Actor
      playerId1: $playerId1
      player1Actor: $player1Actor
      deskId: $deskId
    ) {
      id
      status
      activeColor
      winner
      players {
        userId
        color
        name
        actor
      }
    }
  }
`;

export const stepAddedGql = gql`
  subscription stepAdded($gameId: Int!, $color: Color) {
    stepAdded(gameId: $gameId, color: $color) {
      row
      col
      color
    }
  }
`;

export const createStepGql = gql`
  mutation createStep($gameId: Int!, $row: Int!, $col: Int!, $color: Color) {
    createStep(gameId: $gameId, row: $row, col: $col, color: $color)
  }
`;

export const lostGameGql = gql`
  mutation lostGame($gameId: Int!, $playerId: Int!) {
    lostGame(gameId: $gameId, playerId: $playerId)
  }
`;
