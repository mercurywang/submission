import React from 'react';
import { CoursePart } from '../interface';
import { Part } from './Part';

export interface ContentProps {
  contents: CoursePart[];
}

const Content: React.FC<ContentProps> = ({ contents }) => {
  return (
    <>
      {contents.map((course, idx) => (
        <p key={idx}>
          <Part {...course} />
        </p>
      ))}
    </>
  );
};

export default Content;
