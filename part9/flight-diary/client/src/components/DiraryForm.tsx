import React from 'react';
import { useField } from '../hooks';
import { NewDiaryEntry, Visibility, Weather } from '../types';

export interface DiaryFormProps {
  onSubmit: (entires: NewDiaryEntry) => void;
}

export const DiaryForm: React.FC<DiaryFormProps> = ({ onSubmit }) => {
  const dateField = useField({})[0];
  const weatherField = useField({})[0];
  const visibilityField = useField({})[0];
  const commentField = useField({})[0];

  return (
    <>
      <div>
        date <input {...dateField} />
      </div>
      <div>
        weather <input {...weatherField} />
      </div>
      <div>
        visibility <input {...visibilityField} />
      </div>
      <div>
        comment <input {...commentField} />
      </div>
      <button
        onClick={() => {
          const entries: NewDiaryEntry = {
            date: dateField.value,
            weather: weatherField.value as Weather,
            visibility: visibilityField.value as Visibility,
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
