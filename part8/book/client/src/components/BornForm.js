import { useMutation } from '@apollo/client';
import { useState } from 'react';
import { UPDATE_BORN, ALL_AUTHORS } from '../queries';

const BornForm = ({ authors }) => {
  const [name, setName] = useState('');
  const [born, setBorn] = useState('');

  const [editAuthor] = useMutation(UPDATE_BORN, {
    refetchQueries: [{ query: ALL_AUTHORS }]
  });

  const submit = async (event) => {
    event.preventDefault();

    editAuthor({
      variables: { name, born: Number(born) }
    });

    setName('');
    setBorn('');
  };

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          name
          <select
            onChange={(e) => {
              setName(e.target.value);
            }}
          >
            {authors?.map((author) => (
              <option key={author.name} value={author.name}>
                {author.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          Born
          <input
            type="number"
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>

        <button type="submit">update birth born</button>
      </form>
    </div>
  );
};

export default BornForm;
