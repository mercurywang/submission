import React from 'react';
import {
  Entry,
  HealthCheckEntry,
  HospitalEntry,
  OccupationalHealthcareEntry
} from '../../types';
import { HealthCheck } from './HealthCheck';
import { Hospital } from './Hospital';
import { OccupationalHealthcare } from './OccupationalHealthcare';
import { assertNever } from '../../utils';

export const EntryDetails: React.FC<Entry> = ({ type, ...rest }) => {
  switch (type) {
    case 'HealthCheck':
      return <HealthCheck {...(rest as HealthCheckEntry)} />;
    case 'Hospital':
      return <Hospital {...(rest as HospitalEntry)} />;
    case 'OccupationalHealthcare':
      return (
        <OccupationalHealthcare {...(rest as OccupationalHealthcareEntry)} />
      );
    default:
      return assertNever(type);
  }
};
