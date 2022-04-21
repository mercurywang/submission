import React from 'react';

const Header = ({ name }) => <h1>{name}</h1>;

const Part = ({ name, exercises }) => (
  <p>
    {name} {exercises}
  </p>
);

const Content = ({ parts }) =>
  parts.map(({ id, ...rest }) => <Part key={id} {...rest} />);

const Total = ({ total }) => <h4>total of {total} exercises</h4>;

const Course = ({ course: { name, parts } }) => {
  const getTotal = parts.reduce((prev, cur) => cur.exercises + prev, 0);

  return (
    <div>
      <Header name={name} />
      <Content parts={parts} />
      <Total total={getTotal} />
    </div>
  );
};

export default Course;
