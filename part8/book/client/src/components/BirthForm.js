import { useMutation } from '@apollo/client';
import { useState } from 'react';
import { UPDATE_BIRTH_YEAR, ALL_AUTHORS } from '../queries';

const BirthForm = (props) => {
  const [name, setName] = useState('');
  const [year, setYear] = useState('');

  const [updateBirthYear] = useMutation(UPDATE_BIRTH_YEAR, {
    refetchQueries: [{ query: ALL_AUTHORS }]
  });

  if (!props.show) {
    return null;
  }

  const submit = async (event) => {
    event.preventDefault();

    updateBirthYear({
      variables: { name, year: Number(year) }
    });

    setName('');
    setYear('');
  };

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          name
          <input
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
        </div>

        <div>
          Year
          <input
            type="number"
            value={year}
            onChange={({ target }) => setYear(target.value)}
          />
        </div>

        <button type="submit">update birth year</button>
      </form>
    </div>
  );
};

export default BirthForm;
