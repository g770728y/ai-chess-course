import gql from 'graphql-tag';

export const loginGql = gql`
  mutation login($no: String!, $password: String!) {
    login(no: $no, password: $password) {
      user {
        id
        no
        name
      }
      token
    }
  }
`;

export const registerGql = gql`
  mutation register($no: String!, $password: String!) {
    register(no: $no, password: $password) {
      user {
        id
        no
        name
      }
      token
    }
  }
`;
