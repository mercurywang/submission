import { Patient, NewPatient, EntryWithoutId } from '../types';
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

const addPatientEntry = (
  entry: EntryWithoutId,
  patientId: string
): Patient | {} => {
  const newPatientEntry = {
    id,
    ...entry
  };

  const updatePatient = patients.find((patient) => patient.id === patientId);

  if (updatePatient) {
    updatePatient?.entries.push(newPatientEntry);

    return updatePatient;
  }
  return {};
};

export default { addPatient, addPatientEntry };
