import express from 'express';
const app = express();
app.use(express.json());

import calculateBmi from './bmiCalculator';
import calculateExercises, { FinalResult } from './exerciseCalculator';

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi?', (req, res) => {
  try {
    const height = Number(req.query.height);
    const weight = Number(req.query.weight);
    if (!height || !weight) throw new Error('malformatted parameters');
    res.json({
      weight: Number(weight),
      height: Number(height),
      bmi: calculateBmi(Number(height), Number(weight))
    });
  } catch (error: unknown) {
    if (error instanceof Error) res.status(400).json({ error: error.message });
  }
});

app.post('/exercises', (req, res) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { daily_exercises, target } = req.body;
    if (!daily_exercises || !target) throw new Error('parameters missing');
    const validate = (value: unknown) => Number(value) === 0 || !!Number(value);
    const validDailyExercises = (daily_exercises as unknown[]).filter(
      (num) => !validate(num)
    );
    if (!validate(target) || validDailyExercises.length > 0)
      throw new Error('malformatted parameters');

    const result: FinalResult = calculateExercises(
      daily_exercises as number[],
      target as number
    );
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    res.send(result);
  } catch (error: unknown) {
    if (error instanceof Error) res.status(400).json({ error: error.message });
  }
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
