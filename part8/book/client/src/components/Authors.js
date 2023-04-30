import { useQuery } from '@apollo/client';
import { ALL_AUTHORS } from '../queries';
import BornForm from './BornForm';

const Authors = (props) => {
  const authorsQuery = useQuery(ALL_AUTHORS, { skip: !props.show });

  if (!props.show) {
    return null;
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th>Name</th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authorsQuery?.data?.allAuthors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>Set birth year</h2>
      <BornForm authors={authorsQuery?.data?.allAuthors} />
    </div>
  );
};

export default Authors;
