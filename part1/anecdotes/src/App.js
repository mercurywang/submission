import React, { useState } from 'react';

const Title = ({ title }) => <h1>{title}</h1>;

const Button = ({ label, onClick }) => (
  <button onClick={onClick}>{label}</button>
);

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients',
  ];

  const initial_points = Array(7).fill(0);

  const [selected, setSelected] = useState(0);
  const [points, setPoints] = useState(initial_points);

  const handleSelected = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length));
  };

  const handleVotes = () => {
    const copy = [...points];
    copy[selected] += 1;
    setPoints(copy);
  };

  const getMostVoted = () => {
    const maxValue = Math.max(...points);
    const mostVotedIdx = points.indexOf(maxValue);
    return anecdotes[mostVotedIdx];
  };

  return (
    <div>
      <Title title="Anecdote of the day" />
      <div>{anecdotes[selected]}</div>
      <div>has {points[selected]} votes</div>
      <Button label="vote" onClick={handleVotes} />
      <Button label="next anecdote" onClick={handleSelected} />

      <Title title="Anecdote with the most votes" />
      <div>{getMostVoted()}</div>
    </div>
  );
};

export default App;
