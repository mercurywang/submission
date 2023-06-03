import React from 'react';
import { CoursePart } from '../interface';

export const Part: React.FC<CoursePart> = (course) => {
  switch (course.kind) {
    case 'basic':
      return (
        <>
          <h4>
            {course.name}
            {course.exerciseCount}
          </h4>
          <p>{course.description}</p>
        </>
      );
    case 'group':
      return (
        <>
          <h4>
            {course.name}
            {course.exerciseCount}
          </h4>
          <p>Project exercises {course.groupProjectCount}</p>
        </>
      );
    case 'background':
      return (
        <>
          <h4>
            {course.name}
            {course.exerciseCount}
          </h4>
          <p>{course.description}</p>
          <p>Submit to {course.backgroundMaterial}</p>
        </>
      );
    case 'special':
      return (
        <>
          <h4>
            {course.name}
            {course.exerciseCount}
          </h4>
          <p>{course.description}</p>
          <p>
            Required Skills:
            {course.requirements.map((r) => (
              <>{r},</>
            ))}
          </p>
        </>
      );

    default:
      return <></>;
  }
};
