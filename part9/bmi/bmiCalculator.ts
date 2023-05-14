import { isNotNumber } from './util';

interface BMIProps {
  height: number; // centimeters
  weight: number; // kilograms
}

type Message =
  | 'Normal(healthy weight)'
  | 'Underweight'
  | 'Overweight'
  | 'Obese'
  | 'Wrong input'
  | undefined;

export const calculateBmi = ({ height, weight }: BMIProps): Message => {
  let status: Message = undefined;

  if (
    isNotNumber(weight) ||
    isNotNumber(height) ||
    height < 0 ||
    height === 0
  ) {
    status = 'Wrong input';
    return status;
  }

  const meter = height / 100;

  const bmi = weight / (meter * meter);

  if (bmi <= 18.4) {
    status = 'Underweight';
  } else if (bmi > 18.4 && bmi < 24.9) {
    status = 'Normal(healthy weight)';
  } else if (bmi > 25.0 && bmi <= 39.9) {
    status = 'Overweight';
  } else if (bmi >= 40) {
    status = 'Obese';
  }
  return status;
};

const height = Number(process.argv[2]);
const weight = Number(process.argv[3]);

console.log(calculateBmi({ height, weight }));
