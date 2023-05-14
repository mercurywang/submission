import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercise } from './exerciseCalculator';
const app = express();

app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const { height, weight } = req.query;

  const bmi = calculateBmi({ height: Number(height), weight: Number(weight) });

  if (bmi === 'Wrong input') {
    res.send({
      error: 'malformatted parameters'
    });
  }

  res.send({
    height: Number(height),
    weight: Number(weight),
    bmi
  });
});

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { dailyExercises, target } = req.body;

  if (!dailyExercises || !target) {
    res.send({
      error: 'parameters missing'
    });
  }

  const exercises = dailyExercises as number[];
  const tg = target as number;
  const result = calculateExercise({ dailyExercises: exercises, target: tg });

  res.send(result);
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
