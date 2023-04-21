import ReactDOM from 'react-dom/client';
import App from './App';

import { ALL_AUTHORS } from './queries';

import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://localhost:4000',
  cache: new InMemoryCache()
});

client.query({ query: ALL_AUTHORS }).then((response) => {
  console.log(response.data);
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);
