import React from 'react';
import { Book } from './Book';
import { useQuery } from '@apollo/client';
import { ALL_BOOKS, ME } from '../queries';

export const Recommendation = ({ show, setError }) => {
  const meQuery = useQuery(ME, {
    skip: !show
  });

  const { data } = useQuery(ALL_BOOKS, {
    variables: { genre: meQuery?.data?.me?.favoriteGenre },
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

  return (
    <>
      <h2>Recommendations</h2>
      <h5>Books in your favorite genre {meQuery?.data?.me?.favoriteGenre}</h5>
      <Book books={data?.allBooks} />
    </>
  );
};
