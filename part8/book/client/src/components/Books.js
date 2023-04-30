import { useQuery } from '@apollo/client';
import { ALL_BOOKS } from '../queries';
import { useState } from 'react';
import { Book } from './Book';

const Books = ({ setError, show }) => {
  const [genre, setGenre] = useState('all genres');

  const { data } = useQuery(ALL_BOOKS, {
    variables: { genre: genre === 'all genres' ? '' : genre },
    skip: !show,
    onError: (error) => {
      const errors = error.graphQLErrors[0].extensions.error.errors;
      const messages = Object.values(errors)
        .map((e) => e.message)
        .join('\n');
      setError(messages);
    }
  });

  if (!show) {
    return null;
  }

  const genres = [
    'refactoring',
    'design',
    'agile',
    'patterns',
    'crime',
    'classic',
    'all genres'
  ];

  const handleGenreChange = (_genre) => {
    setGenre(_genre);
  };

  return (
    <div>
      <h2>books</h2>
      <h5>in genre {genre}</h5>
      <Book books={data?.allBooks} />
      <>
        {genres.map((_genre, idx) => (
          <button key={idx} onClick={() => handleGenreChange(_genre)}>
            {_genre}
          </button>
        ))}
      </>
    </div>
  );
};

export default Books;
