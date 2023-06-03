import React from 'react';
import { HospitalEntry } from '../../types';
import { MedicalServices } from '@mui/icons-material';

export const Hospital: React.FC<Omit<HospitalEntry, 'type'>> = ({
  date,
  description,
  diagnosisCodes
}) => {
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
      <MedicalServices />
      <p>{description}</p>
      {diagnosisCodes?.map((d, _idx) => (
        <li key={_idx}>{d}</li>
      ))}
    </div>
  );
};
