import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { BASE_URL } from './url';

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
