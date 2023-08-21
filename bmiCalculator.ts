interface HeightAndWeight {
  height: number;
  weight: number;
}

export const parseArguments = (args: string[]): HeightAndWeight => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3])
    };
  } else {
    throw new Error('Provided values are not numbers!');
  }
};

const calculateBmi = (height: number, weight: number): string => {
  const bmi = Math.round((weight * 100) / (height / 100) ** 2) / 100;
  if (bmi < 18.5) return 'Underweight';
  else if (18.5 <= bmi && bmi < 25) return 'Normal (healthy weight)';
  else if (25 <= bmi && bmi < 30) return 'Overweight';
  return 'Obese';
};

// try {
//   const { height, weight } = parseArguments(process.argv)
//   console.log(calculateBmi(height, weight))
// } catch (error: unknown) {
//   let errorMessage = 'Something bad happend'
//   if (error instanceof Error) {
//     errorMessage += ' Error: ' + error.message
//   }
//   console.log(errorMessage)
// }

export default calculateBmi;
