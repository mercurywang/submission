import React from 'react';
import { Entry } from '../../types';
import { EntryDetails } from './EntryDetails';

export interface EntryListProps {
  entries: Entry[];
}

export const EntryList: React.FC<EntryListProps> = ({ entries = [] }) => {
  return (
    <>
      <h3>Entries</h3>
      {entries?.map((entry, idx) => (
        <EntryDetails key={idx} {...entry} />
      ))}
    </>
  );
};
