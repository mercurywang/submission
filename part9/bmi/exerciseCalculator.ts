import { isNotNumber } from './util';

export interface ExerciseProps {
  dailyExercises: number[];
  target: number;
}

type Description =
  | 'not too bad but could be better'
  | 'Excellent'
  | 'try your best next time'
  | undefined;

type Rating = 1 | 2 | 3;

interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: Rating;
  ratingDescription: Description;
  target: number;
  average: number;
}

export const calculateExercise = ({
  dailyExercises,
  target
}: ExerciseProps): Result | string => {
  const hasNaN =
    dailyExercises.filter((h) => isNotNumber(h)).length > 0 ||
    isNotNumber(target);

  if (hasNaN) {
    return 'Something bad happened. Error: Provided values were not numbers!';
  }

  const periodLength = dailyExercises.length;
  const trainingDays = dailyExercises.filter((h) => h > 0).length;

  const sum = dailyExercises.reduce((accumulator, currentValue) => {
    return accumulator + currentValue;
  }, 0);
  const average = sum / periodLength;
  const success = average > target;

  const completeRate = average / target;
  let rating: Rating = 1;
  let ratingDescription: Description = undefined;

  if (completeRate >= 0.6 && completeRate < 1) {
    rating = 2;
    ratingDescription = 'not too bad but could be better';
  } else if (completeRate >= 1) {
    rating = 3;
    ratingDescription = 'Excellent';
  } else if (completeRate < 0.6) {
    rating = 1;
    ratingDescription = 'try your best next time';
  }

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average
  };
};

const target = Number(process.argv[2]);

const rest = process.argv.splice(3).map((s) => Number(s));

console.log(calculateExercise({ dailyExercises: rest, target }));
