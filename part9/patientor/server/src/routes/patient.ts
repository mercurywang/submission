import express from 'express';
import patients from '../db/patients';
import { NewPatient, PatientOmitSsn } from '../types';
import PatientService from '../services/patientService';

const router = express.Router();

router.get('/', (_req, res) => {
  const ssnExcluded: PatientOmitSsn[] = patients.map(
    ({ id, name, gender, dateOfBirth, occupation }: PatientOmitSsn) => ({
      id,
      name,
      gender,
      dateOfBirth,
      occupation
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
    ssn = ''
  } = req.body as NewPatient;

  const newPatient = PatientService.addPatient({
    name,
    occupation,
    gender,
    dateOfBirth,
    ssn
  });

  res.send(newPatient);
});

export default router;
