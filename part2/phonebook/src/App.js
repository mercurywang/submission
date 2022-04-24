import React, { useEffect, useState } from 'react';
import { Filter, PersonForm, Persons } from './component';
import personService from './services/persons';
import { ifContainsString, isDuplicated } from './util';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filterInput, setFilterInput] = useState('');
  const [personsToShow, setPersonsToShow] = useState(persons);

  const fetchInitialData = () => {
    personService.getAll().then((initialData) => {
      setPersons(initialData);
      setPersonsToShow(initialData);
    });
  };

  useEffect(fetchInitialData, []);

  const handleNameChange = (event) => setNewName(event.target.value);

  const handleNumberChange = (event) => setNewNumber(event.target.value);

  const handleFilterChange = (event) => {
    const val = event.target.value;
    setFilterInput(val);
    const filtered = persons.filter(({ name }) => ifContainsString(name, val));
    setPersonsToShow(filtered.length > 0 ? filtered : persons);
  };

  const handleAddName = (event) => {
    event.preventDefault();
    if (isDuplicated(persons, newName, 'name')) {
      const message = `${newName} is already added to phonebook, replace the old number with a new one?`;
      if (window.confirm(message)) {
        const personToUpdate = persons.find(
          (p) => p.name.toLowerCase() === newName.toLowerCase()
        );
        const changeInfo = { ...personToUpdate, number: newNumber };
        personService
          .update(personToUpdate.id, changeInfo)
          .then((updatedPerson) => {
            setPersons(
              persons.map((person) =>
                person.id !== personToUpdate.id ? person : updatedPerson
              )
            );
            setPersonsToShow(
              personsToShow.map((person) =>
                person.id !== personToUpdate.id ? person : updatedPerson
              )
            );
          });
      } else {
        const newPerson = {
          name: newName,
          number: newNumber
        };
        personService.create(newPerson).then((returnedData) => {
          setPersons(persons.concat(returnedData));
          setPersonsToShow(personsToShow.concat(returnedData));
        });
      }

      setNewName('');
      setNewNumber('');
    }
  };

  const handleDelete = (id, name) => {
    const message = `Delete ${name}?`;
    if (window.confirm(message)) {
      personService
        .deleteById(id)
        .then(() => {
          setPersons(persons.filter((person) => person.id !== id));
          setPersonsToShow(personsToShow.filter((person) => person.id !== id));
        })
        .catch(() => {
          alert(`the person '${name}' was already deleted from server`);
        });
    }
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
      <Persons persons={personsToShow} deleteById={handleDelete} />
    </div>
  );
};

export default App;
