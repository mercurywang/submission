import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql`
  query {
    repositories {
      edges {
        node {
          id
          description
          ownerAvatarUrl
          fullName
          language
          stargazersCount
          forksCount
          reviewCount
          ratingAverage
        }
      }
    }
  }
`;

export const ME = gql`
  query {
    me {
      id
      username
    }
  }
`;

export const GET_REPOSITORY_BY_ID = gql`
  query ($id: ID!) {
    repository(id: $id) {
      id
      url
      description
      ownerAvatarUrl
      fullName
      language
      stargazersCount
      forksCount
      reviewCount
      ratingAverage
    }
  }
`;
