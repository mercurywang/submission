import React from 'react';
import { NewDiaryEntry } from '../types';

export const Diary: React.FC<NewDiaryEntry> = ({
  date,
  weather,
  visibility,
  comment
}) => {
  return (
    <div>
      <h4> date: {date}</h4>
      <p> weather: {weather}</p>
      <p> visibility: {visibility}</p>
      <p> comment: {comment}</p>
    </div>
  );
};
