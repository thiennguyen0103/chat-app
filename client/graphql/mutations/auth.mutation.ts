import { gql } from "@apollo/client";

export const LOGIN_MUTATION = gql(`
  mutation Login($loginInput: LoginDto!) {
  login(loginInput: $loginInput) {
    user {
      id
      email
      fullName
      avatarUrl
      createdAt
      updatedAt
    }
    accessToken
    refreshToken
  }
}
`);

export const REFRESH_TOKEN = gql(`
  mutation RefreshToken() {
    refreshToken {
      accessToken
    }
  }
`);
