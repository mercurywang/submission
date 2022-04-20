import React, { useState } from 'react';

const Title = ({ title }) => <h1>{title}</h1>;

const Button = ({ label, onClick }) => (
  <button onClick={onClick}>{label}</button>
);

const StatisticLine = ({ text, value }) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
);

const Statistics = ({ good, neutral, bad }) => {
  if (!good && !neutral && !bad) {
    return <p>No feedback given</p>;
  }

  const total = good + bad + neutral;
  const getAverage = () => (good - bad) / total;
  const getPositive = () => (good / total) * 100 + '%';

  return (
    <table>
      <tbody>
        <StatisticLine text="good" value={good} />
        <StatisticLine text="neutral" value={neutral} />
        <StatisticLine text="bad" value={bad} />
        <StatisticLine text="all" value={total} />
        <StatisticLine text="average" value={getAverage()} />
        <StatisticLine text="positive" value={getPositive()} />
      </tbody>
    </table>
  );
};
const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleGoodClick = () => setGood(good + 1);
  const handleNeutralClick = () => setNeutral(neutral + 1);
  const handleBadClick = () => setBad(bad + 1);

  return (
    <div>
      <Title title="give feedback" />
      <Button label="good" onClick={handleGoodClick} />
      <Button label="neutral" onClick={handleNeutralClick} />
      <Button label="bad" onClick={handleBadClick} />

      <Title title="statistics" />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;
