import { Alert, Button, Typography } from '@mui/material';
import React, { useState } from 'react';
import { EntryWithoutId, Gender, Patient } from '../../types';
import { Female, Male, Transgender } from '@mui/icons-material';
import { EntryList } from '../EntryList';
import { AddPatientEntry } from '../AddPatientEntry';
import patientService from '../../services/patients';
import axios from 'axios';

export interface PatientorProps {
  patient?: Patient;
  refetch?: () => void;
}

export const Patientor: React.FC<PatientorProps> = ({
  patient: {
    name,
    ssn,
    occupation,
    gender,
    dateOfBirth,
    entries = [],
    id = ''
  } = {},
  refetch
}) => {
  const [error, setError] = useState<string>();
  const [show, setShow] = useState<boolean>(false);

  const handleAddEntry = async (entries: EntryWithoutId) => {
    try {
      await patientService.createEntry(id, entries);
      refetch?.();
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        if (e?.response?.data && typeof e?.response?.data === 'string') {
          const message = e.response.data.replace(
            'Something went wrong. Error: ',
            ''
          );
          console.error(message);
          setError(message);
        } else {
          setError('Unrecognized axios error');
        }
      } else {
        console.error('Unknown error', e);
        setError('Unknown error');
      }
    }
  };
  return (
    <>
      {error && <Alert severity="error">{error}</Alert>}
      <Typography variant="h4" style={{ marginBottom: '0.5em' }}>
        {name}
        {gender === Gender.Female && <Female />}
        {gender === Gender.Male && <Male />}
        {gender === Gender.Other && <Transgender />}
      </Typography>
      <Typography style={{ marginBottom: '0.5em' }}>
        dateOfBirth:{dateOfBirth}
      </Typography>
      <Typography style={{ marginBottom: '0.5em' }}>ssn:{ssn}</Typography>
      <Typography style={{ marginBottom: '0.5em' }}>
        occupation:{occupation}
      </Typography>

      {show ? (
        <AddPatientEntry
          onSubmit={handleAddEntry}
          onCancel={() => setShow(false)}
        />
      ) : (
        <Button onClick={() => setShow(true)}>Add Entry</Button>
      )}
      <EntryList entries={entries} />
    </>
  );
};
