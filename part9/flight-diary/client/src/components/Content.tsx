import React from 'react';
import { DiaryEntry } from '../types';
import { Diary } from './Diary';

export interface ContentProps {
  contents: DiaryEntry[];
}

export const Content: React.FC<ContentProps> = ({ contents }) => {
  return (
    <>
      {contents.map(({ id, ...rest }) => (
        <Diary key={id} {...rest} />
      ))}
    </>
  );
};
