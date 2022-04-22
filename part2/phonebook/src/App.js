import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Filter, PersonForm, Persons } from './component';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filterInput, setFilterInput] = useState('');
  const [personsToShow, setPersonsToShow] = useState(persons);

  useEffect(() => {
    axios.get('http://localhost:3001/persons').then((response) => {
      setPersons(response.data);
      setPersonsToShow(response.data);
    });
  }, []);

  const handleNameChange = (event) => setNewName(event.target.value);

  const handleNumberChange = (event) => setNewNumber(event.target.value);

  const handleFilterChange = (event) => {
    const val = event.target.value;
    setFilterInput(val);
    const filtered = persons.filter(
      ({ name }) => name.toLowerCase().indexOf(val.toLowerCase()) >= 0
    );
    setPersonsToShow(filtered.length > 0 ? filtered : persons);
  };

  const isDuplicated = () => {
    let exist = false;
    for (let i = 0; i < persons.length; i++) {
      if (newName === persons[i].name) {
        exist = true;
      }
    }
    return exist;
  };

  const handleAddName = (event) => {
    event.preventDefault();
    if (isDuplicated()) {
      alert(`${newName} is already added to phonebook`);
    } else {
      const newPerson = {
        name: newName,
        number: newNumber,
        id: persons.length + 1,
      };
      setPersons(persons.concat(newPerson));
    }
    setNewName('');
    setNewNumber('');
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={filterInput} onChange={handleFilterChange} />
      <h2>Add a new</h2>
      <PersonForm
        name={newName}
        number={newNumber}
        onNameChange={handleNameChange}
        onNumberChange={handleNumberChange}
        onClick={handleAddName}
      />
      <h2>Numbers</h2>
      <Persons persons={personsToShow} />
    </div>
  );
};

export default App;
