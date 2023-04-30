import { useState } from 'react';
import Authors from './components/Authors';
import Books from './components/Books';
import NewBook from './components/NewBook';
import { useApolloClient } from '@apollo/client';
import LoginForm from './components/LoginForm';
import { Recommendation } from './components/Recommendation';

const Notify = ({ errorMessage }) => {
  if (!errorMessage) {
    return null;
  }
  return <div style={{ color: 'red' }}>{errorMessage}</div>;
};

const TOKEN = localStorage.getItem('book-user-token');

const App = () => {
  const [token, setToken] = useState(TOKEN);
  const [page, setPage] = useState('authors');
  const [errorMessage, setErrorMessage] = useState(null);
  const client = useApolloClient();

  const logout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
    setPage('authors');
  };

  const notify = (message) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage(null);
    }, 5000);
  };

  return (
    <div>
      <Notify errorMessage={errorMessage} />
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token && (
          <>
            <button onClick={() => setPage('recommendation')}>
              Recommendation
            </button>
            <button onClick={() => setPage('add')}>add book</button>
          </>
        )}
        <button
          onClick={() => {
            if (token) {
              logout();
            }
            setPage('login');
          }}
        >
          {token ? 'logout' : 'login'}
        </button>
      </div>

      <Authors show={page === 'authors'} />
      <Books show={page === 'books'} setError={notify} />
      <NewBook show={page === 'add'} setError={notify} />
      <Recommendation show={page === 'recommendation'} setError={notify} />
      {!token && (
        <LoginForm
          show={page === 'login'}
          setToken={setToken}
          setError={notify}
          setRouter={() => setPage('authors')}
        />
      )}
    </div>
  );
};

export default App;
