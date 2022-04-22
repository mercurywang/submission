import React from 'react';

export const Filter = ({ value, onChange }) => (
  <div>
    filter shown with
    <input value={value} onChange={onChange} />
  </div>
);

export const PersonForm = ({
  name,
  number,
  onNameChange,
  onNumberChange,
  onClick,
}) => (
  <form>
    <div>
      name: <input value={name} onChange={onNameChange} />
    </div>
    <div>
      number: <input value={number} onChange={onNumberChange} />
    </div>
    <div>
      <button type="submit" onClick={onClick}>
        add
      </button>
    </div>
  </form>
);

export const Persons = ({ persons }) => (
  <>
    {persons.map(({ name, number }, idx) => (
      <div key={idx}>
        {name} {number}
      </div>
    ))}
  </>
);
