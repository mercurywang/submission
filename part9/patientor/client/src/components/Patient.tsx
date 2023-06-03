import { Typography } from '@mui/material';
import React from 'react';
import { Gender, Patient } from '../types';
import { Female, Male, Transgender } from '@mui/icons-material';

export interface PatientorProps {
  patient?: Patient;
}

export const Patientor: React.FC<PatientorProps> = ({
  patient: { name, ssn, occupation, gender, dateOfBirth } = {}
}) => {
  return (
    <>
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
    </>
  );
};
