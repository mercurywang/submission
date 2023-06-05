import express from 'express';
import patients from '../db/patients';
import {
  Diagnosis,
  EntryWithoutId,
  NewPatient,
  PatientOmitSsn
} from '../types';
import PatientService from '../services/patientService';

const router = express.Router();

router.get('/', (_req, res) => {
  const ssnExcluded: PatientOmitSsn[] = patients.map(
    ({
      id,
      name,
      gender,
      dateOfBirth,
      occupation,
      entries
    }: PatientOmitSsn) => ({
      id,
      name,
      gender,
      dateOfBirth,
      occupation,
      entries
    })
  );

  res.send(ssnExcluded);
});

router.post('/', (req, res) => {
  const {
    name,
    occupation,
    gender,
    dateOfBirth = '',
    ssn = '',
    entries
  } = req.body as NewPatient;

  const newPatient = PatientService.addPatient({
    name,
    occupation,
    gender,
    dateOfBirth,
    ssn,
    entries
  });

  res.send(newPatient);
});

router.get('/:id', (req, res) => {
  const id = req.params.id;
  const patient: PatientOmitSsn | undefined = patients.find((p) => p.id === id);

  res.send(patient);
});

const parseDiagnosisCodes = (object: unknown): Array<Diagnosis['code']> => {
  if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
    // we will just trust the data to be in correct form
    return [] as Array<Diagnosis['code']>;
  }

  return object.diagnosisCodes as Array<Diagnosis['code']>;
};

router.put('/:id/entries', (req, res) => {
  const id = req.params.id;

  const { description, date, specialist, diagnosisCodes, ...rest } =
    req.body as EntryWithoutId;

  const updatedPatient = PatientService.addPatientEntry(
    {
      description,
      date,
      specialist,
      diagnosisCodes: parseDiagnosisCodes(diagnosisCodes),
      ...rest
    },
    id
  );

  res.send(updatedPatient);
});

export default router;
