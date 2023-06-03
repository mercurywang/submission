import React from 'react';
import { OccupationalHealthcareEntry } from '../../types';
import { Work } from '@mui/icons-material';

export const OccupationalHealthcare: React.FC<
  Omit<OccupationalHealthcareEntry, 'type'>
> = ({ date, description, diagnosisCodes }) => {
  return (
    <div
      style={{
        border: '1px solid black',
        borderRadius: '3px',
        margin: '16px 0',
        padding: '16px'
      }}
    >
      {date}
      <Work />
      <p>{description}</p>
      {diagnosisCodes?.map((d, _idx) => (
        <li key={_idx}>{d}</li>
      ))}
    </div>
  );
};
