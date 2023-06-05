import React from 'react';
import type { HealthCheckEntry } from '../../types';
import { Favorite, HealthAndSafety } from '@mui/icons-material';
import { IconProps } from '@mui/material';

export const HealthCheck: React.FC<Omit<HealthCheckEntry, 'type'>> = ({
  date,
  description,
  diagnosisCodes,
  healthCheckRating
}) => {
  const colors = ['success', 'primary', 'secondary', 'warning'];
  return (
    <div
      style={{
        border: '1px solid black',
        borderRadius: '3px',
        margin: '16px 0',
        padding: '16px'
      }}
    >
      {date} <HealthAndSafety />
      <p>{description}</p>
      <Favorite color={colors[healthCheckRating] as IconProps['color']} />
      {diagnosisCodes?.map((d, _idx) => (
        <li key={_idx}>{d}</li>
      ))}
    </div>
  );
};
