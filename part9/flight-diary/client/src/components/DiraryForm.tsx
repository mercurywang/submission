import React, { useState } from 'react';
import { useField } from '../hooks';
import { NewDiaryEntry, Visibility, Weather } from '../types';

export interface DiaryFormProps {
  onSubmit: (entires: NewDiaryEntry) => void;
}

export const DiaryForm: React.FC<DiaryFormProps> = ({ onSubmit }) => {
  const dateField = useField({ type: 'date' })[0];
  const commentField = useField()[0];

  const visibilities: Visibility[] = [
    Visibility.Great,
    Visibility.Good,
    Visibility.Ok,
    Visibility.Poor
  ];
  const weathers: Weather[] = [
    Weather.Cloudy,
    Weather.Sunny,
    Weather.Rainy,
    Weather.Stormy,
    Weather.Windy
  ];

  const [weather, setWeather] = useState<Weather>(Weather.Cloudy);
  const [visibility, setVisibility] = useState<Visibility>(Visibility.Good);

  return (
    <>
      <h1>New Diary</h1>
      <div>
        date <input name="date" {...dateField} />
      </div>
      <div>
        weather
        {weathers.map((w, idx) => (
          <span key={idx}>
            <input
              type="radio"
              id={w}
              name={w}
              value={w}
              checked={weather === w}
              onChange={() => setWeather(w)}
            />
            <label htmlFor={w}>{w}</label>
          </span>
        ))}
      </div>
      <div>
        visibility
        {visibilities.map((v, idx) => (
          <span key={idx}>
            <input
              type="radio"
              id={v}
              name={v}
              value={v}
              checked={visibility === v}
              onChange={() => setVisibility(v)}
            />
            <label htmlFor={v}>{v}</label>
          </span>
        ))}
      </div>
      <div>
        comment <input {...commentField} />
      </div>
      <button
        onClick={() => {
          const entries: NewDiaryEntry = {
            date: dateField.value,
            weather,
            visibility,
            comment: commentField.value
          };
          onSubmit(entries);
        }}
      >
        add
      </button>
    </>
  );
};
