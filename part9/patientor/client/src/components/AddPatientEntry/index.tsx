import React, { SyntheticEvent, useEffect, useState } from 'react';
import {
  Diagnosis,
  BaseEntryWithoutId,
  EntryWithoutId,
  HealthCheckEntryWithoutId,
  HospitalEntryWithoutId,
  OccupationalHealthcareEntryWithoutId
} from '../../types';
import {
  Button,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField
} from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useDate, useField } from '../../hooks';
import diagnosisService from '../../services/diagnosis';
import dayjs from 'dayjs';

interface EntryTypeOption {
  value: string;
  label: string;
}

interface HealthCheckRatingOption {
  value: number;
  label: string;
}

const entryTypeOptions: EntryTypeOption[] = [
  { label: 'Health Check', value: '1' },
  { label: 'Hospital', value: '2' },
  { label: 'Occupational Healthcare', value: '3' }
];

const ratingOptions: HealthCheckRatingOption[] = [
  { label: 'Healthy', value: 0 },
  { label: 'Low Risk', value: 1 },
  { label: 'High Risk', value: 2 },
  { label: 'Critical Risk', value: 3 }
];

interface DiagnosisOption {
  value: string;
  label: string;
}

export interface AddPatientEntryProps {
  onSubmit?: (entries: EntryWithoutId) => void;
  onCancel?: () => void;
}

export const AddPatientEntry: React.FC<AddPatientEntryProps> = ({
  onSubmit,
  onCancel
}) => {
  const dateField = useDate({})[0];
  const descriptionField = useField({})[0];
  const specialistField = useField({})[0];
  const dischargeDate = useDate({})[0];
  const criteriaField = useField({})[0];
  const employerNameField = useField({})[0];

  const [diagnosisOptions, setDiagnosisOptions] = useState<DiagnosisOption[]>(
    []
  );

  const [diagnosis, setDiagnosis] = useState<string[]>([]);

  const [entryType, setEntryType] = useState<string>('1');
  const [rating, setRating] = useState<number>(0);

  useEffect(() => {
    const fetchDiagnosisList = async () => {
      const allDiagnosis = await diagnosisService.getAll();
      setDiagnosisOptions(
        allDiagnosis.map((d) => ({ label: d.name, value: d.code }))
      );
    };
    void fetchDiagnosisList();
  }, []);

  const addEntry = (event: SyntheticEvent) => {
    event.preventDefault();

    const newEntry: BaseEntryWithoutId = {
      description: descriptionField.value || '',
      date: dayjs(dateField.value).format('YYYY/MM/DD') || '2023/06/05',
      specialist: specialistField.value || '',
      diagnosisCodes: (diagnosis as Array<Diagnosis['code']>) || []
    };

    switch (entryType) {
      case '1':
        const healthCheck: HealthCheckEntryWithoutId = {
          ...newEntry,
          type: 'HealthCheck',
          healthCheckRating: rating
        };
        onSubmit?.(healthCheck);
        return;
      case '2':
        const hospital: HospitalEntryWithoutId = {
          ...newEntry,
          type: 'Hospital',
          discharge: {
            date:
              dayjs(dischargeDate.value).format('YYYY/MM/DD') || '2023/06/05',
            criteria: criteriaField.value
          }
        };
        onSubmit?.(hospital);
        return;
      case '3':
        const occupationalHealthcare: OccupationalHealthcareEntryWithoutId = {
          ...newEntry,
          type: 'OccupationalHealthcare',
          employerName: employerNameField.value
        };
        onSubmit?.(occupationalHealthcare);
        return;
      default:
        return;
    }
  };

  const onEntryTypeChange = (event: SelectChangeEvent<string>) => {
    event.preventDefault();
    if (typeof event.target.value === 'string') {
      const value = event.target.value;
      setEntryType(value);
    }
  };

  const onDiagnosisChange = (event: SelectChangeEvent<typeof diagnosis>) => {
    event.preventDefault();
    const value = event.target.value;
    setDiagnosis(typeof value === 'string' ? value.split(',') : value);
  };

  const onRatingChange = (event: SelectChangeEvent<number>) => {
    event.preventDefault();
    const value = event.target.value;
    setRating(Number(value));
  };

  return (
    <>
      <form onSubmit={addEntry} style={{ marginTop: '20px' }}>
        <InputLabel style={{ marginTop: 16 }}>Date</InputLabel>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker label="Date" {...dateField} />
        </LocalizationProvider>

        <InputLabel style={{ marginTop: 16 }}>Entry Type</InputLabel>
        <Select
          label="EntryType"
          value={entryType}
          style={{ marginTop: '16px' }}
          fullWidth
          onChange={onEntryTypeChange}
        >
          {entryTypeOptions.map((en) => (
            <MenuItem key={en.value} value={en.value}>
              {en.label}
            </MenuItem>
          ))}
        </Select>
        <TextField
          label="Description"
          style={{ marginTop: '16px' }}
          fullWidth
          {...descriptionField}
        />
        <TextField
          label="Specialist"
          style={{ marginTop: '16px' }}
          fullWidth
          {...specialistField}
        />
        <InputLabel style={{ marginTop: 16 }}>Diagnosis</InputLabel>
        <Select
          label="Diagnosis"
          value={diagnosis}
          style={{ marginTop: '16px' }}
          multiple
          fullWidth
          onChange={onDiagnosisChange}
        >
          {diagnosisOptions.map((d) => (
            <MenuItem key={d.value} value={d.value}>
              {d.label}
            </MenuItem>
          ))}
        </Select>
        {entryType === '3' && (
          <>
            <TextField
              label="Employer Name"
              style={{ marginTop: '16px' }}
              fullWidth
              {...employerNameField}
            />
          </>
        )}

        {entryType === '2' && (
          <>
            <InputLabel style={{ marginTop: 16 }}>Discharge Date</InputLabel>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker label="Discharge Date" {...dischargeDate} />
            </LocalizationProvider>
            <TextField
              label="Criteria"
              style={{ marginTop: '16px' }}
              fullWidth
              {...criteriaField}
            />
          </>
        )}

        {entryType === '1' && (
          <>
            <InputLabel style={{ marginTop: 16 }}>
              Health Check Rating
            </InputLabel>
            <Select
              label="Health Check Rating"
              value={rating}
              style={{ marginTop: '16px' }}
              fullWidth
              onChange={onRatingChange}
            >
              {ratingOptions.map((o) => (
                <MenuItem key={o.value} value={o.value}>
                  {o.label}
                </MenuItem>
              ))}
            </Select>
          </>
        )}

        <Button
          color="secondary"
          variant="contained"
          type="button"
          onClick={onCancel}
        >
          Cancel
        </Button>
        <Button type="submit" variant="contained">
          Add
        </Button>
      </form>
    </>
  );
};
