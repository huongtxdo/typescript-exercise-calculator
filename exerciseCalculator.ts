export interface FinalResult {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

interface Input {
  dailyHours: number[];
  target: number;
}

export const parseArguments01 = (args: string[]): Input => {
  if (args.length < 4) throw new Error('Not enough arguments');
  const dailyHours: number[] = [];
  const target = Number(args[2]);
  args.slice(3).forEach((a) => dailyHours.push(Number(a)));
  return {
    dailyHours: dailyHours,
    target: target
  };
};

const calculateExercises = (
  dailyHours: number[],
  target: number
): FinalResult => {
  const periodLength = dailyHours.length;
  const trainingDays = dailyHours.filter((n) => n !== 0).length;
  const average =
    dailyHours.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0
    ) / periodLength;
  let rating = 1;
  let ratingDesc = 'push yourself harder';
  if (average >= target) {
    rating = 3;
    ratingDesc = 'well done! ';
  } else if (target * 0.9 < average) {
    rating = 2;
    ratingDesc = 'not too bad but could be better';
  }
  return {
    periodLength: periodLength,
    trainingDays: trainingDays,
    success: average >= target,
    rating: rating,
    ratingDescription: ratingDesc,
    target: target,
    average: average
  };
};

// try {
//   const { dailyHours, target } = parseArguments01(process.argv);
//   console.log(calculateExercises(dailyHours, target));
// } catch (error: unknown) {
//   let errorMessage = 'Something bad happend';
//   if (error instanceof Error) {
//     errorMessage += ' Error: ' + error.message;
//   }
//   console.log(errorMessage);
// }

export default calculateExercises;
