import { Patient, NewPatient } from '../types';
import patients from '../db/patients';

import { v1 as uuid } from 'uuid';
const id = uuid();

const addPatient = (entry: NewPatient): Patient => {
  const newPatient = {
    id,
    ...entry
  };

  patients.push(newPatient);
  return newPatient;
};

export default { addPatient };
