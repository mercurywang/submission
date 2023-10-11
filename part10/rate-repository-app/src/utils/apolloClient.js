import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import Constants from 'expo-constants';

const BASE_URL = Constants.expoConfig.extra.uri;

const httpLink = createHttpLink({
  uri: `${BASE_URL}:4000/graphql`
});

const createApolloClient = () => {
  return new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache()
  });
};

export default createApolloClient;
