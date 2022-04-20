import React from 'react';

const Header = ({ course }) => <h1>{course}</h1>;

const Part = ({ name, exercises }) => (
  <p>
    {name} {exercises}
  </p>
);

const Content = ({ part1, part2, part3 }) => (
  <>
    <Part {...part1} />
    <Part {...part2} />
    <Part {...part3} />
  </>
);

const Total = ({ total }) => <p>Number of exercises {total}</p>;

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
      },
      {
        name: 'State of a component',
        exercises: 14,
      },
    ],
  };

  const getTotal = () => {
    let total = 0;
    course.parts.forEach(({ exercises }) => (total += exercises));
    return total;
  };

  return (
    <div>
      <Header course={course.name} />
      <Content
        part1={course.parts[0]}
        part2={course.parts[1]}
        part3={course.parts[2]}
      />
      <Total total={getTotal()} />
    </div>
  );
};

export default App;
