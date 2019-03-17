import gql from 'graphql-tag';

export const updateUserGql = gql`
  mutation updateUser($id: Int!, $name: String!) {
    updateUser(id: $id, name: $name)
  }
`;

export const getUserGql = gql`
  query getUser($id: Int!) {
    getUser(id: $id) {
      id
      no
      name
    }
  }
`;
