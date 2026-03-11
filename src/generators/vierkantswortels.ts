import type { Exercise, ExerciseGenerator } from './types';

const perfectSquares = [4, 9, 16, 25, 36, 49, 64, 81, 100];

export const generateVierkantswortel: ExerciseGenerator = (): Exercise => {
  const square =
    perfectSquares[Math.floor(Math.random() * perfectSquares.length)]!;
  const correctAnswer = Math.sqrt(square);

  return {
    question: `\u221A${square}`,
    correctAnswer,
  };
};
