import express from 'express';
import patients from '../db/patients';
import { NewPatient, PatientOmitSsn } from '../types';
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

export default router;
