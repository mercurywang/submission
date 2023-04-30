import React from 'react';

export const Book = ({ books }) => {
  return (
    <table>
      <tbody>
        <tr>
          <th>title</th>
          <th>author</th>
          <th>published</th>
        </tr>
        {books?.map((a) => (
          <tr key={a.title}>
            <td>{a.title}</td>
            <td>{a.author}</td>
            <td>{a.published}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
