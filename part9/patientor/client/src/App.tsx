import { useState, useEffect } from 'react';
import axios from 'axios';
import { Route, Link, Routes, useMatch, useLocation } from 'react-router-dom';
import { Button, Divider, Container, Typography } from '@mui/material';

import { apiBaseUrl } from './constants';
import { Patient } from './types';

import patientService from './services/patients';
import PatientListPage from './components/PatientListPage';
import { Patientor } from './components/PatientorPage';

const App = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [patient, setPatient] = useState<Patient>();
  const [refetch, setRefetch] = useState<boolean>(false);

  const match = useMatch('/patients/:id');

  const location = useLocation();

  useEffect(() => {
    void axios.get<void>(`${apiBaseUrl}/ping`);

    const fetchPatientList = async () => {
      const patients = await patientService.getAll();
      setPatients(patients);
    };
    void fetchPatientList();
  }, []);

  useEffect(() => {
    setRefetch(false);
    const fetchPatient = async () => {
      const patient = await patientService.getById(match?.params?.id as string);
      setPatient(patient);
    };
    fetchPatient();
  }, [location, match?.params?.id, refetch]);

  return (
    <div className="App">
      <Container>
        <Typography variant="h3" style={{ marginBottom: '0.5em' }}>
          Patientor
        </Typography>
        <Button component={Link} to="/" variant="contained" color="primary">
          Home
        </Button>
        <Divider hidden />
        <Routes>
          <Route
            path="/"
            element={
              <PatientListPage patients={patients} setPatients={setPatients} />
            }
          />
          <Route
            path="/patients/:id"
            element={
              <Patientor patient={patient} refetch={() => setRefetch(true)} />
            }
          />
        </Routes>
      </Container>
    </div>
  );
};

export default App;
