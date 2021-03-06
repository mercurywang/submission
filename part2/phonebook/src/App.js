import React, { useEffect, useState } from 'react';
import { Filter, Notification, PersonForm, Persons } from './component';
import personService from './services/persons';
import { ifContainsString, isDuplicated } from './util';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filterInput, setFilterInput] = useState('');
  const [personsToShow, setPersonsToShow] = useState(persons);
  const [errorMessage, setErrorMessage] = useState(null);

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
    setPersonsToShow(filtered);
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
            const all = persons.map((person) =>
              person.id !== personToUpdate.id ? person : updatedPerson
            );
            setPersons(all);

            const toShow = personsToShow.map((person) =>
              person.id !== personToUpdate.id ? person : updatedPerson
            );
            setPersonsToShow(toShow);
          });
      }
    } else {
      const newPerson = {
        name: newName,
        number: newNumber
      };
      personService.create(newPerson).then((returnedData) => {
        setErrorMessage({
          message: `Added ${newName}`,
          className: 'notification'
        });
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
        setPersons(persons.concat(returnedData));
        setPersonsToShow(personsToShow.concat(returnedData));
      });
    }

    setNewName('');
    setNewNumber('');
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
          setErrorMessage({
            message: `the person ${name} was already deleted from server`,
            className: 'error'
          });
          setTimeout(() => {
            setErrorMessage(null);
          }, 5000);
          fetchInitialData();
        });
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification {...errorMessage} />
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
